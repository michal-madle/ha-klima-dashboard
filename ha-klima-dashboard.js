const Nt = globalThis, fe = Nt.ShadowRoot && (Nt.ShadyCSS === void 0 || Nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ge = /* @__PURE__ */ Symbol(), Te = /* @__PURE__ */ new WeakMap();
let pi = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (fe && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Te.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Te.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ni = (i) => new pi(typeof i == "string" ? i : i + "", void 0, ge), Ii = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new pi(e, i, ge);
}, Fi = (i, t) => {
  if (fe) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = Nt.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, Me = fe ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Ni(e);
})(i) : i;
const { is: Ui, defineProperty: ji, getOwnPropertyDescriptor: Bi, getOwnPropertyNames: Wi, getOwnPropertySymbols: Vi, getPrototypeOf: Ki } = Object, qt = globalThis, Ce = qt.trustedTypes, qi = Ce ? Ce.emptyScript : "", Yi = qt.reactiveElementPolyfillSupport, _t = (i, t) => i, Bt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? qi : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, ve = (i, t) => !Ui(i, t), Ae = { attribute: !0, type: String, converter: Bt, reflect: !1, useDefault: !1, hasChanged: ve };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), qt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ct = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ae) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && ji(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = Bi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_t("elementProperties"))) return;
    const t = Ki(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_t("properties"))) {
      const e = this.properties, n = [...Wi(e), ...Vi(e)];
      for (const o of n) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, o] of e) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const o = this._$Eu(e, n);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) e.unshift(Me(o));
    } else t !== void 0 && e.push(Me(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Fi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Bt).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Bt;
      this._$Em = o;
      const a = r.fromAttribute(e, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? ve)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: o, wrapped: s }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
ct.elementStyles = [], ct.shadowRootOptions = { mode: "open" }, ct[_t("elementProperties")] = /* @__PURE__ */ new Map(), ct[_t("finalized")] = /* @__PURE__ */ new Map(), Yi?.({ ReactiveElement: ct }), (qt.reactiveElementVersions ??= []).push("2.1.2");
const $e = globalThis, Ee = (i) => i, Wt = $e.trustedTypes, Oe = Wt ? Wt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ui = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, mi = "?" + X, Gi = `<${mi}>`, rt = document, Tt = () => rt.createComment(""), Mt = (i) => i === null || typeof i != "object" && typeof i != "function", we = Array.isArray, Zi = (i) => we(i) || typeof i?.[Symbol.iterator] == "function", Xt = `[ 	
\f\r]`, ft = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pe = /-->/g, Le = />/g, tt = RegExp(`>|${Xt}(?:([^\\s"'>=/]+)(${Xt}*=${Xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), De = /'/g, ze = /"/g, fi = /^(?:script|style|textarea|title)$/i, gi = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), m = gi(1), y = gi(2), pt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), st = rt.createTreeWalker(rt, 129);
function vi(i, t) {
  if (!we(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(t) : t;
}
const Xi = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ft;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, d, p = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, d = r.exec(l), d !== null); ) h = r.lastIndex, r === ft ? d[1] === "!--" ? r = Pe : d[1] !== void 0 ? r = Le : d[2] !== void 0 ? (fi.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = tt) : d[3] !== void 0 && (r = tt) : r === tt ? d[0] === ">" ? (r = o ?? ft, p = -1) : d[1] === void 0 ? p = -2 : (p = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? tt : d[3] === '"' ? ze : De) : r === ze || r === De ? r = tt : r === Pe || r === Le ? r = ft : (r = tt, o = void 0);
    const u = r === tt && i[a + 1].startsWith("/>") ? " " : "";
    s += r === ft ? l + Gi : p >= 0 ? (n.push(c), l.slice(0, p) + ui + l.slice(p) + X + u) : l + X + (p === -2 ? a : u);
  }
  return [vi(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ct {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Xi(t, e);
    if (this.el = Ct.createElement(c, n), st.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = st.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(ui)) {
          const h = d[r++], u = o.getAttribute(p).split(X), $ = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: $[2], strings: u, ctor: $[1] === "." ? Qi : $[1] === "?" ? tn : $[1] === "@" ? en : Yt }), o.removeAttribute(p);
        } else p.startsWith(X) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (fi.test(o.tagName)) {
          const p = o.textContent.split(X), h = p.length - 1;
          if (h > 0) {
            o.textContent = Wt ? Wt.emptyScript : "";
            for (let u = 0; u < h; u++) o.append(p[u], Tt()), st.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[h], Tt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === mi) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(X, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += X.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = rt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ut(i, t, e = i, n) {
  if (t === pt) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = Mt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = ut(i, o._$AS(i, t.values), o, n)), t;
}
class Ji {
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
    const { el: { content: e }, parts: n } = this._$AD, o = (t?.creationScope ?? rt).importNode(e, !0);
    st.currentNode = o;
    let s = st.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Et(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new nn(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== l?.index && (s = st.nextNode(), r++);
    }
    return st.currentNode = rt, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = ut(this, t, e), Mt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== pt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(rt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ct.createElement(vi(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new Ji(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Re.get(t.strings);
    return e === void 0 && Re.set(t.strings, e = new Ct(t)), e;
  }
  k(t) {
    we(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new Et(this.O(Tt()), this.O(Tt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Ee(t).nextSibling;
      Ee(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Yt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = ut(this, t, e, 0), r = !Mt(t) || t !== this._$AH && t !== pt, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = ut(this, a[n + l], e, l), c === pt && (c = this._$AH[l]), r ||= !Mt(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qi extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class tn extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class en extends Yt {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ut(this, t, e, 0) ?? f) === pt) return;
    const n = this._$AH, o = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== f && (n === f || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class nn {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ut(this, t);
  }
}
const on = $e.litHtmlPolyfillSupport;
on?.(Ct, Et), ($e.litHtmlVersions ??= []).push("3.3.3");
const sn = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new Et(t.insertBefore(Tt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const be = globalThis;
class St extends ct {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = sn(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return pt;
  }
}
St._$litElement$ = !0, St.finalized = !0, be.litElementHydrateSupport?.({ LitElement: St });
const rn = be.litElementPolyfillSupport;
rn?.({ LitElement: St });
(be.litElementVersions ??= []).push("4.2.2");
const an = { attribute: !0, type: String, converter: Bt, reflect: !1, hasChanged: ve }, ln = (i = an, t, e) => {
  const { kind: n, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), s.set(e.name, i), n === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, i, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function $i(i) {
  return (t, e) => typeof e == "object" ? ln(i, t, e) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function R(i) {
  return $i({ ...i, state: !0, attribute: !1 });
}
const It = 60, ae = 142, He = 11, Pt = 3, dn = 0.8, Ne = 2, cn = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", hn = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", pn = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function un(i, t) {
  if (i === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${It - 1.5}
      height=${ae - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = ae - Pt - 1, n = e / He, o = n - dn, s = o - t / 100 * (o - Ne), r = Pt + 1 + (100 - i) / 100 * e, a = Array.from({ length: He }, (l, c) => {
    const d = Pt + 1 + c * n + n / 2, p = d <= r, h = p ? s : Ne;
    return y`<rect
      x="0"
      y=${(d - h / 2).toFixed(2)}
      width=${It}
      height=${h.toFixed(2)}
      rx=${Math.min(1.5, h / 2).toFixed(2)}
      style=${p ? cn : hn}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${It}
      height=${Pt}
      rx="1.5"
      style=${pn}
    ></rect>${a}`;
}
const mn = ["cs", "en", "sv"];
class wi extends Error {
}
function M(i) {
  throw new wi(i);
}
function fn(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof wi ? new Error(`${i}: ${e.message}`) : e;
  }
}
function Ot(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Z(i, t) {
  return i == null ? {} : (Ot(i) || M(`"${t}" must be a mapping of keys.`), i);
}
function at(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || M(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function gn(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || M(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && M(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function mt(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && M(`${t} must be a non-empty text.`), i.trim();
}
const Ie = ["auto", ...mn];
function vn(i) {
  const t = i ?? "auto";
  return Ie.includes(t) || M(`language must be one of ${Ie.join(", ")}.`), t;
}
const Jt = ["bedroom", "office", "kids", "living"], Qt = "none", le = ["open", "shade", "dark"], $n = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function wn(i) {
  return $n.has(i);
}
function gt(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
const bi = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function te(i, t, e, n) {
  return i !== void 0 && t !== void 0 && Math.abs(i - e.position) <= n && Math.abs(t - e.tilt) <= n;
}
function vt(i, t) {
  return t === "temperature" ? i.temperature_step : t === "co2" ? i.co2_step : i.pm25_step;
}
const g = {
  /** Main text and the temperature curve. */
  white: "var(--kd-text)",
  /** Topení "Vypnuto" strip in the history chart. */
  closed: "var(--kd-closed)",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "var(--kd-blind)",
  sky: "var(--kd-sky)",
  /** CO₂ icon and its micro trend (muted sage green) and PM2.5 icon and its micro trend (muted lavender). */
  co2: "var(--kd-co2)",
  pm25: "var(--kd-pm25)",
  /** Temperature micro trend. */
  peach: "var(--kd-peach)",
  /** Humidity value: deliberately uncoloured. */
  neutral: "var(--kd-neutral)",
  /** Dashed humidity curve in the room history. */
  humidityLine: "var(--kd-sky)",
  label: "var(--kd-label)",
  off: "var(--kd-off)",
  plan: "var(--kd-plan)",
  warning: "var(--kd-warning)",
  alert: "var(--kd-alert)",
  /** The critical red on the lighter ground of a popup option (contrast 4.5 : 1 for 17 px text). */
  alertOnPopup: "var(--kd-alert-popup)",
  cold: "var(--kd-sky)",
  cool: "var(--kd-sky)",
  dry: "var(--kd-dry)",
  heat: "var(--kd-warning)",
  auto: "var(--kd-auto)"
}, At = {
  off: g.off,
  cool: g.cool,
  wind_free: g.cool,
  dry: g.dry,
  fan: g.plan,
  heat: g.heat,
  auto: g.auto,
  unknown: g.off
}, bn = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Ft(i) {
  const t = bn[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function yn(i) {
  switch (i?.toLowerCase()) {
    case "off":
      return "off";
    case "cool":
      return "cool";
    case "dry":
      return "dry";
    case "fan_only":
      return "fan";
    case "heat":
      return "heat";
    case "auto":
    case "heat_cool":
      return "auto";
    default:
      return "unknown";
  }
}
function Fe(i, t, e, n, o) {
  const { thresholds: s } = n, r = [
    [o.required.temperature, i.temperature],
    [o.required.humidity, i.humidity],
    ...n.hasCo2 ? [[o.required.co2, i.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, i.pm25]] : [],
    [o.required.houseMode, e ? { value: 1 } : void 0]
  ];
  for (const [u, $] of r) {
    if ($?.value === void 0)
      return { id: "noData", label: o.noData(u), color: g.label, kind: "unknown" };
    if ($.stale) {
      const v = $.ageMinutes === void 0 ? void 0 : ki($.ageMinutes);
      return { id: "noData", label: o.noData(u, v), color: g.label, kind: "unknown" };
    }
  }
  const a = i.temperature.value, l = i.humidity.value, c = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? i.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: g.alert, kind: "critical", cause: "pm25" };
  if (c >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: g.alert, kind: "critical", cause: "co2" };
  if (c >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: g.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: g.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: g.warning, kind: "warning", cause: "humidity" };
  const p = t ? s.summer_min : s.winter_min, h = t ? s.summer_max : s.winter_max;
  return a > h ? { id: "warm", label: o.status.warm, color: g.warning, kind: "warning", cause: "temperature" } : a < p ? { id: "cold", label: o.status.cold, color: g.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: g.label, kind: "normal" };
}
function V(i) {
  return wn(i) || i === "none";
}
function it(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function yi(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function kn(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((o) => e(o.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function xn(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function _n(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((o) => Object.hasOwn(t, o) && i[o] === t[o]);
}
function ki(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function Ue(i, t) {
  const e = (i ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function je(i) {
  const t = Math.max(0, Math.floor(i));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [o, s] = [Math.floor(t / 60), t % 60];
    return s === 0 ? `${o} h` : `${o} h ${s} min`;
  }
  const [e, n] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return n === 0 ? `${e} d` : `${e} d ${n} h`;
}
function Sn(i, t) {
  const e = Math.max(0, Math.floor(i));
  if (e < 1)
    return t.duration.lessThanMinute;
  if (e < 60)
    return t.duration.minute(e);
  if (e < 1440) {
    const [r, a] = [Math.floor(e / 60), e % 60], l = t.duration.hour(r);
    return a === 0 ? l : `${l} ${t.duration.minute(a)}`;
  }
  const [n, o] = [Math.floor(e / 1440), Math.floor(e % 1440 / 60)], s = t.duration.day(n);
  return o === 0 ? s : `${s} ${t.duration.hour(o)}`;
}
function Be(i, t) {
  const e = Math.max(1, Math.round(i));
  return e % 60 === 0 ? t.period.hour(e / 60) : t.period.minute(e);
}
function Tn(i, t) {
  return i.label ?? t.cover.presetName[i.icon];
}
function We(i, t) {
  if (i.description !== void 0)
    return i.description;
  const e = bi[i.icon];
  return i.label === void 0 && e.position === i.position && e.tilt === i.tilt ? t.cover.presetDescription[i.icon] : t.cover.position(Math.round(i.position), Math.round(i.tilt));
}
function Mn(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
const Cn = "input_select.house_mode", An = {
  humidity_min: 35,
  humidity_max: 70,
  co2_warning: 1e3,
  co2_critical: 1500,
  pm25_warning: 15,
  pm25_critical: 35,
  winter_min: 20,
  winter_max: 24,
  summer_min: 21,
  summer_max: 25,
  stale_minutes: 30,
  heating_waves_2: 35,
  heating_waves_3: 68
}, En = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, On = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, ee = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Pn = le.map((i) => ({ icon: i, ...bi[i] })), Ve = { winter: "Zima", summer: "Léto" }, Ke = ["auto", "dark", "light"], qe = 3, Ln = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Dn = [
  "name",
  "temperature",
  "humidity",
  "carbon_dioxide",
  "pm25",
  "window",
  "cover",
  "cover_presets",
  "thresholds",
  "heating",
  "air_conditioner",
  "image",
  "scene",
  "link"
], zn = ["climate", "overlay", "target", "intensity"], Ye = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], Rn = ["name", "position", "tilt", "icon", "description"], Hn = ["entity", "name"];
function J(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function j(i, t) {
  return gn(i, t, { example: "sensor.loznice_teplota" });
}
function yt(i, t, e, n = {}) {
  at(i, Object.keys(t), e);
  const o = { ...t };
  for (const [s, r] of Object.entries(i)) {
    if (r === null)
      continue;
    (typeof r != "number" || !Number.isFinite(r)) && M(`${e}.${s} must be a number.`);
    const a = n[s];
    if (a) {
      const [l, c, d] = a;
      (r < l || r > c || d && !Number.isInteger(r)) && M(`${e}.${s} must be ${d ? "a whole number " : ""}from ${l} to ${c}.`);
    }
    o[s] = r;
  }
  return o;
}
function xi(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of e)
    (s ? i[n] >= i[o] : i[n] > i[o]) && M(`${t}: ${n} (${i[n]}) must be ${s ? "below" : "at most"} ${o} (${i[o]}).`);
  i.stale_minutes <= 0 && M(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && M(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Nn(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function de(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > qe) && M(`${t} must be a list of 1 to ${qe} presets.`), i.map((e, n) => {
    const o = `${t}[${n + 1}]`;
    Ot(e) || M(`${o} must have a position and a tilt.`), at(e, Rn, o);
    const s = mt(e.name, `${o}.name`), r = (p) => {
      const h = e[p];
      return (typeof h != "number" || !Number.isFinite(h) || h < 0 || h > 100) && M(`${o}.${p} must be a number from 0 to 100.`), h;
    }, a = r("position"), l = r("tilt");
    let c = Nn(a, l);
    e.icon != null && (le.includes(e.icon) || M(`${o}.icon must be one of ${le.join(", ")}.`), c = e.icon);
    const d = mt(e.description, `${o}.description`);
    return { id: `p${n}`, icon: c, label: s, description: d, position: a, tilt: l };
  });
}
function In(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && M(`${t}.window must not be an empty list.`);
  const o = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(e) ? `[${a + 1}]` : ""}`;
    if (Ot(r)) {
      at(r, Hn, l);
      const d = j(r.entity, `${l}.entity`);
      return d || M(`${l}.entity is required.`), { entity: d, name: mt(r.name, `${l}.name`) };
    }
    const c = j(r, l);
    return c || M(`${l} must be an entity ID.`), { entity: c };
  }), s = /* @__PURE__ */ new Set();
  for (const r of o)
    s.has(r.entity) && M(`${t}.window lists ${r.entity} twice.`), s.add(r.entity);
  return o;
}
function Ge(i, t) {
  return i === !1 ? { present: !1 } : { entity: j(i, t), present: !0 };
}
function Fn(i, t) {
  i.image != null && i.scene != null && M(`${t}: use either image or scene (older name), not both.`);
  const e = i.image != null ? "image" : "scene", n = i.image ?? i.scene;
  if (n == null) {
    const s = Ln[J(i.name)];
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && M(`${t}.${e} must be ${[...Jt, Qt].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== Qt) {
    if (Jt.includes(o))
      return { kind: "scene", scene: o };
    if (e === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    M(
      `${t}.${e} must be one of ${[...Jt, Qt].join(", ")}${e === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Un(i, t) {
  const e = mt(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && M(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function jn(i, t, e) {
  Ot(i) || M(`room ${t + 1} must be a mapping with at least a name.`);
  const n = typeof i.name == "string" ? i.name.trim() : "";
  n || M(`room ${t + 1} requires a name.`);
  const o = `room "${n}"`, s = i;
  for (const [p, h] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    p in s && M(`${o}: key "${p}" was renamed to "${h}".`);
  "windows" in s && M(`${o}: the key is "window" (one entity or a list of them), not "windows".`), at(s, Dn, o);
  const r = Z(i.heating, `${o}.heating`);
  "heating" in r && M(`${o}: key "heating.heating" was renamed to "heating.intensity".`), at(r, zn, `${o}.heating`);
  const a = i.heating == null ? void 0 : {
    climate: j(r.climate, `${o}.heating.climate`),
    overlay: j(r.overlay, `${o}.heating.overlay`),
    target: j(r.target, `${o}.heating.target`),
    intensity: j(r.intensity, `${o}.heating.intensity`)
  }, l = yt(Z(i.thresholds, `${o}.thresholds`), e.thresholds, `${o}.thresholds`);
  xi(l, `${o}.thresholds`);
  const c = Ge(i.carbon_dioxide, `${o}.carbon_dioxide`), d = Ge(i.pm25, `${o}.pm25`);
  return {
    name: n,
    temperature: j(i.temperature, `${o}.temperature`),
    humidity: j(i.humidity, `${o}.humidity`),
    carbon_dioxide: c.entity,
    hasCo2: c.present,
    pm25: d.entity,
    hasPm25: d.present,
    windows: In(i, o),
    cover: j(i.cover, `${o}.cover`),
    presets: i.cover_presets == null ? e.presets : de(i.cover_presets, `${o}.cover_presets`),
    thresholds: l,
    heating: a,
    air_conditioner: j(i.air_conditioner, `${o}.air_conditioner`),
    image: Fn(i, o),
    link: Un(i.link, o)
  };
}
function Bn(i) {
  return fn("Klima Dashboard", () => Wn(i));
}
function Wn(i) {
  (!Ot(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && M("the configuration requires a non-empty rooms list."), i.title != null && typeof i.title != "string" && M("title must be a text (an empty text leaves the heading out).");
  const t = i.theme ?? "auto";
  Ke.includes(t) || M(`theme must be one of ${Ke.join(", ")}.`);
  const e = vn(i.language), n = j(i.house_mode_entity, "house_mode_entity") ?? Cn, o = Z(i.house_modes, "house_modes");
  at(o, ["winter", "summer"], "house_modes");
  const s = {
    winter: mt(o.winter, "house_modes.winter") ?? Ve.winter,
    summer: mt(o.summer, "house_modes.summer") ?? Ve.summer
  };
  J(s.winter) === J(s.summer) && M("house_modes.winter and house_modes.summer must differ.");
  const r = i.outside == null ? void 0 : Z(i.outside, "outside");
  if (r) {
    at(r, Ye, "outside");
    for (const w of Ye)
      j(r[w], `outside.${w}`);
  }
  const a = yt(Z(i.thresholds, "thresholds"), An, "thresholds");
  xi(a, "thresholds");
  const l = yt(Z(i.trends, "trends"), En, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), c = yt(Z(i.history, "history"), On, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), d = { ...Z(i.covers, "covers") }, p = d.presets;
  delete d.presets;
  const h = d.script;
  delete d.script;
  const u = {
    ...yt(d, { tolerance: ee.tolerance, stall_seconds: ee.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: ee.script
  };
  h != null && ((typeof h != "string" || !/^script\.[a-z0-9_]+$/.test(h.trim())) && M("covers.script must be a script entity such as script.zaluzie_posun."), u.script = h.trim());
  const $ = p == null ? de(Pn, "covers.presets") : de(p, "covers.presets"), v = i.rooms.map((w, C) => jn(w, C, { thresholds: a, presets: $ })), _ = /* @__PURE__ */ new Set();
  for (const w of v)
    _.has(w.name) && M(`room name "${w.name}" is used twice; room names must be unique.`), _.add(w.name);
  return {
    // Without a title the heading is "Domov" in the card language (i18n.ts).
    title: i.title ?? void 0,
    theme: t,
    language: e,
    houseModeEntity: n,
    houseModes: s,
    outside: r,
    thresholds: a,
    trends: l,
    history: c,
    covers: u,
    rooms: v
  };
}
const Q = 5, Gt = 25, B = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480], lt = B.length, dt = B.length + 1;
function Vn(i) {
  return i === lt ? 0 : i === dt ? B.length + 1 : i + 1;
}
function Kn(i) {
  const t = B.length + 1, e = Math.min(t, Math.max(0, Math.round(i)));
  return e === 0 ? lt : e === t ? dt : e - 1;
}
function qn(i) {
  return i === dt || i === lt ? B.length : i;
}
function Yn(i) {
  const t = Math.min(B.length, Math.max(0, Math.round(i)));
  return t === B.length ? dt : t;
}
function Ze(i, t, e, n = 0) {
  const o = Math.round(t * 60) + n, s = [
    { delay: { hours: Math.floor(o / 3600), minutes: Math.floor(o % 3600 / 60), seconds: o % 60 } }
  ];
  return e !== void 0 && s.push({ condition: "state", entity_id: i, state: e }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { sequence: s };
}
function _i(i) {
  return i === "boost" ? 1 : i === "off" ? dt : lt;
}
function Xe(i, t, e) {
  const n = Mi(e);
  if (n === void 0)
    return;
  const o = n === "heat" ? "manual" : n === "auto" ? "plan" : n, s = Ti(Si(e)), r = K(e?.attributes.temperature), a = o === "manual" && r !== void 0 && r >= s.min && r <= s.max;
  return {
    room: i,
    entityId: t,
    mode: o,
    temperature: Gn(a ? r : 21, s),
    duration: _i(o)
  };
}
function K(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Si(i) {
  const t = K(i?.attributes.target_temp_step), e = K(i?.attributes.min_temp) ?? Q, n = K(i?.attributes.max_temp) ?? 25, o = t !== void 0 && t > 0 ? t : 0.5;
  return n > e ? { min: e, max: n, step: o } : { min: Q, max: 25, step: o };
}
function Ti(i) {
  return { ...i, min: Math.max(i.min, Q) + i.step };
}
function Gn(i, t) {
  const e = Math.round((i - t.min) / t.step) * t.step + t.min;
  return Math.min(t.max, Math.max(t.min, Math.round(e * 100) / 100));
}
function Mi(i) {
  const t = i?.state.toLowerCase();
  if (t === "off")
    return "off";
  if (t === "auto")
    return "auto";
  if (t === "heat") {
    const e = K(i?.attributes.temperature);
    return e !== void 0 && e <= Q ? "off" : e === Gt ? "boost" : "heat";
  }
}
function Ci(i, t, e) {
  const n = i?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const a = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return a === "manual" && e !== void 0 && e <= Q ? "off" : a;
}
function Zn(i) {
  const t = Math.floor(i / 60), e = i % 60;
  return `${String(t).padStart(2, "0")}:${String(e).padStart(2, "0")}:00`;
}
function kt(i) {
  return i >= 0 && i < B.length ? B[i] : void 0;
}
function Xn(i, t, e) {
  if (t.mode === "plan")
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } };
  const n = kt(t.duration);
  if (t.mode === "off" && (t.duration === dt || !e))
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } };
  if (!e)
    return t.mode === "manual" ? { domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: t.temperature } } : void 0;
  const o = t.mode === "boost" ? Gt : t.mode === "off" ? Q : t.temperature, s = { entity_id: i, temperature: o };
  return n !== void 0 ? s.time_period = Zn(n) : s.overlay = t.duration === lt ? "next_time_block" : "manual", { domain: "tado_ce", service: "set_climate_timer", data: s };
}
function $t(i) {
  const t = Math.max(1, Math.round(i)), e = Math.floor(t / 60), n = t % 60;
  return e === 0 ? `${n} min` : n === 0 ? `${e} h` : `${e} h ${n} min`;
}
const Zt = 36e5;
function Jn(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function Qn(i, t) {
  const e = {};
  for (const [n, o] of Object.entries(i ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((r, a) => {
      const l = r.s ?? r.state, c = Jn(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && c !== void 0 && s.push({ time: Math.max(c, t), state: l });
    }), s.sort((r, a) => r.time - a.time), e[n] = s;
  }
  return e;
}
async function Je(i, t, e, n) {
  if (t.length === 0)
    return {};
  const o = await i.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(n).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return Qn(o, e);
}
function Ai(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function ce(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function to(i, t, e, n) {
  const o = (e - t) / n, s = (i ?? []).filter((r) => ce(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => ce(Ai(s, t + (a + 1) * o))
  );
}
function Qe(i, t, e) {
  const n = [];
  for (const s of i ?? []) {
    const r = ce(s.state);
    r !== void 0 && s.time <= e && n.push({ t: Math.max(s.time, t), v: r });
  }
  const o = n[n.length - 1];
  return o && o.t < e && n.push({ t: e, v: o.v }), n;
}
function wt(i, t, e, n) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const a of i)
    for (const l of a ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((a, l) => a - l), r = [];
  for (let a = 0; a < s.length - 1; a += 1) {
    const l = n(i.map((d) => Ai(d, s[a])));
    if (l === void 0)
      continue;
    const c = r[r.length - 1];
    c && c.value === l && c.end === s[a] ? c.end = s[a + 1] : r.push({ start: s[a], end: s[a + 1], value: l });
  }
  return r;
}
function ie(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of i)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), n = Math.max(n, a));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function eo(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function ti() {
  return m`
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      ${[
    [5.5, 6, 1.9],
    [12.5, 3.8, 1.4],
    [19, 6.5, 2.1],
    [9.5, 11, 2.3],
    [16.5, 12.5, 1.5],
    [4.5, 15.5, 1.5],
    [20, 18.5, 1.7],
    [11.5, 18, 1.7],
    [7, 20.5, 1.9],
    [15, 21, 1.4]
  ].map(([t, e, n]) => y`<circle cx=${t} cy=${e} r=${n}></circle>`)}
    </svg>
  `;
}
function io(i) {
  const t = (o, s, r, a) => y`<rect x=${o} y=${s} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => y`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (i) {
    case "open":
      n = y`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      n = y`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      n = y`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
  }
  return m`
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="3.5" width="27" height="3.2" rx="1.6" fill="currentColor" stroke="none"></rect>
      ${n}
    </svg>
  `;
}
function ei() {
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 7v5.2l3.4 2"></path>
    </svg>
  `;
}
function Ei(i, t) {
  return y`${[0, 1, 2].map(
    (e) => y`<path
      d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${e < i ? g.warning : g.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : f}
    ></path>`
  )}`;
}
function he(i, t) {
  return m`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Ei(i, t)}
    </svg>
  `;
}
function Oi(i) {
  let t;
  const e = y`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = y`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (i) {
    case "cool":
    case "wind_free":
      t = y`${e}
        <g transform="rotate(60 12 12)">${e}</g>
        <g transform="rotate(120 12 12)">${e}</g>`;
      break;
    case "dry":
      t = y`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = y`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
      break;
    case "heat":
      t = y`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (o) => y`<path d="M12 3v2.5" transform=${`rotate(${45 * o} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      t = y`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      t = y`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return t;
}
function Ut(i, t, e) {
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Oi(i)}
    </svg>
  `;
}
function Pi() {
  return y`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function ne(i, t) {
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${i}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Pi()}
    </svg>
  `;
}
function oe(i) {
  let t;
  switch (i) {
    case "off":
      t = y`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = y`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = y`<path d="M4 8h7.5M16.5 8H20M4 16h3.5M12.5 16H20"></path>
        <circle cx="14" cy="8" r="2.5"></circle><circle cx="10" cy="16" r="2.5"></circle>`;
      break;
    default:
      t = y`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
  }
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      ${t}
    </svg>
  `;
}
const U = 4, no = 32, nt = 6, ot = 150, xt = nt + ot, Lt = 9, Li = xt + 10, jt = 12, oo = 12, ii = 34, ni = "history-icon-fade", Di = 14, so = 7, ro = (i) => 2 + (i.windows ? 1 : 0), zi = (i) => Li + ro(i) * jt, ao = (i) => zi(i) + Di + so, oi = 11, lo = [0, 0.24, 0.44, 0.68], si = "history-under-temperature", ri = "history-plot", ye = {
  schedule: g.plan,
  manual: g.warning,
  off: g.closed
}, W = (i) => `fill: ${i}`, Y = (i) => `stroke: ${i}`;
function se(i, t, e) {
  return Ci(t, i, e);
}
function Dt(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const co = 0.05;
function ho(i, t) {
  const e = i.filter((a) => Number.isFinite(a));
  let n = 19, o = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), o = Math.max(...e), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const a = (o - n) * co;
    n -= a, o += a;
  }
  const s = o - n, r = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: r };
}
function po(i, t, e) {
  const n = [], o = e / 1e3;
  for (let s = Math.ceil(i / e - o) * e; s <= t + o; s += e)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function uo(i, t, e, n) {
  const o = (T) => T ? i[T] : void 0, { startMs: s, endMs: r } = e, a = o(t.heating?.overlay), l = o(t.heating?.climate), c = Qe(o(t.temperature), s, r), d = Qe(o(t.humidity), s, r), p = wt(
    [a, l, o(t.heating?.target)],
    s,
    r,
    ([T, k, A]) => se(T, k, Dt(A))
  ), h = wt(
    [a, l, o(t.heating?.intensity), o(t.heating?.target)],
    s,
    r,
    ([T, k, A, S]) => {
      const F = se(T, k, Dt(S)), I = yi(Dt(A), t.thresholds);
      return F === void 0 || F === "off" || I === 0 ? void 0 : String(I);
    }
  ), u = wt(
    [a, l, o(t.heating?.target)],
    s,
    r,
    ([T, k, A]) => {
      const S = Dt(A), F = se(T, k, S);
      if (!(S === void 0 || S <= Q))
        return F === "schedule" || F === "manual" ? String(S) : void 0;
    }
  ), $ = t.windows.length > 0 ? wt(
    t.windows.map((T) => o(T.entity)),
    s,
    r,
    (T) => T.some((k) => k?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, v = wt([o(t.air_conditioner)], s, r, ([T]) => {
    const k = yn(T);
    return k === "unknown" ? void 0 : k;
  }), _ = c.map((T) => T.v), { min: w, max: C, step: E } = ho(
    _.length > 0 ? _ : u.map((T) => Number(T.value)),
    n.min_temperature_span
  ), b = d.map((T) => T.v);
  return {
    range: e,
    temperature: c,
    humidity: d,
    heating: p,
    intensity: h,
    target: u,
    climate: v,
    windows: $,
    tempMin: w,
    tempMax: C,
    tempStep: E,
    humidityMin: b.length > 0 ? Math.min(...b) : void 0,
    humidityMax: b.length > 0 ? Math.max(...b) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function mo(i) {
  return i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function ht(i) {
  return i - U - no;
}
function fo(i, t, e) {
  return U + (i - t.startMs) / (t.endMs - t.startMs) * ht(e);
}
function go(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - U) / ht(t)));
  return e.startMs + n * (e.endMs - e.startMs);
}
function pe(i, t) {
  let e;
  for (const n of i) {
    if (n.t > t)
      break;
    e = n.v;
  }
  return e;
}
function zt(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
function vo(i, [t, e]) {
  const n = [];
  if (t === e)
    return n;
  const o = new Date(i.startMs);
  for (o.setHours(0, 0, 0, 0), o.setDate(o.getDate() - 1); o.getTime() < i.endMs; ) {
    const s = new Date(o);
    s.setHours(t, 0, 0, 0);
    const r = new Date(o);
    e < t && r.setDate(r.getDate() + 1), r.setHours(e, 0, 0, 0);
    const a = Math.max(s.getTime(), i.startMs), l = Math.min(r.getTime(), i.endMs);
    l > a && n.push([a, l]), o.setDate(o.getDate() + 1);
  }
  return n;
}
function Ri(i) {
  const t = (i.endMs - i.startMs) / Zt;
  return t <= 12 ? 3 : t <= 24 ? 6 : t <= 48 ? 12 : t <= 96 ? 24 : 48;
}
function $o(i) {
  const t = Ri(i), e = [], n = new Date(i.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < i.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= i.endMs; )
    n.getTime() >= i.startMs && e.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return e;
}
function wo(i, t, e) {
  return i - 16 < t ? { x: t, anchor: "start" } : i + 16 > e ? { x: e, anchor: "end" } : { x: i, anchor: "middle" };
}
function bo(i) {
  return i === "off" ? ye.off : At[i] ?? g.off;
}
function yo(i, t, e) {
  return Ri(t) >= 24 ? e.day(i) : e.hour(i);
}
function ko(i, t, e) {
  const { t: n } = e, o = t ?? i.range.endMs, s = pe(i.temperature, o), r = pe(i.humidity, o), a = zt(i.heating, o, i.range.endMs), l = Number(zt(i.intensity, o, i.range.endMs) ?? 0), c = zt(i.target, o, i.range.endMs), d = zt(i.climate, o, i.range.endMs);
  let p = n.chart.now;
  if (t !== void 0) {
    const v = (C) => {
      const E = new Date(C);
      return E.setHours(12, 0, 0, 0), E.getTime();
    }, _ = Math.round((v(i.range.endMs) - v(t)) / (24 * Zt));
    p = `${_ === 0 ? "" : _ === 1 ? `${n.chart.yesterday} ` : `${e.day(t)} `}${e.time(t)}`;
  }
  const h = a === void 0 ? "––" : `${n.heatingMode[a]}${a !== "off" && c !== void 0 ? ` · ${e.half(Number(c))} °C` : ""}`, u = d ? n.climateMode[d] : "––", $ = d ? At[d] : g.off;
  return m`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${p}</span>
        <span class="readout-temp">${s === void 0 ? "––" : `${e.one(s)} °C`}</span>
        <span class="readout-hum">${r === void 0 ? "" : e.percent(Math.round(r))}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${a === "off" ? g.off : a ? ye[a] : g.label}`}>
          <span class="readout-icon">${he(a && a !== "off" ? l : 0, a === void 0)}</span>
          ${n.system.heating} ${h}
        </span>
        <span class="readout-system" style=${`color: ${$}`}>
          <span class="readout-icon">${Ut(d ?? "off", $, d === void 0)}</span>
          ${n.system.climate} ${u}
        </span>
      </div>
    </div>
  `;
}
function xo(i, t, e, n, o = !1) {
  const { range: s } = i, r = (x) => fo(x, s, t), a = (x) => xt - (x - i.tempMin) / (i.tempMax - i.tempMin) * ot, l = (i.humidityMin ?? 0) - 3, c = Math.max((i.humidityMax ?? 100) + 3, l + 12), d = (x) => xt - (x - l) / (c - l) * ot, p = U + ht(t), h = (x, H) => x.map((P, D) => `${D === 0 ? "M" : "L"}${r(P.t).toFixed(1)} ${H(P.v).toFixed(1)}`).join(" "), u = h(i.temperature, a), $ = i.temperature[0], v = i.temperature[i.temperature.length - 1], _ = $ && v ? `${u} L${r(v.t).toFixed(1)} ${xt} L${r($.t).toFixed(1)} ${xt} Z` : "";
  let w = "";
  i.target.forEach((x, H) => {
    const P = a(Number(x.value)).toFixed(1), D = i.target[H - 1];
    w += D && D.end === x.start ? ` L${r(x.start).toFixed(1)} ${P}` : ` M${r(x.start).toFixed(1)} ${P}`, w += ` L${r(x.end).toFixed(1)} ${P}`;
  });
  const C = po(i.tempMin, i.tempMax, i.tempStep), E = (x, H, P) => x.map((D) => {
    const L = r(D.start);
    return y`<rect x=${L.toFixed(1)} y=${H} width=${Math.max(r(D.end) - L, 0.8).toFixed(1)}
        height=${Lt} rx="2" style=${W(P(D.value))}></rect>`;
  }), b = o ? ["climate", "heating"] : ["heating", "climate"];
  i.windows && b.push("windows");
  const T = zi(i), k = T + Di, A = ao(i), S = (x) => x === "heating" ? y`${Ei(3, !1)}` : x === "climate" ? y`<g style=${Y(g.off)}>${Oi("off")}</g>` : y`<g style=${Y("var(--kd-sky)")}>${Pi()}</g>`, F = (x, H) => x === "heating" ? y`${E(i.heating, H, (P) => ye[P] ?? g.off)}` : x === "climate" ? y`${E(i.climate, H, (P) => bo(P))}` : y`${(i.windows ?? []).map((P) => {
    const D = r(P.start);
    return y`<rect class="window-open" x=${D.toFixed(1)} y=${H} width=${Math.max(r(P.end) - D, 1.5).toFixed(1)}
              height=${Lt} rx="2" style=${W("var(--kd-sky)")}></rect>`;
  })}`, I = e === void 0 ? void 0 : r(e), N = e === void 0 ? void 0 : pe(i.temperature, e), q = vo(s, i.night);
  return m`
    ${ko(i, e, n)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${A}"
      width=${t}
      height=${A}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${si}><path d=${_}></path></clipPath>
        <linearGradient id=${ni} gradientUnits="userSpaceOnUse" x1=${U} x2=${U + ii} y1="0" y2="0">
          <stop offset="0" style="stop-color: var(--kd-sheet-bg); stop-opacity: 1"></stop>
          <stop offset="0.55" style="stop-color: var(--kd-sheet-bg); stop-opacity: 0.92"></stop>
          <stop offset="1" style="stop-color: var(--kd-sheet-bg); stop-opacity: 0"></stop>
        </linearGradient>
        <clipPath id=${ri}>
          <rect x=${U} y=${nt} width=${ht(t)} height=${ot}></rect>
        </clipPath>
      </defs>
      <rect x=${U} y=${nt} width=${ht(t)} height=${ot} rx="8" style=${W("var(--kd-fill)")}></rect>
      ${q.map(
    ([x, H]) => y`<rect class="night" x=${r(x).toFixed(1)} y=${nt} width=${(r(H) - r(x)).toFixed(1)}
          height=${ot} style=${W("var(--kd-night)")}></rect>`
  )}
      ${C.map(
    (x) => y`<line x1=${U} x2=${p} y1=${a(x).toFixed(1)} y2=${a(x).toFixed(1)}
            style=${Y("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${p + 6} y=${(a(x) + 4).toFixed(1)} style=${W(g.label)} font-size=${oi}>${n.tick(x)}°</text>`
  )}
      ${_ ? y`<path d=${_} style=${W("var(--kd-area)")}></path>` : f}
      <g clip-path=${`url(#${si})`}>
        ${i.intensity.map(
    (x) => y`<rect x=${r(x.start).toFixed(1)} y=${nt}
            width=${Math.max(r(x.end) - r(x.start), 0.8).toFixed(1)} height=${ot}
            style=${W(g.warning)} opacity=${lo[Number(x.value)] ?? 0}></rect>`
  )}
      </g>
      ${i.humidity.length > 0 ? y`<path d=${h(i.humidity, d)} fill="none" style=${Y(g.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : f}
      ${w ? y`<path d=${w} fill="none" style=${Y(g.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${ri})`}></path>` : f}
      ${u ? y`<path class="temperature-curve" d=${u} fill="none" style=${Y(g.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : f}
      ${v && e === void 0 ? y`<circle cx=${r(v.t).toFixed(1)} cy=${a(v.v).toFixed(1)} r="3.5" style=${W(g.white)}></circle>` : f}

      ${b.map((x, H) => {
    const P = Li + H * jt, D = P + (jt - Lt) / 2;
    return y`<g class=${`strip-row ${x}`}>
          <rect x=${U} y=${D} width=${ht(t)} height=${Lt} rx="2" style=${W("var(--kd-fill)")}></rect>
          ${F(x, D)}
          <rect x=${U} y=${P} width=${ii} height=${jt} style=${W(`url(#${ni})`)}></rect>
          <g class="strip-icon" transform=${`translate(${U + 1} ${P}) scale(${oo / 24})`} fill="none"
            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${S(x)}</g>
        </g>`;
  })}

      ${$o(s).map((x) => {
    const H = wo(r(x), U, p);
    return y`<line x1=${r(x).toFixed(1)} x2=${r(x).toFixed(1)} y1=${nt} y2=${T}
            style=${Y("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${H.x.toFixed(1)} y=${k} style=${W(g.label)} font-size=${oi}
            text-anchor=${H.anchor}>${yo(x, s, n)}</text>`;
  })}
      ${I === void 0 ? f : y`<line x1=${I.toFixed(1)} x2=${I.toFixed(1)} y1=${nt} y2=${T}
              style=${Y(g.white)} stroke-width="1" opacity="0.7"></line>
            ${N === void 0 ? f : y`<circle cx=${I.toFixed(1)} cy=${a(N).toFixed(1)} r="4"
                  style=${`${W(g.white)}; ${Y("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const ai = Zt / 4;
function _o(i) {
  return `var(--kd-scene-${i})`;
}
function So(i) {
  let t;
  switch (i) {
    case "bedroom":
      t = y`
        <path d="M121 10a15 15 0 1 0 13 23 12 12 0 0 1-13-23z"></path>
        <path d="M92 14v9M87.5 18.5h9M140 50v7M136.5 53.5h7"></path>
        <path d="M18 56v46M18 86h116v16M18 102h116"></path>
        <path d="M26 74h28a6 6 0 0 1 0 12H26z"></path>
        <path d="M60 86v-8a6 6 0 0 1 6-6h58a10 10 0 0 1 10 10v4"></path>`;
      break;
    case "office":
      t = y`
        <rect x="42" y="22" width="66" height="42" rx="5"></rect>
        <path d="M75 64v14M60 78h30"></path>
        <path d="M16 92h118M24 92v16M126 92v16"></path>
        <path d="M132 92V66l-8-12M118 48l9-7 9 11z"></path>
        <path d="M22 78h14v14H22zM36 81h3.5a3 3 0 0 1 0 6H36"></path>`;
      break;
    case "kids":
      t = y`
        <rect x="22" y="72" width="30" height="30" rx="5"></rect>
        <rect x="56" y="72" width="30" height="30" rx="5"></rect>
        <rect x="39" y="40" width="30" height="30" rx="5"></rect>
        <circle cx="116" cy="88" r="14"></circle>
        <path d="M104 84c8 4 16 4 24 0"></path>
        <path d="M118 14l4.5 9.5 10.5 1.3-7.7 7.2 2 10.3-9.3-5.1-9.3 5.1 2-10.3-7.7-7.2 10.5-1.3z"></path>`;
      break;
    default:
      t = y`
        <rect x="46" y="14" width="40" height="28" rx="3"></rect>
        <path d="M52 36l9-9 7 7 6-5 7 7"></path>
        <path d="M18 76h12v26H18zM110 76h12v26h-12zM30 86h80v16H30z"></path>
        <path d="M24 76v-8a8 8 0 0 1 8-8h76a8 8 0 0 1 8 8v8"></path>
        <path d="M24 102v6M116 102v6"></path>
        <path d="M136 108V40M127 40h18l-4-14h-10z"></path>`;
  }
  return m`<svg
    viewBox="0 0 150 112"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${t}</svg>`;
}
class To {
  /** `times` is read at every press, so changed properties apply at once. */
  constructor(t) {
    this.times = t, this.pressing = !1, this.fired = !1;
  }
  /** A press began: `onHold` runs when it lasts `holdMs`. */
  start(t) {
    window.clearTimeout(this.timer), this.pressing = !0, this.fired = !1, this.timer = window.setTimeout(() => {
      this.fired = !0, this.last = void 0, t();
    }, this.times().holdMs);
  }
  /** The pointer was lifted or left: a hold that has not fired yet is cancelled. */
  release() {
    window.clearTimeout(this.timer);
  }
  /** The press was interrupted (pointercancel, leaving the control): nothing follows. */
  cancel() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1;
  }
  /**
   * The press ended in a tap on `key` at `time` (ms, monotonic). "none": the press was a hold that
   * has fired already (or no press began); "double": the second tap of `key` within `doubleTapMs`;
   * "single": the first tap, remembered for a following second one.
   */
  tap(t, e) {
    window.clearTimeout(this.timer);
    const n = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !n || o ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
  }
  /** Whether `key` was tapped once and no second tap has followed yet. */
  pending(t) {
    return this.last?.key === t;
  }
  /** Forget the remembered first tap (a hint was shown, the action was sent …). */
  forget() {
    this.last = void 0;
  }
  dispose() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1, this.last = void 0;
  }
}
function Vt(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function ke(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Mo(i, t) {
  return i === "auto" ? ke(Vt(t)) : i;
}
function Co() {
  return ke(document.documentElement.lang || navigator.language || "");
}
const li = /* @__PURE__ */ new WeakMap(), Ao = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Eo = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Oo = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function re(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Po(i, t, e) {
  const n = Vt(e).replace("_", "-"), o = n !== "" && ke(n) === t ? n : Ao[t], s = re(e, "number_format"), r = re(e, "time_format"), a = re(e, "date_format"), l = [t, o, s, r, a].join("|");
  let c = li.get(i);
  c || (c = /* @__PURE__ */ new Map(), li.set(i, c));
  let d = c.get(l);
  return d || (d = zo(i[t], t, o, s, r, a), c.set(l, d)), d;
}
function Lo(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function Do(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function zo(i, t, e, n, o, s) {
  const r = Lo(e), a = n === "system" ? void 0 : n === "none" ? "en-US" : Oo[n] ?? r, l = n === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), h = Do(o, r), u = h ? "h12" : "h23", $ = new Intl.DateTimeFormat(r, { hour: h ? "numeric" : "2-digit", minute: "2-digit", hourCycle: u }), v = new Intl.DateTimeFormat(r, h ? { hour: "numeric", hourCycle: u } : { hour: "2-digit", minute: "2-digit", hourCycle: u }), _ = s === "system" ? void 0 : r, w = new Intl.DateTimeFormat(_, { day: "numeric", month: "numeric" }), C = (b) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return w.format(b);
    const T = w.formatToParts(b), k = T.find((N) => N.type === "literal")?.value ?? "/", A = T[T.length - 1], S = A?.type === "literal" ? A.value : "", F = T.find((N) => N.type === "day")?.value ?? "", I = T.find((N) => N.type === "month")?.value ?? "";
    return s === "DMY" ? `${F}${k}${I}${S}` : `${I}${k}${F}${S}`;
  }, E = Eo.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: i,
    one: (b) => c.format(b),
    half: (b) => d.format(Math.round(b * 2) / 2),
    tick: (b) => d.format(b),
    whole: (b) => p.format(b),
    percent: (b) => `${b}${E}%`,
    time: (b) => $.format(b),
    hour: (b) => v.format(b),
    day: C
  };
}
const et = (i, t, e, n) => i === 1 ? t : i >= 2 && i <= 4 ? e : n, Ro = {
  /** Heading without `title` in the YAML. */
  title: "Domov",
  /** Card picker of Home Assistant. */
  cardDescription: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  // Room status (Stavový systém, Chybějící data)
  status: {
    polluted: "Znečištěný vzduch",
    veryStuffy: "Silně vydýchaný vzduch",
    stuffy: "Vydýchaný vzduch",
    humid: "Vlhko",
    dry: "Sucho",
    warm: "Teplo",
    cold: "Chladno",
    comfortable: "Příjemné"
  },
  /** The first missing value, named in "Bez dat · …". */
  required: { temperature: "teplota", humidity: "vlhkost", co2: "CO₂", pm25: "PM2.5", houseMode: "režim domu" },
  noData: (i, t) => `Bez dat · ${i}${t === void 0 ? "" : ` (před ${t})`}`,
  /** A stale value: tooltip, and lower-case at the end of its spoken text ("45 min", "2 h"). */
  lastSeen: (i) => `Naposledy před ${i}`,
  // Header (Dashboard Domov)
  outsideAir: "Vzduch venku:",
  airLevel: { good: "dobrý", moderate: "zhoršený", poor: "špatný" },
  summary: "Souhrn domu",
  // Room card: temperature, humidity, link (Room Card)
  temperatureLabel: (i, t, e, n) => `${i}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${e}, historie místnosti za ${n}`,
  humidityLabel: (i, t, e) => `${i}: vlhkost ${t ?? "neznámá"}${e}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (i, t, e, n) => `${i}: teplota za ${t}${e ? ` ${e}` : ""}, historie místnosti za ${n}`,
  link: { page: "Otevře stránku místnosti.", web: "Otevře odkaz." },
  // CO₂ and PM2.5
  air: "Kvalita vzduchu",
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (i, t, e, n) => `${i} ${t ?? "neznámé"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: kvalita vzduchu, ${t || "bez čidla"}. ${e ? "Otevře detaily." : "Otevře detail a historii."}`,
  detailsAndHistory: "Detail a historie",
  /** A value that is not known, for screen readers ("––" on screen). */
  unknownValue: "neznámé",
  trend: { rising: "stoupá", falling: "klesá", stable: "stabilní" },
  /** Direction of a micro trend over its period: "za 2 hodiny stoupá". */
  trendOver: (i, t) => `za ${t} ${i}`,
  // Topení and Klimatizace (Ovládání Topení a Klimatizace)
  system: { heating: "Topení", climate: "Klimatizace" },
  heatingMode: { schedule: "Plán", manual: "Ručně", off: "Vypnuto", boost: "Boost" },
  climateMode: {
    off: "Vypnuto",
    cool: "Chlazení",
    wind_free: "WindFree",
    dry: "Sušení",
    fan: "Větrání",
    heat: "Topení",
    auto: "Auto",
    unknown: "––"
  },
  /** A system row without data, for screen readers. */
  unknownState: "neznámý stav",
  /** "Ložnice: Topení Plán 21 °C, Klimatizace Vypnuto. Otevře ovládání Topení." */
  hvacDescription: (i, t, e) => `${i}: ${t}.${e ? ` Otevře ovládání ${e === "heating" ? "Topení" : "Klimatizace"}.` : ""}`,
  // Window (Vizuální pravidla)
  window: {
    open: "Otevřeno",
    /** Two or more windows of the room are open. */
    openCount: (i) => `Otevřena ${i}`,
    closed: "Zavřeno",
    /** Name in the "Okna" popup of a window without `name` in the YAML. */
    defaultName: (i) => `Okno ${i}`,
    popup: "Okna",
    spokenSingle: (i, t) => i === "unknown" ? "okno neznámé" : `okno ${i === "open" ? "otevřené" : "zavřené"}${t === void 0 ? "" : `, otevřené ${t}`}`,
    spokenOneOpen: (i, t) => `okno ${i} otevřené${t === void 0 ? "" : ` ${t}`}`,
    spokenManyOpen: (i, t) => `otevřená okna ${i}${t === void 0 ? "" : `, nejdéle ${t}`}`,
    spokenAllClosed: "všechna okna zavřená",
    spokenUnknown: "stav oken neznámý",
    conflict: { heating: "otevřené okno při topení", cooling: "otevřené okno při chlazení" },
    description: (i, t, e, n) => `${i}: ${t}${e ? `; konflikt: ${e}` : ""}. ${n ? "Otevře přehled oken." : "Otevře detail a historii."}`
  },
  // Blind and its presets (Žaluzie)
  cover: {
    label: (i, t, e) => `${i}: žaluzie, ${t}${e ? ", pohybuje se" : ""}. Otevřít ovládání.`,
    position: (i, t) => `poloha ${i} %, naklopení ${t} %`,
    unknown: "poloha nebo naklopení neznámé",
    presets: (i) => `${i}: předvolby žaluzií`,
    preset: (i, t, e, n) => `${i}: žaluzie ${t}, ${e}. ${n ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná."}`,
    /** Name and description of a preset without them in the YAML, by its icon. */
    presetName: { open: "Den", shade: "Stín", dark: "Tma" },
    presetDescription: { open: "vytaženo nahoru", shade: "spuštěno, lamely otevřené", dark: "úplné zatemnění" },
    hint: "Podržte nebo klepněte dvakrát",
    unavailable: "Žaluzie je nedostupná",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Nepodařilo se odeslat",
    failed: (i) => `${i}: skript žaluzií se nepodařilo spustit.`
  },
  // Popups (Detail místnosti, Ovládání Topení a Klimatizace)
  sheet: {
    close: "Zavřít",
    history: (i) => `Historie místnosti – ${i} h`,
    entityUnavailable: "Entita je nedostupná.",
    noModes: "Entita neuvádí podporované režimy.",
    modes: (i) => `${i}: režim`,
    presets: "Předvolby",
    systems: "Systém",
    allRooms: "Všechny místnosti",
    now: (i) => `Teď ${i}`,
    mode: "Režim",
    /** Klimatizace popup: timer, fan speed and air direction. */
    climate: {
      timer: "Vypnout za",
      fan: "Síla větru",
      swing: "Směr proudění",
      fanModes: { auto: "Auto", low: "Nízká", medium: "Střední", high: "Vysoká" },
      swingModes: { off: "Pevně", vertical: "Svisle", horizontal: "Vodorovně", both: "Vše" }
    },
    notOffered: "entita nenabízí",
    commandFailed: "Příkaz se nepodařilo odeslat.",
    /** Ovládání Topení: teplota a doba trvání (Ručně, Boost, Vypnuto). */
    heatControl: {
      temperature: "Teplota",
      fixedTemperature: "Pevná teplota",
      temperatureSlider: "Cílová teplota",
      duration: "Jak dlouho",
      durationSlider: "Doba trvání",
      nextPlan: "Do další změny plánu",
      untilResumed: "Dokud neobnovíte plán",
      until: (i) => `do ${i}`,
      offTarget: "Ochrana proti zamrznutí (5 °C)",
      appliesOnClose: "Použije se po zavření okna",
      remaining: (i) => `Zbývá ${i}`,
      noTimer: "Dobu nelze nastavit: Tado CE nenabízí časovač.",
      footIdle: "V režimu Plán se teplota řídí časovým plánem, časovač se nepoužije.",
      acFootIdle: "Zapněte některý režim, potom půjde nastavit časovač vypnutí.",
      bySchedule: "Podle plánu",
      timer: "Časovač",
      after: "Po skončení",
      noLimit: "Bez omezení",
      footPlan: "Platí do další změny plánu, potom pokračuje plán.",
      footOffForever: "Topení zůstane vypnuté, dokud ho nezapnete.",
      footForever: "Nastavení platí, dokud ho nezměníte.",
      footOffTimed: (i) => `Vypnuto do ${i}, potom pokračuje plán.`,
      footTimed: (i, t) => `Platí do ${i}, potom ${t}.`,
      afterPlanText: "přejde do Plánu",
      afterOffText: "se topení vypne",
      acFootForever: "Klimatizace běží, dokud ji nevypnete.",
      acFootTimed: (i) => `Běží do ${i}, potom se klimatizace vypne.`
    },
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (i) => `Za ${i === 1 ? "poslední hodinu" : i >= 2 && i <= 4 ? `poslední ${i} hodiny` : `posledních ${i} hodin`} nejsou k dispozici data.`,
    chart: (i) => `Graf za ${i}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`,
    temperatureDetails: "Detail teploty"
  },
  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera"
  },
  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (i) => `${i} ${et(i, "místnost", "místnosti", "místností")}`,
    conflict: {
      "window-heating": "Okno otevřené · topí se",
      "window-cooling": "Okno otevřené · chladí se",
      "cooling-cold": "Chladí se, i když je chladno"
    },
    conflictSpoken: {
      "window-heating": "Konflikt: Okno je otevřené a topí se",
      "window-cooling": "Konflikt: Okno je otevřené a chladí se",
      "cooling-cold": "Konflikt: Chladí se, i když je chladno"
    },
    windowsOpen: (i) => `${i} ${et(i, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    boost: "Boost",
    boostSpoken: "Topení v režimu Boost",
    manualSpoken: "Topení ručně",
    heating: (i) => `Topí ${i}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá"
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (i) => `${i} ${et(i, "minuta", "minuty", "minut")}`,
    hour: (i) => `${i} ${et(i, "hodina", "hodiny", "hodin")}`,
    day: (i) => `${i} ${et(i, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (i) => `${i} ${et(i, "minutu", "minuty", "minut")}`,
    hour: (i) => `${i} ${et(i, "hodinu", "hodiny", "hodin")}`
  }
}, bt = (i, t, e) => i === 1 ? t : e, Ho = {
  title: "Home",
  cardDescription: "Temperature, air quality, heating and blinds of your rooms at a glance.",
  status: {
    polluted: "Polluted air",
    veryStuffy: "Very stuffy air",
    stuffy: "Stuffy air",
    humid: "Humid",
    dry: "Dry",
    warm: "Warm",
    cold: "Chilly",
    comfortable: "Comfortable"
  },
  required: { temperature: "temperature", humidity: "humidity", co2: "CO₂", pm25: "PM2.5", houseMode: "house mode" },
  noData: (i, t) => `No data · ${i}${t === void 0 ? "" : ` (${t} ago)`}`,
  lastSeen: (i) => `Last report ${i} ago`,
  outsideAir: "Outdoor air:",
  airLevel: { good: "good", moderate: "moderate", poor: "poor" },
  summary: "Home summary",
  temperatureLabel: (i, t, e, n) => `${i}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${e}, room history for ${n}`,
  humidityLabel: (i, t, e) => `${i}: humidity ${t ?? "unknown"}${e}, details and history`,
  temperatureTrendLabel: (i, t, e, n) => `${i}: temperature${e ? ` ${e}` : ""} over ${t}, room history for ${n}`,
  link: { page: "Opens the room page.", web: "Opens the link." },
  air: "Air quality",
  airSensor: (i, t, e, n) => `${i} ${t ?? "unknown"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: air quality, ${t || "no sensor"}. ${e ? "Opens details." : "Opens details and history."}`,
  detailsAndHistory: "Details and history",
  unknownValue: "unknown",
  trend: { rising: "rising", falling: "falling", stable: "stable" },
  trendOver: (i, t) => `${i} over ${t}`,
  system: { heating: "Heating", climate: "Air conditioning" },
  heatingMode: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  climateMode: {
    off: "Off",
    cool: "Cooling",
    wind_free: "WindFree",
    dry: "Dry",
    fan: "Fan",
    heat: "Heating",
    auto: "Auto",
    unknown: "––"
  },
  unknownState: "unknown state",
  hvacDescription: (i, t, e) => `${i}: ${t}.${e ? ` Opens the ${e === "heating" ? "heating" : "air conditioning"} controls.` : ""}`,
  window: {
    open: "Open",
    openCount: (i) => `${i} open`,
    closed: "Closed",
    defaultName: (i) => `Window ${i}`,
    popup: "Windows",
    spokenSingle: (i, t) => i === "unknown" ? "window state unknown" : i === "closed" ? "window closed" : `window open${t === void 0 ? "" : ` for ${t}`}`,
    spokenOneOpen: (i, t) => `window ${i} open${t === void 0 ? "" : ` for ${t}`}`,
    spokenManyOpen: (i, t) => `windows ${i} open${t === void 0 ? "" : `, the longest for ${t}`}`,
    spokenAllClosed: "all windows closed",
    spokenUnknown: "state of the windows unknown",
    conflict: { heating: "window open while heating", cooling: "window open while cooling" },
    description: (i, t, e, n) => `${i}: ${t}${e ? `; conflict: ${e}` : ""}. ${n ? "Opens the window overview." : "Opens details and history."}`
  },
  cover: {
    label: (i, t, e) => `${i}: blind, ${t}${e ? ", moving" : ""}. Opens the controls.`,
    position: (i, t) => `position ${i}%, tilt ${t}%`,
    unknown: "position or tilt unknown",
    presets: (i) => `${i}: blind presets`,
    preset: (i, t, e, n) => `${i}: blind preset ${t}, ${e}. ${n ? "Double-tap or hold to run it." : "The blind is unavailable."}`,
    presetName: { open: "Day", shade: "Shade", dark: "Dark" },
    presetDescription: { open: "raised", shade: "lowered, slats open", dark: "full blackout" },
    hint: "Hold or double-tap",
    unavailable: "The blind is unavailable",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Could not send",
    failed: (i) => `${i}: the blind script could not be started.`
  },
  sheet: {
    close: "Close",
    history: (i) => `Room history – ${i} h`,
    entityUnavailable: "The entity is unavailable.",
    noModes: "The entity lists no supported modes.",
    modes: (i) => `${i}: mode`,
    presets: "Presets",
    systems: "System",
    allRooms: "All rooms",
    now: (i) => `Now ${i}`,
    mode: "Mode",
    /** Klimatizace popup: timer, fan speed and air direction. */
    climate: {
      timer: "Switch off in",
      fan: "Fan speed",
      swing: "Air direction",
      fanModes: { auto: "Auto", low: "Low", medium: "Medium", high: "High" },
      swingModes: { off: "Fixed", vertical: "Vertical", horizontal: "Horizontal", both: "Both" }
    },
    notOffered: "not offered by the entity",
    commandFailed: "The command could not be sent.",
    heatControl: {
      temperature: "Temperature",
      fixedTemperature: "Fixed temperature",
      temperatureSlider: "Target temperature",
      duration: "For how long",
      durationSlider: "Duration",
      nextPlan: "Until the next schedule change",
      untilResumed: "Until you resume the schedule",
      until: (i) => `until ${i}`,
      offTarget: "Frost protection (5 °C)",
      appliesOnClose: "Applied when you close this window",
      remaining: (i) => `${i} left`,
      noTimer: "The duration cannot be set: Tado CE offers no timer.",
      footIdle: "In Schedule mode the temperature follows the schedule; the timer is not used.",
      acFootIdle: "Turn on a mode first, then you can set the switch-off timer.",
      bySchedule: "By schedule",
      timer: "Timer",
      after: "When it ends",
      noLimit: "No limit",
      footPlan: "Applies until the next schedule change, then the schedule continues.",
      footOffForever: "The heating stays off until you turn it on.",
      footForever: "The setting applies until you change it.",
      footOffTimed: (i) => `Off until ${i}, then the schedule continues.`,
      footTimed: (i, t) => `Applies until ${i}, then ${t}.`,
      afterPlanText: "returns to the schedule",
      afterOffText: "the heating switches off",
      acFootForever: "The air conditioner runs until you switch it off.",
      acFootTimed: (i) => `Runs until ${i}, then the air conditioner switches off.`
    },
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (i) => `No data for ${i === 1 ? "the last hour" : `the last ${i} hours`}.`,
    chart: (i) => `Chart of ${i}. The left and right arrow keys move through time, the End key returns to now.`,
    temperatureDetails: "Temperature details"
  },
  chart: {
    now: "Now",
    yesterday: "yesterday"
  },
  summaryChips: {
    rooms: (i) => `${i} ${bt(i, "room", "rooms")}`,
    conflict: {
      "window-heating": "Window open · heating on",
      "window-cooling": "Window open · cooling on",
      "cooling-cold": "Cooling although chilly"
    },
    conflictSpoken: {
      "window-heating": "Conflict: a window is open while heating",
      "window-cooling": "Conflict: a window is open while cooling",
      "cooling-cold": "Conflict: cooling although it is chilly"
    },
    windowsOpen: (i) => `${i} ${bt(i, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    boost: "Boost",
    boostSpoken: "Heating in boost",
    manualSpoken: "Heating set manually",
    heating: (i) => `Heating in ${i}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on"
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (i) => `${i} ${bt(i, "minute", "minutes")}`,
    hour: (i) => `${i} ${bt(i, "hour", "hours")}`,
    day: (i) => `${i} ${bt(i, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (i) => i === 1 ? "the last minute" : `the last ${i} minutes`,
    hour: (i) => i === 1 ? "the last hour" : `the last ${i} hours`
  }
}, Rt = (i, t, e) => i === 1 ? t : e, No = {
  title: "Hem",
  cardDescription: "Översikt över temperatur, luftkvalitet, värme och persienner i rummen.",
  status: {
    polluted: "Förorenad luft",
    veryStuffy: "Mycket instängd luft",
    stuffy: "Instängd luft",
    humid: "Fuktigt",
    dry: "Torrt",
    warm: "Varmt",
    cold: "Kyligt",
    comfortable: "Behagligt"
  },
  required: { temperature: "temperatur", humidity: "luftfuktighet", co2: "CO₂", pm25: "PM2.5", houseMode: "husläge" },
  noData: (i, t) => `Inga data · ${i}${t === void 0 ? "" : ` (för ${t} sedan)`}`,
  lastSeen: (i) => `Senaste rapport för ${i} sedan`,
  outsideAir: "Utomhusluft:",
  airLevel: { good: "bra", moderate: "måttlig", poor: "dålig" },
  summary: "Sammanfattning av hemmet",
  temperatureLabel: (i, t, e, n) => `${i}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${e}, rumshistorik för ${n}`,
  humidityLabel: (i, t, e) => `${i}: luftfuktighet ${t ?? "okänd"}${e}, detaljer och historik`,
  temperatureTrendLabel: (i, t, e, n) => `${i}: temperaturen${e ? ` ${e}` : ""} under ${t}, rumshistorik för ${n}`,
  link: { page: "Öppnar rummets sida.", web: "Öppnar länken." },
  air: "Luftkvalitet",
  airSensor: (i, t, e, n) => `${i} ${t ?? "okänt"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: luftkvalitet, ${t || "ingen sensor"}. ${e ? "Öppnar detaljer." : "Öppnar detaljer och historik."}`,
  detailsAndHistory: "Detaljer och historik",
  unknownValue: "okänt",
  trend: { rising: "stiger", falling: "sjunker", stable: "stabil" },
  trendOver: (i, t) => `${i} under ${t}`,
  system: { heating: "Värme", climate: "Luftkonditionering" },
  heatingMode: { schedule: "Schema", manual: "Manuell", off: "Av", boost: "Boost" },
  climateMode: {
    off: "Av",
    cool: "Kyla",
    wind_free: "WindFree",
    dry: "Avfuktning",
    fan: "Fläkt",
    heat: "Värme",
    auto: "Auto",
    unknown: "––"
  },
  unknownState: "okänt läge",
  hvacDescription: (i, t, e) => `${i}: ${t}.${e ? ` Öppnar styrningen av ${e === "heating" ? "värmen" : "luftkonditioneringen"}.` : ""}`,
  window: {
    open: "Öppet",
    openCount: (i) => `${i} öppna`,
    closed: "Stängt",
    defaultName: (i) => `Fönster ${i}`,
    popup: "Fönster",
    spokenSingle: (i, t) => i === "unknown" ? "fönstrets läge okänt" : i === "closed" ? "fönstret stängt" : `fönstret öppet${t === void 0 ? "" : ` i ${t}`}`,
    spokenOneOpen: (i, t) => `fönstret ${i} öppet${t === void 0 ? "" : ` i ${t}`}`,
    spokenManyOpen: (i, t) => `fönstren ${i} öppna${t === void 0 ? "" : `, längst i ${t}`}`,
    spokenAllClosed: "alla fönster stängda",
    spokenUnknown: "fönstrens läge okänt",
    conflict: { heating: "öppet fönster under uppvärmning", cooling: "öppet fönster under kylning" },
    description: (i, t, e, n) => `${i}: ${t}${e ? `; konflikt: ${e}` : ""}. ${n ? "Öppnar fönsteröversikten." : "Öppnar detaljer och historik."}`
  },
  cover: {
    label: (i, t, e) => `${i}: persienn, ${t}${e ? ", rör sig" : ""}. Öppnar styrningen.`,
    position: (i, t) => `position ${i} %, lutning ${t} %`,
    unknown: "position eller lutning okänd",
    presets: (i) => `${i}: förval för persiennen`,
    preset: (i, t, e, n) => `${i}: persiennförval ${t}, ${e}. ${n ? "Dubbeltryck eller håll in för att köra det." : "Persiennen är inte tillgänglig."}`,
    presetName: { open: "Dag", shade: "Skugga", dark: "Mörker" },
    presetDescription: { open: "uppdragen", shade: "nerdragen, lamellerna öppna", dark: "full mörkläggning" },
    hint: "Håll in eller dubbeltryck",
    unavailable: "Persiennen är inte tillgänglig",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Kunde inte skickas",
    failed: (i) => `${i}: persiennskriptet kunde inte startas.`
  },
  sheet: {
    close: "Stäng",
    history: (i) => `Rumshistorik – ${i} h`,
    entityUnavailable: "Entiteten är inte tillgänglig.",
    noModes: "Entiteten anger inga lägen som stöds.",
    modes: (i) => `${i}: läge`,
    presets: "Förval",
    systems: "System",
    allRooms: "Alla rum",
    now: (i) => `Nu ${i}`,
    mode: "Läge",
    /** Klimatizace popup: timer, fan speed and air direction. */
    climate: {
      timer: "Stäng av om",
      fan: "Fläkthastighet",
      swing: "Luftriktning",
      fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög" },
      swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" }
    },
    notOffered: "erbjuds inte av entiteten",
    commandFailed: "Kommandot kunde inte skickas.",
    heatControl: {
      temperature: "Temperatur",
      fixedTemperature: "Fast temperatur",
      temperatureSlider: "Måltemperatur",
      duration: "Hur länge",
      durationSlider: "Varaktighet",
      nextPlan: "Till nästa schemaändring",
      untilResumed: "Tills du återupptar schemat",
      until: (i) => `till ${i}`,
      offTarget: "Frostskydd (5 °C)",
      appliesOnClose: "Tillämpas när du stänger fönstret",
      remaining: (i) => `${i} kvar`,
      noTimer: "Tiden kan inte ställas in: Tado CE erbjuder ingen timer.",
      footIdle: "I läget Schema följer temperaturen schemat; timern används inte.",
      acFootIdle: "Slå på ett läge först, sedan kan du ställa in avstängningstimern.",
      bySchedule: "Enligt schema",
      timer: "Timer",
      after: "När den tar slut",
      noLimit: "Ingen gräns",
      footPlan: "Gäller till nästa schemaändring, sedan fortsätter schemat.",
      footOffForever: "Värmen förblir av tills du slår på den.",
      footForever: "Inställningen gäller tills du ändrar den.",
      footOffTimed: (i) => `Av till ${i}, sedan fortsätter schemat.`,
      footTimed: (i, t) => `Gäller till ${i}, sedan ${t}.`,
      afterPlanText: "går värmen tillbaka till schemat",
      afterOffText: "stängs värmen av",
      acFootForever: "Luftkonditioneringen går tills du stänger av den.",
      acFootTimed: (i) => `Går till ${i}, sedan stängs luftkonditioneringen av.`
    },
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (i) => `Inga data för ${i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`}.`,
    chart: (i) => `Diagram över ${i}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`,
    temperatureDetails: "Temperaturdetaljer"
  },
  chart: {
    now: "Nu",
    yesterday: "igår"
  },
  summaryChips: {
    rooms: (i) => `${i} rum`,
    conflict: {
      "window-heating": "Fönster öppet · värme på",
      "window-cooling": "Fönster öppet · kyla på",
      "cooling-cold": "Kyler fast det är kyligt"
    },
    conflictSpoken: {
      "window-heating": "Konflikt: ett fönster är öppet medan värmen är på",
      "window-cooling": "Konflikt: ett fönster är öppet medan kylan är på",
      "cooling-cold": "Konflikt: kyler fast det är kyligt"
    },
    windowsOpen: (i) => `${i} fönster ${Rt(i, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    boost: "Boost",
    boostSpoken: "Värme i boost",
    manualSpoken: "Värme i manuellt läge",
    heating: (i) => `Värme i ${i}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på"
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (i) => `${i} ${Rt(i, "minut", "minuter")}`,
    hour: (i) => `${i} ${Rt(i, "timme", "timmar")}`,
    day: (i) => `${i} ${Rt(i, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (i) => i === 1 ? "den senaste minuten" : `de senaste ${i} minuterna`,
    hour: (i) => i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`
  }
}, Io = { cs: Ro, en: Ho, sv: No };
function ue(i, t) {
  return Po(Io, i, t);
}
const Fo = Ii`
    /*
     * Colours (CURRENT_SPEC.md, Barvy): the dark theme is the default set, the light theme
     * overrides it. The card sets data-theme on itself (theme: auto | dark | light), so the
     * popups, which sit outside .dashboard, follow it as well.
     */
    :host {
      display: block;
      color: var(--primary-text-color);
      --kd-text: #ffffff;
      --kd-label: #9a9aa0;
      --kd-off: #8e8e93;
      --kd-neutral: #c7c7cc;
      --kd-plan: #f2f2f7;
      --kd-closed: #6b6b70;
      --kd-warning: #ff9f0a;
      --kd-alert: #ff453a;
      --kd-alert-popup: #ff6961;
      --kd-sky: #64d2ff;
      --kd-dry: #ffd60a;
      --kd-auto: #bf5af2;
      --kd-co2: #8fbf9f;
      --kd-pm25: #a59dcf;
      --kd-peach: #ffb36b;
      --kd-blind: #e8d9b5;
      --kd-blind-opacity: 0.5;
      --kd-window-opacity: 0.28;
      --kd-rail-opacity: 0.7;
      --kd-preset-idle: #6f6f74;
      --kd-preset-on: #c9c0a8;
      --kd-preset-unavailable: rgb(111 111 116 / 55%);
      --kd-card-bg: #1c1c1e;
      --kd-card-gradient: linear-gradient(165deg, #232326 0%, #1c1c1e 55%);
      --kd-card-border: rgb(255 255 255 / 7%);
      --kd-card-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
      --kd-chip-tint: 14%;
      --kd-hint-bg: #3a3a3c;
      --kd-hint-text: #ffffff;
      --kd-hint-shadow: 0 4px 16px rgb(0 0 0 / 40%);
      --kd-backdrop: 60%;
      --kd-sheet-bg: #1c1c1e;
      --kd-sheet-border: rgb(255 255 255 / 10%);
      --kd-grabber: rgb(255 255 255 / 28%);
      --kd-segmented-bg: rgb(118 118 128 / 24%);
      --kd-segment-on: #636366;
      --kd-segment-shadow: 0 2px 6px rgb(0 0 0 / 30%);
      --kd-fill: rgb(255 255 255 / 5%);
      --kd-fill-border: rgb(255 255 255 / 8%);
      --kd-night: rgb(0 0 0 / 30%);
      --kd-grid: rgb(255 255 255 / 8%);
      --kd-grid-soft: rgb(255 255 255 / 6%);
      --kd-area: rgb(255 255 255 / 7%);
      --kd-scene-bedroom: #a5a1f2;
      --kd-scene-office: #7fc8f8;
      --kd-scene-kids: #ffb36b;
      --kd-scene-living: #e8d9b5;
      --kd-image-opacity: 0.5;
    }

    /* Light theme: the same meanings, darker tones (text 4.5 : 1, icons and lines 3 : 1 on white). */
    :host([data-theme="light"]) {
      --kd-text: #1c1c1e;
      --kd-label: #6c6c70;
      --kd-off: #6e6e73;
      --kd-neutral: #48484a;
      --kd-plan: #3a3a3c;
      --kd-closed: #c7c7cc;
      --kd-warning: #a85200;
      --kd-alert: #c4001a;
      --kd-alert-popup: #c4001a;
      --kd-sky: #006b9c;
      --kd-dry: #7a5e00;
      --kd-auto: #8944ab;
      --kd-co2: #3d7a55;
      --kd-pm25: #6158a8;
      --kd-peach: #b8641c;
      --kd-blind: #8f7a52;
      --kd-blind-opacity: 0.6;
      --kd-window-opacity: 0.16;
      --kd-rail-opacity: 0.8;
      --kd-preset-idle: #8e8e93;
      --kd-preset-on: #7a5c2e;
      --kd-preset-unavailable: rgb(142 142 147 / 45%);
      --kd-card-bg: #ffffff;
      --kd-card-gradient: #ffffff;
      --kd-card-border: rgb(0 0 0 / 6%);
      --kd-card-shadow: 0 1px 3px rgb(0 0 0 / 6%);
      --kd-chip-tint: 10%;
      --kd-hint-bg: #ffffff;
      --kd-hint-text: #1c1c1e;
      --kd-hint-shadow: 0 4px 16px rgb(0 0 0 / 16%), 0 0 0 1px rgb(0 0 0 / 6%);
      --kd-backdrop: 35%;
      --kd-sheet-bg: #ffffff;
      --kd-sheet-border: rgb(0 0 0 / 8%);
      --kd-grabber: rgb(60 60 67 / 30%);
      --kd-segmented-bg: rgb(118 118 128 / 12%);
      --kd-segment-on: #ffffff;
      --kd-segment-shadow: 0 2px 6px rgb(0 0 0 / 12%);
      --kd-fill: rgb(0 0 0 / 4%);
      --kd-fill-border: rgb(0 0 0 / 8%);
      --kd-night: rgb(0 0 0 / 6%);
      --kd-grid: rgb(0 0 0 / 8%);
      --kd-grid-soft: rgb(0 0 0 / 6%);
      --kd-area: rgb(0 0 0 / 5%);
      --kd-scene-bedroom: #6f67d6;
      --kd-scene-office: #2c8bc9;
      --kd-scene-kids: #d9822b;
      --kd-scene-living: #a88f5c;
      --kd-image-opacity: 0.6;
    }

    ha-card {
      overflow: visible;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    /*
     * The card measures its own width, not the window: one column of rooms, two columns from
     * 620 px of card width (a phone on its side, a tablet), never more (CURRENT_SPEC.md,
     * Room Card). A room that ends up narrow switches to the narrow variables itself.
     */
    .dashboard {
      display: grid;
      gap: 12px;
      container: dashboard / inline-size;
      /* Panel view and wide screens: no wider than four rooms side by side. */
      max-width: 2300px;
      margin-inline: auto;
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
      display: grid;
      gap: 2px;
      margin-top: 5px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }

    /* House summary: chips only for what differs from a quiet house. */
    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0 0;
      padding: 0;
      list-style: none;
    }

    /* One line, 30 px high; a chip wider than the card (long room names, a longer language) wraps
       its text instead of making the page scroll sideways. */
    .chip {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      min-height: 30px;
      padding: 6px 12px 6px 9px;
      border-radius: 15px;
      background: color-mix(in srgb, var(--chip-color) var(--kd-chip-tint), var(--kd-card-bg));
      color: var(--chip-color);
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
    }

    .chip-icon {
      display: flex;
      flex: none;
      width: 18px;
      height: 18px;
    }

    .chip-icon svg {
      width: 18px;
      height: 18px;
    }

    .rooms {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }

    /*
     * Columns by the width of the card (a room is 320–570 px wide): 2 from 620 px, 3 from 1000 px,
     * 4 from 1400 px; never more columns than rooms (.n3, .n4 = three, four or more rooms).
     */
    @container dashboard (min-width: 620px) {
      .rooms {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @container dashboard (min-width: 1000px) {
      .rooms.n3,
      .rooms.n4 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @container dashboard (min-width: 1400px) {
      .rooms.n4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    /* Measures the room, so the narrow variables follow its width in one or two columns. */
    .room-cell {
      min-width: 0;
      container: room / inline-size;
    }

    .room {
      /*
       * One size for every info row (CURRENT_SPEC.md, Vizuální pravidla): row height, icon,
       * values, labels and units. --col is the blind panel width, --preset-col the column of
       * blind presets to its right, --cover-gap the grid gap in front of the panel and the
       * presets. --group-gap separates the air
       * rows (CO₂, PM2.5) from the Topení / Klimatizace / window rows.
       */
      --row-h: 26px;
      --row-font: 15px;
      --icon: 22px;
      --info-gap: 6px;
      --icon-gap: 7px;
      --group-gap: 12px;
      --col: 60px;
      --preset-col: 36px;
      --preset-icon: 32px;
      /*
       * Blind preset icons: dim grey; the one matching the blind changes its colour to a muted
       * tone of the blind's champagne (colour only, no background).
       */
      --preset-idle: var(--kd-preset-idle);
      --preset-on: var(--kd-preset-on);
      /* The window row is a little taller than the others: it is the lowest touch target (44 px with the invisible area below). */
      --window-h: 32px;
      /* Width of the CO₂ / PM2.5 value column; the value may run past it, the trend starts right behind it. */
      --air-text: 72px;
      /* How far the temperature trend reaches left, under the end of the Topení / Klimatizace texts (it fades out there). */
      --trend-reach: 28px;
      --cover-gap: 4px;
      position: relative;
      overflow: hidden;
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      border: 1px solid var(--kd-card-border);
      border-radius: 24px;
      background: var(--kd-card-gradient);
      box-shadow: var(--kd-card-shadow);
      color: var(--kd-text);
      font: inherit;
      text-align: left;
    }

    /* Rooms of one row are equally tall (a compact room next to a full one). */
    .room-cell > .room {
      height: 100%;
    }

    /* No blind and no CO₂ / PM2.5: the three empty rows above Topení are left out (64 px shorter). */
    .room.compact .info {
      grid-template-rows: 0 0 0 var(--row-h) var(--row-h) var(--window-h);
    }

    /* Above the picture; the screen-reader descriptions keep their own absolute position. */
    .room > *:not(.scene, .sr-only) {
      position: relative;
    }

    /*
     * Decorative illustration: a soft rectangle over the free top-right part of the card
     * header, fading out only along its left and bottom edge (CURRENT_SPEC.md, Room Card).
     */
    .scene {
      position: absolute;
      top: 0;
      right: 0;
      width: 58%;
      height: 132px;
      color: var(--scene-tone);
      background: linear-gradient(
        to left,
        color-mix(in srgb, currentColor 13%, transparent),
        color-mix(in srgb, currentColor 5%, transparent)
      );
      -webkit-mask-image:
        linear-gradient(to right, transparent 10%, #000 60%),
        linear-gradient(to top, transparent, #000 15%);
      -webkit-mask-composite: source-in;
      mask-image:
        linear-gradient(to right, transparent 10%, #000 60%),
        linear-gradient(to top, transparent, #000 15%);
      mask-composite: intersect;
      pointer-events: none;
    }

    /* A picture of the user's fills the soft rectangle and fades out the same way. */
    .scene.photo {
      background: none;
    }

    .scene img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: var(--kd-image-opacity);
    }

    .scene svg {
      position: absolute;
      top: 1px;
      right: 14px;
      width: 150px;
      height: 112px;
      opacity: 0.62;
    }

    /* In a narrow room the drawing shrinks so it stays right of the humidity (about 190 px). */
    @supports (width: 1cqw) {
      .scene svg {
        width: min(150px, max(0px, calc(100cqw - 190px)));
        height: auto;
      }
    }

    .plain-button {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      cursor: pointer;
      font: inherit;
      text-align: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    .plain-button:disabled {
      cursor: default;
    }

    .plain-button:focus-visible {
      outline: 2px solid var(--primary-color, #64b5f6);
      outline-offset: 2px;
      border-radius: 6px;
    }

    .room-title {
      overflow: hidden;
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -0.4px;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Room name with a link: the name and a chevron; the touch target is 44 px high (invisible area). */
    .room-link {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      overflow: visible;
    }

    .room-link::after {
      content: "";
      position: absolute;
      inset: -6px 0;
    }

    .room-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .room-chevron {
      flex: none;
      color: var(--kd-label);
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
    }

    .status-line {
      display: flex;
      align-items: center;
      gap: 7px;
      min-height: 20px;
      font-size: var(--row-font);
      line-height: 20px;
    }

    .status-dot {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      flex: 0 0 8px;
      border-radius: 50%;
    }

    /* Temperature (dominant) and humidity side by side; no micro trend here. */
    .measurements {
      display: flex;
      align-items: baseline;
      gap: 14px;
      min-height: 44px;
      margin: 8px 0 10px;
      font-variant-numeric: tabular-nums;
    }

    .temperature {
      font-size: 38px;
      letter-spacing: -0.5px;
      line-height: 44px;
      white-space: nowrap;
    }

    .temperature-unit {
      color: var(--kd-label);
      font-size: 18px;
      letter-spacing: 0;
    }

    /* Humidity is neutral, except when it decided the room status (inline colour). */
    .humidity {
      position: relative;
      min-width: 44px;
      color: var(--kd-neutral);
      font-size: 18px;
      line-height: 28px;
    }

    /* Invisible touch target of 44 px in height. */
    .humidity::after {
      content: "";
      position: absolute;
      inset: -8px 0;
    }

    .missing {
      color: var(--kd-off);
    }

    /*
     * Small grey clock at a stale value: the grey number alone could look like a fault.
     * Beside CO₂ / PM2.5 it follows the unit; at temperature and humidity it sits above the end of
     * the text, so the row never changes its width when a value turns stale (the picture keeps its room).
     */
    .stale-mark {
      display: inline-flex;
      flex: none;
      align-self: center;
      width: 14px;
      height: 14px;
      margin-left: 6px;
      color: var(--kd-off);
    }

    .stale-mark svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .temperature,
    .humidity {
      position: relative;
    }

    .temperature .stale-mark {
      position: absolute;
      top: 3px;
      right: 4px;
      width: 16px;
      height: 16px;
      margin: 0;
    }

    .humidity .stale-mark {
      position: absolute;
      top: -5px;
      right: -2px;
      width: 11px;
      height: 11px;
      margin: 0;
    }

    /* Stale value: dimmed, never coloured (CURRENT_SPEC.md, Chybějící data). */
    .temperature.stale,
    .humidity.stale {
      color: var(--kd-off);
    }

    /*
     * Lower part: info rows | blind panel | blind presets. The blind panel is as tall as the
     * info rows (5 × --row-h), so it starts at the CO₂ row.
     */
    .lower {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--col) var(--preset-col);
      align-items: stretch;
      column-gap: var(--cover-gap);
    }

    /*
     * Info rows: two equally wide columns, values on the left and micro trends on the right
     * (CURRENT_SPEC.md, Room Card). The temperature trend spans the Topení and Klimatizace rows.
     */
    .info {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-rows: var(--row-h) var(--row-h) var(--group-gap) var(--row-h) var(--row-h) var(--window-h);
      column-gap: var(--info-gap);
      min-width: 0;
      font-size: var(--row-font);
      font-variant-numeric: tabular-nums;
    }

    /* CO₂ and PM2.5: one touch target over both rows (52 px). */
    .air-block {
      grid-column: 1 / -1;
      grid-row: 1 / span 2;
      display: grid;
      grid-template-rows: var(--row-h) var(--row-h);
      min-width: 0;
    }

    /* Row 3 is the gap between the air rows and the Topení / Klimatizace / window rows. */
    /*
     * Topení + Klimatizace: one touch target over both rows. It may grow into the faded start
     * of the temperature trend (up to 40 % of the trend column) so a target such as
     * "WindFree · 22 °C" stays whole, and sits above the trend.
     */
    .slot-hvac {
      grid-column: 1 / -1;
      grid-row: 4 / span 2;
      justify-self: start;
      /* At least the whole left column, so no tap falls into a gap. */
      min-width: calc((100% - var(--info-gap)) / 2);
      max-width: calc((100% - var(--info-gap)) / 2 * 1.4 + var(--info-gap));
    }

    /* Text only for screen readers. */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .hvac {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-rows: var(--row-h) var(--row-h);
    }

    .slot-temperature-trend {
      grid-column: 2;
      grid-row: 4 / span 2;
    }

    /* Two classes: .system-row (later, same weight) would otherwise reset the height to one row. */
    .system-row.slot-window {
      position: relative;
      /* At least the left column, but free to grow to the right (the empty cell next to it) so a label with the conflict dot never gets cut. */
      grid-column: 1 / -1;
      grid-row: 6;
      justify-self: start;
      min-width: calc((100% - var(--info-gap)) / 2);
      max-width: 100%;
      height: var(--window-h);
    }

    /* The icon and text sit like in the other rows; the extra height and the area below form the touch target. */
    .slot-window .row-main {
      align-self: flex-start;
    }

    .system-row.slot-window::after {
      content: "";
      position: absolute;
      inset: 0 0 calc(var(--window-h) - 44px) 0;
    }

    /*
     * CO₂ / PM2.5: icon and value, then the trend. The trend starts at a fixed distance from the
     * left edge (--air-text + gap), under the end of even the shortest value ("2 µg/m³"), so
     * it always continues right behind the value instead of at a distant column.
     */
    .air-row {
      display: grid;
      grid-template-columns: var(--air-text) minmax(0, 1fr);
      column-gap: var(--info-gap);
      align-items: stretch;
      min-width: 0;
      height: var(--row-h);
    }

    .system-row {
      display: flex;
      min-width: 0;
      height: var(--row-h);
      color: var(--row-color);
    }

    .row-main {
      display: flex;
      align-items: center;
      gap: var(--icon-gap);
      min-width: 0;
      height: var(--row-h);
    }

    .row-icon {
      display: flex;
      width: var(--icon);
      height: var(--icon);
      flex: 0 0 var(--icon);
      align-items: center;
      justify-content: center;
    }

    .row-icon svg {
      display: block;
      width: var(--icon);
      height: var(--icon);
    }

    .row-icon ha-icon {
      display: flex;
      --mdc-icon-size: var(--icon);
    }

    /*
     * Value or label and its unit / target. When both do not fit, the unit or target wraps onto
     * a second line that is clipped, so a number is never cut in the middle.
     */
    .row-text {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      column-gap: 0.3em;
      min-width: 0;
      height: var(--row-h);
      overflow: hidden;
    }

    .row-label,
    .row-unit {
      line-height: var(--row-h);
      white-space: nowrap;
    }

    .row-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Open window against heating or cooling: a small orange dot after "Otevřeno". */
    .conflict-dot {
      align-self: center;
      width: 6px;
      height: 6px;
      margin-left: 2px;
      border-radius: 50%;
      background: var(--kd-warning);
      opacity: 0.85;
    }

    .system-row.strong .row-label {
      font-weight: 500;
    }

    .row-unit {
      color: var(--kd-label);
      font-weight: 400;
    }

    /*
     * Micro trend: stretches over its cell; the dot is HTML so it stays round. The right
     * padding keeps the end of the trend (edge of the dot) 1.5 × the panel–preset gap away
     * from the blind panel: --panel-gap is the distance from the panel to the preset glyph
     * (the rail is 27/32 of the icon), the dot sticks out 2.5 px beyond the padding.
     */
    .trend-button {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .spark {
      --panel-gap: calc(var(--cover-gap) + (var(--preset-col) - var(--preset-icon) * 0.84375) / 2);
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px calc(var(--panel-gap) * 1.5 - var(--cover-gap) + 2.5px) 5px 3px;
    }

    /*
     * Trends reach left under the end of the value and its unit and fade out there over most
     * of their width, so the line seems to grow out of the value and the text above it stays
     * readable.
     */
    .spark {
      -webkit-mask-image: linear-gradient(to right, transparent, #000 80%);
      mask-image: linear-gradient(to right, transparent, #000 80%);
    }

    .slot-temperature-trend {
      width: calc(100% + var(--trend-reach));
      margin-left: calc(-1 * var(--trend-reach));
    }

    .slot-temperature-trend .spark {
      width: 100%;
      margin-left: 0;
    }

    /* The value and its unit stay above the trend and never wrap (CO₂: "656 ppm"). */
    .air-row .row-main {
      position: relative;
      z-index: 1;
    }

    .air-row .row-text {
      flex-wrap: nowrap;
      overflow: visible;
    }

    /* The number is as heavy as "Plán" in the Topení row (the unit stays regular). */
    .air-row .row-label {
      flex: none;
      overflow: visible;
      font-weight: 500;
    }

    .spark.stale {
      opacity: 0.35;
    }

    .spark.loading {
      color: var(--kd-off);
      animation: loading 1.4s ease-in-out infinite alternate;
    }

    @keyframes loading {
      from {
        opacity: 0.35;
      }
      to {
        opacity: 0.8;
      }
    }

    .trend-button .spark {
      padding-top: 7px;
      padding-bottom: 7px;
    }

    .spark-plot {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }

    .spark-plot svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .spark-dot {
      position: absolute;
      width: 5px;
      height: 5px;
      margin: -2.5px 0 0 -2.5px;
      border-radius: 50%;
      background: currentColor;
    }

    /*
     * One column of three icon buttons to the right of the blind panel, in the order Den,
     * Stín, Tma, each a third of the panel height. Dim grey; the icon that matches the state
     * of the blind changes its colour to muted champagne, nothing else (no square, no frame).
     * While a preset is on its way its icon fades between the two colours and back until the
     * blind arrives. They are pressed by a long press or a double tap; while the button is held
     * the icon takes on the lit colour.
     */
    .presets {
      display: flex;
      flex-direction: column;
    }

    .preset {
      position: relative;
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 0;
      border-radius: 10px;
      color: var(--preset-idle);
      transition: color 220ms ease-out;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }

    .preset svg {
      position: relative;
      display: block;
      width: var(--preset-icon);
      height: var(--preset-icon);
      transition: transform 120ms ease-out;
    }

    /* Invisible touch target of 44 px in width: reaches into the gap to the panel and the card padding. */
    .preset::before {
      content: "";
      position: absolute;
      inset: 0 calc(var(--preset-col) - 44px + var(--cover-gap)) 0 calc(-1 * var(--cover-gap));
    }

    .preset:active svg {
      transform: scale(0.92);
    }

    .preset:active {
      animation: hold 550ms linear forwards;
    }

    /* The icon that matches the state of the blind. */
    .preset[aria-pressed="true"] {
      color: var(--preset-on);
    }

    /* Preset on its way: the icon colour goes there and back until the blind arrives. */
    .preset.pending {
      animation: preset-tint 1.3s ease-in-out infinite alternate;
    }

    @keyframes preset-tint {
      from {
        color: var(--preset-idle);
      }
      to {
        color: var(--preset-on);
      }
    }

    /* Blind unavailable: buttons stay focusable but dim; a tap only explains why. */
    .preset.unavailable {
      color: var(--kd-preset-unavailable);
    }

    .preset.unavailable:active svg {
      transform: none;
    }

    .preset.unavailable:active {
      animation: none;
    }

    /* "Podržte nebo klepněte dvakrát" after a single tap, to the left of the button. */
    .preset-hint {
      position: absolute;
      z-index: 3;
      top: 50%;
      right: calc(100% + 8px);
      padding: 6px 10px;
      border-radius: 10px;
      background: var(--kd-hint-bg);
      box-shadow: var(--kd-hint-shadow);
      color: var(--kd-hint-text);
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
      white-space: nowrap;
      transform: translateY(-50%);
      animation: hint-in 160ms ease-out;
      pointer-events: none;
    }

    /* Script failed: red ring around the button, a short shake, the reason in a red bubble. */
    .preset.failed {
      box-shadow: inset 0 0 0 1.5px var(--kd-alert);
      color: var(--kd-alert);
    }

    .preset.failed svg {
      animation: shake 360ms ease-in-out;
    }

    .preset-hint.error {
      border: 1px solid var(--kd-alert);
    }

    @keyframes shake {
      20%,
      60% {
        transform: translateX(-3px);
      }
      40%,
      80% {
        transform: translateX(3px);
      }
    }

    @keyframes hint-in {
      from {
        opacity: 0;
        transform: translate(6px, -50%);
      }
    }

    /* Preset sent: the icon pops once. */
    .preset.sent svg {
      animation: sent 600ms ease-out;
    }

    @keyframes hold {
      from {
        color: var(--preset-idle);
      }
      to {
        color: var(--preset-on);
      }
    }

    @keyframes sent {
      0% {
        transform: scale(1.22);
      }
      100% {
        transform: scale(1);
      }
    }

    .cover-panel {
      display: block;
      min-width: 0;
      height: 100%;
    }

    /* While the blind moves, its top rail pulses softly. */
    .cover-panel.moving .rail {
      animation: rail 900ms ease-in-out infinite alternate;
    }

    @keyframes rail {
      to {
        opacity: 0.25;
      }
    }

    .cover-panel svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / calc(var(--kd-backdrop) * var(--backdrop-opacity, 1)));
      /* A drag on the dimmed area must not move the dashboard below. */
      overscroll-behavior: contain;
      touch-action: none;
    }

    .sheet {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      /* The end of the popup's own scrolling does not carry on to the page below it. */
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid var(--kd-sheet-border);
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: var(--kd-sheet-bg);
      color: var(--kd-text);
      animation: rise 220ms ease-out;
      transition: transform 220ms ease-out;
    }

    .sheet.dragging {
      transition: none;
    }

    /* Grabber and title: pull down to close. */
    .sheet-top {
      margin: -8px -16px 0;
      padding: 8px 16px 0;
      touch-action: none;
      cursor: grab;
    }

    .grabber {
      width: 36px;
      height: 5px;
      margin: 0 auto 10px;
      border-radius: 3px;
      background: var(--kd-grabber);
    }

    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }

    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }

      .sheet {
        border-bottom: 1px solid var(--kd-sheet-border);
        border-radius: 24px;
      }

      .grabber {
        display: none;
      }
    }

    /*
     * Phone on its side (or any short window): the history popup takes the whole width, so the
     * chart uses the full width of the phone. The same query is in chartWidth().
     */
    @media (orientation: landscape) and (max-height: 600px) {
      .sheet.history-sheet {
        max-width: min(960px, calc(100% - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
        max-height: calc(100% - 16px);
      }
    }

    /* Topení | Klimatizace in the HVAC popup (iOS segmented control). */
    .segmented {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: 2px;
      margin: 0 0 4px;
      padding: 2px;
      border-radius: 10px;
      background: var(--kd-segmented-bg);
    }

    .segment {
      min-height: 44px;
      border-radius: 8px;
      color: var(--kd-text);
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }

    .segment[aria-selected="true"] {
      background: var(--kd-segment-on);
      box-shadow: var(--kd-segment-shadow);
    }

    .system-name {
      margin-top: 0;
    }

    .sheet-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }

    .sheet h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }

    .sheet-sub {
      color: var(--kd-label);
      font-size: 14px;
      line-height: 20px;
    }

    .close {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      margin: -8px -8px 0 0;
      color: var(--kd-label);
      font-size: 18px;
      text-align: center;
    }

    .sheet-message {
      margin: 16px 0;
      color: var(--kd-label);
      font-size: 14px;
    }

    .sheet-message.error {
      color: var(--kd-warning);
    }

    .sheet-label {
      margin: 16px 0 8px;
      color: var(--kd-label);
      font-size: 13px;
    }

    .options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 56px;
      padding: 8px 12px;
      border: 1px solid var(--kd-fill-border);
      border-radius: 16px;
      background: var(--kd-fill);
      color: var(--kd-text);
      font-size: 15px;
    }

    .option-icon {
      display: flex;
      width: 28px;
      height: 28px;
      flex: 0 0 28px;
      align-items: center;
      justify-content: center;
      color: var(--tone);
    }

    /* One option per row: Kvalita vzduchu (CO₂, PM2.5) and Okna. */
    .list-options {
      grid-template-columns: minmax(0, 1fr);
    }

    .list-option {
      width: 100%;
      text-align: left;
    }

    .option-text {
      flex: 1;
    }

    .list-value {
      margin-left: auto;
      font-size: 17px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    /* How long a window has been open, faintly after its state. */
    .list-extra {
      color: var(--kd-label);
      font-size: 15px;
    }

    .option-icon ha-icon {
      display: flex;
      --mdc-icon-size: 24px;
    }

    .option-icon svg {
      display: block;
      width: 22px;
      height: 22px;
    }

    .option-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .option-hint {
      color: var(--kd-label);
      font-size: 11px;
      line-height: 14px;
    }

    .option[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--tone) 70%, transparent);
      background: color-mix(in srgb, var(--tone) 18%, transparent);
    }

    .option:disabled {
      opacity: 0.45;
    }

    /* Topení: temperature and duration of Ručně / Boost / Vypnuto (slider of the boiler design). */
    .heat-control {
      margin-top: 16px;
      padding: 12px 14px 8px;
      border: 1px solid var(--kd-fill-border);
      border-radius: 16px;
      background: var(--kd-fill);
    }

    .heat-control > * + * {
      margin-top: 12px;
    }

    .slider-head,
    .heat-fixed {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .slider-label {
      color: var(--kd-label);
      font-size: 13px;
    }

    .slider-big {
      font-size: 22px;
      font-variant-numeric: tabular-nums;
      text-align: right;
    }

    .slider-sub {
      color: var(--kd-label);
      font-size: 13px;
      text-align: right;
    }

    .heat-slider {
      --track: var(--kd-slider-track, rgb(120 120 128 / 36%));
      -webkit-appearance: none;
      appearance: none;
      display: block;
      width: 100%;
      height: 44px;
      margin: 0;
      background: transparent;
      cursor: pointer;
      touch-action: pan-y;
    }

    .heat-slider::-webkit-slider-runnable-track {
      height: 14px;
      border-radius: 7px;
      background: linear-gradient(to right, var(--kd-sky) 0%, var(--kd-sky) var(--fill), var(--track) var(--fill), var(--track) 100%);
    }

    .heat-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 42px;
      height: 28px;
      margin-top: -7px;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
    }

    .heat-slider::-moz-range-track {
      height: 14px;
      border-radius: 7px;
      background: var(--track);
    }

    .heat-slider::-moz-range-progress {
      height: 14px;
      border-radius: 7px;
      background: var(--kd-sky);
    }

    .heat-slider::-moz-range-thumb {
      width: 42px;
      height: 28px;
      border: 0;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
    }

    .heat-slider:focus-visible {
      outline: none;
    }

    .heat-slider:focus-visible::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px var(--kd-sheet-bg), 0 0 0 5px var(--kd-text);
    }

    .heat-slider:focus-visible::-moz-range-thumb {
      box-shadow: 0 0 0 3px var(--kd-sheet-bg), 0 0 0 5px var(--kd-text);
    }

    /* Ticks sit between the centres of the thumb at both ends (thumb width 42 px). */
    .slider-ticks {
      display: flex;
      justify-content: space-between;
      margin: -4px 21px 0;
    }

    .slider-ticks span {
      width: 2px;
      height: 6px;
      border-radius: 1px;
      background: var(--kd-label);
      opacity: 0.6;
    }

    .slider-scale {
      display: flex;
      justify-content: space-between;
      margin-top: 2px;
      color: var(--kd-label);
      font-size: 12px;
    }

    .heat-detail {
      margin: 8px 0 0;
      color: var(--kd-label);
      font-size: 13px;
    }

    /* Under the options; its height is reserved so the options never move when it appears. */
    .heat-note {
      min-height: 32px;
      margin: 8px 0 0;
      color: var(--kd-label);
      font-size: 13px;
      line-height: 16px;
      text-align: center;
    }

    /* Topení: the four modes as icons in one row, label under the icon. */
    .icon-options {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 6px;
    }

    .icon-options .option {
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-height: 64px;
      padding: 8px 2px;
      font-size: 12px;
      text-align: center;
    }

    .icon-options .option-text {
      align-items: center;
    }

    .icon-options .option-hint {
      display: none;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip-button {
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid var(--kd-fill-border);
      border-radius: 22px;
      background: var(--kd-fill);
      color: var(--kd-text);
      font-size: 14px;
    }

    .chip-button[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--kd-sky) 70%, transparent);
      background: color-mix(in srgb, var(--kd-sky) 18%, transparent);
    }

    /* Summary chip that opens the popup for the rooms it names: 44 px high touch target, the chip stays 30 px. */
    .chip-open {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 44px;
      margin: -7px -12px -7px -9px;
      padding: 13px 12px 13px 9px;
      border-radius: 22px;
      color: inherit;
      font: inherit;
      text-align: left;
    }

    /* Big temperature in a ring (Topení / Klimatizace popup). */
    .dial {
      display: flex;
      justify-content: center;
      margin: 4px 0 0;
    }

    .dial-ring {
      position: relative;
      width: min(100%, 176px);
      aspect-ratio: 272 / 232;
      touch-action: none;
      border-radius: 50%;
      user-select: none;
      -webkit-user-select: none;
    }

    .dial-ring[role="slider"] {
      cursor: pointer;
    }

    .dial-ring:focus-visible {
      outline: 2px solid var(--kd-sky);
      outline-offset: 2px;
    }

    .dial-ring svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .dial-track,
    .dial-value {
      fill: none;
      stroke-width: 14;
      stroke-linecap: round;
    }

    .dial-track {
      stroke: var(--kd-fill-border);
    }

    .dial-value {
      stroke: var(--tone);
    }

    .dial-knob {
      fill: #fff;
      stroke: var(--tone);
      stroke-width: 3;
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 35%));
    }

    .dial-knob.still {
      fill: var(--tone);
      stroke: none;
      filter: none;
    }

    /* The value is centred in the ring both ways; the small texts do not move it. */
    .dial-text {
      position: absolute;
      inset: 0 0 auto 0;
      /* As high as the whole ring (272 / 232), so the value sits in its centre. */
      height: 117.24%;
      display: grid;
      grid-template-rows: 1fr auto 1fr;
      justify-items: center;
      pointer-events: none;
    }

    .dial-eyebrow {
      align-self: end;
      padding-bottom: 2px;
      color: var(--kd-label);
      font-size: 13px;
    }

    .dial-big {
      font-size: 56px;
      font-weight: 600;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .dial-big.word {
      font-size: 30px;
    }

    .dial-sub {
      align-self: start;
      padding-top: 4px;
      color: var(--kd-label);
      font-size: 13px;
    }

    /* Timer: icon at the left end, ∞ at the right end, the time above (Tado hot water). */
    .options + .timer-card,
    .options + .heat-note + .timer-card {
      margin-top: 10px;
    }

    .timer-card {
      padding: 10px 12px 8px;
      border: 1px solid var(--kd-fill-border);
      border-radius: 16px;
      background: var(--kd-fill);
    }

    .timer-read {
      padding: 2px 0 0;
      font-size: 17px;
      font-weight: 600;
      line-height: 22px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }

    .timer-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .end-button {
      display: flex;
      flex: 0 0 44px;
      width: 44px;
      height: 44px;
      align-items: center;
      justify-content: center;
      border-radius: 22px;
      color: var(--kd-label);
    }

    .end-button[aria-pressed="true"] {
      background: color-mix(in srgb, var(--kd-sky) 20%, transparent);
      color: var(--kd-text);
    }

    .end-icon {
      display: flex;
      width: 22px;
      height: 22px;
      align-items: center;
      justify-content: center;
    }

    .end-icon svg {
      width: 22px;
      height: 22px;
    }

    .end-icon.infinity {
      font-size: 26px;
      line-height: 1;
    }

    .timer-slider {
      position: relative;
      flex: 1;
      height: 44px;
      margin: 0 20px;
      touch-action: none;
      cursor: pointer;
    }

    .timer-slider:focus-visible {
      outline: 2px solid var(--kd-sky);
      outline-offset: 2px;
      border-radius: 8px;
    }

    /* iOS slider (HIG): the track up to the thumb is filled with colour, the thumb is a narrow lozenge; icons at both ends. */
    .timer-track,
    .timer-fill {
      position: absolute;
      top: 19px;
      height: 6px;
      border-radius: 3px;
    }

    .timer-track {
      left: 0;
      right: 0;
      background: var(--kd-fill-border);
    }

    .timer-fill {
      left: 0;
      background: var(--kd-sky);
    }

    .timer-knob {
      position: absolute;
      top: 10px;
      width: 36px;
      height: 24px;
      margin-left: -18px;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 35%), 0 0 0 0.5px rgb(0 0 0 / 10%);
    }

    .timer-ticks {
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
      color: var(--kd-label);
      font-size: 12px;
      line-height: 16px;
    }

    .timer-ticks b {
      color: var(--kd-text);
      font-weight: 600;
    }

    .dim {
      opacity: 0.4;
    }

    .after-row.away {
      visibility: hidden;
    }

    .timer-foot {
      min-height: 36px;
      margin: 8px 4px 0;
      color: var(--kd-label);
      font-size: 13px;
      line-height: 18px;
    }

    /* Po skončení: Plán | Vypnuto. */
    .after-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 6px;
      padding-top: 8px;
      border-top: 1px solid var(--kd-fill-border);
      font-size: 15px;
    }

    .mini-segmented {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: 2px;
      padding: 2px;
      border-radius: 10px;
      background: var(--kd-segmented-bg);
    }

    .mini-segmented.wide {
      width: 100%;
    }

    .mini-segment {
      min-height: 44px;
      min-width: 76px;
      padding: 0 8px;
      border-radius: 8px;
      color: var(--kd-text);
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }

    .mini-segmented.wide .mini-segment {
      min-width: 0;
    }

    .mini-segment[aria-pressed="true"] {
      background: var(--kd-segment-on);
      box-shadow: var(--kd-segment-shadow);
    }

    .climate-options {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .climate-options .option {
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-height: 64px;
      padding: 8px 2px;
      font-size: 12px;
      text-align: center;
    }

    .climate-options .option-text {
      align-items: center;
    }

    .sheet-link {
      display: block;
      width: 100%;
      min-height: 44px;
      margin-top: 16px;
      border-radius: 14px;
      color: var(--kd-sky);
      font-size: 15px;
      text-align: center;
    }

    /* „Historie místnosti – 24 h“ (history.hours): readout and chart 1:1 in CSS pixels. */
    .chart-wrap {
      margin: 0 -2px;
      padding: 0 2px;
      border-radius: 12px;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    }

    .chart-wrap:focus-visible {
      outline: 2px solid var(--primary-color, #64b5f6);
      outline-offset: 2px;
    }

    .readout {
      display: grid;
      gap: 2px;
      min-height: 46px;
      margin-bottom: 8px;
    }

    .readout-main {
      display: flex;
      align-items: baseline;
      gap: 10px;
      font-variant-numeric: tabular-nums;
    }

    .readout-time {
      min-width: 3.4em;
      color: var(--kd-label);
      font-size: 15px;
    }

    .readout-temp {
      font-size: 22px;
      font-weight: 600;
    }

    .readout-hum {
      color: var(--kd-sky);
      font-size: 15px;
    }

    .readout-systems {
      display: flex;
      flex-wrap: wrap;
      gap: 2px 14px;
      font-size: 13px;
      line-height: 20px;
    }

    .readout-system {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .readout-icon,
    .readout-icon svg {
      display: block;
      width: 16px;
      height: 16px;
    }

    .chart {
      display: block;
      max-width: 100%;
      height: auto;
      font-family: inherit;
    }

    @media (prefers-reduced-motion: reduce) {
      .sheet,
      .preset.sent svg,
      .preset.failed svg,
      .preset:active,
      .preset.pending,
      .preset-hint,
      .spark.loading,
      .cover-panel.moving .rail {
        animation: none;
      }

      .sheet {
        transition: none;
      }

      /* Without the colour change, a held preset is lit and one on its way is half-lit. */
      .preset:active {
        color: var(--preset-on);
      }

      .preset.pending {
        color: color-mix(in srgb, var(--preset-idle), var(--preset-on));
      }

      .preset svg {
        transition: none;
      }
    }

    @container room (max-width: 364px) {
      .room {
        padding: 14px;
        --col: 52px;
        --preset-col: 32px;
        --preset-icon: 28px;
        --trend-reach: 14px;
      }
    }
`, Uo = " ";
function di(i) {
  if (!i || V(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function me(i, t) {
  return i === void 0 ? "" : `· ${t.half(i)}${Uo}°C`;
}
function jo(i, t, e, n, o, s) {
  const r = s.t.heatingMode, a = i?.state.toLowerCase(), l = t?.state.toLowerCase(), c = l === void 0 || V(l), d = di(e), p = Ci(a, l, d);
  if (p === "off")
    return { label: r.off, color: g.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (c || a === void 0 || V(a))
    return { label: "––", color: g.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const h = yi(di(n), o);
  if (p === "schedule")
    return { label: r.schedule, color: g.plan, active: !0, extra: me(d, s), unknown: !1, overlay: "schedule", waves: h };
  if (p === "manual") {
    const u = d === Gt ? "boost" : "manual";
    return { label: r.manual, color: g.warning, active: !0, extra: me(d, s), unknown: !1, overlay: "manual", override: u, waves: h };
  }
  return { label: t?.state ?? "––", color: g.warning, active: !0, extra: "", unknown: !1, waves: h };
}
function Kt(i, t) {
  let e = "unknown", n, o;
  if (i && !V(i.state.toLowerCase())) {
    const r = i.state.toLowerCase(), a = String(i.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? e = "off" : r === "cool" ? e = a === "wind_free" ? "wind_free" : "cool" : r === "dry" ? e = "dry" : r === "fan_only" ? e = "fan" : r === "heat" ? e = "heat" : (r === "auto" || r === "heat_cool") && (e = "auto"), e !== "off" && e !== "unknown" && e !== "wind_free" && a !== "none" && a !== "" && (n = Ft(a)), o = it(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(e);
  return {
    mode: e,
    label: n ?? t.t.climateMode[e],
    color: At[e],
    active: e !== "off" && e !== "unknown",
    extra: s ? me(o, t) : "",
    unknown: e === "unknown"
  };
}
function Bo(i, t) {
  const e = i.unknown ? t.t.unknownState : i.label;
  return i.extra ? `${e} ${i.extra.replace(/^·\s*/, "")}` : e;
}
function Ht(i, t) {
  return i.length <= 2 ? i.join(", ") : t.t.summaryChips.rooms(i.length);
}
function xe(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function _e(i, t, e) {
  return jo(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds,
    e
  );
}
function Hi(i, t, e, n) {
  const o = xe(i, t).length > 0, s = _e(i, t, n), r = i.air_conditioner ? Kt(t(i.air_conditioner), n).mode : "unknown", a = !s.unknown && s.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", c = [];
  return o && a && c.push("window-heating"), o && l ? c.push("window-cooling") : l && e && c.push("cooling-cold"), c;
}
function Wo(i, t, e, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, r = [], a = [], l = [], c = [];
  let d = 0;
  const p = [];
  for (const v of i) {
    for (const C of Hi(v, t, e.has(v.name), n))
      s[C].push(v.name);
    const _ = xe(v, t).length;
    _ > 0 && r.push([v.name, _]);
    const w = _e(v, t, n);
    w.override === "boost" ? l.push(v.name) : w.override === "manual" && a.push(v.name), w.waves > 0 && (c.push(v.name), d = Math.max(d, w.waves)), v.air_conditioner && Kt(t(v.air_conditioner), n).active && p.push(v.name);
  }
  const h = [], u = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [v, _] of u)
    s[v].length > 0 && h.push({
      kind: _,
      text: `${o.conflict[v]}: ${Ht(s[v], n)}`,
      color: g.warning,
      spoken: `${o.conflictSpoken[v]}: ${s[v].join(", ")}`
    });
  const $ = r.reduce((v, [, _]) => v + _, 0);
  return $ > 0 && h.push({
    kind: "windows",
    text: o.windowsOpen($),
    color: g.sky,
    spoken: `${o.windowsSpoken}: ${r.map(([v, _]) => _ > 1 ? `${v} (${_})` : v).join(", ")}`
  }), a.length > 0 && h.push({
    kind: "manual",
    text: `${o.manual}: ${Ht(a, n)}`,
    color: g.warning,
    spoken: `${o.manualSpoken}: ${a.join(", ")}`,
    opens: { system: "heating", rooms: a }
  }), l.length > 0 && h.push({
    kind: "boost",
    text: `${o.boost}: ${Ht(l, n)}`,
    color: g.warning,
    spoken: `${o.boostSpoken}: ${l.join(", ")}`,
    opens: { system: "heating", rooms: l }
  }), c.length > 0 && h.push({
    kind: "heating",
    text: o.heating(o.rooms(c.length)),
    color: g.warning,
    spoken: `${o.heatingSpoken}: ${c.join(", ")}`,
    waves: d,
    opens: { system: "heating", rooms: c }
  }), p.length > 0 && h.push({
    kind: "climate",
    text: `${o.climate}: ${Ht(p, n)}`,
    color: g.cool,
    spoken: `${o.climateSpoken}: ${p.join(", ")}`,
    opens: { system: "climate", rooms: p }
  }), h;
}
var Vo = Object.defineProperty, z = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Vo(t, e, o), o;
};
const ci = "klima-dashboard.after-timer", Ko = 5 * 6e4, qo = 3e4, G = " ", Yo = 550, hi = 400, Go = 700, Zo = "(orientation: landscape) and (max-height: 600px)", Xo = 1600, Jo = 5e3, Qo = 100, ts = 0.6, es = 6;
function is(i) {
  return i === void 0 ? void 0 : i.mode === "manual" ? "heat" : i.mode === "plan" ? "auto" : i.mode;
}
const Se = class Se extends St {
  constructor() {
    super(...arguments), this._i18n = ue("en"), this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new To(() => ({ holdMs: Yo, doubleTapMs: hi })), this._movingWatch = /* @__PURE__ */ new Map(), this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!e || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = go((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const e = this._historyModel;
      if (!e)
        return;
      const { startMs: n, endMs: o } = e.range, s = this._scrubTime ?? o;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const r = s + (t.key === "ArrowLeft" ? -ai : ai);
        this._scrubTime = r >= o ? void 0 : Math.max(n, r);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY, this._touchOnSlider = t.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range" || e instanceof HTMLElement && "drag" in e.dataset);
    }, this.sheetTouchMove = (t) => {
      this._touchOnSlider || t.cancelable && this.sheetCannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this._touchY ?? 0)) && t.preventDefault();
    }, this.sheetWheel = (t) => {
      t.cancelable && !t.ctrlKey && this.sheetCannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this._drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now(), dragging: !1 });
    }, this.dragMove = (t) => {
      const e = this._drag;
      if (!e || e.pointerId !== t.pointerId)
        return;
      const n = t.clientY - e.startY;
      if (!e.dragging) {
        if (n < es)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Qo || o > ts) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet input:not([disabled]), .sheet .chart-wrap'
        )
      ];
      if (e.length === 0)
        return;
      const n = this.renderRoot.activeElement, o = n ? e.indexOf(n) : -1, s = t.shiftKey ? e[o <= 0 ? e.length - 1 : o - 1] : e[o === -1 || o === e.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Bn(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, qo), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._gesture.dispose();
    for (const t of [this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const e = t.get("hass");
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || Vt(e) !== Vt(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => e?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e), this._i18n = ue(Mo(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
  }
  /**
   * Dark or light (CURRENT_SPEC.md, Barvy): `theme: dark | light` forces it; `auto` follows the
   * dark mode Home Assistant uses (with the "Auto" theme, the system appearance), and without
   * that the system colour scheme of the browser.
   */
  theme() {
    const t = this._config?.theme ?? "auto";
    if (t !== "auto")
      return t;
    const e = this.hass?.themes?.darkMode;
    return (typeof e == "boolean" ? e : this._prefersDark) ? "dark" : "light";
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, Ko)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => xe(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of kn(this._config)) {
      const n = t.states[e], o = this.hass.states[e];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !_n(n?.attributes, o?.attributes))
        return !0;
    }
    return !1;
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }
  render() {
    if (!this._config)
      return f;
    const t = J(this.entityState(this._config.houseModeEntity) ?? ""), e = t === J(this._config.houseModes.summer), n = e || t === J(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), r = this._config.title ?? this._i18n.t.title, a = this.renderOutside(), l = Wo(
      this._config.rooms,
      (d) => this.getState(d),
      this.coldRooms(e, n, s),
      this._i18n
    ), c = r !== "" || a !== f || l.length > 0;
    return m`
      <ha-card>
        <div class="dashboard">
          ${c ? m`<header class="dashboard-header">
                ${r === "" ? f : m`<h1>${r}</h1>`}
                ${a} ${this.renderSummary(l)}
              </header>` : f}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (d, p) => this.renderRoom(d, p, e, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, e, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const r = s.thresholds.stale_minutes;
      Fe(
        {
          temperature: this.reading(s.temperature, r, n),
          humidity: this.reading(s.humidity, r, n),
          co2: this.reading(s.carbon_dioxide, r, n),
          pm25: this.pm25Reading(s, n)
        },
        t,
        e,
        s,
        this._i18n.t
      ).id === "cold" && o.add(s.name);
    }
    return o;
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (n) => t.rooms.map((o) => {
      const s = n(o);
      return s ? this._trends[s] : void 0;
    });
    return {
      temperature: ie(e((n) => n.temperature), vt(t.trends, "temperature")),
      co2: ie(e((n) => n.carbon_dioxide), vt(t.trends, "co2")),
      pm25: ie(e((n) => n.pm25), vt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const { t: e, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), r = this.numberState(t.maximum), a = this.numberState(t.rain_probability), l = this.numberState(t.pm25), c = s !== void 0 && r !== void 0 ? `${n(s)}–${n(r)}${G}°C` : void 0, d = [
      o === void 0 ? void 0 : `${n(o)}${G}°C`,
      c,
      a === void 0 ? void 0 : `☂${G}${this._i18n.percent(n(a))}`
    ].filter(($) => $ !== void 0), p = this._config.thresholds;
    let h = "––", u = g.label;
    return l !== void 0 && (l >= p.pm25_critical ? (h = e.airLevel.poor, u = g.alert) : l >= p.pm25_warning ? (h = e.airLevel.moderate, u = g.warning) : h = e.airLevel.good), d.length === 0 && !t.pm25 ? f : m`<div class="outside">
      ${d.length > 0 ? m`<div>${d.join(" · ")}</div>` : f}
      ${t.pm25 ? m`<div>${e.outsideAir} <span style=${`color: ${u}`}>${h}</span></div>` : f}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? f : m`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((e) => {
      const n = e.kind === "windows" || e.kind === "conflict-window" ? ne(e.color, !1) : e.kind === "climate" || e.kind === "conflict-cooling" ? Ut("cool", e.color, !1) : e.kind === "manual" || e.kind === "boost" ? oe(e.kind === "boost" ? "boost" : "heat") : he(e.waves ?? 3, !1), o = e.opens;
      return o && o.rooms.length > 0 ? m`<li class="chip" style=${`--chip-color: ${e.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${e.spoken}
              aria-label=${`${e.text}. ${e.spoken}`}
              aria-haspopup="dialog"
              @click=${(s) => this.openGroupSheet(o.system, o.rooms, s)}
            >
              <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
            </button>
          </li>` : m`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, o, s, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), c = this.reading(t.humidity, a, r), d = this.reading(t.carbon_dioxide, a, r), p = this.pm25Reading(t, r), { t: h } = this._i18n, u = Fe({ temperature: l, humidity: c, co2: d, pm25: p }, n, o, t, h), $ = t.image, v = (w) => u.cause === w ? `color: ${u.color}` : f, _ = Hi(t, (w) => this.getState(w), u.id === "cold", this._i18n);
    return m`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${t.name}
        style=${$?.kind === "scene" ? `--scene-tone: ${_o($.scene)}` : f}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${u.kind === "unknown" ? `border: 1.5px solid ${g.off}` : `background: ${u.color}`}
          ></span>
          <span style=${`color: ${u.color}; font-weight: ${u.kind === "normal" ? 400 : 500}`}>
            ${u.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${v("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? f}
            aria-label=${h.temperatureLabel(
      t.name,
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${(w) => this.openSheet("history", t, w)}
          >
            ${l.value === void 0 ? m`<span class="missing">––</span>` : m`${this._i18n.one(l.value)}<span class="temperature-unit">${G}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${c.stale ? "stale" : ""}"
            style=${v("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(c) ?? f}
            aria-label=${h.humidityLabel(
      t.name,
      c.value === void 0 ? void 0 : this._i18n.percent(Math.round(c.value)),
      this.staleSpoken(c)
    )}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${c.value === void 0 ? m`<span class="missing">––</span>` : m`${this._i18n.percent(Math.round(c.value))}${this.staleMark(c)}`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, e, d, p, s)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, e, _, r)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : m`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article></div>
    `;
  }
  /**
   * Picture in the top-right corner (CURRENT_SPEC.md, Room Card): a built-in line drawing, or
   * an image of the user's that fills the same soft rectangle. Both are decorative.
   */
  renderImage(t) {
    const e = t.image;
    return e ? e.kind === "scene" ? m`<div class="scene" aria-hidden="true">${So(e.scene)}</div>` : m`<div class="scene photo" aria-hidden="true">
      <img src=${e.url} alt="" loading="lazy" decoding="async" />
    </div>` : f;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = t.link;
    if (!n)
      return m`<div class="room-title">${t.name}</div>`;
    const o = `link-description-${e}`;
    return m`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${o}
        @click=${() => this.openLink(n)}
      >
        <span class="room-name">${t.name}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${o}>${n.startsWith("/") ? this._i18n.t.link.page : this._i18n.t.link.web}</span>
    `;
  }
  /**
   * The room link goes through Home Assistant's own action handling (navigate for a path,
   * url for a web address), the same as a tap action of a built-in card.
   */
  openLink(t) {
    const e = t.startsWith("/") ? { action: "navigate", navigation_path: t } : { action: "url", url_path: t };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: { tap_action: e }, action: "tap" },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** The room history period for screen readers: "24 hodin" (after "za"), "the last 24 hours". */
  historyPeriod() {
    return Be((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Be(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === g.alert ? g.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, n) {
    return t.value === void 0 || t.stale ? g.label : t.value >= n ? g.alert : t.value >= e ? g.warning : g.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, e, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return f;
    const { thresholds: r } = t, { t: a } = this._i18n, l = this._config.trends, c = [t.carbon_dioxide, t.pm25].filter(($) => !!$), d = ($, v, _, w, C, E) => {
      if (!v || !_)
        return;
      const b = w.value === void 0 ? void 0 : Ue(this._trends[_], vt(l, E));
      return a.airSensor(
        $,
        w.value === void 0 ? void 0 : `${this._i18n.whole(w.value)} ${C}`,
        b ? a.trendOver(a.trend[b], this.trendPeriod()) : void 0,
        this.staleSpoken(w)
      );
    }, p = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), h = c.length > 1, u = `air-description-${e}`;
    return m`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${c.length === 0}
        aria-haspopup=${h ? "dialog" : f}
        aria-describedby=${u}
        @click=${($) => h ? this.openSheet("air", t, $) : this.showMoreInfo(c[0])}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      m`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      s.co2
    ) : f}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      ti(),
      o,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      s.pm25
    ) : f}
      </button>
      <span class="sr-only" id=${u}>${a.airDescription(t.name, p, h)}</span>
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, e) {
    const { thresholds: n } = t, o = n.stale_minutes, s = [
      { slot: "co2", label: "CO₂", unit: "ppm", present: t.hasCo2, entityId: t.carbon_dioxide, warning: n.co2_warning, critical: n.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", present: t.hasPm25, entityId: t.pm25, warning: n.pm25_warning, critical: n.pm25_critical }
    ].filter((r) => r.present);
    return m`
      <div class="options list-options" role="group" aria-label=${this._i18n.t.air}>
        ${s.map(({ slot: r, label: a, unit: l, entityId: c, warning: d, critical: p }) => {
      const h = r === "pm25" ? this.pm25Reading(t, e) : this.reading(c, o, e), u = h.value !== void 0, $ = u && !h.stale ? g[r] : g.off;
      return m`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!c}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(c);
      }}
          >
            <span class="option-icon" style=${`color: ${$}`} aria-hidden="true">
              ${r === "co2" ? m`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : ti()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">${this._i18n.t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(h, d, p))}`}>
              ${u ? `${this._i18n.whole(h.value)} ${l}` : m`<span aria-hidden="true">––</span><span class="sr-only">${this._i18n.t.unknownValue}</span>`}
            </span>
            ${h.stale ? m`<span class="sr-only">${this.staleSpoken(h)}</span>` : f}
          </button>`;
    })}
      </div>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, e, n, o, s, r, a, l) {
    const c = o.value !== void 0, d = this._i18n.whole(o.value ?? 0), p = this.airColor(o, r, a), h = g[t];
    return m`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? f}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${c && !o.stale ? h : g.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${c ? m`<span class="row-label" style=${`color: ${p}`}>${d}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : m`<span class="row-label" style=${`color: ${g.label}`}>––</span>`}
          </span>
        </span>
        ${c ? this.renderSpark(e, l, h, o.stale === !0) : f}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, n) {
    if (!t.temperature || e.value === void 0)
      return f;
    const o = this.renderSpark(t.temperature, n, g.peach, e.stale === !0);
    if (o === f)
      return f;
    const s = Ue(this._trends[t.temperature], vt(this._config.trends, "temperature")), { t: r } = this._i18n;
    return m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${r.temperatureTrendLabel(
      t.name,
      this.trendPeriod(),
      s ? r.trend[s] : void 0,
      this.historyPeriod()
    )}
        @click=${(a) => this.openSheet("history", t, a)}
      >
        ${o}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last `trends.minutes` (120) as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  renderSpark(t, e, n, o) {
    if (!t)
      return f;
    if (!this._trendsLoaded)
      return m`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    const s = this._trends[t];
    if (!s || !e)
      return f;
    const r = eo(s, e).map(
      (p, h) => p === void 0 ? void 0 : { x: h / Math.max(1, s.length - 1) * 100, y: (1 - p) * 100 }
    ).filter((p) => p !== void 0);
    if (r.length < 2)
      return f;
    const a = r.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "), l = r[0], c = r[r.length - 1], d = `${a} ${c.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return m`<span class="spark ${o ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${d} fill="currentColor" fill-opacity="0.08"></polygon>
          <polyline
            points=${a}
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          ></polyline>
        </svg>
        <span
          class="spark-dot"
          style=${`left: ${c.x.toFixed(2)}%; top: ${c.y.toFixed(2)}%`}
        ></span>
      </span>
    </span>`;
  }
  // ------------------------------------------------------- Topení / Klimatizace
  /**
   * Both HVAC rows are one touch target (≥ 44 px). It always opens the popup of the primary
   * system (by House Mode); a segmented control there switches to the other one
   * (CURRENT_SPEC.md, Ovládání Topení a Klimatizace).
   */
  renderHvac(t, e, n) {
    const { t: o } = this._i18n, s = _e(t, (u) => this.getState(u), this._i18n), r = Kt(this.getState(t.air_conditioner), this._i18n), a = (u) => this.renderSystemRow(he(s.unknown ? 0 : s.waves, s.unknown), s, u), l = (u) => this.renderSystemRow(Ut(r.mode, r.color, r.unknown), r, u), c = e ? ["climate", "heating"] : ["heating", "climate"], d = this.hvacTarget(t, c), p = c.map((u) => `${o.system[u]} ${Bo(u === "heating" ? s : r, this._i18n)}`).join(", "), h = `hvac-description-${n}`;
    return m`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!d}
        aria-describedby=${h}
        @click=${(u) => d ? this.openSheet(d, t, u) : void 0}
      >
        ${e ? l(!0) : a(!0)}
        ${e ? a(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${h}>${o.hvacDescription(t.name, p, d)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, e) {
    const n = (o) => o === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
    return e.find(n);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, e, n) {
    return m`
      <span
        class="system-row ${n && e.active ? "strong" : ""}"
        style=${`--row-color: ${e.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${e.label}</span>
            ${e.extra ? m`<span class="row-unit">${e.extra}</span>` : f}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, e) {
    const n = this.getState(t), o = n?.state.toLowerCase();
    if (o === void 0 || V(o))
      return { state: "unknown" };
    if (o !== "on")
      return { state: "closed" };
    const s = Date.parse(n?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(s) ? void 0 : Math.max(0, (e - s) / 6e4) };
  }
  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  renderWindow(t, e, n, o) {
    const { t: s } = this._i18n, r = t.windows.map((b) => ({ window: b, ...this.windowState(b.entity, o) })), a = r.filter((b) => b.state === "open"), l = a.length > 0, c = !l && (r.length === 0 || r.some((b) => b.state === "unknown")), d = t.windows.length > 1, p = l ? g.sky : g.label, h = l ? a.length > 1 ? s.window.openCount(a.length) : s.window.open : c ? "––" : s.window.closed, u = a.map((b) => b.minutesOpen).filter((b) => b !== void 0), $ = u.length > 0 ? Math.max(...u) : void 0, v = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, _ = `window-description-${e}`, w = $ === void 0 ? void 0 : Sn($, s);
    let C;
    if (!d)
      C = s.window.spokenSingle(c ? "unknown" : l ? "open" : "closed", w);
    else if (l) {
      const b = a.map((T) => this.windowName(t, T.window)).join(", ");
      C = a.length === 1 ? s.window.spokenOneOpen(b, w) : s.window.spokenManyOpen(b, w);
    } else
      C = c ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const E = t.windows[0]?.entity;
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${p}`}
        ?disabled=${!E}
        aria-haspopup=${d ? "dialog" : f}
        aria-describedby=${_}
        @click=${(b) => d ? this.openSheet("windows", t, b) : this.showMoreInfo(E)}
      >
        <span class="row-main">
          <span class="row-icon">${ne(c ? g.off : p, c)}</span>
          <span class="row-text">
            <span class="row-label">${h}</span>
            ${v ? m`<span class="conflict-dot" aria-hidden="true"></span>` : f}
            ${$ === void 0 ? f : m`<span class="row-unit window-duration"
                  >${`${v ? "" : `${G}·${G}`}${je($)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${_}>${s.window.description(t.name, C, v, d)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, e) {
    return e.name ?? this._i18n.t.window.defaultName(t.windows.indexOf(e) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, e) {
    const { t: n } = this._i18n;
    return m`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: r } = this.windowState(o.entity, e), a = s === "unknown", l = s === "open" ? g.sky : g.label;
      return m`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${ne(a ? g.off : l, a)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint">${n.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${l}`}>
              ${a ? m`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : s === "open" ? n.window.open : n.window.closed}${r === void 0 ? f : m`<span class="list-extra">${G}·${G}${je(r)}</span>`}
            </span>
          </button>`;
    })}
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const n = this.getState(e), o = n?.state.toLowerCase(), s = o !== void 0 && !V(o), r = s ? it(n?.attributes.current_position) : void 0, a = s ? it(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, c = o === "opening" || o === "closing", { t: d } = this._i18n, p = l ? d.cover.position(Math.round(r), Math.round(a)) : d.cover.unknown;
    return m`
      <button
        type="button"
        class="plain-button cover-panel ${c ? "moving" : ""}"
        aria-label=${d.cover.label(t.name, p, c)}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${It} ${ae}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${un(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${d.cover.presets(t.name)}>
        ${t.presets.map((h) => this.renderPreset(t, h, r, a, s))}
      </div>
    `;
  }
  renderPreset(t, e, n, o, s) {
    const r = this._moving[t.name], a = r === e.id, l = r === void 0 && te(n, o, e, this.tolerance()), c = `${t.name}|${e.id}`, { t: d } = this._i18n, p = Tn(e, d), h = this._hint?.key === c && this._hint.error === !0;
    return m`
      <button
        type="button"
        class="plain-button preset ${this._flash === c ? "sent" : ""} ${s ? "" : "unavailable"} ${a ? "pending" : ""} ${h ? "failed" : ""}"
        title=${p}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : f}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${h && this._hint?.spoken ? `${d.cover.preset(t.name, p, We(e, d), s)} ${this._hint.text} ${this._hint.spoken}` : d.cover.preset(t.name, p, We(e, d), s)}
        @pointerdown=${(u) => this.pressStart(u, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(u) => u.preventDefault()}
        @click=${(u) => {
      u.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(c));
    }}
      >
        ${io(e.icon)}
        ${this._hint?.key !== c ? f : h ? m`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : m`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, e, n, o) {
    t.button !== 0 || !o || this._gesture.start(() => {
      window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, n);
    });
  }
  pressEnd(t, e, n) {
    const o = `${t.name}|${e.id}`;
    if (!n) {
      this.showUnavailable(o);
      return;
    }
    const s = this._gesture.tap(o, performance.now());
    if (s !== "none") {
      if (window.clearTimeout(this._hintTimer), s === "double") {
        this._hint = void 0, this.applyPreset(t, e);
        return;
      }
      this._hintTimer = window.setTimeout(() => {
        this._gesture.pending(o) && (this._gesture.forget(), this.showHint(o, this._i18n.t.cover.hint, "selection"));
      }, hi);
    }
  }
  pressCancel() {
    this._gesture.cancel();
  }
  showUnavailable(t) {
    this._gesture.forget(), window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, e, n, o) {
    this._hint = { key: t, text: e, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? Jo : Xo);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || V(n)) {
      this.showUnavailable(`${t.name}|${e.id}`);
      return;
    }
    this.startMoving(t, t.cover, e);
    try {
      const [o, s] = this._config.covers.script.split(".");
      await this.hass.callService(o, s, {
        entity: t.cover,
        pos: e.position,
        tilt: e.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, Go);
    } catch (o) {
      console.error("Klima Dashboard: the blind script failed", o), this.endMoving(t.name);
      const { cover: s } = this._i18n.t;
      this.showHint(`${t.name}|${e.id}`, s.failedHint, "failure", { spoken: s.failed(t.name) });
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, e, n) {
    const o = this.getState(e);
    if (te(
      it(o?.attributes.current_position),
      it(o?.attributes.current_tilt_position),
      n,
      this.tolerance()
    ) && !this.isMoving(e)) {
      this.endMoving(t.name);
      return;
    }
    this._moving = { ...this._moving, [t.name]: n.id }, this._movingWatch.set(t.name, { signature: this.coverSignature(e) }), this.armStall(t.name);
  }
  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  trackMovingPresets() {
    for (const t of this._config?.rooms ?? []) {
      const e = this._moving[t.name], n = t.presets.find((l) => l.id === e), o = this._movingWatch.get(t.name);
      if (!n || !o || !t.cover)
        continue;
      const s = this.getState(t.cover), r = s?.state.toLowerCase();
      if (r === void 0 || V(r) || te(
        it(s?.attributes.current_position),
        it(s?.attributes.current_tilt_position),
        n,
        this.tolerance()
      ) && !this.isMoving(t.cover)) {
        this.endMoving(t.name);
        continue;
      }
      const a = this.coverSignature(t.cover);
      a !== o.signature && (o.signature = a, this.armStall(t.name));
    }
  }
  armStall(t) {
    const e = this._movingWatch.get(t);
    e && (window.clearTimeout(e.timer), e.timer = window.setTimeout(() => this.endMoving(t), (this._config?.covers.stall_seconds ?? 5) * 1e3));
  }
  endMoving(t) {
    if (window.clearTimeout(this._movingWatch.get(t)?.timer), this._movingWatch.delete(t), t in this._moving) {
      const { [t]: e, ...n } = this._moving;
      this._moving = n;
    }
  }
  isMoving(t) {
    const e = this.entityState(t)?.toLowerCase();
    return e === "opening" || e === "closing";
  }
  /** What changes while a blind moves: its state, position and tilt. */
  coverSignature(t) {
    const e = this.getState(t);
    return `${e?.state}|${e?.attributes.current_position}|${e?.attributes.current_tilt_position}`;
  }
  /** Haptic feedback through the Home Assistant app (ignored in a plain browser). */
  haptic(t) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const e = this._sheet;
    if (!e)
      return f;
    const { t: n } = this._i18n;
    if (e.kind === "history")
      return this.renderSheetFrame(
        n.sheet.history(this._config?.history.hours ?? 24),
        e.room.name,
        this.renderHistoryBody(e.room, t),
        "history-sheet"
      );
    if (e.kind === "air")
      return this.renderSheetFrame(n.air, e.room.name, this.renderAirBody(e.room, Date.now()));
    if (e.kind === "windows")
      return this.renderSheetFrame(n.window.popup, e.room.name, this.renderWindowsBody(e.room, Date.now()));
    const { title: o, sub: s } = this.hvacTitle(e.kind);
    return this.renderSheetFrame(o, s, this.renderHvacBody(e.room, e.kind, t));
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, n, o = "") {
    const s = this._drag?.dragging === !0;
    return m`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
        @touchstart=${this.sheetTouchStart}
        @touchmove=${this.sheetTouchMove}
        @wheel=${this.sheetWheel}
      >
        <div
          class="sheet ${o} ${s ? "dragging" : ""}"
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : f}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(r) => r.stopPropagation()}
        >
          <div
            class="sheet-top"
            @pointerdown=${this.dragStart}
            @pointermove=${this.dragMove}
            @pointerup=${this.dragEnd}
            @pointercancel=${this.dragEnd}
          >
            <div class="grabber" aria-hidden="true"></div>
            <div class="sheet-head">
              <div>
                <h2 id="sheet-title">${t}</h2>
                ${e ? m`<div class="sheet-sub">${e}</div>` : f}
              </div>
              <button type="button" class="plain-button close" aria-label=${this._i18n.t.sheet.close} @click=${() => this.closeSheet()}>
                ✕
              </button>
            </div>
          </div>
          ${n}
        </div>
      </div>
    `;
  }
  /** Title of the Topení / Klimatizace popup: the room, or the rooms it sets together (names, or "all"). */
  hvacTitle(t) {
    const { t: e } = this._i18n, n = this.sheetRooms().filter((r) => t === "heating" ? r.heating?.climate : r.air_conditioner);
    if (n.length <= 1)
      return { title: (n[0] ?? this._sheet?.room)?.name ?? "" };
    const o = (this._config?.rooms ?? []).filter((r) => t === "heating" ? r.heating?.climate : r.air_conditioner), s = n.length === o.length;
    return { title: s ? e.sheet.allRooms : n.map((r) => r.name).join(", "), sub: s ? n.map((r) => r.name).join(", ") : void 0 };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, e, n) {
    const o = this.sheetRooms(), s = o.filter((h) => h.heating?.climate), r = o.filter((h) => h.air_conditioner), a = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && r.length > 0, { t: c } = this._i18n, d = e === "heating" ? this.renderHeatingPanel(s) : this.renderClimatePanel(r), p = l ? m`<div
          class="segmented"
          role="tablist"
          aria-label=${c.sheet.systems}
          @keydown=${(h) => this.segmentKeydown(h, a, e)}
        >
          ${a.map(
      (h) => m`<button
              type="button"
              role="tab"
              id=${`tab-${h}`}
              class="plain-button segment"
              data-system=${h}
              aria-selected=${h === e ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${h === e ? "0" : "-1"}
              @click=${() => this.switchSheet(h)}
            >
              ${c.system[h]}
            </button>`
    )}
        </div>` : m`<div class="sheet-label system-name">${c.system[e]}</div>`;
    return m`${p}
      <div class="hvac-panel" role=${l ? "tabpanel" : f} id="hvac-panel" aria-labelledby=${l ? `tab-${e}` : f}>
        ${d}
      </div>`;
  }
  /** "Teď 21,9 °C" under the big value: only for one room (a group has no single temperature). */
  roomNow(t) {
    if (t.length !== 1)
      return "";
    const e = K(this.getState(t[0].temperature)?.state);
    return e === void 0 ? "" : this._i18n.t.sheet.now(`${this._i18n.one(e)}${G}°C`);
  }
  renderHeatingPanel(t) {
    const { t: e } = this._i18n, n = t[0], o = n?.heating?.climate, s = this.getState(o), r = s !== void 0 && !V(s.state.toLowerCase()), a = gt(s?.attributes.hvac_modes);
    if (!n || !o || !r)
      return m`<p class="sheet-message">${e.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const l = this.heatControl(n, o, s), c = this.heatingOptions(o, a, is(l));
    if (c.length === 0 || !l)
      return m`<p class="sheet-message">${e.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const d = e.sheet.heatControl, p = this.timerAvailable(), h = this.wholeRange(Ti(Si(s))), u = K(s?.attributes.temperature), $ = s?.state.toLowerCase() === "auto" && u !== void 0 && u > Q ? u : void 0, v = l.mode === "boost" ? g.alert : l.mode === "manual" || l.mode === "plan" ? g.warning : g.off;
    let _;
    l.mode === "off" ? _ = this.renderDial({ id: "heat-dial", text: e.heatingMode.off, eyebrow: e.system.heating, sub: this.roomNow(t), tone: v }) : l.mode === "plan" ? _ = this.renderDial({
      id: "heat-dial",
      value: $,
      min: h.min,
      max: h.max,
      eyebrow: d.bySchedule,
      sub: this.roomNow(t),
      tone: v
    }) : l.mode === "boost" ? _ = this.renderDial({
      id: "heat-dial",
      value: Gt,
      min: h.min,
      max: h.max,
      eyebrow: e.heatingMode.boost,
      sub: this.roomNow(t),
      tone: v
    }) : _ = this.renderDial({
      id: "heat-dial",
      value: Math.round(l.temperature),
      min: h.min,
      max: h.max,
      eyebrow: d.temperature,
      sub: this.roomNow(t),
      tone: v,
      label: d.temperatureSlider,
      onChange: (S) => this.editHeat(n, o, { temperature: S, mode: "manual" })
    });
    const w = p, C = l.mode === "plan", E = kt(l.duration), b = (l.mode === "manual" || l.mode === "boost") && E !== void 0, T = l.after ?? this.defaultAfter(), k = E !== void 0 ? `${$t(E)} · ${d.until(this._i18n.time(Date.now() + E * 6e4))}` : l.duration === lt ? d.nextPlan : d.untilResumed, A = E === void 0 ? l.duration === lt ? d.footPlan : l.mode === "off" ? d.footOffForever : d.footForever : l.mode === "off" ? d.footOffTimed(this._i18n.time(Date.now() + E * 6e4)) : d.footTimed(this._i18n.time(Date.now() + E * 6e4), T === "off" ? d.afterOffText : d.afterPlanText);
    return m`
      ${_}
      <div class="options icon-options" role="group" aria-label=${e.sheet.modes(e.system.heating)}>
        ${c.map((S) => this.renderOption(S))}
      </div>
      ${w ? m`<div class="timer-card ${C ? "dim" : ""}" ?inert=${C}>
              ${this.renderTimer({
      slot: Vn(l.duration),
      last: B.length + 1,
      readout: k,
      label: d.durationSlider,
      leftLabel: d.nextPlan,
      leftIcon: oe("auto"),
      leftText: m`<b>${e.heatingMode.schedule}</b>`,
      rightLabel: d.untilResumed,
      onSlot: (S) => this.editHeat(n, o, { duration: Kn(S) })
    })}
              ${m`<div class="after-row ${b ? "" : "away"}" ?inert=${!b}>
                    <span id="after-label">${d.after}</span>
                    <div class="mini-segmented" role="group" aria-labelledby="after-label">
                      ${["plan", "off"].map(
      (S) => m`<button
                          type="button"
                          class="plain-button mini-segment"
                          aria-pressed=${T === S ? "true" : "false"}
                          @click=${() => this.chooseAfter(n, o, S)}
                        >
                          ${S === "plan" ? e.heatingMode.schedule : e.heatingMode.off}
                        </button>`
    )}
                    </div>
                  </div>`}
            </div>
            <p class="timer-foot">${C ? d.footIdle : A}</p>` : l.mode === "manual" && !p ? m`<p class="sheet-message">${d.noTimer}</p>` : f}
      <p class="heat-note" role="status">${this.heatNote(n, o, s, c.filter((S) => S.unsupported).map((S) => `${S.label}: ${S.unsupported}`))}</p>
      ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  renderClimatePanel(t) {
    const { t: e } = this._i18n, n = t[0], o = n?.air_conditioner, s = this.getState(o), r = s !== void 0 && !V(s.state.toLowerCase());
    if (!n || !o || !r)
      return m`<p class="sheet-message">${e.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const a = gt(s?.attributes.hvac_modes), l = gt(s?.attributes.preset_modes), c = s?.state.toLowerCase(), d = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = this.climateOptions(o, a, c, l, d);
    if (p.length === 0)
      return m`<p class="sheet-message">${e.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const h = Kt(s, this._i18n), u = Math.ceil(K(s?.attributes.min_temp) ?? 16), $ = Math.floor(K(s?.attributes.max_temp) ?? 30), v = this._acTarget ?? K(s?.attributes.temperature), _ = v === void 0 ? void 0 : Math.round(v), w = ["cool", "wind_free", "heat", "auto"].includes(h.mode), C = h.mode === "off" || h.mode === "fan" || h.mode === "dry" || h.mode === "unknown", E = this.renderDial({
      id: "ac-dial",
      text: C ? e.climateMode[h.mode === "unknown" ? "unknown" : h.mode] : void 0,
      value: C ? void 0 : _,
      min: u,
      max: $,
      eyebrow: h.mode === "off" ? e.system.climate : C ? e.sheet.mode : e.sheet.heatControl.temperature,
      sub: this.roomNow(t),
      tone: h.color,
      label: e.sheet.heatControl.temperatureSlider,
      onChange: w ? (L) => this._acTarget = L : void 0,
      onCommit: w ? () => {
        this.runSheetAction(() => this.commitAcTarget(t));
      } : void 0
    }), b = gt(s?.attributes.fan_modes), T = gt(s?.attributes.swing_modes), k = String(s?.attributes.fan_mode ?? "").toLowerCase(), A = String(s?.attributes.swing_mode ?? "").toLowerCase(), S = l.filter((L) => L !== "none" && L !== "wind_free"), F = h.active, I = this._ac?.duration ?? dt, N = kt(I), q = e.sheet.heatControl, x = N === void 0 ? q.noLimit : `${$t(N)} · ${q.until(this._i18n.time(Date.now() + N * 6e4))}`, H = N === void 0 ? q.acFootForever : q.acFootTimed(this._i18n.time(Date.now() + N * 6e4)), P = !!this.hass?.callWS, D = !F;
    return m`
      ${E}
      <div class="options climate-options" role="group" aria-label=${e.sheet.modes(e.system.climate)}>
        ${p.map((L) => this.renderOption(L))}
      </div>
      ${P ? m`<div class="timer-card ${D ? "dim" : ""}" ?inert=${D}>
              ${this.renderTimer({
      slot: qn(I),
      last: B.length,
      readout: x,
      label: q.durationSlider,
      leftLabel: $t(B[0]),
      leftIcon: ei(),
      leftText: m`<b>${$t(B[0])}</b>`,
      rightLabel: q.noLimit,
      onSlot: (L) => this._ac = { duration: Yn(L), touched: !0 }
    })}
            </div>
            <p class="timer-foot">${D ? q.acFootIdle : H}</p>` : f}
      ${b.length > 0 ? this.renderChoice(e.sheet.climate.fan, b, k, D, (L) => this.callClimateEach(t, "set_fan_mode", { fan_mode: L }), (L) => this.fanLabel(L)) : f}
      ${T.length > 0 ? this.renderChoice(e.sheet.climate.swing, T, A, D, (L) => this.callClimateEach(t, "set_swing_mode", { swing_mode: L }), (L) => this.swingLabel(L)) : f}
      ${S.length > 0 ? m`<div class="sheet-label" id="preset-label">${e.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${S.map((L) => this.renderPresetChip(t, L, d, c, l))}
            </div>` : f}
      ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  /** Link to the standard detail of one entity; a group of rooms has none. */
  renderSheetTail(t) {
    return t ? m`<button
      type="button"
      class="plain-button sheet-link"
      @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(t);
    }}
    >
      ${this._i18n.t.detailsAndHistory}
    </button>` : f;
  }
  /** Whole-degree range of the dial (the dial moves by 1 °C). */
  wholeRange(t) {
    return { min: Math.ceil(t.min), max: Math.floor(t.max) };
  }
  fanLabel(t) {
    return this._i18n.t.sheet.climate.fanModes[t.toLowerCase()] ?? Ft(t);
  }
  swingLabel(t) {
    return this._i18n.t.sheet.climate.swingModes[t.toLowerCase()] ?? Ft(t);
  }
  /** A row of mutually exclusive choices (iOS segmented look), e.g. the fan speed. */
  renderChoice(t, e, n, o, s, r) {
    return m`<div class="sheet-label">${t}</div>
      <div class="mini-segmented wide ${o ? "dim" : ""}" ?inert=${o} role="group" aria-label=${t}>
        ${e.map(
      (a) => m`<button
            type="button"
            class="plain-button mini-segment"
            aria-pressed=${a.toLowerCase() === n ? "true" : "false"}
            @click=${() => {
        this.runSheetAction(() => s(a));
      }}
          >
            ${r(a)}
          </button>`
    )}
      </div>`;
  }
  /**
   * The big temperature in a ring (iOS thermostat). Value or text is in the middle; with `onChange`
   * the ring is a slider: drag along the ring, or use the arrow keys. Moves by whole degrees.
   */
  renderDial(t) {
    const l = (k) => [
      136 + 118 * Math.cos(k * Math.PI / 180),
      136 + 118 * Math.sin(k * Math.PI / 180)
    ], c = (k, A) => {
      const [S, F] = l(k), [I, N] = l(A);
      return `M${S.toFixed(2)} ${F.toFixed(2)} A118 118 0 ${A - k > 180 ? 1 : 0} 1 ${I.toFixed(2)} ${N.toFixed(2)}`;
    }, d = t.min ?? 0, p = t.max ?? 1, h = t.text === void 0 ? t.value : void 0, u = h === void 0 || p <= d ? 0 : Math.min(1, Math.max(0, (h - d) / (p - d))), $ = 135 + 270 * u, [v, _] = l($), w = t.onChange !== void 0 && h !== void 0, C = t.text ?? (h === void 0 ? "––" : `${this._i18n.whole(h)}°`), E = (k) => {
      const A = k.currentTarget.getBoundingClientRect();
      let S = Math.atan2(k.clientY - (A.top + A.height / 2), k.clientX - (A.left + A.width / 2)) * 180 / Math.PI;
      return S < 0 && (S += 360), S < 135 && (S += 360), S > 405 && (S = S - 405 < 90 / 2 ? 405 : 135), Math.round(d + (S - 135) / 270 * (p - d));
    }, b = (k) => {
      if (!w)
        return;
      if (k.type === "pointerdown")
        k.currentTarget.setPointerCapture?.(k.pointerId);
      else if (k.buttons !== 1)
        return;
      const A = E(k);
      A !== h && t.onChange?.(A);
    }, T = (k) => {
      if (!w || h === void 0)
        return;
      const A = k.key === "ArrowUp" || k.key === "ArrowRight" ? 1 : k.key === "ArrowDown" || k.key === "ArrowLeft" ? -1 : 0, S = k.key === "Home" ? d : k.key === "End" ? p : h + A;
      S === h && A === 0 && k.key !== "Home" && k.key !== "End" || (k.preventDefault(), t.onChange?.(Math.min(p, Math.max(d, S))), t.onCommit?.());
    };
    return m`
      <div class="dial" style=${`--tone: ${t.tone}`}>
        <div
          class="dial-ring"
          data-drag
          role=${w ? "slider" : "img"}
          tabindex=${w ? "0" : f}
          aria-label=${t.label ?? `${t.eyebrow}: ${C}`}
          aria-valuemin=${w ? d : f}
          aria-valuemax=${w ? p : f}
          aria-valuenow=${w ? h : f}
          aria-valuetext=${w ? `${C} °C` : f}
          @pointerdown=${b}
          @pointermove=${b}
          @pointerup=${() => w && t.onCommit?.()}
          @keydown=${T}
        >
          <svg viewBox="0 0 ${272} ${232}" aria-hidden="true">
            <path class="dial-track" d=${c(135, 405)}></path>
            ${h === void 0 || u <= 0 ? f : y`<path class="dial-value" d=${c(135, Math.max(136, $))}></path>`}
            ${h === void 0 ? f : y`<circle class="dial-knob ${w ? "" : "still"}" cx=${v} cy=${_} r="12"></circle>`}
          </svg>
          <div class="dial-text" aria-hidden="true">
            <span class="dial-eyebrow">${t.eyebrow}</span>
            <span class="dial-big ${t.text === void 0 ? "" : "word"}">${C}</span>
            <span class="dial-sub">${t.sub}</span>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * The timer slider of the Tado hot-water screen: an icon at the left end (the plan, or the
   * shortest time), ∞ at the right end, the chosen time above. Native range semantics via ARIA.
   */
  renderTimer(t) {
    const { slot: e, last: n } = t, o = n > 0 ? e / n * 100 : 0, s = (a) => {
      if (a.type === "pointerdown")
        a.currentTarget.setPointerCapture?.(a.pointerId);
      else if (a.buttons !== 1)
        return;
      const l = a.currentTarget.getBoundingClientRect(), c = Math.round(Math.min(1, Math.max(0, (a.clientX - l.left) / Math.max(l.width, 1))) * n);
      c !== e && t.onSlot(c);
    }, r = (a) => {
      const l = a.key === "ArrowRight" || a.key === "ArrowUp" ? 1 : a.key === "ArrowLeft" || a.key === "ArrowDown" ? -1 : 0, c = a.key === "Home" ? 0 : a.key === "End" ? n : e + l;
      l === 0 && a.key !== "Home" && a.key !== "End" || (a.preventDefault(), t.onSlot(Math.min(n, Math.max(0, c))));
    };
    return m`
      <div class="timer-read" role="status">${t.readout}</div>
      <div class="timer-row">
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.leftLabel}
          aria-pressed=${e === 0 ? "true" : "false"}
          @click=${() => t.onSlot(0)}
        >
          <span class="end-icon" aria-hidden="true">${t.leftIcon}</span>
        </button>
        <div
          class="timer-slider"
          data-drag
          role="slider"
          tabindex="0"
          aria-label=${t.label}
          aria-valuemin="0"
          aria-valuemax=${n}
          aria-valuenow=${e}
          aria-valuetext=${t.readout}
          @pointerdown=${s}
          @pointermove=${s}
          @keydown=${r}
        >
          <span class="timer-track"></span>
          <span class="timer-fill" style=${`width: ${o}%`}></span>
          <span class="timer-knob" style=${`left: ${o}%`}></span>
        </div>
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.rightLabel}
          aria-pressed=${e === n ? "true" : "false"}
          @click=${() => t.onSlot(n)}
        >
          <span class="end-icon infinity" aria-hidden="true">∞</span>
        </button>
      </div>
      <div class="timer-ticks" aria-hidden="true"><span>${t.leftText}</span><span><b>∞</b></span></div>
    `;
  }
  segmentKeydown(t, e, n) {
    const o = e.indexOf(n);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = e[(o + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = e[(o - 1 + e.length) % e.length] : t.key === "Home" ? s = e[0] : t.key === "End" && (s = e[e.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === n ? this.requestUpdate() : this.switchSheet(s));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, e) {
    const n = this._config?.history.hours ?? 24, { t: o } = this._i18n;
    let s;
    const r = this._historyModel;
    this._historyStatus === "loading" ? s = m`<p class="sheet-message">${o.sheet.loading}</p>` : this._historyStatus === "error" || !r ? s = m`<p class="sheet-message error" role="alert">${o.sheet.historyFailed}</p>` : mo(r) ? s = m`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${o.sheet.chart(this.historyPeriod())}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${xo(r, this.chartWidth(), this._scrubTime, this._i18n, e)}
      </div>` : s = m`<p class="sheet-message">${o.sheet.noHistory(n)}</p>`;
    const a = t.temperature ?? t.humidity;
    return m`
      ${s}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!a}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(a);
    }}
      >
        ${o.sheet.temperatureDetails}
      </button>
    `;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(Zo).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  sheetCannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".sheet");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  renderOption(t) {
    return m`
      <button
        type="button"
        class="plain-button option"
        style=${`--tone: ${t.color}`}
        aria-pressed=${t.active ? "true" : "false"}
        ?disabled=${t.unsupported !== void 0}
        @click=${() => {
      this.runSheetAction(t.run);
    }}
      >
        <span class="option-icon">${t.icon}</span>
        <span class="option-text">
          ${t.label}
          ${t.unsupported ? m`<span class="option-hint">${t.unsupported}</span>` : f}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, n, o, s) {
    const r = n === e && o !== "off", a = r && s.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.callClimateEach(t, "set_preset_mode", { preset_mode: a }));
    }}
      >
        ${Ft(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost (a fixed 25 °C) and the duration of Ručně / Boost / Vypnuto need the
   * Tado CE action `tado_ce.set_climate_timer`; without it Boost is shown but disabled.
   * A choice is applied when the popup closes.
   */
  heatingOptions(t, e, n) {
    const o = [], s = this._i18n.t.heatingMode, r = this.timerAvailable(), a = (l, c, d, p, h) => {
      o.push({
        id: l,
        label: c,
        icon: oe(l),
        color: d,
        active: n === l,
        run: () => this.chooseHeating(t, p),
        unsupported: h
      });
    };
    return e.includes("off") && a("off", s.off, g.off, "off"), e.includes("auto") && a("auto", s.schedule, g.plan, "plan"), e.includes("heat") && a("heat", s.manual, g.warning, "manual"), o.length > 0 && a("boost", s.boost, g.alert, "boost", r ? void 0 : this._i18n.t.sheet.notOffered), o;
  }
  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  timerAvailable() {
    return !!this.hass?.services?.tado_ce?.set_climate_timer;
  }
  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  heatControl(t, e, n) {
    return this._heat?.entityId === e ? this._heat : Xe(t.name, e, n);
  }
  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  async chooseHeating(t, e) {
    const n = this._sheet?.room;
    if (!n)
      return;
    const o = this.getState(t);
    if (Xe(n.name, t, o)?.mode === e && this.sheetRooms().length === 1) {
      this._heat = void 0;
      return;
    }
    const r = this.heatControl(n, t, o);
    this._heat = {
      room: n.name,
      entityId: t,
      mode: e,
      temperature: r?.temperature ?? 21,
      duration: _i(e),
      after: r?.after
    };
  }
  /** Sends the changes made in the popup (closing, switching system, leaving for the detail). */
  flushHeat() {
    const t = this._heat;
    if (t) {
      this._heat = void 0;
      const e = this.sheetRooms().filter((n) => n.heating?.climate);
      this.applyHeat(t, e.length > 0 ? e : []);
    }
    this.flushAc();
  }
  /** The Klimatizace "turn off after" time: a script that Home Assistant runs by itself. */
  flushAc() {
    const t = this._ac;
    this._ac = void 0, this._acTarget = void 0;
    const e = t?.touched ? kt(t.duration) : void 0;
    if (e !== void 0)
      for (const n of this.sheetRooms()) {
        const o = n.air_conditioner, s = this.getState(o)?.state.toLowerCase();
        o && s && s !== "off" && !V(s) && this.runDelayedOff(Ze(o, e, s));
      }
  }
  async runDelayedOff(t) {
    try {
      await this.hass?.callWS({ type: "execute_script", ...t });
    } catch (e) {
      console.error("Klima Dashboard: scheduling the switch-off failed", e), this.haptic("failure");
    }
  }
  async applyHeat(t, e) {
    const n = kt(t.duration), o = (t.mode === "manual" || t.mode === "boost") && n !== void 0 && (t.after ?? this.defaultAfter()) === "off";
    for (const s of e) {
      const r = s.heating?.climate;
      if (r)
        try {
          await this.callCommand(Xn(r, { ...t, entityId: r, room: s.name }, this.timerAvailable())), o && n !== void 0 && this.runDelayedOff(Ze(r, n, "auto", 15));
        } catch (a) {
          console.error("Klima Dashboard: the heating command failed", a), this.haptic("failure");
        }
    }
  }
  async callCommand(t) {
    if (!this.hass)
      throw new Error("Home Assistant is not connected.");
    if (!t)
      throw new Error("Klima Dashboard: the heating choice has no Home Assistant action.");
    await this.hass.callService(t.domain, t.service, t.data);
  }
  editHeat(t, e, n) {
    const o = this.heatControl(t, e, this.getState(e));
    o && (this._heat = { ...o, ...n });
  }
  /** The line under the options: what waits for the popup to close, else the time left, else what is not offered. */
  heatNote(t, e, n, o) {
    const s = this._i18n.t.sheet.heatControl;
    if (this._heat)
      return s.appliesOnClose;
    const r = Mi(n), a = K(this.getState(t.heating?.overlay)?.attributes.overlay_remaining_seconds);
    return e && r !== void 0 && r !== "auto" && a !== void 0 && a > 0 ? s.remaining($t(Math.ceil(a / 60))) : o.join(" · ");
  }
  isSummerNow() {
    const t = this._config;
    return t !== void 0 && J(this.entityState(t.houseModeEntity) ?? "") === J(t.houseModes.summer);
  }
  /** After-timer choice: the person's last pick, otherwise by season (winter Plán, summer Vypnuto). */
  defaultAfter() {
    try {
      const t = window.localStorage.getItem(ci);
      if (t === "plan" || t === "off")
        return t;
    } catch {
    }
    return this.isSummerNow() ? "off" : "plan";
  }
  chooseAfter(t, e, n) {
    try {
      window.localStorage.setItem(ci, n);
    } catch {
    }
    this.editHeat(t, e, { after: n });
  }
  /** Air conditioner target: sent once the finger lifts (or a key was pressed), to every room of the popup. */
  async commitAcTarget(t) {
    const e = this._acTarget;
    e !== void 0 && (await this.callClimateEach(t, "set_temperature", { temperature: e }), this._acTarget = void 0);
  }
  /** One climate action for the air conditioner of every room in the popup. */
  async callClimateEach(t, e, n) {
    const o = t.map((s) => s.air_conditioner).filter((s) => !!s);
    await Promise.all(o.map((s) => this.callClimate(e, { entity_id: s, ...n })));
  }
  /**
   * Klimatizace modes in the order of the popup: Vypnuto, Chlazení, WindFree (cooling with the
   * `wind_free` preset, one tap), Topení, Větrání, Sušení and Auto. Every choice goes to the
   * air conditioner of every room in the popup.
   */
  climateOptions(t, e, n, o, s) {
    const r = this.sheetRooms().filter((u) => u.air_conditioner), a = o.includes("wind_free"), l = o.includes("none"), c = this._i18n.t.climateMode, d = (u, $, v, _) => ({
      id: u,
      label: c[$],
      icon: Ut($, At[$], !1),
      color: At[$],
      active: v,
      run: _
    }), p = (u, $) => async () => {
      await this.callClimateEach(r, "set_hvac_mode", { hvac_mode: u }), $ !== void 0 && await this.callClimateEach(r, "set_preset_mode", { preset_mode: $ });
    }, h = [];
    if (e.includes("off") && h.push(d("off", "off", n === "off", p("off"))), e.includes("cool")) {
      const u = n === "cool" && s !== "wind_free";
      h.push(d("cool", "cool", u, p("cool", s === "wind_free" && l ? "none" : void 0))), a && h.push(d("wind_free", "wind_free", n === "cool" && s === "wind_free", p("cool", "wind_free")));
    }
    for (const [u, $] of [["heat", "heat"], ["fan_only", "fan"], ["dry", "dry"], ["auto", "auto"]])
      e.includes(u) && h.push(d(u, $, n === u, p(u)));
    return h;
  }
  async callClimate(t, e) {
    if (!this.hass)
      throw new Error("Home Assistant is not connected.");
    await this.hass.callService("climate", t, e);
  }
  async runSheetAction(t) {
    this._sheetError = void 0;
    try {
      await t();
    } catch (e) {
      console.error("Klima Dashboard: the climate command failed", e), this._sheetError = this._i18n.t.sheet.commandFailed;
    }
  }
  openSheet(t, e, n) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._acTarget = void 0, this._ac = void 0, this._sheet = { kind: t, room: e }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, e, n) {
    const o = (this._config?.rooms ?? []).filter((s) => e.includes(s.name));
    o.length !== 0 && (this.openSheet(t, o[0], n), this._sheet = { kind: t, room: o[0], rooms: o });
  }
  /** The rooms a Topení / Klimatizace popup sets: one room, or the rooms of a summary chip that have the system. */
  sheetRooms() {
    const t = this._sheet;
    return t ? t.rooms ?? [t.room] : [];
  }
  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  switchSheet(t) {
    this._sheet && this._sheet.kind !== t && (this.flushHeat(), this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room, rooms: this._sheet.rooms });
  }
  closeSheet(t = !0) {
    window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
  }
  async loadRoomHistory(t) {
    const e = ++this._historyRequest;
    if (this._historyStatus = "loading", this._historyModel = void 0, !this.hass) {
      this._historyStatus = "error";
      return;
    }
    const n = [
      t.temperature,
      t.humidity,
      t.heating?.overlay,
      t.heating?.climate,
      t.heating?.intensity,
      t.heating?.target,
      t.air_conditioner,
      ...t.windows.map((a) => a.entity)
    ].filter((a) => !!a), o = this._config.history, s = Date.now(), r = s - o.hours * Zt;
    try {
      const a = await Je(this.hass, n, r, s);
      if (e !== this._historyRequest)
        return;
      this._historyModel = uo(a, t, { startMs: r, endMs: s }, o), this._historyStatus = "ready";
    } catch (a) {
      console.error("Klima Dashboard: loading the room history failed", a), e === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = xn(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, o = Date.now(), s = o - e * 6e4;
    try {
      const r = await Je(this.hass, t, s, o), a = {};
      for (const l of t)
        a[l] = to(r[l], s, o, n);
      this._trends = a;
    } catch (r) {
      console.error("Klima Dashboard: loading the history of the micro trends failed", r);
    } finally {
      this._trendsLoading = !1, this._trendsLoaded = !0;
    }
  }
  /**
   * When the room sensors last reported. The state pushed to cards has only last_updated,
   * which does not move while a sensor keeps reporting the same value, so the REST state
   * (with last_reported) is asked every 5 minutes. Without it nothing is marked stale.
   */
  async loadReported() {
    const t = this.hass;
    if (!t?.callApi || !this._config)
      return;
    const e = Mn(this._config), n = await Promise.allSettled(
      e.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    n.forEach((s, r) => {
      if (s.status === "fulfilled") {
        const a = Date.parse(s.value?.last_reported ?? s.value?.last_updated ?? "");
        Number.isFinite(a) && (o[e[r]] = a);
      }
    }), this._reported = o;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, e, n, o = !1) {
    const s = this.numberState(t);
    if (s === void 0 || !t)
      return {};
    const r = this._reported[t];
    if (r === void 0)
      return { value: s };
    const a = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(r, Number.isFinite(a) ? a : 0), c = Math.max(0, (n - l) / 6e4);
    return { value: s, ageMinutes: c, stale: !(o && s === 0) && c > e };
  }
  /**
   * PM2.5 of a room (CURRENT_SPEC.md, Chybějící data). A measured 0 µg/m³ is clean air and never
   * stale. The particle sensor shares the device of the CO₂ sensor (ALPSTUGA) and reports only a
   * change, which a steady value may not give for hours: while the CO₂ of the room is fresh, the
   * device is alive and the unchanged PM2.5 is fresh too.
   */
  pm25Reading(t, e) {
    const n = t.thresholds.stale_minutes, o = this.reading(t.pm25, n, e, !0);
    if (o.value === void 0 || o.stale !== !0)
      return o;
    const s = this.reading(t.carbon_dioxide, n, e);
    return s.value !== void 0 && s.stale === !1 ? { value: o.value, ageMinutes: s.ageMinutes, stale: !1 } : o;
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? m`<span class="stale-mark" aria-hidden="true">${ei()}</span>` : f;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(ki(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || V(e.toLowerCase()))
      return;
    const n = Number.parseFloat(e);
    return Number.isFinite(n) ? n : void 0;
  }
  getState(t) {
    return t ? this.hass?.states[t] : void 0;
  }
  entityState(t) {
    return this.getState(t)?.state;
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
};
Se.styles = Fo;
let O = Se;
z([
  R()
], O.prototype, "_config");
z([
  $i({ attribute: !1 })
], O.prototype, "hass");
z([
  R()
], O.prototype, "_sheet");
z([
  R()
], O.prototype, "_sheetError");
z([
  R()
], O.prototype, "_heat");
z([
  R()
], O.prototype, "_acTarget");
z([
  R()
], O.prototype, "_ac");
z([
  R()
], O.prototype, "_historyStatus");
z([
  R()
], O.prototype, "_historyModel");
z([
  R()
], O.prototype, "_scrubTime");
z([
  R()
], O.prototype, "_dragY");
z([
  R()
], O.prototype, "_flash");
z([
  R()
], O.prototype, "_moving");
z([
  R()
], O.prototype, "_prefersDark");
z([
  R()
], O.prototype, "_hint");
z([
  R()
], O.prototype, "_trends");
z([
  R()
], O.prototype, "_trendsLoaded");
z([
  R()
], O.prototype, "_reported");
z([
  R()
], O.prototype, "_historyRequest");
z([
  R()
], O.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", O);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: ue(Co()).t.cardDescription,
  preview: !1
});
