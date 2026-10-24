const _t = globalThis, Gt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zt = /* @__PURE__ */ Symbol(), re = /* @__PURE__ */ new WeakMap();
let Be = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Gt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = re.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && re.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ci = (i) => new Be(typeof i == "string" ? i : i + "", void 0, Zt), di = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new Be(e, i, Zt);
}, hi = (i, t) => {
  if (Gt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = _t.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, ae = Gt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return ci(e);
})(i) : i;
const { is: pi, defineProperty: ui, getOwnPropertyDescriptor: fi, getOwnPropertyNames: mi, getOwnPropertySymbols: gi, getPrototypeOf: vi } = Object, Tt = globalThis, le = Tt.trustedTypes, $i = le ? le.emptyScript : "", wi = Tt.reactiveElementPolyfillSupport, ct = (i, t) => i, St = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? $i : null;
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
} }, Xt = (i, t) => !pi(i, t), ce = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Tt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let J = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ce) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && ui(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: o } = fi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = vi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const e = this.properties, n = [...mi(e), ...gi(e)];
      for (const s of n) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, s] of e) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const s = this._$Eu(e, n);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) e.unshift(ae(s));
    } else t !== void 0 && e.push(ae(t));
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
    return hi(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : St).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : St;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? Xt)(o, e) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, o] of n) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[ct("elementProperties")] = /* @__PURE__ */ new Map(), J[ct("finalized")] = /* @__PURE__ */ new Map(), wi?.({ ReactiveElement: J }), (Tt.reactiveElementVersions ??= []).push("2.1.2");
const Jt = globalThis, de = (i) => i, Mt = Jt.trustedTypes, he = Mt ? Mt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, We = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, Ke = "?" + U, bi = `<${Ke}>`, Z = document, ht = () => Z.createComment(""), pt = (i) => i === null || typeof i != "object" && typeof i != "function", Qt = Array.isArray, yi = (i) => Qt(i) || typeof i?.[Symbol.iterator] == "function", Pt = `[ 	
\f\r]`, st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, ue = />/g, j = RegExp(`>|${Pt}(?:([^\\s"'>=/]+)(${Pt}*=${Pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, me = /"/g, Ye = /^(?:script|style|textarea|title)$/i, Ve = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), f = Ve(1), $ = Ve(2), tt = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), G = Z.createTreeWalker(Z, 129);
function qe(i, t) {
  if (!Qt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return he !== void 0 ? he.createHTML(t) : t;
}
const _i = (i, t) => {
  const e = i.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = st;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, p, d = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, p = r.exec(l), p !== null); ) h = r.lastIndex, r === st ? p[1] === "!--" ? r = pe : p[1] !== void 0 ? r = ue : p[2] !== void 0 ? (Ye.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = j) : p[3] !== void 0 && (r = j) : r === j ? p[0] === ">" ? (r = s ?? st, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? j : p[3] === '"' ? me : fe) : r === me || r === fe ? r = j : r === pe || r === ue ? r = st : (r = j, s = void 0);
    const g = r === j && i[a + 1].startsWith("/>") ? " " : "";
    o += r === st ? l + bi : d >= 0 ? (n.push(c), l.slice(0, d) + We + l.slice(d) + U + g) : l + U + (d === -2 ? a : g);
  }
  return [qe(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ut {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = _i(t, e);
    if (this.el = ut.createElement(c, n), G.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = G.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(We)) {
          const h = p[r++], g = s.getAttribute(d).split(U), w = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: w[2], strings: g, ctor: w[1] === "." ? ki : w[1] === "?" ? Si : w[1] === "@" ? Mi : Et }), s.removeAttribute(d);
        } else d.startsWith(U) && (l.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Ye.test(s.tagName)) {
          const d = s.textContent.split(U), h = d.length - 1;
          if (h > 0) {
            s.textContent = Mt ? Mt.emptyScript : "";
            for (let g = 0; g < h; g++) s.append(d[g], ht()), G.nextNode(), l.push({ type: 2, index: ++o });
            s.append(d[h], ht());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ke) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(U, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += U.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const n = Z.createElement("template");
    return n.innerHTML = t, n;
  }
}
function et(i, t, e = i, n) {
  if (t === tt) return t;
  let s = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const o = pt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = s : e._$Cl = s), s !== void 0 && (t = et(i, s._$AS(i, t.values), s, n)), t;
}
class xi {
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
    const { el: { content: e }, parts: n } = this._$AD, s = (t?.creationScope ?? Z).importNode(e, !0);
    G.currentNode = s;
    let o = G.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new mt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Ti(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== l?.index && (o = G.nextNode(), r++);
    }
    return G.currentNode = Z, s;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class mt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = et(this, t, e), pt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ut.createElement(qe(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new xi(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ge.get(t.strings);
    return e === void 0 && ge.set(t.strings, e = new ut(t)), e;
  }
  k(t) {
    Qt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const o of t) s === e.length ? e.push(n = new mt(this.O(ht()), this.O(ht()), this, this.options)) : n = e[s], n._$AI(o), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = de(t).nextSibling;
      de(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, e = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = et(this, t, e, 0), r = !pt(t) || t !== this._$AH && t !== tt, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = et(this, a[n + l], e, l), c === tt && (c = this._$AH[l]), r ||= !pt(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ki extends Et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Si extends Et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Mi extends Et {
  constructor(t, e, n, s, o) {
    super(t, e, n, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = et(this, t, e, 0) ?? m) === tt) return;
    const n = this._$AH, s = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ti {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    et(this, t);
  }
}
const Ei = Jt.litHtmlPolyfillSupport;
Ei?.(ut, mt), (Jt.litHtmlVersions ??= []).push("3.3.3");
const Ai = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    n._$litPart$ = s = new mt(t.insertBefore(ht(), o), o, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
const te = globalThis;
class dt extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ai(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return tt;
  }
}
dt._$litElement$ = !0, dt.finalized = !0, te.litElementHydrateSupport?.({ LitElement: dt });
const Ci = te.litElementPolyfillSupport;
Ci?.({ LitElement: dt });
(te.litElementVersions ??= []).push("4.2.2");
const Oi = { attribute: !0, type: String, converter: St, reflect: !1, hasChanged: Xt }, Pi = (i = Oi, t, e) => {
  const { kind: n, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), n === "accessor") {
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
function Ge(i) {
  return (t, e) => typeof e == "object" ? Pi(i, t, e) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(i, t, e);
}
function A(i) {
  return Ge({ ...i, state: !0, attribute: !1 });
}
const xt = 60, Ut = 142, ve = 11, vt = 3, zi = 0.8, $e = 2, Ii = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", Ni = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", Ri = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function Li(i, t) {
  if (i === void 0 || t === void 0)
    return $`<rect
      x="0.75"
      y="0.75"
      width=${xt - 1.5}
      height=${Ut - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = Ut - vt - 1, n = e / ve, s = n - zi, o = s - t / 100 * (s - $e), r = vt + 1 + (100 - i) / 100 * e, a = Array.from({ length: ve }, (l, c) => {
    const p = vt + 1 + c * n + n / 2, d = p <= r, h = d ? o : $e;
    return $`<rect
      x="0"
      y=${(p - h / 2).toFixed(2)}
      width=${xt}
      height=${h.toFixed(2)}
      rx=${Math.min(1.5, h / 2).toFixed(2)}
      style=${d ? Ii : Ni}
    ></rect>`;
  });
  return $`<rect
      class="rail"
      x="0"
      y="0"
      width=${xt}
      height=${vt}
      rx="1.5"
      style=${Ri}
    ></rect>${a}`;
}
const zt = ["bedroom", "office", "kids", "living"], It = "none", we = ["open", "shade", "dark"], Hi = "input_select.house_mode", Di = {
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
}, Fi = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Ui = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Nt = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, ji = [
  { name: "Den", icon: "open", position: 100, tilt: 100, description: "vytaženo nahoru" },
  { name: "Stín", icon: "shade", position: 0, tilt: 100, description: "spuštěno, lamely otevřené" },
  { name: "Tma", icon: "dark", position: 0, tilt: 0, description: "úplné zatemnění" }
], be = { winter: "Zima", summer: "Léto" }, ye = ["auto", "dark", "light"], _e = 3, Bi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Wi = [
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
], Ki = ["climate", "overlay", "target", "intensity"], xe = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], Yi = ["name", "position", "tilt", "icon", "description"], Vi = ["entity", "name"];
function Q(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function y(i) {
  throw new Error(`Klima Dashboard: ${i}`);
}
function gt(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function X(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || y(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function F(i, t) {
  return i == null ? {} : (gt(i) || y(`"${t}" must be a mapping of keys.`), i);
}
function P(i, t) {
  if (i != null)
    return (typeof i != "string" || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(i.trim())) && y(`${t} must be an entity ID such as sensor.loznice_teplota.`), i.trim();
}
function it(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && y(`${t} must be a non-empty text.`), i.trim();
}
function lt(i, t, e, n = {}) {
  X(i, Object.keys(t), e);
  const s = { ...t };
  for (const [o, r] of Object.entries(i)) {
    (typeof r != "number" || !Number.isFinite(r)) && y(`${e}.${o} must be a number.`);
    const a = n[o];
    if (a) {
      const [l, c, p] = a;
      (r < l || r > c || p && !Number.isInteger(r)) && y(`${e}.${o} must be ${p ? "a whole number " : ""}from ${l} to ${c}.`);
    }
    s[o] = r;
  }
  return s;
}
function Ze(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, s, o] of e)
    (o ? i[n] >= i[s] : i[n] > i[s]) && y(`${t}: ${n} (${i[n]}) must be ${o ? "below" : "at most"} ${s} (${i[s]}).`);
  i.stale_minutes <= 0 && y(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && y(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function qi(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function jt(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > _e) && y(`${t} must be a list of 1 to ${_e} presets.`), i.map((e, n) => {
    const s = `${t}[${n + 1}]`;
    gt(e) || y(`${s} must have name, position and tilt.`), X(e, Yi, s);
    const o = it(e.name, `${s}.name`);
    o || y(`${s}.name is required.`);
    const r = (d) => {
      const h = e[d];
      return (typeof h != "number" || !Number.isFinite(h) || h < 0 || h > 100) && y(`${s}.${d} must be a number from 0 to 100.`), h;
    }, a = r("position"), l = r("tilt");
    let c = qi(a, l);
    e.icon !== void 0 && (we.includes(e.icon) || y(`${s}.icon must be one of ${we.join(", ")}.`), c = e.icon);
    const p = it(e.description, `${s}.description`) ?? `poloha ${Math.round(a)} %, naklopení ${Math.round(l)} %`;
    return { id: `p${n}`, icon: c, label: o, description: p, position: a, tilt: l };
  });
}
function Gi(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && y(`${t}.window must not be an empty list.`);
  const s = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(e) ? `[${a + 1}]` : ""}`;
    if (gt(r)) {
      X(r, Vi, l);
      const p = P(r.entity, `${l}.entity`);
      return p || y(`${l}.entity is required.`), { entity: p, name: it(r.name, `${l}.name`) ?? `Okno ${a + 1}` };
    }
    const c = P(r, l);
    return c || y(`${l} must be an entity ID.`), { entity: c, name: `Okno ${a + 1}` };
  }), o = /* @__PURE__ */ new Set();
  for (const r of s)
    o.has(r.entity) && y(`${t}.window lists ${r.entity} twice.`), o.add(r.entity);
  return s;
}
function ke(i, t) {
  return i === !1 ? { present: !1 } : { entity: P(i, t), present: !0 };
}
function Zi(i, t) {
  i.image !== void 0 && i.scene !== void 0 && y(`${t}: use either image or scene (older name), not both.`);
  const e = i.image !== void 0 ? "image" : "scene", n = i.image ?? i.scene;
  if (n == null) {
    const o = Bi[Q(i.name)];
    return o ? { kind: "scene", scene: o } : void 0;
  }
  (typeof n != "string" || !n.trim()) && y(`${t}.${e} must be ${[...zt, It].join(", ")} or the address of an image.`);
  const s = n.trim();
  if (s !== It) {
    if (zt.includes(s))
      return { kind: "scene", scene: s };
    if (e === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(s))
      return { kind: "url", url: s };
    y(
      `${t}.${e} must be one of ${[...zt, It].join(", ")}${e === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Xi(i, t) {
  const e = it(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && y(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function Ji(i, t, e) {
  gt(i) || y(`room ${t + 1} must be a mapping with at least a name.`);
  const n = typeof i.name == "string" ? i.name.trim() : "";
  n || y(`room ${t + 1} requires a name.`);
  const s = `room "${n}"`, o = i;
  for (const [d, h] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    d in o && y(`${s}: key "${d}" was renamed to "${h}".`);
  "windows" in o && y(`${s}: the key is "window" (one entity or a list of them), not "windows".`), X(o, Wi, s);
  const r = F(i.heating, `${s}.heating`);
  "heating" in r && y(`${s}: key "heating.heating" was renamed to "heating.intensity".`), X(r, Ki, `${s}.heating`);
  const a = i.heating === void 0 ? void 0 : {
    climate: P(r.climate, `${s}.heating.climate`),
    overlay: P(r.overlay, `${s}.heating.overlay`),
    target: P(r.target, `${s}.heating.target`),
    intensity: P(r.intensity, `${s}.heating.intensity`)
  }, l = lt(F(i.thresholds, `${s}.thresholds`), e.thresholds, `${s}.thresholds`);
  Ze(l, `${s}.thresholds`);
  const c = ke(i.carbon_dioxide, `${s}.carbon_dioxide`), p = ke(i.pm25, `${s}.pm25`);
  return {
    name: n,
    temperature: P(i.temperature, `${s}.temperature`),
    humidity: P(i.humidity, `${s}.humidity`),
    carbon_dioxide: c.entity,
    hasCo2: c.present,
    pm25: p.entity,
    hasPm25: p.present,
    windows: Gi(i, s),
    cover: P(i.cover, `${s}.cover`),
    presets: i.cover_presets === void 0 ? e.presets : jt(i.cover_presets, `${s}.cover_presets`),
    thresholds: l,
    heating: a,
    air_conditioner: P(i.air_conditioner, `${s}.air_conditioner`),
    image: Zi(i, s),
    link: Xi(i.link, s)
  };
}
function Qi(i) {
  (!gt(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && y("the configuration requires a non-empty rooms list."), i.title !== void 0 && typeof i.title != "string" && y("title must be a text (an empty text leaves the heading out).");
  const t = i.theme ?? "auto";
  ye.includes(t) || y(`theme must be one of ${ye.join(", ")}.`);
  const e = P(i.house_mode_entity, "house_mode_entity") ?? Hi, n = F(i.house_modes, "house_modes");
  X(n, ["winter", "summer"], "house_modes");
  const s = {
    winter: it(n.winter, "house_modes.winter") ?? be.winter,
    summer: it(n.summer, "house_modes.summer") ?? be.summer
  };
  Q(s.winter) === Q(s.summer) && y("house_modes.winter and house_modes.summer must differ.");
  const o = i.outside === void 0 ? void 0 : F(i.outside, "outside");
  if (o) {
    X(o, xe, "outside");
    for (const b of xe)
      P(o[b], `outside.${b}`);
  }
  const r = lt(F(i.thresholds, "thresholds"), Di, "thresholds");
  Ze(r, "thresholds");
  const a = lt(F(i.trends, "trends"), Fi, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), l = lt(F(i.history, "history"), Ui, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), c = { ...F(i.covers, "covers") }, p = c.presets;
  delete c.presets;
  const d = c.script;
  delete c.script;
  const h = {
    ...lt(c, { tolerance: Nt.tolerance, stall_seconds: Nt.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Nt.script
  };
  d !== void 0 && ((typeof d != "string" || !/^script\.[a-z0-9_]+$/.test(d.trim())) && y("covers.script must be a script entity such as script.zaluzie_posun."), h.script = d.trim());
  const g = jt(p === void 0 ? ji : p, "covers.presets"), w = i.rooms.map((b, _) => Ji(b, _, { thresholds: r, presets: g })), k = /* @__PURE__ */ new Set();
  for (const b of w)
    k.has(b.name) && y(`room name "${b.name}" is used twice; room names must be unique.`), k.add(b.name);
  return {
    title: i.title ?? "Domov",
    theme: t,
    houseModeEntity: e,
    houseModes: s,
    outside: o,
    thresholds: r,
    trends: a,
    history: l,
    covers: h,
    rooms: w
  };
}
const At = 36e5;
function tn(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function en(i, t) {
  const e = {};
  for (const [n, s] of Object.entries(i ?? {})) {
    if (!Array.isArray(s))
      continue;
    const o = [];
    s.forEach((r, a) => {
      const l = r.s ?? r.state, c = tn(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && c !== void 0 && o.push({ time: Math.max(c, t), state: l });
    }), o.sort((r, a) => r.time - a.time), e[n] = o;
  }
  return e;
}
async function Se(i, t, e, n) {
  if (t.length === 0)
    return {};
  const s = await i.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(n).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return en(s, e);
}
function Xe(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function Bt(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function nn(i, t, e, n) {
  const s = (e - t) / n, o = (i ?? []).filter((r) => Bt(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => Bt(Xe(o, t + (a + 1) * s))
  );
}
function Me(i, t, e) {
  const n = [];
  for (const o of i ?? []) {
    const r = Bt(o.state);
    r !== void 0 && o.time <= e && n.push({ t: Math.max(o.time, t), v: r });
  }
  const s = n[n.length - 1];
  return s && s.t < e && n.push({ t: e, v: s.v }), n;
}
function $t(i, t, e, n) {
  const s = /* @__PURE__ */ new Set([t, e]);
  for (const a of i)
    for (const l of a ?? [])
      l.time > t && l.time < e && s.add(l.time);
  const o = [...s].sort((a, l) => a - l), r = [];
  for (let a = 0; a < o.length - 1; a += 1) {
    const l = n(i.map((p) => Xe(p, o[a])));
    if (l === void 0)
      continue;
    const c = r[r.length - 1];
    c && c.value === l && c.end === o[a] ? c.end = o[a + 1] : r.push({ start: o[a], end: o[a + 1], value: l });
  }
  return r;
}
function Rt(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of i)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), n = Math.max(n, a));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let s = Math.floor(e / t) * t, o = Math.ceil(n / t) * t;
  return o - s < t && (s -= t, o += t), { min: s, max: o };
}
function sn(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function Lt(i, t, e, n) {
  return i !== void 0 && t !== void 0 && Math.abs(i - e.position) <= n && Math.abs(t - e.tilt) <= n;
}
function ot(i, t) {
  return t === "temperature" ? i.temperature_step : t === "co2" ? i.co2_step : i.pm25_step;
}
const u = {
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
}, Ct = {
  off: u.off,
  cool: u.cool,
  wind_free: u.cool,
  dry: u.dry,
  fan: u.plan,
  heat: u.heat,
  auto: u.auto,
  unknown: u.off
}, Ot = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, on = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Je(i) {
  const t = on[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Qe(i) {
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
function Te(i, t, e, n) {
  const { thresholds: s } = n, o = [
    ["teplota", i.temperature],
    ["vlhkost", i.humidity],
    ...n.hasCo2 ? [["CO₂", i.co2]] : [],
    ...n.hasPm25 ? [["PM2.5", i.pm25]] : [],
    ["režim domu", e ? { value: 1 } : void 0]
  ];
  for (const [h, g] of o) {
    if (g?.value === void 0)
      return { label: `Bez dat · ${h}`, color: u.label, kind: "unknown" };
    if (g.stale) {
      const w = g.ageMinutes === void 0 ? "" : ` (před ${ii(g.ageMinutes)})`;
      return { label: `Bez dat · ${h}${w}`, color: u.label, kind: "unknown" };
    }
  }
  const r = i.temperature.value, a = i.humidity.value, l = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? i.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { label: "Znečištěný vzduch", color: u.alert, kind: "critical", cause: "pm25" };
  if (l >= s.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: u.alert, kind: "critical", cause: "co2" };
  if (l >= s.co2_warning)
    return { label: "Vydýchaný vzduch", color: u.warning, kind: "warning", cause: "co2" };
  if (a > s.humidity_max)
    return { label: "Vlhko", color: u.warning, kind: "warning", cause: "humidity" };
  if (a < s.humidity_min)
    return { label: "Sucho", color: u.warning, kind: "warning", cause: "humidity" };
  const p = t ? s.summer_min : s.winter_min, d = t ? s.summer_max : s.winter_max;
  return r > d ? { label: "Teplo", color: u.warning, kind: "warning", cause: "temperature" } : r < p ? { label: "Chladno", color: u.cold, kind: "warning", cause: "temperature" } : { label: "Příjemné", color: u.label, kind: "normal" };
}
function Ee(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function R(i) {
  return i === "" || i === "unknown" || i === "unavailable" || i === "none";
}
function K(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Wt(i) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(i);
}
function ti(i) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(i * 2) / 2
  );
}
function ei(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function rn(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((s) => e(s.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function an(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function ln(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((s) => Object.hasOwn(t, s) && i[s] === t[s]);
}
function ii(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function Ae(i, t) {
  const e = (i ?? []).filter((s) => s !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "stoupá" : n <= -t / 2 ? "klesá" : "stabilní";
}
function Ce(i) {
  const t = Math.max(0, Math.floor(i));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [s, o] = [Math.floor(t / 60), t % 60];
    return o === 0 ? `${s} h` : `${s} h ${o} min`;
  }
  const [e, n] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return n === 0 ? `${e} d` : `${e} d ${n} h`;
}
function Oe(i) {
  const t = Math.max(0, Math.floor(i));
  if (t < 1)
    return "méně než minutu";
  const e = (r, a, l, c) => `${r} ${ft(r, a, l, c)}`;
  if (t < 60)
    return e(t, "minuta", "minuty", "minut");
  if (t < 1440) {
    const [r, a] = [Math.floor(t / 60), t % 60], l = e(r, "hodina", "hodiny", "hodin");
    return a === 0 ? l : `${l} ${e(a, "minuta", "minuty", "minut")}`;
  }
  const [n, s] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)], o = e(n, "den", "dny", "dní");
  return s === 0 ? o : `${o} ${e(s, "hodina", "hodiny", "hodin")}`;
}
function ft(i, t, e, n) {
  return i === 1 ? t : i >= 2 && i <= 4 ? e : n;
}
function Pe(i) {
  const t = Math.max(1, Math.round(i));
  if (t % 60 === 0) {
    const e = t / 60;
    return `${e} ${ft(e, "hodinu", "hodiny", "hodin")}`;
  }
  return `${t} ${ft(t, "minutu", "minuty", "minut")}`;
}
function cn(i) {
  return i === 1 ? "poslední hodinu" : i >= 2 && i <= 4 ? `poslední ${i} hodiny` : `posledních ${i} hodin`;
}
function dn(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function ze() {
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
  ].map(([t, e, n]) => $`<circle cx=${t} cy=${e} r=${n}></circle>`)}
    </svg>
  `;
}
function hn(i) {
  const t = (s, o, r, a) => $`<rect x=${s} y=${o} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (s) => $`<path d="M27.5 6.7V${s}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${s + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (i) {
    case "open":
      n = $`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      n = $`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      n = $`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
  }
  return f`
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
function Kt(i, t) {
  return f`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (e) => $`<path
          d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          style=${`stroke: ${e < i ? u.warning : u.off}`}
          stroke-dasharray=${t ? "1.6 2.6" : m}
        ></path>`
  )}
    </svg>
  `;
}
function kt(i, t, e) {
  let n;
  const s = $`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, o = $`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (i) {
    case "cool":
    case "wind_free":
      n = $`${s}
        <g transform="rotate(60 12 12)">${s}</g>
        <g transform="rotate(120 12 12)">${s}</g>`;
      break;
    case "dry":
      n = $`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      n = $`${o}<g transform="rotate(120 12 12)">${o}</g>
        <g transform="rotate(240 12 12)">${o}</g>`;
      break;
    case "heat":
      n = $`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (r) => $`<path d="M12 3v2.5" transform=${`rotate(${45 * r} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      n = $`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      n = $`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : m}
      aria-hidden="true"
    >
      ${n}
    </svg>
  `;
}
function Ht(i, t) {
  return f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${i}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : m}
      aria-hidden="true"
    >
      <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
      <path d="M12 3.5v17M5 12h14"></path>
    </svg>
  `;
}
function pn(i) {
  let t;
  switch (i) {
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
const z = 4, un = 32, Y = 6, V = 150, L = Y + V, rt = 10, fn = L + 20, Ie = L + 25, mn = L + 50, wt = L + 55, gn = L + 83, Ne = L + 90, bt = 11, vn = [0, 0.24, 0.44, 0.68], Re = "history-under-temperature", Le = "history-plot", $n = 5, wn = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }), Yt = {
  schedule: u.plan,
  manual: u.warning,
  off: u.closed
}, ni = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, si = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" }), oi = new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric" }), O = (i) => `fill: ${i}`, B = (i) => `stroke: ${i}`;
function Dt(i, t) {
  const e = i?.toLowerCase();
  return t?.toLowerCase() === "off" || e === "off" ? "off" : e === "schedule" || e === "manual" ? e : void 0;
}
function He(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const bn = 0.05;
function yn(i, t) {
  const e = i.filter((a) => Number.isFinite(a));
  let n = 19, s = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), s = Math.max(...e), s - n < t) {
      const l = (n + s) / 2;
      n = l - t / 2, s = l + t / 2;
    }
    const a = (s - n) * bn;
    n -= a, s += a;
  }
  const o = s - n, r = o <= 3 ? 0.5 : o <= 6 ? 1 : o <= 12 ? 2 : 5;
  return { min: n, max: s, step: r };
}
function _n(i, t, e) {
  const n = [], s = e / 1e3;
  for (let o = Math.ceil(i / e - s) * e; o <= t + s; o += e)
    n.push(Math.round(o * 100) / 100);
  return n;
}
function xn(i, t, e, n) {
  const s = (S) => S ? i[S] : void 0, { startMs: o, endMs: r } = e, a = s(t.heating?.overlay), l = s(t.heating?.climate), c = Me(s(t.temperature), o, r), p = Me(s(t.humidity), o, r), d = $t([a, l], o, r, ([S, N]) => Dt(S, N)), h = $t(
    [a, l, s(t.heating?.intensity)],
    o,
    r,
    ([S, N, nt]) => {
      const v = Dt(S, N), T = ei(He(nt), t.thresholds);
      return v === void 0 || v === "off" || T === 0 ? void 0 : String(T);
    }
  ), g = $t(
    [a, l, s(t.heating?.target)],
    o,
    r,
    ([S, N, nt]) => {
      const v = Dt(S, N), T = He(nt);
      if (!(T === void 0 || T <= $n))
        return v === "schedule" || v === "manual" ? String(T) : void 0;
    }
  ), w = $t([s(t.air_conditioner)], o, r, ([S]) => {
    const N = Qe(S);
    return N === "unknown" ? void 0 : N;
  }), k = c.map((S) => S.v), { min: b, max: _, step: x } = yn(
    k.length > 0 ? k : g.map((S) => Number(S.value)),
    n.min_temperature_span
  ), C = p.map((S) => S.v);
  return {
    range: e,
    temperature: c,
    humidity: p,
    heating: d,
    intensity: h,
    target: g,
    climate: w,
    tempMin: b,
    tempMax: _,
    tempStep: x,
    humidityMin: C.length > 0 ? Math.min(...C) : void 0,
    humidityMax: C.length > 0 ? Math.max(...C) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function kn(i) {
  return i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function q(i) {
  return i - z - un;
}
function Sn(i, t, e) {
  return z + (i - t.startMs) / (t.endMs - t.startMs) * q(e);
}
function Mn(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - z) / q(t)));
  return e.startMs + n * (e.endMs - e.startMs);
}
function Vt(i, t) {
  let e;
  for (const n of i) {
    if (n.t > t)
      break;
    e = n.v;
  }
  return e;
}
function yt(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
function Tn(i, [t, e]) {
  const n = [];
  if (t === e)
    return n;
  const s = new Date(i.startMs);
  for (s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - 1); s.getTime() < i.endMs; ) {
    const o = new Date(s);
    o.setHours(t, 0, 0, 0);
    const r = new Date(s);
    e < t && r.setDate(r.getDate() + 1), r.setHours(e, 0, 0, 0);
    const a = Math.max(o.getTime(), i.startMs), l = Math.min(r.getTime(), i.endMs);
    l > a && n.push([a, l]), s.setDate(s.getDate() + 1);
  }
  return n;
}
function ri(i) {
  const t = (i.endMs - i.startMs) / At;
  return t <= 12 ? 3 : t <= 24 ? 6 : t <= 48 ? 12 : t <= 96 ? 24 : 48;
}
function En(i) {
  const t = ri(i), e = [], n = new Date(i.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < i.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= i.endMs; )
    n.getTime() >= i.startMs && e.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return e;
}
function An(i, t, e) {
  return i - 16 < t ? { x: t, anchor: "start" } : i + 16 > e ? { x: e, anchor: "end" } : { x: i, anchor: "middle" };
}
function De(i) {
  return i === "off" ? "var(--kd-strip-off)" : Ct[i] ?? u.off;
}
function Cn(i, t) {
  return ri(t) >= 24 ? oi.format(i) : si.format(i);
}
function W(i, t, e = "block") {
  return f`<span class="legend-item">
    <span class="legend-swatch ${e}" style=${e === "block" ? `background: ${i}` : `border-color: ${i}`}></span
    >${t}
  </span>`;
}
function On(i, t) {
  const e = t ?? i.range.endMs, n = Vt(i.temperature, e), s = Vt(i.humidity, e), o = yt(i.heating, e, i.range.endMs), r = Number(yt(i.intensity, e, i.range.endMs) ?? 0), a = yt(i.target, e, i.range.endMs), l = yt(i.climate, e, i.range.endMs);
  let c = "Teď";
  if (t !== void 0) {
    const g = (b) => {
      const _ = new Date(b);
      return _.setHours(12, 0, 0, 0), _.getTime();
    }, w = Math.round((g(i.range.endMs) - g(t)) / (24 * At));
    c = `${w === 0 ? "" : w === 1 ? "včera " : `${oi.format(t)} `}${si.format(t)}`;
  }
  const p = o === void 0 ? "––" : `${ni[o]}${o !== "off" && a !== void 0 ? ` · ${ti(Number(a))} °C` : ""}`, d = l ? Ot[l] : "––", h = l ? Ct[l] : u.off;
  return f`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${c}</span>
        <span class="readout-temp">${n === void 0 ? "––" : `${Wt(n)} °C`}</span>
        <span class="readout-hum">${s === void 0 ? "" : `${Math.round(s)} %`}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${o ? Yt[o] : u.label}`}>
          <span class="readout-icon">${Kt(o && o !== "off" ? r : 0, o === void 0)}</span>
          Topení ${p}
        </span>
        <span class="readout-system" style=${`color: ${h}`}>
          <span class="readout-icon">${kt(l ?? "off", h, l === void 0)}</span>
          Klimatizace ${d}
        </span>
      </div>
    </div>
  `;
}
function Pn(i, t, e) {
  const { range: n } = i, s = (v) => Sn(v, n, t), o = (v) => L - (v - i.tempMin) / (i.tempMax - i.tempMin) * V, r = (i.humidityMin ?? 0) - 3, a = Math.max((i.humidityMax ?? 100) + 3, r + 12), l = (v) => L - (v - r) / (a - r) * V, c = z + q(t), p = (v, T) => v.map((H, D) => `${D === 0 ? "M" : "L"}${s(H.t).toFixed(1)} ${T(H.v).toFixed(1)}`).join(" "), d = p(i.temperature, o), h = i.temperature[0], g = i.temperature[i.temperature.length - 1], w = h && g ? `${d} L${s(g.t).toFixed(1)} ${L} L${s(h.t).toFixed(1)} ${L} Z` : "";
  let k = "";
  i.target.forEach((v, T) => {
    const H = o(Number(v.value)).toFixed(1), D = i.target[T - 1];
    k += D && D.end === v.start ? ` L${s(v.start).toFixed(1)} ${H}` : ` M${s(v.start).toFixed(1)} ${H}`, k += ` L${s(v.end).toFixed(1)} ${H}`;
  });
  const b = _n(i.tempMin, i.tempMax, i.tempStep), _ = (v, T, H) => v.map((D) => {
    const oe = s(D.start);
    return $`<rect x=${oe.toFixed(1)} y=${T} width=${Math.max(s(D.end) - oe, 0.8).toFixed(1)}
        height=${rt} rx="2" style=${O(H(D.value))}></rect>`;
  }), x = e === void 0 ? void 0 : s(e), C = e === void 0 ? void 0 : Vt(i.temperature, e), S = Tn(n, i.night), N = ["schedule", "manual", "off"].filter((v) => i.heating.some((T) => T.value === v)), nt = [...new Set(i.climate.map((v) => v.value))];
  return f`
    ${On(i, e)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${Ne}"
      width=${t}
      height=${Ne}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${Re}><path d=${w}></path></clipPath>
        <clipPath id=${Le}>
          <rect x=${z} y=${Y} width=${q(t)} height=${V}></rect>
        </clipPath>
      </defs>
      <rect x=${z} y=${Y} width=${q(t)} height=${V} rx="8" style=${O("var(--kd-fill)")}></rect>
      ${S.map(
    ([v, T]) => $`<rect class="night" x=${s(v).toFixed(1)} y=${Y} width=${(s(T) - s(v)).toFixed(1)}
          height=${V} style=${O("var(--kd-night)")}></rect>`
  )}
      ${b.map(
    (v) => $`<line x1=${z} x2=${c} y1=${o(v).toFixed(1)} y2=${o(v).toFixed(1)}
            style=${B("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${c + 6} y=${(o(v) + 4).toFixed(1)} style=${O(u.label)} font-size=${bt}>${wn.format(v)}°</text>`
  )}
      ${w ? $`<path d=${w} style=${O("var(--kd-area)")}></path>` : m}
      <g clip-path=${`url(#${Re})`}>
        ${i.intensity.map(
    (v) => $`<rect x=${s(v.start).toFixed(1)} y=${Y}
            width=${Math.max(s(v.end) - s(v.start), 0.8).toFixed(1)} height=${V}
            style=${O(u.warning)} opacity=${vn[Number(v.value)] ?? 0}></rect>`
  )}
      </g>
      ${i.humidity.length > 0 ? $`<path d=${p(i.humidity, l)} fill="none" style=${B(u.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : m}
      ${k ? $`<path d=${k} fill="none" style=${B(u.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${Le})`}></path>` : m}
      ${d ? $`<path class="temperature-curve" d=${d} fill="none" style=${B(u.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : m}
      ${g && e === void 0 ? $`<circle cx=${s(g.t).toFixed(1)} cy=${o(g.v).toFixed(1)} r="3.5" style=${O(u.white)}></circle>` : m}

      <text x=${z} y=${fn} style=${O(u.label)} font-size=${bt}>Topení</text>
      <rect x=${z} y=${Ie} width=${q(t)} height=${rt} rx="2" style=${O("var(--kd-fill)")}></rect>
      ${_(i.heating, Ie, (v) => Yt[v] ?? u.off)}
      <text x=${z} y=${mn} style=${O(u.label)} font-size=${bt}>Klimatizace</text>
      <rect x=${z} y=${wt} width=${q(t)} height=${rt} rx="2" style=${O("var(--kd-fill)")}></rect>
      ${_(i.climate, wt, (v) => De(v))}

      ${En(n).map((v) => {
    const T = An(s(v), z, c);
    return $`<line x1=${s(v).toFixed(1)} x2=${s(v).toFixed(1)} y1=${Y} y2=${wt + rt}
            style=${B("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${T.x.toFixed(1)} y=${gn} style=${O(u.label)} font-size=${bt}
            text-anchor=${T.anchor}>${Cn(v, n)}</text>`;
  })}
      ${x === void 0 ? m : $`<line x1=${x.toFixed(1)} x2=${x.toFixed(1)} y1=${Y} y2=${wt + rt}
              style=${B(u.white)} stroke-width="1" opacity="0.7"></line>
            ${C === void 0 ? m : $`<circle cx=${x.toFixed(1)} cy=${o(C).toFixed(1)} r="4"
                  style=${`${O(u.white)}; ${B("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${W(u.white, "Teplota", "line")}
      ${i.target.length > 0 ? W(u.plan, "Cíl topení", "dashed") : m}
      ${i.intensity.length > 0 ? W(u.warning, "Vytápění (sytost = výkon)") : m}
      ${i.humidityMin !== void 0 && i.humidityMax !== void 0 ? W(
    u.humidityLine,
    `Vlhkost ${Math.round(i.humidityMin)}–${Math.round(i.humidityMax)} %`,
    "dashed"
  ) : m}
      ${S.length > 0 ? W("var(--kd-night-swatch)", `Noc ${i.night[0]}–${i.night[1]} h`) : m}
    </div>
    <div class="legend">
      ${N.map((v) => W(Yt[v], `Topení ${ni[v]}`))}
      ${nt.map((v) => W(De(v), `Klimatizace ${Ot[v]}`))}
    </div>
  `;
}
const Fe = At / 4;
function zn(i) {
  return `var(--kd-scene-${i})`;
}
function In(i) {
  let t;
  switch (i) {
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
const Nn = di`
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
      --kd-strip-off: #8e8e93;
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
      --kd-notice-tint: 16%;
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
      --kd-night-swatch: rgb(0 0 0 / 55%);
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
      --kd-strip-off: #d1d1d6;
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
      --kd-notice-tint: 8%;
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
      --kd-night-swatch: rgb(0 0 0 / 14%);
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
      background: color-mix(in srgb, var(--chip-color) var(--kd-chip-tint), var(--kd-card-bg));
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
      background: color-mix(in srgb, var(--kd-warning) var(--kd-notice-tint), transparent);
      color: var(--kd-warning);
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

    /* Invisible touch target of 44 px in height (TODO P1.2). */
    .humidity::after {
      content: "";
      position: absolute;
      inset: -8px 0;
    }

    .missing {
      color: var(--kd-off);
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
    }

    .sheet {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
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

    /* Topení | Klimatizace in the HVAC popup (iOS segmented control). */
    .segmented {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: 2px;
      margin: 4px 0 14px;
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

    /* „Historie místnosti – 24 h“ (history.hours): readout, chart 1:1 in CSS pixels, legend. */
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

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      margin-top: 8px;
      color: var(--kd-label);
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
`, Rn = " ";
function Ue(i) {
  if (!i || R(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function qt(i) {
  return i === void 0 ? "" : `· ${ti(i)}${Rn}°C`;
}
function Ln(i, t, e, n, s) {
  const o = i?.state.toLowerCase(), r = t?.state.toLowerCase(), a = r === void 0 || R(r), l = o === "off" || r === "off", c = Ue(e);
  if (l)
    return { label: "Vypnuto", color: u.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (a || o === void 0 || R(o))
    return { label: "––", color: u.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const p = ei(Ue(n), s);
  return r === "schedule" ? { label: "Plán", color: u.plan, active: !0, extra: qt(c), unknown: !1, overlay: "schedule", waves: p } : r === "manual" ? { label: "Ručně", color: u.warning, active: !0, extra: qt(c), unknown: !1, overlay: "manual", waves: p } : { label: t?.state ?? "––", color: u.warning, active: !0, extra: "", unknown: !1, waves: p };
}
function ee(i) {
  let t = "unknown", e, n;
  if (i && !R(i.state.toLowerCase())) {
    const o = i.state.toLowerCase(), r = String(i.attributes.preset_mode ?? "none").toLowerCase();
    o === "off" ? t = "off" : o === "cool" ? t = r === "wind_free" ? "wind_free" : "cool" : o === "dry" ? t = "dry" : o === "fan_only" ? t = "fan" : o === "heat" ? t = "heat" : (o === "auto" || o === "heat_cool") && (t = "auto"), t !== "off" && t !== "unknown" && t !== "wind_free" && r !== "none" && r !== "" && (e = Je(r)), n = K(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(t);
  return {
    mode: t,
    label: e ?? Ot[t],
    color: Ct[t],
    active: t !== "off" && t !== "unknown",
    extra: s ? qt(n) : "",
    unknown: t === "unknown"
  };
}
function Hn(i) {
  const t = i.unknown ? "neznámý stav" : i.label;
  return i.extra ? `${t} ${i.extra.replace(/^·\s*/, "")}` : t;
}
const Dn = ["místnost", "místnosti", "místností"];
function ai(i) {
  return `${i} ${ft(i, ...Dn)}`;
}
function Ft(i) {
  return i.length <= 2 ? i.join(", ") : ai(i.length);
}
function ie(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function ne(i, t) {
  return Ln(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds
  );
}
function li(i, t, e) {
  const n = ie(i, t).length > 0, s = ne(i, t), o = i.air_conditioner ? ee(t(i.air_conditioner)).mode : "unknown", r = !s.unknown && s.waves > 0 || o === "heat", a = o === "cool" || o === "wind_free", l = [];
  return n && r && l.push("window-heating"), n && a ? l.push("window-cooling") : a && e && l.push("cooling-cold"), l;
}
function Fn(i, t, e = /* @__PURE__ */ new Set()) {
  const n = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, s = [], o = [], r = [], a = [];
  for (const d of i) {
    for (const w of li(d, t, e.has(d.name)))
      n[w].push(d.name);
    const h = ie(d, t).length;
    h > 0 && s.push([d.name, h]);
    const g = ne(d, t);
    g.overlay === "manual" && o.push(d.name), g.waves > 0 && r.push(d.name), d.air_conditioner && ee(t(d.air_conditioner)).active && a.push(d.name);
  }
  const l = [], c = [
    ["window-heating", "conflict-window", "Okno otevřené · topí se", "Okno je otevřené a topí se"],
    ["window-cooling", "conflict-window", "Okno otevřené · chladí se", "Okno je otevřené a chladí se"],
    ["cooling-cold", "conflict-cooling", "Chladí se, i když je chladno", "Chladí se, i když je chladno"]
  ];
  for (const [d, h, g, w] of c)
    n[d].length > 0 && l.push({
      kind: h,
      text: `${g}: ${Ft(n[d])}`,
      color: u.warning,
      spoken: `Konflikt: ${w}: ${n[d].join(", ")}`
    });
  const p = s.reduce((d, [, h]) => d + h, 0);
  return p > 0 && l.push({
    kind: "windows",
    text: `${p} ${ft(p, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    color: u.sky,
    spoken: `Otevřená okna: ${s.map(([d, h]) => h > 1 ? `${d} (${h})` : d).join(", ")}`
  }), o.length > 0 && l.push({
    kind: "manual",
    text: `Ručně: ${Ft(o)}`,
    color: u.warning,
    spoken: `Topení ručně: ${o.join(", ")}`
  }), r.length > 0 && l.push({
    kind: "heating",
    text: `Topí ${ai(r.length)}`,
    color: u.warning,
    spoken: `Topí se: ${r.join(", ")}`
  }), a.length > 0 && l.push({
    kind: "climate",
    text: `Klimatizace: ${Ft(a)}`,
    color: u.cool,
    spoken: `Klimatizace zapnutá: ${a.join(", ")}`
  }), l;
}
var Un = Object.defineProperty, E = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, r; o >= 0; o--)
    (r = i[o]) && (s = r(t, e, s) || s);
  return s && Un(t, e, s), s;
};
const jn = 5 * 6e4, Bn = 3e4, Wn = 8e3, I = " ", Kn = 550, je = 400, Yn = 700, Vn = 1600, qn = 100, Gn = 0.6, Zn = 6, Xn = ["off", "cool", "dry", "fan_only", "auto", "heat"], at = { heating: "Topení", climate: "Klimatizace" }, se = class se extends dt {
  constructor() {
    super(...arguments), this._historyStatus = "loading", this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!e || !n)
        return;
      const s = n.getBoundingClientRect(), o = this.chartWidth();
      this._scrubTime = Mn((t.clientX - s.left) * o / Math.max(s.width, 1), o, e.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const e = this._historyModel;
      if (!e)
        return;
      const { startMs: n, endMs: s } = e.range, o = this._scrubTime ?? s;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const r = o + (t.key === "ArrowLeft" ? -Fe : Fe);
        this._scrubTime = r >= s ? void 0 : Math.max(n, r);
      } else if (t.key === "Home")
        this._scrubTime = n;
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
      const n = t.clientY - e.startY;
      if (!e.dragging) {
        if (n < Zn)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const n = Math.max(0, t.clientY - e.startY), s = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > qn || s > Gn) ? this.closeSheet() : this._dragY = 0;
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
      const n = this.renderRoot.activeElement, s = n ? e.indexOf(n) : -1, o = t.shiftKey ? e[s <= 0 ? e.length - 1 : s - 1] : e[s === -1 || s === e.length - 1 ? 0 : s + 1];
      t.preventDefault(), o.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Qi(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, Bn), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize);
    for (const t of [this._noticeTimer, this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._noticeTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const e = t.get("hass");
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e);
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
    }, jn)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => ie(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of rn(this._config)) {
      const n = t.states[e], s = this.hass.states[e];
      if (n?.state !== s?.state || n?.last_updated !== s?.last_updated || !ln(n?.attributes, s?.attributes))
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
    const t = Q(this.entityState(this._config.houseModeEntity) ?? ""), e = t === Q(this._config.houseModes.summer), n = e || t === Q(this._config.houseModes.winter), s = this.trendAxes(this._config), o = Date.now(), r = this._config.title, a = this.renderOutside(), l = Fn(
      this._config.rooms,
      (p) => this.getState(p),
      this.coldRooms(e, n, o)
    ), c = r !== "" || a !== m || l.length > 0;
    return f`
      <ha-card>
        <div class="dashboard">
          ${c ? f`<header class="dashboard-header">
                ${r === "" ? m : f`<h1>${r}</h1>`}
                ${a} ${this.renderSummary(l)}
              </header>` : m}
          ${this._notice ? f`<div class="notice" role="alert">${this._notice}</div>` : m}
          <div class="rooms">
            ${this._config.rooms.map(
      (p, d) => this.renderRoom(p, d, e, n, s, o)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, e, n) {
    const s = /* @__PURE__ */ new Set();
    for (const o of this._config?.rooms ?? []) {
      const r = o.thresholds.stale_minutes;
      Te(
        {
          temperature: this.reading(o.temperature, r, n),
          humidity: this.reading(o.humidity, r, n),
          co2: this.reading(o.carbon_dioxide, r, n),
          pm25: this.reading(o.pm25, r, n)
        },
        t,
        e,
        o
      ).label === "Chladno" && s.add(o.name);
    }
    return s;
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (n) => t.rooms.map((s) => {
      const o = n(s);
      return o ? this._trends[o] : void 0;
    });
    return {
      temperature: Rt(e((n) => n.temperature), ot(t.trends, "temperature")),
      co2: Rt(e((n) => n.carbon_dioxide), ot(t.trends, "co2")),
      pm25: Rt(e((n) => n.pm25), ot(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), n = this.numberState(t.temperature), s = this.numberState(t.minimum), o = this.numberState(t.maximum), r = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = s !== void 0 && o !== void 0 ? `${e.format(s)}–${e.format(o)}${I}°C` : void 0, c = [
      n === void 0 ? void 0 : `${e.format(n)}${I}°C`,
      l,
      r === void 0 ? void 0 : `☂${I}${e.format(r)}${I}%`
    ].filter((g) => g !== void 0), p = this._config.thresholds;
    let d = "––", h = u.label;
    return a !== void 0 && (a >= p.pm25_critical ? (d = "špatný", h = u.alert) : a >= p.pm25_warning ? (d = "zhoršený", h = u.warning) : d = "dobrý"), c.length === 0 && !t.pm25 ? m : f`<div class="outside">
      ${c.length > 0 ? f`<div>${c.join(" · ")}</div>` : m}
      ${t.pm25 ? f`<div>Vzduch venku: <span style=${`color: ${h}`}>${d}</span></div>` : m}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? m : f`<ul class="summary" aria-label="Souhrn domu">
      ${t.map((e) => {
      const n = e.kind === "windows" || e.kind === "conflict-window" ? Ht(e.color, !1) : e.kind === "climate" || e.kind === "conflict-cooling" ? kt("cool", e.color, !1) : Kt(3, !1);
      return f`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, s, o, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), c = this.reading(t.humidity, a, r), p = this.reading(t.carbon_dioxide, a, r), d = this.reading(t.pm25, a, r), h = Te({ temperature: l, humidity: c, co2: p, pm25: d }, n, s, t), g = t.image, w = (b) => h.cause === b ? `color: ${h.color}` : m, k = li(t, (b) => this.getState(b), h.label === "Chladno");
    return f`
      <div class="room-cell"><article
        class="room"
        aria-label=${t.name}
        style=${g?.kind === "scene" ? `--scene-tone: ${zn(g.scene)}` : m}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${h.kind === "unknown" ? `border: 1.5px solid ${u.off}` : `background: ${h.color}`}
          ></span>
          <span style=${`color: ${h.color}; font-weight: ${h.kind === "normal" ? 400 : 500}`}>
            ${h.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${w("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? m}
            aria-label=${`${t.name}: teplota ${l.value === void 0 ? "neznámá" : `${Wt(l.value)} °C`}${this.staleSpoken(l)}, historie místnosti za ${this.historyPeriod()}`}
            @click=${(b) => this.openSheet("history", t, b)}
          >
            ${l.value === void 0 ? f`<span class="missing">––</span>` : f`${Wt(l.value)}<span class="temperature-unit">${I}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${c.stale ? "stale" : ""}"
            style=${w("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(c) ?? m}
            aria-label=${`${t.name}: vlhkost ${c.value === void 0 ? "neznámá" : `${Math.round(c.value)} %`}${this.staleSpoken(c)}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${c.value === void 0 ? f`<span class="missing">––</span>` : f`${Math.round(c.value)}${I}%`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, e, p, d, o)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, o.temperature)}
            ${this.renderWindow(t, e, k, r)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : f`<div class="cover-panel" aria-hidden="true"></div>
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
    return e ? e.kind === "scene" ? f`<div class="scene" aria-hidden="true">${In(e.scene)}</div>` : f`<div class="scene photo" aria-hidden="true">
      <img src=${e.url} alt="" loading="lazy" decoding="async" />
    </div>` : m;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = t.link;
    if (!n)
      return f`<div class="room-title">${t.name}</div>`;
    const s = `link-description-${e}`;
    return f`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${s}
        @click=${() => this.openLink(n)}
      >
        <span class="room-name">${t.name}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${s}>${n.startsWith("/") ? "Otevře stránku místnosti." : "Otevře odkaz."}</span>
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
  /** The room history period after "za": "24 hodin". */
  historyPeriod() {
    return Pe((this._config?.history.hours ?? 24) * 60);
  }
  /** The micro trend period after "za": "2 hodiny". */
  trendPeriod() {
    return Pe(this._config?.trends.minutes ?? 120);
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === u.alert ? u.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, n) {
    return t.value === void 0 || t.stale ? u.label : t.value >= n ? u.alert : t.value >= e ? u.warning : u.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, e, n, s, o) {
    if (!t.hasCo2 && !t.hasPm25)
      return m;
    const { thresholds: r } = t, a = this._config.trends, l = [t.carbon_dioxide, t.pm25].filter((g) => !!g), c = (g, w, k, b, _, x) => {
      if (!w || !k)
        return;
      const C = b.value === void 0 ? void 0 : Ae(this._trends[k], ot(a, x));
      return `${g} ${b.value === void 0 ? "neznámé" : `${Math.round(b.value)} ${_}`}${C ? `, za ${this.trendPeriod()} ${C}` : ""}${this.staleSpoken(b)}`;
    }, p = [
      c("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      c("PM2.5", t.hasPm25, t.pm25, s, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), d = l.length > 1, h = `air-description-${e}`;
    return f`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${l.length === 0}
        aria-haspopup=${d ? "dialog" : m}
        aria-describedby=${h}
        @click=${(g) => d ? this.openSheet("air", t, g) : this.showMoreInfo(l[0])}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      f`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      o.co2
    ) : m}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      ze(),
      s,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      o.pm25
    ) : m}
      </button>
      <span class="sr-only" id=${h}
        >${`${t.name}: kvalita vzduchu, ${p || "bez čidla"}. ${d ? "Otevře detaily." : "Otevře detail a historii."}`}</span
      >
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, e) {
    const { thresholds: n } = t, s = n.stale_minutes, o = [
      { slot: "co2", label: "CO₂", unit: "ppm", present: t.hasCo2, entityId: t.carbon_dioxide, warning: n.co2_warning, critical: n.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", present: t.hasPm25, entityId: t.pm25, warning: n.pm25_warning, critical: n.pm25_critical }
    ].filter((r) => r.present);
    return f`
      <div class="options list-options" role="group" aria-label="Kvalita vzduchu">
        ${o.map(({ slot: r, label: a, unit: l, entityId: c, warning: p, critical: d }) => {
      const h = this.reading(c, s, e), g = h.value !== void 0, w = g && !h.stale ? u[r] : u.off;
      return f`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!c}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(c);
      }}
          >
            <span class="option-icon" style=${`color: ${w}`} aria-hidden="true">
              ${r === "co2" ? f`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : ze()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">Detail a historie</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(h, p, d))}`}>
              ${g ? `${Math.round(h.value)} ${l}` : f`<span aria-hidden="true">––</span><span class="sr-only">neznámé</span>`}
            </span>
            ${h.stale ? f`<span class="sr-only">${this.staleSpoken(h)}</span>` : m}
          </button>`;
    })}
      </div>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, e, n, s, o, r, a, l) {
    const c = s.value !== void 0, p = Math.round(s.value ?? 0), d = this.airColor(s, r, a), h = u[t];
    return f`
      <div class="air-row slot-${t}" title=${this.staleTitle(s) ?? m}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${c && !s.stale ? h : u.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${c ? f`<span class="row-label" style=${`color: ${d}`}>${p}</span>
                  <span class="row-unit">${o}</span>` : f`<span class="row-label" style=${`color: ${u.label}`}>––</span>`}
          </span>
        </span>
        ${c ? this.renderSpark(e, l, h, s.stale === !0) : m}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, n) {
    if (!t.temperature || e.value === void 0)
      return m;
    const s = this.renderSpark(t.temperature, n, u.peach, e.stale === !0);
    if (s === m)
      return m;
    const o = Ae(this._trends[t.temperature], ot(this._config.trends, "temperature"));
    return f`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: teplota za ${this.trendPeriod()}${o ? ` ${o}` : ""}, historie místnosti za ${this.historyPeriod()}`}
        @click=${(r) => this.openSheet("history", t, r)}
      >
        ${s}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last `trends.minutes` (120) as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  renderSpark(t, e, n, s) {
    if (!t)
      return m;
    if (!this._trendsLoaded)
      return f`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    const o = this._trends[t];
    if (!o || !e)
      return m;
    const r = sn(o, e).map(
      (d, h) => d === void 0 ? void 0 : { x: h / Math.max(1, o.length - 1) * 100, y: (1 - d) * 100 }
    ).filter((d) => d !== void 0);
    if (r.length < 2)
      return m;
    const a = r.map((d) => `${d.x.toFixed(2)},${d.y.toFixed(2)}`).join(" "), l = r[0], c = r[r.length - 1], p = `${a} ${c.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return f`<span class="spark ${s ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${p} fill="currentColor" fill-opacity="0.08"></polygon>
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
    const s = ne(t, (h) => this.getState(h)), o = ee(this.getState(t.air_conditioner)), r = (h) => this.renderSystemRow(Kt(s.unknown ? 0 : s.waves, s.unknown), s, h), a = (h) => this.renderSystemRow(kt(o.mode, o.color, o.unknown), o, h), l = e ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, l), p = l.map((h) => `${at[h]} ${Hn(h === "heating" ? s : o)}`).join(", "), d = `hvac-description-${n}`;
    return f`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${d}
        @click=${(h) => c ? this.openSheet(c, t, h) : void 0}
      >
        ${e ? a(!0) : r(!0)}
        ${e ? r(!1) : a(!1)}
      </button>
      <span class="sr-only" id=${d}
        >${`${t.name}: ${p}.${c ? ` Otevře ovládání ${at[c]}.` : ""}`}</span
      >
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, e) {
    const n = (s) => s === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
    return e.find(n);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, e, n) {
    return f`
      <span
        class="system-row ${n && e.active ? "strong" : ""}"
        style=${`--row-color: ${e.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${e.label}</span>
            ${e.extra ? f`<span class="row-unit">${e.extra}</span>` : m}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, e) {
    const n = this.getState(t), s = n?.state.toLowerCase();
    if (s === void 0 || R(s))
      return { state: "unknown" };
    if (s !== "on")
      return { state: "closed" };
    const o = Date.parse(n?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(o) ? void 0 : Math.max(0, (e - o) / 6e4) };
  }
  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  renderWindow(t, e, n, s) {
    const o = t.windows.map((x) => ({ window: x, ...this.windowState(x.entity, s) })), r = o.filter((x) => x.state === "open"), a = r.length > 0, l = !a && (o.length === 0 || o.some((x) => x.state === "unknown")), c = t.windows.length > 1, p = a ? u.sky : u.label, d = a ? r.length > 1 ? `Otevřena${I}${r.length}` : "Otevřeno" : l ? "––" : "Zavřeno", h = r.map((x) => x.minutesOpen).filter((x) => x !== void 0), g = h.length > 0 ? Math.max(...h) : void 0, w = n.includes("window-heating") ? "otevřené okno při topení" : n.includes("window-cooling") ? "otevřené okno při chlazení" : void 0, k = `window-description-${e}`;
    let b;
    if (!c)
      b = l ? "okno neznámé" : `okno ${a ? "otevřené" : "zavřené"}${g === void 0 ? "" : `, otevřené ${Oe(g)}`}`;
    else if (a) {
      const x = r.map((S) => S.window.name).join(", "), C = g === void 0 ? "" : ` ${Oe(g)}`;
      b = r.length === 1 ? `okno ${x} otevřené${C}` : `otevřená okna ${x}${C ? `, nejdéle${C}` : ""}`;
    } else
      b = l ? "stav oken neznámý" : "všechna okna zavřená";
    const _ = t.windows[0]?.entity;
    return f`
      <button
        type="button"
        class="plain-button system-row slot-window ${a ? "strong" : ""}"
        style=${`--row-color: ${p}`}
        ?disabled=${!_}
        aria-haspopup=${c ? "dialog" : m}
        aria-describedby=${k}
        @click=${(x) => c ? this.openSheet("windows", t, x) : this.showMoreInfo(_)}
      >
        <span class="row-main">
          <span class="row-icon">${Ht(l ? u.off : p, l)}</span>
          <span class="row-text">
            <span class="row-label">${d}</span>
            ${w ? f`<span class="conflict-dot" aria-hidden="true"></span>` : m}
            ${g === void 0 ? m : f`<span class="row-unit window-duration"
                  >${`${w ? "" : `${I}·${I}`}${Ce(g)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${k}
        >${`${t.name}: ${b}${w ? `; konflikt: ${w}` : ""}. ${c ? "Otevře přehled oken." : "Otevře detail a historii."}`}</span
      >
    `;
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, e) {
    return f`
      <div class="options list-options" role="group" aria-label="Okna">
        ${t.windows.map((n) => {
      const { state: s, minutesOpen: o } = this.windowState(n.entity, e), r = s === "unknown", a = s === "open" ? u.sky : u.label;
      return f`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(n.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Ht(r ? u.off : a, r)}</span>
            <span class="option-text">
              <span>${n.name}</span>
              <span class="option-hint">Detail a historie</span>
            </span>
            <span class="list-value" style=${`color: ${a}`}>
              ${r ? f`<span aria-hidden="true">––</span><span class="sr-only">neznámé</span>` : s === "open" ? "Otevřeno" : "Zavřeno"}${o === void 0 ? m : f`<span class="list-extra">${I}·${I}${Ce(o)}</span>`}
            </span>
          </button>`;
    })}
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const n = this.getState(e), s = n?.state.toLowerCase(), o = s !== void 0 && !R(s), r = o ? K(n?.attributes.current_position) : void 0, a = o ? K(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, c = s === "opening" || s === "closing", p = `${l ? `poloha ${Math.round(r)} %, naklopení ${Math.round(a)} %` : "poloha nebo naklopení neznámé"}${c ? ", pohybuje se" : ""}`;
    return f`
      <button
        type="button"
        class="plain-button cover-panel ${c ? "moving" : ""}"
        aria-label=${`${t.name}: žaluzie, ${p}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${xt} ${Ut}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${Li(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${t.presets.map((d) => this.renderPreset(t, d, r, a, o))}
      </div>
    `;
  }
  renderPreset(t, e, n, s, o) {
    const r = this._moving[t.name], a = r === e.id, l = r === void 0 && Lt(n, s, e, this.tolerance()), c = `${t.name}|${e.id}`, p = o ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná.";
    return f`
      <button
        type="button"
        class="plain-button preset ${this._flash === c ? "sent" : ""} ${o ? "" : "unavailable"} ${a ? "pending" : ""}"
        title=${e.label}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : m}
        aria-disabled=${o ? "false" : "true"}
        aria-label=${`${t.name}: žaluzie ${e.label}, ${e.description}. ${p}`}
        @pointerdown=${(d) => this.pressStart(d, t, e, o)}
        @pointerup=${() => this.pressEnd(t, e, o)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(d) => d.preventDefault()}
        @click=${(d) => {
      d.detail === 0 && (o ? this.applyPreset(t, e) : this.showUnavailable(c));
    }}
      >
        ${hn(e.icon)}
        ${this._hint?.key === c ? f`<span class="preset-hint" role="status">${this._hint.text}</span>` : m}
      </button>
    `;
  }
  pressStart(t, e, n, s) {
    t.button !== 0 || !s || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, n);
    }, Kn));
  }
  pressEnd(t, e, n) {
    const s = `${t.name}|${e.id}`;
    if (!n) {
      this.showUnavailable(s);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const o = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !o || r)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === s && a - this._lastTap.time <= je) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, e);
      return;
    }
    this._lastTap = { key: s, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === s && (this._lastTap = void 0, this.showHint(s, "Podržte nebo klepněte dvakrát", "selection"));
    }, je);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, "Žaluzie je nedostupná", "warning");
  }
  showHint(t, e, n) {
    this._hint = { key: t, text: e }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, Vn);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || R(n)) {
      this.showUnavailable(`${t.name}|${e.id}`);
      return;
    }
    this.startMoving(t, t.cover, e);
    try {
      const [s, o] = this._config.covers.script.split(".");
      await this.hass.callService(s, o, {
        entity: t.cover,
        pos: e.position,
        tilt: e.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, Yn);
    } catch (s) {
      console.error("Klima Dashboard: skript žaluzií selhal", s), this.endMoving(t.name), this.haptic("failure"), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, e, n) {
    const s = this.getState(e);
    if (Lt(
      K(s?.attributes.current_position),
      K(s?.attributes.current_tilt_position),
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
      const e = this._moving[t.name], n = t.presets.find((l) => l.id === e), s = this._movingWatch.get(t.name);
      if (!n || !s || !t.cover)
        continue;
      const o = this.getState(t.cover), r = o?.state.toLowerCase();
      if (r === void 0 || R(r) || Lt(
        K(o?.attributes.current_position),
        K(o?.attributes.current_tilt_position),
        n,
        this.tolerance()
      ) && !this.isMoving(t.cover)) {
        this.endMoving(t.name);
        continue;
      }
      const a = this.coverSignature(t.cover);
      a !== s.signature && (s.signature = a, this.armStall(t.name));
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
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, Wn);
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const e = this._sheet;
    return e ? e.kind === "history" ? this.renderSheetFrame(
      `Historie místnosti – ${this._config?.history.hours ?? 24} h`,
      e.room.name,
      this.renderHistoryBody(e.room),
      "history-sheet"
    ) : e.kind === "air" ? this.renderSheetFrame("Kvalita vzduchu", e.room.name, this.renderAirBody(e.room, Date.now())) : e.kind === "windows" ? this.renderSheetFrame("Okna", e.room.name, this.renderWindowsBody(e.room, Date.now())) : this.renderSheetFrame(e.room.name, void 0, this.renderHvacBody(e.room, e.kind, t)) : m;
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, n, s = "") {
    const o = this._drag?.dragging === !0;
    return f`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
      >
        <div
          class="sheet ${s} ${o ? "dragging" : ""}"
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : m}
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
                ${e ? f`<div class="sheet-sub">${e}</div>` : m}
              </div>
              <button type="button" class="plain-button close" aria-label="Zavřít" @click=${() => this.closeSheet()}>
                ✕
              </button>
            </div>
          </div>
          ${n}
        </div>
      </div>
    `;
  }
  /** Topení / Klimatizace controls, with a segmented control to switch between the two. */
  renderHvacBody(t, e, n) {
    const s = e === "heating", o = s ? t.heating?.climate : t.air_conditioner, r = this.getState(o), a = r !== void 0 && !R(r.state.toLowerCase()), l = Ee(r?.attributes.hvac_modes), c = Ee(r?.attributes.preset_modes), p = r?.state.toLowerCase(), d = String(r?.attributes.preset_mode ?? "none").toLowerCase(), h = !a || !o ? [] : s ? this.heatingOptions(o, l, c, p, d) : this.climateOptions(o, l, p), g = !s && a && o ? c.filter((_) => _ !== "none") : [], w = n ? ["climate", "heating"] : ["heating", "climate"], k = !!t.heating?.climate && !!t.air_conditioner, b = f`
      ${a ? h.length === 0 ? f`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : f`<div class="options" role="group" aria-label=${`${at[e]}: režim`}>
              ${h.map((_) => this.renderOption(_))}
            </div>` : f`<p class="sheet-message">Entita je nedostupná.</p>`}
      ${g.length > 0 ? f`<div class="sheet-label" id="preset-label">Předvolby</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${g.map((_) => this.renderPresetChip(o, _, d, p, c))}
            </div>` : m}
      ${this._sheetError ? f`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : m}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!o}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(o);
    }}
      >
        Detail a historie
      </button>
    `;
    return k ? f`
      <div
        class="segmented"
        role="tablist"
        aria-label="Systém"
        @keydown=${(_) => this.segmentKeydown(_, w, e)}
      >
        ${w.map(
      (_) => f`<button
            type="button"
            role="tab"
            id=${`tab-${_}`}
            class="plain-button segment"
            data-system=${_}
            aria-selected=${_ === e ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${_ === e ? "0" : "-1"}
            @click=${() => this.switchSheet(_)}
          >
            ${at[_]}
          </button>`
    )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${e}`}>${b}</div>
    ` : f`<div class="sheet-label system-name">${at[e]}</div>${b}`;
  }
  segmentKeydown(t, e, n) {
    const s = e.indexOf(n);
    let o;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? o = e[(s + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? o = e[(s - 1 + e.length) % e.length] : t.key === "Home" ? o = e[0] : t.key === "End" && (o = e[e.length - 1]), o && (t.preventDefault(), this._focusSegment = o, o === n ? this.requestUpdate() : this.switchSheet(o));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    const e = this._config?.history.hours ?? 24;
    let n;
    const s = this._historyModel;
    this._historyStatus === "loading" ? n = f`<p class="sheet-message">Načítám historii…</p>` : this._historyStatus === "error" || !s ? n = f`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>` : kn(s) ? n = f`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${`Graf za ${this.historyPeriod()}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${Pn(s, this.chartWidth(), this._scrubTime)}
      </div>` : n = f`<p class="sheet-message">Za ${cn(e)} nejsou k dispozici data.</p>`;
    const o = t.temperature ?? t.humidity;
    return f`
      ${n}
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
          ${t.unsupported ? f`<span class="option-hint">${t.unsupported}</span>` : m}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, n, s, o) {
    const r = n === e && s !== "off", a = r && o.includes("none") ? "none" : e;
    return f`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${Je(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, n, s, o) {
    const r = [], a = (l, c, p, d, h, g) => {
      r.push({ id: l, label: c, icon: pn(l), color: p, active: d, run: h, unsupported: g });
    };
    if (e.includes("off") && a("off", "Vypnuto", u.off, s === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", u.plan, s === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      u.warning,
      s === "heat" && o !== "boost",
      () => this.setHvacMode(t, "heat")
    ), r.length > 0) {
      const l = n.includes("boost");
      a(
        "boost",
        "Boost",
        u.alert,
        l && o === "boost" && s !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return r;
  }
  climateOptions(t, e, n) {
    return Xn.filter((s) => e.includes(s)).map((s) => {
      const o = Qe(s), r = Ct[o];
      return {
        id: s,
        label: Ot[o],
        icon: kt(o, r, !1),
        color: r,
        active: n === s,
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
  openSheet(t, e, n) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._sheet = { kind: t, room: e }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
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
    const n = [
      t.temperature,
      t.humidity,
      t.heating?.overlay,
      t.heating?.climate,
      t.heating?.intensity,
      t.heating?.target,
      t.air_conditioner
    ].filter((a) => !!a), s = this._config.history, o = Date.now(), r = o - s.hours * At;
    try {
      const a = await Se(this.hass, n, r, o);
      if (e !== this._historyRequest)
        return;
      this._historyModel = xn(a, t, { startMs: r, endMs: o }, s), this._historyStatus = "ready";
    } catch (a) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", a), e === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = an(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, s = Date.now(), o = s - e * 6e4;
    try {
      const r = await Se(this.hass, t, o, s), a = {};
      for (const l of t)
        a[l] = nn(r[l], o, s, n);
      this._trends = a;
    } catch (r) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", r);
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
    const e = dn(this._config), n = await Promise.allSettled(
      e.map(
        (o) => t.callApi("GET", `states/${o}`)
      )
    ), s = {};
    n.forEach((o, r) => {
      if (o.status === "fulfilled") {
        const a = Date.parse(o.value?.last_reported ?? o.value?.last_updated ?? "");
        Number.isFinite(a) && (s[e[r]] = a);
      }
    }), this._reported = s;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, e, n) {
    const s = this.numberState(t);
    if (s === void 0 || !t)
      return {};
    const o = this._reported[t];
    if (o === void 0)
      return { value: s };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), a = Math.max(o, Number.isFinite(r) ? r : 0), l = Math.max(0, (n - a) / 6e4);
    return { value: s, ageMinutes: l, stale: l > e };
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? `Naposledy před ${ii(t.ageMinutes)}` : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || R(e.toLowerCase()))
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
se.styles = Nn;
let M = se;
E([
  A()
], M.prototype, "_config");
E([
  Ge({ attribute: !1 })
], M.prototype, "hass");
E([
  A()
], M.prototype, "_sheet");
E([
  A()
], M.prototype, "_sheetError");
E([
  A()
], M.prototype, "_historyStatus");
E([
  A()
], M.prototype, "_historyModel");
E([
  A()
], M.prototype, "_scrubTime");
E([
  A()
], M.prototype, "_dragY");
E([
  A()
], M.prototype, "_flash");
E([
  A()
], M.prototype, "_moving");
E([
  A()
], M.prototype, "_prefersDark");
E([
  A()
], M.prototype, "_hint");
E([
  A()
], M.prototype, "_trends");
E([
  A()
], M.prototype, "_trendsLoaded");
E([
  A()
], M.prototype, "_reported");
E([
  A()
], M.prototype, "_notice");
E([
  A()
], M.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", M);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
