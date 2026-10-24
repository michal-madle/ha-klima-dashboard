const dt = globalThis, Ct = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pt = /* @__PURE__ */ Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let de = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ct && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (s) => new de(typeof s == "string" ? s : s + "", void 0, Pt), Ne = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new de(e, s, Pt);
}, Re = (s, t) => {
  if (Ct) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = dt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, Dt = Ct ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Oe(e);
})(s) : s;
const { is: He, defineProperty: Le, getOwnPropertyDescriptor: De, getOwnPropertyNames: Ie, getOwnPropertySymbols: Be, getPrototypeOf: Ue } = Object, gt = globalThis, It = gt.trustedTypes, je = It ? It.emptyScript : "", Ye = gt.reactiveElementPolyfillSupport, J = (s, t) => s, ft = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? je : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, zt = (s, t) => !He(s, t), Bt = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), gt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let B = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Bt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Le(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = De(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const a = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const t = Ue(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const e = this.properties, i = [...Ie(e), ...Be(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(Dt(r));
    } else t !== void 0 && e.push(Dt(t));
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
    return Re(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : ft).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ft;
      this._$Em = r;
      const a = o.fromAttribute(e, n.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? zt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
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
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[J("elementProperties")] = /* @__PURE__ */ new Map(), B[J("finalized")] = /* @__PURE__ */ new Map(), Ye?.({ ReactiveElement: B }), (gt.reactiveElementVersions ??= []).push("2.1.2");
const Ft = globalThis, Ut = (s) => s, mt = Ft.trustedTypes, jt = mt ? mt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, pe = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + O, Ve = `<${ue}>`, D = document, tt = () => D.createComment(""), et = (s) => s === null || typeof s != "object" && typeof s != "function", Ot = Array.isArray, We = (s) => Ot(s) || typeof s?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yt = /-->/g, Vt = />/g, R = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wt = /'/g, Kt = /"/g, fe = /^(?:script|style|textarea|title)$/i, me = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), m = me(1), $ = me(2), V = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), qt = /* @__PURE__ */ new WeakMap(), L = D.createTreeWalker(D, 129);
function ge(s, t) {
  if (!Ot(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const Ke = (s, t) => {
  const e = s.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = q;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, u, d = -1, g = 0;
    for (; g < l.length && (o.lastIndex = g, u = o.exec(l), u !== null); ) g = o.lastIndex, o === q ? u[1] === "!--" ? o = Yt : u[1] !== void 0 ? o = Vt : u[2] !== void 0 ? (fe.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = R) : u[3] !== void 0 && (o = R) : o === R ? u[0] === ">" ? (o = r ?? q, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, h = u[1], o = u[3] === void 0 ? R : u[3] === '"' ? Kt : Wt) : o === Kt || o === Wt ? o = R : o === Yt || o === Vt ? o = q : (o = R, r = void 0);
    const v = o === R && s[a + 1].startsWith("/>") ? " " : "";
    n += o === q ? l + Ve : d >= 0 ? (i.push(h), l.slice(0, d) + pe + l.slice(d) + O + v) : l + O + (d === -2 ? a : v);
  }
  return [ge(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class it {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, u] = Ke(t, e);
    if (this.el = it.createElement(h, i), L.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = L.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(pe)) {
          const g = u[o++], v = r.getAttribute(d).split(O), y = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: y[2], strings: v, ctor: y[1] === "." ? Ge : y[1] === "?" ? Ze : y[1] === "@" ? Xe : $t }), r.removeAttribute(d);
        } else d.startsWith(O) && (l.push({ type: 6, index: n }), r.removeAttribute(d));
        if (fe.test(r.tagName)) {
          const d = r.textContent.split(O), g = d.length - 1;
          if (g > 0) {
            r.textContent = mt ? mt.emptyScript : "";
            for (let v = 0; v < g; v++) r.append(d[v], tt()), L.nextNode(), l.push({ type: 2, index: ++n });
            r.append(d[g], tt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ue) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(O, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function W(s, t, e = s, i) {
  if (t === V) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = et(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = W(s, r._$AS(s, t.values), r, i)), t;
}
class qe {
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? D).importNode(e, !0);
    L.currentNode = r;
    let n = L.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new rt(n, n.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (h = new Je(n, this, t)), this._$AV.push(h), l = i[++a];
      }
      o !== l?.index && (n = L.nextNode(), o++);
    }
    return L.currentNode = D, r;
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
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = W(this, t, e), et(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : We(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && et(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = it.createElement(ge(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new qe(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = qt.get(t.strings);
    return e === void 0 && qt.set(t.strings, e = new it(t)), e;
  }
  k(t) {
    Ot(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t) r === e.length ? e.push(i = new rt(this.O(tt()), this.O(tt()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Ut(t).nextSibling;
      Ut(t).remove(), t = i;
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
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = W(this, t, e, 0), o = !et(t) || t !== this._$AH && t !== V, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = n[0], l = 0; l < n.length - 1; l++) h = W(this, a[i + l], e, l), h === V && (h = this._$AH[l]), o ||= !et(h) || h !== this._$AH[l], h === p ? t = p : t !== p && (t += (h ?? "") + n[l + 1]), this._$AH[l] = h;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ge extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ze extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Xe extends $t {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = W(this, t, e, 0) ?? p) === V) return;
    const i = this._$AH, r = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== p && (i === p || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Je {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const Qe = Ft.litHtmlPolyfillSupport;
Qe?.(it, rt), (Ft.litHtmlVersions ??= []).push("3.3.3");
const ti = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = r = new rt(t.insertBefore(tt(), n), n, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
const Nt = globalThis;
class Q extends B {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ti(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, Nt.litElementHydrateSupport?.({ LitElement: Q });
const ei = Nt.litElementPolyfillSupport;
ei?.({ LitElement: Q });
(Nt.litElementVersions ??= []).push("4.2.2");
const ii = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: zt }, si = (s = ii, t, e) => {
  const { kind: i, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function $e(s) {
  return (t, e) => typeof e == "object" ? si(s, t, e) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(s, t, e);
}
function S(s) {
  return $e({ ...s, state: !0, attribute: !1 });
}
const ri = ["bedroom", "office", "kids", "living"], ve = "none", be = "input_select.house_mode", ye = {
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
function ni(s) {
  if (!s || !Array.isArray(s.rooms) || s.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (s.house_mode_entity !== void 0 && (typeof s.house_mode_entity != "string" || !s.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of s.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [n, o] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (n in i)
        throw new Error(`Room "${e.name}": key "${n}" was renamed to "${o}".`);
    const r = [...ri, ve];
    if (e.scene !== void 0 && !r.includes(e.scene))
      throw new Error(`Room "${e.name}": scene must be one of ${r.join(", ")}.`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(s.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...ye, ...s.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  if (t.stale_minutes <= 0)
    throw new Error('Threshold "stale_minutes" must be greater than 0.');
  return { ...s, thresholds: t };
}
const Gt = { domain: "script", service: "zaluzie_posun" }, oi = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0, tone: "#A5A1F2" },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100, tone: "#7FC8F8" },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100, tone: "#FFD84A" }
], G = { temperature: 1, co2: 100, pm25: 5 }, c = {
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
}, st = {
  off: c.off,
  cool: c.cool,
  wind_free: c.cool,
  dry: c.dry,
  fan: c.plan,
  heat: c.heat,
  auto: c.auto,
  unknown: c.off
}, vt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, ai = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function we(s) {
  const t = ai[s];
  if (t)
    return t;
  const e = s.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function _e(s) {
  switch (s?.toLowerCase()) {
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
function li(s, t, e, i) {
  const r = [
    ["teplota", s.temperature],
    ["vlhkost", s.humidity],
    ["CO₂", s.co2],
    ["PM2.5", s.pm25],
    ["režim domu", e ? { value: 1 } : void 0]
  ];
  for (const [d, g] of r) {
    if (g?.value === void 0)
      return { label: `Bez dat · ${d}`, color: c.label, kind: "unknown" };
    if (g.stale) {
      const v = g.ageMinutes === void 0 ? "" : ` (před ${Se(g.ageMinutes)})`;
      return { label: `Bez dat · ${d}${v}`, color: c.label, kind: "unknown" };
    }
  }
  const n = s.temperature.value, o = s.humidity.value, a = s.co2.value;
  if (s.pm25.value >= i.pm25_critical)
    return { label: "Znečištěný vzduch", color: c.alert, kind: "critical" };
  if (a >= i.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: c.alert, kind: "critical" };
  if (a >= i.co2_warning)
    return { label: "Vydýchaný vzduch", color: c.warning, kind: "warning" };
  if (o > i.humidity_max)
    return { label: "Vlhko", color: c.warning, kind: "warning" };
  if (o < i.humidity_min)
    return { label: "Sucho", color: c.warning, kind: "warning" };
  const h = t ? i.summer_min : i.winter_min, u = t ? i.summer_max : i.winter_max;
  return n > u ? { label: "Teplo", color: c.warning, kind: "warning" } : n < h ? { label: "Chladno", color: c.cold, kind: "warning" } : { label: "Příjemné", color: c.label, kind: "normal" };
}
function Zt(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function P(s) {
  return s === "" || s === "unknown" || s === "unavailable" || s === "none";
}
function _t(s) {
  if (s == null || s === "")
    return;
  const t = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function xt(s) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(s);
}
function xe(s) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(s * 2) / 2
  );
}
function ke(s) {
  return s === void 0 || s <= 0 ? 0 : s <= 34 ? 1 : s <= 67 ? 2 : 3;
}
function hi(s) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(s.house_mode_entity ?? be), e(s.outside?.temperature), e(s.outside?.minimum), e(s.outside?.maximum), e(s.outside?.rain_probability), e(s.outside?.pm25);
  for (const i of s.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function ci(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function di(s, t) {
  if (s === t)
    return !0;
  if (!s || !t)
    return !1;
  const e = Object.keys(s), i = Object.keys(t);
  return e.length === i.length && e.every((r) => Object.hasOwn(t, r) && s[r] === t[r]);
}
function Se(s) {
  return s < 60 ? `${Math.max(1, Math.round(s))} min` : s < 2880 ? `${Math.floor(s / 60)} h` : `${Math.floor(s / 1440)} d`;
}
function Xt(s, t) {
  const e = (s ?? []).filter((r) => r !== void 0);
  if (e.length < 2)
    return;
  const i = e[e.length - 1] - e[0];
  return i >= t / 2 ? "stoupá" : i <= -t / 2 ? "klesá" : "stabilní";
}
function Me(s, t, e, i) {
  return s === 1 ? t : s >= 2 && s <= 4 ? e : i;
}
function pi(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s.rooms)
    for (const i of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
const pt = 60, kt = 142, Jt = 18, ot = 3, ui = 0.8, fi = 1, mi = 0.28, gi = 0.5, $i = 0.7;
function vi(s, t) {
  if (s === void 0 || t === void 0)
    return $`<rect
      x="0.75"
      y="0.75"
      width=${pt - 1.5}
      height=${kt - 1.5}
      rx="6"
      fill="none"
      stroke=${c.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = kt - ot - 1, i = e / Jt, r = i - ui, n = r - t / 100 * (r - fi), o = ot + 1 + (100 - s) / 100 * e, a = Array.from({ length: Jt }, (l, h) => {
    const u = ot + 1 + h * i + (i - n) / 2, d = u + n / 2 <= o;
    return $`<rect
      x="0"
      y=${u.toFixed(2)}
      width=${pt}
      height=${n.toFixed(2)}
      rx=${Math.min(1.5, n / 2).toFixed(2)}
      fill=${d ? c.blind : c.sky}
      opacity=${d ? gi : mi}
    ></rect>`;
  });
  return $`<rect
      class="rail"
      x="0"
      y="0"
      width=${pt}
      height=${ot}
      rx="1.5"
      fill=${c.blind}
      opacity=${$i}
    ></rect>${a}`;
}
const Te = 36e5, bi = 120 * 6e4, Qt = 12;
function yi(s) {
  if (s == null)
    return;
  if (typeof s == "number")
    return Number.isFinite(s) ? s < 1e11 ? s * 1e3 : s : void 0;
  const t = Date.parse(s);
  return Number.isNaN(t) ? void 0 : t;
}
function wi(s, t) {
  const e = {};
  for (const [i, r] of Object.entries(s ?? {})) {
    if (!Array.isArray(r))
      continue;
    const n = [];
    r.forEach((o, a) => {
      const l = o.s ?? o.state, h = yi(o.lu ?? o.last_updated ?? o.lc ?? o.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && h !== void 0 && n.push({ time: Math.max(h, t), state: l });
    }), n.sort((o, a) => o.time - a.time), e[i] = n;
  }
  return e;
}
async function te(s, t, e, i) {
  if (t.length === 0)
    return {};
  const r = await s.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return wi(r, e);
}
function Ae(s, t) {
  let e;
  for (const i of s ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function St(s) {
  if (s === void 0)
    return;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : void 0;
}
function _i(s, t, e, i) {
  const r = (e - t) / i, n = (s ?? []).filter((o) => St(o.state) !== void 0);
  return Array.from(
    { length: i },
    (o, a) => St(Ae(n, t + (a + 1) * r))
  );
}
function ee(s, t, e) {
  const i = [];
  for (const n of s ?? []) {
    const o = St(n.state);
    o !== void 0 && n.time <= e && i.push({ t: Math.max(n.time, t), v: o });
  }
  const r = i[i.length - 1];
  return r && r.t < e && i.push({ t: e, v: r.v }), i;
}
function at(s, t, e, i) {
  const r = /* @__PURE__ */ new Set([t, e]);
  for (const a of s)
    for (const l of a ?? [])
      l.time > t && l.time < e && r.add(l.time);
  const n = [...r].sort((a, l) => a - l), o = [];
  for (let a = 0; a < n.length - 1; a += 1) {
    const l = i(s.map((u) => Ae(u, n[a])));
    if (l === void 0)
      continue;
    const h = o[o.length - 1];
    h && h.value === l && h.end === n[a] ? h.end = n[a + 1] : o.push({ start: n[a], end: n[a + 1], value: l });
  }
  return o;
}
function yt(s, t) {
  let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const o of s)
    for (const a of o ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), i = Math.max(i, a));
  if (!Number.isFinite(e) || !Number.isFinite(i) || t <= 0)
    return;
  let r = Math.floor(e / t) * t, n = Math.ceil(i / t) * t;
  return n - r < t && (r -= t, n += t), { min: r, max: n };
}
function xi(s, t) {
  const e = t.max - t.min;
  return s.map(
    (i) => i === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / e))
  );
}
function ki() {
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
function Si(s) {
  let t;
  switch (s) {
    case "dark":
      t = $`<path d="M5 9.2h14M5 12.2h14M5 15.2h14M5 18.2h14" stroke-width="2.4"></path>`;
      break;
    case "shade":
      t = $`<path d="M5 9.6h14M5 13.4h14M5 17.2h14" stroke-width="1.4"></path>`;
      break;
    default:
      t = $`<path d="M5 8.4h14" stroke-width="1.6"></path>
        <path d="M16.6 9.8v6" stroke-width="1.3"></path>
        <circle cx="16.6" cy="17.2" r="1.25" fill="currentColor" stroke="none"></circle>`;
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
      <rect x="3.5" y="3.2" width="17" height="3" rx="1.5" fill="currentColor" stroke="none"></rect>
      ${t}
    </svg>
  `;
}
function Mt(s, t) {
  return m`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (e) => $`<path
          d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          stroke=${e < s ? c.warning : c.off}
          stroke-dasharray=${t ? "1.6 2.6" : p}
        ></path>`
  )}
    </svg>
  `;
}
function ut(s, t, e) {
  let i;
  const r = $`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = $`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (s) {
    case "cool":
    case "wind_free":
      i = $`${r}
        <g transform="rotate(60 12 12)">${r}</g>
        <g transform="rotate(120 12 12)">${r}</g>`;
      break;
    case "dry":
      i = $`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      i = $`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
      break;
    case "heat":
      i = $`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (o) => $`<path d="M12 3v2.5" transform=${`rotate(${45 * o} 12 12)`}></path>`
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
      stroke-dasharray=${e ? "2 2.4" : p}
      aria-hidden="true"
    >
      ${i}
    </svg>
  `;
}
function ie(s, t) {
  return m`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke=${s}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : p}
      aria-hidden="true"
    >
      <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
      <path d="M12 3.5v17M5 12h14"></path>
    </svg>
  `;
}
function Mi(s) {
  let t;
  switch (s) {
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
const T = 4, Ti = 32, U = 6, j = 150, A = U + j, Z = 10, Ai = A + 20, se = A + 25, Ei = A + 50, lt = A + 55, Ci = A + 83, re = A + 90, ht = 11, Pi = 22, zi = 6, Fi = [0, 0.24, 0.44, 0.68], ne = "history-under-temperature", Tt = {
  schedule: c.plan,
  manual: c.warning,
  off: c.closed
}, Ee = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, Ce = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" });
function wt(s, t) {
  const e = s?.toLowerCase();
  return t?.toLowerCase() === "off" || e === "off" ? "off" : e === "schedule" || e === "manual" ? e : void 0;
}
function oe(s) {
  if (s === void 0)
    return;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : void 0;
}
function Oi(s, t, e) {
  const i = (b) => b ? s[b] : void 0, { startMs: r, endMs: n } = e, o = i(t.heating?.overlay), a = i(t.heating?.climate), l = ee(i(t.temperature), r, n), h = ee(i(t.humidity), r, n), u = at([o, a], r, n, ([b, M]) => wt(b, M)), d = at(
    [o, a, i(t.heating?.intensity)],
    r,
    n,
    ([b, M, K]) => {
      const N = wt(b, M), f = ke(oe(K));
      return N === void 0 || N === "off" || f === 0 ? void 0 : String(f);
    }
  ), g = at(
    [o, a, i(t.heating?.target)],
    r,
    n,
    ([b, M, K]) => {
      const N = wt(b, M), f = oe(K);
      return N === "schedule" || N === "manual" ? f === void 0 ? void 0 : String(f) : void 0;
    }
  ), v = at([i(t.air_conditioner)], r, n, ([b]) => {
    const M = _e(b);
    return M === "unknown" ? void 0 : M;
  }), y = [...l.map((b) => b.v), ...g.map((b) => Number(b.value))];
  let x = 19, w = 23;
  if (y.length > 0 && (x = Math.floor(Math.min(...y) - 0.2), w = Math.ceil(Math.max(...y) + 0.2), w - x < 3)) {
    const b = 3 - (w - x);
    x -= Math.floor(b / 2), w = x + 3;
  }
  const nt = w - x <= 6 ? 1 : 2, E = h.map((b) => b.v);
  return {
    range: e,
    temperature: l,
    humidity: h,
    heating: u,
    intensity: d,
    target: g,
    climate: v,
    tempMin: x,
    tempMax: w,
    tempStep: nt,
    humidityMin: E.length > 0 ? Math.min(...E) : void 0,
    humidityMax: E.length > 0 ? Math.max(...E) : void 0
  };
}
function Ni(s) {
  return s.temperature.length > 0 || s.humidity.length > 0 || s.heating.length > 0;
}
function Y(s) {
  return s - T - Ti;
}
function Ri(s, t, e) {
  return T + (s - t.startMs) / (t.endMs - t.startMs) * Y(e);
}
function Hi(s, t, e) {
  const i = Math.min(1, Math.max(0, (s - T) / Y(t)));
  return e.startMs + i * (e.endMs - e.startMs);
}
function At(s, t) {
  let e;
  for (const i of s) {
    if (i.t > t)
      break;
    e = i.v;
  }
  return e;
}
function ct(s, t, e) {
  return s.find(
    (i) => i.start <= t && (t < i.end || t === e && i.end === e)
  )?.value;
}
function Li(s) {
  const t = [], e = new Date(s.startMs);
  for (e.setHours(0, 0, 0, 0), e.setDate(e.getDate() - 1); e.getTime() < s.endMs; ) {
    const i = new Date(e);
    i.setHours(Pi, 0, 0, 0);
    const r = new Date(e);
    r.setDate(r.getDate() + 1), r.setHours(zi, 0, 0, 0);
    const n = Math.max(i.getTime(), s.startMs), o = Math.min(r.getTime(), s.endMs);
    o > n && t.push([n, o]), e.setDate(e.getDate() + 1);
  }
  return t;
}
function Di(s) {
  const t = [], e = new Date(s.startMs);
  for (e.setMinutes(0, 0, 0), e.setHours(Math.ceil(e.getHours() / 6) * 6); e.getTime() <= s.endMs; )
    e.getTime() >= s.startMs && t.push(e.getTime()), e.setHours(e.getHours() + 6);
  return t;
}
function H(s, t, e = "block") {
  return m`<span class="legend-item">
    <span class="legend-swatch ${e}" style=${e === "block" ? `background: ${s}` : `border-color: ${s}`}></span
    >${t}
  </span>`;
}
function Ii(s, t) {
  const e = t ?? s.range.endMs, i = At(s.temperature, e), r = At(s.humidity, e), n = ct(s.heating, e, s.range.endMs), o = Number(ct(s.intensity, e, s.range.endMs) ?? 0), a = ct(s.target, e, s.range.endMs), l = ct(s.climate, e, s.range.endMs);
  let h = "Teď";
  t !== void 0 && (h = `${new Date(t).toDateString() === new Date(s.range.endMs).toDateString() ? "" : "včera "}${Ce.format(t)}`);
  const u = n === void 0 ? "––" : `${Ee[n]}${n !== "off" && a !== void 0 ? ` · ${xe(Number(a))} °C` : ""}`, d = l ? vt[l] : "––", g = l ? st[l] : c.off;
  return m`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${h}</span>
        <span class="readout-temp">${i === void 0 ? "––" : `${xt(i)} °C`}</span>
        <span class="readout-hum">${r === void 0 ? "" : `${Math.round(r)} %`}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${n ? Tt[n] : c.label}`}>
          <span class="readout-icon">${Mt(n && n !== "off" ? o : 0, n === void 0)}</span>
          Topení ${u}
        </span>
        <span class="readout-system" style=${`color: ${g}`}>
          <span class="readout-icon">${ut(l ?? "off", g, l === void 0)}</span>
          Klimatizace ${d}
        </span>
      </div>
    </div>
  `;
}
function Bi(s, t, e) {
  const { range: i } = s, r = (f) => Ri(f, i, t), n = (f) => A - (f - s.tempMin) / (s.tempMax - s.tempMin) * j, o = (s.humidityMin ?? 0) - 3, a = Math.max((s.humidityMax ?? 100) + 3, o + 12), l = (f) => A - (f - o) / (a - o) * j, h = T + Y(t), u = (f, C) => f.map((z, F) => `${F === 0 ? "M" : "L"}${r(z.t).toFixed(1)} ${C(z.v).toFixed(1)}`).join(" "), d = u(s.temperature, n), g = s.temperature[0], v = s.temperature[s.temperature.length - 1], y = g && v ? `${d} L${r(v.t).toFixed(1)} ${A} L${r(g.t).toFixed(1)} ${A} Z` : "";
  let x = "";
  s.target.forEach((f, C) => {
    const z = n(Number(f.value)).toFixed(1), F = s.target[C - 1];
    x += F && F.end === f.start ? ` L${r(f.start).toFixed(1)} ${z}` : ` M${r(f.start).toFixed(1)} ${z}`, x += ` L${r(f.end).toFixed(1)} ${z}`;
  });
  const w = [];
  for (let f = s.tempMin; f <= s.tempMax; f += s.tempStep)
    w.push(f);
  const nt = (f, C, z) => f.map((F) => {
    const Ht = r(F.start);
    return $`<rect x=${Ht.toFixed(1)} y=${C} width=${Math.max(r(F.end) - Ht, 0.8).toFixed(1)}
        height=${Z} rx="2" fill=${z(F.value)}></rect>`;
  }), E = e === void 0 ? void 0 : r(e), b = e === void 0 ? void 0 : At(s.temperature, e), M = Li(i), K = ["schedule", "manual", "off"].filter((f) => s.heating.some((C) => C.value === f)), N = [...new Set(s.climate.map((f) => f.value))];
  return m`
    ${Ii(s, e)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${re}"
      width=${t}
      height=${re}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${ne}><path d=${y}></path></clipPath>
      </defs>
      <rect x=${T} y=${U} width=${Y(t)} height=${j} rx="8" fill="rgb(255 255 255 / 5%)"></rect>
      ${M.map(
    ([f, C]) => $`<rect x=${r(f).toFixed(1)} y=${U} width=${(r(C) - r(f)).toFixed(1)}
          height=${j} fill="rgb(0 0 0 / 30%)"></rect>`
  )}
      ${w.map(
    (f) => $`<line x1=${T} x2=${h} y1=${n(f).toFixed(1)} y2=${n(f).toFixed(1)}
            stroke="rgb(255 255 255 / 8%)" stroke-width="1"></line>
          <text x=${h + 6} y=${(n(f) + 4).toFixed(1)} fill=${c.label} font-size=${ht}>${f}°</text>`
  )}
      ${y ? $`<path d=${y} fill="rgb(255 255 255 / 7%)"></path>` : p}
      <g clip-path=${`url(#${ne})`}>
        ${s.intensity.map(
    (f) => $`<rect x=${r(f.start).toFixed(1)} y=${U}
            width=${Math.max(r(f.end) - r(f.start), 0.8).toFixed(1)} height=${j}
            fill=${c.warning} opacity=${Fi[Number(f.value)] ?? 0}></rect>`
  )}
      </g>
      ${s.humidity.length > 0 ? $`<path d=${u(s.humidity, l)} fill="none" stroke=${c.humidityLine}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : p}
      ${x ? $`<path d=${x} fill="none" stroke=${c.plan} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6"></path>` : p}
      ${d ? $`<path d=${d} fill="none" stroke=${c.white} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : p}
      ${v && e === void 0 ? $`<circle cx=${r(v.t).toFixed(1)} cy=${n(v.v).toFixed(1)} r="3.5" fill=${c.white}></circle>` : p}

      <text x=${T} y=${Ai} fill=${c.label} font-size=${ht}>Topení</text>
      <rect x=${T} y=${se} width=${Y(t)} height=${Z} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${nt(s.heating, se, (f) => Tt[f] ?? c.off)}
      <text x=${T} y=${Ei} fill=${c.label} font-size=${ht}>Klimatizace</text>
      <rect x=${T} y=${lt} width=${Y(t)} height=${Z} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${nt(s.climate, lt, (f) => st[f] ?? c.off)}

      ${Di(i).map(
    (f) => $`<line x1=${r(f).toFixed(1)} x2=${r(f).toFixed(1)} y1=${U} y2=${lt + Z}
            stroke="rgb(255 255 255 / 6%)" stroke-width="1"></line>
          <text x=${r(f).toFixed(1)} y=${Ci} fill=${c.label} font-size=${ht} text-anchor="middle">${Ce.format(f)}</text>`
  )}
      ${E === void 0 ? p : $`<line x1=${E.toFixed(1)} x2=${E.toFixed(1)} y1=${U} y2=${lt + Z}
              stroke=${c.white} stroke-width="1" opacity="0.7"></line>
            ${b === void 0 ? p : $`<circle cx=${E.toFixed(1)} cy=${n(b).toFixed(1)} r="4" fill=${c.white}
                  stroke="#1c1c1e" stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${H(c.white, "Teplota", "line")}
      ${s.target.length > 0 ? H(c.plan, "Cíl topení", "dashed") : p}
      ${s.intensity.length > 0 ? H(c.warning, "Vytápění (sytost = výkon)") : p}
      ${s.humidityMin !== void 0 && s.humidityMax !== void 0 ? H(
    c.humidityLine,
    `Vlhkost ${Math.round(s.humidityMin)}–${Math.round(s.humidityMax)} %`,
    "dashed"
  ) : p}
      ${M.length > 0 ? H("rgb(0 0 0 / 55%)", "Noc 22–6 h") : p}
    </div>
    <div class="legend">
      ${K.map((f) => H(Tt[f], `Topení ${Ee[f]}`))}
      ${N.map((f) => H(st[f], `Klimatizace ${vt[f]}`))}
    </div>
  `;
}
const ae = Te / 4, Ui = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
};
function ji(s) {
  if (s.scene === ve)
    return;
  if (s.scene)
    return s.scene;
  const t = s.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
  return Ui[t];
}
const Yi = {
  bedroom: "#A5A1F2",
  office: "#7FC8F8",
  kids: "#FFB36B",
  living: "#E8D9B5"
};
function Vi(s) {
  let t;
  switch (s) {
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
const Wi = Ne`
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

    /* Stale value: dimmed, never coloured (CURRENT_SPEC.md, Chybějící data). */
    .temperature.stale,
    .humidity.stale {
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
    /*
     * Topení + Klimatizace: one touch target over both rows. It may grow into the faded start
     * of the temperature trend (up to 40 % of the trend column) so a target such as
     * "WindFree · 22 °C" stays whole, and sits above the trend.
     */
    .slot-hvac {
      grid-column: 1 / -1;
      grid-row: 4 / span 2;
      justify-self: start;
      max-width: calc((100% - var(--info-gap)) / 2 * 1.4 + var(--info-gap));
    }

    .hvac {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-rows: var(--row-h) var(--row-h);
      min-width: 0;
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

    /* Trends fade out to the left, so text running into them stays readable. */
    .spark {
      -webkit-mask-image: linear-gradient(to right, transparent, #000 55%);
      mask-image: linear-gradient(to right, transparent, #000 55%);
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
      width: 20px;
      height: 20px;
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
      min-height: 36px;
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
      .preset.sent,
      .preset-hint,
      .spark.loading,
      .cover-panel.moving .rail {
        animation: none;
      }

      .sheet {
        transition: none;
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
`, Ki = " ";
function le(s) {
  if (!s || P(s.state.toLowerCase()))
    return;
  const t = Number.parseFloat(s.state);
  return Number.isFinite(t) ? t : void 0;
}
function Et(s) {
  return s === void 0 ? "" : `· ${xe(s)}${Ki}°C`;
}
function Pe(s, t, e, i) {
  const r = s?.state.toLowerCase(), n = t?.state.toLowerCase(), o = n === void 0 || P(n), a = r === "off" || n === "off", l = le(e);
  if (a)
    return { label: "Vypnuto", color: c.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (o || r === void 0 || P(r))
    return { label: "––", color: c.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const h = ke(le(i));
  return n === "schedule" ? { label: "Plán", color: c.plan, active: !0, extra: Et(l), unknown: !1, overlay: "schedule", waves: h } : n === "manual" ? { label: "Ručně", color: c.warning, active: !0, extra: Et(l), unknown: !1, overlay: "manual", waves: h } : { label: t?.state ?? "––", color: c.warning, active: !0, extra: "", unknown: !1, waves: h };
}
function ze(s) {
  let t = "unknown", e, i;
  if (s && !P(s.state.toLowerCase())) {
    const n = s.state.toLowerCase(), o = String(s.attributes.preset_mode ?? "none").toLowerCase();
    n === "off" ? t = "off" : n === "cool" ? t = o === "wind_free" ? "wind_free" : "cool" : n === "dry" ? t = "dry" : n === "fan_only" ? t = "fan" : n === "heat" ? t = "heat" : (n === "auto" || n === "heat_cool") && (t = "auto"), t !== "off" && t !== "unknown" && t !== "wind_free" && o !== "none" && o !== "" && (e = we(o)), i = _t(s.attributes.temperature);
  }
  const r = ["cool", "wind_free", "dry", "heat", "auto"].includes(t);
  return {
    mode: t,
    label: e ?? vt[t],
    color: st[t],
    active: t !== "off" && t !== "unknown",
    extra: r ? Et(i) : "",
    unknown: t === "unknown"
  };
}
function qi(s) {
  const t = s.unknown ? "neznámý stav" : s.label;
  return s.extra ? `${t} ${s.extra.replace(/^·\s*/, "")}` : t;
}
const Gi = ["místnost", "místnosti", "místností"];
function Fe(s) {
  return `${s} ${Me(s, ...Gi)}`;
}
function he(s) {
  return s.length <= 2 ? s.join(", ") : Fe(s.length);
}
function Zi(s, t) {
  const e = [], i = [], r = [], n = [];
  for (const a of s) {
    const l = t(a.window)?.state.toLowerCase();
    l !== void 0 && !P(l) && l === "on" && e.push(a.name);
    const h = Pe(
      t(a.heating?.climate),
      t(a.heating?.overlay),
      t(a.heating?.target),
      t(a.heating?.intensity)
    );
    h.overlay === "manual" && i.push(a.name), h.waves > 0 && r.push(a.name), a.air_conditioner && ze(t(a.air_conditioner)).active && n.push(a.name);
  }
  const o = [];
  return e.length > 0 && o.push({
    kind: "windows",
    text: `${e.length} ${Me(e.length, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    color: c.sky,
    spoken: `Otevřená okna: ${e.join(", ")}`
  }), i.length > 0 && o.push({
    kind: "manual",
    text: `Ručně: ${he(i)}`,
    color: c.warning,
    spoken: `Topení ručně: ${i.join(", ")}`
  }), r.length > 0 && o.push({
    kind: "heating",
    text: `Topí ${Fe(r.length)}`,
    color: c.warning,
    spoken: `Topí se: ${r.join(", ")}`
  }), n.length > 0 && o.push({
    kind: "climate",
    text: `Klimatizace: ${he(n)}`,
    color: c.cool,
    spoken: `Klimatizace zapnutá: ${n.join(", ")}`
  }), o;
}
var Xi = Object.defineProperty, k = (s, t, e, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(t, e, r) || r);
  return r && Xi(t, e, r), r;
};
const Ji = 5 * 6e4, Qi = 8e3, I = " ", ts = 550, ce = 400, es = 700, is = 1600, ss = 100, rs = 0.6, ns = 6, os = ["off", "cool", "dry", "fan_only", "auto", "heat"], X = { heating: "Topení", climate: "Klimatizace" }, Rt = class Rt extends Q {
  constructor() {
    super(...arguments), this._historyStatus = "loading", this._dragY = 0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._trendsLoading = !1, this._trendsStarted = !1, this._pressing = !1, this._pressFired = !1, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, i = t.currentTarget.querySelector("svg.chart");
      if (!e || !i)
        return;
      const r = i.getBoundingClientRect(), n = this.chartWidth();
      this._scrubTime = Hi((t.clientX - r.left) * n / Math.max(r.width, 1), n, e.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const e = this._historyModel;
      if (!e)
        return;
      const { startMs: i, endMs: r } = e.range, n = this._scrubTime ?? r;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const o = n + (t.key === "ArrowLeft" ? -ae : ae);
        this._scrubTime = o >= r ? void 0 : Math.max(i, o);
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
        if (i < ns)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const i = Math.max(0, t.clientY - e.startY), r = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > ss || r > rs) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = [
        ...this.renderRoot.querySelectorAll(".sheet button:not([disabled]), .sheet .chart-wrap")
      ];
      if (e.length === 0)
        return;
      const i = this.renderRoot.activeElement, r = i ? e.indexOf(i) : -1, n = t.shiftKey ? e[r <= 0 ? e.length - 1 : r - 1] : e[r === -1 || r === e.length - 1 ? 0 : r + 1];
      t.preventDefault(), n.focus();
    };
  }
  setConfig(t) {
    this._config = ni(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of [this._noticeTimer, this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    window.clearInterval(this._trendTimer), this._trendTimer = void 0, this._noticeTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? this.hasRelevantEntityChanged(t.get("hass")) : !0;
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, Ji)), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of hi(this._config)) {
      const i = t.states[e], r = this.hass.states[e];
      if (i?.state !== r?.state || i?.last_updated !== r?.last_updated || !di(i?.attributes, r?.attributes))
        return !0;
    }
    return !1;
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }
  render() {
    if (!this._config)
      return p;
    const t = this.entityState(this._config.house_mode_entity ?? be)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", r = this.thresholds(), n = this.trendAxes(this._config), o = Date.now();
    return m`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
            ${this.renderSummary(Zi(this._config.rooms, (a) => this.getState(a)))}
          </header>
          ${this._notice ? m`<div class="notice" role="alert">${this._notice}</div>` : p}
          <div class="rooms">
            ${this._config.rooms.map(
      (a) => this.renderRoom(a, e, i, r, n, o)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...ye, ...this._config?.thresholds };
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (i) => t.rooms.map((r) => {
      const n = i(r);
      return n ? this._trends[n] : void 0;
    });
    return {
      temperature: yt(e((i) => i.temperature), G.temperature),
      co2: yt(e((i) => i.carbon_dioxide), G.co2),
      pm25: yt(e((i) => i.pm25), G.pm25)
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return p;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), r = this.numberState(t.minimum), n = this.numberState(t.maximum), o = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = r !== void 0 && n !== void 0 ? `${e.format(r)}–${e.format(n)}${I}°C` : void 0, h = [
      i === void 0 ? void 0 : `${e.format(i)}${I}°C`,
      l,
      o === void 0 ? void 0 : `☂${I}${e.format(o)}${I}%`
    ].filter((v) => v !== void 0), u = this.thresholds();
    let d = "––", g = c.label;
    return a !== void 0 && (a >= u.pm25_critical ? (d = "špatný", g = c.alert) : a >= u.pm25_warning ? (d = "zhoršený", g = c.warning) : d = "dobrý"), h.length === 0 && !t.pm25 ? p : m`<div class="outside">
      ${h.length > 0 ? m`<div>${h.join(" · ")}</div>` : p}
      ${t.pm25 ? m`<div>Vzduch venku: <span style=${`color: ${g}`}>${d}</span></div>` : p}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? p : m`<ul class="summary" aria-label="Souhrn domu">
      ${t.map((e) => {
      const i = e.kind === "windows" ? ie(e.color, !1) : e.kind === "climate" ? ut("cool", e.color, !1) : Mt(3, !1);
      return m`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${i}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, r, n, o) {
    const a = r.stale_minutes, l = this.reading(t.temperature, a, o), h = this.reading(t.humidity, a, o), u = this.reading(t.carbon_dioxide, a, o), d = this.reading(t.pm25, a, o), g = li({ temperature: l, humidity: h, co2: u, pm25: d }, e, i, r), v = ji(t);
    return m`
      <article
        class="room"
        aria-label=${t.name}
        style=${v ? `--scene-tone: ${Yi[v]}` : p}
      >
        ${v ? m`<div class="scene" aria-hidden="true">${Vi(v)}</div>` : p}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${g.kind === "unknown" ? `border: 1.5px solid ${c.off}` : `background: ${g.color}`}
          ></span>
          <span style=${`color: ${g.color}; font-weight: ${g.kind === "normal" ? 400 : 500}`}>
            ${g.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? p}
            aria-label=${`${t.name}: teplota ${l.value === void 0 ? "neznámá" : `${xt(l.value)} °C`}${this.staleSpoken(l)}, historie místnosti za 24 hodin`}
            @click=${(y) => this.openSheet("history", t, y)}
          >
            ${l.value === void 0 ? m`<span class="missing">––</span>` : m`${xt(l.value)}<span class="temperature-unit">${I}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${h.stale ? "stale" : ""}"
            ?disabled=${!t.humidity}
            title=${this.staleTitle(h) ?? p}
            aria-label=${`${t.name}: vlhkost ${h.value === void 0 ? "neznámá" : `${Math.round(h.value)} %`}${this.staleSpoken(h)}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${h.value === void 0 ? m`<span class="missing">––</span>` : m`${Math.round(h.value)}${I}%`}
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
      u,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      n.co2
    )}
            ${this.renderAirRow(
      t,
      "pm25",
      t.pm25,
      ki(),
      "PM2.5",
      d,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      n.pm25
    )}
            ${this.renderHvac(t, e)}
            ${this.renderTemperatureTrend(t, l, n.temperature)}
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
   * the whole row opens the entity detail with its history. A stale value is grey, never
   * orange or red.
   */
  renderAirRow(t, e, i, r, n, o, a, l, h, u) {
    const d = o.value !== void 0, g = Math.round(o.value ?? 0), v = o.value === void 0 || o.stale ? c.label : o.value >= h ? c.alert : o.value >= l ? c.warning : c.white, y = d ? Xt(i ? this._trends[i] : void 0, G[e]) : void 0;
    return m`
      <button
        type="button"
        class="plain-button air-row slot-${e}"
        ?disabled=${!i}
        title=${this.staleTitle(o) ?? p}
        aria-label=${`${t.name}: ${n} ${d ? `${g} ${a}` : "neznámé"}${y ? `, za 2 hodiny ${y}` : ""}${this.staleSpoken(o)}, detail a historie`}
        @click=${() => this.showMoreInfo(i)}
      >
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? c.mint : c.off}`} aria-hidden="true">
            ${r}
          </span>
          <span class="row-text">
            ${d ? m`<span class="row-label" style=${`color: ${v}`}>${g}</span>
                  <span class="row-unit">${a}</span>` : m`<span class="row-label" style=${`color: ${c.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, u, c.mint, o.stale === !0) : p}
      </button>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, i) {
    if (!t.temperature || e.value === void 0)
      return p;
    const r = this.renderSpark(t.temperature, i, c.peach, e.stale === !0);
    if (r === p)
      return p;
    const n = Xt(this._trends[t.temperature], G.temperature);
    return m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: teplota za 2 hodiny${n ? ` ${n}` : ""}, historie místnosti za 24 hodin`}
        @click=${(o) => this.openSheet("history", t, o)}
      >
        ${r}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  renderSpark(t, e, i, r) {
    if (!t)
      return p;
    if (!this._trendsLoaded)
      return m`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    const n = this._trends[t];
    if (!n || !e)
      return p;
    const o = xi(n, e).map(
      (d, g) => d === void 0 ? void 0 : { x: g / (Qt - 1) * 100, y: (1 - d) * 100 }
    ).filter((d) => d !== void 0);
    if (o.length < 2)
      return p;
    const a = o.map((d) => `${d.x.toFixed(2)},${d.y.toFixed(2)}`).join(" "), l = o[0], h = o[o.length - 1], u = `${a} ${h.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return m`<span class="spark ${r ? "stale" : ""}" style=${`color: ${i}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${u} fill="currentColor" fill-opacity="0.08"></polygon>
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
          style=${`left: ${h.x.toFixed(2)}%; top: ${h.y.toFixed(2)}%`}
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
  renderHvac(t, e) {
    const i = Pe(
      this.getState(t.heating?.climate),
      this.getState(t.heating?.overlay),
      this.getState(t.heating?.target),
      this.getState(t.heating?.intensity)
    ), r = ze(this.getState(t.air_conditioner)), n = (u) => this.renderSystemRow(Mt(i.unknown ? 0 : i.waves, i.unknown), i, u), o = (u) => this.renderSystemRow(ut(r.mode, r.color, r.unknown), r, u), a = e ? ["climate", "heating"] : ["heating", "climate"], l = this.hvacTarget(t, a), h = a.map((u) => `${X[u]} ${qi(u === "heating" ? i : r)}`).join("; ");
    return m`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!l}
        aria-label=${`${t.name}: ${h}${l ? `. Ovládání ${X[l]}` : ""}`}
        @click=${(u) => l ? this.openSheet(l, t, u) : void 0}
      >
        ${e ? o(!0) : n(!0)}
        ${e ? n(!1) : o(!1)}
      </button>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, e) {
    const i = (r) => r === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
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
            ${e.extra ? m`<span class="row-unit">${e.extra}</span>` : p}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  renderWindow(t) {
    const e = t.window, i = this.entityState(e)?.toLowerCase(), r = i === void 0 || P(i), n = i === "on", o = r ? c.label : n ? c.sky : c.label, a = r ? "––" : n ? "Otevřeno" : "Zavřeno";
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${n ? "strong" : ""}"
        style=${`--row-color: ${o}`}
        ?disabled=${!e}
        aria-label=${`${t.name}: okno ${r ? "neznámé" : a.toLowerCase()}, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="row-main">
          <span class="row-icon">${ie(r ? c.off : o, r)}</span>
          <span class="row-text"><span class="row-label">${a}</span></span>
        </span>
      </button>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), r = i?.state.toLowerCase(), n = r !== void 0 && !P(r), o = n ? _t(i?.attributes.current_position) : void 0, a = n ? _t(i?.attributes.current_tilt_position) : void 0, l = o !== void 0 && a !== void 0, h = r === "opening" || r === "closing", u = `${l ? `poloha ${Math.round(o)} %, naklopení ${Math.round(a)} %` : "poloha nebo naklopení neznámé"}${h ? ", pohybuje se" : ""}`;
    return m`
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${oi.map((d) => this.renderPreset(t, d, o, a))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel ${h ? "moving" : ""}"
        aria-label=${`${t.name}: žaluzie, ${u}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${pt} ${kt}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${vi(o, a)}
        </svg>
      </button>
    `;
  }
  renderPreset(t, e, i, r) {
    const n = i !== void 0 && r !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(r - e.tilt) <= 2, o = `${t.name}|${e.id}`;
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
        ${Si(e.id)}
        ${this._hint === o ? m`<span class="preset-hint" role="status">Podržte nebo klepněte dvakrát</span>` : p}
      </button>
    `;
  }
  pressStart(t, e, i) {
    t.button === 0 && (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, i);
    }, ts));
  }
  pressEnd(t, e) {
    window.clearTimeout(this._pressTimer);
    const i = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !i || r)
      return;
    const n = `${t.name}|${e.id}`, o = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === n && o - this._lastTap.time <= ce) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, e);
      return;
    }
    this._lastTap = { key: n, time: o }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === n && (this._lastTap = void 0, this.showHint(n));
    }, ce);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showHint(t) {
    this._hint = t, this.haptic("selection"), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, is);
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(Gt.domain, Gt.service, {
          entity: t.cover,
          pos: e.position,
          tilt: e.tilt
        }), this.haptic("success"), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
          this._flash = void 0;
        }, es);
      } catch (i) {
        console.error("Klima Dashboard: skript žaluzií selhal", i), this.haptic("failure"), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
      }
  }
  /** Haptic feedback through the Home Assistant app (ignored in a plain browser). */
  haptic(t) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 }));
  }
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, Qi);
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const e = this._sheet;
    return e ? e.kind === "history" ? this.renderSheetFrame(
      "Historie místnosti – 24 h",
      e.room.name,
      this.renderHistoryBody(e.room),
      "history-sheet"
    ) : this.renderSheetFrame(e.room.name, void 0, this.renderHvacBody(e.room, e.kind, t)) : p;
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, i, r = "") {
    const n = this._drag?.dragging === !0;
    return m`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
      >
        <div
          class="sheet ${r} ${n ? "dragging" : ""}"
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : p}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          @click=${(o) => o.stopPropagation()}
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
                ${e ? m`<div class="sheet-sub">${e}</div>` : p}
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
    const r = e === "heating", n = r ? t.heating?.climate : t.air_conditioner, o = this.getState(n), a = o !== void 0 && !P(o.state.toLowerCase()), l = Zt(o?.attributes.hvac_modes), h = Zt(o?.attributes.preset_modes), u = o?.state.toLowerCase(), d = String(o?.attributes.preset_mode ?? "none").toLowerCase(), g = !a || !n ? [] : r ? this.heatingOptions(n, l, h, u, d) : this.climateOptions(n, l, u), v = !r && a && n ? h.filter((w) => w !== "none") : [], y = i ? ["climate", "heating"] : ["heating", "climate"], x = !!t.heating?.climate && !!t.air_conditioner;
    return m`
      ${x ? m`<div class="segmented" role="tablist" aria-label="Systém">
            ${y.map(
      (w) => m`<button
                type="button"
                role="tab"
                class="plain-button segment"
                aria-selected=${w === e ? "true" : "false"}
                @click=${() => this.switchSheet(w)}
              >
                ${X[w]}
              </button>`
    )}
          </div>` : m`<div class="sheet-label system-name">${X[e]}</div>`}
      ${a ? g.length === 0 ? m`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : m`<div class="options" role="group" aria-label=${`${X[e]}: režim`}>
              ${g.map((w) => this.renderOption(w))}
            </div>` : m`<p class="sheet-message">Entita je nedostupná.</p>`}
      ${v.length > 0 ? m`<div class="sheet-label" id="preset-label">Předvolby</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${v.map((w) => this.renderPresetChip(n, w, d, u, h))}
            </div>` : p}
      ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : p}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!n}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(n);
    }}
      >
        Detail a historie
      </button>
    `;
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    let e;
    const i = this._historyModel;
    this._historyStatus === "loading" ? e = m`<p class="sheet-message">Načítám historii…</p>` : this._historyStatus === "error" || !i ? e = m`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>` : Ni(i) ? e = m`<div
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
        ${Bi(i, this.chartWidth(), this._scrubTime)}
      </div>` : e = m`<p class="sheet-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    const r = t.temperature ?? t.humidity;
    return m`
      ${e}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!r}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(r);
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
          ${t.unsupported ? m`<span class="option-hint">${t.unsupported}</span>` : p}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, i, r, n) {
    const o = i === e && r !== "off", a = o && n.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${o ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${we(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, r, n) {
    const o = [], a = (l, h, u, d, g, v) => {
      o.push({ id: l, label: h, icon: Mi(l), color: u, active: d, run: g, unsupported: v });
    };
    if (e.includes("off") && a("off", "Vypnuto", c.off, r === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", c.plan, r === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      c.warning,
      r === "heat" && n !== "boost",
      () => this.setHvacMode(t, "heat")
    ), o.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        c.alert,
        l && n === "boost" && r !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return o;
  }
  climateOptions(t, e, i) {
    return os.filter((r) => e.includes(r)).map((r) => {
      const n = _e(r), o = st[n];
      return {
        id: r,
        label: vt[n],
        icon: ut(n, o, !1),
        color: o,
        active: i === r,
        run: () => this.setHvacMode(t, r)
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
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._sheet = { kind: t, room: e }, t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
  }
  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  switchSheet(t) {
    this._sheet && this._sheet.kind !== t && (this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room });
  }
  closeSheet(t = !0) {
    this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
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
    ].filter((o) => !!o), r = Date.now(), n = r - 24 * Te;
    try {
      const o = await te(this.hass, i, n, r);
      if (e !== this._historyRequest)
        return;
      this._historyModel = Oi(o, t, { startMs: n, endMs: r }), this._historyStatus = "ready";
    } catch (o) {
      console.error("Klima Dashboard: načtení historie místnosti selhalo", o), e === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = ci(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const e = Date.now(), i = e - bi;
    try {
      const r = await te(this.hass, t, i, e), n = {};
      for (const o of t)
        n[o] = _i(r[o], i, e, Qt);
      this._trends = n;
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
    const e = pi(this._config), i = await Promise.allSettled(
      e.map(
        (n) => t.callApi("GET", `states/${n}`)
      )
    ), r = {};
    i.forEach((n, o) => {
      if (n.status === "fulfilled") {
        const a = Date.parse(n.value?.last_reported ?? n.value?.last_updated ?? "");
        Number.isFinite(a) && (r[e[o]] = a);
      }
    }), this._reported = r;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, e, i) {
    const r = this.numberState(t);
    if (r === void 0 || !t)
      return {};
    const n = this._reported[t];
    if (n === void 0)
      return { value: r };
    const o = Date.parse(this.getState(t)?.last_updated ?? ""), a = Math.max(n, Number.isFinite(o) ? o : 0), l = Math.max(0, (i - a) / 6e4);
    return { value: r, ageMinutes: l, stale: l > e };
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? `Naposledy před ${Se(t.ageMinutes)}` : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || P(e.toLowerCase()))
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
Rt.styles = Wi;
let _ = Rt;
k([
  S()
], _.prototype, "_config");
k([
  $e({ attribute: !1 })
], _.prototype, "hass");
k([
  S()
], _.prototype, "_sheet");
k([
  S()
], _.prototype, "_sheetError");
k([
  S()
], _.prototype, "_historyStatus");
k([
  S()
], _.prototype, "_historyModel");
k([
  S()
], _.prototype, "_scrubTime");
k([
  S()
], _.prototype, "_dragY");
k([
  S()
], _.prototype, "_flash");
k([
  S()
], _.prototype, "_hint");
k([
  S()
], _.prototype, "_trends");
k([
  S()
], _.prototype, "_trendsLoaded");
k([
  S()
], _.prototype, "_reported");
k([
  S()
], _.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", _);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
