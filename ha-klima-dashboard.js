const pt = globalThis, Pt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zt = /* @__PURE__ */ Symbol(), jt = /* @__PURE__ */ new WeakMap();
let be = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Pt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = jt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && jt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (n) => new be(typeof n == "string" ? n : n + "", void 0, zt), Ue = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new be(e, n, zt);
}, je = (n, t) => {
  if (Pt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = pt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, n.appendChild(i);
  }
}, Wt = Pt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Be(e);
})(n) : n;
const { is: We, defineProperty: Ke, getOwnPropertyDescriptor: Ve, getOwnPropertyNames: Ye, getOwnPropertySymbols: qe, getPrototypeOf: Ge } = Object, vt = globalThis, Kt = vt.trustedTypes, Ze = Kt ? Kt.emptyScript : "", Xe = vt.reactiveElementPolyfillSupport, tt = (n, t) => n, mt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ze : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ft = (n, t) => !We(n, t), Vt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: Ft };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let j = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Vt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Ke(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: s } = Ve(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = Ge(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, i = [...Ye(e), ...qe(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(Wt(o));
    } else t !== void 0 && e.push(Wt(t));
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
    return je(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : mt;
      this._$Em = o;
      const a = r.fromAttribute(e, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? Ft)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: s }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[tt("elementProperties")] = /* @__PURE__ */ new Map(), j[tt("finalized")] = /* @__PURE__ */ new Map(), Xe?.({ ReactiveElement: j }), (vt.reactiveElementVersions ??= []).push("2.1.2");
const Rt = globalThis, Yt = (n) => n, gt = Rt.trustedTypes, qt = gt ? gt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ye = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + N, Je = `<${_e}>`, U = document, it = () => U.createComment(""), nt = (n) => n === null || typeof n != "object" && typeof n != "function", Nt = Array.isArray, Qe = (n) => Nt(n) || typeof n?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Zt = />/g, L = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, Jt = /"/g, xe = /^(?:script|style|textarea|title)$/i, ke = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), m = ke(1), $ = ke(2), Y = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Qt = /* @__PURE__ */ new WeakMap(), B = U.createTreeWalker(U, 129);
function Se(n, t) {
  if (!Nt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qt !== void 0 ? qt.createHTML(t) : t;
}
const ti = (n, t) => {
  const e = n.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Z;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, d = r.exec(l), d !== null); ) u = r.lastIndex, r === Z ? d[1] === "!--" ? r = Gt : d[1] !== void 0 ? r = Zt : d[2] !== void 0 ? (xe.test(d[2]) && (o = RegExp("</" + d[2], "g")), r = L) : d[3] !== void 0 && (r = L) : r === L ? d[0] === ">" ? (r = o ?? Z, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? L : d[3] === '"' ? Jt : Xt) : r === Jt || r === Xt ? r = L : r === Gt || r === Zt ? r = Z : (r = L, o = void 0);
    const v = r === L && n[a + 1].startsWith("/>") ? " " : "";
    s += r === Z ? l + Je : h >= 0 ? (i.push(c), l.slice(0, h) + ye + l.slice(h) + N + v) : l + N + (h === -2 ? a : v);
  }
  return [Se(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ot {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, d] = ti(t, e);
    if (this.el = ot.createElement(c, i), B.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = B.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ye)) {
          const u = d[r++], v = o.getAttribute(h).split(N), w = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: w[2], strings: v, ctor: w[1] === "." ? ii : w[1] === "?" ? ni : w[1] === "@" ? oi : $t }), o.removeAttribute(h);
        } else h.startsWith(N) && (l.push({ type: 6, index: s }), o.removeAttribute(h));
        if (xe.test(o.tagName)) {
          const h = o.textContent.split(N), u = h.length - 1;
          if (u > 0) {
            o.textContent = gt ? gt.emptyScript : "";
            for (let v = 0; v < u; v++) o.append(h[v], it()), B.nextNode(), l.push({ type: 2, index: ++s });
            o.append(h[u], it());
          }
        }
      } else if (o.nodeType === 8) if (o.data === _e) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(N, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += N.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = U.createElement("template");
    return i.innerHTML = t, i;
  }
}
function q(n, t, e = n, i) {
  if (t === Y) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = nt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = q(n, o._$AS(n, t.values), o, i)), t;
}
class ei {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? U).importNode(e, !0);
    B.currentNode = o;
    let s = B.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new rt(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new si(s, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== l?.index && (s = B.nextNode(), r++);
    }
    return B.currentNode = U, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = q(this, t, e), nt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== Y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(U.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ot.createElement(Se(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new ei(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Qt.get(t.strings);
    return e === void 0 && Qt.set(t.strings, e = new ot(t)), e;
  }
  k(t) {
    Nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const s of t) o === e.length ? e.push(i = new rt(this.O(it()), this.O(it()), this, this.options)) : i = e[o], i._$AI(s), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Yt(t).nextSibling;
      Yt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = q(this, t, e, 0), r = !nt(t) || t !== this._$AH && t !== Y, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = q(this, a[i + l], e, l), c === Y && (c = this._$AH[l]), r ||= !nt(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ii extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ni extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class oi extends $t {
  constructor(t, e, i, o, s) {
    super(t, e, i, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = q(this, t, e, 0) ?? f) === Y) return;
    const i = this._$AH, o = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== f && (i === f || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class si {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    q(this, t);
  }
}
const ri = Rt.litHtmlPolyfillSupport;
ri?.(ot, rt), (Rt.litHtmlVersions ??= []).push("3.3.3");
const ai = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = o = new rt(t.insertBefore(it(), s), s, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
const Ht = globalThis;
class et extends j {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ai(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Y;
  }
}
et._$litElement$ = !0, et.finalized = !0, Ht.litElementHydrateSupport?.({ LitElement: et });
const li = Ht.litElementPolyfillSupport;
li?.({ LitElement: et });
(Ht.litElementVersions ??= []).push("4.2.2");
const ci = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: Ft }, hi = (n = ci, t, e) => {
  const { kind: i, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Me(n) {
  return (t, e) => typeof e == "object" ? hi(n, t, e) : ((i, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(n, t, e);
}
function M(n) {
  return Me({ ...n, state: !0, attribute: !1 });
}
const di = ["bedroom", "office", "kids", "living"], Te = "none", Ae = "input_select.house_mode", Ee = {
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
  stale_minutes: 30
};
function pi(n) {
  if (!n || !Array.isArray(n.rooms) || n.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (n.house_mode_entity !== void 0 && (typeof n.house_mode_entity != "string" || !n.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of n.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [s, r] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (s in i)
        throw new Error(`Room "${e.name}": key "${s}" was renamed to "${r}".`);
    const o = [...di, Te];
    if (e.scene !== void 0 && !o.includes(e.scene))
      throw new Error(`Room "${e.name}": scene must be one of ${o.join(", ")}.`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(n.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...Ee, ...n.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  if (t.stale_minutes <= 0)
    throw new Error('Threshold "stale_minutes" must be greater than 0.');
  return { ...n, thresholds: t };
}
const te = { domain: "script", service: "zaluzie_posun" }, ee = [
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100 },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100 },
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0 }
], ie = 5;
function yt(n, t, e) {
  return n !== void 0 && t !== void 0 && Math.abs(n - e.position) <= ie && Math.abs(t - e.tilt) <= ie;
}
const X = { temperature: 1, co2: 100, pm25: 5 }, p = {
  background: "#1C1C1E",
  open: "#D8D8DC",
  closed: "#6B6B70",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** CO₂ icon and its micro trend (muted sage green) and PM2.5 icon and its micro trend (muted lavender). */
  co2: "#8FBF9F",
  pm25: "#A59DCF",
  /** Temperature micro trend. */
  peach: "#FFB36B",
  /** Humidity value: deliberately uncoloured. */
  neutral: "#C7C7CC",
  /** Dashed humidity curve in the 24 h room history. */
  humidityLine: "#64D2FF",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  /** The same red, lighter, for the lighter ground of a popup option (contrast 4.5 : 1 for 17 px text). */
  alertOnPopup: "#FF6961",
  cold: "#64D2FF",
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2"
}, st = {
  off: p.off,
  cool: p.cool,
  wind_free: p.cool,
  dry: p.dry,
  fan: p.plan,
  heat: p.heat,
  auto: p.auto,
  unknown: p.off
}, wt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, ui = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Ce(n) {
  const t = ui[n];
  if (t)
    return t;
  const e = n.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Oe(n) {
  switch (n?.toLowerCase()) {
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
function ne(n, t, e, i) {
  const o = [
    ["teplota", n.temperature],
    ["vlhkost", n.humidity],
    ["CO₂", n.co2],
    ["PM2.5", n.pm25],
    ["režim domu", e ? { value: 1 } : void 0]
  ];
  for (const [h, u] of o) {
    if (u?.value === void 0)
      return { label: `Bez dat · ${h}`, color: p.label, kind: "unknown" };
    if (u.stale) {
      const v = u.ageMinutes === void 0 ? "" : ` (před ${Fe(u.ageMinutes)})`;
      return { label: `Bez dat · ${h}${v}`, color: p.label, kind: "unknown" };
    }
  }
  const s = n.temperature.value, r = n.humidity.value, a = n.co2.value;
  if (n.pm25.value >= i.pm25_critical)
    return { label: "Znečištěný vzduch", color: p.alert, kind: "critical", cause: "pm25" };
  if (a >= i.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: p.alert, kind: "critical", cause: "co2" };
  if (a >= i.co2_warning)
    return { label: "Vydýchaný vzduch", color: p.warning, kind: "warning", cause: "co2" };
  if (r > i.humidity_max)
    return { label: "Vlhko", color: p.warning, kind: "warning", cause: "humidity" };
  if (r < i.humidity_min)
    return { label: "Sucho", color: p.warning, kind: "warning", cause: "humidity" };
  const c = t ? i.summer_min : i.winter_min, d = t ? i.summer_max : i.winter_max;
  return s > d ? { label: "Teplo", color: p.warning, kind: "warning", cause: "temperature" } : s < c ? { label: "Chladno", color: p.cold, kind: "warning", cause: "temperature" } : { label: "Příjemné", color: p.label, kind: "normal" };
}
function oe(n) {
  return Array.isArray(n) ? n.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function T(n) {
  return n === "" || n === "unknown" || n === "unavailable" || n === "none";
}
function I(n) {
  if (n == null || n === "")
    return;
  const t = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function St(n) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(n);
}
function Pe(n) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(n * 2) / 2
  );
}
function ze(n) {
  return n === void 0 || n <= 0 ? 0 : n <= 34 ? 1 : n <= 67 ? 2 : 3;
}
function fi(n) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(n.house_mode_entity ?? Ae), e(n.outside?.temperature), e(n.outside?.minimum), e(n.outside?.maximum), e(n.outside?.rain_probability), e(n.outside?.pm25);
  for (const i of n.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function mi(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function gi(n, t) {
  if (n === t)
    return !0;
  if (!n || !t)
    return !1;
  const e = Object.keys(n), i = Object.keys(t);
  return e.length === i.length && e.every((o) => Object.hasOwn(t, o) && n[o] === t[o]);
}
function Fe(n) {
  return n < 60 ? `${Math.max(1, Math.round(n))} min` : n < 2880 ? `${Math.floor(n / 60)} h` : `${Math.floor(n / 1440)} d`;
}
function se(n, t) {
  const e = (n ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const i = e[e.length - 1] - e[0];
  return i >= t / 2 ? "stoupá" : i <= -t / 2 ? "klesá" : "stabilní";
}
function vi(n) {
  const t = Math.max(0, Math.floor(n));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [o, s] = [Math.floor(t / 60), t % 60];
    return s === 0 ? `${o} h` : `${o} h ${s} min`;
  }
  const [e, i] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return i === 0 ? `${e} d` : `${e} d ${i} h`;
}
function $i(n) {
  const t = Math.max(0, Math.floor(n));
  if (t < 1)
    return "méně než minutu";
  const e = (r, a, l, c) => `${r} ${Lt(r, a, l, c)}`;
  if (t < 60)
    return e(t, "minuta", "minuty", "minut");
  if (t < 1440) {
    const [r, a] = [Math.floor(t / 60), t % 60], l = e(r, "hodina", "hodiny", "hodin");
    return a === 0 ? l : `${l} ${e(a, "minuta", "minuty", "minut")}`;
  }
  const [i, o] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)], s = e(i, "den", "dny", "dní");
  return o === 0 ? s : `${s} ${e(o, "hodina", "hodiny", "hodin")}`;
}
function Lt(n, t, e, i) {
  return n === 1 ? t : n >= 2 && n <= 4 ? e : i;
}
function wi(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n.rooms)
    for (const i of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
const ut = 60, Mt = 142, re = 11, at = 3, bi = 0.8, ae = 2, yi = 0.28, _i = 0.5, xi = 0.7;
function ki(n, t) {
  if (n === void 0 || t === void 0)
    return $`<rect
      x="0.75"
      y="0.75"
      width=${ut - 1.5}
      height=${Mt - 1.5}
      rx="6"
      fill="none"
      stroke=${p.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = Mt - at - 1, i = e / re, o = i - bi, s = o - t / 100 * (o - ae), r = at + 1 + (100 - n) / 100 * e, a = Array.from({ length: re }, (l, c) => {
    const d = at + 1 + c * i + i / 2, h = d <= r, u = h ? s : ae;
    return $`<rect
      x="0"
      y=${(d - u / 2).toFixed(2)}
      width=${ut}
      height=${u.toFixed(2)}
      rx=${Math.min(1.5, u / 2).toFixed(2)}
      fill=${h ? p.blind : p.sky}
      opacity=${h ? _i : yi}
    ></rect>`;
  });
  return $`<rect
      class="rail"
      x="0"
      y="0"
      width=${ut}
      height=${at}
      rx="1.5"
      fill=${p.blind}
      opacity=${xi}
    ></rect>${a}`;
}
const Re = 36e5, Si = 120 * 6e4, le = 12;
function Mi(n) {
  if (n == null)
    return;
  if (typeof n == "number")
    return Number.isFinite(n) ? n < 1e11 ? n * 1e3 : n : void 0;
  const t = Date.parse(n);
  return Number.isNaN(t) ? void 0 : t;
}
function Ti(n, t) {
  const e = {};
  for (const [i, o] of Object.entries(n ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((r, a) => {
      const l = r.s ?? r.state, c = Mi(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && c !== void 0 && s.push({ time: Math.max(c, t), state: l });
    }), s.sort((r, a) => r.time - a.time), e[i] = s;
  }
  return e;
}
async function ce(n, t, e, i) {
  if (t.length === 0)
    return {};
  const o = await n.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return Ti(o, e);
}
function Ne(n, t) {
  let e;
  for (const i of n ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function Tt(n) {
  if (n === void 0)
    return;
  const t = Number.parseFloat(n);
  return Number.isFinite(t) ? t : void 0;
}
function Ai(n, t, e, i) {
  const o = (e - t) / i, s = (n ?? []).filter((r) => Tt(r.state) !== void 0);
  return Array.from(
    { length: i },
    (r, a) => Tt(Ne(s, t + (a + 1) * o))
  );
}
function he(n, t, e) {
  const i = [];
  for (const s of n ?? []) {
    const r = Tt(s.state);
    r !== void 0 && s.time <= e && i.push({ t: Math.max(s.time, t), v: r });
  }
  const o = i[i.length - 1];
  return o && o.t < e && i.push({ t: e, v: o.v }), i;
}
function lt(n, t, e, i) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const a of n)
    for (const l of a ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((a, l) => a - l), r = [];
  for (let a = 0; a < s.length - 1; a += 1) {
    const l = i(n.map((d) => Ne(d, s[a])));
    if (l === void 0)
      continue;
    const c = r[r.length - 1];
    c && c.value === l && c.end === s[a] ? c.end = s[a + 1] : r.push({ start: s[a], end: s[a + 1], value: l });
  }
  return r;
}
function _t(n, t) {
  let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const r of n)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), i = Math.max(i, a));
  if (!Number.isFinite(e) || !Number.isFinite(i) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(i / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function Ei(n, t) {
  const e = t.max - t.min;
  return n.map(
    (i) => i === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / e))
  );
}
function de() {
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
  ].map(([t, e, i]) => $`<circle cx=${t} cy=${e} r=${i}></circle>`)}
    </svg>
  `;
}
function Ci(n) {
  const t = (o, s, r, a) => $`<rect x=${o} y=${s} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => $`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let i;
  switch (n) {
    case "open":
      i = $`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      i = $`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      i = $`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
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
      ${i}
    </svg>
  `;
}
function At(n, t) {
  return m`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (e) => $`<path
          d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          stroke=${e < n ? p.warning : p.off}
          stroke-dasharray=${t ? "1.6 2.6" : f}
        ></path>`
  )}
    </svg>
  `;
}
function ft(n, t, e) {
  let i;
  const o = $`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, s = $`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (n) {
    case "cool":
    case "wind_free":
      i = $`${o}
        <g transform="rotate(60 12 12)">${o}</g>
        <g transform="rotate(120 12 12)">${o}</g>`;
      break;
    case "dry":
      i = $`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      i = $`${s}<g transform="rotate(120 12 12)">${s}</g>
        <g transform="rotate(240 12 12)">${s}</g>`;
      break;
    case "heat":
      i = $`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (r) => $`<path d="M12 3v2.5" transform=${`rotate(${45 * r} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      i = $`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      i = $`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke=${t}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${i}
    </svg>
  `;
}
function pe(n, t) {
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke=${n}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : f}
      aria-hidden="true"
    >
      <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
      <path d="M12 3.5v17M5 12h14"></path>
    </svg>
  `;
}
function Oi(n) {
  let t;
  switch (n) {
    case "off":
      t = $`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = $`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = $`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      t = $`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const E = 4, Pi = 32, W = 6, K = 150, C = W + K, J = 10, zi = C + 20, ue = C + 25, Fi = C + 50, ct = C + 55, Ri = C + 83, fe = C + 90, ht = 11, Ni = 22, Hi = 6, Li = [0, 0.24, 0.44, 0.68], me = "history-under-temperature", Et = {
  schedule: p.plan,
  manual: p.warning,
  off: p.closed
}, He = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, Le = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" });
function xt(n, t) {
  const e = n?.toLowerCase();
  return t?.toLowerCase() === "off" || e === "off" ? "off" : e === "schedule" || e === "manual" ? e : void 0;
}
function ge(n) {
  if (n === void 0)
    return;
  const t = Number.parseFloat(n);
  return Number.isFinite(t) ? t : void 0;
}
function Di(n, t, e) {
  const i = (_) => _ ? n[_] : void 0, { startMs: o, endMs: s } = e, r = i(t.heating?.overlay), a = i(t.heating?.climate), l = he(i(t.temperature), o, s), c = he(i(t.humidity), o, s), d = lt([r, a], o, s, ([_, A]) => xt(_, A)), h = lt(
    [r, a, i(t.heating?.intensity)],
    o,
    s,
    ([_, A, G]) => {
      const H = xt(_, A), g = ze(ge(G));
      return H === void 0 || H === "off" || g === 0 ? void 0 : String(g);
    }
  ), u = lt(
    [r, a, i(t.heating?.target)],
    o,
    s,
    ([_, A, G]) => {
      const H = xt(_, A), g = ge(G);
      return H === "schedule" || H === "manual" ? g === void 0 ? void 0 : String(g) : void 0;
    }
  ), v = lt([i(t.air_conditioner)], o, s, ([_]) => {
    const A = Oe(_);
    return A === "unknown" ? void 0 : A;
  }), w = [...l.map((_) => _.v), ...u.map((_) => Number(_.value))];
  let y = 19, k = 23;
  if (w.length > 0 && (y = Math.floor(Math.min(...w) - 0.2), k = Math.ceil(Math.max(...w) + 0.2), k - y < 3)) {
    const _ = 3 - (k - y);
    y -= Math.floor(_ / 2), k = y + 3;
  }
  const b = k - y <= 6 ? 1 : 2, O = c.map((_) => _.v);
  return {
    range: e,
    temperature: l,
    humidity: c,
    heating: d,
    intensity: h,
    target: u,
    climate: v,
    tempMin: y,
    tempMax: k,
    tempStep: b,
    humidityMin: O.length > 0 ? Math.min(...O) : void 0,
    humidityMax: O.length > 0 ? Math.max(...O) : void 0
  };
}
function Ii(n) {
  return n.temperature.length > 0 || n.humidity.length > 0 || n.heating.length > 0;
}
function V(n) {
  return n - E - Pi;
}
function Bi(n, t, e) {
  return E + (n - t.startMs) / (t.endMs - t.startMs) * V(e);
}
function Ui(n, t, e) {
  const i = Math.min(1, Math.max(0, (n - E) / V(t)));
  return e.startMs + i * (e.endMs - e.startMs);
}
function Ct(n, t) {
  let e;
  for (const i of n) {
    if (i.t > t)
      break;
    e = i.v;
  }
  return e;
}
function dt(n, t, e) {
  return n.find(
    (i) => i.start <= t && (t < i.end || t === e && i.end === e)
  )?.value;
}
function ji(n) {
  const t = [], e = new Date(n.startMs);
  for (e.setHours(0, 0, 0, 0), e.setDate(e.getDate() - 1); e.getTime() < n.endMs; ) {
    const i = new Date(e);
    i.setHours(Ni, 0, 0, 0);
    const o = new Date(e);
    o.setDate(o.getDate() + 1), o.setHours(Hi, 0, 0, 0);
    const s = Math.max(i.getTime(), n.startMs), r = Math.min(o.getTime(), n.endMs);
    r > s && t.push([s, r]), e.setDate(e.getDate() + 1);
  }
  return t;
}
function Wi(n) {
  const t = [], e = new Date(n.startMs);
  for (e.setMinutes(0, 0, 0), e.setHours(Math.ceil(e.getHours() / 6) * 6); e.getTime() <= n.endMs; )
    e.getTime() >= n.startMs && t.push(e.getTime()), e.setHours(e.getHours() + 6);
  return t;
}
function D(n, t, e = "block") {
  return m`<span class="legend-item">
    <span class="legend-swatch ${e}" style=${e === "block" ? `background: ${n}` : `border-color: ${n}`}></span
    >${t}
  </span>`;
}
function Ki(n, t) {
  const e = t ?? n.range.endMs, i = Ct(n.temperature, e), o = Ct(n.humidity, e), s = dt(n.heating, e, n.range.endMs), r = Number(dt(n.intensity, e, n.range.endMs) ?? 0), a = dt(n.target, e, n.range.endMs), l = dt(n.climate, e, n.range.endMs);
  let c = "Teď";
  t !== void 0 && (c = `${new Date(t).toDateString() === new Date(n.range.endMs).toDateString() ? "" : "včera "}${Le.format(t)}`);
  const d = s === void 0 ? "––" : `${He[s]}${s !== "off" && a !== void 0 ? ` · ${Pe(Number(a))} °C` : ""}`, h = l ? wt[l] : "––", u = l ? st[l] : p.off;
  return m`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${c}</span>
        <span class="readout-temp">${i === void 0 ? "––" : `${St(i)} °C`}</span>
        <span class="readout-hum">${o === void 0 ? "" : `${Math.round(o)} %`}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${s ? Et[s] : p.label}`}>
          <span class="readout-icon">${At(s && s !== "off" ? r : 0, s === void 0)}</span>
          Topení ${d}
        </span>
        <span class="readout-system" style=${`color: ${u}`}>
          <span class="readout-icon">${ft(l ?? "off", u, l === void 0)}</span>
          Klimatizace ${h}
        </span>
      </div>
    </div>
  `;
}
function Vi(n, t, e) {
  const { range: i } = n, o = (g) => Bi(g, i, t), s = (g) => C - (g - n.tempMin) / (n.tempMax - n.tempMin) * K, r = (n.humidityMin ?? 0) - 3, a = Math.max((n.humidityMax ?? 100) + 3, r + 12), l = (g) => C - (g - r) / (a - r) * K, c = E + V(t), d = (g, P) => g.map((z, F) => `${F === 0 ? "M" : "L"}${o(z.t).toFixed(1)} ${P(z.v).toFixed(1)}`).join(" "), h = d(n.temperature, s), u = n.temperature[0], v = n.temperature[n.temperature.length - 1], w = u && v ? `${h} L${o(v.t).toFixed(1)} ${C} L${o(u.t).toFixed(1)} ${C} Z` : "";
  let y = "";
  n.target.forEach((g, P) => {
    const z = s(Number(g.value)).toFixed(1), F = n.target[P - 1];
    y += F && F.end === g.start ? ` L${o(g.start).toFixed(1)} ${z}` : ` M${o(g.start).toFixed(1)} ${z}`, y += ` L${o(g.end).toFixed(1)} ${z}`;
  });
  const k = [];
  for (let g = n.tempMin; g <= n.tempMax; g += n.tempStep)
    k.push(g);
  const b = (g, P, z) => g.map((F) => {
    const Ut = o(F.start);
    return $`<rect x=${Ut.toFixed(1)} y=${P} width=${Math.max(o(F.end) - Ut, 0.8).toFixed(1)}
        height=${J} rx="2" fill=${z(F.value)}></rect>`;
  }), O = e === void 0 ? void 0 : o(e), _ = e === void 0 ? void 0 : Ct(n.temperature, e), A = ji(i), G = ["schedule", "manual", "off"].filter((g) => n.heating.some((P) => P.value === g)), H = [...new Set(n.climate.map((g) => g.value))];
  return m`
    ${Ki(n, e)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${fe}"
      width=${t}
      height=${fe}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${me}><path d=${w}></path></clipPath>
      </defs>
      <rect x=${E} y=${W} width=${V(t)} height=${K} rx="8" fill="rgb(255 255 255 / 5%)"></rect>
      ${A.map(
    ([g, P]) => $`<rect x=${o(g).toFixed(1)} y=${W} width=${(o(P) - o(g)).toFixed(1)}
          height=${K} fill="rgb(0 0 0 / 30%)"></rect>`
  )}
      ${k.map(
    (g) => $`<line x1=${E} x2=${c} y1=${s(g).toFixed(1)} y2=${s(g).toFixed(1)}
            stroke="rgb(255 255 255 / 8%)" stroke-width="1"></line>
          <text x=${c + 6} y=${(s(g) + 4).toFixed(1)} fill=${p.label} font-size=${ht}>${g}°</text>`
  )}
      ${w ? $`<path d=${w} fill="rgb(255 255 255 / 7%)"></path>` : f}
      <g clip-path=${`url(#${me})`}>
        ${n.intensity.map(
    (g) => $`<rect x=${o(g.start).toFixed(1)} y=${W}
            width=${Math.max(o(g.end) - o(g.start), 0.8).toFixed(1)} height=${K}
            fill=${p.warning} opacity=${Li[Number(g.value)] ?? 0}></rect>`
  )}
      </g>
      ${n.humidity.length > 0 ? $`<path d=${d(n.humidity, l)} fill="none" stroke=${p.humidityLine}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : f}
      ${y ? $`<path d=${y} fill="none" stroke=${p.plan} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6"></path>` : f}
      ${h ? $`<path d=${h} fill="none" stroke=${p.white} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : f}
      ${v && e === void 0 ? $`<circle cx=${o(v.t).toFixed(1)} cy=${s(v.v).toFixed(1)} r="3.5" fill=${p.white}></circle>` : f}

      <text x=${E} y=${zi} fill=${p.label} font-size=${ht}>Topení</text>
      <rect x=${E} y=${ue} width=${V(t)} height=${J} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${b(n.heating, ue, (g) => Et[g] ?? p.off)}
      <text x=${E} y=${Fi} fill=${p.label} font-size=${ht}>Klimatizace</text>
      <rect x=${E} y=${ct} width=${V(t)} height=${J} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${b(n.climate, ct, (g) => st[g] ?? p.off)}

      ${Wi(i).map(
    (g) => $`<line x1=${o(g).toFixed(1)} x2=${o(g).toFixed(1)} y1=${W} y2=${ct + J}
            stroke="rgb(255 255 255 / 6%)" stroke-width="1"></line>
          <text x=${o(g).toFixed(1)} y=${Ri} fill=${p.label} font-size=${ht} text-anchor="middle">${Le.format(g)}</text>`
  )}
      ${O === void 0 ? f : $`<line x1=${O.toFixed(1)} x2=${O.toFixed(1)} y1=${W} y2=${ct + J}
              stroke=${p.white} stroke-width="1" opacity="0.7"></line>
            ${_ === void 0 ? f : $`<circle cx=${O.toFixed(1)} cy=${s(_).toFixed(1)} r="4" fill=${p.white}
                  stroke="#1c1c1e" stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${D(p.white, "Teplota", "line")}
      ${n.target.length > 0 ? D(p.plan, "Cíl topení", "dashed") : f}
      ${n.intensity.length > 0 ? D(p.warning, "Vytápění (sytost = výkon)") : f}
      ${n.humidityMin !== void 0 && n.humidityMax !== void 0 ? D(
    p.humidityLine,
    `Vlhkost ${Math.round(n.humidityMin)}–${Math.round(n.humidityMax)} %`,
    "dashed"
  ) : f}
      ${A.length > 0 ? D("rgb(0 0 0 / 55%)", "Noc 22–6 h") : f}
    </div>
    <div class="legend">
      ${G.map((g) => D(Et[g], `Topení ${He[g]}`))}
      ${H.map((g) => D(st[g], `Klimatizace ${wt[g]}`))}
    </div>
  `;
}
const ve = Re / 4, Yi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
};
function qi(n) {
  if (n.scene === Te)
    return;
  if (n.scene)
    return n.scene;
  const t = n.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
  return Yi[t];
}
const Gi = {
  bedroom: "#A5A1F2",
  office: "#7FC8F8",
  kids: "#FFB36B",
  living: "#E8D9B5"
};
function Zi(n) {
  let t;
  switch (n) {
    case "bedroom":
      t = $`
        <path d="M121 10a15 15 0 1 0 13 23 12 12 0 0 1-13-23z"></path>
        <path d="M92 14v9M87.5 18.5h9M140 50v7M136.5 53.5h7"></path>
        <path d="M18 56v46M18 86h116v16M18 102h116"></path>
        <path d="M26 74h28a6 6 0 0 1 0 12H26z"></path>
        <path d="M60 86v-8a6 6 0 0 1 6-6h58a10 10 0 0 1 10 10v4"></path>`;
      break;
    case "office":
      t = $`
        <rect x="42" y="22" width="66" height="42" rx="5"></rect>
        <path d="M75 64v14M60 78h30"></path>
        <path d="M16 92h118M24 92v16M126 92v16"></path>
        <path d="M132 92V66l-8-12M118 48l9-7 9 11z"></path>
        <path d="M22 78h14v14H22zM36 81h3.5a3 3 0 0 1 0 6H36"></path>`;
      break;
    case "kids":
      t = $`
        <rect x="22" y="72" width="30" height="30" rx="5"></rect>
        <rect x="56" y="72" width="30" height="30" rx="5"></rect>
        <rect x="39" y="40" width="30" height="30" rx="5"></rect>
        <circle cx="116" cy="88" r="14"></circle>
        <path d="M104 84c8 4 16 4 24 0"></path>
        <path d="M118 14l4.5 9.5 10.5 1.3-7.7 7.2 2 10.3-9.3-5.1-9.3 5.1 2-10.3-7.7-7.2 10.5-1.3z"></path>`;
      break;
    default:
      t = $`
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
const Xi = Ue`
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

    /*
     * The card measures its own width, not the window: one column of rooms, two columns from
     * 620 px of card width (a phone on its side, a tablet), never more (CURRENT_SPEC.md,
     * Room Card). A room that ends up narrow switches to the narrow variables itself.
     */
    .dashboard {
      display: grid;
      gap: 12px;
      container: dashboard / inline-size;
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

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 30px;
      padding: 0 12px 0 9px;
      border-radius: 15px;
      background: color-mix(in srgb, var(--chip-color) 14%, #1c1c1e);
      color: var(--chip-color);
      font-size: 14px;
      font-weight: 500;
      line-height: 30px;
      white-space: nowrap;
    }

    .chip-icon {
      display: flex;
      width: 18px;
      height: 18px;
    }

    .chip-icon svg {
      width: 18px;
      height: 18px;
    }

    .notice {
      padding: 8px 12px;
      border-radius: 12px;
      background: rgb(255 159 10 / 16%);
      color: #ff9f0a;
      font-size: 13px;
    }

    .rooms {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }

    @container dashboard (min-width: 620px) {
      .rooms {
        grid-template-columns: repeat(2, minmax(0, 1fr));
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
      --preset-idle: #6f6f74;
      --preset-on: #c9c0a8;
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
      border: 1px solid rgb(255 255 255 / 7%);
      border-radius: 24px;
      background: linear-gradient(165deg, #232326 0%, #1c1c1e 55%);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
      color: #ffffff;
      font: inherit;
      text-align: left;
    }

    .room > *:not(.scene) {
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
      color: #9a9aa0;
      font-size: 18px;
      letter-spacing: 0;
    }

    /* Humidity is neutral, except when it decided the room status (inline colour). */
    .humidity {
      position: relative;
      min-width: 44px;
      color: #c7c7cc;
      font-size: 18px;
      line-height: 28px;
    }

    /* Invisible touch target of 44 px in height (TODO P1.2). */
    .humidity::after {
      content: "";
      position: absolute;
      inset: -8px 0;
    }

    .missing {
      color: #8e8e93;
    }

    /* Stale value: dimmed, never coloured (CURRENT_SPEC.md, Chybějící data). */
    .temperature.stale,
    .humidity.stale {
      color: #8e8e93;
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

    /* CO₂ and PM2.5: one touch target over both rows (52 px, TODO P1.2). */
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
      /* At least the whole left column, so no tap falls into a gap (TODO P1.5). */
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
     * it always continues right behind the value instead of at a distant column (TODO P1.10.1).
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
      background: #ff9f0a;
      opacity: 0.85;
    }

    .system-row.strong .row-label {
      font-weight: 500;
    }

    .row-unit {
      color: #9a9aa0;
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
      color: #8e8e93;
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

    /* Invisible touch target of 44 px in width: reaches into the gap to the panel and the card padding (TODO P1.2). */
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
      color: rgb(111 111 116 / 55%);
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
      background: #3a3a3c;
      box-shadow: 0 4px 16px rgb(0 0 0 / 40%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
      white-space: nowrap;
      transform: translateY(-50%);
      animation: hint-in 160ms ease-out;
      pointer-events: none;
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
      background: rgb(0 0 0 / calc(60% * var(--backdrop-opacity, 1)));
    }

    .sheet {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid rgb(255 255 255 / 10%);
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: #1c1c1e;
      color: #ffffff;
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
      background: rgb(255 255 255 / 28%);
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
        border-bottom: 1px solid rgb(255 255 255 / 10%);
        border-radius: 24px;
      }

      .grabber {
        display: none;
      }
    }

    /* Topení | Klimatizace in the HVAC popup (iOS segmented control). */
    .segmented {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: 2px;
      margin: 4px 0 14px;
      padding: 2px;
      border-radius: 10px;
      background: rgb(118 118 128 / 24%);
    }

    .segment {
      min-height: 44px;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }

    .segment[aria-selected="true"] {
      background: #636366;
      box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
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
      color: #9a9aa0;
      font-size: 14px;
      line-height: 20px;
    }

    .close {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      margin: -8px -8px 0 0;
      color: #9a9aa0;
      font-size: 18px;
      text-align: center;
    }

    .sheet-message {
      margin: 16px 0;
      color: #9a9aa0;
      font-size: 14px;
    }

    .sheet-message.error {
      color: #ff9f0a;
    }

    .sheet-label {
      margin: 16px 0 8px;
      color: #9a9aa0;
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
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 16px;
      background: rgb(255 255 255 / 5%);
      color: #ffffff;
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

    .air-options {
      grid-template-columns: minmax(0, 1fr);
    }

    .air-option {
      width: 100%;
      text-align: left;
    }

    .option-text {
      flex: 1;
    }

    .air-value {
      margin-left: auto;
      font-size: 17px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
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
      color: #9a9aa0;
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

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip-button {
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 22px;
      background: rgb(255 255 255 / 5%);
      color: #ffffff;
      font-size: 14px;
    }

    .chip-button[aria-pressed="true"] {
      border-color: rgb(100 210 255 / 70%);
      background: rgb(100 210 255 / 18%);
    }

    .sheet-link {
      display: block;
      width: 100%;
      min-height: 44px;
      margin-top: 16px;
      border-radius: 14px;
      color: #64d2ff;
      font-size: 15px;
      text-align: center;
    }

    /* „Historie místnosti – 24 h“: readout, chart 1:1 in CSS pixels, legend. */
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
      color: #9a9aa0;
      font-size: 15px;
    }

    .readout-temp {
      font-size: 22px;
      font-weight: 600;
    }

    .readout-hum {
      color: #64d2ff;
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

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      margin-top: 8px;
      color: #9a9aa0;
      font-size: 13px;
      line-height: 18px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .legend-swatch {
      box-sizing: border-box;
      width: 14px;
      height: 9px;
      border-radius: 2px;
    }

    .legend-swatch.line,
    .legend-swatch.dashed {
      height: 0;
      border-top: 2px solid;
      border-radius: 0;
    }

    .legend-swatch.dashed {
      border-top-style: dashed;
    }

    @media (prefers-reduced-motion: reduce) {
      .sheet,
      .preset.sent svg,
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
`, Ji = " ";
function $e(n) {
  if (!n || T(n.state.toLowerCase()))
    return;
  const t = Number.parseFloat(n.state);
  return Number.isFinite(t) ? t : void 0;
}
function Ot(n) {
  return n === void 0 ? "" : `· ${Pe(n)}${Ji}°C`;
}
function Dt(n, t, e, i) {
  const o = n?.state.toLowerCase(), s = t?.state.toLowerCase(), r = s === void 0 || T(s), a = o === "off" || s === "off", l = $e(e);
  if (a)
    return { label: "Vypnuto", color: p.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (r || o === void 0 || T(o))
    return { label: "––", color: p.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const c = ze($e(i));
  return s === "schedule" ? { label: "Plán", color: p.plan, active: !0, extra: Ot(l), unknown: !1, overlay: "schedule", waves: c } : s === "manual" ? { label: "Ručně", color: p.warning, active: !0, extra: Ot(l), unknown: !1, overlay: "manual", waves: c } : { label: t?.state ?? "––", color: p.warning, active: !0, extra: "", unknown: !1, waves: c };
}
function It(n) {
  let t = "unknown", e, i;
  if (n && !T(n.state.toLowerCase())) {
    const s = n.state.toLowerCase(), r = String(n.attributes.preset_mode ?? "none").toLowerCase();
    s === "off" ? t = "off" : s === "cool" ? t = r === "wind_free" ? "wind_free" : "cool" : s === "dry" ? t = "dry" : s === "fan_only" ? t = "fan" : s === "heat" ? t = "heat" : (s === "auto" || s === "heat_cool") && (t = "auto"), t !== "off" && t !== "unknown" && t !== "wind_free" && r !== "none" && r !== "" && (e = Ce(r)), i = I(n.attributes.temperature);
  }
  const o = ["cool", "wind_free", "dry", "heat", "auto"].includes(t);
  return {
    mode: t,
    label: e ?? wt[t],
    color: st[t],
    active: t !== "off" && t !== "unknown",
    extra: o ? Ot(i) : "",
    unknown: t === "unknown"
  };
}
function Qi(n) {
  const t = n.unknown ? "neznámý stav" : n.label;
  return n.extra ? `${t} ${n.extra.replace(/^·\s*/, "")}` : t;
}
const tn = ["místnost", "místnosti", "místností"];
function De(n) {
  return `${n} ${Lt(n, ...tn)}`;
}
function kt(n) {
  return n.length <= 2 ? n.join(", ") : De(n.length);
}
function Ie(n, t, e) {
  const i = t(n.window)?.state.toLowerCase(), o = i !== void 0 && !T(i) && i === "on", s = Dt(
    t(n.heating?.climate),
    t(n.heating?.overlay),
    t(n.heating?.target),
    t(n.heating?.intensity)
  ), r = n.air_conditioner ? It(t(n.air_conditioner)).mode : "unknown", a = !s.unknown && s.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", c = [];
  return o && a && c.push("window-heating"), o && l ? c.push("window-cooling") : l && e && c.push("cooling-cold"), c;
}
function en(n, t, e = /* @__PURE__ */ new Set()) {
  const i = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, o = [], s = [], r = [], a = [];
  for (const d of n) {
    for (const v of Ie(d, t, e.has(d.name)))
      i[v].push(d.name);
    const h = t(d.window)?.state.toLowerCase();
    h !== void 0 && !T(h) && h === "on" && o.push(d.name);
    const u = Dt(
      t(d.heating?.climate),
      t(d.heating?.overlay),
      t(d.heating?.target),
      t(d.heating?.intensity)
    );
    u.overlay === "manual" && s.push(d.name), u.waves > 0 && r.push(d.name), d.air_conditioner && It(t(d.air_conditioner)).active && a.push(d.name);
  }
  const l = [], c = [
    ["window-heating", "conflict-window", "Okno otevřené · topí se", "Okno je otevřené a topí se"],
    ["window-cooling", "conflict-window", "Okno otevřené · chladí se", "Okno je otevřené a chladí se"],
    ["cooling-cold", "conflict-cooling", "Chladí se, i když je chladno", "Chladí se, i když je chladno"]
  ];
  for (const [d, h, u, v] of c)
    i[d].length > 0 && l.push({
      kind: h,
      text: `${u}: ${kt(i[d])}`,
      color: p.warning,
      spoken: `Konflikt: ${v}: ${i[d].join(", ")}`
    });
  return o.length > 0 && l.push({
    kind: "windows",
    text: `${o.length} ${Lt(o.length, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    color: p.sky,
    spoken: `Otevřená okna: ${o.join(", ")}`
  }), s.length > 0 && l.push({
    kind: "manual",
    text: `Ručně: ${kt(s)}`,
    color: p.warning,
    spoken: `Topení ručně: ${s.join(", ")}`
  }), r.length > 0 && l.push({
    kind: "heating",
    text: `Topí ${De(r.length)}`,
    color: p.warning,
    spoken: `Topí se: ${r.join(", ")}`
  }), a.length > 0 && l.push({
    kind: "climate",
    text: `Klimatizace: ${kt(a)}`,
    color: p.cool,
    spoken: `Klimatizace zapnutá: ${a.join(", ")}`
  }), l;
}
var nn = Object.defineProperty, S = (n, t, e, i) => {
  for (var o = void 0, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(t, e, o) || o);
  return o && nn(t, e, o), o;
};
const on = 5 * 6e4, sn = 3e4, rn = 8e3, R = " ", an = 550, we = 400, ln = 700, cn = 5e3, hn = 1600, dn = 100, pn = 0.6, un = 6, fn = ["off", "cool", "dry", "fan_only", "auto", "heat"], Q = { heating: "Topení", climate: "Klimatizace" }, Bt = class Bt extends et {
  constructor() {
    super(...arguments), this._historyStatus = "loading", this._dragY = 0, this._moving = {}, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, i = t.currentTarget.querySelector("svg.chart");
      if (!e || !i)
        return;
      const o = i.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = Ui((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const e = this._historyModel;
      if (!e)
        return;
      const { startMs: i, endMs: o } = e.range, s = this._scrubTime ?? o;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const r = s + (t.key === "ArrowLeft" ? -ve : ve);
        this._scrubTime = r >= o ? void 0 : Math.max(i, r);
      } else if (t.key === "Home")
        this._scrubTime = i;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this._drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now(), dragging: !1 });
    }, this.dragMove = (t) => {
      const e = this._drag;
      if (!e || e.pointerId !== t.pointerId)
        return;
      const i = t.clientY - e.startY;
      if (!e.dragging) {
        if (i < un)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const i = Math.max(0, t.clientY - e.startY), o = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > dn || o > pn) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet .chart-wrap'
        )
      ];
      if (e.length === 0)
        return;
      const i = this.renderRoot.activeElement, o = i ? e.indexOf(i) : -1, s = t.shiftKey ? e[o <= 0 ? e.length - 1 : o - 1] : e[o === -1 || o === e.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = pi(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, sn), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", this.handleResize);
    for (const t of [this._noticeTimer, this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._noticeTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? this.hasRelevantEntityChanged(t.get("hass")) : !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, on)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => this.entityState(t.window)?.toLowerCase() === "on");
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of fi(this._config)) {
      const i = t.states[e], o = this.hass.states[e];
      if (i?.state !== o?.state || i?.last_updated !== o?.last_updated || !gi(i?.attributes, o?.attributes))
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
    const t = this.entityState(this._config.house_mode_entity ?? Ae)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", o = this.thresholds(), s = this.trendAxes(this._config), r = Date.now(), a = this._config.title ?? "Domov", l = this.renderOutside(), c = en(
      this._config.rooms,
      (h) => this.getState(h),
      this.coldRooms(e, i, o, r)
    ), d = a !== "" || l !== f || c.length > 0;
    return m`
      <ha-card>
        <div class="dashboard">
          ${d ? m`<header class="dashboard-header">
                ${a === "" ? f : m`<h1>${a}</h1>`}
                ${l} ${this.renderSummary(c)}
              </header>` : f}
          ${this._notice ? m`<div class="notice" role="alert">${this._notice}</div>` : f}
          <div class="rooms">
            ${this._config.rooms.map(
      (h, u) => this.renderRoom(h, u, e, i, o, s, r)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...Ee, ...this._config?.thresholds };
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, e, i, o) {
    const s = i.stale_minutes, r = /* @__PURE__ */ new Set();
    for (const a of this._config?.rooms ?? [])
      ne(
        {
          temperature: this.reading(a.temperature, s, o),
          humidity: this.reading(a.humidity, s, o),
          co2: this.reading(a.carbon_dioxide, s, o),
          pm25: this.reading(a.pm25, s, o)
        },
        t,
        e,
        i
      ).label === "Chladno" && r.add(a.name);
    return r;
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (i) => t.rooms.map((o) => {
      const s = i(o);
      return s ? this._trends[s] : void 0;
    });
    return {
      temperature: _t(e((i) => i.temperature), X.temperature),
      co2: _t(e((i) => i.carbon_dioxide), X.co2),
      pm25: _t(e((i) => i.pm25), X.pm25)
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), o = this.numberState(t.minimum), s = this.numberState(t.maximum), r = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = o !== void 0 && s !== void 0 ? `${e.format(o)}–${e.format(s)}${R}°C` : void 0, c = [
      i === void 0 ? void 0 : `${e.format(i)}${R}°C`,
      l,
      r === void 0 ? void 0 : `☂${R}${e.format(r)}${R}%`
    ].filter((v) => v !== void 0), d = this.thresholds();
    let h = "––", u = p.label;
    return a !== void 0 && (a >= d.pm25_critical ? (h = "špatný", u = p.alert) : a >= d.pm25_warning ? (h = "zhoršený", u = p.warning) : h = "dobrý"), c.length === 0 && !t.pm25 ? f : m`<div class="outside">
      ${c.length > 0 ? m`<div>${c.join(" · ")}</div>` : f}
      ${t.pm25 ? m`<div>Vzduch venku: <span style=${`color: ${u}`}>${h}</span></div>` : f}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? f : m`<ul class="summary" aria-label="Souhrn domu">
      ${t.map((e) => {
      const i = e.kind === "windows" || e.kind === "conflict-window" ? pe(e.color, !1) : e.kind === "climate" || e.kind === "conflict-cooling" ? ft("cool", e.color, !1) : At(3, !1);
      return m`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${i}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, o, s, r, a) {
    const l = s.stale_minutes, c = this.reading(t.temperature, l, a), d = this.reading(t.humidity, l, a), h = this.reading(t.carbon_dioxide, l, a), u = this.reading(t.pm25, l, a), v = ne({ temperature: c, humidity: d, co2: h, pm25: u }, i, o, s), w = qi(t), y = (b) => v.cause === b ? `color: ${v.color}` : f, k = Ie(t, (b) => this.getState(b), v.label === "Chladno");
    return m`
      <div class="room-cell"><article
        class="room"
        aria-label=${t.name}
        style=${w ? `--scene-tone: ${Gi[w]}` : f}
      >
        ${w ? m`<div class="scene" aria-hidden="true">${Zi(w)}</div>` : f}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${v.kind === "unknown" ? `border: 1.5px solid ${p.off}` : `background: ${v.color}`}
          ></span>
          <span style=${`color: ${v.color}; font-weight: ${v.kind === "normal" ? 400 : 500}`}>
            ${v.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${c.stale ? "stale" : ""}"
            style=${y("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(c) ?? f}
            aria-label=${`${t.name}: teplota ${c.value === void 0 ? "neznámá" : `${St(c.value)} °C`}${this.staleSpoken(c)}, historie místnosti za 24 hodin`}
            @click=${(b) => this.openSheet("history", t, b)}
          >
            ${c.value === void 0 ? m`<span class="missing">––</span>` : m`${St(c.value)}<span class="temperature-unit">${R}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${y("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? f}
            aria-label=${`${t.name}: vlhkost ${d.value === void 0 ? "neznámá" : `${Math.round(d.value)} %`}${this.staleSpoken(d)}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${d.value === void 0 ? m`<span class="missing">––</span>` : m`${Math.round(d.value)}${R}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, e, h, u, s, r)}
            ${this.renderHvac(t, i, e)}
            ${this.renderTemperatureTrend(t, c, r.temperature)}
            ${this.renderWindow(t, e, k, a)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : m`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article></div>
    `;
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === p.alert ? p.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, i) {
    return t.value === void 0 || t.stale ? p.label : t.value >= i ? p.alert : t.value >= e ? p.warning : p.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once.
   */
  renderAirBlock(t, e, i, o, s, r) {
    const a = [t.carbon_dioxide, t.pm25].filter((u) => !!u), l = (u, v, w, y, k) => {
      if (!v)
        return;
      const b = w.value === void 0 ? void 0 : se(this._trends[v], X[k]);
      return `${u} ${w.value === void 0 ? "neznámé" : `${Math.round(w.value)} ${y}`}${b ? `, za 2 hodiny ${b}` : ""}${this.staleSpoken(w)}`;
    }, c = [
      l("CO₂", t.carbon_dioxide, i, "ppm", "co2"),
      l("PM2.5", t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), d = a.length > 1, h = `air-description-${e}`;
    return m`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${a.length === 0}
        aria-haspopup=${d ? "dialog" : f}
        aria-describedby=${h}
        @click=${(u) => d ? this.openSheet("air", t, u) : this.showMoreInfo(a[0])}
      >
        ${this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      m`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      i,
      "ppm",
      s.co2_warning,
      s.co2_critical,
      r.co2
    )}
        ${this.renderAirRow(
      "pm25",
      t.pm25,
      de(),
      o,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical,
      r.pm25
    )}
      </button>
      <span class="sr-only" id=${h}
        >${`${t.name}: kvalita vzduchu, ${c}. ${d ? "Otevře detaily." : "Otevře detail a historii."}`}</span
      >
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, e, i) {
    const o = e.stale_minutes, s = [
      { slot: "co2", label: "CO₂", unit: "ppm", entityId: t.carbon_dioxide, warning: e.co2_warning, critical: e.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", entityId: t.pm25, warning: e.pm25_warning, critical: e.pm25_critical }
    ];
    return m`
      <div class="options air-options" role="group" aria-label="Kvalita vzduchu">
        ${s.map(({ slot: r, label: a, unit: l, entityId: c, warning: d, critical: h }) => {
      const u = this.reading(c, o, i), v = u.value !== void 0, w = v && !u.stale ? p[r] : p.off;
      return m`<button
            type="button"
            class="plain-button option air-option"
            ?disabled=${!c}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(c);
      }}
          >
            <span class="option-icon" style=${`color: ${w}`} aria-hidden="true">
              ${r === "co2" ? m`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : de()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">Detail a historie</span>
            </span>
            <span class="air-value" style=${`color: ${this.popupColor(this.airColor(u, d, h))}`}>
              ${v ? `${Math.round(u.value)} ${l}` : m`<span aria-hidden="true">––</span><span class="sr-only">neznámé</span>`}
            </span>
            ${u.stale ? m`<span class="sr-only">${this.staleSpoken(u)}</span>` : f}
          </button>`;
    })}
      </div>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, e, i, o, s, r, a, l) {
    const c = o.value !== void 0, d = Math.round(o.value ?? 0), h = this.airColor(o, r, a), u = p[t];
    return m`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? f}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${c && !o.stale ? u : p.off}`} aria-hidden="true">
            ${i}
          </span>
          <span class="row-text">
            ${c ? m`<span class="row-label" style=${`color: ${h}`}>${d}</span>
                  <span class="row-unit">${s}</span>` : m`<span class="row-label" style=${`color: ${p.label}`}>––</span>`}
          </span>
        </span>
        ${c ? this.renderSpark(e, l, u, o.stale === !0) : f}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, i) {
    if (!t.temperature || e.value === void 0)
      return f;
    const o = this.renderSpark(t.temperature, i, p.peach, e.stale === !0);
    if (o === f)
      return f;
    const s = se(this._trends[t.temperature], X.temperature);
    return m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: teplota za 2 hodiny${s ? ` ${s}` : ""}, historie místnosti za 24 hodin`}
        @click=${(r) => this.openSheet("history", t, r)}
      >
        ${o}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  renderSpark(t, e, i, o) {
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
    const r = Ei(s, e).map(
      (h, u) => h === void 0 ? void 0 : { x: u / (le - 1) * 100, y: (1 - h) * 100 }
    ).filter((h) => h !== void 0);
    if (r.length < 2)
      return f;
    const a = r.map((h) => `${h.x.toFixed(2)},${h.y.toFixed(2)}`).join(" "), l = r[0], c = r[r.length - 1], d = `${a} ${c.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return m`<span class="spark ${o ? "stale" : ""}" style=${`color: ${i}`} aria-hidden="true">
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
  renderHvac(t, e, i) {
    const o = Dt(
      this.getState(t.heating?.climate),
      this.getState(t.heating?.overlay),
      this.getState(t.heating?.target),
      this.getState(t.heating?.intensity)
    ), s = It(this.getState(t.air_conditioner)), r = (u) => this.renderSystemRow(At(o.unknown ? 0 : o.waves, o.unknown), o, u), a = (u) => this.renderSystemRow(ft(s.mode, s.color, s.unknown), s, u), l = e ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, l), d = l.map((u) => `${Q[u]} ${Qi(u === "heating" ? o : s)}`).join(", "), h = `hvac-description-${i}`;
    return m`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${h}
        @click=${(u) => c ? this.openSheet(c, t, u) : void 0}
      >
        ${e ? a(!0) : r(!0)}
        ${e ? r(!1) : a(!1)}
      </button>
      <span class="sr-only" id=${h}
        >${`${t.name}: ${d}.${c ? ` Otevře ovládání ${Q[c]}.` : ""}`}</span
      >
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, e) {
    const i = (o) => o === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
    return e.find(i);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, e, i) {
    return m`
      <span
        class="system-row ${i && e.active ? "strong" : ""}"
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
  renderWindow(t, e, i, o) {
    const s = t.window, r = this.getState(s), a = r?.state.toLowerCase(), l = a === void 0 || T(a), c = a === "on", d = l ? p.label : c ? p.sky : p.label, h = l ? "––" : c ? "Otevřeno" : "Zavřeno", u = c ? Date.parse(r?.last_changed ?? "") : Number.NaN, v = Number.isNaN(u) ? void 0 : Math.max(0, (o - u) / 6e4), w = i.includes("window-heating") ? "otevřené okno při topení" : i.includes("window-cooling") ? "otevřené okno při chlazení" : void 0, y = `window-description-${e}`, k = l ? "okno neznámé" : `okno ${c ? "otevřené" : "zavřené"}${v === void 0 ? "" : `, otevřené ${$i(v)}`}`;
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${c ? "strong" : ""}"
        style=${`--row-color: ${d}`}
        ?disabled=${!s}
        aria-describedby=${y}
        @click=${() => this.showMoreInfo(s)}
      >
        <span class="row-main">
          <span class="row-icon">${pe(l ? p.off : d, l)}</span>
          <span class="row-text">
            <span class="row-label">${h}</span>
            ${v === void 0 ? f : m`<span class="row-unit window-duration">${R}·${R}${vi(v)}</span>`}
            ${w ? m`<span class="conflict-dot" aria-hidden="true"></span>` : f}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${y}
        >${`${t.name}: ${k}${w ? `; konflikt: ${w}` : ""}. Otevře detail a historii.`}</span
      >
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), o = i?.state.toLowerCase(), s = o !== void 0 && !T(o), r = s ? I(i?.attributes.current_position) : void 0, a = s ? I(i?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, c = o === "opening" || o === "closing", d = `${l ? `poloha ${Math.round(r)} %, naklopení ${Math.round(a)} %` : "poloha nebo naklopení neznámé"}${c ? ", pohybuje se" : ""}`;
    return m`
      <button
        type="button"
        class="plain-button cover-panel ${c ? "moving" : ""}"
        aria-label=${`${t.name}: žaluzie, ${d}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${ut} ${Mt}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${ki(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${ee.map((h) => this.renderPreset(t, h, r, a, s))}
      </div>
    `;
  }
  renderPreset(t, e, i, o, s) {
    const r = this._moving[t.name], a = r === e.id, l = r === void 0 && yt(i, o, e), c = `${t.name}|${e.id}`, d = s ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná.";
    return m`
      <button
        type="button"
        class="plain-button preset ${this._flash === c ? "sent" : ""} ${s ? "" : "unavailable"} ${a ? "pending" : ""}"
        title=${e.label}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : f}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${`${t.name}: žaluzie ${e.label}, ${e.description}. ${d}`}
        @pointerdown=${(h) => this.pressStart(h, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(h) => h.preventDefault()}
        @click=${(h) => {
      h.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(c));
    }}
      >
        ${Ci(e.id)}
        ${this._hint?.key === c ? m`<span class="preset-hint" role="status">${this._hint.text}</span>` : f}
      </button>
    `;
  }
  pressStart(t, e, i, o) {
    t.button !== 0 || !o || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, i);
    }, an));
  }
  pressEnd(t, e, i) {
    const o = `${t.name}|${e.id}`;
    if (!i) {
      this.showUnavailable(o);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const s = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !s || r)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === o && a - this._lastTap.time <= we) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, e);
      return;
    }
    this._lastTap = { key: o, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === o && (this._lastTap = void 0, this.showHint(o, "Podržte nebo klepněte dvakrát", "selection"));
    }, we);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, "Žaluzie je nedostupná", "warning");
  }
  showHint(t, e, i) {
    this._hint = { key: t, text: e }, this.haptic(i), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, hn);
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover)
      return;
    const i = this.entityState(t.cover)?.toLowerCase();
    if (i === void 0 || T(i)) {
      this.showUnavailable(`${t.name}|${e.id}`);
      return;
    }
    this.startMoving(t, t.cover, e);
    try {
      await this.hass.callService(te.domain, te.service, {
        entity: t.cover,
        pos: e.position,
        tilt: e.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, ln);
    } catch (o) {
      console.error("Klima Dashboard: skript žaluzií selhal", o), this.endMoving(t.name), this.haptic("failure"), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, e, i) {
    const o = this.getState(e);
    if (yt(
      I(o?.attributes.current_position),
      I(o?.attributes.current_tilt_position),
      i
    ) && !this.isMoving(e)) {
      this.endMoving(t.name);
      return;
    }
    this._moving = { ...this._moving, [t.name]: i.id }, this._movingWatch.set(t.name, { signature: this.coverSignature(e) }), this.armStall(t.name);
  }
  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  trackMovingPresets() {
    for (const t of this._config?.rooms ?? []) {
      const e = this._moving[t.name], i = ee.find((l) => l.id === e), o = this._movingWatch.get(t.name);
      if (!i || !o || !t.cover)
        continue;
      const s = this.getState(t.cover), r = s?.state.toLowerCase();
      if (r === void 0 || T(r) || yt(
        I(s?.attributes.current_position),
        I(s?.attributes.current_tilt_position),
        i
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
    e && (window.clearTimeout(e.timer), e.timer = window.setTimeout(() => this.endMoving(t), cn));
  }
  endMoving(t) {
    if (window.clearTimeout(this._movingWatch.get(t)?.timer), this._movingWatch.delete(t), t in this._moving) {
      const { [t]: e, ...i } = this._moving;
      this._moving = i;
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
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, rn);
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const e = this._sheet;
    return e ? e.kind === "history" ? this.renderSheetFrame(
      "Historie místnosti – 24 h",
      e.room.name,
      this.renderHistoryBody(e.room),
      "history-sheet"
    ) : e.kind === "air" ? this.renderSheetFrame("Kvalita vzduchu", e.room.name, this.renderAirBody(e.room, this.thresholds(), Date.now())) : this.renderSheetFrame(e.room.name, void 0, this.renderHvacBody(e.room, e.kind, t)) : f;
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, i, o = "") {
    const s = this._drag?.dragging === !0;
    return m`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
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
              <button type="button" class="plain-button close" aria-label="Zavřít" @click=${() => this.closeSheet()}>
                ✕
              </button>
            </div>
          </div>
          ${i}
        </div>
      </div>
    `;
  }
  /** Topení / Klimatizace controls, with a segmented control to switch between the two. */
  renderHvacBody(t, e, i) {
    const o = e === "heating", s = o ? t.heating?.climate : t.air_conditioner, r = this.getState(s), a = r !== void 0 && !T(r.state.toLowerCase()), l = oe(r?.attributes.hvac_modes), c = oe(r?.attributes.preset_modes), d = r?.state.toLowerCase(), h = String(r?.attributes.preset_mode ?? "none").toLowerCase(), u = !a || !s ? [] : o ? this.heatingOptions(s, l, c, d, h) : this.climateOptions(s, l, d), v = !o && a && s ? c.filter((b) => b !== "none") : [], w = i ? ["climate", "heating"] : ["heating", "climate"], y = !!t.heating?.climate && !!t.air_conditioner, k = m`
      ${a ? u.length === 0 ? m`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : m`<div class="options" role="group" aria-label=${`${Q[e]}: režim`}>
              ${u.map((b) => this.renderOption(b))}
            </div>` : m`<p class="sheet-message">Entita je nedostupná.</p>`}
      ${v.length > 0 ? m`<div class="sheet-label" id="preset-label">Předvolby</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${v.map((b) => this.renderPresetChip(s, b, h, d, c))}
            </div>` : f}
      ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!s}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(s);
    }}
      >
        Detail a historie
      </button>
    `;
    return y ? m`
      <div
        class="segmented"
        role="tablist"
        aria-label="Systém"
        @keydown=${(b) => this.segmentKeydown(b, w, e)}
      >
        ${w.map(
      (b) => m`<button
            type="button"
            role="tab"
            id=${`tab-${b}`}
            class="plain-button segment"
            data-system=${b}
            aria-selected=${b === e ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${b === e ? "0" : "-1"}
            @click=${() => this.switchSheet(b)}
          >
            ${Q[b]}
          </button>`
    )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${e}`}>${k}</div>
    ` : m`<div class="sheet-label system-name">${Q[e]}</div>${k}`;
  }
  segmentKeydown(t, e, i) {
    const o = e.indexOf(i);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = e[(o + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = e[(o - 1 + e.length) % e.length] : t.key === "Home" ? s = e[0] : t.key === "End" && (s = e[e.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === i ? this.requestUpdate() : this.switchSheet(s));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    let e;
    const i = this._historyModel;
    this._historyStatus === "loading" ? e = m`<p class="sheet-message">Načítám historii…</p>` : this._historyStatus === "error" || !i ? e = m`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>` : Ii(i) ? e = m`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label="Graf za 24 hodin. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď."
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${Vi(i, this.chartWidth(), this._scrubTime)}
      </div>` : e = m`<p class="sheet-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    const o = t.temperature ?? t.humidity;
    return m`
      ${e}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!o}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(o);
    }}
      >
        Detail teploty
      </button>
    `;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    return Math.max(280, Math.min(460, window.innerWidth) - 32);
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
  renderPresetChip(t, e, i, o, s) {
    const r = i === e && o !== "off", a = r && s.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${Ce(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, o, s) {
    const r = [], a = (l, c, d, h, u, v) => {
      r.push({ id: l, label: c, icon: Oi(l), color: d, active: h, run: u, unsupported: v });
    };
    if (e.includes("off") && a("off", "Vypnuto", p.off, o === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", p.plan, o === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      p.warning,
      o === "heat" && s !== "boost",
      () => this.setHvacMode(t, "heat")
    ), r.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        p.alert,
        l && s === "boost" && o !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return r;
  }
  climateOptions(t, e, i) {
    return fn.filter((o) => e.includes(o)).map((o) => {
      const s = Oe(o), r = st[s];
      return {
        id: o,
        label: wt[s],
        icon: ft(s, r, !1),
        color: r,
        active: i === o,
        run: () => this.setHvacMode(t, o)
      };
    });
  }
  setHvacMode(t, e) {
    return this.callClimate("set_hvac_mode", { entity_id: t, hvac_mode: e });
  }
  setPresetMode(t, e) {
    return this.callClimate("set_preset_mode", { entity_id: t, preset_mode: e });
  }
  async callClimate(t, e) {
    if (!this.hass)
      throw new Error("Home Assistant není připojen.");
    await this.hass.callService("climate", t, e);
  }
  async runSheetAction(t) {
    this._sheetError = void 0;
    try {
      await t();
    } catch (e) {
      console.error("Klima Dashboard: příkaz klimatu selhal", e), this._sheetError = "Příkaz se nepodařilo odeslat.";
    }
  }
  openSheet(t, e, i) {
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._sheet = { kind: t, room: e }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
  }
  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  switchSheet(t) {
    this._sheet && this._sheet.kind !== t && (this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room });
  }
  closeSheet(t = !0) {
    window.removeEventListener("resize", this.handleResize), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
  }
  async loadRoomHistory(t) {
    const e = ++this._historyRequest;
    if (this._historyStatus = "loading", this._historyModel = void 0, !this.hass) {
      this._historyStatus = "error";
      return;
    }
    const i = [
      t.temperature,
      t.humidity,
      t.heating?.overlay,
      t.heating?.climate,
      t.heating?.intensity,
      t.heating?.target,
      t.air_conditioner
    ].filter((r) => !!r), o = Date.now(), s = o - 24 * Re;
    try {
      const r = await ce(this.hass, i, s, o);
      if (e !== this._historyRequest)
        return;
      this._historyModel = Di(r, t, { startMs: s, endMs: o }), this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", r), e === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = mi(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const e = Date.now(), i = e - Si;
    try {
      const o = await ce(this.hass, t, i, e), s = {};
      for (const r of t)
        s[r] = Ai(o[r], i, e, le);
      this._trends = s;
    } catch (o) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", o);
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
    const e = wi(this._config), i = await Promise.allSettled(
      e.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    i.forEach((s, r) => {
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
  reading(t, e, i) {
    const o = this.numberState(t);
    if (o === void 0 || !t)
      return {};
    const s = this._reported[t];
    if (s === void 0)
      return { value: o };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), a = Math.max(s, Number.isFinite(r) ? r : 0), l = Math.max(0, (i - a) / 6e4);
    return { value: o, ageMinutes: l, stale: l > e };
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? `Naposledy před ${Fe(t.ageMinutes)}` : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || T(e.toLowerCase()))
      return;
    const i = Number.parseFloat(e);
    return Number.isFinite(i) ? i : void 0;
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
Bt.styles = Xi;
let x = Bt;
S([
  M()
], x.prototype, "_config");
S([
  Me({ attribute: !1 })
], x.prototype, "hass");
S([
  M()
], x.prototype, "_sheet");
S([
  M()
], x.prototype, "_sheetError");
S([
  M()
], x.prototype, "_historyStatus");
S([
  M()
], x.prototype, "_historyModel");
S([
  M()
], x.prototype, "_scrubTime");
S([
  M()
], x.prototype, "_dragY");
S([
  M()
], x.prototype, "_flash");
S([
  M()
], x.prototype, "_moving");
S([
  M()
], x.prototype, "_hint");
S([
  M()
], x.prototype, "_trends");
S([
  M()
], x.prototype, "_trendsLoaded");
S([
  M()
], x.prototype, "_reported");
S([
  M()
], x.prototype, "_notice");
S([
  M()
], x.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", x);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
