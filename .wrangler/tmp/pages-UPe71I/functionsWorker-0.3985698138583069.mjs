// [[path]].js
var S1 = Object.create;
var la = Object.defineProperty;
var E1 = Object.getOwnPropertyDescriptor;
var R1 = Object.getOwnPropertyNames;
var x1 = Object.getPrototypeOf;
var k1 = Object.prototype.hasOwnProperty;
var te = (e, t) => () => (e && (t = e(e = 0)), t);
var Ae = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var dn = (e, t) => {
  for (var n in t)
    la(e, n, { get: t[n], enumerable: true });
};
var Vh = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of R1(t))
      !k1.call(e, o) && o !== n && la(e, o, { get: () => t[o], enumerable: !(r = E1(t, o)) || r.enumerable });
  return e;
};
var se = (e, t, n) => (n = e != null ? S1(x1(e)) : {}, Vh(t || !e || !e.__esModule ? la(n, "default", { value: e, enumerable: true }) : n, e));
var Ni = (e) => Vh(la({}, "__esModule", { value: true }), e);
var $h = Ae((ac) => {
  "use strict";
  ac.parse = C1;
  ac.serialize = N1;
  var _1 = Object.prototype.toString, aa = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function C1(e, t) {
    if (typeof e != "string")
      throw new TypeError("argument str must be a string");
    for (var n = {}, r = t || {}, o = r.decode || P1, i = 0; i < e.length; ) {
      var l = e.indexOf("=", i);
      if (l === -1)
        break;
      var a = e.indexOf(";", i);
      if (a === -1)
        a = e.length;
      else if (a < l) {
        i = e.lastIndexOf(";", l - 1) + 1;
        continue;
      }
      var u = e.slice(i, l).trim();
      if (n[u] === void 0) {
        var s = e.slice(l + 1, a).trim();
        s.charCodeAt(0) === 34 && (s = s.slice(1, -1)), n[u] = T1(s, o);
      }
      i = a + 1;
    }
    return n;
  }
  function N1(e, t, n) {
    var r = n || {}, o = r.encode || D1;
    if (typeof o != "function")
      throw new TypeError("option encode is invalid");
    if (!aa.test(e))
      throw new TypeError("argument name is invalid");
    var i = o(t);
    if (i && !aa.test(i))
      throw new TypeError("argument val is invalid");
    var l = e + "=" + i;
    if (r.maxAge != null) {
      var a = r.maxAge - 0;
      if (isNaN(a) || !isFinite(a))
        throw new TypeError("option maxAge is invalid");
      l += "; Max-Age=" + Math.floor(a);
    }
    if (r.domain) {
      if (!aa.test(r.domain))
        throw new TypeError("option domain is invalid");
      l += "; Domain=" + r.domain;
    }
    if (r.path) {
      if (!aa.test(r.path))
        throw new TypeError("option path is invalid");
      l += "; Path=" + r.path;
    }
    if (r.expires) {
      var u = r.expires;
      if (!L1(u) || isNaN(u.valueOf()))
        throw new TypeError("option expires is invalid");
      l += "; Expires=" + u.toUTCString();
    }
    if (r.httpOnly && (l += "; HttpOnly"), r.secure && (l += "; Secure"), r.partitioned && (l += "; Partitioned"), r.priority) {
      var s = typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
      switch (s) {
        case "low":
          l += "; Priority=Low";
          break;
        case "medium":
          l += "; Priority=Medium";
          break;
        case "high":
          l += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (r.sameSite) {
      var c = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
      switch (c) {
        case true:
          l += "; SameSite=Strict";
          break;
        case "lax":
          l += "; SameSite=Lax";
          break;
        case "strict":
          l += "; SameSite=Strict";
          break;
        case "none":
          l += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return l;
  }
  function P1(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  function D1(e) {
    return encodeURIComponent(e);
  }
  function L1(e) {
    return _1.call(e) === "[object Date]" || e instanceof Date;
  }
  function T1(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
});
function ua(e, t) {
  !e && !Wh[t] && (Wh[t] = true, console.warn(t));
}
var Wh;
var uc = te(() => {
  Wh = {};
});
async function F1(e, t, n) {
  let r = M1(t);
  return n.length > 0 && (r = await e(r, n[0])), r;
}
async function O1(e, t, n) {
  if (n.length > 0) {
    for (let r of n) {
      let o = await e(t, r);
      if (o !== false)
        return Kh(o);
    }
    return null;
  }
  return Kh(t);
}
function M1(e) {
  return btoa(I1(encodeURIComponent(JSON.stringify(e))));
}
function Kh(e) {
  try {
    return JSON.parse(decodeURIComponent(A1(atob(e))));
  } catch {
    return {};
  }
}
function A1(e) {
  let t = e.toString(), n = "", r = 0, o, i;
  for (; r < t.length; )
    o = t.charAt(r++), /[\w*+\-./@]/.exec(o) ? n += o : (i = o.charCodeAt(0), i < 256 ? n += "%" + Qh(i, 2) : n += "%u" + Qh(i, 4).toUpperCase());
  return n;
}
function Qh(e, t) {
  let n = e.toString(16);
  for (; n.length < t; )
    n = "0" + n;
  return n;
}
function I1(e) {
  let t = e.toString(), n = "", r = 0, o, i;
  for (; r < t.length; ) {
    if (o = t.charAt(r++), o === "%") {
      if (t.charAt(r) === "u") {
        if (i = t.slice(r + 1, r + 5), /^[\da-f]{4}$/i.exec(i)) {
          n += String.fromCharCode(parseInt(i, 16)), r += 5;
          continue;
        }
      } else if (i = t.slice(r, r + 2), /^[\da-f]{2}$/i.exec(i)) {
        n += String.fromCharCode(parseInt(i, 16)), r += 2;
        continue;
      }
    }
    n += o;
  }
  return n;
}
function z1(e, t) {
  ua(!t, `The "${e}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
}
var sa;
var Yh;
var _o;
var ca = te(() => {
  sa = se($h());
  uc();
  Yh = ({ sign: e, unsign: t }) => (n, r = {}) => {
    let { secrets: o = [], ...i } = { path: "/", sameSite: "lax", ...r };
    return z1(n, i.expires), { get name() {
      return n;
    }, get isSigned() {
      return o.length > 0;
    }, get expires() {
      return typeof i.maxAge < "u" ? new Date(Date.now() + i.maxAge * 1e3) : i.expires;
    }, async parse(l, a) {
      if (!l)
        return null;
      let u = (0, sa.parse)(l, { ...i, ...a });
      return n in u ? u[n] === "" ? "" : await O1(t, u[n], o) : null;
    }, async serialize(l, a) {
      return (0, sa.serialize)(n, l === "" ? "" : await F1(e, l, o), { ...i, ...a });
    } };
  }, _o = (e) => e != null && typeof e.name == "string" && typeof e.isSigned == "boolean" && typeof e.parse == "function" && typeof e.serialize == "function";
});
function Co(e) {
  let t = unescape(encodeURIComponent(e));
  return Uint8Array.from(t, (n, r) => t.charCodeAt(r));
}
function sc(e) {
  let t = String.fromCharCode.apply(null, e);
  return decodeURIComponent(escape(t));
}
function No(...e) {
  let t = new Uint8Array(e.reduce((r, o) => r + o.length, 0)), n = 0;
  for (let r of e)
    t.set(r, n), n += r.length;
  return t;
}
function Jh(e, t) {
  if (e.length !== t.length)
    return false;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return false;
  return true;
}
var cc = te(() => {
});
function Xh(e) {
  return e instanceof Uint8Array ? (t) => e[t] : e;
}
function dc(e, t, n, r, o) {
  let i = Xh(e), l = Xh(n);
  for (let a = 0; a < o; ++a)
    if (i(t + a) !== l(r + a))
      return false;
  return true;
}
function U1(e) {
  let t = new Array(256).fill(e.length);
  if (e.length > 1)
    for (let n = 0; n < e.length - 1; n++)
      t[e[n]] = e.length - 1 - n;
  return t;
}
var fn;
var Vr;
var da;
var Gh;
var qh;
var Zh = te(() => {
  cc();
  fn = Symbol("Match"), Vr = class {
    constructor(t) {
      this._lookbehind = new Uint8Array(), typeof t == "string" ? this._needle = t = Co(t) : this._needle = t, this._lastChar = t[t.length - 1], this._occ = U1(t);
    }
    feed(t) {
      let n = 0, r, o = [];
      for (; n !== t.length; )
        [n, ...r] = this._feed(t, n), o.push(...r);
      return o;
    }
    end() {
      let t = this._lookbehind;
      return this._lookbehind = new Uint8Array(), t;
    }
    _feed(t, n) {
      let r = [], o = -this._lookbehind.length;
      if (o < 0) {
        for (; o < 0 && o <= t.length - this._needle.length; ) {
          let i = this._charAt(t, o + this._needle.length - 1);
          if (i === this._lastChar && this._memcmp(t, o, this._needle.length - 1))
            return o > -this._lookbehind.length && r.push(this._lookbehind.slice(0, this._lookbehind.length + o)), r.push(fn), this._lookbehind = new Uint8Array(), [o + this._needle.length, ...r];
          o += this._occ[i];
        }
        if (o < 0)
          for (; o < 0 && !this._memcmp(t, o, t.length - o); )
            o++;
        if (o >= 0)
          r.push(this._lookbehind), this._lookbehind = new Uint8Array();
        else {
          let i = this._lookbehind.length + o;
          return i > 0 && (r.push(this._lookbehind.slice(0, i)), this._lookbehind = this._lookbehind.slice(i)), this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + t.length), (l, a) => this._charAt(t, a - this._lookbehind.length)), [t.length, ...r];
        }
      }
      for (o += n; o <= t.length - this._needle.length; ) {
        let i = t[o + this._needle.length - 1];
        if (i === this._lastChar && t[o] === this._needle[0] && dc(this._needle, 0, t, o, this._needle.length - 1))
          return o > n && r.push(t.slice(n, o)), r.push(fn), [o + this._needle.length, ...r];
        o += this._occ[i];
      }
      if (o < t.length) {
        for (; o < t.length && (t[o] !== this._needle[0] || !dc(t, o, this._needle, 0, t.length - o)); )
          ++o;
        o < t.length && (this._lookbehind = t.slice(o));
      }
      return o > 0 && r.push(t.slice(n, o < t.length ? o : t.length)), [t.length, ...r];
    }
    _charAt(t, n) {
      return n < 0 ? this._lookbehind[this._lookbehind.length + n] : t[n];
    }
    _memcmp(t, n, r) {
      return dc(this._charAt.bind(this, t), n, this._needle, 0, r);
    }
  }, da = class {
    constructor(t, n) {
      this._readableStream = n, this._search = new Vr(t);
    }
    async *[Symbol.asyncIterator]() {
      let t = this._readableStream.getReader();
      try {
        for (; ; ) {
          let r = await t.read();
          if (r.done)
            break;
          yield* this._search.feed(r.value);
        }
        let n = this._search.end();
        n.length && (yield n);
      } finally {
        t.releaseLock();
      }
    }
  }, Gh = Symbol("End of Queue"), qh = class {
    constructor(t) {
      this._chunksQueue = [], this._closed = false, this._search = new Vr(t);
    }
    push(...t) {
      if (this._closed)
        throw new Error("cannot call push after close");
      this._chunksQueue.push(...t), this._notify && this._notify();
    }
    close() {
      if (this._closed)
        throw new Error("close was already called");
      this._closed = true, this._chunksQueue.push(Gh), this._notify && this._notify();
    }
    async *[Symbol.asyncIterator]() {
      for (; ; ) {
        let n;
        for (; !(n = this._chunksQueue.shift()); )
          await new Promise((r) => this._notify = r), this._notify = void 0;
        if (n === Gh)
          break;
        yield* this._search.feed(n);
      }
      let t = this._search.end();
      t.length && (yield t);
    }
  };
});
function b1(e) {
  let t = e.split(";").map((r) => r.trim());
  if (t.shift() !== "form-data")
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(t) + "`");
  let n = {};
  for (let r of t) {
    let o = r.split("=", 2);
    if (o.length !== 2)
      throw new Error("malformed content-disposition header: key-value pair not found - " + r + " in `" + e + "`");
    let [i, l] = o;
    if (l[0] === '"' && l[l.length - 1] === '"')
      n[i] = l.slice(1, -1).replace(/\\"/g, '"');
    else if (l[0] !== '"' && l[l.length - 1] !== '"')
      n[i] = l;
    else if (l[0] === '"' && l[l.length - 1] !== '"' || l[0] !== '"' && l[l.length - 1] === '"')
      throw new Error("malformed content-disposition header: mismatched quotations in `" + e + "`");
  }
  if (!n.name)
    throw new Error("malformed content-disposition header: missing field name in `" + e + "`");
  return n;
}
function H1(e) {
  let t = [], n = false, r;
  for (; typeof (r = e.shift()) < "u"; ) {
    let o = r.indexOf(":");
    if (o === -1)
      throw new Error("malformed multipart-form header: missing colon");
    let i = r.slice(0, o).trim().toLowerCase(), l = r.slice(o + 1).trim();
    switch (i) {
      case "content-disposition":
        n = true, t.push(...Object.entries(b1(l)));
        break;
      case "content-type":
        t.push(["contentType", l]);
    }
  }
  if (!n)
    throw new Error("malformed multipart-form header: missing content-disposition");
  return Object.fromEntries(t);
}
async function B1(e, t) {
  let n = true, r = false, o = [[]], i = new Vr(Pi);
  for (; ; ) {
    let l = await e.next();
    if (l.done)
      throw new Error("malformed multipart-form data: unexpected end of stream");
    if (n && l.value !== fn && Jh(l.value.slice(0, 2), em))
      return [void 0, new Uint8Array()];
    let a;
    if (l.value !== fn)
      a = l.value;
    else if (!r)
      a = t;
    else
      throw new Error("malformed multipart-form data: unexpected boundary");
    if (!a.length)
      continue;
    n && (n = false);
    let u = i.feed(a);
    for (let [s, c] of u.entries()) {
      let d = c === fn;
      if (!(!d && !c.length)) {
        if (r && d)
          return u.push(i.end()), [o.filter((p) => p.length).map(j1).map(sc), No(...u.slice(s + 1).map((p) => p === fn ? Pi : p))];
        (r = d) ? o.push([]) : o[o.length - 1].push(c);
      }
    }
  }
}
async function* tm(e, t) {
  let n = No(em, Co(t)), r = new da(n, e)[Symbol.asyncIterator]();
  for (; ; ) {
    let i = await r.next();
    if (i.done)
      return;
    if (i.value === fn)
      break;
  }
  let o = new Vr(Pi);
  for (; ; ) {
    let s = function(m) {
      let y = [];
      for (let w of o.feed(m))
        u && y.push(Pi), (u = w === fn) || y.push(w);
      return No(...y);
    }, [i, l] = await B1(r, n);
    if (!i)
      return;
    async function a() {
      let m = await r.next();
      if (m.done)
        throw new Error("malformed multipart-form data: unexpected end of stream");
      return m;
    }
    let u = false, c = false;
    async function d() {
      let m = await a(), y;
      if (m.value !== fn)
        y = m.value;
      else if (!u)
        y = Pi;
      else
        return c = true, { value: o.end() };
      return { value: s(y) };
    }
    let p = [{ value: s(l) }];
    for (yield { ...H1(i), data: { [Symbol.asyncIterator]() {
      return this;
    }, async next() {
      for (; ; ) {
        let m = p.shift();
        if (!m)
          break;
        if (m.value.length > 0)
          return m;
      }
      for (; ; ) {
        if (c)
          return { done: c, value: void 0 };
        let m = await d();
        if (m.value.length > 0)
          return m;
      }
    } } }; !c; )
      p.push(await d());
  }
}
var j1;
var em;
var Pi;
var nm = te(() => {
  Zh();
  cc();
  j1 = Function.prototype.apply.bind(No, void 0), em = Co("--"), Pi = Co(`\r
`);
});
function rm(...e) {
  return async (t) => {
    for (let n of e) {
      let r = await n(t);
      if (typeof r < "u" && r !== null)
        return r;
    }
  };
}
async function om(e, t) {
  let n = e.headers.get("Content-Type") || "", [r, o] = n.split(/\s*;\s*boundary=/);
  if (!e.body || !o || r !== "multipart/form-data")
    throw new TypeError("Could not parse content as FormData.");
  let i = new FormData(), l = tm(e.body, o);
  for await (let a of l) {
    if (a.done)
      break;
    typeof a.filename == "string" && (a.filename = a.filename.split(/[/\\]/).pop());
    let u = await t(a);
    typeof u < "u" && u !== null && i.append(a.name, u);
  }
  return i;
}
var im = te(() => {
  nm();
});
var Am = {};
dn(Am, { AbortedDeferredError: () => Yt, Action: () => Z, IDLE_BLOCKER: () => er, IDLE_FETCHER: () => wa, IDLE_NAVIGATION: () => fa, UNSAFE_DEFERRED_SYMBOL: () => Oi, UNSAFE_DeferredData: () => pa, UNSAFE_ErrorResponseImpl: () => Ln, UNSAFE_convertRouteMatchToUiMatch: () => ga, UNSAFE_convertRoutesToDataRoutes: () => Ti, UNSAFE_getResolveToMatches: () => To, UNSAFE_invariant: () => j, UNSAFE_warning: () => Qt, createBrowserHistory: () => va, createHashHistory: () => ya, createMemoryHistory: () => ma, createPath: () => Le, createRouter: () => Oo, createStaticHandler: () => yc, defer: () => Kr, generatePath: () => Lo, getStaticContextFromError: () => gc, getToPathname: () => lR, isDeferredData: () => Om, isRouteErrorResponse: () => Ne, joinPaths: () => Et, json: () => pn, matchPath: () => zt, matchRoutes: () => Ce, normalizePathname: () => km, parsePath: () => Ee, redirect: () => Tn, redirectDocument: () => Qr, resolvePath: () => Wr, resolveTo: () => Fo, stripBasename: () => be });
function G() {
  return G = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, G.apply(this, arguments);
}
function ma(e) {
  e === void 0 && (e = {});
  let { initialEntries: t = ["/"], initialIndex: n, v5Compat: r = false } = e, o;
  o = t.map((m, y) => c(m, typeof m == "string" ? null : m.state, y === 0 ? "default" : void 0));
  let i = u(n ?? o.length - 1), l = Z.Pop, a = null;
  function u(m) {
    return Math.min(Math.max(m, 0), o.length - 1);
  }
  function s() {
    return o[i];
  }
  function c(m, y, w) {
    y === void 0 && (y = null);
    let R = Dn(o ? s().pathname : "/", m, y, w);
    return Qt(R.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(m)), R;
  }
  function d(m) {
    return typeof m == "string" ? m : Le(m);
  }
  return { get index() {
    return i;
  }, get action() {
    return l;
  }, get location() {
    return s();
  }, createHref: d, createURL(m) {
    return new URL(d(m), "http://localhost");
  }, encodeLocation(m) {
    let y = typeof m == "string" ? Ee(m) : m;
    return { pathname: y.pathname || "", search: y.search || "", hash: y.hash || "" };
  }, push(m, y) {
    l = Z.Push;
    let w = c(m, y);
    i += 1, o.splice(i, o.length, w), r && a && a({ action: l, location: w, delta: 1 });
  }, replace(m, y) {
    l = Z.Replace;
    let w = c(m, y);
    o[i] = w, r && a && a({ action: l, location: w, delta: 0 });
  }, go(m) {
    l = Z.Pop;
    let y = u(i + m), w = o[y];
    i = y, a && a({ action: l, location: w, delta: m });
  }, listen(m) {
    return a = m, () => {
      a = null;
    };
  } };
}
function va(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: i, search: l, hash: a } = r.location;
    return Dn("", { pathname: i, search: l, hash: a }, o.state && o.state.usr || null, o.state && o.state.key || "default");
  }
  function n(r, o) {
    return typeof o == "string" ? o : Le(o);
  }
  return Sm(t, n, null, e);
}
function ya(e) {
  e === void 0 && (e = {});
  function t(o, i) {
    let { pathname: l = "/", search: a = "", hash: u = "" } = Ee(o.location.hash.substr(1));
    return !l.startsWith("/") && !l.startsWith(".") && (l = "/" + l), Dn("", { pathname: l, search: a, hash: u }, i.state && i.state.usr || null, i.state && i.state.key || "default");
  }
  function n(o, i) {
    let l = o.document.querySelector("base"), a = "";
    if (l && l.getAttribute("href")) {
      let u = o.location.href, s = u.indexOf("#");
      a = s === -1 ? u : u.slice(0, s);
    }
    return a + "#" + (typeof i == "string" ? i : Le(i));
  }
  function r(o, i) {
    Qt(o.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(i) + ")");
  }
  return Sm(t, n, r, e);
}
function j(e, t) {
  if (e === false || e === null || typeof e > "u")
    throw new Error(t);
}
function Qt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function V1() {
  return Math.random().toString(36).substr(2, 8);
}
function am(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Dn(e, t, n, r) {
  return n === void 0 && (n = null), G({ pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" }, typeof t == "string" ? Ee(t) : t, { state: n, key: t && t.key || r || V1() });
}
function Le(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function Ee(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
  }
  return t;
}
function Sm(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = false } = r, l = o.history, a = Z.Pop, u = null, s = c();
  s == null && (s = 0, l.replaceState(G({}, l.state, { idx: s }), ""));
  function c() {
    return (l.state || { idx: null }).idx;
  }
  function d() {
    a = Z.Pop;
    let R = c(), f = R == null ? null : R - s;
    s = R, u && u({ action: a, location: w.location, delta: f });
  }
  function p(R, f) {
    a = Z.Push;
    let h = Dn(w.location, R, f);
    n && n(h, R), s = c() + 1;
    let v = am(h, s), E = w.createHref(h);
    try {
      l.pushState(v, "", E);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError")
        throw k;
      o.location.assign(E);
    }
    i && u && u({ action: a, location: w.location, delta: 1 });
  }
  function m(R, f) {
    a = Z.Replace;
    let h = Dn(w.location, R, f);
    n && n(h, R), s = c();
    let v = am(h, s), E = w.createHref(h);
    l.replaceState(v, "", E), i && u && u({ action: a, location: w.location, delta: 0 });
  }
  function y(R) {
    let f = o.location.origin !== "null" ? o.location.origin : o.location.href, h = typeof R == "string" ? R : Le(R);
    return j(f, "No window.location.(origin|href) available to create URL for href: " + h), new URL(h, f);
  }
  let w = { get action() {
    return a;
  }, get location() {
    return e(o, l);
  }, listen(R) {
    if (u)
      throw new Error("A history only accepts one active listener");
    return o.addEventListener(lm, d), u = R, () => {
      o.removeEventListener(lm, d), u = null;
    };
  }, createHref(R) {
    return t(o, R);
  }, createURL: y, encodeLocation(R) {
    let f = y(R);
    return { pathname: f.pathname, search: f.search, hash: f.hash };
  }, push: p, replace: m, go(R) {
    return l.go(R);
  } };
  return w;
}
function W1(e) {
  return e.index === true;
}
function Ti(e, t, n, r) {
  return n === void 0 && (n = []), r === void 0 && (r = {}), e.map((o, i) => {
    let l = [...n, i], a = typeof o.id == "string" ? o.id : l.join("-");
    if (j(o.index !== true || !o.children, "Cannot specify children on an index route"), j(!r[a], 'Found a route id collision on id "' + a + `".  Route id's must be globally unique within Data Router usages`), W1(o)) {
      let u = G({}, o, t(o), { id: a });
      return r[a] = u, u;
    } else {
      let u = G({}, o, t(o), { id: a, children: void 0 });
      return r[a] = u, o.children && (u.children = Ti(o.children, t, l, r)), u;
    }
  });
}
function Ce(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? Ee(t) : t, o = be(r.pathname || "/", n);
  if (o == null)
    return null;
  let i = Em(e);
  K1(i);
  let l = null;
  for (let a = 0; l == null && a < i.length; ++a)
    l = tR(i[a], rR(o));
  return l;
}
function ga(e, t) {
  let { route: n, pathname: r, params: o } = e;
  return { id: n.id, pathname: r, params: o, data: t[n.id], handle: n.handle };
}
function Em(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let o = (i, l, a) => {
    let u = { relativePath: a === void 0 ? i.path || "" : a, caseSensitive: i.caseSensitive === true, childrenIndex: l, route: i };
    u.relativePath.startsWith("/") && (j(u.relativePath.startsWith(r), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(r.length));
    let s = Et([r, u.relativePath]), c = n.concat(u);
    i.children && i.children.length > 0 && (j(i.index !== true, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + s + '".')), Em(i.children, t, c, s)), !(i.path == null && !i.index) && t.push({ path: s, score: Z1(s, i.index), routesMeta: c });
  };
  return e.forEach((i, l) => {
    var a;
    if (i.path === "" || !((a = i.path) != null && a.includes("?")))
      o(i, l);
    else
      for (let u of Rm(i.path))
        o(i, l, u);
  }), t;
}
function Rm(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [n, ...r] = t, o = n.endsWith("?"), i = n.replace(/\?$/, "");
  if (r.length === 0)
    return o ? [i, ""] : [i];
  let l = Rm(r.join("/")), a = [];
  return a.push(...l.map((u) => u === "" ? i : [i, u].join("/"))), o && a.push(...l), a.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function K1(e) {
  e.sort((t, n) => t.score !== n.score ? n.score - t.score : eR(t.routesMeta.map((r) => r.childrenIndex), n.routesMeta.map((r) => r.childrenIndex)));
}
function Z1(e, t) {
  let n = e.split("/"), r = n.length;
  return n.some(um) && (r += q1), t && (r += J1), n.filter((o) => !um(o)).reduce((o, i) => o + (Q1.test(i) ? Y1 : i === "" ? X1 : G1), r);
}
function eR(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function tR(e, t) {
  let { routesMeta: n } = e, r = {}, o = "/", i = [];
  for (let l = 0; l < n.length; ++l) {
    let a = n[l], u = l === n.length - 1, s = o === "/" ? t : t.slice(o.length) || "/", c = zt({ path: a.relativePath, caseSensitive: a.caseSensitive, end: u }, s);
    if (!c)
      return null;
    Object.assign(r, c.params);
    let d = a.route;
    i.push({ params: r, pathname: Et([o, c.pathname]), pathnameBase: km(Et([o, c.pathnameBase])), route: d }), c.pathnameBase !== "/" && (o = Et([o, c.pathnameBase]));
  }
  return i;
}
function Lo(e, t) {
  t === void 0 && (t = {});
  let n = e;
  n.endsWith("*") && n !== "*" && !n.endsWith("/*") && (Qt(false, 'Route path "' + n + '" will be treated as if it were ' + ('"' + n.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + n.replace(/\*$/, "/*") + '".')), n = n.replace(/\*$/, "/*"));
  let r = n.startsWith("/") ? "/" : "", o = (l) => l == null ? "" : typeof l == "string" ? l : String(l), i = n.split(/\/+/).map((l, a, u) => {
    if (a === u.length - 1 && l === "*")
      return o(t["*"]);
    let c = l.match(/^:([\w-]+)(\??)$/);
    if (c) {
      let [, d, p] = c, m = t[d];
      return j(p === "?" || m != null, 'Missing ":' + d + '" param'), o(m);
    }
    return l.replace(/\?$/g, "");
  }).filter((l) => !!l);
  return r + i.join("/");
}
function zt(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: false, end: true });
  let [n, r] = nR(e.path, e.caseSensitive, e.end), o = t.match(n);
  if (!o)
    return null;
  let i = o[0], l = i.replace(/(.)\/+$/, "$1"), a = o.slice(1);
  return { params: r.reduce((s, c, d) => {
    let { paramName: p, isOptional: m } = c;
    if (p === "*") {
      let w = a[d] || "";
      l = i.slice(0, i.length - w.length).replace(/(.)\/+$/, "$1");
    }
    let y = a[d];
    return m && !y ? s[p] = void 0 : s[p] = oR(y || "", p), s;
  }, {}), pathname: i, pathnameBase: l, pattern: e };
}
function nR(e, t, n) {
  t === void 0 && (t = false), n === void 0 && (n = true), Qt(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let r = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (l, a, u) => (r.push({ paramName: a, isOptional: u != null }), u ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (r.push({ paramName: "*" }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), r];
}
function rR(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return Qt(false, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function oR(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return Qt(false, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + n + ").")), e;
  }
}
function be(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Wr(e, t) {
  t === void 0 && (t = "/");
  let { pathname: n, search: r = "", hash: o = "" } = typeof e == "string" ? Ee(e) : e;
  return { pathname: n ? n.startsWith("/") ? n : iR(n, t) : t, search: aR(r), hash: uR(o) };
}
function iR(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
  }), n.length > 1 ? n.join("/") : "/";
}
function fc(e, t, n, r) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function xm(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function To(e, t) {
  let n = xm(e);
  return t ? n.map((r, o) => o === e.length - 1 ? r.pathname : r.pathnameBase) : n.map((r) => r.pathnameBase);
}
function Fo(e, t, n, r) {
  r === void 0 && (r = false);
  let o;
  typeof e == "string" ? o = Ee(e) : (o = G({}, e), j(!o.pathname || !o.pathname.includes("?"), fc("?", "pathname", "search", o)), j(!o.pathname || !o.pathname.includes("#"), fc("#", "pathname", "hash", o)), j(!o.search || !o.search.includes("#"), fc("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", l = i ? "/" : o.pathname, a;
  if (l == null)
    a = n;
  else {
    let d = t.length - 1;
    if (!r && l.startsWith("..")) {
      let p = l.split("/");
      for (; p[0] === ".."; )
        p.shift(), d -= 1;
      o.pathname = p.join("/");
    }
    a = d >= 0 ? t[d] : "/";
  }
  let u = Wr(o, a), s = l && l !== "/" && l.endsWith("/"), c = (i || l === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (s || c) && (u.pathname += "/"), u;
}
function lR(e) {
  return e === "" || e.pathname === "" ? "/" : typeof e == "string" ? Ee(e).pathname : e.pathname;
}
function sR(e) {
  return e instanceof Promise && e._tracked === true;
}
function cR(e) {
  if (!sR(e))
    return e;
  if (e._error)
    throw e._error;
  return e._data;
}
function Ne(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function Oo(e) {
  let t = e.window ? e.window : typeof window < "u" ? window : void 0, n = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u", r = !n;
  j(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let o;
  if (e.mapRouteProperties)
    o = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let S = e.detectErrorBoundary;
    o = (x) => ({ hasErrorBoundary: S(x) });
  } else
    o = Nm;
  let i = {}, l = Ti(e.routes, o, void 0, i), a, u = e.basename || "/", s = G({ v7_fetcherPersist: false, v7_normalizeFormMethod: false, v7_partialHydration: false, v7_prependBasename: false, v7_relativeSplatPath: false }, e.future), c = null, d = /* @__PURE__ */ new Set(), p = null, m = null, y = null, w = e.hydrationData != null, R = Ce(l, e.history.location, u), f = null;
  if (R == null) {
    let S = Se(404, { pathname: e.history.location.pathname }), { matches: x, route: C } = ha(l);
    R = x, f = { [C.id]: S };
  }
  let h, v = R.some((S) => S.route.lazy), E = R.some((S) => S.route.loader);
  if (v)
    h = false;
  else if (!E)
    h = true;
  else if (s.v7_partialHydration) {
    let S = e.hydrationData ? e.hydrationData.loaderData : null, x = e.hydrationData ? e.hydrationData.errors : null;
    h = R.every((C) => C.route.loader && C.route.loader.hydrate !== true && (S && S[C.route.id] !== void 0 || x && x[C.route.id] !== void 0));
  } else
    h = e.hydrationData != null;
  let k, g = { historyAction: e.history.action, location: e.history.location, matches: R, initialized: h, navigation: fa, restoreScrollPosition: e.hydrationData != null ? false : null, preventScrollReset: false, revalidation: "idle", loaderData: e.hydrationData && e.hydrationData.loaderData || {}, actionData: e.hydrationData && e.hydrationData.actionData || null, errors: e.hydrationData && e.hydrationData.errors || f, fetchers: /* @__PURE__ */ new Map(), blockers: /* @__PURE__ */ new Map() }, _ = Z.Pop, P = false, O, z = false, X = /* @__PURE__ */ new Map(), Ue = null, me = false, wt = false, Zl = [], ea = [], _e = /* @__PURE__ */ new Map(), ta = 0, Ri = -1, So = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new Set(), Eo = /* @__PURE__ */ new Map(), xi = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Set(), jr = /* @__PURE__ */ new Map(), br = /* @__PURE__ */ new Map(), ec = false;
  function i1() {
    if (c = e.history.listen((S) => {
      let { action: x, location: C, delta: F } = S;
      if (ec) {
        ec = false;
        return;
      }
      Qt(br.size === 0 || F != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let U = bh({ currentLocation: g.location, nextLocation: C, historyAction: x });
      if (U && F != null) {
        ec = true, e.history.go(F * -1), ra(U, { state: "blocked", location: C, proceed() {
          ra(U, { state: "proceeding", proceed: void 0, reset: void 0, location: C }), e.history.go(F);
        }, reset() {
          let K = new Map(g.blockers);
          K.set(U, er), St({ blockers: K });
        } });
        return;
      }
      return Hr(x, C);
    }), n) {
      xR(t, X);
      let S = () => kR(t, X);
      t.addEventListener("pagehide", S), Ue = () => t.removeEventListener("pagehide", S);
    }
    return g.initialized || Hr(Z.Pop, g.location, { initialHydration: true }), k;
  }
  function l1() {
    c && c(), Ue && Ue(), d.clear(), O && O.abort(), g.fetchers.forEach((S, x) => na(x)), g.blockers.forEach((S, x) => jh(x));
  }
  function a1(S) {
    return d.add(S), () => d.delete(S);
  }
  function St(S, x) {
    x === void 0 && (x = {}), g = G({}, g, S);
    let C = [], F = [];
    s.v7_fetcherPersist && g.fetchers.forEach((U, K) => {
      U.state === "idle" && (Pn.has(K) ? F.push(K) : C.push(K));
    }), [...d].forEach((U) => U(g, { deletedFetchers: F, unstable_viewTransitionOpts: x.viewTransitionOpts, unstable_flushSync: x.flushSync === true })), s.v7_fetcherPersist && (C.forEach((U) => g.fetchers.delete(U)), F.forEach((U) => na(U)));
  }
  function ki(S, x, C) {
    var F, U;
    let { flushSync: K } = C === void 0 ? {} : C, B = g.actionData != null && g.navigation.formMethod != null && It(g.navigation.formMethod) && g.navigation.state === "loading" && ((F = S.state) == null ? void 0 : F._isRedirect) !== true, H;
    x.actionData ? Object.keys(x.actionData).length > 0 ? H = x.actionData : H = null : B ? H = g.actionData : H = null;
    let b = x.loaderData ? vm(g.loaderData, x.loaderData, x.matches || [], x.errors) : g.loaderData, J = g.blockers;
    J.size > 0 && (J = new Map(J), J.forEach((oe, je) => J.set(je, er)));
    let Oe = P === true || g.navigation.formMethod != null && It(g.navigation.formMethod) && ((U = S.state) == null ? void 0 : U._isRedirect) !== true;
    a && (l = a, a = void 0), me || _ === Z.Pop || (_ === Z.Push ? e.history.push(S, S.state) : _ === Z.Replace && e.history.replace(S, S.state));
    let $;
    if (_ === Z.Pop) {
      let oe = X.get(g.location.pathname);
      oe && oe.has(S.pathname) ? $ = { currentLocation: g.location, nextLocation: S } : X.has(S.pathname) && ($ = { currentLocation: S, nextLocation: g.location });
    } else if (z) {
      let oe = X.get(g.location.pathname);
      oe ? oe.add(S.pathname) : (oe = /* @__PURE__ */ new Set([S.pathname]), X.set(g.location.pathname, oe)), $ = { currentLocation: g.location, nextLocation: S };
    }
    St(G({}, x, { actionData: H, loaderData: b, historyAction: _, location: S, initialized: true, navigation: fa, revalidation: "idle", restoreScrollPosition: Bh(S, x.matches || g.matches), preventScrollReset: Oe, blockers: J }), { viewTransitionOpts: $, flushSync: K === true }), _ = Z.Pop, P = false, z = false, me = false, wt = false, Zl = [], ea = [];
  }
  async function Oh(S, x) {
    if (typeof S == "number") {
      e.history.go(S);
      return;
    }
    let C = hc(g.location, g.matches, u, s.v7_prependBasename, S, s.v7_relativeSplatPath, x?.fromRouteId, x?.relative), { path: F, submission: U, error: K } = cm(s.v7_normalizeFormMethod, false, C, x), B = g.location, H = Dn(g.location, F, x && x.state);
    H = G({}, H, e.history.encodeLocation(H));
    let b = x && x.replace != null ? x.replace : void 0, J = Z.Push;
    b === true ? J = Z.Replace : b === false || U != null && It(U.formMethod) && U.formAction === g.location.pathname + g.location.search && (J = Z.Replace);
    let Oe = x && "preventScrollReset" in x ? x.preventScrollReset === true : void 0, $ = (x && x.unstable_flushSync) === true, oe = bh({ currentLocation: B, nextLocation: H, historyAction: J });
    if (oe) {
      ra(oe, { state: "blocked", location: H, proceed() {
        ra(oe, { state: "proceeding", proceed: void 0, reset: void 0, location: H }), Oh(S, x);
      }, reset() {
        let je = new Map(g.blockers);
        je.set(oe, er), St({ blockers: je });
      } });
      return;
    }
    return await Hr(J, H, { submission: U, pendingError: K, preventScrollReset: Oe, replace: x && x.replace, enableViewTransition: x && x.unstable_viewTransition, flushSync: $ });
  }
  function u1() {
    if (tc(), St({ revalidation: "loading" }), g.navigation.state !== "submitting") {
      if (g.navigation.state === "idle") {
        Hr(g.historyAction, g.location, { startUninterruptedRevalidation: true });
        return;
      }
      Hr(_ || g.historyAction, g.navigation.location, { overrideNavigation: g.navigation });
    }
  }
  async function Hr(S, x, C) {
    O && O.abort(), O = null, _ = S, me = (C && C.startUninterruptedRevalidation) === true, y1(g.location, g.matches), P = (C && C.preventScrollReset) === true, z = (C && C.enableViewTransition) === true;
    let F = a || l, U = C && C.overrideNavigation, K = Ce(F, x, u), B = (C && C.flushSync) === true;
    if (!K) {
      let je = Se(404, { pathname: x.pathname }), { matches: At, route: Me } = ha(F);
      nc(), ki(x, { matches: At, loaderData: {}, errors: { [Me.id]: je } }, { flushSync: B });
      return;
    }
    if (g.initialized && !wt && gR(g.location, x) && !(C && C.submission && It(C.submission.formMethod))) {
      ki(x, { matches: K }, { flushSync: B });
      return;
    }
    O = new AbortController();
    let H = Di(e.history, x, O.signal, C && C.submission), b, J;
    if (C && C.pendingError)
      J = { [Po(K).route.id]: C.pendingError };
    else if (C && C.submission && It(C.submission.formMethod)) {
      let je = await s1(H, x, C.submission, K, { replace: C.replace, flushSync: B });
      if (je.shortCircuited)
        return;
      b = je.pendingActionData, J = je.pendingActionError, U = pc(x, C.submission), B = false, H = new Request(H.url, { signal: H.signal });
    }
    let { shortCircuited: Oe, loaderData: $, errors: oe } = await c1(H, x, K, U, C && C.submission, C && C.fetcherSubmission, C && C.replace, C && C.initialHydration === true, B, b, J);
    Oe || (O = null, ki(x, G({ matches: K }, b ? { actionData: b } : {}, { loaderData: $, errors: oe })));
  }
  async function s1(S, x, C, F, U) {
    U === void 0 && (U = {}), tc();
    let K = ER(x, C);
    St({ navigation: K }, { flushSync: U.flushSync === true });
    let B, H = Fi(F, x);
    if (!H.route.action && !H.route.lazy)
      B = { type: re.error, error: Se(405, { method: S.method, pathname: x.pathname, routeId: H.route.id }) };
    else if (B = await $r("action", S, H, F, i, o, u, s.v7_relativeSplatPath), S.signal.aborted)
      return { shortCircuited: true };
    if (rr(B)) {
      let b;
      return U && U.replace != null ? b = U.replace : b = B.location === g.location.pathname + g.location.search, await _i(g, B, { submission: C, replace: b }), { shortCircuited: true };
    }
    if (nr(B)) {
      let b = Po(F, H.route.id);
      return (U && U.replace) !== true && (_ = Z.Push), { pendingActionData: {}, pendingActionError: { [b.route.id]: B.error } };
    }
    if (tr(B))
      throw Se(400, { type: "defer-action" });
    return { pendingActionData: { [H.route.id]: B.data } };
  }
  async function c1(S, x, C, F, U, K, B, H, b, J, Oe) {
    let $ = F || pc(x, U), oe = U || K || wm($), je = a || l, [At, Me] = dm(e.history, g, C, oe, x, s.v7_partialHydration && H === true, wt, Zl, ea, Pn, Eo, Nn, je, u, J, Oe);
    if (nc((ne) => !(C && C.some((pe) => pe.route.id === ne)) || At && At.some((pe) => pe.route.id === ne)), Ri = ++ta, At.length === 0 && Me.length === 0) {
      let ne = zh();
      return ki(x, G({ matches: C, loaderData: {}, errors: Oe || null }, J ? { actionData: J } : {}, ne ? { fetchers: new Map(g.fetchers) } : {}), { flushSync: b }), { shortCircuited: true };
    }
    if (!me && (!s.v7_partialHydration || !H)) {
      Me.forEach((pe) => {
        let cn = g.fetchers.get(pe.key), ia = Li(void 0, cn ? cn.data : void 0);
        g.fetchers.set(pe.key, ia);
      });
      let ne = J || g.actionData;
      St(G({ navigation: $ }, ne ? Object.keys(ne).length === 0 ? { actionData: null } : { actionData: ne } : {}, Me.length > 0 ? { fetchers: new Map(g.fetchers) } : {}), { flushSync: b });
    }
    Me.forEach((ne) => {
      _e.has(ne.key) && Gn(ne.key), ne.controller && _e.set(ne.key, ne.controller);
    });
    let Ro = () => Me.forEach((ne) => Gn(ne.key));
    O && O.signal.addEventListener("abort", Ro);
    let { results: rc, loaderResults: xo, fetcherResults: qn } = await Mh(g.matches, C, At, Me, S);
    if (S.signal.aborted)
      return { shortCircuited: true };
    O && O.signal.removeEventListener("abort", Ro), Me.forEach((ne) => _e.delete(ne.key));
    let Br = ym(rc);
    if (Br) {
      if (Br.idx >= At.length) {
        let ne = Me[Br.idx - At.length].key;
        Nn.add(ne);
      }
      return await _i(g, Br.result, { replace: B }), { shortCircuited: true };
    }
    let { loaderData: oc, errors: ic } = mm(g, C, At, xo, Oe, Me, qn, jr);
    jr.forEach((ne, pe) => {
      ne.subscribe((cn) => {
        (cn || ne.done) && jr.delete(pe);
      });
    });
    let lc = zh(), ko = Uh(Ri), oa = lc || ko || Me.length > 0;
    return G({ loaderData: oc, errors: ic }, oa ? { fetchers: new Map(g.fetchers) } : {});
  }
  function d1(S, x, C, F) {
    if (r)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    _e.has(S) && Gn(S);
    let U = (F && F.unstable_flushSync) === true, K = a || l, B = hc(g.location, g.matches, u, s.v7_prependBasename, C, s.v7_relativeSplatPath, x, F?.relative), H = Ce(K, B, u);
    if (!H) {
      Ci(S, x, Se(404, { pathname: B }), { flushSync: U });
      return;
    }
    let { path: b, submission: J, error: Oe } = cm(s.v7_normalizeFormMethod, true, B, F);
    if (Oe) {
      Ci(S, x, Oe, { flushSync: U });
      return;
    }
    let $ = Fi(H, b);
    if (P = (F && F.preventScrollReset) === true, J && It(J.formMethod)) {
      f1(S, x, b, $, H, U, J);
      return;
    }
    Eo.set(S, { routeId: x, path: b }), p1(S, x, b, $, H, U, J);
  }
  async function f1(S, x, C, F, U, K, B) {
    if (tc(), Eo.delete(S), !F.route.action && !F.route.lazy) {
      let pe = Se(405, { method: B.formMethod, pathname: C, routeId: x });
      Ci(S, x, pe, { flushSync: K });
      return;
    }
    let H = g.fetchers.get(S);
    Xn(S, RR(B, H), { flushSync: K });
    let b = new AbortController(), J = Di(e.history, C, b.signal, B);
    _e.set(S, b);
    let Oe = ta, $ = await $r("action", J, F, U, i, o, u, s.v7_relativeSplatPath);
    if (J.signal.aborted) {
      _e.get(S) === b && _e.delete(S);
      return;
    }
    if (s.v7_fetcherPersist && Pn.has(S)) {
      if (rr($) || nr($)) {
        Xn(S, Zn(void 0));
        return;
      }
    } else {
      if (rr($))
        if (_e.delete(S), Ri > Oe) {
          Xn(S, Zn(void 0));
          return;
        } else
          return Nn.add(S), Xn(S, Li(B)), _i(g, $, { fetcherSubmission: B });
      if (nr($)) {
        Ci(S, x, $.error);
        return;
      }
    }
    if (tr($))
      throw Se(400, { type: "defer-action" });
    let oe = g.navigation.location || g.location, je = Di(e.history, oe, b.signal), At = a || l, Me = g.navigation.state !== "idle" ? Ce(At, g.navigation.location, u) : g.matches;
    j(Me, "Didn't find any matches after fetcher action");
    let Ro = ++ta;
    So.set(S, Ro);
    let rc = Li(B, $.data);
    g.fetchers.set(S, rc);
    let [xo, qn] = dm(e.history, g, Me, B, oe, false, wt, Zl, ea, Pn, Eo, Nn, At, u, { [F.route.id]: $.data }, void 0);
    qn.filter((pe) => pe.key !== S).forEach((pe) => {
      let cn = pe.key, ia = g.fetchers.get(cn), w1 = Li(void 0, ia ? ia.data : void 0);
      g.fetchers.set(cn, w1), _e.has(cn) && Gn(cn), pe.controller && _e.set(cn, pe.controller);
    }), St({ fetchers: new Map(g.fetchers) });
    let Br = () => qn.forEach((pe) => Gn(pe.key));
    b.signal.addEventListener("abort", Br);
    let { results: oc, loaderResults: ic, fetcherResults: lc } = await Mh(g.matches, Me, xo, qn, je);
    if (b.signal.aborted)
      return;
    b.signal.removeEventListener("abort", Br), So.delete(S), _e.delete(S), qn.forEach((pe) => _e.delete(pe.key));
    let ko = ym(oc);
    if (ko) {
      if (ko.idx >= xo.length) {
        let pe = qn[ko.idx - xo.length].key;
        Nn.add(pe);
      }
      return _i(g, ko.result);
    }
    let { loaderData: oa, errors: ne } = mm(g, g.matches, xo, ic, void 0, qn, lc, jr);
    if (g.fetchers.has(S)) {
      let pe = Zn($.data);
      g.fetchers.set(S, pe);
    }
    Uh(Ro), g.navigation.state === "loading" && Ro > Ri ? (j(_, "Expected pending action"), O && O.abort(), ki(g.navigation.location, { matches: Me, loaderData: oa, errors: ne, fetchers: new Map(g.fetchers) })) : (St({ errors: ne, loaderData: vm(g.loaderData, oa, Me, ne), fetchers: new Map(g.fetchers) }), wt = false);
  }
  async function p1(S, x, C, F, U, K, B) {
    let H = g.fetchers.get(S);
    Xn(S, Li(B, H ? H.data : void 0), { flushSync: K });
    let b = new AbortController(), J = Di(e.history, C, b.signal);
    _e.set(S, b);
    let Oe = ta, $ = await $r("loader", J, F, U, i, o, u, s.v7_relativeSplatPath);
    if (tr($) && ($ = await Mm($, J.signal, true) || $), _e.get(S) === b && _e.delete(S), !J.signal.aborted) {
      if (Pn.has(S)) {
        Xn(S, Zn(void 0));
        return;
      }
      if (rr($))
        if (Ri > Oe) {
          Xn(S, Zn(void 0));
          return;
        } else {
          Nn.add(S), await _i(g, $);
          return;
        }
      if (nr($)) {
        Ci(S, x, $.error);
        return;
      }
      j(!tr($), "Unhandled fetcher deferred data"), Xn(S, Zn($.data));
    }
  }
  async function _i(S, x, C) {
    let { submission: F, fetcherSubmission: U, replace: K } = C === void 0 ? {} : C;
    x.revalidate && (wt = true);
    let B = Dn(S.location, x.location, { _isRedirect: true });
    if (j(B, "Expected a location on the redirect navigation"), n) {
      let oe = false;
      if (x.reloadDocument)
        oe = true;
      else if (Cm.test(x.location)) {
        let je = e.history.createURL(x.location);
        oe = je.origin !== t.location.origin || be(je.pathname, u) == null;
      }
      if (oe) {
        K ? t.location.replace(x.location) : t.location.assign(x.location);
        return;
      }
    }
    O = null;
    let H = K === true ? Z.Replace : Z.Push, { formMethod: b, formAction: J, formEncType: Oe } = S.navigation;
    !F && !U && b && J && Oe && (F = wm(S.navigation));
    let $ = F || U;
    if (mR.has(x.status) && $ && It($.formMethod))
      await Hr(H, B, { submission: G({}, $, { formAction: x.location }), preventScrollReset: P });
    else {
      let oe = pc(B, F);
      await Hr(H, B, { overrideNavigation: oe, fetcherSubmission: U, preventScrollReset: P });
    }
  }
  async function Mh(S, x, C, F, U) {
    let K = await Promise.all([...C.map((b) => $r("loader", U, b, x, i, o, u, s.v7_relativeSplatPath)), ...F.map((b) => b.matches && b.match && b.controller ? $r("loader", Di(e.history, b.path, b.controller.signal), b.match, b.matches, i, o, u, s.v7_relativeSplatPath) : { type: re.error, error: Se(404, { pathname: b.path }) })]), B = K.slice(0, C.length), H = K.slice(C.length);
    return await Promise.all([gm(S, C, B, B.map(() => U.signal), false, g.loaderData), gm(S, F.map((b) => b.match), H, F.map((b) => b.controller ? b.controller.signal : null), true)]), { results: K, loaderResults: B, fetcherResults: H };
  }
  function tc() {
    wt = true, Zl.push(...nc()), Eo.forEach((S, x) => {
      _e.has(x) && (ea.push(x), Gn(x));
    });
  }
  function Xn(S, x, C) {
    C === void 0 && (C = {}), g.fetchers.set(S, x), St({ fetchers: new Map(g.fetchers) }, { flushSync: (C && C.flushSync) === true });
  }
  function Ci(S, x, C, F) {
    F === void 0 && (F = {});
    let U = Po(g.matches, x);
    na(S), St({ errors: { [U.route.id]: C }, fetchers: new Map(g.fetchers) }, { flushSync: (F && F.flushSync) === true });
  }
  function Ah(S) {
    return s.v7_fetcherPersist && (xi.set(S, (xi.get(S) || 0) + 1), Pn.has(S) && Pn.delete(S)), g.fetchers.get(S) || wa;
  }
  function na(S) {
    let x = g.fetchers.get(S);
    _e.has(S) && !(x && x.state === "loading" && So.has(S)) && Gn(S), Eo.delete(S), So.delete(S), Nn.delete(S), Pn.delete(S), g.fetchers.delete(S);
  }
  function h1(S) {
    if (s.v7_fetcherPersist) {
      let x = (xi.get(S) || 0) - 1;
      x <= 0 ? (xi.delete(S), Pn.add(S)) : xi.set(S, x);
    } else
      na(S);
    St({ fetchers: new Map(g.fetchers) });
  }
  function Gn(S) {
    let x = _e.get(S);
    j(x, "Expected fetch controller: " + S), x.abort(), _e.delete(S);
  }
  function Ih(S) {
    for (let x of S) {
      let C = Ah(x), F = Zn(C.data);
      g.fetchers.set(x, F);
    }
  }
  function zh() {
    let S = [], x = false;
    for (let C of Nn) {
      let F = g.fetchers.get(C);
      j(F, "Expected fetcher: " + C), F.state === "loading" && (Nn.delete(C), S.push(C), x = true);
    }
    return Ih(S), x;
  }
  function Uh(S) {
    let x = [];
    for (let [C, F] of So)
      if (F < S) {
        let U = g.fetchers.get(C);
        j(U, "Expected fetcher: " + C), U.state === "loading" && (Gn(C), So.delete(C), x.push(C));
      }
    return Ih(x), x.length > 0;
  }
  function m1(S, x) {
    let C = g.blockers.get(S) || er;
    return br.get(S) !== x && br.set(S, x), C;
  }
  function jh(S) {
    g.blockers.delete(S), br.delete(S);
  }
  function ra(S, x) {
    let C = g.blockers.get(S) || er;
    j(C.state === "unblocked" && x.state === "blocked" || C.state === "blocked" && x.state === "blocked" || C.state === "blocked" && x.state === "proceeding" || C.state === "blocked" && x.state === "unblocked" || C.state === "proceeding" && x.state === "unblocked", "Invalid blocker state transition: " + C.state + " -> " + x.state);
    let F = new Map(g.blockers);
    F.set(S, x), St({ blockers: F });
  }
  function bh(S) {
    let { currentLocation: x, nextLocation: C, historyAction: F } = S;
    if (br.size === 0)
      return;
    br.size > 1 && Qt(false, "A router only supports one blocker at a time");
    let U = Array.from(br.entries()), [K, B] = U[U.length - 1], H = g.blockers.get(K);
    if (!(H && H.state === "proceeding") && B({ currentLocation: x, nextLocation: C, historyAction: F }))
      return K;
  }
  function nc(S) {
    let x = [];
    return jr.forEach((C, F) => {
      (!S || S(F)) && (C.cancel(), x.push(F), jr.delete(F));
    }), x;
  }
  function v1(S, x, C) {
    if (p = S, y = x, m = C || null, !w && g.navigation === fa) {
      w = true;
      let F = Bh(g.location, g.matches);
      F != null && St({ restoreScrollPosition: F });
    }
    return () => {
      p = null, y = null, m = null;
    };
  }
  function Hh(S, x) {
    return m && m(S, x.map((F) => ga(F, g.loaderData))) || S.key;
  }
  function y1(S, x) {
    if (p && y) {
      let C = Hh(S, x);
      p[C] = y();
    }
  }
  function Bh(S, x) {
    if (p) {
      let C = Hh(S, x), F = p[C];
      if (typeof F == "number")
        return F;
    }
    return null;
  }
  function g1(S) {
    i = {}, a = Ti(S, o, void 0, i);
  }
  return k = { get basename() {
    return u;
  }, get future() {
    return s;
  }, get state() {
    return g;
  }, get routes() {
    return l;
  }, get window() {
    return t;
  }, initialize: i1, subscribe: a1, enableScrollRestoration: v1, navigate: Oh, fetch: d1, revalidate: u1, createHref: (S) => e.history.createHref(S), encodeLocation: (S) => e.history.encodeLocation(S), getFetcher: Ah, deleteFetcher: h1, dispose: l1, getBlocker: m1, deleteBlocker: jh, _internalFetchControllers: _e, _internalActiveDeferreds: jr, _internalSetRoutes: g1 }, k;
}
function yc(e, t) {
  j(e.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let n = {}, r = (t ? t.basename : null) || "/", o;
  if (t != null && t.mapRouteProperties)
    o = t.mapRouteProperties;
  else if (t != null && t.detectErrorBoundary) {
    let p = t.detectErrorBoundary;
    o = (m) => ({ hasErrorBoundary: p(m) });
  } else
    o = Nm;
  let i = G({ v7_relativeSplatPath: false, v7_throwAbortReason: false }, t ? t.future : null), l = Ti(e, o, void 0, n);
  async function a(p, m) {
    let { requestContext: y } = m === void 0 ? {} : m, w = new URL(p.url), R = p.method, f = Dn("", Le(w), null, "default"), h = Ce(l, f, r);
    if (!vc(R) && R !== "HEAD") {
      let E = Se(405, { method: R }), { matches: k, route: g } = ha(l);
      return { basename: r, location: f, matches: k, loaderData: {}, actionData: null, errors: { [g.id]: E }, statusCode: E.status, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    } else if (!h) {
      let E = Se(404, { pathname: f.pathname }), { matches: k, route: g } = ha(l);
      return { basename: r, location: f, matches: k, loaderData: {}, actionData: null, errors: { [g.id]: E }, statusCode: E.status, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    }
    let v = await s(p, f, h, y);
    return Do(v) ? v : G({ location: f, basename: r }, v);
  }
  async function u(p, m) {
    let { routeId: y, requestContext: w } = m === void 0 ? {} : m, R = new URL(p.url), f = p.method, h = Dn("", Le(R), null, "default"), v = Ce(l, h, r);
    if (!vc(f) && f !== "HEAD" && f !== "OPTIONS")
      throw Se(405, { method: f });
    if (!v)
      throw Se(404, { pathname: h.pathname });
    let E = y ? v.find((P) => P.route.id === y) : Fi(v, h);
    if (y && !E)
      throw Se(403, { pathname: h.pathname, routeId: y });
    if (!E)
      throw Se(404, { pathname: h.pathname });
    let k = await s(p, h, v, w, E);
    if (Do(k))
      return k;
    let g = k.errors ? Object.values(k.errors)[0] : void 0;
    if (g !== void 0)
      throw g;
    if (k.actionData)
      return Object.values(k.actionData)[0];
    if (k.loaderData) {
      var _;
      let P = Object.values(k.loaderData)[0];
      return (_ = k.activeDeferreds) != null && _[E.route.id] && (P[Oi] = k.activeDeferreds[E.route.id]), P;
    }
  }
  async function s(p, m, y, w, R) {
    j(p.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (It(p.method.toLowerCase()))
        return await c(p, y, R || Fi(y, m), w, R != null);
      let f = await d(p, y, w, R);
      return Do(f) ? f : G({}, f, { actionData: null, actionHeaders: {} });
    } catch (f) {
      if (SR(f)) {
        if (f.type === re.error)
          throw f.response;
        return f.response;
      }
      if (wR(f))
        return f;
      throw f;
    }
  }
  async function c(p, m, y, w, R) {
    let f;
    if (!y.route.action && !y.route.lazy) {
      let E = Se(405, { method: p.method, pathname: new URL(p.url).pathname, routeId: y.route.id });
      if (R)
        throw E;
      f = { type: re.error, error: E };
    } else
      f = await $r("action", p, y, m, n, o, r, i.v7_relativeSplatPath, { isStaticRequest: true, isRouteRequest: R, requestContext: w }), p.signal.aborted && sm(p, R, i);
    if (rr(f))
      throw new Response(null, { status: f.status, headers: { Location: f.location } });
    if (tr(f)) {
      let E = Se(400, { type: "defer-action" });
      if (R)
        throw E;
      f = { type: re.error, error: E };
    }
    if (R) {
      if (nr(f))
        throw f.error;
      return { matches: [y], loaderData: {}, actionData: { [y.route.id]: f.data }, errors: null, statusCode: 200, loaderHeaders: {}, actionHeaders: {}, activeDeferreds: null };
    }
    if (nr(f)) {
      let E = Po(m, y.route.id), k = await d(p, m, w, void 0, { [E.route.id]: f.error });
      return G({}, k, { statusCode: Ne(f.error) ? f.error.status : 500, actionData: null, actionHeaders: G({}, f.headers ? { [y.route.id]: f.headers } : {}) });
    }
    let h = new Request(p.url, { headers: p.headers, redirect: p.redirect, signal: p.signal }), v = await d(h, m, w);
    return G({}, v, f.statusCode ? { statusCode: f.statusCode } : {}, { actionData: { [y.route.id]: f.data }, actionHeaders: G({}, f.headers ? { [y.route.id]: f.headers } : {}) });
  }
  async function d(p, m, y, w, R) {
    let f = w != null;
    if (f && !(w != null && w.route.loader) && !(w != null && w.route.lazy))
      throw Se(400, { method: p.method, pathname: new URL(p.url).pathname, routeId: w?.route.id });
    let v = (w ? [w] : Dm(m, Object.keys(R || {})[0])).filter((P) => P.route.loader || P.route.lazy);
    if (v.length === 0)
      return { matches: m, loaderData: m.reduce((P, O) => Object.assign(P, { [O.route.id]: null }), {}), errors: R || null, statusCode: 200, loaderHeaders: {}, activeDeferreds: null };
    let E = await Promise.all([...v.map((P) => $r("loader", p, P, m, n, o, r, i.v7_relativeSplatPath, { isStaticRequest: true, isRouteRequest: f, requestContext: y }))]);
    p.signal.aborted && sm(p, f, i);
    let k = /* @__PURE__ */ new Map(), g = Tm(m, v, E, R, k), _ = new Set(v.map((P) => P.route.id));
    return m.forEach((P) => {
      _.has(P.route.id) || (g.loaderData[P.route.id] = null);
    }), G({}, g, { matches: m, activeDeferreds: k.size > 0 ? Object.fromEntries(k.entries()) : null });
  }
  return { dataRoutes: l, query: a, queryRoute: u };
}
function gc(e, t, n) {
  return G({}, t, { statusCode: Ne(n) ? n.status : 500, errors: { [t._deepestRenderedBoundaryId || e[0].id]: n } });
}
function sm(e, t, n) {
  if (n.v7_throwAbortReason && e.signal.reason !== void 0)
    throw e.signal.reason;
  let r = t ? "queryRoute" : "query";
  throw new Error(r + "() call aborted: " + e.method + " " + e.url);
}
function vR(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function hc(e, t, n, r, o, i, l, a) {
  let u, s;
  if (l) {
    u = [];
    for (let d of t)
      if (u.push(d), d.route.id === l) {
        s = d;
        break;
      }
  } else
    u = t, s = t[t.length - 1];
  let c = Fo(o || ".", To(u, i), be(e.pathname, n) || e.pathname, a === "path");
  return o == null && (c.search = e.search, c.hash = e.hash), (o == null || o === "" || o === ".") && s && s.route.index && !wc(c.search) && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r && n !== "/" && (c.pathname = c.pathname === "/" ? n : Et([n, c.pathname])), Le(c);
}
function cm(e, t, n, r) {
  if (!r || !vR(r))
    return { path: n };
  if (r.formMethod && !vc(r.formMethod))
    return { path: n, error: Se(405, { method: r.formMethod }) };
  let o = () => ({ path: n, error: Se(400, { type: "invalid-body" }) }), i = r.formMethod || "get", l = e ? i.toUpperCase() : i.toLowerCase(), a = Fm(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!It(l))
        return o();
      let p = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? Array.from(r.body.entries()).reduce((m, y) => {
        let [w, R] = y;
        return "" + m + w + "=" + R + `
`;
      }, "") : String(r.body);
      return { path: n, submission: { formMethod: l, formAction: a, formEncType: r.formEncType, formData: void 0, json: void 0, text: p } };
    } else if (r.formEncType === "application/json") {
      if (!It(l))
        return o();
      try {
        let p = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return { path: n, submission: { formMethod: l, formAction: a, formEncType: r.formEncType, formData: void 0, json: p, text: void 0 } };
      } catch {
        return o();
      }
    }
  }
  j(typeof FormData == "function", "FormData is not available in this environment");
  let u, s;
  if (r.formData)
    u = mc(r.formData), s = r.formData;
  else if (r.body instanceof FormData)
    u = mc(r.body), s = r.body;
  else if (r.body instanceof URLSearchParams)
    u = r.body, s = hm(u);
  else if (r.body == null)
    u = new URLSearchParams(), s = new FormData();
  else
    try {
      u = new URLSearchParams(r.body), s = hm(u);
    } catch {
      return o();
    }
  let c = { formMethod: l, formAction: a, formEncType: r && r.formEncType || "application/x-www-form-urlencoded", formData: s, json: void 0, text: void 0 };
  if (It(c.formMethod))
    return { path: n, submission: c };
  let d = Ee(n);
  return t && d.search && wc(d.search) && u.append("index", ""), d.search = "?" + u, { path: Le(d), submission: c };
}
function Dm(e, t) {
  let n = e;
  if (t) {
    let r = e.findIndex((o) => o.route.id === t);
    r >= 0 && (n = e.slice(0, r));
  }
  return n;
}
function dm(e, t, n, r, o, i, l, a, u, s, c, d, p, m, y, w) {
  let R = w ? Object.values(w)[0] : y ? Object.values(y)[0] : void 0, f = e.createURL(t.location), h = e.createURL(o), v = w ? Object.keys(w)[0] : void 0, k = Dm(n, v).filter((_, P) => {
    let { route: O } = _;
    if (O.lazy)
      return true;
    if (O.loader == null)
      return false;
    if (i)
      return O.loader.hydrate ? true : t.loaderData[O.id] === void 0 && (!t.errors || t.errors[O.id] === void 0);
    if (yR(t.loaderData, t.matches[P], _) || a.some((Ue) => Ue === _.route.id))
      return true;
    let z = t.matches[P], X = _;
    return fm(_, G({ currentUrl: f, currentParams: z.params, nextUrl: h, nextParams: X.params }, r, { actionResult: R, defaultShouldRevalidate: l || f.pathname + f.search === h.pathname + h.search || f.search !== h.search || Lm(z, X) }));
  }), g = [];
  return c.forEach((_, P) => {
    if (i || !n.some((me) => me.route.id === _.routeId) || s.has(P))
      return;
    let O = Ce(p, _.path, m);
    if (!O) {
      g.push({ key: P, routeId: _.routeId, path: _.path, matches: null, match: null, controller: null });
      return;
    }
    let z = t.fetchers.get(P), X = Fi(O, _.path), Ue = false;
    d.has(P) ? Ue = false : u.includes(P) ? Ue = true : z && z.state !== "idle" && z.data === void 0 ? Ue = l : Ue = fm(X, G({ currentUrl: f, currentParams: t.matches[t.matches.length - 1].params, nextUrl: h, nextParams: n[n.length - 1].params }, r, { actionResult: R, defaultShouldRevalidate: l })), Ue && g.push({ key: P, routeId: _.routeId, path: _.path, matches: O, match: X, controller: new AbortController() });
  }), [k, g];
}
function yR(e, t, n) {
  let r = !t || n.route.id !== t.route.id, o = e[n.route.id] === void 0;
  return r || o;
}
function Lm(e, t) {
  let n = e.route.path;
  return e.pathname !== t.pathname || n != null && n.endsWith("*") && e.params["*"] !== t.params["*"];
}
function fm(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean")
      return n;
  }
  return t.defaultShouldRevalidate;
}
async function pm(e, t, n) {
  if (!e.lazy)
    return;
  let r = await e.lazy();
  if (!e.lazy)
    return;
  let o = n[e.id];
  j(o, "No route found in manifest");
  let i = {};
  for (let l in r) {
    let u = o[l] !== void 0 && l !== "hasErrorBoundary";
    Qt(!u, 'Route "' + o.id + '" has a static property "' + l + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + l + '" will be ignored.')), !u && !$1.has(l) && (i[l] = r[l]);
  }
  Object.assign(o, i), Object.assign(o, G({}, t(o), { lazy: void 0 }));
}
async function $r(e, t, n, r, o, i, l, a, u) {
  u === void 0 && (u = {});
  let s, c, d, p = (w) => {
    let R, f = new Promise((h, v) => R = v);
    return d = () => R(), t.signal.addEventListener("abort", d), Promise.race([w({ request: t, params: n.params, context: u.requestContext }), f]);
  };
  try {
    let w = n.route[e];
    if (n.route.lazy)
      if (w) {
        let R, f = await Promise.all([p(w).catch((h) => {
          R = h;
        }), pm(n.route, i, o)]);
        if (R)
          throw R;
        c = f[0];
      } else if (await pm(n.route, i, o), w = n.route[e], w)
        c = await p(w);
      else if (e === "action") {
        let R = new URL(t.url), f = R.pathname + R.search;
        throw Se(405, { method: t.method, pathname: f, routeId: n.route.id });
      } else
        return { type: re.data, data: void 0 };
    else if (w)
      c = await p(w);
    else {
      let R = new URL(t.url), f = R.pathname + R.search;
      throw Se(404, { pathname: f });
    }
    j(c !== void 0, "You defined " + (e === "action" ? "an action" : "a loader") + " for route " + ('"' + n.route.id + "\" but didn't return anything from your `" + e + "` ") + "function. Please return a value or `null`.");
  } catch (w) {
    s = re.error, c = w;
  } finally {
    d && t.signal.removeEventListener("abort", d);
  }
  if (Do(c)) {
    let w = c.status;
    if (hR.has(w)) {
      let f = c.headers.get("Location");
      if (j(f, "Redirects returned/thrown from loaders/actions must have a Location header"), !Cm.test(f))
        f = hc(new URL(t.url), r.slice(0, r.indexOf(n) + 1), l, true, f, a);
      else if (!u.isStaticRequest) {
        let h = new URL(t.url), v = f.startsWith("//") ? new URL(h.protocol + f) : new URL(f), E = be(v.pathname, l) != null;
        v.origin === h.origin && E && (f = v.pathname + v.search + v.hash);
      }
      if (u.isStaticRequest)
        throw c.headers.set("Location", f), c;
      return { type: re.redirect, status: w, location: f, revalidate: c.headers.get("X-Remix-Revalidate") !== null, reloadDocument: c.headers.get("X-Remix-Reload-Document") !== null };
    }
    if (u.isRouteRequest)
      throw { type: s === re.error ? re.error : re.data, response: c };
    let R;
    try {
      let f = c.headers.get("Content-Type");
      f && /\bapplication\/json\b/.test(f) ? c.body == null ? R = null : R = await c.json() : R = await c.text();
    } catch (f) {
      return { type: re.error, error: f };
    }
    return s === re.error ? { type: s, error: new Ln(w, c.statusText, R), headers: c.headers } : { type: re.data, data: R, statusCode: c.status, headers: c.headers };
  }
  if (s === re.error)
    return { type: s, error: c };
  if (Om(c)) {
    var m, y;
    return { type: re.deferred, deferredData: c, statusCode: (m = c.init) == null ? void 0 : m.status, headers: ((y = c.init) == null ? void 0 : y.headers) && new Headers(c.init.headers) };
  }
  return { type: re.data, data: c };
}
function Di(e, t, n, r) {
  let o = e.createURL(Fm(t)).toString(), i = { signal: n };
  if (r && It(r.formMethod)) {
    let { formMethod: l, formEncType: a } = r;
    i.method = l.toUpperCase(), a === "application/json" ? (i.headers = new Headers({ "Content-Type": a }), i.body = JSON.stringify(r.json)) : a === "text/plain" ? i.body = r.text : a === "application/x-www-form-urlencoded" && r.formData ? i.body = mc(r.formData) : i.body = r.formData;
  }
  return new Request(o, i);
}
function mc(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function hm(e) {
  let t = new FormData();
  for (let [n, r] of e.entries())
    t.append(n, r);
  return t;
}
function Tm(e, t, n, r, o) {
  let i = {}, l = null, a, u = false, s = {};
  return n.forEach((c, d) => {
    let p = t[d].route.id;
    if (j(!rr(c), "Cannot handle redirect results in processLoaderData"), nr(c)) {
      let m = Po(e, p), y = c.error;
      r && (y = Object.values(r)[0], r = void 0), l = l || {}, l[m.route.id] == null && (l[m.route.id] = y), i[p] = void 0, u || (u = true, a = Ne(c.error) ? c.error.status : 500), c.headers && (s[p] = c.headers);
    } else
      tr(c) ? (o.set(p, c.deferredData), i[p] = c.deferredData.data) : i[p] = c.data, c.statusCode != null && c.statusCode !== 200 && !u && (a = c.statusCode), c.headers && (s[p] = c.headers);
  }), r && (l = r, i[Object.keys(r)[0]] = void 0), { loaderData: i, errors: l, statusCode: a || 200, loaderHeaders: s };
}
function mm(e, t, n, r, o, i, l, a) {
  let { loaderData: u, errors: s } = Tm(t, n, r, o, a);
  for (let c = 0; c < i.length; c++) {
    let { key: d, match: p, controller: m } = i[c];
    j(l !== void 0 && l[c] !== void 0, "Did not find corresponding fetcher result");
    let y = l[c];
    if (!(m && m.signal.aborted))
      if (nr(y)) {
        let w = Po(e.matches, p?.route.id);
        s && s[w.route.id] || (s = G({}, s, { [w.route.id]: y.error })), e.fetchers.delete(d);
      } else if (rr(y))
        j(false, "Unhandled fetcher revalidation redirect");
      else if (tr(y))
        j(false, "Unhandled fetcher deferred data");
      else {
        let w = Zn(y.data);
        e.fetchers.set(d, w);
      }
  }
  return { loaderData: u, errors: s };
}
function vm(e, t, n, r) {
  let o = G({}, t);
  for (let i of n) {
    let l = i.route.id;
    if (t.hasOwnProperty(l) ? t[l] !== void 0 && (o[l] = t[l]) : e[l] !== void 0 && i.route.loader && (o[l] = e[l]), r && r.hasOwnProperty(l))
      break;
  }
  return o;
}
function Po(e, t) {
  return (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e]).reverse().find((r) => r.route.hasErrorBoundary === true) || e[0];
}
function ha(e) {
  let t = e.length === 1 ? e[0] : e.find((n) => n.index || !n.path || n.path === "/") || { id: "__shim-error-route__" };
  return { matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }], route: t };
}
function Se(e, t) {
  let { pathname: n, routeId: r, method: o, type: i } = t === void 0 ? {} : t, l = "Unknown Server Error", a = "Unknown @remix-run/router error";
  return e === 400 ? (l = "Bad Request", o && n && r ? a = "You made a " + o + ' request to "' + n + '" but ' + ('did not provide a `loader` for route "' + r + '", ') + "so there is no way to handle the request." : i === "defer-action" ? a = "defer() is not supported in actions" : i === "invalid-body" && (a = "Unable to encode submission body")) : e === 403 ? (l = "Forbidden", a = 'Route "' + r + '" does not match URL "' + n + '"') : e === 404 ? (l = "Not Found", a = 'No route matches URL "' + n + '"') : e === 405 && (l = "Method Not Allowed", o && n && r ? a = "You made a " + o.toUpperCase() + ' request to "' + n + '" but ' + ('did not provide an `action` for route "' + r + '", ') + "so there is no way to handle the request." : o && (a = 'Invalid request method "' + o.toUpperCase() + '"')), new Ln(e || 500, l, new Error(a), true);
}
function ym(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (rr(n))
      return { result: n, idx: t };
  }
}
function Fm(e) {
  let t = typeof e == "string" ? Ee(e) : e;
  return Le(G({}, t, { hash: "" }));
}
function gR(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search ? false : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? true : t.hash !== "";
}
function tr(e) {
  return e.type === re.deferred;
}
function nr(e) {
  return e.type === re.error;
}
function rr(e) {
  return (e && e.type) === re.redirect;
}
function Om(e) {
  let t = e;
  return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function";
}
function Do(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function wR(e) {
  if (!Do(e))
    return false;
  let t = e.status, n = e.headers.get("Location");
  return t >= 300 && t <= 399 && n != null;
}
function SR(e) {
  return e && Do(e.response) && (e.type === re.data || e.type === re.error);
}
function vc(e) {
  return pR.has(e.toLowerCase());
}
function It(e) {
  return dR.has(e.toLowerCase());
}
async function gm(e, t, n, r, o, i) {
  for (let l = 0; l < n.length; l++) {
    let a = n[l], u = t[l];
    if (!u)
      continue;
    let s = e.find((d) => d.route.id === u.route.id), c = s != null && !Lm(s, u) && (i && i[u.route.id]) !== void 0;
    if (tr(a) && (o || c)) {
      let d = r[l];
      j(d, "Expected an AbortSignal for revalidating fetcher deferred result"), await Mm(a, d, o).then((p) => {
        p && (n[l] = p || n[l]);
      });
    }
  }
}
async function Mm(e, t, n) {
  if (n === void 0 && (n = false), !await e.deferredData.resolveData(t)) {
    if (n)
      try {
        return { type: re.data, data: e.deferredData.unwrappedData };
      } catch (o) {
        return { type: re.error, error: o };
      }
    return { type: re.data, data: e.deferredData.data };
  }
}
function wc(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Fi(e, t) {
  let n = typeof t == "string" ? Ee(t).search : t.search;
  if (e[e.length - 1].route.index && wc(n || ""))
    return e[e.length - 1];
  let r = xm(e);
  return r[r.length - 1];
}
function wm(e) {
  let { formMethod: t, formAction: n, formEncType: r, text: o, formData: i, json: l } = e;
  if (!(!t || !n || !r)) {
    if (o != null)
      return { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: void 0, text: o };
    if (i != null)
      return { formMethod: t, formAction: n, formEncType: r, formData: i, json: void 0, text: void 0 };
    if (l !== void 0)
      return { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: l, text: void 0 };
  }
}
function pc(e, t) {
  return t ? { state: "loading", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text } : { state: "loading", location: e, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 };
}
function ER(e, t) {
  return { state: "submitting", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text };
}
function Li(e, t) {
  return e ? { state: "loading", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t } : { state: "loading", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: t };
}
function RR(e, t) {
  return { state: "submitting", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t ? t.data : void 0 };
}
function Zn(e) {
  return { state: "idle", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: e };
}
function xR(e, t) {
  try {
    let n = e.sessionStorage.getItem(Pm);
    if (n) {
      let r = JSON.parse(n);
      for (let [o, i] of Object.entries(r || {}))
        i && Array.isArray(i) && t.set(o, new Set(i || []));
    }
  } catch {
  }
}
function kR(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, o] of t)
      n[r] = [...o];
    try {
      e.sessionStorage.setItem(Pm, JSON.stringify(n));
    } catch (r) {
      Qt(false, "Failed to save applied view transitions in sessionStorage (" + r + ").");
    }
  }
}
var Z;
var lm;
var re;
var $1;
var Q1;
var Y1;
var J1;
var X1;
var G1;
var q1;
var um;
var Et;
var km;
var aR;
var uR;
var pn;
var Yt;
var pa;
var Kr;
var Tn;
var Qr;
var Ln;
var _m;
var dR;
var fR;
var pR;
var hR;
var mR;
var fa;
var wa;
var er;
var Cm;
var Nm;
var Pm;
var Oi;
var Fn = te(() => {
  (function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
  })(Z || (Z = {}));
  lm = "popstate";
  (function(e) {
    e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
  })(re || (re = {}));
  $1 = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
  Q1 = /^:[\w-]+$/, Y1 = 3, J1 = 2, X1 = 1, G1 = 10, q1 = -2, um = (e) => e === "*";
  Et = (e) => e.join("/").replace(/\/\/+/g, "/"), km = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), aR = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, uR = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, pn = function(t, n) {
    n === void 0 && (n = {});
    let r = typeof n == "number" ? { status: n } : n, o = new Headers(r.headers);
    return o.has("Content-Type") || o.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(t), G({}, r, { headers: o }));
  }, Yt = class extends Error {
  }, pa = class {
    constructor(t, n) {
      this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], j(t && typeof t == "object" && !Array.isArray(t), "defer() only accepts plain objects");
      let r;
      this.abortPromise = new Promise((i, l) => r = l), this.controller = new AbortController();
      let o = () => r(new Yt("Deferred data aborted"));
      this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", o), this.controller.signal.addEventListener("abort", o), this.data = Object.entries(t).reduce((i, l) => {
        let [a, u] = l;
        return Object.assign(i, { [a]: this.trackPromise(a, u) });
      }, {}), this.done && this.unlistenAbortSignal(), this.init = n;
    }
    trackPromise(t, n) {
      if (!(n instanceof Promise))
        return n;
      this.deferredKeys.push(t), this.pendingKeysSet.add(t);
      let r = Promise.race([n, this.abortPromise]).then((o) => this.onSettle(r, t, void 0, o), (o) => this.onSettle(r, t, o));
      return r.catch(() => {
      }), Object.defineProperty(r, "_tracked", { get: () => true }), r;
    }
    onSettle(t, n, r, o) {
      if (this.controller.signal.aborted && r instanceof Yt)
        return this.unlistenAbortSignal(), Object.defineProperty(t, "_error", { get: () => r }), Promise.reject(r);
      if (this.pendingKeysSet.delete(n), this.done && this.unlistenAbortSignal(), r === void 0 && o === void 0) {
        let i = new Error('Deferred data for key "' + n + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
        return Object.defineProperty(t, "_error", { get: () => i }), this.emit(false, n), Promise.reject(i);
      }
      return o === void 0 ? (Object.defineProperty(t, "_error", { get: () => r }), this.emit(false, n), Promise.reject(r)) : (Object.defineProperty(t, "_data", { get: () => o }), this.emit(false, n), o);
    }
    emit(t, n) {
      this.subscribers.forEach((r) => r(t, n));
    }
    subscribe(t) {
      return this.subscribers.add(t), () => this.subscribers.delete(t);
    }
    cancel() {
      this.controller.abort(), this.pendingKeysSet.forEach((t, n) => this.pendingKeysSet.delete(n)), this.emit(true);
    }
    async resolveData(t) {
      let n = false;
      if (!this.done) {
        let r = () => this.cancel();
        t.addEventListener("abort", r), n = await new Promise((o) => {
          this.subscribe((i) => {
            t.removeEventListener("abort", r), (i || this.done) && o(i);
          });
        });
      }
      return n;
    }
    get done() {
      return this.pendingKeysSet.size === 0;
    }
    get unwrappedData() {
      return j(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((t, n) => {
        let [r, o] = n;
        return Object.assign(t, { [r]: cR(o) });
      }, {});
    }
    get pendingKeys() {
      return Array.from(this.pendingKeysSet);
    }
  };
  Kr = function(t, n) {
    n === void 0 && (n = {});
    let r = typeof n == "number" ? { status: n } : n;
    return new pa(t, r);
  }, Tn = function(t, n) {
    n === void 0 && (n = 302);
    let r = n;
    typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
    let o = new Headers(r.headers);
    return o.set("Location", t), new Response(null, G({}, r, { headers: o }));
  }, Qr = (e, t) => {
    let n = Tn(e, t);
    return n.headers.set("X-Remix-Reload-Document", "true"), n;
  }, Ln = class {
    constructor(t, n, r, o) {
      o === void 0 && (o = false), this.status = t, this.statusText = n || "", this.internal = o, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
    }
  };
  _m = ["post", "put", "patch", "delete"], dR = new Set(_m), fR = ["get", ..._m], pR = new Set(fR), hR = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), mR = /* @__PURE__ */ new Set([307, 308]), fa = { state: "idle", location: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 }, wa = { state: "idle", data: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 }, er = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 }, Cm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Nm = (e) => ({ hasErrorBoundary: Boolean(e.hasErrorBoundary) }), Pm = "remix-router-transitions";
  Oi = Symbol("deferred");
});
function Im(e) {
  return e === Jt.Development || e === Jt.Production || e === Jt.Test;
}
var Jt;
var Sc = te(() => {
  Jt = function(e) {
    return e.Development = "development", e.Production = "production", e.Test = "test", e;
  }({});
});
function Ec(e, t) {
  if (e instanceof Error && t !== Jt.Development) {
    let n = new Error("Unexpected Server Error");
    return n.stack = void 0, n;
  }
  return e;
}
function Rc(e, t) {
  return Object.entries(e).reduce((n, [r, o]) => Object.assign(n, { [r]: Ec(o, t) }), {});
}
function Mo(e, t) {
  let n = Ec(e, t);
  return { message: n.message, stack: n.stack };
}
function xc(e, t) {
  if (!e)
    return null;
  let n = Object.entries(e), r = {};
  for (let [o, i] of n)
    if (Ne(i))
      r[o] = { ...i, __type: "RouteErrorResponse" };
    else if (i instanceof Error) {
      let l = Ec(i, t);
      r[o] = { message: l.message, stack: l.stack, __type: "Error", ...l.name !== "Error" ? { __subType: l.name } : {} };
    } else
      r[o] = i;
  return r;
}
var kc = te(() => {
  Fn();
  Sc();
});
function bm(e) {
  let t = e;
  return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function";
}
function On(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function _c(e) {
  return _R.has(e);
}
function Hm(e) {
  return _c(e.status);
}
function CR(e) {
  return e != null && typeof e.then == "function" && e._tracked === true;
}
function Bm(e, t, n) {
  let r = new TextEncoder();
  return new ReadableStream({ async start(i) {
    let l = {}, a = [];
    for (let [s, c] of Object.entries(e.data))
      CR(c) ? (l[s] = `${NR}${s}`, (typeof c._data < "u" || typeof c._error < "u") && a.push(s)) : l[s] = c;
    i.enqueue(r.encode(JSON.stringify(l) + `

`));
    for (let s of a)
      zm(i, r, s, e.data[s], n);
    let u = e.subscribe((s, c) => {
      c && zm(i, r, c, e.data[c], n);
    });
    await e.resolveData(t), u(), i.close();
  } });
}
function zm(e, t, n, r, o) {
  "_error" in r ? e.enqueue(t.encode("error:" + JSON.stringify({ [n]: r._error instanceof Error ? Mo(r._error, o) : r._error }) + `

`)) : e.enqueue(t.encode("data:" + JSON.stringify({ [n]: r._data ?? null }) + `

`));
}
var Mi;
var Um;
var Sa;
var jm;
var _R;
var NR;
var Ea = te(() => {
  Fn();
  kc();
  Mi = (e, t = {}) => pn(e, t), Um = (e, t = {}) => Kr(e, t), Sa = (e, t = 302) => Tn(e, t), jm = (e, t = 302) => Qr(e, t);
  _R = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
  NR = "__deferred_promise:";
});
function Vm(e) {
  return Object.keys(e).reduce((t, n) => (t[n] = e[n].module, t), {});
}
var $m = te(() => {
});
var Km = Ae((pD, Ai) => {
  "use strict";
  var Ao = { decodeValues: true, map: false, silent: false };
  function Cc(e) {
    return typeof e == "string" && !!e.trim();
  }
  function Nc(e, t) {
    var n = e.split(";").filter(Cc), r = n.shift(), o = PR(r), i = o.name, l = o.value;
    t = t ? Object.assign({}, Ao, t) : Ao;
    try {
      l = t.decodeValues ? decodeURIComponent(l) : l;
    } catch (u) {
      console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + l + "'. Set options.decodeValues to false to disable this feature.", u);
    }
    var a = { name: i, value: l };
    return n.forEach(function(u) {
      var s = u.split("="), c = s.shift().trimLeft().toLowerCase(), d = s.join("=");
      c === "expires" ? a.expires = new Date(d) : c === "max-age" ? a.maxAge = parseInt(d, 10) : c === "secure" ? a.secure = true : c === "httponly" ? a.httpOnly = true : c === "samesite" ? a.sameSite = d : a[c] = d;
    }), a;
  }
  function PR(e) {
    var t = "", n = "", r = e.split("=");
    return r.length > 1 ? (t = r.shift(), n = r.join("=")) : n = e, { name: t, value: n };
  }
  function Wm(e, t) {
    if (t = t ? Object.assign({}, Ao, t) : Ao, !e)
      return t.map ? {} : [];
    if (e.headers)
      if (typeof e.headers.getSetCookie == "function")
        e = e.headers.getSetCookie();
      else if (e.headers["set-cookie"])
        e = e.headers["set-cookie"];
      else {
        var n = e.headers[Object.keys(e.headers).find(function(o) {
          return o.toLowerCase() === "set-cookie";
        })];
        !n && e.headers.cookie && !t.silent && console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), e = n;
      }
    if (Array.isArray(e) || (e = [e]), t = t ? Object.assign({}, Ao, t) : Ao, t.map) {
      var r = {};
      return e.filter(Cc).reduce(function(o, i) {
        var l = Nc(i, t);
        return o[l.name] = l, o;
      }, r);
    } else
      return e.filter(Cc).map(function(o) {
        return Nc(o, t);
      });
  }
  function DR(e) {
    if (Array.isArray(e))
      return e;
    if (typeof e != "string")
      return [];
    var t = [], n = 0, r, o, i, l, a;
    function u() {
      for (; n < e.length && /\s/.test(e.charAt(n)); )
        n += 1;
      return n < e.length;
    }
    function s() {
      return o = e.charAt(n), o !== "=" && o !== ";" && o !== ",";
    }
    for (; n < e.length; ) {
      for (r = n, a = false; u(); )
        if (o = e.charAt(n), o === ",") {
          for (i = n, n += 1, u(), l = n; n < e.length && s(); )
            n += 1;
          n < e.length && e.charAt(n) === "=" ? (a = true, n = l, t.push(e.substring(r, i)), r = n) : n = i + 1;
        } else
          n += 1;
      (!a || n >= e.length) && t.push(e.substring(r, e.length));
    }
    return t;
  }
  Ai.exports = Wm;
  Ai.exports.parse = Wm;
  Ai.exports.parseString = Nc;
  Ai.exports.splitCookiesString = DR;
});
function Ym(e, t) {
  let n = t.errors ? t.matches.findIndex((i) => t.errors[i.route.id]) : -1, r = n >= 0 ? t.matches.slice(0, n + 1) : t.matches, o;
  if (n >= 0) {
    let { actionHeaders: i, actionData: l, loaderHeaders: a, loaderData: u } = t;
    t.matches.slice(n).some((s) => {
      let c = s.route.id;
      return i[c] && (!l || l[c] === void 0) ? o = i[c] : a[c] && u[c] === void 0 && (o = a[c]), o != null;
    });
  }
  return r.reduce((i, l, a) => {
    let { id: u } = l.route, s = e.routes[u].module, c = t.loaderHeaders[u] || new Headers(), d = t.actionHeaders[u] || new Headers(), p = o != null && a === r.length - 1, m = p && o !== c && o !== d;
    if (s.headers == null) {
      let w = new Headers(i);
      return m && Yr(o, w), Yr(d, w), Yr(c, w), w;
    }
    let y = new Headers(s.headers ? typeof s.headers == "function" ? s.headers({ loaderHeaders: c, parentHeaders: i, actionHeaders: d, errorHeaders: p ? o : void 0 }) : s.headers : void 0);
    return m && Yr(o, y), Yr(d, y), Yr(c, y), Yr(i, y), y;
  }, new Headers());
}
function Yr(e, t) {
  let n = e.get("Set-Cookie");
  n && (0, Qm.splitCookiesString)(n).forEach((o) => {
    t.append("Set-Cookie", o);
  });
}
var Qm;
var Jm = te(() => {
  Qm = se(Km());
});
function Xm(e, t) {
  if (e === false || e === null || typeof e > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(t);
}
var Gm = te(() => {
});
function qm(e, t) {
  let n = Ce(e, t);
  return n ? n.map((r) => ({ params: r.params, pathname: r.pathname, route: r.route })) : null;
}
var Zm = te(() => {
  Fn();
});
async function ev({ loadContext: e, action: t, params: n, request: r, routeId: o }) {
  let i = await t({ request: rv(nv(r)), context: e, params: n });
  if (i === void 0)
    throw new Error(`You defined an action for route "${o}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return On(i) ? i : Mi(i);
}
async function tv({ loadContext: e, loader: t, params: n, request: r, routeId: o }) {
  let i = await t({ request: rv(nv(r)), context: e, params: n });
  if (i === void 0)
    throw new Error(`You defined a loader for route "${o}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return bm(i) ? i.init && _c(i.init.status || 200) ? Sa(new Headers(i.init.headers).get("Location"), i.init) : i : On(i) ? i : Mi(i);
}
function nv(e) {
  let t = new URL(e.url), n = t.searchParams.getAll("index");
  t.searchParams.delete("index");
  let r = [];
  for (let i of n)
    i && r.push(i);
  for (let i of r)
    t.searchParams.append("index", i);
  let o = { method: e.method, body: e.body, headers: e.headers, signal: e.signal };
  return o.body && (o.duplex = "half"), new Request(t.href, o);
}
function rv(e) {
  let t = new URL(e.url);
  t.searchParams.delete("_data");
  let n = { method: e.method, body: e.body, headers: e.headers, signal: e.signal };
  return n.body && (n.duplex = "half"), new Request(t.href, n);
}
var ov = te(() => {
  Ea();
});
function iv(e) {
  let t = {};
  return Object.values(e).forEach((n) => {
    let r = n.parentId || "";
    t[r] || (t[r] = []), t[r].push(n);
  }), t;
}
function Pc(e, t = "", n = iv(e)) {
  return (n[t] || []).map((r) => ({ ...r, children: Pc(e, r.id, n) }));
}
function Dc(e, t, n = "", r = iv(e)) {
  return (r[n] || []).map((o) => {
    let i = { hasErrorBoundary: o.id === "root" || o.module.ErrorBoundary != null, id: o.id, path: o.path, loader: o.module.loader ? (l) => tv({ request: l.request, params: l.params, loadContext: l.context, loader: o.module.loader, routeId: o.id }) : void 0, action: o.module.action ? (l) => ev({ request: l.request, params: l.params, loadContext: l.context, action: o.module.action, routeId: o.id }) : void 0, handle: o.module.handle };
    return o.index ? { index: true, ...i } : { caseSensitive: o.caseSensitive, children: Dc(e, t, o.id, r), ...i };
  });
}
var lv = te(() => {
  ov();
});
function av(e) {
  return e.replace(TR, (t) => LR[t]);
}
var LR;
var TR;
var uv = te(() => {
  LR = { "&": "\\u0026", ">": "\\u003e", "<": "\\u003c", "\u2028": "\\u2028", "\u2029": "\\u2029" }, TR = /[&><\u2028\u2029]/g;
});
function Lc(e) {
  return av(JSON.stringify(e));
}
var sv = te(() => {
  uv();
});
async function cv(e, t) {
  if (t ??= "", !t)
    throw Error("Dev server origin not set");
  let n = new URL(t);
  n.pathname = "ping";
  let r = await fetch(n.href, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ buildHash: e.assets.version }) }).catch((o) => {
    throw console.error(`Could not reach Remix dev server at ${n}`), o;
  });
  if (!r.ok)
    throw console.error(`Could not reach Remix dev server at ${n} (${r.status})`), Error(await r.text());
}
function dv(e) {
  console.log(`[REMIX DEV] ${e.assets.version} ready`);
}
function pv(e) {
  globalThis[fv] = e;
}
function Tc() {
  return globalThis[fv];
}
var fv;
var Fc = te(() => {
  fv = "__remix_devServerHooks";
});
function hv(e, t) {
  var n, r;
  let o = Pc(e.routes), i = Dc(e.routes, e.future), l = Im(t) ? t : Jt.Production, a = yc(i, { future: { v7_relativeSplatPath: ((n = e.future) === null || n === void 0 ? void 0 : n.v3_relativeSplatPath) === true, v7_throwAbortReason: ((r = e.future) === null || r === void 0 ? void 0 : r.v3_throwAbortReason) === true } }), u = e.entry.module.handleError || ((s, { request: c }) => {
    l !== Jt.Test && !c.signal.aborted && console.error(Ne(s) && s.error ? s.error : s);
  });
  return { routes: o, dataRoutes: i, serverMode: l, staticHandler: a, errorHandler: u };
}
async function FR(e, t, n, r, o, i) {
  try {
    let l = await t.queryRoute(r, { routeId: n, requestContext: o });
    if (Hm(l)) {
      let a = new Headers(l.headers);
      return a.set("X-Remix-Redirect", a.get("Location")), a.set("X-Remix-Status", l.status), a.delete("Location"), l.headers.get("Set-Cookie") !== null && a.set("X-Remix-Revalidate", "yes"), new Response(null, { status: 204, headers: a });
    }
    if (Oi in l) {
      let a = l[Oi], u = Bm(a, r.signal, e), s = a.init || {}, c = new Headers(s.headers);
      return c.set("Content-Type", "text/remix-deferred"), c.set("X-Remix-Response", "yes"), s.headers = c, new Response(u, s);
    }
    return l.headers.set("X-Remix-Response", "yes"), l;
  } catch (l) {
    if (On(l))
      return l.headers.set("X-Remix-Catch", "yes"), l;
    if (Ne(l))
      return l && i(l), vv(l, e);
    let a = l instanceof Error || l instanceof DOMException ? l : new Error("Unexpected Server Error");
    return i(a), pn(Mo(a, e), { status: 500, headers: { "X-Remix-Error": "yes" } });
  }
}
async function OR(e, t, n, r, o, i, l) {
  let a;
  try {
    a = await n.query(r, { requestContext: o });
  } catch (d) {
    return i(d), new Response(null, { status: 500 });
  }
  if (On(a))
    return a;
  a.errors && (Object.values(a.errors).forEach((d) => {
    (!Ne(d) || d.error) && i(d);
  }), a.errors = Rc(a.errors, e));
  let u = Ym(t, a), s = { manifest: t.assets, routeModules: Vm(t.routes), staticHandlerContext: a, criticalCss: l, serverHandoffString: Lc({ url: a.location.pathname, criticalCss: l, state: { loaderData: a.loaderData, actionData: a.actionData, errors: xc(a.errors, e) }, future: t.future, isSpaMode: t.isSpaMode }), future: t.future, isSpaMode: t.isSpaMode, serializeError: (d) => Mo(d, e) }, c = t.entry.module.default;
  try {
    return await c(r, a.statusCode, u, s, o);
  } catch (d) {
    i(d);
    let p = d;
    if (On(d)) {
      let m;
      try {
        let y = d.headers.get("Content-Type");
        y && /\bapplication\/json\b/.test(y) ? d.body == null ? m = null : m = await d.json() : m = await d.text(), p = new Ln(d.status, d.statusText, m);
      } catch {
      }
    }
    a = gc(n.dataRoutes, a, p), a.errors && (a.errors = Rc(a.errors, e)), s = { ...s, staticHandlerContext: a, serverHandoffString: Lc({ url: a.location.pathname, state: { loaderData: a.loaderData, actionData: a.actionData, errors: xc(a.errors, e) }, future: t.future, isSpaMode: t.isSpaMode }) };
    try {
      return await c(r, a.statusCode, u, s, o);
    } catch (m) {
      return i(m), yv(m, e);
    }
  }
}
async function MR(e, t, n, r, o, i) {
  try {
    let l = await t.queryRoute(r, { routeId: n, requestContext: o });
    return Xm(On(l), "Expected a Response to be returned from queryRoute"), l;
  } catch (l) {
    return On(l) ? (l.headers.set("X-Remix-Catch", "yes"), l) : Ne(l) ? (l && i(l), vv(l, e)) : (i(l), yv(l, e));
  }
}
function vv(e, t) {
  return pn(Mo(e.error || new Error("Unexpected Server Error"), t), { status: e.status, statusText: e.statusText, headers: { "X-Remix-Error": "yes" } });
}
function yv(e, t) {
  let n = "Unexpected Server Error";
  return t !== Jt.Production && (n += `

${String(e)}`), new Response(n, { status: 500, headers: { "Content-Type": "text/plain" } });
}
var mv;
var gv = te(() => {
  Fn();
  $m();
  kc();
  Jm();
  Gm();
  Sc();
  Zm();
  lv();
  Ea();
  sv();
  Fc();
  mv = (e, t) => {
    let n, r, o, i, l;
    return async function(u, s = {}) {
      if (n = typeof e == "function" ? await e() : e, t ??= n.mode, typeof e == "function") {
        let f = hv(n, t);
        r = f.routes, o = f.serverMode, i = f.staticHandler, l = f.errorHandler;
      } else if (!r || !o || !i || !l) {
        let f = hv(n, t);
        r = f.routes, o = f.serverMode, i = f.staticHandler, l = f.errorHandler;
      }
      let c = new URL(u.url), d = qm(r, c.pathname), p = (f) => {
        if (t === Jt.Development) {
          var h, v;
          (h = Tc()) === null || h === void 0 || (v = h.processRequestError) === null || v === void 0 || v.call(h, f);
        }
        l(f, { context: s, params: d && d.length > 0 ? d[0].params : {}, request: u });
      }, m;
      if (c.searchParams.has("_data")) {
        let f = c.searchParams.get("_data");
        if (m = await FR(o, i, f, u, s, p), n.entry.module.handleDataRequest) {
          var y;
          m = await n.entry.module.handleDataRequest(m, { context: s, params: (d == null || (y = d.find((h) => h.route.id == f)) === null || y === void 0 ? void 0 : y.params) || {}, request: u });
        }
      } else if (d && d[d.length - 1].route.module.default == null && d[d.length - 1].route.module.ErrorBoundary == null)
        m = await MR(o, i, d.slice(-1)[0].route.id, u, s, p);
      else {
        var w, R;
        let f = t === Jt.Development ? await ((w = Tc()) === null || w === void 0 || (R = w.getCriticalCss) === null || R === void 0 ? void 0 : R.call(w, n, c.pathname)) : void 0;
        m = await OR(o, n, i, u, s, p, f);
      }
      return u.method === "HEAD" ? new Response(null, { headers: m.headers, status: m.status, statusText: m.statusText }) : m;
    };
  };
});
function Oc(e) {
  return `__flash_${e}__`;
}
function Mc(e) {
  ua(e.isSigned, `The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
}
var Ii;
var wv;
var Sv;
var Ac = te(() => {
  ca();
  uc();
  Ii = (e = {}, t = "") => {
    let n = new Map(Object.entries(e));
    return { get id() {
      return t;
    }, get data() {
      return Object.fromEntries(n);
    }, has(r) {
      return n.has(r) || n.has(Oc(r));
    }, get(r) {
      if (n.has(r))
        return n.get(r);
      let o = Oc(r);
      if (n.has(o)) {
        let i = n.get(o);
        return n.delete(o), i;
      }
    }, set(r, o) {
      n.set(r, o);
    }, flash(r, o) {
      n.set(Oc(r), o);
    }, unset(r) {
      n.delete(r);
    } };
  }, wv = (e) => e != null && typeof e.id == "string" && typeof e.data < "u" && typeof e.has == "function" && typeof e.get == "function" && typeof e.set == "function" && typeof e.flash == "function" && typeof e.unset == "function", Sv = (e) => ({ cookie: t, createData: n, readData: r, updateData: o, deleteData: i }) => {
    let l = _o(t) ? t : e(t?.name || "__session", t);
    return Mc(l), { async getSession(a, u) {
      let s = a && await l.parse(a, u), c = s && await r(s);
      return Ii(c || {}, s || "");
    }, async commitSession(a, u) {
      let { id: s, data: c } = a, d = u?.maxAge != null ? new Date(Date.now() + u.maxAge * 1e3) : u?.expires != null ? u.expires : l.expires;
      return s ? await o(s, c, d) : s = await n(c, d), l.serialize(s, u);
    }, async destroySession(a, u) {
      return await i(a.id), l.serialize("", { ...u, maxAge: void 0, expires: /* @__PURE__ */ new Date(0) });
    } };
  };
});
var Ev;
var Rv = te(() => {
  ca();
  Ac();
  Ev = (e) => ({ cookie: t } = {}) => {
    let n = _o(t) ? t : e(t?.name || "__session", t);
    return Mc(n), { async getSession(r, o) {
      return Ii(r && await n.parse(r, o) || {});
    }, async commitSession(r, o) {
      let i = await n.serialize(r.data, o);
      if (i.length > 4096)
        throw new Error("Cookie length will exceed browser maximum. Length: " + i.length);
      return i;
    }, async destroySession(r, o) {
      return n.serialize("", { ...o, maxAge: void 0, expires: /* @__PURE__ */ new Date(0) });
    } };
  };
});
var xv;
var kv = te(() => {
  xv = (e) => ({ cookie: t } = {}) => {
    let n = /* @__PURE__ */ new Map();
    return e({ cookie: t, async createData(r, o) {
      let i = Math.random().toString(36).substring(2, 10);
      return n.set(i, { data: r, expires: o }), i;
    }, async readData(r) {
      if (n.has(r)) {
        let { data: o, expires: i } = n.get(r);
        if (!i || i > /* @__PURE__ */ new Date())
          return o;
        i && n.delete(r);
      }
      return null;
    }, async updateData(r, o, i) {
      n.set(r, { data: o, expires: i });
    }, async deleteData(r) {
      n.delete(r);
    } });
  };
});
var Io;
var Ic = te(() => {
  Io = class extends Error {
    constructor(t, n) {
      super(`Field "${t}" exceeded upload size of ${n} bytes.`), this.field = t, this.maxBytes = n;
    }
  };
});
function _v({ filter: e, maxPartSize: t = 3e6 } = {}) {
  return async ({ filename: n, contentType: r, name: o, data: i }) => {
    if (e && !await e({ filename: n, contentType: r, name: o }))
      return;
    let l = 0, a = [];
    for await (let u of i) {
      if (l += u.byteLength, l > t)
        throw new Io(o, t);
      a.push(u);
    }
    return typeof n == "string" ? new File(a, n, { type: r }) : await new Blob(a, { type: r }).text();
  };
}
var Cv = te(() => {
  Ic();
});
var zc = {};
dn(zc, { MaxPartSizeExceededError: () => Io, broadcastDevReady: () => cv, createCookieFactory: () => Yh, createCookieSessionStorageFactory: () => Ev, createMemorySessionStorageFactory: () => xv, createRequestHandler: () => mv, createSession: () => Ii, createSessionStorageFactory: () => Sv, defer: () => Um, isCookie: () => _o, isSession: () => wv, json: () => Mi, logDevReady: () => dv, redirect: () => Sa, redirectDocument: () => jm, unstable_composeUploadHandlers: () => rm, unstable_createMemoryUploadHandler: () => _v, unstable_parseMultipartFormData: () => om, unstable_setDevServerHooks: () => pv });
var Uc = te(() => {
  ca();
  im();
  Ea();
  gv();
  Ac();
  Rv();
  kv();
  Cv();
  Ic();
  Fc();
});
var Pv = Ae((Ra) => {
  "use strict";
  Object.defineProperty(Ra, "__esModule", { value: true });
  var jc = new TextEncoder(), AR = async (e, t) => {
    let n = await Nv(t, ["sign"]), r = jc.encode(e), o = await crypto.subtle.sign("HMAC", n, r), i = btoa(String.fromCharCode(...new Uint8Array(o))).replace(/=+$/, "");
    return e + "." + i;
  }, IR = async (e, t) => {
    let n = e.lastIndexOf("."), r = e.slice(0, n), o = e.slice(n + 1), i = await Nv(t, ["verify"]), l = jc.encode(r), a = zR(atob(o));
    return await crypto.subtle.verify("HMAC", i, a, l) ? r : false;
  };
  async function Nv(e, t) {
    return await crypto.subtle.importKey("raw", jc.encode(e), { name: "HMAC", hash: "SHA-256" }, false, t);
  }
  function zR(e) {
    let t = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++)
      t[n] = e.charCodeAt(n);
    return t;
  }
  Ra.sign = AR;
  Ra.unsign = IR;
});
var Hc = Ae((zo) => {
  "use strict";
  Object.defineProperty(zo, "__esModule", { value: true });
  var xa = (Uc(), Ni(zc)), Dv = Pv(), bc = xa.createCookieFactory({ sign: Dv.sign, unsign: Dv.unsign }), UR = xa.createCookieSessionStorageFactory(bc), Lv = xa.createSessionStorageFactory(bc), jR = xa.createMemorySessionStorageFactory(Lv);
  zo.createCookie = bc;
  zo.createCookieSessionStorage = UR;
  zo.createMemorySessionStorage = jR;
  zo.createSessionStorage = Lv;
});
var Tv = Ae((Bc) => {
  "use strict";
  Object.defineProperty(Bc, "__esModule", { value: true });
  var bR = Hc();
  function HR({ cookie: e, kv: t }) {
    return bR.createSessionStorage({ cookie: e, async createData(n, r) {
      for (; ; ) {
        let o = new Uint8Array(8);
        crypto.getRandomValues(o);
        let i = [...o].map((l) => l.toString(16).padStart(2, "0")).join("");
        if (!await t.get(i, "json"))
          return await t.put(i, JSON.stringify(n), { expiration: r ? Math.round(r.getTime() / 1e3) : void 0 }), i;
      }
    }, async readData(n) {
      let r = await t.get(n);
      return r ? JSON.parse(r) : null;
    }, async updateData(n, r, o) {
      await t.put(n, JSON.stringify(r), { expiration: o ? Math.round(o.getTime() / 1e3) : void 0 });
    }, async deleteData(n) {
      await t.delete(n);
    } });
  }
  Bc.createWorkersKVSessionStorage = HR;
});
var Vc = Ae((Re) => {
  "use strict";
  Object.defineProperty(Re, "__esModule", { value: true });
  var BR = Tv(), ka = Hc(), ut = (Uc(), Ni(zc));
  Re.createWorkersKVSessionStorage = BR.createWorkersKVSessionStorage;
  Re.createCookie = ka.createCookie;
  Re.createCookieSessionStorage = ka.createCookieSessionStorage;
  Re.createMemorySessionStorage = ka.createMemorySessionStorage;
  Re.createSessionStorage = ka.createSessionStorage;
  Object.defineProperty(Re, "MaxPartSizeExceededError", { enumerable: true, get: function() {
    return ut.MaxPartSizeExceededError;
  } });
  Object.defineProperty(Re, "broadcastDevReady", { enumerable: true, get: function() {
    return ut.broadcastDevReady;
  } });
  Object.defineProperty(Re, "createRequestHandler", { enumerable: true, get: function() {
    return ut.createRequestHandler;
  } });
  Object.defineProperty(Re, "createSession", { enumerable: true, get: function() {
    return ut.createSession;
  } });
  Object.defineProperty(Re, "defer", { enumerable: true, get: function() {
    return ut.defer;
  } });
  Object.defineProperty(Re, "isCookie", { enumerable: true, get: function() {
    return ut.isCookie;
  } });
  Object.defineProperty(Re, "isSession", { enumerable: true, get: function() {
    return ut.isSession;
  } });
  Object.defineProperty(Re, "json", { enumerable: true, get: function() {
    return ut.json;
  } });
  Object.defineProperty(Re, "logDevReady", { enumerable: true, get: function() {
    return ut.logDevReady;
  } });
  Object.defineProperty(Re, "redirect", { enumerable: true, get: function() {
    return ut.redirect;
  } });
  Object.defineProperty(Re, "redirectDocument", { enumerable: true, get: function() {
    return ut.redirectDocument;
  } });
  Object.defineProperty(Re, "unstable_composeUploadHandlers", { enumerable: true, get: function() {
    return ut.unstable_composeUploadHandlers;
  } });
  Object.defineProperty(Re, "unstable_createMemoryUploadHandler", { enumerable: true, get: function() {
    return ut.unstable_createMemoryUploadHandler;
  } });
  Object.defineProperty(Re, "unstable_parseMultipartFormData", { enumerable: true, get: function() {
    return ut.unstable_parseMultipartFormData;
  } });
});
var $v = Ae((Y) => {
  "use strict";
  var zi = Symbol.for("react.element"), VR = Symbol.for("react.portal"), $R = Symbol.for("react.fragment"), WR = Symbol.for("react.strict_mode"), KR = Symbol.for("react.profiler"), QR = Symbol.for("react.provider"), YR = Symbol.for("react.context"), JR = Symbol.for("react.forward_ref"), XR = Symbol.for("react.suspense"), GR = Symbol.for("react.memo"), qR = Symbol.for("react.lazy"), Mv = Symbol.iterator;
  function ZR(e) {
    return e === null || typeof e != "object" ? null : (e = Mv && e[Mv] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var zv = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Uv = Object.assign, jv = {};
  function Uo(e, t, n) {
    this.props = e, this.context = t, this.refs = jv, this.updater = n || zv;
  }
  Uo.prototype.isReactComponent = {};
  Uo.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  Uo.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function bv() {
  }
  bv.prototype = Uo.prototype;
  function Kc(e, t, n) {
    this.props = e, this.context = t, this.refs = jv, this.updater = n || zv;
  }
  var Qc = Kc.prototype = new bv();
  Qc.constructor = Kc;
  Uv(Qc, Uo.prototype);
  Qc.isPureReactComponent = true;
  var Av = Array.isArray, Hv = Object.prototype.hasOwnProperty, Yc = { current: null }, Bv = { key: true, ref: true, __self: true, __source: true };
  function Vv(e, t, n) {
    var r, o = {}, i = null, l = null;
    if (t != null)
      for (r in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (i = "" + t.key), t)
        Hv.call(t, r) && !Bv.hasOwnProperty(r) && (o[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1)
      o.children = n;
    else if (1 < a) {
      for (var u = Array(a), s = 0; s < a; s++)
        u[s] = arguments[s + 2];
      o.children = u;
    }
    if (e && e.defaultProps)
      for (r in a = e.defaultProps, a)
        o[r] === void 0 && (o[r] = a[r]);
    return { $$typeof: zi, type: e, key: i, ref: l, props: o, _owner: Yc.current };
  }
  function ex(e, t) {
    return { $$typeof: zi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
  }
  function Jc(e) {
    return typeof e == "object" && e !== null && e.$$typeof === zi;
  }
  function tx(e) {
    var t = { "=": "=0", ":": "=2" };
    return "$" + e.replace(/[=:]/g, function(n) {
      return t[n];
    });
  }
  var Iv = /\/+/g;
  function Wc(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? tx("" + e.key) : t.toString(36);
  }
  function Ca(e, t, n, r, o) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var l = false;
    if (e === null)
      l = true;
    else
      switch (i) {
        case "string":
        case "number":
          l = true;
          break;
        case "object":
          switch (e.$$typeof) {
            case zi:
            case VR:
              l = true;
          }
      }
    if (l)
      return l = e, o = o(l), e = r === "" ? "." + Wc(l, 0) : r, Av(o) ? (n = "", e != null && (n = e.replace(Iv, "$&/") + "/"), Ca(o, t, n, "", function(s) {
        return s;
      })) : o != null && (Jc(o) && (o = ex(o, n + (!o.key || l && l.key === o.key ? "" : ("" + o.key).replace(Iv, "$&/") + "/") + e)), t.push(o)), 1;
    if (l = 0, r = r === "" ? "." : r + ":", Av(e))
      for (var a = 0; a < e.length; a++) {
        i = e[a];
        var u = r + Wc(i, a);
        l += Ca(i, t, n, u, o);
      }
    else if (u = ZR(e), typeof u == "function")
      for (e = u.call(e), a = 0; !(i = e.next()).done; )
        i = i.value, u = r + Wc(i, a++), l += Ca(i, t, n, u, o);
    else if (i === "object")
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return l;
  }
  function _a(e, t, n) {
    if (e == null)
      return e;
    var r = [], o = 0;
    return Ca(e, r, "", "", function(i) {
      return t.call(n, i, o++);
    }), r;
  }
  function nx(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t(), t.then(function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
      }, function(n) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
      }), e._status === -1 && (e._status = 0, e._result = t);
    }
    if (e._status === 1)
      return e._result.default;
    throw e._result;
  }
  var tt = { current: null }, Na = { transition: null }, rx = { ReactCurrentDispatcher: tt, ReactCurrentBatchConfig: Na, ReactCurrentOwner: Yc };
  Y.Children = { map: _a, forEach: function(e, t, n) {
    _a(e, function() {
      t.apply(this, arguments);
    }, n);
  }, count: function(e) {
    var t = 0;
    return _a(e, function() {
      t++;
    }), t;
  }, toArray: function(e) {
    return _a(e, function(t) {
      return t;
    }) || [];
  }, only: function(e) {
    if (!Jc(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  } };
  Y.Component = Uo;
  Y.Fragment = $R;
  Y.Profiler = KR;
  Y.PureComponent = Kc;
  Y.StrictMode = WR;
  Y.Suspense = XR;
  Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rx;
  Y.cloneElement = function(e, t, n) {
    if (e == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Uv({}, e.props), o = e.key, i = e.ref, l = e._owner;
    if (t != null) {
      if (t.ref !== void 0 && (i = t.ref, l = Yc.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps)
        var a = e.type.defaultProps;
      for (u in t)
        Hv.call(t, u) && !Bv.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
    }
    var u = arguments.length - 2;
    if (u === 1)
      r.children = n;
    else if (1 < u) {
      a = Array(u);
      for (var s = 0; s < u; s++)
        a[s] = arguments[s + 2];
      r.children = a;
    }
    return { $$typeof: zi, type: e.type, key: o, ref: i, props: r, _owner: l };
  };
  Y.createContext = function(e) {
    return e = { $$typeof: YR, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: QR, _context: e }, e.Consumer = e;
  };
  Y.createElement = Vv;
  Y.createFactory = function(e) {
    var t = Vv.bind(null, e);
    return t.type = e, t;
  };
  Y.createRef = function() {
    return { current: null };
  };
  Y.forwardRef = function(e) {
    return { $$typeof: JR, render: e };
  };
  Y.isValidElement = Jc;
  Y.lazy = function(e) {
    return { $$typeof: qR, _payload: { _status: -1, _result: e }, _init: nx };
  };
  Y.memo = function(e, t) {
    return { $$typeof: GR, type: e, compare: t === void 0 ? null : t };
  };
  Y.startTransition = function(e) {
    var t = Na.transition;
    Na.transition = {};
    try {
      e();
    } finally {
      Na.transition = t;
    }
  };
  Y.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  };
  Y.useCallback = function(e, t) {
    return tt.current.useCallback(e, t);
  };
  Y.useContext = function(e) {
    return tt.current.useContext(e);
  };
  Y.useDebugValue = function() {
  };
  Y.useDeferredValue = function(e) {
    return tt.current.useDeferredValue(e);
  };
  Y.useEffect = function(e, t) {
    return tt.current.useEffect(e, t);
  };
  Y.useId = function() {
    return tt.current.useId();
  };
  Y.useImperativeHandle = function(e, t, n) {
    return tt.current.useImperativeHandle(e, t, n);
  };
  Y.useInsertionEffect = function(e, t) {
    return tt.current.useInsertionEffect(e, t);
  };
  Y.useLayoutEffect = function(e, t) {
    return tt.current.useLayoutEffect(e, t);
  };
  Y.useMemo = function(e, t) {
    return tt.current.useMemo(e, t);
  };
  Y.useReducer = function(e, t, n) {
    return tt.current.useReducer(e, t, n);
  };
  Y.useRef = function(e) {
    return tt.current.useRef(e);
  };
  Y.useState = function(e) {
    return tt.current.useState(e);
  };
  Y.useSyncExternalStore = function(e, t, n) {
    return tt.current.useSyncExternalStore(e, t, n);
  };
  Y.useTransition = function() {
    return tt.current.useTransition();
  };
  Y.version = "18.2.0";
});
var st = Ae((fL, Wv) => {
  "use strict";
  Wv.exports = $v();
});
var ty = Ae((ie) => {
  "use strict";
  function Zc(e, t) {
    var n = e.length;
    e.push(t);
    e:
      for (; 0 < n; ) {
        var r = n - 1 >>> 1, o = e[r];
        if (0 < Pa(o, t))
          e[r] = t, e[n] = o, n = r;
        else
          break e;
      }
  }
  function Xt(e) {
    return e.length === 0 ? null : e[0];
  }
  function La(e) {
    if (e.length === 0)
      return null;
    var t = e[0], n = e.pop();
    if (n !== t) {
      e[0] = n;
      e:
        for (var r = 0, o = e.length, i = o >>> 1; r < i; ) {
          var l = 2 * (r + 1) - 1, a = e[l], u = l + 1, s = e[u];
          if (0 > Pa(a, n))
            u < o && 0 > Pa(s, a) ? (e[r] = s, e[u] = n, r = u) : (e[r] = a, e[l] = n, r = l);
          else if (u < o && 0 > Pa(s, n))
            e[r] = s, e[u] = n, r = u;
          else
            break e;
        }
    }
    return t;
  }
  function Pa(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return n !== 0 ? n : e.id - t.id;
  }
  typeof performance == "object" && typeof performance.now == "function" ? (Kv = performance, ie.unstable_now = function() {
    return Kv.now();
  }) : (Xc = Date, Qv = Xc.now(), ie.unstable_now = function() {
    return Xc.now() - Qv;
  });
  var Kv, Xc, Qv, hn = [], or = [], ox = 1, Ut = null, Ye = 3, Ta = false, Jr = false, ji = false, Xv = typeof setTimeout == "function" ? setTimeout : null, Gv = typeof clearTimeout == "function" ? clearTimeout : null, Yv = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function ed(e) {
    for (var t = Xt(or); t !== null; ) {
      if (t.callback === null)
        La(or);
      else if (t.startTime <= e)
        La(or), t.sortIndex = t.expirationTime, Zc(hn, t);
      else
        break;
      t = Xt(or);
    }
  }
  function td(e) {
    if (ji = false, ed(e), !Jr)
      if (Xt(hn) !== null)
        Jr = true, rd(nd);
      else {
        var t = Xt(or);
        t !== null && od(td, t.startTime - e);
      }
  }
  function nd(e, t) {
    Jr = false, ji && (ji = false, Gv(bi), bi = -1), Ta = true;
    var n = Ye;
    try {
      for (ed(t), Ut = Xt(hn); Ut !== null && (!(Ut.expirationTime > t) || e && !ey()); ) {
        var r = Ut.callback;
        if (typeof r == "function") {
          Ut.callback = null, Ye = Ut.priorityLevel;
          var o = r(Ut.expirationTime <= t);
          t = ie.unstable_now(), typeof o == "function" ? Ut.callback = o : Ut === Xt(hn) && La(hn), ed(t);
        } else
          La(hn);
        Ut = Xt(hn);
      }
      if (Ut !== null)
        var i = true;
      else {
        var l = Xt(or);
        l !== null && od(td, l.startTime - t), i = false;
      }
      return i;
    } finally {
      Ut = null, Ye = n, Ta = false;
    }
  }
  var Fa = false, Da = null, bi = -1, qv = 5, Zv = -1;
  function ey() {
    return !(ie.unstable_now() - Zv < qv);
  }
  function Gc() {
    if (Da !== null) {
      var e = ie.unstable_now();
      Zv = e;
      var t = true;
      try {
        t = Da(true, e);
      } finally {
        t ? Ui() : (Fa = false, Da = null);
      }
    } else
      Fa = false;
  }
  var Ui;
  typeof Yv == "function" ? Ui = function() {
    Yv(Gc);
  } : typeof MessageChannel < "u" ? (qc = new MessageChannel(), Jv = qc.port2, qc.port1.onmessage = Gc, Ui = function() {
    Jv.postMessage(null);
  }) : Ui = function() {
    Xv(Gc, 0);
  };
  var qc, Jv;
  function rd(e) {
    Da = e, Fa || (Fa = true, Ui());
  }
  function od(e, t) {
    bi = Xv(function() {
      e(ie.unstable_now());
    }, t);
  }
  ie.unstable_IdlePriority = 5;
  ie.unstable_ImmediatePriority = 1;
  ie.unstable_LowPriority = 4;
  ie.unstable_NormalPriority = 3;
  ie.unstable_Profiling = null;
  ie.unstable_UserBlockingPriority = 2;
  ie.unstable_cancelCallback = function(e) {
    e.callback = null;
  };
  ie.unstable_continueExecution = function() {
    Jr || Ta || (Jr = true, rd(nd));
  };
  ie.unstable_forceFrameRate = function(e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : qv = 0 < e ? Math.floor(1e3 / e) : 5;
  };
  ie.unstable_getCurrentPriorityLevel = function() {
    return Ye;
  };
  ie.unstable_getFirstCallbackNode = function() {
    return Xt(hn);
  };
  ie.unstable_next = function(e) {
    switch (Ye) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = Ye;
    }
    var n = Ye;
    Ye = t;
    try {
      return e();
    } finally {
      Ye = n;
    }
  };
  ie.unstable_pauseExecution = function() {
  };
  ie.unstable_requestPaint = function() {
  };
  ie.unstable_runWithPriority = function(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var n = Ye;
    Ye = e;
    try {
      return t();
    } finally {
      Ye = n;
    }
  };
  ie.unstable_scheduleCallback = function(e, t, n) {
    var r = ie.unstable_now();
    switch (typeof n == "object" && n !== null ? (n = n.delay, n = typeof n == "number" && 0 < n ? r + n : r) : n = r, e) {
      case 1:
        var o = -1;
        break;
      case 2:
        o = 250;
        break;
      case 5:
        o = 1073741823;
        break;
      case 4:
        o = 1e4;
        break;
      default:
        o = 5e3;
    }
    return o = n + o, e = { id: ox++, callback: t, priorityLevel: e, startTime: n, expirationTime: o, sortIndex: -1 }, n > r ? (e.sortIndex = n, Zc(or, e), Xt(hn) === null && e === Xt(or) && (ji ? (Gv(bi), bi = -1) : ji = true, od(td, n - r))) : (e.sortIndex = o, Zc(hn, e), Jr || Ta || (Jr = true, rd(nd))), e;
  };
  ie.unstable_shouldYield = ey;
  ie.unstable_wrapCallback = function(e) {
    var t = Ye;
    return function() {
      var n = Ye;
      Ye = t;
      try {
        return e.apply(this, arguments);
      } finally {
        Ye = n;
      }
    };
  };
});
var ry = Ae((hL, ny) => {
  "use strict";
  ny.exports = ty();
});
var sw = Ae((Nt) => {
  "use strict";
  var cg = st(), _t = ry();
  function L(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var dg = /* @__PURE__ */ new Set(), ul = {};
  function uo(e, t) {
    ii(e, t), ii(e + "Capture", t);
  }
  function ii(e, t) {
    for (ul[e] = t, e = 0; e < t.length; e++)
      dg.add(t[e]);
  }
  var jn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Nd = Object.prototype.hasOwnProperty, ix = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, oy = {}, iy = {};
  function lx(e) {
    return Nd.call(iy, e) ? true : Nd.call(oy, e) ? false : ix.test(e) ? iy[e] = true : (oy[e] = true, false);
  }
  function ax(e, t, n, r) {
    if (n !== null && n.type === 0)
      return false;
    switch (typeof t) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        return r ? false : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return false;
    }
  }
  function ux(e, t, n, r) {
    if (t === null || typeof t > "u" || ax(e, t, n, r))
      return true;
    if (r)
      return false;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === false;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return false;
  }
  function ot(e, t, n, r, o, i, l) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Ve = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Ve[e] = new ot(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Ve[t] = new ot(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Ve[e] = new ot(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Ve[e] = new ot(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Ve[e] = new ot(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Ve[e] = new ot(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    Ve[e] = new ot(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    Ve[e] = new ot(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    Ve[e] = new ot(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var Sf = /[\-:]([a-z])/g;
  function Ef(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Sf, Ef);
    Ve[t] = new ot(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Sf, Ef);
    Ve[t] = new ot(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Sf, Ef);
    Ve[t] = new ot(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    Ve[e] = new ot(e, 1, false, e.toLowerCase(), null, false, false);
  });
  Ve.xlinkHref = new ot("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    Ve[e] = new ot(e, 1, false, e.toLowerCase(), null, true, true);
  });
  function Rf(e, t, n, r) {
    var o = Ve.hasOwnProperty(t) ? Ve[t] : null;
    (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ux(t, n, o, r) && (n = null), r || o === null ? lx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? false : "" : n : (t = o.attributeName, r = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === true ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Vn = cg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Oa = Symbol.for("react.element"), Ho = Symbol.for("react.portal"), Bo = Symbol.for("react.fragment"), xf = Symbol.for("react.strict_mode"), Pd = Symbol.for("react.profiler"), fg = Symbol.for("react.provider"), pg = Symbol.for("react.context"), kf = Symbol.for("react.forward_ref"), Dd = Symbol.for("react.suspense"), Ld = Symbol.for("react.suspense_list"), _f = Symbol.for("react.memo"), lr = Symbol.for("react.lazy");
  Symbol.for("react.scope");
  Symbol.for("react.debug_trace_mode");
  var hg = Symbol.for("react.offscreen");
  Symbol.for("react.legacy_hidden");
  Symbol.for("react.cache");
  Symbol.for("react.tracing_marker");
  var ly = Symbol.iterator;
  function Hi(e) {
    return e === null || typeof e != "object" ? null : (e = ly && e[ly] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ge = Object.assign, id;
  function Ji(e) {
    if (id === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        id = t && t[1] || "";
      }
    return `
` + id + e;
  }
  var ld = false;
  function ad(e, t) {
    if (!e || ld)
      return "";
    ld = true;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (s) {
            var r = s;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (s) {
            r = s;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (s) {
          r = s;
        }
        e();
      }
    } catch (s) {
      if (s && r && typeof s.stack == "string") {
        for (var o = s.stack.split(`
`), i = r.stack.split(`
`), l = o.length - 1, a = i.length - 1; 1 <= l && 0 <= a && o[l] !== i[a]; )
          a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (o[l] !== i[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || o[l] !== i[a]) {
                  var u = `
` + o[l].replace(" at new ", " at ");
                  return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      ld = false, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? Ji(e) : "";
  }
  function sx(e) {
    switch (e.tag) {
      case 5:
        return Ji(e.type);
      case 16:
        return Ji("Lazy");
      case 13:
        return Ji("Suspense");
      case 19:
        return Ji("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = ad(e.type, false), e;
      case 11:
        return e = ad(e.type.render, false), e;
      case 1:
        return e = ad(e.type, true), e;
      default:
        return "";
    }
  }
  function Td(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Bo:
        return "Fragment";
      case Ho:
        return "Portal";
      case Pd:
        return "Profiler";
      case xf:
        return "StrictMode";
      case Dd:
        return "Suspense";
      case Ld:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case pg:
          return (e.displayName || "Context") + ".Consumer";
        case fg:
          return (e._context.displayName || "Context") + ".Provider";
        case kf:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _f:
          return t = e.displayName || null, t !== null ? t : Td(e.type) || "Memo";
        case lr:
          t = e._payload, e = e._init;
          try {
            return Td(e(t));
          } catch {
          }
      }
    return null;
  }
  function cx(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Td(t);
      case 8:
        return t === xf ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function")
          return t.displayName || t.name || null;
        if (typeof t == "string")
          return t;
    }
    return null;
  }
  function Sr(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function mg(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function dx(e) {
    var t = mg(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var o = n.get, i = n.set;
      return Object.defineProperty(e, t, { configurable: true, get: function() {
        return o.call(this);
      }, set: function(l) {
        r = "" + l, i.call(this, l);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(l) {
        r = "" + l;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Ma(e) {
    e._valueTracker || (e._valueTracker = dx(e));
  }
  function vg(e) {
    if (!e)
      return false;
    var t = e._valueTracker;
    if (!t)
      return true;
    var n = t.getValue(), r = "";
    return e && (r = mg(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), true) : false;
  }
  function uu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Fd(e, t) {
    var n = t.checked;
    return ge({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function ay(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = Sr(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function yg(e, t) {
    t = t.checked, t != null && Rf(e, "checked", t, false);
  }
  function Od(e, t) {
    yg(e, t);
    var n = Sr(t.value), r = t.type;
    if (n != null)
      r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Md(e, t.type, n) : t.hasOwnProperty("defaultValue") && Md(e, t.type, Sr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function uy(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
        return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function Md(e, t, n) {
    (t !== "number" || uu(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Xi = Array.isArray;
  function Zo(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var o = 0; o < n.length; o++)
        t["$" + n[o]] = true;
      for (n = 0; n < e.length; n++)
        o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = true);
    } else {
      for (n = "" + Sr(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          e[o].selected = true, r && (e[o].defaultSelected = true);
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = true);
    }
  }
  function Ad(e, t) {
    if (t.dangerouslySetInnerHTML != null)
      throw Error(L(91));
    return ge({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function sy(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null)
          throw Error(L(92));
        if (Xi(n)) {
          if (1 < n.length)
            throw Error(L(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: Sr(n) };
  }
  function gg(e, t) {
    var n = Sr(t.value), r = Sr(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function cy(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function wg(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Id(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? wg(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Aa, Sg = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, o);
      });
    } : e;
  }(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (Aa = Aa || document.createElement("div"), Aa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Aa.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; t.firstChild; )
        e.appendChild(t.firstChild);
    }
  });
  function sl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Zi = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, fx = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Zi).forEach(function(e) {
    fx.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Zi[t] = Zi[e];
    });
  });
  function Eg(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Zi.hasOwnProperty(e) && Zi[e] ? ("" + t).trim() : t + "px";
  }
  function Rg(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0, o = Eg(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o;
      }
  }
  var px = ge({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function zd(e, t) {
    if (t) {
      if (px[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(L(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw Error(L(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
          throw Error(L(61));
      }
      if (t.style != null && typeof t.style != "object")
        throw Error(L(62));
    }
  }
  function Ud(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var jd = null;
  function Cf(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var bd = null, ei = null, ti = null;
  function dy(e) {
    if (e = Nl(e)) {
      if (typeof bd != "function")
        throw Error(L(280));
      var t = e.stateNode;
      t && (t = Iu(t), bd(e.stateNode, e.type, t));
    }
  }
  function xg(e) {
    ei ? ti ? ti.push(e) : ti = [e] : ei = e;
  }
  function kg() {
    if (ei) {
      var e = ei, t = ti;
      if (ti = ei = null, dy(e), t)
        for (e = 0; e < t.length; e++)
          dy(t[e]);
    }
  }
  function _g(e, t) {
    return e(t);
  }
  function Cg() {
  }
  var ud = false;
  function Ng(e, t, n) {
    if (ud)
      return e(t, n);
    ud = true;
    try {
      return _g(e, t, n);
    } finally {
      ud = false, (ei !== null || ti !== null) && (Cg(), kg());
    }
  }
  function cl(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var r = Iu(n);
    if (r === null)
      return null;
    n = r[t];
    e:
      switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
          break e;
        default:
          e = false;
      }
    if (e)
      return null;
    if (n && typeof n != "function")
      throw Error(L(231, t, typeof n));
    return n;
  }
  var Hd = false;
  if (jn)
    try {
      jo = {}, Object.defineProperty(jo, "passive", { get: function() {
        Hd = true;
      } }), window.addEventListener("test", jo, jo), window.removeEventListener("test", jo, jo);
    } catch {
      Hd = false;
    }
  var jo;
  function hx(e, t, n, r, o, i, l, a, u) {
    var s = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, s);
    } catch (c) {
      this.onError(c);
    }
  }
  var el = false, su = null, cu = false, Bd = null, mx = { onError: function(e) {
    el = true, su = e;
  } };
  function vx(e, t, n, r, o, i, l, a, u) {
    el = false, su = null, hx.apply(mx, arguments);
  }
  function yx(e, t, n, r, o, i, l, a, u) {
    if (vx.apply(this, arguments), el) {
      if (el) {
        var s = su;
        el = false, su = null;
      } else
        throw Error(L(198));
      cu || (cu = true, Bd = s);
    }
  }
  function so(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      e = t;
      do
        t = e, t.flags & 4098 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Pg(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function fy(e) {
    if (so(e) !== e)
      throw Error(L(188));
  }
  function gx(e) {
    var t = e.alternate;
    if (!t) {
      if (t = so(e), t === null)
        throw Error(L(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var o = n.return;
      if (o === null)
        break;
      var i = o.alternate;
      if (i === null) {
        if (r = o.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (o.child === i.child) {
        for (i = o.child; i; ) {
          if (i === n)
            return fy(o), e;
          if (i === r)
            return fy(o), t;
          i = i.sibling;
        }
        throw Error(L(188));
      }
      if (n.return !== r.return)
        n = o, r = i;
      else {
        for (var l = false, a = o.child; a; ) {
          if (a === n) {
            l = true, n = o, r = i;
            break;
          }
          if (a === r) {
            l = true, r = o, n = i;
            break;
          }
          a = a.sibling;
        }
        if (!l) {
          for (a = i.child; a; ) {
            if (a === n) {
              l = true, n = i, r = o;
              break;
            }
            if (a === r) {
              l = true, r = i, n = o;
              break;
            }
            a = a.sibling;
          }
          if (!l)
            throw Error(L(189));
        }
      }
      if (n.alternate !== r)
        throw Error(L(190));
    }
    if (n.tag !== 3)
      throw Error(L(188));
    return n.stateNode.current === n ? e : t;
  }
  function Dg(e) {
    return e = gx(e), e !== null ? Lg(e) : null;
  }
  function Lg(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      var t = Lg(e);
      if (t !== null)
        return t;
      e = e.sibling;
    }
    return null;
  }
  var Tg = _t.unstable_scheduleCallback, py = _t.unstable_cancelCallback, wx = _t.unstable_shouldYield, Sx = _t.unstable_requestPaint, xe = _t.unstable_now, Ex = _t.unstable_getCurrentPriorityLevel, Nf = _t.unstable_ImmediatePriority, Fg = _t.unstable_UserBlockingPriority, du = _t.unstable_NormalPriority, Rx = _t.unstable_LowPriority, Og = _t.unstable_IdlePriority, Fu = null, gn = null;
  function xx(e) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        gn.onCommitFiberRoot(Fu, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
  }
  var tn = Math.clz32 ? Math.clz32 : Cx, kx = Math.log, _x = Math.LN2;
  function Cx(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (kx(e) / _x | 0) | 0;
  }
  var Ia = 64, za = 4194304;
  function Gi(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function fu(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
      return 0;
    var r = 0, o = e.suspendedLanes, i = e.pingedLanes, l = n & 268435455;
    if (l !== 0) {
      var a = l & ~o;
      a !== 0 ? r = Gi(a) : (i &= l, i !== 0 && (r = Gi(i)));
    } else
      l = n & ~o, l !== 0 ? r = Gi(l) : i !== 0 && (r = Gi(i));
    if (r === 0)
      return 0;
    if (t !== 0 && t !== r && !(t & o) && (o = r & -r, i = t & -t, o >= i || o === 16 && (i & 4194240) !== 0))
      return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
      for (e = e.entanglements, t &= r; 0 < t; )
        n = 31 - tn(t), o = 1 << n, r |= e[n], t &= ~o;
    return r;
  }
  function Nx(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Px(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
      var l = 31 - tn(i), a = 1 << l, u = o[l];
      u === -1 ? (!(a & n) || a & r) && (o[l] = Nx(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
    }
  }
  function Vd(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Mg() {
    var e = Ia;
    return Ia <<= 1, !(Ia & 4194240) && (Ia = 64), e;
  }
  function sd(e) {
    for (var t = [], n = 0; 31 > n; n++)
      t.push(e);
    return t;
  }
  function _l(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - tn(t), e[t] = n;
  }
  function Dx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var o = 31 - tn(n), i = 1 << o;
      t[o] = 0, r[o] = -1, e[o] = -1, n &= ~i;
    }
  }
  function Pf(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - tn(n), o = 1 << r;
      o & t | e[r] & t && (e[r] |= t), n &= ~o;
    }
  }
  var ee = 0;
  function Ag(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Ig, Df, zg, Ug, jg, $d = false, Ua = [], fr = null, pr = null, hr = null, dl = /* @__PURE__ */ new Map(), fl = /* @__PURE__ */ new Map(), ur = [], Lx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function hy(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fr = null;
        break;
      case "dragenter":
      case "dragleave":
        pr = null;
        break;
      case "mouseover":
      case "mouseout":
        hr = null;
        break;
      case "pointerover":
      case "pointerout":
        dl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fl.delete(t.pointerId);
    }
  }
  function Bi(e, t, n, r, o, i) {
    return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [o] }, t !== null && (t = Nl(t), t !== null && Df(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function Tx(e, t, n, r, o) {
    switch (t) {
      case "focusin":
        return fr = Bi(fr, e, t, n, r, o), true;
      case "dragenter":
        return pr = Bi(pr, e, t, n, r, o), true;
      case "mouseover":
        return hr = Bi(hr, e, t, n, r, o), true;
      case "pointerover":
        var i = o.pointerId;
        return dl.set(i, Bi(dl.get(i) || null, e, t, n, r, o)), true;
      case "gotpointercapture":
        return i = o.pointerId, fl.set(i, Bi(fl.get(i) || null, e, t, n, r, o)), true;
    }
    return false;
  }
  function bg(e) {
    var t = qr(e.target);
    if (t !== null) {
      var n = so(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Pg(n), t !== null) {
            e.blockedOn = t, jg(e.priority, function() {
              zg(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function qa(e) {
    if (e.blockedOn !== null)
      return false;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Wd(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        jd = r, n.target.dispatchEvent(r), jd = null;
      } else
        return t = Nl(n), t !== null && Df(t), e.blockedOn = n, false;
      t.shift();
    }
    return true;
  }
  function my(e, t, n) {
    qa(e) && n.delete(t);
  }
  function Fx() {
    $d = false, fr !== null && qa(fr) && (fr = null), pr !== null && qa(pr) && (pr = null), hr !== null && qa(hr) && (hr = null), dl.forEach(my), fl.forEach(my);
  }
  function Vi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, $d || ($d = true, _t.unstable_scheduleCallback(_t.unstable_NormalPriority, Fx)));
  }
  function pl(e) {
    function t(o) {
      return Vi(o, e);
    }
    if (0 < Ua.length) {
      Vi(Ua[0], e);
      for (var n = 1; n < Ua.length; n++) {
        var r = Ua[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (fr !== null && Vi(fr, e), pr !== null && Vi(pr, e), hr !== null && Vi(hr, e), dl.forEach(t), fl.forEach(t), n = 0; n < ur.length; n++)
      r = ur[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ur.length && (n = ur[0], n.blockedOn === null); )
      bg(n), n.blockedOn === null && ur.shift();
  }
  var ni = Vn.ReactCurrentBatchConfig, pu = true;
  function Ox(e, t, n, r) {
    var o = ee, i = ni.transition;
    ni.transition = null;
    try {
      ee = 1, Lf(e, t, n, r);
    } finally {
      ee = o, ni.transition = i;
    }
  }
  function Mx(e, t, n, r) {
    var o = ee, i = ni.transition;
    ni.transition = null;
    try {
      ee = 4, Lf(e, t, n, r);
    } finally {
      ee = o, ni.transition = i;
    }
  }
  function Lf(e, t, n, r) {
    if (pu) {
      var o = Wd(e, t, n, r);
      if (o === null)
        vd(e, t, r, hu, n), hy(e, r);
      else if (Tx(o, e, t, n, r))
        r.stopPropagation();
      else if (hy(e, r), t & 4 && -1 < Lx.indexOf(e)) {
        for (; o !== null; ) {
          var i = Nl(o);
          if (i !== null && Ig(i), i = Wd(e, t, n, r), i === null && vd(e, t, r, hu, n), i === o)
            break;
          o = i;
        }
        o !== null && r.stopPropagation();
      } else
        vd(e, t, r, null, n);
    }
  }
  var hu = null;
  function Wd(e, t, n, r) {
    if (hu = null, e = Cf(r), e = qr(e), e !== null)
      if (t = so(e), t === null)
        e = null;
      else if (n = t.tag, n === 13) {
        if (e = Pg(t), e !== null)
          return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else
        t !== e && (e = null);
    return hu = e, null;
  }
  function Hg(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Ex()) {
          case Nf:
            return 1;
          case Fg:
            return 4;
          case du:
          case Rx:
            return 16;
          case Og:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var cr = null, Tf = null, Za = null;
  function Bg() {
    if (Za)
      return Za;
    var e, t = Tf, n = t.length, r, o = "value" in cr ? cr.value : cr.textContent, i = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++)
      ;
    var l = n - e;
    for (r = 1; r <= l && t[n - r] === o[i - r]; r++)
      ;
    return Za = o.slice(e, 1 < r ? 1 - r : void 0);
  }
  function eu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ja() {
    return true;
  }
  function vy() {
    return false;
  }
  function Ct(e) {
    function t(n, r, o, i, l) {
      this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var a in e)
        e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === false) ? ja : vy, this.isPropagationStopped = vy, this;
    }
    return ge(t.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = false), this.isDefaultPrevented = ja);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = true), this.isPropagationStopped = ja);
    }, persist: function() {
    }, isPersistent: ja }), t;
  }
  var fi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ff = Ct(fi), Cl = ge({}, fi, { view: 0, detail: 0 }), Ax = Ct(Cl), cd, dd, $i, Ou = ge({}, Cl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Of, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== $i && ($i && e.type === "mousemove" ? (cd = e.screenX - $i.screenX, dd = e.screenY - $i.screenY) : dd = cd = 0, $i = e), cd);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : dd;
  } }), yy = Ct(Ou), Ix = ge({}, Ou, { dataTransfer: 0 }), zx = Ct(Ix), Ux = ge({}, Cl, { relatedTarget: 0 }), fd = Ct(Ux), jx = ge({}, fi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), bx = Ct(jx), Hx = ge({}, fi, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Bx = Ct(Hx), Vx = ge({}, fi, { data: 0 }), gy = Ct(Vx), $x = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, Wx = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, Kx = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Qx(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Kx[e]) ? !!t[e] : false;
  }
  function Of() {
    return Qx;
  }
  var Yx = ge({}, Cl, { key: function(e) {
    if (e.key) {
      var t = $x[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    return e.type === "keypress" ? (e = eu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wx[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Of, charCode: function(e) {
    return e.type === "keypress" ? eu(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? eu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Jx = Ct(Yx), Xx = ge({}, Ou, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), wy = Ct(Xx), Gx = ge({}, Cl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Of }), qx = Ct(Gx), Zx = ge({}, fi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ek = Ct(Zx), tk = ge({}, Ou, { deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), nk = Ct(tk), rk = [9, 13, 27, 32], Mf = jn && "CompositionEvent" in window, tl = null;
  jn && "documentMode" in document && (tl = document.documentMode);
  var ok = jn && "TextEvent" in window && !tl, Vg = jn && (!Mf || tl && 8 < tl && 11 >= tl), Sy = String.fromCharCode(32), Ey = false;
  function $g(e, t) {
    switch (e) {
      case "keyup":
        return rk.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Wg(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Vo = false;
  function ik(e, t) {
    switch (e) {
      case "compositionend":
        return Wg(t);
      case "keypress":
        return t.which !== 32 ? null : (Ey = true, Sy);
      case "textInput":
        return e = t.data, e === Sy && Ey ? null : e;
      default:
        return null;
    }
  }
  function lk(e, t) {
    if (Vo)
      return e === "compositionend" || !Mf && $g(e, t) ? (e = Bg(), Za = Tf = cr = null, Vo = false, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Vg && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var ak = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function Ry(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!ak[e.type] : t === "textarea";
  }
  function Kg(e, t, n, r) {
    xg(r), t = mu(t, "onChange"), 0 < t.length && (n = new Ff("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var nl = null, hl = null;
  function uk(e) {
    r0(e, 0);
  }
  function Mu(e) {
    var t = Ko(e);
    if (vg(t))
      return e;
  }
  function sk(e, t) {
    if (e === "change")
      return t;
  }
  var Qg = false;
  jn && (jn ? (Ha = "oninput" in document, Ha || (pd = document.createElement("div"), pd.setAttribute("oninput", "return;"), Ha = typeof pd.oninput == "function"), ba = Ha) : ba = false, Qg = ba && (!document.documentMode || 9 < document.documentMode));
  var ba, Ha, pd;
  function xy() {
    nl && (nl.detachEvent("onpropertychange", Yg), hl = nl = null);
  }
  function Yg(e) {
    if (e.propertyName === "value" && Mu(hl)) {
      var t = [];
      Kg(t, hl, e, Cf(e)), Ng(uk, t);
    }
  }
  function ck(e, t, n) {
    e === "focusin" ? (xy(), nl = t, hl = n, nl.attachEvent("onpropertychange", Yg)) : e === "focusout" && xy();
  }
  function dk(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Mu(hl);
  }
  function fk(e, t) {
    if (e === "click")
      return Mu(t);
  }
  function pk(e, t) {
    if (e === "input" || e === "change")
      return Mu(t);
  }
  function hk(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var rn = typeof Object.is == "function" ? Object.is : hk;
  function ml(e, t) {
    if (rn(e, t))
      return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return false;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length)
      return false;
    for (r = 0; r < n.length; r++) {
      var o = n[r];
      if (!Nd.call(t, o) || !rn(e[o], t[o]))
        return false;
    }
    return true;
  }
  function ky(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function _y(e, t) {
    var n = ky(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t)
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = ky(n);
    }
  }
  function Jg(e, t) {
    return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? Jg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
  }
  function Xg() {
    for (var e = window, t = uu(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = false;
      }
      if (n)
        e = t.contentWindow;
      else
        break;
      t = uu(e.document);
    }
    return t;
  }
  function Af(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function mk(e) {
    var t = Xg(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Jg(n.ownerDocument.documentElement, n)) {
      if (r !== null && Af(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
          n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var o = n.textContent.length, i = Math.min(r.start, o);
          r = r.end === void 0 ? i : Math.min(r.end, o), !e.extend && i > r && (o = r, r = i, i = o), o = _y(n, i);
          var l = _y(n, r);
          o && l && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== l.node || e.focusOffset !== l.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(l.node, l.offset)) : (t.setEnd(l.node, l.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; )
        e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var vk = jn && "documentMode" in document && 11 >= document.documentMode, $o = null, Kd = null, rl = null, Qd = false;
  function Cy(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Qd || $o == null || $o !== uu(r) || (r = $o, "selectionStart" in r && Af(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), rl && ml(rl, r) || (rl = r, r = mu(Kd, "onSelect"), 0 < r.length && (t = new Ff("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = $o)));
  }
  function Ba(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Wo = { animationend: Ba("Animation", "AnimationEnd"), animationiteration: Ba("Animation", "AnimationIteration"), animationstart: Ba("Animation", "AnimationStart"), transitionend: Ba("Transition", "TransitionEnd") }, hd = {}, Gg = {};
  jn && (Gg = document.createElement("div").style, "AnimationEvent" in window || (delete Wo.animationend.animation, delete Wo.animationiteration.animation, delete Wo.animationstart.animation), "TransitionEvent" in window || delete Wo.transitionend.transition);
  function Au(e) {
    if (hd[e])
      return hd[e];
    if (!Wo[e])
      return e;
    var t = Wo[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Gg)
        return hd[e] = t[n];
    return e;
  }
  var qg = Au("animationend"), Zg = Au("animationiteration"), e0 = Au("animationstart"), t0 = Au("transitionend"), n0 = /* @__PURE__ */ new Map(), Ny = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Rr(e, t) {
    n0.set(e, t), uo(t, [e]);
  }
  for (Va = 0; Va < Ny.length; Va++)
    $a = Ny[Va], Py = $a.toLowerCase(), Dy = $a[0].toUpperCase() + $a.slice(1), Rr(Py, "on" + Dy);
  var $a, Py, Dy, Va;
  Rr(qg, "onAnimationEnd");
  Rr(Zg, "onAnimationIteration");
  Rr(e0, "onAnimationStart");
  Rr("dblclick", "onDoubleClick");
  Rr("focusin", "onFocus");
  Rr("focusout", "onBlur");
  Rr(t0, "onTransitionEnd");
  ii("onMouseEnter", ["mouseout", "mouseover"]);
  ii("onMouseLeave", ["mouseout", "mouseover"]);
  ii("onPointerEnter", ["pointerout", "pointerover"]);
  ii("onPointerLeave", ["pointerout", "pointerover"]);
  uo("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  uo("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  uo("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  uo("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  uo("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  uo("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var qi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yk = new Set("cancel close invalid load scroll toggle".split(" ").concat(qi));
  function Ly(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, yx(r, t, void 0, e), e.currentTarget = null;
  }
  function r0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], o = r.event;
      r = r.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var l = r.length - 1; 0 <= l; l--) {
            var a = r[l], u = a.instance, s = a.currentTarget;
            if (a = a.listener, u !== i && o.isPropagationStopped())
              break e;
            Ly(o, a, s), i = u;
          }
        else
          for (l = 0; l < r.length; l++) {
            if (a = r[l], u = a.instance, s = a.currentTarget, a = a.listener, u !== i && o.isPropagationStopped())
              break e;
            Ly(o, a, s), i = u;
          }
      }
    }
    if (cu)
      throw e = Bd, cu = false, Bd = null, e;
  }
  function ce(e, t) {
    var n = t[qd];
    n === void 0 && (n = t[qd] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (o0(t, e, 2, false), n.add(r));
  }
  function md(e, t, n) {
    var r = 0;
    t && (r |= 4), o0(n, e, r, t);
  }
  var Wa = "_reactListening" + Math.random().toString(36).slice(2);
  function vl(e) {
    if (!e[Wa]) {
      e[Wa] = true, dg.forEach(function(n) {
        n !== "selectionchange" && (yk.has(n) || md(n, false, e), md(n, true, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Wa] || (t[Wa] = true, md("selectionchange", false, t));
    }
  }
  function o0(e, t, n, r) {
    switch (Hg(t)) {
      case 1:
        var o = Ox;
        break;
      case 4:
        o = Mx;
        break;
      default:
        o = Lf;
    }
    n = o.bind(null, t, n, e), o = void 0, !Hd || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = true), r ? o !== void 0 ? e.addEventListener(t, n, { capture: true, passive: o }) : e.addEventListener(t, n, true) : o !== void 0 ? e.addEventListener(t, n, { passive: o }) : e.addEventListener(t, n, false);
  }
  function vd(e, t, n, r, o) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e:
        for (; ; ) {
          if (r === null)
            return;
          var l = r.tag;
          if (l === 3 || l === 4) {
            var a = r.stateNode.containerInfo;
            if (a === o || a.nodeType === 8 && a.parentNode === o)
              break;
            if (l === 4)
              for (l = r.return; l !== null; ) {
                var u = l.tag;
                if ((u === 3 || u === 4) && (u = l.stateNode.containerInfo, u === o || u.nodeType === 8 && u.parentNode === o))
                  return;
                l = l.return;
              }
            for (; a !== null; ) {
              if (l = qr(a), l === null)
                return;
              if (u = l.tag, u === 5 || u === 6) {
                r = i = l;
                continue e;
              }
              a = a.parentNode;
            }
          }
          r = r.return;
        }
    Ng(function() {
      var s = i, c = Cf(n), d = [];
      e: {
        var p = n0.get(e);
        if (p !== void 0) {
          var m = Ff, y = e;
          switch (e) {
            case "keypress":
              if (eu(n) === 0)
                break e;
            case "keydown":
            case "keyup":
              m = Jx;
              break;
            case "focusin":
              y = "focus", m = fd;
              break;
            case "focusout":
              y = "blur", m = fd;
              break;
            case "beforeblur":
            case "afterblur":
              m = fd;
              break;
            case "click":
              if (n.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              m = yy;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              m = zx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              m = qx;
              break;
            case qg:
            case Zg:
            case e0:
              m = bx;
              break;
            case t0:
              m = ek;
              break;
            case "scroll":
              m = Ax;
              break;
            case "wheel":
              m = nk;
              break;
            case "copy":
            case "cut":
            case "paste":
              m = Bx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              m = wy;
          }
          var w = (t & 4) !== 0, R = !w && e === "scroll", f = w ? p !== null ? p + "Capture" : null : p;
          w = [];
          for (var h = s, v; h !== null; ) {
            v = h;
            var E = v.stateNode;
            if (v.tag === 5 && E !== null && (v = E, f !== null && (E = cl(h, f), E != null && w.push(yl(h, E, v)))), R)
              break;
            h = h.return;
          }
          0 < w.length && (p = new m(p, y, null, n, c), d.push({ event: p, listeners: w }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (p = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", p && n !== jd && (y = n.relatedTarget || n.fromElement) && (qr(y) || y[bn]))
            break e;
          if ((m || p) && (p = c.window === c ? c : (p = c.ownerDocument) ? p.defaultView || p.parentWindow : window, m ? (y = n.relatedTarget || n.toElement, m = s, y = y ? qr(y) : null, y !== null && (R = so(y), y !== R || y.tag !== 5 && y.tag !== 6) && (y = null)) : (m = null, y = s), m !== y)) {
            if (w = yy, E = "onMouseLeave", f = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (w = wy, E = "onPointerLeave", f = "onPointerEnter", h = "pointer"), R = m == null ? p : Ko(m), v = y == null ? p : Ko(y), p = new w(E, h + "leave", m, n, c), p.target = R, p.relatedTarget = v, E = null, qr(c) === s && (w = new w(f, h + "enter", y, n, c), w.target = v, w.relatedTarget = R, E = w), R = E, m && y)
              t: {
                for (w = m, f = y, h = 0, v = w; v; v = bo(v))
                  h++;
                for (v = 0, E = f; E; E = bo(E))
                  v++;
                for (; 0 < h - v; )
                  w = bo(w), h--;
                for (; 0 < v - h; )
                  f = bo(f), v--;
                for (; h--; ) {
                  if (w === f || f !== null && w === f.alternate)
                    break t;
                  w = bo(w), f = bo(f);
                }
                w = null;
              }
            else
              w = null;
            m !== null && Ty(d, p, m, w, false), y !== null && R !== null && Ty(d, R, y, w, true);
          }
        }
        e: {
          if (p = s ? Ko(s) : window, m = p.nodeName && p.nodeName.toLowerCase(), m === "select" || m === "input" && p.type === "file")
            var k = sk;
          else if (Ry(p))
            if (Qg)
              k = pk;
            else {
              k = dk;
              var g = ck;
            }
          else
            (m = p.nodeName) && m.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (k = fk);
          if (k && (k = k(e, s))) {
            Kg(d, k, n, c);
            break e;
          }
          g && g(e, p, s), e === "focusout" && (g = p._wrapperState) && g.controlled && p.type === "number" && Md(p, "number", p.value);
        }
        switch (g = s ? Ko(s) : window, e) {
          case "focusin":
            (Ry(g) || g.contentEditable === "true") && ($o = g, Kd = s, rl = null);
            break;
          case "focusout":
            rl = Kd = $o = null;
            break;
          case "mousedown":
            Qd = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qd = false, Cy(d, n, c);
            break;
          case "selectionchange":
            if (vk)
              break;
          case "keydown":
          case "keyup":
            Cy(d, n, c);
        }
        var _;
        if (Mf)
          e: {
            switch (e) {
              case "compositionstart":
                var P = "onCompositionStart";
                break e;
              case "compositionend":
                P = "onCompositionEnd";
                break e;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break e;
            }
            P = void 0;
          }
        else
          Vo ? $g(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
        P && (Vg && n.locale !== "ko" && (Vo || P !== "onCompositionStart" ? P === "onCompositionEnd" && Vo && (_ = Bg()) : (cr = c, Tf = "value" in cr ? cr.value : cr.textContent, Vo = true)), g = mu(s, P), 0 < g.length && (P = new gy(P, e, null, n, c), d.push({ event: P, listeners: g }), _ ? P.data = _ : (_ = Wg(n), _ !== null && (P.data = _)))), (_ = ok ? ik(e, n) : lk(e, n)) && (s = mu(s, "onBeforeInput"), 0 < s.length && (c = new gy("onBeforeInput", "beforeinput", null, n, c), d.push({ event: c, listeners: s }), c.data = _));
      }
      r0(d, t);
    });
  }
  function yl(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function mu(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var o = e, i = o.stateNode;
      o.tag === 5 && i !== null && (o = i, i = cl(e, n), i != null && r.unshift(yl(e, i, o)), i = cl(e, t), i != null && r.push(yl(e, i, o))), e = e.return;
    }
    return r;
  }
  function bo(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Ty(e, t, n, r, o) {
    for (var i = t._reactName, l = []; n !== null && n !== r; ) {
      var a = n, u = a.alternate, s = a.stateNode;
      if (u !== null && u === r)
        break;
      a.tag === 5 && s !== null && (a = s, o ? (u = cl(n, i), u != null && l.unshift(yl(n, u, a))) : o || (u = cl(n, i), u != null && l.push(yl(n, u, a)))), n = n.return;
    }
    l.length !== 0 && e.push({ event: t, listeners: l });
  }
  var gk = /\r\n?/g, wk = /\u0000|\uFFFD/g;
  function Fy(e) {
    return (typeof e == "string" ? e : "" + e).replace(gk, `
`).replace(wk, "");
  }
  function Ka(e, t, n) {
    if (t = Fy(t), Fy(e) !== t && n)
      throw Error(L(425));
  }
  function vu() {
  }
  var Yd = null, Jd = null;
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Gd = typeof setTimeout == "function" ? setTimeout : void 0, Sk = typeof clearTimeout == "function" ? clearTimeout : void 0, Oy = typeof Promise == "function" ? Promise : void 0, Ek = typeof queueMicrotask == "function" ? queueMicrotask : typeof Oy < "u" ? function(e) {
    return Oy.resolve(null).then(e).catch(Rk);
  } : Gd;
  function Rk(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function yd(e, t) {
    var n = t, r = 0;
    do {
      var o = n.nextSibling;
      if (e.removeChild(n), o && o.nodeType === 8)
        if (n = o.data, n === "/$") {
          if (r === 0) {
            e.removeChild(o), pl(t);
            return;
          }
          r--;
        } else
          n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = o;
    } while (n);
    pl(t);
  }
  function mr(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3)
        break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?")
          break;
        if (t === "/$")
          return null;
      }
    }
    return e;
  }
  function My(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0)
            return e;
          t--;
        } else
          n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var pi = Math.random().toString(36).slice(2), yn = "__reactFiber$" + pi, gl = "__reactProps$" + pi, bn = "__reactContainer$" + pi, qd = "__reactEvents$" + pi, xk = "__reactListeners$" + pi, kk = "__reactHandles$" + pi;
  function qr(e) {
    var t = e[yn];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[bn] || n[yn]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = My(e); e !== null; ) {
            if (n = e[yn])
              return n;
            e = My(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Nl(e) {
    return e = e[yn] || e[bn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Ko(e) {
    if (e.tag === 5 || e.tag === 6)
      return e.stateNode;
    throw Error(L(33));
  }
  function Iu(e) {
    return e[gl] || null;
  }
  var Zd = [], Qo = -1;
  function xr(e) {
    return { current: e };
  }
  function de(e) {
    0 > Qo || (e.current = Zd[Qo], Zd[Qo] = null, Qo--);
  }
  function le(e, t) {
    Qo++, Zd[Qo] = e.current, e.current = t;
  }
  var Er = {}, qe = xr(Er), ft = xr(false), ro = Er;
  function li(e, t) {
    var n = e.type.contextTypes;
    if (!n)
      return Er;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var o = {}, i;
    for (i in n)
      o[i] = t[i];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
  }
  function pt(e) {
    return e = e.childContextTypes, e != null;
  }
  function yu() {
    de(ft), de(qe);
  }
  function Ay(e, t, n) {
    if (qe.current !== Er)
      throw Error(L(168));
    le(qe, t), le(ft, n);
  }
  function i0(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function")
      return n;
    r = r.getChildContext();
    for (var o in r)
      if (!(o in t))
        throw Error(L(108, cx(e) || "Unknown", o));
    return ge({}, n, r);
  }
  function gu(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Er, ro = qe.current, le(qe, e), le(ft, ft.current), true;
  }
  function Iy(e, t, n) {
    var r = e.stateNode;
    if (!r)
      throw Error(L(169));
    n ? (e = i0(e, t, ro), r.__reactInternalMemoizedMergedChildContext = e, de(ft), de(qe), le(qe, e)) : de(ft), le(ft, n);
  }
  var An = null, zu = false, gd = false;
  function l0(e) {
    An === null ? An = [e] : An.push(e);
  }
  function _k(e) {
    zu = true, l0(e);
  }
  function kr() {
    if (!gd && An !== null) {
      gd = true;
      var e = 0, t = ee;
      try {
        var n = An;
        for (ee = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(true);
          while (r !== null);
        }
        An = null, zu = false;
      } catch (o) {
        throw An !== null && (An = An.slice(e + 1)), Tg(Nf, kr), o;
      } finally {
        ee = t, gd = false;
      }
    }
    return null;
  }
  var Yo = [], Jo = 0, wu = null, Su = 0, jt = [], bt = 0, oo = null, In = 1, zn = "";
  function Xr(e, t) {
    Yo[Jo++] = Su, Yo[Jo++] = wu, wu = e, Su = t;
  }
  function a0(e, t, n) {
    jt[bt++] = In, jt[bt++] = zn, jt[bt++] = oo, oo = e;
    var r = In;
    e = zn;
    var o = 32 - tn(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - tn(t) + o;
    if (30 < i) {
      var l = o - o % 5;
      i = (r & (1 << l) - 1).toString(32), r >>= l, o -= l, In = 1 << 32 - tn(t) + o | n << o | r, zn = i + e;
    } else
      In = 1 << i | n << o | r, zn = e;
  }
  function If(e) {
    e.return !== null && (Xr(e, 1), a0(e, 1, 0));
  }
  function zf(e) {
    for (; e === wu; )
      wu = Yo[--Jo], Yo[Jo] = null, Su = Yo[--Jo], Yo[Jo] = null;
    for (; e === oo; )
      oo = jt[--bt], jt[bt] = null, zn = jt[--bt], jt[bt] = null, In = jt[--bt], jt[bt] = null;
  }
  var kt = null, xt = null, he = false, en = null;
  function u0(e, t) {
    var n = Ht(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function zy(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, kt = e, xt = mr(t.firstChild), true) : false;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, kt = e, xt = null, true) : false;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = oo !== null ? { id: In, overflow: zn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ht(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, kt = e, xt = null, true) : false;
      default:
        return false;
    }
  }
  function ef(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function tf(e) {
    if (he) {
      var t = xt;
      if (t) {
        var n = t;
        if (!zy(e, t)) {
          if (ef(e))
            throw Error(L(418));
          t = mr(n.nextSibling);
          var r = kt;
          t && zy(e, t) ? u0(r, n) : (e.flags = e.flags & -4097 | 2, he = false, kt = e);
        }
      } else {
        if (ef(e))
          throw Error(L(418));
        e.flags = e.flags & -4097 | 2, he = false, kt = e;
      }
    }
  }
  function Uy(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
      e = e.return;
    kt = e;
  }
  function Qa(e) {
    if (e !== kt)
      return false;
    if (!he)
      return Uy(e), he = true, false;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Xd(e.type, e.memoizedProps)), t && (t = xt)) {
      if (ef(e))
        throw s0(), Error(L(418));
      for (; t; )
        u0(e, t), t = mr(t.nextSibling);
    }
    if (Uy(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(L(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                xt = mr(e.nextSibling);
                break e;
              }
              t--;
            } else
              n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        xt = null;
      }
    } else
      xt = kt ? mr(e.stateNode.nextSibling) : null;
    return true;
  }
  function s0() {
    for (var e = xt; e; )
      e = mr(e.nextSibling);
  }
  function ai() {
    xt = kt = null, he = false;
  }
  function Uf(e) {
    en === null ? en = [e] : en.push(e);
  }
  var Ck = Vn.ReactCurrentBatchConfig;
  function qt(e, t) {
    if (e && e.defaultProps) {
      t = ge({}, t), e = e.defaultProps;
      for (var n in e)
        t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var Eu = xr(null), Ru = null, Xo = null, jf = null;
  function bf() {
    jf = Xo = Ru = null;
  }
  function Hf(e) {
    var t = Eu.current;
    de(Eu), e._currentValue = t;
  }
  function nf(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
        break;
      e = e.return;
    }
  }
  function ri(e, t) {
    Ru = e, jf = Xo = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (dt = true), e.firstContext = null);
  }
  function Vt(e) {
    var t = e._currentValue;
    if (jf !== e)
      if (e = { context: e, memoizedValue: t, next: null }, Xo === null) {
        if (Ru === null)
          throw Error(L(308));
        Xo = e, Ru.dependencies = { lanes: 0, firstContext: e };
      } else
        Xo = Xo.next = e;
    return t;
  }
  var Zr = null;
  function Bf(e) {
    Zr === null ? Zr = [e] : Zr.push(e);
  }
  function c0(e, t, n, r) {
    var o = t.interleaved;
    return o === null ? (n.next = n, Bf(t)) : (n.next = o.next, o.next = n), t.interleaved = n, Hn(e, r);
  }
  function Hn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var ar = false;
  function Vf(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function d0(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Un(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function vr(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
      return null;
    if (r = r.shared, q & 2) {
      var o = r.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), r.pending = t, Hn(e, n);
    }
    return o = r.interleaved, o === null ? (t.next = t, Bf(r)) : (t.next = o.next, o.next = t), r.interleaved = t, Hn(e, n);
  }
  function tu(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Pf(e, n);
    }
  }
  function jy(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var o = null, i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var l = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          i === null ? o = i = l : i = i.next = l, n = n.next;
        } while (n !== null);
        i === null ? o = i = t : i = i.next = t;
      } else
        o = i = t;
      n = { baseState: r.baseState, firstBaseUpdate: o, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function xu(e, t, n, r) {
    var o = e.updateQueue;
    ar = false;
    var i = o.firstBaseUpdate, l = o.lastBaseUpdate, a = o.shared.pending;
    if (a !== null) {
      o.shared.pending = null;
      var u = a, s = u.next;
      u.next = null, l === null ? i = s : l.next = s, l = u;
      var c = e.alternate;
      c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== l && (a === null ? c.firstBaseUpdate = s : a.next = s, c.lastBaseUpdate = u));
    }
    if (i !== null) {
      var d = o.baseState;
      l = 0, c = s = u = null, a = i;
      do {
        var p = a.lane, m = a.eventTime;
        if ((r & p) === p) {
          c !== null && (c = c.next = { eventTime: m, lane: 0, tag: a.tag, payload: a.payload, callback: a.callback, next: null });
          e: {
            var y = e, w = a;
            switch (p = t, m = n, w.tag) {
              case 1:
                if (y = w.payload, typeof y == "function") {
                  d = y.call(m, d, p);
                  break e;
                }
                d = y;
                break e;
              case 3:
                y.flags = y.flags & -65537 | 128;
              case 0:
                if (y = w.payload, p = typeof y == "function" ? y.call(m, d, p) : y, p == null)
                  break e;
                d = ge({}, d, p);
                break e;
              case 2:
                ar = true;
            }
          }
          a.callback !== null && a.lane !== 0 && (e.flags |= 64, p = o.effects, p === null ? o.effects = [a] : p.push(a));
        } else
          m = { eventTime: m, lane: p, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, c === null ? (s = c = m, u = d) : c = c.next = m, l |= p;
        if (a = a.next, a === null) {
          if (a = o.shared.pending, a === null)
            break;
          p = a, a = p.next, p.next = null, o.lastBaseUpdate = p, o.shared.pending = null;
        }
      } while (1);
      if (c === null && (u = d), o.baseState = u, o.firstBaseUpdate = s, o.lastBaseUpdate = c, t = o.shared.interleaved, t !== null) {
        o = t;
        do
          l |= o.lane, o = o.next;
        while (o !== t);
      } else
        i === null && (o.shared.lanes = 0);
      lo |= l, e.lanes = l, e.memoizedState = d;
    }
  }
  function by(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
      for (t = 0; t < e.length; t++) {
        var r = e[t], o = r.callback;
        if (o !== null) {
          if (r.callback = null, r = n, typeof o != "function")
            throw Error(L(191, o));
          o.call(r);
        }
      }
  }
  var f0 = new cg.Component().refs;
  function rf(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : ge({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Uu = { isMounted: function(e) {
    return (e = e._reactInternals) ? so(e) === e : false;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = rt(), o = gr(e), i = Un(r, o);
    i.payload = t, n != null && (i.callback = n), t = vr(e, i, o), t !== null && (nn(t, e, o, r), tu(t, e, o));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = rt(), o = gr(e), i = Un(r, o);
    i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vr(e, i, o), t !== null && (nn(t, e, o, r), tu(t, e, o));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = rt(), r = gr(e), o = Un(n, r);
    o.tag = 2, t != null && (o.callback = t), t = vr(e, o, r), t !== null && (nn(t, e, r, n), tu(t, e, r));
  } };
  function Hy(e, t, n, r, o, i, l) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, l) : t.prototype && t.prototype.isPureReactComponent ? !ml(n, r) || !ml(o, i) : true;
  }
  function p0(e, t, n) {
    var r = false, o = Er, i = t.contextType;
    return typeof i == "object" && i !== null ? i = Vt(i) : (o = pt(t) ? ro : qe.current, r = t.contextTypes, i = (r = r != null) ? li(e, o) : Er), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Uu, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t;
  }
  function By(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Uu.enqueueReplaceState(t, t.state, null);
  }
  function of(e, t, n, r) {
    var o = e.stateNode;
    o.props = n, o.state = e.memoizedState, o.refs = f0, Vf(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? o.context = Vt(i) : (i = pt(t) ? ro : qe.current, o.context = li(e, i)), o.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (rf(e, t, i, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && Uu.enqueueReplaceState(o, o.state, null), xu(e, n, o, r), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Wi(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1)
            throw Error(L(309));
          var r = n.stateNode;
        }
        if (!r)
          throw Error(L(147, e));
        var o = r, i = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(l) {
          var a = o.refs;
          a === f0 && (a = o.refs = {}), l === null ? delete a[i] : a[i] = l;
        }, t._stringRef = i, t);
      }
      if (typeof e != "string")
        throw Error(L(284));
      if (!n._owner)
        throw Error(L(290, e));
    }
    return e;
  }
  function Ya(e, t) {
    throw e = Object.prototype.toString.call(t), Error(L(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Vy(e) {
    var t = e._init;
    return t(e._payload);
  }
  function h0(e) {
    function t(f, h) {
      if (e) {
        var v = f.deletions;
        v === null ? (f.deletions = [h], f.flags |= 16) : v.push(h);
      }
    }
    function n(f, h) {
      if (!e)
        return null;
      for (; h !== null; )
        t(f, h), h = h.sibling;
      return null;
    }
    function r(f, h) {
      for (f = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? f.set(h.key, h) : f.set(h.index, h), h = h.sibling;
      return f;
    }
    function o(f, h) {
      return f = wr(f, h), f.index = 0, f.sibling = null, f;
    }
    function i(f, h, v) {
      return f.index = v, e ? (v = f.alternate, v !== null ? (v = v.index, v < h ? (f.flags |= 2, h) : v) : (f.flags |= 2, h)) : (f.flags |= 1048576, h);
    }
    function l(f) {
      return e && f.alternate === null && (f.flags |= 2), f;
    }
    function a(f, h, v, E) {
      return h === null || h.tag !== 6 ? (h = _d(v, f.mode, E), h.return = f, h) : (h = o(h, v), h.return = f, h);
    }
    function u(f, h, v, E) {
      var k = v.type;
      return k === Bo ? c(f, h, v.props.children, E, v.key) : h !== null && (h.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lr && Vy(k) === h.type) ? (E = o(h, v.props), E.ref = Wi(f, h, v), E.return = f, E) : (E = au(v.type, v.key, v.props, null, f.mode, E), E.ref = Wi(f, h, v), E.return = f, E);
    }
    function s(f, h, v, E) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== v.containerInfo || h.stateNode.implementation !== v.implementation ? (h = Cd(v, f.mode, E), h.return = f, h) : (h = o(h, v.children || []), h.return = f, h);
    }
    function c(f, h, v, E, k) {
      return h === null || h.tag !== 7 ? (h = no(v, f.mode, E, k), h.return = f, h) : (h = o(h, v), h.return = f, h);
    }
    function d(f, h, v) {
      if (typeof h == "string" && h !== "" || typeof h == "number")
        return h = _d("" + h, f.mode, v), h.return = f, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Oa:
            return v = au(h.type, h.key, h.props, null, f.mode, v), v.ref = Wi(f, null, h), v.return = f, v;
          case Ho:
            return h = Cd(h, f.mode, v), h.return = f, h;
          case lr:
            var E = h._init;
            return d(f, E(h._payload), v);
        }
        if (Xi(h) || Hi(h))
          return h = no(h, f.mode, v, null), h.return = f, h;
        Ya(f, h);
      }
      return null;
    }
    function p(f, h, v, E) {
      var k = h !== null ? h.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number")
        return k !== null ? null : a(f, h, "" + v, E);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case Oa:
            return v.key === k ? u(f, h, v, E) : null;
          case Ho:
            return v.key === k ? s(f, h, v, E) : null;
          case lr:
            return k = v._init, p(f, h, k(v._payload), E);
        }
        if (Xi(v) || Hi(v))
          return k !== null ? null : c(f, h, v, E, null);
        Ya(f, v);
      }
      return null;
    }
    function m(f, h, v, E, k) {
      if (typeof E == "string" && E !== "" || typeof E == "number")
        return f = f.get(v) || null, a(h, f, "" + E, k);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Oa:
            return f = f.get(E.key === null ? v : E.key) || null, u(h, f, E, k);
          case Ho:
            return f = f.get(E.key === null ? v : E.key) || null, s(h, f, E, k);
          case lr:
            var g = E._init;
            return m(f, h, v, g(E._payload), k);
        }
        if (Xi(E) || Hi(E))
          return f = f.get(v) || null, c(h, f, E, k, null);
        Ya(h, E);
      }
      return null;
    }
    function y(f, h, v, E) {
      for (var k = null, g = null, _ = h, P = h = 0, O = null; _ !== null && P < v.length; P++) {
        _.index > P ? (O = _, _ = null) : O = _.sibling;
        var z = p(f, _, v[P], E);
        if (z === null) {
          _ === null && (_ = O);
          break;
        }
        e && _ && z.alternate === null && t(f, _), h = i(z, h, P), g === null ? k = z : g.sibling = z, g = z, _ = O;
      }
      if (P === v.length)
        return n(f, _), he && Xr(f, P), k;
      if (_ === null) {
        for (; P < v.length; P++)
          _ = d(f, v[P], E), _ !== null && (h = i(_, h, P), g === null ? k = _ : g.sibling = _, g = _);
        return he && Xr(f, P), k;
      }
      for (_ = r(f, _); P < v.length; P++)
        O = m(_, f, P, v[P], E), O !== null && (e && O.alternate !== null && _.delete(O.key === null ? P : O.key), h = i(O, h, P), g === null ? k = O : g.sibling = O, g = O);
      return e && _.forEach(function(X) {
        return t(f, X);
      }), he && Xr(f, P), k;
    }
    function w(f, h, v, E) {
      var k = Hi(v);
      if (typeof k != "function")
        throw Error(L(150));
      if (v = k.call(v), v == null)
        throw Error(L(151));
      for (var g = k = null, _ = h, P = h = 0, O = null, z = v.next(); _ !== null && !z.done; P++, z = v.next()) {
        _.index > P ? (O = _, _ = null) : O = _.sibling;
        var X = p(f, _, z.value, E);
        if (X === null) {
          _ === null && (_ = O);
          break;
        }
        e && _ && X.alternate === null && t(f, _), h = i(X, h, P), g === null ? k = X : g.sibling = X, g = X, _ = O;
      }
      if (z.done)
        return n(f, _), he && Xr(f, P), k;
      if (_ === null) {
        for (; !z.done; P++, z = v.next())
          z = d(f, z.value, E), z !== null && (h = i(z, h, P), g === null ? k = z : g.sibling = z, g = z);
        return he && Xr(f, P), k;
      }
      for (_ = r(f, _); !z.done; P++, z = v.next())
        z = m(_, f, P, z.value, E), z !== null && (e && z.alternate !== null && _.delete(z.key === null ? P : z.key), h = i(z, h, P), g === null ? k = z : g.sibling = z, g = z);
      return e && _.forEach(function(Ue) {
        return t(f, Ue);
      }), he && Xr(f, P), k;
    }
    function R(f, h, v, E) {
      if (typeof v == "object" && v !== null && v.type === Bo && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case Oa:
            e: {
              for (var k = v.key, g = h; g !== null; ) {
                if (g.key === k) {
                  if (k = v.type, k === Bo) {
                    if (g.tag === 7) {
                      n(f, g.sibling), h = o(g, v.props.children), h.return = f, f = h;
                      break e;
                    }
                  } else if (g.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lr && Vy(k) === g.type) {
                    n(f, g.sibling), h = o(g, v.props), h.ref = Wi(f, g, v), h.return = f, f = h;
                    break e;
                  }
                  n(f, g);
                  break;
                } else
                  t(f, g);
                g = g.sibling;
              }
              v.type === Bo ? (h = no(v.props.children, f.mode, E, v.key), h.return = f, f = h) : (E = au(v.type, v.key, v.props, null, f.mode, E), E.ref = Wi(f, h, v), E.return = f, f = E);
            }
            return l(f);
          case Ho:
            e: {
              for (g = v.key; h !== null; ) {
                if (h.key === g)
                  if (h.tag === 4 && h.stateNode.containerInfo === v.containerInfo && h.stateNode.implementation === v.implementation) {
                    n(f, h.sibling), h = o(h, v.children || []), h.return = f, f = h;
                    break e;
                  } else {
                    n(f, h);
                    break;
                  }
                else
                  t(f, h);
                h = h.sibling;
              }
              h = Cd(v, f.mode, E), h.return = f, f = h;
            }
            return l(f);
          case lr:
            return g = v._init, R(f, h, g(v._payload), E);
        }
        if (Xi(v))
          return y(f, h, v, E);
        if (Hi(v))
          return w(f, h, v, E);
        Ya(f, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, h !== null && h.tag === 6 ? (n(f, h.sibling), h = o(h, v), h.return = f, f = h) : (n(f, h), h = _d(v, f.mode, E), h.return = f, f = h), l(f)) : n(f, h);
    }
    return R;
  }
  var ui = h0(true), m0 = h0(false), Pl = {}, wn = xr(Pl), wl = xr(Pl), Sl = xr(Pl);
  function eo(e) {
    if (e === Pl)
      throw Error(L(174));
    return e;
  }
  function $f(e, t) {
    switch (le(Sl, t), le(wl, e), le(wn, Pl), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Id(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Id(t, e);
    }
    de(wn), le(wn, t);
  }
  function si() {
    de(wn), de(wl), de(Sl);
  }
  function v0(e) {
    eo(Sl.current);
    var t = eo(wn.current), n = Id(t, e.type);
    t !== n && (le(wl, e), le(wn, n));
  }
  function Wf(e) {
    wl.current === e && (de(wn), de(wl));
  }
  var ve = xr(0);
  function ku(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var wd = [];
  function Kf() {
    for (var e = 0; e < wd.length; e++)
      wd[e]._workInProgressVersionPrimary = null;
    wd.length = 0;
  }
  var nu = Vn.ReactCurrentDispatcher, Sd = Vn.ReactCurrentBatchConfig, io = 0, ye = null, Te = null, Ie = null, _u = false, ol = false, El = 0, Nk = 0;
  function Je() {
    throw Error(L(321));
  }
  function Qf(e, t) {
    if (t === null)
      return false;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!rn(e[n], t[n]))
        return false;
    return true;
  }
  function Yf(e, t, n, r, o, i) {
    if (io = i, ye = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, nu.current = e === null || e.memoizedState === null ? Tk : Fk, e = n(r, o), ol) {
      i = 0;
      do {
        if (ol = false, El = 0, 25 <= i)
          throw Error(L(301));
        i += 1, Ie = Te = null, t.updateQueue = null, nu.current = Ok, e = n(r, o);
      } while (ol);
    }
    if (nu.current = Cu, t = Te !== null && Te.next !== null, io = 0, Ie = Te = ye = null, _u = false, t)
      throw Error(L(300));
    return e;
  }
  function Jf() {
    var e = El !== 0;
    return El = 0, e;
  }
  function vn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ie === null ? ye.memoizedState = Ie = e : Ie = Ie.next = e, Ie;
  }
  function $t() {
    if (Te === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else
      e = Te.next;
    var t = Ie === null ? ye.memoizedState : Ie.next;
    if (t !== null)
      Ie = t, Te = e;
    else {
      if (e === null)
        throw Error(L(310));
      Te = e, e = { memoizedState: Te.memoizedState, baseState: Te.baseState, baseQueue: Te.baseQueue, queue: Te.queue, next: null }, Ie === null ? ye.memoizedState = Ie = e : Ie = Ie.next = e;
    }
    return Ie;
  }
  function Rl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ed(e) {
    var t = $t(), n = t.queue;
    if (n === null)
      throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = Te, o = r.baseQueue, i = n.pending;
    if (i !== null) {
      if (o !== null) {
        var l = o.next;
        o.next = i.next, i.next = l;
      }
      r.baseQueue = o = i, n.pending = null;
    }
    if (o !== null) {
      i = o.next, r = r.baseState;
      var a = l = null, u = null, s = i;
      do {
        var c = s.lane;
        if ((io & c) === c)
          u !== null && (u = u.next = { lane: 0, action: s.action, hasEagerState: s.hasEagerState, eagerState: s.eagerState, next: null }), r = s.hasEagerState ? s.eagerState : e(r, s.action);
        else {
          var d = { lane: c, action: s.action, hasEagerState: s.hasEagerState, eagerState: s.eagerState, next: null };
          u === null ? (a = u = d, l = r) : u = u.next = d, ye.lanes |= c, lo |= c;
        }
        s = s.next;
      } while (s !== null && s !== i);
      u === null ? l = r : u.next = a, rn(r, t.memoizedState) || (dt = true), t.memoizedState = r, t.baseState = l, t.baseQueue = u, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      o = e;
      do
        i = o.lane, ye.lanes |= i, lo |= i, o = o.next;
      while (o !== e);
    } else
      o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Rd(e) {
    var t = $t(), n = t.queue;
    if (n === null)
      throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, o = n.pending, i = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var l = o = o.next;
      do
        i = e(i, l.action), l = l.next;
      while (l !== o);
      rn(i, t.memoizedState) || (dt = true), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, r];
  }
  function y0() {
  }
  function g0(e, t) {
    var n = ye, r = $t(), o = t(), i = !rn(r.memoizedState, o);
    if (i && (r.memoizedState = o, dt = true), r = r.queue, Xf(E0.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || Ie !== null && Ie.memoizedState.tag & 1) {
      if (n.flags |= 2048, xl(9, S0.bind(null, n, r, o, t), void 0, null), ze === null)
        throw Error(L(349));
      io & 30 || w0(n, t, o);
    }
    return o;
  }
  function w0(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ye.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ye.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function S0(e, t, n, r) {
    t.value = n, t.getSnapshot = r, R0(t) && x0(e);
  }
  function E0(e, t, n) {
    return n(function() {
      R0(t) && x0(e);
    });
  }
  function R0(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !rn(e, n);
    } catch {
      return true;
    }
  }
  function x0(e) {
    var t = Hn(e, 1);
    t !== null && nn(t, e, 1, -1);
  }
  function $y(e) {
    var t = vn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Rl, lastRenderedState: e }, t.queue = e, e = e.dispatch = Lk.bind(null, ye, e), [t.memoizedState, e];
  }
  function xl(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ye.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ye.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function k0() {
    return $t().memoizedState;
  }
  function ru(e, t, n, r) {
    var o = vn();
    ye.flags |= e, o.memoizedState = xl(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function ju(e, t, n, r) {
    var o = $t();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (Te !== null) {
      var l = Te.memoizedState;
      if (i = l.destroy, r !== null && Qf(r, l.deps)) {
        o.memoizedState = xl(t, n, i, r);
        return;
      }
    }
    ye.flags |= e, o.memoizedState = xl(1 | t, n, i, r);
  }
  function Wy(e, t) {
    return ru(8390656, 8, e, t);
  }
  function Xf(e, t) {
    return ju(2048, 8, e, t);
  }
  function _0(e, t) {
    return ju(4, 2, e, t);
  }
  function C0(e, t) {
    return ju(4, 4, e, t);
  }
  function N0(e, t) {
    if (typeof t == "function")
      return e = e(), t(e), function() {
        t(null);
      };
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function P0(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ju(4, 4, N0.bind(null, t, e), n);
  }
  function Gf() {
  }
  function D0(e, t) {
    var n = $t();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Qf(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function L0(e, t) {
    var n = $t();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Qf(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function T0(e, t, n) {
    return io & 21 ? (rn(n, t) || (n = Mg(), ye.lanes |= n, lo |= n, e.baseState = true), t) : (e.baseState && (e.baseState = false, dt = true), e.memoizedState = n);
  }
  function Pk(e, t) {
    var n = ee;
    ee = n !== 0 && 4 > n ? n : 4, e(true);
    var r = Sd.transition;
    Sd.transition = {};
    try {
      e(false), t();
    } finally {
      ee = n, Sd.transition = r;
    }
  }
  function F0() {
    return $t().memoizedState;
  }
  function Dk(e, t, n) {
    var r = gr(e);
    if (n = { lane: r, action: n, hasEagerState: false, eagerState: null, next: null }, O0(e))
      M0(t, n);
    else if (n = c0(e, t, n, r), n !== null) {
      var o = rt();
      nn(n, e, r, o), A0(n, t, r);
    }
  }
  function Lk(e, t, n) {
    var r = gr(e), o = { lane: r, action: n, hasEagerState: false, eagerState: null, next: null };
    if (O0(e))
      M0(t, o);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var l = t.lastRenderedState, a = i(l, n);
          if (o.hasEagerState = true, o.eagerState = a, rn(a, l)) {
            var u = t.interleaved;
            u === null ? (o.next = o, Bf(t)) : (o.next = u.next, u.next = o), t.interleaved = o;
            return;
          }
        } catch {
        } finally {
        }
      n = c0(e, t, o, r), n !== null && (o = rt(), nn(n, e, r, o), A0(n, t, r));
    }
  }
  function O0(e) {
    var t = e.alternate;
    return e === ye || t !== null && t === ye;
  }
  function M0(e, t) {
    ol = _u = true;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function A0(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Pf(e, n);
    }
  }
  var Cu = { readContext: Vt, useCallback: Je, useContext: Je, useEffect: Je, useImperativeHandle: Je, useInsertionEffect: Je, useLayoutEffect: Je, useMemo: Je, useReducer: Je, useRef: Je, useState: Je, useDebugValue: Je, useDeferredValue: Je, useTransition: Je, useMutableSource: Je, useSyncExternalStore: Je, useId: Je, unstable_isNewReconciler: false }, Tk = { readContext: Vt, useCallback: function(e, t) {
    return vn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Vt, useEffect: Wy, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ru(4194308, 4, N0.bind(null, t, e), n);
  }, useLayoutEffect: function(e, t) {
    return ru(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ru(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = vn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = vn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Dk.bind(null, ye, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = vn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: $y, useDebugValue: Gf, useDeferredValue: function(e) {
    return vn().memoizedState = e;
  }, useTransition: function() {
    var e = $y(false), t = e[0];
    return e = Pk.bind(null, e[1]), vn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ye, o = vn();
    if (he) {
      if (n === void 0)
        throw Error(L(407));
      n = n();
    } else {
      if (n = t(), ze === null)
        throw Error(L(349));
      io & 30 || w0(r, t, n);
    }
    o.memoizedState = n;
    var i = { value: n, getSnapshot: t };
    return o.queue = i, Wy(E0.bind(null, r, i, e), [e]), r.flags |= 2048, xl(9, S0.bind(null, r, i, n, t), void 0, null), n;
  }, useId: function() {
    var e = vn(), t = ze.identifierPrefix;
    if (he) {
      var n = zn, r = In;
      n = (r & ~(1 << 32 - tn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = El++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else
      n = Nk++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: false }, Fk = { readContext: Vt, useCallback: D0, useContext: Vt, useEffect: Xf, useImperativeHandle: P0, useInsertionEffect: _0, useLayoutEffect: C0, useMemo: L0, useReducer: Ed, useRef: k0, useState: function() {
    return Ed(Rl);
  }, useDebugValue: Gf, useDeferredValue: function(e) {
    var t = $t();
    return T0(t, Te.memoizedState, e);
  }, useTransition: function() {
    var e = Ed(Rl)[0], t = $t().memoizedState;
    return [e, t];
  }, useMutableSource: y0, useSyncExternalStore: g0, useId: F0, unstable_isNewReconciler: false }, Ok = { readContext: Vt, useCallback: D0, useContext: Vt, useEffect: Xf, useImperativeHandle: P0, useInsertionEffect: _0, useLayoutEffect: C0, useMemo: L0, useReducer: Rd, useRef: k0, useState: function() {
    return Rd(Rl);
  }, useDebugValue: Gf, useDeferredValue: function(e) {
    var t = $t();
    return Te === null ? t.memoizedState = e : T0(t, Te.memoizedState, e);
  }, useTransition: function() {
    var e = Rd(Rl)[0], t = $t().memoizedState;
    return [e, t];
  }, useMutableSource: y0, useSyncExternalStore: g0, useId: F0, unstable_isNewReconciler: false };
  function ci(e, t) {
    try {
      var n = "", r = t;
      do
        n += sx(r), r = r.return;
      while (r);
      var o = n;
    } catch (i) {
      o = `
Error generating stack: ` + i.message + `
` + i.stack;
    }
    return { value: e, source: t, stack: o, digest: null };
  }
  function xd(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function lf(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Mk = typeof WeakMap == "function" ? WeakMap : Map;
  function I0(e, t, n) {
    n = Un(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Pu || (Pu = true, vf = r), lf(e, t);
    }, n;
  }
  function z0(e, t, n) {
    n = Un(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var o = t.value;
      n.payload = function() {
        return r(o);
      }, n.callback = function() {
        lf(e, t);
      };
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
      lf(e, t), typeof r != "function" && (yr === null ? yr = /* @__PURE__ */ new Set([this]) : yr.add(this));
      var l = t.stack;
      this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
    }), n;
  }
  function Ky(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Mk();
      var o = /* @__PURE__ */ new Set();
      r.set(t, o);
    } else
      o = r.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), r.set(t, o));
    o.has(n) || (o.add(n), e = Yk.bind(null, e, t, n), t.then(e, e));
  }
  function Qy(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t)
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Yy(e, t, n, r, o) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Un(-1, 1), t.tag = 2, vr(n, t, 1))), n.lanes |= 1), e);
  }
  var Ak = Vn.ReactCurrentOwner, dt = false;
  function nt(e, t, n, r) {
    t.child = e === null ? m0(t, null, n, r) : ui(t, e.child, n, r);
  }
  function Jy(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return ri(t, o), r = Yf(e, t, n, r, i, o), n = Jf(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Bn(e, t, o)) : (he && n && If(t), t.flags |= 1, nt(e, t, r, o), t.child);
  }
  function Xy(e, t, n, r, o) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !ip(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, U0(e, t, i, r, o)) : (e = au(n.type, null, r, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !(e.lanes & o)) {
      var l = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : ml, n(l, r) && e.ref === t.ref)
        return Bn(e, t, o);
    }
    return t.flags |= 1, e = wr(i, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function U0(e, t, n, r, o) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (ml(i, r) && e.ref === t.ref)
        if (dt = false, t.pendingProps = r = i, (e.lanes & o) !== 0)
          e.flags & 131072 && (dt = true);
        else
          return t.lanes = e.lanes, Bn(e, t, o);
    }
    return af(e, t, n, r, o);
  }
  function j0(e, t, n) {
    var r = t.pendingProps, o = r.children, i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, le(qo, Rt), Rt |= n;
      else {
        if (!(n & 1073741824))
          return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, le(qo, Rt), Rt |= e, null;
        t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, le(qo, Rt), Rt |= r;
      }
    else
      i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, le(qo, Rt), Rt |= r;
    return nt(e, t, o, n), t.child;
  }
  function b0(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function af(e, t, n, r, o) {
    var i = pt(n) ? ro : qe.current;
    return i = li(t, i), ri(t, o), n = Yf(e, t, n, r, i, o), r = Jf(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Bn(e, t, o)) : (he && r && If(t), t.flags |= 1, nt(e, t, n, o), t.child);
  }
  function Gy(e, t, n, r, o) {
    if (pt(n)) {
      var i = true;
      gu(t);
    } else
      i = false;
    if (ri(t, o), t.stateNode === null)
      ou(e, t), p0(t, n, r), of(t, n, r, o), r = true;
    else if (e === null) {
      var l = t.stateNode, a = t.memoizedProps;
      l.props = a;
      var u = l.context, s = n.contextType;
      typeof s == "object" && s !== null ? s = Vt(s) : (s = pt(n) ? ro : qe.current, s = li(t, s));
      var c = n.getDerivedStateFromProps, d = typeof c == "function" || typeof l.getSnapshotBeforeUpdate == "function";
      d || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (a !== r || u !== s) && By(t, l, r, s), ar = false;
      var p = t.memoizedState;
      l.state = p, xu(t, r, l, o), u = t.memoizedState, a !== r || p !== u || ft.current || ar ? (typeof c == "function" && (rf(t, n, c, r), u = t.memoizedState), (a = ar || Hy(t, n, a, r, p, u, s)) ? (d || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), l.props = r, l.state = u, l.context = s, r = a) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), r = false);
    } else {
      l = t.stateNode, d0(e, t), a = t.memoizedProps, s = t.type === t.elementType ? a : qt(t.type, a), l.props = s, d = t.pendingProps, p = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = Vt(u) : (u = pt(n) ? ro : qe.current, u = li(t, u));
      var m = n.getDerivedStateFromProps;
      (c = typeof m == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (a !== d || p !== u) && By(t, l, r, u), ar = false, p = t.memoizedState, l.state = p, xu(t, r, l, o);
      var y = t.memoizedState;
      a !== d || p !== y || ft.current || ar ? (typeof m == "function" && (rf(t, n, m, r), y = t.memoizedState), (s = ar || Hy(t, n, s, r, p, y, u) || false) ? (c || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, y, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, y, u)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), l.props = r, l.state = y, l.context = u, r = s) : (typeof l.componentDidUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = false);
    }
    return uf(e, t, n, r, i, o);
  }
  function uf(e, t, n, r, o, i) {
    b0(e, t);
    var l = (t.flags & 128) !== 0;
    if (!r && !l)
      return o && Iy(t, n, false), Bn(e, t, i);
    r = t.stateNode, Ak.current = t;
    var a = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && l ? (t.child = ui(t, e.child, null, i), t.child = ui(t, null, a, i)) : nt(e, t, a, i), t.memoizedState = r.state, o && Iy(t, n, true), t.child;
  }
  function H0(e) {
    var t = e.stateNode;
    t.pendingContext ? Ay(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ay(e, t.context, false), $f(e, t.containerInfo);
  }
  function qy(e, t, n, r, o) {
    return ai(), Uf(o), t.flags |= 256, nt(e, t, n, r), t.child;
  }
  var sf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function cf(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function B0(e, t, n) {
    var r = t.pendingProps, o = ve.current, i = false, l = (t.flags & 128) !== 0, a;
    if ((a = l) || (a = e !== null && e.memoizedState === null ? false : (o & 2) !== 0), a ? (i = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), le(ve, o & 1), e === null)
      return tf(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, l = { mode: "hidden", children: l }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = l) : i = Bu(l, r, 0, null), e = no(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = cf(n), t.memoizedState = sf, e) : qf(t, l));
    if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null))
      return Ik(e, t, l, r, a, o, n);
    if (i) {
      i = r.fallback, l = t.mode, o = e.child, a = o.sibling;
      var u = { mode: "hidden", children: r.children };
      return !(l & 1) && t.child !== o ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wr(o, u), r.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? i = wr(a, i) : (i = no(i, l, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, l = e.child.memoizedState, l = l === null ? cf(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, i.memoizedState = l, i.childLanes = e.childLanes & ~n, t.memoizedState = sf, r;
    }
    return i = e.child, e = i.sibling, r = wr(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function qf(e, t) {
    return t = Bu({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Ja(e, t, n, r) {
    return r !== null && Uf(r), ui(t, e.child, null, n), e = qf(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ik(e, t, n, r, o, i, l) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = xd(Error(L(422))), Ja(e, t, l, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, o = t.mode, r = Bu({ mode: "visible", children: r.children }, o, 0, null), i = no(i, o, l, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ui(t, e.child, null, l), t.child.memoizedState = cf(l), t.memoizedState = sf, i);
    if (!(t.mode & 1))
      return Ja(e, t, l, null);
    if (o.data === "$!") {
      if (r = o.nextSibling && o.nextSibling.dataset, r)
        var a = r.dgst;
      return r = a, i = Error(L(419)), r = xd(i, r, void 0), Ja(e, t, l, r);
    }
    if (a = (l & e.childLanes) !== 0, dt || a) {
      if (r = ze, r !== null) {
        switch (l & -l) {
          case 4:
            o = 2;
            break;
          case 16:
            o = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            o = 32;
            break;
          case 536870912:
            o = 268435456;
            break;
          default:
            o = 0;
        }
        o = o & (r.suspendedLanes | l) ? 0 : o, o !== 0 && o !== i.retryLane && (i.retryLane = o, Hn(e, o), nn(r, e, o, -1));
      }
      return op(), r = xd(Error(L(421))), Ja(e, t, l, r);
    }
    return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Jk.bind(null, e), o._reactRetry = t, null) : (e = i.treeContext, xt = mr(o.nextSibling), kt = t, he = true, en = null, e !== null && (jt[bt++] = In, jt[bt++] = zn, jt[bt++] = oo, In = e.id, zn = e.overflow, oo = t), t = qf(t, r.children), t.flags |= 4096, t);
  }
  function Zy(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), nf(e.return, t, n);
  }
  function kd(e, t, n, r, o) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: o } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = o);
  }
  function V0(e, t, n) {
    var r = t.pendingProps, o = r.revealOrder, i = r.tail;
    if (nt(e, t, r.children, n), r = ve.current, r & 2)
      r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && e.flags & 128)
        e:
          for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && Zy(e, n, t);
            else if (e.tag === 19)
              Zy(e, n, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t)
              break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
      r &= 1;
    }
    if (le(ve, r), !(t.mode & 1))
      t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; n !== null; )
            e = n.alternate, e !== null && ku(e) === null && (o = n), n = n.sibling;
          n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), kd(t, false, o, n, i);
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && ku(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = n, n = o, o = e;
          }
          kd(t, true, n, null, i);
          break;
        case "together":
          kd(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function ou(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Bn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), lo |= t.lanes, !(n & t.childLanes))
      return null;
    if (e !== null && t.child !== e.child)
      throw Error(L(153));
    if (t.child !== null) {
      for (e = t.child, n = wr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = wr(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function zk(e, t, n) {
    switch (t.tag) {
      case 3:
        H0(t), ai();
        break;
      case 5:
        v0(t);
        break;
      case 1:
        pt(t.type) && gu(t);
        break;
      case 4:
        $f(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, o = t.memoizedProps.value;
        le(Eu, r._currentValue), r._currentValue = o;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (le(ve, ve.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? B0(e, t, n) : (le(ve, ve.current & 1), e = Bn(e, t, n), e !== null ? e.sibling : null);
        le(ve, ve.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, e.flags & 128) {
          if (r)
            return V0(e, t, n);
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), le(ve, ve.current), r)
          break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, j0(e, t, n);
    }
    return Bn(e, t, n);
  }
  var $0, df, W0, K0;
  $0 = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6)
        e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t)
        break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t)
          return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  };
  df = function() {
  };
  W0 = function(e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
      e = t.stateNode, eo(wn.current);
      var i = null;
      switch (n) {
        case "input":
          o = Fd(e, o), r = Fd(e, r), i = [];
          break;
        case "select":
          o = ge({}, o, { value: void 0 }), r = ge({}, r, { value: void 0 }), i = [];
          break;
        case "textarea":
          o = Ad(e, o), r = Ad(e, r), i = [];
          break;
        default:
          typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = vu);
      }
      zd(n, r);
      var l;
      n = null;
      for (s in o)
        if (!r.hasOwnProperty(s) && o.hasOwnProperty(s) && o[s] != null)
          if (s === "style") {
            var a = o[s];
            for (l in a)
              a.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
          } else
            s !== "dangerouslySetInnerHTML" && s !== "children" && s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (ul.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
      for (s in r) {
        var u = r[s];
        if (a = o?.[s], r.hasOwnProperty(s) && u !== a && (u != null || a != null))
          if (s === "style")
            if (a) {
              for (l in a)
                !a.hasOwnProperty(l) || u && u.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
              for (l in u)
                u.hasOwnProperty(l) && a[l] !== u[l] && (n || (n = {}), n[l] = u[l]);
            } else
              n || (i || (i = []), i.push(s, n)), n = u;
          else
            s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(s, u)) : s === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(s, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && (ul.hasOwnProperty(s) ? (u != null && s === "onScroll" && ce("scroll", e), i || a === u || (i = [])) : (i = i || []).push(s, u));
      }
      n && (i = i || []).push("style", n);
      var s = i;
      (t.updateQueue = s) && (t.flags |= 4);
    }
  };
  K0 = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function Ki(e, t) {
    if (!he)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function Xe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t)
      for (var o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function Uk(e, t, n) {
    var r = t.pendingProps;
    switch (zf(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xe(t), null;
      case 1:
        return pt(t.type) && yu(), Xe(t), null;
      case 3:
        return r = t.stateNode, si(), de(ft), de(qe), Kf(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Qa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, en !== null && (wf(en), en = null))), df(e, t), Xe(t), null;
      case 5:
        Wf(t);
        var o = eo(Sl.current);
        if (n = t.type, e !== null && t.stateNode != null)
          W0(e, t, n, r, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(L(166));
            return Xe(t), null;
          }
          if (e = eo(wn.current), Qa(t)) {
            r = t.stateNode, n = t.type;
            var i = t.memoizedProps;
            switch (r[yn] = t, r[gl] = i, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                ce("cancel", r), ce("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ce("load", r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < qi.length; o++)
                  ce(qi[o], r);
                break;
              case "source":
                ce("error", r);
                break;
              case "img":
              case "image":
              case "link":
                ce("error", r), ce("load", r);
                break;
              case "details":
                ce("toggle", r);
                break;
              case "input":
                ay(r, i), ce("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!i.multiple }, ce("invalid", r);
                break;
              case "textarea":
                sy(r, i), ce("invalid", r);
            }
            zd(n, i), o = null;
            for (var l in i)
              if (i.hasOwnProperty(l)) {
                var a = i[l];
                l === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== true && Ka(r.textContent, a, e), o = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== true && Ka(r.textContent, a, e), o = ["children", "" + a]) : ul.hasOwnProperty(l) && a != null && l === "onScroll" && ce("scroll", r);
              }
            switch (n) {
              case "input":
                Ma(r), uy(r, i, true);
                break;
              case "textarea":
                Ma(r), cy(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof i.onClick == "function" && (r.onclick = vu);
            }
            r = o, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            l = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = wg(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = l.createElement(n, { is: r.is }) : (e = l.createElement(n), n === "select" && (l = e, r.multiple ? l.multiple = true : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[yn] = t, e[gl] = r, $0(e, t, false, false), t.stateNode = e;
            e: {
              switch (l = Ud(n, r), n) {
                case "dialog":
                  ce("cancel", e), ce("close", e), o = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  ce("load", e), o = r;
                  break;
                case "video":
                case "audio":
                  for (o = 0; o < qi.length; o++)
                    ce(qi[o], e);
                  o = r;
                  break;
                case "source":
                  ce("error", e), o = r;
                  break;
                case "img":
                case "image":
                case "link":
                  ce("error", e), ce("load", e), o = r;
                  break;
                case "details":
                  ce("toggle", e), o = r;
                  break;
                case "input":
                  ay(e, r), o = Fd(e, r), ce("invalid", e);
                  break;
                case "option":
                  o = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, o = ge({}, r, { value: void 0 }), ce("invalid", e);
                  break;
                case "textarea":
                  sy(e, r), o = Ad(e, r), ce("invalid", e);
                  break;
                default:
                  o = r;
              }
              zd(n, o), a = o;
              for (i in a)
                if (a.hasOwnProperty(i)) {
                  var u = a[i];
                  i === "style" ? Rg(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Sg(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && sl(e, u) : typeof u == "number" && sl(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (ul.hasOwnProperty(i) ? u != null && i === "onScroll" && ce("scroll", e) : u != null && Rf(e, i, u, l));
                }
              switch (n) {
                case "input":
                  Ma(e), uy(e, r, false);
                  break;
                case "textarea":
                  Ma(e), cy(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + Sr(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, i = r.value, i != null ? Zo(e, !!r.multiple, i, false) : r.defaultValue != null && Zo(e, !!r.multiple, r.defaultValue, true);
                  break;
                default:
                  typeof o.onClick == "function" && (e.onclick = vu);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = true;
                  break e;
                default:
                  r = false;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Xe(t), null;
      case 6:
        if (e && t.stateNode != null)
          K0(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(L(166));
          if (n = eo(Sl.current), eo(wn.current), Qa(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[yn] = t, (i = r.nodeValue !== n) && (e = kt, e !== null))
              switch (e.tag) {
                case 3:
                  Ka(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && Ka(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            i && (t.flags |= 4);
          } else
            r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[yn] = t, t.stateNode = r;
        }
        return Xe(t), null;
      case 13:
        if (de(ve), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (he && xt !== null && t.mode & 1 && !(t.flags & 128))
            s0(), ai(), t.flags |= 98560, i = false;
          else if (i = Qa(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!i)
                throw Error(L(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i)
                throw Error(L(317));
              i[yn] = t;
            } else
              ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            Xe(t), i = false;
          } else
            en !== null && (wf(en), en = null), i = true;
          if (!i)
            return t.flags & 65536 ? t : null;
        }
        return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ve.current & 1 ? Fe === 0 && (Fe = 3) : op())), t.updateQueue !== null && (t.flags |= 4), Xe(t), null);
      case 4:
        return si(), df(e, t), e === null && vl(t.stateNode.containerInfo), Xe(t), null;
      case 10:
        return Hf(t.type._context), Xe(t), null;
      case 17:
        return pt(t.type) && yu(), Xe(t), null;
      case 19:
        if (de(ve), i = t.memoizedState, i === null)
          return Xe(t), null;
        if (r = (t.flags & 128) !== 0, l = i.rendering, l === null)
          if (r)
            Ki(i, false);
          else {
            if (Fe !== 0 || e !== null && e.flags & 128)
              for (e = t.child; e !== null; ) {
                if (l = ku(e), l !== null) {
                  for (t.flags |= 128, Ki(i, false), r = l.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; )
                    i = n, e = r, i.flags &= 14680066, l = i.alternate, l === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = l.childLanes, i.lanes = l.lanes, i.child = l.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = l.memoizedProps, i.memoizedState = l.memoizedState, i.updateQueue = l.updateQueue, i.type = l.type, e = l.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
                  return le(ve, ve.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && xe() > di && (t.flags |= 128, r = true, Ki(i, false), t.lanes = 4194304);
          }
        else {
          if (!r)
            if (e = ku(l), e !== null) {
              if (t.flags |= 128, r = true, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ki(i, true), i.tail === null && i.tailMode === "hidden" && !l.alternate && !he)
                return Xe(t), null;
            } else
              2 * xe() - i.renderingStartTime > di && n !== 1073741824 && (t.flags |= 128, r = true, Ki(i, false), t.lanes = 4194304);
          i.isBackwards ? (l.sibling = t.child, t.child = l) : (n = i.last, n !== null ? n.sibling = l : t.child = l, i.last = l);
        }
        return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = xe(), t.sibling = null, n = ve.current, le(ve, r ? n & 1 | 2 : n & 1), t) : (Xe(t), null);
      case 22:
      case 23:
        return rp(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Rt & 1073741824 && (Xe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Xe(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(L(156, t.tag));
  }
  function jk(e, t) {
    switch (zf(t), t.tag) {
      case 1:
        return pt(t.type) && yu(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return si(), de(ft), de(qe), Kf(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Wf(t), null;
      case 13:
        if (de(ve), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(L(340));
          ai();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return de(ve), null;
      case 4:
        return si(), null;
      case 10:
        return Hf(t.type._context), null;
      case 22:
      case 23:
        return rp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Xa = false, Ge = false, bk = typeof WeakSet == "function" ? WeakSet : Set, A = null;
  function Go(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          we(e, t, r);
        }
      else
        n.current = null;
  }
  function ff(e, t, n) {
    try {
      n();
    } catch (r) {
      we(e, t, r);
    }
  }
  var eg = false;
  function Hk(e, t) {
    if (Yd = pu, e = Xg(), Af(e)) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var o = r.anchorOffset, i = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, i.nodeType;
            } catch {
              n = null;
              break e;
            }
            var l = 0, a = -1, u = -1, s = 0, c = 0, d = e, p = null;
            t:
              for (; ; ) {
                for (var m; d !== n || o !== 0 && d.nodeType !== 3 || (a = l + o), d !== i || r !== 0 && d.nodeType !== 3 || (u = l + r), d.nodeType === 3 && (l += d.nodeValue.length), (m = d.firstChild) !== null; )
                  p = d, d = m;
                for (; ; ) {
                  if (d === e)
                    break t;
                  if (p === n && ++s === o && (a = l), p === i && ++c === r && (u = l), (m = d.nextSibling) !== null)
                    break;
                  d = p, p = d.parentNode;
                }
                d = m;
              }
            n = a === -1 || u === -1 ? null : { start: a, end: u };
          } else
            n = null;
        }
      n = n || { start: 0, end: 0 };
    } else
      n = null;
    for (Jd = { focusedElem: e, selectionRange: n }, pu = false, A = t; A !== null; )
      if (t = A, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, A = e;
      else
        for (; A !== null; ) {
          t = A;
          try {
            var y = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (y !== null) {
                    var w = y.memoizedProps, R = y.memoizedState, f = t.stateNode, h = f.getSnapshotBeforeUpdate(t.elementType === t.type ? w : qt(t.type, w), R);
                    f.__reactInternalSnapshotBeforeUpdate = h;
                  }
                  break;
                case 3:
                  var v = t.stateNode.containerInfo;
                  v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(L(163));
              }
          } catch (E) {
            we(t, t.return, E);
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, A = e;
            break;
          }
          A = t.return;
        }
    return y = eg, eg = false, y;
  }
  function il(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var o = r = r.next;
      do {
        if ((o.tag & e) === e) {
          var i = o.destroy;
          o.destroy = void 0, i !== void 0 && ff(t, n, i);
        }
        o = o.next;
      } while (o !== r);
    }
  }
  function bu(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function pf(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Q0(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Q0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[yn], delete t[gl], delete t[qd], delete t[xk], delete t[kk])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Y0(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function tg(e) {
    e:
      for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Y0(e.return))
            return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4)
            continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2))
          return e.stateNode;
      }
  }
  function hf(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = vu));
    else if (r !== 4 && (e = e.child, e !== null))
      for (hf(e, t, n), e = e.sibling; e !== null; )
        hf(e, t, n), e = e.sibling;
  }
  function mf(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
      for (mf(e, t, n), e = e.sibling; e !== null; )
        mf(e, t, n), e = e.sibling;
  }
  var He = null, Zt = false;
  function ir(e, t, n) {
    for (n = n.child; n !== null; )
      J0(e, t, n), n = n.sibling;
  }
  function J0(e, t, n) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(Fu, n);
      } catch {
      }
    switch (n.tag) {
      case 5:
        Ge || Go(n, t);
      case 6:
        var r = He, o = Zt;
        He = null, ir(e, t, n), He = r, Zt = o, He !== null && (Zt ? (e = He, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : He.removeChild(n.stateNode));
        break;
      case 18:
        He !== null && (Zt ? (e = He, n = n.stateNode, e.nodeType === 8 ? yd(e.parentNode, n) : e.nodeType === 1 && yd(e, n), pl(e)) : yd(He, n.stateNode));
        break;
      case 4:
        r = He, o = Zt, He = n.stateNode.containerInfo, Zt = true, ir(e, t, n), He = r, Zt = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ge && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          o = r = r.next;
          do {
            var i = o, l = i.destroy;
            i = i.tag, l !== void 0 && (i & 2 || i & 4) && ff(n, t, l), o = o.next;
          } while (o !== r);
        }
        ir(e, t, n);
        break;
      case 1:
        if (!Ge && (Go(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
          try {
            r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
          } catch (a) {
            we(n, t, a);
          }
        ir(e, t, n);
        break;
      case 21:
        ir(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Ge = (r = Ge) || n.memoizedState !== null, ir(e, t, n), Ge = r) : ir(e, t, n);
        break;
      default:
        ir(e, t, n);
    }
  }
  function ng(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new bk()), t.forEach(function(r) {
        var o = Xk.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
    }
  }
  function Gt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var o = n[r];
        try {
          var i = e, l = t, a = l;
          e:
            for (; a !== null; ) {
              switch (a.tag) {
                case 5:
                  He = a.stateNode, Zt = false;
                  break e;
                case 3:
                  He = a.stateNode.containerInfo, Zt = true;
                  break e;
                case 4:
                  He = a.stateNode.containerInfo, Zt = true;
                  break e;
              }
              a = a.return;
            }
          if (He === null)
            throw Error(L(160));
          J0(i, l, o), He = null, Zt = false;
          var u = o.alternate;
          u !== null && (u.return = null), o.return = null;
        } catch (s) {
          we(o, t, s);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; )
        X0(t, e), t = t.sibling;
  }
  function X0(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Gt(t, e), mn(e), r & 4) {
          try {
            il(3, e, e.return), bu(3, e);
          } catch (w) {
            we(e, e.return, w);
          }
          try {
            il(5, e, e.return);
          } catch (w) {
            we(e, e.return, w);
          }
        }
        break;
      case 1:
        Gt(t, e), mn(e), r & 512 && n !== null && Go(n, n.return);
        break;
      case 5:
        if (Gt(t, e), mn(e), r & 512 && n !== null && Go(n, n.return), e.flags & 32) {
          var o = e.stateNode;
          try {
            sl(o, "");
          } catch (w) {
            we(e, e.return, w);
          }
        }
        if (r & 4 && (o = e.stateNode, o != null)) {
          var i = e.memoizedProps, l = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
          if (e.updateQueue = null, u !== null)
            try {
              a === "input" && i.type === "radio" && i.name != null && yg(o, i), Ud(a, l);
              var s = Ud(a, i);
              for (l = 0; l < u.length; l += 2) {
                var c = u[l], d = u[l + 1];
                c === "style" ? Rg(o, d) : c === "dangerouslySetInnerHTML" ? Sg(o, d) : c === "children" ? sl(o, d) : Rf(o, c, d, s);
              }
              switch (a) {
                case "input":
                  Od(o, i);
                  break;
                case "textarea":
                  gg(o, i);
                  break;
                case "select":
                  var p = o._wrapperState.wasMultiple;
                  o._wrapperState.wasMultiple = !!i.multiple;
                  var m = i.value;
                  m != null ? Zo(o, !!i.multiple, m, false) : p !== !!i.multiple && (i.defaultValue != null ? Zo(o, !!i.multiple, i.defaultValue, true) : Zo(o, !!i.multiple, i.multiple ? [] : "", false));
              }
              o[gl] = i;
            } catch (w) {
              we(e, e.return, w);
            }
        }
        break;
      case 6:
        if (Gt(t, e), mn(e), r & 4) {
          if (e.stateNode === null)
            throw Error(L(162));
          o = e.stateNode, i = e.memoizedProps;
          try {
            o.nodeValue = i;
          } catch (w) {
            we(e, e.return, w);
          }
        }
        break;
      case 3:
        if (Gt(t, e), mn(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            pl(t.containerInfo);
          } catch (w) {
            we(e, e.return, w);
          }
        break;
      case 4:
        Gt(t, e), mn(e);
        break;
      case 13:
        Gt(t, e), mn(e), o = e.child, o.flags & 8192 && (i = o.memoizedState !== null, o.stateNode.isHidden = i, !i || o.alternate !== null && o.alternate.memoizedState !== null || (tp = xe())), r & 4 && ng(e);
        break;
      case 22:
        if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ge = (s = Ge) || c, Gt(t, e), Ge = s) : Gt(t, e), mn(e), r & 8192) {
          if (s = e.memoizedState !== null, (e.stateNode.isHidden = s) && !c && e.mode & 1)
            for (A = e, c = e.child; c !== null; ) {
              for (d = A = c; A !== null; ) {
                switch (p = A, m = p.child, p.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    il(4, p, p.return);
                    break;
                  case 1:
                    Go(p, p.return);
                    var y = p.stateNode;
                    if (typeof y.componentWillUnmount == "function") {
                      r = p, n = p.return;
                      try {
                        t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                      } catch (w) {
                        we(r, n, w);
                      }
                    }
                    break;
                  case 5:
                    Go(p, p.return);
                    break;
                  case 22:
                    if (p.memoizedState !== null) {
                      og(d);
                      continue;
                    }
                }
                m !== null ? (m.return = p, A = m) : og(d);
              }
              c = c.sibling;
            }
          e:
            for (c = null, d = e; ; ) {
              if (d.tag === 5) {
                if (c === null) {
                  c = d;
                  try {
                    o = d.stateNode, s ? (i = o.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = d.stateNode, u = d.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Eg("display", l));
                  } catch (w) {
                    we(e, e.return, w);
                  }
                }
              } else if (d.tag === 6) {
                if (c === null)
                  try {
                    d.stateNode.nodeValue = s ? "" : d.memoizedProps;
                  } catch (w) {
                    we(e, e.return, w);
                  }
              } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === e)
                break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === e)
                  break e;
                c === d && (c = null), d = d.return;
              }
              c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
            }
        }
        break;
      case 19:
        Gt(t, e), mn(e), r & 4 && ng(e);
        break;
      case 21:
        break;
      default:
        Gt(t, e), mn(e);
    }
  }
  function mn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Y0(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(L(160));
        }
        switch (r.tag) {
          case 5:
            var o = r.stateNode;
            r.flags & 32 && (sl(o, ""), r.flags &= -33);
            var i = tg(e);
            mf(e, i, o);
            break;
          case 3:
          case 4:
            var l = r.stateNode.containerInfo, a = tg(e);
            hf(e, a, l);
            break;
          default:
            throw Error(L(161));
        }
      } catch (u) {
        we(e, e.return, u);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Bk(e, t, n) {
    A = e, G0(e, t, n);
  }
  function G0(e, t, n) {
    for (var r = (e.mode & 1) !== 0; A !== null; ) {
      var o = A, i = o.child;
      if (o.tag === 22 && r) {
        var l = o.memoizedState !== null || Xa;
        if (!l) {
          var a = o.alternate, u = a !== null && a.memoizedState !== null || Ge;
          a = Xa;
          var s = Ge;
          if (Xa = l, (Ge = u) && !s)
            for (A = o; A !== null; )
              l = A, u = l.child, l.tag === 22 && l.memoizedState !== null ? ig(o) : u !== null ? (u.return = l, A = u) : ig(o);
          for (; i !== null; )
            A = i, G0(i, t, n), i = i.sibling;
          A = o, Xa = a, Ge = s;
        }
        rg(e, t, n);
      } else
        o.subtreeFlags & 8772 && i !== null ? (i.return = o, A = i) : rg(e, t, n);
    }
  }
  function rg(e) {
    for (; A !== null; ) {
      var t = A;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ge || bu(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ge)
                  if (n === null)
                    r.componentDidMount();
                  else {
                    var o = t.elementType === t.type ? n.memoizedProps : qt(t.type, n.memoizedProps);
                    r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var i = t.updateQueue;
                i !== null && by(t, i, r);
                break;
              case 3:
                var l = t.updateQueue;
                if (l !== null) {
                  if (n = null, t.child !== null)
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  by(t, l, n);
                }
                break;
              case 5:
                var a = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = a;
                  var u = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      u.autoFocus && n.focus();
                      break;
                    case "img":
                      u.src && (n.src = u.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var s = t.alternate;
                  if (s !== null) {
                    var c = s.memoizedState;
                    if (c !== null) {
                      var d = c.dehydrated;
                      d !== null && pl(d);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(L(163));
            }
          Ge || t.flags & 512 && pf(t);
        } catch (p) {
          we(t, t.return, p);
        }
      }
      if (t === e) {
        A = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, A = n;
        break;
      }
      A = t.return;
    }
  }
  function og(e) {
    for (; A !== null; ) {
      var t = A;
      if (t === e) {
        A = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, A = n;
        break;
      }
      A = t.return;
    }
  }
  function ig(e) {
    for (; A !== null; ) {
      var t = A;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              bu(4, t);
            } catch (u) {
              we(t, n, u);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var o = t.return;
              try {
                r.componentDidMount();
              } catch (u) {
                we(t, o, u);
              }
            }
            var i = t.return;
            try {
              pf(t);
            } catch (u) {
              we(t, i, u);
            }
            break;
          case 5:
            var l = t.return;
            try {
              pf(t);
            } catch (u) {
              we(t, l, u);
            }
        }
      } catch (u) {
        we(t, t.return, u);
      }
      if (t === e) {
        A = null;
        break;
      }
      var a = t.sibling;
      if (a !== null) {
        a.return = t.return, A = a;
        break;
      }
      A = t.return;
    }
  }
  var Vk = Math.ceil, Nu = Vn.ReactCurrentDispatcher, Zf = Vn.ReactCurrentOwner, Bt = Vn.ReactCurrentBatchConfig, q = 0, ze = null, Pe = null, Be = 0, Rt = 0, qo = xr(0), Fe = 0, kl = null, lo = 0, Hu = 0, ep = 0, ll = null, ct = null, tp = 0, di = 1 / 0, Mn = null, Pu = false, vf = null, yr = null, Ga = false, dr = null, Du = 0, al = 0, yf = null, iu = -1, lu = 0;
  function rt() {
    return q & 6 ? xe() : iu !== -1 ? iu : iu = xe();
  }
  function gr(e) {
    return e.mode & 1 ? q & 2 && Be !== 0 ? Be & -Be : Ck.transition !== null ? (lu === 0 && (lu = Mg()), lu) : (e = ee, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Hg(e.type)), e) : 1;
  }
  function nn(e, t, n, r) {
    if (50 < al)
      throw al = 0, yf = null, Error(L(185));
    _l(e, n, r), (!(q & 2) || e !== ze) && (e === ze && (!(q & 2) && (Hu |= n), Fe === 4 && sr(e, Be)), ht(e, r), n === 1 && q === 0 && !(t.mode & 1) && (di = xe() + 500, zu && kr()));
  }
  function ht(e, t) {
    var n = e.callbackNode;
    Px(e, t);
    var r = fu(e, e === ze ? Be : 0);
    if (r === 0)
      n !== null && py(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && py(n), t === 1)
        e.tag === 0 ? _k(lg.bind(null, e)) : l0(lg.bind(null, e)), Ek(function() {
          !(q & 6) && kr();
        }), n = null;
      else {
        switch (Ag(r)) {
          case 1:
            n = Nf;
            break;
          case 4:
            n = Fg;
            break;
          case 16:
            n = du;
            break;
          case 536870912:
            n = Og;
            break;
          default:
            n = du;
        }
        n = iw(n, q0.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function q0(e, t) {
    if (iu = -1, lu = 0, q & 6)
      throw Error(L(327));
    var n = e.callbackNode;
    if (oi() && e.callbackNode !== n)
      return null;
    var r = fu(e, e === ze ? Be : 0);
    if (r === 0)
      return null;
    if (r & 30 || r & e.expiredLanes || t)
      t = Lu(e, r);
    else {
      t = r;
      var o = q;
      q |= 2;
      var i = ew();
      (ze !== e || Be !== t) && (Mn = null, di = xe() + 500, to(e, t));
      do
        try {
          Kk();
          break;
        } catch (a) {
          Z0(e, a);
        }
      while (1);
      bf(), Nu.current = i, q = o, Pe !== null ? t = 0 : (ze = null, Be = 0, t = Fe);
    }
    if (t !== 0) {
      if (t === 2 && (o = Vd(e), o !== 0 && (r = o, t = gf(e, o))), t === 1)
        throw n = kl, to(e, 0), sr(e, r), ht(e, xe()), n;
      if (t === 6)
        sr(e, r);
      else {
        if (o = e.current.alternate, !(r & 30) && !$k(o) && (t = Lu(e, r), t === 2 && (i = Vd(e), i !== 0 && (r = i, t = gf(e, i))), t === 1))
          throw n = kl, to(e, 0), sr(e, r), ht(e, xe()), n;
        switch (e.finishedWork = o, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(L(345));
          case 2:
            Gr(e, ct, Mn);
            break;
          case 3:
            if (sr(e, r), (r & 130023424) === r && (t = tp + 500 - xe(), 10 < t)) {
              if (fu(e, 0) !== 0)
                break;
              if (o = e.suspendedLanes, (o & r) !== r) {
                rt(), e.pingedLanes |= e.suspendedLanes & o;
                break;
              }
              e.timeoutHandle = Gd(Gr.bind(null, e, ct, Mn), t);
              break;
            }
            Gr(e, ct, Mn);
            break;
          case 4:
            if (sr(e, r), (r & 4194240) === r)
              break;
            for (t = e.eventTimes, o = -1; 0 < r; ) {
              var l = 31 - tn(r);
              i = 1 << l, l = t[l], l > o && (o = l), r &= ~i;
            }
            if (r = o, r = xe() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Vk(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Gd(Gr.bind(null, e, ct, Mn), r);
              break;
            }
            Gr(e, ct, Mn);
            break;
          case 5:
            Gr(e, ct, Mn);
            break;
          default:
            throw Error(L(329));
        }
      }
    }
    return ht(e, xe()), e.callbackNode === n ? q0.bind(null, e) : null;
  }
  function gf(e, t) {
    var n = ll;
    return e.current.memoizedState.isDehydrated && (to(e, t).flags |= 256), e = Lu(e, t), e !== 2 && (t = ct, ct = n, t !== null && wf(t)), e;
  }
  function wf(e) {
    ct === null ? ct = e : ct.push.apply(ct, e);
  }
  function $k(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null))
          for (var r = 0; r < n.length; r++) {
            var o = n[r], i = o.getSnapshot;
            o = o.value;
            try {
              if (!rn(i(), o))
                return false;
            } catch {
              return false;
            }
          }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e)
          break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function sr(e, t) {
    for (t &= ~ep, t &= ~Hu, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - tn(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function lg(e) {
    if (q & 6)
      throw Error(L(327));
    oi();
    var t = fu(e, 0);
    if (!(t & 1))
      return ht(e, xe()), null;
    var n = Lu(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Vd(e);
      r !== 0 && (t = r, n = gf(e, r));
    }
    if (n === 1)
      throw n = kl, to(e, 0), sr(e, t), ht(e, xe()), n;
    if (n === 6)
      throw Error(L(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Gr(e, ct, Mn), ht(e, xe()), null;
  }
  function np(e, t) {
    var n = q;
    q |= 1;
    try {
      return e(t);
    } finally {
      q = n, q === 0 && (di = xe() + 500, zu && kr());
    }
  }
  function ao(e) {
    dr !== null && dr.tag === 0 && !(q & 6) && oi();
    var t = q;
    q |= 1;
    var n = Bt.transition, r = ee;
    try {
      if (Bt.transition = null, ee = 1, e)
        return e();
    } finally {
      ee = r, Bt.transition = n, q = t, !(q & 6) && kr();
    }
  }
  function rp() {
    Rt = qo.current, de(qo);
  }
  function to(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Sk(n)), Pe !== null)
      for (n = Pe.return; n !== null; ) {
        var r = n;
        switch (zf(r), r.tag) {
          case 1:
            r = r.type.childContextTypes, r != null && yu();
            break;
          case 3:
            si(), de(ft), de(qe), Kf();
            break;
          case 5:
            Wf(r);
            break;
          case 4:
            si();
            break;
          case 13:
            de(ve);
            break;
          case 19:
            de(ve);
            break;
          case 10:
            Hf(r.type._context);
            break;
          case 22:
          case 23:
            rp();
        }
        n = n.return;
      }
    if (ze = e, Pe = e = wr(e.current, null), Be = Rt = t, Fe = 0, kl = null, ep = Hu = lo = 0, ct = ll = null, Zr !== null) {
      for (t = 0; t < Zr.length; t++)
        if (n = Zr[t], r = n.interleaved, r !== null) {
          n.interleaved = null;
          var o = r.next, i = n.pending;
          if (i !== null) {
            var l = i.next;
            i.next = o, r.next = l;
          }
          n.pending = r;
        }
      Zr = null;
    }
    return e;
  }
  function Z0(e, t) {
    do {
      var n = Pe;
      try {
        if (bf(), nu.current = Cu, _u) {
          for (var r = ye.memoizedState; r !== null; ) {
            var o = r.queue;
            o !== null && (o.pending = null), r = r.next;
          }
          _u = false;
        }
        if (io = 0, Ie = Te = ye = null, ol = false, El = 0, Zf.current = null, n === null || n.return === null) {
          Fe = 1, kl = t, Pe = null;
          break;
        }
        e: {
          var i = e, l = n.return, a = n, u = t;
          if (t = Be, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
            var s = u, c = a, d = c.tag;
            if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
              var p = c.alternate;
              p ? (c.updateQueue = p.updateQueue, c.memoizedState = p.memoizedState, c.lanes = p.lanes) : (c.updateQueue = null, c.memoizedState = null);
            }
            var m = Qy(l);
            if (m !== null) {
              m.flags &= -257, Yy(m, l, a, i, t), m.mode & 1 && Ky(i, s, t), t = m, u = s;
              var y = t.updateQueue;
              if (y === null) {
                var w = /* @__PURE__ */ new Set();
                w.add(u), t.updateQueue = w;
              } else
                y.add(u);
              break e;
            } else {
              if (!(t & 1)) {
                Ky(i, s, t), op();
                break e;
              }
              u = Error(L(426));
            }
          } else if (he && a.mode & 1) {
            var R = Qy(l);
            if (R !== null) {
              !(R.flags & 65536) && (R.flags |= 256), Yy(R, l, a, i, t), Uf(ci(u, a));
              break e;
            }
          }
          i = u = ci(u, a), Fe !== 4 && (Fe = 2), ll === null ? ll = [i] : ll.push(i), i = l;
          do {
            switch (i.tag) {
              case 3:
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var f = I0(i, u, t);
                jy(i, f);
                break e;
              case 1:
                a = u;
                var h = i.type, v = i.stateNode;
                if (!(i.flags & 128) && (typeof h.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (yr === null || !yr.has(v)))) {
                  i.flags |= 65536, t &= -t, i.lanes |= t;
                  var E = z0(i, a, t);
                  jy(i, E);
                  break e;
                }
            }
            i = i.return;
          } while (i !== null);
        }
        nw(n);
      } catch (k) {
        t = k, Pe === n && n !== null && (Pe = n = n.return);
        continue;
      }
      break;
    } while (1);
  }
  function ew() {
    var e = Nu.current;
    return Nu.current = Cu, e === null ? Cu : e;
  }
  function op() {
    (Fe === 0 || Fe === 3 || Fe === 2) && (Fe = 4), ze === null || !(lo & 268435455) && !(Hu & 268435455) || sr(ze, Be);
  }
  function Lu(e, t) {
    var n = q;
    q |= 2;
    var r = ew();
    (ze !== e || Be !== t) && (Mn = null, to(e, t));
    do
      try {
        Wk();
        break;
      } catch (o) {
        Z0(e, o);
      }
    while (1);
    if (bf(), q = n, Nu.current = r, Pe !== null)
      throw Error(L(261));
    return ze = null, Be = 0, Fe;
  }
  function Wk() {
    for (; Pe !== null; )
      tw(Pe);
  }
  function Kk() {
    for (; Pe !== null && !wx(); )
      tw(Pe);
  }
  function tw(e) {
    var t = ow(e.alternate, e, Rt);
    e.memoizedProps = e.pendingProps, t === null ? nw(e) : Pe = t, Zf.current = null;
  }
  function nw(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, t.flags & 32768) {
        if (n = jk(n, t), n !== null) {
          n.flags &= 32767, Pe = n;
          return;
        }
        if (e !== null)
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Fe = 6, Pe = null;
          return;
        }
      } else if (n = Uk(n, t, Rt), n !== null) {
        Pe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Pe = t;
        return;
      }
      Pe = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function Gr(e, t, n) {
    var r = ee, o = Bt.transition;
    try {
      Bt.transition = null, ee = 1, Qk(e, t, n, r);
    } finally {
      Bt.transition = o, ee = r;
    }
    return null;
  }
  function Qk(e, t, n, r) {
    do
      oi();
    while (dr !== null);
    if (q & 6)
      throw Error(L(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null)
      return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
      throw Error(L(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (Dx(e, i), e === ze && (Pe = ze = null, Be = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ga || (Ga = true, iw(du, function() {
      return oi(), null;
    })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
      i = Bt.transition, Bt.transition = null;
      var l = ee;
      ee = 1;
      var a = q;
      q |= 4, Zf.current = null, Hk(e, n), X0(n, e), mk(Jd), pu = !!Yd, Jd = Yd = null, e.current = n, Bk(n, e, o), Sx(), q = a, ee = l, Bt.transition = i;
    } else
      e.current = n;
    if (Ga && (Ga = false, dr = e, Du = o), i = e.pendingLanes, i === 0 && (yr = null), xx(n.stateNode, r), ht(e, xe()), t !== null)
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        o = t[n], r(o.value, { componentStack: o.stack, digest: o.digest });
    if (Pu)
      throw Pu = false, e = vf, vf = null, e;
    return Du & 1 && e.tag !== 0 && oi(), i = e.pendingLanes, i & 1 ? e === yf ? al++ : (al = 0, yf = e) : al = 0, kr(), null;
  }
  function oi() {
    if (dr !== null) {
      var e = Ag(Du), t = Bt.transition, n = ee;
      try {
        if (Bt.transition = null, ee = 16 > e ? 16 : e, dr === null)
          var r = false;
        else {
          if (e = dr, dr = null, Du = 0, q & 6)
            throw Error(L(331));
          var o = q;
          for (q |= 4, A = e.current; A !== null; ) {
            var i = A, l = i.child;
            if (A.flags & 16) {
              var a = i.deletions;
              if (a !== null) {
                for (var u = 0; u < a.length; u++) {
                  var s = a[u];
                  for (A = s; A !== null; ) {
                    var c = A;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        il(8, c, i);
                    }
                    var d = c.child;
                    if (d !== null)
                      d.return = c, A = d;
                    else
                      for (; A !== null; ) {
                        c = A;
                        var p = c.sibling, m = c.return;
                        if (Q0(c), c === s) {
                          A = null;
                          break;
                        }
                        if (p !== null) {
                          p.return = m, A = p;
                          break;
                        }
                        A = m;
                      }
                  }
                }
                var y = i.alternate;
                if (y !== null) {
                  var w = y.child;
                  if (w !== null) {
                    y.child = null;
                    do {
                      var R = w.sibling;
                      w.sibling = null, w = R;
                    } while (w !== null);
                  }
                }
                A = i;
              }
            }
            if (i.subtreeFlags & 2064 && l !== null)
              l.return = i, A = l;
            else
              e:
                for (; A !== null; ) {
                  if (i = A, i.flags & 2048)
                    switch (i.tag) {
                      case 0:
                      case 11:
                      case 15:
                        il(9, i, i.return);
                    }
                  var f = i.sibling;
                  if (f !== null) {
                    f.return = i.return, A = f;
                    break e;
                  }
                  A = i.return;
                }
          }
          var h = e.current;
          for (A = h; A !== null; ) {
            l = A;
            var v = l.child;
            if (l.subtreeFlags & 2064 && v !== null)
              v.return = l, A = v;
            else
              e:
                for (l = h; A !== null; ) {
                  if (a = A, a.flags & 2048)
                    try {
                      switch (a.tag) {
                        case 0:
                        case 11:
                        case 15:
                          bu(9, a);
                      }
                    } catch (k) {
                      we(a, a.return, k);
                    }
                  if (a === l) {
                    A = null;
                    break e;
                  }
                  var E = a.sibling;
                  if (E !== null) {
                    E.return = a.return, A = E;
                    break e;
                  }
                  A = a.return;
                }
          }
          if (q = o, kr(), gn && typeof gn.onPostCommitFiberRoot == "function")
            try {
              gn.onPostCommitFiberRoot(Fu, e);
            } catch {
            }
          r = true;
        }
        return r;
      } finally {
        ee = n, Bt.transition = t;
      }
    }
    return false;
  }
  function ag(e, t, n) {
    t = ci(n, t), t = I0(e, t, 1), e = vr(e, t, 1), t = rt(), e !== null && (_l(e, 1, t), ht(e, t));
  }
  function we(e, t, n) {
    if (e.tag === 3)
      ag(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          ag(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yr === null || !yr.has(r))) {
            e = ci(n, e), e = z0(t, e, 1), t = vr(t, e, 1), e = rt(), t !== null && (_l(t, 1, e), ht(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yk(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = rt(), e.pingedLanes |= e.suspendedLanes & n, ze === e && (Be & n) === n && (Fe === 4 || Fe === 3 && (Be & 130023424) === Be && 500 > xe() - tp ? to(e, 0) : ep |= n), ht(e, t);
  }
  function rw(e, t) {
    t === 0 && (e.mode & 1 ? (t = za, za <<= 1, !(za & 130023424) && (za = 4194304)) : t = 1);
    var n = rt();
    e = Hn(e, t), e !== null && (_l(e, t, n), ht(e, n));
  }
  function Jk(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), rw(e, n);
  }
  function Xk(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(L(314));
    }
    r !== null && r.delete(t), rw(e, n);
  }
  var ow;
  ow = function(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || ft.current)
        dt = true;
      else {
        if (!(e.lanes & n) && !(t.flags & 128))
          return dt = false, zk(e, t, n);
        dt = !!(e.flags & 131072);
      }
    else
      dt = false, he && t.flags & 1048576 && a0(t, Su, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        ou(e, t), e = t.pendingProps;
        var o = li(t, qe.current);
        ri(t, n), o = Yf(null, t, r, e, o, n);
        var i = Jf();
        return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, pt(r) ? (i = true, gu(t)) : i = false, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Vf(t), o.updater = Uu, t.stateNode = o, o._reactInternals = t, of(t, r, e, n), t = uf(null, t, r, true, i, n)) : (t.tag = 0, he && i && If(t), nt(null, t, o, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (ou(e, t), e = t.pendingProps, o = r._init, r = o(r._payload), t.type = r, o = t.tag = qk(r), e = qt(r, e), o) {
            case 0:
              t = af(null, t, r, e, n);
              break e;
            case 1:
              t = Gy(null, t, r, e, n);
              break e;
            case 11:
              t = Jy(null, t, r, e, n);
              break e;
            case 14:
              t = Xy(null, t, r, qt(r.type, e), n);
              break e;
          }
          throw Error(L(306, r, ""));
        }
        return t;
      case 0:
        return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : qt(r, o), af(e, t, r, o, n);
      case 1:
        return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : qt(r, o), Gy(e, t, r, o, n);
      case 3:
        e: {
          if (H0(t), e === null)
            throw Error(L(387));
          r = t.pendingProps, i = t.memoizedState, o = i.element, d0(e, t), xu(t, r, null, n);
          var l = t.memoizedState;
          if (r = l.element, i.isDehydrated)
            if (i = { element: r, isDehydrated: false, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              o = ci(Error(L(423)), t), t = qy(e, t, r, n, o);
              break e;
            } else if (r !== o) {
              o = ci(Error(L(424)), t), t = qy(e, t, r, n, o);
              break e;
            } else
              for (xt = mr(t.stateNode.containerInfo.firstChild), kt = t, he = true, en = null, n = m0(t, null, r, n), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (ai(), r === o) {
              t = Bn(e, t, n);
              break e;
            }
            nt(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return v0(t), e === null && tf(t), r = t.type, o = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = o.children, Xd(r, o) ? l = null : i !== null && Xd(r, i) && (t.flags |= 32), b0(e, t), nt(e, t, l, n), t.child;
      case 6:
        return e === null && tf(t), null;
      case 13:
        return B0(e, t, n);
      case 4:
        return $f(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ui(t, null, r, n) : nt(e, t, r, n), t.child;
      case 11:
        return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : qt(r, o), Jy(e, t, r, o, n);
      case 7:
        return nt(e, t, t.pendingProps, n), t.child;
      case 8:
        return nt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return nt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, o = t.pendingProps, i = t.memoizedProps, l = o.value, le(Eu, r._currentValue), r._currentValue = l, i !== null)
            if (rn(i.value, l)) {
              if (i.children === o.children && !ft.current) {
                t = Bn(e, t, n);
                break e;
              }
            } else
              for (i = t.child, i !== null && (i.return = t); i !== null; ) {
                var a = i.dependencies;
                if (a !== null) {
                  l = i.child;
                  for (var u = a.firstContext; u !== null; ) {
                    if (u.context === r) {
                      if (i.tag === 1) {
                        u = Un(-1, n & -n), u.tag = 2;
                        var s = i.updateQueue;
                        if (s !== null) {
                          s = s.shared;
                          var c = s.pending;
                          c === null ? u.next = u : (u.next = c.next, c.next = u), s.pending = u;
                        }
                      }
                      i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), nf(i.return, n, t), a.lanes |= n;
                      break;
                    }
                    u = u.next;
                  }
                } else if (i.tag === 10)
                  l = i.type === t.type ? null : i.child;
                else if (i.tag === 18) {
                  if (l = i.return, l === null)
                    throw Error(L(341));
                  l.lanes |= n, a = l.alternate, a !== null && (a.lanes |= n), nf(l, n, t), l = i.sibling;
                } else
                  l = i.child;
                if (l !== null)
                  l.return = i;
                else
                  for (l = i; l !== null; ) {
                    if (l === t) {
                      l = null;
                      break;
                    }
                    if (i = l.sibling, i !== null) {
                      i.return = l.return, l = i;
                      break;
                    }
                    l = l.return;
                  }
                i = l;
              }
          nt(e, t, o.children, n), t = t.child;
        }
        return t;
      case 9:
        return o = t.type, r = t.pendingProps.children, ri(t, n), o = Vt(o), r = r(o), t.flags |= 1, nt(e, t, r, n), t.child;
      case 14:
        return r = t.type, o = qt(r, t.pendingProps), o = qt(r.type, o), Xy(e, t, r, o, n);
      case 15:
        return U0(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : qt(r, o), ou(e, t), t.tag = 1, pt(r) ? (e = true, gu(t)) : e = false, ri(t, n), p0(t, r, o), of(t, r, o, n), uf(null, t, r, true, e, n);
      case 19:
        return V0(e, t, n);
      case 22:
        return j0(e, t, n);
    }
    throw Error(L(156, t.tag));
  };
  function iw(e, t) {
    return Tg(e, t);
  }
  function Gk(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, n, r) {
    return new Gk(e, t, n, r);
  }
  function ip(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function qk(e) {
    if (typeof e == "function")
      return ip(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === kf)
        return 11;
      if (e === _f)
        return 14;
    }
    return 2;
  }
  function wr(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ht(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function au(e, t, n, r, o, i) {
    var l = 2;
    if (r = e, typeof e == "function")
      ip(e) && (l = 1);
    else if (typeof e == "string")
      l = 5;
    else
      e:
        switch (e) {
          case Bo:
            return no(n.children, o, i, t);
          case xf:
            l = 8, o |= 8;
            break;
          case Pd:
            return e = Ht(12, n, t, o | 2), e.elementType = Pd, e.lanes = i, e;
          case Dd:
            return e = Ht(13, n, t, o), e.elementType = Dd, e.lanes = i, e;
          case Ld:
            return e = Ht(19, n, t, o), e.elementType = Ld, e.lanes = i, e;
          case hg:
            return Bu(n, o, i, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case fg:
                  l = 10;
                  break e;
                case pg:
                  l = 9;
                  break e;
                case kf:
                  l = 11;
                  break e;
                case _f:
                  l = 14;
                  break e;
                case lr:
                  l = 16, r = null;
                  break e;
              }
            throw Error(L(130, e == null ? e : typeof e, ""));
        }
    return t = Ht(l, n, t, o), t.elementType = e, t.type = r, t.lanes = i, t;
  }
  function no(e, t, n, r) {
    return e = Ht(7, e, r, t), e.lanes = n, e;
  }
  function Bu(e, t, n, r) {
    return e = Ht(22, e, r, t), e.elementType = hg, e.lanes = n, e.stateNode = { isHidden: false }, e;
  }
  function _d(e, t, n) {
    return e = Ht(6, e, null, t), e.lanes = n, e;
  }
  function Cd(e, t, n) {
    return t = Ht(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Zk(e, t, n, r, o) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = sd(0), this.expirationTimes = sd(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = sd(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
  }
  function lp(e, t, n, r, o, i, l, a, u) {
    return e = new Zk(e, t, n, a, u), t === 1 ? (t = 1, i === true && (t |= 8)) : t = 0, i = Ht(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Vf(i), e;
  }
  function e_(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Ho, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function lw(e) {
    if (!e)
      return Er;
    e = e._reactInternals;
    e: {
      if (so(e) !== e || e.tag !== 1)
        throw Error(L(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (pt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(L(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (pt(n))
        return i0(e, n, t);
    }
    return t;
  }
  function aw(e, t, n, r, o, i, l, a, u) {
    return e = lp(n, r, true, e, o, i, l, a, u), e.context = lw(null), n = e.current, r = rt(), o = gr(n), i = Un(r, o), i.callback = t ?? null, vr(n, i, o), e.current.lanes = o, _l(e, o, r), ht(e, r), e;
  }
  function Vu(e, t, n, r) {
    var o = t.current, i = rt(), l = gr(o);
    return n = lw(n), t.context === null ? t.context = n : t.pendingContext = n, t = Un(i, l), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vr(o, t, l), e !== null && (nn(e, o, l, i), tu(e, o, l)), l;
  }
  function Tu(e) {
    if (e = e.current, !e.child)
      return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function ug(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ap(e, t) {
    ug(e, t), (e = e.alternate) && ug(e, t);
  }
  function t_() {
    return null;
  }
  var uw = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function up(e) {
    this._internalRoot = e;
  }
  $u.prototype.render = up.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw Error(L(409));
    Vu(e, t, null, null);
  };
  $u.prototype.unmount = up.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ao(function() {
        Vu(null, e, null, null);
      }), t[bn] = null;
    }
  };
  function $u(e) {
    this._internalRoot = e;
  }
  $u.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ug();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ur.length && t !== 0 && t < ur[n].priority; n++)
        ;
      ur.splice(n, 0, e), n === 0 && bg(e);
    }
  };
  function sp(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Wu(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function sg() {
  }
  function n_(e, t, n, r, o) {
    if (o) {
      if (typeof r == "function") {
        var i = r;
        r = function() {
          var s = Tu(l);
          i.call(s);
        };
      }
      var l = aw(t, r, e, 0, null, false, false, "", sg);
      return e._reactRootContainer = l, e[bn] = l.current, vl(e.nodeType === 8 ? e.parentNode : e), ao(), l;
    }
    for (; o = e.lastChild; )
      e.removeChild(o);
    if (typeof r == "function") {
      var a = r;
      r = function() {
        var s = Tu(u);
        a.call(s);
      };
    }
    var u = lp(e, 0, false, null, null, false, false, "", sg);
    return e._reactRootContainer = u, e[bn] = u.current, vl(e.nodeType === 8 ? e.parentNode : e), ao(function() {
      Vu(t, u, n, r);
    }), u;
  }
  function Ku(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
      var l = i;
      if (typeof o == "function") {
        var a = o;
        o = function() {
          var u = Tu(l);
          a.call(u);
        };
      }
      Vu(t, l, e, o);
    } else
      l = n_(n, t, e, o, r);
    return Tu(l);
  }
  Ig = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Gi(t.pendingLanes);
          n !== 0 && (Pf(t, n | 1), ht(t, xe()), !(q & 6) && (di = xe() + 500, kr()));
        }
        break;
      case 13:
        ao(function() {
          var r = Hn(e, 1);
          if (r !== null) {
            var o = rt();
            nn(r, e, 1, o);
          }
        }), ap(e, 1);
    }
  };
  Df = function(e) {
    if (e.tag === 13) {
      var t = Hn(e, 134217728);
      if (t !== null) {
        var n = rt();
        nn(t, e, 134217728, n);
      }
      ap(e, 134217728);
    }
  };
  zg = function(e) {
    if (e.tag === 13) {
      var t = gr(e), n = Hn(e, t);
      if (n !== null) {
        var r = rt();
        nn(n, e, t, r);
      }
      ap(e, t);
    }
  };
  Ug = function() {
    return ee;
  };
  jg = function(e, t) {
    var n = ee;
    try {
      return ee = e, t();
    } finally {
      ee = n;
    }
  };
  bd = function(e, t, n) {
    switch (t) {
      case "input":
        if (Od(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; )
            n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var o = Iu(r);
              if (!o)
                throw Error(L(90));
              vg(r), Od(r, o);
            }
          }
        }
        break;
      case "textarea":
        gg(e, n);
        break;
      case "select":
        t = n.value, t != null && Zo(e, !!n.multiple, t, false);
    }
  };
  _g = np;
  Cg = ao;
  var r_ = { usingClientEntryPoint: false, Events: [Nl, Ko, Iu, xg, kg, np] }, Qi = { findFiberByHostInstance: qr, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, o_ = { bundleType: Qi.bundleType, version: Qi.version, rendererPackageName: Qi.rendererPackageName, rendererConfig: Qi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Vn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Dg(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Qi.findFiberByHostInstance || t_, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (Yi = __REACT_DEVTOOLS_GLOBAL_HOOK__, !Yi.isDisabled && Yi.supportsFiber))
    try {
      Fu = Yi.inject(o_), gn = Yi;
    } catch {
    }
  var Yi;
  Nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = r_;
  Nt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!sp(t))
      throw Error(L(200));
    return e_(e, t, null, n);
  };
  Nt.createRoot = function(e, t) {
    if (!sp(e))
      throw Error(L(299));
    var n = false, r = "", o = uw;
    return t != null && (t.unstable_strictMode === true && (n = true), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = lp(e, 1, false, null, null, n, false, r, o), e[bn] = t.current, vl(e.nodeType === 8 ? e.parentNode : e), new up(t);
  };
  Nt.findDOMNode = function(e) {
    if (e == null)
      return null;
    if (e.nodeType === 1)
      return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(L(188)) : (e = Object.keys(e).join(","), Error(L(268, e)));
    return e = Dg(t), e = e === null ? null : e.stateNode, e;
  };
  Nt.flushSync = function(e) {
    return ao(e);
  };
  Nt.hydrate = function(e, t, n) {
    if (!Wu(t))
      throw Error(L(200));
    return Ku(null, e, t, true, n);
  };
  Nt.hydrateRoot = function(e, t, n) {
    if (!sp(e))
      throw Error(L(405));
    var r = n != null && n.hydratedSources || null, o = false, i = "", l = uw;
    if (n != null && (n.unstable_strictMode === true && (o = true), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = aw(t, null, e, 1, n ?? null, o, false, i, l), e[bn] = t.current, vl(e), r)
      for (e = 0; e < r.length; e++)
        n = r[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(n, o);
    return new $u(t);
  };
  Nt.render = function(e, t, n) {
    if (!Wu(t))
      throw Error(L(200));
    return Ku(null, e, t, false, n);
  };
  Nt.unmountComponentAtNode = function(e) {
    if (!Wu(e))
      throw Error(L(40));
    return e._reactRootContainer ? (ao(function() {
      Ku(null, null, e, false, function() {
        e._reactRootContainer = null, e[bn] = null;
      });
    }), true) : false;
  };
  Nt.unstable_batchedUpdates = np;
  Nt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Wu(n))
      throw Error(L(200));
    if (e == null || e._reactInternals === void 0)
      throw Error(L(38));
    return Ku(e, t, n, false, r);
  };
  Nt.version = "18.2.0-next-9e3b772b8-20220608";
});
var fw = Ae((vL, dw) => {
  "use strict";
  function cw() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cw);
      } catch (e) {
        console.error(e);
      }
  }
  cw(), dw.exports = sw();
});
var gw = {};
dn(gw, { AbortedDeferredError: () => Yt, Await: () => Al, MemoryRouter: () => pp, Navigate: () => hp, NavigationType: () => Z, Outlet: () => vi, Route: () => os, Router: () => Rn, RouterProvider: () => h_, Routes: () => mp, UNSAFE_DataRouterContext: () => Kt, UNSAFE_DataRouterStateContext: () => on, UNSAFE_LocationContext: () => Cr, UNSAFE_NavigationContext: () => Ze, UNSAFE_RouteContext: () => et, UNSAFE_mapRouteProperties: () => Il, UNSAFE_useRouteId: () => Fl, UNSAFE_useRoutesImpl: () => Ll, createMemoryRouter: () => yp, createPath: () => Le, createRoutesFromChildren: () => co, createRoutesFromElements: () => co, defer: () => Kr, generatePath: () => Lo, isRouteErrorResponse: () => Ne, json: () => pn, matchPath: () => zt, matchRoutes: () => Ce, parsePath: () => Ee, redirect: () => Tn, redirectDocument: () => Qr, renderMatches: () => vp, resolvePath: () => Wr, useActionData: () => rs, useAsyncError: () => hi, useAsyncValue: () => Ml, useBlocker: () => mi, useHref: () => $n, useInRouterContext: () => Sn, useLoaderData: () => Ol, useLocation: () => De, useMatch: () => Xu, useMatches: () => Lr, useNavigate: () => Nr, useNavigation: () => Dr, useNavigationType: () => Ju, useOutlet: () => Dl, useOutletContext: () => Gu, useParams: () => qu, useResolvedPath: () => En, useRevalidator: () => ts, useRouteError: () => fo, useRouteLoaderData: () => ns, useRoutes: () => Zu });
function _r() {
  return _r = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _r.apply(this, arguments);
}
function $n(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Sn() || j(false);
  let { basename: r, navigator: o } = N.useContext(Ze), { hash: i, pathname: l, search: a } = En(e, { relative: n }), u = l;
  return r !== "/" && (u = l === "/" ? r : Et([r, l])), o.createHref({ pathname: u, search: a, hash: i });
}
function Sn() {
  return N.useContext(Cr) != null;
}
function De() {
  return Sn() || j(false), N.useContext(Cr).location;
}
function Ju() {
  return N.useContext(Cr).navigationType;
}
function Xu(e) {
  Sn() || j(false);
  let { pathname: t } = De();
  return N.useMemo(() => zt(e, t), [t, e]);
}
function mw(e) {
  N.useContext(Ze).static || N.useLayoutEffect(e);
}
function Nr() {
  let { isDataRoute: e } = N.useContext(et);
  return e ? d_() : i_();
}
function i_() {
  Sn() || j(false);
  let e = N.useContext(Kt), { basename: t, future: n, navigator: r } = N.useContext(Ze), { matches: o } = N.useContext(et), { pathname: i } = De(), l = JSON.stringify(To(o, n.v7_relativeSplatPath)), a = N.useRef(false);
  return mw(() => {
    a.current = true;
  }), N.useCallback(function(s, c) {
    if (c === void 0 && (c = {}), !a.current)
      return;
    if (typeof s == "number") {
      r.go(s);
      return;
    }
    let d = Fo(s, JSON.parse(l), i, c.relative === "path");
    e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : Et([t, d.pathname])), (c.replace ? r.replace : r.push)(d, c.state, c);
  }, [t, r, l, i, e]);
}
function Gu() {
  return N.useContext(vw);
}
function Dl(e) {
  let t = N.useContext(et).outlet;
  return t && N.createElement(vw.Provider, { value: e }, t);
}
function qu() {
  let { matches: e } = N.useContext(et), t = e[e.length - 1];
  return t ? t.params : {};
}
function En(e, t) {
  let { relative: n } = t === void 0 ? {} : t, { future: r } = N.useContext(Ze), { matches: o } = N.useContext(et), { pathname: i } = De(), l = JSON.stringify(To(o, r.v7_relativeSplatPath));
  return N.useMemo(() => Fo(e, JSON.parse(l), i, n === "path"), [e, l, i, n]);
}
function Zu(e, t) {
  return Ll(e, t);
}
function Ll(e, t, n, r) {
  Sn() || j(false);
  let { navigator: o } = N.useContext(Ze), { matches: i } = N.useContext(et), l = i[i.length - 1], a = l ? l.params : {}, u = l ? l.pathname : "/", s = l ? l.pathnameBase : "/", c = l && l.route, d = De(), p;
  if (t) {
    var m;
    let h = typeof t == "string" ? Ee(t) : t;
    s === "/" || (m = h.pathname) != null && m.startsWith(s) || j(false), p = h;
  } else
    p = d;
  let y = p.pathname || "/", w = s === "/" ? y : y.slice(s.length) || "/", R = Ce(e, { pathname: w }), f = yw(R && R.map((h) => Object.assign({}, h, { params: Object.assign({}, a, h.params), pathname: Et([s, o.encodeLocation ? o.encodeLocation(h.pathname).pathname : h.pathname]), pathnameBase: h.pathnameBase === "/" ? s : Et([s, o.encodeLocation ? o.encodeLocation(h.pathnameBase).pathname : h.pathnameBase]) })), i, n, r);
  return t && f ? N.createElement(Cr.Provider, { value: { location: _r({ pathname: "/", search: "", hash: "", state: null, key: "default" }, p), navigationType: Z.Pop } }, f) : f;
}
function l_() {
  let e = fo(), t = Ne(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, r = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: r }, i = { padding: "2px 4px", backgroundColor: r };
  return N.createElement(N.Fragment, null, N.createElement("h2", null, "Unexpected Application Error!"), N.createElement("h3", { style: { fontStyle: "italic" } }, t), n ? N.createElement("pre", { style: o }, n) : null, null);
}
function u_(e) {
  let { routeContext: t, match: n, children: r } = e, o = N.useContext(Kt);
  return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id), N.createElement(et.Provider, { value: t }, r);
}
function yw(e, t, n, r) {
  var o;
  if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
    var i;
    if ((i = n) != null && i.errors)
      e = n.matches;
    else
      return null;
  }
  let l = e, a = (o = n) == null ? void 0 : o.errors;
  if (a != null) {
    let c = l.findIndex((d) => d.route.id && a?.[d.route.id]);
    c >= 0 || j(false), l = l.slice(0, Math.min(l.length, c + 1));
  }
  let u = false, s = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < l.length; c++) {
      let d = l[c];
      if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (s = c), d.route.id) {
        let { loaderData: p, errors: m } = n, y = d.route.loader && p[d.route.id] === void 0 && (!m || m[d.route.id] === void 0);
        if (d.route.lazy || y) {
          u = true, s >= 0 ? l = l.slice(0, s + 1) : l = [l[0]];
          break;
        }
      }
    }
  return l.reduceRight((c, d, p) => {
    let m, y = false, w = null, R = null;
    n && (m = a && d.route.id ? a[d.route.id] : void 0, w = d.route.errorElement || a_, u && (s < 0 && p === 0 ? (f_("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration"), y = true, R = null) : s === p && (y = true, R = d.route.hydrateFallbackElement || null)));
    let f = t.concat(l.slice(0, p + 1)), h = () => {
      let v;
      return m ? v = w : y ? v = R : d.route.Component ? v = N.createElement(d.route.Component, null) : d.route.element ? v = d.route.element : v = c, N.createElement(u_, { match: d, routeContext: { outlet: c, matches: f, isDataRoute: n != null }, children: v });
    };
    return n && (d.route.ErrorBoundary || d.route.errorElement || p === 0) ? N.createElement(cp, { location: n.location, revalidation: n.revalidation, component: w, error: m, children: h(), routeContext: { outlet: null, matches: f, isDataRoute: true } }) : h();
  }, null);
}
function fp(e) {
  let t = N.useContext(Kt);
  return t || j(false), t;
}
function Pr(e) {
  let t = N.useContext(on);
  return t || j(false), t;
}
function s_(e) {
  let t = N.useContext(et);
  return t || j(false), t;
}
function Tl(e) {
  let t = s_(e), n = t.matches[t.matches.length - 1];
  return n.route.id || j(false), n.route.id;
}
function Fl() {
  return Tl(mt.UseRouteId);
}
function Dr() {
  return Pr(mt.UseNavigation).navigation;
}
function ts() {
  let e = fp(es.UseRevalidator), t = Pr(mt.UseRevalidator);
  return N.useMemo(() => ({ revalidate: e.router.revalidate, state: t.revalidation }), [e.router.revalidate, t.revalidation]);
}
function Lr() {
  let { matches: e, loaderData: t } = Pr(mt.UseMatches);
  return N.useMemo(() => e.map((n) => ga(n, t)), [e, t]);
}
function Ol() {
  let e = Pr(mt.UseLoaderData), t = Tl(mt.UseLoaderData);
  if (e.errors && e.errors[t] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + t + ")");
    return;
  }
  return e.loaderData[t];
}
function ns(e) {
  return Pr(mt.UseRouteLoaderData).loaderData[e];
}
function rs() {
  let e = Pr(mt.UseActionData), t = Tl(mt.UseLoaderData);
  return e.actionData ? e.actionData[t] : void 0;
}
function fo() {
  var e;
  let t = N.useContext(hw), n = Pr(mt.UseRouteError), r = Tl(mt.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Ml() {
  let e = N.useContext(Qu);
  return e?._data;
}
function hi() {
  let e = N.useContext(Qu);
  return e?._error;
}
function mi(e) {
  let { router: t, basename: n } = fp(es.UseBlocker), r = Pr(mt.UseBlocker), [o, i] = N.useState(""), l = N.useCallback((a) => {
    if (typeof e != "function")
      return !!e;
    if (n === "/")
      return e(a);
    let { currentLocation: u, nextLocation: s, historyAction: c } = a;
    return e({ currentLocation: _r({}, u, { pathname: be(u.pathname, n) || u.pathname }), nextLocation: _r({}, s, { pathname: be(s.pathname, n) || s.pathname }), historyAction: c });
  }, [n, e]);
  return N.useEffect(() => {
    let a = String(++c_);
    return i(a), () => t.deleteBlocker(a);
  }, [t]), N.useEffect(() => {
    o !== "" && t.getBlocker(o, l);
  }, [t, o, l]), o && r.blockers.has(o) ? r.blockers.get(o) : er;
}
function d_() {
  let { router: e } = fp(es.UseNavigateStable), t = Tl(mt.UseNavigateStable), n = N.useRef(false);
  return mw(() => {
    n.current = true;
  }), N.useCallback(function(o, i) {
    i === void 0 && (i = {}), n.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, _r({ fromRouteId: t }, i)));
  }, [e, t]);
}
function f_(e, t, n) {
  !t && !pw[e] && (pw[e] = true);
}
function h_(e) {
  let { fallbackElement: t, router: n, future: r } = e, [o, i] = N.useState(n.state), { v7_startTransition: l } = r || {}, a = N.useCallback((d) => {
    l && Yu ? Yu(() => i(d)) : i(d);
  }, [i, l]);
  N.useLayoutEffect(() => n.subscribe(a), [n, a]), N.useEffect(() => {
  }, []);
  let u = N.useMemo(() => ({ createHref: n.createHref, encodeLocation: n.encodeLocation, go: (d) => n.navigate(d), push: (d, p, m) => n.navigate(d, { state: p, preventScrollReset: m?.preventScrollReset }), replace: (d, p, m) => n.navigate(d, { replace: true, state: p, preventScrollReset: m?.preventScrollReset }) }), [n]), s = n.basename || "/", c = N.useMemo(() => ({ router: n, navigator: u, static: false, basename: s }), [n, u, s]);
  return N.createElement(N.Fragment, null, N.createElement(Kt.Provider, { value: c }, N.createElement(on.Provider, { value: o }, N.createElement(Rn, { basename: s, location: o.location, navigationType: o.historyAction, navigator: u, future: { v7_relativeSplatPath: n.future.v7_relativeSplatPath } }, o.initialized || n.future.v7_partialHydration ? N.createElement(m_, { routes: n.routes, future: n.future, state: o }) : t))), null);
}
function m_(e) {
  let { routes: t, future: n, state: r } = e;
  return Ll(t, void 0, r, n);
}
function pp(e) {
  let { basename: t, children: n, initialEntries: r, initialIndex: o, future: i } = e, l = N.useRef();
  l.current == null && (l.current = ma({ initialEntries: r, initialIndex: o, v5Compat: true }));
  let a = l.current, [u, s] = N.useState({ action: a.action, location: a.location }), { v7_startTransition: c } = i || {}, d = N.useCallback((p) => {
    c && Yu ? Yu(() => s(p)) : s(p);
  }, [s, c]);
  return N.useLayoutEffect(() => a.listen(d), [a, d]), N.createElement(Rn, { basename: t, children: n, location: u.location, navigationType: u.action, navigator: a, future: i });
}
function hp(e) {
  let { to: t, replace: n, state: r, relative: o } = e;
  Sn() || j(false);
  let { future: i, static: l } = N.useContext(Ze), { matches: a } = N.useContext(et), { pathname: u } = De(), s = Nr(), c = Fo(t, To(a, i.v7_relativeSplatPath), u, o === "path"), d = JSON.stringify(c);
  return N.useEffect(() => s(JSON.parse(d), { replace: n, state: r, relative: o }), [s, d, o, n, r]), null;
}
function vi(e) {
  return Dl(e.context);
}
function os(e) {
  j(false);
}
function Rn(e) {
  let { basename: t = "/", children: n = null, location: r, navigationType: o = Z.Pop, navigator: i, static: l = false, future: a } = e;
  Sn() && j(false);
  let u = t.replace(/^\/*/, "/"), s = N.useMemo(() => ({ basename: u, navigator: i, static: l, future: _r({ v7_relativeSplatPath: false }, a) }), [u, a, i, l]);
  typeof r == "string" && (r = Ee(r));
  let { pathname: c = "/", search: d = "", hash: p = "", state: m = null, key: y = "default" } = r, w = N.useMemo(() => {
    let R = be(c, u);
    return R == null ? null : { location: { pathname: R, search: d, hash: p, state: m, key: y }, navigationType: o };
  }, [u, c, d, p, m, y, o]);
  return w == null ? null : N.createElement(Ze.Provider, { value: s }, N.createElement(Cr.Provider, { children: n, value: w }));
}
function mp(e) {
  let { children: t, location: n } = e;
  return Zu(co(t), n);
}
function Al(e) {
  let { children: t, errorElement: n, resolve: r } = e;
  return N.createElement(dp, { resolve: r, errorElement: n }, N.createElement(y_, null, t));
}
function y_(e) {
  let { children: t } = e, n = Ml(), r = typeof t == "function" ? t(n) : t;
  return N.createElement(N.Fragment, null, r);
}
function co(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return N.Children.forEach(e, (r, o) => {
    if (!N.isValidElement(r))
      return;
    let i = [...t, o];
    if (r.type === N.Fragment) {
      n.push.apply(n, co(r.props.children, i));
      return;
    }
    r.type !== os && j(false), !r.props.index || !r.props.children || j(false);
    let l = { id: r.props.id || i.join("-"), caseSensitive: r.props.caseSensitive, element: r.props.element, Component: r.props.Component, index: r.props.index, path: r.props.path, loader: r.props.loader, action: r.props.action, errorElement: r.props.errorElement, ErrorBoundary: r.props.ErrorBoundary, hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null, shouldRevalidate: r.props.shouldRevalidate, handle: r.props.handle, lazy: r.props.lazy };
    r.props.children && (l.children = co(r.props.children, i)), n.push(l);
  }), n;
}
function vp(e) {
  return yw(e);
}
function Il(e) {
  let t = { hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null };
  return e.Component && Object.assign(t, { element: N.createElement(e.Component), Component: void 0 }), e.HydrateFallback && Object.assign(t, { hydrateFallbackElement: N.createElement(e.HydrateFallback), HydrateFallback: void 0 }), e.ErrorBoundary && Object.assign(t, { errorElement: N.createElement(e.ErrorBoundary), ErrorBoundary: void 0 }), t;
}
function yp(e, t) {
  return Oo({ basename: t?.basename, future: _r({}, t?.future, { v7_prependBasename: true }), history: ma({ initialEntries: t?.initialEntries, initialIndex: t?.initialIndex }), hydrationData: t?.hydrationData, routes: e, mapRouteProperties: Il }).initialize();
}
var N;
var Kt;
var on;
var Qu;
var Ze;
var Cr;
var et;
var hw;
var vw;
var a_;
var cp;
var es;
var mt;
var c_;
var pw;
var p_;
var Yu;
var Wt;
var v_;
var dp;
var is = te(() => {
  N = se(st());
  Fn();
  Fn();
  Kt = N.createContext(null), on = N.createContext(null), Qu = N.createContext(null), Ze = N.createContext(null), Cr = N.createContext(null), et = N.createContext({ outlet: null, matches: [], isDataRoute: false }), hw = N.createContext(null);
  vw = N.createContext(null);
  a_ = N.createElement(l_, null), cp = class extends N.Component {
    constructor(t) {
      super(t), this.state = { location: t.location, revalidation: t.revalidation, error: t.error };
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
      return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? { error: t.error, location: t.location, revalidation: t.revalidation } : { error: t.error !== void 0 ? t.error : n.error, location: n.location, revalidation: t.revalidation || n.revalidation };
    }
    componentDidCatch(t, n) {
      console.error("React Router caught the following error during render", t, n);
    }
    render() {
      return this.state.error !== void 0 ? N.createElement(et.Provider, { value: this.props.routeContext }, N.createElement(hw.Provider, { value: this.state.error, children: this.props.component })) : this.props.children;
    }
  };
  es = function(e) {
    return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
  }(es || {}), mt = function(e) {
    return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
  }(mt || {});
  c_ = 0;
  pw = {};
  p_ = "startTransition", Yu = N[p_];
  Wt = function(e) {
    return e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error", e;
  }(Wt || {}), v_ = new Promise(() => {
  }), dp = class extends N.Component {
    constructor(t) {
      super(t), this.state = { error: null };
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    componentDidCatch(t, n) {
      console.error("<Await> caught the following error during render", t, n);
    }
    render() {
      let { children: t, errorElement: n, resolve: r } = this.props, o = null, i = Wt.pending;
      if (!(r instanceof Promise))
        i = Wt.success, o = Promise.resolve(), Object.defineProperty(o, "_tracked", { get: () => true }), Object.defineProperty(o, "_data", { get: () => r });
      else if (this.state.error) {
        i = Wt.error;
        let l = this.state.error;
        o = Promise.reject().catch(() => {
        }), Object.defineProperty(o, "_tracked", { get: () => true }), Object.defineProperty(o, "_error", { get: () => l });
      } else
        r._tracked ? (o = r, i = o._error !== void 0 ? Wt.error : o._data !== void 0 ? Wt.success : Wt.pending) : (i = Wt.pending, Object.defineProperty(r, "_tracked", { get: () => true }), o = r.then((l) => Object.defineProperty(r, "_data", { get: () => l }), (l) => Object.defineProperty(r, "_error", { get: () => l })));
      if (i === Wt.error && o._error instanceof Yt)
        throw v_;
      if (i === Wt.error && !n)
        throw o._error;
      if (i === Wt.error)
        return N.createElement(Qu.Provider, { value: o, children: n });
      if (i === Wt.success)
        return N.createElement(Qu.Provider, { value: o, children: t });
      throw o;
    }
  };
});
var Lw = {};
dn(Lw, { AbortedDeferredError: () => Yt, Await: () => Al, BrowserRouter: () => H_, Form: () => _p, HashRouter: () => B_, Link: () => ds, MemoryRouter: () => pp, NavLink: () => kp, Navigate: () => hp, NavigationType: () => Z, Outlet: () => vi, Route: () => os, Router: () => Rn, RouterProvider: () => j_, Routes: () => mp, ScrollRestoration: () => K_, UNSAFE_DataRouterContext: () => Kt, UNSAFE_DataRouterStateContext: () => on, UNSAFE_FetchersContext: () => xp, UNSAFE_LocationContext: () => Cr, UNSAFE_NavigationContext: () => Ze, UNSAFE_RouteContext: () => et, UNSAFE_ViewTransitionContext: () => Rp, UNSAFE_useRouteId: () => Fl, UNSAFE_useScrollRestoration: () => hs, createBrowserRouter: () => F_, createHashRouter: () => O_, createMemoryRouter: () => yp, createPath: () => Le, createRoutesFromChildren: () => co, createRoutesFromElements: () => co, createSearchParams: () => ss, defer: () => Kr, generatePath: () => Lo, isRouteErrorResponse: () => Ne, json: () => pn, matchPath: () => zt, matchRoutes: () => Ce, parsePath: () => Ee, redirect: () => Tn, redirectDocument: () => Qr, renderMatches: () => vp, resolvePath: () => Wr, unstable_HistoryRouter: () => V_, unstable_usePrompt: () => Dw, unstable_useViewTransitionState: () => Pp, useActionData: () => rs, useAsyncError: () => hi, useAsyncValue: () => Ml, useBeforeUnload: () => Pw, useBlocker: () => mi, useFetcher: () => Cw, useFetchers: () => Nw, useFormAction: () => Np, useHref: () => $n, useInRouterContext: () => Sn, useLinkClickHandler: () => xw, useLoaderData: () => Ol, useLocation: () => De, useMatch: () => Xu, useMatches: () => Lr, useNavigate: () => Nr, useNavigation: () => Dr, useNavigationType: () => Ju, useOutlet: () => Dl, useOutletContext: () => Gu, useParams: () => qu, useResolvedPath: () => En, useRevalidator: () => ts, useRouteError: () => fo, useRouteLoaderData: () => ns, useRoutes: () => Zu, useSearchParams: () => kw, useSubmit: () => ps });
function vt() {
  return vt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, vt.apply(this, arguments);
}
function Ep(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function cs(e) {
  return e != null && typeof e.tagName == "string";
}
function w_(e) {
  return cs(e) && e.tagName.toLowerCase() === "button";
}
function S_(e) {
  return cs(e) && e.tagName.toLowerCase() === "form";
}
function E_(e) {
  return cs(e) && e.tagName.toLowerCase() === "input";
}
function R_(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function x_(e, t) {
  return e.button === 0 && (!t || t === "_self") && !R_(e);
}
function ss(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, n) => {
    let r = e[n];
    return t.concat(Array.isArray(r) ? r.map((o) => [n, o]) : [[n, r]]);
  }, []));
}
function k_(e, t) {
  let n = ss(e);
  return t && t.forEach((r, o) => {
    n.has(o) || t.getAll(o).forEach((i) => {
      n.append(o, i);
    });
  }), n;
}
function __() {
  if (ls === null)
    try {
      new FormData(document.createElement("form"), 0), ls = false;
    } catch {
      ls = true;
    }
  return ls;
}
function wp(e) {
  return e != null && !C_.has(e) ? null : e;
}
function N_(e, t) {
  let n, r, o, i, l;
  if (S_(e)) {
    let a = e.getAttribute("action");
    r = a ? be(a, t) : null, n = e.getAttribute("method") || us, o = wp(e.getAttribute("enctype")) || gp, i = new FormData(e);
  } else if (w_(e) || E_(e) && (e.type === "submit" || e.type === "image")) {
    let a = e.form;
    if (a == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let u = e.getAttribute("formaction") || a.getAttribute("action");
    if (r = u ? be(u, t) : null, n = e.getAttribute("formmethod") || a.getAttribute("method") || us, o = wp(e.getAttribute("formenctype")) || wp(a.getAttribute("enctype")) || gp, i = new FormData(a, e), !__()) {
      let { name: s, type: c, value: d } = e;
      if (c === "image") {
        let p = s ? s + "." : "";
        i.append(p + "x", "0"), i.append(p + "y", "0");
      } else
        s && i.append(s, d);
    }
  } else {
    if (cs(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = us, r = null, o = gp, l = e;
  }
  return i && o === "text/plain" && (l = i, i = void 0), { action: r, method: n.toLowerCase(), encType: o, formData: i, body: l };
}
function F_(e, t) {
  return Oo({ basename: t?.basename, future: vt({}, t?.future, { v7_prependBasename: true }), history: va({ window: t?.window }), hydrationData: t?.hydrationData || Rw(), routes: e, mapRouteProperties: Il, window: t?.window }).initialize();
}
function O_(e, t) {
  return Oo({ basename: t?.basename, future: vt({}, t?.future, { v7_prependBasename: true }), history: ya({ window: t?.window }), hydrationData: t?.hydrationData || Rw(), routes: e, mapRouteProperties: Il, window: t?.window }).initialize();
}
function Rw() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = vt({}, t, { errors: M_(t.errors) })), t;
}
function M_(e) {
  if (!e)
    return null;
  let t = Object.entries(e), n = {};
  for (let [r, o] of t)
    if (o && o.__type === "RouteErrorResponse")
      n[r] = new Ln(o.status, o.statusText, o.data, o.internal === true);
    else if (o && o.__type === "Error") {
      if (o.__subType) {
        let i = window[o.__subType];
        if (typeof i == "function")
          try {
            let l = new i(o.message);
            l.stack = "", n[r] = l;
          } catch {
          }
      }
      if (n[r] == null) {
        let i = new Error(o.message);
        i.stack = "", n[r] = i;
      }
    } else
      n[r] = o;
  return n;
}
function U_(e) {
  Tr ? Tr(e) : e();
}
function zl(e) {
  ww ? ww(e) : e();
}
function j_(e) {
  let { fallbackElement: t, router: n, future: r } = e, [o, i] = D.useState(n.state), [l, a] = D.useState(), [u, s] = D.useState({ isTransitioning: false }), [c, d] = D.useState(), [p, m] = D.useState(), [y, w] = D.useState(), R = D.useRef(/* @__PURE__ */ new Map()), { v7_startTransition: f } = r || {}, h = D.useCallback((_) => {
    f ? U_(_) : _();
  }, [f]), v = D.useCallback((_, P) => {
    let { deletedFetchers: O, unstable_flushSync: z, unstable_viewTransitionOpts: X } = P;
    O.forEach((me) => R.current.delete(me)), _.fetchers.forEach((me, wt) => {
      me.data !== void 0 && R.current.set(wt, me.data);
    });
    let Ue = n.window == null || typeof n.window.document.startViewTransition != "function";
    if (!X || Ue) {
      z ? zl(() => i(_)) : h(() => i(_));
      return;
    }
    if (z) {
      zl(() => {
        p && (c && c.resolve(), p.skipTransition()), s({ isTransitioning: true, flushSync: true, currentLocation: X.currentLocation, nextLocation: X.nextLocation });
      });
      let me = n.window.document.startViewTransition(() => {
        zl(() => i(_));
      });
      me.finished.finally(() => {
        zl(() => {
          d(void 0), m(void 0), a(void 0), s({ isTransitioning: false });
        });
      }), zl(() => m(me));
      return;
    }
    p ? (c && c.resolve(), p.skipTransition(), w({ state: _, currentLocation: X.currentLocation, nextLocation: X.nextLocation })) : (a(_), s({ isTransitioning: true, flushSync: false, currentLocation: X.currentLocation, nextLocation: X.nextLocation }));
  }, [n.window, p, c, R, h]);
  D.useLayoutEffect(() => n.subscribe(v), [n, v]), D.useEffect(() => {
    u.isTransitioning && !u.flushSync && d(new Sp());
  }, [u]), D.useEffect(() => {
    if (c && l && n.window) {
      let _ = l, P = c.promise, O = n.window.document.startViewTransition(async () => {
        h(() => i(_)), await P;
      });
      O.finished.finally(() => {
        d(void 0), m(void 0), a(void 0), s({ isTransitioning: false });
      }), m(O);
    }
  }, [h, l, c, n.window]), D.useEffect(() => {
    c && l && o.location.key === l.location.key && c.resolve();
  }, [c, p, o.location, l]), D.useEffect(() => {
    !u.isTransitioning && y && (a(y.state), s({ isTransitioning: true, flushSync: false, currentLocation: y.currentLocation, nextLocation: y.nextLocation }), w(void 0));
  }, [u.isTransitioning, y]), D.useEffect(() => {
  }, []);
  let E = D.useMemo(() => ({ createHref: n.createHref, encodeLocation: n.encodeLocation, go: (_) => n.navigate(_), push: (_, P, O) => n.navigate(_, { state: P, preventScrollReset: O?.preventScrollReset }), replace: (_, P, O) => n.navigate(_, { replace: true, state: P, preventScrollReset: O?.preventScrollReset }) }), [n]), k = n.basename || "/", g = D.useMemo(() => ({ router: n, navigator: E, static: false, basename: k }), [n, E, k]);
  return D.createElement(D.Fragment, null, D.createElement(Kt.Provider, { value: g }, D.createElement(on.Provider, { value: o }, D.createElement(xp.Provider, { value: R.current }, D.createElement(Rp.Provider, { value: u }, D.createElement(Rn, { basename: k, location: o.location, navigationType: o.historyAction, navigator: E, future: { v7_relativeSplatPath: n.future.v7_relativeSplatPath } }, o.initialized || n.future.v7_partialHydration ? D.createElement(b_, { routes: n.routes, future: n.future, state: o }) : t))))), null);
}
function b_(e) {
  let { routes: t, future: n, state: r } = e;
  return Ll(t, void 0, r, n);
}
function H_(e) {
  let { basename: t, children: n, future: r, window: o } = e, i = D.useRef();
  i.current == null && (i.current = va({ window: o, v5Compat: true }));
  let l = i.current, [a, u] = D.useState({ action: l.action, location: l.location }), { v7_startTransition: s } = r || {}, c = D.useCallback((d) => {
    s && Tr ? Tr(() => u(d)) : u(d);
  }, [u, s]);
  return D.useLayoutEffect(() => l.listen(c), [l, c]), D.createElement(Rn, { basename: t, children: n, location: a.location, navigationType: a.action, navigator: l, future: r });
}
function B_(e) {
  let { basename: t, children: n, future: r, window: o } = e, i = D.useRef();
  i.current == null && (i.current = ya({ window: o, v5Compat: true }));
  let l = i.current, [a, u] = D.useState({ action: l.action, location: l.location }), { v7_startTransition: s } = r || {}, c = D.useCallback((d) => {
    s && Tr ? Tr(() => u(d)) : u(d);
  }, [u, s]);
  return D.useLayoutEffect(() => l.listen(c), [l, c]), D.createElement(Rn, { basename: t, children: n, location: a.location, navigationType: a.action, navigator: l, future: r });
}
function V_(e) {
  let { basename: t, children: n, future: r, history: o } = e, [i, l] = D.useState({ action: o.action, location: o.location }), { v7_startTransition: a } = r || {}, u = D.useCallback((s) => {
    a && Tr ? Tr(() => l(s)) : l(s);
  }, [l, a]);
  return D.useLayoutEffect(() => o.listen(u), [o, u]), D.createElement(Rn, { basename: t, children: n, location: i.location, navigationType: i.action, navigator: o, future: r });
}
function K_(e) {
  let { getKey: t, storageKey: n } = e;
  return hs({ getKey: t, storageKey: n }), null;
}
function fs(e) {
  let t = D.useContext(Kt);
  return t || j(false), t;
}
function Cp(e) {
  let t = D.useContext(on);
  return t || j(false), t;
}
function xw(e, t) {
  let { target: n, replace: r, state: o, preventScrollReset: i, relative: l, unstable_viewTransition: a } = t === void 0 ? {} : t, u = Nr(), s = De(), c = En(e, { relative: l });
  return D.useCallback((d) => {
    if (x_(d, n)) {
      d.preventDefault();
      let p = r !== void 0 ? r : Le(s) === Le(c);
      u(e, { replace: p, state: o, preventScrollReset: i, relative: l, unstable_viewTransition: a });
    }
  }, [s, u, c, r, o, n, e, i, l, a]);
}
function kw(e) {
  let t = D.useRef(ss(e)), n = D.useRef(false), r = De(), o = D.useMemo(() => k_(r.search, n.current ? null : t.current), [r.search]), i = Nr(), l = D.useCallback((a, u) => {
    let s = ss(typeof a == "function" ? a(o) : a);
    n.current = true, i("?" + s, u);
  }, [i, o]);
  return [o, l];
}
function Q_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function ps() {
  let { router: e } = fs(yi.UseSubmit), { basename: t } = D.useContext(Ze), n = Fl();
  return D.useCallback(function(r, o) {
    o === void 0 && (o = {}), Q_();
    let { action: i, method: l, encType: a, formData: u, body: s } = N_(r, t);
    if (o.navigate === false) {
      let c = o.fetcherKey || _w();
      e.fetch(c, n, o.action || i, { preventScrollReset: o.preventScrollReset, formData: u, body: s, formMethod: o.method || l, formEncType: o.encType || a, unstable_flushSync: o.unstable_flushSync });
    } else
      e.navigate(o.action || i, { preventScrollReset: o.preventScrollReset, formData: u, body: s, formMethod: o.method || l, formEncType: o.encType || a, replace: o.replace, state: o.state, fromRouteId: n, unstable_flushSync: o.unstable_flushSync, unstable_viewTransition: o.unstable_viewTransition });
  }, [e, t, n]);
}
function Np(e, t) {
  let { relative: n } = t === void 0 ? {} : t, { basename: r } = D.useContext(Ze), o = D.useContext(et);
  o || j(false);
  let [i] = o.matches.slice(-1), l = vt({}, En(e || ".", { relative: n })), a = De();
  if (e == null) {
    l.search = a.search;
    let u = new URLSearchParams(l.search);
    u.has("index") && u.get("index") === "" && (u.delete("index"), l.search = u.toString() ? "?" + u.toString() : "");
  }
  return (!e || e === ".") && i.route.index && (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (l.pathname = l.pathname === "/" ? r : Et([r, l.pathname])), Le(l);
}
function Cw(e) {
  var t;
  let { key: n } = e === void 0 ? {} : e, { router: r } = fs(yi.UseFetcher), o = Cp(Ul.UseFetcher), i = D.useContext(xp), l = D.useContext(et), a = (t = l.matches[l.matches.length - 1]) == null ? void 0 : t.route.id;
  i || j(false), l || j(false), a == null && j(false);
  let u = Sw ? Sw() : "", [s, c] = D.useState(n || u);
  n && n !== s ? c(n) : s || c(_w()), D.useEffect(() => (r.getFetcher(s), () => {
    r.deleteFetcher(s);
  }), [r, s]);
  let d = D.useCallback((h, v) => {
    a || j(false), r.fetch(s, a, h, v);
  }, [s, a, r]), p = ps(), m = D.useCallback((h, v) => {
    p(h, vt({}, v, { navigate: false, fetcherKey: s }));
  }, [s, p]), y = D.useMemo(() => D.forwardRef((v, E) => D.createElement(_p, vt({}, v, { navigate: false, fetcherKey: s, ref: E }))), [s]), w = o.fetchers.get(s) || wa, R = i.get(s);
  return D.useMemo(() => vt({ Form: y, submit: m, load: d }, w, { data: R }), [y, m, d, w, R]);
}
function Nw() {
  let e = Cp(Ul.UseFetchers);
  return Array.from(e.fetchers.entries()).map((t) => {
    let [n, r] = t;
    return vt({}, r, { key: n });
  });
}
function hs(e) {
  let { getKey: t, storageKey: n } = e === void 0 ? {} : e, { router: r } = fs(yi.UseScrollRestoration), { restoreScrollPosition: o, preventScrollReset: i } = Cp(Ul.UseScrollRestoration), { basename: l } = D.useContext(Ze), a = De(), u = Lr(), s = Dr();
  D.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), J_(D.useCallback(() => {
    if (s.state === "idle") {
      let c = (t ? t(a, u) : null) || a.key;
      as[c] = window.scrollY;
    }
    try {
      sessionStorage.setItem(n || Ew, JSON.stringify(as));
    } catch {
    }
    window.history.scrollRestoration = "auto";
  }, [n, t, s.state, a, u])), typeof document < "u" && (D.useLayoutEffect(() => {
    try {
      let c = sessionStorage.getItem(n || Ew);
      c && (as = JSON.parse(c));
    } catch {
    }
  }, [n]), D.useLayoutEffect(() => {
    let c = t && l !== "/" ? (p, m) => t(vt({}, p, { pathname: be(p.pathname, l) || p.pathname }), m) : t, d = r?.enableScrollRestoration(as, () => window.scrollY, c);
    return () => d && d();
  }, [r, l, t]), D.useLayoutEffect(() => {
    if (o !== false) {
      if (typeof o == "number") {
        window.scrollTo(0, o);
        return;
      }
      if (a.hash) {
        let c = document.getElementById(decodeURIComponent(a.hash.slice(1)));
        if (c) {
          c.scrollIntoView();
          return;
        }
      }
      i !== true && window.scrollTo(0, 0);
    }
  }, [a, o, i]));
}
function Pw(e, t) {
  let { capture: n } = t || {};
  D.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return window.addEventListener("beforeunload", e, r), () => {
      window.removeEventListener("beforeunload", e, r);
    };
  }, [e, n]);
}
function J_(e, t) {
  let { capture: n } = t || {};
  D.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return window.addEventListener("pagehide", e, r), () => {
      window.removeEventListener("pagehide", e, r);
    };
  }, [e, n]);
}
function Dw(e) {
  let { when: t, message: n } = e, r = mi(t);
  D.useEffect(() => {
    r.state === "blocked" && (window.confirm(n) ? setTimeout(r.proceed, 0) : r.reset());
  }, [r, n]), D.useEffect(() => {
    r.state === "blocked" && !t && r.reset();
  }, [r, t]);
}
function Pp(e, t) {
  t === void 0 && (t = {});
  let n = D.useContext(Rp);
  n == null && j(false);
  let { basename: r } = fs(yi.useViewTransitionState), o = En(e, { relative: t.relative });
  if (!n.isTransitioning)
    return false;
  let i = be(n.currentLocation.pathname, r) || n.currentLocation.pathname, l = be(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return zt(o.pathname, l) != null || zt(o.pathname, i) != null;
}
var D;
var g_;
var us;
var gp;
var ls;
var C_;
var P_;
var D_;
var L_;
var T_;
var Rp;
var xp;
var A_;
var Tr;
var I_;
var ww;
var z_;
var Sw;
var Sp;
var $_;
var W_;
var ds;
var kp;
var _p;
var yi;
var Ul;
var Y_;
var _w;
var Ew;
var as;
var Fr = te(() => {
  D = se(st()), g_ = se(fw());
  is();
  is();
  Fn();
  us = "get", gp = "application/x-www-form-urlencoded";
  ls = null;
  C_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
  P_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], D_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], L_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"], T_ = "6";
  try {
    window.__reactRouterVersion = T_;
  } catch {
  }
  Rp = D.createContext({ isTransitioning: false }), xp = D.createContext(/* @__PURE__ */ new Map()), A_ = "startTransition", Tr = D[A_], I_ = "flushSync", ww = g_[I_], z_ = "useId", Sw = D[z_];
  Sp = class {
    constructor() {
      this.status = "pending", this.promise = new Promise((t, n) => {
        this.resolve = (r) => {
          this.status === "pending" && (this.status = "resolved", t(r));
        }, this.reject = (r) => {
          this.status === "pending" && (this.status = "rejected", n(r));
        };
      });
    }
  };
  $_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", W_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ds = D.forwardRef(function(t, n) {
    let { onClick: r, relative: o, reloadDocument: i, replace: l, state: a, target: u, to: s, preventScrollReset: c, unstable_viewTransition: d } = t, p = Ep(t, P_), { basename: m } = D.useContext(Ze), y, w = false;
    if (typeof s == "string" && W_.test(s) && (y = s, $_))
      try {
        let v = new URL(window.location.href), E = s.startsWith("//") ? new URL(v.protocol + s) : new URL(s), k = be(E.pathname, m);
        E.origin === v.origin && k != null ? s = k + E.search + E.hash : w = true;
      } catch {
      }
    let R = $n(s, { relative: o }), f = xw(s, { replace: l, state: a, target: u, preventScrollReset: c, relative: o, unstable_viewTransition: d });
    function h(v) {
      r && r(v), v.defaultPrevented || f(v);
    }
    return D.createElement("a", vt({}, p, { href: y || R, onClick: w || i ? r : h, ref: n, target: u }));
  }), kp = D.forwardRef(function(t, n) {
    let { "aria-current": r = "page", caseSensitive: o = false, className: i = "", end: l = false, style: a, to: u, unstable_viewTransition: s, children: c } = t, d = Ep(t, D_), p = En(u, { relative: d.relative }), m = De(), y = D.useContext(on), { navigator: w, basename: R } = D.useContext(Ze), f = y != null && Pp(p) && s === true, h = w.encodeLocation ? w.encodeLocation(p).pathname : p.pathname, v = m.pathname, E = y && y.navigation && y.navigation.location ? y.navigation.location.pathname : null;
    o || (v = v.toLowerCase(), E = E ? E.toLowerCase() : null, h = h.toLowerCase()), E && R && (E = be(E, R) || E);
    let k = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length, g = v === h || !l && v.startsWith(h) && v.charAt(k) === "/", _ = E != null && (E === h || !l && E.startsWith(h) && E.charAt(h.length) === "/"), P = { isActive: g, isPending: _, isTransitioning: f }, O = g ? r : void 0, z;
    typeof i == "function" ? z = i(P) : z = [i, g ? "active" : null, _ ? "pending" : null, f ? "transitioning" : null].filter(Boolean).join(" ");
    let X = typeof a == "function" ? a(P) : a;
    return D.createElement(ds, vt({}, d, { "aria-current": O, className: z, ref: n, style: X, to: u, unstable_viewTransition: s }), typeof c == "function" ? c(P) : c);
  }), _p = D.forwardRef((e, t) => {
    let { fetcherKey: n, navigate: r, reloadDocument: o, replace: i, state: l, method: a = us, action: u, onSubmit: s, relative: c, preventScrollReset: d, unstable_viewTransition: p } = e, m = Ep(e, L_), y = ps(), w = Np(u, { relative: c }), R = a.toLowerCase() === "get" ? "get" : "post";
    return D.createElement("form", vt({ ref: t, method: R, action: w, onSubmit: o ? s : (h) => {
      if (s && s(h), h.defaultPrevented)
        return;
      h.preventDefault();
      let v = h.nativeEvent.submitter, E = v?.getAttribute("formmethod") || a;
      y(v || h.currentTarget, { fetcherKey: n, method: E, navigate: r, replace: i, state: l, relative: c, preventScrollReset: d, unstable_viewTransition: p });
    } }, m));
  });
  (function(e) {
    e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
  })(yi || (yi = {}));
  (function(e) {
    e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
  })(Ul || (Ul = {}));
  Y_ = 0, _w = () => "__" + String(++Y_) + "__";
  Ew = "react-router-scroll-positions", as = {};
});
var eS = Ae((gi) => {
  "use strict";
  Object.defineProperty(gi, "__esModule", { value: true });
  var uC = st(), Wn = (Fn(), Ni(Am)), Hp = (is(), Ni(gw)), Kn = (Fr(), Ni(Lw));
  function sC(e) {
    if (e && e.__esModule)
      return e;
    var t = /* @__PURE__ */ Object.create(null);
    return e && Object.keys(e).forEach(function(n) {
      if (n !== "default") {
        var r = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(t, n, r.get ? r : { enumerable: true, get: function() {
          return e[n];
        } });
      }
    }), t.default = e, Object.freeze(t);
  }
  var xn = sC(uC);
  function cC({ basename: e, children: t, location: n = "/", future: r }) {
    typeof n == "string" && (n = Kn.parsePath(n));
    let o = Wn.Action.Pop, i = { pathname: n.pathname || "/", search: n.search || "", hash: n.hash || "", state: n.state || null, key: n.key || "default" }, l = Gw();
    return xn.createElement(Kn.Router, { basename: e, children: t, location: i, navigationType: o, navigator: l, future: r, static: true });
  }
  function dC({ context: e, router: t, hydrate: n = true, nonce: r }) {
    t && e || Wn.UNSAFE_invariant(false);
    let o = { router: t, navigator: Gw(), static: true, staticContext: e, basename: e.basename || "/" }, i = /* @__PURE__ */ new Map(), l = "";
    if (n !== false) {
      let u = { loaderData: e.loaderData, actionData: e.actionData, errors: pC(e.errors) };
      l = `window.__staticRouterHydrationData = JSON.parse(${wC(JSON.stringify(JSON.stringify(u)))});`;
    }
    let { state: a } = o.router;
    return xn.createElement(xn.Fragment, null, xn.createElement(Kn.UNSAFE_DataRouterContext.Provider, { value: o }, xn.createElement(Kn.UNSAFE_DataRouterStateContext.Provider, { value: a }, xn.createElement(Kn.UNSAFE_FetchersContext.Provider, { value: i }, xn.createElement(Kn.UNSAFE_ViewTransitionContext.Provider, { value: { isTransitioning: false } }, xn.createElement(Kn.Router, { basename: o.basename, location: a.location, navigationType: a.historyAction, navigator: o.navigator, static: o.static, future: { v7_relativeSplatPath: t.future.v7_relativeSplatPath } }, xn.createElement(fC, { routes: t.routes, future: t.future, state: a })))))), l ? xn.createElement("script", { suppressHydrationWarning: true, nonce: r, dangerouslySetInnerHTML: { __html: l } }) : null);
  }
  function fC({ routes: e, future: t, state: n }) {
    return Hp.UNSAFE_useRoutesImpl(e, void 0, n, t);
  }
  function pC(e) {
    if (!e)
      return null;
    let t = Object.entries(e), n = {};
    for (let [r, o] of t)
      Wn.isRouteErrorResponse(o) ? n[r] = { ...o, __type: "RouteErrorResponse" } : o instanceof Error ? n[r] = { message: o.message, __type: "Error", ...o.name !== "Error" ? { __subType: o.name } : {} } : n[r] = o;
    return n;
  }
  function Gw() {
    return { createHref: qw, encodeLocation: Zw, push(e) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)})\` somewhere in your app.`);
    }, replace(e) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(e)}, { replace: true })\` somewhere in your app.`);
    }, go(e) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${e})\` somewhere in your app.`);
    }, back() {
      throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
    }, forward() {
      throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
    } };
  }
  function hC(e, t) {
    return Wn.createStaticHandler(e, { ...t, mapRouteProperties: Hp.UNSAFE_mapRouteProperties });
  }
  function mC(e, t, n = {}) {
    let r = {}, o = Wn.UNSAFE_convertRoutesToDataRoutes(e, Hp.UNSAFE_mapRouteProperties, void 0, r), i = t.matches.map((a) => {
      let u = r[a.route.id] || a.route;
      return { ...a, route: u };
    }), l = (a) => `You cannot use router.${a}() on the server because it is a stateless environment`;
    return { get basename() {
      return t.basename;
    }, get future() {
      return { v7_fetcherPersist: false, v7_normalizeFormMethod: false, v7_partialHydration: n.future?.v7_partialHydration === true, v7_prependBasename: false, v7_relativeSplatPath: n.future?.v7_relativeSplatPath === true };
    }, get state() {
      return { historyAction: Wn.Action.Pop, location: t.location, matches: i, loaderData: t.loaderData, actionData: t.actionData, errors: t.errors, initialized: true, navigation: Wn.IDLE_NAVIGATION, restoreScrollPosition: null, preventScrollReset: false, revalidation: "idle", fetchers: /* @__PURE__ */ new Map(), blockers: /* @__PURE__ */ new Map() };
    }, get routes() {
      return o;
    }, get window() {
    }, initialize() {
      throw l("initialize");
    }, subscribe() {
      throw l("subscribe");
    }, enableScrollRestoration() {
      throw l("enableScrollRestoration");
    }, navigate() {
      throw l("navigate");
    }, fetch() {
      throw l("fetch");
    }, revalidate() {
      throw l("revalidate");
    }, createHref: qw, encodeLocation: Zw, getFetcher() {
      return Wn.IDLE_FETCHER;
    }, deleteFetcher() {
      throw l("deleteFetcher");
    }, dispose() {
      throw l("dispose");
    }, getBlocker() {
      return Wn.IDLE_BLOCKER;
    }, deleteBlocker() {
      throw l("deleteBlocker");
    }, _internalFetchControllers: /* @__PURE__ */ new Map(), _internalActiveDeferreds: /* @__PURE__ */ new Map(), _internalSetRoutes() {
      throw l("_internalSetRoutes");
    } };
  }
  function qw(e) {
    return typeof e == "string" ? e : Kn.createPath(e);
  }
  function Zw(e) {
    let t = typeof e == "string" ? e : Kn.createPath(e), n = vC.test(t) ? new URL(t) : new URL(t, "http://localhost");
    return { pathname: n.pathname, search: n.search, hash: n.hash };
  }
  var vC = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, yC = { "&": "\\u0026", ">": "\\u003e", "<": "\\u003c", "\u2028": "\\u2028", "\u2029": "\\u2029" }, gC = /[&><\u2028\u2029]/g;
  function wC(e) {
    return e.replace(gC, (t) => yC[t]);
  }
  gi.StaticRouter = cC;
  gi.StaticRouterProvider = dC;
  gi.createStaticHandler = hC;
  gi.createStaticRouter = mC;
});
var KS = Ae((wi) => {
  "use strict";
  var RS = st();
  function V(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var yt = Object.prototype.hasOwnProperty, RC = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, nS = {}, rS = {};
  function xS(e) {
    return yt.call(rS, e) ? true : yt.call(nS, e) ? false : RC.test(e) ? rS[e] = true : (nS[e] = true, false);
  }
  function lt(e, t, n, r, o, i, l) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var We = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    We[e] = new lt(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    We[t] = new lt(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    We[e] = new lt(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    We[e] = new lt(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    We[e] = new lt(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    We[e] = new lt(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    We[e] = new lt(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    We[e] = new lt(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    We[e] = new lt(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var Gp = /[\-:]([a-z])/g;
  function qp(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Gp, qp);
    We[t] = new lt(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Gp, qp);
    We[t] = new lt(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Gp, qp);
    We[t] = new lt(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    We[e] = new lt(e, 1, false, e.toLowerCase(), null, false, false);
  });
  We.xlinkHref = new lt("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    We[e] = new lt(e, 1, false, e.toLowerCase(), null, true, true);
  });
  var _s = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, xC = ["Webkit", "ms", "Moz", "O"];
  Object.keys(_s).forEach(function(e) {
    xC.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), _s[t] = _s[e];
    });
  });
  var kC = /["'&<>]/;
  function it(e) {
    if (typeof e == "boolean" || typeof e == "number")
      return "" + e;
    e = "" + e;
    var t = kC.exec(e);
    if (t) {
      var n = "", r, o = 0;
      for (r = t.index; r < e.length; r++) {
        switch (e.charCodeAt(r)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== r && (n += e.substring(o, r)), o = r + 1, n += t;
      }
      e = o !== r ? n + e.substring(o, r) : n;
    }
    return e;
  }
  var _C = /([A-Z])/g, CC = /^ms-/, Kp = Array.isArray;
  function Qn(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function NC(e, t, n) {
    switch (t) {
      case "select":
        return Qn(1, n.value != null ? n.value : n.defaultValue);
      case "svg":
        return Qn(2, null);
      case "math":
        return Qn(3, null);
      case "foreignObject":
        return Qn(1, null);
      case "table":
        return Qn(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return Qn(5, null);
      case "colgroup":
        return Qn(7, null);
      case "tr":
        return Qn(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? Qn(1, null) : e;
  }
  var oS = /* @__PURE__ */ new Map();
  function kS(e, t, n) {
    if (typeof n != "object")
      throw Error(V(62));
    t = true;
    for (var r in n)
      if (yt.call(n, r)) {
        var o = n[r];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (r.indexOf("--") === 0) {
            var i = it(r);
            o = it(("" + o).trim());
          } else {
            i = r;
            var l = oS.get(i);
            l !== void 0 || (l = it(i.replace(_C, "-$1").toLowerCase().replace(CC, "-ms-")), oS.set(i, l)), i = l, o = typeof o == "number" ? o === 0 || yt.call(_s, r) ? "" + o : o + "px" : it(("" + o).trim());
          }
          t ? (t = false, e.push(' style="', i, ":", o)) : e.push(";", i, ":", o);
        }
      }
    t || e.push('"');
  }
  function Pt(e, t, n, r) {
    switch (n) {
      case "style":
        kS(e, t, r);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") {
      if (t = We.hasOwnProperty(n) ? We[n] : null, t !== null) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans)
              return;
        }
        switch (n = t.attributeName, t.type) {
          case 3:
            r && e.push(" ", n, '=""');
            break;
          case 4:
            r === true ? e.push(" ", n, '=""') : r !== false && e.push(" ", n, '="', it(r), '"');
            break;
          case 5:
            isNaN(r) || e.push(" ", n, '="', it(r), '"');
            break;
          case 6:
            !isNaN(r) && 1 <= r && e.push(" ", n, '="', it(r), '"');
            break;
          default:
            t.sanitizeURL && (r = "" + r), e.push(" ", n, '="', it(r), '"');
        }
      } else if (xS(n)) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (t = n.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-")
              return;
        }
        e.push(" ", n, '="', it(r), '"');
      }
    }
  }
  function Cs(e, t, n) {
    if (t != null) {
      if (n != null)
        throw Error(V(60));
      if (typeof t != "object" || !("__html" in t))
        throw Error(V(61));
      t = t.__html, t != null && e.push("" + t);
    }
  }
  function PC(e) {
    var t = "";
    return RS.Children.forEach(e, function(n) {
      n != null && (t += n);
    }), t;
  }
  function Vp(e, t, n, r) {
    e.push(kn(n));
    var o = n = null, i;
    for (i in t)
      if (yt.call(t, i)) {
        var l = t[i];
        if (l != null)
          switch (i) {
            case "children":
              n = l;
              break;
            case "dangerouslySetInnerHTML":
              o = l;
              break;
            default:
              Pt(e, r, i, l);
          }
      }
    return e.push(">"), Cs(e, o, n), typeof n == "string" ? (e.push(it(n)), null) : n;
  }
  var DC = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, iS = /* @__PURE__ */ new Map();
  function kn(e) {
    var t = iS.get(e);
    if (t === void 0) {
      if (!DC.test(e))
        throw Error(V(65, e));
      t = "<" + e, iS.set(e, t);
    }
    return t;
  }
  function LC(e, t, n, r, o) {
    switch (t) {
      case "select":
        e.push(kn("select"));
        var i = null, l = null;
        for (c in n)
          if (yt.call(n, c)) {
            var a = n[c];
            if (a != null)
              switch (c) {
                case "children":
                  i = a;
                  break;
                case "dangerouslySetInnerHTML":
                  l = a;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  Pt(e, r, c, a);
              }
          }
        return e.push(">"), Cs(e, l, i), i;
      case "option":
        l = o.selectedValue, e.push(kn("option"));
        var u = a = null, s = null, c = null;
        for (i in n)
          if (yt.call(n, i)) {
            var d = n[i];
            if (d != null)
              switch (i) {
                case "children":
                  a = d;
                  break;
                case "selected":
                  s = d;
                  break;
                case "dangerouslySetInnerHTML":
                  c = d;
                  break;
                case "value":
                  u = d;
                default:
                  Pt(e, r, i, d);
              }
          }
        if (l != null)
          if (n = u !== null ? "" + u : PC(a), Kp(l)) {
            for (r = 0; r < l.length; r++)
              if ("" + l[r] === n) {
                e.push(' selected=""');
                break;
              }
          } else
            "" + l === n && e.push(' selected=""');
        else
          s && e.push(' selected=""');
        return e.push(">"), Cs(e, c, a), a;
      case "textarea":
        e.push(kn("textarea")), c = l = i = null;
        for (a in n)
          if (yt.call(n, a) && (u = n[a], u != null))
            switch (a) {
              case "children":
                c = u;
                break;
              case "value":
                i = u;
                break;
              case "defaultValue":
                l = u;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(V(91));
              default:
                Pt(e, r, a, u);
            }
        if (i === null && l !== null && (i = l), e.push(">"), c != null) {
          if (i != null)
            throw Error(V(92));
          if (Kp(c) && 1 < c.length)
            throw Error(V(93));
          i = "" + c;
        }
        return typeof i == "string" && i[0] === `
` && e.push(`
`), i !== null && e.push(it("" + i)), null;
      case "input":
        e.push(kn("input")), u = c = a = i = null;
        for (l in n)
          if (yt.call(n, l) && (s = n[l], s != null))
            switch (l) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(V(399, "input"));
              case "defaultChecked":
                u = s;
                break;
              case "defaultValue":
                a = s;
                break;
              case "checked":
                c = s;
                break;
              case "value":
                i = s;
                break;
              default:
                Pt(e, r, l, s);
            }
        return c !== null ? Pt(e, r, "checked", c) : u !== null && Pt(e, r, "checked", u), i !== null ? Pt(e, r, "value", i) : a !== null && Pt(e, r, "value", a), e.push("/>"), null;
      case "menuitem":
        e.push(kn("menuitem"));
        for (var p in n)
          if (yt.call(n, p) && (i = n[p], i != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(V(400));
              default:
                Pt(e, r, p, i);
            }
        return e.push(">"), null;
      case "title":
        e.push(kn("title")), i = null;
        for (d in n)
          if (yt.call(n, d) && (l = n[d], l != null))
            switch (d) {
              case "children":
                i = l;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(V(434));
              default:
                Pt(e, r, d, l);
            }
        return e.push(">"), i;
      case "listing":
      case "pre":
        e.push(kn(t)), l = i = null;
        for (u in n)
          if (yt.call(n, u) && (a = n[u], a != null))
            switch (u) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                l = a;
                break;
              default:
                Pt(e, r, u, a);
            }
        if (e.push(">"), l != null) {
          if (i != null)
            throw Error(V(60));
          if (typeof l != "object" || !("__html" in l))
            throw Error(V(61));
          n = l.__html, n != null && (typeof n == "string" && 0 < n.length && n[0] === `
` ? e.push(`
`, n) : e.push("" + n));
        }
        return typeof i == "string" && i[0] === `
` && e.push(`
`), i;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(kn(t));
        for (var m in n)
          if (yt.call(n, m) && (i = n[m], i != null))
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(V(399, t));
              default:
                Pt(e, r, m, i);
            }
        return e.push("/>"), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Vp(e, n, t, r);
      case "html":
        return o.insertionMode === 0 && e.push("<!DOCTYPE html>"), Vp(e, n, t, r);
      default:
        if (t.indexOf("-") === -1 && typeof n.is != "string")
          return Vp(e, n, t, r);
        e.push(kn(t)), l = i = null;
        for (s in n)
          if (yt.call(n, s) && (a = n[s], a != null))
            switch (s) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                l = a;
                break;
              case "style":
                kS(e, r, a);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                xS(s) && typeof a != "function" && typeof a != "symbol" && e.push(" ", s, '="', it(a), '"');
            }
        return e.push(">"), Cs(e, l, i), i;
    }
  }
  function lS(e, t, n) {
    if (e.push('<!--$?--><template id="'), n === null)
      throw Error(V(395));
    return e.push(n), e.push('"></template>');
  }
  function TC(e, t, n, r) {
    switch (n.insertionMode) {
      case 0:
      case 1:
        return e.push('<div hidden id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 2:
        return e.push('<svg aria-hidden="true" style="display:none" id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 3:
        return e.push('<math aria-hidden="true" style="display:none" id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 4:
        return e.push('<table hidden id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 5:
        return e.push('<table hidden><tbody id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 6:
        return e.push('<table hidden><tr id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      case 7:
        return e.push('<table hidden><colgroup id="'), e.push(t.segmentPrefix), t = r.toString(16), e.push(t), e.push('">');
      default:
        throw Error(V(397));
    }
  }
  function FC(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return e.push("</div>");
      case 2:
        return e.push("</svg>");
      case 3:
        return e.push("</math>");
      case 4:
        return e.push("</table>");
      case 5:
        return e.push("</tbody></table>");
      case 6:
        return e.push("</tr></table>");
      case 7:
        return e.push("</colgroup></table>");
      default:
        throw Error(V(397));
    }
  }
  var OC = /[<\u2028\u2029]/g;
  function $p(e) {
    return JSON.stringify(e).replace(OC, function(t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  function MC(e, t) {
    return t = t === void 0 ? "" : t, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: t + "P:", segmentPrefix: t + "S:", boundaryPrefix: t + "B:", idPrefix: t, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: e };
  }
  function aS(e, t, n, r) {
    return n.generateStaticMarkup ? (e.push(it(t)), false) : (t === "" ? e = r : (r && e.push("<!-- -->"), e.push(it(t)), e = true), e);
  }
  var Wl = Object.assign, AC = Symbol.for("react.element"), _S = Symbol.for("react.portal"), CS = Symbol.for("react.fragment"), NS = Symbol.for("react.strict_mode"), PS = Symbol.for("react.profiler"), DS = Symbol.for("react.provider"), LS = Symbol.for("react.context"), TS = Symbol.for("react.forward_ref"), FS = Symbol.for("react.suspense"), OS = Symbol.for("react.suspense_list"), MS = Symbol.for("react.memo"), Zp = Symbol.for("react.lazy"), IC = Symbol.for("react.scope"), zC = Symbol.for("react.debug_trace_mode"), UC = Symbol.for("react.legacy_hidden"), jC = Symbol.for("react.default_value"), uS = Symbol.iterator;
  function Qp(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case CS:
        return "Fragment";
      case _S:
        return "Portal";
      case PS:
        return "Profiler";
      case NS:
        return "StrictMode";
      case FS:
        return "Suspense";
      case OS:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case LS:
          return (e.displayName || "Context") + ".Consumer";
        case DS:
          return (e._context.displayName || "Context") + ".Provider";
        case TS:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case MS:
          return t = e.displayName || null, t !== null ? t : Qp(e.type) || "Memo";
        case Zp:
          t = e._payload, e = e._init;
          try {
            return Qp(e(t));
          } catch {
          }
      }
    return null;
  }
  var AS = {};
  function sS(e, t) {
    if (e = e.contextTypes, !e)
      return AS;
    var n = {}, r;
    for (r in e)
      n[r] = t[r];
    return n;
  }
  var mo = null;
  function As(e, t) {
    if (e !== t) {
      e.context._currentValue2 = e.parentValue, e = e.parent;
      var n = t.parent;
      if (e === null) {
        if (n !== null)
          throw Error(V(401));
      } else {
        if (n === null)
          throw Error(V(401));
        As(e, n);
      }
      t.context._currentValue2 = t.value;
    }
  }
  function IS(e) {
    e.context._currentValue2 = e.parentValue, e = e.parent, e !== null && IS(e);
  }
  function zS(e) {
    var t = e.parent;
    t !== null && zS(t), e.context._currentValue2 = e.value;
  }
  function US(e, t) {
    if (e.context._currentValue2 = e.parentValue, e = e.parent, e === null)
      throw Error(V(402));
    e.depth === t.depth ? As(e, t) : US(e, t);
  }
  function jS(e, t) {
    var n = t.parent;
    if (n === null)
      throw Error(V(402));
    e.depth === n.depth ? As(e, n) : jS(e, n), t.context._currentValue2 = t.value;
  }
  function Ls(e) {
    var t = mo;
    t !== e && (t === null ? zS(e) : e === null ? IS(t) : t.depth === e.depth ? As(t, e) : t.depth > e.depth ? US(t, e) : jS(t, e), mo = e);
  }
  var cS = { isMounted: function() {
    return false;
  }, enqueueSetState: function(e, t) {
    e = e._reactInternals, e.queue !== null && e.queue.push(t);
  }, enqueueReplaceState: function(e, t) {
    e = e._reactInternals, e.replace = true, e.queue = [t];
  }, enqueueForceUpdate: function() {
  } };
  function dS(e, t, n, r) {
    var o = e.state !== void 0 ? e.state : null;
    e.updater = cS, e.props = n, e.state = o;
    var i = { queue: [], replace: false };
    e._reactInternals = i;
    var l = t.contextType;
    if (e.context = typeof l == "object" && l !== null ? l._currentValue2 : r, l = t.getDerivedStateFromProps, typeof l == "function" && (l = l(n, o), o = l == null ? o : Wl({}, o, l), e.state = o), typeof t.getDerivedStateFromProps != "function" && typeof e.getSnapshotBeforeUpdate != "function" && (typeof e.UNSAFE_componentWillMount == "function" || typeof e.componentWillMount == "function"))
      if (t = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), t !== e.state && cS.enqueueReplaceState(e, e.state, null), i.queue !== null && 0 < i.queue.length)
        if (t = i.queue, l = i.replace, i.queue = null, i.replace = false, l && t.length === 1)
          e.state = t[0];
        else {
          for (i = l ? t[0] : e.state, o = true, l = l ? 1 : 0; l < t.length; l++) {
            var a = t[l];
            a = typeof a == "function" ? a.call(e, i, n, r) : a, a != null && (o ? (o = false, i = Wl({}, i, a)) : Wl(i, a));
          }
          e.state = i;
        }
      else
        i.queue = null;
  }
  var bC = { id: 1, overflow: "" };
  function Yp(e, t, n) {
    var r = e.id;
    e = e.overflow;
    var o = 32 - Ns(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - Ns(t) + o;
    if (30 < i) {
      var l = o - o % 5;
      return i = (r & (1 << l) - 1).toString(32), r >>= l, o -= l, { id: 1 << 32 - Ns(t) + o | n << o | r, overflow: i + e };
    }
    return { id: 1 << i | n << o | r, overflow: e };
  }
  var Ns = Math.clz32 ? Math.clz32 : VC, HC = Math.log, BC = Math.LN2;
  function VC(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (HC(e) / BC | 0) | 0;
  }
  function $C(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var WC = typeof Object.is == "function" ? Object.is : $C, Yn = null, eh = null, Ps = null, ae = null, Vl = false, Ts = false, Kl = 0, Ar = null, Is = 0;
  function ho() {
    if (Yn === null)
      throw Error(V(321));
    return Yn;
  }
  function fS() {
    if (0 < Is)
      throw Error(V(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function th() {
    return ae === null ? Ps === null ? (Vl = false, Ps = ae = fS()) : (Vl = true, ae = Ps) : ae.next === null ? (Vl = false, ae = ae.next = fS()) : (Vl = true, ae = ae.next), ae;
  }
  function nh() {
    eh = Yn = null, Ts = false, Ps = null, Is = 0, ae = Ar = null;
  }
  function bS(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function pS(e, t, n) {
    if (Yn = ho(), ae = th(), Vl) {
      var r = ae.queue;
      if (t = r.dispatch, Ar !== null && (n = Ar.get(r), n !== void 0)) {
        Ar.delete(r), r = ae.memoizedState;
        do
          r = e(r, n.action), n = n.next;
        while (n !== null);
        return ae.memoizedState = r, [r, t];
      }
      return [ae.memoizedState, t];
    }
    return e = e === bS ? typeof t == "function" ? t() : t : n !== void 0 ? n(t) : t, ae.memoizedState = e, e = ae.queue = { last: null, dispatch: null }, e = e.dispatch = KC.bind(null, Yn, e), [ae.memoizedState, e];
  }
  function hS(e, t) {
    if (Yn = ho(), ae = th(), t = t === void 0 ? null : t, ae !== null) {
      var n = ae.memoizedState;
      if (n !== null && t !== null) {
        var r = n[1];
        e:
          if (r === null)
            r = false;
          else {
            for (var o = 0; o < r.length && o < t.length; o++)
              if (!WC(t[o], r[o])) {
                r = false;
                break e;
              }
            r = true;
          }
        if (r)
          return n[0];
      }
    }
    return e = e(), ae.memoizedState = [e, t], e;
  }
  function KC(e, t, n) {
    if (25 <= Is)
      throw Error(V(301));
    if (e === Yn)
      if (Ts = true, e = { action: n, next: null }, Ar === null && (Ar = /* @__PURE__ */ new Map()), n = Ar.get(t), n === void 0)
        Ar.set(t, e);
      else {
        for (t = n; t.next !== null; )
          t = t.next;
        t.next = e;
      }
  }
  function QC() {
    throw Error(V(394));
  }
  function xs() {
  }
  var mS = { readContext: function(e) {
    return e._currentValue2;
  }, useContext: function(e) {
    return ho(), e._currentValue2;
  }, useMemo: hS, useReducer: pS, useRef: function(e) {
    Yn = ho(), ae = th();
    var t = ae.memoizedState;
    return t === null ? (e = { current: e }, ae.memoizedState = e) : t;
  }, useState: function(e) {
    return pS(bS, e);
  }, useInsertionEffect: xs, useLayoutEffect: function() {
  }, useCallback: function(e, t) {
    return hS(function() {
      return e;
    }, t);
  }, useImperativeHandle: xs, useEffect: xs, useDebugValue: xs, useDeferredValue: function(e) {
    return ho(), e;
  }, useTransition: function() {
    return ho(), [false, QC];
  }, useId: function() {
    var e = eh.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - Ns(e) - 1)).toString(32) + t;
    var n = Ds;
    if (n === null)
      throw Error(V(404));
    return t = Kl++, e = ":" + n.idPrefix + "R" + e, 0 < t && (e += "H" + t.toString(32)), e + ":";
  }, useMutableSource: function(e, t) {
    return ho(), t(e._source);
  }, useSyncExternalStore: function(e, t, n) {
    if (n === void 0)
      throw Error(V(407));
    return n();
  } }, Ds = null, Wp = RS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function YC(e) {
    return console.error(e), null;
  }
  function $l() {
  }
  function JC(e, t, n, r, o, i, l, a, u) {
    var s = [], c = /* @__PURE__ */ new Set();
    return t = { destination: null, responseState: t, progressiveChunkSize: r === void 0 ? 12800 : r, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: s, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: o === void 0 ? YC : o, onAllReady: i === void 0 ? $l : i, onShellReady: l === void 0 ? $l : l, onShellError: a === void 0 ? $l : a, onFatalError: u === void 0 ? $l : u }, n = Fs(t, 0, null, n, false, false), n.parentFlushed = true, e = rh(t, e, null, n, c, AS, null, bC), s.push(e), t;
  }
  function rh(e, t, n, r, o, i, l, a) {
    e.allPendingTasks++, n === null ? e.pendingRootTasks++ : n.pendingTasks++;
    var u = { node: t, ping: function() {
      var s = e.pingedTasks;
      s.push(u), s.length === 1 && VS(e);
    }, blockedBoundary: n, blockedSegment: r, abortSet: o, legacyContext: i, context: l, treeContext: a };
    return o.add(u), u;
  }
  function Fs(e, t, n, r, o, i) {
    return { status: 0, id: -1, index: t, parentFlushed: false, chunks: [], children: [], formatContext: r, boundary: n, lastPushedText: o, textEmbedded: i };
  }
  function Ql(e, t) {
    if (e = e.onError(t), e != null && typeof e != "string")
      throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof e + '" instead');
    return e;
  }
  function Os(e, t) {
    var n = e.onShellError;
    n(t), n = e.onFatalError, n(t), e.destination !== null ? (e.status = 2, e.destination.destroy(t)) : (e.status = 1, e.fatalError = t);
  }
  function vS(e, t, n, r, o) {
    for (Yn = {}, eh = t, Kl = 0, e = n(r, o); Ts; )
      Ts = false, Kl = 0, Is += 1, ae = null, e = n(r, o);
    return nh(), e;
  }
  function yS(e, t, n, r) {
    var o = n.render(), i = r.childContextTypes;
    if (i != null) {
      var l = t.legacyContext;
      if (typeof n.getChildContext != "function")
        r = l;
      else {
        n = n.getChildContext();
        for (var a in n)
          if (!(a in i))
            throw Error(V(108, Qp(r) || "Unknown", a));
        r = Wl({}, l, n);
      }
      t.legacyContext = r, Dt(e, t, o), t.legacyContext = l;
    } else
      Dt(e, t, o);
  }
  function gS(e, t) {
    if (e && e.defaultProps) {
      t = Wl({}, t), e = e.defaultProps;
      for (var n in e)
        t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Jp(e, t, n, r, o) {
    if (typeof n == "function")
      if (n.prototype && n.prototype.isReactComponent) {
        o = sS(n, t.legacyContext);
        var i = n.contextType;
        i = new n(r, typeof i == "object" && i !== null ? i._currentValue2 : o), dS(i, n, r, o), yS(e, t, i, n);
      } else {
        i = sS(n, t.legacyContext), o = vS(e, t, n, r, i);
        var l = Kl !== 0;
        if (typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0)
          dS(o, n, r, i), yS(e, t, o, n);
        else if (l) {
          r = t.treeContext, t.treeContext = Yp(r, 1, 0);
          try {
            Dt(e, t, o);
          } finally {
            t.treeContext = r;
          }
        } else
          Dt(e, t, o);
      }
    else if (typeof n == "string") {
      switch (o = t.blockedSegment, i = LC(o.chunks, n, r, e.responseState, o.formatContext), o.lastPushedText = false, l = o.formatContext, o.formatContext = NC(l, n, r), Xp(e, t, i), o.formatContext = l, n) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push("</", n, ">");
      }
      o.lastPushedText = false;
    } else {
      switch (n) {
        case UC:
        case zC:
        case NS:
        case PS:
        case CS:
          Dt(e, t, r.children);
          return;
        case OS:
          Dt(e, t, r.children);
          return;
        case IC:
          throw Error(V(343));
        case FS:
          e: {
            n = t.blockedBoundary, o = t.blockedSegment, i = r.fallback, r = r.children, l = /* @__PURE__ */ new Set();
            var a = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: l, errorDigest: null }, u = Fs(e, o.chunks.length, a, o.formatContext, false, false);
            o.children.push(u), o.lastPushedText = false;
            var s = Fs(e, 0, null, o.formatContext, false, false);
            s.parentFlushed = true, t.blockedBoundary = a, t.blockedSegment = s;
            try {
              if (Xp(e, t, r), e.responseState.generateStaticMarkup || s.lastPushedText && s.textEmbedded && s.chunks.push("<!-- -->"), s.status = 1, Ms(a, s), a.pendingTasks === 0)
                break e;
            } catch (c) {
              s.status = 4, a.forceClientRender = true, a.errorDigest = Ql(e, c);
            } finally {
              t.blockedBoundary = n, t.blockedSegment = o;
            }
            t = rh(e, i, n, u, l, t.legacyContext, t.context, t.treeContext), e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof n == "object" && n !== null)
        switch (n.$$typeof) {
          case TS:
            if (r = vS(e, t, n.render, r, o), Kl !== 0) {
              n = t.treeContext, t.treeContext = Yp(n, 1, 0);
              try {
                Dt(e, t, r);
              } finally {
                t.treeContext = n;
              }
            } else
              Dt(e, t, r);
            return;
          case MS:
            n = n.type, r = gS(n, r), Jp(e, t, n, r, o);
            return;
          case DS:
            if (o = r.children, n = n._context, r = r.value, i = n._currentValue2, n._currentValue2 = r, l = mo, mo = r = { parent: l, depth: l === null ? 0 : l.depth + 1, context: n, parentValue: i, value: r }, t.context = r, Dt(e, t, o), e = mo, e === null)
              throw Error(V(403));
            r = e.parentValue, e.context._currentValue2 = r === jC ? e.context._defaultValue : r, e = mo = e.parent, t.context = e;
            return;
          case LS:
            r = r.children, r = r(n._currentValue2), Dt(e, t, r);
            return;
          case Zp:
            o = n._init, n = o(n._payload), r = gS(n, r), Jp(e, t, n, r, void 0);
            return;
        }
      throw Error(V(130, n == null ? n : typeof n, ""));
    }
  }
  function Dt(e, t, n) {
    if (t.node = n, typeof n == "object" && n !== null) {
      switch (n.$$typeof) {
        case AC:
          Jp(e, t, n.type, n.props, n.ref);
          return;
        case _S:
          throw Error(V(257));
        case Zp:
          var r = n._init;
          n = r(n._payload), Dt(e, t, n);
          return;
      }
      if (Kp(n)) {
        wS(e, t, n);
        return;
      }
      if (n === null || typeof n != "object" ? r = null : (r = uS && n[uS] || n["@@iterator"], r = typeof r == "function" ? r : null), r && (r = r.call(n))) {
        if (n = r.next(), !n.done) {
          var o = [];
          do
            o.push(n.value), n = r.next();
          while (!n.done);
          wS(e, t, o);
        }
        return;
      }
      throw e = Object.prototype.toString.call(n), Error(V(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
    }
    typeof n == "string" ? (r = t.blockedSegment, r.lastPushedText = aS(t.blockedSegment.chunks, n, e.responseState, r.lastPushedText)) : typeof n == "number" && (r = t.blockedSegment, r.lastPushedText = aS(t.blockedSegment.chunks, "" + n, e.responseState, r.lastPushedText));
  }
  function wS(e, t, n) {
    for (var r = n.length, o = 0; o < r; o++) {
      var i = t.treeContext;
      t.treeContext = Yp(i, r, o);
      try {
        Xp(e, t, n[o]);
      } finally {
        t.treeContext = i;
      }
    }
  }
  function Xp(e, t, n) {
    var r = t.blockedSegment.formatContext, o = t.legacyContext, i = t.context;
    try {
      return Dt(e, t, n);
    } catch (u) {
      if (nh(), typeof u == "object" && u !== null && typeof u.then == "function") {
        n = u;
        var l = t.blockedSegment, a = Fs(e, l.chunks.length, null, l.formatContext, l.lastPushedText, true);
        l.children.push(a), l.lastPushedText = false, e = rh(e, t.node, t.blockedBoundary, a, t.abortSet, t.legacyContext, t.context, t.treeContext).ping, n.then(e, e), t.blockedSegment.formatContext = r, t.legacyContext = o, t.context = i, Ls(i);
      } else
        throw t.blockedSegment.formatContext = r, t.legacyContext = o, t.context = i, Ls(i), u;
    }
  }
  function XC(e) {
    var t = e.blockedBoundary;
    e = e.blockedSegment, e.status = 3, BS(this, t, e);
  }
  function HS(e, t, n) {
    var r = e.blockedBoundary;
    e.blockedSegment.status = 3, r === null ? (t.allPendingTasks--, t.status !== 2 && (t.status = 2, t.destination !== null && t.destination.push(null))) : (r.pendingTasks--, r.forceClientRender || (r.forceClientRender = true, e = n === void 0 ? Error(V(432)) : n, r.errorDigest = t.onError(e), r.parentFlushed && t.clientRenderedBoundaries.push(r)), r.fallbackAbortableTasks.forEach(function(o) {
      return HS(o, t, n);
    }), r.fallbackAbortableTasks.clear(), t.allPendingTasks--, t.allPendingTasks === 0 && (r = t.onAllReady, r()));
  }
  function Ms(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null) {
      var n = t.children[0];
      n.id = t.id, n.parentFlushed = true, n.status === 1 && Ms(e, n);
    } else
      e.completedSegments.push(t);
  }
  function BS(e, t, n) {
    if (t === null) {
      if (n.parentFlushed) {
        if (e.completedRootSegment !== null)
          throw Error(V(389));
        e.completedRootSegment = n;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && (e.onShellError = $l, t = e.onShellReady, t());
    } else
      t.pendingTasks--, t.forceClientRender || (t.pendingTasks === 0 ? (n.parentFlushed && n.status === 1 && Ms(t, n), t.parentFlushed && e.completedBoundaries.push(t), t.fallbackAbortableTasks.forEach(XC, e), t.fallbackAbortableTasks.clear()) : n.parentFlushed && n.status === 1 && (Ms(t, n), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && (e = e.onAllReady, e());
  }
  function VS(e) {
    if (e.status !== 2) {
      var t = mo, n = Wp.current;
      Wp.current = mS;
      var r = Ds;
      Ds = e.responseState;
      try {
        var o = e.pingedTasks, i;
        for (i = 0; i < o.length; i++) {
          var l = o[i], a = e, u = l.blockedSegment;
          if (u.status === 0) {
            Ls(l.context);
            try {
              Dt(a, l, l.node), a.responseState.generateStaticMarkup || u.lastPushedText && u.textEmbedded && u.chunks.push("<!-- -->"), l.abortSet.delete(l), u.status = 1, BS(a, l.blockedBoundary, u);
            } catch (y) {
              if (nh(), typeof y == "object" && y !== null && typeof y.then == "function") {
                var s = l.ping;
                y.then(s, s);
              } else {
                l.abortSet.delete(l), u.status = 4;
                var c = l.blockedBoundary, d = y, p = Ql(a, d);
                if (c === null ? Os(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = true, c.errorDigest = p, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                  var m = a.onAllReady;
                  m();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, i), e.destination !== null && oh(e, e.destination);
      } catch (y) {
        Ql(e, y), Os(e, y);
      } finally {
        Ds = r, Wp.current = n, n === mS && Ls(t);
      }
    }
  }
  function ks(e, t, n) {
    switch (n.parentFlushed = true, n.status) {
      case 0:
        var r = n.id = e.nextSegmentId++;
        return n.lastPushedText = false, n.textEmbedded = false, e = e.responseState, t.push('<template id="'), t.push(e.placeholderPrefix), e = r.toString(16), t.push(e), t.push('"></template>');
      case 1:
        n.status = 2;
        var o = true;
        r = n.chunks;
        var i = 0;
        n = n.children;
        for (var l = 0; l < n.length; l++) {
          for (o = n[l]; i < o.index; i++)
            t.push(r[i]);
          o = zs(e, t, o);
        }
        for (; i < r.length - 1; i++)
          t.push(r[i]);
        return i < r.length && (o = t.push(r[i])), o;
      default:
        throw Error(V(390));
    }
  }
  function zs(e, t, n) {
    var r = n.boundary;
    if (r === null)
      return ks(e, t, n);
    if (r.parentFlushed = true, r.forceClientRender)
      return e.responseState.generateStaticMarkup || (r = r.errorDigest, t.push("<!--$!-->"), t.push("<template"), r && (t.push(' data-dgst="'), r = it(r), t.push(r), t.push('"')), t.push("></template>")), ks(e, t, n), e = e.responseState.generateStaticMarkup ? true : t.push("<!--/$-->"), e;
    if (0 < r.pendingTasks) {
      r.rootSegmentID = e.nextSegmentId++, 0 < r.completedSegments.length && e.partialBoundaries.push(r);
      var o = e.responseState, i = o.nextSuspenseID++;
      return o = o.boundaryPrefix + i.toString(16), r = r.id = o, lS(t, e.responseState, r), ks(e, t, n), t.push("<!--/$-->");
    }
    if (r.byteSize > e.progressiveChunkSize)
      return r.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(r), lS(t, e.responseState, r.id), ks(e, t, n), t.push("<!--/$-->");
    if (e.responseState.generateStaticMarkup || t.push("<!--$-->"), n = r.completedSegments, n.length !== 1)
      throw Error(V(391));
    return zs(e, t, n[0]), e = e.responseState.generateStaticMarkup ? true : t.push("<!--/$-->"), e;
  }
  function SS(e, t, n) {
    return TC(t, e.responseState, n.formatContext, n.id), zs(e, t, n), FC(t, n.formatContext);
  }
  function ES(e, t, n) {
    for (var r = n.completedSegments, o = 0; o < r.length; o++)
      $S(e, t, n, r[o]);
    if (r.length = 0, e = e.responseState, r = n.id, n = n.rootSegmentID, t.push(e.startInlineScript), e.sentCompleteBoundaryFunction ? t.push('$RC("') : (e.sentCompleteBoundaryFunction = true, t.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), r === null)
      throw Error(V(395));
    return n = n.toString(16), t.push(r), t.push('","'), t.push(e.segmentPrefix), t.push(n), t.push('")<\/script>');
  }
  function $S(e, t, n, r) {
    if (r.status === 2)
      return true;
    var o = r.id;
    if (o === -1) {
      if ((r.id = n.rootSegmentID) === -1)
        throw Error(V(392));
      return SS(e, t, r);
    }
    return SS(e, t, r), e = e.responseState, t.push(e.startInlineScript), e.sentCompleteSegmentFunction ? t.push('$RS("') : (e.sentCompleteSegmentFunction = true, t.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), t.push(e.segmentPrefix), o = o.toString(16), t.push(o), t.push('","'), t.push(e.placeholderPrefix), t.push(o), t.push('")<\/script>');
  }
  function oh(e, t) {
    try {
      var n = e.completedRootSegment;
      if (n !== null && e.pendingRootTasks === 0) {
        zs(e, t, n), e.completedRootSegment = null;
        var r = e.responseState.bootstrapChunks;
        for (n = 0; n < r.length - 1; n++)
          t.push(r[n]);
        n < r.length && t.push(r[n]);
      }
      var o = e.clientRenderedBoundaries, i;
      for (i = 0; i < o.length; i++) {
        var l = o[i];
        r = t;
        var a = e.responseState, u = l.id, s = l.errorDigest, c = l.errorMessage, d = l.errorComponentStack;
        if (r.push(a.startInlineScript), a.sentClientRenderFunction ? r.push('$RX("') : (a.sentClientRenderFunction = true, r.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), u === null)
          throw Error(V(395));
        if (r.push(u), r.push('"'), s || c || d) {
          r.push(",");
          var p = $p(s || "");
          r.push(p);
        }
        if (c || d) {
          r.push(",");
          var m = $p(c || "");
          r.push(m);
        }
        if (d) {
          r.push(",");
          var y = $p(d);
          r.push(y);
        }
        if (!r.push(")<\/script>")) {
          e.destination = null, i++, o.splice(0, i);
          return;
        }
      }
      o.splice(0, i);
      var w = e.completedBoundaries;
      for (i = 0; i < w.length; i++)
        if (!ES(e, t, w[i])) {
          e.destination = null, i++, w.splice(0, i);
          return;
        }
      w.splice(0, i);
      var R = e.partialBoundaries;
      for (i = 0; i < R.length; i++) {
        var f = R[i];
        e: {
          o = e, l = t;
          var h = f.completedSegments;
          for (a = 0; a < h.length; a++)
            if (!$S(o, l, f, h[a])) {
              a++, h.splice(0, a);
              var v = false;
              break e;
            }
          h.splice(0, a), v = true;
        }
        if (!v) {
          e.destination = null, i++, R.splice(0, i);
          return;
        }
      }
      R.splice(0, i);
      var E = e.completedBoundaries;
      for (i = 0; i < E.length; i++)
        if (!ES(e, t, E[i])) {
          e.destination = null, i++, E.splice(0, i);
          return;
        }
      E.splice(0, i);
    } finally {
      e.allPendingTasks === 0 && e.pingedTasks.length === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && t.push(null);
    }
  }
  function GC(e, t) {
    try {
      var n = e.abortableTasks;
      n.forEach(function(r) {
        return HS(r, e, t);
      }), n.clear(), e.destination !== null && oh(e, e.destination);
    } catch (r) {
      Ql(e, r), Os(e, r);
    }
  }
  function qC() {
  }
  function WS(e, t, n, r) {
    var o = false, i = null, l = "", a = { push: function(s) {
      return s !== null && (l += s), true;
    }, destroy: function(s) {
      o = true, i = s;
    } }, u = false;
    if (e = JC(e, MC(n, t ? t.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, 1 / 0, qC, void 0, function() {
      u = true;
    }, void 0, void 0), VS(e), GC(e, r), e.status === 1)
      e.status = 2, a.destroy(e.fatalError);
    else if (e.status !== 2 && e.destination === null) {
      e.destination = a;
      try {
        oh(e, a);
      } catch (s) {
        Ql(e, s), Os(e, s);
      }
    }
    if (o)
      throw i;
    if (!u)
      throw Error(V(426));
    return l;
  }
  wi.renderToNodeStream = function() {
    throw Error(V(207));
  };
  wi.renderToStaticMarkup = function(e, t) {
    return WS(e, t, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  wi.renderToStaticNodeStream = function() {
    throw Error(V(208));
  };
  wi.renderToString = function(e, t) {
    return WS(e, t, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  wi.version = "18.2.0";
});
var $E = Ae((_h) => {
  "use strict";
  var wE = st();
  function W(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Tt = null, Ft = 0;
  function I(e, t) {
    if (t.length !== 0)
      if (512 < t.length)
        0 < Ft && (e.enqueue(new Uint8Array(Tt.buffer, 0, Ft)), Tt = new Uint8Array(512), Ft = 0), e.enqueue(t);
      else {
        var n = Tt.length - Ft;
        n < t.length && (n === 0 ? e.enqueue(Tt) : (Tt.set(t.subarray(0, n), Ft), e.enqueue(Tt), t = t.subarray(n)), Tt = new Uint8Array(512), Ft = 0), Tt.set(t, Ft), Ft += t.length;
      }
  }
  function fe(e, t) {
    return I(e, t), true;
  }
  function QS(e) {
    Tt && 0 < Ft && (e.enqueue(new Uint8Array(Tt.buffer, 0, Ft)), Tt = null, Ft = 0);
  }
  var SE = new TextEncoder();
  function Q(e) {
    return SE.encode(e);
  }
  function M(e) {
    return SE.encode(e);
  }
  function EE(e, t) {
    typeof e.error == "function" ? e.error(t) : e.close();
  }
  var gt = Object.prototype.hasOwnProperty, ZC = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, YS = {}, JS = {};
  function RE(e) {
    return gt.call(JS, e) ? true : gt.call(YS, e) ? false : ZC.test(e) ? JS[e] = true : (YS[e] = true, false);
  }
  function at(e, t, n, r, o, i, l) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Qe = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Qe[e] = new at(e, 0, false, e, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Qe[t] = new at(t, 1, false, e[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Qe[e] = new at(e, 2, false, e.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Qe[e] = new at(e, 2, false, e, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Qe[e] = new at(e, 3, false, e.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Qe[e] = new at(e, 3, true, e, null, false, false);
  });
  ["capture", "download"].forEach(function(e) {
    Qe[e] = new at(e, 4, false, e, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(e) {
    Qe[e] = new at(e, 6, false, e, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(e) {
    Qe[e] = new at(e, 5, false, e.toLowerCase(), null, false, false);
  });
  var vh = /[\-:]([a-z])/g;
  function yh(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(vh, yh);
    Qe[t] = new at(t, 1, false, e, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(vh, yh);
    Qe[t] = new at(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(vh, yh);
    Qe[t] = new at(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(e) {
    Qe[e] = new at(e, 1, false, e.toLowerCase(), null, false, false);
  });
  Qe.xlinkHref = new at("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(e) {
    Qe[e] = new at(e, 1, false, e.toLowerCase(), null, true, true);
  });
  var bs = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, eN = ["Webkit", "ms", "Moz", "O"];
  Object.keys(bs).forEach(function(e) {
    eN.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), bs[t] = bs[e];
    });
  });
  var tN = /["'&<>]/;
  function Ke(e) {
    if (typeof e == "boolean" || typeof e == "number")
      return "" + e;
    e = "" + e;
    var t = tN.exec(e);
    if (t) {
      var n = "", r, o = 0;
      for (r = t.index; r < e.length; r++) {
        switch (e.charCodeAt(r)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== r && (n += e.substring(o, r)), o = r + 1, n += t;
      }
      e = o !== r ? n + e.substring(o, r) : n;
    }
    return e;
  }
  var nN = /([A-Z])/g, rN = /^ms-/, dh = Array.isArray, oN = M("<script>"), iN = M("<\/script>"), lN = M('<script src="'), aN = M('<script type="module" src="'), XS = M('" async=""><\/script>'), uN = /(<\/|<)(s)(cript)/gi;
  function sN(e, t, n, r) {
    return "" + t + (n === "s" ? "\\u0073" : "\\u0053") + r;
  }
  function cN(e, t, n, r, o) {
    e = e === void 0 ? "" : e, t = t === void 0 ? oN : M('<script nonce="' + Ke(t) + '">');
    var i = [];
    if (n !== void 0 && i.push(t, Q(("" + n).replace(uN, sN)), iN), r !== void 0)
      for (n = 0; n < r.length; n++)
        i.push(lN, Q(Ke(r[n])), XS);
    if (o !== void 0)
      for (r = 0; r < o.length; r++)
        i.push(aN, Q(Ke(o[r])), XS);
    return { bootstrapChunks: i, startInlineScript: t, placeholderPrefix: M(e + "P:"), segmentPrefix: M(e + "S:"), boundaryPrefix: e + "B:", idPrefix: e, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
  }
  function _n(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function dN(e) {
    return _n(e === "http://www.w3.org/2000/svg" ? 2 : e === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
  }
  function fN(e, t, n) {
    switch (t) {
      case "select":
        return _n(1, n.value != null ? n.value : n.defaultValue);
      case "svg":
        return _n(2, null);
      case "math":
        return _n(3, null);
      case "foreignObject":
        return _n(1, null);
      case "table":
        return _n(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return _n(5, null);
      case "colgroup":
        return _n(7, null);
      case "tr":
        return _n(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? _n(1, null) : e;
  }
  var gh = M("<!-- -->");
  function GS(e, t, n, r) {
    return t === "" ? r : (r && e.push(gh), e.push(Q(Ke(t))), true);
  }
  var qS = /* @__PURE__ */ new Map(), pN = M(' style="'), ZS = M(":"), hN = M(";");
  function xE(e, t, n) {
    if (typeof n != "object")
      throw Error(W(62));
    t = true;
    for (var r in n)
      if (gt.call(n, r)) {
        var o = n[r];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (r.indexOf("--") === 0) {
            var i = Q(Ke(r));
            o = Q(Ke(("" + o).trim()));
          } else {
            i = r;
            var l = qS.get(i);
            l !== void 0 || (l = M(Ke(i.replace(nN, "-$1").toLowerCase().replace(rN, "-ms-"))), qS.set(i, l)), i = l, o = typeof o == "number" ? o === 0 || gt.call(bs, r) ? Q("" + o) : Q(o + "px") : Q(Ke(("" + o).trim()));
          }
          t ? (t = false, e.push(pN, i, ZS, o)) : e.push(hN, i, ZS, o);
        }
      }
    t || e.push(vo);
  }
  var Ir = M(" "), Si = M('="'), vo = M('"'), eE = M('=""');
  function Lt(e, t, n, r) {
    switch (n) {
      case "style":
        xE(e, t, r);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") {
      if (t = Qe.hasOwnProperty(n) ? Qe[n] : null, t !== null) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans)
              return;
        }
        switch (n = Q(t.attributeName), t.type) {
          case 3:
            r && e.push(Ir, n, eE);
            break;
          case 4:
            r === true ? e.push(Ir, n, eE) : r !== false && e.push(Ir, n, Si, Q(Ke(r)), vo);
            break;
          case 5:
            isNaN(r) || e.push(Ir, n, Si, Q(Ke(r)), vo);
            break;
          case 6:
            !isNaN(r) && 1 <= r && e.push(Ir, n, Si, Q(Ke(r)), vo);
            break;
          default:
            t.sanitizeURL && (r = "" + r), e.push(Ir, n, Si, Q(Ke(r)), vo);
        }
      } else if (RE(n)) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (t = n.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-")
              return;
        }
        e.push(Ir, Q(n), Si, Q(Ke(r)), vo);
      }
    }
  }
  var zr = M(">"), tE = M("/>");
  function Hs(e, t, n) {
    if (t != null) {
      if (n != null)
        throw Error(W(60));
      if (typeof t != "object" || !("__html" in t))
        throw Error(W(61));
      t = t.__html, t != null && e.push(Q("" + t));
    }
  }
  function mN(e) {
    var t = "";
    return wE.Children.forEach(e, function(n) {
      n != null && (t += n);
    }), t;
  }
  var ih = M(' selected=""');
  function lh(e, t, n, r) {
    e.push(Cn(n));
    var o = n = null, i;
    for (i in t)
      if (gt.call(t, i)) {
        var l = t[i];
        if (l != null)
          switch (i) {
            case "children":
              n = l;
              break;
            case "dangerouslySetInnerHTML":
              o = l;
              break;
            default:
              Lt(e, r, i, l);
          }
      }
    return e.push(zr), Hs(e, o, n), typeof n == "string" ? (e.push(Q(Ke(n))), null) : n;
  }
  var ah = M(`
`), vN = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, nE = /* @__PURE__ */ new Map();
  function Cn(e) {
    var t = nE.get(e);
    if (t === void 0) {
      if (!vN.test(e))
        throw Error(W(65, e));
      t = M("<" + e), nE.set(e, t);
    }
    return t;
  }
  var yN = M("<!DOCTYPE html>");
  function gN(e, t, n, r, o) {
    switch (t) {
      case "select":
        e.push(Cn("select"));
        var i = null, l = null;
        for (c in n)
          if (gt.call(n, c)) {
            var a = n[c];
            if (a != null)
              switch (c) {
                case "children":
                  i = a;
                  break;
                case "dangerouslySetInnerHTML":
                  l = a;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  Lt(e, r, c, a);
              }
          }
        return e.push(zr), Hs(e, l, i), i;
      case "option":
        l = o.selectedValue, e.push(Cn("option"));
        var u = a = null, s = null, c = null;
        for (i in n)
          if (gt.call(n, i)) {
            var d = n[i];
            if (d != null)
              switch (i) {
                case "children":
                  a = d;
                  break;
                case "selected":
                  s = d;
                  break;
                case "dangerouslySetInnerHTML":
                  c = d;
                  break;
                case "value":
                  u = d;
                default:
                  Lt(e, r, i, d);
              }
          }
        if (l != null)
          if (n = u !== null ? "" + u : mN(a), dh(l)) {
            for (r = 0; r < l.length; r++)
              if ("" + l[r] === n) {
                e.push(ih);
                break;
              }
          } else
            "" + l === n && e.push(ih);
        else
          s && e.push(ih);
        return e.push(zr), Hs(e, c, a), a;
      case "textarea":
        e.push(Cn("textarea")), c = l = i = null;
        for (a in n)
          if (gt.call(n, a) && (u = n[a], u != null))
            switch (a) {
              case "children":
                c = u;
                break;
              case "value":
                i = u;
                break;
              case "defaultValue":
                l = u;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(W(91));
              default:
                Lt(e, r, a, u);
            }
        if (i === null && l !== null && (i = l), e.push(zr), c != null) {
          if (i != null)
            throw Error(W(92));
          if (dh(c) && 1 < c.length)
            throw Error(W(93));
          i = "" + c;
        }
        return typeof i == "string" && i[0] === `
` && e.push(ah), i !== null && e.push(Q(Ke("" + i))), null;
      case "input":
        e.push(Cn("input")), u = c = a = i = null;
        for (l in n)
          if (gt.call(n, l) && (s = n[l], s != null))
            switch (l) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(W(399, "input"));
              case "defaultChecked":
                u = s;
                break;
              case "defaultValue":
                a = s;
                break;
              case "checked":
                c = s;
                break;
              case "value":
                i = s;
                break;
              default:
                Lt(e, r, l, s);
            }
        return c !== null ? Lt(e, r, "checked", c) : u !== null && Lt(e, r, "checked", u), i !== null ? Lt(e, r, "value", i) : a !== null && Lt(e, r, "value", a), e.push(tE), null;
      case "menuitem":
        e.push(Cn("menuitem"));
        for (var p in n)
          if (gt.call(n, p) && (i = n[p], i != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(W(400));
              default:
                Lt(e, r, p, i);
            }
        return e.push(zr), null;
      case "title":
        e.push(Cn("title")), i = null;
        for (d in n)
          if (gt.call(n, d) && (l = n[d], l != null))
            switch (d) {
              case "children":
                i = l;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(W(434));
              default:
                Lt(e, r, d, l);
            }
        return e.push(zr), i;
      case "listing":
      case "pre":
        e.push(Cn(t)), l = i = null;
        for (u in n)
          if (gt.call(n, u) && (a = n[u], a != null))
            switch (u) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                l = a;
                break;
              default:
                Lt(e, r, u, a);
            }
        if (e.push(zr), l != null) {
          if (i != null)
            throw Error(W(60));
          if (typeof l != "object" || !("__html" in l))
            throw Error(W(61));
          n = l.__html, n != null && (typeof n == "string" && 0 < n.length && n[0] === `
` ? e.push(ah, Q(n)) : e.push(Q("" + n)));
        }
        return typeof i == "string" && i[0] === `
` && e.push(ah), i;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(Cn(t));
        for (var m in n)
          if (gt.call(n, m) && (i = n[m], i != null))
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(W(399, t));
              default:
                Lt(e, r, m, i);
            }
        return e.push(tE), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return lh(e, n, t, r);
      case "html":
        return o.insertionMode === 0 && e.push(yN), lh(e, n, t, r);
      default:
        if (t.indexOf("-") === -1 && typeof n.is != "string")
          return lh(e, n, t, r);
        e.push(Cn(t)), l = i = null;
        for (s in n)
          if (gt.call(n, s) && (a = n[s], a != null))
            switch (s) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                l = a;
                break;
              case "style":
                xE(e, r, a);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                RE(s) && typeof a != "function" && typeof a != "symbol" && e.push(Ir, Q(s), Si, Q(Ke(a)), vo);
            }
        return e.push(zr), Hs(e, l, i), i;
    }
  }
  var wN = M("</"), SN = M(">"), EN = M('<template id="'), RN = M('"></template>'), xN = M("<!--$-->"), kN = M('<!--$?--><template id="'), _N = M('"></template>'), CN = M("<!--$!-->"), NN = M("<!--/$-->"), PN = M("<template"), DN = M('"'), LN = M(' data-dgst="');
  M(' data-msg="');
  M(' data-stck="');
  var TN = M("></template>");
  function rE(e, t, n) {
    if (I(e, kN), n === null)
      throw Error(W(395));
    return I(e, n), fe(e, _N);
  }
  var FN = M('<div hidden id="'), ON = M('">'), MN = M("</div>"), AN = M('<svg aria-hidden="true" style="display:none" id="'), IN = M('">'), zN = M("</svg>"), UN = M('<math aria-hidden="true" style="display:none" id="'), jN = M('">'), bN = M("</math>"), HN = M('<table hidden id="'), BN = M('">'), VN = M("</table>"), $N = M('<table hidden><tbody id="'), WN = M('">'), KN = M("</tbody></table>"), QN = M('<table hidden><tr id="'), YN = M('">'), JN = M("</tr></table>"), XN = M('<table hidden><colgroup id="'), GN = M('">'), qN = M("</colgroup></table>");
  function ZN(e, t, n, r) {
    switch (n.insertionMode) {
      case 0:
      case 1:
        return I(e, FN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, ON);
      case 2:
        return I(e, AN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, IN);
      case 3:
        return I(e, UN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, jN);
      case 4:
        return I(e, HN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, BN);
      case 5:
        return I(e, $N), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, WN);
      case 6:
        return I(e, QN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, YN);
      case 7:
        return I(e, XN), I(e, t.segmentPrefix), I(e, Q(r.toString(16))), fe(e, GN);
      default:
        throw Error(W(397));
    }
  }
  function eP(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return fe(e, MN);
      case 2:
        return fe(e, zN);
      case 3:
        return fe(e, bN);
      case 4:
        return fe(e, VN);
      case 5:
        return fe(e, KN);
      case 6:
        return fe(e, JN);
      case 7:
        return fe(e, qN);
      default:
        throw Error(W(397));
    }
  }
  var tP = M('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), nP = M('$RS("'), rP = M('","'), oP = M('")<\/script>'), iP = M('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), lP = M('$RC("'), aP = M('","'), uP = M('")<\/script>'), sP = M('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), cP = M('$RX("'), dP = M('"'), fP = M(")<\/script>"), uh = M(","), pP = /[<\u2028\u2029]/g;
  function sh(e) {
    return JSON.stringify(e).replace(pP, function(t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  var Xl = Object.assign, hP = Symbol.for("react.element"), kE = Symbol.for("react.portal"), _E = Symbol.for("react.fragment"), CE = Symbol.for("react.strict_mode"), NE = Symbol.for("react.profiler"), PE = Symbol.for("react.provider"), DE = Symbol.for("react.context"), LE = Symbol.for("react.forward_ref"), TE = Symbol.for("react.suspense"), FE = Symbol.for("react.suspense_list"), OE = Symbol.for("react.memo"), wh = Symbol.for("react.lazy"), mP = Symbol.for("react.scope"), vP = Symbol.for("react.debug_trace_mode"), yP = Symbol.for("react.legacy_hidden"), gP = Symbol.for("react.default_value"), oE = Symbol.iterator;
  function fh(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case _E:
        return "Fragment";
      case kE:
        return "Portal";
      case NE:
        return "Profiler";
      case CE:
        return "StrictMode";
      case TE:
        return "Suspense";
      case FE:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case DE:
          return (e.displayName || "Context") + ".Consumer";
        case PE:
          return (e._context.displayName || "Context") + ".Provider";
        case LE:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case OE:
          return t = e.displayName || null, t !== null ? t : fh(e.type) || "Memo";
        case wh:
          t = e._payload, e = e._init;
          try {
            return fh(e(t));
          } catch {
          }
      }
    return null;
  }
  var ME = {};
  function iE(e, t) {
    if (e = e.contextTypes, !e)
      return ME;
    var n = {}, r;
    for (r in e)
      n[r] = t[r];
    return n;
  }
  var go = null;
  function Xs(e, t) {
    if (e !== t) {
      e.context._currentValue = e.parentValue, e = e.parent;
      var n = t.parent;
      if (e === null) {
        if (n !== null)
          throw Error(W(401));
      } else {
        if (n === null)
          throw Error(W(401));
        Xs(e, n);
      }
      t.context._currentValue = t.value;
    }
  }
  function AE(e) {
    e.context._currentValue = e.parentValue, e = e.parent, e !== null && AE(e);
  }
  function IE(e) {
    var t = e.parent;
    t !== null && IE(t), e.context._currentValue = e.value;
  }
  function zE(e, t) {
    if (e.context._currentValue = e.parentValue, e = e.parent, e === null)
      throw Error(W(402));
    e.depth === t.depth ? Xs(e, t) : zE(e, t);
  }
  function UE(e, t) {
    var n = t.parent;
    if (n === null)
      throw Error(W(402));
    e.depth === n.depth ? Xs(e, n) : UE(e, n), t.context._currentValue = t.value;
  }
  function Ws(e) {
    var t = go;
    t !== e && (t === null ? IE(e) : e === null ? AE(t) : t.depth === e.depth ? Xs(t, e) : t.depth > e.depth ? zE(t, e) : UE(t, e), go = e);
  }
  var lE = { isMounted: function() {
    return false;
  }, enqueueSetState: function(e, t) {
    e = e._reactInternals, e.queue !== null && e.queue.push(t);
  }, enqueueReplaceState: function(e, t) {
    e = e._reactInternals, e.replace = true, e.queue = [t];
  }, enqueueForceUpdate: function() {
  } };
  function aE(e, t, n, r) {
    var o = e.state !== void 0 ? e.state : null;
    e.updater = lE, e.props = n, e.state = o;
    var i = { queue: [], replace: false };
    e._reactInternals = i;
    var l = t.contextType;
    if (e.context = typeof l == "object" && l !== null ? l._currentValue : r, l = t.getDerivedStateFromProps, typeof l == "function" && (l = l(n, o), o = l == null ? o : Xl({}, o, l), e.state = o), typeof t.getDerivedStateFromProps != "function" && typeof e.getSnapshotBeforeUpdate != "function" && (typeof e.UNSAFE_componentWillMount == "function" || typeof e.componentWillMount == "function"))
      if (t = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), t !== e.state && lE.enqueueReplaceState(e, e.state, null), i.queue !== null && 0 < i.queue.length)
        if (t = i.queue, l = i.replace, i.queue = null, i.replace = false, l && t.length === 1)
          e.state = t[0];
        else {
          for (i = l ? t[0] : e.state, o = true, l = l ? 1 : 0; l < t.length; l++) {
            var a = t[l];
            a = typeof a == "function" ? a.call(e, i, n, r) : a, a != null && (o ? (o = false, i = Xl({}, i, a)) : Xl(i, a));
          }
          e.state = i;
        }
      else
        i.queue = null;
  }
  var wP = { id: 1, overflow: "" };
  function ph(e, t, n) {
    var r = e.id;
    e = e.overflow;
    var o = 32 - Bs(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - Bs(t) + o;
    if (30 < i) {
      var l = o - o % 5;
      return i = (r & (1 << l) - 1).toString(32), r >>= l, o -= l, { id: 1 << 32 - Bs(t) + o | n << o | r, overflow: i + e };
    }
    return { id: 1 << i | n << o | r, overflow: e };
  }
  var Bs = Math.clz32 ? Math.clz32 : RP, SP = Math.log, EP = Math.LN2;
  function RP(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (SP(e) / EP | 0) | 0;
  }
  function xP(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var kP = typeof Object.is == "function" ? Object.is : xP, Jn = null, Sh = null, Vs = null, ue = null, Yl = false, Ks = false, Gl = 0, Ur = null, Gs = 0;
  function yo() {
    if (Jn === null)
      throw Error(W(321));
    return Jn;
  }
  function uE() {
    if (0 < Gs)
      throw Error(W(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Eh() {
    return ue === null ? Vs === null ? (Yl = false, Vs = ue = uE()) : (Yl = true, ue = Vs) : ue.next === null ? (Yl = false, ue = ue.next = uE()) : (Yl = true, ue = ue.next), ue;
  }
  function Rh() {
    Sh = Jn = null, Ks = false, Vs = null, Gs = 0, ue = Ur = null;
  }
  function jE(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function sE(e, t, n) {
    if (Jn = yo(), ue = Eh(), Yl) {
      var r = ue.queue;
      if (t = r.dispatch, Ur !== null && (n = Ur.get(r), n !== void 0)) {
        Ur.delete(r), r = ue.memoizedState;
        do
          r = e(r, n.action), n = n.next;
        while (n !== null);
        return ue.memoizedState = r, [r, t];
      }
      return [ue.memoizedState, t];
    }
    return e = e === jE ? typeof t == "function" ? t() : t : n !== void 0 ? n(t) : t, ue.memoizedState = e, e = ue.queue = { last: null, dispatch: null }, e = e.dispatch = _P.bind(null, Jn, e), [ue.memoizedState, e];
  }
  function cE(e, t) {
    if (Jn = yo(), ue = Eh(), t = t === void 0 ? null : t, ue !== null) {
      var n = ue.memoizedState;
      if (n !== null && t !== null) {
        var r = n[1];
        e:
          if (r === null)
            r = false;
          else {
            for (var o = 0; o < r.length && o < t.length; o++)
              if (!kP(t[o], r[o])) {
                r = false;
                break e;
              }
            r = true;
          }
        if (r)
          return n[0];
      }
    }
    return e = e(), ue.memoizedState = [e, t], e;
  }
  function _P(e, t, n) {
    if (25 <= Gs)
      throw Error(W(301));
    if (e === Jn)
      if (Ks = true, e = { action: n, next: null }, Ur === null && (Ur = /* @__PURE__ */ new Map()), n = Ur.get(t), n === void 0)
        Ur.set(t, e);
      else {
        for (t = n; t.next !== null; )
          t = t.next;
        t.next = e;
      }
  }
  function CP() {
    throw Error(W(394));
  }
  function Us() {
  }
  var dE = { readContext: function(e) {
    return e._currentValue;
  }, useContext: function(e) {
    return yo(), e._currentValue;
  }, useMemo: cE, useReducer: sE, useRef: function(e) {
    Jn = yo(), ue = Eh();
    var t = ue.memoizedState;
    return t === null ? (e = { current: e }, ue.memoizedState = e) : t;
  }, useState: function(e) {
    return sE(jE, e);
  }, useInsertionEffect: Us, useLayoutEffect: function() {
  }, useCallback: function(e, t) {
    return cE(function() {
      return e;
    }, t);
  }, useImperativeHandle: Us, useEffect: Us, useDebugValue: Us, useDeferredValue: function(e) {
    return yo(), e;
  }, useTransition: function() {
    return yo(), [false, CP];
  }, useId: function() {
    var e = Sh.treeContext, t = e.overflow;
    e = e.id, e = (e & ~(1 << 32 - Bs(e) - 1)).toString(32) + t;
    var n = $s;
    if (n === null)
      throw Error(W(404));
    return t = Gl++, e = ":" + n.idPrefix + "R" + e, 0 < t && (e += "H" + t.toString(32)), e + ":";
  }, useMutableSource: function(e, t) {
    return yo(), t(e._source);
  }, useSyncExternalStore: function(e, t, n) {
    if (n === void 0)
      throw Error(W(407));
    return n();
  } }, $s = null, ch = wE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function NP(e) {
    return console.error(e), null;
  }
  function Jl() {
  }
  function PP(e, t, n, r, o, i, l, a, u) {
    var s = [], c = /* @__PURE__ */ new Set();
    return t = { destination: null, responseState: t, progressiveChunkSize: r === void 0 ? 12800 : r, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: s, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: o === void 0 ? NP : o, onAllReady: i === void 0 ? Jl : i, onShellReady: l === void 0 ? Jl : l, onShellError: a === void 0 ? Jl : a, onFatalError: u === void 0 ? Jl : u }, n = Qs(t, 0, null, n, false, false), n.parentFlushed = true, e = xh(t, e, null, n, c, ME, null, wP), s.push(e), t;
  }
  function xh(e, t, n, r, o, i, l, a) {
    e.allPendingTasks++, n === null ? e.pendingRootTasks++ : n.pendingTasks++;
    var u = { node: t, ping: function() {
      var s = e.pingedTasks;
      s.push(u), s.length === 1 && BE(e);
    }, blockedBoundary: n, blockedSegment: r, abortSet: o, legacyContext: i, context: l, treeContext: a };
    return o.add(u), u;
  }
  function Qs(e, t, n, r, o, i) {
    return { status: 0, id: -1, index: t, parentFlushed: false, chunks: [], children: [], formatContext: r, boundary: n, lastPushedText: o, textEmbedded: i };
  }
  function ql(e, t) {
    if (e = e.onError(t), e != null && typeof e != "string")
      throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof e + '" instead');
    return e;
  }
  function Ys(e, t) {
    var n = e.onShellError;
    n(t), n = e.onFatalError, n(t), e.destination !== null ? (e.status = 2, EE(e.destination, t)) : (e.status = 1, e.fatalError = t);
  }
  function fE(e, t, n, r, o) {
    for (Jn = {}, Sh = t, Gl = 0, e = n(r, o); Ks; )
      Ks = false, Gl = 0, Gs += 1, ue = null, e = n(r, o);
    return Rh(), e;
  }
  function pE(e, t, n, r) {
    var o = n.render(), i = r.childContextTypes;
    if (i != null) {
      var l = t.legacyContext;
      if (typeof n.getChildContext != "function")
        r = l;
      else {
        n = n.getChildContext();
        for (var a in n)
          if (!(a in i))
            throw Error(W(108, fh(r) || "Unknown", a));
        r = Xl({}, l, n);
      }
      t.legacyContext = r, Ot(e, t, o), t.legacyContext = l;
    } else
      Ot(e, t, o);
  }
  function hE(e, t) {
    if (e && e.defaultProps) {
      t = Xl({}, t), e = e.defaultProps;
      for (var n in e)
        t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function hh(e, t, n, r, o) {
    if (typeof n == "function")
      if (n.prototype && n.prototype.isReactComponent) {
        o = iE(n, t.legacyContext);
        var i = n.contextType;
        i = new n(r, typeof i == "object" && i !== null ? i._currentValue : o), aE(i, n, r, o), pE(e, t, i, n);
      } else {
        i = iE(n, t.legacyContext), o = fE(e, t, n, r, i);
        var l = Gl !== 0;
        if (typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0)
          aE(o, n, r, i), pE(e, t, o, n);
        else if (l) {
          r = t.treeContext, t.treeContext = ph(r, 1, 0);
          try {
            Ot(e, t, o);
          } finally {
            t.treeContext = r;
          }
        } else
          Ot(e, t, o);
      }
    else if (typeof n == "string") {
      switch (o = t.blockedSegment, i = gN(o.chunks, n, r, e.responseState, o.formatContext), o.lastPushedText = false, l = o.formatContext, o.formatContext = fN(l, n, r), mh(e, t, i), o.formatContext = l, n) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push(wN, Q(n), SN);
      }
      o.lastPushedText = false;
    } else {
      switch (n) {
        case yP:
        case vP:
        case CE:
        case NE:
        case _E:
          Ot(e, t, r.children);
          return;
        case FE:
          Ot(e, t, r.children);
          return;
        case mP:
          throw Error(W(343));
        case TE:
          e: {
            n = t.blockedBoundary, o = t.blockedSegment, i = r.fallback, r = r.children, l = /* @__PURE__ */ new Set();
            var a = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: l, errorDigest: null }, u = Qs(e, o.chunks.length, a, o.formatContext, false, false);
            o.children.push(u), o.lastPushedText = false;
            var s = Qs(e, 0, null, o.formatContext, false, false);
            s.parentFlushed = true, t.blockedBoundary = a, t.blockedSegment = s;
            try {
              if (mh(e, t, r), s.lastPushedText && s.textEmbedded && s.chunks.push(gh), s.status = 1, Js(a, s), a.pendingTasks === 0)
                break e;
            } catch (c) {
              s.status = 4, a.forceClientRender = true, a.errorDigest = ql(e, c);
            } finally {
              t.blockedBoundary = n, t.blockedSegment = o;
            }
            t = xh(e, i, n, u, l, t.legacyContext, t.context, t.treeContext), e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof n == "object" && n !== null)
        switch (n.$$typeof) {
          case LE:
            if (r = fE(e, t, n.render, r, o), Gl !== 0) {
              n = t.treeContext, t.treeContext = ph(n, 1, 0);
              try {
                Ot(e, t, r);
              } finally {
                t.treeContext = n;
              }
            } else
              Ot(e, t, r);
            return;
          case OE:
            n = n.type, r = hE(n, r), hh(e, t, n, r, o);
            return;
          case PE:
            if (o = r.children, n = n._context, r = r.value, i = n._currentValue, n._currentValue = r, l = go, go = r = { parent: l, depth: l === null ? 0 : l.depth + 1, context: n, parentValue: i, value: r }, t.context = r, Ot(e, t, o), e = go, e === null)
              throw Error(W(403));
            r = e.parentValue, e.context._currentValue = r === gP ? e.context._defaultValue : r, e = go = e.parent, t.context = e;
            return;
          case DE:
            r = r.children, r = r(n._currentValue), Ot(e, t, r);
            return;
          case wh:
            o = n._init, n = o(n._payload), r = hE(n, r), hh(e, t, n, r, void 0);
            return;
        }
      throw Error(W(130, n == null ? n : typeof n, ""));
    }
  }
  function Ot(e, t, n) {
    if (t.node = n, typeof n == "object" && n !== null) {
      switch (n.$$typeof) {
        case hP:
          hh(e, t, n.type, n.props, n.ref);
          return;
        case kE:
          throw Error(W(257));
        case wh:
          var r = n._init;
          n = r(n._payload), Ot(e, t, n);
          return;
      }
      if (dh(n)) {
        mE(e, t, n);
        return;
      }
      if (n === null || typeof n != "object" ? r = null : (r = oE && n[oE] || n["@@iterator"], r = typeof r == "function" ? r : null), r && (r = r.call(n))) {
        if (n = r.next(), !n.done) {
          var o = [];
          do
            o.push(n.value), n = r.next();
          while (!n.done);
          mE(e, t, o);
        }
        return;
      }
      throw e = Object.prototype.toString.call(n), Error(W(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
    }
    typeof n == "string" ? (r = t.blockedSegment, r.lastPushedText = GS(t.blockedSegment.chunks, n, e.responseState, r.lastPushedText)) : typeof n == "number" && (r = t.blockedSegment, r.lastPushedText = GS(t.blockedSegment.chunks, "" + n, e.responseState, r.lastPushedText));
  }
  function mE(e, t, n) {
    for (var r = n.length, o = 0; o < r; o++) {
      var i = t.treeContext;
      t.treeContext = ph(i, r, o);
      try {
        mh(e, t, n[o]);
      } finally {
        t.treeContext = i;
      }
    }
  }
  function mh(e, t, n) {
    var r = t.blockedSegment.formatContext, o = t.legacyContext, i = t.context;
    try {
      return Ot(e, t, n);
    } catch (u) {
      if (Rh(), typeof u == "object" && u !== null && typeof u.then == "function") {
        n = u;
        var l = t.blockedSegment, a = Qs(e, l.chunks.length, null, l.formatContext, l.lastPushedText, true);
        l.children.push(a), l.lastPushedText = false, e = xh(e, t.node, t.blockedBoundary, a, t.abortSet, t.legacyContext, t.context, t.treeContext).ping, n.then(e, e), t.blockedSegment.formatContext = r, t.legacyContext = o, t.context = i, Ws(i);
      } else
        throw t.blockedSegment.formatContext = r, t.legacyContext = o, t.context = i, Ws(i), u;
    }
  }
  function DP(e) {
    var t = e.blockedBoundary;
    e = e.blockedSegment, e.status = 3, HE(this, t, e);
  }
  function bE(e, t, n) {
    var r = e.blockedBoundary;
    e.blockedSegment.status = 3, r === null ? (t.allPendingTasks--, t.status !== 2 && (t.status = 2, t.destination !== null && t.destination.close())) : (r.pendingTasks--, r.forceClientRender || (r.forceClientRender = true, e = n === void 0 ? Error(W(432)) : n, r.errorDigest = t.onError(e), r.parentFlushed && t.clientRenderedBoundaries.push(r)), r.fallbackAbortableTasks.forEach(function(o) {
      return bE(o, t, n);
    }), r.fallbackAbortableTasks.clear(), t.allPendingTasks--, t.allPendingTasks === 0 && (r = t.onAllReady, r()));
  }
  function Js(e, t) {
    if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null) {
      var n = t.children[0];
      n.id = t.id, n.parentFlushed = true, n.status === 1 && Js(e, n);
    } else
      e.completedSegments.push(t);
  }
  function HE(e, t, n) {
    if (t === null) {
      if (n.parentFlushed) {
        if (e.completedRootSegment !== null)
          throw Error(W(389));
        e.completedRootSegment = n;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && (e.onShellError = Jl, t = e.onShellReady, t());
    } else
      t.pendingTasks--, t.forceClientRender || (t.pendingTasks === 0 ? (n.parentFlushed && n.status === 1 && Js(t, n), t.parentFlushed && e.completedBoundaries.push(t), t.fallbackAbortableTasks.forEach(DP, e), t.fallbackAbortableTasks.clear()) : n.parentFlushed && n.status === 1 && (Js(t, n), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && (e = e.onAllReady, e());
  }
  function BE(e) {
    if (e.status !== 2) {
      var t = go, n = ch.current;
      ch.current = dE;
      var r = $s;
      $s = e.responseState;
      try {
        var o = e.pingedTasks, i;
        for (i = 0; i < o.length; i++) {
          var l = o[i], a = e, u = l.blockedSegment;
          if (u.status === 0) {
            Ws(l.context);
            try {
              Ot(a, l, l.node), u.lastPushedText && u.textEmbedded && u.chunks.push(gh), l.abortSet.delete(l), u.status = 1, HE(a, l.blockedBoundary, u);
            } catch (y) {
              if (Rh(), typeof y == "object" && y !== null && typeof y.then == "function") {
                var s = l.ping;
                y.then(s, s);
              } else {
                l.abortSet.delete(l), u.status = 4;
                var c = l.blockedBoundary, d = y, p = ql(a, d);
                if (c === null ? Ys(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = true, c.errorDigest = p, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                  var m = a.onAllReady;
                  m();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, i), e.destination !== null && kh(e, e.destination);
      } catch (y) {
        ql(e, y), Ys(e, y);
      } finally {
        $s = r, ch.current = n, n === dE && Ws(t);
      }
    }
  }
  function js(e, t, n) {
    switch (n.parentFlushed = true, n.status) {
      case 0:
        var r = n.id = e.nextSegmentId++;
        return n.lastPushedText = false, n.textEmbedded = false, e = e.responseState, I(t, EN), I(t, e.placeholderPrefix), e = Q(r.toString(16)), I(t, e), fe(t, RN);
      case 1:
        n.status = 2;
        var o = true;
        r = n.chunks;
        var i = 0;
        n = n.children;
        for (var l = 0; l < n.length; l++) {
          for (o = n[l]; i < o.index; i++)
            I(t, r[i]);
          o = qs(e, t, o);
        }
        for (; i < r.length - 1; i++)
          I(t, r[i]);
        return i < r.length && (o = fe(t, r[i])), o;
      default:
        throw Error(W(390));
    }
  }
  function qs(e, t, n) {
    var r = n.boundary;
    if (r === null)
      return js(e, t, n);
    if (r.parentFlushed = true, r.forceClientRender)
      r = r.errorDigest, fe(t, CN), I(t, PN), r && (I(t, LN), I(t, Q(Ke(r))), I(t, DN)), fe(t, TN), js(e, t, n);
    else if (0 < r.pendingTasks) {
      r.rootSegmentID = e.nextSegmentId++, 0 < r.completedSegments.length && e.partialBoundaries.push(r);
      var o = e.responseState, i = o.nextSuspenseID++;
      o = M(o.boundaryPrefix + i.toString(16)), r = r.id = o, rE(t, e.responseState, r), js(e, t, n);
    } else if (r.byteSize > e.progressiveChunkSize)
      r.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(r), rE(t, e.responseState, r.id), js(e, t, n);
    else {
      if (fe(t, xN), n = r.completedSegments, n.length !== 1)
        throw Error(W(391));
      qs(e, t, n[0]);
    }
    return fe(t, NN);
  }
  function vE(e, t, n) {
    return ZN(t, e.responseState, n.formatContext, n.id), qs(e, t, n), eP(t, n.formatContext);
  }
  function yE(e, t, n) {
    for (var r = n.completedSegments, o = 0; o < r.length; o++)
      VE(e, t, n, r[o]);
    if (r.length = 0, e = e.responseState, r = n.id, n = n.rootSegmentID, I(t, e.startInlineScript), e.sentCompleteBoundaryFunction ? I(t, lP) : (e.sentCompleteBoundaryFunction = true, I(t, iP)), r === null)
      throw Error(W(395));
    return n = Q(n.toString(16)), I(t, r), I(t, aP), I(t, e.segmentPrefix), I(t, n), fe(t, uP);
  }
  function VE(e, t, n, r) {
    if (r.status === 2)
      return true;
    var o = r.id;
    if (o === -1) {
      if ((r.id = n.rootSegmentID) === -1)
        throw Error(W(392));
      return vE(e, t, r);
    }
    return vE(e, t, r), e = e.responseState, I(t, e.startInlineScript), e.sentCompleteSegmentFunction ? I(t, nP) : (e.sentCompleteSegmentFunction = true, I(t, tP)), I(t, e.segmentPrefix), o = Q(o.toString(16)), I(t, o), I(t, rP), I(t, e.placeholderPrefix), I(t, o), fe(t, oP);
  }
  function kh(e, t) {
    Tt = new Uint8Array(512), Ft = 0;
    try {
      var n = e.completedRootSegment;
      if (n !== null && e.pendingRootTasks === 0) {
        qs(e, t, n), e.completedRootSegment = null;
        var r = e.responseState.bootstrapChunks;
        for (n = 0; n < r.length - 1; n++)
          I(t, r[n]);
        n < r.length && fe(t, r[n]);
      }
      var o = e.clientRenderedBoundaries, i;
      for (i = 0; i < o.length; i++) {
        var l = o[i];
        r = t;
        var a = e.responseState, u = l.id, s = l.errorDigest, c = l.errorMessage, d = l.errorComponentStack;
        if (I(r, a.startInlineScript), a.sentClientRenderFunction ? I(r, cP) : (a.sentClientRenderFunction = true, I(r, sP)), u === null)
          throw Error(W(395));
        if (I(r, u), I(r, dP), (s || c || d) && (I(r, uh), I(r, Q(sh(s || "")))), (c || d) && (I(r, uh), I(r, Q(sh(c || "")))), d && (I(r, uh), I(r, Q(sh(d)))), !fe(r, fP)) {
          e.destination = null, i++, o.splice(0, i);
          return;
        }
      }
      o.splice(0, i);
      var p = e.completedBoundaries;
      for (i = 0; i < p.length; i++)
        if (!yE(e, t, p[i])) {
          e.destination = null, i++, p.splice(0, i);
          return;
        }
      p.splice(0, i), QS(t), Tt = new Uint8Array(512), Ft = 0;
      var m = e.partialBoundaries;
      for (i = 0; i < m.length; i++) {
        var y = m[i];
        e: {
          o = e, l = t;
          var w = y.completedSegments;
          for (a = 0; a < w.length; a++)
            if (!VE(o, l, y, w[a])) {
              a++, w.splice(0, a);
              var R = false;
              break e;
            }
          w.splice(0, a), R = true;
        }
        if (!R) {
          e.destination = null, i++, m.splice(0, i);
          return;
        }
      }
      m.splice(0, i);
      var f = e.completedBoundaries;
      for (i = 0; i < f.length; i++)
        if (!yE(e, t, f[i])) {
          e.destination = null, i++, f.splice(0, i);
          return;
        }
      f.splice(0, i);
    } finally {
      QS(t), e.allPendingTasks === 0 && e.pingedTasks.length === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && t.close();
    }
  }
  function gE(e, t) {
    try {
      var n = e.abortableTasks;
      n.forEach(function(r) {
        return bE(r, e, t);
      }), n.clear(), e.destination !== null && kh(e, e.destination);
    } catch (r) {
      ql(e, r), Ys(e, r);
    }
  }
  _h.renderToReadableStream = function(e, t) {
    return new Promise(function(n, r) {
      var o, i, l = new Promise(function(c, d) {
        i = c, o = d;
      }), a = PP(e, cN(t ? t.identifierPrefix : void 0, t ? t.nonce : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), dN(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, i, function() {
        var c = new ReadableStream({ type: "bytes", pull: function(d) {
          if (a.status === 1)
            a.status = 2, EE(d, a.fatalError);
          else if (a.status !== 2 && a.destination === null) {
            a.destination = d;
            try {
              kh(a, d);
            } catch (p) {
              ql(a, p), Ys(a, p);
            }
          }
        }, cancel: function() {
          gE(a);
        } }, { highWaterMark: 0 });
        c.allReady = l, n(c);
      }, function(c) {
        l.catch(function() {
        }), r(c);
      }, o);
      if (t && t.signal) {
        var u = t.signal, s = function() {
          gE(a, u.reason), u.removeEventListener("abort", s);
        };
        u.addEventListener("abort", s);
      }
      BE(a);
    });
  };
  _h.version = "18.2.0";
});
var KE = Ae((wo) => {
  "use strict";
  var Ei, WE;
  Ei = KS(), WE = $E();
  wo.version = Ei.version;
  wo.renderToString = Ei.renderToString;
  wo.renderToStaticMarkup = Ei.renderToStaticMarkup;
  wo.renderToNodeStream = Ei.renderToNodeStream;
  wo.renderToStaticNodeStream = Ei.renderToStaticNodeStream;
  wo.renderToReadableStream = WE.renderToReadableStream;
});
var YE = Ae((Zs) => {
  "use strict";
  var LP = st(), TP = Symbol.for("react.element"), FP = Symbol.for("react.fragment"), OP = Object.prototype.hasOwnProperty, MP = LP.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, AP = { key: true, ref: true, __self: true, __source: true };
  function QE(e, t, n) {
    var r, o = {}, i = null, l = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (l = t.ref);
    for (r in t)
      OP.call(t, r) && !AP.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps)
      for (r in t = e.defaultProps, t)
        o[r] === void 0 && (o[r] = t[r]);
    return { $$typeof: TP, type: e, key: i, ref: l, props: o, _owner: MP.current };
  }
  Zs.Fragment = FP;
  Zs.jsx = QE;
  Zs.jsxs = QE;
});
var ln = Ae((mT, JE) => {
  "use strict";
  JE.exports = YE();
});
var kT = se(Vc(), 1);
var Fv = se(Vc());
function Ov({ build: e, getLoadContext: t, mode: n }) {
  let r = (0, Fv.createRequestHandler)(e, n);
  return async (o) => {
    let i = await t?.(o);
    return r(o.request, i);
  };
}
function $c({ build: e, getLoadContext: t, mode: n }) {
  let r = Ov({ build: e, getLoadContext: t, mode: n }), o = async (i) => {
    let l;
    i.request.headers.delete("if-none-match");
    try {
      l = await i.env.ASSETS.fetch(i.request.url, i.request.clone()), l = l && l.status >= 200 && l.status < 400 ? new Response(l.body, l) : void 0;
    } catch {
    }
    return l || (l = await r(i)), l;
  };
  return async (i) => {
    try {
      return await o(i);
    } catch {
      return new Response("Internal Error", { status: 500 });
    }
  };
}
var Fh = {};
dn(Fh, { assets: () => o1, assetsBuildDirectory: () => HP, entry: () => $P, future: () => BP, mode: () => Th, publicPath: () => VP, routes: () => WP });
var Ch = {};
dn(Ch, { default: () => GE });
Fr();
function ke() {
  return ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ke.apply(this, arguments);
}
var T = se(st());
Fr();
function Or(e, t) {
  if (e === false || e === null || typeof e > "u")
    throw new Error(t);
}
Fr();
async function Tw(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let n = await import(e.module);
    return t[e.id] = n, n;
  } catch (n) {
    if (window.__remixContext.isSpaMode && typeof import.meta.hot < "u")
      throw console.error(`Error loading route module \`${e.module}\`:`, n), n;
    return window.location.reload(), new Promise(() => {
    });
  }
}
function Fw(e, t, n) {
  let r = e.map((i) => {
    var l;
    let a = t[i.route.id], u = n.routes[i.route.id];
    return [u.css ? u.css.map((s) => ({ rel: "stylesheet", href: s })) : [], (a == null || (l = a.links) === null || l === void 0 ? void 0 : l.call(a)) || []];
  }).flat(2), o = G_(e, n);
  return Iw(r, o);
}
function Dp(e) {
  return e != null && typeof e.page == "string";
}
function X_(e) {
  return e == null ? false : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function Ow(e, t, n) {
  let r = await Promise.all(e.map(async (o) => {
    let i = await Tw(t.routes[o.route.id], n);
    return i.links ? i.links() : [];
  }));
  return Iw(r.flat(1).filter(X_).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map((o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }));
}
function Lp(e, t, n, r, o, i) {
  let l = zw(e), a = (c, d) => n[d] ? c.route.id !== n[d].route.id : true, u = (c, d) => {
    var p;
    return n[d].pathname !== c.pathname || ((p = n[d].route.path) === null || p === void 0 ? void 0 : p.endsWith("*")) && n[d].params["*"] !== c.params["*"];
  };
  return i === "data" && o.search !== l.search ? t.filter((c, d) => {
    if (!r.routes[c.route.id].hasLoader)
      return false;
    if (a(c, d) || u(c, d))
      return true;
    if (c.route.shouldRevalidate) {
      var m;
      let y = c.route.shouldRevalidate({ currentUrl: new URL(o.pathname + o.search + o.hash, window.origin), currentParams: ((m = n[0]) === null || m === void 0 ? void 0 : m.params) || {}, nextUrl: new URL(e, window.origin), nextParams: c.params, defaultShouldRevalidate: true });
      if (typeof y == "boolean")
        return y;
    }
    return true;
  }) : t.filter((c, d) => {
    let p = r.routes[c.route.id];
    return (i === "assets" || p.hasLoader) && (a(c, d) || u(c, d));
  });
}
function Mw(e, t, n) {
  let r = zw(e);
  return Tp(t.filter((o) => n.routes[o.route.id].hasLoader).map((o) => {
    let { pathname: i, search: l } = r, a = new URLSearchParams(l);
    return a.set("_data", o.route.id), `${i}?${a}`;
  }));
}
function Aw(e, t) {
  return Tp(e.map((n) => {
    let r = t.routes[n.route.id], o = [r.module];
    return r.imports && (o = o.concat(r.imports)), o;
  }).flat(1));
}
function G_(e, t) {
  return Tp(e.map((n) => {
    let r = t.routes[n.route.id], o = [r.module];
    return r.imports && (o = o.concat(r.imports)), o;
  }).flat(1));
}
function Tp(e) {
  return [...new Set(e)];
}
function q_(e) {
  let t = {}, n = Object.keys(e).sort();
  for (let r of n)
    t[r] = e[r];
  return t;
}
function Iw(e, t) {
  let n = /* @__PURE__ */ new Set(), r = new Set(t);
  return e.reduce((o, i) => {
    if (t && !Dp(i) && i.as === "script" && i.href && r.has(i.href))
      return o;
    let a = JSON.stringify(q_(i));
    return n.has(a) || (n.add(a), o.push({ key: a, link: i })), o;
  }, []);
}
function zw(e) {
  let t = Ee(e);
  return t.search === void 0 && (t.search = ""), t;
}
var Z_ = { "&": "\\u0026", ">": "\\u003e", "<": "\\u003c", "\u2028": "\\u2028", "\u2029": "\\u2029" };
var eC = /[&><\u2028\u2029]/g;
function jl(e) {
  return e.replace(eC, (t) => Z_[t]);
}
function Fp(e) {
  return { __html: e };
}
function jw() {
  let e = T.useContext(Kt);
  return Or(e, "You must render this element inside a <DataRouterContext.Provider> element"), e;
}
function vs() {
  let e = T.useContext(on);
  return Or(e, "You must render this element inside a <DataRouterStateContext.Provider> element"), e;
}
var Hl = T.createContext(void 0);
Hl.displayName = "Remix";
function po() {
  let e = T.useContext(Hl);
  return Or(e, "You must render this element inside a <Remix> element"), e;
}
function bw(e, t) {
  let [n, r] = T.useState(false), [o, i] = T.useState(false), { onFocus: l, onBlur: a, onMouseEnter: u, onMouseLeave: s, onTouchStart: c } = t, d = T.useRef(null);
  T.useEffect(() => {
    if (e === "render" && i(true), e === "viewport") {
      let y = (R) => {
        R.forEach((f) => {
          i(f.isIntersecting);
        });
      }, w = new IntersectionObserver(y, { threshold: 0.5 });
      return d.current && w.observe(d.current), () => {
        w.disconnect();
      };
    }
  }, [e]);
  let p = () => {
    e === "intent" && r(true);
  }, m = () => {
    e === "intent" && (r(false), i(false));
  };
  return T.useEffect(() => {
    if (n) {
      let y = setTimeout(() => {
        i(true);
      }, 100);
      return () => {
        clearTimeout(y);
      };
    }
  }, [n]), [o, d, { onFocus: bl(l, p), onBlur: bl(a, m), onMouseEnter: bl(u, p), onMouseLeave: bl(s, m), onTouchStart: bl(c, p) }];
}
var Hw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Bw = T.forwardRef(({ to: e, prefetch: t = "none", ...n }, r) => {
  let o = typeof e == "string" && Hw.test(e), i = $n(e), [l, a, u] = bw(t, n);
  return T.createElement(T.Fragment, null, T.createElement(kp, ke({}, n, u, { ref: Ww(r, a), to: e })), l && !o ? T.createElement(ys, { page: i }) : null);
});
Bw.displayName = "NavLink";
var Vw = T.forwardRef(({ to: e, prefetch: t = "none", ...n }, r) => {
  let o = typeof e == "string" && Hw.test(e), i = $n(e), [l, a, u] = bw(t, n);
  return T.createElement(T.Fragment, null, T.createElement(ds, ke({}, n, u, { ref: Ww(r, a), to: e })), l && !o ? T.createElement(ys, { page: i }) : null);
});
Vw.displayName = "Link";
function bl(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function Op(e, t, n) {
  if (n && !ms)
    return [e[0]];
  if (t) {
    let r = e.findIndex((o) => t[o.route.id]);
    return e.slice(0, r + 1);
  }
  return e;
}
function Mp() {
  let { isSpaMode: e, manifest: t, routeModules: n, criticalCss: r } = po(), { errors: o, matches: i } = vs(), l = Op(i, o, e), a = T.useMemo(() => Fw(l, n, t), [l, n, t]);
  return T.createElement(T.Fragment, null, r ? T.createElement("style", { dangerouslySetInnerHTML: { __html: r } }) : null, a.map(({ key: u, link: s }) => Dp(s) ? T.createElement(ys, ke({ key: u }, s)) : T.createElement("link", ke({ key: u }, s))));
}
function ys({ page: e, ...t }) {
  let { router: n } = jw(), r = T.useMemo(() => Ce(n.routes, e), [n.routes, e]);
  return r ? T.createElement(nC, ke({ page: e, matches: r }, t)) : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function tC(e) {
  let { manifest: t, routeModules: n } = po(), [r, o] = T.useState([]);
  return T.useEffect(() => {
    let i = false;
    return Ow(e, t, n).then((l) => {
      i || o(l);
    }), () => {
      i = true;
    };
  }, [e, t, n]), r;
}
function nC({ page: e, matches: t, ...n }) {
  let r = De(), { manifest: o } = po(), { matches: i } = vs(), l = T.useMemo(() => Lp(e, t, i, o, r, "data"), [e, t, i, o, r]), a = T.useMemo(() => Lp(e, t, i, o, r, "assets"), [e, t, i, o, r]), u = T.useMemo(() => Mw(e, l, o), [l, e, o]), s = T.useMemo(() => Aw(a, o), [a, o]), c = tC(a);
  return T.createElement(T.Fragment, null, u.map((d) => T.createElement("link", ke({ key: d, rel: "prefetch", as: "fetch", href: d }, n))), s.map((d) => T.createElement("link", ke({ key: d, rel: "modulepreload", href: d }, n))), c.map(({ key: d, link: p }) => T.createElement("link", ke({ key: d }, p))));
}
function Ap() {
  let { isSpaMode: e, routeModules: t } = po(), { errors: n, matches: r, loaderData: o } = vs(), i = De(), l = Op(r, n, e), a = null;
  n && (a = n[l[l.length - 1].route.id]);
  let u = [], s = null, c = [];
  for (let d = 0; d < l.length; d++) {
    let p = l[d], m = p.route.id, y = o[m], w = p.params, R = t[m], f = [], h = { id: m, data: y, meta: [], params: p.params, pathname: p.pathname, handle: p.route.handle, error: a };
    if (c[d] = h, R != null && R.meta ? f = typeof R.meta == "function" ? R.meta({ data: y, params: w, location: i, matches: c, error: a }) : Array.isArray(R.meta) ? [...R.meta] : R.meta : s && (f = [...s]), f = f || [], !Array.isArray(f))
      throw new Error("The route at " + p.route.path + ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`);
    h.meta = f, c[d] = h, u = [...f], s = u;
  }
  return T.createElement(T.Fragment, null, u.flat().map((d) => {
    if (!d)
      return null;
    if ("tagName" in d) {
      let { tagName: p, ...m } = d;
      return rC(p) ? T.createElement(p, ke({ key: JSON.stringify(m) }, m)) : (console.warn(`A meta object uses an invalid tagName: ${p}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in d)
      return T.createElement("title", { key: "title" }, String(d.title));
    if ("charset" in d && (d.charSet ??= d.charset, delete d.charset), "charSet" in d && d.charSet != null)
      return typeof d.charSet == "string" ? T.createElement("meta", { key: "charSet", charSet: d.charSet }) : null;
    if ("script:ld+json" in d)
      try {
        let p = JSON.stringify(d["script:ld+json"]);
        return T.createElement("script", { key: `script:ld+json:${p}`, type: "application/ld+json", dangerouslySetInnerHTML: { __html: p } });
      } catch {
        return null;
      }
    return T.createElement("meta", ke({ key: JSON.stringify(d) }, d));
  }));
}
function rC(e) {
  return typeof e == "string" && /^(meta|link)$/.test(e);
}
function $w(e) {
  return T.createElement(Al, e);
}
var ms = false;
function Bl(e) {
  let { manifest: t, serverHandoffString: n, abortDelay: r, serializeError: o, isSpaMode: i } = po(), { router: l, static: a, staticContext: u } = jw(), { matches: s } = vs(), c = Dr(), d = Op(s, null, i);
  T.useEffect(() => {
    ms = true;
  }, []);
  let p = (k, g) => {
    let _;
    return o && g instanceof Error ? _ = o(g) : _ = g, `${JSON.stringify(k)}:__remixContext.p(!1, ${jl(JSON.stringify(_))})`;
  }, m = (k, g, _) => {
    let P;
    try {
      P = JSON.stringify(_);
    } catch (O) {
      return p(g, O);
    }
    return `${JSON.stringify(g)}:__remixContext.p(${jl(P)})`;
  }, y = (k, g, _) => {
    let P;
    return o && _ instanceof Error ? P = o(_) : P = _, `__remixContext.r(${JSON.stringify(k)}, ${JSON.stringify(g)}, !1, ${jl(JSON.stringify(P))})`;
  }, w = (k, g, _) => {
    let P;
    try {
      P = JSON.stringify(_);
    } catch (O) {
      return y(k, g, O);
    }
    return `__remixContext.r(${JSON.stringify(k)}, ${JSON.stringify(g)}, ${jl(P)})`;
  }, R = [], f = T.useMemo(() => {
    var k;
    let g = u ? `window.__remixContext = ${n};` : " ", _ = u?.activeDeferreds;
    g += _ ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof r == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${r});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(_).map(([O, z]) => {
      let X = new Set(z.pendingKeys), Ue = z.deferredKeys.map((me) => {
        if (X.has(me))
          return R.push(T.createElement(Uw, { key: `${O} | ${me}`, deferredData: z, routeId: O, dataKey: me, scriptProps: e, serializeData: w, serializeError: y })), `${JSON.stringify(me)}:__remixContext.n(${JSON.stringify(O)}, ${JSON.stringify(me)})`;
        {
          let wt = z.data[me];
          return typeof wt._error < "u" ? p(me, wt._error) : m(O, me, wt._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(O)}], {${Ue}});`;
    }).join(`
`) + (R.length > 0 ? `__remixContext.a=${R.length};` : "") : "";
    let P = a ? `${(k = t.hmr) !== null && k !== void 0 && k.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ""}import ${JSON.stringify(t.url)};
${d.map((O, z) => `import * as route${z} from ${JSON.stringify(t.routes[O.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${d.map((O, z) => `${JSON.stringify(O.route.id)}:route${z}`).join(",")}};

import(${JSON.stringify(t.entry.module)});` : " ";
    return T.createElement(T.Fragment, null, T.createElement("script", ke({}, e, { suppressHydrationWarning: true, dangerouslySetInnerHTML: Fp(g), type: void 0 })), T.createElement("script", ke({}, e, { suppressHydrationWarning: true, dangerouslySetInnerHTML: Fp(P), type: "module", async: true })));
  }, []);
  if (!a && typeof __remixContext == "object" && __remixContext.a)
    for (let k = 0; k < __remixContext.a; k++)
      R.push(T.createElement(Uw, { key: k, scriptProps: e, serializeData: w, serializeError: y }));
  let h = T.useMemo(() => {
    if (c.location) {
      let k = Ce(l.routes, c.location);
      return Or(k, `No routes match path "${c.location.pathname}"`), k;
    }
    return [];
  }, [c.location, l.routes]), v = d.concat(h).map((k) => {
    let g = t.routes[k.route.id];
    return (g.imports || []).concat([g.module]);
  }).flat(1), E = ms ? [] : t.entry.imports.concat(v);
  return ms ? null : T.createElement(T.Fragment, null, T.createElement("link", { rel: "modulepreload", href: t.url, crossOrigin: e.crossOrigin }), T.createElement("link", { rel: "modulepreload", href: t.entry.module, crossOrigin: e.crossOrigin }), iC(E).map((k) => T.createElement("link", { key: k, rel: "modulepreload", href: k, crossOrigin: e.crossOrigin })), f, R);
}
function Uw({ dataKey: e, deferredData: t, routeId: n, scriptProps: r, serializeData: o, serializeError: i }) {
  return typeof document > "u" && t && e && n && Or(t.pendingKeys.includes(e), `Deferred data for route ${n} with key ${e} was not pending but tried to render a script for it.`), T.createElement(T.Suspense, { fallback: typeof document > "u" && t && e && n ? null : T.createElement("script", ke({}, r, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: " " } })) }, typeof document > "u" && t && e && n ? T.createElement($w, { resolve: t.data[e], errorElement: T.createElement(oC, { dataKey: e, routeId: n, scriptProps: r, serializeError: i }), children: (l) => T.createElement("script", ke({}, r, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: o(n, e, l) } })) }) : T.createElement("script", ke({}, r, { async: true, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: " " } })));
}
function oC({ dataKey: e, routeId: t, scriptProps: n, serializeError: r }) {
  let o = hi();
  return T.createElement("script", ke({}, n, { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: r(t, e, o) } }));
}
function iC(e) {
  return [...new Set(e)];
}
function Ip() {
  return Ol();
}
var zp = () => null;
function Ww(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var $e = se(st());
Fr();
var gs = class extends $e.Component {
  constructor(t) {
    super(t), this.state = { error: t.error || null, location: t.location };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ? { error: t.error || null, location: t.location } : { error: t.error || n.error, location: n.location };
  }
  render() {
    return this.state.error ? $e.createElement(Up, { error: this.state.error }) : this.props.children;
  }
};
function Up({ error: e }) {
  if (console.error(e), Ne(e))
    return $e.createElement(Kw, { title: "Unhandled Thrown Response!" }, $e.createElement("h1", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, e.status, " ", e.statusText));
  let t;
  if (e instanceof Error)
    t = e;
  else {
    let n = e == null ? "Unknown Error" : typeof e == "object" && "toString" in e ? e.toString() : JSON.stringify(e);
    t = new Error(n);
  }
  return $e.createElement(Kw, { title: "Application Error!" }, $e.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, $e.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"), $e.createElement("pre", { style: { padding: "2rem", background: "hsla(10, 50%, 50%, 0.1)", color: "red", overflow: "auto" } }, t.stack)));
}
function Kw({ title: e, children: t }) {
  return $e.createElement("html", { lang: "en" }, $e.createElement("head", null, $e.createElement("meta", { charSet: "utf-8" }), $e.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" }), $e.createElement("title", null, e)), $e.createElement("body", null, t, $e.createElement("script", { dangerouslySetInnerHTML: { __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            ` } })));
}
var Yw = se(st());
Fr();
var Mr = se(st());
function Qw() {
  return Mr.createElement("html", { lang: "en" }, Mr.createElement("head", null, Mr.createElement("meta", { charSet: "utf-8" }), Mr.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" })), Mr.createElement("body", null, Mr.createElement(Bl, null), Mr.createElement("script", { dangerouslySetInnerHTML: { __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            ` } }), " "));
}
function lC(e) {
  let t = {};
  return Object.values(e).forEach((n) => {
    let r = n.parentId || "";
    t[r] || (t[r] = []), t[r].push(n);
  }), t;
}
function jp(e, t, n, r, o = "", i = lC(e), l = Promise.resolve({ Component: () => null })) {
  return (i[o] || []).map((a) => {
    let u = t[a.id];
    Or(u, "No `routeModule` available to create server routes");
    let s = { caseSensitive: a.caseSensitive, Component: aC(u), HydrateFallback: u.HydrateFallback && (!r || a.id === "root") ? u.HydrateFallback : a.id === "root" ? Qw : void 0, ErrorBoundary: u.ErrorBoundary ? u.ErrorBoundary : a.id === "root" ? () => Yw.createElement(Up, { error: fo() }) : void 0, id: a.id, index: a.index, path: a.path, handle: u.handle, lazy: r && a.id !== "root" ? () => l : void 0, loader: a.hasLoader || a.hasClientLoader ? () => null : void 0 }, c = jp(e, t, n, r, a.id, i, l);
    return c.length > 0 && (s.children = c), s;
  });
}
function aC(e) {
  if (e.default == null)
    return;
  if (!(typeof e.default == "object" && Object.keys(e.default).length === 0))
    return e.default;
}
function Jw(e, t, n) {
  return n && e.id !== "root" || t.clientLoader != null && (t.clientLoader.hydrate === true || e.hasLoader !== true);
}
var ws = se(st());
Fr();
var Xw = "positions";
function bp({ getKey: e, ...t }) {
  let { isSpaMode: n } = po(), r = De(), o = Lr();
  hs({ getKey: e, storageKey: Xw });
  let i = ws.useMemo(() => {
    if (!e)
      return null;
    let a = e(r, o);
    return a !== r.key ? a : null;
  }, []);
  if (n)
    return null;
  let l = ((a, u) => {
    if (!window.history.state || !window.history.state.key) {
      let s = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: s }, "");
    }
    try {
      let c = JSON.parse(sessionStorage.getItem(a) || "{}")[u || window.history.state.key];
      typeof c == "number" && window.scrollTo(0, c);
    } catch (s) {
      console.error(s), sessionStorage.removeItem(a);
    }
  }).toString();
  return ws.createElement("script", ke({}, t, { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: `(${l})(${JSON.stringify(Xw)}, ${JSON.stringify(i)})` } }));
}
var Ss = se(st());
var Es = se(eS());
function Bp({ context: e, url: t, abortDelay: n }) {
  typeof t == "string" && (t = new URL(t));
  let { manifest: r, routeModules: o, criticalCss: i, serverHandoffString: l } = e, a = jp(r.routes, o, e.future, e.isSpaMode);
  e.staticHandlerContext.loaderData = { ...e.staticHandlerContext.loaderData };
  for (let s of e.staticHandlerContext.matches) {
    let c = s.route.id, d = o[c], p = e.manifest.routes[c];
    d && Jw(p, d, e.isSpaMode) && (d.HydrateFallback || !p.hasLoader) && (e.staticHandlerContext.loaderData[c] = void 0);
  }
  let u = (0, Es.createStaticRouter)(a, e.staticHandlerContext, { future: { v7_partialHydration: true, v7_relativeSplatPath: e.future.v3_relativeSplatPath } });
  return Ss.createElement(Hl.Provider, { value: { manifest: r, routeModules: o, criticalCss: i, serverHandoffString: l, future: e.future, isSpaMode: e.isSpaMode, serializeError: e.serializeError, abortDelay: n } }, Ss.createElement(gs, { location: u.state.location }, Ss.createElement(Es.StaticRouterProvider, { router: u, context: e.staticHandlerContext, hydrate: false })));
}
var SC = " daum[ /]| deusu/| yadirectfetcher|(?:^| )site|(?:^|[^g])news|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bot(?:[^\\w]|_|$)|(?<! ya(?:yandex)?)search|(?<!(?:lib))http|(?<![hg]m)score|@[a-z]|\\(at\\)[a-z]|\\[at\\][a-z]|^12345|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(\\.\\d+)?(?:\\.\\d{1,10})?)?(?:,|$)|^[^ ]{50,}$|^active|^ad muncher|^amaya|^anglesharp/|^avsdevicesdk/|^bidtellect/|^biglotron|^bot|^btwebclient/|^clamav[ /]|^client/|^cobweb/|^coccoc|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^fdm[ /]\\d|^getright/|^gozilla/|^hatena|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^linkdex|^metauri|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^nuclei|^offline explorer|^php|^postman|^postrank|^python|^rank|^read|^reed|^rest|^serf|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^tumblr/|^user-agent:|^valid|^venus/fedoraplanet|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|adbeat\\.com|appinsights|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check|chrome-lighthouse|chromeframe|classifier|cloud|crawl|cryptoapi|dareboost|datanyze|dataprovider|dejaclick|dmbrowser|download|evc-batch/|feed|firephp|freesafeip|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|inspect|iplabel|ips-agent|java(?!;)|library|mail\\.ru/|manager|monitor|neustar wpm|nutch|offbyone|optimize|pageburst|parser|perl|phantom|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reader|reputation|resolver|retriever|rexx;|rigor|robot|rss|scan|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|stumbleupon\\.com|supercleaner|synapse|synthetic|torrent|trace|transcoder|twingly recon|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|wordpress|zgrab";
var EC = /bot|spider|crawl|http|lighthouse/i;
var Rs;
function tS(e) {
  if (typeof Rs > "u")
    try {
      Rs = new RegExp(SC, "i");
    } catch {
      Rs = EC;
    }
  return Boolean(e) && Rs.test(e);
}
var XE = se(KE(), 1);
var qE = se(ln(), 1);
async function GE(e, t, n, r, o) {
  let i = await (0, XE.renderToReadableStream)((0, qE.jsx)(Bp, { context: r, url: e.url }), { signal: e.signal, onError(l) {
    console.error(l), t = 500;
  } });
  return tS(e.headers.get("user-agent") || "") && await i.allReady, n.set("Content-Type", "text/html"), new Response(i, { headers: n, status: t });
}
var Nh = {};
dn(Nh, { default: () => e1, links: () => IP });
var Mt = se(ln(), 1);
var IP = () => [...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []];
function e1() {
  return (0, Mt.jsxs)("html", { lang: "en", children: [(0, Mt.jsxs)("head", { children: [(0, Mt.jsx)("meta", { charSet: "utf-8" }), (0, Mt.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), (0, Mt.jsx)(Ap, {}), (0, Mt.jsx)(Mp, {})] }), (0, Mt.jsxs)("body", { children: [(0, Mt.jsx)(vi, {}), (0, Mt.jsx)(bp, {}), (0, Mt.jsx)(Bl, {}), (0, Mt.jsx)(zp, {})] })] });
}
var Ph = {};
dn(Ph, { default: () => t1, meta: () => zP });
var an = se(ln(), 1);
var zP = () => [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
function t1() {
  return (0, an.jsxs)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [(0, an.jsx)("h1", { children: "Welcome to Remix" }), (0, an.jsxs)("ul", { children: [(0, an.jsx)("li", { children: (0, an.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "15m Quickstart Blog Tutorial" }) }), (0, an.jsx)("li", { children: (0, an.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }) }), (0, an.jsx)("li", { children: (0, an.jsx)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })] })] });
}
var Dh = {};
dn(Dh, { default: () => n1, meta: () => UP });
var un = se(ln(), 1);
var UP = () => [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
function n1() {
  return (0, un.jsxs)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [(0, un.jsx)("h1", { children: "Welcome to Remix" }), (0, un.jsxs)("ul", { children: [(0, un.jsx)("li", { children: (0, un.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "15m Quickstart Blog Tutorial" }) }), (0, un.jsx)("li", { children: (0, un.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }) }), (0, un.jsx)("li", { children: (0, un.jsx)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })] })] });
}
var Lh = {};
dn(Lh, { default: () => r1, loader: () => jP, meta: () => bP });
var sn = se(ln(), 1);
var jP = async ({ context: e, params: t }) => {
  let n = e.env, { results: r } = await n.DB.prepare("SELECT * FROM anime LIMIT 5").all();
  return r;
};
var bP = () => [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
function r1() {
  let e = Ip();
  return (0, sn.jsxs)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [(0, sn.jsx)("h1", { children: "Welcome to Remix" }), (0, sn.jsxs)("ul", { children: [(0, sn.jsx)("li", { children: (0, sn.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "15m Quickstart Blog Tutorial" }) }), (0, sn.jsx)("li", { children: (0, sn.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }) }), (0, sn.jsx)("li", { children: (0, sn.jsx)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })] })] });
}
var o1 = { entry: { module: "/build/entry.client-5BBKBH5F.js", imports: ["/build/_shared/chunk-SXARF5YU.js", "/build/_shared/chunk-DWFMXSZ6.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-C5WYDA7T.js", imports: void 0, hasAction: false, hasLoader: false, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: true, caseSensitive: void 0, module: "/build/routes/_index-U2SHERNZ.js", imports: void 0, hasAction: false, hasLoader: true, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false }, "routes/anime.$mal": { id: "routes/anime.$mal", parentId: "root", path: "anime/:mal", index: void 0, caseSensitive: void 0, module: "/build/routes/anime.$mal-4HQKJCFX.js", imports: void 0, hasAction: false, hasLoader: false, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false }, "routes/anime._index": { id: "routes/anime._index", parentId: "root", path: "anime", index: true, caseSensitive: void 0, module: "/build/routes/anime._index-73ZPTJX3.js", imports: void 0, hasAction: false, hasLoader: false, hasClientAction: false, hasClientLoader: false, hasErrorBoundary: false } }, version: "823520e0", hmr: void 0, url: "/build/manifest-823520E0.js" };
var Th = "production";
var HP = "public/build";
var BP = { v3_fetcherPersist: false, v3_relativeSplatPath: false, v3_throwAbortReason: false };
var VP = "/build/";
var $P = { module: Ch };
var WP = { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: Nh }, "routes/anime._index": { id: "routes/anime._index", parentId: "root", path: "anime", index: true, caseSensitive: void 0, module: Ph }, "routes/anime.$mal": { id: "routes/anime.$mal", parentId: "root", path: "anime/:mal", index: void 0, caseSensitive: void 0, module: Dh }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: true, caseSensitive: void 0, module: Lh } };
var NT = $c({ build: Fh, getLoadContext: (e) => ({ env: e.env }), mode: Th });

// ../.wrangler/tmp/pages-UPe71I/functionsRoutes-0.9505035382178273.mjs
var routes = [
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [NT]
  }
];

// ../node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j2 = i + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j2++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i + 1;
      if (str[j2] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j2));
      }
      while (j2 < str.length) {
        if (str[j2] === "\\") {
          pattern += str[j2++] + str[j2++];
          continue;
        }
        if (str[j2] === ")") {
          count--;
          if (count === 0) {
            j2++;
            break;
          }
        } else if (str[j2] === "(") {
          count++;
          if (str[j2 + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j2));
          }
        }
        pattern += str[j2++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re2 = pathToRegexp(str, keys, options);
  return regexpToFunction(re2, keys, options);
}
function regexpToFunction(re2, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re2.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// ../.wrangler/tmp/bundle-fIIybq/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...pages_template_worker_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...pages_template_worker_default.middleware ? pages_template_worker_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// ../.wrangler/tmp/bundle-fIIybq/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@remix-run/server-runtime/dist/esm/warnings.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/cookies.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/formData.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/mode.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/errors.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/entry.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/headers.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/invariant.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routeMatching.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/data.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routes.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/markup.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/serverHandoff.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/dev.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/server.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/errors.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/crypto.js:
  (**
   * @remix-run/cloudflare v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/implementations.js:
  (**
   * @remix-run/cloudflare v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/sessions/workersKVStorage.js:
  (**
   * @remix-run/cloudflare v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/index.js:
  (**
   * @remix-run/cloudflare v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/index.js:
  (**
   * React Router v6.22.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.22.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/cloudflare-pages/dist/esm/worker.js:
  (**
   * @remix-run/cloudflare-pages v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare-pages/dist/esm/index.js:
  (**
   * @remix-run/cloudflare-pages v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fallback.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=functionsWorker-0.3985698138583069.mjs.map
