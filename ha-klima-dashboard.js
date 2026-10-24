const Z = globalThis, gt = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = /* @__PURE__ */ Symbol(), At = /* @__PURE__ */ new WeakMap();
let Yt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fe = (n) => new Yt(typeof n == "string" ? n : n + "", void 0, vt), ge = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Yt(e, n, vt);
}, ve = (n, t) => {
  if (gt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = Z.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Et = gt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return fe(e);
})(n) : n;
const { is: $e, defineProperty: be, getOwnPropertyDescriptor: ye, getOwnPropertyNames: we, getOwnPropertySymbols: _e, getPrototypeOf: xe } = Object, et = globalThis, Mt = et.trustedTypes, ke = Mt ? Mt.emptyScript : "", Se = et.reactiveElementPolyfillSupport, I = (n, t) => n, J = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ke : null;
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
} }, $t = (n, t) => !$e(n, t), Ct = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), et.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && be(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = ye(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = xe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...we(e), ..._e(e)];
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
      for (const s of i) e.unshift(Et(s));
    } else t !== void 0 && e.push(Et(t));
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
    return ve(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : J).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : J;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? $t)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[I("elementProperties")] = /* @__PURE__ */ new Map(), z[I("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: z }), (et.reactiveElementVersions ??= []).push("2.1.2");
const bt = globalThis, Tt = (n) => n, X = bt.trustedTypes, zt = X ? X.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Zt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + S, Ae = `<${Gt}>`, T = document, U = () => T.createComment(""), B = (n) => n === null || typeof n != "object" && typeof n != "function", yt = Array.isArray, Ee = (n) => yt(n) || typeof n?.[Symbol.iterator] == "function", nt = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Ft = />/g, E = RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Nt = /"/g, Jt = /^(?:script|style|textarea|title)$/i, Xt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), m = Xt(1), v = Xt(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), C = T.createTreeWalker(T, 129);
function Qt(n, t) {
  if (!yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(t) : t;
}
const Me = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = N;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h, p, d = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, p = r.exec(l), p !== null); ) u = r.lastIndex, r === N ? p[1] === "!--" ? r = Pt : p[1] !== void 0 ? r = Ft : p[2] !== void 0 ? (Jt.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = E) : p[3] !== void 0 && (r = E) : r === E ? p[0] === ">" ? (r = s ?? N, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, h = p[1], r = p[3] === void 0 ? E : p[3] === '"' ? Nt : Ot) : r === Nt || r === Ot ? r = E : r === Pt || r === Ft ? r = N : (r = E, s = void 0);
    const $ = r === E && n[a + 1].startsWith("/>") ? " " : "";
    o += r === N ? l + Ae : d >= 0 ? (i.push(h), l.slice(0, d) + Zt + l.slice(d) + S + $) : l + S + (d === -2 ? a : $);
  }
  return [Qt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, p] = Me(t, e);
    if (this.el = j.createElement(h, i), C.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = C.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Zt)) {
          const u = p[r++], $ = s.getAttribute(d).split(S), w = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: w[2], strings: $, ctor: w[1] === "." ? Te : w[1] === "?" ? ze : w[1] === "@" ? Pe : it }), s.removeAttribute(d);
        } else d.startsWith(S) && (l.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Jt.test(s.tagName)) {
          const d = s.textContent.split(S), u = d.length - 1;
          if (u > 0) {
            s.textContent = X ? X.emptyScript : "";
            for (let $ = 0; $ < u; $++) s.append(d[$], U()), C.nextNode(), l.push({ type: 2, index: ++o });
            s.append(d[u], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gt) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(S, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += S.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = T.createElement("template");
    return i.innerHTML = t, i;
  }
}
function F(n, t, e = n, i) {
  if (t === P) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = B(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = F(n, s._$AS(n, t.values), s, i)), t;
}
class Ce {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? T).importNode(e, !0);
    C.currentNode = s;
    let o = C.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new V(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new Fe(o, this, t)), this._$AV.push(h), l = i[++a];
      }
      r !== l?.index && (o = C.nextNode(), r++);
    }
    return C.currentNode = T, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = F(this, t, e), B(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && B(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = j.createElement(Qt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Ce(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Rt.get(t.strings);
    return e === void 0 && Rt.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new V(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Tt(t).nextSibling;
      Tt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = F(this, t, e, 0), r = !B(t) || t !== this._$AH && t !== P, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = F(this, a[i + l], e, l), h === P && (h = this._$AH[l]), r ||= !B(h) || h !== this._$AH[l], h === f ? t = f : t !== f && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ze extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Pe extends it {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = F(this, t, e, 0) ?? f) === P) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fe {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    F(this, t);
  }
}
const Oe = bt.litHtmlPolyfillSupport;
Oe?.(j, V), (bt.litHtmlVersions ??= []).push("3.3.3");
const Ne = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new V(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const wt = globalThis;
class D extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ne(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
D._$litElement$ = !0, D.finalized = !0, wt.litElementHydrateSupport?.({ LitElement: D });
const Re = wt.litElementPolyfillSupport;
Re?.({ LitElement: D });
(wt.litElementVersions ??= []).push("4.2.2");
const He = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: $t }, Le = (n = He, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
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
function te(n) {
  return (t, e) => typeof e == "object" ? Le(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function A(n) {
  return te({ ...n, state: !0, attribute: !1 });
}
const Ie = ["bedroom", "office", "kids", "living"], ee = "none", ie = "input_select.house_mode", se = {
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
};
function De(n) {
  if (!n || !Array.isArray(n.rooms) || n.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (n.house_mode_entity !== void 0 && (typeof n.house_mode_entity != "string" || !n.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of n.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [o, r] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (o in i)
        throw new Error(`Room "${e.name}": key "${o}" was renamed to "${r}".`);
    const s = [...Ie, ee];
    if (e.scene !== void 0 && !s.includes(e.scene))
      throw new Error(`Room "${e.name}": scene must be one of ${s.join(", ")}.`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(n.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...se, ...n.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  return { ...n, thresholds: t };
}
const Ht = { domain: "script", service: "zaluzie_posun" }, Ue = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0, tone: "#A5A1F2" },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100, tone: "#7FC8F8" },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100, tone: "#FFD84A" }
], ot = { temperature: 1, co2: 100, pm25: 5 }, c = {
  closed: "#6B6B70",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** Air-quality icons and their micro trends. */
  mint: "#5BD6B5",
  /** Temperature micro trend. */
  peach: "#FFB36B",
  /** Dashed humidity curve in the 24 h room history. */
  humidityLine: "#64D2FF",
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
}, Q = {
  off: c.off,
  cool: c.cool,
  wind_free: c.cool,
  dry: c.dry,
  fan: c.plan,
  heat: c.heat,
  auto: c.auto,
  unknown: c.off
}, pt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, Be = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Lt(n) {
  const t = Be[n];
  if (t)
    return t;
  const e = n.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ne(n) {
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
function je(n, t, e, i, s, o, r) {
  const a = [
    ["teplota", n !== void 0],
    ["vlhkost", t !== void 0],
    ["CO₂", e !== void 0],
    ["PM2.5", i !== void 0],
    ["režim domu", o]
  ].find(([, p]) => !p);
  if (a || n === void 0 || t === void 0 || e === void 0 || i === void 0)
    return {
      label: a ? `Bez dat · ${a[0]}` : "Bez dat",
      color: c.label,
      kind: "unknown"
    };
  if (i >= r.pm25_critical)
    return { label: "Znečištěný vzduch", color: c.alert, kind: "critical" };
  if (e >= r.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: c.alert, kind: "critical" };
  if (e >= r.co2_warning)
    return { label: "Vydýchaný vzduch", color: c.warning, kind: "warning" };
  if (t > r.humidity_max)
    return { label: "Vlhko", color: c.warning, kind: "warning" };
  if (t < r.humidity_min)
    return { label: "Sucho", color: c.warning, kind: "warning" };
  const l = s ? r.summer_min : r.winter_min, h = s ? r.summer_max : r.winter_max;
  return n > h ? { label: "Teplo", color: c.warning, kind: "warning" } : n < l ? { label: "Chladno", color: c.cold, kind: "warning" } : { label: "Příjemné", color: c.label, kind: "normal" };
}
function It(n) {
  return Array.isArray(n) ? n.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function M(n) {
  return n === "" || n === "unknown" || n === "unavailable" || n === "none";
}
function rt(n) {
  if (n == null || n === "")
    return;
  const t = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Dt(n) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(n);
}
function at(n) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(n * 2) / 2
  );
}
function oe(n) {
  return n === void 0 || n <= 0 ? 0 : n <= 34 ? 1 : n <= 67 ? 2 : 3;
}
function Ve(n) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(n.house_mode_entity ?? ie), e(n.outside?.temperature), e(n.outside?.minimum), e(n.outside?.maximum), e(n.outside?.rain_probability), e(n.outside?.pm25);
  for (const i of n.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function We(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function Ke(n, t) {
  if (n === t)
    return !0;
  if (!n || !t)
    return !1;
  const e = Object.keys(n), i = Object.keys(t);
  return e.length === i.length && e.every((s) => Object.hasOwn(t, s) && n[s] === t[s]);
}
const G = 60, ut = 142, Ut = 18, Y = 3, qe = 0.8, Ye = 1, Ze = 0.28, Ge = 0.5, Je = 0.7;
function Xe(n, t) {
  if (n === void 0 || t === void 0)
    return v`<rect
      x="0.75"
      y="0.75"
      width=${G - 1.5}
      height=${ut - 1.5}
      rx="6"
      fill="none"
      stroke=${c.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = ut - Y - 1, i = e / Ut, s = i - qe, o = s - t / 100 * (s - Ye), r = Y + 1 + (100 - n) / 100 * e, a = Array.from({ length: Ut }, (l, h) => {
    const p = Y + 1 + h * i + (i - o) / 2, d = p + o / 2 <= r;
    return v`<rect
      x="0"
      y=${p.toFixed(2)}
      width=${G}
      height=${o.toFixed(2)}
      rx=${Math.min(1.5, o / 2).toFixed(2)}
      fill=${d ? c.blind : c.sky}
      opacity=${d ? Ge : Ze}
    ></rect>`;
  });
  return v`<rect
      x="0"
      y="0"
      width=${G}
      height=${Y}
      rx="1.5"
      fill=${c.blind}
      opacity=${Je}
    ></rect>${a}`;
}
const re = 36e5, Qe = 120 * 6e4, Bt = 12;
function ti(n) {
  if (n == null)
    return;
  if (typeof n == "number")
    return Number.isFinite(n) ? n < 1e11 ? n * 1e3 : n : void 0;
  const t = Date.parse(n);
  return Number.isNaN(t) ? void 0 : t;
}
function ei(n, t) {
  const e = {};
  for (const [i, s] of Object.entries(n ?? {})) {
    if (!Array.isArray(s))
      continue;
    const o = [];
    s.forEach((r, a) => {
      const l = r.s ?? r.state, h = ti(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && h !== void 0 && o.push({ time: Math.max(h, t), state: l });
    }), o.sort((r, a) => r.time - a.time), e[i] = o;
  }
  return e;
}
async function jt(n, t, e, i) {
  if (t.length === 0)
    return {};
  const s = await n.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return ei(s, e);
}
function ae(n, t) {
  let e;
  for (const i of n ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function mt(n) {
  if (n === void 0)
    return;
  const t = Number.parseFloat(n);
  return Number.isFinite(t) ? t : void 0;
}
function ii(n, t, e, i) {
  const s = (e - t) / i, o = (n ?? []).filter((r) => mt(r.state) !== void 0);
  return Array.from(
    { length: i },
    (r, a) => mt(ae(o, t + (a + 1) * s))
  );
}
function Vt(n, t, e) {
  const i = [];
  for (const o of n ?? []) {
    const r = mt(o.state);
    r !== void 0 && o.time <= e && i.push({ t: Math.max(o.time, t), v: r });
  }
  const s = i[i.length - 1];
  return s && s.t < e && i.push({ t: e, v: s.v }), i;
}
function lt(n, t, e, i) {
  const s = /* @__PURE__ */ new Set([t, e]);
  for (const a of n)
    for (const l of a ?? [])
      l.time > t && l.time < e && s.add(l.time);
  const o = [...s].sort((a, l) => a - l), r = [];
  for (let a = 0; a < o.length - 1; a += 1) {
    const l = i(n.map((p) => ae(p, o[a])));
    if (l === void 0)
      continue;
    const h = r[r.length - 1];
    h && h.value === l && h.end === o[a] ? h.end = o[a + 1] : r.push({ start: o[a], end: o[a + 1], value: l });
  }
  return r;
}
function ht(n, t) {
  let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const r of n)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), i = Math.max(i, a));
  if (!Number.isFinite(e) || !Number.isFinite(i) || t <= 0)
    return;
  let s = Math.floor(e / t) * t, o = Math.ceil(i / t) * t;
  return o - s < t && (s -= t, o += t), { min: s, max: o };
}
function si(n, t) {
  const e = t.max - t.min;
  return n.map(
    (i) => i === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / e))
  );
}
const le = 360, x = 60, ni = 38, L = le - x - ni, R = 14, tt = c.label, Wt = {
  schedule: c.plan,
  manual: c.warning,
  off: c.closed
}, oi = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, ri = [0, 0.3, 0.6, 0.9], ai = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" }), Kt = (n) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: n });
function O(n, t) {
  return x + (n - t.startMs) / (t.endMs - t.startMs) * L;
}
function ft(n, t, e) {
  return n.map((i, s) => `${s === 0 ? "M" : "L"}${O(i.t, t).toFixed(1)} ${e(i.v).toFixed(1)}`).join(" ");
}
function li(n, t, e, i) {
  if (n.length === 0)
    return "";
  const s = O(n[0].t, t).toFixed(1), o = O(n[n.length - 1].t, t).toFixed(1);
  return `${ft(n, t, e)} L${o} ${i} L${s} ${i} Z`;
}
function qt(n, t, e) {
  const i = n.map((l) => l.v), s = Math.min(...i), o = Math.max(...i), r = Math.max(o - s, t), a = (o + s) / 2;
  return { min: a - r / 2 - e, max: a + r / 2 + e };
}
function hi(n, t) {
  const e = [4, 3, 2, 1, 0].map((i) => n.endMs - i * 6 * re);
  return v`${e.map((i) => {
    const s = O(i, n);
    return v`<line x1=${s} x2=${s} y1=${t - 4} y2=${t} stroke=${tt} stroke-width="0.8"></line>
      <text x=${s} y=${t + 10} fill=${tt} font-size="9" text-anchor="middle">${ai.format(i)}</text>`;
  })}`;
}
function ct(n, t, e, i, s) {
  return v`${n.map((o) => {
    const { fill: r, opacity: a } = s(o.value);
    if (a <= 0)
      return f;
    const l = O(o.start, t), h = Math.max(O(o.end, t) - l, 0.5);
    return v`<rect x=${l.toFixed(1)} y=${e} width=${h.toFixed(1)} height=${i} fill=${r} opacity=${a}></rect>`;
  })}`;
}
function dt(n, t) {
  return v`<text x=${x - 6} y=${t} fill=${tt} font-size="9" text-anchor="end">${n}</text>`;
}
function H(n, t, e = !1) {
  return m`<span class="legend-item">
    <span
      class="legend-swatch ${e ? "dashed" : ""}"
      style=${e ? `border-color: ${n}` : `background: ${n}`}
    ></span
    >${t}
  </span>`;
}
function ci(n, t) {
  return t.some((e) => e !== void 0 && (n[e]?.length ?? 0) > 0);
}
function di(n, t, e) {
  const i = Vt(t.temperature ? n[t.temperature] : void 0, e.startMs, e.endMs), s = Vt(t.humidity ? n[t.humidity] : void 0, e.startMs, e.endMs), o = 120, r = 126, a = 142, l = 158, h = 12, p = 182, d = [
    t.heating?.overlay ? n[t.heating.overlay] : void 0,
    t.heating?.climate ? n[t.heating.climate] : void 0
  ], u = lt(d, e.startMs, e.endMs, ([g, y]) => {
    const q = g?.toLowerCase();
    if (y?.toLowerCase() === "off" || q === "off")
      return "off";
    if (q === "schedule" || q === "manual")
      return q;
  }), $ = lt(
    [t.heating?.intensity ? n[t.heating.intensity] : void 0],
    e.startMs,
    e.endMs,
    ([g]) => {
      const y = g === void 0 ? void 0 : Number.parseFloat(g);
      return y === void 0 || !Number.isFinite(y) ? void 0 : String(oe(y));
    }
  ), w = lt(
    [t.air_conditioner ? n[t.air_conditioner] : void 0],
    e.startMs,
    e.endMs,
    ([g]) => {
      if (g === void 0)
        return;
      const y = ne(g);
      return y === "unknown" ? void 0 : y;
    }
  ), W = i.length > 0 ? qt(i, 2, 0.3) : void 0, K = s.length > 0 ? qt(s, 10, 1) : void 0, st = o - R, xt = (g) => o - (g - (W?.min ?? 0)) / ((W?.max ?? 1) - (W?.min ?? 0)) * st, he = (g) => o - (g - (K?.min ?? 0)) / ((K?.max ?? 1) - (K?.min ?? 0)) * st, kt = Kt(1), St = Kt(0), ce = i.length > 0 ? Math.min(...i.map((g) => g.v)) : 0, de = i.length > 0 ? Math.max(...i.map((g) => g.v)) : 0, pe = s.length > 0 ? Math.min(...s.map((g) => g.v)) : 0, ue = s.length > 0 ? Math.max(...s.map((g) => g.v)) : 0, me = [...new Set(w.map((g) => g.value))];
  return m`
    <svg
      class="chart"
      viewBox="0 0 ${le} 196"
      role="img"
      aria-label="Graf teploty a vlhkosti za posledních 24 hodin s vrstvami vytápění a klimatizace"
    >
      <rect x=${x} y=${R} width=${L} height=${st} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${W ? v`<path d=${li(i, e, xt, o)} fill="rgb(255 255 255 / 8%)"></path>
          <path d=${ft(i, e, xt)} fill="none" stroke=${c.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          <text x=${x - 6} y=${R + 8} fill=${c.plan} font-size="9" text-anchor="end">${kt.format(de)} °C</text>
          <text x=${x - 6} y=${o - 2} fill=${c.plan} font-size="9" text-anchor="end">${kt.format(ce)} °C</text>` : v`<text x=${x + L / 2} y=${(R + o) / 2} fill=${tt} font-size="11" text-anchor="middle">––</text>`}
      ${K ? v`<path d=${ft(s, e, he)} fill="none" stroke=${c.humidityLine} stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"></path>
          <text x=${x + L + 6} y=${R + 8} fill=${c.humidityLine} font-size="9">${St.format(ue)} %</text>
          <text x=${x + L + 6} y=${o - 2} fill=${c.humidityLine} font-size="9">${St.format(pe)} %</text>` : f}
      ${dt("Intenzita", r + 9)}
      ${ct($, e, r, h, (g) => ({
    fill: c.warning,
    opacity: ri[Number(g)] ?? 0
  }))}
      ${dt("Topení", a + 9)}
      ${ct(u, e, a, h, (g) => ({
    fill: Wt[g] ?? c.off,
    opacity: 1
  }))}
      ${dt("Klimatizace", l + 9)}
      ${ct(w, e, l, h, (g) => ({
    fill: Q[g] ?? c.off,
    opacity: 1
  }))}
      ${hi(e, p - 8)}
    </svg>
    <div class="legend">
      ${H(c.plan, "Teplota")} ${H(c.humidityLine, "Vlhkost", !0)}
      ${H(c.warning, "Intenzita topení: sytost = 0–3 vlny")}
    </div>
    <div class="legend">
      ${["schedule", "manual", "off"].filter((g) => u.some((y) => y.value === g)).map((g) => H(Wt[g], `Topení ${oi[g]}`))}
      ${me.map((g) => H(Q[g], `Klimatizace ${pt[g]}`))}
    </div>
  `;
}
function pi() {
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
  ].map(([t, e, i]) => v`<circle cx=${t} cy=${e} r=${i}></circle>`)}
    </svg>
  `;
}
function ui(n) {
  let t;
  switch (n) {
    case "dark":
      t = v`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 10.5h12M6 14h12M6 17.5h12M6 21h12" stroke-width="2.6"></path>`;
      break;
    case "shade":
      t = v`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 11h12M6 15.5h12M6 20h12" stroke-width="1.8"></path>`;
      break;
    default:
      t = v`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M12 5.5v8.5" stroke-width="1.8"></path>`;
  }
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      ${t}
    </svg>
  `;
}
function mi(n) {
  let t;
  switch (n) {
    case "off":
      t = v`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = v`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = v`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      t = v`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const fi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
};
function gi(n) {
  if (n.scene === ee)
    return;
  if (n.scene)
    return n.scene;
  const t = n.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
  return fi[t];
}
const vi = {
  bedroom: "#A5A1F2",
  office: "#7FC8F8",
  kids: "#FFB36B",
  living: "#E8D9B5"
};
function $i(n) {
  let t;
  switch (n) {
    case "bedroom":
      t = v`
        <path d="M121 10a15 15 0 1 0 13 23 12 12 0 0 1-13-23z"></path>
        <path d="M92 14v9M87.5 18.5h9M140 50v7M136.5 53.5h7"></path>
        <path d="M18 56v46M18 86h116v16M18 102h116"></path>
        <path d="M26 74h28a6 6 0 0 1 0 12H26z"></path>
        <path d="M60 86v-8a6 6 0 0 1 6-6h58a10 10 0 0 1 10 10v4"></path>`;
      break;
    case "office":
      t = v`
        <rect x="42" y="22" width="66" height="42" rx="5"></rect>
        <path d="M75 64v14M60 78h30"></path>
        <path d="M16 92h118M24 92v16M126 92v16"></path>
        <path d="M132 92V66l-8-12M118 48l9-7 9 11z"></path>
        <path d="M22 78h14v14H22zM36 81h3.5a3 3 0 0 1 0 6H36"></path>`;
      break;
    case "kids":
      t = v`
        <rect x="22" y="72" width="30" height="30" rx="5"></rect>
        <rect x="56" y="72" width="30" height="30" rx="5"></rect>
        <rect x="39" y="40" width="30" height="30" rx="5"></rect>
        <circle cx="116" cy="88" r="14"></circle>
        <path d="M104 84c8 4 16 4 24 0"></path>
        <path d="M118 14l4.5 9.5 10.5 1.3-7.7 7.2 2 10.3-9.3-5.1-9.3 5.1 2-10.3-7.7-7.2 10.5-1.3z"></path>`;
      break;
    default:
      t = v`
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
const bi = ge`
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
      display: grid;
      gap: 2px;
      margin-top: 5px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
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
      gap: 12px;
    }

    .room {
      /*
       * One size for every info row (CURRENT_SPEC.md, Vizuální pravidla): row height, icon,
       * values, labels and units. --col is the blind panel width, --cover-gap the gap in
       * front of the presets and in front of the blind panel. --group-gap separates the air
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
      --preset-size: 34px;
      --cover-gap: 8px;
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
        linear-gradient(to right, transparent, #000 30%),
        linear-gradient(to top, transparent, #000 15%);
      -webkit-mask-composite: source-in;
      mask-image:
        linear-gradient(to right, transparent, #000 30%),
        linear-gradient(to top, transparent, #000 15%);
      mask-composite: intersect;
      pointer-events: none;
    }

    .scene svg {
      position: absolute;
      top: 12px;
      right: 14px;
      width: 150px;
      height: 112px;
      opacity: 0.62;
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

    /* Humidity is deliberately uncoloured. */
    .humidity {
      color: #c7c7cc;
      font-size: 18px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    /*
     * Lower part: info rows | blind presets | blind panel. The blind panel is as tall as the
     * info rows (5 × --row-h), so it starts at the CO₂ row.
     */
    .lower {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--preset-col) var(--col);
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
      grid-template-rows: var(--row-h) var(--row-h) var(--group-gap) repeat(3, var(--row-h));
      column-gap: var(--info-gap);
      min-width: 0;
      font-size: var(--row-font);
      font-variant-numeric: tabular-nums;
    }

    .slot-co2 {
      grid-column: 1 / -1;
      grid-row: 1;
    }

    .slot-pm25 {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    /* Row 3 is the gap between the air rows and the Topení / Klimatizace / window rows. */
    .slot-hvac1 {
      grid-column: 1;
      grid-row: 4;
    }

    .slot-hvac2 {
      grid-column: 1;
      grid-row: 5;
    }

    .slot-temperature-trend {
      grid-column: 2;
      grid-row: 4 / span 2;
    }

    .slot-window {
      grid-column: 1;
      grid-row: 6;
    }

    /* CO₂ / PM2.5: the same two columns inside the row, so the trend lines up with the others. */
    .air-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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

    .system-row.strong .row-label {
      font-weight: 500;
    }

    .row-unit {
      color: #9a9aa0;
      font-weight: 400;
    }

    /*
     * Micro trend: stretches over its cell; the dot is HTML so it stays round. The right
     * padding keeps the end of the trend (edge of the dot) 1.5 × the preset–panel gap away
     * from the preset buttons: (gap / 2) + dot radius.
     */
    .trend-button {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .spark {
      --preset-gap: calc(var(--cover-gap) + (var(--preset-col) - var(--preset-size)) / 2);
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px calc(var(--preset-gap) / 2 + 2.5px) 5px 3px;
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
     * One column of three round Shelly-style buttons (ring + glyph), spread over the panel height.
     * They are pressed by a long press or a double tap; the ring fills while the button is held.
     */
    .presets {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .preset {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--preset-size);
      height: var(--preset-size);
      flex: 0 0 var(--preset-size);
      border: 2.5px solid rgb(255 255 255 / 15%);
      border-radius: 50%;
      background: #2c2c2e;
      color: var(--tone);
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }

    .preset svg {
      display: block;
      width: 18px;
      height: 18px;
    }

    .preset .progress {
      position: absolute;
      top: -2.5px;
      left: -2.5px;
      width: calc(100% + 5px);
      height: calc(100% + 5px);
      transform: rotate(-90deg);
      fill: none;
      stroke: var(--tone);
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      opacity: 0;
    }

    .preset:active .progress {
      opacity: 1;
      animation: hold 550ms linear forwards;
    }

    .preset[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--tone) 60%, transparent);
      background: color-mix(in srgb, var(--tone) 22%, #2c2c2e);
    }

    .preset.sent {
      animation: sent 700ms ease-out;
    }

    @keyframes hold {
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes sent {
      0% {
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--tone) 70%, transparent);
      }
      100% {
        box-shadow: 0 0 0 10px transparent;
      }
    }

    .cover-panel {
      display: block;
      min-width: 0;
      height: 100%;
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
      background: rgb(0 0 0 / 60%);
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

    .chip {
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 22px;
      background: rgb(255 255 255 / 5%);
      color: #ffffff;
      font-size: 14px;
    }

    .chip[aria-pressed="true"] {
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

    /* „Historie místnosti – 24 h“ */
    .chart {
      display: block;
      width: 100%;
      height: auto;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 12px;
      margin-top: 6px;
      color: #9a9aa0;
      font-size: 11px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .legend-swatch {
      box-sizing: border-box;
      width: 12px;
      height: 8px;
      border-radius: 2px;
    }

    .legend-swatch.dashed {
      height: 0;
      border-top: 2px dashed;
      border-radius: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .sheet,
      .preset.sent {
        animation: none;
      }
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .room {
        --col: 52px;
        --preset-col: 34px;
        --cover-gap: 6px;
      }
    }
`;
var yi = Object.defineProperty, k = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && yi(t, e, s), s;
};
const wi = 5 * 6e4, _i = 8e3, _ = " ", xi = 550, ki = 400, Si = 700, Ai = ["off", "cool", "dry", "fan_only", "auto", "heat"], _t = class _t extends D {
  constructor() {
    super(...arguments), this._historyStatus = "loading", this._historyData = {}, this._historyRange = { startMs: 0, endMs: 0 }, this._historyRequest = 0, this._trends = {}, this._trendsLoading = !1, this._trendsStarted = !1, this._pressing = !1, this._pressFired = !1, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = [
        ...this.renderRoot.querySelectorAll(".sheet button:not([disabled])")
      ];
      if (e.length === 0)
        return;
      const i = this.renderRoot.activeElement, s = i ? e.indexOf(i) : -1, o = t.shiftKey ? e[s <= 0 ? e.length - 1 : s - 1] : e[s === -1 || s === e.length - 1 ? 0 : s + 1];
      t.preventDefault(), o.focus();
    };
  }
  setConfig(t) {
    this._config = De(t), this._trends = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this._trendTimer), window.clearTimeout(this._noticeTimer), window.clearTimeout(this._pressTimer), window.clearTimeout(this._flashTimer), this._trendTimer = void 0, this._noticeTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? this.hasRelevantEntityChanged(t.get("hass")) : !0;
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.loadTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.loadTrends();
    }, wi)), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of Ve(this._config)) {
      const i = t.states[e], s = this.hass.states[e];
      if (i?.state !== s?.state || !Ke(i?.attributes, s?.attributes))
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
    const t = this.entityState(this._config.house_mode_entity ?? ie)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", s = this.thresholds(), o = this.trendAxes(this._config);
    return m`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          ${this._notice ? m`<div class="notice" role="alert">${this._notice}</div>` : f}
          <div class="rooms">
            ${this._config.rooms.map(
      (r) => this.renderRoom(r, e, i, s, o)
    )}
          </div>
        </div>
        ${this.renderSheet()}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...se, ...this._config?.thresholds };
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (i) => t.rooms.map((s) => {
      const o = i(s);
      return o ? this._trends[o] : void 0;
    });
    return {
      temperature: ht(e((i) => i.temperature), ot.temperature),
      co2: ht(e((i) => i.carbon_dioxide), ot.co2),
      pm25: ht(e((i) => i.pm25), ot.pm25)
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), s = this.numberState(t.minimum), o = this.numberState(t.maximum), r = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = s !== void 0 && o !== void 0 ? `${e.format(s)}–${e.format(o)}${_}°C` : void 0, h = [
      i === void 0 ? void 0 : `${e.format(i)}${_}°C`,
      l,
      r === void 0 ? void 0 : `☂${_}${e.format(r)}${_}%`
    ].filter(($) => $ !== void 0), p = this.thresholds();
    let d = "––", u = c.label;
    return a !== void 0 && (a >= p.pm25_critical ? (d = "špatný", u = c.alert) : a >= p.pm25_warning ? (d = "zhoršený", u = c.warning) : d = "dobrý"), h.length === 0 && !t.pm25 ? f : m`<div class="outside">
      ${h.length > 0 ? m`<div>${h.join(" · ")}</div>` : f}
      ${t.pm25 ? m`<div>Vzduch venku: <span style=${`color: ${u}`}>${d}</span></div>` : f}
    </div>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, s, o) {
    const r = this.reading(t.temperature, "°C", 1), a = this.reading(t.humidity, "%", 0), l = this.reading(t.carbon_dioxide, "ppm", 0), h = this.reading(t.pm25, "µg/m³", 0), p = je(
      r.value,
      a.value,
      l.value,
      h.value,
      e,
      i,
      s
    ), d = e, u = gi(t);
    return m`
      <article
        class="room"
        aria-label=${t.name}
        style=${u ? `--scene-tone: ${vi[u]}` : f}
      >
        ${u ? m`<div class="scene" aria-hidden="true">${$i(u)}</div>` : f}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${p.kind === "unknown" ? `border: 1.5px solid ${c.off}` : `background: ${p.color}`}
          ></span>
          <span style=${`color: ${p.color}; font-weight: ${p.kind === "normal" ? 400 : 500}`}>
            ${p.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature"
            ?disabled=${!t.temperature}
            aria-label=${`${t.name}: teplota ${r.value === void 0 ? "neznámá" : `${Dt(r.value)} °C`}, historie místnosti za 24 hodin`}
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${r.value === void 0 ? m`<span class="missing">––</span>` : m`${Dt(r.value)}<span class="temperature-unit">${_}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity"
            ?disabled=${!t.humidity}
            aria-label=${`${t.name}: vlhkost ${a.value === void 0 ? "neznámá" : `${Math.round(a.value)} %`}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${a.value === void 0 ? m`<span class="missing">––</span>` : m`${Math.round(a.value)}${_}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirRow(
      t,
      "co2",
      t.carbon_dioxide,
      m`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      "CO₂",
      l,
      "ppm",
      s.co2_warning,
      s.co2_critical,
      o.co2
    )}
            ${this.renderAirRow(
      t,
      "pm25",
      t.pm25,
      pi(),
      "PM2.5",
      h,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical,
      o.pm25
    )}
            ${d ? this.renderClimate(t, !0) : this.renderHeating(t, !0)}
            ${d ? this.renderHeating(t, !1) : this.renderClimate(t, !1)}
            ${this.renderTemperatureTrend(t, r, o.temperature)}
            ${this.renderWindow(t)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : m`<div class="presets" aria-hidden="true"></div>
                <div class="cover-panel" aria-hidden="true"></div>`}
        </div>
      </article>
    `;
  }
  /**
   * CO₂ / PM2.5 row: icon and value in the left column, micro trend in the right column;
   * the whole row opens the entity detail with its history.
   */
  renderAirRow(t, e, i, s, o, r, a, l, h, p) {
    const d = r.value !== void 0, u = Math.round(r.value ?? 0), $ = r.value === void 0 ? c.label : r.value >= h ? c.alert : r.value >= l ? c.warning : c.white;
    return m`
      <button
        type="button"
        class="plain-button air-row slot-${e}"
        ?disabled=${!i}
        aria-label=${`${t.name}: ${o} ${d ? `${u} ${a}` : "neznámé"}, detail a historie`}
        @click=${() => this.showMoreInfo(i)}
      >
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d ? c.mint : c.off}`} aria-hidden="true">
            ${s}
          </span>
          <span class="row-text">
            ${d ? m`<span class="row-label" style=${`color: ${$}`}>${u}</span>
                  <span class="row-unit">${a}</span>` : m`<span class="row-label" style=${`color: ${c.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, p, c.mint) : f}
      </button>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, i) {
    if (!t.temperature || e.value === void 0)
      return f;
    const s = this.renderSpark(t.temperature, i, c.peach);
    return s === f ? f : m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: trend teploty za 2 hodiny, historie místnosti za 24 hodin`}
        @click=${(o) => this.openSheet("history", t, o)}
      >
        ${s}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample, drawn on the axis shared by the whole
   * house. It stretches over its cell; the dot is HTML so that it stays round.
   */
  renderSpark(t, e, i) {
    const s = t ? this._trends[t] : void 0;
    if (!s || !e)
      return f;
    const o = si(s, e).map(
      (p, d) => p === void 0 ? void 0 : { x: d / (Bt - 1) * 100, y: (1 - p) * 100 }
    ).filter((p) => p !== void 0);
    if (o.length < 2)
      return f;
    const r = o.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "), a = o[0], l = o[o.length - 1], h = `${r} ${l.x.toFixed(2)},100 ${a.x.toFixed(2)},100`;
    return m`<span class="spark" style=${`color: ${i}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${h} fill="currentColor" fill-opacity="0.08"></polygon>
          <polyline
            points=${r}
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
          style=${`left: ${l.x.toFixed(2)}%; top: ${l.y.toFixed(2)}%`}
        ></span>
      </span>
    </span>`;
  }
  // --------------------------------------------------------------- Topení
  renderHeating(t, e) {
    const i = t.heating, s = this.entityState(i?.climate)?.toLowerCase(), o = this.entityState(i?.overlay)?.toLowerCase(), r = o === void 0 || M(o), a = s === "off" || o === "off", l = this.numberState(i?.intensity), h = this.numberState(i?.target);
    let p = "––", d = c.label, u = !1, $ = "";
    a ? (p = "Vypnuto", d = c.off) : !r && (s === void 0 || M(s)) ? p = "––" : o === "schedule" ? (p = "Plán", d = c.plan, u = !0, h !== void 0 && ($ = `· ${at(h)}${_}°C`)) : o === "manual" ? (p = "Ručně", d = c.warning, u = !0, h !== void 0 && ($ = `· ${at(h)}${_}°C`)) : !r && o && (p = o, d = c.warning, u = !0);
    const w = a || r ? 0 : oe(l);
    return this.renderSystemRow(
      t,
      "Topení",
      this.renderHeatingWaves(w, r),
      p,
      d,
      e && u,
      $,
      e,
      i?.climate ? this.sheetAction("heating", t) : void 0
    );
  }
  renderHeatingWaves(t, e) {
    return m`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.8"
        stroke-linecap="round"
        aria-hidden="true"
      >
        ${[0, 1, 2].map(
      (i) => v`<path
            d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
            stroke=${i < t ? c.warning : c.off}
            stroke-dasharray=${e ? "1.6 2.6" : f}
          ></path>`
    )}
      </svg>
    `;
  }
  // ----------------------------------------------------------- Klimatizace
  renderClimate(t, e) {
    const i = this.getState(t.air_conditioner);
    let s = "unknown", o, r;
    if (i && !M(i.state.toLowerCase())) {
      const d = i.state.toLowerCase(), u = String(i.attributes.preset_mode ?? "none").toLowerCase();
      d === "off" ? s = "off" : d === "cool" ? s = u === "wind_free" ? "wind_free" : "cool" : d === "dry" ? s = "dry" : d === "fan_only" ? s = "fan" : d === "heat" ? s = "heat" : d === "auto" && (s = "auto"), s !== "off" && s !== "unknown" && s !== "wind_free" && u !== "none" && u !== "" && (r = Lt(u)), o = rt(i.attributes.temperature);
    }
    const a = Q[s], h = ["cool", "wind_free", "dry", "heat", "auto"].includes(s) && o !== void 0 ? `· ${at(o)}${_}°C` : "", p = s !== "off" && s !== "unknown";
    return this.renderSystemRow(
      t,
      "Klimatizace",
      this.renderClimateIcon(s, a, s === "unknown"),
      r ?? pt[s],
      a,
      e && p,
      h,
      e,
      t.air_conditioner ? this.sheetAction("climate", t) : void 0
    );
  }
  renderClimateIcon(t, e, i) {
    let s;
    const o = v`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, r = v`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
    switch (t) {
      case "cool":
      case "wind_free":
        s = v`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${o}</g>
          <g transform="rotate(120 12 12)">${o}</g>`;
        break;
      case "dry":
        s = v`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        s = v`${r}<g transform="rotate(120 12 12)">${r}</g>
          <g transform="rotate(240 12 12)">${r}</g>`;
        break;
      case "heat":
        s = v`<circle cx="12" cy="12" r="4"></circle>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (a) => v`<path d="M12 3v2.5" transform=${`rotate(${45 * a} 12 12)`}></path>`
        )}`;
        break;
      case "auto":
        s = v`<circle cx="12" cy="12" r="9"></circle>
          <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
        break;
      default:
        s = v`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
          <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
    }
    return m`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke=${e}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=${i ? "2 2.4" : f}
        aria-hidden="true"
      >
        ${s}
      </svg>
    `;
  }
  /** Row action: opens the control popup of Topení / Klimatizace. */
  sheetAction(t, e) {
    return {
      onClick: (i) => this.openSheet(t, e, i)
    };
  }
  /**
   * Topení / Klimatizace row in the left info column. The state label always stays whole;
   * when the row is too narrow the whole target ("· 21 °C") wraps onto a hidden second line
   * instead of being cut inside the number (CURRENT_SPEC.md, Room Card).
   */
  renderSystemRow(t, e, i, s, o, r, a, l, h) {
    const p = `${s === "––" ? "neznámý stav" : s}${a ? ` ${a.replace(/^·\s*/, "")}` : ""}`;
    return m`
      <button
        type="button"
        class="plain-button system-row slot-${l ? "hvac1" : "hvac2"} ${r ? "strong" : ""}"
        style=${`--row-color: ${o}`}
        ?disabled=${!h}
        aria-label=${`${t.name}: ${e}, ${p}${h ? ", ovládání" : ""}`}
        @click=${h?.onClick}
      >
        <span class="row-main">
          <span class="row-icon">${i}</span>
          <span class="row-text">
            <span class="row-label">${s}</span>
            ${a ? m`<span class="row-unit">${a}</span>` : f}
          </span>
        </span>
      </button>
    `;
  }
  // ---------------------------------------------------------------- window
  renderWindow(t) {
    const e = t.window, i = this.entityState(e)?.toLowerCase(), s = i === void 0 || M(i), o = i === "on", r = s ? c.label : o ? c.sky : c.label, a = s ? "––" : o ? "Otevřeno" : "Zavřeno";
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${o ? "strong" : ""}"
        style=${`--row-color: ${r}`}
        ?disabled=${!e}
        aria-label=${`${t.name}: okno ${s ? "neznámé" : a.toLowerCase()}, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="row-main">
          <span class="row-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke=${s ? c.off : r}
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray=${s ? "2 2.4" : f}
              aria-hidden="true"
            >
              <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
              <path d="M12 3.5v17M5 12h14"></path>
            </svg>
          </span>
          <span class="row-text"><span class="row-label">${a}</span></span>
        </span>
      </button>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), s = i !== void 0 && !M(i.state.toLowerCase()), o = s ? rt(i.attributes.current_position) : void 0, r = s ? rt(i.attributes.current_tilt_position) : void 0, l = o !== void 0 && r !== void 0 ? `poloha ${Math.round(o)} %, naklopení ${Math.round(r)} %` : "poloha nebo naklopení neznámé";
    return m`
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${Ue.map((h) => this.renderPreset(t, h, o, r))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel"
        aria-label=${`${t.name}: žaluzie, ${l}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${G} ${ut}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${Xe(o, r)}
        </svg>
      </button>
    `;
  }
  renderPreset(t, e, i, s) {
    const o = i !== void 0 && s !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(s - e.tilt) <= 2, r = `${t.name}|${e.id}`;
    return m`
      <button
        type="button"
        class="plain-button preset ${this._flash === r ? "sent" : ""}"
        style=${`--tone: ${e.tone}`}
        title=${e.label}
        aria-pressed=${o ? "true" : "false"}
        aria-label=${`${t.name}: žaluzie ${e.label}, ${e.description}. Spustí se dvojitým klepnutím nebo dlouhým stiskem.`}
        @pointerdown=${(a) => this.pressStart(a, t, e)}
        @pointerup=${() => this.pressEnd(t, e)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(a) => a.preventDefault()}
        @click=${(a) => {
      a.detail === 0 && this.applyPreset(t, e);
    }}
      >
        <svg class="progress" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="16.75" pathLength="100"></circle>
        </svg>
        ${ui(e.id)}
      </button>
    `;
  }
  pressStart(t, e, i) {
    t.button === 0 && (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, this.applyPreset(e, i);
    }, xi));
  }
  pressEnd(t, e) {
    window.clearTimeout(this._pressTimer);
    const i = this._pressing, s = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !i || s)
      return;
    const o = `${t.name}|${e.id}`, r = performance.now();
    this._lastTap && this._lastTap.key === o && r - this._lastTap.time <= ki ? (this._lastTap = void 0, this.applyPreset(t, e)) : this._lastTap = { key: o, time: r };
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(Ht.domain, Ht.service, {
          entity: t.cover,
          pos: e.position,
          tilt: e.tilt
        }), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
          this._flash = void 0;
        }, Si);
      } catch (i) {
        console.error("Klima Dashboard: skript žaluzií selhal", i), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
      }
  }
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, _i);
  }
  // ----------------------------------------------------------------- sheet
  /** Popup with the controls of Topení (Vypnuto / Plán / Ručně / Boost) or Klimatizace (režimy). */
  renderSheet() {
    const t = this._sheet;
    if (!t)
      return f;
    if (t.kind === "history")
      return this.renderHistorySheet(t.room);
    const e = t.kind === "heating", i = e ? t.room.heating?.climate : t.room.air_conditioner, s = this.getState(i), o = s !== void 0 && !M(s.state.toLowerCase()), r = It(s?.attributes.hvac_modes), a = It(s?.attributes.preset_modes), l = s?.state.toLowerCase(), h = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = !o || !i ? [] : e ? this.heatingOptions(i, r, a, l, h) : this.climateOptions(i, r, l), d = !e && o && i ? a.filter((u) => u !== "none") : [];
    return m`
      <div class="backdrop" @click=${() => this.closeSheet()} @keydown=${this.handleSheetKeydown}>
        <div
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(u) => u.stopPropagation()}
        >
          <div class="sheet-head">
            <div>
              <h2 id="sheet-title">${e ? "Topení" : "Klimatizace"}</h2>
              <div class="sheet-sub">${t.room.name}</div>
            </div>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeSheet()}
            >
              ✕
            </button>
          </div>
          ${o ? p.length === 0 ? m`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : m`<div class="options" role="group" aria-label="Režim">
                  ${p.map((u) => this.renderOption(u))}
                </div>` : m`<p class="sheet-message">Entita je nedostupná.</p>`}
          ${d.length > 0 ? m`<div class="sheet-label" id="preset-label">Předvolby</div>
                <div class="chips" role="group" aria-labelledby="preset-label">
                  ${d.map(
      (u) => this.renderPresetChip(i, u, h, l, a)
    )}
                </div>` : f}
          ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
          <button
            type="button"
            class="plain-button sheet-link"
            ?disabled=${!i}
            @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(i);
    }}
          >
            Detail a historie
          </button>
        </div>
      </div>
    `;
  }
  /** „Historie místnosti – 24 h“ in the same popup frame as the Topení / Klimatizace controls. */
  renderHistorySheet(t) {
    let e;
    this._historyStatus === "loading" ? e = m`<p class="sheet-message">Načítám historii…</p>` : this._historyStatus === "error" ? e = m`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>` : ci(this._historyData, [t.temperature, t.humidity]) ? e = di(this._historyData, t, this._historyRange) : e = m`<p class="sheet-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    const i = t.temperature ?? t.humidity;
    return m`
      <div class="backdrop" @click=${() => this.closeSheet()} @keydown=${this.handleSheetKeydown}>
        <div
          class="sheet history-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(s) => s.stopPropagation()}
        >
          <div class="sheet-head">
            <div>
              <h2 id="sheet-title">Historie místnosti – 24 h</h2>
              <div class="sheet-sub">${t.name}</div>
            </div>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeSheet()}
            >
              ✕
            </button>
          </div>
          ${e}
          <button
            type="button"
            class="plain-button sheet-link"
            ?disabled=${!i}
            @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(i);
    }}
          >
            Detail teploty
          </button>
        </div>
      </div>
    `;
  }
  async loadRoomHistory(t) {
    const e = ++this._historyRequest;
    if (this._historyStatus = "loading", this._historyData = {}, !this.hass) {
      this._historyStatus = "error";
      return;
    }
    const i = [
      t.temperature,
      t.humidity,
      t.heating?.overlay,
      t.heating?.climate,
      t.heating?.intensity,
      t.air_conditioner
    ].filter((r) => !!r), s = Date.now(), o = s - 24 * re;
    try {
      const r = await jt(this.hass, i, o, s);
      if (e !== this._historyRequest)
        return;
      this._historyData = r, this._historyRange = { startMs: o, endMs: s }, this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", r), e === this._historyRequest && (this._historyStatus = "error");
    }
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
  renderPresetChip(t, e, i, s, o) {
    const r = i === e && s !== "off", a = r && o.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${Lt(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, s, o) {
    const r = [], a = (l, h, p, d, u, $) => {
      r.push({ id: l, label: h, icon: mi(l), color: p, active: d, run: u, unsupported: $ });
    };
    if (e.includes("off") && a("off", "Vypnuto", c.off, s === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", c.plan, s === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      c.warning,
      s === "heat" && o !== "boost",
      () => this.setHvacMode(t, "heat")
    ), r.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        c.alert,
        l && o === "boost" && s !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return r;
  }
  climateOptions(t, e, i) {
    return Ai.filter((s) => e.includes(s)).map((s) => {
      const o = ne(s), r = Q[o];
      return {
        id: s,
        label: pt[o],
        icon: this.renderClimateIcon(o, r, !1),
        color: r,
        active: i === s,
        run: () => this.setHvacMode(t, s)
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
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._sheet = { kind: t, room: e }, t === "history" && this.loadRoomHistory(e);
  }
  closeSheet(t = !0) {
    this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, t && this._opener?.focus(), this._opener = void 0;
  }
  // ---------------------------------------------------------------- trends
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = We(this._config);
    if (t.length === 0)
      return;
    this._trendsLoading = !0;
    const e = Date.now(), i = e - Qe;
    try {
      const s = await jt(this.hass, t, i, e), o = {};
      for (const r of t)
        o[r] = ii(s[r], i, e, Bt);
      this._trends = o;
    } catch (s) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", s);
    } finally {
      this._trendsLoading = !1;
    }
  }
  // ----------------------------------------------------------------- state
  reading(t, e, i) {
    const s = this.getState(t), o = this.numberState(t);
    if (o === void 0)
      return {};
    const r = String(s?.attributes.unit_of_measurement ?? e);
    return {
      value: o,
      text: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: i }).format(o)} ${r}`
    };
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || M(e.toLowerCase()))
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
_t.styles = bi;
let b = _t;
k([
  A()
], b.prototype, "_config");
k([
  te({ attribute: !1 })
], b.prototype, "hass");
k([
  A()
], b.prototype, "_sheet");
k([
  A()
], b.prototype, "_sheetError");
k([
  A()
], b.prototype, "_historyStatus");
k([
  A()
], b.prototype, "_historyData");
k([
  A()
], b.prototype, "_flash");
k([
  A()
], b.prototype, "_trends");
k([
  A()
], b.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", b);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
