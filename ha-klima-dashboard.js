const J = globalThis, $t = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = /* @__PURE__ */ Symbol(), Et = /* @__PURE__ */ new WeakMap();
let Wt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if ($t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const de = (n) => new Wt(typeof n == "string" ? n : n + "", void 0, gt), he = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Wt(e, n, gt);
}, ue = (n, t) => {
  if ($t) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Ct = $t ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return de(e);
})(n) : n;
const { is: pe, defineProperty: me, getOwnPropertyDescriptor: fe, getOwnPropertyNames: $e, getOwnPropertySymbols: ge, getPrototypeOf: ve } = Object, it = globalThis, Mt = it.trustedTypes, _e = Mt ? Mt.emptyScript : "", ye = it.reactiveElementPolyfillSupport, L = (n, t) => n, X = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? _e : null;
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
} }, vt = (n, t) => !pe(n, t), Tt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), it.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && me(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = fe(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...$e(e), ...ge(e)];
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
      for (const s of i) e.unshift(Ct(s));
    } else t !== void 0 && e.push(Ct(t));
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
    return ue(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : X).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : X;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? vt)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[L("elementProperties")] = /* @__PURE__ */ new Map(), R[L("finalized")] = /* @__PURE__ */ new Map(), ye?.({ ReactiveElement: R }), (it.reactiveElementVersions ??= []).push("2.1.2");
const _t = globalThis, zt = (n) => n, tt = _t.trustedTypes, Pt = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, qt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Vt = "?" + S, xe = `<${Vt}>`, z = document, j = () => z.createComment(""), B = (n) => n === null || typeof n != "object" && typeof n != "function", yt = Array.isArray, be = (n) => yt(n) || typeof n?.[Symbol.iterator] == "function", ot = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Rt = />/g, E = RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Ht = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Zt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), f = Zt(1), g = Zt(2), N = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Dt = /* @__PURE__ */ new WeakMap(), T = z.createTreeWalker(z, 129);
function Yt(n, t) {
  if (!yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const we = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = I;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let d, u, h = -1, $ = 0;
    for (; $ < l.length && (r.lastIndex = $, u = r.exec(l), u !== null); ) $ = r.lastIndex, r === I ? u[1] === "!--" ? r = Ot : u[1] !== void 0 ? r = Rt : u[2] !== void 0 ? (Kt.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = E) : u[3] !== void 0 && (r = E) : r === E ? u[0] === ">" ? (r = s ?? I, h = -1) : u[1] === void 0 ? h = -2 : (h = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? E : u[3] === '"' ? Ht : Nt) : r === Ht || r === Nt ? r = E : r === Ot || r === Rt ? r = I : (r = E, s = void 0);
    const _ = r === E && n[a + 1].startsWith("/>") ? " " : "";
    o += r === I ? l + xe : h >= 0 ? (i.push(d), l.slice(0, h) + qt + l.slice(h) + S + _) : l + S + (h === -2 ? a : _);
  }
  return [Yt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, u] = we(t, e);
    if (this.el = W.createElement(d, i), T.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = T.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(qt)) {
          const $ = u[r++], _ = s.getAttribute(h).split(S), v = /([.?@])?(.*)/.exec($);
          l.push({ type: 1, index: o, name: v[2], strings: _, ctor: v[1] === "." ? Se : v[1] === "?" ? ke : v[1] === "@" ? Ee : st }), s.removeAttribute(h);
        } else h.startsWith(S) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Kt.test(s.tagName)) {
          const h = s.textContent.split(S), $ = h.length - 1;
          if ($ > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let _ = 0; _ < $; _++) s.append(h[_], j()), T.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[$], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Vt) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(S, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += S.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = z.createElement("template");
    return i.innerHTML = t, i;
  }
}
function H(n, t, e = n, i) {
  if (t === N) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = B(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = H(n, s._$AS(n, t.values), s, i)), t;
}
class Ae {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? z).importNode(e, !0);
    T.currentNode = s;
    let o = T.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new V(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Ce(o, this, t)), this._$AV.push(d), l = i[++a];
      }
      r !== l?.index && (o = T.nextNode(), r++);
    }
    return T.currentNode = z, s;
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
    t = H(this, t, e), B(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : be(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && B(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = W.createElement(Yt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Ae(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Dt.get(t.strings);
    return e === void 0 && Dt.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new V(this.O(j()), this.O(j()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = zt(t).nextSibling;
      zt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class st {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = H(this, t, e, 0), r = !B(t) || t !== this._$AH && t !== N, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = H(this, a[i + l], e, l), d === N && (d = this._$AH[l]), r ||= !B(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Se extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ke extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Ee extends st {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? m) === N) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ce {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const Me = _t.litHtmlPolyfillSupport;
Me?.(W, V), (_t.litHtmlVersions ??= []).push("3.3.3");
const Te = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new V(t.insertBefore(j(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const xt = globalThis;
class U extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Te(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return N;
  }
}
U._$litElement$ = !0, U.finalized = !0, xt.litElementHydrateSupport?.({ LitElement: U });
const ze = xt.litElementPolyfillSupport;
ze?.({ LitElement: U });
(xt.litElementVersions ??= []).push("4.2.2");
const Pe = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: vt }, Oe = (n = Pe, t, e) => {
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
function Gt(n) {
  return (t, e) => typeof e == "object" ? Oe(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function P(n) {
  return Gt({ ...n, state: !0, attribute: !1 });
}
const Jt = "input_select.house_mode", Qt = {
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
function Re(n) {
  if (!n || !Array.isArray(n.rooms) || n.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (n.house_mode_entity !== void 0 && (typeof n.house_mode_entity != "string" || !n.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of n.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [s, o] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (s in i)
        throw new Error(`Room "${e.name}": key "${s}" was renamed to "${o}".`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(n.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...Qt, ...n.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  return { ...n, thresholds: t };
}
const Ft = { domain: "script", service: "zaluzie_posun" }, Ne = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0 },
  { id: "morning", label: "Ráno", description: "ranní prosvětlení", position: 35, tilt: 60 },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100 },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100 }
], rt = { temperature: 0.5, co2: 50, pm25: 3 }, c = {
  open: "#D8D8DC",
  closed: "#6B6B70",
  label: "#9A9AA0",
  off: "#8E8E93",
  white: "#FFFFFF",
  plan: "#F2F2F7",
  warning: "#FF9F0A",
  alert: "#FF453A",
  cold: "#64D2FF",
  humidity: "#64D2FF",
  cool: "#64D2FF",
  dry: "#FFD60A",
  heat: "#FF9F0A",
  auto: "#BF5AF2"
}, ut = {
  off: c.off,
  cool: c.cool,
  wind_free: c.cool,
  dry: c.dry,
  fan: c.plan,
  heat: c.heat,
  auto: c.auto,
  unknown: c.off
}, Xt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, He = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function De(n) {
  const t = He[n];
  if (t)
    return t;
  const e = n.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Fe(n) {
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
function Ie(n, t, e, i, s, o, r) {
  if (n === void 0 || t === void 0 || e === void 0 || i === void 0 || !o)
    return { label: "Bez dat", color: c.label, kind: "unknown" };
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
  const a = s ? r.summer_min : r.winter_min, l = s ? r.summer_max : r.winter_max;
  return n > l ? { label: "Teplo", color: c.warning, kind: "warning" } : n < a ? { label: "Chladno", color: c.cold, kind: "warning" } : { label: "Příjemné", color: c.label, kind: "normal" };
}
function O(n) {
  return n === "" || n === "unknown" || n === "unavailable" || n === "none";
}
function at(n) {
  if (n == null || n === "")
    return;
  const t = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Le(n) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(n);
}
function lt(n) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(n * 2) / 2
  );
}
function te(n) {
  return n === void 0 || n <= 0 ? 0 : n <= 34 ? 1 : n <= 67 ? 2 : 3;
}
function Ue(n) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(n.house_mode_entity ?? Jt), e(n.outside?.temperature), e(n.outside?.minimum), e(n.outside?.maximum), e(n.outside?.rain_probability), e(n.outside?.pm25);
  for (const i of n.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function je(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function Be(n, t) {
  if (n === t)
    return !0;
  if (!n || !t)
    return !1;
  const e = Object.keys(n), i = Object.keys(t);
  return e.length === i.length && e.every((s) => Object.hasOwn(t, s) && n[s] === t[s]);
}
const Q = 76, pt = 72, It = 12, G = 3, We = 0.8, qe = 1, Ve = 0.2;
function Ke(n, t) {
  if (n === void 0 || t === void 0)
    return g`<rect
      x="0.75"
      y="0.75"
      width=${Q - 1.5}
      height=${pt - 1.5}
      rx="6"
      fill="none"
      stroke=${c.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = pt - G - 1, i = e / It, s = i - We, o = s - t / 100 * (s - qe), r = G + 1 + (100 - n) / 100 * e, a = Array.from({ length: It }, (l, d) => {
    const u = G + 1 + d * i + (i - o) / 2, h = u + o / 2 <= r;
    return g`<rect
      x="0"
      y=${u.toFixed(2)}
      width=${Q}
      height=${o.toFixed(2)}
      rx=${Math.min(1.5, o / 2).toFixed(2)}
      fill=${c.open}
      opacity=${h ? 1 : Ve}
    ></rect>`;
  });
  return g`<rect
      x="0"
      y="0"
      width=${Q}
      height=${G}
      rx="1.5"
      fill=${c.open}
    ></rect>${a}`;
}
const ee = 36e5, Ze = 120 * 6e4, Lt = 12;
function Ye(n) {
  if (n == null)
    return;
  if (typeof n == "number")
    return Number.isFinite(n) ? n < 1e11 ? n * 1e3 : n : void 0;
  const t = Date.parse(n);
  return Number.isNaN(t) ? void 0 : t;
}
function Ge(n, t) {
  const e = {};
  for (const [i, s] of Object.entries(n ?? {})) {
    if (!Array.isArray(s))
      continue;
    const o = [];
    s.forEach((r, a) => {
      const l = r.s ?? r.state, d = Ye(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && o.push({ time: Math.max(d, t), state: l });
    }), o.sort((r, a) => r.time - a.time), e[i] = o;
  }
  return e;
}
async function Ut(n, t, e, i) {
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
  return Ge(s, e);
}
function ie(n, t) {
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
function Je(n, t, e, i) {
  const s = (e - t) / i, o = (n ?? []).filter((r) => mt(r.state) !== void 0);
  return Array.from(
    { length: i },
    (r, a) => mt(ie(o, t + (a + 1) * s))
  );
}
function et(n, t, e) {
  const i = [];
  for (const o of n ?? []) {
    const r = mt(o.state);
    r !== void 0 && o.time <= e && i.push({ t: Math.max(o.time, t), v: r });
  }
  const s = i[i.length - 1];
  return s && s.t < e && i.push({ t: e, v: s.v }), i;
}
function ct(n, t, e, i) {
  const s = /* @__PURE__ */ new Set([t, e]);
  for (const a of n)
    for (const l of a ?? [])
      l.time > t && l.time < e && s.add(l.time);
  const o = [...s].sort((a, l) => a - l), r = [];
  for (let a = 0; a < o.length - 1; a += 1) {
    const l = i(n.map((u) => ie(u, o[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === o[a] ? d.end = o[a + 1] : r.push({ start: o[a], end: o[a + 1], value: l });
  }
  return r;
}
function Qe(n, t) {
  const e = n.filter((a) => a !== void 0);
  if (e.length < 2)
    return n.map(() => {
    });
  const i = Math.min(...e), s = Math.max(...e), o = s - i;
  if (o >= t)
    return n.map((a) => a === void 0 ? void 0 : (a - i) / o);
  const r = (s + i) / 2;
  return n.map(
    (a) => a === void 0 ? void 0 : 0.5 + (a - r) / t
  );
}
const bt = 360, y = 60, Xe = 38, A = bt - y - Xe, C = 14, D = c.label, jt = {
  schedule: c.plan,
  manual: c.warning,
  off: c.closed
}, ti = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, ei = [0, 0.3, 0.6, 0.9], ii = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" }), ft = (n) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: n });
function F(n, t) {
  return y + (n - t.startMs) / (t.endMs - t.startMs) * A;
}
function q(n, t, e) {
  return n.map((i, s) => `${s === 0 ? "M" : "L"}${F(i.t, t).toFixed(1)} ${e(i.v).toFixed(1)}`).join(" ");
}
function si(n, t, e, i) {
  if (n.length === 0)
    return "";
  const s = F(n[0].t, t).toFixed(1), o = F(n[n.length - 1].t, t).toFixed(1);
  return `${q(n, t, e)} L${o} ${i} L${s} ${i} Z`;
}
function Bt(n, t, e) {
  const i = n.map((l) => l.v), s = Math.min(...i), o = Math.max(...i), r = Math.max(o - s, t), a = (o + s) / 2;
  return { min: a - r / 2 - e, max: a + r / 2 + e };
}
function se(n, t) {
  const e = [4, 3, 2, 1, 0].map((i) => n.endMs - i * 6 * ee);
  return g`${e.map((i) => {
    const s = F(i, n);
    return g`<line x1=${s} x2=${s} y1=${t - 4} y2=${t} stroke=${D} stroke-width="0.8"></line>
      <text x=${s} y=${t + 10} fill=${D} font-size="9" text-anchor="middle">${ii.format(i)}</text>`;
  })}`;
}
function dt(n, t, e, i, s) {
  return g`${n.map((o) => {
    const { fill: r, opacity: a } = s(o.value);
    if (a <= 0)
      return m;
    const l = F(o.start, t), d = Math.max(F(o.end, t) - l, 0.5);
    return g`<rect x=${l.toFixed(1)} y=${e} width=${d.toFixed(1)} height=${i} fill=${r} opacity=${a}></rect>`;
  })}`;
}
function ht(n, t) {
  return g`<text x=${y - 6} y=${t} fill=${D} font-size="9" text-anchor="end">${n}</text>`;
}
function M(n, t, e = !1) {
  return f`<span class="legend-item">
    <span
      class="legend-swatch ${e ? "dashed" : ""}"
      style=${e ? `border-color: ${n}` : `background: ${n}`}
    ></span
    >${t}
  </span>`;
}
function ni(n, t) {
  return t.some((e) => e !== void 0 && (n[e]?.length ?? 0) > 0);
}
function oi(n, t, e) {
  const i = et(t.temperature ? n[t.temperature] : void 0, e.startMs, e.endMs), s = et(t.humidity ? n[t.humidity] : void 0, e.startMs, e.endMs), o = 120, r = 126, a = 142, l = 158, d = 12, u = 182, h = [
    t.heating?.overlay ? n[t.heating.overlay] : void 0,
    t.heating?.climate ? n[t.heating.climate] : void 0
  ], $ = ct(h, e.startMs, e.endMs, ([p, b]) => {
    const Y = p?.toLowerCase();
    if (b?.toLowerCase() === "off" || Y === "off")
      return "off";
    if (Y === "schedule" || Y === "manual")
      return Y;
  }), _ = ct(
    [t.heating?.intensity ? n[t.heating.intensity] : void 0],
    e.startMs,
    e.endMs,
    ([p]) => {
      const b = p === void 0 ? void 0 : Number.parseFloat(p);
      return b === void 0 || !Number.isFinite(b) ? void 0 : String(te(b));
    }
  ), v = ct(
    [t.air_conditioner ? n[t.air_conditioner] : void 0],
    e.startMs,
    e.endMs,
    ([p]) => {
      if (p === void 0)
        return;
      const b = Fe(p);
      return b === "unknown" ? void 0 : b;
    }
  ), K = i.length > 0 ? Bt(i, 2, 0.3) : void 0, Z = s.length > 0 ? Bt(s, 10, 1) : void 0, nt = o - C, At = (p) => o - (p - (K?.min ?? 0)) / ((K?.max ?? 1) - (K?.min ?? 0)) * nt, ne = (p) => o - (p - (Z?.min ?? 0)) / ((Z?.max ?? 1) - (Z?.min ?? 0)) * nt, St = ft(1), kt = ft(0), oe = i.length > 0 ? Math.min(...i.map((p) => p.v)) : 0, re = i.length > 0 ? Math.max(...i.map((p) => p.v)) : 0, ae = s.length > 0 ? Math.min(...s.map((p) => p.v)) : 0, le = s.length > 0 ? Math.max(...s.map((p) => p.v)) : 0, ce = [...new Set(v.map((p) => p.value))];
  return f`
    <svg
      class="chart"
      viewBox="0 0 ${bt} 196"
      role="img"
      aria-label="Graf teploty a vlhkosti za posledních 24 hodin s vrstvami vytápění a klimatizace"
    >
      <rect x=${y} y=${C} width=${A} height=${nt} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${K ? g`<path d=${si(i, e, At, o)} fill="rgb(255 255 255 / 8%)"></path>
          <path d=${q(i, e, At)} fill="none" stroke=${c.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          <text x=${y - 6} y=${C + 8} fill=${c.plan} font-size="9" text-anchor="end">${St.format(re)} °C</text>
          <text x=${y - 6} y=${o - 2} fill=${c.plan} font-size="9" text-anchor="end">${St.format(oe)} °C</text>` : g`<text x=${y + A / 2} y=${(C + o) / 2} fill=${D} font-size="11" text-anchor="middle">––</text>`}
      ${Z ? g`<path d=${q(s, e, ne)} fill="none" stroke=${c.humidity} stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"></path>
          <text x=${y + A + 6} y=${C + 8} fill=${c.humidity} font-size="9">${kt.format(le)} %</text>
          <text x=${y + A + 6} y=${o - 2} fill=${c.humidity} font-size="9">${kt.format(ae)} %</text>` : m}
      ${ht("Intenzita", r + 9)}
      ${dt(_, e, r, d, (p) => ({
    fill: c.warning,
    opacity: ei[Number(p)] ?? 0
  }))}
      ${ht("Topení", a + 9)}
      ${dt($, e, a, d, (p) => ({
    fill: jt[p] ?? c.off,
    opacity: 1
  }))}
      ${ht("Klimatizace", l + 9)}
      ${dt(v, e, l, d, (p) => ({
    fill: ut[p] ?? c.off,
    opacity: 1
  }))}
      ${se(e, u - 8)}
    </svg>
    <div class="legend">
      ${M(c.plan, "Teplota")} ${M(c.humidity, "Vlhkost", !0)}
      ${M(c.warning, "Intenzita topení: sytost = 0–3 vlny")}
    </div>
    <div class="legend">
      ${["schedule", "manual", "off"].filter((p) => $.some((b) => b.value === p)).map((p) => M(jt[p], `Topení ${ti[p]}`))}
      ${ce.map((p) => M(ut[p], `Klimatizace ${Xt[p]}`))}
    </div>
  `;
}
function ri(n, t, e, i) {
  const s = et(t.carbon_dioxide ? n[t.carbon_dioxide] : void 0, i.startMs, i.endMs), o = et(t.pm25 ? n[t.pm25] : void 0, i.startMs, i.endMs), r = 150, a = 172, l = r - C, d = Math.max(e.co2_critical * 1.1, ...s.map((v) => v.v * 1.05)), u = Math.max(e.pm25_critical * 1.15, ...o.map((v) => v.v * 1.1)), h = (v) => r - v / d * l, $ = (v) => r - v / u * l, _ = ft(0);
  return f`
    <svg
      class="chart"
      viewBox="0 0 ${bt} 186"
      role="img"
      aria-label="Graf CO₂ a PM2.5 za posledních 24 hodin"
    >
      <rect x=${y} y=${C} width=${A} height=${l} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${[
    { value: e.co2_warning, color: c.warning },
    { value: e.co2_critical, color: c.alert }
  ].map(
    (v) => g`<line x1=${y} x2=${y + A} y1=${h(v.value)} y2=${h(v.value)} stroke=${v.color} stroke-width="0.8" stroke-dasharray="2 3" opacity="0.7"></line>
          <text x=${y - 6} y=${h(v.value) + 3} fill=${v.color} font-size="9" text-anchor="end">${_.format(v.value)}</text>`
  )}
      <text x=${y - 6} y=${r} fill=${D} font-size="9" text-anchor="end">0</text>
      <text x=${y + A + 6} y=${r} fill=${D} font-size="9">0</text>
      <text x=${y + A + 6} y=${$(e.pm25_critical) + 3} fill=${c.humidity} font-size="9">${_.format(e.pm25_critical)}</text>
      ${s.length > 0 ? g`<path d=${q(s, i, h)} fill="none" stroke=${c.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>` : m}
      ${o.length > 0 ? g`<path d=${q(o, i, $)} fill="none" stroke=${c.humidity} stroke-width="1.8" stroke-dasharray="4 3" stroke-linejoin="round"></path>` : m}
      ${se(i, a - 8)}
    </svg>
    <div class="legend">
      ${M(c.plan, "CO₂ (ppm, levá osa)")} ${M(c.humidity, "PM2.5 (µg/m³, pravá osa)", !0)}
    </div>
  `;
}
const ai = he`
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
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 7%);
      border-radius: 24px;
      background: #1c1c1e;
      box-shadow: none;
      color: #ffffff;
      font: inherit;
      text-align: left;
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
      font-size: 18px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    .spark {
      display: block;
      flex: 0 0 auto;
      align-self: center;
      margin-left: 2px;
      opacity: 0.85;
    }

    .hvac {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hvac-rows {
      min-width: 0;
      flex: 1;
    }

    .hvac .spark {
      margin-left: auto;
    }

    .lower {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .info {
      min-width: 0;
      flex: 1;
    }

    .air-row {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 22px;
      gap: 8px;
      font-size: 14px;
      line-height: 22px;
      font-variant-numeric: tabular-nums;
    }

    /* Same 24 px icon column as the Topení, Klimatizace and window rows. */
    .air-icon {
      display: flex;
      width: 24px;
      height: 22px;
      flex: 0 0 24px;
      align-items: center;
      justify-content: center;
      color: #9a9aa0;
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
      height: 24px;
      margin-top: 2px;
      font-size: 14px;
    }

    .cover-column {
      display: flex;
      width: 76px;
      flex: 0 0 76px;
      flex-direction: column;
      gap: 6px;
    }

    .presets {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }

    .preset {
      height: 24px;
      border: 1px solid rgb(255 255 255 / 14%);
      border-radius: 8px;
      background: rgb(255 255 255 / 6%);
      color: #d8d8dc;
      font-size: 11px;
      line-height: 22px;
      text-align: center;
    }

    .preset[aria-pressed="true"] {
      border-color: rgb(255 255 255 / 40%);
      background: rgb(255 255 255 / 20%);
      color: #ffffff;
    }

    .cover-panel {
      display: block;
      width: 76px;
      height: 72px;
    }

    .cover-panel svg {
      display: block;
      width: 76px;
      height: 72px;
    }

    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background: rgb(0 0 0 / 60%);
    }

    .dialog {
      box-sizing: border-box;
      width: 100%;
      max-width: 420px;
      max-height: 90vh;
      overflow: auto;
      padding: 16px;
      border: 1px solid rgb(255 255 255 / 10%);
      border-radius: 20px;
      background: #1c1c1e;
      color: #ffffff;
    }

    .dialog-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }

    .dialog h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
    }

    .close {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      color: #9a9aa0;
      font-size: 18px;
      text-align: center;
    }

    .dialog-message {
      margin: 24px 0;
      color: #9a9aa0;
      font-size: 14px;
    }

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

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .lower {
        gap: 8px;
      }

      .cover-column,
      .cover-panel,
      .cover-panel svg {
        width: 68px;
      }

      .cover-column {
        flex-basis: 68px;
      }
    }
`;
var li = Object.defineProperty, k = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && li(t, e, s), s;
};
const ci = 5 * 6e4, di = 8e3, w = " ", wt = class wt extends U {
  constructor() {
    super(...arguments), this._dialogStatus = "loading", this._dialogHistory = {}, this._dialogRange = { startMs: 0, endMs: 0 }, this._trends = {}, this._trendsLoading = !1, this._trendsStarted = !1, this._dialogRequest = 0, this.handleDialogKeydown = (t) => {
      t.key === "Escape" ? (t.stopPropagation(), this.closeDialog()) : t.key === "Tab" && (t.preventDefault(), this.renderRoot.querySelector(".dialog .close")?.focus());
    };
  }
  setConfig(t) {
    this._config = Re(t), this._trends = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this._trendTimer), window.clearTimeout(this._noticeTimer), this._trendTimer = void 0, this._noticeTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? this.hasRelevantEntityChanged(t.get("hass")) : !0;
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.loadTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.loadTrends();
    }, ci)), t.has("_dialog") && this._dialog && this.renderRoot.querySelector(".dialog .close")?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of Ue(this._config)) {
      const i = t.states[e], s = this.hass.states[e];
      if (i?.state !== s?.state || !Be(i?.attributes, s?.attributes))
        return !0;
    }
    return !1;
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }
  render() {
    if (!this._config)
      return m;
    const t = this.entityState(this._config.house_mode_entity ?? Jt)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", s = this.thresholds();
    return f`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
          </header>
          ${this._notice ? f`<div class="notice" role="alert">${this._notice}</div>` : m}
          <div class="rooms">
            ${this._config.rooms.map(
      (o) => this.renderRoom(o, e, i, s)
    )}
          </div>
        </div>
        ${this.renderDialog(s)}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...Qt, ...this._config?.thresholds };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), s = this.numberState(t.minimum), o = this.numberState(t.maximum), r = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = s !== void 0 && o !== void 0 ? `${e.format(s)}–${e.format(o)}${w}°C` : void 0, d = [
      i === void 0 ? void 0 : `${e.format(i)}${w}°C`,
      l,
      r === void 0 ? void 0 : `☂${w}${e.format(r)}${w}%`
    ].filter((_) => _ !== void 0), u = this.thresholds();
    let h = "––", $ = c.label;
    return a !== void 0 && (a >= u.pm25_critical ? (h = "špatný", $ = c.alert) : a >= u.pm25_warning ? (h = "zhoršený", $ = c.warning) : h = "dobrý"), d.length === 0 && !t.pm25 ? m : f`<div class="outside">
      ${d.length > 0 ? f`<div>${d.join(" · ")}</div>` : m}
      ${t.pm25 ? f`<div>Vzduch venku: <span style=${`color: ${$}`}>${h}</span></div>` : m}
    </div>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, s) {
    const o = this.reading(t.temperature, "°C", 1), r = this.reading(t.humidity, "%", 0), a = this.reading(t.carbon_dioxide, "ppm", 0), l = this.reading(t.pm25, "µg/m³", 0), d = Ie(
      o.value,
      r.value,
      a.value,
      l.value,
      e,
      i,
      s
    ), u = e;
    return f`
      <article class="room" aria-label=${t.name}>
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${d.kind === "unknown" ? `border: 1.5px solid ${c.off}` : `background: ${d.color}`}
          ></span>
          <span style=${`color: ${d.color}; font-weight: ${d.kind === "normal" ? 400 : 500}`}>
            ${d.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature"
            ?disabled=${!t.temperature}
            aria-label=${`${t.name}: historie místnosti za 24 hodin`}
            @click=${(h) => this.openDialog("room", t, h)}
          >
            ${o.value === void 0 ? f`<span class="missing">––</span>` : f`${Le(o.value)}<span class="temperature-unit">${w}°C</span>`}
          </button>
          <span class="humidity">
            ${r.value === void 0 ? f`<span class="missing">––</span>` : f`${Math.round(r.value)}${w}%`}
          </span>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirRow(
      t,
      f`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      "CO₂",
      a,
      "ppm",
      s.co2_warning,
      s.co2_critical,
      t.carbon_dioxide,
      rt.co2
    )}
            ${this.renderAirRow(
      t,
      this.renderParticlesIcon(),
      "PM2.5",
      l,
      "µg/m³",
      s.pm25_warning,
      s.pm25_critical,
      t.pm25,
      rt.pm25
    )}
            <div class="hvac">
              <div class="hvac-rows">
                ${u ? this.renderClimate(t.air_conditioner, !0) : this.renderHeating(t.heating, !0)}
                ${u ? this.renderHeating(t.heating, !1) : this.renderClimate(t.air_conditioner, !1)}
              </div>
              ${this.renderSpark(t.temperature, rt.temperature, "Trend teploty", 48, 40)}
            </div>
            ${this.renderWindow(t.window)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : f`<div class="cover-column"></div>`}
        </div>
      </article>
    `;
  }
  /** PM2.5 icon: scattered dots of different sizes, no frame and no text (CURRENT_SPEC.md, Room Card). */
  renderParticlesIcon() {
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
    ].map(([e, i, s]) => g`<circle cx=${e} cy=${i} r=${s}></circle>`)}
      </svg>
    `;
  }
  renderAirRow(t, e, i, s, o, r, a, l, d) {
    const u = s.value === void 0 ? c.label : s.value >= a ? c.alert : s.value >= r ? c.warning : c.white, h = !t.carbon_dioxide && !t.pm25;
    return f`
      <button
        type="button"
        class="plain-button air-row"
        ?disabled=${h}
        aria-label=${`${t.name}: ${i}, graf CO₂ a PM2.5 za 24 hodin`}
        @click=${($) => this.openDialog("air", t, $)}
      >
        <span class="air-icon" aria-hidden="true">${e}</span>
        ${s.value === void 0 ? f`<span style=${`color: ${c.label}`}>––</span>` : f`<span style=${`color: ${u}`}>${Math.round(s.value)}</span>
              <span class="air-value-unit">${o}</span>`}
        ${this.renderSpark(l, d, `Trend ${i}`)}
      </button>
    `;
  }
  renderSpark(t, e, i, s = 44, o = 14) {
    const r = t ? this._trends[t] : void 0;
    if (!r)
      return m;
    const a = Qe(r, e), l = 2, d = a.map(
      (u, h) => u === void 0 ? void 0 : `${(h / (Lt - 1) * s).toFixed(1)},${(l + (1 - u) * (o - 2 * l)).toFixed(1)}`
    ).filter((u) => u !== void 0);
    return d.length < 2 ? m : f`<svg
      class="spark"
      viewBox="0 0 ${s} ${o}"
      style=${`width: ${s}px; height: ${o}px; flex-basis: ${s}px`}
      aria-hidden="true"
      data-label=${i}
    >
      <polyline
        points=${d.join(" ")}
        fill="none"
        stroke=${c.label}
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></polyline>
    </svg>`;
  }
  // --------------------------------------------------------------- Topení
  renderHeating(t, e) {
    const i = this.entityState(t?.climate)?.toLowerCase(), s = this.entityState(t?.overlay)?.toLowerCase(), o = s === void 0 || O(s), r = i === "off" || s === "off", a = this.numberState(t?.intensity), l = this.numberState(t?.target);
    let d = "––", u = c.label, h = !1, $ = "";
    r ? (d = "Vypnuto", u = c.off) : !o && (i === void 0 || O(i)) ? d = "––" : s === "schedule" ? (d = "Plán", u = c.plan, h = !0, l !== void 0 && ($ = `· ${lt(l)}${w}°C`)) : s === "manual" ? (d = "Ručně", u = c.warning, h = !0, l !== void 0 && ($ = `· ${lt(l)}${w}°C`)) : !o && s && (d = s, u = c.warning, h = !0);
    const _ = r || o ? 0 : te(a);
    return this.renderSystemRow(
      this.renderHeatingWaves(_, o),
      d,
      u,
      e && h,
      $,
      e
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
            stroke=${i < t ? c.warning : c.off}
            stroke-dasharray=${e ? "1.6 2.6" : m}
          ></path>`
    )}
      </svg>
    `;
  }
  // ----------------------------------------------------------- Klimatizace
  renderClimate(t, e) {
    const i = this.getState(t);
    let s = "unknown", o, r;
    if (i && !O(i.state.toLowerCase())) {
      const h = i.state.toLowerCase(), $ = String(i.attributes.preset_mode ?? "none").toLowerCase();
      h === "off" ? s = "off" : h === "cool" ? s = $ === "wind_free" ? "wind_free" : "cool" : h === "dry" ? s = "dry" : h === "fan_only" ? s = "fan" : h === "heat" ? s = "heat" : h === "auto" && (s = "auto"), s !== "off" && s !== "unknown" && s !== "wind_free" && $ !== "none" && $ !== "" && (r = De($)), o = at(i.attributes.temperature);
    }
    const a = ut[s], d = ["cool", "wind_free", "dry", "heat", "auto"].includes(s) && o !== void 0 ? `· ${lt(o)}${w}°C` : "", u = s !== "off" && s !== "unknown";
    return this.renderSystemRow(
      this.renderClimateIcon(s, a, s === "unknown"),
      r ?? Xt[s],
      a,
      e && u,
      d,
      e
    );
  }
  renderClimateIcon(t, e, i) {
    let s;
    const o = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, r = g`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
    switch (t) {
      case "cool":
      case "wind_free":
        s = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${o}</g>
          <g transform="rotate(120 12 12)">${o}</g>`;
        break;
      case "dry":
        s = g`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        s = g`${r}<g transform="rotate(120 12 12)">${r}</g>
          <g transform="rotate(240 12 12)">${r}</g>`;
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
        stroke-dasharray=${i ? "2 2.4" : m}
        aria-hidden="true"
      >
        ${s}
      </svg>
    `;
  }
  renderSystemRow(t, e, i, s, o, r) {
    return f`
      <div
        class="system-row ${r ? "primary" : ""} ${s ? "strong" : ""}"
        style=${`--row-color: ${i}`}
      >
        <span class="system-icon">${t}</span>
        <span class="system-text">${e}</span>
        ${o ? f`<span class="system-extra">${o}</span>` : m}
      </div>
    `;
  }
  // ---------------------------------------------------------------- window
  renderWindow(t) {
    const e = this.entityState(t)?.toLowerCase(), i = e === void 0 || O(e), s = e === "on", o = i ? c.label : s ? c.white : c.label, r = i ? "––" : s ? "Otevřeno" : "Zavřeno";
    return f`
      <div class="system-row window-row ${s ? "strong" : ""}" style=${`--row-color: ${o}`}>
        <span class="system-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke=${i ? c.off : o}
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
        <span class="system-text">${r}</span>
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), s = i !== void 0 && !O(i.state.toLowerCase()), o = s ? at(i.attributes.current_position) : void 0, r = s ? at(i.attributes.current_tilt_position) : void 0, l = o !== void 0 && r !== void 0 ? `poloha ${Math.round(o)} %, naklopení ${Math.round(r)} %` : "poloha nebo naklopení neznámé";
    return f`
      <div class="cover-column">
        <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
          ${Ne.map((d) => this.renderPreset(t, d, o, r))}
        </div>
        <button
          type="button"
          class="plain-button cover-panel"
          aria-label=${`${t.name}: žaluzie, ${l}. Otevřít ovládání.`}
          @click=${() => this.showMoreInfo(e)}
        >
          <svg viewBox="0 0 ${Q} ${pt}" aria-hidden="true">
            ${Ke(o, r)}
          </svg>
        </button>
      </div>
    `;
  }
  renderPreset(t, e, i, s) {
    const o = i !== void 0 && s !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(s - e.tilt) <= 2;
    return f`
      <button
        type="button"
        class="plain-button preset"
        aria-pressed=${o ? "true" : "false"}
        aria-label=${`${t.name}: žaluzie ${e.description} (poloha ${e.position} %, naklopení ${e.tilt} %)`}
        @click=${() => {
      this.applyPreset(t, e);
    }}
      >
        ${e.label}
      </button>
    `;
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(Ft.domain, Ft.service, {
          entity: t.cover,
          pos: e.position,
          tilt: e.tilt
        });
      } catch (i) {
        console.error("Klima Dashboard: skript žaluzií selhal", i), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
      }
  }
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, di);
  }
  // ---------------------------------------------------------------- dialog
  renderDialog(t) {
    const e = this._dialog;
    if (!e)
      return m;
    const i = e.kind === "room" ? "Historie místnosti – 24 h" : "CO₂ a PM2.5 – 24 h", s = e.kind === "room" ? [e.room.temperature, e.room.humidity] : [e.room.carbon_dioxide, e.room.pm25];
    let o;
    return this._dialogStatus === "loading" ? o = f`<p class="dialog-message">Načítám historii…</p>` : this._dialogStatus === "error" ? o = f`<p class="dialog-message" role="alert">
        Historii se nepodařilo načíst.
      </p>` : ni(this._dialogHistory, s) ? e.kind === "room" ? o = oi(this._dialogHistory, e.room, this._dialogRange) : o = ri(this._dialogHistory, e.room, t, this._dialogRange) : o = f`<p class="dialog-message">Za posledních 24 hodin nejsou k dispozici data.</p>`, f`
      <div class="backdrop" @click=${() => this.closeDialog()} @keydown=${this.handleDialogKeydown}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(r) => r.stopPropagation()}
        >
          <div class="dialog-head">
            <h2 id="dialog-title">${i} · ${e.room.name}</h2>
            <button
              type="button"
              class="plain-button close"
              aria-label="Zavřít"
              @click=${() => this.closeDialog()}
            >
              ✕
            </button>
          </div>
          ${o}
        </div>
      </div>
    `;
  }
  openDialog(t, e, i) {
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._dialog = { kind: t, room: e }, this._dialogStatus = "loading", this._dialogHistory = {}, this.loadDialogHistory(t, e);
  }
  closeDialog() {
    this._dialogRequest += 1, this._dialog = void 0, this._opener?.focus(), this._opener = void 0;
  }
  async loadDialogHistory(t, e) {
    const i = ++this._dialogRequest;
    if (!this.hass) {
      this._dialogStatus = "error";
      return;
    }
    const o = (t === "room" ? [
      e.temperature,
      e.humidity,
      e.heating?.overlay,
      e.heating?.climate,
      e.heating?.intensity,
      e.air_conditioner
    ] : [e.carbon_dioxide, e.pm25]).filter((l) => !!l), r = Date.now(), a = r - 24 * ee;
    try {
      const l = await Ut(this.hass, o, a, r);
      if (i !== this._dialogRequest)
        return;
      this._dialogHistory = l, this._dialogRange = { startMs: a, endMs: r }, this._dialogStatus = "ready";
    } catch (l) {
      console.error("Klima Dashboard: načtení historie selhalo", l), i === this._dialogRequest && (this._dialogStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = je(this._config);
    if (t.length === 0)
      return;
    this._trendsLoading = !0;
    const e = Date.now(), i = e - Ze;
    try {
      const s = await Ut(this.hass, t, i, e), o = {};
      for (const r of t)
        o[r] = Je(s[r], i, e, Lt);
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
    if (e === void 0 || O(e.toLowerCase()))
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
wt.styles = ai;
let x = wt;
k([
  P()
], x.prototype, "_config");
k([
  Gt({ attribute: !1 })
], x.prototype, "hass");
k([
  P()
], x.prototype, "_dialog");
k([
  P()
], x.prototype, "_dialogStatus");
k([
  P()
], x.prototype, "_dialogHistory");
k([
  P()
], x.prototype, "_dialogRange");
k([
  P()
], x.prototype, "_trends");
k([
  P()
], x.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", x);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
