const _t = globalThis, Xt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Jt = /* @__PURE__ */ Symbol(), le = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Jt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Xt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = le.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && le.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const li = (i) => new Ke(typeof i == "string" ? i : i + "", void 0, Jt), di = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new Ke(e, i, Jt);
}, ci = (i, t) => {
  if (Xt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = _t.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, de = Xt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return li(e);
})(i) : i;
const { is: hi, defineProperty: pi, getOwnPropertyDescriptor: ui, getOwnPropertyNames: mi, getOwnPropertySymbols: fi, getPrototypeOf: gi } = Object, Ct = globalThis, ce = Ct.trustedTypes, $i = ce ? ce.emptyScript : "", vi = Ct.reactiveElementPolyfillSupport, ct = (i, t) => i, Mt = { toAttribute(i, t) {
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
} }, Qt = (i, t) => !hi(i, t), he = { attribute: !0, type: String, converter: Mt, reflect: !1, useDefault: !1, hasChanged: Qt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ct.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = he) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && pi(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = ui(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? he;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = gi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const e = this.properties, n = [...mi(e), ...fi(e)];
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
      for (const o of n) e.unshift(de(o));
    } else t !== void 0 && e.push(de(t));
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
    return ci(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Mt).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Mt;
      this._$Em = o;
      const a = r.fromAttribute(e, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? Qt)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[ct("elementProperties")] = /* @__PURE__ */ new Map(), tt[ct("finalized")] = /* @__PURE__ */ new Map(), vi?.({ ReactiveElement: tt }), (Ct.reactiveElementVersions ??= []).push("2.1.2");
const te = globalThis, pe = (i) => i, Tt = te.trustedTypes, ue = Tt ? Tt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ye = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, qe = "?" + B, wi = `<${qe}>`, J = document, pt = () => J.createComment(""), ut = (i) => i === null || typeof i != "object" && typeof i != "function", ee = Array.isArray, yi = (i) => ee(i) || typeof i?.[Symbol.iterator] == "function", Dt = `[ 	
\f\r]`, st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, fe = />/g, W = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, $e = /"/g, Ve = /^(?:script|style|textarea|title)$/i, Ge = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Ge(1), k = Ge(2), it = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), X = J.createTreeWalker(J, 129);
function Ze(i, t) {
  if (!ee(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(t) : t;
}
const bi = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = st;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let d, c, h = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); ) p = r.lastIndex, r === st ? c[1] === "!--" ? r = me : c[1] !== void 0 ? r = fe : c[2] !== void 0 ? (Ve.test(c[2]) && (o = RegExp("</" + c[2], "g")), r = W) : c[3] !== void 0 && (r = W) : r === W ? c[0] === ">" ? (r = o ?? st, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? W : c[3] === '"' ? $e : ge) : r === $e || r === ge ? r = W : r === me || r === fe ? r = st : (r = W, o = void 0);
    const m = r === W && i[a + 1].startsWith("/>") ? " " : "";
    s += r === st ? l + wi : h >= 0 ? (n.push(d), l.slice(0, h) + Ye + l.slice(h) + B + m) : l + B + (h === -2 ? a : m);
  }
  return [Ze(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class mt {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = bi(t, e);
    if (this.el = mt.createElement(d, n), X.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = X.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Ye)) {
          const p = c[r++], m = o.getAttribute(h).split(B), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: s, name: $[2], strings: m, ctor: $[1] === "." ? _i : $[1] === "?" ? xi : $[1] === "@" ? Si : Et }), o.removeAttribute(h);
        } else h.startsWith(B) && (l.push({ type: 6, index: s }), o.removeAttribute(h));
        if (Ve.test(o.tagName)) {
          const h = o.textContent.split(B), p = h.length - 1;
          if (p > 0) {
            o.textContent = Tt ? Tt.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(h[m], pt()), X.nextNode(), l.push({ type: 2, index: ++s });
            o.append(h[p], pt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === qe) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(B, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += B.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = J.createElement("template");
    return n.innerHTML = t, n;
  }
}
function nt(i, t, e = i, n) {
  if (t === it) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = ut(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = nt(i, o._$AS(i, t.values), o, n)), t;
}
class ki {
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
    const { el: { content: e }, parts: n } = this._$AD, o = (t?.creationScope ?? J).importNode(e, !0);
    X.currentNode = o;
    let s = X.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new ft(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new Mi(s, this, t)), this._$AV.push(d), l = n[++a];
      }
      r !== l?.index && (s = X.nextNode(), r++);
    }
    return X.currentNode = J, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class ft {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = nt(this, t, e), ut(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = mt.createElement(Ze(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new ki(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = ve.get(t.strings);
    return e === void 0 && ve.set(t.strings, e = new mt(t)), e;
  }
  k(t) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new ft(this.O(pt()), this.O(pt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = pe(t).nextSibling;
      pe(t).remove(), t = n;
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
  constructor(t, e, n, o, s) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = g;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = nt(this, t, e, 0), r = !ut(t) || t !== this._$AH && t !== it, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = nt(this, a[n + l], e, l), d === it && (d = this._$AH[l]), r ||= !ut(d) || d !== this._$AH[l], d === g ? t = g : t !== g && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _i extends Et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class xi extends Et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Si extends Et {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = nt(this, t, e, 0) ?? g) === it) return;
    const n = this._$AH, o = t === g && n !== g || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== g && (n === g || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Mi {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    nt(this, t);
  }
}
const Ti = te.litHtmlPolyfillSupport;
Ti?.(mt, ft), (te.litHtmlVersions ??= []).push("3.3.3");
const Ai = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new ft(t.insertBefore(pt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const ie = globalThis;
class ht extends tt {
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
    return it;
  }
}
ht._$litElement$ = !0, ht.finalized = !0, ie.litElementHydrateSupport?.({ LitElement: ht });
const Ci = ie.litElementPolyfillSupport;
Ci?.({ LitElement: ht });
(ie.litElementVersions ??= []).push("4.2.2");
const Ei = { attribute: !0, type: String, converter: Mt, reflect: !1, hasChanged: Qt }, Oi = (i = Ei, t, e) => {
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
function Xe(i) {
  return (t, e) => typeof e == "object" ? Oi(i, t, e) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function O(i) {
  return Xe({ ...i, state: !0, attribute: !1 });
}
const xt = 60, Bt = 142, we = 11, $t = 3, Pi = 0.8, ye = 2, Di = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", Li = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", Hi = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function Ni(i, t) {
  if (i === void 0 || t === void 0)
    return k`<rect
      x="0.75"
      y="0.75"
      width=${xt - 1.5}
      height=${Bt - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = Bt - $t - 1, n = e / we, o = n - Pi, s = o - t / 100 * (o - ye), r = $t + 1 + (100 - i) / 100 * e, a = Array.from({ length: we }, (l, d) => {
    const c = $t + 1 + d * n + n / 2, h = c <= r, p = h ? s : ye;
    return k`<rect
      x="0"
      y=${(c - p / 2).toFixed(2)}
      width=${xt}
      height=${p.toFixed(2)}
      rx=${Math.min(1.5, p / 2).toFixed(2)}
      style=${h ? Di : Li}
    ></rect>`;
  });
  return k`<rect
      class="rail"
      x="0"
      y="0"
      width=${xt}
      height=${$t}
      rx="1.5"
      style=${Hi}
    ></rect>${a}`;
}
const zi = ["cs", "en", "sv"], Lt = ["bedroom", "office", "kids", "living"], Ht = "none", Wt = ["open", "shade", "dark"], Je = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function Nt(i, t, e, n) {
  return i !== void 0 && t !== void 0 && Math.abs(i - e.position) <= n && Math.abs(t - e.tilt) <= n;
}
function rt(i, t) {
  return t === "temperature" ? i.temperature_step : t === "co2" ? i.co2_step : i.pm25_step;
}
const f = {
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
}, Ot = {
  off: f.off,
  cool: f.cool,
  wind_free: f.cool,
  dry: f.dry,
  fan: f.plan,
  heat: f.heat,
  auto: f.auto,
  unknown: f.off
}, Ii = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Qe(i) {
  const t = Ii[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ti(i) {
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
function be(i, t, e, n, o) {
  const { thresholds: s } = n, r = [
    [o.required.temperature, i.temperature],
    [o.required.humidity, i.humidity],
    ...n.hasCo2 ? [[o.required.co2, i.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, i.pm25]] : [],
    [o.required.houseMode, e ? { value: 1 } : void 0]
  ];
  for (const [m, $] of r) {
    if ($?.value === void 0)
      return { id: "noData", label: o.noData(m), color: f.label, kind: "unknown" };
    if ($.stale) {
      const y = $.ageMinutes === void 0 ? void 0 : ii($.ageMinutes);
      return { id: "noData", label: o.noData(m, y), color: f.label, kind: "unknown" };
    }
  }
  const a = i.temperature.value, l = i.humidity.value, d = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? i.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: f.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: f.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: f.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: f.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: f.warning, kind: "warning", cause: "humidity" };
  const h = t ? s.summer_min : s.winter_min, p = t ? s.summer_max : s.winter_max;
  return a > p ? { id: "warm", label: o.status.warm, color: f.warning, kind: "warning", cause: "temperature" } : a < h ? { id: "cold", label: o.status.cold, color: f.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: f.label, kind: "normal" };
}
function ke(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function z(i) {
  return i === "" || i === "unknown" || i === "unavailable" || i === "none";
}
function q(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function ei(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function Ri(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((o) => e(o.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function Fi(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function Ui(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((o) => Object.hasOwn(t, o) && i[o] === t[o]);
}
function ii(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function _e(i, t) {
  const e = (i ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function xe(i) {
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
function ji(i, t) {
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
function Se(i, t) {
  const e = Math.max(1, Math.round(i));
  return e % 60 === 0 ? t.period.hour(e / 60) : t.period.minute(e);
}
function Bi(i, t) {
  return i.label ?? t.cover.presetName[i.icon];
}
function Me(i, t) {
  if (i.description !== void 0)
    return i.description;
  const e = Je[i.icon];
  return i.label === void 0 && e.position === i.position && e.tilt === i.tilt ? t.cover.presetDescription[i.icon] : t.cover.position(Math.round(i.position), Math.round(i.tilt));
}
function Wi(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
const Ki = "input_select.house_mode", Yi = {
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
}, qi = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Vi = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, zt = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Gi = Wt.map((i) => ({ icon: i, ...Je[i] })), Te = { winter: "Zima", summer: "Léto" }, Ae = ["auto", "dark", "light"], Ce = ["auto", ...zi], Ee = 3, Zi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Xi = [
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
], Ji = ["climate", "overlay", "target", "intensity"], Oe = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], Qi = ["name", "position", "tilt", "icon", "description"], tn = ["entity", "name"];
function et(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function x(i) {
  throw new Error(`Klima Dashboard: ${i}`);
}
function gt(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Q(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || x(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function j(i, t) {
  return i == null ? {} : (gt(i) || x(`"${t}" must be a mapping of keys.`), i);
}
function D(i, t) {
  if (i != null)
    return (typeof i != "string" || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(i.trim())) && x(`${t} must be an entity ID such as sensor.loznice_teplota.`), i.trim();
}
function ot(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && x(`${t} must be a non-empty text.`), i.trim();
}
function dt(i, t, e, n = {}) {
  Q(i, Object.keys(t), e);
  const o = { ...t };
  for (const [s, r] of Object.entries(i)) {
    if (r === null)
      continue;
    (typeof r != "number" || !Number.isFinite(r)) && x(`${e}.${s} must be a number.`);
    const a = n[s];
    if (a) {
      const [l, d, c] = a;
      (r < l || r > d || c && !Number.isInteger(r)) && x(`${e}.${s} must be ${c ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = r;
  }
  return o;
}
function ni(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of e)
    (s ? i[n] >= i[o] : i[n] > i[o]) && x(`${t}: ${n} (${i[n]}) must be ${s ? "below" : "at most"} ${o} (${i[o]}).`);
  i.stale_minutes <= 0 && x(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && x(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function en(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function Kt(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > Ee) && x(`${t} must be a list of 1 to ${Ee} presets.`), i.map((e, n) => {
    const o = `${t}[${n + 1}]`;
    gt(e) || x(`${o} must have a position and a tilt.`), Q(e, Qi, o);
    const s = ot(e.name, `${o}.name`), r = (h) => {
      const p = e[h];
      return (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 100) && x(`${o}.${h} must be a number from 0 to 100.`), p;
    }, a = r("position"), l = r("tilt");
    let d = en(a, l);
    e.icon != null && (Wt.includes(e.icon) || x(`${o}.icon must be one of ${Wt.join(", ")}.`), d = e.icon);
    const c = ot(e.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: c, position: a, tilt: l };
  });
}
function nn(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && x(`${t}.window must not be an empty list.`);
  const o = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(e) ? `[${a + 1}]` : ""}`;
    if (gt(r)) {
      Q(r, tn, l);
      const c = D(r.entity, `${l}.entity`);
      return c || x(`${l}.entity is required.`), { entity: c, name: ot(r.name, `${l}.name`) };
    }
    const d = D(r, l);
    return d || x(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const r of o)
    s.has(r.entity) && x(`${t}.window lists ${r.entity} twice.`), s.add(r.entity);
  return o;
}
function Pe(i, t) {
  return i === !1 ? { present: !1 } : { entity: D(i, t), present: !0 };
}
function on(i, t) {
  i.image != null && i.scene != null && x(`${t}: use either image or scene (older name), not both.`);
  const e = i.image != null ? "image" : "scene", n = i.image ?? i.scene;
  if (n == null) {
    const s = Zi[et(i.name)];
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && x(`${t}.${e} must be ${[...Lt, Ht].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== Ht) {
    if (Lt.includes(o))
      return { kind: "scene", scene: o };
    if (e === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    x(
      `${t}.${e} must be one of ${[...Lt, Ht].join(", ")}${e === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function sn(i, t) {
  const e = ot(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && x(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function rn(i, t, e) {
  gt(i) || x(`room ${t + 1} must be a mapping with at least a name.`);
  const n = typeof i.name == "string" ? i.name.trim() : "";
  n || x(`room ${t + 1} requires a name.`);
  const o = `room "${n}"`, s = i;
  for (const [h, p] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    h in s && x(`${o}: key "${h}" was renamed to "${p}".`);
  "windows" in s && x(`${o}: the key is "window" (one entity or a list of them), not "windows".`), Q(s, Xi, o);
  const r = j(i.heating, `${o}.heating`);
  "heating" in r && x(`${o}: key "heating.heating" was renamed to "heating.intensity".`), Q(r, Ji, `${o}.heating`);
  const a = i.heating == null ? void 0 : {
    climate: D(r.climate, `${o}.heating.climate`),
    overlay: D(r.overlay, `${o}.heating.overlay`),
    target: D(r.target, `${o}.heating.target`),
    intensity: D(r.intensity, `${o}.heating.intensity`)
  }, l = dt(j(i.thresholds, `${o}.thresholds`), e.thresholds, `${o}.thresholds`);
  ni(l, `${o}.thresholds`);
  const d = Pe(i.carbon_dioxide, `${o}.carbon_dioxide`), c = Pe(i.pm25, `${o}.pm25`);
  return {
    name: n,
    temperature: D(i.temperature, `${o}.temperature`),
    humidity: D(i.humidity, `${o}.humidity`),
    carbon_dioxide: d.entity,
    hasCo2: d.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: nn(i, o),
    cover: D(i.cover, `${o}.cover`),
    presets: i.cover_presets == null ? e.presets : Kt(i.cover_presets, `${o}.cover_presets`),
    thresholds: l,
    heating: a,
    air_conditioner: D(i.air_conditioner, `${o}.air_conditioner`),
    image: on(i, o),
    link: sn(i.link, o)
  };
}
function an(i) {
  (!gt(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && x("the configuration requires a non-empty rooms list."), i.title != null && typeof i.title != "string" && x("title must be a text (an empty text leaves the heading out).");
  const t = i.theme ?? "auto";
  Ae.includes(t) || x(`theme must be one of ${Ae.join(", ")}.`);
  const e = i.language ?? "auto";
  Ce.includes(e) || x(`language must be one of ${Ce.join(", ")}.`);
  const n = D(i.house_mode_entity, "house_mode_entity") ?? Ki, o = j(i.house_modes, "house_modes");
  Q(o, ["winter", "summer"], "house_modes");
  const s = {
    winter: ot(o.winter, "house_modes.winter") ?? Te.winter,
    summer: ot(o.summer, "house_modes.summer") ?? Te.summer
  };
  et(s.winter) === et(s.summer) && x("house_modes.winter and house_modes.summer must differ.");
  const r = i.outside == null ? void 0 : j(i.outside, "outside");
  if (r) {
    Q(r, Oe, "outside");
    for (const b of Oe)
      D(r[b], `outside.${b}`);
  }
  const a = dt(j(i.thresholds, "thresholds"), Yi, "thresholds");
  ni(a, "thresholds");
  const l = dt(j(i.trends, "trends"), qi, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), d = dt(j(i.history, "history"), Vi, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), c = { ...j(i.covers, "covers") }, h = c.presets;
  delete c.presets;
  const p = c.script;
  delete c.script;
  const m = {
    ...dt(c, { tolerance: zt.tolerance, stall_seconds: zt.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: zt.script
  };
  p != null && ((typeof p != "string" || !/^script\.[a-z0-9_]+$/.test(p.trim())) && x("covers.script must be a script entity such as script.zaluzie_posun."), m.script = p.trim());
  const $ = h == null ? Kt(Gi, "covers.presets") : Kt(h, "covers.presets"), y = i.rooms.map((b, S) => rn(b, S, { thresholds: a, presets: $ })), _ = /* @__PURE__ */ new Set();
  for (const b of y)
    _.has(b.name) && x(`room name "${b.name}" is used twice; room names must be unique.`), _.add(b.name);
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
    history: d,
    covers: m,
    rooms: y
  };
}
const Pt = 36e5;
function ln(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function dn(i, t) {
  const e = {};
  for (const [n, o] of Object.entries(i ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((r, a) => {
      const l = r.s ?? r.state, d = ln(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((r, a) => r.time - a.time), e[n] = s;
  }
  return e;
}
async function De(i, t, e, n) {
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
  return dn(o, e);
}
function oi(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function Yt(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function cn(i, t, e, n) {
  const o = (e - t) / n, s = (i ?? []).filter((r) => Yt(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => Yt(oi(s, t + (a + 1) * o))
  );
}
function Le(i, t, e) {
  const n = [];
  for (const s of i ?? []) {
    const r = Yt(s.state);
    r !== void 0 && s.time <= e && n.push({ t: Math.max(s.time, t), v: r });
  }
  const o = n[n.length - 1];
  return o && o.t < e && n.push({ t: e, v: o.v }), n;
}
function vt(i, t, e, n) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const a of i)
    for (const l of a ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((a, l) => a - l), r = [];
  for (let a = 0; a < s.length - 1; a += 1) {
    const l = n(i.map((c) => oi(c, s[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === s[a] ? d.end = s[a + 1] : r.push({ start: s[a], end: s[a + 1], value: l });
  }
  return r;
}
function It(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of i)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), n = Math.max(n, a));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function hn(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function He() {
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
  ].map(([t, e, n]) => k`<circle cx=${t} cy=${e} r=${n}></circle>`)}
    </svg>
  `;
}
function pn(i) {
  const t = (o, s, r, a) => k`<rect x=${o} y=${s} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => k`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (i) {
    case "open":
      n = k`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      n = k`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      n = k`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
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
      ${n}
    </svg>
  `;
}
function un() {
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
function qt(i, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (e) => k`<path
          d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          style=${`stroke: ${e < i ? f.warning : f.off}`}
          stroke-dasharray=${t ? "1.6 2.6" : g}
        ></path>`
  )}
    </svg>
  `;
}
function St(i, t, e) {
  let n;
  const o = k`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, s = k`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (i) {
    case "cool":
    case "wind_free":
      n = k`${o}
        <g transform="rotate(60 12 12)">${o}</g>
        <g transform="rotate(120 12 12)">${o}</g>`;
      break;
    case "dry":
      n = k`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      n = k`${s}<g transform="rotate(120 12 12)">${s}</g>
        <g transform="rotate(240 12 12)">${s}</g>`;
      break;
    case "heat":
      n = k`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (r) => k`<path d="M12 3v2.5" transform=${`rotate(${45 * r} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      n = k`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      n = k`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : g}
      aria-hidden="true"
    >
      ${n}
    </svg>
  `;
}
function Rt(i, t) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${i}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : g}
      aria-hidden="true"
    >
      <rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect>
      <path d="M12 3.5v17M5 12h14"></path>
    </svg>
  `;
}
function mn(i) {
  let t;
  switch (i) {
    case "off":
      t = k`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = k`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = k`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      t = k`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const L = 4, fn = 32, V = 6, G = 150, I = V + G, at = 10, gn = I + 20, Ne = I + 25, $n = I + 50, wt = I + 55, vn = I + 83, ze = I + 90, yt = 11, wn = [0, 0.24, 0.44, 0.68], Ie = "history-under-temperature", Re = "history-plot", yn = 5, si = {
  schedule: f.plan,
  manual: f.warning,
  off: f.closed
}, P = (i) => `fill: ${i}`, K = (i) => `stroke: ${i}`;
function Ft(i, t) {
  const e = i?.toLowerCase();
  return t?.toLowerCase() === "off" || e === "off" ? "off" : e === "schedule" || e === "manual" ? e : void 0;
}
function Fe(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const bn = 0.05;
function kn(i, t) {
  const e = i.filter((a) => Number.isFinite(a));
  let n = 19, o = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), o = Math.max(...e), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const a = (o - n) * bn;
    n -= a, o += a;
  }
  const s = o - n, r = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: r };
}
function _n(i, t, e) {
  const n = [], o = e / 1e3;
  for (let s = Math.ceil(i / e - o) * e; s <= t + o; s += e)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function xn(i, t, e, n) {
  const o = (v) => v ? i[v] : void 0, { startMs: s, endMs: r } = e, a = o(t.heating?.overlay), l = o(t.heating?.climate), d = Le(o(t.temperature), s, r), c = Le(o(t.humidity), s, r), h = vt([a, l], s, r, ([v, A]) => Ft(v, A)), p = vt(
    [a, l, o(t.heating?.intensity)],
    s,
    r,
    ([v, A, R]) => {
      const w = Ft(v, A), M = ei(Fe(R), t.thresholds);
      return w === void 0 || w === "off" || M === 0 ? void 0 : String(M);
    }
  ), m = vt(
    [a, l, o(t.heating?.target)],
    s,
    r,
    ([v, A, R]) => {
      const w = Ft(v, A), M = Fe(R);
      if (!(M === void 0 || M <= yn))
        return w === "schedule" || w === "manual" ? String(M) : void 0;
    }
  ), $ = vt([o(t.air_conditioner)], s, r, ([v]) => {
    const A = ti(v);
    return A === "unknown" ? void 0 : A;
  }), y = d.map((v) => v.v), { min: _, max: b, step: S } = kn(
    y.length > 0 ? y : m.map((v) => Number(v.value)),
    n.min_temperature_span
  ), C = c.map((v) => v.v);
  return {
    range: e,
    temperature: d,
    humidity: c,
    heating: h,
    intensity: p,
    target: m,
    climate: $,
    tempMin: _,
    tempMax: b,
    tempStep: S,
    humidityMin: C.length > 0 ? Math.min(...C) : void 0,
    humidityMax: C.length > 0 ? Math.max(...C) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function Sn(i) {
  return i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function Z(i) {
  return i - L - fn;
}
function Mn(i, t, e) {
  return L + (i - t.startMs) / (t.endMs - t.startMs) * Z(e);
}
function Tn(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - L) / Z(t)));
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
function bt(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
function An(i, [t, e]) {
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
function ri(i) {
  const t = (i.endMs - i.startMs) / Pt;
  return t <= 12 ? 3 : t <= 24 ? 6 : t <= 48 ? 12 : t <= 96 ? 24 : 48;
}
function Cn(i) {
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
function En(i, t, e) {
  return i - 16 < t ? { x: t, anchor: "start" } : i + 16 > e ? { x: e, anchor: "end" } : { x: i, anchor: "middle" };
}
function On(i) {
  return i === "off" ? "var(--kd-strip-off)" : Ot[i] ?? f.off;
}
function Pn(i, t, e) {
  return ri(t) >= 24 ? e.day(i) : e.hour(i);
}
function Dn(i, t, e) {
  const { t: n } = e, o = t ?? i.range.endMs, s = Vt(i.temperature, o), r = Vt(i.humidity, o), a = bt(i.heating, o, i.range.endMs), l = Number(bt(i.intensity, o, i.range.endMs) ?? 0), d = bt(i.target, o, i.range.endMs), c = bt(i.climate, o, i.range.endMs);
  let h = n.chart.now;
  if (t !== void 0) {
    const y = (S) => {
      const C = new Date(S);
      return C.setHours(12, 0, 0, 0), C.getTime();
    }, _ = Math.round((y(i.range.endMs) - y(t)) / (24 * Pt));
    h = `${_ === 0 ? "" : _ === 1 ? `${n.chart.yesterday} ` : `${e.day(t)} `}${e.time(t)}`;
  }
  const p = a === void 0 ? "––" : `${n.heatingMode[a]}${a !== "off" && d !== void 0 ? ` · ${e.half(Number(d))} °C` : ""}`, m = c ? n.climateMode[c] : "––", $ = c ? Ot[c] : f.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${h}</span>
        <span class="readout-temp">${s === void 0 ? "––" : `${e.one(s)} °C`}</span>
        <span class="readout-hum">${r === void 0 ? "" : e.percent(Math.round(r))}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${a ? si[a] : f.label}`}>
          <span class="readout-icon">${qt(a && a !== "off" ? l : 0, a === void 0)}</span>
          ${n.system.heating} ${p}
        </span>
        <span class="readout-system" style=${`color: ${$}`}>
          <span class="readout-icon">${St(c ?? "off", $, c === void 0)}</span>
          ${n.system.climate} ${m}
        </span>
      </div>
    </div>
  `;
}
function Ln(i, t, e, n) {
  const { t: o } = n, { range: s } = i, r = (w) => Mn(w, s, t), a = (w) => I - (w - i.tempMin) / (i.tempMax - i.tempMin) * G, l = (i.humidityMin ?? 0) - 3, d = Math.max((i.humidityMax ?? 100) + 3, l + 12), c = (w) => I - (w - l) / (d - l) * G, h = L + Z(t), p = (w, M) => w.map((H, N) => `${N === 0 ? "M" : "L"}${r(H.t).toFixed(1)} ${M(H.v).toFixed(1)}`).join(" "), m = p(i.temperature, a), $ = i.temperature[0], y = i.temperature[i.temperature.length - 1], _ = $ && y ? `${m} L${r(y.t).toFixed(1)} ${I} L${r($.t).toFixed(1)} ${I} Z` : "";
  let b = "";
  i.target.forEach((w, M) => {
    const H = a(Number(w.value)).toFixed(1), N = i.target[M - 1];
    b += N && N.end === w.start ? ` L${r(w.start).toFixed(1)} ${H}` : ` M${r(w.start).toFixed(1)} ${H}`, b += ` L${r(w.end).toFixed(1)} ${H}`;
  });
  const S = _n(i.tempMin, i.tempMax, i.tempStep), C = (w, M, H) => w.map((N) => {
    const F = r(N.start);
    return k`<rect x=${F.toFixed(1)} y=${M} width=${Math.max(r(N.end) - F, 0.8).toFixed(1)}
        height=${at} rx="2" style=${P(H(N.value))}></rect>`;
  }), v = e === void 0 ? void 0 : r(e), A = e === void 0 ? void 0 : Vt(i.temperature, e), R = An(s, i.night);
  return u`
    ${Dn(i, e, n)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${ze}"
      width=${t}
      height=${ze}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${Ie}><path d=${_}></path></clipPath>
        <clipPath id=${Re}>
          <rect x=${L} y=${V} width=${Z(t)} height=${G}></rect>
        </clipPath>
      </defs>
      <rect x=${L} y=${V} width=${Z(t)} height=${G} rx="8" style=${P("var(--kd-fill)")}></rect>
      ${R.map(
    ([w, M]) => k`<rect class="night" x=${r(w).toFixed(1)} y=${V} width=${(r(M) - r(w)).toFixed(1)}
          height=${G} style=${P("var(--kd-night)")}></rect>`
  )}
      ${S.map(
    (w) => k`<line x1=${L} x2=${h} y1=${a(w).toFixed(1)} y2=${a(w).toFixed(1)}
            style=${K("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${h + 6} y=${(a(w) + 4).toFixed(1)} style=${P(f.label)} font-size=${yt}>${n.tick(w)}°</text>`
  )}
      ${_ ? k`<path d=${_} style=${P("var(--kd-area)")}></path>` : g}
      <g clip-path=${`url(#${Ie})`}>
        ${i.intensity.map(
    (w) => k`<rect x=${r(w.start).toFixed(1)} y=${V}
            width=${Math.max(r(w.end) - r(w.start), 0.8).toFixed(1)} height=${G}
            style=${P(f.warning)} opacity=${wn[Number(w.value)] ?? 0}></rect>`
  )}
      </g>
      ${i.humidity.length > 0 ? k`<path d=${p(i.humidity, c)} fill="none" style=${K(f.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : g}
      ${b ? k`<path d=${b} fill="none" style=${K(f.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${Re})`}></path>` : g}
      ${m ? k`<path class="temperature-curve" d=${m} fill="none" style=${K(f.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : g}
      ${y && e === void 0 ? k`<circle cx=${r(y.t).toFixed(1)} cy=${a(y.v).toFixed(1)} r="3.5" style=${P(f.white)}></circle>` : g}

      <text x=${L} y=${gn} style=${P(f.label)} font-size=${yt}>${o.system.heating}</text>
      <rect x=${L} y=${Ne} width=${Z(t)} height=${at} rx="2" style=${P("var(--kd-fill)")}></rect>
      ${C(i.heating, Ne, (w) => si[w] ?? f.off)}
      <text x=${L} y=${$n} style=${P(f.label)} font-size=${yt}>${o.system.climate}</text>
      <rect x=${L} y=${wt} width=${Z(t)} height=${at} rx="2" style=${P("var(--kd-fill)")}></rect>
      ${C(i.climate, wt, (w) => On(w))}

      ${Cn(s).map((w) => {
    const M = En(r(w), L, h);
    return k`<line x1=${r(w).toFixed(1)} x2=${r(w).toFixed(1)} y1=${V} y2=${wt + at}
            style=${K("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${M.x.toFixed(1)} y=${vn} style=${P(f.label)} font-size=${yt}
            text-anchor=${M.anchor}>${Pn(w, s, n)}</text>`;
  })}
      ${v === void 0 ? g : k`<line x1=${v.toFixed(1)} x2=${v.toFixed(1)} y1=${V} y2=${wt + at}
              style=${K(f.white)} stroke-width="1" opacity="0.7"></line>
            ${A === void 0 ? g : k`<circle cx=${v.toFixed(1)} cy=${a(A).toFixed(1)} r="4"
                  style=${`${P(f.white)}; ${K("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const Ue = Pt / 4;
function Hn(i) {
  return `var(--kd-scene-${i})`;
}
function Nn(i) {
  let t;
  switch (i) {
    case "bedroom":
      t = k`
        <path d="M121 10a15 15 0 1 0 13 23 12 12 0 0 1-13-23z"></path>
        <path d="M92 14v9M87.5 18.5h9M140 50v7M136.5 53.5h7"></path>
        <path d="M18 56v46M18 86h116v16M18 102h116"></path>
        <path d="M26 74h28a6 6 0 0 1 0 12H26z"></path>
        <path d="M60 86v-8a6 6 0 0 1 6-6h58a10 10 0 0 1 10 10v4"></path>`;
      break;
    case "office":
      t = k`
        <rect x="42" y="22" width="66" height="42" rx="5"></rect>
        <path d="M75 64v14M60 78h30"></path>
        <path d="M16 92h118M24 92v16M126 92v16"></path>
        <path d="M132 92V66l-8-12M118 48l9-7 9 11z"></path>
        <path d="M22 78h14v14H22zM36 81h3.5a3 3 0 0 1 0 6H36"></path>`;
      break;
    case "kids":
      t = k`
        <rect x="22" y="72" width="30" height="30" rx="5"></rect>
        <rect x="56" y="72" width="30" height="30" rx="5"></rect>
        <rect x="39" y="40" width="30" height="30" rx="5"></rect>
        <circle cx="116" cy="88" r="14"></circle>
        <path d="M104 84c8 4 16 4 24 0"></path>
        <path d="M118 14l4.5 9.5 10.5 1.3-7.7 7.2 2 10.3-9.3-5.1-9.3 5.1 2-10.3-7.7-7.2 10.5-1.3z"></path>`;
      break;
    default:
      t = k`
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
const Y = (i, t, e, n) => i === 1 ? t : i >= 2 && i <= 4 ? e : n, zn = {
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
    notOffered: "entita nenabízí",
    commandFailed: "Příkaz se nepodařilo odeslat.",
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
    rooms: (i) => `${i} ${Y(i, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (i) => `${i} ${Y(i, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    manualSpoken: "Topení ručně",
    heating: (i) => `Topí ${i}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá"
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (i) => `${i} ${Y(i, "minuta", "minuty", "minut")}`,
    hour: (i) => `${i} ${Y(i, "hodina", "hodiny", "hodin")}`,
    day: (i) => `${i} ${Y(i, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (i) => `${i} ${Y(i, "minutu", "minuty", "minut")}`,
    hour: (i) => `${i} ${Y(i, "hodinu", "hodiny", "hodin")}`
  }
}, lt = (i, t, e) => i === 1 ? t : e, In = {
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
    notOffered: "not offered by the entity",
    commandFailed: "The command could not be sent.",
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
    rooms: (i) => `${i} ${lt(i, "room", "rooms")}`,
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
    windowsOpen: (i) => `${i} ${lt(i, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    manualSpoken: "Heating set manually",
    heating: (i) => `Heating in ${i}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on"
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (i) => `${i} ${lt(i, "minute", "minutes")}`,
    hour: (i) => `${i} ${lt(i, "hour", "hours")}`,
    day: (i) => `${i} ${lt(i, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (i) => i === 1 ? "the last minute" : `the last ${i} minutes`,
    hour: (i) => i === 1 ? "the last hour" : `the last ${i} hours`
  }
}, kt = (i, t, e) => i === 1 ? t : e, Rn = {
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
    notOffered: "erbjuds inte av entiteten",
    commandFailed: "Kommandot kunde inte skickas.",
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
    windowsOpen: (i) => `${i} fönster ${kt(i, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    manualSpoken: "Värme i manuellt läge",
    heating: (i) => `Värme i ${i}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på"
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (i) => `${i} ${kt(i, "minut", "minuter")}`,
    hour: (i) => `${i} ${kt(i, "timme", "timmar")}`,
    day: (i) => `${i} ${kt(i, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (i) => i === 1 ? "den senaste minuten" : `de senaste ${i} minuterna`,
    hour: (i) => i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`
  }
}, Fn = { cs: zn, en: In, sv: Rn };
function At(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function ne(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Un(i, t) {
  return i === "auto" ? ne(At(t)) : i;
}
function jn() {
  return ne(document.documentElement.lang || navigator.language || "");
}
const je = /* @__PURE__ */ new Map(), Bn = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Wn = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Kn = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ut(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Gt(i, t) {
  const e = At(t).replace("_", "-"), n = e !== "" && ne(e) === i ? e : Bn[i], o = Ut(t, "number_format"), s = Ut(t, "time_format"), r = Ut(t, "date_format"), a = [i, n, o, s, r].join("|");
  let l = je.get(a);
  return l || (l = Vn(i, n, o, s, r), je.set(a, l)), l;
}
function Yn(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function qn(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Vn(i, t, e, n, o) {
  const s = Yn(t), r = Fn[i], a = e === "system" ? void 0 : e === "none" ? "en-US" : Kn[e] ?? s, l = e === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), p = qn(n, s), m = p ? "h12" : "h23", $ = new Intl.DateTimeFormat(s, { hour: p ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), y = new Intl.DateTimeFormat(s, p ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), _ = o === "system" ? void 0 : s, b = new Intl.DateTimeFormat(_, { day: "numeric", month: "numeric" }), S = (v) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return b.format(v);
    const A = b.formatToParts(v), R = A.find((F) => F.type === "literal")?.value ?? "/", w = A[A.length - 1], M = w?.type === "literal" ? w.value : "", H = A.find((F) => F.type === "day")?.value ?? "", N = A.find((F) => F.type === "month")?.value ?? "";
    return o === "DMY" ? `${H}${R}${N}${M}` : `${N}${R}${H}${M}`;
  }, C = Wn.has(s.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: i,
    locale: s,
    t: r,
    one: (v) => d.format(v),
    half: (v) => c.format(Math.round(v * 2) / 2),
    tick: (v) => c.format(v),
    whole: (v) => h.format(v),
    percent: (v) => `${v}${C}%`,
    time: (v) => $.format(v),
    hour: (v) => y.format(v),
    day: S
  };
}
const Gn = di`
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
      /* Panel view and wide screens: no wider than four rooms side by side (TODO P1.12). */
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

    /* Invisible touch target of 44 px in height (TODO P1.2). */
    .humidity::after {
      content: "";
      position: absolute;
      inset: -8px 0;
    }

    .missing {
      color: var(--kd-off);
    }

    /*
     * Small grey clock at a stale value (TODO P2.21): the grey number alone could look like a fault.
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

    /* Script failed: red ring around the button, a short shake, the reason in a red bubble (TODO P2.18). */
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
      /* A drag on the dimmed area must not move the dashboard below (TODO P1.9.3). */
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
     * chart uses the full width of the phone (TODO P1.9.9). The same query is in chartWidth().
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
`, Zn = " ";
function Be(i) {
  if (!i || z(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function Zt(i, t) {
  return i === void 0 ? "" : `· ${t.half(i)}${Zn}°C`;
}
function Xn(i, t, e, n, o, s) {
  const r = s.t.heatingMode, a = i?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || z(l), c = a === "off" || l === "off", h = Be(e);
  if (c)
    return { label: r.off, color: f.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || a === void 0 || z(a))
    return { label: "––", color: f.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const p = ei(Be(n), o);
  return l === "schedule" ? { label: r.schedule, color: f.plan, active: !0, extra: Zt(h, s), unknown: !1, overlay: "schedule", waves: p } : l === "manual" ? { label: r.manual, color: f.warning, active: !0, extra: Zt(h, s), unknown: !1, overlay: "manual", waves: p } : { label: t?.state ?? "––", color: f.warning, active: !0, extra: "", unknown: !1, waves: p };
}
function oe(i, t) {
  let e = "unknown", n, o;
  if (i && !z(i.state.toLowerCase())) {
    const r = i.state.toLowerCase(), a = String(i.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? e = "off" : r === "cool" ? e = a === "wind_free" ? "wind_free" : "cool" : r === "dry" ? e = "dry" : r === "fan_only" ? e = "fan" : r === "heat" ? e = "heat" : (r === "auto" || r === "heat_cool") && (e = "auto"), e !== "off" && e !== "unknown" && e !== "wind_free" && a !== "none" && a !== "" && (n = Qe(a)), o = q(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(e);
  return {
    mode: e,
    label: n ?? t.t.climateMode[e],
    color: Ot[e],
    active: e !== "off" && e !== "unknown",
    extra: s ? Zt(o, t) : "",
    unknown: e === "unknown"
  };
}
function Jn(i, t) {
  const e = i.unknown ? t.t.unknownState : i.label;
  return i.extra ? `${e} ${i.extra.replace(/^·\s*/, "")}` : e;
}
function jt(i, t) {
  return i.length <= 2 ? i.join(", ") : t.t.summaryChips.rooms(i.length);
}
function se(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function re(i, t, e) {
  return Xn(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds,
    e
  );
}
function ai(i, t, e, n) {
  const o = se(i, t).length > 0, s = re(i, t, n), r = i.air_conditioner ? oe(t(i.air_conditioner), n).mode : "unknown", a = !s.unknown && s.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", d = [];
  return o && a && d.push("window-heating"), o && l ? d.push("window-cooling") : l && e && d.push("cooling-cold"), d;
}
function Qn(i, t, e, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, r = [], a = [], l = [];
  let d = 0;
  const c = [];
  for (const $ of i) {
    for (const b of ai($, t, e.has($.name), n))
      s[b].push($.name);
    const y = se($, t).length;
    y > 0 && r.push([$.name, y]);
    const _ = re($, t, n);
    _.overlay === "manual" && a.push($.name), _.waves > 0 && (l.push($.name), d = Math.max(d, _.waves)), $.air_conditioner && oe(t($.air_conditioner), n).active && c.push($.name);
  }
  const h = [], p = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [$, y] of p)
    s[$].length > 0 && h.push({
      kind: y,
      text: `${o.conflict[$]}: ${jt(s[$], n)}`,
      color: f.warning,
      spoken: `${o.conflictSpoken[$]}: ${s[$].join(", ")}`
    });
  const m = r.reduce(($, [, y]) => $ + y, 0);
  return m > 0 && h.push({
    kind: "windows",
    text: o.windowsOpen(m),
    color: f.sky,
    spoken: `${o.windowsSpoken}: ${r.map(([$, y]) => y > 1 ? `${$} (${y})` : $).join(", ")}`
  }), a.length > 0 && h.push({
    kind: "manual",
    text: `${o.manual}: ${jt(a, n)}`,
    color: f.warning,
    spoken: `${o.manualSpoken}: ${a.join(", ")}`
  }), l.length > 0 && h.push({
    kind: "heating",
    text: o.heating(o.rooms(l.length)),
    color: f.warning,
    spoken: `${o.heatingSpoken}: ${l.join(", ")}`,
    waves: d
  }), c.length > 0 && h.push({
    kind: "climate",
    text: `${o.climate}: ${jt(c, n)}`,
    color: f.cool,
    spoken: `${o.climateSpoken}: ${c.join(", ")}`
  }), h;
}
var to = Object.defineProperty, E = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && to(t, e, o), o;
};
const eo = 5 * 6e4, io = 3e4, U = " ", no = 550, We = 400, oo = 700, so = "(orientation: landscape) and (max-height: 600px)", ro = 1600, ao = 5e3, lo = 100, co = 0.6, ho = 6, po = ["off", "cool", "dry", "fan_only", "auto", "heat"], ae = class ae extends ht {
  constructor() {
    super(...arguments), this._i18n = Gt("en"), this._historyStatus = "loading", this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!e || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = Tn((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
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
        const r = s + (t.key === "ArrowLeft" ? -Ue : Ue);
        this._scrubTime = r >= o ? void 0 : Math.max(n, r);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY;
    }, this.sheetTouchMove = (t) => {
      t.cancelable && this.sheetCannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this._touchY ?? 0)) && t.preventDefault();
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
        if (n < ho)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > lo || o > co) ? this.closeSheet() : this._dragY = 0;
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
      const n = this.renderRoot.activeElement, o = n ? e.indexOf(n) : -1, s = t.shiftKey ? e[o <= 0 ? e.length - 1 : o - 1] : e[o === -1 || o === e.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = an(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, io), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize);
    for (const t of [this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const e = t.get("hass");
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || At(e) !== At(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => e?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e), this._i18n = Gt(Un(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    }, eo)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => se(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of Ri(this._config)) {
      const n = t.states[e], o = this.hass.states[e];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !Ui(n?.attributes, o?.attributes))
        return !0;
    }
    return !1;
  }
  getCardSize() {
    return 2 + (this._config?.rooms.length ?? 1) * 5;
  }
  render() {
    if (!this._config)
      return g;
    const t = et(this.entityState(this._config.houseModeEntity) ?? ""), e = t === et(this._config.houseModes.summer), n = e || t === et(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), r = this._config.title ?? this._i18n.t.title, a = this.renderOutside(), l = Qn(
      this._config.rooms,
      (c) => this.getState(c),
      this.coldRooms(e, n, s),
      this._i18n
    ), d = r !== "" || a !== g || l.length > 0;
    return u`
      <ha-card>
        <div class="dashboard">
          ${d ? u`<header class="dashboard-header">
                ${r === "" ? g : u`<h1>${r}</h1>`}
                ${a} ${this.renderSummary(l)}
              </header>` : g}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (c, h) => this.renderRoom(c, h, e, n, o, s)
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
      be(
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
      temperature: It(e((n) => n.temperature), rt(t.trends, "temperature")),
      co2: It(e((n) => n.carbon_dioxide), rt(t.trends, "co2")),
      pm25: It(e((n) => n.pm25), rt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return g;
    const { t: e, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), r = this.numberState(t.maximum), a = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && r !== void 0 ? `${n(s)}–${n(r)}${U}°C` : void 0, c = [
      o === void 0 ? void 0 : `${n(o)}${U}°C`,
      d,
      a === void 0 ? void 0 : `☂${U}${this._i18n.percent(n(a))}`
    ].filter(($) => $ !== void 0), h = this._config.thresholds;
    let p = "––", m = f.label;
    return l !== void 0 && (l >= h.pm25_critical ? (p = e.airLevel.poor, m = f.alert) : l >= h.pm25_warning ? (p = e.airLevel.moderate, m = f.warning) : p = e.airLevel.good), c.length === 0 && !t.pm25 ? g : u`<div class="outside">
      ${c.length > 0 ? u`<div>${c.join(" · ")}</div>` : g}
      ${t.pm25 ? u`<div>${e.outsideAir} <span style=${`color: ${m}`}>${p}</span></div>` : g}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? g : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((e) => {
      const n = e.kind === "windows" || e.kind === "conflict-window" ? Rt(e.color, !1) : e.kind === "climate" || e.kind === "conflict-cooling" ? St("cool", e.color, !1) : qt(e.waves ?? 3, !1);
      return u`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, o, s, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), d = this.reading(t.humidity, a, r), c = this.reading(t.carbon_dioxide, a, r), h = this.pm25Reading(t, r), { t: p } = this._i18n, m = be({ temperature: l, humidity: d, co2: c, pm25: h }, n, o, t, p), $ = t.image, y = (b) => m.cause === b ? `color: ${m.color}` : g, _ = ai(t, (b) => this.getState(b), m.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${t.name}
        style=${$?.kind === "scene" ? `--scene-tone: ${Hn($.scene)}` : g}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${m.kind === "unknown" ? `border: 1.5px solid ${f.off}` : `background: ${m.color}`}
          ></span>
          <span style=${`color: ${m.color}; font-weight: ${m.kind === "normal" ? 400 : 500}`}>
            ${m.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${y("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? g}
            aria-label=${p.temperatureLabel(
      t.name,
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${(b) => this.openSheet("history", t, b)}
          >
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${U}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${y("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? g}
            aria-label=${p.humidityLabel(
      t.name,
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
            ${this.renderAirBlock(t, e, c, h, s)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, e, _, r)}
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
    const e = t.image;
    return e ? e.kind === "scene" ? u`<div class="scene" aria-hidden="true">${Nn(e.scene)}</div>` : u`<div class="scene photo" aria-hidden="true">
      <img src=${e.url} alt="" loading="lazy" decoding="async" />
    </div>` : g;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = t.link;
    if (!n)
      return u`<div class="room-title">${t.name}</div>`;
    const o = `link-description-${e}`;
    return u`
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
    return Se((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Se(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === f.alert ? f.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, n) {
    return t.value === void 0 || t.stale ? f.label : t.value >= n ? f.alert : t.value >= e ? f.warning : f.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, e, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return g;
    const { thresholds: r } = t, { t: a } = this._i18n, l = this._config.trends, d = [t.carbon_dioxide, t.pm25].filter(($) => !!$), c = ($, y, _, b, S, C) => {
      if (!y || !_)
        return;
      const v = b.value === void 0 ? void 0 : _e(this._trends[_], rt(l, C));
      return a.airSensor(
        $,
        b.value === void 0 ? void 0 : `${this._i18n.whole(b.value)} ${S}`,
        v ? a.trendOver(a.trend[v], this.trendPeriod()) : void 0,
        this.staleSpoken(b)
      );
    }, h = [
      c("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      c("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = d.length > 1, m = `air-description-${e}`;
    return u`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${d.length === 0}
        aria-haspopup=${p ? "dialog" : g}
        aria-describedby=${m}
        @click=${($) => p ? this.openSheet("air", t, $) : this.showMoreInfo(d[0])}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      u`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      s.co2
    ) : g}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      He(),
      o,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      s.pm25
    ) : g}
      </button>
      <span class="sr-only" id=${m}>${a.airDescription(t.name, h, p)}</span>
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, e) {
    const { thresholds: n } = t, o = n.stale_minutes, s = [
      { slot: "co2", label: "CO₂", unit: "ppm", present: t.hasCo2, entityId: t.carbon_dioxide, warning: n.co2_warning, critical: n.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", present: t.hasPm25, entityId: t.pm25, warning: n.pm25_warning, critical: n.pm25_critical }
    ].filter((r) => r.present);
    return u`
      <div class="options list-options" role="group" aria-label=${this._i18n.t.air}>
        ${s.map(({ slot: r, label: a, unit: l, entityId: d, warning: c, critical: h }) => {
      const p = this.reading(d, o, e, r === "pm25"), m = p.value !== void 0, $ = m && !p.stale ? f[r] : f.off;
      return u`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!d}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(d);
      }}
          >
            <span class="option-icon" style=${`color: ${$}`} aria-hidden="true">
              ${r === "co2" ? u`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : He()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">${this._i18n.t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(p, c, h))}`}>
              ${m ? `${this._i18n.whole(p.value)} ${l}` : u`<span aria-hidden="true">––</span><span class="sr-only">${this._i18n.t.unknownValue}</span>`}
            </span>
            ${p.stale ? u`<span class="sr-only">${this.staleSpoken(p)}</span>` : g}
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
    const d = o.value !== void 0, c = this._i18n.whole(o.value ?? 0), h = this.airColor(o, r, a), p = f[t];
    return u`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? g}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? p : f.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? u`<span class="row-label" style=${`color: ${h}`}>${c}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : u`<span class="row-label" style=${`color: ${f.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(e, l, p, o.stale === !0) : g}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, n) {
    if (!t.temperature || e.value === void 0)
      return g;
    const o = this.renderSpark(t.temperature, n, f.peach, e.stale === !0);
    if (o === g)
      return g;
    const s = _e(this._trends[t.temperature], rt(this._config.trends, "temperature")), { t: r } = this._i18n;
    return u`
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
      return g;
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
    if (!s || !e)
      return g;
    const r = hn(s, e).map(
      (h, p) => h === void 0 ? void 0 : { x: p / Math.max(1, s.length - 1) * 100, y: (1 - h) * 100 }
    ).filter((h) => h !== void 0);
    if (r.length < 2)
      return g;
    const a = r.map((h) => `${h.x.toFixed(2)},${h.y.toFixed(2)}`).join(" "), l = r[0], d = r[r.length - 1], c = `${a} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return u`<span class="spark ${o ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${c} fill="currentColor" fill-opacity="0.08"></polygon>
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
  renderHvac(t, e, n) {
    const { t: o } = this._i18n, s = re(t, (m) => this.getState(m), this._i18n), r = oe(this.getState(t.air_conditioner), this._i18n), a = (m) => this.renderSystemRow(qt(s.unknown ? 0 : s.waves, s.unknown), s, m), l = (m) => this.renderSystemRow(St(r.mode, r.color, r.unknown), r, m), d = e ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, d), h = d.map((m) => `${o.system[m]} ${Jn(m === "heating" ? s : r, this._i18n)}`).join(", "), p = `hvac-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${p}
        @click=${(m) => c ? this.openSheet(c, t, m) : void 0}
      >
        ${e ? l(!0) : a(!0)}
        ${e ? a(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${p}>${o.hvacDescription(t.name, h, c)}</span>
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
    return u`
      <span
        class="system-row ${n && e.active ? "strong" : ""}"
        style=${`--row-color: ${e.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${e.label}</span>
            ${e.extra ? u`<span class="row-unit">${e.extra}</span>` : g}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, e) {
    const n = this.getState(t), o = n?.state.toLowerCase();
    if (o === void 0 || z(o))
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
    const { t: s } = this._i18n, r = t.windows.map((v) => ({ window: v, ...this.windowState(v.entity, o) })), a = r.filter((v) => v.state === "open"), l = a.length > 0, d = !l && (r.length === 0 || r.some((v) => v.state === "unknown")), c = t.windows.length > 1, h = l ? f.sky : f.label, p = l ? a.length > 1 ? s.window.openCount(a.length) : s.window.open : d ? "––" : s.window.closed, m = a.map((v) => v.minutesOpen).filter((v) => v !== void 0), $ = m.length > 0 ? Math.max(...m) : void 0, y = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, _ = `window-description-${e}`, b = $ === void 0 ? void 0 : ji($, s);
    let S;
    if (!c)
      S = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", b);
    else if (l) {
      const v = a.map((A) => this.windowName(t, A.window)).join(", ");
      S = a.length === 1 ? s.window.spokenOneOpen(v, b) : s.window.spokenManyOpen(v, b);
    } else
      S = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const C = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${h}`}
        ?disabled=${!C}
        aria-haspopup=${c ? "dialog" : g}
        aria-describedby=${_}
        @click=${(v) => c ? this.openSheet("windows", t, v) : this.showMoreInfo(C)}
      >
        <span class="row-main">
          <span class="row-icon">${Rt(d ? f.off : h, d)}</span>
          <span class="row-text">
            <span class="row-label">${p}</span>
            ${y ? u`<span class="conflict-dot" aria-hidden="true"></span>` : g}
            ${$ === void 0 ? g : u`<span class="row-unit window-duration"
                  >${`${y ? "" : `${U}·${U}`}${xe($)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${_}>${s.window.description(t.name, S, y, c)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, e) {
    return e.name ?? this._i18n.t.window.defaultName(t.windows.indexOf(e) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, e) {
    const { t: n } = this._i18n;
    return u`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: r } = this.windowState(o.entity, e), a = s === "unknown", l = s === "open" ? f.sky : f.label;
      return u`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Rt(a ? f.off : l, a)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint">${n.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${l}`}>
              ${a ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : s === "open" ? n.window.open : n.window.closed}${r === void 0 ? g : u`<span class="list-extra">${U}·${U}${xe(r)}</span>`}
            </span>
          </button>`;
    })}
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const n = this.getState(e), o = n?.state.toLowerCase(), s = o !== void 0 && !z(o), r = s ? q(n?.attributes.current_position) : void 0, a = s ? q(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, d = o === "opening" || o === "closing", { t: c } = this._i18n, h = l ? c.cover.position(Math.round(r), Math.round(a)) : c.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${c.cover.label(t.name, h, d)}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${xt} ${Bt}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${Ni(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${c.cover.presets(t.name)}>
        ${t.presets.map((p) => this.renderPreset(t, p, r, a, s))}
      </div>
    `;
  }
  renderPreset(t, e, n, o, s) {
    const r = this._moving[t.name], a = r === e.id, l = r === void 0 && Nt(n, o, e, this.tolerance()), d = `${t.name}|${e.id}`, { t: c } = this._i18n, h = Bi(e, c), p = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${a ? "pending" : ""} ${p ? "failed" : ""}"
        title=${h}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : g}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${p && this._hint?.spoken ? `${c.cover.preset(t.name, h, Me(e, c), s)} ${this._hint.text} ${this._hint.spoken}` : c.cover.preset(t.name, h, Me(e, c), s)}
        @pointerdown=${(m) => this.pressStart(m, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(m) => m.preventDefault()}
        @click=${(m) => {
      m.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(d));
    }}
      >
        ${pn(e.icon)}
        ${this._hint?.key !== d ? g : p ? u`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : u`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, e, n, o) {
    t.button !== 0 || !o || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, n);
    }, no));
  }
  pressEnd(t, e, n) {
    const o = `${t.name}|${e.id}`;
    if (!n) {
      this.showUnavailable(o);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const s = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !s || r)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === o && a - this._lastTap.time <= We) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, e);
      return;
    }
    this._lastTap = { key: o, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === o && (this._lastTap = void 0, this.showHint(o, this._i18n.t.cover.hint, "selection"));
    }, We);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, e, n, o) {
    this._hint = { key: t, text: e, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? ao : ro);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || z(n)) {
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
      }, oo);
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
    if (Nt(
      q(o?.attributes.current_position),
      q(o?.attributes.current_tilt_position),
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
      if (r === void 0 || z(r) || Nt(
        q(s?.attributes.current_position),
        q(s?.attributes.current_tilt_position),
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
      return g;
    const { t: n } = this._i18n;
    return e.kind === "history" ? this.renderSheetFrame(
      n.sheet.history(this._config?.history.hours ?? 24),
      e.room.name,
      this.renderHistoryBody(e.room),
      "history-sheet"
    ) : e.kind === "air" ? this.renderSheetFrame(n.air, e.room.name, this.renderAirBody(e.room, Date.now())) : e.kind === "windows" ? this.renderSheetFrame(n.window.popup, e.room.name, this.renderWindowsBody(e.room, Date.now())) : this.renderSheetFrame(e.room.name, void 0, this.renderHvacBody(e.room, e.kind, t));
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, n, o = "") {
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
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : g}
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
                ${e ? u`<div class="sheet-sub">${e}</div>` : g}
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
  /** Topení / Klimatizace controls, with a segmented control to switch between the two. */
  renderHvacBody(t, e, n) {
    const o = e === "heating", s = o ? t.heating?.climate : t.air_conditioner, r = this.getState(s), a = r !== void 0 && !z(r.state.toLowerCase()), l = ke(r?.attributes.hvac_modes), d = ke(r?.attributes.preset_modes), c = r?.state.toLowerCase(), h = String(r?.attributes.preset_mode ?? "none").toLowerCase(), p = !a || !s ? [] : o ? this.heatingOptions(s, l, d, c, h) : this.climateOptions(s, l, c), m = !o && a && s ? d.filter((S) => S !== "none") : [], $ = n ? ["climate", "heating"] : ["heating", "climate"], y = !!t.heating?.climate && !!t.air_conditioner, { t: _ } = this._i18n, b = u`
      ${a ? p.length === 0 ? u`<p class="sheet-message">${_.sheet.noModes}</p>` : u`<div class="options" role="group" aria-label=${_.sheet.modes(_.system[e])}>
              ${p.map((S) => this.renderOption(S))}
            </div>` : u`<p class="sheet-message">${_.sheet.entityUnavailable}</p>`}
      ${m.length > 0 ? u`<div class="sheet-label" id="preset-label">${_.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${m.map((S) => this.renderPresetChip(s, S, h, c, d))}
            </div>` : g}
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : g}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!s}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(s);
    }}
      >
        ${_.detailsAndHistory}
      </button>
    `;
    return y ? u`
      <div
        class="segmented"
        role="tablist"
        aria-label=${_.sheet.systems}
        @keydown=${(S) => this.segmentKeydown(S, $, e)}
      >
        ${$.map(
      (S) => u`<button
            type="button"
            role="tab"
            id=${`tab-${S}`}
            class="plain-button segment"
            data-system=${S}
            aria-selected=${S === e ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${S === e ? "0" : "-1"}
            @click=${() => this.switchSheet(S)}
          >
            ${_.system[S]}
          </button>`
    )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${e}`}>${b}</div>
    ` : u`<div class="sheet-label system-name">${_.system[e]}</div>${b}`;
  }
  segmentKeydown(t, e, n) {
    const o = e.indexOf(n);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = e[(o + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = e[(o - 1 + e.length) % e.length] : t.key === "Home" ? s = e[0] : t.key === "End" && (s = e[e.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === n ? this.requestUpdate() : this.switchSheet(s));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    const e = this._config?.history.hours ?? 24, { t: n } = this._i18n;
    let o;
    const s = this._historyModel;
    this._historyStatus === "loading" ? o = u`<p class="sheet-message">${n.sheet.loading}</p>` : this._historyStatus === "error" || !s ? o = u`<p class="sheet-message error" role="alert">${n.sheet.historyFailed}</p>` : Sn(s) ? o = u`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${n.sheet.chart(this.historyPeriod())}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${Ln(s, this.chartWidth(), this._scrubTime, this._i18n)}
      </div>` : o = u`<p class="sheet-message">${n.sheet.noHistory(e)}</p>`;
    const r = t.temperature ?? t.humidity;
    return u`
      ${o}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!r}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(r);
    }}
      >
        ${n.sheet.temperatureDetails}
      </button>
    `;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(so).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  sheetCannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".sheet");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
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
          ${t.unsupported ? u`<span class="option-hint">${t.unsupported}</span>` : g}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, n, o, s) {
    const r = n === e && o !== "off", a = r && s.includes("none") ? "none" : e;
    return u`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${Qe(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, n, o, s) {
    const r = [], a = this._i18n.t.heatingMode, l = (d, c, h, p, m, $) => {
      r.push({ id: d, label: c, icon: mn(d), color: h, active: p, run: m, unsupported: $ });
    };
    if (e.includes("off") && l("off", a.off, f.off, o === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && l("auto", a.schedule, f.plan, o === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && l(
      "heat",
      a.manual,
      f.warning,
      o === "heat" && s !== "boost",
      () => this.setHvacMode(t, "heat")
    ), r.length > 0) {
      const d = n.includes("boost");
      l(
        "boost",
        a.boost,
        f.alert,
        d && s === "boost" && o !== "off",
        () => this.setPresetMode(t, "boost"),
        d ? void 0 : this._i18n.t.sheet.notOffered
      );
    }
    return r;
  }
  climateOptions(t, e, n) {
    return po.filter((o) => e.includes(o)).map((o) => {
      const s = ti(o), r = Ot[s];
      return {
        id: o,
        label: this._i18n.t.climateMode[s],
        icon: St(s, r, !1),
        color: r,
        active: n === o,
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
    ].filter((a) => !!a), o = this._config.history, s = Date.now(), r = s - o.hours * Pt;
    try {
      const a = await De(this.hass, n, r, s);
      if (e !== this._historyRequest)
        return;
      this._historyModel = xn(a, t, { startMs: r, endMs: s }, o), this._historyStatus = "ready";
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
    const t = Fi(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, o = Date.now(), s = o - e * 6e4;
    try {
      const r = await De(this.hass, t, s, o), a = {};
      for (const l of t)
        a[l] = cn(r[l], s, o, n);
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
    const e = Wi(this._config), n = await Promise.allSettled(
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
    const a = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(r, Number.isFinite(a) ? a : 0), d = Math.max(0, (n - l) / 6e4);
    return { value: s, ageMinutes: d, stale: !(o && s === 0) && d > e };
  }
  /** PM2.5 of a room: a measured 0 µg/m³ is clean air and never stale (CURRENT_SPEC.md, Chybějící data). */
  pm25Reading(t, e) {
    return this.reading(t.pm25, t.thresholds.stale_minutes, e, !0);
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${un()}</span>` : g;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(ii(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || z(e.toLowerCase()))
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
ae.styles = Gn;
let T = ae;
E([
  O()
], T.prototype, "_config");
E([
  Xe({ attribute: !1 })
], T.prototype, "hass");
E([
  O()
], T.prototype, "_sheet");
E([
  O()
], T.prototype, "_sheetError");
E([
  O()
], T.prototype, "_historyStatus");
E([
  O()
], T.prototype, "_historyModel");
E([
  O()
], T.prototype, "_scrubTime");
E([
  O()
], T.prototype, "_dragY");
E([
  O()
], T.prototype, "_flash");
E([
  O()
], T.prototype, "_moving");
E([
  O()
], T.prototype, "_prefersDark");
E([
  O()
], T.prototype, "_hint");
E([
  O()
], T.prototype, "_trends");
E([
  O()
], T.prototype, "_trendsLoaded");
E([
  O()
], T.prototype, "_reported");
E([
  O()
], T.prototype, "_historyRequest");
E([
  O()
], T.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", T);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Gt(jn()).t.cardDescription,
  preview: !1
});
