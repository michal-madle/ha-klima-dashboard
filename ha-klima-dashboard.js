const ue = globalThis, Xe = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ze = /* @__PURE__ */ Symbol(), yi = /* @__PURE__ */ new WeakMap();
let sn = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Ze) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Xe && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = yi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && yi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Un = (e) => new sn(typeof e == "string" ? e : e + "", void 0, Ze), Nt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new sn(i, e, Ze);
}, Bn = (e, t) => {
  if (Xe) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = ue.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, xi = Xe ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Un(i);
})(e) : e;
const { is: Vn, defineProperty: Wn, getOwnPropertyDescriptor: qn, getOwnPropertyNames: Kn, getOwnPropertySymbols: Yn, getPrototypeOf: Gn } = Object, xe = globalThis, ki = xe.trustedTypes, Xn = ki ? ki.emptyScript : "", Zn = xe.reactiveElementPolyfillSupport, qt = (e, t) => e, ve = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Xn : null;
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
} }, Je = (e, t) => !Vn(e, t), _i = { attribute: !0, type: String, converter: ve, reflect: !1, useDefault: !1, hasChanged: Je };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), xe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Lt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = _i) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Wn(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = qn(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const r = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _i;
  }
  static _$Ei() {
    if (this.hasOwnProperty(qt("elementProperties"))) return;
    const t = Gn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(qt("properties"))) {
      const i = this.properties, n = [...Kn(i), ...Yn(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(xi(o));
    } else t !== void 0 && i.push(xi(t));
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
    return Bn(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : ve).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ve;
      this._$Em = o;
      const r = a.fromAttribute(i, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Je)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: a } = s, r = this[o];
        a !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
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
Lt.elementStyles = [], Lt.shadowRootOptions = { mode: "open" }, Lt[qt("elementProperties")] = /* @__PURE__ */ new Map(), Lt[qt("finalized")] = /* @__PURE__ */ new Map(), Zn?.({ ReactiveElement: Lt }), (xe.reactiveElementVersions ??= []).push("2.1.2");
const Qe = globalThis, Si = (e) => e, be = Qe.trustedTypes, Mi = be ? be.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, an = "$lit$", ft = `lit$${Math.random().toFixed(9).slice(2)}$`, rn = "?" + ft, Jn = `<${rn}>`, _t = document, Kt = () => _t.createComment(""), Yt = (e) => e === null || typeof e != "object" && typeof e != "function", ti = Array.isArray, Qn = (e) => ti(e) || typeof e?.[Symbol.iterator] == "function", Ce = `[ 	
\f\r]`, It = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ti = /-->/g, Ci = />/g, wt = RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ei = /'/g, Ai = /"/g, ln = /^(?:script|style|textarea|title)$/i, dn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = dn(1), y = dn(2), Pt = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Oi = /* @__PURE__ */ new WeakMap(), kt = _t.createTreeWalker(_t, 129);
function hn(e, t) {
  if (!ti(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mi !== void 0 ? Mi.createHTML(t) : t;
}
const to = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = It;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let d, h, p = -1, c = 0;
    for (; c < l.length && (a.lastIndex = c, h = a.exec(l), h !== null); ) c = a.lastIndex, a === It ? h[1] === "!--" ? a = Ti : h[1] !== void 0 ? a = Ci : h[2] !== void 0 ? (ln.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = wt) : h[3] !== void 0 && (a = wt) : a === wt ? h[0] === ">" ? (a = o ?? It, p = -1) : h[1] === void 0 ? p = -2 : (p = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? wt : h[3] === '"' ? Ai : Ei) : a === Ai || a === Ei ? a = wt : a === Ti || a === Ci ? a = It : (a = wt, o = void 0);
    const g = a === wt && e[r + 1].startsWith("/>") ? " " : "";
    s += a === It ? l + Jn : p >= 0 ? (n.push(d), l.slice(0, p) + an + l.slice(p) + ft + g) : l + ft + (p === -2 ? r : g);
  }
  return [hn(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Gt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, h] = to(t, i);
    if (this.el = Gt.createElement(d, n), kt.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = kt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(an)) {
          const c = h[a++], g = o.getAttribute(p).split(ft), b = /([.?@])?(.*)/.exec(c);
          l.push({ type: 1, index: s, name: b[2], strings: g, ctor: b[1] === "." ? io : b[1] === "?" ? no : b[1] === "@" ? oo : ke }), o.removeAttribute(p);
        } else p.startsWith(ft) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (ln.test(o.tagName)) {
          const p = o.textContent.split(ft), c = p.length - 1;
          if (c > 0) {
            o.textContent = be ? be.emptyScript : "";
            for (let g = 0; g < c; g++) o.append(p[g], Kt()), kt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[c], Kt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === rn) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(ft, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += ft.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = _t.createElement("template");
    return n.innerHTML = t, n;
  }
}
function zt(e, t, i = e, n) {
  if (t === Pt) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Yt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = zt(e, o._$AS(e, t.values), o, n)), t;
}
class eo {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? _t).importNode(i, !0);
    kt.currentNode = o;
    let s = kt.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ee(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new so(s, this, t)), this._$AV.push(d), l = n[++r];
      }
      a !== l?.index && (s = kt.nextNode(), a++);
    }
    return kt.currentNode = _t, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ee {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = zt(this, t, i), Yt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== Pt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && Yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_t.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Gt.createElement(hn(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new eo(o, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Oi.get(t.strings);
    return i === void 0 && Oi.set(t.strings, i = new Gt(t)), i;
  }
  k(t) {
    ti(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new ee(this.O(Kt()), this.O(Kt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Si(t).nextSibling;
      Si(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ke {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = zt(this, t, i, 0), a = !Yt(t) || t !== this._$AH && t !== Pt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = zt(this, r[n + l], i, l), d === Pt && (d = this._$AH[l]), a ||= !Yt(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class io extends ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class no extends ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class oo extends ke {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = zt(this, t, i, 0) ?? m) === Pt) return;
    const n = this._$AH, o = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class so {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    zt(this, t);
  }
}
const ao = Qe.litHtmlPolyfillSupport;
ao?.(Gt, ee), (Qe.litHtmlVersions ??= []).push("3.3.3");
const ro = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new ee(t.insertBefore(Kt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const ei = globalThis;
class ht extends Lt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ro(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Pt;
  }
}
ht._$litElement$ = !0, ht.finalized = !0, ei.litElementHydrateSupport?.({ LitElement: ht });
const lo = ei.litElementPolyfillSupport;
lo?.({ LitElement: ht });
(ei.litElementVersions ??= []).push("4.2.2");
const ho = { attribute: !0, type: String, converter: ve, reflect: !1, hasChanged: Je }, co = (e = ho, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function L(e) {
  return (t, i) => typeof i == "object" ? co(e, t, i) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function F(e) {
  return L({ ...e, state: !0, attribute: !1 });
}
var po = Object.defineProperty, Rt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && po(t, i, o), o;
};
const ri = class ri extends ht {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: i } = this, n = (t - i) / 2, o = 2 * Math.PI * n, s = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return u`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${a} cy=${a} r=${n} fill="none" stroke-width=${i}></circle>
        <circle
          class="fill"
          cx=${a}
          cy=${a}
          r=${n}
          fill="none"
          stroke-width=${i}
          stroke-linecap="round"
          stroke-dasharray="${(o * s).toFixed(1)} ${o.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? u`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? u`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
ri.styles = Nt`
    :host {
      display: inline-block;
      position: relative;
      flex: none;
      line-height: 0;
    }
    .ring {
      position: relative;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .track {
      stroke: var(--hdk-ring-track, rgb(118 118 128 / 24%));
    }
    .fill {
      stroke: var(--hdk-ring-fill, var(--hdk-accent, #0a84ff));
    }
    .num,
    .unit {
      position: absolute;
      inset: 50% 0 auto;
      text-align: center;
    }
    .num {
      transform: translateY(-50%);
      color: var(--hdk-ring-text, currentColor);
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    /* With a unit the number rises a little to make room for it under the number. */
    .num.with-unit {
      transform: translateY(-62%);
    }
    .unit {
      margin-top: 8px;
      color: var(--hdk-ring-sub, var(--hdk-secondary, #98989f));
      font-size: 10px;
      line-height: 1;
    }
  `;
let ct = ri;
Rt([
  L({ type: Number })
], ct.prototype, "fraction");
Rt([
  L({ type: Number })
], ct.prototype, "size");
Rt([
  L({ type: Number })
], ct.prototype, "stroke");
Rt([
  L()
], ct.prototype, "num");
Rt([
  L()
], ct.prototype, "unit");
Rt([
  L()
], ct.prototype, "label");
class ii {
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
  tap(t, i) {
    window.clearTimeout(this.timer);
    const n = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !n || o ? "none" : this.last && this.last.key === t && i - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: i }, "single");
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
class cn {
  constructor(t) {
    this.host = t, this.nudge = !1, this.hint = !1;
  }
  show(t) {
    this.nudge = !0, this.hint = !0, window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudgeTimer = window.setTimeout(() => {
      this.nudge = !1, this.host.requestUpdate();
    }, 450), this.hintTimer = window.setTimeout(() => {
      this.hint = !1, this.host.requestUpdate();
    }, t * 1e3), this.host.requestUpdate();
  }
  hide() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudge = !1, this.hint = !1, this.host.requestUpdate();
  }
  dispose() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer);
  }
}
const pn = Nt`
  .hint {
    position: absolute;
    z-index: 6;
    right: 0;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--hdk-bubble, #3a3a3c);
    color: var(--hdk-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    width: max-content;
    max-width: 240px;
    pointer-events: none;
    animation: hint-in 0.18s ease-out;
  }
  .hint.below {
    top: calc(100% + 10px);
  }
  .hint.above {
    bottom: calc(100% + 4px);
  }
  .hint.center {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    animation-name: hint-in-center;
  }
  .hint i {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--hdk-bubble, #3a3a3c);
    transform: rotate(45deg);
  }
  .hint.below i {
    top: -5px;
  }
  .hint.above i {
    bottom: -5px;
  }
  .hint.end i {
    right: var(--arrow, 25px);
  }
  .hint.center i {
    left: 50%;
    margin-left: -5px;
  }
  @keyframes hint-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hint-in-center {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hint {
      animation: none;
    }
  }
`;
var uo = Object.defineProperty, it = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && uo(t, i, o), o;
};
const li = class li extends ht {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new cn(this), this.nudgeIndex = 0, this.gesture = new ii(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), i = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? i[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : s;
    return u`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${a}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(r) => this.guarded && r.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (r, l) => u`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === n ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? u`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, i, n) {
    if (this.disabled || i === this.value) return;
    if (!this.guarded) {
      this.select(i);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(i);
      return;
    }
    const o = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || o === "none") {
      this.swallowClick = !1;
      return;
    }
    o === "double" ? this.select(i) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const i = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (i.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), s = o ? Number(o.dataset.index) : -1, a = s >= 0 && s !== n && !this.options[s]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[s].value));
    });
  }
  onMove(t) {
    const i = this.drag;
    if (!i || i.id !== t.pointerId) return;
    const n = t.clientX - i.x;
    if (!i.moved && Math.abs(n) < 6) return;
    i.moved || (i.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const o = this.options.length - 1;
    this._dx = Math.max(-i.index * i.width, Math.min((o - i.index) * i.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const i = this.drag;
    if (this.gesture.release(), !i || i.id !== t.pointerId || (this.drag = void 0, !i.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, i.index + Math.round(this._dx / i.width)));
    this._dx = 0, this._dragging = !1;
    const o = this.options[n];
    o && !o.disabled && n !== i.index && this.select(o.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const n = this.options.filter((r) => !r.disabled);
    if (!n.length) return;
    const o = n.findIndex((r) => r.value === this.value), s = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = n[(o + s + n.length) % n.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
li.styles = [
  pn,
  Nt`
      :host {
        position: relative;
        display: block;
      }
      .track {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--n), minmax(0, 1fr));
        box-sizing: border-box;
        min-height: 48px;
        padding: 3px;
        border-radius: 999px;
        background: var(--hdk-track, #2c2c2e);
        user-select: none;
        -webkit-user-select: none;
      }
      .track.guarded {
        touch-action: pan-y;
      }
      .track.compact {
        min-height: 40px;
        background: var(--hdk-track-compact, #3a3a3c);
      }
      .track.tall {
        min-height: 66px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 3px;
        width: calc((100% - 6px) / var(--n));
        box-sizing: border-box;
        border-radius: 999px;
        background: var(--hdk-seg-thumb, #fff);
        box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
        transform: translateX(calc(var(--i) * 100% + var(--dx, 0px)));
        transition: transform 0.28s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      .track.dragging .thumb {
        transition: none;
      }
      .thumb[hidden] {
        display: none;
      }
      button {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 44px;
        padding: 0 8px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hdk-seg-text, #ebebf5);
        font: inherit;
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
        transition: color 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
      }
      .track.compact button {
        min-height: 34px;
        padding: 0 2px;
        font-size: 14px;
        line-height: 20px;
      }
      .track.guarded button {
        touch-action: pan-y;
      }
      button .detail {
        font-size: 13px;
        line-height: 18px;
      }
      button[aria-checked="true"] {
        color: var(--hdk-seg-selected, #000);
        font-weight: 600;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: -3px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.5;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        .thumb,
        button {
          transition: none;
        }
      }
    `
];
let W = li;
it([
  L({ attribute: !1 })
], W.prototype, "options");
it([
  L()
], W.prototype, "value");
it([
  L()
], W.prototype, "label");
it([
  L({ type: Boolean })
], W.prototype, "disabled");
it([
  L({ type: Boolean })
], W.prototype, "compact");
it([
  L({ type: Boolean })
], W.prototype, "guarded");
it([
  L({ type: Number })
], W.prototype, "holdMs");
it([
  L({ type: Number })
], W.prototype, "doubleTapMs");
it([
  L({ type: Number })
], W.prototype, "hintSeconds");
it([
  L()
], W.prototype, "hint");
it([
  F()
], W.prototype, "_dx");
it([
  F()
], W.prototype, "_dragging");
var mo = Object.defineProperty, st = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && mo(t, i, o), o;
};
const di = class di extends ht {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, i = this.max - this.min || 1, o = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / i))})`, s = this.tickStep || this.step || 1, a = Math.floor(i / s + 1e-9) + 1, r = a >= 2 && a <= 40 ? Array.from({ length: a }, (l, d) => u`<i style="left:${(d * s / i * 100).toFixed(2)}%"></i>`) : [];
    return u`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${o}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${r}</div>
      </div>
      ${this.minLabel || this.maxLabel ? u`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const i = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: i }, bubbles: !0, composed: !0 }));
  }
};
di.styles = Nt`
    :host {
      display: block;
    }
    .wrap {
      position: relative;
      height: 52px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 52px;
      margin: 0;
      padding: 0 14px;
      border-radius: 26px;
      background: var(--hdk-track, #2c2c2e);
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, var(--hdk-accent, #0a84ff) 0%, var(--hdk-accent, #0a84ff) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) 100%);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      margin-top: -9px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-bar, rgb(255 255 255 / 14%));
    }
    input::-moz-range-progress {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-accent, #0a84ff);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: 2px;
    }
    /* Ticks at the steps, between the thumb centres at both ends. */
    .ticks {
      position: absolute;
      left: 33px;
      right: 33px;
      bottom: 7px;
      height: 5px;
      pointer-events: none;
    }
    .ticks i {
      position: absolute;
      top: 0;
      margin-left: -1px;
      width: 2px;
      height: 5px;
      border-radius: 1px;
      background: var(--hdk-tick, rgb(255 255 255 / 28%));
    }
    .ends {
      display: flex;
      justify-content: space-between;
      padding: 4px 14px 0;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      line-height: 18px;
    }
  `;
let G = di;
st([
  L({ type: Number })
], G.prototype, "min");
st([
  L({ type: Number })
], G.prototype, "max");
st([
  L({ type: Number })
], G.prototype, "step");
st([
  L({ type: Number })
], G.prototype, "tickStep");
st([
  L({ type: Number })
], G.prototype, "value");
st([
  L()
], G.prototype, "label");
st([
  L()
], G.prototype, "valueText");
st([
  L()
], G.prototype, "minLabel");
st([
  L()
], G.prototype, "maxLabel");
st([
  L({ type: Boolean })
], G.prototype, "disabled");
st([
  F()
], G.prototype, "_drag");
var fo = Object.defineProperty, pt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && fo(t, i, o), o;
};
const hi = class hi extends ht {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new cn(this), this.gesture = new ii(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return u`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(t) => this.guarded && t.preventDefault()}
      ><span class="thumb"></span></button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  emit() {
    this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.guarded || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.guarded) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const i = this.gesture.tap("switch", t.timeStamp);
    i === "double" ? this.emit() : i === "single" && this.hints.show(this.hintSeconds);
  }
};
hi.styles = [
  pn,
  Nt`
      :host {
        position: relative;
        display: inline-block;
        flex: none;
      }
      button {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 60px;
        height: 32px;
        padding: 0;
        border: 0;
        border-radius: 16px;
        background: var(--hdk-switch-off, rgb(120 120 128 / 36%));
        cursor: pointer;
        transition: background 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      button[aria-checked="true"] {
        background: var(--hdk-accent, #0a84ff);
      }
      /* Invisible extension of the touch target to 44 px. */
      button::after {
        content: "";
        position: absolute;
        inset: -6px -4px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 40px;
        height: 26px;
        box-sizing: border-box;
        border-radius: 13px;
        background: #fff;
        box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
        transition: left 0.25s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      button[aria-checked="true"] .thumb {
        left: 17px;
      }
      /* One tap on a protected switch: the thumb moves toward the new position and back. */
      button.nudge[aria-checked="false"] .thumb {
        left: 9px;
      }
      button.nudge[aria-checked="true"] .thumb {
        left: 11px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 3px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
        button.nudge[aria-checked="false"] .thumb {
          left: 3px;
        }
        button.nudge[aria-checked="true"] .thumb {
          left: 17px;
        }
      }
    `
];
let et = hi;
pt([
  L({ type: Boolean })
], et.prototype, "checked");
pt([
  L({ type: Boolean })
], et.prototype, "disabled");
pt([
  L()
], et.prototype, "label");
pt([
  L({ type: Boolean })
], et.prototype, "guarded");
pt([
  L({ type: Number })
], et.prototype, "holdMs");
pt([
  L({ type: Number })
], et.prototype, "doubleTapMs");
pt([
  L({ type: Number })
], et.prototype, "hintSeconds");
pt([
  L()
], et.prototype, "hintPlacement");
pt([
  L()
], et.prototype, "hint");
function go(e) {
  const t = [
    [`${e}-switch`, et],
    [`${e}-segmented`, W],
    [`${e}-slider`, G],
    [`${e}-ring`, ct]
  ];
  for (const [i, n] of t)
    customElements.get(i) || customElements.define(i, n);
}
const me = 60, Fe = 142, Li = 11, ne = 3, vo = 0.8, Pi = 2, bo = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", wo = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", $o = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function yo(e, t) {
  if (e === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${me - 1.5}
      height=${Fe - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const i = Fe - ne - 1, n = i / Li, o = n - vo, s = o - t / 100 * (o - Pi), a = ne + 1 + (100 - e) / 100 * i, r = Array.from({ length: Li }, (l, d) => {
    const h = ne + 1 + d * n + n / 2, p = h <= a, c = p ? s : Pi;
    return y`<rect
      x="0"
      y=${(h - c / 2).toFixed(2)}
      width=${me}
      height=${c.toFixed(2)}
      rx=${Math.min(1.5, c / 2).toFixed(2)}
      style=${p ? bo : wo}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${me}
      height=${ne}
      rx="1.5"
      style=${$o}
    ></rect>${r}`;
}
const xo = ["cs", "en", "sv"];
class un extends Error {
}
function O(e) {
  throw new un(e);
}
function ko(e, t) {
  try {
    return t();
  } catch (i) {
    throw i instanceof un ? new Error(`${e}: ${i.message}`) : i;
  }
}
function St(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ut(e, t) {
  return e == null ? {} : (St(e) || O(`"${t}" must be a mapping of keys.`), e);
}
function Mt(e, t, i) {
  for (const n of Object.keys(e))
    t.includes(n) || O(`${i}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function _o(e, t, i = {}) {
  if (e == null)
    return;
  const n = typeof e == "string" ? e.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || O(`${t} must be an entity ID such as ${i.example ?? `${i.domain ?? "sensor"}.example`}.`), i.domain && !n.startsWith(`${i.domain}.`) && O(`${t} must be a ${i.domain} entity (${i.domain}.…), not ${n}.`), n;
}
function je(e, t) {
  if (e != null)
    return (typeof e != "string" || !e.trim()) && O(`${t} must be a non-empty text.`), e.trim();
}
function Xt(e, t) {
  if (e != null) {
    if (typeof e == "string" && e.trim())
      return e.trim();
    if (St(e) && Object.keys(e).length > 0) {
      const i = Object.entries(e);
      if (i.every(([n, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof o == "string" && o.trim()))
        return Object.fromEntries(i.map(([n, o]) => [n, o.trim()]));
    }
    return O(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Zt(e, t) {
  if (e === void 0 || typeof e == "string")
    return e;
  const i = t.toLowerCase();
  return e[i] ?? e[i.split("-")[0]] ?? e.en ?? Object.values(e)[0];
}
function mn(e) {
  return e === void 0 ? [] : typeof e == "string" ? [e] : Object.values(e);
}
const zi = ["auto", ...xo];
function So(e) {
  const t = e ?? "auto";
  return zi.includes(t) || O(`language must be one of ${zi.join(", ")}.`), t;
}
const Ee = ["bedroom", "office", "kids", "living"], Ae = "none", Ue = ["open", "shade", "dark"], Mo = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function To(e) {
  return Mo.has(e);
}
function Ht(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
const fn = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function Oe(e, t, i, n) {
  return e !== void 0 && t !== void 0 && Math.abs(e - i.position) <= n && Math.abs(t - i.tilt) <= n;
}
function Ft(e, t) {
  return t === "temperature" ? e.temperature_step : t === "co2" ? e.co2_step : e.pm25_step;
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
}, Jt = {
  off: f.off,
  cool: f.cool,
  wind_free: f.cool,
  dry: f.dry,
  fan: f.plan,
  heat: f.heat,
  auto: f.auto,
  unknown: f.off
}, Co = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function fe(e) {
  const t = Co[e];
  if (t)
    return t;
  const i = e.replace(/_/g, " ");
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Eo(e) {
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
function Ni(e, t, i, n, o) {
  const { thresholds: s } = n, a = [
    [o.required.temperature, e.temperature],
    [o.required.humidity, e.humidity],
    ...n.hasCo2 ? [[o.required.co2, e.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, e.pm25]] : [],
    [o.required.houseMode, i ? { value: 1 } : void 0]
  ];
  for (const [g, b] of a) {
    if (b?.value === void 0)
      return { id: "noData", label: o.noData(g), color: f.label, kind: "unknown" };
    if (b.stale) {
      const k = b.ageMinutes === void 0 ? void 0 : vn(b.ageMinutes);
      return { id: "noData", label: o.noData(g, k), color: f.label, kind: "unknown" };
    }
  }
  const r = e.temperature.value, l = e.humidity.value, d = n.hasCo2 ? e.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? e.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: f.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: f.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: f.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: f.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: f.warning, kind: "warning", cause: "humidity" };
  const p = t ? s.summer_min : s.winter_min, c = t ? s.summer_max : s.winter_max;
  return r > c ? { id: "warm", label: o.status.warm, color: f.warning, kind: "warning", cause: "temperature" } : r < p ? { id: "cold", label: o.status.cold, color: f.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: f.label, kind: "normal" };
}
function tt(e) {
  return To(e) || e === "none";
}
function yt(e) {
  if (e == null || e === "")
    return;
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function gn(e, t) {
  return e === void 0 || e <= 0 ? 0 : e >= t.heating_waves_3 ? 3 : e >= t.heating_waves_2 ? 2 : 1;
}
function Ao(e) {
  const t = /* @__PURE__ */ new Set(), i = (n) => {
    n && t.add(n);
  };
  i(e.houseModeEntity), i(e.ventilationEntity), i(e.ventilationTimerEntity), i(e.outside?.temperature), i(e.outside?.minimum), i(e.outside?.maximum), i(e.outside?.rain_probability), i(e.outside?.pm25);
  for (const n of e.rooms)
    i(n.temperature), i(n.humidity), i(n.carbon_dioxide), i(n.pm25), n.windows.forEach((o) => i(o.entity)), i(n.cover), i(n.heating?.climate), i(n.heating?.overlay), i(n.heating?.target), i(n.heating?.intensity), i(n.air_conditioner);
  return t;
}
function Oo(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
function Lo(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  const i = Object.keys(e), n = Object.keys(t);
  return i.length === n.length && i.every((o) => Object.hasOwn(t, o) && e[o] === t[o]);
}
function vn(e) {
  return e < 60 ? `${Math.max(1, Math.round(e))} min` : e < 2880 ? `${Math.floor(e / 60)} h` : `${Math.floor(e / 1440)} d`;
}
function Ri(e, t) {
  const i = (e ?? []).filter((o) => o !== void 0);
  if (i.length < 2)
    return;
  const n = i[i.length - 1] - i[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function Le(e) {
  const t = Math.max(0, Math.floor(e));
  if (t < 1)
    return "< 1 min";
  if (t < 60)
    return `${t} min`;
  if (t < 1440) {
    const [o, s] = [Math.floor(t / 60), t % 60];
    return s === 0 ? `${o} h` : `${o} h ${s} min`;
  }
  const [i, n] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return n === 0 ? `${i} d` : `${i} d ${n} h`;
}
function Di(e, t) {
  const i = Math.max(0, Math.floor(e));
  if (i < 1)
    return t.duration.lessThanMinute;
  if (i < 60)
    return t.duration.minute(i);
  if (i < 1440) {
    const [a, r] = [Math.floor(i / 60), i % 60], l = t.duration.hour(a);
    return r === 0 ? l : `${l} ${t.duration.minute(r)}`;
  }
  const [n, o] = [Math.floor(i / 1440), Math.floor(i % 1440 / 60)], s = t.duration.day(n);
  return o === 0 ? s : `${s} ${t.duration.hour(o)}`;
}
function Ii(e, t) {
  const i = Math.max(1, Math.round(e));
  return i % 60 === 0 ? t.period.hour(i / 60) : t.period.minute(i);
}
function bn(e, t) {
  return Zt(e.label, t) ?? e.name;
}
function Po(e, t, i) {
  return Zt(e.label, i) ?? t.cover.presetName[e.icon];
}
function Hi(e, t, i) {
  if (e.description !== void 0)
    return Zt(e.description, i) ?? "";
  const n = fn[e.icon];
  return e.label === void 0 && n.position === e.position && n.tilt === e.tilt ? t.cover.presetDescription[e.icon] : t.cover.position(Math.round(e.position), Math.round(e.tilt));
}
function zo(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.humidity, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
const No = "input_select.house_mode", Ro = 500, Do = 420, Io = 25, Ho = {
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
}, Fo = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, jo = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Pe = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Uo = Ue.map((e) => ({ icon: e, ...fn[e] })), Fi = { winter: "Zima", summer: "Léto" }, ji = ["auto", "dark", "light"], Ui = 3, Bo = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Vo = [
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
], Wo = ["climate", "overlay", "target", "intensity"], Bi = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], qo = ["name", "position", "tilt", "icon", "description"], Ko = ["entity", "name"];
function gt(e) {
  return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function V(e, t) {
  return _o(e, t, { example: "sensor.loznice_teplota" });
}
function Bt(e, t, i, n = {}) {
  Mt(e, Object.keys(t), i);
  const o = { ...t };
  for (const [s, a] of Object.entries(e)) {
    if (a === null)
      continue;
    (typeof a != "number" || !Number.isFinite(a)) && O(`${i}.${s} must be a number.`);
    const r = n[s];
    if (r) {
      const [l, d, h] = r;
      (a < l || a > d || h && !Number.isInteger(a)) && O(`${i}.${s} must be ${h ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = a;
  }
  return o;
}
function wn(e, t) {
  const i = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of i)
    (s ? e[n] >= e[o] : e[n] > e[o]) && O(`${t}: ${n} (${e[n]}) must be ${s ? "below" : "at most"} ${o} (${e[o]}).`);
  e.stale_minutes <= 0 && O(`${t}.stale_minutes must be greater than 0.`), (e.heating_waves_2 < 1 || e.heating_waves_3 > 100) && O(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Yo(e, t) {
  return e > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function Be(e, t) {
  return (!Array.isArray(e) || e.length === 0 || e.length > Ui) && O(`${t} must be a list of 1 to ${Ui} presets.`), e.map((i, n) => {
    const o = `${t}[${n + 1}]`;
    St(i) || O(`${o} must have a position and a tilt.`), Mt(i, qo, o);
    const s = Xt(i.name, `${o}.name`), a = (p) => {
      const c = i[p];
      return (typeof c != "number" || !Number.isFinite(c) || c < 0 || c > 100) && O(`${o}.${p} must be a number from 0 to 100.`), c;
    }, r = a("position"), l = a("tilt");
    let d = Yo(r, l);
    i.icon != null && (Ue.includes(i.icon) || O(`${o}.icon must be one of ${Ue.join(", ")}.`), d = i.icon);
    const h = Xt(i.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: h, position: r, tilt: l };
  });
}
function Go(e, t) {
  const i = e.window;
  if (i == null)
    return [];
  const n = Array.isArray(i) ? i : [i];
  n.length === 0 && O(`${t}.window must not be an empty list.`);
  const o = n.map((a, r) => {
    const l = `${t}.window${Array.isArray(i) ? `[${r + 1}]` : ""}`;
    if (St(a)) {
      Mt(a, Ko, l);
      const h = V(a.entity, `${l}.entity`);
      return h || O(`${l}.entity is required.`), { entity: h, name: Xt(a.name, `${l}.name`) };
    }
    const d = V(a, l);
    return d || O(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const a of o)
    s.has(a.entity) && O(`${t}.window lists ${a.entity} twice.`), s.add(a.entity);
  return o;
}
function Vi(e, t) {
  return e === !1 ? { present: !1 } : { entity: V(e, t), present: !0 };
}
function Xo(e, t) {
  e.image != null && e.scene != null && O(`${t}: use either image or scene (older name), not both.`);
  const i = e.image != null ? "image" : "scene", n = e.image ?? e.scene;
  if (n == null) {
    const s = mn(e.name).map((a) => Bo[gt(a)]).find((a) => a !== void 0);
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && O(`${t}.${i} must be ${[...Ee, Ae].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== Ae) {
    if (Ee.includes(o))
      return { kind: "scene", scene: o };
    if (i === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    O(
      `${t}.${i} must be one of ${[...Ee, Ae].join(", ")}${i === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Zo(e, t) {
  const i = je(e, `${t}.link`);
  return i !== void 0 && !/^(\/|https?:\/\/)/i.test(i) && O(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), i;
}
function Jo(e, t, i) {
  St(e) || O(`room ${t + 1} must be a mapping with at least a name.`);
  const n = St(e) && e.name != null ? Xt(e.name, `room ${t + 1} name`) : void 0, o = n === void 0 ? "" : mn(n)[0];
  (!o || n === void 0) && O(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, a = e;
  for (const [c, g] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    c in a && O(`${s}: key "${c}" was renamed to "${g}".`);
  "windows" in a && O(`${s}: the key is "window" (one entity or a list of them), not "windows".`), Mt(a, Vo, s);
  const r = ut(e.heating, `${s}.heating`);
  "heating" in r && O(`${s}: key "heating.heating" was renamed to "heating.intensity".`), Mt(r, Wo, `${s}.heating`);
  const l = e.heating == null ? void 0 : {
    climate: V(r.climate, `${s}.heating.climate`),
    overlay: V(r.overlay, `${s}.heating.overlay`),
    target: V(r.target, `${s}.heating.target`),
    intensity: V(r.intensity, `${s}.heating.intensity`)
  }, d = Bt(ut(e.thresholds, `${s}.thresholds`), i.thresholds, `${s}.thresholds`);
  wn(d, `${s}.thresholds`);
  const h = Vi(e.carbon_dioxide, `${s}.carbon_dioxide`), p = Vi(e.pm25, `${s}.pm25`);
  return {
    name: o,
    label: n,
    temperature: V(e.temperature, `${s}.temperature`),
    humidity: V(e.humidity, `${s}.humidity`),
    carbon_dioxide: h.entity,
    hasCo2: h.present,
    pm25: p.entity,
    hasPm25: p.present,
    windows: Go(e, s),
    cover: V(e.cover, `${s}.cover`),
    presets: e.cover_presets == null ? i.presets : Be(e.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: V(e.air_conditioner, `${s}.air_conditioner`),
    image: Xo(e, s),
    link: Zo(e.link, s)
  };
}
function Qo(e) {
  return ko("Klima Dashboard", () => ts(e));
}
function ts(e) {
  (!St(e) || !Array.isArray(e.rooms) || e.rooms.length === 0) && O("the configuration requires a non-empty rooms list.");
  const t = e.title === "" ? "" : Xt(e.title, "title"), i = e.theme ?? "auto";
  ji.includes(i) || O(`theme must be one of ${ji.join(", ")}.`);
  const n = So(e.language), o = V(e.house_mode_entity, "house_mode_entity") ?? No, s = V(e.ventilation_entity, "ventilation_entity"), a = V(e.ventilation_timer_entity, "ventilation_timer_entity"), r = e.ventilation_co2_target ?? Ro;
  (typeof r != "number" || !Number.isFinite(r) || r < 300 || r > 2e3) && O("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const l = e.ventilation_co2_full ?? Do;
  (typeof l != "number" || !Number.isFinite(l) || l < 300 || l > r) && O("ventilation_co2_full must be a number of ppm between 300 and ventilation_co2_target.");
  const d = e.ventilation_settle_minutes ?? Io;
  (typeof d != "number" || !Number.isInteger(d) || d < 1 || d > 180) && O("ventilation_settle_minutes must be a whole number of minutes between 1 and 180.");
  const h = ut(e.house_modes, "house_modes");
  Mt(h, ["winter", "summer"], "house_modes");
  const p = {
    winter: je(h.winter, "house_modes.winter") ?? Fi.winter,
    summer: je(h.summer, "house_modes.summer") ?? Fi.summer
  };
  gt(p.winter) === gt(p.summer) && O("house_modes.winter and house_modes.summer must differ.");
  const c = e.outside == null ? void 0 : ut(e.outside, "outside");
  if (c) {
    Mt(c, Bi, "outside");
    for (const A of Bi)
      V(c[A], `outside.${A}`);
  }
  const g = Bt(ut(e.thresholds, "thresholds"), Ho, "thresholds");
  wn(g, "thresholds");
  const b = Bt(ut(e.trends, "trends"), Fo, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), k = Bt(ut(e.history, "history"), jo, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), $ = { ...ut(e.covers, "covers") }, w = $.presets;
  delete $.presets;
  const x = $.script;
  delete $.script;
  const N = {
    ...Bt($, { tolerance: Pe.tolerance, stall_seconds: Pe.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Pe.script
  };
  x != null && ((typeof x != "string" || !/^script\.[a-z0-9_]+$/.test(x.trim())) && O("covers.script must be a script entity such as script.zaluzie_posun."), N.script = x.trim());
  const C = w == null ? Be(Uo, "covers.presets") : Be(w, "covers.presets"), E = e.rooms.map((A, M) => Jo(A, M, { thresholds: g, presets: C })), S = /* @__PURE__ */ new Set();
  for (const A of E)
    S.has(A.name) && O(`room name "${A.name}" is used twice; room names must be unique.`), S.add(A.name);
  return {
    // Without a title the heading is "Domov" in the card language (i18n.ts).
    title: t,
    theme: i,
    language: n,
    houseModeEntity: o,
    houseModes: p,
    ventilationEntity: s,
    ventilationTimerEntity: a,
    ventilationCo2Target: r,
    ventilationCo2Full: l,
    ventilationSettleMinutes: d,
    outside: c,
    thresholds: g,
    trends: b,
    history: k,
    covers: N,
    rooms: E
  };
}
const vt = 5, _e = 25, J = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480], Tt = J.length, Et = J.length + 1;
function es(e) {
  return e === Tt ? 0 : e === Et ? J.length + 1 : e + 1;
}
function is(e) {
  const t = J.length + 1, i = Math.min(t, Math.max(0, Math.round(e)));
  return i === 0 ? Tt : i === t ? Et : i - 1;
}
function ns(e) {
  return e === Et || e === Tt ? J.length : e;
}
function os(e) {
  const t = Math.min(J.length, Math.max(0, Math.round(e)));
  return t === J.length ? Et : t;
}
function Wi(e, t, i, n = 0) {
  const o = Math.round(t * 60) + n, s = [
    { delay: { hours: Math.floor(o / 3600), minutes: Math.floor(o % 3600 / 60), seconds: o % 60 } }
  ];
  return i !== void 0 && s.push({ condition: "state", entity_id: e, state: i }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: e }, data: { hvac_mode: "off" } }), { sequence: s };
}
function $n(e) {
  return e === "boost" ? 1 : e === "off" ? Et : Tt;
}
function qi(e, t, i) {
  const n = kn(i);
  if (n === void 0)
    return;
  const o = n === "heat" ? "manual" : n === "auto" ? "plan" : n, s = xn(yn(i)), a = Y(i?.attributes.temperature), r = o === "manual" && a !== void 0 && a >= s.min && a <= s.max;
  return {
    room: e,
    entityId: t,
    mode: o,
    temperature: ss(r ? a : 21, s),
    duration: $n(o)
  };
}
function Y(e) {
  const t = typeof e == "string" ? Number.parseFloat(e) : e;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function yn(e) {
  const t = Y(e?.attributes.target_temp_step), i = Y(e?.attributes.min_temp) ?? vt, n = Y(e?.attributes.max_temp) ?? 25, o = t !== void 0 && t > 0 ? t : 0.5;
  return n > i ? { min: i, max: n, step: o } : { min: vt, max: 25, step: o };
}
function xn(e) {
  return { ...e, min: Math.max(e.min, vt) + e.step };
}
function ss(e, t) {
  const i = Math.round((e - t.min) / t.step) * t.step + t.min;
  return Math.min(t.max, Math.max(t.min, Math.round(i * 100) / 100));
}
function kn(e) {
  const t = e?.state.toLowerCase();
  if (t === "off")
    return "off";
  if (t === "auto")
    return "auto";
  if (t === "heat") {
    const i = Y(e?.attributes.temperature);
    return i !== void 0 && i <= vt ? "off" : i === _e ? "boost" : "heat";
  }
}
function _n(e, t, i) {
  const n = e?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const r = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return r === "manual" && i !== void 0 && i <= vt ? "off" : r;
}
function as(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${String(t).padStart(2, "0")}:${String(i).padStart(2, "0")}:00`;
}
function Vt(e) {
  return e >= 0 && e < J.length ? J[e] : void 0;
}
function rs(e, t, i) {
  if (t.mode === "plan")
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "auto" } };
  const n = Vt(t.duration);
  if (t.mode === "off" && (t.duration === Et || !i))
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "off" } };
  if (!i)
    return t.mode === "manual" ? { domain: "climate", service: "set_temperature", data: { entity_id: e, temperature: t.temperature } } : void 0;
  const o = t.mode === "boost" ? _e : t.mode === "off" ? vt : t.temperature, s = { entity_id: e, temperature: o };
  return n !== void 0 ? s.time_period = as(n) : s.overlay = t.duration === Tt ? "next_time_block" : "manual", { domain: "tado_ce", service: "set_climate_timer", data: s };
}
function jt(e) {
  const t = Math.max(1, Math.round(e)), i = Math.floor(t / 60), n = t % 60;
  return i === 0 ? `${n} min` : n === 0 ? `${i} h` : `${i} h ${n} min`;
}
const Ct = 36e5;
function ls(e) {
  if (e == null)
    return;
  if (typeof e == "number")
    return Number.isFinite(e) ? e < 1e11 ? e * 1e3 : e : void 0;
  const t = Date.parse(e);
  return Number.isNaN(t) ? void 0 : t;
}
function ds(e, t) {
  const i = {};
  for (const [n, o] of Object.entries(e ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((a, r) => {
      const l = a.s ?? a.state, d = ls(a.lu ?? a.last_updated ?? a.lc ?? a.last_changed) ?? (r === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((a, r) => a.time - r.time), i[n] = s;
  }
  return i;
}
async function oe(e, t, i, n) {
  if (t.length === 0)
    return {};
  const o = await e.callWS({
    type: "history/history_during_period",
    start_time: new Date(i).toISOString(),
    end_time: new Date(n).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return ds(o, i);
}
function Qt(e, t) {
  let i;
  for (const n of e ?? []) {
    if (n.time > t)
      break;
    i = n.state;
  }
  return i;
}
function Ve(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function hs(e, t, i, n) {
  const o = (i - t) / n, s = (e ?? []).filter((a) => Ve(a.state) !== void 0);
  return Array.from(
    { length: n },
    (a, r) => Ve(Qt(s, t + (r + 1) * o))
  );
}
function se(e, t, i, n = !1) {
  const o = [];
  for (const a of e ?? []) {
    const r = Ve(a.state);
    r !== void 0 && !(n && r === 0) && a.time <= i && o.push({ t: Math.max(a.time, t), v: r });
  }
  const s = o[o.length - 1];
  return s && s.t < i && o.push({ t: i, v: s.v }), o;
}
function At(e, t, i, n) {
  const o = /* @__PURE__ */ new Set([t, i]);
  for (const r of e)
    for (const l of r ?? [])
      l.time > t && l.time < i && o.add(l.time);
  const s = [...o].sort((r, l) => r - l), a = [];
  for (let r = 0; r < s.length - 1; r += 1) {
    const l = n(e.map((h) => Qt(h, s[r])));
    if (l === void 0)
      continue;
    const d = a[a.length - 1];
    d && d.value === l && d.end === s[r] ? d.end = s[r + 1] : a.push({ start: s[r], end: s[r + 1], value: l });
  }
  return a;
}
function ze(e, t) {
  let i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const a of e)
    for (const r of a ?? [])
      r !== void 0 && Number.isFinite(r) && (i = Math.min(i, r), n = Math.max(n, r));
  if (!Number.isFinite(i) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(i / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function cs(e, t) {
  const i = t.max - t.min;
  return e.map(
    (n) => n === void 0 || i <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / i))
  );
}
function ae(e, t = 5 * 6e4, i = 720) {
  if (e.length < 2)
    return e;
  const n = 6e4, o = e[0].t, s = e[e.length - 1].t, a = Math.max(2, Math.floor((s - o) / n) + 1), r = [];
  let l = 0;
  for (let b = 0; b < a; b += 1) {
    const k = b === a - 1 ? s : o + b * n;
    for (; l + 1 < e.length && e[l + 1].t <= k; )
      l += 1;
    r.push(e[l].v);
  }
  const d = Math.max(0, Math.floor(t / n / 2)), h = [0];
  for (const b of r)
    h.push(h[h.length - 1] + b);
  const p = Math.max(1, Math.ceil(a / i)), c = [];
  for (let b = 0; b < a - 1; b += p)
    c.push(b);
  return c.push(a - 1), c.map((b) => {
    const k = Math.max(0, b - d), $ = Math.min(a - 1, b + d);
    return { t: b === a - 1 ? s : o + b * n, v: (h[$ + 1] - h[k]) / ($ - k + 1) };
  });
}
function ps() {
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
  ].map(([t, i, n]) => y`<circle cx=${t} cy=${i} r=${n}></circle>`)}
    </svg>
  `;
}
function us(e) {
  const t = (o, s, a, r) => y`<rect x=${o} y=${s} width=${a} height=${r} rx=${r / 2 > 1.2 ? 1.2 : r / 2} fill="currentColor" stroke="none"></rect>`, i = (o) => y`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
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
function Ki() {
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
function Sn(e, t) {
  return y`${[0, 1, 2].map(
    (i) => y`<path
      d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${i < e ? f.warning : f.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : m}
    ></path>`
  )}`;
}
function We(e, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Sn(e, t)}
    </svg>
  `;
}
function qe(e) {
  let t;
  const i = y`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = y`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (e) {
    case "cool":
    case "wind_free":
      t = y`${i}
        <g transform="rotate(60 12 12)">${i}</g>
        <g transform="rotate(120 12 12)">${i}</g>`;
      break;
    case "dry":
      t = y`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = y`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
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
function Wt(e, t, i) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${i ? "2 2.4" : m}
      aria-hidden="true"
    >
      ${qe(e)}
    </svg>
  `;
}
function Mn() {
  return y`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function Ne(e, t) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${e}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : m}
      aria-hidden="true"
    >
      ${Mn()}
    </svg>
  `;
}
function Re(e) {
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
const Ke = " ", lt = 4, ms = 44, rt = 6, ot = 180, mt = rt + ot, re = 10, Tn = mt + 10, ge = 14, Yi = 14, fs = 3, Cn = 14, gs = 7;
function vs(e, t, i) {
  if (t === "temperature") {
    const o = i ? ["climate", "heating"] : ["heating", "climate"];
    return e.windows ? [...o, "windows"] : o;
  }
  const n = [];
  return e.ventilation && n.push("ventilation"), e.windows && n.push("windows"), n;
}
const En = (e) => e === 0 ? mt : Tn + e * ge, bs = (e = 0) => En(Math.max(e, fs)) + Cn + gs, De = 12, ws = [0, 0.24, 0.44, 0.68], Gi = "history-under-temperature", Ot = "history-plot", Xi = "history-curve", An = {
  schedule: f.plan,
  manual: f.warning,
  off: f.closed
}, $s = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: f.warning,
  off: f.closed
}, X = (e) => `fill: ${e}`, Z = (e) => `stroke: ${e}`;
function Ie(e, t, i) {
  return _n(t, e, i);
}
function le(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
const ni = 0.05;
function ys(e, t) {
  const i = e.filter((r) => Number.isFinite(r));
  let n = 19, o = 23;
  if (i.length > 0) {
    if (n = Math.min(...i), o = Math.max(...i), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const r = (o - n) * ni;
    n -= r, o += r;
  }
  const s = o - n, a = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: a };
}
function xs(e, t, i) {
  const n = [], o = i / 1e3;
  for (let s = Math.ceil(e / i - o) * i; s <= t + o; s += i)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function ks(e, t, i, n, o) {
  const s = (z) => z ? e[z] : void 0, { startMs: a, endMs: r } = i, l = s(t.heating?.overlay), d = s(t.heating?.climate), h = ae(se(s(t.temperature), a, r, !0)), p = ae(se(s(t.humidity), a, r, !0)), c = At(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([z, T, I]) => Ie(z, T, le(I))
  ), g = At(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    a,
    r,
    ([z, T, I, R]) => {
      const B = Ie(z, T, le(R)), q = gn(le(I), t.thresholds);
      return B === void 0 || B === "off" || q === 0 ? void 0 : String(q);
    }
  ), b = At(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([z, T, I]) => {
      const R = le(I), B = Ie(z, T, R);
      if (!(R === void 0 || R <= vt))
        return B === "schedule" || B === "manual" ? String(R) : void 0;
    }
  ), k = t.windows.length > 0 ? At(
    t.windows.map((z) => s(z.entity)),
    a,
    r,
    (z) => z.some((T) => T?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, $ = o ? At([s(o)], a, r, ([z]) => z?.toLowerCase() === "on" ? "on" : void 0) : void 0, w = ae(se(s(t.carbon_dioxide), a, r, !0)), x = ae(se(s(t.pm25), a, r)), N = At([s(t.air_conditioner)], a, r, ([z]) => {
    const T = Eo(z);
    return T === "unknown" ? void 0 : T;
  }), C = h.map((z) => z.v), { min: E, max: S, step: A } = ys(
    C.length > 0 ? C : b.map((z) => Number(z.value)),
    n.min_temperature_span
  ), M = p.map((z) => z.v);
  return {
    range: i,
    temperature: h,
    humidity: p,
    heating: c,
    intensity: g,
    target: b,
    climate: N,
    windows: k,
    co2: w,
    pm25: x,
    ventilation: $,
    limits: {
      co2: { warning: t.thresholds.co2_warning, critical: t.thresholds.co2_critical },
      pm25: { warning: t.thresholds.pm25_warning, critical: t.thresholds.pm25_critical }
    },
    comfort: {
      winter: { min: t.thresholds.winter_min, max: t.thresholds.winter_max },
      summer: { min: t.thresholds.summer_min, max: t.thresholds.summer_max }
    },
    tempMin: E,
    tempMax: S,
    tempStep: A,
    humidityMin: M.length > 0 ? Math.min(...M) : void 0,
    humidityMax: M.length > 0 ? Math.max(...M) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function _s(e, t = "temperature") {
  return t === "co2" ? e.co2.length > 0 : t === "pm25" ? e.pm25.length > 0 : e.temperature.length > 0 || e.humidity.length > 0 || e.heating.length > 0;
}
function Ss(e, t) {
  const i = e.filter((l) => Number.isFinite(l)), n = 400, o = t === "pm25" ? 0 : Math.min(n, i.length > 0 ? Math.floor(Math.min(...i) / 100) * 100 : n), s = t === "co2" ? 400 : 10, a = i.length > 0 ? Math.max(...i) : o + s, r = Math.max(a, o + s);
  return { min: o, max: r + (r - o) * ni };
}
function Ms(e, t, i, n) {
  const o = i === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - e) / Math.max(2, n), a = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], r = [];
  for (let l = Math.ceil(e / a - 1e-9) * a; l <= t + 1e-9; l += a)
    r.push(l);
  return r;
}
function xt(e) {
  return e - lt - ms;
}
function Ts(e, t, i) {
  return lt + (e - t.startMs) / (t.endMs - t.startMs) * xt(i);
}
function Cs(e, t, i) {
  const n = Math.min(1, Math.max(0, (e - lt) / xt(t)));
  return i.startMs + n * (i.endMs - i.startMs);
}
function te(e, t) {
  let i;
  for (const n of e) {
    if (n.t > t)
      break;
    i = n.v;
  }
  return i;
}
function de(e, t, i) {
  return e.find(
    (n) => n.start <= t && (t < n.end || t === i && n.end === i)
  )?.value;
}
function Es(e, [t, i]) {
  const n = [];
  if (t === i)
    return n;
  const o = new Date(e.startMs);
  for (o.setHours(0, 0, 0, 0), o.setDate(o.getDate() - 1); o.getTime() < e.endMs; ) {
    const s = new Date(o);
    s.setHours(t, 0, 0, 0);
    const a = new Date(o);
    i < t && a.setDate(a.getDate() + 1), a.setHours(i, 0, 0, 0);
    const r = Math.max(s.getTime(), e.startMs), l = Math.min(a.getTime(), e.endMs);
    l > r && n.push([r, l]), o.setDate(o.getDate() + 1);
  }
  return n;
}
const Zi = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function oi(e) {
  const t = (e.endMs - e.startMs) / Ct;
  let i = Zi[0], n = 1 / 0;
  for (const o of Zi) {
    const s = t / o, r = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    r < n && (n = r, i = o);
  }
  return i;
}
function As(e) {
  const t = oi(e), i = [], n = new Date(e.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < e.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= e.endMs; )
    n.getTime() >= e.startMs && i.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return i;
}
function Os(e, t) {
  return { x: Math.max(e, t + 9), anchor: "middle" };
}
function Ls(e) {
  return e === "off" ? An.off : Jt[e] ?? f.off;
}
function Ps(e, t, i) {
  const n = new Date(e).getHours() === 0;
  return oi(t) >= 24 || n && t.endMs - t.startMs > 36 * Ct ? i.day(e) : i.hour(e).replace(/^(\d{1,2}):00$/, "$1");
}
function On(e, t, i) {
  const { t: n } = i;
  if (t === void 0)
    return n.chart.now;
  const o = (r) => {
    const l = new Date(r);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(e.range.endMs) - o(t)) / (24 * Ct));
  return `${s === 0 ? "" : s === 1 ? `${n.chart.yesterday} ` : `${i.day(t)} `}${i.time(t)}`;
}
function Ln(e, t) {
  return e === void 0 ? f.label : e >= t.critical ? f.alertOnPopup : e >= t.warning ? f.warning : f.white;
}
function zs(e, t, i) {
  const { t: n } = i, o = t ?? e.range.endMs, s = te(e.temperature, o), a = te(e.humidity, o), r = de(e.heating, o, e.range.endMs), l = Number(de(e.intensity, o, e.range.endMs) ?? 0), d = de(e.target, o, e.range.endMs), h = de(e.climate, o, e.range.endMs), p = On(e, t, i), c = r === void 0 ? "––" : `${n.heatingMode[r]}${r !== "off" && d !== void 0 ? ` · ${i.half(Number(d))} °C` : ""}`, g = h ? n.climateMode[h] : "––", b = h ? Jt[h] : f.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : u`${i.one(s)}<span class="readout-unit">${Ke}°C</span>`}</span
          >
          ${a === void 0 ? m : u`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${n.required.humidity} </span>${i.percent(Math.round(a))}</span
              >`}
        </span>
        <span class="readout-time">${p}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r === "off" ? f.off : r ? An[r] : f.label}`}>
          <span class="readout-icon">${We(r && r !== "off" ? l : 0, r === void 0)}</span>
          ${n.system.heating} ${c}
        </span>
        <span class="readout-system" style=${`color: ${b}`}>
          <span class="readout-icon">${Wt(h ?? "off", b, h === void 0)}</span>
          ${n.system.climate} ${g}
        </span>
      </div>
    </div>
  `;
}
function Ns(e, t, i, n, o) {
  const s = i ?? e.range.endMs, a = i === void 0 && o !== void 0, r = a ? o.value : te(e[t], s), l = t === "co2" && e.pm25.length > 0 ? a && o.secondary ? o.secondary.value : te(e.pm25, s) : void 0, d = a && o.secondary?.stale === !0, h = e.limits[t], p = t === "co2" ? "ppm" : "µg/m³";
  return u`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${a && o.stale ? f.label : Ln(r, h)}`}
            >${r === void 0 ? "––" : u`${n.whole(r)}<span class="readout-unit">${Ke}${p}</span>`}</span
          >
          ${t === "co2" && e.pm25.length > 0 ? u`<span class="readout-hum pm25" style=${d ? `color: ${f.label}` : m}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : u`${n.whole(l)}${Ke}µg/m³`}</span
              >` : m}
        </span>
        <span class="readout-time">${On(e, i, n)}</span>
      </div>
    </div>
  `;
}
function Rs(e, t, i, n, o, s = !1, a) {
  const { range: r } = e, l = t === "temperature" ? void 0 : t, d = (v) => Ts(v, r, i), h = l ? e[l] : e.temperature, p = l ? e.limits[l] : void 0, c = l ? Ss(h.map((v) => v.v), l) : { min: e.tempMin, max: e.tempMax }, g = h.length > 0 ? Math.max(...h.map((v) => v.v)) : -1 / 0, b = (v) => mt - (v - c.min) / (c.max - c.min) * ot, k = (e.humidityMin ?? 0) - 3, $ = Math.max((e.humidityMax ?? 100) + 3, k + 12), w = (v) => mt - (v - k) / ($ - k) * ot, x = lt + xt(i), N = (v, P) => v.map((D, U) => `${U === 0 ? "M" : "L"}${d(D.t).toFixed(1)} ${P(D.v).toFixed(1)}`).join(" "), C = N(h, b), E = h[0], S = h[h.length - 1], A = E && S ? `${C} L${d(S.t).toFixed(1)} ${mt} L${d(E.t).toFixed(1)} ${mt} Z` : "";
  let M = "";
  l || e.target.forEach((v, P) => {
    const D = b(Number(v.value)).toFixed(1), U = e.target[P - 1];
    M += U && U.end === v.start ? ` L${d(v.start).toFixed(1)} ${D}` : ` M${d(v.start).toFixed(1)} ${D}`, M += ` L${d(v.end).toFixed(1)} ${D}`;
  });
  const z = xt(i) / Math.max(1, (r.endMs - r.startMs) / Ct / oi(r)), T = Math.max(2, Math.round(ot / z)), I = (c.max - c.min) / T, R = [0.5, 1, 2, 5, 10].find((v) => v >= I * 0.8) ?? 10, B = l ? Ms(c.min, c.max, l, T) : xs(c.min, c.max, R), q = (v) => l ? o.whole(v) : `${o.tick(v)}°`, Q = p ? [
    { value: p.warning, color: f.warning },
    { value: p.critical, color: f.alertOnPopup }
  ].filter((v) => v.value > c.min && v.value <= g) : [], K = (v) => Math.min(1, Math.max(0, (b(v) - rt) / ot)), _ = [];
  if (p && Q.length > 0) {
    const v = Q.some((U) => U.value === p.critical), P = K(p.critical), D = K(p.warning);
    v && _.push([0, f.alertOnPopup], [P, f.alertOnPopup]), _.push([v ? P : 0, f.warning], [D, f.warning], [D, f.white], [1, f.white]);
  }
  const at = s ? e.comfort.summer : e.comfort.winter;
  if (!l) {
    const v = K(at.max), P = K(at.min);
    _.push([0, f.warning], [v, f.warning], [v, f.white], [P, f.white], [P, f.sky], [1, f.sky]);
  }
  const bt = (v) => p ? Ln(v, p) : v > at.max ? f.warning : v < at.min ? f.sky : f.white, pi = (v, P, D) => v.map((U) => {
    const nt = d(U.start);
    return y`<rect x=${nt.toFixed(1)} y=${P} width=${Math.max(d(U.end) - nt, 0.8).toFixed(1)}
        height=${re} rx="2" style=${X(D(U.value))}></rect>`;
  }), Se = vs(e, t, s), Me = En(Se.length), zn = Me + Cn, ui = bs(Se.length), Nn = (v) => v === "heating" ? y`${Sn(3, !1)}` : v === "climate" ? y`<g style=${Z(f.off)}>${qe("off")}</g>` : v === "ventilation" ? y`<g style=${Z(f.fresh)}>${qe("fan")}</g>` : y`<g style=${Z("var(--kd-sky)")}>${Mn()}</g>`, mi = (v, P, D, U, nt) => v.map((wi) => {
    const $i = d(wi.start);
    return y`<rect class=${U} x=${$i.toFixed(1)} y=${P} width=${Math.max(d(wi.end) - $i, nt).toFixed(1)}
        height=${re} rx="2" style=${X(D)}></rect>`;
  }), Rn = (v, P) => v === "heating" ? y`${pi(e.heating, P, (D) => $s[D] ?? f.off)}` : v === "climate" ? y`${pi(e.climate, P, (D) => Ls(D))}` : v === "ventilation" ? y`${mi(e.ventilation ?? [], P, f.fresh, "ventilation-on", 1.5)}` : y`${mi(e.windows ?? [], P, "var(--kd-sky)", "window-open", 1.5)}`, ie = n === void 0 ? void 0 : d(n), Te = n === void 0 ? void 0 : te(h, n), Dn = Es(r, e.night), fi = (v, P, D, U) => (v ?? []).map(
    (nt) => y`<rect class=${D} x=${d(nt.start).toFixed(1)} y=${rt}
        width=${Math.max(d(nt.end) - d(nt.start), 2).toFixed(1)} height=${ot}
        style=${`${X(P)}; opacity: var(${U})`}></rect>`
  ), gi = (v) => bt(v), In = Math.max(...e.pm25.map((v) => v.v), 0), Hn = Math.max(In * (1 + ni), e.limits.pm25.critical), Fn = (v) => mt - v / Hn * ot, vi = l === "co2" && e.pm25.length > 0 ? N(e.pm25, Fn) : "", jn = (v) => [...v].reduce((P, D) => P + (/\d/.test(D) ? 6.7 : 3.6), 0), Dt = As(r).map((v) => {
    const P = Ps(v, r, o), D = Os(d(v), lt), U = jn(P), nt = D.x - U / 2;
    return { x: d(v), text: P, anchored: D, left: nt, right: nt + U, show: !1 };
  });
  let bi = 1 / 0;
  for (let v = Dt.length - 1; v >= 0; v--)
    Dt[v].right <= bi + 2 && (Dt[v].show = !0, bi = Dt[v].left);
  return u`
    ${l ? Ns(e, l, n, o, a) : zs(e, n, o)}
    <svg
      class="chart"
      viewBox="0 0 ${i} ${ui}"
      width=${i}
      height=${ui}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${Gi}><path d=${A}></path></clipPath>
        <clipPath id=${Ot}>
          <rect x=${lt} y=${rt} width=${xt(i)} height=${ot} rx="8"></rect>
        </clipPath>
        ${_.length > 0 ? y`<linearGradient id=${Xi} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${rt} y2=${mt}>
              ${_.map(
    ([v, P]) => y`<stop offset=${`${(v * 100).toFixed(2)}%`} style=${`stop-color: ${P}`}></stop>`
  )}
            </linearGradient>` : m}
      </defs>
      <rect x=${lt} y=${rt} width=${xt(i)} height=${ot} rx="8" style=${X("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${Ot})`}>
        ${Dn.map(
    ([v, P]) => y`<rect class="night" x=${d(v).toFixed(1)} y=${rt} width=${(d(P) - d(v)).toFixed(1)}
            height=${ot} style=${X("var(--kd-night)")}></rect>`
  )}
        ${l ? fi(e.windows, "var(--kd-sky)", "window-band", "--kd-band-window") : m}
        ${l ? fi(e.ventilation, f.fresh, "ventilation-band", "--kd-band-ventilation") : m}
      </g>
      ${B.map((v) => {
    const P = b(v), D = Q.some((U) => Math.abs(b(U.value) - P) < 14);
    return y`<line x1=${lt} x2=${x} y1=${P.toFixed(1)} y2=${P.toFixed(1)}
            style=${Z("var(--kd-grid)")} stroke-width="1"></line>
          ${D ? m : y`<text x=${x + 6} y=${(P + 4).toFixed(1)} style=${X(f.label)} font-size=${De}>${q(v)}</text>`}`;
  })}
      ${Q.map(
    (v) => y`<line class="limit-line" x1=${lt} x2=${x} y1=${b(v.value).toFixed(1)} y2=${b(v.value).toFixed(1)}
            style=${Z(v.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${x + 6} y=${(b(v.value) + 4).toFixed(1)} style=${X(v.color)} font-size=${De}
            font-weight="600">${q(v.value)}</text>`
  )}
      <g clip-path=${`url(#${Ot})`}>
        ${A ? y`<path d=${A} style=${X("var(--kd-area)")}></path>` : m}
      </g>
      ${l ? m : y`<g clip-path=${`url(#${Gi})`}>
        ${e.intensity.map(
    (v) => y`<rect x=${d(v.start).toFixed(1)} y=${rt}
            width=${Math.max(d(v.end) - d(v.start), 0.8).toFixed(1)} height=${ot}
            style=${X(f.warning)} opacity=${ws[Number(v.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${vi ? y`<path class="pm25-line" d=${vi} fill="none" style=${Z(f.pm25)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${Ot})`}></path>` : m}
      ${!l && e.humidity.length > 0 ? y`<path d=${N(e.humidity, w)} fill="none" style=${Z(f.humidityLine)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.65"></path>` : m}
      ${M ? y`<path d=${M} fill="none" style=${Z(f.plan)} stroke-width="1"
            stroke-dasharray="3 3" opacity="0.45" clip-path=${`url(#${Ot})`}></path>` : m}
      ${C ? y`<path class="temperature-curve" d=${C} fill="none"
            style=${Z(_.length > 0 ? `url(#${Xi})` : f.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${Ot})`}></path>` : m}
      ${S && n === void 0 ? y`<circle class="end-dot" cx=${d(S.t).toFixed(1)} cy=${b(S.v).toFixed(1)} r="4"
            style=${`${X(gi(S.v))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : m}

      ${Se.map((v, P) => {
    const D = Tn + P * ge, U = D + (ge - re) / 2;
    return y`<g class=${`strip-row ${v}`}>
          <rect x=${lt} y=${U} width=${xt(i)} height=${re} rx="2" style=${X("var(--kd-fill)")}></rect>
          ${Rn(v, U)}
          <g class="strip-icon" transform=${`translate(${x + 6} ${D + (ge - Yi) / 2}) scale(${Yi / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${Nn(v)}</g>
        </g>`;
  })}

      ${Dt.map(
    (v) => y`<line x1=${v.x.toFixed(1)} x2=${v.x.toFixed(1)} y1=${rt} y2=${Me}
            style=${Z("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${v.show ? y`<text class="tick" x=${v.anchored.x.toFixed(1)} y=${zn} style=${X(f.label)} font-size=${De}
                text-anchor=${v.anchored.anchor}>${v.text}</text>` : m}`
  )}
      ${ie === void 0 ? m : y`<line x1=${ie.toFixed(1)} x2=${ie.toFixed(1)} y1=${rt} y2=${Me}
              style=${Z(f.white)} stroke-width="1" opacity="0.7"></line>
            ${Te === void 0 ? m : y`<circle cx=${ie.toFixed(1)} cy=${b(Te).toFixed(1)} r="4"
                  style=${`${X(gi(Te))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const Ji = Ct / 4;
function Ds(e) {
  return `var(--kd-scene-${e})`;
}
function Is(e) {
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
function Hs(e) {
  let t, i;
  for (const n of e ?? []) {
    const o = n.state.toLowerCase();
    o === "on" && !t ? (t = { start: n.time }, i = t) : o === "off" && t && (t.end = n.time, t = void 0);
  }
  return i;
}
function Fs(e, t, i) {
  return Qt(e, t)?.toLowerCase() === "on" ? !0 : (e ?? []).some((n) => n.time > t && n.time <= i && n.state.toLowerCase() === "on");
}
function he(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function Qi(e, t) {
  return e === void 0 || t === void 0 || t < 0 || t > 100 || e <= -243.12 ? void 0 : 216.7 * (t / 100 * 6.112 * Math.exp(17.62 * e / (243.12 + e))) / (273.15 + e);
}
function js(e, t, i, n) {
  const o = t <= i;
  return t <= n || e <= n && o ? { done: 1, closable: o } : e <= n ? { done: 0, closable: o } : { done: Math.min(0.99, Math.max(0, (e - t) / (e - n))), closable: o };
}
function we(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function si(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Us(e, t) {
  return e === "auto" ? si(we(t)) : e;
}
function Bs() {
  return si(document.documentElement.lang || navigator.language || "");
}
const tn = /* @__PURE__ */ new WeakMap(), Vs = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Ws = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), qs = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function He(e, t) {
  const i = e?.locale?.[t];
  return typeof i == "string" && i !== "" ? i : "language";
}
function Ks(e, t, i) {
  const n = we(i).replace("_", "-"), o = n !== "" && si(n) === t ? n : Vs[t], s = He(i, "number_format"), a = He(i, "time_format"), r = He(i, "date_format"), l = [t, o, s, a, r].join("|");
  let d = tn.get(e);
  d || (d = /* @__PURE__ */ new Map(), tn.set(e, d));
  let h = d.get(l);
  return h || (h = Xs(e[t], t, o, s, a, r), d.set(l, h)), h;
}
function Ys(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function Gs(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const i = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(i).includes("10");
}
function Xs(e, t, i, n, o, s) {
  const a = Ys(i), r = n === "system" ? void 0 : n === "none" ? "en-US" : qs[n] ?? a, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), g = Gs(o, a), b = g ? "h12" : "h23", k = new Intl.DateTimeFormat(a, { hour: g ? "numeric" : "2-digit", minute: "2-digit", hourCycle: b }), $ = new Intl.DateTimeFormat(a, g ? { hour: "numeric", hourCycle: b } : { hour: "2-digit", minute: "2-digit", hourCycle: b }), w = s === "system" ? void 0 : a, x = new Intl.DateTimeFormat(w, { day: "numeric", month: "numeric" }), N = (E) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return x.format(E);
    const S = x.formatToParts(E), A = S.find((R) => R.type === "literal")?.value ?? "/", M = S[S.length - 1], z = M?.type === "literal" ? M.value : "", T = S.find((R) => R.type === "day")?.value ?? "", I = S.find((R) => R.type === "month")?.value ?? "";
    return s === "DMY" ? `${T}${A}${I}${z}` : `${I}${A}${T}${z}`;
  }, C = Ws.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: e,
    one: (E) => d.format(E),
    two: (E) => h.format(E),
    half: (E) => p.format(Math.round(E * 2) / 2),
    tick: (E) => p.format(E),
    whole: (E) => c.format(E),
    percent: (E) => `${E}${C}%`,
    time: (E) => k.format(E),
    hour: (E) => $.format(E),
    day: N
  };
}
const $t = (e, t, i, n) => e === 1 ? t : e >= 2 && e <= 4 ? i : n, Zs = {
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
  temperatureLabel: (e, t, i, n) => `${e}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${i}, historie místnosti za ${n}`,
  humidityLabel: (e, t, i) => `${e}: vlhkost ${t ?? "neznámá"}${i}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (e, t, i, n) => `${e}: teplota za ${t}${i ? ` ${i}` : ""}, historie místnosti za ${n}`,
  link: { page: "Otevře stránku místnosti.", web: "Otevře odkaz." },
  // CO₂ and PM2.5
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (e, t, i, n) => `${e} ${t ?? "neznámé"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: kvalita vzduchu, ${t || "bez čidla"}. Otevře graf za ${i}.`,
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
    rooms: (e) => `${e} ${$t(e, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (e) => `${e} ${$t(e, "okno otevřené", "okna otevřená", "oken otevřených")}`,
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
    end: "Ukončit",
    ending: "Ukončuje se…",
    ended: "Větrací režim skončil.",
    last: "Poslední větrání",
    never: "Zatím žádné větrání.",
    closable: "lze zavřít okna",
    done: "hotovo",
    quantity: { co2: "CO₂ ppm", temperature: "Teplota °C", humidity: "Vlhkost g/m³" },
    before: "Před",
    after: "Po",
    settledAfter: (e) => `Po ${e} min`,
    settledShort: (e) => `+${e} min`,
    windowClosed: "okno zavřené",
    roomSpoken: (e, t) => `${e}: ${t}`,
    lineSpoken: (e, t) => `${e}: ${t}`
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (e) => `${e} ${$t(e, "minuta", "minuty", "minut")}`,
    hour: (e) => `${e} ${$t(e, "hodina", "hodiny", "hodin")}`,
    day: (e) => `${e} ${$t(e, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (e) => `${e} ${$t(e, "minutu", "minuty", "minut")}`,
    hour: (e) => `${e} ${$t(e, "hodinu", "hodiny", "hodin")}`
  }
}, Ut = (e, t, i) => e === 1 ? t : i, Js = {
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
  temperatureLabel: (e, t, i, n) => `${e}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${i}, room history for ${n}`,
  humidityLabel: (e, t, i) => `${e}: humidity ${t ?? "unknown"}${i}, details and history`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperature${i ? ` ${i}` : ""} over ${t}, room history for ${n}`,
  link: { page: "Opens the room page.", web: "Opens the link." },
  airSensor: (e, t, i, n) => `${e} ${t ?? "unknown"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: air quality, ${t || "no sensor"}. Opens the chart for ${i}.`,
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
    rooms: (e) => `${e} ${Ut(e, "room", "rooms")}`,
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
    windowsOpen: (e) => `${e} ${Ut(e, "window", "windows")} open`,
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
    end: "End",
    ending: "Ending…",
    ended: "Ventilation mode has ended.",
    last: "Last ventilation",
    never: "No ventilation yet.",
    closable: "windows can be closed",
    done: "done",
    quantity: { co2: "CO₂ ppm", temperature: "Temperature °C", humidity: "Humidity g/m³" },
    before: "Before",
    after: "After",
    settledAfter: (e) => `After ${e} min`,
    settledShort: (e) => `+${e} min`,
    windowClosed: "window closed",
    roomSpoken: (e, t) => `${e}: ${t}`,
    lineSpoken: (e, t) => `${e}: ${t}`
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (e) => `${e} ${Ut(e, "minute", "minutes")}`,
    hour: (e) => `${e} ${Ut(e, "hour", "hours")}`,
    day: (e) => `${e} ${Ut(e, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (e) => e === 1 ? "the last minute" : `the last ${e} minutes`,
    hour: (e) => e === 1 ? "the last hour" : `the last ${e} hours`
  }
}, ce = (e, t, i) => e === 1 ? t : i, Qs = {
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
  temperatureLabel: (e, t, i, n) => `${e}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${i}, rumshistorik för ${n}`,
  humidityLabel: (e, t, i) => `${e}: luftfuktighet ${t ?? "okänd"}${i}, detaljer och historik`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperaturen${i ? ` ${i}` : ""} under ${t}, rumshistorik för ${n}`,
  link: { page: "Öppnar rummets sida.", web: "Öppnar länken." },
  airSensor: (e, t, i, n) => `${e} ${t ?? "okänt"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: luftkvalitet, ${t || "ingen sensor"}. Öppnar diagrammet för ${i}.`,
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
    windowsOpen: (e) => `${e} fönster ${ce(e, "öppet", "öppna")}`,
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
    end: "Avsluta",
    ending: "Avslutar…",
    ended: "Ventilationsläget har avslutats.",
    last: "Senaste ventilationen",
    never: "Ingen ventilation än.",
    closable: "fönstren kan stängas",
    done: "klart",
    quantity: { co2: "CO₂ ppm", temperature: "Temperatur °C", humidity: "Fuktighet g/m³" },
    before: "Före",
    after: "Efter",
    settledAfter: (e) => `Efter ${e} min`,
    settledShort: (e) => `+${e} min`,
    windowClosed: "fönstret stängt",
    roomSpoken: (e, t) => `${e}: ${t}`,
    lineSpoken: (e, t) => `${e}: ${t}`
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (e) => `${e} ${ce(e, "minut", "minuter")}`,
    hour: (e) => `${e} ${ce(e, "timme", "timmar")}`,
    day: (e) => `${e} ${ce(e, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (e) => e === 1 ? "den senaste minuten" : `de senaste ${e} minuterna`,
    hour: (e) => e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`
  }
}, ta = { cs: Zs, en: Js, sv: Qs };
function Ye(e, t) {
  return Ks(ta, e, t);
}
const ea = Nt`
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

    /* Větrací režim: tabulka místností. Popisek řádku a tři stejně široké sloupce hodnot přes celou šířku popupu
       (uživatel 5. 11. 2026: „ať jsou rovnoměrně na celou šířku popupu“); třetí sloupec je za běhu kolečko. */
    .vent-summary {
      min-height: 44px;
      flex-wrap: wrap;
      column-gap: 12px;
      row-gap: 0;
    }

    /* A long label (en, sv) keeps its line; the time moves under it instead of squeezing it. */
    .vent-summary .option-text {
      flex: 0 0 auto;
    }

    .vent-ends {
      margin-left: auto;
      color: var(--kd-label);
      font-size: 15px;
    }

    .vent-table {
      --vent-cols: minmax(92px, 1.3fr) repeat(3, minmax(0, 1fr));
      container-type: inline-size;
      padding: 6px 16px 8px;
      border-top: 1px solid var(--kd-fill-border);
    }

    .vent-head,
    .vent-room {
      display: grid;
      grid-template-columns: var(--vent-cols);
      align-items: baseline;
      font-size: 15px;
      line-height: 22px;
      font-variant-numeric: tabular-nums;
    }

    /* The lines of a room are cells of the grid of the room. */
    .vent-room-main {
      display: contents;
    }

    .vent-line {
      display: contents;
    }

    .vent-line > :first-child {
      grid-column: 1;
    }

    .vent-q {
      color: var(--kd-label);
      font-size: 13px;
      line-height: 22px;
    }

    .vent-num {
      text-align: right;
      white-space: nowrap;
    }

    .vent-head {
      min-height: 16px;
      color: var(--kd-label);
      font-size: 13px;
      line-height: 16px;
      align-items: end;
    }

    /* The head stays on one line (a longer text such as +180 min or "do 420 ppm" may run over the edge of its column). */
    .vent-head .vent-num {
      overflow: visible;
      white-space: nowrap;
    }

    /* The head of the ring column ends at the same right edge as the ring and the values after the end (uživatel 5. 11. 2026: „Kolečko je potřeba víc vpravo aby to bylo vyvážené“). */
    .vent-head .vent-num.ring-head {
      justify-self: end;
      text-align: right;
    }

    /* On a narrow popup (320 px) the labels are 12 px, the label column is narrower so that the headers keep a gap of 12 px,
       and the column of the ring has no room for the unit (the label of the CO₂ row says ppm). */
    @container (max-width: 319px) {
      .vent-head,
      .vent-room {
        grid-template-columns: minmax(86px, 1.3fr) repeat(3, minmax(0, 1fr));
      }

      .vent-q,
      .vent-head {
        font-size: 12px;
      }

      .vent-head .ring-unit {
        display: none;
      }
    }

    .vent-room + .vent-room {
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid var(--kd-fill-border);
    }

    .vent-room-head {
      grid-column: 1 / -1;
      display: flex;
      align-items: baseline;
      gap: 8px;
      height: 22px;
      font-size: 17px;
      font-weight: 500;
    }

    /* "okno zavřené" beside the name of a room whose window was closed while the mode runs (the ring is grey). */
    .vent-note {
      color: var(--kd-label);
      font-size: 13px;
      font-weight: 400;
      line-height: 1;
    }

    /* The ring of the kit stands at the right end of the third value column, centred on the three lines under the name; its colours are the card's. */
    kd-ring {
      --hdk-ring-track: rgb(118 118 128 / 24%);
      --hdk-ring-text: var(--kd-text);
      --hdk-ring-sub: var(--kd-label);
      grid-column: 4;
      grid-row: 2 / span 3;
      align-self: center;
      justify-self: end;
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

    /* A failed command: the text of the button says so, the button stays active (a new tap tries again). */
    .vent-end.error {
      color: var(--kd-alert-popup);
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
`, ia = " ";
function en(e) {
  if (!e || tt(e.state.toLowerCase()))
    return;
  const t = Number.parseFloat(e.state);
  return Number.isFinite(t) ? t : void 0;
}
function Ge(e, t) {
  return e === void 0 ? "" : `· ${t.half(e)}${ia}°C`;
}
function na(e, t, i, n, o, s) {
  const a = s.t.heatingMode, r = e?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || tt(l), h = en(i), p = _n(r, l, h);
  if (p === "off")
    return { label: a.off, color: f.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || r === void 0 || tt(r))
    return { label: "––", color: f.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const c = gn(en(n), o);
  if (p === "schedule")
    return { label: a.schedule, color: f.plan, active: !0, extra: Ge(h, s), unknown: !1, overlay: "schedule", waves: c };
  if (p === "manual") {
    const g = h === _e ? "boost" : "manual";
    return { label: a.manual, color: f.warning, active: !0, extra: Ge(h, s), unknown: !1, overlay: "manual", override: g, waves: c };
  }
  return { label: t?.state ?? "––", color: f.warning, active: !0, extra: "", unknown: !1, waves: c };
}
function $e(e, t) {
  let i = "unknown", n, o;
  if (e && !tt(e.state.toLowerCase())) {
    const a = e.state.toLowerCase(), r = String(e.attributes.preset_mode ?? "none").toLowerCase();
    a === "off" ? i = "off" : a === "cool" ? i = r === "wind_free" ? "wind_free" : "cool" : a === "dry" ? i = "dry" : a === "fan_only" ? i = "fan" : a === "heat" ? i = "heat" : (a === "auto" || a === "heat_cool") && (i = "auto"), i !== "off" && i !== "unknown" && i !== "wind_free" && r !== "none" && r !== "" && (n = fe(r)), o = yt(e.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(i);
  return {
    mode: i,
    label: n ?? t.t.climateMode[i],
    color: Jt[i],
    active: i !== "off" && i !== "unknown",
    extra: s ? Ge(o, t) : "",
    unknown: i === "unknown"
  };
}
function oa(e, t) {
  const i = e.unknown ? t.t.unknownState : e.label;
  return e.extra ? `${i} ${e.extra.replace(/^·\s*/, "")}` : i;
}
function pe(e, t) {
  return e.length <= 2 ? e.join(", ") : t.t.summaryChips.rooms(e.length);
}
function ye(e, t) {
  return e.windows.filter((i) => t(i.entity)?.state.toLowerCase() === "on");
}
function ai(e, t, i) {
  return na(
    t(e.heating?.climate),
    t(e.heating?.overlay),
    t(e.heating?.target),
    t(e.heating?.intensity),
    e.thresholds,
    i
  );
}
function Pn(e, t, i, n) {
  const o = ye(e, t).length > 0, s = ai(e, t, n), a = e.air_conditioner ? $e(t(e.air_conditioner), n).mode : "unknown", r = !s.unknown && s.waves > 0 || a === "heat", l = a === "cool" || a === "wind_free", d = [];
  return o && r && d.push("window-heating"), o && l ? d.push("window-cooling") : l && i && d.push("cooling-cold"), d;
}
function sa(e, t, i, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, a = [], r = [], l = [], d = [];
  let h = 0;
  const p = [], c = new Map(e.map((w) => [w.name, bn(w, n.language)])), g = (w) => w.map((x) => c.get(x) ?? x);
  for (const w of e) {
    for (const C of Pn(w, t, i.has(w.name), n))
      s[C].push(w.name);
    const x = ye(w, t).length;
    x > 0 && a.push([w.name, x]);
    const N = ai(w, t, n);
    N.override === "boost" ? l.push(w.name) : N.override === "manual" && r.push(w.name), N.waves > 0 && (d.push(w.name), h = Math.max(h, N.waves)), w.air_conditioner && $e(t(w.air_conditioner), n).active && p.push(w.name);
  }
  const b = [], k = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [w, x] of k)
    s[w].length > 0 && b.push({
      kind: x,
      text: `${o.conflict[w]}: ${pe(g(s[w]), n)}`,
      color: f.warning,
      spoken: `${o.conflictSpoken[w]}: ${g(s[w]).join(", ")}`
    });
  const $ = a.reduce((w, [, x]) => w + x, 0);
  return $ > 0 && b.push({
    kind: "windows",
    text: o.windowsOpen($),
    color: f.sky,
    spoken: `${o.windowsSpoken}: ${a.map(([w, x]) => x > 1 ? `${c.get(w) ?? w} (${x})` : c.get(w) ?? w).join(", ")}`
  }), r.length > 0 && b.push({
    kind: "manual",
    text: `${o.manual}: ${pe(g(r), n)}`,
    color: f.warning,
    spoken: `${o.manualSpoken}: ${g(r).join(", ")}`,
    opens: { system: "heating", rooms: r }
  }), l.length > 0 && b.push({
    kind: "boost",
    text: `${o.boost}: ${pe(g(l), n)}`,
    color: f.warning,
    spoken: `${o.boostSpoken}: ${g(l).join(", ")}`,
    opens: { system: "heating", rooms: l }
  }), d.length > 0 && b.push({
    kind: "heating",
    text: o.heating(o.rooms(d.length)),
    color: f.warning,
    spoken: `${o.heatingSpoken}: ${g(d).join(", ")}`,
    waves: h,
    opens: { system: "heating", rooms: d }
  }), p.length > 0 && b.push({
    kind: "climate",
    text: `${o.climate}: ${pe(g(p), n)}`,
    color: f.cool,
    spoken: `${o.climateSpoken}: ${g(p).join(", ")}`,
    opens: { system: "climate", rooms: p }
  }), b;
}
var aa = Object.defineProperty, j = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && aa(t, i, o), o;
};
const nn = "klima-dashboard.after-timer", ra = 5 * 6e4, la = 3e4, dt = " ", da = 550, on = 400, ha = 700, ca = "(orientation: landscape) and (max-height: 600px)", pa = 1600, ua = 5e3, ma = 100, fa = 0.6, ga = 6;
function va(e) {
  return e === void 0 ? void 0 : e.mode === "manual" ? "heat" : e.mode === "plan" ? "auto" : e.mode;
}
const ci = class ci extends ht {
  constructor() {
    super(...arguments), this._i18n = Ye("en"), this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new ii(() => ({ holdMs: da, doubleTapMs: on })), this._movingWatch = /* @__PURE__ */ new Map(), this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const i = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!i || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = Cs((t.clientX - o.left) * s / Math.max(o.width, 1), s, i.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const i = this._historyModel;
      if (!i)
        return;
      const { startMs: n, endMs: o } = i.range, s = this._scrubTime ?? o;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const a = s + (t.key === "ArrowLeft" ? -Ji : Ji);
        this._scrubTime = a >= o ? void 0 : Math.max(n, a);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY, this._touchOnSlider = t.composedPath().some((i) => i instanceof HTMLInputElement && i.type === "range" || i instanceof HTMLElement && "drag" in i.dataset);
    }, this.sheetTouchMove = (t) => {
      this._touchOnSlider || t.cancelable && this.sheetCannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this._touchY ?? 0)) && t.preventDefault();
    }, this.sheetWheel = (t) => {
      t.cancelable && !t.ctrlKey && this.sheetCannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this._drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now(), dragging: !1 });
    }, this.dragMove = (t) => {
      const i = this._drag;
      if (!i || i.pointerId !== t.pointerId)
        return;
      const n = t.clientY - i.startY;
      if (!i.dragging) {
        if (n < ga)
          return;
        i.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const i = this._drag;
      if (this._drag = void 0, !i || !i.dragging)
        return;
      const n = Math.max(0, t.clientY - i.startY), o = n / Math.max(1, performance.now() - i.startTime);
      t.type === "pointerup" && (n > ma || o > fa) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const i = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet input:not([disabled]), .sheet .chart-wrap'
        )
      ];
      if (i.length === 0)
        return;
      const n = this.renderRoot.activeElement, o = n ? i.indexOf(n) : -1, s = t.shiftKey ? i[o <= 0 ? i.length - 1 : o - 1] : i[o === -1 || o === i.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Qo(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, la), this.requestUpdate();
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
      const i = t.get("hass");
      return i?.themes?.darkMode !== this.hass?.themes?.darkMode || we(i) !== we(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => i?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(i);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const i = this.theme();
    this.dataset.theme !== i && (this.dataset.theme = i), this._i18n = Ye(Us(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
    const n = this.ventilationOn();
    n !== this._ventOn && (this._ventOn = n, this._ventilationEnding = !1, this._sheet?.kind === "ventilation" && (this._announcement = n ? "" : this._i18n.t.ventilation.ended, this.loadVentilation()));
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
    }, ra)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => ye(t, (i) => this.getState(i)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const i of Ao(this._config)) {
      const n = t.states[i], o = this.hass.states[i];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !Lo(n?.attributes, o?.attributes))
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
    const t = gt(this.entityState(this._config.houseModeEntity) ?? ""), i = t === gt(this._config.houseModes.summer), n = i || t === gt(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), a = Zt(this._config.title, this._i18n.language) ?? this._i18n.t.title, r = this.renderOutside(), l = sa(
      this._config.rooms,
      (p) => this.getState(p),
      this.coldRooms(i, n, s),
      this._i18n
    ), d = this._config.ventilationEntity !== void 0, h = a !== "" || r !== m || l.length > 0 || d;
    return u`
      <ha-card>
        <div class="dashboard">
          ${h ? u`<header class="dashboard-header">
                ${d ? u`<div class="title-row">${a === "" ? m : u`<h1>${a}</h1>`}${this.renderVentilationButton()}</div>` : a === "" ? m : u`<h1>${a}</h1>`}
                ${r} ${this.renderSummary(l)}
              </header>` : m}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (p, c) => this.renderRoom(p, c, i, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(i)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, i, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const a = s.thresholds.stale_minutes;
      Ni(
        {
          temperature: this.reading(s.temperature, a, n),
          humidity: this.reading(s.humidity, a, n),
          co2: this.reading(s.carbon_dioxide, a, n),
          pm25: this.pm25Reading(s, n)
        },
        t,
        i,
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
    const i = (n) => t.rooms.map((o) => {
      const s = n(o);
      return s ? this._trends[s] : void 0;
    });
    return {
      temperature: ze(i((n) => n.temperature), Ft(t.trends, "temperature")),
      co2: ze(i((n) => n.carbon_dioxide), Ft(t.trends, "co2")),
      pm25: ze(i((n) => n.pm25), Ft(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const { t: i, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), a = this.numberState(t.maximum), r = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && a !== void 0 ? `${n(s)}–${n(a)}${dt}°C` : void 0, h = [
      o === void 0 ? void 0 : `${n(o)}${dt}°C`,
      d,
      r === void 0 ? void 0 : `☂${dt}${this._i18n.percent(n(r))}`
    ].filter((b) => b !== void 0), p = this._config.thresholds;
    let c = "––", g = f.label;
    return l !== void 0 && (l >= p.pm25_critical ? (c = i.airLevel.poor, g = f.alert) : l >= p.pm25_warning ? (c = i.airLevel.moderate, g = f.warning) : c = i.airLevel.good), h.length === 0 && !t.pm25 ? m : u`<div class="outside">
      ${h.length > 0 ? u`<div>${h.join(" · ")}</div>` : m}
      ${t.pm25 ? u`<div>${i.outsideAir} <span style=${`color: ${g}`}>${c}</span></div>` : m}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? m : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((i) => {
      const n = this.summaryIcon(i), o = i.opens;
      return o && o.rooms.length > 0 ? u`<li class="chip" style=${`--chip-color: ${i.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${i.spoken}
              aria-label=${`${i.text}. ${i.spoken}`}
              aria-haspopup="dialog"
              @click=${(s) => this.openGroupSheet(o.system, o.rooms, s)}
            >
              <span class="chip-icon" aria-hidden="true">${n}</span>${i.text}
            </button>
          </li>` : u`<li class="chip" style=${`--chip-color: ${i.color}`} title=${i.spoken} aria-label=${i.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${i.text}
        </li>`;
    })}
    </ul>`;
  }
  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  summaryIcon(t) {
    return t.kind === "windows" || t.kind === "conflict-window" ? Ne(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? Wt("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? Re(t.kind === "boost" ? "boost" : "heat") : We(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, i, n, o, s, a) {
    const r = t.thresholds.stale_minutes, l = this.reading(t.temperature, r, a), d = this.reading(t.humidity, r, a), h = this.reading(t.carbon_dioxide, r, a), p = this.pm25Reading(t, a), { t: c } = this._i18n, g = Ni({ temperature: l, humidity: d, co2: h, pm25: p }, n, o, t, c), b = t.image, k = (w) => g.cause === w ? `color: ${g.color}` : m, $ = Pn(t, (w) => this.getState(w), g.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
        style=${b?.kind === "scene" ? `--scene-tone: ${Ds(b.scene)}` : m}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, i)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${g.kind === "unknown" ? `border: 1.5px solid ${f.off}` : `background: ${g.color}`}
          ></span>
          <span style=${`color: ${g.color}; font-weight: ${g.kind === "normal" ? 400 : 500}`}>
            ${g.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${k("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? m}
            aria-label=${c.temperatureLabel(
      this.roomLabel(t),
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${(w) => this.openSheet("history", t, w)}
          >
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${dt}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${k("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? m}
            aria-label=${c.humidityLabel(
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
            ${this.renderAirBlock(t, i, h, p, s)}
            ${this.renderHvac(t, n, i)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, i, $, a)}
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
    const i = t.image;
    return i ? i.kind === "scene" ? u`<div class="scene" aria-hidden="true">${Is(i.scene)}</div>` : u`<div class="scene photo" aria-hidden="true">
      <img src=${i.url} alt="" loading="lazy" decoding="async" />
    </div>` : m;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, i) {
    const n = t.link;
    if (!n)
      return u`<div class="room-title">${this.roomLabel(t)}</div>`;
    const o = `link-description-${i}`;
    return u`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-describedby=${o}
        @click=${() => this.openLink(n)}
      >
        <span class="room-name">${this.roomLabel(t)}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${o}>${n.startsWith("/") ? this._i18n.t.link.page : this._i18n.t.link.web}</span>
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
    return Ii((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Ii(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, i, n) {
    return t.value === void 0 || t.stale ? f.label : t.value >= n ? f.alert : t.value >= i ? f.warning : f.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, i, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return m;
    const { thresholds: a } = t, { t: r } = this._i18n, l = this._config.trends, d = (c, g, b, k, $, w) => {
      if (!g || !b)
        return;
      const x = k.value === void 0 ? void 0 : Ri(this._trends[b], Ft(l, w));
      return r.airSensor(
        c,
        k.value === void 0 ? void 0 : `${this._i18n.whole(k.value)} ${$}`,
        x ? r.trendOver(r.trend[x], this.trendPeriod()) : void 0,
        this.staleSpoken(k)
      );
    }, h = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = `air-description-${i}`;
    return u`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${!t.carbon_dioxide && !t.pm25}
        aria-haspopup="dialog"
        aria-describedby=${p}
        @click=${(c) => this.openSheet("history", t, c, t.hasCo2 ? "co2" : "pm25")}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      u`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      a.co2_warning,
      a.co2_critical,
      s.co2
    ) : m}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      ps(),
      o,
      "µg/m³",
      a.pm25_warning,
      a.pm25_critical,
      s.pm25
    ) : m}
      </button>
      <span class="sr-only" id=${p}>${r.airDescription(this.roomLabel(t), h, this.historyPeriod())}</span>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, i, n, o, s, a, r, l) {
    const d = o.value !== void 0, h = this._i18n.whole(o.value ?? 0), p = this.airColor(o, a, r), c = f[t];
    return u`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? m}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? c : f.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? u`<span class="row-label" style=${`color: ${p}`}>${h}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : u`<span class="row-label" style=${`color: ${f.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, l, c, o.stale === !0) : m}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, i, n) {
    if (!t.temperature || i.value === void 0)
      return m;
    const o = this.renderSpark(t.temperature, n, f.peach, i.stale === !0);
    if (o === m)
      return m;
    const s = Ri(this._trends[t.temperature], Ft(this._config.trends, "temperature")), { t: a } = this._i18n;
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
  renderSpark(t, i, n, o) {
    if (!t)
      return m;
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
    if (!s || !i)
      return m;
    const a = cs(s, i).map(
      (p, c) => p === void 0 ? void 0 : { x: c / Math.max(1, s.length - 1) * 100, y: (1 - p) * 100 }
    ).filter((p) => p !== void 0);
    if (a.length < 2)
      return m;
    const r = a.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "), l = a[0], d = a[a.length - 1], h = `${r} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return u`<span class="spark ${o ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
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
    const { t: o } = this._i18n, s = ai(t, (g) => this.getState(g), this._i18n), a = $e(this.getState(t.air_conditioner), this._i18n), r = (g) => this.renderSystemRow(We(s.unknown ? 0 : s.waves, s.unknown), s, g), l = (g) => this.renderSystemRow(Wt(a.mode, a.color, a.unknown), a, g), d = i ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: a.active }), p = d.map((g) => `${o.system[g]} ${oa(g === "heating" ? s : a, this._i18n)}`).join(", "), c = `hvac-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${c}
        @click=${(g) => h ? this.openSheet(h, t, g) : void 0}
      >
        ${i ? l(!0) : r(!0)}
        ${i ? r(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${c}>${o.hvacDescription(this.roomLabel(t), p, h)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  /** The system a tap on the HVAC lines opens: the one that runs (a ventilation started on the air conditioner in winter opens Klimatizace), otherwise the first by the house mode. */
  hvacTarget(t, i, n) {
    const o = (a) => a === "heating" ? !!t.heating?.climate : !!t.air_conditioner, s = i.filter((a) => o(a) && n?.[a]);
    return s.length === 1 ? s[0] : i.find(o);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, i, n) {
    return u`
      <span
        class="system-row ${n && i.active ? "strong" : ""}"
        style=${`--row-color: ${i.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${i.label}</span>
            ${i.extra ? u`<span class="row-unit">${i.extra}</span>` : m}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, i) {
    const n = this.getState(t), o = n?.state.toLowerCase();
    if (o === void 0 || tt(o))
      return { state: "unknown" };
    if (o !== "on")
      return { state: "closed" };
    const s = Date.parse(n?.last_changed ?? "");
    return { state: "open", minutesOpen: Number.isNaN(s) ? void 0 : Math.max(0, (i - s) / 6e4) };
  }
  /**
   * The window row (CURRENT_SPEC.md, Vizuální pravidla): one row also for a room with several
   * windows. Any open window makes the room open ("Otevřeno", or "Otevřena 2" with two or more
   * open) with the time of the one open longest; all closed is "Zavřeno"; none open and one
   * unknown is "––" (unknown is never taken as closed). The conflict dot sits right after the
   * label and takes the place of the "·" before the time, so on a narrow card the time is what
   * gives way, never the dot.
   */
  renderWindow(t, i, n, o) {
    const { t: s } = this._i18n, a = t.windows.map((C) => ({ window: C, ...this.windowState(C.entity, o) })), r = a.filter((C) => C.state === "open"), l = r.length > 0, d = !l && (a.length === 0 || a.some((C) => C.state === "unknown")), h = t.windows.length > 1, p = l ? f.sky : f.label, c = l ? r.length > 1 ? s.window.openCount(r.length) : s.window.open : d ? "––" : s.window.closed, g = r.map((C) => C.minutesOpen).filter((C) => C !== void 0), b = g.length > 0 ? Math.max(...g) : void 0, k = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, $ = `window-description-${i}`, w = b === void 0 ? void 0 : Di(b, s);
    let x;
    if (!h)
      x = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", w);
    else if (l) {
      const C = r.map((E) => this.windowName(t, E.window)).join(", ");
      x = r.length === 1 ? s.window.spokenOneOpen(C, w) : s.window.spokenManyOpen(C, w);
    } else
      x = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const N = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${p}`}
        ?disabled=${!N}
        aria-haspopup=${h ? "dialog" : m}
        aria-describedby=${$}
        @click=${(C) => h ? this.openSheet("windows", t, C) : this.showMoreInfo(N)}
      >
        <span class="row-main">
          <span class="row-icon">${Ne(d ? f.off : p, d)}</span>
          <span class="row-text">
            <span class="row-label">${c}</span>
            ${k ? u`<span class="conflict-dot" aria-hidden="true"></span>` : m}
            ${b === void 0 ? m : u`<span class="row-unit window-duration"
                  >${`${k ? "" : `${dt}·${dt}`}${Le(b)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${$}>${s.window.description(this.roomLabel(t), x, k, h)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, i) {
    return Zt(i.name, this._i18n.language) ?? this._i18n.t.window.defaultName(t.windows.indexOf(i) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, i) {
    const { t: n } = this._i18n;
    return u`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: a } = this.windowState(o.entity, i), r = s === "unknown", l = s === "open" ? f.sky : f.label;
      return u`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Ne(r ? f.off : l, r)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint window-state" style=${`color: ${l}`}>
                ${r ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : s === "open" ? n.window.open : n.window.closed}${a === void 0 ? m : u`${dt}·${dt}${Le(a)}`}
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
      return m;
    const { t: i } = this._i18n, n = t === "on", o = `${i.ventilation.title}. ${n ? i.summaryChips.ventilationSpoken : i.summaryChips.ventilationOffSpoken}`;
    return u`<button
      type="button"
      class="plain-button vent-trigger ${n ? "on" : "off"}"
      title=${o}
      aria-label=${o}
      aria-haspopup="dialog"
      @click=${(s) => this.openVentilationSheet(s)}
    >
      <span class="vent-icon" aria-hidden="true">${Wt("fan", n ? f.fresh : f.label, !1)}</span>
      ${n ? u`<span>${i.ventilation.title}</span>` : m}
    </button>`;
  }
  /** The popup of the ventilation mode (it has no room; the first one stands in). */
  openVentilationSheet(t) {
    const i = this._config?.rooms[0];
    i && (this._ventilationEnding = !1, this._announcement = "", this.openSheet("ventilation", i, t), this.loadVentilation());
  }
  /**
   * The last run of the mode and, per room, the CO₂ at its start and end and whether a window was
   * open during it: from the history of Home Assistant (the mode over a week, then the CO₂ and the
   * windows over that run). Nothing is stored.
   */
  async loadVentilation() {
    const t = this.hass, i = this._config?.ventilationEntity;
    if (!t || !i)
      return;
    const n = ++this._ventRequest, o = Date.now();
    try {
      const s = await oe(t, [i], o - 168 * Ct, o), a = Hs(s[i]);
      if (n !== this._ventRequest)
        return;
      if (!a) {
        this._vent = { rooms: [] };
        return;
      }
      const r = this.ventilationRooms(), l = a.end ?? o, d = r.flatMap(($) => [
        $.carbon_dioxide,
        $.temperature,
        $.humidity,
        ...$.windows.map((w) => w.entity)
      ]), h = (this._config?.ventilationSettleMinutes ?? 25) * 6e4, p = a.end === void 0 ? void 0 : a.end + h, c = await oe(
        t,
        d.filter(($) => $ !== void 0),
        a.start - 30 * 6e4,
        p === void 0 ? l : Math.min(o, Math.max(l, p))
      );
      if (n !== this._ventRequest)
        return;
      const g = p !== void 0 && p <= o ? p : void 0, b = ($) => ({
        before: $(a.start),
        after: a.end === void 0 ? void 0 : $(a.end),
        settled: g === void 0 ? void 0 : $(g)
      }), k = ($) => (w) => $ === void 0 ? void 0 : he(Qt(c[$], w));
      this._vent = {
        session: a,
        rooms: r.map(($) => {
          const w = $.carbon_dioxide === void 0 ? void 0 : b(k($.carbon_dioxide));
          return {
            name: $.name,
            opened: $.windows.some((x) => Fs(c[x.entity], a.start, l)),
            start: w?.before,
            end: he(Qt(c[$.carbon_dioxide ?? ""], l)),
            co2: w,
            temperature: $.temperature === void 0 ? void 0 : b(k($.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity: $.temperature === void 0 || $.humidity === void 0 ? void 0 : b((x) => Qi(k($.temperature)(x), k($.humidity)(x)))
          };
        })
      };
    } catch (s) {
      console.error("Klima Dashboard: the ventilation history could not be loaded", s), n === this._ventRequest && (this._vent = { rooms: [], failed: !0 });
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
    const { t: i } = this._i18n, n = i.ventilation, o = this._config, s = this.ventilationOn(), a = o?.ventilationCo2Target ?? 500, r = o?.ventilationCo2Full ?? 420, l = this._vent, d = l?.session, h = u`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${i.unknownValue}</span>`, p = this._sheetError, c = o?.ventilationTimerEntity, g = this.getState(c), b = g?.state.toLowerCase() === "active" ? Date.parse(String(g.attributes.finishes_at ?? "")) : Number.NaN, k = Number.isNaN(b) || b <= t ? void 0 : b, $ = Date.parse(this.getState(o?.ventilationEntity)?.last_changed ?? ""), w = Number.isNaN($) ? void 0 : Math.max(0, (t - $) / 6e4), x = this.ventilationRooms().flatMap((T) => {
      const I = l?.rooms.find((_) => _.name === T.name), R = ye(T, (_) => this.getState(_)).length > 0;
      if (!R && !I?.opened)
        return [];
      const B = this.getState(T.carbon_dioxide), q = s ? he(B?.state) : I?.end, Q = I?.start, K = Q !== void 0 && q !== void 0 ? js(Q, q, a, r) : void 0;
      return [{ room: T, startValue: Q, live: q, steps: K, open: R }];
    }), N = o?.ventilationSettleMinutes ?? 25, C = d?.end !== void 0 && t >= d.end + N * 6e4, E = s ? [n.before, i.chart.now] : [n.before, n.after, C ? n.settledShort(N) : i.chart.now], S = s ? E : [n.before, n.after, C ? n.settledAfter(N) : i.chart.now], A = (T) => {
      const I = l?.rooms.find((_) => _.name === T.room.name), R = T.steps === void 0 ? void 0 : Math.min(100, Math.floor(T.steps.done * 100)), B = [
        { label: n.quantity.co2, entity: T.room.carbon_dioxide, triple: I?.co2, live: he(this.getState(T.room.carbon_dioxide)?.state), digits: !1 },
        { label: n.quantity.temperature, entity: T.room.temperature, triple: I?.temperature, live: Y(this.getState(T.room.temperature)?.state), digits: !0 },
        {
          label: n.quantity.humidity,
          entity: T.room.temperature !== void 0 && T.room.humidity !== void 0 ? T.room.humidity : void 0,
          triple: I?.humidity,
          live: Qi(Y(this.getState(T.room.temperature)?.state), Y(this.getState(T.room.humidity)?.state)),
          digits: !0
        }
      ].filter((_) => _.entity).map((_) => {
        const at = s ? [_.triple?.before, _.live] : [_.triple?.before, _.triple?.after, C ? _.triple?.settled : _.live];
        return {
          label: _.label,
          shown: at.map((bt) => bt === void 0 ? void 0 : _.digits ? this._i18n.one(bt) : this._i18n.whole(bt))
        };
      }), q = T.steps?.closable === !0, Q = [
        s && R !== void 0 ? `${n.done} ${this._i18n.percent(R)}${q ? `, ${n.closable}` : ""}` : void 0,
        ...B.map((_) => n.lineSpoken(_.label, _.shown.map((at, bt) => `${S[bt]} ${at ?? i.unknownValue}`).join(", ")))
      ].filter((_) => _ !== void 0).join(". "), K = T.open ? q ? f.fresh : f.warning : f.label;
      return u`<div class="vent-room ${s ? "with-ring" : ""}" role="group" aria-label=${n.roomSpoken(this.roomLabel(T.room), Q)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(T.room)}${s && !T.open ? u`<span class="vent-note">${n.windowClosed}</span>` : m}
          </div>
          ${B.map(
        (_) => u`<div class="vent-line">
              <span class="vent-q">${_.label}</span>
              ${_.shown.map((at) => u`<span class="vent-num">${at ?? u`<span class="no-data">––</span>`}</span>`)}
            </div>`
      )}
        </div>
        ${s ? u`<kd-ring
              aria-hidden="true"
              fraction=${(R ?? 0) / 100}
              size="40"
              stroke="6"
              num=${R === void 0 ? "––" : String(R)}
              style=${`--hdk-ring-fill: ${R === void 0 ? f.label : K}; grid-row: 2 / span ${B.length}`}
            ></kd-ring>` : m}
      </div>`;
    }, M = x.length === 0 ? m : u`<div class="vent-table" role="group" aria-label=${n.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${E.map((T) => u`<span class="vent-num">${T}</span>`)}
              ${s ? u`<span class="vent-num ring-head">↓ ${this._i18n.whole(r)}<span class="ring-unit"> ppm</span></span>` : m}
            </div>
            ${x.map(A)}
          </div>`;
    let z = m;
    return s ? z = u`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${n.running}
              ${w === void 0 ? h : u`<span aria-hidden="true">${Le(w)}</span
                    ><span class="sr-only">${Di(w, i)}</span>`}
            </span>
          </span>
          ${c === void 0 ? m : u`<span class="list-value vent-ends">${n.endsBy} ${k === void 0 ? h : this._i18n.time(k)}</span>`}
        </div>` : d && (z = u`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${n.last}</span></span>
          <span class="list-value">${new Date(d.start).toDateString() === new Date(t).toDateString() ? m : `${this._i18n.day(d.start)} `}${this._i18n.time(d.start)}${d.end === void 0 ? m : u`–${this._i18n.time(d.end)}`}</span>
        </div>`), u`
      ${!s && !d ? m : u`<div class="static-list" role="group" aria-label=${n.title}>${z}${M}</div>`}
      ${!s && !d && l !== void 0 ? u`<p class="timer-foot">${n.never}</p>` : m}
      ${s ? u`<button
              type="button"
              class="plain-button vent-end ${p ? "error" : ""}"
              ?disabled=${this._ventilationEnding}
              aria-busy=${this._ventilationEnding ? "true" : "false"}
              @click=${() => {
      this.endVentilation();
    }}
            >
              ${p ?? (this._ventilationEnding ? n.ending : n.end)}
            </button>
            ${p ? u`<span class="sr-only" role="alert">${p}</span>` : m}` : m}
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
      } catch (i) {
        console.error("Klima Dashboard: ending the ventilation mode failed", i), this._sheetError = this._i18n.t.sheet.commandFailed, this._ventilationEnding = !1, this.haptic("failure");
      }
    }
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, i) {
    const n = this.getState(i), o = n?.state.toLowerCase(), s = o !== void 0 && !tt(o), a = s ? yt(n?.attributes.current_position) : void 0, r = s ? yt(n?.attributes.current_tilt_position) : void 0, l = a !== void 0 && r !== void 0, d = o === "opening" || o === "closing", { t: h } = this._i18n, p = l ? h.cover.position(Math.round(a), Math.round(r)) : h.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${h.cover.label(this.roomLabel(t), p, d)}
        @click=${() => this.showMoreInfo(i)}
      >
        <svg
          viewBox="0 0 ${me} ${Fe}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${yo(a, r)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${h.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((c) => this.renderPreset(t, c, a, r, s))}
      </div>
    `;
  }
  renderPreset(t, i, n, o, s) {
    const a = this._moving[t.name], r = a === i.id, l = a === void 0 && Oe(n, o, i, this.tolerance()), d = `${t.name}|${i.id}`, { t: h } = this._i18n, p = Po(i, h, this._i18n.language), c = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${r ? "pending" : ""} ${c ? "failed" : ""}"
        title=${p}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${r ? "true" : m}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${c && this._hint?.spoken ? `${h.cover.preset(this.roomLabel(t), p, Hi(i, h, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : h.cover.preset(this.roomLabel(t), p, Hi(i, h, this._i18n.language), s)}
        @pointerdown=${(g) => this.pressStart(g, t, i, s)}
        @pointerup=${() => this.pressEnd(t, i, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(g) => g.preventDefault()}
        @click=${(g) => {
      g.detail === 0 && (s ? this.applyPreset(t, i) : this.showUnavailable(d));
    }}
      >
        ${us(i.icon)}
        ${this._hint?.key !== d ? m : c ? u`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : u`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, i, n, o) {
    t.button !== 0 || !o || this._gesture.start(() => {
      window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(i, n);
    });
  }
  pressEnd(t, i, n) {
    const o = `${t.name}|${i.id}`;
    if (!n) {
      this.showUnavailable(o);
      return;
    }
    const s = this._gesture.tap(o, performance.now());
    if (s !== "none") {
      if (window.clearTimeout(this._hintTimer), s === "double") {
        this._hint = void 0, this.applyPreset(t, i);
        return;
      }
      this._hintTimer = window.setTimeout(() => {
        this._gesture.pending(o) && (this._gesture.forget(), this.showHint(o, this._i18n.t.cover.hint, "selection"));
      }, on);
    }
  }
  pressCancel() {
    this._gesture.cancel();
  }
  showUnavailable(t) {
    this._gesture.forget(), window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, i, n, o) {
    this._hint = { key: t, text: i, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? ua : pa);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, i) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || tt(n)) {
      this.showUnavailable(`${t.name}|${i.id}`);
      return;
    }
    this.startMoving(t, t.cover, i);
    try {
      const [o, s] = this._config.covers.script.split(".");
      await this.hass.callService(o, s, {
        entity: t.cover,
        pos: i.position,
        tilt: i.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${i.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, ha);
    } catch (o) {
      console.error("Klima Dashboard: the blind script failed", o), this.endMoving(t.name);
      const { cover: s } = this._i18n.t;
      this.showHint(`${t.name}|${i.id}`, s.failedHint, "failure", { spoken: s.failed(this.roomLabel(t)) });
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, i, n) {
    const o = this.getState(i);
    if (Oe(
      yt(o?.attributes.current_position),
      yt(o?.attributes.current_tilt_position),
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
      const i = this._moving[t.name], n = t.presets.find((l) => l.id === i), o = this._movingWatch.get(t.name);
      if (!n || !o || !t.cover)
        continue;
      const s = this.getState(t.cover), a = s?.state.toLowerCase();
      if (a === void 0 || tt(a) || Oe(
        yt(s?.attributes.current_position),
        yt(s?.attributes.current_tilt_position),
        n,
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
  // ----------------------------------------------------------------- sheet
  renderSheet(t) {
    const i = this._sheet;
    if (!i)
      return m;
    const { t: n } = this._i18n;
    if (i.kind === "history")
      return this.renderSheetFrame(
        n.sheet.history(this._config?.history.hours ?? 24),
        this.roomLabel(i.room),
        this.renderHistoryBody(i.room, i.metric ?? "temperature", t),
        "history-sheet"
      );
    if (i.kind === "ventilation")
      return this.renderSheetFrame(n.ventilation.title, void 0, this.renderVentilationBody(Date.now()));
    if (i.kind === "windows")
      return this.renderSheetFrame(n.window.popup, this.roomLabel(i.room), this.renderWindowsBody(i.room, Date.now()));
    const { title: o, sub: s } = this.hvacTitle(i.kind);
    return this.renderSheetFrame(o, s, this.renderHvacBody(i.room, i.kind, t));
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, i, n, o = "") {
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
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : m}
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
                ${i ? u`<div class="sheet-sub">${i}</div>` : m}
              </div>
              <button type="button" class="plain-button close" aria-label=${this._i18n.t.sheet.close} @click=${() => this.closeSheet()}>
                <span class="close-icon" aria-hidden="true"
                  ><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <path d="M2 2l8 8M10 2l-8 8"></path></svg
                ></span>
              </button>
            </div>
          </div>
          ${n}
        </div>
      </div>
    `;
  }
  /** Title of the Topení / Klimatizace popup: the room, or the rooms it sets together (names, or "all"). */
  hvacTitle(t) {
    const { t: i } = this._i18n, n = this.sheetRooms().filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner);
    if (n.length <= 1) {
      const a = n[0] ?? this._sheet?.room;
      return { title: a ? this.roomLabel(a) : "" };
    }
    const o = (this._config?.rooms ?? []).filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner), s = n.length === o.length;
    return { title: s ? i.sheet.allRooms : n.map((a) => this.roomLabel(a)).join(", "), sub: s ? n.map((a) => this.roomLabel(a)).join(", ") : void 0 };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, i, n) {
    const o = this.sheetRooms(), s = o.filter((c) => c.heating?.climate), a = o.filter((c) => c.air_conditioner), r = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && a.length > 0, { t: d } = this._i18n, h = i === "heating" ? this.renderHeatingPanel(s) : this.renderClimatePanel(a), p = l ? u`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(c) => this.segmentKeydown(c, r, i)}
        >
          ${r.map(
      (c) => u`<button
              type="button"
              role="tab"
              id=${`tab-${c}`}
              class="plain-button segment"
              data-system=${c}
              aria-selected=${c === i ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${c === i ? "0" : "-1"}
              @click=${() => this.switchSheet(c)}
            >
              ${d.system[c]}
            </button>`
    )}
        </div>` : u`<div class="sheet-label system-name">${d.system[i]}</div>`;
    return u`${p}
      <div class="hvac-panel" role=${l ? "tabpanel" : m} id="hvac-panel" aria-labelledby=${l ? `tab-${i}` : m}>
        ${h}
      </div>`;
  }
  /** "Teď 21,9 °C" under the big value: only for one room (a group has no single temperature). */
  roomNow(t) {
    if (t.length !== 1)
      return "";
    const i = Y(this.getState(t[0].temperature)?.state);
    return i === void 0 ? "" : this._i18n.t.sheet.now(`${this._i18n.one(i)}${dt}°C`);
  }
  renderHeatingPanel(t) {
    const { t: i } = this._i18n, n = t[0], o = n?.heating?.climate, s = this.getState(o), a = s !== void 0 && !tt(s.state.toLowerCase()), r = Ht(s?.attributes.hvac_modes);
    if (!n || !o || !a)
      return u`<p class="sheet-message">${i.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const l = this.heatControl(n, o, s), d = this.heatingOptions(o, r, va(l));
    if (d.length === 0 || !l)
      return u`<p class="sheet-message">${i.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const h = i.sheet.heatControl, p = this.timerAvailable(), c = this.wholeRange(xn(yn(s))), g = Y(s?.attributes.temperature), b = s?.state.toLowerCase() === "auto" && g !== void 0 && g > vt ? g : void 0, k = l.mode === "boost" ? f.alert : l.mode === "manual" || l.mode === "plan" ? f.warning : f.off;
    let $;
    l.mode === "off" ? $ = this.renderDial({ id: "heat-dial", text: i.heatingMode.off, eyebrow: i.system.heating, sub: this.roomNow(t), tone: k }) : l.mode === "plan" ? $ = this.renderDial({
      id: "heat-dial",
      value: b,
      min: c.min,
      max: c.max,
      eyebrow: h.bySchedule,
      sub: this.roomNow(t),
      tone: k
    }) : l.mode === "boost" ? $ = this.renderDial({
      id: "heat-dial",
      value: _e,
      min: c.min,
      max: c.max,
      eyebrow: i.heatingMode.boost,
      sub: this.roomNow(t),
      tone: k
    }) : $ = this.renderDial({
      id: "heat-dial",
      value: Math.round(l.temperature),
      min: c.min,
      max: c.max,
      eyebrow: h.temperature,
      sub: this.roomNow(t),
      tone: k,
      label: h.temperatureSlider,
      onChange: (M) => this.editHeat(n, o, { temperature: M, mode: "manual" })
    });
    const w = p, x = l.mode === "plan", N = Vt(l.duration), C = (l.mode === "manual" || l.mode === "boost") && N !== void 0, E = l.after ?? this.defaultAfter(), S = N !== void 0 ? `${jt(N)} · ${h.until(this._i18n.time(Date.now() + N * 6e4))}` : l.duration === Tt ? h.nextPlan : h.untilResumed, A = N === void 0 ? l.duration === Tt ? h.footPlan : l.mode === "off" ? h.footOffForever : h.footForever : l.mode === "off" ? h.footOffTimed(this._i18n.time(Date.now() + N * 6e4)) : h.footTimed(this._i18n.time(Date.now() + N * 6e4), E === "off" ? h.afterOffText : h.afterPlanText);
    return u`
      ${$}
      <div class="options icon-options" role="group" aria-label=${i.sheet.modes(i.system.heating)}>
        ${d.map((M) => this.renderOption(M))}
      </div>
      ${w ? u`<div class="timer-card ${x ? "dim" : ""}" ?inert=${x}>
              ${this.renderTimer({
      slot: es(l.duration),
      last: J.length + 1,
      readout: S,
      label: h.durationSlider,
      leftLabel: h.nextPlan,
      leftIcon: Re("auto"),
      leftText: u`<b>${i.heatingMode.schedule}</b>`,
      rightLabel: h.untilResumed,
      onSlot: (M) => this.editHeat(n, o, { duration: is(M) })
    })}
              ${u`<div class="after-row ${C ? "" : "away"}" ?inert=${!C}>
                    <span id="after-label">${h.after}</span>
                    <div class="mini-segmented" role="group" aria-labelledby="after-label">
                      ${["plan", "off"].map(
      (M) => u`<button
                          type="button"
                          class="plain-button mini-segment"
                          aria-pressed=${E === M ? "true" : "false"}
                          @click=${() => this.chooseAfter(n, o, M)}
                        >
                          ${M === "plan" ? i.heatingMode.schedule : i.heatingMode.off}
                        </button>`
    )}
                    </div>
                  </div>`}
            </div>
            <p class="timer-foot">${x ? h.footIdle : A}</p>` : l.mode === "manual" && !p ? u`<p class="sheet-message">${h.noTimer}</p>` : m}
      <p class="heat-note" role="status">${this.heatNote(n, o, s, d.filter((M) => M.unsupported).map((M) => `${M.label}: ${M.unsupported}`))}</p>
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : m}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  renderClimatePanel(t) {
    const { t: i } = this._i18n, n = t[0], o = n?.air_conditioner, s = this.getState(o), a = s !== void 0 && !tt(s.state.toLowerCase());
    if (!n || !o || !a)
      return u`<p class="sheet-message">${i.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const r = Ht(s?.attributes.hvac_modes), l = Ht(s?.attributes.preset_modes), d = s?.state.toLowerCase(), h = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = this.climateOptions(o, r, d, l, h);
    if (p.length === 0)
      return u`<p class="sheet-message">${i.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const c = $e(s, this._i18n), g = Math.ceil(Y(s?.attributes.min_temp) ?? 16), b = Math.floor(Y(s?.attributes.max_temp) ?? 30), k = this._acTarget ?? Y(s?.attributes.temperature), $ = k === void 0 ? void 0 : Math.round(k), w = ["cool", "wind_free", "heat", "auto"].includes(c.mode), x = c.mode === "off" || c.mode === "fan" || c.mode === "dry" || c.mode === "unknown", N = this.renderDial({
      id: "ac-dial",
      text: x ? i.climateMode[c.mode === "unknown" ? "unknown" : c.mode] : void 0,
      value: x ? void 0 : $,
      min: g,
      max: b,
      eyebrow: c.mode === "off" ? i.system.climate : x ? i.sheet.mode : i.sheet.heatControl.temperature,
      sub: this.roomNow(t),
      tone: c.color,
      label: i.sheet.heatControl.temperatureSlider,
      onChange: w ? (_) => this._acTarget = _ : void 0,
      onCommit: w ? () => {
        this.runSheetAction(() => this.commitAcTarget(t));
      } : void 0
    }), C = Ht(s?.attributes.fan_modes), E = Ht(s?.attributes.swing_modes), S = String(s?.attributes.fan_mode ?? "").toLowerCase(), A = String(s?.attributes.swing_mode ?? "").toLowerCase(), M = l.filter((_) => _ !== "none" && _ !== "wind_free"), z = c.active, T = this._ac?.duration ?? Et, I = Vt(T), R = i.sheet.heatControl, B = I === void 0 ? R.noLimit : `${jt(I)} · ${R.until(this._i18n.time(Date.now() + I * 6e4))}`, q = I === void 0 ? R.acFootForever : R.acFootTimed(this._i18n.time(Date.now() + I * 6e4)), Q = !!this.hass?.callWS, K = !z;
    return u`
      ${N}
      <div class="options climate-options" role="group" aria-label=${i.sheet.modes(i.system.climate)}>
        ${p.map((_) => this.renderOption(_))}
      </div>
      ${Q ? u`<div class="timer-card ${K ? "dim" : ""}" ?inert=${K}>
              ${this.renderTimer({
      slot: ns(T),
      last: J.length,
      readout: B,
      label: R.durationSlider,
      leftLabel: jt(J[0]),
      leftIcon: Ki(),
      leftText: u`<b>${jt(J[0])}</b>`,
      rightLabel: R.noLimit,
      onSlot: (_) => this._ac = { duration: os(_), touched: !0 }
    })}
            </div>
            <p class="timer-foot">${K ? R.acFootIdle : q}</p>` : m}
      ${C.length > 0 ? this.renderChoice(i.sheet.climate.fan, C, S, K, (_) => this.callClimateEach(t, "set_fan_mode", { fan_mode: _ }), (_) => this.fanLabel(_)) : m}
      ${E.length > 0 ? this.renderChoice(i.sheet.climate.swing, E, A, K, (_) => this.callClimateEach(t, "set_swing_mode", { swing_mode: _ }), (_) => this.swingLabel(_)) : m}
      ${M.length > 0 ? u`<div class="sheet-label" id="preset-label">${i.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${M.map((_) => this.renderPresetChip(t, _, h, d, l))}
            </div>` : m}
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : m}
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
    </button>` : m;
  }
  /** Whole-degree range of the dial (the dial moves by 1 °C). */
  wholeRange(t) {
    return { min: Math.ceil(t.min), max: Math.floor(t.max) };
  }
  fanLabel(t) {
    return this._i18n.t.sheet.climate.fanModes[t.toLowerCase()] ?? fe(t);
  }
  swingLabel(t) {
    return this._i18n.t.sheet.climate.swingModes[t.toLowerCase()] ?? fe(t);
  }
  /** A row of mutually exclusive choices (iOS segmented look), e.g. the fan speed. */
  renderChoice(t, i, n, o, s, a) {
    return u`<div class="sheet-label">${t}</div>
      <div class="mini-segmented wide ${o ? "dim" : ""}" ?inert=${o} role="group" aria-label=${t}>
        ${i.map(
      (r) => u`<button
            type="button"
            class="plain-button mini-segment"
            aria-pressed=${r.toLowerCase() === n ? "true" : "false"}
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
    const l = (S) => [
      136 + 118 * Math.cos(S * Math.PI / 180),
      136 + 118 * Math.sin(S * Math.PI / 180)
    ], d = (S, A) => {
      const [M, z] = l(S), [T, I] = l(A);
      return `M${M.toFixed(2)} ${z.toFixed(2)} A118 118 0 ${A - S > 180 ? 1 : 0} 1 ${T.toFixed(2)} ${I.toFixed(2)}`;
    }, h = t.min ?? 0, p = t.max ?? 1, c = t.text === void 0 ? t.value : void 0, g = c === void 0 || p <= h ? 0 : Math.min(1, Math.max(0, (c - h) / (p - h))), b = 135 + 270 * g, [k, $] = l(b), w = t.onChange !== void 0 && c !== void 0, x = t.text ?? (c === void 0 ? "––" : `${this._i18n.whole(c)}°`), N = (S) => {
      const A = S.currentTarget.getBoundingClientRect();
      let M = Math.atan2(S.clientY - (A.top + A.height / 2), S.clientX - (A.left + A.width / 2)) * 180 / Math.PI;
      return M < 0 && (M += 360), M < 135 && (M += 360), M > 405 && (M = M - 405 < 90 / 2 ? 405 : 135), Math.round(h + (M - 135) / 270 * (p - h));
    }, C = (S) => {
      if (!w)
        return;
      if (S.type === "pointerdown")
        S.currentTarget.setPointerCapture?.(S.pointerId);
      else if (S.buttons !== 1)
        return;
      const A = N(S);
      A !== c && t.onChange?.(A);
    }, E = (S) => {
      if (!w || c === void 0)
        return;
      const A = S.key === "ArrowUp" || S.key === "ArrowRight" ? 1 : S.key === "ArrowDown" || S.key === "ArrowLeft" ? -1 : 0, M = S.key === "Home" ? h : S.key === "End" ? p : c + A;
      M === c && A === 0 && S.key !== "Home" && S.key !== "End" || (S.preventDefault(), t.onChange?.(Math.min(p, Math.max(h, M))), t.onCommit?.());
    };
    return u`
      <div class="dial" style=${`--tone: ${t.tone}`}>
        <div
          class="dial-ring"
          data-drag
          role=${w ? "slider" : "img"}
          tabindex=${w ? "0" : m}
          aria-label=${t.label ?? `${t.eyebrow}: ${x}`}
          aria-valuemin=${w ? h : m}
          aria-valuemax=${w ? p : m}
          aria-valuenow=${w ? c : m}
          aria-valuetext=${w ? `${x} °C` : m}
          @pointerdown=${C}
          @pointermove=${C}
          @pointerup=${() => w && t.onCommit?.()}
          @keydown=${E}
        >
          <svg viewBox="0 0 ${272} ${232}" aria-hidden="true">
            <path class="dial-track" d=${d(135, 405)}></path>
            ${c === void 0 || g <= 0 ? m : y`<path class="dial-value" d=${d(135, Math.max(136, b))}></path>`}
            ${c === void 0 ? m : y`<circle class="dial-knob ${w ? "" : "still"}" cx=${k} cy=${$} r="12"></circle>`}
          </svg>
          <div class="dial-text" aria-hidden="true">
            <span class="dial-eyebrow">${t.eyebrow}</span>
            <span class="dial-big ${t.text === void 0 ? "" : "word"}">${x}</span>
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
    const { slot: i, last: n } = t, o = n > 0 ? i / n * 100 : 0, s = (r) => {
      if (r.type === "pointerdown")
        r.currentTarget.setPointerCapture?.(r.pointerId);
      else if (r.buttons !== 1)
        return;
      const l = r.currentTarget.getBoundingClientRect(), d = Math.round(Math.min(1, Math.max(0, (r.clientX - l.left) / Math.max(l.width, 1))) * n);
      d !== i && t.onSlot(d);
    }, a = (r) => {
      const l = r.key === "ArrowRight" || r.key === "ArrowUp" ? 1 : r.key === "ArrowLeft" || r.key === "ArrowDown" ? -1 : 0, d = r.key === "Home" ? 0 : r.key === "End" ? n : i + l;
      l === 0 && r.key !== "Home" && r.key !== "End" || (r.preventDefault(), t.onSlot(Math.min(n, Math.max(0, d))));
    };
    return u`
      <div class="timer-read" role="status">${t.readout}</div>
      <div class="timer-row">
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.leftLabel}
          aria-pressed=${i === 0 ? "true" : "false"}
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
          aria-valuemax=${n}
          aria-valuenow=${i}
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
          aria-pressed=${i === n ? "true" : "false"}
          @click=${() => t.onSlot(n)}
        >
          <span class="end-icon infinity" aria-hidden="true">∞</span>
        </button>
      </div>
      <div class="timer-ticks" aria-hidden="true"><span>${t.leftText}</span><span><b>∞</b></span></div>
    `;
  }
  segmentKeydown(t, i, n) {
    const o = i.indexOf(n);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = i[(o + 1) % i.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = i[(o - 1 + i.length) % i.length] : t.key === "Home" ? s = i[0] : t.key === "End" && (s = i[i.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === n ? this.requestUpdate() : this.switchSheet(s));
  }
  /** "Teď" of the air chart is the reading of the room card (CO₂ and PM2.5), so a stale value is grey there too. */
  liveReading(t, i) {
    if (i === "temperature")
      return;
    const n = Date.now(), o = this.reading(t.carbon_dioxide, t.thresholds.stale_minutes, n), s = this.pm25Reading(t, n), a = i === "pm25" ? s : o;
    return {
      value: a.value,
      stale: a.stale === !0,
      secondary: i === "co2" ? { value: s.value, stale: s.stale === !0 } : void 0
    };
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, i, n) {
    const o = this._config?.history.hours ?? 24, { t: s } = this._i18n;
    let a;
    const r = this._historyModel;
    return this._historyStatus === "loading" ? a = u`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !r ? a = u`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : _s(r, i) ? a = u`<div
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
        ${Rs(r, i, this.chartWidth(), this._scrubTime, this._i18n, n, this.liveReading(t, i))}
      </div>` : a = u`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, a;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(ca).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  sheetCannotScroll(t, i) {
    const n = this.renderRoot.querySelector(".sheet");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || i > 0 && n.scrollTop <= 0 || i < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
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
          ${t.unsupported ? u`<span class="option-hint">${t.unsupported}</span>` : m}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, i, n, o, s) {
    const a = n === i && o !== "off", r = a && s.includes("none") ? "none" : i;
    return u`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${a ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.callClimateEach(t, "set_preset_mode", { preset_mode: r }));
    }}
      >
        ${fe(i)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost (a fixed 25 °C) and the duration of Ručně / Boost / Vypnuto need the
   * Tado CE action `tado_ce.set_climate_timer`; without it Boost is shown but disabled.
   * A choice is applied when the popup closes.
   */
  heatingOptions(t, i, n) {
    const o = [], s = this._i18n.t.heatingMode, a = this.timerAvailable(), r = (l, d, h, p, c) => {
      o.push({
        id: l,
        label: d,
        icon: Re(l),
        color: h,
        active: n === l,
        run: () => this.chooseHeating(t, p),
        unsupported: c
      });
    };
    return i.includes("off") && r("off", s.off, f.off, "off"), i.includes("auto") && r("auto", s.schedule, f.plan, "plan"), i.includes("heat") && r("heat", s.manual, f.warning, "manual"), o.length > 0 && r("boost", s.boost, f.alert, "boost", a ? void 0 : this._i18n.t.sheet.notOffered), o;
  }
  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  timerAvailable() {
    return !!this.hass?.services?.tado_ce?.set_climate_timer;
  }
  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  heatControl(t, i, n) {
    return this._heat?.entityId === i ? this._heat : qi(t.name, i, n);
  }
  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  async chooseHeating(t, i) {
    const n = this._sheet?.room;
    if (!n)
      return;
    const o = this.getState(t);
    if (qi(n.name, t, o)?.mode === i && this.sheetRooms().length === 1) {
      this._heat = void 0;
      return;
    }
    const a = this.heatControl(n, t, o);
    this._heat = {
      room: n.name,
      entityId: t,
      mode: i,
      temperature: a?.temperature ?? 21,
      duration: $n(i),
      after: a?.after
    };
  }
  /** Sends the changes made in the popup (closing, switching system, leaving for the detail). */
  flushHeat() {
    const t = this._heat;
    if (t) {
      this._heat = void 0;
      const i = this.sheetRooms().filter((n) => n.heating?.climate);
      this.applyHeat(t, i.length > 0 ? i : []);
    }
    this.flushAc();
  }
  /** The Klimatizace "turn off after" time: a script that Home Assistant runs by itself. */
  flushAc() {
    const t = this._ac;
    this._ac = void 0, this._acTarget = void 0;
    const i = t?.touched ? Vt(t.duration) : void 0;
    if (i !== void 0)
      for (const n of this.sheetRooms()) {
        const o = n.air_conditioner, s = this.getState(o)?.state.toLowerCase();
        o && s && s !== "off" && !tt(s) && this.runDelayedOff(Wi(o, i, s));
      }
  }
  async runDelayedOff(t) {
    try {
      await this.hass?.callWS({ type: "execute_script", ...t });
    } catch (i) {
      console.error("Klima Dashboard: scheduling the switch-off failed", i), this.haptic("failure");
    }
  }
  async applyHeat(t, i) {
    const n = Vt(t.duration), o = (t.mode === "manual" || t.mode === "boost") && n !== void 0 && (t.after ?? this.defaultAfter()) === "off";
    for (const s of i) {
      const a = s.heating?.climate;
      if (a)
        try {
          await this.callCommand(rs(a, { ...t, entityId: a, room: s.name }, this.timerAvailable())), o && n !== void 0 && this.runDelayedOff(Wi(a, n, "auto", 15));
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
  editHeat(t, i, n) {
    const o = this.heatControl(t, i, this.getState(i));
    o && (this._heat = { ...o, ...n });
  }
  /** The line under the options: what waits for the popup to close, else the time left, else what is not offered. */
  heatNote(t, i, n, o) {
    const s = this._i18n.t.sheet.heatControl;
    if (this._heat)
      return s.appliesOnClose;
    const a = kn(n), r = Y(this.getState(t.heating?.overlay)?.attributes.overlay_remaining_seconds);
    return i && a !== void 0 && a !== "auto" && r !== void 0 && r > 0 ? s.remaining(jt(Math.ceil(r / 60))) : o.join(" · ");
  }
  isSummerNow() {
    const t = this._config;
    return t !== void 0 && gt(this.entityState(t.houseModeEntity) ?? "") === gt(t.houseModes.summer);
  }
  /** After-timer choice: the person's last pick, otherwise by season (winter Plán, summer Vypnuto). */
  defaultAfter() {
    try {
      const t = window.localStorage.getItem(nn);
      if (t === "plan" || t === "off")
        return t;
    } catch {
    }
    return this.isSummerNow() ? "off" : "plan";
  }
  chooseAfter(t, i, n) {
    try {
      window.localStorage.setItem(nn, n);
    } catch {
    }
    this.editHeat(t, i, { after: n });
  }
  /** Air conditioner target: sent once the finger lifts (or a key was pressed), to every room of the popup. */
  async commitAcTarget(t) {
    const i = this._acTarget;
    i !== void 0 && (await this.callClimateEach(t, "set_temperature", { temperature: i }), this._acTarget = void 0);
  }
  /** One climate action for the air conditioner of every room in the popup. */
  async callClimateEach(t, i, n) {
    const o = t.map((s) => s.air_conditioner).filter((s) => !!s);
    await Promise.all(o.map((s) => this.callClimate(i, { entity_id: s, ...n })));
  }
  /**
   * Klimatizace modes in the order of the popup: Vypnuto, Chlazení, WindFree (cooling with the
   * `wind_free` preset, one tap), Topení, Větrání, Sušení and Auto. Every choice goes to the
   * air conditioner of every room in the popup.
   */
  climateOptions(t, i, n, o, s) {
    const a = this.sheetRooms().filter((g) => g.air_conditioner), r = o.includes("wind_free"), l = o.includes("none"), d = this._i18n.t.climateMode, h = (g, b, k, $) => ({
      id: g,
      label: d[b],
      icon: Wt(b, Jt[b], !1),
      color: Jt[b],
      active: k,
      run: $
    }), p = (g, b) => async () => {
      await this.callClimateEach(a, "set_hvac_mode", { hvac_mode: g }), b !== void 0 && await this.callClimateEach(a, "set_preset_mode", { preset_mode: b });
    }, c = [];
    if (i.includes("off") && c.push(h("off", "off", n === "off", p("off"))), i.includes("cool")) {
      const g = n === "cool" && s !== "wind_free";
      c.push(h("cool", "cool", g, p("cool", s === "wind_free" && l ? "none" : void 0))), r && c.push(h("wind_free", "wind_free", n === "cool" && s === "wind_free", p("cool", "wind_free")));
    }
    for (const [g, b] of [["heat", "heat"], ["fan_only", "fan"], ["dry", "dry"], ["auto", "auto"]])
      i.includes(g) && c.push(h(g, b, n === g, p(g)));
    return c;
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
  openSheet(t, i, n, o) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._dragY = 0, this._acTarget = void 0, this._ac = void 0, this._sheet = { kind: t, room: i, metric: t === "history" ? o ?? "temperature" : void 0 }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(i));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return bn(t, this._i18n.language);
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, i, n) {
    const o = (this._config?.rooms ?? []).filter((s) => i.includes(s.name));
    o.length !== 0 && (this.openSheet(t, o[0], n), this._sheet = { kind: t, room: o[0], rooms: o });
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
      t.air_conditioner,
      t.carbon_dioxide,
      t.pm25,
      this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0,
      ...t.windows.map((r) => r.entity)
    ].filter((r) => !!r), o = this._config.history, s = Date.now(), a = s - o.hours * Ct;
    try {
      const r = await oe(this.hass, n, a, s);
      if (i !== this._historyRequest)
        return;
      this._historyModel = ks(r, t, { startMs: a, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: loading the room history failed", r), i === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = Oo(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: i, samples: n } = this._config.trends, o = Date.now(), s = o - i * 6e4;
    try {
      const a = await oe(this.hass, t, s, o), r = {};
      for (const l of t)
        r[l] = hs(a[l], s, o, n);
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
    const i = zo(this._config), n = await Promise.allSettled(
      i.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    n.forEach((s, a) => {
      if (s.status === "fulfilled") {
        const r = Date.parse(s.value?.last_reported ?? s.value?.last_updated ?? "");
        Number.isFinite(r) && (o[i[a]] = r);
      }
    }), this._reported = o;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, i, n, o = !1) {
    const s = this.numberState(t);
    if (s === void 0 || !t)
      return {};
    const a = this._reported[t];
    if (a === void 0)
      return { value: s };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(a, Number.isFinite(r) ? r : 0), d = Math.max(0, (n - l) / 6e4);
    return { value: s, ageMinutes: d, stale: !(o && s === 0) && d > i };
  }
  /**
   * PM2.5 of a room (CURRENT_SPEC.md, Chybějící data). A measured 0 µg/m³ is clean air and never
   * stale. The particle sensor shares the device of the CO₂ sensor (ALPSTUGA) and reports only a
   * change, which a steady value may not give for hours: while the CO₂ of the room is fresh, the
   * device is alive and the unchanged PM2.5 is fresh too.
   */
  pm25Reading(t, i) {
    const n = t.thresholds.stale_minutes, o = this.reading(t.pm25, n, i, !0);
    if (o.value === void 0 || o.stale !== !0)
      return o;
    const s = this.reading(t.carbon_dioxide, n, i);
    return s.value !== void 0 && s.stale === !1 ? { value: o.value, ageMinutes: s.ageMinutes, stale: !1 } : o;
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${Ki()}</span>` : m;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(vn(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const i = this.staleTitle(t);
    return i ? `, ${i.toLowerCase()}` : "";
  }
  numberState(t) {
    const i = this.entityState(t);
    if (i === void 0 || tt(i.toLowerCase()))
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
ci.styles = ea;
let H = ci;
j([
  F()
], H.prototype, "_config");
j([
  L({ attribute: !1 })
], H.prototype, "hass");
j([
  F()
], H.prototype, "_sheet");
j([
  F()
], H.prototype, "_sheetError");
j([
  F()
], H.prototype, "_ventilationEnding");
j([
  F()
], H.prototype, "_announcement");
j([
  F()
], H.prototype, "_vent");
j([
  F()
], H.prototype, "_heat");
j([
  F()
], H.prototype, "_acTarget");
j([
  F()
], H.prototype, "_ac");
j([
  F()
], H.prototype, "_historyStatus");
j([
  F()
], H.prototype, "_historyModel");
j([
  F()
], H.prototype, "_scrubTime");
j([
  F()
], H.prototype, "_dragY");
j([
  F()
], H.prototype, "_flash");
j([
  F()
], H.prototype, "_moving");
j([
  F()
], H.prototype, "_prefersDark");
j([
  F()
], H.prototype, "_hint");
j([
  F()
], H.prototype, "_trends");
j([
  F()
], H.prototype, "_trendsLoaded");
j([
  F()
], H.prototype, "_reported");
j([
  F()
], H.prototype, "_historyRequest");
j([
  F()
], H.prototype, "_clock");
go("kd");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", H);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ye(Bs()).t.cardDescription,
  preview: !1
});
