const St = globalThis, Qt = St.ShadowRoot && (St.ShadyCSS === void 0 || St.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = /* @__PURE__ */ Symbol(), ce = /* @__PURE__ */ new WeakMap();
let qe = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Qt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ce.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ce.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ci = (e) => new qe(typeof e == "string" ? e : e + "", void 0, te), hi = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new qe(i, e, te);
}, pi = (e, t) => {
  if (Qt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = St.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, he = Qt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ci(i);
})(e) : e;
const { is: ui, defineProperty: mi, getOwnPropertyDescriptor: fi, getOwnPropertyNames: gi, getOwnPropertySymbols: $i, getPrototypeOf: vi } = Object, Ot = globalThis, pe = Ot.trustedTypes, wi = pe ? pe.emptyScript : "", yi = Ot.reactiveElementPolyfillSupport, pt = (e, t) => e, At = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? wi : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, ee = (e, t) => !ui(e, t), ue = { attribute: !0, type: String, converter: At, reflect: !1, useDefault: !1, hasChanged: ee };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ot.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ue) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && mi(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = fi(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = vi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const i = this.properties, n = [...gi(i), ...$i(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) i.unshift(he(s));
    } else t !== void 0 && i.push(he(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return pi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : At).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : At;
      this._$Em = s;
      const a = r.fromAttribute(i, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? ee)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[pt("elementProperties")] = /* @__PURE__ */ new Map(), it[pt("finalized")] = /* @__PURE__ */ new Map(), yi?.({ ReactiveElement: it }), (Ot.reactiveElementVersions ??= []).push("2.1.2");
const ie = globalThis, me = (e) => e, Et = ie.trustedTypes, fe = Et ? Et.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ye = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, Ge = "?" + j, bi = `<${Ge}>`, Q = document, mt = () => Q.createComment(""), ft = (e) => e === null || typeof e != "object" && typeof e != "function", ne = Array.isArray, ki = (e) => ne(e) || typeof e?.[Symbol.iterator] == "function", Nt = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, $e = />/g, W = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, we = /"/g, Ze = /^(?:script|style|textarea|title)$/i, Xe = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), f = Xe(1), y = Xe(2), st = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), J = Q.createTreeWalker(Q, 129);
function Je(e, t) {
  if (!ne(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(t) : t;
}
const _i = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = at;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, h = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); ) p = r.lastIndex, r === at ? c[1] === "!--" ? r = ge : c[1] !== void 0 ? r = $e : c[2] !== void 0 ? (Ze.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = W) : c[3] !== void 0 && (r = W) : r === W ? c[0] === ">" ? (r = s ?? at, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? W : c[3] === '"' ? we : ve) : r === we || r === ve ? r = W : r === ge || r === $e ? r = at : (r = W, s = void 0);
    const u = r === W && e[a + 1].startsWith("/>") ? " " : "";
    o += r === at ? l + bi : h >= 0 ? (n.push(d), l.slice(0, h) + Ye + l.slice(h) + j + u) : l + j + (h === -2 ? a : u);
  }
  return [Je(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class gt {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = _i(t, i);
    if (this.el = gt.createElement(d, n), J.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = J.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ye)) {
          const p = c[r++], u = s.getAttribute(h).split(j), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: $[2], strings: u, ctor: $[1] === "." ? Si : $[1] === "?" ? Mi : $[1] === "@" ? Ti : Pt }), s.removeAttribute(h);
        } else h.startsWith(j) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Ze.test(s.tagName)) {
          const h = s.textContent.split(j), p = h.length - 1;
          if (p > 0) {
            s.textContent = Et ? Et.emptyScript : "";
            for (let u = 0; u < p; u++) s.append(h[u], mt()), J.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[p], mt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ge) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(j, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += j.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Q.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ot(e, t, i = e, n) {
  if (t === st) return t;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = ft(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (t = ot(e, s._$AS(e, t.values), s, n)), t;
}
class xi {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, s = (t?.creationScope ?? Q).importNode(i, !0);
    J.currentNode = s;
    let o = J.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new $t(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Ai(o, this, t)), this._$AV.push(d), l = n[++a];
      }
      r !== l?.index && (o = J.nextNode(), r++);
    }
    return J.currentNode = Q, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class $t {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = ot(this, t, i), ft(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ki(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Q.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = gt.createElement(Je(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const o = new xi(s, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = ye.get(t.strings);
    return i === void 0 && ye.set(t.strings, i = new gt(t)), i;
  }
  k(t) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new $t(this.O(mt()), this.O(mt()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = me(t).nextSibling;
      me(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = g;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = ot(this, t, i, 0), r = !ft(t) || t !== this._$AH && t !== st, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = ot(this, a[n + l], i, l), d === st && (d = this._$AH[l]), r ||= !ft(d) || d !== this._$AH[l], d === g ? t = g : t !== g && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Si extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Mi extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ti extends Pt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ot(this, t, i, 0) ?? g) === st) return;
    const n = this._$AH, s = t === g && n !== g || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== g && (n === g || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ai {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ot(this, t);
  }
}
const Ei = ie.litHtmlPolyfillSupport;
Ei?.(gt, $t), (ie.litHtmlVersions ??= []).push("3.3.3");
const Ci = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = s = new $t(t.insertBefore(mt(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
const se = globalThis;
class ut extends it {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ci(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return st;
  }
}
ut._$litElement$ = !0, ut.finalized = !0, se.litElementHydrateSupport?.({ LitElement: ut });
const Oi = se.litElementPolyfillSupport;
Oi?.({ LitElement: ut });
(se.litElementVersions ??= []).push("4.2.2");
const Pi = { attribute: !0, type: String, converter: At, reflect: !1, hasChanged: ee }, Li = (e = Pi, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Qe(e) {
  return (t, i) => typeof i == "object" ? Li(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
function A(e) {
  return Qe({ ...e, state: !0, attribute: !1 });
}
const Mt = 60, Wt = 142, be = 11, wt = 3, zi = 0.8, ke = 2, Ni = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", Di = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", Hi = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function Ii(e, t) {
  if (e === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${Mt - 1.5}
      height=${Wt - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const i = Wt - wt - 1, n = i / be, s = n - zi, o = s - t / 100 * (s - ke), r = wt + 1 + (100 - e) / 100 * i, a = Array.from({ length: be }, (l, d) => {
    const c = wt + 1 + d * n + n / 2, h = c <= r, p = h ? o : ke;
    return y`<rect
      x="0"
      y=${(c - p / 2).toFixed(2)}
      width=${Mt}
      height=${p.toFixed(2)}
      rx=${Math.min(1.5, p / 2).toFixed(2)}
      style=${h ? Ni : Di}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${Mt}
      height=${wt}
      rx="1.5"
      style=${Hi}
    ></rect>${a}`;
}
const Ri = ["cs", "en", "sv"], Dt = ["bedroom", "office", "kids", "living"], Ht = "none", Kt = ["open", "shade", "dark"], ti = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function It(e, t, i, n) {
  return e !== void 0 && t !== void 0 && Math.abs(e - i.position) <= n && Math.abs(t - i.tilt) <= n;
}
function lt(e, t) {
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
  warning: "var(--kd-warning)",
  alert: "var(--kd-alert)",
  /** The critical red on the lighter ground of a popup option (contrast 4.5 : 1 for 17 px text). */
  alertOnPopup: "var(--kd-alert-popup)",
  cold: "var(--kd-sky)",
  cool: "var(--kd-sky)",
  dry: "var(--kd-dry)",
  heat: "var(--kd-warning)",
  auto: "var(--kd-auto)"
}, Lt = {
  off: m.off,
  cool: m.cool,
  wind_free: m.cool,
  dry: m.dry,
  fan: m.plan,
  heat: m.heat,
  auto: m.auto,
  unknown: m.off
}, Fi = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function ei(e) {
  const t = Fi[e];
  if (t)
    return t;
  const i = e.replace(/_/g, " ");
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function ii(e) {
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
function _e(e, t, i, n, s) {
  const { thresholds: o } = n, r = [
    [s.required.temperature, e.temperature],
    [s.required.humidity, e.humidity],
    ...n.hasCo2 ? [[s.required.co2, e.co2]] : [],
    ...n.hasPm25 ? [[s.required.pm25, e.pm25]] : [],
    [s.required.houseMode, i ? { value: 1 } : void 0]
  ];
  for (const [u, $] of r) {
    if ($?.value === void 0)
      return { id: "noData", label: s.noData(u), color: m.label, kind: "unknown" };
    if ($.stale) {
      const x = $.ageMinutes === void 0 ? void 0 : si($.ageMinutes);
      return { id: "noData", label: s.noData(u, x), color: m.label, kind: "unknown" };
    }
  }
  const a = e.temperature.value, l = e.humidity.value, d = n.hasCo2 ? e.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? e.pm25.value : Number.NEGATIVE_INFINITY) >= o.pm25_critical)
    return { id: "polluted", label: s.status.polluted, color: m.alert, kind: "critical", cause: "pm25" };
  if (d >= o.co2_critical)
    return { id: "veryStuffy", label: s.status.veryStuffy, color: m.alert, kind: "critical", cause: "co2" };
  if (d >= o.co2_warning)
    return { id: "stuffy", label: s.status.stuffy, color: m.warning, kind: "warning", cause: "co2" };
  if (l > o.humidity_max)
    return { id: "humid", label: s.status.humid, color: m.warning, kind: "warning", cause: "humidity" };
  if (l < o.humidity_min)
    return { id: "dry", label: s.status.dry, color: m.warning, kind: "warning", cause: "humidity" };
  const h = t ? o.summer_min : o.winter_min, p = t ? o.summer_max : o.winter_max;
  return a > p ? { id: "warm", label: s.status.warm, color: m.warning, kind: "warning", cause: "temperature" } : a < h ? { id: "cold", label: s.status.cold, color: m.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: s.status.comfortable, color: m.label, kind: "normal" };
}
function xe(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function N(e) {
  return e === "" || e === "unknown" || e === "unavailable" || e === "none";
}
function Y(e) {
  if (e == null || e === "")
    return;
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function ni(e, t) {
  return e === void 0 || e <= 0 ? 0 : e >= t.heating_waves_3 ? 3 : e >= t.heating_waves_2 ? 2 : 1;
}
function Ui(e) {
  const t = /* @__PURE__ */ new Set(), i = (n) => {
    n && t.add(n);
  };
  i(e.houseModeEntity), i(e.outside?.temperature), i(e.outside?.minimum), i(e.outside?.maximum), i(e.outside?.rain_probability), i(e.outside?.pm25);
  for (const n of e.rooms)
    i(n.temperature), i(n.humidity), i(n.carbon_dioxide), i(n.pm25), n.windows.forEach((s) => i(s.entity)), i(n.cover), i(n.heating?.climate), i(n.heating?.overlay), i(n.heating?.target), i(n.heating?.intensity), i(n.air_conditioner);
  return t;
}
function ji(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
function Bi(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  const i = Object.keys(e), n = Object.keys(t);
  return i.length === n.length && i.every((s) => Object.hasOwn(t, s) && e[s] === t[s]);
}
function si(e) {
  return e < 60 ? `${Math.max(1, Math.round(e))} min` : e < 2880 ? `${Math.floor(e / 60)} h` : `${Math.floor(e / 1440)} d`;
}
function Se(e, t) {
  const i = (e ?? []).filter((s) => s !== void 0);
  if (i.length < 2)
    return;
  const n = i[i.length - 1] - i[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function Me(e) {
  const t = Math.max(0, Math.floor(e));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [s, o] = [Math.floor(t / 60), t % 60];
    return o === 0 ? `${s} h` : `${s} h ${o} min`;
  }
  const [i, n] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return n === 0 ? `${i} d` : `${i} d ${n} h`;
}
function Wi(e, t) {
  const i = Math.max(0, Math.floor(e));
  if (i < 1)
    return t.duration.lessThanMinute;
  if (i < 60)
    return t.duration.minute(i);
  if (i < 1440) {
    const [r, a] = [Math.floor(i / 60), i % 60], l = t.duration.hour(r);
    return a === 0 ? l : `${l} ${t.duration.minute(a)}`;
  }
  const [n, s] = [Math.floor(i / 1440), Math.floor(i % 1440 / 60)], o = t.duration.day(n);
  return s === 0 ? o : `${o} ${t.duration.hour(s)}`;
}
function Te(e, t) {
  const i = Math.max(1, Math.round(e));
  return i % 60 === 0 ? t.period.hour(i / 60) : t.period.minute(i);
}
function Ki(e, t) {
  return e.label ?? t.cover.presetName[e.icon];
}
function Vi(e, t) {
  if (e.description !== void 0)
    return e.description;
  const i = ti[e.icon];
  return e.label === void 0 && i.position === e.position && i.tilt === e.tilt ? t.cover.presetDescription[e.icon] : t.cover.position(Math.round(e.position), Math.round(e.tilt));
}
function qi(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.humidity, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
const Yi = "input_select.house_mode", Gi = {
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
}, Zi = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Xi = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Rt = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Ji = Kt.map((e) => ({ icon: e, ...ti[e] })), Ae = { winter: "Zima", summer: "Léto" }, Ee = ["auto", "dark", "light"], Ce = ["auto", ...Ri], Oe = 3, Qi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, tn = [
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
], en = ["climate", "overlay", "target", "intensity"], Pe = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], nn = ["name", "position", "tilt", "icon", "description"], sn = ["entity", "name"];
function nt(e) {
  return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function k(e) {
  throw new Error(`Klima Dashboard: ${e}`);
}
function vt(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function tt(e, t, i) {
  for (const n of Object.keys(e))
    t.includes(n) || k(`${i}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function U(e, t) {
  return e == null ? {} : (vt(e) || k(`"${t}" must be a mapping of keys.`), e);
}
function P(e, t) {
  if (e != null)
    return (typeof e != "string" || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(e.trim())) && k(`${t} must be an entity ID such as sensor.loznice_teplota.`), e.trim();
}
function rt(e, t) {
  if (e != null)
    return (typeof e != "string" || !e.trim()) && k(`${t} must be a non-empty text.`), e.trim();
}
function ht(e, t, i, n = {}) {
  tt(e, Object.keys(t), i);
  const s = { ...t };
  for (const [o, r] of Object.entries(e)) {
    if (r === null)
      continue;
    (typeof r != "number" || !Number.isFinite(r)) && k(`${i}.${o} must be a number.`);
    const a = n[o];
    if (a) {
      const [l, d, c] = a;
      (r < l || r > d || c && !Number.isInteger(r)) && k(`${i}.${o} must be ${c ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    s[o] = r;
  }
  return s;
}
function oi(e, t) {
  const i = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, s, o] of i)
    (o ? e[n] >= e[s] : e[n] > e[s]) && k(`${t}: ${n} (${e[n]}) must be ${o ? "below" : "at most"} ${s} (${e[s]}).`);
  e.stale_minutes <= 0 && k(`${t}.stale_minutes must be greater than 0.`), (e.heating_waves_2 < 1 || e.heating_waves_3 > 100) && k(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function on(e, t) {
  return e > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function Vt(e, t) {
  return (!Array.isArray(e) || e.length === 0 || e.length > Oe) && k(`${t} must be a list of 1 to ${Oe} presets.`), e.map((i, n) => {
    const s = `${t}[${n + 1}]`;
    vt(i) || k(`${s} must have a position and a tilt.`), tt(i, nn, s);
    const o = rt(i.name, `${s}.name`), r = (h) => {
      const p = i[h];
      return (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 100) && k(`${s}.${h} must be a number from 0 to 100.`), p;
    }, a = r("position"), l = r("tilt");
    let d = on(a, l);
    i.icon != null && (Kt.includes(i.icon) || k(`${s}.icon must be one of ${Kt.join(", ")}.`), d = i.icon);
    const c = rt(i.description, `${s}.description`);
    return { id: `p${n}`, icon: d, label: o, description: c, position: a, tilt: l };
  });
}
function rn(e, t) {
  const i = e.window;
  if (i == null)
    return [];
  const n = Array.isArray(i) ? i : [i];
  n.length === 0 && k(`${t}.window must not be an empty list.`);
  const s = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(i) ? `[${a + 1}]` : ""}`;
    if (vt(r)) {
      tt(r, sn, l);
      const c = P(r.entity, `${l}.entity`);
      return c || k(`${l}.entity is required.`), { entity: c, name: rt(r.name, `${l}.name`) };
    }
    const d = P(r, l);
    return d || k(`${l} must be an entity ID.`), { entity: d };
  }), o = /* @__PURE__ */ new Set();
  for (const r of s)
    o.has(r.entity) && k(`${t}.window lists ${r.entity} twice.`), o.add(r.entity);
  return s;
}
function Le(e, t) {
  return e === !1 ? { present: !1 } : { entity: P(e, t), present: !0 };
}
function an(e, t) {
  e.image != null && e.scene != null && k(`${t}: use either image or scene (older name), not both.`);
  const i = e.image != null ? "image" : "scene", n = e.image ?? e.scene;
  if (n == null) {
    const o = Qi[nt(e.name)];
    return o ? { kind: "scene", scene: o } : void 0;
  }
  (typeof n != "string" || !n.trim()) && k(`${t}.${i} must be ${[...Dt, Ht].join(", ")} or the address of an image.`);
  const s = n.trim();
  if (s !== Ht) {
    if (Dt.includes(s))
      return { kind: "scene", scene: s };
    if (i === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(s))
      return { kind: "url", url: s };
    k(
      `${t}.${i} must be one of ${[...Dt, Ht].join(", ")}${i === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function ln(e, t) {
  const i = rt(e, `${t}.link`);
  return i !== void 0 && !/^(\/|https?:\/\/)/i.test(i) && k(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), i;
}
function dn(e, t, i) {
  vt(e) || k(`room ${t + 1} must be a mapping with at least a name.`);
  const n = typeof e.name == "string" ? e.name.trim() : "";
  n || k(`room ${t + 1} requires a name.`);
  const s = `room "${n}"`, o = e;
  for (const [h, p] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    h in o && k(`${s}: key "${h}" was renamed to "${p}".`);
  "windows" in o && k(`${s}: the key is "window" (one entity or a list of them), not "windows".`), tt(o, tn, s);
  const r = U(e.heating, `${s}.heating`);
  "heating" in r && k(`${s}: key "heating.heating" was renamed to "heating.intensity".`), tt(r, en, `${s}.heating`);
  const a = e.heating == null ? void 0 : {
    climate: P(r.climate, `${s}.heating.climate`),
    overlay: P(r.overlay, `${s}.heating.overlay`),
    target: P(r.target, `${s}.heating.target`),
    intensity: P(r.intensity, `${s}.heating.intensity`)
  }, l = ht(U(e.thresholds, `${s}.thresholds`), i.thresholds, `${s}.thresholds`);
  oi(l, `${s}.thresholds`);
  const d = Le(e.carbon_dioxide, `${s}.carbon_dioxide`), c = Le(e.pm25, `${s}.pm25`);
  return {
    name: n,
    temperature: P(e.temperature, `${s}.temperature`),
    humidity: P(e.humidity, `${s}.humidity`),
    carbon_dioxide: d.entity,
    hasCo2: d.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: rn(e, s),
    cover: P(e.cover, `${s}.cover`),
    presets: e.cover_presets == null ? i.presets : Vt(e.cover_presets, `${s}.cover_presets`),
    thresholds: l,
    heating: a,
    air_conditioner: P(e.air_conditioner, `${s}.air_conditioner`),
    image: an(e, s),
    link: ln(e.link, s)
  };
}
function cn(e) {
  (!vt(e) || !Array.isArray(e.rooms) || e.rooms.length === 0) && k("the configuration requires a non-empty rooms list."), e.title != null && typeof e.title != "string" && k("title must be a text (an empty text leaves the heading out).");
  const t = e.theme ?? "auto";
  Ee.includes(t) || k(`theme must be one of ${Ee.join(", ")}.`);
  const i = e.language ?? "auto";
  Ce.includes(i) || k(`language must be one of ${Ce.join(", ")}.`);
  const n = P(e.house_mode_entity, "house_mode_entity") ?? Yi, s = U(e.house_modes, "house_modes");
  tt(s, ["winter", "summer"], "house_modes");
  const o = {
    winter: rt(s.winter, "house_modes.winter") ?? Ae.winter,
    summer: rt(s.summer, "house_modes.summer") ?? Ae.summer
  };
  nt(o.winter) === nt(o.summer) && k("house_modes.winter and house_modes.summer must differ.");
  const r = e.outside == null ? void 0 : U(e.outside, "outside");
  if (r) {
    tt(r, Pe, "outside");
    for (const b of Pe)
      P(r[b], `outside.${b}`);
  }
  const a = ht(U(e.thresholds, "thresholds"), Gi, "thresholds");
  oi(a, "thresholds");
  const l = ht(U(e.trends, "trends"), Zi, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), d = ht(U(e.history, "history"), Xi, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), c = { ...U(e.covers, "covers") }, h = c.presets;
  delete c.presets;
  const p = c.script;
  delete c.script;
  const u = {
    ...ht(c, { tolerance: Rt.tolerance, stall_seconds: Rt.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Rt.script
  };
  p != null && ((typeof p != "string" || !/^script\.[a-z0-9_]+$/.test(p.trim())) && k("covers.script must be a script entity such as script.zaluzie_posun."), u.script = p.trim());
  const $ = h == null ? Vt(Ji, "covers.presets") : Vt(h, "covers.presets"), x = e.rooms.map((b, S) => dn(b, S, { thresholds: a, presets: $ })), _ = /* @__PURE__ */ new Set();
  for (const b of x)
    _.has(b.name) && k(`room name "${b.name}" is used twice; room names must be unique.`), _.add(b.name);
  return {
    // Without a title the heading is "Domov" in the card language (i18n.ts).
    title: e.title ?? void 0,
    theme: t,
    language: i,
    houseModeEntity: n,
    houseModes: o,
    outside: r,
    thresholds: a,
    trends: l,
    history: d,
    covers: u,
    rooms: x
  };
}
const zt = 36e5;
function hn(e) {
  if (e == null)
    return;
  if (typeof e == "number")
    return Number.isFinite(e) ? e < 1e11 ? e * 1e3 : e : void 0;
  const t = Date.parse(e);
  return Number.isNaN(t) ? void 0 : t;
}
function pn(e, t) {
  const i = {};
  for (const [n, s] of Object.entries(e ?? {})) {
    if (!Array.isArray(s))
      continue;
    const o = [];
    s.forEach((r, a) => {
      const l = r.s ?? r.state, d = hn(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && o.push({ time: Math.max(d, t), state: l });
    }), o.sort((r, a) => r.time - a.time), i[n] = o;
  }
  return i;
}
async function ze(e, t, i, n) {
  if (t.length === 0)
    return {};
  const s = await e.callWS({
    type: "history/history_during_period",
    start_time: new Date(i).toISOString(),
    end_time: new Date(n).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return pn(s, i);
}
function ri(e, t) {
  let i;
  for (const n of e ?? []) {
    if (n.time > t)
      break;
    i = n.state;
  }
  return i;
}
function qt(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function un(e, t, i, n) {
  const s = (i - t) / n, o = (e ?? []).filter((r) => qt(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => qt(ri(o, t + (a + 1) * s))
  );
}
function Ne(e, t, i) {
  const n = [];
  for (const o of e ?? []) {
    const r = qt(o.state);
    r !== void 0 && o.time <= i && n.push({ t: Math.max(o.time, t), v: r });
  }
  const s = n[n.length - 1];
  return s && s.t < i && n.push({ t: i, v: s.v }), n;
}
function yt(e, t, i, n) {
  const s = /* @__PURE__ */ new Set([t, i]);
  for (const a of e)
    for (const l of a ?? [])
      l.time > t && l.time < i && s.add(l.time);
  const o = [...s].sort((a, l) => a - l), r = [];
  for (let a = 0; a < o.length - 1; a += 1) {
    const l = n(e.map((c) => ri(c, o[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === o[a] ? d.end = o[a + 1] : r.push({ start: o[a], end: o[a + 1], value: l });
  }
  return r;
}
function Ft(e, t) {
  let i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of e)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (i = Math.min(i, a), n = Math.max(n, a));
  if (!Number.isFinite(i) || !Number.isFinite(n) || t <= 0)
    return;
  let s = Math.floor(i / t) * t, o = Math.ceil(n / t) * t;
  return o - s < t && (s -= t, o += t), { min: s, max: o };
}
function mn(e, t) {
  const i = t.max - t.min;
  return e.map(
    (n) => n === void 0 || i <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / i))
  );
}
function De() {
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
  ].map(([t, i, n]) => y`<circle cx=${t} cy=${i} r=${n}></circle>`)}
    </svg>
  `;
}
function fn(e) {
  const t = (s, o, r, a) => y`<rect x=${s} y=${o} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, i = (s) => y`<path d="M27.5 6.7V${s}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${s + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (e) {
    case "open":
      n = y`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${i(21)}`;
      break;
    case "shade":
      n = y`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${i(26)}`;
      break;
    default:
      n = y`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${i(26)}`;
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
function Yt(e, t) {
  return f`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (i) => y`<path
          d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          style=${`stroke: ${i < e ? m.warning : m.off}`}
          stroke-dasharray=${t ? "1.6 2.6" : g}
        ></path>`
  )}
    </svg>
  `;
}
function Tt(e, t, i) {
  let n;
  const s = y`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, o = y`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (e) {
    case "cool":
    case "wind_free":
      n = y`${s}
        <g transform="rotate(60 12 12)">${s}</g>
        <g transform="rotate(120 12 12)">${s}</g>`;
      break;
    case "dry":
      n = y`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      n = y`${o}<g transform="rotate(120 12 12)">${o}</g>
        <g transform="rotate(240 12 12)">${o}</g>`;
      break;
    case "heat":
      n = y`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (r) => y`<path d="M12 3v2.5" transform=${`rotate(${45 * r} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      n = y`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      n = y`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
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
      stroke-dasharray=${i ? "2 2.4" : g}
      aria-hidden="true"
    >
      ${n}
    </svg>
  `;
}
function Ut(e, t) {
  return f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${e}`}
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
function gn(e) {
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
      t = y`<path d="M12 3c.6 3.4 5.2 5 5.2 10a5.2 5.2 0 0 1-10.4 0c0-2 1-3.4 2.4-4.4.3 1.6 1 2.3 1.8 2.5C11.2 8.6 11 5.6 12 3z"></path>`;
      break;
    default:
      t = y`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const z = 4, $n = 32, G = 6, Z = 150, D = G + Z, dt = 10, vn = D + 20, He = D + 25, wn = D + 50, bt = D + 55, yn = D + 83, Ie = D + 90, kt = 11, bn = [0, 0.24, 0.44, 0.68], Re = "history-under-temperature", Fe = "history-plot", kn = 5, Gt = {
  schedule: m.plan,
  manual: m.warning,
  off: m.closed
}, O = (e) => `fill: ${e}`, K = (e) => `stroke: ${e}`;
function jt(e, t) {
  const i = e?.toLowerCase();
  return t?.toLowerCase() === "off" || i === "off" ? "off" : i === "schedule" || i === "manual" ? i : void 0;
}
function Ue(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
const _n = 0.05;
function xn(e, t) {
  const i = e.filter((a) => Number.isFinite(a));
  let n = 19, s = 23;
  if (i.length > 0) {
    if (n = Math.min(...i), s = Math.max(...i), s - n < t) {
      const l = (n + s) / 2;
      n = l - t / 2, s = l + t / 2;
    }
    const a = (s - n) * _n;
    n -= a, s += a;
  }
  const o = s - n, r = o <= 3 ? 0.5 : o <= 6 ? 1 : o <= 12 ? 2 : 5;
  return { min: n, max: s, step: r };
}
function Sn(e, t, i) {
  const n = [], s = i / 1e3;
  for (let o = Math.ceil(e / i - s) * i; o <= t + s; o += i)
    n.push(Math.round(o * 100) / 100);
  return n;
}
function Mn(e, t, i, n) {
  const s = (w) => w ? e[w] : void 0, { startMs: o, endMs: r } = i, a = s(t.heating?.overlay), l = s(t.heating?.climate), d = Ne(s(t.temperature), o, r), c = Ne(s(t.humidity), o, r), h = yt([a, l], o, r, ([w, C]) => jt(w, C)), p = yt(
    [a, l, s(t.heating?.intensity)],
    o,
    r,
    ([w, C, et]) => {
      const B = jt(w, C), H = ni(Ue(et), t.thresholds);
      return B === void 0 || B === "off" || H === 0 ? void 0 : String(H);
    }
  ), u = yt(
    [a, l, s(t.heating?.target)],
    o,
    r,
    ([w, C, et]) => {
      const B = jt(w, C), H = Ue(et);
      if (!(H === void 0 || H <= kn))
        return B === "schedule" || B === "manual" ? String(H) : void 0;
    }
  ), $ = yt([s(t.air_conditioner)], o, r, ([w]) => {
    const C = ii(w);
    return C === "unknown" ? void 0 : C;
  }), x = d.map((w) => w.v), { min: _, max: b, step: S } = xn(
    x.length > 0 ? x : u.map((w) => Number(w.value)),
    n.min_temperature_span
  ), E = c.map((w) => w.v);
  return {
    range: i,
    temperature: d,
    humidity: c,
    heating: h,
    intensity: p,
    target: u,
    climate: $,
    tempMin: _,
    tempMax: b,
    tempStep: S,
    humidityMin: E.length > 0 ? Math.min(...E) : void 0,
    humidityMax: E.length > 0 ? Math.max(...E) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function Tn(e) {
  return e.temperature.length > 0 || e.humidity.length > 0 || e.heating.length > 0;
}
function X(e) {
  return e - z - $n;
}
function An(e, t, i) {
  return z + (e - t.startMs) / (t.endMs - t.startMs) * X(i);
}
function En(e, t, i) {
  const n = Math.min(1, Math.max(0, (e - z) / X(t)));
  return i.startMs + n * (i.endMs - i.startMs);
}
function Zt(e, t) {
  let i;
  for (const n of e) {
    if (n.t > t)
      break;
    i = n.v;
  }
  return i;
}
function _t(e, t, i) {
  return e.find(
    (n) => n.start <= t && (t < n.end || t === i && n.end === i)
  )?.value;
}
function Cn(e, [t, i]) {
  const n = [];
  if (t === i)
    return n;
  const s = new Date(e.startMs);
  for (s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - 1); s.getTime() < e.endMs; ) {
    const o = new Date(s);
    o.setHours(t, 0, 0, 0);
    const r = new Date(s);
    i < t && r.setDate(r.getDate() + 1), r.setHours(i, 0, 0, 0);
    const a = Math.max(o.getTime(), e.startMs), l = Math.min(r.getTime(), e.endMs);
    l > a && n.push([a, l]), s.setDate(s.getDate() + 1);
  }
  return n;
}
function ai(e) {
  const t = (e.endMs - e.startMs) / zt;
  return t <= 12 ? 3 : t <= 24 ? 6 : t <= 48 ? 12 : t <= 96 ? 24 : 48;
}
function On(e) {
  const t = ai(e), i = [], n = new Date(e.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < e.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= e.endMs; )
    n.getTime() >= e.startMs && i.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return i;
}
function Pn(e, t, i) {
  return e - 16 < t ? { x: t, anchor: "start" } : e + 16 > i ? { x: i, anchor: "end" } : { x: e, anchor: "middle" };
}
function je(e) {
  return e === "off" ? "var(--kd-strip-off)" : Lt[e] ?? m.off;
}
function Ln(e, t, i) {
  return ai(t) >= 24 ? i.day(e) : i.time(e);
}
function V(e, t, i = "block") {
  return f`<span class="legend-item">
    <span class="legend-swatch ${i}" style=${i === "block" ? `background: ${e}` : `border-color: ${e}`}></span
    >${t}
  </span>`;
}
function zn(e, t, i) {
  const { t: n } = i, s = t ?? e.range.endMs, o = Zt(e.temperature, s), r = Zt(e.humidity, s), a = _t(e.heating, s, e.range.endMs), l = Number(_t(e.intensity, s, e.range.endMs) ?? 0), d = _t(e.target, s, e.range.endMs), c = _t(e.climate, s, e.range.endMs);
  let h = n.chart.now;
  if (t !== void 0) {
    const x = (S) => {
      const E = new Date(S);
      return E.setHours(12, 0, 0, 0), E.getTime();
    }, _ = Math.round((x(e.range.endMs) - x(t)) / (24 * zt));
    h = `${_ === 0 ? "" : _ === 1 ? `${n.chart.yesterday} ` : `${i.day(t)} `}${i.time(t)}`;
  }
  const p = a === void 0 ? "––" : `${n.heatingMode[a]}${a !== "off" && d !== void 0 ? ` · ${i.half(Number(d))} °C` : ""}`, u = c ? n.climateMode[c] : "––", $ = c ? Lt[c] : m.off;
  return f`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${h}</span>
        <span class="readout-temp">${o === void 0 ? "––" : `${i.one(o)} °C`}</span>
        <span class="readout-hum">${r === void 0 ? "" : i.percent(Math.round(r))}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${a ? Gt[a] : m.label}`}>
          <span class="readout-icon">${Yt(a && a !== "off" ? l : 0, a === void 0)}</span>
          ${n.system.heating} ${p}
        </span>
        <span class="readout-system" style=${`color: ${$}`}>
          <span class="readout-icon">${Tt(c ?? "off", $, c === void 0)}</span>
          ${n.system.climate} ${u}
        </span>
      </div>
    </div>
  `;
}
function Nn(e, t, i, n) {
  const { t: s } = n, { range: o } = e, r = (v) => An(v, o, t), a = (v) => D - (v - e.tempMin) / (e.tempMax - e.tempMin) * Z, l = (e.humidityMin ?? 0) - 3, d = Math.max((e.humidityMax ?? 100) + 3, l + 12), c = (v) => D - (v - l) / (d - l) * Z, h = z + X(t), p = (v, L) => v.map((I, R) => `${R === 0 ? "M" : "L"}${r(I.t).toFixed(1)} ${L(I.v).toFixed(1)}`).join(" "), u = p(e.temperature, a), $ = e.temperature[0], x = e.temperature[e.temperature.length - 1], _ = $ && x ? `${u} L${r(x.t).toFixed(1)} ${D} L${r($.t).toFixed(1)} ${D} Z` : "";
  let b = "";
  e.target.forEach((v, L) => {
    const I = a(Number(v.value)).toFixed(1), R = e.target[L - 1];
    b += R && R.end === v.start ? ` L${r(v.start).toFixed(1)} ${I}` : ` M${r(v.start).toFixed(1)} ${I}`, b += ` L${r(v.end).toFixed(1)} ${I}`;
  });
  const S = Sn(e.tempMin, e.tempMax, e.tempStep), E = (v, L, I) => v.map((R) => {
    const de = r(R.start);
    return y`<rect x=${de.toFixed(1)} y=${L} width=${Math.max(r(R.end) - de, 0.8).toFixed(1)}
        height=${dt} rx="2" style=${O(I(R.value))}></rect>`;
  }), w = i === void 0 ? void 0 : r(i), C = i === void 0 ? void 0 : Zt(e.temperature, i), et = Cn(o, e.night), B = ["schedule", "manual", "off"].filter(
    (v) => e.heating.some((L) => L.value === v)
  ), H = [...new Set(e.climate.map((v) => v.value))];
  return f`
    ${zn(e, i, n)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${Ie}"
      width=${t}
      height=${Ie}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${Re}><path d=${_}></path></clipPath>
        <clipPath id=${Fe}>
          <rect x=${z} y=${G} width=${X(t)} height=${Z}></rect>
        </clipPath>
      </defs>
      <rect x=${z} y=${G} width=${X(t)} height=${Z} rx="8" style=${O("var(--kd-fill)")}></rect>
      ${et.map(
    ([v, L]) => y`<rect class="night" x=${r(v).toFixed(1)} y=${G} width=${(r(L) - r(v)).toFixed(1)}
          height=${Z} style=${O("var(--kd-night)")}></rect>`
  )}
      ${S.map(
    (v) => y`<line x1=${z} x2=${h} y1=${a(v).toFixed(1)} y2=${a(v).toFixed(1)}
            style=${K("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${h + 6} y=${(a(v) + 4).toFixed(1)} style=${O(m.label)} font-size=${kt}>${n.tick(v)}°</text>`
  )}
      ${_ ? y`<path d=${_} style=${O("var(--kd-area)")}></path>` : g}
      <g clip-path=${`url(#${Re})`}>
        ${e.intensity.map(
    (v) => y`<rect x=${r(v.start).toFixed(1)} y=${G}
            width=${Math.max(r(v.end) - r(v.start), 0.8).toFixed(1)} height=${Z}
            style=${O(m.warning)} opacity=${bn[Number(v.value)] ?? 0}></rect>`
  )}
      </g>
      ${e.humidity.length > 0 ? y`<path d=${p(e.humidity, c)} fill="none" style=${K(m.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : g}
      ${b ? y`<path d=${b} fill="none" style=${K(m.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${Fe})`}></path>` : g}
      ${u ? y`<path class="temperature-curve" d=${u} fill="none" style=${K(m.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : g}
      ${x && i === void 0 ? y`<circle cx=${r(x.t).toFixed(1)} cy=${a(x.v).toFixed(1)} r="3.5" style=${O(m.white)}></circle>` : g}

      <text x=${z} y=${vn} style=${O(m.label)} font-size=${kt}>${s.system.heating}</text>
      <rect x=${z} y=${He} width=${X(t)} height=${dt} rx="2" style=${O("var(--kd-fill)")}></rect>
      ${E(e.heating, He, (v) => Gt[v] ?? m.off)}
      <text x=${z} y=${wn} style=${O(m.label)} font-size=${kt}>${s.system.climate}</text>
      <rect x=${z} y=${bt} width=${X(t)} height=${dt} rx="2" style=${O("var(--kd-fill)")}></rect>
      ${E(e.climate, bt, (v) => je(v))}

      ${On(o).map((v) => {
    const L = Pn(r(v), z, h);
    return y`<line x1=${r(v).toFixed(1)} x2=${r(v).toFixed(1)} y1=${G} y2=${bt + dt}
            style=${K("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${L.x.toFixed(1)} y=${yn} style=${O(m.label)} font-size=${kt}
            text-anchor=${L.anchor}>${Ln(v, o, n)}</text>`;
  })}
      ${w === void 0 ? g : y`<line x1=${w.toFixed(1)} x2=${w.toFixed(1)} y1=${G} y2=${bt + dt}
              style=${K(m.white)} stroke-width="1" opacity="0.7"></line>
            ${C === void 0 ? g : y`<circle cx=${w.toFixed(1)} cy=${a(C).toFixed(1)} r="4"
                  style=${`${O(m.white)}; ${K("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${V(m.white, s.chart.temperature, "line")}
      ${e.target.length > 0 ? V(m.plan, s.chart.target, "dashed") : g}
      ${e.intensity.length > 0 ? V(m.warning, s.chart.intensity) : g}
      ${e.humidityMin !== void 0 && e.humidityMax !== void 0 ? V(
    m.humidityLine,
    s.chart.humidity(n.percent(`${Math.round(e.humidityMin)}–${Math.round(e.humidityMax)}`)),
    "dashed"
  ) : g}
      ${et.length > 0 ? V("var(--kd-night-swatch)", s.chart.night(e.night[0], e.night[1])) : g}
    </div>
    <div class="legend">
      ${B.map((v) => V(Gt[v], `${s.system.heating} ${s.heatingMode[v]}`))}
      ${H.map((v) => V(je(v), `${s.system.climate} ${s.climateMode[v]}`))}
    </div>
  `;
}
const Be = zt / 4;
function Dn(e) {
  return `var(--kd-scene-${e})`;
}
function Hn(e) {
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
const q = (e, t, i, n) => e === 1 ? t : e >= 2 && e <= 4 ? i : n, In = {
  /** Heading without `title` in the YAML. */
  title: "Domov",
  /** Card picker of Home Assistant. */
  cardDescription: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  /** Space between a number and "%" (as Home Assistant writes it in this language). */
  percentSpace: " ",
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
  temperatureLabel: (e, t, i, n) => `${e}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${i}, historie místnosti za ${n}`,
  humidityLabel: (e, t, i) => `${e}: vlhkost ${t ?? "neznámá"}${i}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (e, t, i, n) => `${e}: teplota za ${t}${i ? ` ${i}` : ""}, historie místnosti za ${n}`,
  link: { page: "Otevře stránku místnosti.", web: "Otevře odkaz." },
  // CO₂ and PM2.5
  air: "Kvalita vzduchu",
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (e, t, i, n) => `${e} ${t ?? "neznámé"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: kvalita vzduchu, ${t || "bez čidla"}. ${i ? "Otevře detaily." : "Otevře detail a historii."}`,
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
  hvacDescription: (e, t, i) => `${e}: ${t}.${i ? ` Otevře ovládání ${i === "heating" ? "Topení" : "Klimatizace"}.` : ""}`,
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
    description: (e, t, i, n) => `${e}: ${t}${i ? `; konflikt: ${i}` : ""}. ${n ? "Otevře přehled oken." : "Otevře detail a historii."}`
  },
  // Blind and its presets (Žaluzie)
  cover: {
    label: (e, t, i) => `${e}: žaluzie, ${t}${i ? ", pohybuje se" : ""}. Otevřít ovládání.`,
    position: (e, t) => `poloha ${e} %, naklopení ${t} %`,
    unknown: "poloha nebo naklopení neznámé",
    presets: (e) => `${e}: předvolby žaluzií`,
    preset: (e, t, i, n) => `${e}: žaluzie ${t}, ${i}. ${n ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná."}`,
    /** Name and description of a preset without them in the YAML, by its icon. */
    presetName: { open: "Den", shade: "Stín", dark: "Tma" },
    presetDescription: { open: "vytaženo nahoru", shade: "spuštěno, lamely otevřené", dark: "úplné zatemnění" },
    hint: "Podržte nebo klepněte dvakrát",
    unavailable: "Žaluzie je nedostupná",
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
    notOffered: "entita nenabízí",
    commandFailed: "Příkaz se nepodařilo odeslat.",
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (e) => `Za ${e === 1 ? "poslední hodinu" : e >= 2 && e <= 4 ? `poslední ${e} hodiny` : `posledních ${e} hodin`} nejsou k dispozici data.`,
    chart: (e) => `Graf za ${e}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`,
    temperatureDetails: "Detail teploty"
  },
  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera",
    temperature: "Teplota",
    target: "Cíl topení",
    intensity: "Vytápění (sytost = výkon)",
    humidity: (e) => `Vlhkost ${e}`,
    night: (e, t) => `Noc ${e}–${t} h`
  },
  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (e) => `${e} ${q(e, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (e) => `${e} ${q(e, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    manualSpoken: "Topení ručně",
    heating: (e) => `Topí ${e}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá"
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (e) => `${e} ${q(e, "minuta", "minuty", "minut")}`,
    hour: (e) => `${e} ${q(e, "hodina", "hodiny", "hodin")}`,
    day: (e) => `${e} ${q(e, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (e) => `${e} ${q(e, "minutu", "minuty", "minut")}`,
    hour: (e) => `${e} ${q(e, "hodinu", "hodiny", "hodin")}`
  }
}, ct = (e, t, i) => e === 1 ? t : i, Rn = {
  title: "Home",
  cardDescription: "Temperature, air quality, heating and blinds of your rooms at a glance.",
  /** Home Assistant writes no space before % in English. */
  percentSpace: "",
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
  temperatureLabel: (e, t, i, n) => `${e}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${i}, room history for ${n}`,
  humidityLabel: (e, t, i) => `${e}: humidity ${t ?? "unknown"}${i}, details and history`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperature${i ? ` ${i}` : ""} over ${t}, room history for ${n}`,
  link: { page: "Opens the room page.", web: "Opens the link." },
  air: "Air quality",
  airSensor: (e, t, i, n) => `${e} ${t ?? "unknown"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: air quality, ${t || "no sensor"}. ${i ? "Opens details." : "Opens details and history."}`,
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
  hvacDescription: (e, t, i) => `${e}: ${t}.${i ? ` Opens the ${i === "heating" ? "heating" : "air conditioning"} controls.` : ""}`,
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
    description: (e, t, i, n) => `${e}: ${t}${i ? `; conflict: ${i}` : ""}. ${n ? "Opens the window overview." : "Opens details and history."}`
  },
  cover: {
    label: (e, t, i) => `${e}: blind, ${t}${i ? ", moving" : ""}. Opens the controls.`,
    position: (e, t) => `position ${e}%, tilt ${t}%`,
    unknown: "position or tilt unknown",
    presets: (e) => `${e}: blind presets`,
    preset: (e, t, i, n) => `${e}: blind preset ${t}, ${i}. ${n ? "Double-tap or hold to run it." : "The blind is unavailable."}`,
    presetName: { open: "Day", shade: "Shade", dark: "Dark" },
    presetDescription: { open: "raised", shade: "lowered, slats open", dark: "full blackout" },
    hint: "Hold or double-tap",
    unavailable: "The blind is unavailable",
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
    notOffered: "not offered by the entity",
    commandFailed: "The command could not be sent.",
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (e) => `No data for ${e === 1 ? "the last hour" : `the last ${e} hours`}.`,
    chart: (e) => `Chart of ${e}. The left and right arrow keys move through time, the End key returns to now.`,
    temperatureDetails: "Temperature details"
  },
  chart: {
    now: "Now",
    yesterday: "yesterday",
    temperature: "Temperature",
    target: "Heating target",
    intensity: "Heating (deeper = more power)",
    humidity: (e) => `Humidity ${e}`,
    night: (e, t) => `Night ${e}–${t} h`
  },
  summaryChips: {
    rooms: (e) => `${e} ${ct(e, "room", "rooms")}`,
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
    windowsOpen: (e) => `${e} ${ct(e, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    manualSpoken: "Heating set manually",
    heating: (e) => `Heating in ${e}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on"
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (e) => `${e} ${ct(e, "minute", "minutes")}`,
    hour: (e) => `${e} ${ct(e, "hour", "hours")}`,
    day: (e) => `${e} ${ct(e, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (e) => e === 1 ? "the last minute" : `the last ${e} minutes`,
    hour: (e) => e === 1 ? "the last hour" : `the last ${e} hours`
  }
}, xt = (e, t, i) => e === 1 ? t : i, Fn = {
  title: "Hem",
  cardDescription: "Översikt över temperatur, luftkvalitet, värme och persienner i rummen.",
  /** Home Assistant writes a space before % in Swedish. */
  percentSpace: " ",
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
  temperatureLabel: (e, t, i, n) => `${e}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${i}, rumshistorik för ${n}`,
  humidityLabel: (e, t, i) => `${e}: luftfuktighet ${t ?? "okänd"}${i}, detaljer och historik`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperaturen${i ? ` ${i}` : ""} under ${t}, rumshistorik för ${n}`,
  link: { page: "Öppnar rummets sida.", web: "Öppnar länken." },
  air: "Luftkvalitet",
  airSensor: (e, t, i, n) => `${e} ${t ?? "okänt"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: luftkvalitet, ${t || "ingen sensor"}. ${i ? "Öppnar detaljer." : "Öppnar detaljer och historik."}`,
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
  hvacDescription: (e, t, i) => `${e}: ${t}.${i ? ` Öppnar styrningen av ${i === "heating" ? "värmen" : "luftkonditioneringen"}.` : ""}`,
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
    description: (e, t, i, n) => `${e}: ${t}${i ? `; konflikt: ${i}` : ""}. ${n ? "Öppnar fönsteröversikten." : "Öppnar detaljer och historik."}`
  },
  cover: {
    label: (e, t, i) => `${e}: persienn, ${t}${i ? ", rör sig" : ""}. Öppnar styrningen.`,
    position: (e, t) => `position ${e} %, lutning ${t} %`,
    unknown: "position eller lutning okänd",
    presets: (e) => `${e}: förval för persiennen`,
    preset: (e, t, i, n) => `${e}: persiennförval ${t}, ${i}. ${n ? "Dubbeltryck eller håll in för att köra det." : "Persiennen är inte tillgänglig."}`,
    presetName: { open: "Dag", shade: "Skugga", dark: "Mörker" },
    presetDescription: { open: "uppdragen", shade: "nerdragen, lamellerna öppna", dark: "full mörkläggning" },
    hint: "Håll in eller dubbeltryck",
    unavailable: "Persiennen är inte tillgänglig",
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
    notOffered: "erbjuds inte av entiteten",
    commandFailed: "Kommandot kunde inte skickas.",
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (e) => `Inga data för ${e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`}.`,
    chart: (e) => `Diagram över ${e}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`,
    temperatureDetails: "Temperaturdetaljer"
  },
  chart: {
    now: "Nu",
    yesterday: "igår",
    temperature: "Temperatur",
    target: "Måltemperatur",
    intensity: "Uppvärmning (djupare = mer effekt)",
    humidity: (e) => `Luftfuktighet ${e}`,
    night: (e, t) => `Natt ${e}–${t} h`
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
    windowsOpen: (e) => `${e} fönster ${xt(e, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    manualSpoken: "Värme i manuellt läge",
    heating: (e) => `Värme i ${e}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på"
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (e) => `${e} ${xt(e, "minut", "minuter")}`,
    hour: (e) => `${e} ${xt(e, "timme", "timmar")}`,
    day: (e) => `${e} ${xt(e, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (e) => e === 1 ? "den senaste minuten" : `de senaste ${e} minuterna`,
    hour: (e) => e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`
  }
}, Un = { cs: In, en: Rn, sv: Fn };
function Ct(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function li(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function jn(e, t) {
  return e === "auto" ? li(Ct(t)) : e;
}
function Bn() {
  return li(document.documentElement.lang || navigator.language || "");
}
const We = /* @__PURE__ */ new Map();
function Xt(e, t) {
  const i = Ct(t).replace("_", "-"), n = e === "cs" ? "cs-CZ" : e === "sv" ? "sv-SE" : /^en(-|$)/i.test(i) ? i : "en", s = `${e}|${n}`;
  let o = We.get(s);
  return o || (o = Wn(e, n), We.set(s, o)), o;
}
function Wn(e, t) {
  let i = t;
  try {
    new Intl.NumberFormat(i);
  } catch {
    i = "en";
  }
  const n = Un[e], s = new Intl.NumberFormat(i, { minimumFractionDigits: 1, maximumFractionDigits: 1 }), o = new Intl.NumberFormat(i, { maximumFractionDigits: 1 }), r = new Intl.NumberFormat(i, { maximumFractionDigits: 0 }), a = new Intl.DateTimeFormat(i, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }), l = new Intl.DateTimeFormat(i, { day: "numeric", month: "numeric" });
  return {
    language: e,
    locale: i,
    t: n,
    one: (d) => s.format(d),
    half: (d) => o.format(Math.round(d * 2) / 2),
    tick: (d) => o.format(d),
    whole: (d) => r.format(d),
    percent: (d) => `${d}${n.percentSpace}%`,
    time: (d) => a.format(d),
    day: (d) => l.format(d)
  };
}
const Kn = hi`
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
`, Vn = " ";
function Ke(e) {
  if (!e || N(e.state.toLowerCase()))
    return;
  const t = Number.parseFloat(e.state);
  return Number.isFinite(t) ? t : void 0;
}
function Jt(e, t) {
  return e === void 0 ? "" : `· ${t.half(e)}${Vn}°C`;
}
function qn(e, t, i, n, s, o) {
  const r = o.t.heatingMode, a = e?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || N(l), c = a === "off" || l === "off", h = Ke(i);
  if (c)
    return { label: r.off, color: m.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || a === void 0 || N(a))
    return { label: "––", color: m.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const p = ni(Ke(n), s);
  return l === "schedule" ? { label: r.schedule, color: m.plan, active: !0, extra: Jt(h, o), unknown: !1, overlay: "schedule", waves: p } : l === "manual" ? { label: r.manual, color: m.warning, active: !0, extra: Jt(h, o), unknown: !1, overlay: "manual", waves: p } : { label: t?.state ?? "––", color: m.warning, active: !0, extra: "", unknown: !1, waves: p };
}
function oe(e, t) {
  let i = "unknown", n, s;
  if (e && !N(e.state.toLowerCase())) {
    const r = e.state.toLowerCase(), a = String(e.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? i = "off" : r === "cool" ? i = a === "wind_free" ? "wind_free" : "cool" : r === "dry" ? i = "dry" : r === "fan_only" ? i = "fan" : r === "heat" ? i = "heat" : (r === "auto" || r === "heat_cool") && (i = "auto"), i !== "off" && i !== "unknown" && i !== "wind_free" && a !== "none" && a !== "" && (n = ei(a)), s = Y(e.attributes.temperature);
  }
  const o = ["cool", "wind_free", "dry", "heat", "auto"].includes(i);
  return {
    mode: i,
    label: n ?? t.t.climateMode[i],
    color: Lt[i],
    active: i !== "off" && i !== "unknown",
    extra: o ? Jt(s, t) : "",
    unknown: i === "unknown"
  };
}
function Yn(e, t) {
  const i = e.unknown ? t.t.unknownState : e.label;
  return e.extra ? `${i} ${e.extra.replace(/^·\s*/, "")}` : i;
}
function Bt(e, t) {
  return e.length <= 2 ? e.join(", ") : t.t.summaryChips.rooms(e.length);
}
function re(e, t) {
  return e.windows.filter((i) => t(i.entity)?.state.toLowerCase() === "on");
}
function ae(e, t, i) {
  return qn(
    t(e.heating?.climate),
    t(e.heating?.overlay),
    t(e.heating?.target),
    t(e.heating?.intensity),
    e.thresholds,
    i
  );
}
function di(e, t, i, n) {
  const s = re(e, t).length > 0, o = ae(e, t, n), r = e.air_conditioner ? oe(t(e.air_conditioner), n).mode : "unknown", a = !o.unknown && o.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", d = [];
  return s && a && d.push("window-heating"), s && l ? d.push("window-cooling") : l && i && d.push("cooling-cold"), d;
}
function Gn(e, t, i, n) {
  const s = n.t.summaryChips, o = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, r = [], a = [], l = [], d = [];
  for (const u of e) {
    for (const _ of di(u, t, i.has(u.name), n))
      o[_].push(u.name);
    const $ = re(u, t).length;
    $ > 0 && r.push([u.name, $]);
    const x = ae(u, t, n);
    x.overlay === "manual" && a.push(u.name), x.waves > 0 && l.push(u.name), u.air_conditioner && oe(t(u.air_conditioner), n).active && d.push(u.name);
  }
  const c = [], h = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [u, $] of h)
    o[u].length > 0 && c.push({
      kind: $,
      text: `${s.conflict[u]}: ${Bt(o[u], n)}`,
      color: m.warning,
      spoken: `${s.conflictSpoken[u]}: ${o[u].join(", ")}`
    });
  const p = r.reduce((u, [, $]) => u + $, 0);
  return p > 0 && c.push({
    kind: "windows",
    text: s.windowsOpen(p),
    color: m.sky,
    spoken: `${s.windowsSpoken}: ${r.map(([u, $]) => $ > 1 ? `${u} (${$})` : u).join(", ")}`
  }), a.length > 0 && c.push({
    kind: "manual",
    text: `${s.manual}: ${Bt(a, n)}`,
    color: m.warning,
    spoken: `${s.manualSpoken}: ${a.join(", ")}`
  }), l.length > 0 && c.push({
    kind: "heating",
    text: s.heating(s.rooms(l.length)),
    color: m.warning,
    spoken: `${s.heatingSpoken}: ${l.join(", ")}`
  }), d.length > 0 && c.push({
    kind: "climate",
    text: `${s.climate}: ${Bt(d, n)}`,
    color: m.cool,
    spoken: `${s.climateSpoken}: ${d.join(", ")}`
  }), c;
}
var Zn = Object.defineProperty, T = (e, t, i, n) => {
  for (var s = void 0, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = r(t, i, s) || s);
  return s && Zn(t, i, s), s;
};
const Xn = 5 * 6e4, Jn = 3e4, Qn = 8e3, F = " ", ts = 550, Ve = 400, es = 700, is = 1600, ns = 100, ss = 0.6, os = 6, rs = ["off", "cool", "dry", "fan_only", "auto", "heat"], le = class le extends ut {
  constructor() {
    super(...arguments), this._i18n = Xt("en"), this._historyStatus = "loading", this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const i = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!i || !n)
        return;
      const s = n.getBoundingClientRect(), o = this.chartWidth();
      this._scrubTime = En((t.clientX - s.left) * o / Math.max(s.width, 1), o, i.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const i = this._historyModel;
      if (!i)
        return;
      const { startMs: n, endMs: s } = i.range, o = this._scrubTime ?? s;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const r = o + (t.key === "ArrowLeft" ? -Be : Be);
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
      const i = this._drag;
      if (!i || i.pointerId !== t.pointerId)
        return;
      const n = t.clientY - i.startY;
      if (!i.dragging) {
        if (n < os)
          return;
        i.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const i = this._drag;
      if (this._drag = void 0, !i || !i.dragging)
        return;
      const n = Math.max(0, t.clientY - i.startY), s = n / Math.max(1, performance.now() - i.startTime);
      t.type === "pointerup" && (n > ns || s > ss) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const i = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet .chart-wrap'
        )
      ];
      if (i.length === 0)
        return;
      const n = this.renderRoot.activeElement, s = n ? i.indexOf(n) : -1, o = t.shiftKey ? i[s <= 0 ? i.length - 1 : s - 1] : i[s === -1 || s === i.length - 1 ? 0 : s + 1];
      t.preventDefault(), o.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = cn(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, Jn), this.requestUpdate();
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
      const i = t.get("hass");
      return i?.themes?.darkMode !== this.hass?.themes?.darkMode || Ct(i) !== Ct(this.hass) || this.hasRelevantEntityChanged(i);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const i = this.theme();
    this.dataset.theme !== i && (this.dataset.theme = i), this._i18n = Xt(jn(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    const i = this.hass?.themes?.darkMode;
    return (typeof i == "boolean" ? i : this._prefersDark) ? "dark" : "light";
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, Xn)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => re(t, (i) => this.getState(i)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const i of Ui(this._config)) {
      const n = t.states[i], s = this.hass.states[i];
      if (n?.state !== s?.state || n?.last_updated !== s?.last_updated || !Bi(n?.attributes, s?.attributes))
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
    const t = nt(this.entityState(this._config.houseModeEntity) ?? ""), i = t === nt(this._config.houseModes.summer), n = i || t === nt(this._config.houseModes.winter), s = this.trendAxes(this._config), o = Date.now(), r = this._config.title ?? this._i18n.t.title, a = this.renderOutside(), l = Gn(
      this._config.rooms,
      (c) => this.getState(c),
      this.coldRooms(i, n, o),
      this._i18n
    ), d = r !== "" || a !== g || l.length > 0;
    return f`
      <ha-card>
        <div class="dashboard">
          ${d ? f`<header class="dashboard-header">
                ${r === "" ? g : f`<h1>${r}</h1>`}
                ${a} ${this.renderSummary(l)}
              </header>` : g}
          ${this._notice ? f`<div class="notice" role="alert">${this._notice}</div>` : g}
          <div class="rooms">
            ${this._config.rooms.map(
      (c, h) => this.renderRoom(c, h, i, n, s, o)
    )}
          </div>
        </div>
        ${this.renderSheet(i)}
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, i, n) {
    const s = /* @__PURE__ */ new Set();
    for (const o of this._config?.rooms ?? []) {
      const r = o.thresholds.stale_minutes;
      _e(
        {
          temperature: this.reading(o.temperature, r, n),
          humidity: this.reading(o.humidity, r, n),
          co2: this.reading(o.carbon_dioxide, r, n),
          pm25: this.reading(o.pm25, r, n)
        },
        t,
        i,
        o,
        this._i18n.t
      ).id === "cold" && s.add(o.name);
    }
    return s;
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const i = (n) => t.rooms.map((s) => {
      const o = n(s);
      return o ? this._trends[o] : void 0;
    });
    return {
      temperature: Ft(i((n) => n.temperature), lt(t.trends, "temperature")),
      co2: Ft(i((n) => n.carbon_dioxide), lt(t.trends, "co2")),
      pm25: Ft(i((n) => n.pm25), lt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return g;
    const { t: i, whole: n } = this._i18n, s = this.numberState(t.temperature), o = this.numberState(t.minimum), r = this.numberState(t.maximum), a = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = o !== void 0 && r !== void 0 ? `${n(o)}–${n(r)}${F}°C` : void 0, c = [
      s === void 0 ? void 0 : `${n(s)}${F}°C`,
      d,
      a === void 0 ? void 0 : `☂${F}${this._i18n.percent(n(a))}`
    ].filter(($) => $ !== void 0), h = this._config.thresholds;
    let p = "––", u = m.label;
    return l !== void 0 && (l >= h.pm25_critical ? (p = i.airLevel.poor, u = m.alert) : l >= h.pm25_warning ? (p = i.airLevel.moderate, u = m.warning) : p = i.airLevel.good), c.length === 0 && !t.pm25 ? g : f`<div class="outside">
      ${c.length > 0 ? f`<div>${c.join(" · ")}</div>` : g}
      ${t.pm25 ? f`<div>${i.outsideAir} <span style=${`color: ${u}`}>${p}</span></div>` : g}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? g : f`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((i) => {
      const n = i.kind === "windows" || i.kind === "conflict-window" ? Ut(i.color, !1) : i.kind === "climate" || i.kind === "conflict-cooling" ? Tt("cool", i.color, !1) : Yt(3, !1);
      return f`<li class="chip" style=${`--chip-color: ${i.color}`} title=${i.spoken} aria-label=${i.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${i.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, i, n, s, o, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), d = this.reading(t.humidity, a, r), c = this.reading(t.carbon_dioxide, a, r), h = this.reading(t.pm25, a, r), { t: p } = this._i18n, u = _e({ temperature: l, humidity: d, co2: c, pm25: h }, n, s, t, p), $ = t.image, x = (b) => u.cause === b ? `color: ${u.color}` : g, _ = di(t, (b) => this.getState(b), u.id === "cold", this._i18n);
    return f`
      <div class="room-cell"><article
        class="room"
        aria-label=${t.name}
        style=${$?.kind === "scene" ? `--scene-tone: ${Dn($.scene)}` : g}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, i)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${u.kind === "unknown" ? `border: 1.5px solid ${m.off}` : `background: ${u.color}`}
          ></span>
          <span style=${`color: ${u.color}; font-weight: ${u.kind === "normal" ? 400 : 500}`}>
            ${u.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${x("temperature")}
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
            ${l.value === void 0 ? f`<span class="missing">––</span>` : f`${this._i18n.one(l.value)}<span class="temperature-unit">${F}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${x("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? g}
            aria-label=${p.humidityLabel(
      t.name,
      d.value === void 0 ? void 0 : this._i18n.percent(Math.round(d.value)),
      this.staleSpoken(d)
    )}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${d.value === void 0 ? f`<span class="missing">––</span>` : this._i18n.percent(Math.round(d.value))}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, i, c, h, o)}
            ${this.renderHvac(t, n, i)}
            ${this.renderTemperatureTrend(t, l, o.temperature)}
            ${this.renderWindow(t, i, _, r)}
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
    const i = t.image;
    return i ? i.kind === "scene" ? f`<div class="scene" aria-hidden="true">${Hn(i.scene)}</div>` : f`<div class="scene photo" aria-hidden="true">
      <img src=${i.url} alt="" loading="lazy" decoding="async" />
    </div>` : g;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, i) {
    const n = t.link;
    if (!n)
      return f`<div class="room-title">${t.name}</div>`;
    const s = `link-description-${i}`;
    return f`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${s}
        @click=${() => this.openLink(n)}
      >
        <span class="room-name">${t.name}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${s}>${n.startsWith("/") ? this._i18n.t.link.page : this._i18n.t.link.web}</span>
    `;
  }
  /**
   * The room link goes through Home Assistant's own action handling (navigate for a path,
   * url for a web address), the same as a tap action of a built-in card.
   */
  openLink(t) {
    const i = t.startsWith("/") ? { action: "navigate", navigation_path: t } : { action: "url", url_path: t };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: { tap_action: i }, action: "tap" },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** The room history period for screen readers: "24 hodin" (after "za"), "the last 24 hours". */
  historyPeriod() {
    return Te((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Te(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === m.alert ? m.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, i, n) {
    return t.value === void 0 || t.stale ? m.label : t.value >= n ? m.alert : t.value >= i ? m.warning : m.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, i, n, s, o) {
    if (!t.hasCo2 && !t.hasPm25)
      return g;
    const { thresholds: r } = t, { t: a } = this._i18n, l = this._config.trends, d = [t.carbon_dioxide, t.pm25].filter(($) => !!$), c = ($, x, _, b, S, E) => {
      if (!x || !_)
        return;
      const w = b.value === void 0 ? void 0 : Se(this._trends[_], lt(l, E));
      return a.airSensor(
        $,
        b.value === void 0 ? void 0 : `${Math.round(b.value)} ${S}`,
        w ? a.trendOver(a.trend[w], this.trendPeriod()) : void 0,
        this.staleSpoken(b)
      );
    }, h = [
      c("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      c("PM2.5", t.hasPm25, t.pm25, s, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = d.length > 1, u = `air-description-${i}`;
    return f`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${d.length === 0}
        aria-haspopup=${p ? "dialog" : g}
        aria-describedby=${u}
        @click=${($) => p ? this.openSheet("air", t, $) : this.showMoreInfo(d[0])}
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
    ) : g}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      De(),
      s,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      o.pm25
    ) : g}
      </button>
      <span class="sr-only" id=${u}>${a.airDescription(t.name, h, p)}</span>
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, i) {
    const { thresholds: n } = t, s = n.stale_minutes, o = [
      { slot: "co2", label: "CO₂", unit: "ppm", present: t.hasCo2, entityId: t.carbon_dioxide, warning: n.co2_warning, critical: n.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", present: t.hasPm25, entityId: t.pm25, warning: n.pm25_warning, critical: n.pm25_critical }
    ].filter((r) => r.present);
    return f`
      <div class="options list-options" role="group" aria-label=${this._i18n.t.air}>
        ${o.map(({ slot: r, label: a, unit: l, entityId: d, warning: c, critical: h }) => {
      const p = this.reading(d, s, i), u = p.value !== void 0, $ = u && !p.stale ? m[r] : m.off;
      return f`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!d}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(d);
      }}
          >
            <span class="option-icon" style=${`color: ${$}`} aria-hidden="true">
              ${r === "co2" ? f`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : De()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">${this._i18n.t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(p, c, h))}`}>
              ${u ? `${Math.round(p.value)} ${l}` : f`<span aria-hidden="true">––</span><span class="sr-only">${this._i18n.t.unknownValue}</span>`}
            </span>
            ${p.stale ? f`<span class="sr-only">${this.staleSpoken(p)}</span>` : g}
          </button>`;
    })}
      </div>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, i, n, s, o, r, a, l) {
    const d = s.value !== void 0, c = Math.round(s.value ?? 0), h = this.airColor(s, r, a), p = m[t];
    return f`
      <div class="air-row slot-${t}" title=${this.staleTitle(s) ?? g}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !s.stale ? p : m.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? f`<span class="row-label" style=${`color: ${h}`}>${c}</span>
                  <span class="row-unit">${o}</span>` : f`<span class="row-label" style=${`color: ${m.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, l, p, s.stale === !0) : g}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, i, n) {
    if (!t.temperature || i.value === void 0)
      return g;
    const s = this.renderSpark(t.temperature, n, m.peach, i.stale === !0);
    if (s === g)
      return g;
    const o = Se(this._trends[t.temperature], lt(this._config.trends, "temperature")), { t: r } = this._i18n;
    return f`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${r.temperatureTrendLabel(
      t.name,
      this.trendPeriod(),
      o ? r.trend[o] : void 0,
      this.historyPeriod()
    )}
        @click=${(a) => this.openSheet("history", t, a)}
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
  renderSpark(t, i, n, s) {
    if (!t)
      return g;
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
    if (!o || !i)
      return g;
    const r = mn(o, i).map(
      (h, p) => h === void 0 ? void 0 : { x: p / Math.max(1, o.length - 1) * 100, y: (1 - h) * 100 }
    ).filter((h) => h !== void 0);
    if (r.length < 2)
      return g;
    const a = r.map((h) => `${h.x.toFixed(2)},${h.y.toFixed(2)}`).join(" "), l = r[0], d = r[r.length - 1], c = `${a} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return f`<span class="spark ${s ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
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
  renderHvac(t, i, n) {
    const { t: s } = this._i18n, o = ae(t, (u) => this.getState(u), this._i18n), r = oe(this.getState(t.air_conditioner), this._i18n), a = (u) => this.renderSystemRow(Yt(o.unknown ? 0 : o.waves, o.unknown), o, u), l = (u) => this.renderSystemRow(Tt(r.mode, r.color, r.unknown), r, u), d = i ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, d), h = d.map((u) => `${s.system[u]} ${Yn(u === "heating" ? o : r, this._i18n)}`).join(", "), p = `hvac-description-${n}`;
    return f`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${p}
        @click=${(u) => c ? this.openSheet(c, t, u) : void 0}
      >
        ${i ? l(!0) : a(!0)}
        ${i ? a(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${p}>${s.hvacDescription(t.name, h, c)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, i) {
    const n = (s) => s === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
    return i.find(n);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, i, n) {
    return f`
      <span
        class="system-row ${n && i.active ? "strong" : ""}"
        style=${`--row-color: ${i.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${i.label}</span>
            ${i.extra ? f`<span class="row-unit">${i.extra}</span>` : g}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, i) {
    const n = this.getState(t), s = n?.state.toLowerCase();
    if (s === void 0 || N(s))
      return { state: "unknown" };
    if (s !== "on")
      return { state: "closed" };
    const o = Date.parse(n?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(o) ? void 0 : Math.max(0, (i - o) / 6e4) };
  }
  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  renderWindow(t, i, n, s) {
    const { t: o } = this._i18n, r = t.windows.map((w) => ({ window: w, ...this.windowState(w.entity, s) })), a = r.filter((w) => w.state === "open"), l = a.length > 0, d = !l && (r.length === 0 || r.some((w) => w.state === "unknown")), c = t.windows.length > 1, h = l ? m.sky : m.label, p = l ? a.length > 1 ? o.window.openCount(a.length) : o.window.open : d ? "––" : o.window.closed, u = a.map((w) => w.minutesOpen).filter((w) => w !== void 0), $ = u.length > 0 ? Math.max(...u) : void 0, x = n.includes("window-heating") ? o.window.conflict.heating : n.includes("window-cooling") ? o.window.conflict.cooling : void 0, _ = `window-description-${i}`, b = $ === void 0 ? void 0 : Wi($, o);
    let S;
    if (!c)
      S = o.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", b);
    else if (l) {
      const w = a.map((C) => this.windowName(t, C.window)).join(", ");
      S = a.length === 1 ? o.window.spokenOneOpen(w, b) : o.window.spokenManyOpen(w, b);
    } else
      S = d ? o.window.spokenUnknown : o.window.spokenAllClosed;
    const E = t.windows[0]?.entity;
    return f`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${h}`}
        ?disabled=${!E}
        aria-haspopup=${c ? "dialog" : g}
        aria-describedby=${_}
        @click=${(w) => c ? this.openSheet("windows", t, w) : this.showMoreInfo(E)}
      >
        <span class="row-main">
          <span class="row-icon">${Ut(d ? m.off : h, d)}</span>
          <span class="row-text">
            <span class="row-label">${p}</span>
            ${x ? f`<span class="conflict-dot" aria-hidden="true"></span>` : g}
            ${$ === void 0 ? g : f`<span class="row-unit window-duration"
                  >${`${x ? "" : `${F}·${F}`}${Me($)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${_}>${o.window.description(t.name, S, x, c)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, i) {
    return i.name ?? this._i18n.t.window.defaultName(t.windows.indexOf(i) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, i) {
    const { t: n } = this._i18n;
    return f`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((s) => {
      const { state: o, minutesOpen: r } = this.windowState(s.entity, i), a = o === "unknown", l = o === "open" ? m.sky : m.label;
      return f`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(s.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Ut(a ? m.off : l, a)}</span>
            <span class="option-text">
              <span>${this.windowName(t, s)}</span>
              <span class="option-hint">${n.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${l}`}>
              ${a ? f`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : o === "open" ? n.window.open : n.window.closed}${r === void 0 ? g : f`<span class="list-extra">${F}·${F}${Me(r)}</span>`}
            </span>
          </button>`;
    })}
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, i) {
    const n = this.getState(i), s = n?.state.toLowerCase(), o = s !== void 0 && !N(s), r = o ? Y(n?.attributes.current_position) : void 0, a = o ? Y(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, d = s === "opening" || s === "closing", { t: c } = this._i18n, h = l ? c.cover.position(Math.round(r), Math.round(a)) : c.cover.unknown;
    return f`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${c.cover.label(t.name, h, d)}
        @click=${() => this.showMoreInfo(i)}
      >
        <svg
          viewBox="0 0 ${Mt} ${Wt}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${Ii(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${c.cover.presets(t.name)}>
        ${t.presets.map((p) => this.renderPreset(t, p, r, a, o))}
      </div>
    `;
  }
  renderPreset(t, i, n, s, o) {
    const r = this._moving[t.name], a = r === i.id, l = r === void 0 && It(n, s, i, this.tolerance()), d = `${t.name}|${i.id}`, { t: c } = this._i18n, h = Ki(i, c);
    return f`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${o ? "" : "unavailable"} ${a ? "pending" : ""}"
        title=${h}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : g}
        aria-disabled=${o ? "false" : "true"}
        aria-label=${c.cover.preset(t.name, h, Vi(i, c), o)}
        @pointerdown=${(p) => this.pressStart(p, t, i, o)}
        @pointerup=${() => this.pressEnd(t, i, o)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(p) => p.preventDefault()}
        @click=${(p) => {
      p.detail === 0 && (o ? this.applyPreset(t, i) : this.showUnavailable(d));
    }}
      >
        ${fn(i.icon)}
        ${this._hint?.key === d ? f`<span class="preset-hint" role="status">${this._hint.text}</span>` : g}
      </button>
    `;
  }
  pressStart(t, i, n, s) {
    t.button !== 0 || !s || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(i, n);
    }, ts));
  }
  pressEnd(t, i, n) {
    const s = `${t.name}|${i.id}`;
    if (!n) {
      this.showUnavailable(s);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const o = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !o || r)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === s && a - this._lastTap.time <= Ve) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, i);
      return;
    }
    this._lastTap = { key: s, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === s && (this._lastTap = void 0, this.showHint(s, this._i18n.t.cover.hint, "selection"));
    }, Ve);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, i, n) {
    this._hint = { key: t, text: i }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, is);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, i) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || N(n)) {
      this.showUnavailable(`${t.name}|${i.id}`);
      return;
    }
    this.startMoving(t, t.cover, i);
    try {
      const [s, o] = this._config.covers.script.split(".");
      await this.hass.callService(s, o, {
        entity: t.cover,
        pos: i.position,
        tilt: i.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${i.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, es);
    } catch (s) {
      console.error("Klima Dashboard: the blind script failed", s), this.endMoving(t.name), this.haptic("failure"), this.showNotice(this._i18n.t.cover.failed(t.name));
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, i, n) {
    const s = this.getState(i);
    if (It(
      Y(s?.attributes.current_position),
      Y(s?.attributes.current_tilt_position),
      n,
      this.tolerance()
    ) && !this.isMoving(i)) {
      this.endMoving(t.name);
      return;
    }
    this._moving = { ...this._moving, [t.name]: n.id }, this._movingWatch.set(t.name, { signature: this.coverSignature(i) }), this.armStall(t.name);
  }
  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  trackMovingPresets() {
    for (const t of this._config?.rooms ?? []) {
      const i = this._moving[t.name], n = t.presets.find((l) => l.id === i), s = this._movingWatch.get(t.name);
      if (!n || !s || !t.cover)
        continue;
      const o = this.getState(t.cover), r = o?.state.toLowerCase();
      if (r === void 0 || N(r) || It(
        Y(o?.attributes.current_position),
        Y(o?.attributes.current_tilt_position),
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
    const i = this._movingWatch.get(t);
    i && (window.clearTimeout(i.timer), i.timer = window.setTimeout(() => this.endMoving(t), (this._config?.covers.stall_seconds ?? 5) * 1e3));
  }
  endMoving(t) {
    if (window.clearTimeout(this._movingWatch.get(t)?.timer), this._movingWatch.delete(t), t in this._moving) {
      const { [t]: i, ...n } = this._moving;
      this._moving = n;
    }
  }
  isMoving(t) {
    const i = this.entityState(t)?.toLowerCase();
    return i === "opening" || i === "closing";
  }
  /** What changes while a blind moves: its state, position and tilt. */
  coverSignature(t) {
    const i = this.getState(t);
    return `${i?.state}|${i?.attributes.current_position}|${i?.attributes.current_tilt_position}`;
  }
  /** Haptic feedback through the Home Assistant app (ignored in a plain browser). */
  haptic(t) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: t, bubbles: !0, composed: !0 }));
  }
  showNotice(t) {
    this._notice = t, window.clearTimeout(this._noticeTimer), this._noticeTimer = window.setTimeout(() => {
      this._notice = void 0;
    }, Qn);
  }
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const i = this._sheet;
    if (!i)
      return g;
    const { t: n } = this._i18n;
    return i.kind === "history" ? this.renderSheetFrame(
      n.sheet.history(this._config?.history.hours ?? 24),
      i.room.name,
      this.renderHistoryBody(i.room),
      "history-sheet"
    ) : i.kind === "air" ? this.renderSheetFrame(n.air, i.room.name, this.renderAirBody(i.room, Date.now())) : i.kind === "windows" ? this.renderSheetFrame(n.window.popup, i.room.name, this.renderWindowsBody(i.room, Date.now())) : this.renderSheetFrame(i.room.name, void 0, this.renderHvacBody(i.room, i.kind, t));
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, i, n, s = "") {
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
                ${i ? f`<div class="sheet-sub">${i}</div>` : g}
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
  renderHvacBody(t, i, n) {
    const s = i === "heating", o = s ? t.heating?.climate : t.air_conditioner, r = this.getState(o), a = r !== void 0 && !N(r.state.toLowerCase()), l = xe(r?.attributes.hvac_modes), d = xe(r?.attributes.preset_modes), c = r?.state.toLowerCase(), h = String(r?.attributes.preset_mode ?? "none").toLowerCase(), p = !a || !o ? [] : s ? this.heatingOptions(o, l, d, c, h) : this.climateOptions(o, l, c), u = !s && a && o ? d.filter((S) => S !== "none") : [], $ = n ? ["climate", "heating"] : ["heating", "climate"], x = !!t.heating?.climate && !!t.air_conditioner, { t: _ } = this._i18n, b = f`
      ${a ? p.length === 0 ? f`<p class="sheet-message">${_.sheet.noModes}</p>` : f`<div class="options" role="group" aria-label=${_.sheet.modes(_.system[i])}>
              ${p.map((S) => this.renderOption(S))}
            </div>` : f`<p class="sheet-message">${_.sheet.entityUnavailable}</p>`}
      ${u.length > 0 ? f`<div class="sheet-label" id="preset-label">${_.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${u.map((S) => this.renderPresetChip(o, S, h, c, d))}
            </div>` : g}
      ${this._sheetError ? f`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : g}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!o}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(o);
    }}
      >
        ${_.detailsAndHistory}
      </button>
    `;
    return x ? f`
      <div
        class="segmented"
        role="tablist"
        aria-label=${_.sheet.systems}
        @keydown=${(S) => this.segmentKeydown(S, $, i)}
      >
        ${$.map(
      (S) => f`<button
            type="button"
            role="tab"
            id=${`tab-${S}`}
            class="plain-button segment"
            data-system=${S}
            aria-selected=${S === i ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${S === i ? "0" : "-1"}
            @click=${() => this.switchSheet(S)}
          >
            ${_.system[S]}
          </button>`
    )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${i}`}>${b}</div>
    ` : f`<div class="sheet-label system-name">${_.system[i]}</div>${b}`;
  }
  segmentKeydown(t, i, n) {
    const s = i.indexOf(n);
    let o;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? o = i[(s + 1) % i.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? o = i[(s - 1 + i.length) % i.length] : t.key === "Home" ? o = i[0] : t.key === "End" && (o = i[i.length - 1]), o && (t.preventDefault(), this._focusSegment = o, o === n ? this.requestUpdate() : this.switchSheet(o));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    const i = this._config?.history.hours ?? 24, { t: n } = this._i18n;
    let s;
    const o = this._historyModel;
    this._historyStatus === "loading" ? s = f`<p class="sheet-message">${n.sheet.loading}</p>` : this._historyStatus === "error" || !o ? s = f`<p class="sheet-message error" role="alert">${n.sheet.historyFailed}</p>` : Tn(o) ? s = f`<div
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
        ${Nn(o, this.chartWidth(), this._scrubTime, this._i18n)}
      </div>` : s = f`<p class="sheet-message">${n.sheet.noHistory(i)}</p>`;
    const r = t.temperature ?? t.humidity;
    return f`
      ${s}
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
          ${t.unsupported ? f`<span class="option-hint">${t.unsupported}</span>` : g}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, i, n, s, o) {
    const r = n === i && s !== "off", a = r && o.includes("none") ? "none" : i;
    return f`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${ei(i)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, i, n, s, o) {
    const r = [], a = this._i18n.t.heatingMode, l = (d, c, h, p, u, $) => {
      r.push({ id: d, label: c, icon: gn(d), color: h, active: p, run: u, unsupported: $ });
    };
    if (i.includes("off") && l("off", a.off, m.off, s === "off", () => this.setHvacMode(t, "off")), i.includes("auto") && l("auto", a.schedule, m.plan, s === "auto", () => this.setHvacMode(t, "auto")), i.includes("heat") && l(
      "heat",
      a.manual,
      m.warning,
      s === "heat" && o !== "boost",
      () => this.setHvacMode(t, "heat")
    ), r.length > 0) {
      const d = n.includes("boost");
      l(
        "boost",
        a.boost,
        m.alert,
        d && o === "boost" && s !== "off",
        () => this.setPresetMode(t, "boost"),
        d ? void 0 : this._i18n.t.sheet.notOffered
      );
    }
    return r;
  }
  climateOptions(t, i, n) {
    return rs.filter((s) => i.includes(s)).map((s) => {
      const o = ii(s), r = Lt[o];
      return {
        id: s,
        label: this._i18n.t.climateMode[o],
        icon: Tt(o, r, !1),
        color: r,
        active: n === s,
        run: () => this.setHvacMode(t, s)
      };
    });
  }
  setHvacMode(t, i) {
    return this.callClimate("set_hvac_mode", { entity_id: t, hvac_mode: i });
  }
  setPresetMode(t, i) {
    return this.callClimate("set_preset_mode", { entity_id: t, preset_mode: i });
  }
  async callClimate(t, i) {
    if (!this.hass)
      throw new Error("Home Assistant is not connected.");
    await this.hass.callService("climate", t, i);
  }
  async runSheetAction(t) {
    this._sheetError = void 0;
    try {
      await t();
    } catch (i) {
      console.error("Klima Dashboard: the climate command failed", i), this._sheetError = this._i18n.t.sheet.commandFailed;
    }
  }
  openSheet(t, i, n) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._sheet = { kind: t, room: i }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(i));
  }
  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  switchSheet(t) {
    this._sheet && this._sheet.kind !== t && (this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room });
  }
  closeSheet(t = !0) {
    window.removeEventListener("resize", this.handleResize), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
  }
  async loadRoomHistory(t) {
    const i = ++this._historyRequest;
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
    ].filter((a) => !!a), s = this._config.history, o = Date.now(), r = o - s.hours * zt;
    try {
      const a = await ze(this.hass, n, r, o);
      if (i !== this._historyRequest)
        return;
      this._historyModel = Mn(a, t, { startMs: r, endMs: o }, s), this._historyStatus = "ready";
    } catch (a) {
      console.error("Klima Dashboard: loading the room history failed", a), i === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = ji(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: i, samples: n } = this._config.trends, s = Date.now(), o = s - i * 6e4;
    try {
      const r = await ze(this.hass, t, o, s), a = {};
      for (const l of t)
        a[l] = un(r[l], o, s, n);
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
    const i = qi(this._config), n = await Promise.allSettled(
      i.map(
        (o) => t.callApi("GET", `states/${o}`)
      )
    ), s = {};
    n.forEach((o, r) => {
      if (o.status === "fulfilled") {
        const a = Date.parse(o.value?.last_reported ?? o.value?.last_updated ?? "");
        Number.isFinite(a) && (s[i[r]] = a);
      }
    }), this._reported = s;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, i, n) {
    const s = this.numberState(t);
    if (s === void 0 || !t)
      return {};
    const o = this._reported[t];
    if (o === void 0)
      return { value: s };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), a = Math.max(o, Number.isFinite(r) ? r : 0), l = Math.max(0, (n - a) / 6e4);
    return { value: s, ageMinutes: l, stale: l > i };
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(si(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const i = this.staleTitle(t);
    return i ? `, ${i.toLowerCase()}` : "";
  }
  numberState(t) {
    const i = this.entityState(t);
    if (i === void 0 || N(i.toLowerCase()))
      return;
    const n = Number.parseFloat(i);
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
le.styles = Kn;
let M = le;
T([
  A()
], M.prototype, "_config");
T([
  Qe({ attribute: !1 })
], M.prototype, "hass");
T([
  A()
], M.prototype, "_sheet");
T([
  A()
], M.prototype, "_sheetError");
T([
  A()
], M.prototype, "_historyStatus");
T([
  A()
], M.prototype, "_historyModel");
T([
  A()
], M.prototype, "_scrubTime");
T([
  A()
], M.prototype, "_dragY");
T([
  A()
], M.prototype, "_flash");
T([
  A()
], M.prototype, "_moving");
T([
  A()
], M.prototype, "_prefersDark");
T([
  A()
], M.prototype, "_hint");
T([
  A()
], M.prototype, "_trends");
T([
  A()
], M.prototype, "_trendsLoaded");
T([
  A()
], M.prototype, "_reported");
T([
  A()
], M.prototype, "_notice");
T([
  A()
], M.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", M);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Xt(Bn()).t.cardDescription,
  preview: !1
});
