const U = globalThis, J = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = /* @__PURE__ */ Symbol(), rt = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (r) => new kt(typeof r == "string" ? r : r + "", void 0, X), Rt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new kt(e, r, X);
}, Ht = (r, t) => {
  if (J) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = U.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, nt = J ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Nt(e);
})(r) : r;
const { is: Dt, defineProperty: Lt, getOwnPropertyDescriptor: It, getOwnPropertyNames: Ut, getOwnPropertySymbols: jt, getPrototypeOf: Bt } = Object, W = globalThis, ot = W.trustedTypes, Wt = ot ? ot.emptyScript : "", Vt = W.reactiveElementPolyfillSupport, O = (r, t) => r, j = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Wt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Q = (r, t) => !Dt(r, t), at = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Lt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      n?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...Ut(e), ...jt(e)];
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
      for (const s of i) e.unshift(nt(s));
    } else t !== void 0 && e.push(nt(t));
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
    return Ht(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : j;
      this._$Em = s;
      const a = o.fromAttribute(e, n.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Q)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: o } = n, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, n, a);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[O("elementProperties")] = /* @__PURE__ */ new Map(), M[O("finalized")] = /* @__PURE__ */ new Map(), Vt?.({ ReactiveElement: M }), (W.reactiveElementVersions ??= []).push("2.1.2");
const tt = globalThis, lt = (r) => r, B = tt.trustedTypes, ht = B ? B.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, At = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + y, Kt = `<${St}>`, S = document, R = () => S.createComment(""), H = (r) => r === null || typeof r != "object" && typeof r != "function", et = Array.isArray, qt = (r) => et(r) || typeof r?.[Symbol.iterator] == "function", K = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, x = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ut = /"/g, Et = /^(?:script|style|textarea|title)$/i, Mt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = Mt(1), g = Mt(2), C = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function Ct(r, t) {
  if (!et(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Zt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = z;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let c, p, h = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, p = o.exec(l), p !== null); ) m = o.lastIndex, o === z ? p[1] === "!--" ? o = ct : p[1] !== void 0 ? o = dt : p[2] !== void 0 ? (Et.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = x) : p[3] !== void 0 && (o = x) : o === x ? p[0] === ">" ? (o = s ?? z, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? x : p[3] === '"' ? ut : pt) : o === ut || o === pt ? o = x : o === ct || o === dt ? o = z : (o = x, s = void 0);
    const $ = o === x && r[a + 1].startsWith("/>") ? " " : "";
    n += o === z ? l + Kt : h >= 0 ? (i.push(c), l.slice(0, h) + At + l.slice(h) + y + $) : l + y + (h === -2 ? a : $);
  }
  return [Ct(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class D {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, p] = Zt(t, e);
    if (this.el = D.createElement(c, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = A.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(At)) {
          const m = p[o++], $ = s.getAttribute(h).split(y), b = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: b[2], strings: $, ctor: b[1] === "." ? Yt : b[1] === "?" ? Jt : b[1] === "@" ? Xt : V }), s.removeAttribute(h);
        } else h.startsWith(y) && (l.push({ type: 6, index: n }), s.removeAttribute(h));
        if (Et.test(s.tagName)) {
          const h = s.textContent.split(y), m = h.length - 1;
          if (m > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let $ = 0; $ < m; $++) s.append(h[$], R()), A.nextNode(), l.push({ type: 2, index: ++n });
            s.append(h[m], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === St) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(y, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function T(r, t, e = r, i) {
  if (t === C) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = H(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = T(r, s._$AS(r, t.values), s, i)), t;
}
class Gt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? S).importNode(e, !0);
    A.currentNode = s;
    let n = A.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new L(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new Qt(n, this, t)), this._$AV.push(c), l = i[++a];
      }
      o !== l?.index && (n = A.nextNode(), o++);
    }
    return A.currentNode = S, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = T(this, t, e), H(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = D.createElement(Ct(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new Gt(s, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new L(this.O(R()), this.O(R()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = lt(t).nextSibling;
      lt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = T(this, a[i + l], e, l), c === C && (c = this._$AH[l]), o ||= !H(c) || c !== this._$AH[l], c === u ? t = u : t !== u && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Jt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Xt extends V {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? u) === C) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const te = tt.litHtmlPolyfillSupport;
te?.(D, L), (tt.litHtmlVersions ??= []).push("3.3.3");
const ee = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new L(t.insertBefore(R(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const it = globalThis;
class F extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
}
F._$litElement$ = !0, F.finalized = !0, it.litElementHydrateSupport?.({ LitElement: F });
const ie = it.litElementPolyfillSupport;
ie?.({ LitElement: F });
(it.litElementVersions ??= []).push("4.2.2");
const se = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: Q }, re = (r = se, t, e) => {
  const { kind: i, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, r, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, r, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, r, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Tt(r) {
  return (t, e) => typeof e == "object" ? re(r, t, e) : ((i, s, n) => {
    const o = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(r, t, e);
}
function P(r) {
  return Tt({ ...r, state: !0, attribute: !1 });
}
const mt = ["bedroom", "office", "kids", "living"], Pt = "input_select.house_mode", zt = {
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
function ne(r) {
  if (!r || !Array.isArray(r.rooms) || r.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (r.house_mode_entity !== void 0 && (typeof r.house_mode_entity != "string" || !r.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of r.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [s, n] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (s in i)
        throw new Error(`Room "${e.name}": key "${s}" was renamed to "${n}".`);
    if (e.scene !== void 0 && !mt.includes(e.scene))
      throw new Error(
        `Room "${e.name}": scene must be one of ${mt.join(", ")}.`
      );
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(r.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...zt, ...r.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  return { ...r, thresholds: t };
}
const gt = { domain: "script", service: "zaluzie_posun" }, oe = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0, tone: "#A5A1F2" },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100, tone: "#7FC8F8" },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100, tone: "#FFD84A" }
], q = { temperature: 0.5, co2: 50, pm25: 3 }, d = {
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** Air-quality icons and their micro trends. */
  mint: "#5BD6B5",
  /** Temperature micro trend. */
  peach: "#FFB36B",
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
}, $t = {
  off: d.off,
  cool: d.cool,
  wind_free: d.cool,
  dry: d.dry,
  fan: d.plan,
  heat: d.heat,
  auto: d.auto,
  unknown: d.off
}, bt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, ae = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function vt(r) {
  const t = ae[r];
  if (t)
    return t;
  const e = r.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function le(r) {
  switch (r?.toLowerCase()) {
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
function he(r, t, e, i, s, n, o) {
  if (r === void 0 || t === void 0 || e === void 0 || i === void 0 || !n)
    return { label: "Bez dat", color: d.label, kind: "unknown" };
  if (i >= o.pm25_critical)
    return { label: "Znečištěný vzduch", color: d.alert, kind: "critical" };
  if (e >= o.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: d.alert, kind: "critical" };
  if (e >= o.co2_warning)
    return { label: "Vydýchaný vzduch", color: d.warning, kind: "warning" };
  if (t > o.humidity_max)
    return { label: "Vlhko", color: d.warning, kind: "warning" };
  if (t < o.humidity_min)
    return { label: "Sucho", color: d.warning, kind: "warning" };
  const a = s ? o.summer_min : o.winter_min, l = s ? o.summer_max : o.winter_max;
  return r > l ? { label: "Teplo", color: d.warning, kind: "warning" } : r < a ? { label: "Chladno", color: d.cold, kind: "warning" } : { label: "Příjemné", color: d.label, kind: "normal" };
}
function _t(r) {
  return Array.isArray(r) ? r.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function k(r) {
  return r === "" || r === "unknown" || r === "unavailable" || r === "none";
}
function Z(r) {
  if (r == null || r === "")
    return;
  const t = typeof r == "number" ? r : Number.parseFloat(String(r));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function ce(r) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(r);
}
function G(r) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(r * 2) / 2
  );
}
function de(r) {
  return r === void 0 || r <= 0 ? 0 : r <= 34 ? 1 : r <= 67 ? 2 : 3;
}
function pe(r) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(r.house_mode_entity ?? Pt), e(r.outside?.temperature), e(r.outside?.minimum), e(r.outside?.maximum), e(r.outside?.rain_probability), e(r.outside?.pm25);
  for (const i of r.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function ue(r) {
  const t = /* @__PURE__ */ new Set();
  for (const e of r.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function fe(r, t) {
  if (r === t)
    return !0;
  if (!r || !t)
    return !1;
  const e = Object.keys(r), i = Object.keys(t);
  return e.length === i.length && e.every((s) => Object.hasOwn(t, s) && r[s] === t[s]);
}
const N = 60, Y = 122, yt = 18, I = 3, me = 0.8, ge = 1, $e = 0.28;
function be(r, t) {
  if (r === void 0 || t === void 0)
    return g`<rect
      x="0.75"
      y="0.75"
      width=${N - 1.5}
      height=${Y - 1.5}
      rx="6"
      fill="none"
      stroke=${d.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = Y - I - 1, i = e / yt, s = i - me, n = s - t / 100 * (s - ge), o = I + 1 + (100 - r) / 100 * e, a = Array.from({ length: yt }, (l, c) => {
    const p = I + 1 + c * i + (i - n) / 2, h = p + n / 2 <= o;
    return g`<rect
      x="0"
      y=${p.toFixed(2)}
      width=${N}
      height=${n.toFixed(2)}
      rx=${Math.min(1.5, n / 2).toFixed(2)}
      fill=${h ? d.blind : d.sky}
      opacity=${h ? 1 : $e}
    ></rect>`;
  });
  return g`<rect
      x="0"
      y="0"
      width=${N}
      height=${I}
      rx="1.5"
      fill=${d.blind}
    ></rect>${a}`;
}
function ve() {
  return f`
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
  ].map(([t, e, i]) => g`<circle cx=${t} cy=${e} r=${i}></circle>`)}
    </svg>
  `;
}
function _e(r) {
  let t;
  switch (r) {
    case "dark":
      t = g`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 10.5h12M6 14h12M6 17.5h12M6 21h12" stroke-width="2.6"></path>`;
      break;
    case "shade":
      t = g`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M6 11h12M6 15.5h12M6 20h12" stroke-width="1.8"></path>`;
      break;
    default:
      t = g`<path d="M5 5.5h14" stroke-width="2.4"></path>
        <path d="M12 5.5v8.5" stroke-width="1.8"></path>`;
  }
  return f`
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
function ye(r) {
  let t;
  switch (r) {
    case "off":
      t = g`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = g`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = g`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      t = g`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
  }
  return f`
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
const we = {
  bedroom: "#A5A1F2",
  office: "#7FC8F8",
  kids: "#FFB36B",
  living: "#E8D9B5"
};
function xe(r) {
  let t;
  switch (r) {
    case "bedroom":
      t = g`
        <path d="M121 10a15 15 0 1 0 13 23 12 12 0 0 1-13-23z"></path>
        <path d="M92 14v9M87.5 18.5h9M140 50v7M136.5 53.5h7"></path>
        <path d="M18 56v46M18 86h116v16M18 102h116"></path>
        <path d="M26 74h28a6 6 0 0 1 0 12H26z"></path>
        <path d="M60 86v-8a6 6 0 0 1 6-6h58a10 10 0 0 1 10 10v4"></path>`;
      break;
    case "office":
      t = g`
        <rect x="42" y="22" width="66" height="42" rx="5"></rect>
        <path d="M75 64v14M60 78h30"></path>
        <path d="M16 92h118M24 92v16M126 92v16"></path>
        <path d="M132 92V66l-8-12M118 48l9-7 9 11z"></path>
        <path d="M22 78h14v14H22zM36 81h3.5a3 3 0 0 1 0 6H36"></path>`;
      break;
    case "kids":
      t = g`
        <rect x="22" y="72" width="30" height="30" rx="5"></rect>
        <rect x="56" y="72" width="30" height="30" rx="5"></rect>
        <rect x="39" y="40" width="30" height="30" rx="5"></rect>
        <circle cx="116" cy="88" r="14"></circle>
        <path d="M104 84c8 4 16 4 24 0"></path>
        <path d="M118 14l4.5 9.5 10.5 1.3-7.7 7.2 2 10.3-9.3-5.1-9.3 5.1 2-10.3-7.7-7.2 10.5-1.3z"></path>`;
      break;
    default:
      t = g`
        <rect x="46" y="14" width="40" height="28" rx="3"></rect>
        <path d="M52 36l9-9 7 7 6-5 7 7"></path>
        <path d="M18 76h12v26H18zM110 76h12v26h-12zM30 86h80v16H30z"></path>
        <path d="M24 76v-8a8 8 0 0 1 8-8h76a8 8 0 0 1 8 8v8"></path>
        <path d="M24 102v6M116 102v6"></path>
        <path d="M136 108V40M127 40h18l-4-14h-10z"></path>`;
  }
  return f`<svg
    viewBox="0 0 150 112"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${t}</svg>`;
}
const ke = 120 * 6e4, wt = 12;
function Ae(r) {
  if (r == null)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r < 1e11 ? r * 1e3 : r : void 0;
  const t = Date.parse(r);
  return Number.isNaN(t) ? void 0 : t;
}
function Se(r, t) {
  const e = {};
  for (const [i, s] of Object.entries(r ?? {})) {
    if (!Array.isArray(s))
      continue;
    const n = [];
    s.forEach((o, a) => {
      const l = o.s ?? o.state, c = Ae(o.lu ?? o.last_updated ?? o.lc ?? o.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && c !== void 0 && n.push({ time: Math.max(c, t), state: l });
    }), n.sort((o, a) => o.time - a.time), e[i] = n;
  }
  return e;
}
async function Ee(r, t, e, i) {
  if (t.length === 0)
    return {};
  const s = await r.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return Se(s, e);
}
function Me(r, t) {
  let e;
  for (const i of r ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function xt(r) {
  if (r === void 0)
    return;
  const t = Number.parseFloat(r);
  return Number.isFinite(t) ? t : void 0;
}
function Ce(r, t, e, i) {
  const s = (e - t) / i, n = (r ?? []).filter((o) => xt(o.state) !== void 0);
  return Array.from(
    { length: i },
    (o, a) => xt(Me(n, t + (a + 1) * s))
  );
}
function Te(r, t) {
  const e = r.filter((a) => a !== void 0);
  if (e.length < 2)
    return r.map(() => {
    });
  const i = Math.min(...e), s = Math.max(...e), n = s - i;
  if (n >= t)
    return r.map((a) => a === void 0 ? void 0 : (a - i) / n);
  const o = (s + i) / 2;
  return r.map(
    (a) => a === void 0 ? void 0 : 0.5 + (a - o) / t
  );
}
const Pe = Rt`
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
      /* Micro trends start at the same x in every row and are as wide as the blind panel. */
      --trend-x: 120px;
      --col: 60px;
      --preset-col: 36px;
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

    /* Decorative illustration in the free top-right corner, faded out towards the content. */
    .scene {
      position: absolute;
      top: 0;
      right: 0;
      width: 64%;
      height: 150px;
      color: var(--scene-tone);
      background: radial-gradient(
        ellipse 85% 100% at 100% 0%,
        color-mix(in srgb, currentColor 16%, transparent),
        transparent 70%
      );
      pointer-events: none;
    }

    .scene svg {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 135px;
      height: 101px;
      opacity: 0.6;
      -webkit-mask-image: radial-gradient(ellipse 125% 130% at 100% 0%, #000 38%, transparent 92%);
      mask-image: radial-gradient(ellipse 125% 130% at 100% 0%, #000 38%, transparent 92%);
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

    /* Temperature value and its micro trend, one button that opens the entity detail. */
    .temp-block {
      display: grid;
      grid-template-columns: var(--trend-x) var(--col);
      align-items: center;
    }

    .temp-block .spark {
      align-self: center;
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
     * info rows (--info-height), so it starts at the CO₂ row. Micro trends sit inside the rows,
     * right after the values, at --trend-x.
     */
    .lower {
      --air-height: 22px;
      --primary-height: 28px;
      --secondary-height: 24px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--preset-col) var(--col);
      align-items: stretch;
      column-gap: 8px;
    }

    .info {
      min-width: 0;
    }

    .spark {
      display: block;
      width: var(--col);
    }

    .air-row {
      display: grid;
      grid-template-columns: var(--trend-x) var(--col);
      align-items: center;
      width: 100%;
      height: var(--air-height);
      font-size: 14px;
      line-height: 22px;
      font-variant-numeric: tabular-nums;
    }

    .air-main {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    /* Same 24 px icon column as the Topení, Klimatizace and window rows. */
    .air-icon {
      display: flex;
      width: 24px;
      height: 22px;
      flex: 0 0 24px;
      align-items: center;
      justify-content: center;
    }

    .air-icon ha-icon {
      --mdc-icon-size: 24px;
    }

    .air-icon svg {
      display: block;
      width: 20px;
      height: 20px;
    }

    .air-value-unit {
      color: #9a9aa0;
      font-size: 11px;
    }

    .system-row {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      gap: 8px;
      min-width: 0;
      height: 24px;
      color: var(--row-color);
      font-size: 14px;
      line-height: 20px;
    }

    .system-row.primary {
      height: var(--primary-height);
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
      height: 24px;
      margin-top: 2px;
      font-size: 14px;
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
      width: 34px;
      height: 34px;
      flex: 0 0 34px;
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
      }

      .lower {
        column-gap: 6px;
      }
    }
`;
var ze = Object.defineProperty, E = (r, t, e, i) => {
  for (var s = void 0, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (s = o(t, e, s) || s);
  return s && ze(t, e, s), s;
};
const Oe = 5 * 6e4, Fe = 8e3, _ = " ", Ne = 550, Re = 400, He = 700, De = ["off", "cool", "dry", "fan_only", "auto", "heat"], st = class st extends F {
  constructor() {
    super(...arguments), this._trends = {}, this._trendsLoading = !1, this._trendsStarted = !1, this._pressing = !1, this._pressFired = !1, this.handleSheetKeydown = (t) => {
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
      const i = this.renderRoot.activeElement, s = i ? e.indexOf(i) : -1, n = t.shiftKey ? e[s <= 0 ? e.length - 1 : s - 1] : e[s === -1 || s === e.length - 1 ? 0 : s + 1];
      t.preventDefault(), n.focus();
    };
  }
  setConfig(t) {
    this._config = ne(t), this._trends = {}, this._trendsStarted = !1;
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
    }, Oe)), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of pe(this._config)) {
      const i = t.states[e], s = this.hass.states[e];
      if (i?.state !== s?.state || !fe(i?.attributes, s?.attributes))
        return !0;
    }
    return !1;
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }
  render() {
    if (!this._config)
      return u;
    const t = this.entityState(this._config.house_mode_entity ?? Pt)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", s = this.thresholds();
    return f`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          ${this._notice ? f`<div class="notice" role="alert">${this._notice}</div>` : u}
          <div class="rooms">
            ${this._config.rooms.map(
      (n) => this.renderRoom(n, e, i, s)
    )}
          </div>
        </div>
        ${this.renderSheet()}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...zt, ...this._config?.thresholds };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return u;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), s = this.numberState(t.minimum), n = this.numberState(t.maximum), o = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = s !== void 0 && n !== void 0 ? `${e.format(s)}–${e.format(n)}${_}°C` : void 0, c = [
      i === void 0 ? void 0 : `${e.format(i)}${_}°C`,
      l,
      o === void 0 ? void 0 : `☂${_}${e.format(o)}${_}%`
    ].filter(($) => $ !== void 0), p = this.thresholds();
    let h = "––", m = d.label;
    return a !== void 0 && (a >= p.pm25_critical ? (h = "špatný", m = d.alert) : a >= p.pm25_warning ? (h = "zhoršený", m = d.warning) : h = "dobrý"), c.length === 0 && !t.pm25 ? u : f`<div class="outside">
      ${c.length > 0 ? f`<div>${c.join(" · ")}</div>` : u}
      ${t.pm25 ? f`<div>Vzduch venku: <span style=${`color: ${m}`}>${h}</span></div>` : u}
    </div>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, s) {
    const n = this.reading(t.temperature, "°C", 1), o = this.reading(t.humidity, "%", 0), a = this.reading(t.carbon_dioxide, "ppm", 0), l = this.reading(t.pm25, "µg/m³", 0), c = he(
      n.value,
      o.value,
      a.value,
      l.value,
      e,
      i,
      s
    ), p = e;
    return f`
      <article
        class="room"
        aria-label=${t.name}
        style=${t.scene ? `--scene-tone: ${we[t.scene]}` : u}
      >
        ${t.scene ? f`<div class="scene" aria-hidden="true">${xe(t.scene)}</div>` : u}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${c.kind === "unknown" ? `border: 1.5px solid ${d.off}` : `background: ${c.color}`}
          ></span>
          <span style=${`color: ${c.color}; font-weight: ${c.kind === "normal" ? 400 : 500}`}>
            ${c.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temp-block"
            ?disabled=${!t.temperature}
            aria-label=${`${t.name}: teplota, detail a historie`}
            @click=${() => this.showMoreInfo(t.temperature)}
          >
            <span class="temperature">
              ${n.value === void 0 ? f`<span class="missing">––</span>` : f`${ce(n.value)}<span class="temperature-unit">${_}°C</span>`}
            </span>
            ${this.renderSpark(t.temperature, q.temperature, "Trend teploty", 32, d.peach)}
          </button>
          <button
            type="button"
            class="plain-button humidity"
            ?disabled=${!t.humidity}
            aria-label=${`${t.name}: vlhkost, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${o.value === void 0 ? f`<span class="missing">––</span>` : f`${Math.round(o.value)}${_}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirRow(
      t,
      t.carbon_dioxide,
      f`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      "CO₂",
      a,
      "ppm",
      s.co2_warning,
      s.co2_critical,
      q.co2
    )}
            ${this.renderAirRow(
      t,
      t.pm25,
      ve(),
      "PM2.5",
      l,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical,
      q.pm25
    )}
            ${p ? this.renderClimate(t, !0) : this.renderHeating(t, !0)}
            ${p ? this.renderHeating(t, !1) : this.renderClimate(t, !1)}
            ${this.renderWindow(t)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : f`<div class="presets" aria-hidden="true"></div>
                <div class="cover-panel" aria-hidden="true"></div>`}
        </div>
      </article>
    `;
  }
  /** CO₂ / PM2.5 row: icon, value and micro trend; opens the entity detail with its history. */
  renderAirRow(t, e, i, s, n, o, a, l, c) {
    const p = n.value !== void 0, h = n.value === void 0 ? d.label : n.value >= l ? d.alert : n.value >= a ? d.warning : d.white;
    return f`
      <button
        type="button"
        class="plain-button air-row"
        ?disabled=${!e}
        aria-label=${`${t.name}: ${s}, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="air-main">
          <span class="air-icon" style=${`color: ${p ? d.mint : d.off}`} aria-hidden="true">
            ${i}
          </span>
          ${p ? f`<span style=${`color: ${h}`}>${Math.round(n.value ?? 0)}</span>
                <span class="air-value-unit">${o}</span>` : f`<span style=${`color: ${d.label}`}>––</span>`}
        </span>
        ${p ? this.renderSpark(e, c, `Trend ${s}`, 18, d.mint) : u}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample. It is as wide as the blind panel.
   */
  renderSpark(t, e, i, s, n) {
    const o = t ? this._trends[t] : void 0;
    if (!o)
      return u;
    const a = N, l = Te(o, e), c = 3, p = 4, h = l.map(
      (w, Ft) => w === void 0 ? void 0 : {
        x: c + Ft / (wt - 1) * (a - 2 * c),
        y: p + (1 - w) * (s - 2 * p)
      }
    ).filter((w) => w !== void 0);
    if (h.length < 2)
      return u;
    const m = h.map((w) => `${w.x.toFixed(1)},${w.y.toFixed(1)}`).join(" "), $ = h[0], b = h[h.length - 1], Ot = `${m} ${b.x.toFixed(1)},${s} ${$.x.toFixed(1)},${s}`;
    return f`<svg
      class="spark"
      viewBox="0 0 ${a} ${s}"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-label=${i}
    >
      <polygon points=${Ot} fill=${n} fill-opacity="0.08"></polygon>
      <polyline
        points=${m}
        fill="none"
        stroke=${n}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      ></polyline>
      <circle cx=${b.x.toFixed(1)} cy=${b.y.toFixed(1)} r="2.2" fill=${n}></circle>
    </svg>`;
  }
  // --------------------------------------------------------------- Topení
  renderHeating(t, e) {
    const i = t.heating, s = this.entityState(i?.climate)?.toLowerCase(), n = this.entityState(i?.overlay)?.toLowerCase(), o = n === void 0 || k(n), a = s === "off" || n === "off", l = this.numberState(i?.intensity), c = this.numberState(i?.target);
    let p = "––", h = d.label, m = !1, $ = "";
    a ? (p = "Vypnuto", h = d.off) : !o && (s === void 0 || k(s)) ? p = "––" : n === "schedule" ? (p = "Plán", h = d.plan, m = !0, c !== void 0 && ($ = `· ${G(c)}${_}°C`)) : n === "manual" ? (p = "Ručně", h = d.warning, m = !0, c !== void 0 && ($ = `· ${G(c)}${_}°C`)) : !o && n && (p = n, h = d.warning, m = !0);
    const b = a || o ? 0 : de(l);
    return this.renderSystemRow(
      this.renderHeatingWaves(b, o),
      p,
      h,
      e && m,
      $,
      e,
      i?.climate ? this.sheetAction("heating", t, "Topení") : void 0
    );
  }
  renderHeatingWaves(t, e) {
    return f`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.8"
        stroke-linecap="round"
        aria-hidden="true"
      >
        ${[0, 1, 2].map(
      (i) => g`<path
            d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
            stroke=${i < t ? d.warning : d.off}
            stroke-dasharray=${e ? "1.6 2.6" : u}
          ></path>`
    )}
      </svg>
    `;
  }
  // ----------------------------------------------------------- Klimatizace
  renderClimate(t, e) {
    const i = this.getState(t.air_conditioner);
    let s = "unknown", n, o;
    if (i && !k(i.state.toLowerCase())) {
      const h = i.state.toLowerCase(), m = String(i.attributes.preset_mode ?? "none").toLowerCase();
      h === "off" ? s = "off" : h === "cool" ? s = m === "wind_free" ? "wind_free" : "cool" : h === "dry" ? s = "dry" : h === "fan_only" ? s = "fan" : h === "heat" ? s = "heat" : h === "auto" && (s = "auto"), s !== "off" && s !== "unknown" && s !== "wind_free" && m !== "none" && m !== "" && (o = vt(m)), n = Z(i.attributes.temperature);
    }
    const a = $t[s], c = ["cool", "wind_free", "dry", "heat", "auto"].includes(s) && n !== void 0 ? `· ${G(n)}${_}°C` : "", p = s !== "off" && s !== "unknown";
    return this.renderSystemRow(
      this.renderClimateIcon(s, a, s === "unknown"),
      o ?? bt[s],
      a,
      e && p,
      c,
      e,
      t.air_conditioner ? this.sheetAction("climate", t, "Klimatizace") : void 0
    );
  }
  renderClimateIcon(t, e, i) {
    let s;
    const n = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, o = g`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
    switch (t) {
      case "cool":
      case "wind_free":
        s = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${n}</g>
          <g transform="rotate(120 12 12)">${n}</g>`;
        break;
      case "dry":
        s = g`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        s = g`${o}<g transform="rotate(120 12 12)">${o}</g>
          <g transform="rotate(240 12 12)">${o}</g>`;
        break;
      case "heat":
        s = g`<circle cx="12" cy="12" r="4"></circle>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (a) => g`<path d="M12 3v2.5" transform=${`rotate(${45 * a} 12 12)`}></path>`
        )}`;
        break;
      case "auto":
        s = g`<circle cx="12" cy="12" r="9"></circle>
          <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
        break;
      default:
        s = g`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
          <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
    }
    return f`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke=${e}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=${i ? "2 2.4" : u}
        aria-hidden="true"
      >
        ${s}
      </svg>
    `;
  }
  /** Row action: opens the control popup of Topení / Klimatizace. */
  sheetAction(t, e, i) {
    return {
      label: `${e.name}: ${i}, ovládání`,
      onClick: (s) => this.openSheet(t, e, s)
    };
  }
  renderSystemRow(t, e, i, s, n, o, a) {
    return f`
      <button
        type="button"
        class="plain-button system-row ${o ? "primary" : ""} ${s ? "strong" : ""}"
        style=${`--row-color: ${i}`}
        ?disabled=${!a}
        aria-label=${a ? a.label : u}
        @click=${a?.onClick}
      >
        <span class="system-icon">${t}</span>
        <span class="system-text">${e}</span>
        ${n ? f`<span class="system-extra">${n}</span>` : u}
      </button>
    `;
  }
  // ---------------------------------------------------------------- window
  renderWindow(t) {
    const e = t.window, i = this.entityState(e)?.toLowerCase(), s = i === void 0 || k(i), n = i === "on", o = s ? d.label : n ? d.sky : d.label, a = s ? "––" : n ? "Otevřeno" : "Zavřeno";
    return f`
      <button
        type="button"
        class="plain-button system-row window-row ${n ? "strong" : ""}"
        style=${`--row-color: ${o}`}
        ?disabled=${!e}
        aria-label=${`${t.name}: okno, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="system-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke=${s ? d.off : o}
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray=${s ? "2 2.4" : u}
            aria-hidden="true"
          >
            <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
            <path d="M12 3.5v17M5 12h14"></path>
          </svg>
        </span>
        <span class="system-text">${a}</span>
      </button>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), s = i !== void 0 && !k(i.state.toLowerCase()), n = s ? Z(i.attributes.current_position) : void 0, o = s ? Z(i.attributes.current_tilt_position) : void 0, l = n !== void 0 && o !== void 0 ? `poloha ${Math.round(n)} %, naklopení ${Math.round(o)} %` : "poloha nebo naklopení neznámé";
    return f`
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${oe.map((c) => this.renderPreset(t, c, n, o))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel"
        aria-label=${`${t.name}: žaluzie, ${l}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${N} ${Y}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${be(n, o)}
        </svg>
      </button>
    `;
  }
  renderPreset(t, e, i, s) {
    const n = i !== void 0 && s !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(s - e.tilt) <= 2, o = `${t.name}|${e.id}`;
    return f`
      <button
        type="button"
        class="plain-button preset ${this._flash === o ? "sent" : ""}"
        style=${`--tone: ${e.tone}`}
        title=${e.label}
        aria-pressed=${n ? "true" : "false"}
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
        ${_e(e.id)}
      </button>
    `;
  }
  pressStart(t, e, i) {
    t.button === 0 && (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, this.applyPreset(e, i);
    }, Ne));
  }
  pressEnd(t, e) {
    window.clearTimeout(this._pressTimer);
    const i = this._pressing, s = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !i || s)
      return;
    const n = `${t.name}|${e.id}`, o = performance.now();
    this._lastTap && this._lastTap.key === n && o - this._lastTap.time <= Re ? (this._lastTap = void 0, this.applyPreset(t, e)) : this._lastTap = { key: n, time: o };
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(gt.domain, gt.service, {
          entity: t.cover,
          pos: e.position,
          tilt: e.tilt
        }), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
          this._flash = void 0;
        }, He);
      } catch (i) {
        console.error("Klima Dashboard: skript žaluzií selhal", i), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
      }
  }
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, Fe);
  }
  // ----------------------------------------------------------------- sheet
  /** Popup with the controls of Topení (Vypnuto / Plán / Ručně / Boost) or Klimatizace (režimy). */
  renderSheet() {
    const t = this._sheet;
    if (!t)
      return u;
    const e = t.kind === "heating", i = e ? t.room.heating?.climate : t.room.air_conditioner, s = this.getState(i), n = s !== void 0 && !k(s.state.toLowerCase()), o = _t(s?.attributes.hvac_modes), a = _t(s?.attributes.preset_modes), l = s?.state.toLowerCase(), c = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = !n || !i ? [] : e ? this.heatingOptions(i, o, a, l, c) : this.climateOptions(i, o, l), h = !e && n && i ? a.filter((m) => m !== "none") : [];
    return f`
      <div class="backdrop" @click=${() => this.closeSheet()} @keydown=${this.handleSheetKeydown}>
        <div
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(m) => m.stopPropagation()}
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
          ${n ? p.length === 0 ? f`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : f`<div class="options" role="group" aria-label="Režim">
                  ${p.map((m) => this.renderOption(m))}
                </div>` : f`<p class="sheet-message">Entita je nedostupná.</p>`}
          ${h.length > 0 ? f`<div class="sheet-label" id="preset-label">Předvolby</div>
                <div class="chips" role="group" aria-labelledby="preset-label">
                  ${h.map(
      (m) => this.renderPresetChip(i, m, c, l, a)
    )}
                </div>` : u}
          ${this._sheetError ? f`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : u}
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
  renderOption(t) {
    return f`
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
          ${t.unsupported ? f`<span class="option-hint">${t.unsupported}</span>` : u}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, i, s, n) {
    const o = i === e && s !== "off", a = o && n.includes("none") ? "none" : e;
    return f`
      <button
        type="button"
        class="plain-button chip"
        aria-pressed=${o ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${vt(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, s, n) {
    const o = [], a = (l, c, p, h, m, $) => {
      o.push({ id: l, label: c, icon: ye(l), color: p, active: h, run: m, unsupported: $ });
    };
    if (e.includes("off") && a("off", "Vypnuto", d.off, s === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", d.plan, s === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      d.warning,
      s === "heat" && n !== "boost",
      () => this.setHvacMode(t, "heat")
    ), o.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        d.alert,
        l && n === "boost" && s !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return o;
  }
  climateOptions(t, e, i) {
    return De.filter((s) => e.includes(s)).map((s) => {
      const n = le(s), o = $t[n];
      return {
        id: s,
        label: bt[n],
        icon: this.renderClimateIcon(n, o, !1),
        color: o,
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
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._sheet = { kind: t, room: e };
  }
  closeSheet(t = !0) {
    this._sheet = void 0, this._sheetError = void 0, t && this._opener?.focus(), this._opener = void 0;
  }
  // ---------------------------------------------------------------- trends
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = ue(this._config);
    if (t.length === 0)
      return;
    this._trendsLoading = !0;
    const e = Date.now(), i = e - ke;
    try {
      const s = await Ee(this.hass, t, i, e), n = {};
      for (const o of t)
        n[o] = Ce(s[o], i, e, wt);
      this._trends = n;
    } catch (s) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", s);
    } finally {
      this._trendsLoading = !1;
    }
  }
  // ----------------------------------------------------------------- state
  reading(t, e, i) {
    const s = this.getState(t), n = this.numberState(t);
    if (n === void 0)
      return {};
    const o = String(s?.attributes.unit_of_measurement ?? e);
    return {
      value: n,
      text: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: i }).format(n)} ${o}`
    };
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || k(e.toLowerCase()))
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
st.styles = Pe;
let v = st;
E([
  P()
], v.prototype, "_config");
E([
  Tt({ attribute: !1 })
], v.prototype, "hass");
E([
  P()
], v.prototype, "_sheet");
E([
  P()
], v.prototype, "_sheetError");
E([
  P()
], v.prototype, "_flash");
E([
  P()
], v.prototype, "_trends");
E([
  P()
], v.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", v);
window.customCards = window.customCards ?? [];
window.customCards.some((r) => r.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
