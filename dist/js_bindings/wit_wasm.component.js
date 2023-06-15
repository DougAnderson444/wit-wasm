import { cliBaseEnvironment as interface14, cliBaseExit as interface1, cliBasePreopens as interface9, cliBaseStderr as interface4, cliBaseStdin as interface2, cliBaseStdout as interface3 } from 'cli-base';
import { filesystemFilesystem as interface0 } from 'filesystem';
import { ioStreams as interface5 } from 'io';
import { randomRandom as interface13 } from 'random';
import { smokeImports as interface7 } from 'smoke';

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const toUint64 = val => BigInt.asUintN(64, val);

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;
const lowering0Callee = interface0.dropDescriptor;
function lowering0(arg0) {
  lowering0Callee(arg0 >>> 0);
}
const lowering1Callee = interface1.exit;
function lowering1(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  lowering1Callee(variant0);
}
const lowering2Callee = interface2.getStdin;
function lowering2() {
  const ret = lowering2Callee();
  return toUint32(ret);
}
const lowering3Callee = interface3.getStdout;
function lowering3() {
  const ret = lowering3Callee();
  return toUint32(ret);
}
const lowering4Callee = interface4.getStderr;
function lowering4() {
  const ret = lowering4Callee();
  return toUint32(ret);
}
const lowering5Callee = interface5.dropInputStream;
function lowering5(arg0) {
  lowering5Callee(arg0 >>> 0);
}
const lowering6Callee = interface5.dropOutputStream;
function lowering6(arg0) {
  lowering6Callee(arg0 >>> 0);
}
let exports2;
let memory0;
let realloc0;
const lowering7Callee = interface7.thunk;
function lowering7(arg0, arg1, arg2) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  const ret = lowering7Callee(result0);
  const ptr1 = utf8Encode(ret, realloc0, memory0);
  const len1 = utf8EncodedLen;
  dataView(memory0).setInt32(arg2 + 4, len1, true);
  dataView(memory0).setInt32(arg2 + 0, ptr1, true);
}
const lowering8Callee = interface7.prnt;
function lowering8(arg0, arg1) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  lowering8Callee(result0);
}
let realloc1;
const lowering9Callee = interface9.getDirectories;
function lowering9(arg0) {
  const ret = lowering9Callee();
  const vec2 = ret;
  const len2 = vec2.length;
  const result2 = realloc1(0, 0, 4, len2 * 12);
  for (let i = 0; i < vec2.length; i++) {
    const e = vec2[i];
    const base = result2 + i * 12;const [tuple0_0, tuple0_1] = e;
    dataView(memory0).setInt32(base + 0, toUint32(tuple0_0), true);
    const ptr1 = utf8Encode(tuple0_1, realloc1, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len1, true);
    dataView(memory0).setInt32(base + 4, ptr1, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len2, true);
  dataView(memory0).setInt32(arg0 + 0, result2, true);
}
const lowering10Callee = interface0.writeViaStream;
function lowering10(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: lowering10Callee(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const lowering11Callee = interface0.appendViaStream;
function lowering11(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: lowering11Callee(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const lowering12Callee = interface0.getType;
function lowering12(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: lowering12Callee(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'unknown': {
          enum0 = 0;
          break;
        }
        case 'block-device': {
          enum0 = 1;
          break;
        }
        case 'character-device': {
          enum0 = 2;
          break;
        }
        case 'directory': {
          enum0 = 3;
          break;
        }
        case 'fifo': {
          enum0 = 4;
          break;
        }
        case 'symbolic-link': {
          enum0 = 5;
          break;
        }
        case 'regular-file': {
          enum0 = 6;
          break;
        }
        case 'socket': {
          enum0 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum0, true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val1 = e;
      let enum1;
      switch (val1) {
        case 'access': {
          enum1 = 0;
          break;
        }
        case 'would-block': {
          enum1 = 1;
          break;
        }
        case 'already': {
          enum1 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum1 = 3;
          break;
        }
        case 'busy': {
          enum1 = 4;
          break;
        }
        case 'deadlock': {
          enum1 = 5;
          break;
        }
        case 'quota': {
          enum1 = 6;
          break;
        }
        case 'exist': {
          enum1 = 7;
          break;
        }
        case 'file-too-large': {
          enum1 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum1 = 9;
          break;
        }
        case 'in-progress': {
          enum1 = 10;
          break;
        }
        case 'interrupted': {
          enum1 = 11;
          break;
        }
        case 'invalid': {
          enum1 = 12;
          break;
        }
        case 'io': {
          enum1 = 13;
          break;
        }
        case 'is-directory': {
          enum1 = 14;
          break;
        }
        case 'loop': {
          enum1 = 15;
          break;
        }
        case 'too-many-links': {
          enum1 = 16;
          break;
        }
        case 'message-size': {
          enum1 = 17;
          break;
        }
        case 'name-too-long': {
          enum1 = 18;
          break;
        }
        case 'no-device': {
          enum1 = 19;
          break;
        }
        case 'no-entry': {
          enum1 = 20;
          break;
        }
        case 'no-lock': {
          enum1 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum1 = 22;
          break;
        }
        case 'insufficient-space': {
          enum1 = 23;
          break;
        }
        case 'not-directory': {
          enum1 = 24;
          break;
        }
        case 'not-empty': {
          enum1 = 25;
          break;
        }
        case 'not-recoverable': {
          enum1 = 26;
          break;
        }
        case 'unsupported': {
          enum1 = 27;
          break;
        }
        case 'no-tty': {
          enum1 = 28;
          break;
        }
        case 'no-such-device': {
          enum1 = 29;
          break;
        }
        case 'overflow': {
          enum1 = 30;
          break;
        }
        case 'not-permitted': {
          enum1 = 31;
          break;
        }
        case 'pipe': {
          enum1 = 32;
          break;
        }
        case 'read-only': {
          enum1 = 33;
          break;
        }
        case 'invalid-seek': {
          enum1 = 34;
          break;
        }
        case 'text-file-busy': {
          enum1 = 35;
          break;
        }
        case 'cross-device': {
          enum1 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const lowering13Callee = interface13.getRandomBytes;
function lowering13(arg0, arg1) {
  const ret = lowering13Callee(BigInt.asUintN(64, arg0));
  const val0 = ret;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}
const lowering14Callee = interface14.getEnvironment;
function lowering14(arg0) {
  const ret = lowering14Callee();
  const vec3 = ret;
  const len3 = vec3.length;
  const result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc1, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    const ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
const lowering15Callee = interface5.write;
function lowering15(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: lowering15Callee(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const { } = e;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const lowering16Callee = interface5.blockingWrite;
function lowering16(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: lowering16Callee(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const { } = e;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
let exports3;
let postReturn0;
const smokeDemo = {
  thank(arg0) {
    const ptr0 = utf8Encode(arg0, realloc0, memory0);
    const len0 = utf8EncodedLen;
    const ret = exports1['mypackage:smoke/demo#thank'](ptr0, len0);
    const ptr1 = dataView(memory0).getInt32(ret + 0, true);
    const len1 = dataView(memory0).getInt32(ret + 4, true);
    const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
    postReturn0(ret);
    return result1;
  },
  
};
const direct = {
  pank() {
    exports1['direct#pank']();
  },
  
};

function think(arg0) {
  const ptr0 = utf8Encode(arg0, realloc0, memory0);
  const len0 = utf8EncodedLen;
  const ret = exports1.think(ptr0, len0);
  const ptr1 = dataView(memory0).getInt32(ret + 0, true);
  const len1 = dataView(memory0).getInt32(ret + 4, true);
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  postReturn0(ret);
  return result1;
}

export { smokeDemo as demo, direct, smokeDemo, think }

const $init = (async() => {
  const module0 = fetchCompile(new URL('./wit_wasm.component.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./wit_wasm.component.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABOQpgA39/fwBgAn9/AGABfwBgA39+fwBgAn9/AGACfn8AYAR/f39/AGACf38Bf2AEf39/fwF/YAF/AAMQDwABAgMEBAUCBgYHCAcHCQQFAXABDw8HTRABMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADggkaW1wb3J0cwEACr8BDw0AIAAgASACQQARAAALCwAgACABQQERAQALCQAgAEECEQIACw0AIAAgASACQQMRAwALCwAgACABQQQRBAALCwAgACABQQURBAALCwAgACABQQYRBQALCQAgAEEHEQIACw8AIAAgASACIANBCBEGAAsPACAAIAEgAiADQQkRBgALCwAgACABQQoRBwALDwAgACABIAIgA0ELEQgACwsAIAAgAUEMEQcACwsAIAAgAUENEQcACwkAIABBDhEJAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjExLjAAtgUEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQGZBQ8AJmluZGlyZWN0LW15cGFja2FnZTpzbW9rZS9pbXBvcnRzLXRodW5rASVpbmRpcmVjdC1teXBhY2thZ2U6c21va2UvaW1wb3J0cy1wcm50Ai9pbmRpcmVjdC13YXNpOmNsaS1iYXNlL3ByZW9wZW5zLWdldC1kaXJlY3RvcmllcwM0aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL2ZpbGVzeXN0ZW0td3JpdGUtdmlhLXN0cmVhbQQ1aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL2ZpbGVzeXN0ZW0tYXBwZW5kLXZpYS1zdHJlYW0FLGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9maWxlc3lzdGVtLWdldC10eXBlBixpbmRpcmVjdC13YXNpOnJhbmRvbS9yYW5kb20tZ2V0LXJhbmRvbS1ieXRlcwcyaW5kaXJlY3Qtd2FzaTpjbGktYmFzZS9lbnZpcm9ubWVudC1nZXQtZW52aXJvbm1lbnQIHmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy13cml0ZQknaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zLWJsb2NraW5nLXdyaXRlCidhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXJhbmRvbV9nZXQLJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfd3JpdGUMKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQNLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQOJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcHJvY19leGl0');
  const module3 = base64Compile('AGFzbQEAAAABOQpgA39/fwBgAn9/AGABfwBgA39+fwBgAn9/AGACfn8AYAR/f39/AGACf38Bf2AEf39/fwF/YAF/AAJgEAABMAAAAAExAAEAATIAAgABMwADAAE0AAQAATUABAABNgAFAAE3AAIAATgABgABOQAGAAIxMAAHAAIxMQAIAAIxMgAHAAIxMwAHAAIxNAAJAAgkaW1wb3J0cwFwAQ8PCRUBAEEACw8AAQIDBAUGBwgJCgsMDQ4ALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjExLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    'mypackage:smoke/imports': {
      prnt: exports0['1'],
      thunk: exports0['0'],
    },
    wasi_snapshot_preview1: {
      environ_get: exports0['12'],
      environ_sizes_get: exports0['13'],
      fd_write: exports0['11'],
      proc_exit: exports0['14'],
      random_get: exports0['10'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli-base/environment': {
      'get-environment': exports0['7'],
    },
    'wasi:cli-base/exit': {
      exit: lowering1,
    },
    'wasi:cli-base/preopens': {
      'get-directories': exports0['2'],
    },
    'wasi:cli-base/stderr': {
      'get-stderr': lowering4,
    },
    'wasi:cli-base/stdin': {
      'get-stdin': lowering2,
    },
    'wasi:cli-base/stdout': {
      'get-stdout': lowering3,
    },
    'wasi:filesystem/filesystem': {
      'append-via-stream': exports0['4'],
      'drop-descriptor': lowering0,
      'get-type': exports0['5'],
      'write-via-stream': exports0['3'],
    },
    'wasi:io/streams': {
      'blocking-write': exports0['9'],
      'drop-input-stream': lowering5,
      'drop-output-stream': lowering6,
      write: exports0['8'],
    },
    'wasi:random/random': {
      'get-random-bytes': exports0['6'],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports1.cabi_realloc;
  realloc1 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': lowering7,
      '1': lowering8,
      '10': exports2.random_get,
      '11': exports2.fd_write,
      '12': exports2.environ_get,
      '13': exports2.environ_sizes_get,
      '14': exports2.proc_exit,
      '2': lowering9,
      '3': lowering10,
      '4': lowering11,
      '5': lowering12,
      '6': lowering13,
      '7': lowering14,
      '8': lowering15,
      '9': lowering16,
    },
  }));
  postReturn0 = exports1['cabi_post_mypackage:smoke/demo#thank'];
})();

await $init;
