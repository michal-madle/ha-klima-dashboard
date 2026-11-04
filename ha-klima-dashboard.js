const ne = globalThis, Fe = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, je = /* @__PURE__ */ Symbol(), rn = /* @__PURE__ */ new WeakMap();
let Vn = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== je) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Fe && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = rn.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && rn.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Mi = (e) => new Vn(typeof e == "string" ? e : e + "", void 0, je), Ti = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Vn(n, e, je);
}, Ci = (e, t) => {
  if (Fe) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = ne.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ln = Fe ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Mi(n);
})(e) : e;
const { is: Ei, defineProperty: Ai, getOwnPropertyDescriptor: Oi, getOwnPropertyNames: Li, getOwnPropertySymbols: Pi, getPrototypeOf: Ri } = Object, he = globalThis, dn = he.trustedTypes, zi = dn ? dn.emptyScript : "", Ni = he.reactiveElementPolyfillSupport, Rt = (e, t) => e, ae = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? zi : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Ue = (e, t) => !Ei(e, t), cn = { attribute: !0, type: String, converter: ae, reflect: !1, useDefault: !1, hasChanged: Ue };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), he.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let kt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = cn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Ai(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = Oi(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const r = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Rt("elementProperties"))) return;
    const t = Ri(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Rt("properties"))) {
      const n = this.properties, i = [...Li(n), ...Pi(n)];
      for (const o of i) this.createProperty(o, n[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, o] of n) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const o = this._$Eu(n, i);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) n.unshift(ln(o));
    } else t !== void 0 && n.push(ln(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
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
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ci(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : ae).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ae;
      this._$Em = o;
      const r = a.fromAttribute(n, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Ue)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: s }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? n ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
        const { wrapped: a } = s, r = this[o];
        a !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
kt.elementStyles = [], kt.shadowRootOptions = { mode: "open" }, kt[Rt("elementProperties")] = /* @__PURE__ */ new Map(), kt[Rt("finalized")] = /* @__PURE__ */ new Map(), Ni?.({ ReactiveElement: kt }), (he.reactiveElementVersions ??= []).push("2.1.2");
const Ve = globalThis, hn = (e) => e, re = Ve.trustedTypes, pn = re ? re.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Bn = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Wn = "?" + ot, Di = `<${Wn}>`, pt = document, Nt = () => pt.createComment(""), Dt = (e) => e === null || typeof e != "object" && typeof e != "function", Be = Array.isArray, Ii = (e) => Be(e) || typeof e?.[Symbol.iterator] == "function", ve = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, un = /-->/g, mn = />/g, rt = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fn = /'/g, gn = /"/g, Kn = /^(?:script|style|textarea|title)$/i, qn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), u = qn(1), y = qn(2), xt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), vn = /* @__PURE__ */ new WeakMap(), ht = pt.createTreeWalker(pt, 129);
function Yn(e, t) {
  if (!Be(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pn !== void 0 ? pn.createHTML(t) : t;
}
const Hi = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Mt;
  for (let r = 0; r < n; r++) {
    const l = e[r];
    let d, c, p = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, c = a.exec(l), c !== null); ) h = a.lastIndex, a === Mt ? c[1] === "!--" ? a = un : c[1] !== void 0 ? a = mn : c[2] !== void 0 ? (Kn.test(c[2]) && (o = RegExp("</" + c[2], "g")), a = rt) : c[3] !== void 0 && (a = rt) : a === rt ? c[0] === ">" ? (a = o ?? Mt, p = -1) : c[1] === void 0 ? p = -2 : (p = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? rt : c[3] === '"' ? gn : fn) : a === gn || a === fn ? a = rt : a === un || a === mn ? a = Mt : (a = rt, o = void 0);
    const v = a === rt && e[r + 1].startsWith("/>") ? " " : "";
    s += a === Mt ? l + Di : p >= 0 ? (i.push(d), l.slice(0, p) + Bn + l.slice(p) + ot + v) : l + ot + (p === -2 ? r : v);
  }
  return [Yn(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class It {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, c] = Hi(t, n);
    if (this.el = It.createElement(d, i), ht.currentNode = this.el.content, n === 2 || n === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = ht.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Bn)) {
          const h = c[a++], v = o.getAttribute(p).split(ot), $ = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: $[2], strings: v, ctor: $[1] === "." ? ji : $[1] === "?" ? Ui : $[1] === "@" ? Vi : pe }), o.removeAttribute(p);
        } else p.startsWith(ot) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (Kn.test(o.tagName)) {
          const p = o.textContent.split(ot), h = p.length - 1;
          if (h > 0) {
            o.textContent = re ? re.emptyScript : "";
            for (let v = 0; v < h; v++) o.append(p[v], Nt()), ht.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[h], Nt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Wn) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(ot, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += ot.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = pt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function _t(e, t, n = e, i) {
  if (t === xt) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = Dt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = _t(e, o._$AS(e, t.values), o, i)), t;
}
class Fi {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? pt).importNode(n, !0);
    ht.currentNode = o;
    let s = ht.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Bt(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new Bi(s, this, t)), this._$AV.push(d), l = i[++r];
      }
      a !== l?.index && (s = ht.nextNode(), a++);
    }
    return ht.currentNode = pt, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Bt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = _t(this, t, n), Dt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== xt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ii(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Dt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = It.createElement(Yn(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new Fi(o, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = vn.get(t.strings);
    return n === void 0 && vn.set(t.strings, n = new It(t)), n;
  }
  k(t) {
    Be(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Bt(this.O(Nt()), this.O(Nt()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = hn(t).nextSibling;
      hn(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = _t(this, t, n, 0), a = !Dt(t) || t !== this._$AH && t !== xt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = _t(this, r[i + l], n, l), d === xt && (d = this._$AH[l]), a ||= !Dt(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ji extends pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Ui extends pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Vi extends pe {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = _t(this, t, n, 0) ?? f) === xt) return;
    const i = this._$AH, o = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== f && (i === f || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bi {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    _t(this, t);
  }
}
const Wi = Ve.litHtmlPolyfillSupport;
Wi?.(It, Bt), (Ve.litHtmlVersions ??= []).push("3.3.3");
const Ki = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new Bt(t.insertBefore(Nt(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const We = globalThis;
class zt extends kt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ki(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return xt;
  }
}
zt._$litElement$ = !0, zt.finalized = !0, We.litElementHydrateSupport?.({ LitElement: zt });
const qi = We.litElementPolyfillSupport;
qi?.({ LitElement: zt });
(We.litElementVersions ??= []).push("4.2.2");
const Yi = { attribute: !0, type: String, converter: ae, reflect: !1, hasChanged: Ue }, Gi = (e = Yi, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Gn(e) {
  return (t, n) => typeof n == "object" ? Gi(e, t, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function j(e) {
  return Gn({ ...e, state: !0, attribute: !1 });
}
const ie = 60, Ae = 142, $n = 11, qt = 3, Zi = 0.8, wn = 2, Xi = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", Ji = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", Qi = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function to(e, t) {
  if (e === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${ie - 1.5}
      height=${Ae - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const n = Ae - qt - 1, i = n / $n, o = i - Zi, s = o - t / 100 * (o - wn), a = qt + 1 + (100 - e) / 100 * n, r = Array.from({ length: $n }, (l, d) => {
    const c = qt + 1 + d * i + i / 2, p = c <= a, h = p ? s : wn;
    return y`<rect
      x="0"
      y=${(c - h / 2).toFixed(2)}
      width=${ie}
      height=${h.toFixed(2)}
      rx=${Math.min(1.5, h / 2).toFixed(2)}
      style=${p ? Xi : Ji}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${ie}
      height=${qt}
      rx="1.5"
      style=${Qi}
    ></rect>${r}`;
}
const eo = ["cs", "en", "sv"];
class Zn extends Error {
}
function P(e) {
  throw new Zn(e);
}
function no(e, t) {
  try {
    return t();
  } catch (n) {
    throw n instanceof Zn ? new Error(`${e}: ${n.message}`) : n;
  }
}
function ut(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function nt(e, t) {
  return e == null ? {} : (ut(e) || P(`"${t}" must be a mapping of keys.`), e);
}
function mt(e, t, n) {
  for (const i of Object.keys(e))
    t.includes(i) || P(`${n}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function io(e, t, n = {}) {
  if (e == null)
    return;
  const i = typeof e == "string" ? e.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || P(`${t} must be an entity ID such as ${n.example ?? `${n.domain ?? "sensor"}.example`}.`), n.domain && !i.startsWith(`${n.domain}.`) && P(`${t} must be a ${n.domain} entity (${n.domain}.…), not ${i}.`), i;
}
function Oe(e, t) {
  if (e != null)
    return (typeof e != "string" || !e.trim()) && P(`${t} must be a non-empty text.`), e.trim();
}
function Ht(e, t) {
  if (e != null) {
    if (typeof e == "string" && e.trim())
      return e.trim();
    if (ut(e) && Object.keys(e).length > 0) {
      const n = Object.entries(e);
      if (n.every(([i, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof o == "string" && o.trim()))
        return Object.fromEntries(n.map(([i, o]) => [i, o.trim()]));
    }
    return P(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Ft(e, t) {
  if (e === void 0 || typeof e == "string")
    return e;
  const n = t.toLowerCase();
  return e[n] ?? e[n.split("-")[0]] ?? e.en ?? Object.values(e)[0];
}
function Xn(e) {
  return e === void 0 ? [] : typeof e == "string" ? [e] : Object.values(e);
}
const bn = ["auto", ...eo];
function oo(e) {
  const t = e ?? "auto";
  return bn.includes(t) || P(`language must be one of ${bn.join(", ")}.`), t;
}
const $e = ["bedroom", "office", "kids", "living"], we = "none", Le = ["open", "shade", "dark"], so = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function ao(e) {
  return so.has(e);
}
function Tt(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
const Jn = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function be(e, t, n, i) {
  return e !== void 0 && t !== void 0 && Math.abs(e - n.position) <= i && Math.abs(t - n.tilt) <= i;
}
function Ct(e, t) {
  return t === "temperature" ? e.temperature_step : t === "co2" ? e.co2_step : e.pm25_step;
}
const m = {
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
  /** The running ventilation mode (fresh green). */
  fresh: "var(--kd-fresh)",
  warning: "var(--kd-warning)",
  alert: "var(--kd-alert)",
  /** The critical red on the lighter ground of a popup option (contrast 4.5 : 1 for 17 px text). */
  alertOnPopup: "var(--kd-alert-popup)",
  cold: "var(--kd-sky)",
  cool: "var(--kd-sky)",
  dry: "var(--kd-dry)",
  heat: "var(--kd-warning)",
  auto: "var(--kd-auto)"
}, jt = {
  off: m.off,
  cool: m.cool,
  wind_free: m.cool,
  dry: m.dry,
  fan: m.plan,
  heat: m.heat,
  auto: m.auto,
  unknown: m.off
}, ro = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function oe(e) {
  const t = ro[e];
  if (t)
    return t;
  const n = e.replace(/_/g, " ");
  return n.charAt(0).toUpperCase() + n.slice(1);
}
function lo(e) {
  switch (e?.toLowerCase()) {
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
function yn(e, t, n, i, o) {
  const { thresholds: s } = i, a = [
    [o.required.temperature, e.temperature],
    [o.required.humidity, e.humidity],
    ...i.hasCo2 ? [[o.required.co2, e.co2]] : [],
    ...i.hasPm25 ? [[o.required.pm25, e.pm25]] : [],
    [o.required.houseMode, n ? { value: 1 } : void 0]
  ];
  for (const [v, $] of a) {
    if ($?.value === void 0)
      return { id: "noData", label: o.noData(v), color: m.label, kind: "unknown" };
    if ($.stale) {
      const S = $.ageMinutes === void 0 ? void 0 : ti($.ageMinutes);
      return { id: "noData", label: o.noData(v, S), color: m.label, kind: "unknown" };
    }
  }
  const r = e.temperature.value, l = e.humidity.value, d = i.hasCo2 ? e.co2.value : Number.NEGATIVE_INFINITY;
  if ((i.hasPm25 ? e.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: m.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: m.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: m.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: m.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: m.warning, kind: "warning", cause: "humidity" };
  const p = t ? s.summer_min : s.winter_min, h = t ? s.summer_max : s.winter_max;
  return r > h ? { id: "warm", label: o.status.warm, color: m.warning, kind: "warning", cause: "temperature" } : r < p ? { id: "cold", label: o.status.cold, color: m.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: m.label, kind: "normal" };
}
function K(e) {
  return ao(e) || e === "none";
}
function dt(e) {
  if (e == null || e === "")
    return;
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Qn(e, t) {
  return e === void 0 || e <= 0 ? 0 : e >= t.heating_waves_3 ? 3 : e >= t.heating_waves_2 ? 2 : 1;
}
function co(e) {
  const t = /* @__PURE__ */ new Set(), n = (i) => {
    i && t.add(i);
  };
  n(e.houseModeEntity), n(e.ventilationEntity), n(e.ventilationTimerEntity), n(e.outside?.temperature), n(e.outside?.minimum), n(e.outside?.maximum), n(e.outside?.rain_probability), n(e.outside?.pm25);
  for (const i of e.rooms)
    n(i.temperature), n(i.humidity), n(i.carbon_dioxide), n(i.pm25), i.windows.forEach((o) => n(o.entity)), n(i.cover), n(i.heating?.climate), n(i.heating?.overlay), n(i.heating?.target), n(i.heating?.intensity), n(i.air_conditioner);
  return t;
}
function ho(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.rooms)
    for (const i of [n.temperature, n.carbon_dioxide, n.pm25])
      i && t.add(i);
  return [...t];
}
function po(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  const n = Object.keys(e), i = Object.keys(t);
  return n.length === i.length && n.every((o) => Object.hasOwn(t, o) && e[o] === t[o]);
}
function ti(e) {
  return e < 60 ? `${Math.max(1, Math.round(e))} min` : e < 2880 ? `${Math.floor(e / 60)} h` : `${Math.floor(e / 1440)} d`;
}
function kn(e, t) {
  const n = (e ?? []).filter((o) => o !== void 0);
  if (n.length < 2)
    return;
  const i = n[n.length - 1] - n[0];
  return i >= t / 2 ? "rising" : i <= -t / 2 ? "falling" : "stable";
}
function ye(e) {
  const t = Math.max(0, Math.floor(e));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [o, s] = [Math.floor(t / 60), t % 60];
    return s === 0 ? `${o} h` : `${o} h ${s} min`;
  }
  const [n, i] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return i === 0 ? `${n} d` : `${n} d ${i} h`;
}
function xn(e, t) {
  const n = Math.max(0, Math.floor(e));
  if (n < 1)
    return t.duration.lessThanMinute;
  if (n < 60)
    return t.duration.minute(n);
  if (n < 1440) {
    const [a, r] = [Math.floor(n / 60), n % 60], l = t.duration.hour(a);
    return r === 0 ? l : `${l} ${t.duration.minute(r)}`;
  }
  const [i, o] = [Math.floor(n / 1440), Math.floor(n % 1440 / 60)], s = t.duration.day(i);
  return o === 0 ? s : `${s} ${t.duration.hour(o)}`;
}
function _n(e, t) {
  const n = Math.max(1, Math.round(e));
  return n % 60 === 0 ? t.period.hour(n / 60) : t.period.minute(n);
}
function ei(e, t) {
  return Ft(e.label, t) ?? e.name;
}
function uo(e, t, n) {
  return Ft(e.label, n) ?? t.cover.presetName[e.icon];
}
function Sn(e, t, n) {
  if (e.description !== void 0)
    return Ft(e.description, n) ?? "";
  const i = Jn[e.icon];
  return e.label === void 0 && i.position === e.position && i.tilt === e.tilt ? t.cover.presetDescription[e.icon] : t.cover.position(Math.round(e.position), Math.round(e.tilt));
}
function mo(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.rooms)
    for (const i of [n.temperature, n.humidity, n.carbon_dioxide, n.pm25])
      i && t.add(i);
  return [...t];
}
const fo = "input_select.house_mode", go = 450, vo = {
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
}, $o = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, wo = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, ke = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, bo = Le.map((e) => ({ icon: e, ...Jn[e] })), Mn = { winter: "Zima", summer: "Léto" }, Tn = ["auto", "dark", "light"], Cn = 3, yo = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, ko = [
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
], xo = ["climate", "overlay", "target", "intensity"], En = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], _o = ["name", "position", "tilt", "icon", "description"], So = ["entity", "name"];
function st(e) {
  return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function U(e, t) {
  return io(e, t, { example: "sensor.loznice_teplota" });
}
function Ot(e, t, n, i = {}) {
  mt(e, Object.keys(t), n);
  const o = { ...t };
  for (const [s, a] of Object.entries(e)) {
    if (a === null)
      continue;
    (typeof a != "number" || !Number.isFinite(a)) && P(`${n}.${s} must be a number.`);
    const r = i[s];
    if (r) {
      const [l, d, c] = r;
      (a < l || a > d || c && !Number.isInteger(a)) && P(`${n}.${s} must be ${c ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = a;
  }
  return o;
}
function ni(e, t) {
  const n = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [i, o, s] of n)
    (s ? e[i] >= e[o] : e[i] > e[o]) && P(`${t}: ${i} (${e[i]}) must be ${s ? "below" : "at most"} ${o} (${e[o]}).`);
  e.stale_minutes <= 0 && P(`${t}.stale_minutes must be greater than 0.`), (e.heating_waves_2 < 1 || e.heating_waves_3 > 100) && P(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Mo(e, t) {
  return e > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function Pe(e, t) {
  return (!Array.isArray(e) || e.length === 0 || e.length > Cn) && P(`${t} must be a list of 1 to ${Cn} presets.`), e.map((n, i) => {
    const o = `${t}[${i + 1}]`;
    ut(n) || P(`${o} must have a position and a tilt.`), mt(n, _o, o);
    const s = Ht(n.name, `${o}.name`), a = (p) => {
      const h = n[p];
      return (typeof h != "number" || !Number.isFinite(h) || h < 0 || h > 100) && P(`${o}.${p} must be a number from 0 to 100.`), h;
    }, r = a("position"), l = a("tilt");
    let d = Mo(r, l);
    n.icon != null && (Le.includes(n.icon) || P(`${o}.icon must be one of ${Le.join(", ")}.`), d = n.icon);
    const c = Ht(n.description, `${o}.description`);
    return { id: `p${i}`, icon: d, label: s, description: c, position: r, tilt: l };
  });
}
function To(e, t) {
  const n = e.window;
  if (n == null)
    return [];
  const i = Array.isArray(n) ? n : [n];
  i.length === 0 && P(`${t}.window must not be an empty list.`);
  const o = i.map((a, r) => {
    const l = `${t}.window${Array.isArray(n) ? `[${r + 1}]` : ""}`;
    if (ut(a)) {
      mt(a, So, l);
      const c = U(a.entity, `${l}.entity`);
      return c || P(`${l}.entity is required.`), { entity: c, name: Ht(a.name, `${l}.name`) };
    }
    const d = U(a, l);
    return d || P(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const a of o)
    s.has(a.entity) && P(`${t}.window lists ${a.entity} twice.`), s.add(a.entity);
  return o;
}
function An(e, t) {
  return e === !1 ? { present: !1 } : { entity: U(e, t), present: !0 };
}
function Co(e, t) {
  e.image != null && e.scene != null && P(`${t}: use either image or scene (older name), not both.`);
  const n = e.image != null ? "image" : "scene", i = e.image ?? e.scene;
  if (i == null) {
    const s = Xn(e.name).map((a) => yo[st(a)]).find((a) => a !== void 0);
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof i != "string" || !i.trim()) && P(`${t}.${n} must be ${[...$e, we].join(", ")} or the address of an image.`);
  const o = i.trim();
  if (o !== we) {
    if ($e.includes(o))
      return { kind: "scene", scene: o };
    if (n === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    P(
      `${t}.${n} must be one of ${[...$e, we].join(", ")}${n === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Eo(e, t) {
  const n = Oe(e, `${t}.link`);
  return n !== void 0 && !/^(\/|https?:\/\/)/i.test(n) && P(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), n;
}
function Ao(e, t, n) {
  ut(e) || P(`room ${t + 1} must be a mapping with at least a name.`);
  const i = ut(e) && e.name != null ? Ht(e.name, `room ${t + 1} name`) : void 0, o = i === void 0 ? "" : Xn(i)[0];
  (!o || i === void 0) && P(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, a = e;
  for (const [h, v] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    h in a && P(`${s}: key "${h}" was renamed to "${v}".`);
  "windows" in a && P(`${s}: the key is "window" (one entity or a list of them), not "windows".`), mt(a, ko, s);
  const r = nt(e.heating, `${s}.heating`);
  "heating" in r && P(`${s}: key "heating.heating" was renamed to "heating.intensity".`), mt(r, xo, `${s}.heating`);
  const l = e.heating == null ? void 0 : {
    climate: U(r.climate, `${s}.heating.climate`),
    overlay: U(r.overlay, `${s}.heating.overlay`),
    target: U(r.target, `${s}.heating.target`),
    intensity: U(r.intensity, `${s}.heating.intensity`)
  }, d = Ot(nt(e.thresholds, `${s}.thresholds`), n.thresholds, `${s}.thresholds`);
  ni(d, `${s}.thresholds`);
  const c = An(e.carbon_dioxide, `${s}.carbon_dioxide`), p = An(e.pm25, `${s}.pm25`);
  return {
    name: o,
    label: i,
    temperature: U(e.temperature, `${s}.temperature`),
    humidity: U(e.humidity, `${s}.humidity`),
    carbon_dioxide: c.entity,
    hasCo2: c.present,
    pm25: p.entity,
    hasPm25: p.present,
    windows: To(e, s),
    cover: U(e.cover, `${s}.cover`),
    presets: e.cover_presets == null ? n.presets : Pe(e.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: U(e.air_conditioner, `${s}.air_conditioner`),
    image: Co(e, s),
    link: Eo(e.link, s)
  };
}
function Oo(e) {
  return no("Klima Dashboard", () => Lo(e));
}
function Lo(e) {
  (!ut(e) || !Array.isArray(e.rooms) || e.rooms.length === 0) && P("the configuration requires a non-empty rooms list.");
  const t = e.title === "" ? "" : Ht(e.title, "title"), n = e.theme ?? "auto";
  Tn.includes(n) || P(`theme must be one of ${Tn.join(", ")}.`);
  const i = oo(e.language), o = U(e.house_mode_entity, "house_mode_entity") ?? fo, s = U(e.ventilation_entity, "ventilation_entity"), a = U(e.ventilation_timer_entity, "ventilation_timer_entity"), r = e.ventilation_co2_target ?? go;
  (typeof r != "number" || !Number.isFinite(r) || r < 300 || r > 2e3) && P("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const l = nt(e.house_modes, "house_modes");
  mt(l, ["winter", "summer"], "house_modes");
  const d = {
    winter: Oe(l.winter, "house_modes.winter") ?? Mn.winter,
    summer: Oe(l.summer, "house_modes.summer") ?? Mn.summer
  };
  st(d.winter) === st(d.summer) && P("house_modes.winter and house_modes.summer must differ.");
  const c = e.outside == null ? void 0 : nt(e.outside, "outside");
  if (c) {
    mt(c, En, "outside");
    for (const b of En)
      U(c[b], `outside.${b}`);
  }
  const p = Ot(nt(e.thresholds, "thresholds"), vo, "thresholds");
  ni(p, "thresholds");
  const h = Ot(nt(e.trends, "trends"), $o, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), v = Ot(nt(e.history, "history"), wo, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), $ = { ...nt(e.covers, "covers") }, S = $.presets;
  delete $.presets;
  const C = $.script;
  delete $.script;
  const w = {
    ...Ot($, { tolerance: ke.tolerance, stall_seconds: ke.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: ke.script
  };
  C != null && ((typeof C != "string" || !/^script\.[a-z0-9_]+$/.test(C.trim())) && P("covers.script must be a script entity such as script.zaluzie_posun."), w.script = C.trim());
  const _ = S == null ? Pe(bo, "covers.presets") : Pe(S, "covers.presets"), E = e.rooms.map((b, k) => Ao(b, k, { thresholds: p, presets: _ })), M = /* @__PURE__ */ new Set();
  for (const b of E)
    M.has(b.name) && P(`room name "${b.name}" is used twice; room names must be unique.`), M.add(b.name);
  return {
    // Without a title the heading is "Domov" in the card language (i18n.ts).
    title: t,
    theme: n,
    language: i,
    houseModeEntity: o,
    houseModes: d,
    ventilationEntity: s,
    ventilationTimerEntity: a,
    ventilationCo2Target: r,
    outside: c,
    thresholds: p,
    trends: h,
    history: v,
    covers: w,
    rooms: E
  };
}
const at = 5, ue = 25, W = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480], ft = W.length, vt = W.length + 1;
function Po(e) {
  return e === ft ? 0 : e === vt ? W.length + 1 : e + 1;
}
function Ro(e) {
  const t = W.length + 1, n = Math.min(t, Math.max(0, Math.round(e)));
  return n === 0 ? ft : n === t ? vt : n - 1;
}
function zo(e) {
  return e === vt || e === ft ? W.length : e;
}
function No(e) {
  const t = Math.min(W.length, Math.max(0, Math.round(e)));
  return t === W.length ? vt : t;
}
function On(e, t, n, i = 0) {
  const o = Math.round(t * 60) + i, s = [
    { delay: { hours: Math.floor(o / 3600), minutes: Math.floor(o % 3600 / 60), seconds: o % 60 } }
  ];
  return n !== void 0 && s.push({ condition: "state", entity_id: e, state: n }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: e }, data: { hvac_mode: "off" } }), { sequence: s };
}
function ii(e) {
  return e === "boost" ? 1 : e === "off" ? vt : ft;
}
function Ln(e, t, n) {
  const i = ai(n);
  if (i === void 0)
    return;
  const o = i === "heat" ? "manual" : i === "auto" ? "plan" : i, s = si(oi(n)), a = X(n?.attributes.temperature), r = o === "manual" && a !== void 0 && a >= s.min && a <= s.max;
  return {
    room: e,
    entityId: t,
    mode: o,
    temperature: Do(r ? a : 21, s),
    duration: ii(o)
  };
}
function X(e) {
  const t = typeof e == "string" ? Number.parseFloat(e) : e;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function oi(e) {
  const t = X(e?.attributes.target_temp_step), n = X(e?.attributes.min_temp) ?? at, i = X(e?.attributes.max_temp) ?? 25, o = t !== void 0 && t > 0 ? t : 0.5;
  return i > n ? { min: n, max: i, step: o } : { min: at, max: 25, step: o };
}
function si(e) {
  return { ...e, min: Math.max(e.min, at) + e.step };
}
function Do(e, t) {
  const n = Math.round((e - t.min) / t.step) * t.step + t.min;
  return Math.min(t.max, Math.max(t.min, Math.round(n * 100) / 100));
}
function ai(e) {
  const t = e?.state.toLowerCase();
  if (t === "off")
    return "off";
  if (t === "auto")
    return "auto";
  if (t === "heat") {
    const n = X(e?.attributes.temperature);
    return n !== void 0 && n <= at ? "off" : n === ue ? "boost" : "heat";
  }
}
function ri(e, t, n) {
  const i = e?.toLowerCase(), o = t?.toLowerCase();
  if (i === "off")
    return "off";
  const r = (i === "auto" ? "schedule" : i === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return r === "manual" && n !== void 0 && n <= at ? "off" : r;
}
function Io(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${String(t).padStart(2, "0")}:${String(n).padStart(2, "0")}:00`;
}
function Lt(e) {
  return e >= 0 && e < W.length ? W[e] : void 0;
}
function Ho(e, t, n) {
  if (t.mode === "plan")
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "auto" } };
  const i = Lt(t.duration);
  if (t.mode === "off" && (t.duration === vt || !n))
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "off" } };
  if (!n)
    return t.mode === "manual" ? { domain: "climate", service: "set_temperature", data: { entity_id: e, temperature: t.temperature } } : void 0;
  const o = t.mode === "boost" ? ue : t.mode === "off" ? at : t.temperature, s = { entity_id: e, temperature: o };
  return i !== void 0 ? s.time_period = Io(i) : s.overlay = t.duration === ft ? "next_time_block" : "manual", { domain: "tado_ce", service: "set_climate_timer", data: s };
}
function Et(e) {
  const t = Math.max(1, Math.round(e)), n = Math.floor(t / 60), i = t % 60;
  return n === 0 ? `${i} min` : i === 0 ? `${n} h` : `${n} h ${i} min`;
}
const gt = 36e5;
function Fo(e) {
  if (e == null)
    return;
  if (typeof e == "number")
    return Number.isFinite(e) ? e < 1e11 ? e * 1e3 : e : void 0;
  const t = Date.parse(e);
  return Number.isNaN(t) ? void 0 : t;
}
function jo(e, t) {
  const n = {};
  for (const [i, o] of Object.entries(e ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((a, r) => {
      const l = a.s ?? a.state, d = Fo(a.lu ?? a.last_updated ?? a.lc ?? a.last_changed) ?? (r === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((a, r) => a.time - r.time), n[i] = s;
  }
  return n;
}
async function Yt(e, t, n, i) {
  if (t.length === 0)
    return {};
  const o = await e.callWS({
    type: "history/history_during_period",
    start_time: new Date(n).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return jo(o, n);
}
function Ut(e, t) {
  let n;
  for (const i of e ?? []) {
    if (i.time > t)
      break;
    n = i.state;
  }
  return n;
}
function Re(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function Uo(e, t, n, i) {
  const o = (n - t) / i, s = (e ?? []).filter((a) => Re(a.state) !== void 0);
  return Array.from(
    { length: i },
    (a, r) => Re(Ut(s, t + (r + 1) * o))
  );
}
function Gt(e, t, n, i = !1) {
  const o = [];
  for (const a of e ?? []) {
    const r = Re(a.state);
    r !== void 0 && !(i && r === 0) && a.time <= n && o.push({ t: Math.max(a.time, t), v: r });
  }
  const s = o[o.length - 1];
  return s && s.t < n && o.push({ t: n, v: s.v }), o;
}
function wt(e, t, n, i) {
  const o = /* @__PURE__ */ new Set([t, n]);
  for (const r of e)
    for (const l of r ?? [])
      l.time > t && l.time < n && o.add(l.time);
  const s = [...o].sort((r, l) => r - l), a = [];
  for (let r = 0; r < s.length - 1; r += 1) {
    const l = i(e.map((c) => Ut(c, s[r])));
    if (l === void 0)
      continue;
    const d = a[a.length - 1];
    d && d.value === l && d.end === s[r] ? d.end = s[r + 1] : a.push({ start: s[r], end: s[r + 1], value: l });
  }
  return a;
}
function xe(e, t) {
  let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const a of e)
    for (const r of a ?? [])
      r !== void 0 && Number.isFinite(r) && (n = Math.min(n, r), i = Math.max(i, r));
  if (!Number.isFinite(n) || !Number.isFinite(i) || t <= 0)
    return;
  let o = Math.floor(n / t) * t, s = Math.ceil(i / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function Vo(e, t) {
  const n = t.max - t.min;
  return e.map(
    (i) => i === void 0 || n <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / n))
  );
}
function Zt(e, t = 5 * 6e4, n = 720) {
  if (e.length < 2)
    return e;
  const i = 6e4, o = e[0].t, s = e[e.length - 1].t, a = Math.max(2, Math.floor((s - o) / i) + 1), r = [];
  let l = 0;
  for (let $ = 0; $ < a; $ += 1) {
    const S = $ === a - 1 ? s : o + $ * i;
    for (; l + 1 < e.length && e[l + 1].t <= S; )
      l += 1;
    r.push(e[l].v);
  }
  const d = Math.max(0, Math.floor(t / i / 2)), c = [0];
  for (const $ of r)
    c.push(c[c.length - 1] + $);
  const p = Math.max(1, Math.ceil(a / n)), h = [];
  for (let $ = 0; $ < a - 1; $ += p)
    h.push($);
  return h.push(a - 1), h.map(($) => {
    const S = Math.max(0, $ - d), C = Math.min(a - 1, $ + d);
    return { t: $ === a - 1 ? s : o + $ * i, v: (c[C + 1] - c[S]) / (C - S + 1) };
  });
}
function Bo() {
  return u`
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
  ].map(([t, n, i]) => y`<circle cx=${t} cy=${n} r=${i}></circle>`)}
    </svg>
  `;
}
function Wo(e) {
  const t = (o, s, a, r) => y`<rect x=${o} y=${s} width=${a} height=${r} rx=${r / 2 > 1.2 ? 1.2 : r / 2} fill="currentColor" stroke="none"></rect>`, n = (o) => y`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let i;
  switch (e) {
    case "open":
      i = y`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${n(21)}`;
      break;
    case "shade":
      i = y`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${n(26)}`;
      break;
    default:
      i = y`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${n(26)}`;
  }
  return u`
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
function Pn() {
  return u`
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
function li(e, t) {
  return y`${[0, 1, 2].map(
    (n) => y`<path
      d="M${6 + 6 * n} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${n < e ? m.warning : m.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : f}
    ></path>`
  )}`;
}
function ze(e, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${li(e, t)}
    </svg>
  `;
}
function Ne(e) {
  let t;
  const n = y`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, i = y`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (e) {
    case "cool":
    case "wind_free":
      t = y`${n}
        <g transform="rotate(60 12 12)">${n}</g>
        <g transform="rotate(120 12 12)">${n}</g>`;
      break;
    case "dry":
      t = y`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = y`${i}<g transform="rotate(120 12 12)">${i}</g>
        <g transform="rotate(240 12 12)">${i}</g>`;
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
function Pt(e, t, n) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${n ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Ne(e)}
    </svg>
  `;
}
function di() {
  return y`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function _e(e, t) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${e}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${di()}
    </svg>
  `;
}
function Se(e) {
  let t;
  switch (e) {
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
  return u`
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
const De = " ", tt = 4, Ko = 44, Q = 6, Z = 180, it = Q + Z, Xt = 10, ci = it + 10, se = 14, Rn = 14, qo = 3, hi = 14, Yo = 7;
function Go(e, t, n) {
  if (t === "temperature") {
    const o = n ? ["climate", "heating"] : ["heating", "climate"];
    return e.windows ? [...o, "windows"] : o;
  }
  const i = [];
  return e.ventilation && i.push("ventilation"), e.windows && i.push("windows"), i;
}
const pi = (e) => e === 0 ? it : ci + e * se, Zo = (e = 0) => pi(Math.max(e, qo)) + hi + Yo, Me = 12, Xo = [0, 0.24, 0.44, 0.68], zn = "history-under-temperature", bt = "history-plot", Nn = "history-curve", ui = {
  schedule: m.plan,
  manual: m.warning,
  off: m.closed
}, Jo = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: m.warning,
  off: m.closed
}, V = (e) => `fill: ${e}`, B = (e) => `stroke: ${e}`;
function Te(e, t, n) {
  return ri(t, e, n);
}
function Jt(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
const Ke = 0.05;
function Qo(e, t) {
  const n = e.filter((r) => Number.isFinite(r));
  let i = 19, o = 23;
  if (n.length > 0) {
    if (i = Math.min(...n), o = Math.max(...n), o - i < t) {
      const l = (i + o) / 2;
      i = l - t / 2, o = l + t / 2;
    }
    const r = (o - i) * Ke;
    i -= r, o += r;
  }
  const s = o - i, a = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: i, max: o, step: a };
}
function ts(e, t, n) {
  const i = [], o = n / 1e3;
  for (let s = Math.ceil(e / n - o) * n; s <= t + o; s += n)
    i.push(Math.round(s * 100) / 100);
  return i;
}
function es(e, t, n, i, o) {
  const s = (T) => T ? e[T] : void 0, { startMs: a, endMs: r } = n, l = s(t.heating?.overlay), d = s(t.heating?.climate), c = Zt(Gt(s(t.temperature), a, r, !0)), p = Zt(Gt(s(t.humidity), a, r, !0)), h = wt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([T, z, L]) => Te(T, z, Jt(L))
  ), v = wt(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    a,
    r,
    ([T, z, L, I]) => {
      const q = Te(T, z, Jt(I)), Y = Qn(Jt(L), t.thresholds);
      return q === void 0 || q === "off" || Y === 0 ? void 0 : String(Y);
    }
  ), $ = wt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([T, z, L]) => {
      const I = Jt(L), q = Te(T, z, I);
      if (!(I === void 0 || I <= at))
        return q === "schedule" || q === "manual" ? String(I) : void 0;
    }
  ), S = t.windows.length > 0 ? wt(
    t.windows.map((T) => s(T.entity)),
    a,
    r,
    (T) => T.some((z) => z?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, C = o ? wt([s(o)], a, r, ([T]) => T?.toLowerCase() === "on" ? "on" : void 0) : void 0, w = Zt(Gt(s(t.carbon_dioxide), a, r, !0)), _ = Zt(Gt(s(t.pm25), a, r)), E = wt([s(t.air_conditioner)], a, r, ([T]) => {
    const z = lo(T);
    return z === "unknown" ? void 0 : z;
  }), M = c.map((T) => T.v), { min: b, max: k, step: O } = Qo(
    M.length > 0 ? M : $.map((T) => Number(T.value)),
    i.min_temperature_span
  ), x = p.map((T) => T.v);
  return {
    range: n,
    temperature: c,
    humidity: p,
    heating: h,
    intensity: v,
    target: $,
    climate: E,
    windows: S,
    co2: w,
    pm25: _,
    ventilation: C,
    limits: {
      co2: { warning: t.thresholds.co2_warning, critical: t.thresholds.co2_critical },
      pm25: { warning: t.thresholds.pm25_warning, critical: t.thresholds.pm25_critical }
    },
    comfort: {
      winter: { min: t.thresholds.winter_min, max: t.thresholds.winter_max },
      summer: { min: t.thresholds.summer_min, max: t.thresholds.summer_max }
    },
    tempMin: b,
    tempMax: k,
    tempStep: O,
    humidityMin: x.length > 0 ? Math.min(...x) : void 0,
    humidityMax: x.length > 0 ? Math.max(...x) : void 0,
    night: [i.night_start, i.night_end]
  };
}
function ns(e, t = "temperature") {
  return t === "co2" ? e.co2.length > 0 : t === "pm25" ? e.pm25.length > 0 : e.temperature.length > 0 || e.humidity.length > 0 || e.heating.length > 0;
}
function is(e, t) {
  const n = e.filter((l) => Number.isFinite(l)), i = 400, o = t === "pm25" ? 0 : Math.min(i, n.length > 0 ? Math.floor(Math.min(...n) / 100) * 100 : i), s = t === "co2" ? 400 : 10, a = n.length > 0 ? Math.max(...n) : o + s, r = Math.max(a, o + s);
  return { min: o, max: r + (r - o) * Ke };
}
function os(e, t, n, i) {
  const o = n === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - e) / Math.max(2, i), a = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], r = [];
  for (let l = Math.ceil(e / a - 1e-9) * a; l <= t + 1e-9; l += a)
    r.push(l);
  return r;
}
function ct(e) {
  return e - tt - Ko;
}
function ss(e, t, n) {
  return tt + (e - t.startMs) / (t.endMs - t.startMs) * ct(n);
}
function as(e, t, n) {
  const i = Math.min(1, Math.max(0, (e - tt) / ct(t)));
  return n.startMs + i * (n.endMs - n.startMs);
}
function Vt(e, t) {
  let n;
  for (const i of e) {
    if (i.t > t)
      break;
    n = i.v;
  }
  return n;
}
function Qt(e, t, n) {
  return e.find(
    (i) => i.start <= t && (t < i.end || t === n && i.end === n)
  )?.value;
}
function rs(e, [t, n]) {
  const i = [];
  if (t === n)
    return i;
  const o = new Date(e.startMs);
  for (o.setHours(0, 0, 0, 0), o.setDate(o.getDate() - 1); o.getTime() < e.endMs; ) {
    const s = new Date(o);
    s.setHours(t, 0, 0, 0);
    const a = new Date(o);
    n < t && a.setDate(a.getDate() + 1), a.setHours(n, 0, 0, 0);
    const r = Math.max(s.getTime(), e.startMs), l = Math.min(a.getTime(), e.endMs);
    l > r && i.push([r, l]), o.setDate(o.getDate() + 1);
  }
  return i;
}
const Dn = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function qe(e) {
  const t = (e.endMs - e.startMs) / gt;
  let n = Dn[0], i = 1 / 0;
  for (const o of Dn) {
    const s = t / o, r = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    r < i && (i = r, n = o);
  }
  return n;
}
function ls(e) {
  const t = qe(e), n = [], i = new Date(e.startMs);
  if (i.setMinutes(0, 0, 0), t >= 24)
    for (i.setHours(0); i.getTime() < e.startMs; )
      i.setDate(i.getDate() + 1);
  else
    i.setHours(Math.ceil(i.getHours() / t) * t);
  for (; i.getTime() <= e.endMs; )
    i.getTime() >= e.startMs && n.push(i.getTime()), t >= 24 ? i.setDate(i.getDate() + t / 24) : i.setHours(i.getHours() + t);
  return n;
}
function ds(e, t) {
  return { x: Math.max(e, t + 9), anchor: "middle" };
}
function cs(e) {
  return e === "off" ? ui.off : jt[e] ?? m.off;
}
function hs(e, t, n) {
  const i = new Date(e).getHours() === 0;
  return qe(t) >= 24 || i && t.endMs - t.startMs > 36 * gt ? n.day(e) : n.hour(e).replace(/^(\d{1,2}):00$/, "$1");
}
function mi(e, t, n) {
  const { t: i } = n;
  if (t === void 0)
    return i.chart.now;
  const o = (r) => {
    const l = new Date(r);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(e.range.endMs) - o(t)) / (24 * gt));
  return `${s === 0 ? "" : s === 1 ? `${i.chart.yesterday} ` : `${n.day(t)} `}${n.time(t)}`;
}
function fi(e, t) {
  return e === void 0 ? m.label : e >= t.critical ? m.alertOnPopup : e >= t.warning ? m.warning : m.white;
}
function ps(e, t, n) {
  const { t: i } = n, o = t ?? e.range.endMs, s = Vt(e.temperature, o), a = Vt(e.humidity, o), r = Qt(e.heating, o, e.range.endMs), l = Number(Qt(e.intensity, o, e.range.endMs) ?? 0), d = Qt(e.target, o, e.range.endMs), c = Qt(e.climate, o, e.range.endMs), p = mi(e, t, n), h = r === void 0 ? "––" : `${i.heatingMode[r]}${r !== "off" && d !== void 0 ? ` · ${n.half(Number(d))} °C` : ""}`, v = c ? i.climateMode[c] : "––", $ = c ? jt[c] : m.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : u`${n.one(s)}<span class="readout-unit">${De}°C</span>`}</span
          >
          ${a === void 0 ? f : u`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${i.required.humidity} </span>${n.percent(Math.round(a))}</span
              >`}
        </span>
        <span class="readout-time">${p}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r === "off" ? m.off : r ? ui[r] : m.label}`}>
          <span class="readout-icon">${ze(r && r !== "off" ? l : 0, r === void 0)}</span>
          ${i.system.heating} ${h}
        </span>
        <span class="readout-system" style=${`color: ${$}`}>
          <span class="readout-icon">${Pt(c ?? "off", $, c === void 0)}</span>
          ${i.system.climate} ${v}
        </span>
      </div>
    </div>
  `;
}
function us(e, t, n, i, o) {
  const s = n ?? e.range.endMs, a = n === void 0 && o !== void 0, r = a ? o.value : Vt(e[t], s), l = t === "co2" && e.pm25.length > 0 ? a && o.secondary ? o.secondary.value : Vt(e.pm25, s) : void 0, d = a && o.secondary?.stale === !0, c = e.limits[t], p = t === "co2" ? "ppm" : "µg/m³";
  return u`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${a && o.stale ? m.label : fi(r, c)}`}
            >${r === void 0 ? "––" : u`${i.whole(r)}<span class="readout-unit">${De}${p}</span>`}</span
          >
          ${t === "co2" && e.pm25.length > 0 ? u`<span class="readout-hum pm25" style=${d ? `color: ${m.label}` : f}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : u`${i.whole(l)}${De}µg/m³`}</span
              >` : f}
        </span>
        <span class="readout-time">${mi(e, n, i)}</span>
      </div>
    </div>
  `;
}
function ms(e, t, n, i, o, s = !1, a) {
  const { range: r } = e, l = t === "temperature" ? void 0 : t, d = (g) => ss(g, r, n), c = l ? e[l] : e.temperature, p = l ? e.limits[l] : void 0, h = l ? is(c.map((g) => g.v), l) : { min: e.tempMin, max: e.tempMax }, v = c.length > 0 ? Math.max(...c.map((g) => g.v)) : -1 / 0, $ = (g) => it - (g - h.min) / (h.max - h.min) * Z, S = (e.humidityMin ?? 0) - 3, C = Math.max((e.humidityMax ?? 100) + 3, S + 12), w = (g) => it - (g - S) / (C - S) * Z, _ = tt + ct(n), E = (g, A) => g.map((R, F) => `${F === 0 ? "M" : "L"}${d(R.t).toFixed(1)} ${A(R.v).toFixed(1)}`).join(" "), M = E(c, $), b = c[0], k = c[c.length - 1], O = b && k ? `${M} L${d(k.t).toFixed(1)} ${it} L${d(b.t).toFixed(1)} ${it} Z` : "";
  let x = "";
  l || e.target.forEach((g, A) => {
    const R = $(Number(g.value)).toFixed(1), F = e.target[A - 1];
    x += F && F.end === g.start ? ` L${d(g.start).toFixed(1)} ${R}` : ` M${d(g.start).toFixed(1)} ${R}`, x += ` L${d(g.end).toFixed(1)} ${R}`;
  });
  const T = ct(n) / Math.max(1, (r.endMs - r.startMs) / gt / qe(r)), z = Math.max(2, Math.round(Z / T)), L = (h.max - h.min) / z, I = [0.5, 1, 2, 5, 10].find((g) => g >= L * 0.8) ?? 10, q = l ? os(h.min, h.max, l, z) : ts(h.min, h.max, I), Y = (g) => l ? o.whole(g) : `${o.tick(g)}°`, $t = p ? [
    { value: p.warning, color: m.warning },
    { value: p.critical, color: m.alertOnPopup }
  ].filter((g) => g.value > h.min && g.value <= v) : [], J = (g) => Math.min(1, Math.max(0, ($(g) - Q) / Z)), D = [];
  if (p && $t.length > 0) {
    const g = $t.some((F) => F.value === p.critical), A = J(p.critical), R = J(p.warning);
    g && D.push([0, m.alertOnPopup], [A, m.alertOnPopup]), D.push([g ? A : 0, m.warning], [R, m.warning], [R, m.white], [1, m.white]);
  }
  const Wt = s ? e.comfort.summer : e.comfort.winter;
  if (!l) {
    const g = J(Wt.max), A = J(Wt.min);
    D.push([0, m.warning], [g, m.warning], [g, m.white], [A, m.white], [A, m.sky], [1, m.sky]);
  }
  const vi = (g) => p ? fi(g, p) : g > Wt.max ? m.warning : g < Wt.min ? m.sky : m.white, Xe = (g, A, R) => g.map((F) => {
    const G = d(F.start);
    return y`<rect x=${G.toFixed(1)} y=${A} width=${Math.max(d(F.end) - G, 0.8).toFixed(1)}
        height=${Xt} rx="2" style=${V(R(F.value))}></rect>`;
  }), me = Go(e, t, s), fe = pi(me.length), $i = fe + hi, Je = Zo(me.length), wi = (g) => g === "heating" ? y`${li(3, !1)}` : g === "climate" ? y`<g style=${B(m.off)}>${Ne("off")}</g>` : g === "ventilation" ? y`<g style=${B(m.fresh)}>${Ne("fan")}</g>` : y`<g style=${B("var(--kd-sky)")}>${di()}</g>`, Qe = (g, A, R, F, G) => g.map((sn) => {
    const an = d(sn.start);
    return y`<rect class=${F} x=${an.toFixed(1)} y=${A} width=${Math.max(d(sn.end) - an, G).toFixed(1)}
        height=${Xt} rx="2" style=${V(R)}></rect>`;
  }), bi = (g, A) => g === "heating" ? y`${Xe(e.heating, A, (R) => Jo[R] ?? m.off)}` : g === "climate" ? y`${Xe(e.climate, A, (R) => cs(R))}` : g === "ventilation" ? y`${Qe(e.ventilation ?? [], A, m.fresh, "ventilation-on", 1.5)}` : y`${Qe(e.windows ?? [], A, "var(--kd-sky)", "window-open", 1.5)}`, Kt = i === void 0 ? void 0 : d(i), ge = i === void 0 ? void 0 : Vt(c, i), yi = rs(r, e.night), tn = (g, A, R, F) => (g ?? []).map(
    (G) => y`<rect class=${R} x=${d(G.start).toFixed(1)} y=${Q}
        width=${Math.max(d(G.end) - d(G.start), 2).toFixed(1)} height=${Z}
        style=${`${V(A)}; opacity: var(${F})`}></rect>`
  ), en = (g) => vi(g), ki = Math.max(...e.pm25.map((g) => g.v), 0), xi = Math.max(ki * (1 + Ke), e.limits.pm25.critical), _i = (g) => it - g / xi * Z, nn = l === "co2" && e.pm25.length > 0 ? E(e.pm25, _i) : "", Si = (g) => [...g].reduce((A, R) => A + (/\d/.test(R) ? 6.7 : 3.6), 0), St = ls(r).map((g) => {
    const A = hs(g, r, o), R = ds(d(g), tt), F = Si(A), G = R.x - F / 2;
    return { x: d(g), text: A, anchored: R, left: G, right: G + F, show: !1 };
  });
  let on = 1 / 0;
  for (let g = St.length - 1; g >= 0; g--)
    St[g].right <= on + 2 && (St[g].show = !0, on = St[g].left);
  return u`
    ${l ? us(e, l, i, o, a) : ps(e, i, o)}
    <svg
      class="chart"
      viewBox="0 0 ${n} ${Je}"
      width=${n}
      height=${Je}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${zn}><path d=${O}></path></clipPath>
        <clipPath id=${bt}>
          <rect x=${tt} y=${Q} width=${ct(n)} height=${Z} rx="8"></rect>
        </clipPath>
        ${D.length > 0 ? y`<linearGradient id=${Nn} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${Q} y2=${it}>
              ${D.map(
    ([g, A]) => y`<stop offset=${`${(g * 100).toFixed(2)}%`} style=${`stop-color: ${A}`}></stop>`
  )}
            </linearGradient>` : f}
      </defs>
      <rect x=${tt} y=${Q} width=${ct(n)} height=${Z} rx="8" style=${V("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${bt})`}>
        ${yi.map(
    ([g, A]) => y`<rect class="night" x=${d(g).toFixed(1)} y=${Q} width=${(d(A) - d(g)).toFixed(1)}
            height=${Z} style=${V("var(--kd-night)")}></rect>`
  )}
        ${l ? tn(e.windows, "var(--kd-sky)", "window-band", "--kd-band-window") : f}
        ${l ? tn(e.ventilation, m.fresh, "ventilation-band", "--kd-band-ventilation") : f}
      </g>
      ${q.map((g) => {
    const A = $(g), R = $t.some((F) => Math.abs($(F.value) - A) < 14);
    return y`<line x1=${tt} x2=${_} y1=${A.toFixed(1)} y2=${A.toFixed(1)}
            style=${B("var(--kd-grid)")} stroke-width="1"></line>
          ${R ? f : y`<text x=${_ + 6} y=${(A + 4).toFixed(1)} style=${V(m.label)} font-size=${Me}>${Y(g)}</text>`}`;
  })}
      ${$t.map(
    (g) => y`<line class="limit-line" x1=${tt} x2=${_} y1=${$(g.value).toFixed(1)} y2=${$(g.value).toFixed(1)}
            style=${B(g.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${_ + 6} y=${($(g.value) + 4).toFixed(1)} style=${V(g.color)} font-size=${Me}
            font-weight="600">${Y(g.value)}</text>`
  )}
      <g clip-path=${`url(#${bt})`}>
        ${O ? y`<path d=${O} style=${V("var(--kd-area)")}></path>` : f}
      </g>
      ${l ? f : y`<g clip-path=${`url(#${zn})`}>
        ${e.intensity.map(
    (g) => y`<rect x=${d(g.start).toFixed(1)} y=${Q}
            width=${Math.max(d(g.end) - d(g.start), 0.8).toFixed(1)} height=${Z}
            style=${V(m.warning)} opacity=${Xo[Number(g.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${nn ? y`<path class="pm25-line" d=${nn} fill="none" style=${B(m.pm25)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${bt})`}></path>` : f}
      ${!l && e.humidity.length > 0 ? y`<path d=${E(e.humidity, w)} fill="none" style=${B(m.humidityLine)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.65"></path>` : f}
      ${x ? y`<path d=${x} fill="none" style=${B(m.plan)} stroke-width="1"
            stroke-dasharray="3 3" opacity="0.45" clip-path=${`url(#${bt})`}></path>` : f}
      ${M ? y`<path class="temperature-curve" d=${M} fill="none"
            style=${B(D.length > 0 ? `url(#${Nn})` : m.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${bt})`}></path>` : f}
      ${k && i === void 0 ? y`<circle class="end-dot" cx=${d(k.t).toFixed(1)} cy=${$(k.v).toFixed(1)} r="4"
            style=${`${V(en(k.v))}; ${B("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : f}

      ${me.map((g, A) => {
    const R = ci + A * se, F = R + (se - Xt) / 2;
    return y`<g class=${`strip-row ${g}`}>
          <rect x=${tt} y=${F} width=${ct(n)} height=${Xt} rx="2" style=${V("var(--kd-fill)")}></rect>
          ${bi(g, F)}
          <g class="strip-icon" transform=${`translate(${_ + 6} ${R + (se - Rn) / 2}) scale(${Rn / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${wi(g)}</g>
        </g>`;
  })}

      ${St.map(
    (g) => y`<line x1=${g.x.toFixed(1)} x2=${g.x.toFixed(1)} y1=${Q} y2=${fe}
            style=${B("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${g.show ? y`<text class="tick" x=${g.anchored.x.toFixed(1)} y=${$i} style=${V(m.label)} font-size=${Me}
                text-anchor=${g.anchored.anchor}>${g.text}</text>` : f}`
  )}
      ${Kt === void 0 ? f : y`<line x1=${Kt.toFixed(1)} x2=${Kt.toFixed(1)} y1=${Q} y2=${fe}
              style=${B(m.white)} stroke-width="1" opacity="0.7"></line>
            ${ge === void 0 ? f : y`<circle cx=${Kt.toFixed(1)} cy=${$(ge).toFixed(1)} r="4"
                  style=${`${V(en(ge))}; ${B("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const In = gt / 4;
function fs(e) {
  return `var(--kd-scene-${e})`;
}
function gs(e) {
  let t;
  switch (e) {
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
  return u`<svg
    viewBox="0 0 150 112"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${t}</svg>`;
}
const yt = 420, vs = 2, $s = 30, ws = 120;
function bs(e) {
  let t, n;
  for (const i of e ?? []) {
    const o = i.state.toLowerCase();
    o === "on" && !t ? (t = { start: i.time }, n = t) : o === "off" && t && (t.end = i.time, t = void 0);
  }
  return n;
}
function ys(e, t, n) {
  return Ut(e, t)?.toLowerCase() === "on" ? !0 : (e ?? []).some((i) => i.time > t && i.time <= n && i.state.toLowerCase() === "on");
}
function Ce(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function ks(e, t, n) {
  return t <= n ? { done: 1, closable: !0 } : e <= n ? { done: 0, closable: !1 } : { done: Math.min(1, Math.max(0, (e - t) / (e - n))), closable: !1 };
}
function xs(e, t, n, i, o) {
  if (o <= yt || n <= o || n <= yt || e - n < $s)
    return;
  const s = (i - t) / 6e4;
  if (!(s >= vs))
    return;
  const a = Math.log((e - yt) / (n - yt)) / s, r = Math.log((n - yt) / (o - yt)) / a;
  if (!(!Number.isFinite(r) || r <= 0 || r > ws))
    return Math.max(1, Math.ceil(r));
}
class _s {
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
  tap(t, n) {
    window.clearTimeout(this.timer);
    const i = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !i || o ? "none" : this.last && this.last.key === t && n - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: n }, "single");
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
function le(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function Ye(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Ss(e, t) {
  return e === "auto" ? Ye(le(t)) : e;
}
function Ms() {
  return Ye(document.documentElement.lang || navigator.language || "");
}
const Hn = /* @__PURE__ */ new WeakMap(), Ts = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Cs = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Es = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ee(e, t) {
  const n = e?.locale?.[t];
  return typeof n == "string" && n !== "" ? n : "language";
}
function As(e, t, n) {
  const i = le(n).replace("_", "-"), o = i !== "" && Ye(i) === t ? i : Ts[t], s = Ee(n, "number_format"), a = Ee(n, "time_format"), r = Ee(n, "date_format"), l = [t, o, s, a, r].join("|");
  let d = Hn.get(e);
  d || (d = /* @__PURE__ */ new Map(), Hn.set(e, d));
  let c = d.get(l);
  return c || (c = Ps(e[t], t, o, s, a, r), d.set(l, c)), c;
}
function Os(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function Ls(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const n = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(n).includes("10");
}
function Ps(e, t, n, i, o, s) {
  const a = Os(n), r = i === "system" ? void 0 : i === "none" ? "en-US" : Es[i] ?? a, l = i === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), v = Ls(o, a), $ = v ? "h12" : "h23", S = new Intl.DateTimeFormat(a, { hour: v ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), C = new Intl.DateTimeFormat(a, v ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), w = s === "system" ? void 0 : a, _ = new Intl.DateTimeFormat(w, { day: "numeric", month: "numeric" }), E = (b) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return _.format(b);
    const k = _.formatToParts(b), O = k.find((I) => I.type === "literal")?.value ?? "/", x = k[k.length - 1], T = x?.type === "literal" ? x.value : "", z = k.find((I) => I.type === "day")?.value ?? "", L = k.find((I) => I.type === "month")?.value ?? "";
    return s === "DMY" ? `${z}${O}${L}${T}` : `${L}${O}${z}${T}`;
  }, M = Cs.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: e,
    one: (b) => d.format(b),
    two: (b) => c.format(b),
    half: (b) => p.format(Math.round(b * 2) / 2),
    tick: (b) => p.format(b),
    whole: (b) => h.format(b),
    percent: (b) => `${b}${M}%`,
    time: (b) => S.format(b),
    hour: (b) => C.format(b),
    day: E
  };
}
const lt = (e, t, n, i) => e === 1 ? t : e >= 2 && e <= 4 ? n : i, Rs = {
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
  noData: (e, t) => `Bez dat · ${e}${t === void 0 ? "" : ` (před ${t})`}`,
  /** A stale value: tooltip, and lower-case at the end of its spoken text ("45 min", "2 h"). */
  lastSeen: (e) => `Naposledy před ${e}`,
  // Header (Dashboard Domov)
  outsideAir: "Vzduch venku:",
  airLevel: { good: "dobrý", moderate: "zhoršený", poor: "špatný" },
  summary: "Souhrn domu",
  // Room card: temperature, humidity, link (Room Card)
  temperatureLabel: (e, t, n, i) => `${e}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${n}, historie místnosti za ${i}`,
  humidityLabel: (e, t, n) => `${e}: vlhkost ${t ?? "neznámá"}${n}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (e, t, n, i) => `${e}: teplota za ${t}${n ? ` ${n}` : ""}, historie místnosti za ${i}`,
  link: { page: "Otevře stránku místnosti.", web: "Otevře odkaz." },
  // CO₂ and PM2.5
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (e, t, n, i) => `${e} ${t ?? "neznámé"}${n ? `, ${n}` : ""}${i}`,
  airDescription: (e, t, n) => `${e}: kvalita vzduchu, ${t || "bez čidla"}. Otevře graf za ${n}.`,
  detailsAndHistory: "Detail a historie",
  /** A value that is not known, for screen readers ("––" on screen). */
  unknownValue: "neznámé",
  trend: { rising: "stoupá", falling: "klesá", stable: "stabilní" },
  /** Direction of a micro trend over its period: "za 2 hodiny stoupá". */
  trendOver: (e, t) => `za ${t} ${e}`,
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
  hvacDescription: (e, t, n) => `${e}: ${t}.${n ? ` Otevře ovládání ${n === "heating" ? "Topení" : "Klimatizace"}.` : ""}`,
  // Window (Vizuální pravidla)
  window: {
    open: "Otevřeno",
    /** Two or more windows of the room are open. */
    openCount: (e) => `Otevřena ${e}`,
    closed: "Zavřeno",
    /** Name in the "Okna" popup of a window without `name` in the YAML. */
    defaultName: (e) => `Okno ${e}`,
    popup: "Okna",
    spokenSingle: (e, t) => e === "unknown" ? "okno neznámé" : `okno ${e === "open" ? "otevřené" : "zavřené"}${t === void 0 ? "" : `, otevřené ${t}`}`,
    spokenOneOpen: (e, t) => `okno ${e} otevřené${t === void 0 ? "" : ` ${t}`}`,
    spokenManyOpen: (e, t) => `otevřená okna ${e}${t === void 0 ? "" : `, nejdéle ${t}`}`,
    spokenAllClosed: "všechna okna zavřená",
    spokenUnknown: "stav oken neznámý",
    conflict: { heating: "otevřené okno při topení", cooling: "otevřené okno při chlazení" },
    description: (e, t, n, i) => `${e}: ${t}${n ? `; konflikt: ${n}` : ""}. ${i ? "Otevře přehled oken." : "Otevře detail a historii."}`
  },
  // Blind and its presets (Žaluzie)
  cover: {
    label: (e, t, n) => `${e}: žaluzie, ${t}${n ? ", pohybuje se" : ""}. Otevřít ovládání.`,
    position: (e, t) => `poloha ${e} %, naklopení ${t} %`,
    unknown: "poloha nebo naklopení neznámé",
    presets: (e) => `${e}: předvolby žaluzií`,
    preset: (e, t, n, i) => `${e}: žaluzie ${t}, ${n}. ${i ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná."}`,
    /** Name and description of a preset without them in the YAML, by its icon. */
    presetName: { open: "Den", shade: "Stín", dark: "Tma" },
    presetDescription: { open: "vytaženo nahoru", shade: "spuštěno, lamely otevřené", dark: "úplné zatemnění" },
    hint: "Podržte nebo klepněte dvakrát",
    unavailable: "Žaluzie je nedostupná",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Nepodařilo se odeslat",
    failed: (e) => `${e}: skript žaluzií se nepodařilo spustit.`
  },
  // Popups (Detail místnosti, Ovládání Topení a Klimatizace)
  sheet: {
    close: "Zavřít",
    history: (e) => `Historie místnosti – ${e} h`,
    entityUnavailable: "Entita je nedostupná.",
    noModes: "Entita neuvádí podporované režimy.",
    modes: (e) => `${e}: režim`,
    presets: "Předvolby",
    systems: "Systém",
    allRooms: "Všechny místnosti",
    now: (e) => `Teď ${e}`,
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
      temperatureSlider: "Cílová teplota",
      duration: "Jak dlouho",
      durationSlider: "Doba trvání",
      nextPlan: "Do další změny plánu",
      untilResumed: "Dokud neobnovíte plán",
      until: (e) => `do ${e}`,
      appliesOnClose: "Použije se po zavření okna",
      remaining: (e) => `Zbývá ${e}`,
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
      footOffTimed: (e) => `Vypnuto do ${e}, potom pokračuje plán.`,
      footTimed: (e, t) => `Platí do ${e}, potom ${t}.`,
      afterPlanText: "přejde do Plánu",
      afterOffText: "se topení vypne",
      acFootForever: "Klimatizace běží, dokud ji nevypnete.",
      acFootTimed: (e) => `Běží do ${e}, potom se klimatizace vypne.`
    },
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (e) => `Za ${e === 1 ? "poslední hodinu" : e >= 2 && e <= 4 ? `poslední ${e} hodiny` : `posledních ${e} hodin`} nejsou k dispozici data.`,
    chart: (e) => `Graf za ${e}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`
  },
  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera"
  },
  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (e) => `${e} ${lt(e, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (e) => `${e} ${lt(e, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    boost: "Boost",
    boostSpoken: "Topení v režimu Boost",
    manualSpoken: "Topení ručně",
    heating: (e) => `Topí ${e}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá",
    ventilation: "Větrací režim",
    ventilationSpoken: "Zapnutý. Otevře podrobnosti a ukončení.",
    ventilationOffSpoken: "Vypnutý. Otevře poslední větrání."
  },
  // Větrací režim: popup ze štítku souhrnu domu (CURRENT_SPEC.md, Větrací režim)
  ventilation: {
    title: "Větrací režim",
    running: "Běží",
    endsBy: "Skončí nejpozději",
    sentence: "Dřív skončí zavřením posledního okna.",
    end: "Ukončit",
    ending: "Ukončuje se…",
    ended: "Větrací režim skončil.",
    last: "Poslední větrání",
    never: "Zatím žádné větrání.",
    canClose: "Lze zavřít okna",
    yes: "Ano",
    notYet: "Ještě ne",
    remaining: "Do cíle zbývá asi",
    done: "hotovo",
    goalShort: (e) => `CO₂ ${e} ppm nebo méně`,
    goal: (e) => `Cíl: CO₂ ${e} ppm nebo méně.`,
    co2Range: (e, t) => `CO₂ ${e} → ${t} ppm`,
    minutes: (e) => `${e} min`,
    roomSpoken: (e, t, n, i) => `${e}: CO₂ z ${t} na ${n} ppm, hotovo ${i}`
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (e) => `${e} ${lt(e, "minuta", "minuty", "minut")}`,
    hour: (e) => `${e} ${lt(e, "hodina", "hodiny", "hodin")}`,
    day: (e) => `${e} ${lt(e, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (e) => `${e} ${lt(e, "minutu", "minuty", "minut")}`,
    hour: (e) => `${e} ${lt(e, "hodinu", "hodiny", "hodin")}`
  }
}, At = (e, t, n) => e === 1 ? t : n, zs = {
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
  noData: (e, t) => `No data · ${e}${t === void 0 ? "" : ` (${t} ago)`}`,
  lastSeen: (e) => `Last report ${e} ago`,
  outsideAir: "Outdoor air:",
  airLevel: { good: "good", moderate: "moderate", poor: "poor" },
  summary: "Home summary",
  temperatureLabel: (e, t, n, i) => `${e}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${n}, room history for ${i}`,
  humidityLabel: (e, t, n) => `${e}: humidity ${t ?? "unknown"}${n}, details and history`,
  temperatureTrendLabel: (e, t, n, i) => `${e}: temperature${n ? ` ${n}` : ""} over ${t}, room history for ${i}`,
  link: { page: "Opens the room page.", web: "Opens the link." },
  airSensor: (e, t, n, i) => `${e} ${t ?? "unknown"}${n ? `, ${n}` : ""}${i}`,
  airDescription: (e, t, n) => `${e}: air quality, ${t || "no sensor"}. Opens the chart for ${n}.`,
  detailsAndHistory: "Details and history",
  unknownValue: "unknown",
  trend: { rising: "rising", falling: "falling", stable: "stable" },
  trendOver: (e, t) => `${e} over ${t}`,
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
  hvacDescription: (e, t, n) => `${e}: ${t}.${n ? ` Opens the ${n === "heating" ? "heating" : "air conditioning"} controls.` : ""}`,
  window: {
    open: "Open",
    openCount: (e) => `${e} open`,
    closed: "Closed",
    defaultName: (e) => `Window ${e}`,
    popup: "Windows",
    spokenSingle: (e, t) => e === "unknown" ? "window state unknown" : e === "closed" ? "window closed" : `window open${t === void 0 ? "" : ` for ${t}`}`,
    spokenOneOpen: (e, t) => `window ${e} open${t === void 0 ? "" : ` for ${t}`}`,
    spokenManyOpen: (e, t) => `windows ${e} open${t === void 0 ? "" : `, the longest for ${t}`}`,
    spokenAllClosed: "all windows closed",
    spokenUnknown: "state of the windows unknown",
    conflict: { heating: "window open while heating", cooling: "window open while cooling" },
    description: (e, t, n, i) => `${e}: ${t}${n ? `; conflict: ${n}` : ""}. ${i ? "Opens the window overview." : "Opens details and history."}`
  },
  cover: {
    label: (e, t, n) => `${e}: blind, ${t}${n ? ", moving" : ""}. Opens the controls.`,
    position: (e, t) => `position ${e}%, tilt ${t}%`,
    unknown: "position or tilt unknown",
    presets: (e) => `${e}: blind presets`,
    preset: (e, t, n, i) => `${e}: blind preset ${t}, ${n}. ${i ? "Double-tap or hold to run it." : "The blind is unavailable."}`,
    presetName: { open: "Day", shade: "Shade", dark: "Dark" },
    presetDescription: { open: "raised", shade: "lowered, slats open", dark: "full blackout" },
    hint: "Hold or double-tap",
    unavailable: "The blind is unavailable",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Could not send",
    failed: (e) => `${e}: the blind script could not be started.`
  },
  sheet: {
    close: "Close",
    history: (e) => `Room history – ${e} h`,
    entityUnavailable: "The entity is unavailable.",
    noModes: "The entity lists no supported modes.",
    modes: (e) => `${e}: mode`,
    presets: "Presets",
    systems: "System",
    allRooms: "All rooms",
    now: (e) => `Now ${e}`,
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
      temperatureSlider: "Target temperature",
      duration: "For how long",
      durationSlider: "Duration",
      nextPlan: "Until the next schedule change",
      untilResumed: "Until you resume the schedule",
      until: (e) => `until ${e}`,
      appliesOnClose: "Applied when you close this window",
      remaining: (e) => `${e} left`,
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
      footOffTimed: (e) => `Off until ${e}, then the schedule continues.`,
      footTimed: (e, t) => `Applies until ${e}, then ${t}.`,
      afterPlanText: "returns to the schedule",
      afterOffText: "the heating switches off",
      acFootForever: "The air conditioner runs until you switch it off.",
      acFootTimed: (e) => `Runs until ${e}, then the air conditioner switches off.`
    },
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (e) => `No data for ${e === 1 ? "the last hour" : `the last ${e} hours`}.`,
    chart: (e) => `Chart of ${e}. The left and right arrow keys move through time, the End key returns to now.`
  },
  chart: {
    now: "Now",
    yesterday: "yesterday"
  },
  summaryChips: {
    rooms: (e) => `${e} ${At(e, "room", "rooms")}`,
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
    windowsOpen: (e) => `${e} ${At(e, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    boost: "Boost",
    boostSpoken: "Heating in boost",
    manualSpoken: "Heating set manually",
    heating: (e) => `Heating in ${e}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on",
    ventilation: "Ventilation mode",
    ventilationSpoken: "On. Opens the details and lets you end it.",
    ventilationOffSpoken: "Off. Opens the last ventilation."
  },
  ventilation: {
    title: "Ventilation mode",
    running: "Running",
    endsBy: "Ends by",
    sentence: "It ends sooner if the last window is closed.",
    end: "End",
    ending: "Ending…",
    ended: "Ventilation mode has ended.",
    last: "Last ventilation",
    never: "No ventilation yet.",
    canClose: "Windows can be closed",
    yes: "Yes",
    notYet: "Not yet",
    remaining: "Time to goal (est.)",
    done: "done",
    goalShort: (e) => `CO₂ ${e} ppm or less`,
    goal: (e) => `Goal: CO₂ ${e} ppm or less.`,
    co2Range: (e, t) => `CO₂ ${e} → ${t} ppm`,
    minutes: (e) => `${e} min`,
    roomSpoken: (e, t, n, i) => `${e}: CO₂ from ${t} to ${n} ppm, ${i} done`
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (e) => `${e} ${At(e, "minute", "minutes")}`,
    hour: (e) => `${e} ${At(e, "hour", "hours")}`,
    day: (e) => `${e} ${At(e, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (e) => e === 1 ? "the last minute" : `the last ${e} minutes`,
    hour: (e) => e === 1 ? "the last hour" : `the last ${e} hours`
  }
}, te = (e, t, n) => e === 1 ? t : n, Ns = {
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
  noData: (e, t) => `Inga data · ${e}${t === void 0 ? "" : ` (för ${t} sedan)`}`,
  lastSeen: (e) => `Senaste rapport för ${e} sedan`,
  outsideAir: "Utomhusluft:",
  airLevel: { good: "bra", moderate: "måttlig", poor: "dålig" },
  summary: "Sammanfattning av hemmet",
  temperatureLabel: (e, t, n, i) => `${e}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${n}, rumshistorik för ${i}`,
  humidityLabel: (e, t, n) => `${e}: luftfuktighet ${t ?? "okänd"}${n}, detaljer och historik`,
  temperatureTrendLabel: (e, t, n, i) => `${e}: temperaturen${n ? ` ${n}` : ""} under ${t}, rumshistorik för ${i}`,
  link: { page: "Öppnar rummets sida.", web: "Öppnar länken." },
  airSensor: (e, t, n, i) => `${e} ${t ?? "okänt"}${n ? `, ${n}` : ""}${i}`,
  airDescription: (e, t, n) => `${e}: luftkvalitet, ${t || "ingen sensor"}. Öppnar diagrammet för ${n}.`,
  detailsAndHistory: "Detaljer och historik",
  unknownValue: "okänt",
  trend: { rising: "stiger", falling: "sjunker", stable: "stabil" },
  trendOver: (e, t) => `${e} under ${t}`,
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
  hvacDescription: (e, t, n) => `${e}: ${t}.${n ? ` Öppnar styrningen av ${n === "heating" ? "värmen" : "luftkonditioneringen"}.` : ""}`,
  window: {
    open: "Öppet",
    openCount: (e) => `${e} öppna`,
    closed: "Stängt",
    defaultName: (e) => `Fönster ${e}`,
    popup: "Fönster",
    spokenSingle: (e, t) => e === "unknown" ? "fönstrets läge okänt" : e === "closed" ? "fönstret stängt" : `fönstret öppet${t === void 0 ? "" : ` i ${t}`}`,
    spokenOneOpen: (e, t) => `fönstret ${e} öppet${t === void 0 ? "" : ` i ${t}`}`,
    spokenManyOpen: (e, t) => `fönstren ${e} öppna${t === void 0 ? "" : `, längst i ${t}`}`,
    spokenAllClosed: "alla fönster stängda",
    spokenUnknown: "fönstrens läge okänt",
    conflict: { heating: "öppet fönster under uppvärmning", cooling: "öppet fönster under kylning" },
    description: (e, t, n, i) => `${e}: ${t}${n ? `; konflikt: ${n}` : ""}. ${i ? "Öppnar fönsteröversikten." : "Öppnar detaljer och historik."}`
  },
  cover: {
    label: (e, t, n) => `${e}: persienn, ${t}${n ? ", rör sig" : ""}. Öppnar styrningen.`,
    position: (e, t) => `position ${e} %, lutning ${t} %`,
    unknown: "position eller lutning okänd",
    presets: (e) => `${e}: förval för persiennen`,
    preset: (e, t, n, i) => `${e}: persiennförval ${t}, ${n}. ${i ? "Dubbeltryck eller håll in för att köra det." : "Persiennen är inte tillgänglig."}`,
    presetName: { open: "Dag", shade: "Skugga", dark: "Mörker" },
    presetDescription: { open: "uppdragen", shade: "nerdragen, lamellerna öppna", dark: "full mörkläggning" },
    hint: "Håll in eller dubbeltryck",
    unavailable: "Persiennen är inte tillgänglig",
    /** Short text of the bubble at the button; `failed` is the full sentence for screen readers. */
    failedHint: "Kunde inte skickas",
    failed: (e) => `${e}: persiennskriptet kunde inte startas.`
  },
  sheet: {
    close: "Stäng",
    history: (e) => `Rumshistorik – ${e} h`,
    entityUnavailable: "Entiteten är inte tillgänglig.",
    noModes: "Entiteten anger inga lägen som stöds.",
    modes: (e) => `${e}: läge`,
    presets: "Förval",
    systems: "System",
    allRooms: "Alla rum",
    now: (e) => `Nu ${e}`,
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
      temperatureSlider: "Måltemperatur",
      duration: "Hur länge",
      durationSlider: "Varaktighet",
      nextPlan: "Till nästa schemaändring",
      untilResumed: "Tills du återupptar schemat",
      until: (e) => `till ${e}`,
      appliesOnClose: "Tillämpas när du stänger fönstret",
      remaining: (e) => `${e} kvar`,
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
      footOffTimed: (e) => `Av till ${e}, sedan fortsätter schemat.`,
      footTimed: (e, t) => `Gäller till ${e}, sedan ${t}.`,
      afterPlanText: "går värmen tillbaka till schemat",
      afterOffText: "stängs värmen av",
      acFootForever: "Luftkonditioneringen går tills du stänger av den.",
      acFootTimed: (e) => `Går till ${e}, sedan stängs luftkonditioneringen av.`
    },
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (e) => `Inga data för ${e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`}.`,
    chart: (e) => `Diagram över ${e}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`
  },
  chart: {
    now: "Nu",
    yesterday: "igår"
  },
  summaryChips: {
    rooms: (e) => `${e} rum`,
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
    windowsOpen: (e) => `${e} fönster ${te(e, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    boost: "Boost",
    boostSpoken: "Värme i boost",
    manualSpoken: "Värme i manuellt läge",
    heating: (e) => `Värme i ${e}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på",
    ventilation: "Ventilationsläge",
    ventilationSpoken: "På. Öppnar detaljer och låter dig avsluta.",
    ventilationOffSpoken: "Av. Öppnar senaste ventilationen."
  },
  ventilation: {
    title: "Ventilationsläge",
    running: "Pågår",
    endsBy: "Slutar senast",
    sentence: "Det slutar tidigare om det sista fönstret stängs.",
    end: "Avsluta",
    ending: "Avslutar…",
    ended: "Ventilationsläget har avslutats.",
    last: "Senaste ventilationen",
    never: "Ingen ventilation än.",
    canClose: "Fönstren kan stängas",
    yes: "Ja",
    notYet: "Inte än",
    remaining: "Tid till målet (ca)",
    done: "klart",
    goalShort: (e) => `CO₂ ${e} ppm eller lägre`,
    goal: (e) => `Mål: CO₂ ${e} ppm eller lägre.`,
    co2Range: (e, t) => `CO₂ ${e} → ${t} ppm`,
    minutes: (e) => `${e} min`,
    roomSpoken: (e, t, n, i) => `${e}: CO₂ från ${t} till ${n} ppm, ${i} klart`
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (e) => `${e} ${te(e, "minut", "minuter")}`,
    hour: (e) => `${e} ${te(e, "timme", "timmar")}`,
    day: (e) => `${e} ${te(e, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (e) => e === 1 ? "den senaste minuten" : `de senaste ${e} minuterna`,
    hour: (e) => e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`
  }
}, Ds = { cs: Rs, en: zs, sv: Ns };
function Ie(e, t) {
  return As(Ds, e, t);
}
const Is = Ti`
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
      --kd-fresh: #30d158;
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
      --kd-band-window: 0.14;
      --kd-band-ventilation: 0.2;
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
      --kd-fresh: #1e7b34;
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
      --kd-band-window: 0.1;
      --kd-band-ventilation: 0.14;
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

    /* Title row of a card with the ventilation mode: the title on the left, the button on the right
       (above the blind buttons); the row keeps its height whatever the button shows. */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
    }

    .plain-button.vent-trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex: none;
      min-width: 36px;
      height: 36px;
      margin-left: auto;
      box-sizing: border-box;
      justify-content: center;
      border-radius: 18px;
      color: var(--vent-color);
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      background: color-mix(in srgb, var(--vent-color) var(--kd-chip-tint), var(--kd-card-bg));
    }

    .vent-trigger.on {
      --vent-color: var(--kd-fresh);
      padding: 0 16px 0 11px;
    }

    /* Idle: the grey of the "Ukončit" button (24 %), opaque like the running state, so the circle stays visible on a
       light page and the icon contrast does not depend on the page behind the card. */
    .vent-trigger.off {
      --vent-color: var(--kd-label);
      padding: 0;
      background: color-mix(in srgb, rgb(118 118 128) 24%, var(--kd-card-bg));
    }

    /* The touch area is 44 px (the button itself 36 px). */
    .vent-trigger::after {
      content: "";
      position: absolute;
      inset: -4px;
    }

    /* The blades fill about 70 % of the 24 px frame, so 26 px gives a glyph of about 18 px. */
    .vent-icon {
      display: flex;
      width: 26px;
      height: 26px;
    }

    .vent-icon svg {
      width: 26px;
      height: 26px;
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
      outline: 2px solid var(--kd-sky);
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

    .sheet:focus {
      outline: none;
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

    /* A 30 px circle (normal button of the kit) inside a 44 px touch area. */
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      margin: -8px -8px 0 0;
      color: var(--kd-label);
    }

    .close-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--kd-segmented-bg);
    }

    .close:active .close-icon {
      background: rgb(118 118 128 / 36%);
    }

    .close:focus-visible {
      border-radius: 50%;
      outline: 2px solid var(--kd-sky);
      outline-offset: -2px;
    }

    .close svg {
      width: 12px;
      height: 12px;
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

    /* Lists in popups (Kvalita vzduchu, Okna, Větrací režim) follow the kit, Seznam: one group of rows with a 12 px
       radius and a separator between rows; the name is 17 px, the secondary text 13 px, the value 17 px. */
    .list-options {
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
      border-radius: 12px;
      background: var(--kd-fill);
      overflow: hidden;
    }

    .list-option {
      width: 100%;
      min-height: 56px;
      padding: 8px 16px;
      border: 0;
      border-radius: 0;
      background: transparent;
      font-size: 17px;
      text-align: left;
    }

    .list-option + .list-option {
      border-top: 1px solid var(--kd-fill-border);
    }

    /* Focus ring inside the row, in the contrast colour of the card, with the group's rounded corners kept. */
    .list-option:focus-visible {
      outline: 2px solid var(--kd-sky);
      outline-offset: -2px;
      border-radius: 0;
    }

    .list-option:first-child:focus-visible {
      border-radius: 12px 12px 0 0;
    }

    .list-option:last-child:focus-visible {
      border-radius: 0 0 12px 12px;
    }

    .list-option:first-child:last-child:focus-visible {
      border-radius: 12px;
    }

    .list-option:active:not(:disabled) {
      background: rgb(118 118 128 / 18%);
    }

    /* Chevron: the row opens a detail (kit, Seznam). */
    .list-chevron {
      flex: none;
      margin-left: -4px;
      color: var(--kd-label);
      font-size: 22px;
      line-height: 1;
    }

    /* A missing value is neutral grey, never the colour of a real value (CURRENT_SPEC.md, Chybějící data). */
    .no-data {
      color: var(--kd-label);
    }

    .list-option .option-hint,
    .static-row .vent-co2 {
      font-size: 13px;
      line-height: 18px;
    }

    /* Okna: state and duration under the name ("Otevřeno · 12 min"), in the colour of the state. */
    .list-option .window-state {
      font-size: 15px;
      line-height: 20px;
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

    /* Větrací režim: fakta bez ovládání jako jedna skupina s oddělovačem (kit, Seznam), ne dlaždice jako klikací řádky. */
    .static-list {
      border-radius: 12px;
      background: var(--kd-fill);
    }

    .static-row {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 56px;
      padding: 8px 16px;
      color: var(--kd-text);
      font-size: 17px;
    }

    .static-row + .static-row {
      border-top: 1px solid var(--kd-fill-border);
    }

    /* Větrací režim: procenta s popiskem pod nimi, vpravo. */
    .vent-percent {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      line-height: 22px;
    }

    .vent-percent .vent-co2 {
      line-height: 16px;
    }

    /* Větrací režim: řádek místnosti, druhý řádek je CO₂ od začátku do teď. */
    .vent-co2 {
      color: var(--kd-label);
      font-size: 13px;
      font-variant-numeric: tabular-nums;
    }

    .timer-foot.error {
      color: var(--kd-warning);
      font-size: 14px;
    }

    /* Ukončit: normální tlačítko ze společného jazyka, 48 px, kapsle (rozhodnutí 27. 10.). */
    .vent-end {
      display: block;
      width: 100%;
      min-height: 48px;
      margin: 8px 0 0;
      border-radius: 24px;
      background: rgb(118 118 128 / 24%);
      color: var(--kd-text);
      font-size: 17px;
      text-align: center;
    }

    .vent-end:active:not(:disabled) {
      background: rgb(118 118 128 / 38%);
    }

    .vent-end:disabled {
      color: var(--kd-label);
    }

    /* Fokus jen programově (po zániku štítku Větrací režim), bez rámečku. */
    .summary:focus,
    .dashboard-header:focus,
    .room:focus {
      outline: none;
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

    /* Summary chip that opens the popup for the rooms it names: 44 px high touch target, the chip stays 30 px
       (44 px button - 2 x 13 px margin = the 18 px line; the chip's own 6 px padding makes the 30 px). */
    .chip-open {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 44px;
      margin: -13px -12px -13px -9px;
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
      outline: 2px solid var(--kd-sky);
      outline-offset: 2px;
    }

    .readout {
      display: grid;
      gap: 2px;
      min-height: 52px;
      margin: 12px 0;
    }

    .readout.single {
      min-height: 0;
    }

    /* Value (and humidity) on the left, the time on the right: the number does not jump when the time gets longer ("včera 22:15"). */
    .readout-main {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      font-variant-numeric: tabular-nums;
    }

    .readout-values {
      display: flex;
      align-items: baseline;
      gap: 14px;
      min-width: 0;
    }

    .readout-time {
      flex: none;
      color: var(--kd-label);
      font-size: 15px;
      text-align: right;
    }

    .readout-temp {
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
      white-space: nowrap;
    }

    .readout-unit {
      color: var(--kd-label);
      font-size: 15px;
      font-weight: 400;
    }

    /* Humidity is the dashed blue line of the chart: a sample of that line stands for the missing label. */
    .readout-hum {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--kd-sky);
      font-size: 15px;
      white-space: nowrap;
    }

    .readout-swatch {
      width: 14px;
      border-top: 2px dashed currentColor;
    }

    .readout-hum.pm25 {
      color: var(--kd-pm25);
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
      overflow: visible;
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
`, Hs = " ";
function Fn(e) {
  if (!e || K(e.state.toLowerCase()))
    return;
  const t = Number.parseFloat(e.state);
  return Number.isFinite(t) ? t : void 0;
}
function He(e, t) {
  return e === void 0 ? "" : `· ${t.half(e)}${Hs}°C`;
}
function Fs(e, t, n, i, o, s) {
  const a = s.t.heatingMode, r = e?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || K(l), c = Fn(n), p = ri(r, l, c);
  if (p === "off")
    return { label: a.off, color: m.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || r === void 0 || K(r))
    return { label: "––", color: m.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const h = Qn(Fn(i), o);
  if (p === "schedule")
    return { label: a.schedule, color: m.plan, active: !0, extra: He(c, s), unknown: !1, overlay: "schedule", waves: h };
  if (p === "manual") {
    const v = c === ue ? "boost" : "manual";
    return { label: a.manual, color: m.warning, active: !0, extra: He(c, s), unknown: !1, overlay: "manual", override: v, waves: h };
  }
  return { label: t?.state ?? "––", color: m.warning, active: !0, extra: "", unknown: !1, waves: h };
}
function de(e, t) {
  let n = "unknown", i, o;
  if (e && !K(e.state.toLowerCase())) {
    const a = e.state.toLowerCase(), r = String(e.attributes.preset_mode ?? "none").toLowerCase();
    a === "off" ? n = "off" : a === "cool" ? n = r === "wind_free" ? "wind_free" : "cool" : a === "dry" ? n = "dry" : a === "fan_only" ? n = "fan" : a === "heat" ? n = "heat" : (a === "auto" || a === "heat_cool") && (n = "auto"), n !== "off" && n !== "unknown" && n !== "wind_free" && r !== "none" && r !== "" && (i = oe(r)), o = dt(e.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(n);
  return {
    mode: n,
    label: i ?? t.t.climateMode[n],
    color: jt[n],
    active: n !== "off" && n !== "unknown",
    extra: s ? He(o, t) : "",
    unknown: n === "unknown"
  };
}
function js(e, t) {
  const n = e.unknown ? t.t.unknownState : e.label;
  return e.extra ? `${n} ${e.extra.replace(/^·\s*/, "")}` : n;
}
function ee(e, t) {
  return e.length <= 2 ? e.join(", ") : t.t.summaryChips.rooms(e.length);
}
function ce(e, t) {
  return e.windows.filter((n) => t(n.entity)?.state.toLowerCase() === "on");
}
function Ge(e, t, n) {
  return Fs(
    t(e.heating?.climate),
    t(e.heating?.overlay),
    t(e.heating?.target),
    t(e.heating?.intensity),
    e.thresholds,
    n
  );
}
function gi(e, t, n, i) {
  const o = ce(e, t).length > 0, s = Ge(e, t, i), a = e.air_conditioner ? de(t(e.air_conditioner), i).mode : "unknown", r = !s.unknown && s.waves > 0 || a === "heat", l = a === "cool" || a === "wind_free", d = [];
  return o && r && d.push("window-heating"), o && l ? d.push("window-cooling") : l && n && d.push("cooling-cold"), d;
}
function Us(e, t, n, i) {
  const o = i.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, a = [], r = [], l = [], d = [];
  let c = 0;
  const p = [], h = new Map(e.map((w) => [w.name, ei(w, i.language)])), v = (w) => w.map((_) => h.get(_) ?? _);
  for (const w of e) {
    for (const M of gi(w, t, n.has(w.name), i))
      s[M].push(w.name);
    const _ = ce(w, t).length;
    _ > 0 && a.push([w.name, _]);
    const E = Ge(w, t, i);
    E.override === "boost" ? l.push(w.name) : E.override === "manual" && r.push(w.name), E.waves > 0 && (d.push(w.name), c = Math.max(c, E.waves)), w.air_conditioner && de(t(w.air_conditioner), i).active && p.push(w.name);
  }
  const $ = [], S = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [w, _] of S)
    s[w].length > 0 && $.push({
      kind: _,
      text: `${o.conflict[w]}: ${ee(v(s[w]), i)}`,
      color: m.warning,
      spoken: `${o.conflictSpoken[w]}: ${v(s[w]).join(", ")}`
    });
  const C = a.reduce((w, [, _]) => w + _, 0);
  return C > 0 && $.push({
    kind: "windows",
    text: o.windowsOpen(C),
    color: m.sky,
    spoken: `${o.windowsSpoken}: ${a.map(([w, _]) => _ > 1 ? `${h.get(w) ?? w} (${_})` : h.get(w) ?? w).join(", ")}`
  }), r.length > 0 && $.push({
    kind: "manual",
    text: `${o.manual}: ${ee(v(r), i)}`,
    color: m.warning,
    spoken: `${o.manualSpoken}: ${v(r).join(", ")}`,
    opens: { system: "heating", rooms: r }
  }), l.length > 0 && $.push({
    kind: "boost",
    text: `${o.boost}: ${ee(v(l), i)}`,
    color: m.warning,
    spoken: `${o.boostSpoken}: ${v(l).join(", ")}`,
    opens: { system: "heating", rooms: l }
  }), d.length > 0 && $.push({
    kind: "heating",
    text: o.heating(o.rooms(d.length)),
    color: m.warning,
    spoken: `${o.heatingSpoken}: ${v(d).join(", ")}`,
    waves: c,
    opens: { system: "heating", rooms: d }
  }), p.length > 0 && $.push({
    kind: "climate",
    text: `${o.climate}: ${ee(v(p), i)}`,
    color: m.cool,
    spoken: `${o.climateSpoken}: ${v(p).join(", ")}`,
    opens: { system: "climate", rooms: p }
  }), $;
}
var Vs = Object.defineProperty, H = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, n, o) || o);
  return o && Vs(t, n, o), o;
};
const jn = "klima-dashboard.after-timer", Bs = 5 * 6e4, Ws = 3e4, et = " ", Ks = 550, Un = 400, qs = 700, Ys = "(orientation: landscape) and (max-height: 600px)", Gs = 1600, Zs = 5e3, Xs = 100, Js = 0.6, Qs = 6;
function ta(e) {
  return e === void 0 ? void 0 : e.mode === "manual" ? "heat" : e.mode === "plan" ? "auto" : e.mode;
}
const Ze = class Ze extends zt {
  constructor() {
    super(...arguments), this._i18n = Ie("en"), this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new _s(() => ({ holdMs: Ks, doubleTapMs: Un })), this._movingWatch = /* @__PURE__ */ new Map(), this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const n = this._historyModel, i = t.currentTarget.querySelector("svg.chart");
      if (!n || !i)
        return;
      const o = i.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = as((t.clientX - o.left) * s / Math.max(o.width, 1), s, n.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const n = this._historyModel;
      if (!n)
        return;
      const { startMs: i, endMs: o } = n.range, s = this._scrubTime ?? o;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const a = s + (t.key === "ArrowLeft" ? -In : In);
        this._scrubTime = a >= o ? void 0 : Math.max(i, a);
      } else if (t.key === "Home")
        this._scrubTime = i;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY, this._touchOnSlider = t.composedPath().some((n) => n instanceof HTMLInputElement && n.type === "range" || n instanceof HTMLElement && "drag" in n.dataset);
    }, this.sheetTouchMove = (t) => {
      this._touchOnSlider || t.cancelable && this.sheetCannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this._touchY ?? 0)) && t.preventDefault();
    }, this.sheetWheel = (t) => {
      t.cancelable && !t.ctrlKey && this.sheetCannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this._drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now(), dragging: !1 });
    }, this.dragMove = (t) => {
      const n = this._drag;
      if (!n || n.pointerId !== t.pointerId)
        return;
      const i = t.clientY - n.startY;
      if (!n.dragging) {
        if (i < Qs)
          return;
        n.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const n = this._drag;
      if (this._drag = void 0, !n || !n.dragging)
        return;
      const i = Math.max(0, t.clientY - n.startY), o = i / Math.max(1, performance.now() - n.startTime);
      t.type === "pointerup" && (i > Xs || o > Js) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const n = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet input:not([disabled]), .sheet .chart-wrap'
        )
      ];
      if (n.length === 0)
        return;
      const i = this.renderRoot.activeElement, o = i ? n.indexOf(i) : -1, s = t.shiftKey ? n[o <= 0 ? n.length - 1 : o - 1] : n[o === -1 || o === n.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Oo(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, Ws), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._gesture.dispose();
    for (const t of [this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), window.clearTimeout(this._endTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const n = t.get("hass");
      return n?.themes?.darkMode !== this.hass?.themes?.darkMode || le(n) !== le(this.hass) || ["number_format", "time_format", "date_format"].some(
        (i) => n?.locale?.[i] !== this.hass?.locale?.[i]
      ) || this.hasRelevantEntityChanged(n);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const n = this.theme();
    this.dataset.theme !== n && (this.dataset.theme = n), this._i18n = Ie(Ss(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
    const i = this.ventilationOn();
    i !== this._ventOn && (this._ventOn = i, this._ventilationEnding = !1, this._sheet?.kind === "ventilation" && (this._announcement = i ? "" : this._i18n.t.ventilation.ended, this.loadVentilation()));
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
    const n = this.hass?.themes?.darkMode;
    return (typeof n == "boolean" ? n : this._prefersDark) ? "dark" : "light";
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, Bs)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => ce(t, (n) => this.getState(n)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const n of co(this._config)) {
      const i = t.states[n], o = this.hass.states[n];
      if (i?.state !== o?.state || i?.last_updated !== o?.last_updated || !po(i?.attributes, o?.attributes))
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
    const t = st(this.entityState(this._config.houseModeEntity) ?? ""), n = t === st(this._config.houseModes.summer), i = n || t === st(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), a = Ft(this._config.title, this._i18n.language) ?? this._i18n.t.title, r = this.renderOutside(), l = Us(
      this._config.rooms,
      (p) => this.getState(p),
      this.coldRooms(n, i, s),
      this._i18n
    ), d = this._config.ventilationEntity !== void 0, c = a !== "" || r !== f || l.length > 0 || d;
    return u`
      <ha-card>
        <div class="dashboard">
          ${c ? u`<header class="dashboard-header">
                ${d ? u`<div class="title-row">${a === "" ? f : u`<h1>${a}</h1>`}${this.renderVentilationButton()}</div>` : a === "" ? f : u`<h1>${a}</h1>`}
                ${r} ${this.renderSummary(l)}
              </header>` : f}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (p, h) => this.renderRoom(p, h, n, i, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(n)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, n, i) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const a = s.thresholds.stale_minutes;
      yn(
        {
          temperature: this.reading(s.temperature, a, i),
          humidity: this.reading(s.humidity, a, i),
          co2: this.reading(s.carbon_dioxide, a, i),
          pm25: this.pm25Reading(s, i)
        },
        t,
        n,
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
    const n = (i) => t.rooms.map((o) => {
      const s = i(o);
      return s ? this._trends[s] : void 0;
    });
    return {
      temperature: xe(n((i) => i.temperature), Ct(t.trends, "temperature")),
      co2: xe(n((i) => i.carbon_dioxide), Ct(t.trends, "co2")),
      pm25: xe(n((i) => i.pm25), Ct(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const { t: n, whole: i } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), a = this.numberState(t.maximum), r = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && a !== void 0 ? `${i(s)}–${i(a)}${et}°C` : void 0, c = [
      o === void 0 ? void 0 : `${i(o)}${et}°C`,
      d,
      r === void 0 ? void 0 : `☂${et}${this._i18n.percent(i(r))}`
    ].filter(($) => $ !== void 0), p = this._config.thresholds;
    let h = "––", v = m.label;
    return l !== void 0 && (l >= p.pm25_critical ? (h = n.airLevel.poor, v = m.alert) : l >= p.pm25_warning ? (h = n.airLevel.moderate, v = m.warning) : h = n.airLevel.good), c.length === 0 && !t.pm25 ? f : u`<div class="outside">
      ${c.length > 0 ? u`<div>${c.join(" · ")}</div>` : f}
      ${t.pm25 ? u`<div>${n.outsideAir} <span style=${`color: ${v}`}>${h}</span></div>` : f}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? f : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((n) => {
      const i = this.summaryIcon(n), o = n.opens;
      return o && o.rooms.length > 0 ? u`<li class="chip" style=${`--chip-color: ${n.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${n.spoken}
              aria-label=${`${n.text}. ${n.spoken}`}
              aria-haspopup="dialog"
              @click=${(s) => this.openGroupSheet(o.system, o.rooms, s)}
            >
              <span class="chip-icon" aria-hidden="true">${i}</span>${n.text}
            </button>
          </li>` : u`<li class="chip" style=${`--chip-color: ${n.color}`} title=${n.spoken} aria-label=${n.spoken}>
          <span class="chip-icon" aria-hidden="true">${i}</span>${n.text}
        </li>`;
    })}
    </ul>`;
  }
  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  summaryIcon(t) {
    return t.kind === "windows" || t.kind === "conflict-window" ? _e(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? Pt("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? Se(t.kind === "boost" ? "boost" : "heat") : ze(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, n, i, o, s, a) {
    const r = t.thresholds.stale_minutes, l = this.reading(t.temperature, r, a), d = this.reading(t.humidity, r, a), c = this.reading(t.carbon_dioxide, r, a), p = this.pm25Reading(t, a), { t: h } = this._i18n, v = yn({ temperature: l, humidity: d, co2: c, pm25: p }, i, o, t, h), $ = t.image, S = (w) => v.cause === w ? `color: ${v.color}` : f, C = gi(t, (w) => this.getState(w), v.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
        style=${$?.kind === "scene" ? `--scene-tone: ${fs($.scene)}` : f}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, n)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${v.kind === "unknown" ? `border: 1.5px solid ${m.off}` : `background: ${v.color}`}
          ></span>
          <span style=${`color: ${v.color}; font-weight: ${v.kind === "normal" ? 400 : 500}`}>
            ${v.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${S("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? f}
            aria-label=${h.temperatureLabel(
      this.roomLabel(t),
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${(w) => this.openSheet("history", t, w)}
          >
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${et}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${S("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? f}
            aria-label=${h.humidityLabel(
      this.roomLabel(t),
      d.value === void 0 ? void 0 : this._i18n.percent(Math.round(d.value)),
      this.staleSpoken(d)
    )}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${d.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.percent(Math.round(d.value))}${this.staleMark(d)}`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, n, c, p, s)}
            ${this.renderHvac(t, i, n)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, n, C, a)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : u`<div class="cover-panel" aria-hidden="true"></div>
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
    const n = t.image;
    return n ? n.kind === "scene" ? u`<div class="scene" aria-hidden="true">${gs(n.scene)}</div>` : u`<div class="scene photo" aria-hidden="true">
      <img src=${n.url} alt="" loading="lazy" decoding="async" />
    </div>` : f;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, n) {
    const i = t.link;
    if (!i)
      return u`<div class="room-title">${this.roomLabel(t)}</div>`;
    const o = `link-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${o}
        @click=${() => this.openLink(i)}
      >
        <span class="room-name">${this.roomLabel(t)}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${o}>${i.startsWith("/") ? this._i18n.t.link.page : this._i18n.t.link.web}</span>
    `;
  }
  /**
   * The room link goes through Home Assistant's own action handling (navigate for a path,
   * url for a web address), the same as a tap action of a built-in card.
   */
  openLink(t) {
    const n = t.startsWith("/") ? { action: "navigate", navigation_path: t } : { action: "url", url_path: t };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: { tap_action: n }, action: "tap" },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** The room history period for screen readers: "24 hodin" (after "za"), "the last 24 hours". */
  historyPeriod() {
    return _n((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return _n(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, n, i) {
    return t.value === void 0 || t.stale ? m.label : t.value >= i ? m.alert : t.value >= n ? m.warning : m.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, n, i, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return f;
    const { thresholds: a } = t, { t: r } = this._i18n, l = this._config.trends, d = (h, v, $, S, C, w) => {
      if (!v || !$)
        return;
      const _ = S.value === void 0 ? void 0 : kn(this._trends[$], Ct(l, w));
      return r.airSensor(
        h,
        S.value === void 0 ? void 0 : `${this._i18n.whole(S.value)} ${C}`,
        _ ? r.trendOver(r.trend[_], this.trendPeriod()) : void 0,
        this.staleSpoken(S)
      );
    }, c = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, i, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = `air-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${!t.carbon_dioxide && !t.pm25}
        aria-haspopup="dialog"
        aria-describedby=${p}
        @click=${(h) => this.openSheet("history", t, h, t.hasCo2 ? "co2" : "pm25")}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      u`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      i,
      "ppm",
      a.co2_warning,
      a.co2_critical,
      s.co2
    ) : f}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      Bo(),
      o,
      "µg/m³",
      a.pm25_warning,
      a.pm25_critical,
      s.pm25
    ) : f}
      </button>
      <span class="sr-only" id=${p}>${r.airDescription(this.roomLabel(t), c, this.historyPeriod())}</span>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, n, i, o, s, a, r, l) {
    const d = o.value !== void 0, c = this._i18n.whole(o.value ?? 0), p = this.airColor(o, a, r), h = m[t];
    return u`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? f}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? h : m.off}`} aria-hidden="true">
            ${i}
          </span>
          <span class="row-text">
            ${d ? u`<span class="row-label" style=${`color: ${p}`}>${c}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : u`<span class="row-label" style=${`color: ${m.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(n, l, h, o.stale === !0) : f}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, n, i) {
    if (!t.temperature || n.value === void 0)
      return f;
    const o = this.renderSpark(t.temperature, i, m.peach, n.stale === !0);
    if (o === f)
      return f;
    const s = kn(this._trends[t.temperature], Ct(this._config.trends, "temperature")), { t: a } = this._i18n;
    return u`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${a.temperatureTrendLabel(
      this.roomLabel(t),
      this.trendPeriod(),
      s ? a.trend[s] : void 0,
      this.historyPeriod()
    )}
        @click=${(r) => this.openSheet("history", t, r)}
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
  renderSpark(t, n, i, o) {
    if (!t)
      return f;
    if (!this._trendsLoaded)
      return u`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    const s = this._trends[t];
    if (!s || !n)
      return f;
    const a = Vo(s, n).map(
      (p, h) => p === void 0 ? void 0 : { x: h / Math.max(1, s.length - 1) * 100, y: (1 - p) * 100 }
    ).filter((p) => p !== void 0);
    if (a.length < 2)
      return f;
    const r = a.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "), l = a[0], d = a[a.length - 1], c = `${r} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return u`<span class="spark ${o ? "stale" : ""}" style=${`color: ${i}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${c} fill="currentColor" fill-opacity="0.08"></polygon>
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
          style=${`left: ${d.x.toFixed(2)}%; top: ${d.y.toFixed(2)}%`}
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
  renderHvac(t, n, i) {
    const { t: o } = this._i18n, s = Ge(t, (v) => this.getState(v), this._i18n), a = de(this.getState(t.air_conditioner), this._i18n), r = (v) => this.renderSystemRow(ze(s.unknown ? 0 : s.waves, s.unknown), s, v), l = (v) => this.renderSystemRow(Pt(a.mode, a.color, a.unknown), a, v), d = n ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: a.active }), p = d.map((v) => `${o.system[v]} ${js(v === "heating" ? s : a, this._i18n)}`).join(", "), h = `hvac-description-${i}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${h}
        @click=${(v) => c ? this.openSheet(c, t, v) : void 0}
      >
        ${n ? l(!0) : r(!0)}
        ${n ? r(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${h}>${o.hvacDescription(this.roomLabel(t), p, c)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  /** The system a tap on the HVAC lines opens: the one that runs (a ventilation started on the air conditioner in winter opens Klimatizace), otherwise the first by the house mode. */
  hvacTarget(t, n, i) {
    const o = (a) => a === "heating" ? !!t.heating?.climate : !!t.air_conditioner, s = n.filter((a) => o(a) && i?.[a]);
    return s.length === 1 ? s[0] : n.find(o);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, n, i) {
    return u`
      <span
        class="system-row ${i && n.active ? "strong" : ""}"
        style=${`--row-color: ${n.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${n.label}</span>
            ${n.extra ? u`<span class="row-unit">${n.extra}</span>` : f}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, n) {
    const i = this.getState(t), o = i?.state.toLowerCase();
    if (o === void 0 || K(o))
      return { state: "unknown" };
    if (o !== "on")
      return { state: "closed" };
    const s = Date.parse(i?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(s) ? void 0 : Math.max(0, (n - s) / 6e4) };
  }
  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  renderWindow(t, n, i, o) {
    const { t: s } = this._i18n, a = t.windows.map((M) => ({ window: M, ...this.windowState(M.entity, o) })), r = a.filter((M) => M.state === "open"), l = r.length > 0, d = !l && (a.length === 0 || a.some((M) => M.state === "unknown")), c = t.windows.length > 1, p = l ? m.sky : m.label, h = l ? r.length > 1 ? s.window.openCount(r.length) : s.window.open : d ? "––" : s.window.closed, v = r.map((M) => M.minutesOpen).filter((M) => M !== void 0), $ = v.length > 0 ? Math.max(...v) : void 0, S = i.includes("window-heating") ? s.window.conflict.heating : i.includes("window-cooling") ? s.window.conflict.cooling : void 0, C = `window-description-${n}`, w = $ === void 0 ? void 0 : xn($, s);
    let _;
    if (!c)
      _ = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", w);
    else if (l) {
      const M = r.map((b) => this.windowName(t, b.window)).join(", ");
      _ = r.length === 1 ? s.window.spokenOneOpen(M, w) : s.window.spokenManyOpen(M, w);
    } else
      _ = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const E = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${p}`}
        ?disabled=${!E}
        aria-haspopup=${c ? "dialog" : f}
        aria-describedby=${C}
        @click=${(M) => c ? this.openSheet("windows", t, M) : this.showMoreInfo(E)}
      >
        <span class="row-main">
          <span class="row-icon">${_e(d ? m.off : p, d)}</span>
          <span class="row-text">
            <span class="row-label">${h}</span>
            ${S ? u`<span class="conflict-dot" aria-hidden="true"></span>` : f}
            ${$ === void 0 ? f : u`<span class="row-unit window-duration"
                  >${`${S ? "" : `${et}·${et}`}${ye($)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${C}>${s.window.description(this.roomLabel(t), _, S, c)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, n) {
    return Ft(n.name, this._i18n.language) ?? this._i18n.t.window.defaultName(t.windows.indexOf(n) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, n) {
    const { t: i } = this._i18n;
    return u`
      <div class="options list-options" role="group" aria-label=${i.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: a } = this.windowState(o.entity, n), r = s === "unknown", l = s === "open" ? m.sky : m.label;
      return u`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${_e(r ? m.off : l, r)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint window-state" style=${`color: ${l}`}>
                ${r ? u`<span aria-hidden="true">––</span><span class="sr-only">${i.unknownValue}</span>` : s === "open" ? i.window.open : i.window.closed}${a === void 0 ? f : u`${et}·${et}${ye(a)}`}
              </span>
            </span>
            <span class="list-chevron" aria-hidden="true">›</span>
          </button>`;
    })}
      </div>
    `;
  }
  // ------------------------------------------------------------ ventilation
  /** The ventilation mode: "on" or "off"; unknown, unavailable or unconfigured is undefined (no chip). */
  ventilationState() {
    const t = this.entityState(this._config?.ventilationEntity)?.toLowerCase();
    return t === "on" || t === "off" ? t : void 0;
  }
  ventilationOn() {
    return this.ventilationState() === "on";
  }
  /** The rooms of the mode: those with a blind, a window and a CO₂ sensor (Obývák with the garden door is not one). */
  ventilationRooms() {
    return (this._config?.rooms ?? []).filter((t) => t.cover && t.windows.length > 0 && t.carbon_dioxide);
  }
  /**
   * The ventilation mode in the title row, on the right: a green pill with the text while it runs,
   * a grey icon while it does not (CURRENT_SPEC.md, Větrací režim). Nothing when its state is unknown.
   */
  renderVentilationButton() {
    const t = this.ventilationState();
    if (t === void 0)
      return f;
    const { t: n } = this._i18n, i = t === "on", o = `${n.ventilation.title}. ${i ? n.summaryChips.ventilationSpoken : n.summaryChips.ventilationOffSpoken}`;
    return u`<button
      type="button"
      class="plain-button vent-trigger ${i ? "on" : "off"}"
      title=${o}
      aria-label=${o}
      aria-haspopup="dialog"
      @click=${(s) => this.openVentilationSheet(s)}
    >
      <span class="vent-icon" aria-hidden="true">${Pt("fan", i ? m.fresh : m.label, !1)}</span>
      ${i ? u`<span>${n.ventilation.title}</span>` : f}
    </button>`;
  }
  /** The popup of the ventilation mode (it has no room; the first one stands in). */
  openVentilationSheet(t) {
    const n = this._config?.rooms[0];
    n && (this._ventilationEnding = !1, this._announcement = "", this.openSheet("ventilation", n, t), this.loadVentilation());
  }
  /**
   * The last run of the mode and, per room, the CO₂ at its start and end and whether a window was
   * open during it: from the history of Home Assistant (the mode over a week, then the CO₂ and the
   * windows over that run). Nothing is stored.
   */
  async loadVentilation() {
    const t = this.hass, n = this._config?.ventilationEntity;
    if (!t || !n)
      return;
    const i = ++this._ventRequest, o = Date.now();
    try {
      const s = await Yt(t, [n], o - 168 * gt, o), a = bs(s[n]);
      if (i !== this._ventRequest)
        return;
      if (!a) {
        this._vent = { rooms: [] };
        return;
      }
      const r = this.ventilationRooms(), l = a.end ?? o, d = r.flatMap((p) => [p.carbon_dioxide, ...p.windows.map((h) => h.entity)]), c = await Yt(
        t,
        d.filter((p) => p !== void 0),
        a.start - 30 * 6e4,
        l
      );
      if (i !== this._ventRequest)
        return;
      this._vent = {
        session: a,
        rooms: r.map((p) => ({
          name: p.name,
          opened: p.windows.some((h) => ys(c[h.entity], a.start, l)),
          start: Ce(Ut(c[p.carbon_dioxide ?? ""], a.start)),
          end: Ce(Ut(c[p.carbon_dioxide ?? ""], l))
        }))
      };
    } catch (s) {
      console.error("Klima Dashboard: the ventilation history could not be loaded", s), i === this._ventRequest && (this._vent = { rooms: [], failed: !0 });
    }
  }
  /**
   * The ventilation popup (CURRENT_SPEC.md, Větrací režim). While the mode runs: how long it has
   * run, the latest end, the rooms with an open window (CO₂ from the start to now and how far to
   * the goal), whether the windows can be closed and an estimate of the minutes left. After it
   * ended: the last run (start–end) with the rooms whose window was open. Nothing is stored; the
   * start values come from the history.
   */
  renderVentilationBody(t) {
    const { t: n } = this._i18n, i = n.ventilation, o = this._config, s = this.ventilationOn(), a = o?.ventilationCo2Target ?? 450, r = this._vent, l = r?.session, d = u`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>`, c = this._sheetError, p = o?.ventilationTimerEntity, h = this.getState(p), v = h?.state.toLowerCase() === "active" ? Date.parse(String(h.attributes.finishes_at ?? "")) : Number.NaN, $ = Number.isNaN(v) || v <= t ? void 0 : v, S = Date.parse(this.getState(o?.ventilationEntity)?.last_changed ?? ""), C = Number.isNaN(S) ? void 0 : Math.max(0, (t - S) / 6e4), w = this.ventilationRooms().flatMap((b) => {
      const k = r?.rooms.find((Y) => Y.name === b.name), O = ce(b, (Y) => this.getState(Y)).length > 0;
      if (s ? !O : !k?.opened)
        return [];
      const x = this.getState(b.carbon_dioxide), T = s ? Ce(x?.state) : k?.end, z = k?.start, L = Date.parse(x?.last_updated ?? ""), q = z !== void 0 && T !== void 0 ? ks(z, T, a) : void 0;
      return [{ room: b, startValue: z, live: T, reported: L, steps: q }];
    }), _ = (b) => {
      const k = b.steps === void 0 ? void 0 : b.steps.closable ? 100 : Math.min(99, Math.floor(b.steps.done * 100)), O = b.steps?.closable ? m.fresh : m.white, x = b.startValue === void 0 ? void 0 : this._i18n.whole(b.startValue), T = b.live === void 0 ? void 0 : this._i18n.whole(b.live);
      return u`<div
        class="static-row"
        role="group"
        aria-label=${x !== void 0 && T !== void 0 && k !== void 0 ? i.roomSpoken(this.roomLabel(b.room), x, T, this._i18n.percent(k)) : this.roomLabel(b.room)}
      >
        <span class="option-text">
          <span>${this.roomLabel(b.room)}</span>
          <span class="vent-co2" aria-hidden="true">${x !== void 0 && T !== void 0 ? i.co2Range(x, T) : "CO₂ ––"}</span>
        </span>
        <span class="list-value vent-percent" style=${`color: ${O}`} aria-hidden="true">
          <span>${k === void 0 ? "––" : this._i18n.percent(k)}</span>
          <span class="vent-co2">${i.done}</span>
        </span>
      </div>`;
    };
    let E, M;
    if (s) {
      const b = w.filter((L) => L.steps !== void 0), k = w.length > 0 && b.length === w.length, O = k && b.every((L) => L.steps?.closable), T = b.filter((L) => !L.steps?.closable).map(
        (L) => L.startValue !== void 0 && L.live !== void 0 && l !== void 0 && !Number.isNaN(L.reported) ? xs(L.startValue, l.start, L.live, L.reported, a) : void 0
      ), z = !k || O || T.some((L) => L === void 0) ? void 0 : Math.max(...T);
      E = u`
        <div class="static-row">
          <span class="option-text"><span>${i.running}</span></span>
          <span class="list-value">
            ${C === void 0 ? d : u`<span aria-hidden="true">${ye(C)}</span
                  ><span class="sr-only">${xn(C, n)}</span>`}
          </span>
        </div>
        ${p === void 0 ? f : u`<div class="static-row">
              <span class="option-text"><span>${i.endsBy}</span></span>
              <span class="list-value">${$ === void 0 ? d : this._i18n.time($)}</span>
            </div>`}
        ${w.map(_)}
        <div class="static-row">
          <span class="option-text">
            <span>${i.canClose}</span>
            <span class="vent-co2">${i.goalShort(this._i18n.whole(a))}</span>
          </span>
          <span class="list-value" style=${`color: ${O ? m.fresh : m.white}`}>
            ${k ? O ? i.yes : i.notYet : d}
          </span>
        </div>
        ${O ? f : u`<div class="static-row">
              <span class="option-text"><span>${i.remaining}</span></span>
              <span class="list-value">${z === void 0 ? d : i.minutes(z)}</span>
            </div>`}`, M = i.sentence;
    } else l ? (E = u`
        <div class="static-row">
          <span class="option-text"><span>${i.last}</span></span>
          <span class="list-value">${new Date(l.start).toDateString() === new Date(t).toDateString() ? f : `${this._i18n.day(l.start)} `}${this._i18n.time(l.start)}${l.end === void 0 ? f : u`–${this._i18n.time(l.end)}`}</span>
        </div>
        ${w.map(_)}`, M = i.goal(this._i18n.whole(a))) : (E = u``, M = r === void 0 ? "" : i.never);
    return u`
      ${E === void 0 || !s && !l ? f : u`<div class="static-list" role="group" aria-label=${i.title}>${E}</div>`}
      <p class="timer-foot ${c ? "error" : ""}" role=${c ? "alert" : f}>${c ?? M}</p>
      ${s ? u`<button
            type="button"
            class="plain-button vent-end"
            ?disabled=${this._ventilationEnding}
            aria-busy=${this._ventilationEnding ? "true" : "false"}
            @click=${() => {
      this.endVentilation();
    }}
          >
            ${this._ventilationEnding ? i.ending : i.end}
          </button>` : f}
    `;
  }
  /** "Ukončit": turns the mode off; Home Assistant switches the fans off and returns the slats (kit, Home Assistant: větrací režim). */
  async endVentilation() {
    const t = this._config?.ventilationEntity;
    if (!(!t || !this.hass || this._ventilationEnding)) {
      this._ventilationEnding = !0, this._sheetError = void 0;
      try {
        await this.hass.callService(t.split(".")[0], "turn_off", { entity_id: t }), this.haptic("success"), window.clearTimeout(this._endTimer), this._endTimer = window.setTimeout(() => {
          this._ventilationEnding = !1;
        }, 1e4);
      } catch (n) {
        console.error("Klima Dashboard: ending the ventilation mode failed", n), this._sheetError = this._i18n.t.sheet.commandFailed, this._ventilationEnding = !1, this.haptic("failure");
      }
    }
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, n) {
    const i = this.getState(n), o = i?.state.toLowerCase(), s = o !== void 0 && !K(o), a = s ? dt(i?.attributes.current_position) : void 0, r = s ? dt(i?.attributes.current_tilt_position) : void 0, l = a !== void 0 && r !== void 0, d = o === "opening" || o === "closing", { t: c } = this._i18n, p = l ? c.cover.position(Math.round(a), Math.round(r)) : c.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${c.cover.label(this.roomLabel(t), p, d)}
        @click=${() => this.showMoreInfo(n)}
      >
        <svg
          viewBox="0 0 ${ie} ${Ae}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${to(a, r)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${c.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((h) => this.renderPreset(t, h, a, r, s))}
      </div>
    `;
  }
  renderPreset(t, n, i, o, s) {
    const a = this._moving[t.name], r = a === n.id, l = a === void 0 && be(i, o, n, this.tolerance()), d = `${t.name}|${n.id}`, { t: c } = this._i18n, p = uo(n, c, this._i18n.language), h = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${r ? "pending" : ""} ${h ? "failed" : ""}"
        title=${p}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${r ? "true" : f}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${h && this._hint?.spoken ? `${c.cover.preset(this.roomLabel(t), p, Sn(n, c, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : c.cover.preset(this.roomLabel(t), p, Sn(n, c, this._i18n.language), s)}
        @pointerdown=${(v) => this.pressStart(v, t, n, s)}
        @pointerup=${() => this.pressEnd(t, n, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(v) => v.preventDefault()}
        @click=${(v) => {
      v.detail === 0 && (s ? this.applyPreset(t, n) : this.showUnavailable(d));
    }}
      >
        ${Wo(n.icon)}
        ${this._hint?.key !== d ? f : h ? u`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : u`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, n, i, o) {
    t.button !== 0 || !o || this._gesture.start(() => {
      window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(n, i);
    });
  }
  pressEnd(t, n, i) {
    const o = `${t.name}|${n.id}`;
    if (!i) {
      this.showUnavailable(o);
      return;
    }
    const s = this._gesture.tap(o, performance.now());
    if (s !== "none") {
      if (window.clearTimeout(this._hintTimer), s === "double") {
        this._hint = void 0, this.applyPreset(t, n);
        return;
      }
      this._hintTimer = window.setTimeout(() => {
        this._gesture.pending(o) && (this._gesture.forget(), this.showHint(o, this._i18n.t.cover.hint, "selection"));
      }, Un);
    }
  }
  pressCancel() {
    this._gesture.cancel();
  }
  showUnavailable(t) {
    this._gesture.forget(), window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, n, i, o) {
    this._hint = { key: t, text: n, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(i), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? Zs : Gs);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, n) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const i = this.entityState(t.cover)?.toLowerCase();
    if (i === void 0 || K(i)) {
      this.showUnavailable(`${t.name}|${n.id}`);
      return;
    }
    this.startMoving(t, t.cover, n);
    try {
      const [o, s] = this._config.covers.script.split(".");
      await this.hass.callService(o, s, {
        entity: t.cover,
        pos: n.position,
        tilt: n.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${n.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, qs);
    } catch (o) {
      console.error("Klima Dashboard: the blind script failed", o), this.endMoving(t.name);
      const { cover: s } = this._i18n.t;
      this.showHint(`${t.name}|${n.id}`, s.failedHint, "failure", { spoken: s.failed(this.roomLabel(t)) });
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, n, i) {
    const o = this.getState(n);
    if (be(
      dt(o?.attributes.current_position),
      dt(o?.attributes.current_tilt_position),
      i,
      this.tolerance()
    ) && !this.isMoving(n)) {
      this.endMoving(t.name);
      return;
    }
    this._moving = { ...this._moving, [t.name]: i.id }, this._movingWatch.set(t.name, { signature: this.coverSignature(n) }), this.armStall(t.name);
  }
  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  trackMovingPresets() {
    for (const t of this._config?.rooms ?? []) {
      const n = this._moving[t.name], i = t.presets.find((l) => l.id === n), o = this._movingWatch.get(t.name);
      if (!i || !o || !t.cover)
        continue;
      const s = this.getState(t.cover), a = s?.state.toLowerCase();
      if (a === void 0 || K(a) || be(
        dt(s?.attributes.current_position),
        dt(s?.attributes.current_tilt_position),
        i,
        this.tolerance()
      ) && !this.isMoving(t.cover)) {
        this.endMoving(t.name);
        continue;
      }
      const r = this.coverSignature(t.cover);
      r !== o.signature && (o.signature = r, this.armStall(t.name));
    }
  }
  armStall(t) {
    const n = this._movingWatch.get(t);
    n && (window.clearTimeout(n.timer), n.timer = window.setTimeout(() => this.endMoving(t), (this._config?.covers.stall_seconds ?? 5) * 1e3));
  }
  endMoving(t) {
    if (window.clearTimeout(this._movingWatch.get(t)?.timer), this._movingWatch.delete(t), t in this._moving) {
      const { [t]: n, ...i } = this._moving;
      this._moving = i;
    }
  }
  isMoving(t) {
    const n = this.entityState(t)?.toLowerCase();
    return n === "opening" || n === "closing";
  }
  /** What changes while a blind moves: its state, position and tilt. */
  coverSignature(t) {
    const n = this.getState(t);
    return `${n?.state}|${n?.attributes.current_position}|${n?.attributes.current_tilt_position}`;
  }
  /** Haptic feedback through the Home Assistant app (ignored in a plain browser). */
  haptic(t) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const n = this._sheet;
    if (!n)
      return f;
    const { t: i } = this._i18n;
    if (n.kind === "history")
      return this.renderSheetFrame(
        i.sheet.history(this._config?.history.hours ?? 24),
        this.roomLabel(n.room),
        this.renderHistoryBody(n.room, n.metric ?? "temperature", t),
        "history-sheet"
      );
    if (n.kind === "ventilation")
      return this.renderSheetFrame(i.ventilation.title, void 0, this.renderVentilationBody(Date.now()));
    if (n.kind === "windows")
      return this.renderSheetFrame(i.window.popup, this.roomLabel(n.room), this.renderWindowsBody(n.room, Date.now()));
    const { title: o, sub: s } = this.hvacTitle(n.kind);
    return this.renderSheetFrame(o, s, this.renderHvacBody(n.room, n.kind, t));
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, n, i, o = "") {
    const s = this._drag?.dragging === !0;
    return u`
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
          tabindex="-1"
          @click=${(a) => a.stopPropagation()}
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
                ${n ? u`<div class="sheet-sub">${n}</div>` : f}
              </div>
              <button type="button" class="plain-button close" aria-label=${this._i18n.t.sheet.close} @click=${() => this.closeSheet()}>
                <span class="close-icon" aria-hidden="true"
                  ><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <path d="M2 2l8 8M10 2l-8 8"></path></svg
                ></span>
              </button>
            </div>
          </div>
          ${i}
        </div>
      </div>
    `;
  }
  /** Title of the Topení / Klimatizace popup: the room, or the rooms it sets together (names, or "all"). */
  hvacTitle(t) {
    const { t: n } = this._i18n, i = this.sheetRooms().filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner);
    if (i.length <= 1) {
      const a = i[0] ?? this._sheet?.room;
      return { title: a ? this.roomLabel(a) : "" };
    }
    const o = (this._config?.rooms ?? []).filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner), s = i.length === o.length;
    return { title: s ? n.sheet.allRooms : i.map((a) => this.roomLabel(a)).join(", "), sub: s ? i.map((a) => this.roomLabel(a)).join(", ") : void 0 };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, n, i) {
    const o = this.sheetRooms(), s = o.filter((h) => h.heating?.climate), a = o.filter((h) => h.air_conditioner), r = i ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && a.length > 0, { t: d } = this._i18n, c = n === "heating" ? this.renderHeatingPanel(s) : this.renderClimatePanel(a), p = l ? u`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(h) => this.segmentKeydown(h, r, n)}
        >
          ${r.map(
      (h) => u`<button
              type="button"
              role="tab"
              id=${`tab-${h}`}
              class="plain-button segment"
              data-system=${h}
              aria-selected=${h === n ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${h === n ? "0" : "-1"}
              @click=${() => this.switchSheet(h)}
            >
              ${d.system[h]}
            </button>`
    )}
        </div>` : u`<div class="sheet-label system-name">${d.system[n]}</div>`;
    return u`${p}
      <div class="hvac-panel" role=${l ? "tabpanel" : f} id="hvac-panel" aria-labelledby=${l ? `tab-${n}` : f}>
        ${c}
      </div>`;
  }
  /** "Teď 21,9 °C" under the big value: only for one room (a group has no single temperature). */
  roomNow(t) {
    if (t.length !== 1)
      return "";
    const n = X(this.getState(t[0].temperature)?.state);
    return n === void 0 ? "" : this._i18n.t.sheet.now(`${this._i18n.one(n)}${et}°C`);
  }
  renderHeatingPanel(t) {
    const { t: n } = this._i18n, i = t[0], o = i?.heating?.climate, s = this.getState(o), a = s !== void 0 && !K(s.state.toLowerCase()), r = Tt(s?.attributes.hvac_modes);
    if (!i || !o || !a)
      return u`<p class="sheet-message">${n.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const l = this.heatControl(i, o, s), d = this.heatingOptions(o, r, ta(l));
    if (d.length === 0 || !l)
      return u`<p class="sheet-message">${n.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const c = n.sheet.heatControl, p = this.timerAvailable(), h = this.wholeRange(si(oi(s))), v = X(s?.attributes.temperature), $ = s?.state.toLowerCase() === "auto" && v !== void 0 && v > at ? v : void 0, S = l.mode === "boost" ? m.alert : l.mode === "manual" || l.mode === "plan" ? m.warning : m.off;
    let C;
    l.mode === "off" ? C = this.renderDial({ id: "heat-dial", text: n.heatingMode.off, eyebrow: n.system.heating, sub: this.roomNow(t), tone: S }) : l.mode === "plan" ? C = this.renderDial({
      id: "heat-dial",
      value: $,
      min: h.min,
      max: h.max,
      eyebrow: c.bySchedule,
      sub: this.roomNow(t),
      tone: S
    }) : l.mode === "boost" ? C = this.renderDial({
      id: "heat-dial",
      value: ue,
      min: h.min,
      max: h.max,
      eyebrow: n.heatingMode.boost,
      sub: this.roomNow(t),
      tone: S
    }) : C = this.renderDial({
      id: "heat-dial",
      value: Math.round(l.temperature),
      min: h.min,
      max: h.max,
      eyebrow: c.temperature,
      sub: this.roomNow(t),
      tone: S,
      label: c.temperatureSlider,
      onChange: (x) => this.editHeat(i, o, { temperature: x, mode: "manual" })
    });
    const w = p, _ = l.mode === "plan", E = Lt(l.duration), M = (l.mode === "manual" || l.mode === "boost") && E !== void 0, b = l.after ?? this.defaultAfter(), k = E !== void 0 ? `${Et(E)} · ${c.until(this._i18n.time(Date.now() + E * 6e4))}` : l.duration === ft ? c.nextPlan : c.untilResumed, O = E === void 0 ? l.duration === ft ? c.footPlan : l.mode === "off" ? c.footOffForever : c.footForever : l.mode === "off" ? c.footOffTimed(this._i18n.time(Date.now() + E * 6e4)) : c.footTimed(this._i18n.time(Date.now() + E * 6e4), b === "off" ? c.afterOffText : c.afterPlanText);
    return u`
      ${C}
      <div class="options icon-options" role="group" aria-label=${n.sheet.modes(n.system.heating)}>
        ${d.map((x) => this.renderOption(x))}
      </div>
      ${w ? u`<div class="timer-card ${_ ? "dim" : ""}" ?inert=${_}>
              ${this.renderTimer({
      slot: Po(l.duration),
      last: W.length + 1,
      readout: k,
      label: c.durationSlider,
      leftLabel: c.nextPlan,
      leftIcon: Se("auto"),
      leftText: u`<b>${n.heatingMode.schedule}</b>`,
      rightLabel: c.untilResumed,
      onSlot: (x) => this.editHeat(i, o, { duration: Ro(x) })
    })}
              ${u`<div class="after-row ${M ? "" : "away"}" ?inert=${!M}>
                    <span id="after-label">${c.after}</span>
                    <div class="mini-segmented" role="group" aria-labelledby="after-label">
                      ${["plan", "off"].map(
      (x) => u`<button
                          type="button"
                          class="plain-button mini-segment"
                          aria-pressed=${b === x ? "true" : "false"}
                          @click=${() => this.chooseAfter(i, o, x)}
                        >
                          ${x === "plan" ? n.heatingMode.schedule : n.heatingMode.off}
                        </button>`
    )}
                    </div>
                  </div>`}
            </div>
            <p class="timer-foot">${_ ? c.footIdle : O}</p>` : l.mode === "manual" && !p ? u`<p class="sheet-message">${c.noTimer}</p>` : f}
      <p class="heat-note" role="status">${this.heatNote(i, o, s, d.filter((x) => x.unsupported).map((x) => `${x.label}: ${x.unsupported}`))}</p>
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  renderClimatePanel(t) {
    const { t: n } = this._i18n, i = t[0], o = i?.air_conditioner, s = this.getState(o), a = s !== void 0 && !K(s.state.toLowerCase());
    if (!i || !o || !a)
      return u`<p class="sheet-message">${n.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const r = Tt(s?.attributes.hvac_modes), l = Tt(s?.attributes.preset_modes), d = s?.state.toLowerCase(), c = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = this.climateOptions(o, r, d, l, c);
    if (p.length === 0)
      return u`<p class="sheet-message">${n.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const h = de(s, this._i18n), v = Math.ceil(X(s?.attributes.min_temp) ?? 16), $ = Math.floor(X(s?.attributes.max_temp) ?? 30), S = this._acTarget ?? X(s?.attributes.temperature), C = S === void 0 ? void 0 : Math.round(S), w = ["cool", "wind_free", "heat", "auto"].includes(h.mode), _ = h.mode === "off" || h.mode === "fan" || h.mode === "dry" || h.mode === "unknown", E = this.renderDial({
      id: "ac-dial",
      text: _ ? n.climateMode[h.mode === "unknown" ? "unknown" : h.mode] : void 0,
      value: _ ? void 0 : C,
      min: v,
      max: $,
      eyebrow: h.mode === "off" ? n.system.climate : _ ? n.sheet.mode : n.sheet.heatControl.temperature,
      sub: this.roomNow(t),
      tone: h.color,
      label: n.sheet.heatControl.temperatureSlider,
      onChange: w ? (D) => this._acTarget = D : void 0,
      onCommit: w ? () => {
        this.runSheetAction(() => this.commitAcTarget(t));
      } : void 0
    }), M = Tt(s?.attributes.fan_modes), b = Tt(s?.attributes.swing_modes), k = String(s?.attributes.fan_mode ?? "").toLowerCase(), O = String(s?.attributes.swing_mode ?? "").toLowerCase(), x = l.filter((D) => D !== "none" && D !== "wind_free"), T = h.active, z = this._ac?.duration ?? vt, L = Lt(z), I = n.sheet.heatControl, q = L === void 0 ? I.noLimit : `${Et(L)} · ${I.until(this._i18n.time(Date.now() + L * 6e4))}`, Y = L === void 0 ? I.acFootForever : I.acFootTimed(this._i18n.time(Date.now() + L * 6e4)), $t = !!this.hass?.callWS, J = !T;
    return u`
      ${E}
      <div class="options climate-options" role="group" aria-label=${n.sheet.modes(n.system.climate)}>
        ${p.map((D) => this.renderOption(D))}
      </div>
      ${$t ? u`<div class="timer-card ${J ? "dim" : ""}" ?inert=${J}>
              ${this.renderTimer({
      slot: zo(z),
      last: W.length,
      readout: q,
      label: I.durationSlider,
      leftLabel: Et(W[0]),
      leftIcon: Pn(),
      leftText: u`<b>${Et(W[0])}</b>`,
      rightLabel: I.noLimit,
      onSlot: (D) => this._ac = { duration: No(D), touched: !0 }
    })}
            </div>
            <p class="timer-foot">${J ? I.acFootIdle : Y}</p>` : f}
      ${M.length > 0 ? this.renderChoice(n.sheet.climate.fan, M, k, J, (D) => this.callClimateEach(t, "set_fan_mode", { fan_mode: D }), (D) => this.fanLabel(D)) : f}
      ${b.length > 0 ? this.renderChoice(n.sheet.climate.swing, b, O, J, (D) => this.callClimateEach(t, "set_swing_mode", { swing_mode: D }), (D) => this.swingLabel(D)) : f}
      ${x.length > 0 ? u`<div class="sheet-label" id="preset-label">${n.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${x.map((D) => this.renderPresetChip(t, D, c, d, l))}
            </div>` : f}
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  /** Link to the standard detail of one entity; a group of rooms has none. */
  renderSheetTail(t) {
    return t ? u`<button
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
    return this._i18n.t.sheet.climate.fanModes[t.toLowerCase()] ?? oe(t);
  }
  swingLabel(t) {
    return this._i18n.t.sheet.climate.swingModes[t.toLowerCase()] ?? oe(t);
  }
  /** A row of mutually exclusive choices (iOS segmented look), e.g. the fan speed. */
  renderChoice(t, n, i, o, s, a) {
    return u`<div class="sheet-label">${t}</div>
      <div class="mini-segmented wide ${o ? "dim" : ""}" ?inert=${o} role="group" aria-label=${t}>
        ${n.map(
      (r) => u`<button
            type="button"
            class="plain-button mini-segment"
            aria-pressed=${r.toLowerCase() === i ? "true" : "false"}
            @click=${() => {
        this.runSheetAction(() => s(r));
      }}
          >
            ${a(r)}
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
    ], d = (k, O) => {
      const [x, T] = l(k), [z, L] = l(O);
      return `M${x.toFixed(2)} ${T.toFixed(2)} A118 118 0 ${O - k > 180 ? 1 : 0} 1 ${z.toFixed(2)} ${L.toFixed(2)}`;
    }, c = t.min ?? 0, p = t.max ?? 1, h = t.text === void 0 ? t.value : void 0, v = h === void 0 || p <= c ? 0 : Math.min(1, Math.max(0, (h - c) / (p - c))), $ = 135 + 270 * v, [S, C] = l($), w = t.onChange !== void 0 && h !== void 0, _ = t.text ?? (h === void 0 ? "––" : `${this._i18n.whole(h)}°`), E = (k) => {
      const O = k.currentTarget.getBoundingClientRect();
      let x = Math.atan2(k.clientY - (O.top + O.height / 2), k.clientX - (O.left + O.width / 2)) * 180 / Math.PI;
      return x < 0 && (x += 360), x < 135 && (x += 360), x > 405 && (x = x - 405 < 90 / 2 ? 405 : 135), Math.round(c + (x - 135) / 270 * (p - c));
    }, M = (k) => {
      if (!w)
        return;
      if (k.type === "pointerdown")
        k.currentTarget.setPointerCapture?.(k.pointerId);
      else if (k.buttons !== 1)
        return;
      const O = E(k);
      O !== h && t.onChange?.(O);
    }, b = (k) => {
      if (!w || h === void 0)
        return;
      const O = k.key === "ArrowUp" || k.key === "ArrowRight" ? 1 : k.key === "ArrowDown" || k.key === "ArrowLeft" ? -1 : 0, x = k.key === "Home" ? c : k.key === "End" ? p : h + O;
      x === h && O === 0 && k.key !== "Home" && k.key !== "End" || (k.preventDefault(), t.onChange?.(Math.min(p, Math.max(c, x))), t.onCommit?.());
    };
    return u`
      <div class="dial" style=${`--tone: ${t.tone}`}>
        <div
          class="dial-ring"
          data-drag
          role=${w ? "slider" : "img"}
          tabindex=${w ? "0" : f}
          aria-label=${t.label ?? `${t.eyebrow}: ${_}`}
          aria-valuemin=${w ? c : f}
          aria-valuemax=${w ? p : f}
          aria-valuenow=${w ? h : f}
          aria-valuetext=${w ? `${_} °C` : f}
          @pointerdown=${M}
          @pointermove=${M}
          @pointerup=${() => w && t.onCommit?.()}
          @keydown=${b}
        >
          <svg viewBox="0 0 ${272} ${232}" aria-hidden="true">
            <path class="dial-track" d=${d(135, 405)}></path>
            ${h === void 0 || v <= 0 ? f : y`<path class="dial-value" d=${d(135, Math.max(136, $))}></path>`}
            ${h === void 0 ? f : y`<circle class="dial-knob ${w ? "" : "still"}" cx=${S} cy=${C} r="12"></circle>`}
          </svg>
          <div class="dial-text" aria-hidden="true">
            <span class="dial-eyebrow">${t.eyebrow}</span>
            <span class="dial-big ${t.text === void 0 ? "" : "word"}">${_}</span>
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
    const { slot: n, last: i } = t, o = i > 0 ? n / i * 100 : 0, s = (r) => {
      if (r.type === "pointerdown")
        r.currentTarget.setPointerCapture?.(r.pointerId);
      else if (r.buttons !== 1)
        return;
      const l = r.currentTarget.getBoundingClientRect(), d = Math.round(Math.min(1, Math.max(0, (r.clientX - l.left) / Math.max(l.width, 1))) * i);
      d !== n && t.onSlot(d);
    }, a = (r) => {
      const l = r.key === "ArrowRight" || r.key === "ArrowUp" ? 1 : r.key === "ArrowLeft" || r.key === "ArrowDown" ? -1 : 0, d = r.key === "Home" ? 0 : r.key === "End" ? i : n + l;
      l === 0 && r.key !== "Home" && r.key !== "End" || (r.preventDefault(), t.onSlot(Math.min(i, Math.max(0, d))));
    };
    return u`
      <div class="timer-read" role="status">${t.readout}</div>
      <div class="timer-row">
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.leftLabel}
          aria-pressed=${n === 0 ? "true" : "false"}
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
          aria-valuemax=${i}
          aria-valuenow=${n}
          aria-valuetext=${t.readout}
          @pointerdown=${s}
          @pointermove=${s}
          @keydown=${a}
        >
          <span class="timer-track"></span>
          <span class="timer-fill" style=${`width: ${o}%`}></span>
          <span class="timer-knob" style=${`left: ${o}%`}></span>
        </div>
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.rightLabel}
          aria-pressed=${n === i ? "true" : "false"}
          @click=${() => t.onSlot(i)}
        >
          <span class="end-icon infinity" aria-hidden="true">∞</span>
        </button>
      </div>
      <div class="timer-ticks" aria-hidden="true"><span>${t.leftText}</span><span><b>∞</b></span></div>
    `;
  }
  segmentKeydown(t, n, i) {
    const o = n.indexOf(i);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = n[(o + 1) % n.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = n[(o - 1 + n.length) % n.length] : t.key === "Home" ? s = n[0] : t.key === "End" && (s = n[n.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === i ? this.requestUpdate() : this.switchSheet(s));
  }
  /** "Teď" of the air chart is the reading of the room card (CO₂ and PM2.5), so a stale value is grey there too. */
  liveReading(t, n) {
    if (n === "temperature")
      return;
    const i = Date.now(), o = this.reading(t.carbon_dioxide, t.thresholds.stale_minutes, i), s = this.pm25Reading(t, i), a = n === "pm25" ? s : o;
    return {
      value: a.value,
      stale: a.stale === !0,
      secondary: n === "co2" ? { value: s.value, stale: s.stale === !0 } : void 0
    };
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, n, i) {
    const o = this._config?.history.hours ?? 24, { t: s } = this._i18n;
    let a;
    const r = this._historyModel;
    return this._historyStatus === "loading" ? a = u`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !r ? a = u`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : ns(r, n) ? a = u`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${s.sheet.chart(this.historyPeriod())}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${ms(r, n, this.chartWidth(), this._scrubTime, this._i18n, i, this.liveReading(t, n))}
      </div>` : a = u`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, a;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(Ys).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  sheetCannotScroll(t, n) {
    const i = this.renderRoot.querySelector(".sheet");
    return !i || !t.composedPath().includes(i) ? !0 : !(i.scrollHeight > i.clientHeight + 1) || n > 0 && i.scrollTop <= 0 || n < 0 && i.scrollTop + i.clientHeight >= i.scrollHeight - 1;
  }
  renderOption(t) {
    return u`
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
          ${t.unsupported ? u`<span class="option-hint">${t.unsupported}</span>` : f}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, n, i, o, s) {
    const a = i === n && o !== "off", r = a && s.includes("none") ? "none" : n;
    return u`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${a ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.callClimateEach(t, "set_preset_mode", { preset_mode: r }));
    }}
      >
        ${oe(n)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost (a fixed 25 °C) and the duration of Ručně / Boost / Vypnuto need the
   * Tado CE action `tado_ce.set_climate_timer`; without it Boost is shown but disabled.
   * A choice is applied when the popup closes.
   */
  heatingOptions(t, n, i) {
    const o = [], s = this._i18n.t.heatingMode, a = this.timerAvailable(), r = (l, d, c, p, h) => {
      o.push({
        id: l,
        label: d,
        icon: Se(l),
        color: c,
        active: i === l,
        run: () => this.chooseHeating(t, p),
        unsupported: h
      });
    };
    return n.includes("off") && r("off", s.off, m.off, "off"), n.includes("auto") && r("auto", s.schedule, m.plan, "plan"), n.includes("heat") && r("heat", s.manual, m.warning, "manual"), o.length > 0 && r("boost", s.boost, m.alert, "boost", a ? void 0 : this._i18n.t.sheet.notOffered), o;
  }
  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  timerAvailable() {
    return !!this.hass?.services?.tado_ce?.set_climate_timer;
  }
  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  heatControl(t, n, i) {
    return this._heat?.entityId === n ? this._heat : Ln(t.name, n, i);
  }
  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  async chooseHeating(t, n) {
    const i = this._sheet?.room;
    if (!i)
      return;
    const o = this.getState(t);
    if (Ln(i.name, t, o)?.mode === n && this.sheetRooms().length === 1) {
      this._heat = void 0;
      return;
    }
    const a = this.heatControl(i, t, o);
    this._heat = {
      room: i.name,
      entityId: t,
      mode: n,
      temperature: a?.temperature ?? 21,
      duration: ii(n),
      after: a?.after
    };
  }
  /** Sends the changes made in the popup (closing, switching system, leaving for the detail). */
  flushHeat() {
    const t = this._heat;
    if (t) {
      this._heat = void 0;
      const n = this.sheetRooms().filter((i) => i.heating?.climate);
      this.applyHeat(t, n.length > 0 ? n : []);
    }
    this.flushAc();
  }
  /** The Klimatizace "turn off after" time: a script that Home Assistant runs by itself. */
  flushAc() {
    const t = this._ac;
    this._ac = void 0, this._acTarget = void 0;
    const n = t?.touched ? Lt(t.duration) : void 0;
    if (n !== void 0)
      for (const i of this.sheetRooms()) {
        const o = i.air_conditioner, s = this.getState(o)?.state.toLowerCase();
        o && s && s !== "off" && !K(s) && this.runDelayedOff(On(o, n, s));
      }
  }
  async runDelayedOff(t) {
    try {
      await this.hass?.callWS({ type: "execute_script", ...t });
    } catch (n) {
      console.error("Klima Dashboard: scheduling the switch-off failed", n), this.haptic("failure");
    }
  }
  async applyHeat(t, n) {
    const i = Lt(t.duration), o = (t.mode === "manual" || t.mode === "boost") && i !== void 0 && (t.after ?? this.defaultAfter()) === "off";
    for (const s of n) {
      const a = s.heating?.climate;
      if (a)
        try {
          await this.callCommand(Ho(a, { ...t, entityId: a, room: s.name }, this.timerAvailable())), o && i !== void 0 && this.runDelayedOff(On(a, i, "auto", 15));
        } catch (r) {
          console.error("Klima Dashboard: the heating command failed", r), this.haptic("failure");
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
  editHeat(t, n, i) {
    const o = this.heatControl(t, n, this.getState(n));
    o && (this._heat = { ...o, ...i });
  }
  /** The line under the options: what waits for the popup to close, else the time left, else what is not offered. */
  heatNote(t, n, i, o) {
    const s = this._i18n.t.sheet.heatControl;
    if (this._heat)
      return s.appliesOnClose;
    const a = ai(i), r = X(this.getState(t.heating?.overlay)?.attributes.overlay_remaining_seconds);
    return n && a !== void 0 && a !== "auto" && r !== void 0 && r > 0 ? s.remaining(Et(Math.ceil(r / 60))) : o.join(" · ");
  }
  isSummerNow() {
    const t = this._config;
    return t !== void 0 && st(this.entityState(t.houseModeEntity) ?? "") === st(t.houseModes.summer);
  }
  /** After-timer choice: the person's last pick, otherwise by season (winter Plán, summer Vypnuto). */
  defaultAfter() {
    try {
      const t = window.localStorage.getItem(jn);
      if (t === "plan" || t === "off")
        return t;
    } catch {
    }
    return this.isSummerNow() ? "off" : "plan";
  }
  chooseAfter(t, n, i) {
    try {
      window.localStorage.setItem(jn, i);
    } catch {
    }
    this.editHeat(t, n, { after: i });
  }
  /** Air conditioner target: sent once the finger lifts (or a key was pressed), to every room of the popup. */
  async commitAcTarget(t) {
    const n = this._acTarget;
    n !== void 0 && (await this.callClimateEach(t, "set_temperature", { temperature: n }), this._acTarget = void 0);
  }
  /** One climate action for the air conditioner of every room in the popup. */
  async callClimateEach(t, n, i) {
    const o = t.map((s) => s.air_conditioner).filter((s) => !!s);
    await Promise.all(o.map((s) => this.callClimate(n, { entity_id: s, ...i })));
  }
  /**
   * Klimatizace modes in the order of the popup: Vypnuto, Chlazení, WindFree (cooling with the
   * `wind_free` preset, one tap), Topení, Větrání, Sušení and Auto. Every choice goes to the
   * air conditioner of every room in the popup.
   */
  climateOptions(t, n, i, o, s) {
    const a = this.sheetRooms().filter((v) => v.air_conditioner), r = o.includes("wind_free"), l = o.includes("none"), d = this._i18n.t.climateMode, c = (v, $, S, C) => ({
      id: v,
      label: d[$],
      icon: Pt($, jt[$], !1),
      color: jt[$],
      active: S,
      run: C
    }), p = (v, $) => async () => {
      await this.callClimateEach(a, "set_hvac_mode", { hvac_mode: v }), $ !== void 0 && await this.callClimateEach(a, "set_preset_mode", { preset_mode: $ });
    }, h = [];
    if (n.includes("off") && h.push(c("off", "off", i === "off", p("off"))), n.includes("cool")) {
      const v = i === "cool" && s !== "wind_free";
      h.push(c("cool", "cool", v, p("cool", s === "wind_free" && l ? "none" : void 0))), r && h.push(c("wind_free", "wind_free", i === "cool" && s === "wind_free", p("cool", "wind_free")));
    }
    for (const [v, $] of [["heat", "heat"], ["fan_only", "fan"], ["dry", "dry"], ["auto", "auto"]])
      n.includes(v) && h.push(c(v, $, i === v, p(v)));
    return h;
  }
  async callClimate(t, n) {
    if (!this.hass)
      throw new Error("Home Assistant is not connected.");
    await this.hass.callService("climate", t, n);
  }
  async runSheetAction(t) {
    this._sheetError = void 0;
    try {
      await t();
    } catch (n) {
      console.error("Klima Dashboard: the climate command failed", n), this._sheetError = this._i18n.t.sheet.commandFailed;
    }
  }
  openSheet(t, n, i, o) {
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._dragY = 0, this._acTarget = void 0, this._ac = void 0, this._sheet = { kind: t, room: n, metric: t === "history" ? o ?? "temperature" : void 0 }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(n));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return ei(t, this._i18n.language);
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, n, i) {
    const o = (this._config?.rooms ?? []).filter((s) => n.includes(s.name));
    o.length !== 0 && (this.openSheet(t, o[0], i), this._sheet = { kind: t, room: o[0], rooms: o });
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
    window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._ventilationEnding = !1, this._vent = void 0, this._ventRequest += 1, window.clearTimeout(this._endTimer), this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
  }
  async loadRoomHistory(t) {
    const n = ++this._historyRequest;
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
      t.air_conditioner,
      t.carbon_dioxide,
      t.pm25,
      this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0,
      ...t.windows.map((r) => r.entity)
    ].filter((r) => !!r), o = this._config.history, s = Date.now(), a = s - o.hours * gt;
    try {
      const r = await Yt(this.hass, i, a, s);
      if (n !== this._historyRequest)
        return;
      this._historyModel = es(r, t, { startMs: a, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: loading the room history failed", r), n === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = ho(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: n, samples: i } = this._config.trends, o = Date.now(), s = o - n * 6e4;
    try {
      const a = await Yt(this.hass, t, s, o), r = {};
      for (const l of t)
        r[l] = Uo(a[l], s, o, i);
      this._trends = r;
    } catch (a) {
      console.error("Klima Dashboard: loading the history of the micro trends failed", a);
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
    const n = mo(this._config), i = await Promise.allSettled(
      n.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    i.forEach((s, a) => {
      if (s.status === "fulfilled") {
        const r = Date.parse(s.value?.last_reported ?? s.value?.last_updated ?? "");
        Number.isFinite(r) && (o[n[a]] = r);
      }
    }), this._reported = o;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, n, i, o = !1) {
    const s = this.numberState(t);
    if (s === void 0 || !t)
      return {};
    const a = this._reported[t];
    if (a === void 0)
      return { value: s };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(a, Number.isFinite(r) ? r : 0), d = Math.max(0, (i - l) / 6e4);
    return { value: s, ageMinutes: d, stale: !(o && s === 0) && d > n };
  }
  /**
   * PM2.5 of a room (CURRENT_SPEC.md, Chybějící data). A measured 0 µg/m³ is clean air and never
   * stale. The particle sensor shares the device of the CO₂ sensor (ALPSTUGA) and reports only a
   * change, which a steady value may not give for hours: while the CO₂ of the room is fresh, the
   * device is alive and the unchanged PM2.5 is fresh too.
   */
  pm25Reading(t, n) {
    const i = t.thresholds.stale_minutes, o = this.reading(t.pm25, i, n, !0);
    if (o.value === void 0 || o.stale !== !0)
      return o;
    const s = this.reading(t.carbon_dioxide, i, n);
    return s.value !== void 0 && s.stale === !1 ? { value: o.value, ageMinutes: s.ageMinutes, stale: !1 } : o;
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${Pn()}</span>` : f;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(ti(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const n = this.staleTitle(t);
    return n ? `, ${n.toLowerCase()}` : "";
  }
  numberState(t) {
    const n = this.entityState(t);
    if (n === void 0 || K(n.toLowerCase()))
      return;
    const i = Number.parseFloat(n);
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
Ze.styles = Is;
let N = Ze;
H([
  j()
], N.prototype, "_config");
H([
  Gn({ attribute: !1 })
], N.prototype, "hass");
H([
  j()
], N.prototype, "_sheet");
H([
  j()
], N.prototype, "_sheetError");
H([
  j()
], N.prototype, "_ventilationEnding");
H([
  j()
], N.prototype, "_announcement");
H([
  j()
], N.prototype, "_vent");
H([
  j()
], N.prototype, "_heat");
H([
  j()
], N.prototype, "_acTarget");
H([
  j()
], N.prototype, "_ac");
H([
  j()
], N.prototype, "_historyStatus");
H([
  j()
], N.prototype, "_historyModel");
H([
  j()
], N.prototype, "_scrubTime");
H([
  j()
], N.prototype, "_dragY");
H([
  j()
], N.prototype, "_flash");
H([
  j()
], N.prototype, "_moving");
H([
  j()
], N.prototype, "_prefersDark");
H([
  j()
], N.prototype, "_hint");
H([
  j()
], N.prototype, "_trends");
H([
  j()
], N.prototype, "_trendsLoaded");
H([
  j()
], N.prototype, "_reported");
H([
  j()
], N.prototype, "_historyRequest");
H([
  j()
], N.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", N);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ie(Ms()).t.cardDescription,
  preview: !1
});
