const D = globalThis, J = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = /* @__PURE__ */ Symbol(), rt = /* @__PURE__ */ new WeakMap();
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
const Ot = (r) => new kt(typeof r == "string" ? r : r + "", void 0, X), Ft = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new kt(e, r, X);
}, Rt = (r, t) => {
  if (J) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, nt = J ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ot(e);
})(r) : r;
const { is: Ht, defineProperty: It, getOwnPropertyDescriptor: Dt, getOwnPropertyNames: Lt, getOwnPropertySymbols: Ut, getPrototypeOf: jt } = Object, B = globalThis, ot = B.trustedTypes, Bt = ot ? ot.emptyScript : "", Vt = B.reactiveElementPolyfillSupport, P = (r, t) => r, U = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Bt : null;
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
} }, Q = (r, t) => !Ht(r, t), at = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), B.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && It(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Dt(this.prototype, t) ?? { get() {
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
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Lt(e), ...Ut(e)];
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
    return Rt(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : U).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : U;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[P("elementProperties")] = /* @__PURE__ */ new Map(), E[P("finalized")] = /* @__PURE__ */ new Map(), Vt?.({ ReactiveElement: E }), (B.reactiveElementVersions ??= []).push("2.1.2");
const tt = globalThis, lt = (r) => r, j = tt.trustedTypes, ht = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, St = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + w, Wt = `<${At}>`, k = document, O = () => k.createComment(""), F = (r) => r === null || typeof r != "object" && typeof r != "function", et = Array.isArray, Kt = (r) => et(r) || typeof r?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, _ = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ut = /"/g, Et = /^(?:script|style|textarea|title)$/i, Mt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), m = Mt(1), g = Mt(2), M = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), x = k.createTreeWalker(k, 129);
function Ct(r, t) {
  if (!et(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const qt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = z;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let d, c, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, c = o.exec(l), c !== null); ) u = o.lastIndex, o === z ? c[1] === "!--" ? o = ct : c[1] !== void 0 ? o = dt : c[2] !== void 0 ? (Et.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = _) : c[3] !== void 0 && (o = _) : o === _ ? c[0] === ">" ? (o = s ?? z, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? _ : c[3] === '"' ? ut : pt) : o === ut || o === pt ? o = _ : o === ct || o === dt ? o = z : (o = _, s = void 0);
    const v = o === _ && r[a + 1].startsWith("/>") ? " " : "";
    n += o === z ? l + Wt : h >= 0 ? (i.push(d), l.slice(0, h) + St + l.slice(h) + w + v) : l + w + (h === -2 ? a : v);
  }
  return [Ct(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [d, c] = qt(t, e);
    if (this.el = R.createElement(d, i), x.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = x.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(St)) {
          const u = c[o++], v = s.getAttribute(h).split(w), A = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: A[2], strings: v, ctor: A[1] === "." ? Yt : A[1] === "?" ? Gt : A[1] === "@" ? Jt : V }), s.removeAttribute(h);
        } else h.startsWith(w) && (l.push({ type: 6, index: n }), s.removeAttribute(h));
        if (Et.test(s.tagName)) {
          const h = s.textContent.split(w), u = h.length - 1;
          if (u > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let v = 0; v < u; v++) s.append(h[v], O()), x.nextNode(), l.push({ type: 2, index: ++n });
            s.append(h[u], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === At) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(w, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += w.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(r, t, e = r, i) {
  if (t === M) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = F(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = C(r, s._$AS(r, t.values), s, i)), t;
}
class Zt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? k).importNode(e, !0);
    x.currentNode = s;
    let n = x.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new H(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Xt(n, this, t)), this._$AV.push(d), l = i[++a];
      }
      o !== l?.index && (n = x.nextNode(), o++);
    }
    return x.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class H {
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
    t = C(this, t, e), F(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = R.createElement(Ct(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new Zt(s, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new H(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(n), s++;
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
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = C(this, t, e, 0), o = !F(t) || t !== this._$AH && t !== M, o && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = C(this, a[i + l], e, l), d === M && (d = this._$AH[l]), o ||= !F(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Gt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Jt extends V {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? f) === M) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Qt = tt.litHtmlPolyfillSupport;
Qt?.(R, H), (tt.litHtmlVersions ??= []).push("3.3.3");
const te = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new H(t.insertBefore(O(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const it = globalThis;
class N extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = te(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return M;
  }
}
N._$litElement$ = !0, N.finalized = !0, it.litElementHydrateSupport?.({ LitElement: N });
const ee = it.litElementPolyfillSupport;
ee?.({ LitElement: N });
(it.litElementVersions ??= []).push("4.2.2");
const ie = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: Q }, se = (r = ie, t, e) => {
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
  return (t, e) => typeof e == "object" ? se(r, t, e) : ((i, s, n) => {
    const o = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(r, t, e);
}
function T(r) {
  return Tt({ ...r, state: !0, attribute: !1 });
}
const re = ["bedroom", "office", "kids", "living"], zt = "none", Pt = "input_select.house_mode", Nt = {
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
    for (const [n, o] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (n in i)
        throw new Error(`Room "${e.name}": key "${n}" was renamed to "${o}".`);
    const s = [...re, zt];
    if (e.scene !== void 0 && !s.includes(e.scene))
      throw new Error(`Room "${e.name}": scene must be one of ${s.join(", ")}.`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(r.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...Nt, ...r.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  return { ...r, thresholds: t };
}
const mt = { domain: "script", service: "zaluzie_posun" }, oe = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0, tone: "#A5A1F2" },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100, tone: "#7FC8F8" },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100, tone: "#FFD84A" }
], K = { temperature: 1, co2: 100, pm25: 5 }, p = {
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
}, gt = {
  off: p.off,
  cool: p.cool,
  wind_free: p.cool,
  dry: p.dry,
  fan: p.plan,
  heat: p.heat,
  auto: p.auto,
  unknown: p.off
}, vt = {
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
function bt(r) {
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
    return { label: "Bez dat", color: p.label, kind: "unknown" };
  if (i >= o.pm25_critical)
    return { label: "Znečištěný vzduch", color: p.alert, kind: "critical" };
  if (e >= o.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: p.alert, kind: "critical" };
  if (e >= o.co2_warning)
    return { label: "Vydýchaný vzduch", color: p.warning, kind: "warning" };
  if (t > o.humidity_max)
    return { label: "Vlhko", color: p.warning, kind: "warning" };
  if (t < o.humidity_min)
    return { label: "Sucho", color: p.warning, kind: "warning" };
  const a = s ? o.summer_min : o.winter_min, l = s ? o.summer_max : o.winter_max;
  return r > l ? { label: "Teplo", color: p.warning, kind: "warning" } : r < a ? { label: "Chladno", color: p.cold, kind: "warning" } : { label: "Příjemné", color: p.label, kind: "normal" };
}
function $t(r) {
  return Array.isArray(r) ? r.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function y(r) {
  return r === "" || r === "unknown" || r === "unavailable" || r === "none";
}
function q(r) {
  if (r == null || r === "")
    return;
  const t = typeof r == "number" ? r : Number.parseFloat(String(r));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function wt(r) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(r);
}
function Z(r) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(r * 2) / 2
  );
}
function ce(r) {
  return r === void 0 || r <= 0 ? 0 : r <= 34 ? 1 : r <= 67 ? 2 : 3;
}
function de(r) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(r.house_mode_entity ?? Pt), e(r.outside?.temperature), e(r.outside?.minimum), e(r.outside?.maximum), e(r.outside?.rain_probability), e(r.outside?.pm25);
  for (const i of r.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function pe(r) {
  const t = /* @__PURE__ */ new Set();
  for (const e of r.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function ue(r, t) {
  if (r === t)
    return !0;
  if (!r || !t)
    return !1;
  const e = Object.keys(r), i = Object.keys(t);
  return e.length === i.length && e.every((s) => Object.hasOwn(t, s) && r[s] === t[s]);
}
const L = 60, G = 130, _t = 18, I = 3, fe = 0.8, me = 1, ge = 0.28;
function ve(r, t) {
  if (r === void 0 || t === void 0)
    return g`<rect
      x="0.75"
      y="0.75"
      width=${L - 1.5}
      height=${G - 1.5}
      rx="6"
      fill="none"
      stroke=${p.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = G - I - 1, i = e / _t, s = i - fe, n = s - t / 100 * (s - me), o = I + 1 + (100 - r) / 100 * e, a = Array.from({ length: _t }, (l, d) => {
    const c = I + 1 + d * i + (i - n) / 2, h = c + n / 2 <= o;
    return g`<rect
      x="0"
      y=${c.toFixed(2)}
      width=${L}
      height=${n.toFixed(2)}
      rx=${Math.min(1.5, n / 2).toFixed(2)}
      fill=${h ? p.blind : p.sky}
      opacity=${h ? 1 : ge}
    ></rect>`;
  });
  return g`<rect
      x="0"
      y="0"
      width=${L}
      height=${I}
      rx="1.5"
      fill=${p.blind}
    ></rect>${a}`;
}
function be() {
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
  ].map(([t, e, i]) => g`<circle cx=${t} cy=${e} r=${i}></circle>`)}
    </svg>
  `;
}
function $e(r) {
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
function we(r) {
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
const _e = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
};
function ye(r) {
  if (r.scene === zt)
    return;
  if (r.scene)
    return r.scene;
  const t = r.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
  return _e[t];
}
const xe = {
  bedroom: "#A5A1F2",
  office: "#7FC8F8",
  kids: "#FFB36B",
  living: "#E8D9B5"
};
function ke(r) {
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
const Se = 120 * 6e4, yt = 12;
function Ae(r) {
  if (r == null)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r < 1e11 ? r * 1e3 : r : void 0;
  const t = Date.parse(r);
  return Number.isNaN(t) ? void 0 : t;
}
function Ee(r, t) {
  const e = {};
  for (const [i, s] of Object.entries(r ?? {})) {
    if (!Array.isArray(s))
      continue;
    const n = [];
    s.forEach((o, a) => {
      const l = o.s ?? o.state, d = Ae(o.lu ?? o.last_updated ?? o.lc ?? o.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && n.push({ time: Math.max(d, t), state: l });
    }), n.sort((o, a) => o.time - a.time), e[i] = n;
  }
  return e;
}
async function Me(r, t, e, i) {
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
  return Ee(s, e);
}
function Ce(r, t) {
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
function Te(r, t, e, i) {
  const s = (e - t) / i, n = (r ?? []).filter((o) => xt(o.state) !== void 0);
  return Array.from(
    { length: i },
    (o, a) => xt(Ce(n, t + (a + 1) * s))
  );
}
function Y(r, t) {
  let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const o of r)
    for (const a of o ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), i = Math.max(i, a));
  if (!Number.isFinite(e) || !Number.isFinite(i) || t <= 0)
    return;
  let s = Math.floor(e / t) * t, n = Math.ceil(i / t) * t;
  return n - s < t && (s -= t, n += t), { min: s, max: n };
}
function ze(r, t) {
  const e = t.max - t.min;
  return r.map(
    (i) => i === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / e))
  );
}
const Pe = Ft`
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
       * values, labels and units. --col is the blind panel width.
       */
      --row-h: 26px;
      --row-font: 15px;
      --icon: 22px;
      --info-gap: 6px;
      --icon-gap: 7px;
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
      column-gap: 8px;
    }

    /*
     * Info rows: two equally wide columns, values on the left and micro trends on the right
     * (CURRENT_SPEC.md, Room Card). The temperature trend spans the Topení and Klimatizace rows.
     */
    .info {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-rows: repeat(5, var(--row-h));
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

    .slot-hvac1 {
      grid-column: 1;
      grid-row: 3;
    }

    .slot-hvac2 {
      grid-column: 1;
      grid-row: 4;
    }

    .slot-temperature-trend {
      grid-column: 2;
      grid-row: 3 / span 2;
    }

    .slot-window {
      grid-column: 1;
      grid-row: 5;
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

    /* Micro trend: stretches over its cell; the dot is HTML so it stays round. */
    .trend-button {
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .spark {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 5px 3px;
    }

    .trend-button .spark {
      padding: 7px 3px;
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
var Ne = Object.defineProperty, S = (r, t, e, i) => {
  for (var s = void 0, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (s = o(t, e, s) || s);
  return s && Ne(t, e, s), s;
};
const Oe = 5 * 6e4, Fe = 8e3, $ = " ", Re = 550, He = 400, Ie = 700, De = ["off", "cool", "dry", "fan_only", "auto", "heat"], st = class st extends N {
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
    for (const e of de(this._config)) {
      const i = t.states[e], s = this.hass.states[e];
      if (i?.state !== s?.state || !ue(i?.attributes, s?.attributes))
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
    const t = this.entityState(this._config.house_mode_entity ?? Pt)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", s = this.thresholds(), n = this.trendAxes(this._config);
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
      (o) => this.renderRoom(o, e, i, s, n)
    )}
          </div>
        </div>
        ${this.renderSheet()}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...Nt, ...this._config?.thresholds };
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (i) => t.rooms.map((s) => {
      const n = i(s);
      return n ? this._trends[n] : void 0;
    });
    return {
      temperature: Y(e((i) => i.temperature), K.temperature),
      co2: Y(e((i) => i.carbon_dioxide), K.co2),
      pm25: Y(e((i) => i.pm25), K.pm25)
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), s = this.numberState(t.minimum), n = this.numberState(t.maximum), o = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = s !== void 0 && n !== void 0 ? `${e.format(s)}–${e.format(n)}${$}°C` : void 0, d = [
      i === void 0 ? void 0 : `${e.format(i)}${$}°C`,
      l,
      o === void 0 ? void 0 : `☂${$}${e.format(o)}${$}%`
    ].filter((v) => v !== void 0), c = this.thresholds();
    let h = "––", u = p.label;
    return a !== void 0 && (a >= c.pm25_critical ? (h = "špatný", u = p.alert) : a >= c.pm25_warning ? (h = "zhoršený", u = p.warning) : h = "dobrý"), d.length === 0 && !t.pm25 ? f : m`<div class="outside">
      ${d.length > 0 ? m`<div>${d.join(" · ")}</div>` : f}
      ${t.pm25 ? m`<div>Vzduch venku: <span style=${`color: ${u}`}>${h}</span></div>` : f}
    </div>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, s, n) {
    const o = this.reading(t.temperature, "°C", 1), a = this.reading(t.humidity, "%", 0), l = this.reading(t.carbon_dioxide, "ppm", 0), d = this.reading(t.pm25, "µg/m³", 0), c = he(
      o.value,
      a.value,
      l.value,
      d.value,
      e,
      i,
      s
    ), h = e, u = ye(t);
    return m`
      <article
        class="room"
        aria-label=${t.name}
        style=${u ? `--scene-tone: ${xe[u]}` : f}
      >
        ${u ? m`<div class="scene" aria-hidden="true">${ke(u)}</div>` : f}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${c.kind === "unknown" ? `border: 1.5px solid ${p.off}` : `background: ${c.color}`}
          ></span>
          <span style=${`color: ${c.color}; font-weight: ${c.kind === "normal" ? 400 : 500}`}>
            ${c.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature"
            ?disabled=${!t.temperature}
            aria-label=${`${t.name}: teplota ${o.value === void 0 ? "neznámá" : `${wt(o.value)} °C`}, detail a historie`}
            @click=${() => this.showMoreInfo(t.temperature)}
          >
            ${o.value === void 0 ? m`<span class="missing">––</span>` : m`${wt(o.value)}<span class="temperature-unit">${$}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity"
            ?disabled=${!t.humidity}
            aria-label=${`${t.name}: vlhkost ${a.value === void 0 ? "neznámá" : `${Math.round(a.value)} %`}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${a.value === void 0 ? m`<span class="missing">––</span>` : m`${Math.round(a.value)}${$}%`}
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
      n.co2
    )}
            ${this.renderAirRow(
      t,
      "pm25",
      t.pm25,
      be(),
      "PM2.5",
      d,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical,
      n.pm25
    )}
            ${h ? this.renderClimate(t, !0) : this.renderHeating(t, !0)}
            ${h ? this.renderHeating(t, !1) : this.renderClimate(t, !1)}
            ${this.renderTemperatureTrend(t, o, n.temperature)}
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
  renderAirRow(t, e, i, s, n, o, a, l, d, c) {
    const h = o.value !== void 0, u = Math.round(o.value ?? 0), v = o.value === void 0 ? p.label : o.value >= d ? p.alert : o.value >= l ? p.warning : p.white;
    return m`
      <button
        type="button"
        class="plain-button air-row slot-${e}"
        ?disabled=${!i}
        aria-label=${`${t.name}: ${n} ${h ? `${u} ${a}` : "neznámé"}, detail a historie`}
        @click=${() => this.showMoreInfo(i)}
      >
        <span class="row-main">
          <span class="row-icon" style=${`color: ${h ? p.mint : p.off}`} aria-hidden="true">
            ${s}
          </span>
          <span class="row-text">
            ${h ? m`<span class="row-label" style=${`color: ${v}`}>${u}</span>
                  <span class="row-unit">${a}</span>` : m`<span class="row-label" style=${`color: ${p.label}`}>––</span>`}
          </span>
        </span>
        ${h ? this.renderSpark(i, c, p.mint) : f}
      </button>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the temperature detail.
   */
  renderTemperatureTrend(t, e, i) {
    if (!t.temperature || e.value === void 0)
      return f;
    const s = this.renderSpark(t.temperature, i, p.peach);
    return s === f ? f : m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: trend teploty za 2 hodiny, detail a historie`}
        @click=${() => this.showMoreInfo(t.temperature)}
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
    const n = ze(s, e).map(
      (c, h) => c === void 0 ? void 0 : { x: h / (yt - 1) * 100, y: (1 - c) * 100 }
    ).filter((c) => c !== void 0);
    if (n.length < 2)
      return f;
    const o = n.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" "), a = n[0], l = n[n.length - 1], d = `${o} ${l.x.toFixed(2)},100 ${a.x.toFixed(2)},100`;
    return m`<span class="spark" style=${`color: ${i}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${d} fill="currentColor" fill-opacity="0.08"></polygon>
          <polyline
            points=${o}
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
    const i = t.heating, s = this.entityState(i?.climate)?.toLowerCase(), n = this.entityState(i?.overlay)?.toLowerCase(), o = n === void 0 || y(n), a = s === "off" || n === "off", l = this.numberState(i?.intensity), d = this.numberState(i?.target);
    let c = "––", h = p.label, u = !1, v = "";
    a ? (c = "Vypnuto", h = p.off) : !o && (s === void 0 || y(s)) ? c = "––" : n === "schedule" ? (c = "Plán", h = p.plan, u = !0, d !== void 0 && (v = `· ${Z(d)}${$}°C`)) : n === "manual" ? (c = "Ručně", h = p.warning, u = !0, d !== void 0 && (v = `· ${Z(d)}${$}°C`)) : !o && n && (c = n, h = p.warning, u = !0);
    const A = a || o ? 0 : ce(l);
    return this.renderSystemRow(
      t,
      "Topení",
      this.renderHeatingWaves(A, o),
      c,
      h,
      e && u,
      v,
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
      (i) => g`<path
            d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
            stroke=${i < t ? p.warning : p.off}
            stroke-dasharray=${e ? "1.6 2.6" : f}
          ></path>`
    )}
      </svg>
    `;
  }
  // ----------------------------------------------------------- Klimatizace
  renderClimate(t, e) {
    const i = this.getState(t.air_conditioner);
    let s = "unknown", n, o;
    if (i && !y(i.state.toLowerCase())) {
      const h = i.state.toLowerCase(), u = String(i.attributes.preset_mode ?? "none").toLowerCase();
      h === "off" ? s = "off" : h === "cool" ? s = u === "wind_free" ? "wind_free" : "cool" : h === "dry" ? s = "dry" : h === "fan_only" ? s = "fan" : h === "heat" ? s = "heat" : h === "auto" && (s = "auto"), s !== "off" && s !== "unknown" && s !== "wind_free" && u !== "none" && u !== "" && (o = bt(u)), n = q(i.attributes.temperature);
    }
    const a = gt[s], d = ["cool", "wind_free", "dry", "heat", "auto"].includes(s) && n !== void 0 ? `· ${Z(n)}${$}°C` : "", c = s !== "off" && s !== "unknown";
    return this.renderSystemRow(
      t,
      "Klimatizace",
      this.renderClimateIcon(s, a, s === "unknown"),
      o ?? vt[s],
      a,
      e && c,
      d,
      e,
      t.air_conditioner ? this.sheetAction("climate", t) : void 0
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
  renderSystemRow(t, e, i, s, n, o, a, l, d) {
    const c = `${s === "––" ? "neznámý stav" : s}${a ? ` ${a.replace(/^·\s*/, "")}` : ""}`;
    return m`
      <button
        type="button"
        class="plain-button system-row slot-${l ? "hvac1" : "hvac2"} ${o ? "strong" : ""}"
        style=${`--row-color: ${n}`}
        ?disabled=${!d}
        aria-label=${`${t.name}: ${e}, ${c}${d ? ", ovládání" : ""}`}
        @click=${d?.onClick}
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
    const e = t.window, i = this.entityState(e)?.toLowerCase(), s = i === void 0 || y(i), n = i === "on", o = s ? p.label : n ? p.sky : p.label, a = s ? "––" : n ? "Otevřeno" : "Zavřeno";
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${n ? "strong" : ""}"
        style=${`--row-color: ${o}`}
        ?disabled=${!e}
        aria-label=${`${t.name}: okno ${s ? "neznámé" : a.toLowerCase()}, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="row-main">
          <span class="row-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke=${s ? p.off : o}
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
    const i = this.getState(e), s = i !== void 0 && !y(i.state.toLowerCase()), n = s ? q(i.attributes.current_position) : void 0, o = s ? q(i.attributes.current_tilt_position) : void 0, l = n !== void 0 && o !== void 0 ? `poloha ${Math.round(n)} %, naklopení ${Math.round(o)} %` : "poloha nebo naklopení neznámé";
    return m`
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${oe.map((d) => this.renderPreset(t, d, n, o))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel"
        aria-label=${`${t.name}: žaluzie, ${l}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${L} ${G}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${ve(n, o)}
        </svg>
      </button>
    `;
  }
  renderPreset(t, e, i, s) {
    const n = i !== void 0 && s !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(s - e.tilt) <= 2, o = `${t.name}|${e.id}`;
    return m`
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
        ${$e(e.id)}
      </button>
    `;
  }
  pressStart(t, e, i) {
    t.button === 0 && (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, this.applyPreset(e, i);
    }, Re));
  }
  pressEnd(t, e) {
    window.clearTimeout(this._pressTimer);
    const i = this._pressing, s = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !i || s)
      return;
    const n = `${t.name}|${e.id}`, o = performance.now();
    this._lastTap && this._lastTap.key === n && o - this._lastTap.time <= He ? (this._lastTap = void 0, this.applyPreset(t, e)) : this._lastTap = { key: n, time: o };
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(mt.domain, mt.service, {
          entity: t.cover,
          pos: e.position,
          tilt: e.tilt
        }), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
          this._flash = void 0;
        }, Ie);
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
      return f;
    const e = t.kind === "heating", i = e ? t.room.heating?.climate : t.room.air_conditioner, s = this.getState(i), n = s !== void 0 && !y(s.state.toLowerCase()), o = $t(s?.attributes.hvac_modes), a = $t(s?.attributes.preset_modes), l = s?.state.toLowerCase(), d = String(s?.attributes.preset_mode ?? "none").toLowerCase(), c = !n || !i ? [] : e ? this.heatingOptions(i, o, a, l, d) : this.climateOptions(i, o, l), h = !e && n && i ? a.filter((u) => u !== "none") : [];
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
          ${n ? c.length === 0 ? m`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : m`<div class="options" role="group" aria-label="Režim">
                  ${c.map((u) => this.renderOption(u))}
                </div>` : m`<p class="sheet-message">Entita je nedostupná.</p>`}
          ${h.length > 0 ? m`<div class="sheet-label" id="preset-label">Předvolby</div>
                <div class="chips" role="group" aria-labelledby="preset-label">
                  ${h.map(
      (u) => this.renderPresetChip(i, u, d, l, a)
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
  renderPresetChip(t, e, i, s, n) {
    const o = i === e && s !== "off", a = o && n.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip"
        aria-pressed=${o ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${bt(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, s, n) {
    const o = [], a = (l, d, c, h, u, v) => {
      o.push({ id: l, label: d, icon: we(l), color: c, active: h, run: u, unsupported: v });
    };
    if (e.includes("off") && a("off", "Vypnuto", p.off, s === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", p.plan, s === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      p.warning,
      s === "heat" && n !== "boost",
      () => this.setHvacMode(t, "heat")
    ), o.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        p.alert,
        l && n === "boost" && s !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return o;
  }
  climateOptions(t, e, i) {
    return De.filter((s) => e.includes(s)).map((s) => {
      const n = le(s), o = gt[n];
      return {
        id: s,
        label: vt[n],
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
    const t = pe(this._config);
    if (t.length === 0)
      return;
    this._trendsLoading = !0;
    const e = Date.now(), i = e - Se;
    try {
      const s = await Me(this.hass, t, i, e), n = {};
      for (const o of t)
        n[o] = Te(s[o], i, e, yt);
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
    if (e === void 0 || y(e.toLowerCase()))
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
let b = st;
S([
  T()
], b.prototype, "_config");
S([
  Tt({ attribute: !1 })
], b.prototype, "hass");
S([
  T()
], b.prototype, "_sheet");
S([
  T()
], b.prototype, "_sheetError");
S([
  T()
], b.prototype, "_flash");
S([
  T()
], b.prototype, "_trends");
S([
  T()
], b.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", b);
window.customCards = window.customCards ?? [];
window.customCards.some((r) => r.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
