/**
 * 1. promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
 * 2. new promise时， 需要传递一个executor()执行器，执行器立即执行；
 * 3. executor接受两个参数，分别是resolve和reject；
 * 4. promise  的默认状态是 pending；
 * 5. promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
 * 6. promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
 * 7. promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
 * 8. promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
 * 9. 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
 * 10. 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
 * 11. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
 */

// then 的链式调用和值的穿透:
/**
 * then 的参数 onFulfilled 和 onRejected 可以缺省，如果 onFulfilled 或者 onRejected不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
 * promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
 * 如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
 * 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
 * 如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
 * 如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
 * 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
 */

// 三个状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

export const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误结束掉promise Promise/A+ 2.3.1
  // 即，.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
  if (promise2 === x) {
    return reject(new TypeError('Chaning Cycle detected for promise #<Promise>'));
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;

  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === 'object' && x != null) || (typeof x === 'function')) {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      const { then } = x;
      if (typeof then === 'function') {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

export class WjjPromise {
  constructor(executor) {
    // 默认状态是 pending；
    this.state = 'PENDING';
    // 存放成功状态的值，默认是undefined
    this.value = undefined;
    // 存放失败状态的值，默认是undefined
    this.reason = undefined;

    /**
     * promise 调用 then 方法时，当前的 promise 并没有成功，一直处于 pending 状态。所以如果当调用 then 方法时，当前状态是 pending，我们需要先将成功和失败的回调分别存放起来，在executor()的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调。
     */

    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];

    // 成功时调用
    const resolve = (value) => {
    // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    // 失败时调用
    const reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.state === REJECTED) {
      onRejected(this.reason);
    }

    // executor中传入的是异步操作的时候
    if (this.state === PENDING) {
      // 如果promise的状态是pending的，需要将onFulFilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
