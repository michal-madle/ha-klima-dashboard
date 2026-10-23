const T = globalThis, I = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = /* @__PURE__ */ Symbol(), K = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (I && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (o) => new ot(typeof o == "string" ? o : o + "", void 0, j), ft = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new ot(e, o, j);
}, $t = (o, t) => {
  if (I) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = T.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, G = I ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return mt(e);
})(o) : o;
const { is: gt, defineProperty: _t, getOwnPropertyDescriptor: vt, getOwnPropertyNames: yt, getOwnPropertySymbols: wt, getPrototypeOf: bt } = Object, R = globalThis, J = R.trustedTypes, xt = J ? J.emptyScript : "", At = R.reactiveElementPolyfillSupport, E = (o, t) => o, L = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? xt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (o, t) => !gt(o, t), Y = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), R.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && _t(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s?.call(this);
      r?.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, i = [...yt(e), ...wt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(G(s));
    } else t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $t(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : L).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : L;
      this._$Em = s;
      const l = n.fromAttribute(e, r.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? at)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: n } = r, l = this[s];
        n !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[E("elementProperties")] = /* @__PURE__ */ new Map(), b[E("finalized")] = /* @__PURE__ */ new Map(), At?.({ ReactiveElement: b }), (R.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, Q = (o) => o, H = W.trustedTypes, X = H ? H.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, lt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + _, St = `<${ht}>`, w = document, k = () => w.createComment(""), M = (o) => o === null || typeof o != "object" && typeof o != "function", V = Array.isArray, Et = (o) => V(o) || typeof o?.[Symbol.iterator] == "function", D = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, v = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, st = /"/g, ct = /^(?:script|style|textarea|title)$/i, Ct = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), u = Ct(1), x = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), y = w.createTreeWalker(w, 129);
function dt(o, t) {
  if (!V(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const kt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = S;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let h, p, c = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, p = n.exec(a), p !== null); ) f = n.lastIndex, n === S ? p[1] === "!--" ? n = tt : p[1] !== void 0 ? n = et : p[2] !== void 0 ? (ct.test(p[2]) && (s = RegExp("</" + p[2], "g")), n = v) : p[3] !== void 0 && (n = v) : n === v ? p[0] === ">" ? (n = s ?? S, c = -1) : p[1] === void 0 ? c = -2 : (c = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? v : p[3] === '"' ? st : it) : n === st || n === it ? n = v : n === tt || n === et ? n = S : (n = v, s = void 0);
    const $ = n === v && o[l + 1].startsWith("/>") ? " " : "";
    r += n === S ? a + St : c >= 0 ? (i.push(h), a.slice(0, c) + lt + a.slice(c) + _ + $) : a + _ + (c === -2 ? l : $);
  }
  return [dt(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, p] = kt(t, e);
    if (this.el = P.createElement(h, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = y.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(lt)) {
          const f = p[n++], $ = s.getAttribute(c).split(_), g = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: g[2], strings: $, ctor: g[1] === "." ? Pt : g[1] === "?" ? Ut : g[1] === "@" ? Ot : z }), s.removeAttribute(c);
        } else c.startsWith(_) && (a.push({ type: 6, index: r }), s.removeAttribute(c));
        if (ct.test(s.tagName)) {
          const c = s.textContent.split(_), f = c.length - 1;
          if (f > 0) {
            s.textContent = H ? H.emptyScript : "";
            for (let $ = 0; $ < f; $++) s.append(c[$], k()), y.nextNode(), a.push({ type: 2, index: ++r });
            s.append(c[f], k());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ht) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(_, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = w.createElement("template");
    return i.innerHTML = t, i;
  }
}
function A(o, t, e = o, i) {
  if (t === x) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = M(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = A(o, s._$AS(o, t.values), s, i)), t;
}
class Mt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? w).importNode(e, !0);
    y.currentNode = s;
    let r = y.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new U(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Tt(r, this, t)), this._$AV.push(h), a = i[++l];
      }
      n !== a?.index && (r = y.nextNode(), n++);
    }
    return y.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = A(this, t, e), M(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = P.createElement(dt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new Mt(s, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    V(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new U(this.O(k()), this.O(k()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Q(t).nextSibling;
      Q(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = A(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = A(this, l[i + a], e, a), h === x && (h = this._$AH[a]), n ||= !M(h) || h !== this._$AH[a], h === m ? t = m : t !== m && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Ut extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Ot extends z {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = A(this, t, e, 0) ?? m) === x) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const Ht = W.litHtmlPolyfillSupport;
Ht?.(P, U), (W.litHtmlVersions ??= []).push("3.3.3");
const Rt = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = s = new U(t.insertBefore(k(), r), r, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
const q = globalThis;
class C extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
C._$litElement$ = !0, C.finalized = !0, q.litElementHydrateSupport?.({ LitElement: C });
const zt = q.litElementPolyfillSupport;
zt?.({ LitElement: C });
(q.litElementVersions ??= []).push("4.2.2");
const Ft = "input_select.house_mode", d = {
  open: "#D8D8DC",
  closed: "#6B6B70",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  cold: "#64D2FF",
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2"
}, nt = {
  humidity_min: 35,
  humidity_max: 70,
  co2_warning: 1e3,
  co2_critical: 1500,
  pm25_warning: 15,
  pm25_critical: 35,
  winter_min: 20,
  winter_max: 24,
  summer_min: 21,
  summer_max: 25
}, Nt = {
  off: d.off,
  cool: d.cool,
  wind_free: d.cool,
  dry: d.dry,
  fan: d.plan,
  heat: d.heat,
  auto: d.auto,
  unknown: d.off
}, Dt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, Z = class Z extends C {
  setConfig(t) {
    if (!t || !Array.isArray(t.rooms) || t.rooms.length === 0)
      throw new Error("Klima Dashboard requires a non-empty rooms list.");
    if (t.house_mode_entity !== void 0 && (typeof t.house_mode_entity != "string" || !t.house_mode_entity.trim()))
      throw new Error("house_mode_entity must be a non-empty entity ID.");
    for (const i of t.rooms)
      if (!i || typeof i.name != "string" || !i.name.trim())
        throw new Error("Each Klima Dashboard room requires a name.");
    for (const [i, s] of Object.entries(t.thresholds ?? {}))
      if (typeof s != "number" || !Number.isFinite(s))
        throw new Error(`Threshold "${i}" must be a finite number.`);
    const e = { ...nt, ...t.thresholds };
    if (e.humidity_min >= e.humidity_max || e.co2_warning >= e.co2_critical || e.pm25_warning >= e.pm25_critical || e.winter_min > e.winter_max || e.summer_min > e.summer_max)
      throw new Error("Threshold ranges must be in ascending order.");
    this._config = t;
  }
  set hass(t) {
    this._hass = t, this.requestUpdate();
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 4;
  }
  render() {
    if (!this._config)
      return m;
    const t = this.entityState(this._config.house_mode_entity ?? Ft)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", s = { ...nt, ...this._config.thresholds };
    return u`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          <div class="rooms">
            ${this._config.rooms.map(
      (r) => this.renderRoom(r, e, i, s)
    )}
          </div>
        </div>
      </ha-card>
    `;
  }
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const e = this.reading(t.temperature, "°C", 1), i = this.reading(t.minimum, "°C", 1), s = this.reading(t.maximum, "°C", 1), r = this.reading(t.rain_probability, "%", 0), n = this.reading(t.pm25, "µg/m³", 0), l = [i.text, s.text].filter((h) => h !== void 0).join("–"), a = [
      e.text,
      l || void 0,
      r.text ? `Déšť ${r.text}` : void 0,
      n.text ? `PM2.5 ${n.text}` : void 0
    ].filter((h) => !!h);
    return a.length > 0 ? u`<div class="outside">${a.map((h) => u`<span>${h}</span>`)}</div>` : m;
  }
  renderRoom(t, e, i, s) {
    const r = this.reading(t.temperature, "°C", 1), n = this.reading(t.humidity, "%", 0), l = this.reading(t.carbon_dioxide, "ppm", 0), a = this.reading(t.pm25, "µg/m³", 0), h = this.roomStatus(
      r.value,
      n.value,
      l.value,
      a.value,
      e,
      i,
      s
    ), p = e;
    return u`
      <article
        class="room"
        role="button"
        tabindex=${t.temperature ? "0" : "-1"}
        aria-disabled=${!t.temperature}
        aria-label="${t.name}: otevřít detail teploty"
        @click=${() => this.showMoreInfo(t.temperature)}
        @keydown=${(c) => this.handleRoomKeydown(c, t.temperature)}
      >
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${h.kind === "unknown" ? `border: 1.5px solid ${d.off}` : `background: ${h.color}`}
          ></span>
          <span style=${`color: ${h.color}; font-weight: ${h.kind === "normal" ? 400 : 500}`}>
            ${h.label}
          </span>
        </div>
        <div class="measurements">
          <span class="temperature">
            ${r.value === void 0 ? u`<span class="missing">––</span>` : u`${this.formatOne(r.value)}<span class="temperature-unit">
                  &nbsp;°C
                </span>`}
          </span>
          <span class="humidity">
            ${n.value === void 0 ? u`<span class="missing">––</span>` : u`${Math.round(n.value)}&nbsp;%`}
          </span>
        </div>
        <div class="air">
          ${this.renderAirRow(
      "mdi:molecule-co2",
      "CO₂",
      l,
      "ppm",
      s.co2_warning,
      s.co2_critical
    )}
          ${this.renderAirRow(
      "mdi:blur",
      "PM2.5",
      a,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical
    )}
        </div>
        <div class="lower">
          <div class="system-list">
            ${p ? this.renderSamsung(t.samsung, !0) : this.renderTado(t.tado, !0)}
            ${p ? this.renderTado(t.tado, !1) : this.renderSamsung(t.samsung, !1)}
            ${this.renderWindow(t.window)}
          </div>
          ${t.cover ? this.renderCover(t.cover) : u`<div class="cover-placeholder"></div>`}
        </div>
      </article>
    `;
  }
  renderAirRow(t, e, i, s, r, n) {
    const l = i.value === void 0 ? d.label : i.value >= n ? d.alert : i.value >= r ? d.warning : d.white;
    return u`
      <div class="air-row">
        <ha-icon icon=${t}></ha-icon>
        <span class="air-label">${e}</span>
        ${i.value === void 0 ? u`<span style=${`color: ${d.label}`}>––</span>` : u`<span style=${`color: ${l}`}>${Math.round(i.value)}</span>
              <span class="air-value-unit">${s}</span>`}
      </div>
    `;
  }
  renderTado(t, e) {
    const i = this.entityState(t?.climate)?.toLowerCase(), s = this.entityState(t?.overlay)?.toLowerCase(), r = s === void 0 || this.isUnavailable(s), n = i === "off" || s === "off", l = this.numberState(t?.heating), a = this.numberState(t?.target);
    let h = "––", p = d.label, c = !1, f = "";
    n ? (h = "Vypnuto", p = d.off) : !r && (i === void 0 || this.isUnavailable(i)) ? h = "––" : s === "schedule" ? (h = "Plán", p = d.plan, c = !0, a !== void 0 && (f = `· ${this.formatHalf(a)} °C`)) : s === "manual" ? (h = "Ručně", p = d.warning, c = !0, a !== void 0 && (f = `· ${this.formatHalf(a)} °C`)) : !r && s && (h = s, p = d.warning, c = !0);
    const $ = n || r ? 0 : this.heatingWaveCount(l);
    return this.renderSystemRow(
      this.renderTadoWaves($, r),
      h,
      p,
      e && c,
      f,
      e
    );
  }
  renderSamsung(t, e) {
    const i = this.getState(t);
    let s = "unknown", r;
    if (i && !this.isUnavailable(i.state.toLowerCase())) {
      const c = i.state.toLowerCase(), f = String(i.attributes.preset_mode ?? "none").toLowerCase();
      c === "off" ? s = "off" : c === "cool" ? s = f === "wind_free" || f === "wind_free_sleep" ? "wind_free" : "cool" : c === "dry" ? s = "dry" : c === "fan_only" ? s = "fan" : c === "heat" ? s = "heat" : c === "auto" ? s = "auto" : c !== "unknown" && c !== "unavailable" && (s = "unknown"), r = this.numberAttribute(i.attributes.temperature);
    }
    const n = Nt[s], l = Dt[s], h = ["cool", "wind_free", "dry", "heat", "auto"].includes(s) && r !== void 0 ? `· ${this.formatHalf(r)} °C` : "", p = s !== "off" && s !== "unknown";
    return this.renderSystemRow(
      this.renderSamsungIcon(s, n, s === "unknown"),
      l,
      n,
      e && p,
      h,
      e
    );
  }
  renderSystemRow(t, e, i, s, r, n) {
    return u`
      <div
        class="system-row ${n ? "primary" : ""} ${s ? "strong" : ""}"
        style=${`--row-color: ${i}`}
      >
        <span class="system-icon">${t}</span>
        <span class="system-text">${e}</span>
        ${r ? u`<span class="system-extra">${r}</span>` : m}
      </div>
    `;
  }
  renderTadoWaves(t, e) {
    return u`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.8"
        stroke-linecap="round"
        aria-hidden="true"
      >
        ${[0, 1, 2].map(
      (i) => u`<path
            d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
            stroke=${i < t ? d.warning : d.off}
            stroke-dasharray=${e ? "1.6 2.6" : m}
          ></path>`
    )}
      </svg>
    `;
  }
  renderSamsungIcon(t, e, i) {
    let s;
    const r = u`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = u`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
    switch (t) {
      case "cool":
      case "wind_free":
        s = u`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${r}</g>
          <g transform="rotate(120 12 12)">${r}</g>`;
        break;
      case "dry":
        s = u`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        s = u`${n}<g transform="rotate(120 12 12)">${n}</g>
          <g transform="rotate(240 12 12)">${n}</g>`;
        break;
      case "heat":
        s = u`<circle cx="12" cy="12" r="4"></circle>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (l) => u`<path d="M12 3v2.5" transform=${`rotate(${45 * l} 12 12)`}></path>`
        )}`;
        break;
      case "auto":
        s = u`<circle cx="12" cy="12" r="9"></circle>
          <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
        break;
      case "off":
        s = u`<path d="M12 3.5v8"></path><path d="M7.4 6.4a7.5 7.5 0 1 0 9.2 0"></path>`;
        break;
      default:
        s = u`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
          <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
    }
    return u`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke=${e}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=${i ? "2 2.4" : m}
        aria-hidden="true"
      >
        ${s}
      </svg>
    `;
  }
  renderWindow(t) {
    const e = this.entityState(t)?.toLowerCase(), i = e === void 0 || this.isUnavailable(e), s = e === "on", r = i ? d.label : s ? d.alert : d.label, n = i ? "––" : s ? "Otevřeno" : "Zavřeno";
    return u`
      <div
        class="system-row window-row"
        style=${`--row-color: ${r}`}
      >
        <span class="system-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke=${i ? d.off : r}
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray=${i ? "2 2.4" : m}
            aria-hidden="true"
          >
            <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
            <path d="M12 3.5v17M5 12h14"></path>
          </svg>
        </span>
        <span class="system-text">${n}</span>
      </div>
    `;
  }
  renderCover(t) {
    const e = this.getState(t), i = this.numberAttribute(e?.attributes.current_position), s = this.numberAttribute(e?.attributes.current_tilt_position), r = 26, n = 8, l = 78, a = 4, h = 11, p = i === void 0 ? void 0 : (100 - i) / 100 * l, c = s === void 0 ? void 0 : (100 - s) / 100 * l, f = 2 * l / (2 * h - 1), $ = f / 7, g = f - $;
    let F = 0;
    return u`
      <div class="cover" aria-label="Poloha a naklopení žaluzie">
        <svg
          viewBox="0 0 ${2 * r + n} ${l}"
          role="img"
          aria-hidden="true"
        >
          ${p === void 0 ? u`<rect
                x="0.75"
                y="0.75"
                width=${r - 1.5}
                height=${l - 1.5}
                rx=${a}
                fill="none"
                stroke=${d.off}
                stroke-width="1.5"
                stroke-dasharray="3 3"
              ></rect>` : u`<rect
                  x="0"
                  y="0"
                  width=${r}
                  height=${l}
                  rx=${a}
                  fill=${d.open}
                ></rect>
                ${p >= l - 0.5 ? u`<rect
                      x="0"
                      y="0"
                      width=${r}
                      height=${l}
                      rx=${a}
                      fill=${d.closed}
                    ></rect>` : p > 0.5 ? u`<path
                        d=${`M0 ${Math.min(a, p)} A${Math.min(a, p)} ${Math.min(a, p)} 0 0 1 ${Math.min(a, p)} 0 H${r - Math.min(a, p)} A${Math.min(a, p)} ${Math.min(a, p)} 0 0 1 ${r} ${Math.min(a, p)} V${p.toFixed(2)} H0 Z`}
                        fill=${d.closed}
                      ></path>` : m}`}
          ${c === void 0 ? u`<rect
                x=${r + n + 0.75}
                y="0.75"
                width=${r - 1.5}
                height=${l - 1.5}
                rx=${a}
                fill="none"
                stroke=${d.off}
                stroke-width="1.5"
                stroke-dasharray="3 3"
              ></rect>` : Array.from({ length: h }, (Lt, N) => {
      const O = $ + (g - $) * N / (h - 1), pt = F + O / 2 <= c ? d.closed : d.open, ut = u`<rect
                  x=${r + n}
                  y=${F.toFixed(2)}
                  width=${r}
                  height=${O.toFixed(2)}
                  rx=${Math.min(a, O / 2).toFixed(2)}
                  fill=${pt}
                ></rect>`;
      return N < h - 1 && (F += O + g - (g - $) * N / (h - 2)), ut;
    })}
        </svg>
      </div>
    `;
  }
  roomStatus(t, e, i, s, r, n, l) {
    if (t === void 0 || e === void 0 || i === void 0 || s === void 0 || !n)
      return { label: "Bez dat", color: d.label, kind: "unknown" };
    if (s >= l.pm25_critical)
      return { label: "Znečištěný vzduch", color: d.alert, kind: "critical" };
    if (i >= l.co2_critical)
      return { label: "Silně vydýchaný vzduch", color: d.alert, kind: "critical" };
    if (i >= l.co2_warning)
      return { label: "Vydýchaný vzduch", color: d.warning, kind: "warning" };
    if (e > l.humidity_max)
      return { label: "Vlhko", color: d.warning, kind: "warning" };
    if (e < l.humidity_min)
      return { label: "Sucho", color: d.warning, kind: "warning" };
    const a = r ? l.summer_min : l.winter_min, h = r ? l.summer_max : l.winter_max;
    return t > h ? { label: "Teplo", color: d.warning, kind: "warning" } : t < a ? { label: "Chladno", color: d.cold, kind: "warning" } : { label: "Příjemné", color: d.label, kind: "normal" };
  }
  reading(t, e, i) {
    const s = this.getState(t), r = this.numberState(t);
    if (r === void 0)
      return {};
    const n = String(s?.attributes.unit_of_measurement ?? e);
    return {
      value: r,
      text: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: i }).format(r)} ${n}`
    };
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || this.isUnavailable(e.toLowerCase()))
      return;
    const i = Number.parseFloat(e);
    return Number.isFinite(i) ? i : void 0;
  }
  getState(t) {
    return t ? this._hass?.states[t] : void 0;
  }
  entityState(t) {
    return this.getState(t)?.state;
  }
  isUnavailable(t) {
    return t === "" || t === "unknown" || t === "unavailable" || t === "none";
  }
  numberAttribute(t) {
    if (t == null || t === "")
      return;
    const e = typeof t == "number" ? t : Number.parseFloat(String(t));
    return Number.isFinite(e) && e >= 0 && e <= 100 ? e : void 0;
  }
  formatOne(t) {
    return new Intl.NumberFormat("cs-CZ", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(t);
  }
  formatHalf(t) {
    return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
      Math.round(t * 2) / 2
    );
  }
  heatingWaveCount(t) {
    return t === void 0 || t <= 0 ? 0 : t <= 34 ? 1 : t <= 67 ? 2 : 3;
  }
  showMoreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  handleRoomKeydown(t, e) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.showMoreInfo(e));
  }
};
Z.styles = ft`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card {
      overflow: visible;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .dashboard {
      display: grid;
      gap: 12px;
    }

    .dashboard-header {
      padding: 0 4px;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 650;
      line-height: 1.2;
    }

    .outside {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      margin-top: 5px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }

    .rooms {
      display: grid;
      gap: 12px;
    }

    .room {
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 7%);
      border-radius: 24px;
      background: #1c1c1e;
      box-shadow: none;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }

    .room:focus-visible {
      outline: 2px solid var(--primary-color, #64b5f6);
      outline-offset: 2px;
    }

    .room-title {
      overflow: hidden;
      font-size: 19px;
      font-weight: 500;
      line-height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-line {
      display: flex;
      align-items: center;
      gap: 6px;
      min-height: 18px;
      font-size: 13px;
      line-height: 18px;
    }

    .status-dot {
      box-sizing: border-box;
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
    }

    .measurements {
      display: flex;
      align-items: baseline;
      gap: 14px;
      min-height: 44px;
      margin: 8px 0;
      font-variant-numeric: tabular-nums;
    }

    .temperature {
      font-size: 38px;
      letter-spacing: -0.5px;
      line-height: 44px;
    }

    .temperature-unit {
      color: #9a9aa0;
      font-size: 18px;
      letter-spacing: 0;
    }

    .humidity {
      color: #9a9aa0;
      font-size: 20px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    .air {
      display: grid;
      gap: 0;
    }

    .air-row {
      display: flex;
      align-items: center;
      min-height: 20px;
      gap: 6px;
      font-size: 14px;
      line-height: 20px;
      font-variant-numeric: tabular-nums;
    }

    .air-row ha-icon {
      width: 16px;
      height: 16px;
      flex: 0 0 16px;
      color: #9a9aa0;
    }

    .air-label {
      width: 44px;
      flex: 0 0 44px;
      color: #9a9aa0;
      font-size: 12px;
    }

    .air-value-unit {
      color: #9a9aa0;
      font-size: 11px;
    }

    .lower {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .system-list {
      min-width: 0;
      flex: 1;
    }

    .system-row {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      gap: 8px;
      min-width: 0;
      height: 24px;
      color: var(--row-color);
      font-size: 14px;
      line-height: 20px;
    }

    .system-row.primary {
      height: 28px;
      font-size: 15px;
    }

    .system-row.strong {
      font-weight: 500;
    }

    .system-icon {
      display: flex;
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      align-items: center;
      justify-content: center;
    }

    .system-icon svg {
      display: block;
      width: 20px;
      height: 20px;
    }

    .system-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .system-extra {
      flex: 0 0 auto;
      color: #9a9aa0;
      font-weight: 400;
    }

    .window-row {
      height: 20px;
      margin-top: 6px;
      font-size: 13px;
    }

    .cover {
      width: 60px;
      height: 78px;
      flex: 0 0 60px;
    }

    .cover-placeholder {
      width: 60px;
      flex: 0 0 60px;
    }

    .cover svg {
      display: block;
      width: 60px;
      height: 78px;
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .lower {
        gap: 8px;
      }

      .cover,
      .cover svg {
        width: 52px;
      }

      .cover {
        flex-basis: 52px;
      }

      .cover-placeholder {
        width: 52px;
        flex-basis: 52px;
      }
    }
  `;
let B = Z;
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", B);
window.customCards = window.customCards ?? [];
window.customCards.some((o) => o.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
