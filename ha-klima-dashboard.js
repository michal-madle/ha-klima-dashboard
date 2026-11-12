const ce = globalThis, Je = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qe = /* @__PURE__ */ Symbol(), ki = /* @__PURE__ */ new WeakMap();
let rn = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Je && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = ki.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ki.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vn = (i) => new rn(typeof i == "string" ? i : i + "", void 0, Qe), Et = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new rn(e, i, Qe);
}, Wn = (i, t) => {
  if (Je) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = ce.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, _i = Je ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Vn(e);
})(i) : i;
const { is: qn, defineProperty: Kn, getOwnPropertyDescriptor: Yn, getOwnPropertyNames: Gn, getOwnPropertySymbols: Xn, getPrototypeOf: Zn } = Object, ye = globalThis, Si = ye.trustedTypes, Jn = Si ? Si.emptyScript : "", Qn = ye.reactiveElementPolyfillSupport, qt = (i, t) => i, fe = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Jn : null;
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
} }, ti = (i, t) => !qn(i, t), Mi = { attribute: !0, type: String, converter: fe, reflect: !1, useDefault: !1, hasChanged: ti };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ye.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Mi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && Kn(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = Yn(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const r = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Mi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(qt("elementProperties"))) return;
    const t = Zn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(qt("properties"))) {
      const e = this.properties, n = [...Gn(e), ...Xn(e)];
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
      for (const o of n) e.unshift(_i(o));
    } else t !== void 0 && e.push(_i(t));
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
    return Wn(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : fe).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : fe;
      this._$Em = o;
      const r = a.fromAttribute(e, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? ti)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: o, wrapped: s }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = s, r = this[o];
        a !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
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
Pt.elementStyles = [], Pt.shadowRootOptions = { mode: "open" }, Pt[qt("elementProperties")] = /* @__PURE__ */ new Map(), Pt[qt("finalized")] = /* @__PURE__ */ new Map(), Qn?.({ ReactiveElement: Pt }), (ye.reactiveElementVersions ??= []).push("2.1.2");
const ei = globalThis, Ti = (i) => i, ge = ei.trustedTypes, Ci = ge ? ge.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ln = "$lit$", mt = `lit$${Math.random().toFixed(9).slice(2)}$`, dn = "?" + mt, to = `<${dn}>`, _t = document, Kt = () => _t.createComment(""), Yt = (i) => i === null || typeof i != "object" && typeof i != "function", ii = Array.isArray, eo = (i) => ii(i) || typeof i?.[Symbol.iterator] == "function", Ce = `[ 	
\f\r]`, It = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ei = /-->/g, Ai = />/g, bt = RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Oi = /'/g, Li = /"/g, hn = /^(?:script|style|textarea|title)$/i, cn = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = cn(1), y = cn(2), zt = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Pi = /* @__PURE__ */ new WeakMap(), kt = _t.createTreeWalker(_t, 129);
function pn(i, t) {
  if (!ii(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ci !== void 0 ? Ci.createHTML(t) : t;
}
const io = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = It;
  for (let r = 0; r < e; r++) {
    const l = i[r];
    let d, h, p = -1, c = 0;
    for (; c < l.length && (a.lastIndex = c, h = a.exec(l), h !== null); ) c = a.lastIndex, a === It ? h[1] === "!--" ? a = Ei : h[1] !== void 0 ? a = Ai : h[2] !== void 0 ? (hn.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = bt) : h[3] !== void 0 && (a = bt) : a === bt ? h[0] === ">" ? (a = o ?? It, p = -1) : h[1] === void 0 ? p = -2 : (p = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? bt : h[3] === '"' ? Li : Oi) : a === Li || a === Oi ? a = bt : a === Ei || a === Ai ? a = It : (a = bt, o = void 0);
    const g = a === bt && i[r + 1].startsWith("/>") ? " " : "";
    s += a === It ? l + to : p >= 0 ? (n.push(d), l.slice(0, p) + ln + l.slice(p) + mt + g) : l + mt + (p === -2 ? r : g);
  }
  return [pn(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Gt {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, h] = io(t, e);
    if (this.el = Gt.createElement(d, n), kt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = kt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(ln)) {
          const c = h[a++], g = o.getAttribute(p).split(mt), b = /([.?@])?(.*)/.exec(c);
          l.push({ type: 1, index: s, name: b[2], strings: g, ctor: b[1] === "." ? oo : b[1] === "?" ? so : b[1] === "@" ? ao : xe }), o.removeAttribute(p);
        } else p.startsWith(mt) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (hn.test(o.tagName)) {
          const p = o.textContent.split(mt), c = p.length - 1;
          if (c > 0) {
            o.textContent = ge ? ge.emptyScript : "";
            for (let g = 0; g < c; g++) o.append(p[g], Kt()), kt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[c], Kt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === dn) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(mt, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += mt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = _t.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Nt(i, t, e = i, n) {
  if (t === zt) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = Yt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = Nt(i, o._$AS(i, t.values), o, n)), t;
}
class no {
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
    const { el: { content: e }, parts: n } = this._$AD, o = (t?.creationScope ?? _t).importNode(e, !0);
    kt.currentNode = o;
    let s = kt.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Qt(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new ro(s, this, t)), this._$AV.push(d), l = n[++r];
      }
      a !== l?.index && (s = kt.nextNode(), a++);
    }
    return kt.currentNode = _t, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Qt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Nt(this, t, e), Yt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== zt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : eo(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Gt.createElement(pn(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new no(o, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Pi.get(t.strings);
    return e === void 0 && Pi.set(t.strings, e = new Gt(t)), e;
  }
  k(t) {
    ii(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new Qt(this.O(Kt()), this.O(Kt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Ti(t).nextSibling;
      Ti(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class xe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, o, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Nt(this, t, e, 0), a = !Yt(t) || t !== this._$AH && t !== zt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = Nt(this, r[n + l], e, l), d === zt && (d = this._$AH[l]), a ||= !Yt(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oo extends xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class so extends xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ao extends xe {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Nt(this, t, e, 0) ?? m) === zt) return;
    const n = this._$AH, o = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== m && (n === m || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ro {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Nt(this, t);
  }
}
const lo = ei.litHtmlPolyfillSupport;
lo?.(Gt, Qt), (ei.litHtmlVersions ??= []).push("3.3.3");
const ho = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new Qt(t.insertBefore(Kt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const ni = globalThis;
class dt extends Pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ho(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return zt;
  }
}
dt._$litElement$ = !0, dt.finalized = !0, ni.litElementHydrateSupport?.({ LitElement: dt });
const co = ni.litElementPolyfillSupport;
co?.({ LitElement: dt });
(ni.litElementVersions ??= []).push("4.2.2");
const po = { attribute: !0, type: String, converter: fe, reflect: !1, hasChanged: ti }, uo = (i = po, t, e) => {
  const { kind: n, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), s.set(e.name, i), n === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, i, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, i, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, i, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function O(i) {
  return (t, e) => typeof e == "object" ? uo(i, t, e) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function H(i) {
  return O({ ...i, state: !0, attribute: !1 });
}
var mo = Object.defineProperty, Rt = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && mo(t, e, o), o;
};
const di = class di extends dt {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, n = (t - e) / 2, o = 2 * Math.PI * n, s = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return u`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${a} cy=${a} r=${n} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${a}
          cy=${a}
          r=${n}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(o * s).toFixed(1)} ${o.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? u`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? u`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
di.styles = Et`
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
let ht = di;
Rt([
  O({ type: Number })
], ht.prototype, "fraction");
Rt([
  O({ type: Number })
], ht.prototype, "size");
Rt([
  O({ type: Number })
], ht.prototype, "stroke");
Rt([
  O()
], ht.prototype, "num");
Rt([
  O()
], ht.prototype, "unit");
Rt([
  O()
], ht.prototype, "label");
class oi {
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
  tap(t, e) {
    window.clearTimeout(this.timer);
    const n = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !n || o ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class un {
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
const mn = Et`
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
var fo = Object.defineProperty, it = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && fo(t, e, o), o;
};
const hi = class hi extends dt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new un(this), this.nudgeIndex = 0, this.gesture = new oi(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : s;
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
  onClick(t, e, n) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const o = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || o === "none") {
      this.swallowClick = !1;
      return;
    }
    o === "double" ? this.select(e) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), s = o ? Number(o.dataset.index) : -1, a = s >= 0 && s !== n && !this.options[s]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[s].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const n = t.clientX - e.x;
    if (!e.moved && Math.abs(n) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const o = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((o - e.index) * e.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const o = this.options[n];
    o && !o.disabled && n !== e.index && this.select(o.value);
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
hi.styles = [
  mn,
  Et`
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
let W = hi;
it([
  O({ attribute: !1 })
], W.prototype, "options");
it([
  O()
], W.prototype, "value");
it([
  O()
], W.prototype, "label");
it([
  O({ type: Boolean })
], W.prototype, "disabled");
it([
  O({ type: Boolean })
], W.prototype, "compact");
it([
  O({ type: Boolean })
], W.prototype, "guarded");
it([
  O({ type: Number })
], W.prototype, "holdMs");
it([
  O({ type: Number })
], W.prototype, "doubleTapMs");
it([
  O({ type: Number })
], W.prototype, "hintSeconds");
it([
  O()
], W.prototype, "hint");
it([
  H()
], W.prototype, "_dx");
it([
  H()
], W.prototype, "_dragging");
var go = Object.defineProperty, st = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && go(t, e, o), o;
};
const ci = class ci extends dt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, o = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, s = this.tickStep || this.step || 1, a = Math.floor(e / s + 1e-9) + 1, r = a >= 2 && a <= 40 ? Array.from({ length: a }, (l, d) => u`<i style="left:${(d * s / e * 100).toFixed(2)}%"></i>`) : [];
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
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ci.styles = Et`
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
let G = ci;
st([
  O({ type: Number })
], G.prototype, "min");
st([
  O({ type: Number })
], G.prototype, "max");
st([
  O({ type: Number })
], G.prototype, "step");
st([
  O({ type: Number })
], G.prototype, "tickStep");
st([
  O({ type: Number })
], G.prototype, "value");
st([
  O()
], G.prototype, "label");
st([
  O()
], G.prototype, "valueText");
st([
  O()
], G.prototype, "minLabel");
st([
  O()
], G.prototype, "maxLabel");
st([
  O({ type: Boolean })
], G.prototype, "disabled");
st([
  H()
], G.prototype, "_drag");
var vo = Object.defineProperty, ct = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && vo(t, e, o), o;
};
const pi = class pi extends dt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new un(this), this.gesture = new oi(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
    const e = this.gesture.tap("switch", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
pi.styles = [
  mn,
  Et`
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
let et = pi;
ct([
  O({ type: Boolean })
], et.prototype, "checked");
ct([
  O({ type: Boolean })
], et.prototype, "disabled");
ct([
  O()
], et.prototype, "label");
ct([
  O({ type: Boolean })
], et.prototype, "guarded");
ct([
  O({ type: Number })
], et.prototype, "holdMs");
ct([
  O({ type: Number })
], et.prototype, "doubleTapMs");
ct([
  O({ type: Number })
], et.prototype, "hintSeconds");
ct([
  O()
], et.prototype, "hintPlacement");
ct([
  O()
], et.prototype, "hint");
function bo(i) {
  const t = [
    [`${i}-switch`, et],
    [`${i}-segmented`, W],
    [`${i}-slider`, G],
    [`${i}-ring`, ht]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const pe = 60, He = 142, zi = 11, ee = 3, wo = 0.8, Ni = 2, $o = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", yo = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", xo = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function ko(i, t) {
  if (i === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${pe - 1.5}
      height=${He - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = He - ee - 1, n = e / zi, o = n - wo, s = o - t / 100 * (o - Ni), a = ee + 1 + (100 - i) / 100 * e, r = Array.from({ length: zi }, (l, d) => {
    const h = ee + 1 + d * n + n / 2, p = h <= a, c = p ? s : Ni;
    return y`<rect
      x="0"
      y=${(h - c / 2).toFixed(2)}
      width=${pe}
      height=${c.toFixed(2)}
      rx=${Math.min(1.5, c / 2).toFixed(2)}
      style=${p ? $o : yo}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${pe}
      height=${ee}
      rx="1.5"
      style=${xo}
    ></rect>${r}`;
}
const _o = ["cs", "en", "sv"];
class fn extends Error {
}
function A(i) {
  throw new fn(i);
}
function So(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof fn ? new Error(`${i}: ${e.message}`) : e;
  }
}
function St(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function pt(i, t) {
  return i == null ? {} : (St(i) || A(`"${t}" must be a mapping of keys.`), i);
}
function Mt(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || A(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function Mo(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || A(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && A(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function je(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && A(`${t} must be a non-empty text.`), i.trim();
}
function ve(i, t) {
  if (i != null) {
    if (typeof i == "string" && i.trim())
      return i.trim();
    if (St(i) && Object.keys(i).length > 0) {
      const e = Object.entries(i);
      if (e.every(([n, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof o == "string" && o.trim()))
        return Object.fromEntries(e.map(([n, o]) => [n, o.trim()]));
    }
    return A(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function ke(i, t) {
  if (i === void 0 || typeof i == "string")
    return i;
  const e = t.toLowerCase();
  return i[e] ?? i[e.split("-")[0]] ?? i.en ?? Object.values(i)[0];
}
function gn(i) {
  return i === void 0 ? [] : typeof i == "string" ? [i] : Object.values(i);
}
const Ri = ["auto", ..._o];
function To(i) {
  const t = i ?? "auto";
  return Ri.includes(t) || A(`language must be one of ${Ri.join(", ")}.`), t;
}
const Ee = ["bedroom", "office", "kids", "living"], Ae = "none", Ue = ["open", "shade", "dark"], Co = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Eo(i) {
  return Co.has(i);
}
function Ft(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
const vn = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function Oe(i, t, e, n) {
  return i !== void 0 && t !== void 0 && Math.abs(i - e.position) <= n && Math.abs(t - e.tilt) <= n;
}
function Ht(i, t) {
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
}, Xt = {
  off: f.off,
  cool: f.cool,
  wind_free: f.cool,
  dry: f.dry,
  fan: f.plan,
  heat: f.heat,
  auto: f.auto,
  unknown: f.off
}, Ao = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function ue(i) {
  const t = Ao[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Oo(i) {
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
function Di(i, t, e, n, o) {
  const { thresholds: s } = n, a = [
    [o.required.temperature, i.temperature],
    [o.required.humidity, i.humidity],
    ...n.hasCo2 ? [[o.required.co2, i.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, i.pm25]] : [],
    [o.required.houseMode, e ? { value: 1 } : void 0]
  ];
  for (const [g, b] of a) {
    if (b?.value === void 0)
      return { id: "noData", label: o.noData(g), color: f.label, kind: "unknown" };
    if (b.stale) {
      const k = b.ageMinutes === void 0 ? void 0 : wn(b.ageMinutes);
      return { id: "noData", label: o.noData(g, k), color: f.label, kind: "unknown" };
    }
  }
  const r = i.temperature.value, l = i.humidity.value, d = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
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
  const p = t ? s.summer_min : s.winter_min, c = t ? s.summer_max : s.winter_max;
  return r > c ? { id: "warm", label: o.status.warm, color: f.warning, kind: "warning", cause: "temperature" } : r < p ? { id: "cold", label: o.status.cold, color: f.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: f.label, kind: "normal" };
}
function tt(i) {
  return Eo(i) || i === "none";
}
function yt(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function bn(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function Lo(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.ventilationEntity), e(i.ventilationTimerEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((o) => e(o.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function Po(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function zo(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((o) => Object.hasOwn(t, o) && i[o] === t[o]);
}
function wn(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function Ii(i, t) {
  const e = (i ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function Le(i) {
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
function Fi(i, t) {
  const e = Math.max(0, Math.floor(i));
  if (e < 1)
    return t.duration.lessThanMinute;
  if (e < 60)
    return t.duration.minute(e);
  if (e < 1440) {
    const [a, r] = [Math.floor(e / 60), e % 60], l = t.duration.hour(a);
    return r === 0 ? l : `${l} ${t.duration.minute(r)}`;
  }
  const [n, o] = [Math.floor(e / 1440), Math.floor(e % 1440 / 60)], s = t.duration.day(n);
  return o === 0 ? s : `${s} ${t.duration.hour(o)}`;
}
function Hi(i, t) {
  const e = Math.max(1, Math.round(i));
  return e % 60 === 0 ? t.period.hour(e / 60) : t.period.minute(e);
}
function $n(i, t) {
  return ke(i.label, t) ?? i.name;
}
function No(i, t, e) {
  return ke(i.label, e) ?? t.cover.presetName[i.icon];
}
function ji(i, t, e) {
  if (i.description !== void 0)
    return ke(i.description, e) ?? "";
  const n = vn[i.icon];
  return i.label === void 0 && n.position === i.position && n.tilt === i.tilt ? t.cover.presetDescription[i.icon] : t.cover.position(Math.round(i.position), Math.round(i.tilt));
}
function Ro(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
const Do = "input_select.house_mode", Io = 500, Fo = 420, Ho = 25, jo = {
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
}, Uo = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Bo = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Pe = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Vo = Ue.map((i) => ({ icon: i, ...vn[i] })), Ui = { winter: "Zima", summer: "Léto" }, Bi = ["auto", "dark", "light"], Vi = 3, Wo = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, qo = [
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
], Ko = ["climate", "overlay", "target", "intensity"], Wi = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], Yo = ["name", "position", "tilt", "icon", "description"], Go = ["entity", "name"];
function ft(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function V(i, t) {
  return Mo(i, t, { example: "sensor.loznice_teplota" });
}
function Bt(i, t, e, n = {}) {
  Mt(i, Object.keys(t), e);
  const o = { ...t };
  for (const [s, a] of Object.entries(i)) {
    if (a === null)
      continue;
    (typeof a != "number" || !Number.isFinite(a)) && A(`${e}.${s} must be a number.`);
    const r = n[s];
    if (r) {
      const [l, d, h] = r;
      (a < l || a > d || h && !Number.isInteger(a)) && A(`${e}.${s} must be ${h ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = a;
  }
  return o;
}
function yn(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of e)
    (s ? i[n] >= i[o] : i[n] > i[o]) && A(`${t}: ${n} (${i[n]}) must be ${s ? "below" : "at most"} ${o} (${i[o]}).`);
  i.stale_minutes <= 0 && A(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && A(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Xo(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function Be(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > Vi) && A(`${t} must be a list of 1 to ${Vi} presets.`), i.map((e, n) => {
    const o = `${t}[${n + 1}]`;
    St(e) || A(`${o} must have a position and a tilt.`), Mt(e, Yo, o);
    const s = ve(e.name, `${o}.name`), a = (p) => {
      const c = e[p];
      return (typeof c != "number" || !Number.isFinite(c) || c < 0 || c > 100) && A(`${o}.${p} must be a number from 0 to 100.`), c;
    }, r = a("position"), l = a("tilt");
    let d = Xo(r, l);
    e.icon != null && (Ue.includes(e.icon) || A(`${o}.icon must be one of ${Ue.join(", ")}.`), d = e.icon);
    const h = ve(e.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: h, position: r, tilt: l };
  });
}
function Zo(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && A(`${t}.window must not be an empty list.`);
  const o = n.map((a, r) => {
    const l = `${t}.window${Array.isArray(e) ? `[${r + 1}]` : ""}`;
    if (St(a)) {
      Mt(a, Go, l);
      const h = V(a.entity, `${l}.entity`);
      return h || A(`${l}.entity is required.`), { entity: h, name: ve(a.name, `${l}.name`) };
    }
    const d = V(a, l);
    return d || A(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const a of o)
    s.has(a.entity) && A(`${t}.window lists ${a.entity} twice.`), s.add(a.entity);
  return o;
}
function qi(i, t) {
  return i === !1 ? { present: !1 } : { entity: V(i, t), present: !0 };
}
function Jo(i, t) {
  i.image != null && i.scene != null && A(`${t}: use either image or scene (older name), not both.`);
  const e = i.image != null ? "image" : "scene", n = i.image ?? i.scene;
  if (n == null) {
    const s = gn(i.name).map((a) => Wo[ft(a)]).find((a) => a !== void 0);
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && A(`${t}.${e} must be ${[...Ee, Ae].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== Ae) {
    if (Ee.includes(o))
      return { kind: "scene", scene: o };
    if (e === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    A(
      `${t}.${e} must be one of ${[...Ee, Ae].join(", ")}${e === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Qo(i, t) {
  const e = je(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && A(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function ts(i, t, e) {
  St(i) || A(`room ${t + 1} must be a mapping with at least a name.`);
  const n = St(i) && i.name != null ? ve(i.name, `room ${t + 1} name`) : void 0, o = n === void 0 ? "" : gn(n)[0];
  (!o || n === void 0) && A(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, a = i;
  for (const [c, g] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    c in a && A(`${s}: key "${c}" was renamed to "${g}".`);
  "windows" in a && A(`${s}: the key is "window" (one entity or a list of them), not "windows".`), Mt(a, qo, s);
  const r = pt(i.heating, `${s}.heating`);
  "heating" in r && A(`${s}: key "heating.heating" was renamed to "heating.intensity".`), Mt(r, Ko, `${s}.heating`);
  const l = i.heating == null ? void 0 : {
    climate: V(r.climate, `${s}.heating.climate`),
    overlay: V(r.overlay, `${s}.heating.overlay`),
    target: V(r.target, `${s}.heating.target`),
    intensity: V(r.intensity, `${s}.heating.intensity`)
  }, d = Bt(pt(i.thresholds, `${s}.thresholds`), e.thresholds, `${s}.thresholds`);
  yn(d, `${s}.thresholds`);
  const h = qi(i.carbon_dioxide, `${s}.carbon_dioxide`), p = qi(i.pm25, `${s}.pm25`);
  return {
    name: o,
    label: n,
    temperature: V(i.temperature, `${s}.temperature`),
    humidity: V(i.humidity, `${s}.humidity`),
    carbon_dioxide: h.entity,
    hasCo2: h.present,
    pm25: p.entity,
    hasPm25: p.present,
    windows: Zo(i, s),
    cover: V(i.cover, `${s}.cover`),
    presets: i.cover_presets == null ? e.presets : Be(i.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: V(i.air_conditioner, `${s}.air_conditioner`),
    image: Jo(i, s),
    link: Qo(i.link, s)
  };
}
function es(i) {
  return So("Klima Dashboard", () => is(i));
}
function is(i) {
  (!St(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && A("the configuration requires a non-empty rooms list.");
  const t = i.theme ?? "auto";
  Bi.includes(t) || A(`theme must be one of ${Bi.join(", ")}.`);
  const e = To(i.language), n = V(i.house_mode_entity, "house_mode_entity") ?? Do, o = V(i.ventilation_entity, "ventilation_entity"), s = V(i.ventilation_timer_entity, "ventilation_timer_entity"), a = i.ventilation_co2_target ?? Io;
  (typeof a != "number" || !Number.isFinite(a) || a < 300 || a > 2e3) && A("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const r = i.ventilation_co2_full ?? Fo;
  (typeof r != "number" || !Number.isFinite(r) || r < 300 || r > a) && A("ventilation_co2_full must be a number of ppm between 300 and ventilation_co2_target.");
  const l = i.ventilation_settle_minutes ?? Ho;
  (typeof l != "number" || !Number.isInteger(l) || l < 1 || l > 180) && A("ventilation_settle_minutes must be a whole number of minutes between 1 and 180.");
  const d = pt(i.house_modes, "house_modes");
  Mt(d, ["winter", "summer"], "house_modes");
  const h = {
    winter: je(d.winter, "house_modes.winter") ?? Ui.winter,
    summer: je(d.summer, "house_modes.summer") ?? Ui.summer
  };
  ft(h.winter) === ft(h.summer) && A("house_modes.winter and house_modes.summer must differ.");
  const p = i.outside == null ? void 0 : pt(i.outside, "outside");
  if (p) {
    Mt(p, Wi, "outside");
    for (const x of Wi)
      V(p[x], `outside.${x}`);
  }
  const c = Bt(pt(i.thresholds, "thresholds"), jo, "thresholds");
  yn(c, "thresholds");
  const g = Bt(pt(i.trends, "trends"), Uo, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), b = Bt(pt(i.history, "history"), Bo, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), k = { ...pt(i.covers, "covers") }, $ = k.presets;
  delete k.presets;
  const w = k.script;
  delete k.script;
  const _ = {
    ...Bt(k, { tolerance: Pe.tolerance, stall_seconds: Pe.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Pe.script
  };
  w != null && ((typeof w != "string" || !/^script\.[a-z0-9_]+$/.test(w.trim())) && A("covers.script must be a script entity such as script.zaluzie_posun."), _.script = w.trim());
  const z = $ == null ? Be(Vo, "covers.presets") : Be($, "covers.presets"), C = i.rooms.map((x, R) => ts(x, R, { thresholds: c, presets: z })), E = /* @__PURE__ */ new Set();
  for (const x of C)
    E.has(x.name) && A(`room name "${x.name}" is used twice; room names must be unique.`), E.add(x.name);
  return {
    theme: t,
    language: e,
    houseModeEntity: n,
    houseModes: h,
    ventilationEntity: o,
    ventilationTimerEntity: s,
    ventilationCo2Target: a,
    ventilationCo2Full: r,
    ventilationSettleMinutes: l,
    outside: p,
    thresholds: c,
    trends: g,
    history: b,
    covers: _,
    rooms: C
  };
}
const gt = 5, _e = 25, J = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480], Tt = J.length, At = J.length + 1;
function ns(i) {
  return i === Tt ? 0 : i === At ? J.length + 1 : i + 1;
}
function os(i) {
  const t = J.length + 1, e = Math.min(t, Math.max(0, Math.round(i)));
  return e === 0 ? Tt : e === t ? At : e - 1;
}
function ss(i) {
  return i === At || i === Tt ? J.length : i;
}
function as(i) {
  const t = Math.min(J.length, Math.max(0, Math.round(i)));
  return t === J.length ? At : t;
}
function Ki(i, t, e, n = 0) {
  const o = Math.round(t * 60) + n, s = [
    { delay: { hours: Math.floor(o / 3600), minutes: Math.floor(o % 3600 / 60), seconds: o % 60 } }
  ];
  return e !== void 0 && s.push({ condition: "state", entity_id: i, state: e }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { sequence: s };
}
function xn(i) {
  return i === "boost" ? 1 : i === "off" ? At : Tt;
}
function Yi(i, t, e) {
  const n = Sn(e);
  if (n === void 0)
    return;
  const o = n === "heat" ? "manual" : n === "auto" ? "plan" : n, s = _n(kn(e)), a = Y(e?.attributes.temperature), r = o === "manual" && a !== void 0 && a >= s.min && a <= s.max;
  return {
    room: i,
    entityId: t,
    mode: o,
    temperature: rs(r ? a : 21, s),
    duration: xn(o)
  };
}
function Y(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function kn(i) {
  const t = Y(i?.attributes.target_temp_step), e = Y(i?.attributes.min_temp) ?? gt, n = Y(i?.attributes.max_temp) ?? 25, o = t !== void 0 && t > 0 ? t : 0.5;
  return n > e ? { min: e, max: n, step: o } : { min: gt, max: 25, step: o };
}
function _n(i) {
  return { ...i, min: Math.max(i.min, gt) + i.step };
}
function rs(i, t) {
  const e = Math.round((i - t.min) / t.step) * t.step + t.min;
  return Math.min(t.max, Math.max(t.min, Math.round(e * 100) / 100));
}
function Sn(i) {
  const t = i?.state.toLowerCase();
  if (t === "off")
    return "off";
  if (t === "auto")
    return "auto";
  if (t === "heat") {
    const e = Y(i?.attributes.temperature);
    return e !== void 0 && e <= gt ? "off" : e === _e ? "boost" : "heat";
  }
}
function Mn(i, t, e) {
  const n = i?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const r = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return r === "manual" && e !== void 0 && e <= gt ? "off" : r;
}
function ls(i) {
  const t = Math.floor(i / 60), e = i % 60;
  return `${String(t).padStart(2, "0")}:${String(e).padStart(2, "0")}:00`;
}
function Vt(i) {
  return i >= 0 && i < J.length ? J[i] : void 0;
}
function ds(i, t, e) {
  if (t.mode === "plan")
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } };
  const n = Vt(t.duration);
  if (t.mode === "off" && (t.duration === At || !e))
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } };
  if (!e)
    return t.mode === "manual" ? { domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: t.temperature } } : void 0;
  const o = t.mode === "boost" ? _e : t.mode === "off" ? gt : t.temperature, s = { entity_id: i, temperature: o };
  return n !== void 0 ? s.time_period = ls(n) : s.overlay = t.duration === Tt ? "next_time_block" : "manual", { domain: "tado_ce", service: "set_climate_timer", data: s };
}
function jt(i) {
  const t = Math.max(1, Math.round(i)), e = Math.floor(t / 60), n = t % 60;
  return e === 0 ? `${n} min` : n === 0 ? `${e} h` : `${e} h ${n} min`;
}
const Ct = 36e5;
function hs(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function cs(i, t) {
  const e = {};
  for (const [n, o] of Object.entries(i ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((a, r) => {
      const l = a.s ?? a.state, d = hs(a.lu ?? a.last_updated ?? a.lc ?? a.last_changed) ?? (r === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((a, r) => a.time - r.time), e[n] = s;
  }
  return e;
}
async function ie(i, t, e, n) {
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
  return cs(o, e);
}
function Zt(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function Ve(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function ps(i, t, e, n) {
  const o = (e - t) / n, s = (i ?? []).filter((a) => Ve(a.state) !== void 0);
  return Array.from(
    { length: n },
    (a, r) => Ve(Zt(s, t + (r + 1) * o))
  );
}
function ne(i, t, e, n = !1) {
  const o = [];
  for (const a of i ?? []) {
    const r = Ve(a.state);
    r !== void 0 && !(n && r === 0) && a.time <= e && o.push({ t: Math.max(a.time, t), v: r });
  }
  const s = o[o.length - 1];
  return s && s.t < e && o.push({ t: e, v: s.v }), o;
}
function Ot(i, t, e, n) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const r of i)
    for (const l of r ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((r, l) => r - l), a = [];
  for (let r = 0; r < s.length - 1; r += 1) {
    const l = n(i.map((h) => Zt(h, s[r])));
    if (l === void 0)
      continue;
    const d = a[a.length - 1];
    d && d.value === l && d.end === s[r] ? d.end = s[r + 1] : a.push({ start: s[r], end: s[r + 1], value: l });
  }
  return a;
}
function ze(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const a of i)
    for (const r of a ?? [])
      r !== void 0 && Number.isFinite(r) && (e = Math.min(e, r), n = Math.max(n, r));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function us(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function oe(i, t = 5 * 6e4, e = 720) {
  if (i.length < 2)
    return i;
  const n = 6e4, o = i[0].t, s = i[i.length - 1].t, a = Math.max(2, Math.floor((s - o) / n) + 1), r = [];
  let l = 0;
  for (let b = 0; b < a; b += 1) {
    const k = b === a - 1 ? s : o + b * n;
    for (; l + 1 < i.length && i[l + 1].t <= k; )
      l += 1;
    r.push(i[l].v);
  }
  const d = Math.max(0, Math.floor(t / n / 2)), h = [0];
  for (const b of r)
    h.push(h[h.length - 1] + b);
  const p = Math.max(1, Math.ceil(a / e)), c = [];
  for (let b = 0; b < a - 1; b += p)
    c.push(b);
  return c.push(a - 1), c.map((b) => {
    const k = Math.max(0, b - d), $ = Math.min(a - 1, b + d);
    return { t: b === a - 1 ? s : o + b * n, v: (h[$ + 1] - h[k]) / ($ - k + 1) };
  });
}
function ms() {
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
  ].map(([t, e, n]) => y`<circle cx=${t} cy=${e} r=${n}></circle>`)}
    </svg>
  `;
}
function fs(i) {
  const t = (o, s, a, r) => y`<rect x=${o} y=${s} width=${a} height=${r} rx=${r / 2 > 1.2 ? 1.2 : r / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => y`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (i) {
    case "open":
      n = y`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      n = y`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      n = y`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
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
function Gi() {
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
function Tn(i, t) {
  return y`${[0, 1, 2].map(
    (e) => y`<path
      d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${e < i ? f.warning : f.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : m}
    ></path>`
  )}`;
}
function We(i, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Tn(i, t)}
    </svg>
  `;
}
function qe(i) {
  let t;
  const e = y`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = y`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (i) {
    case "cool":
    case "wind_free":
      t = y`${e}
        <g transform="rotate(60 12 12)">${e}</g>
        <g transform="rotate(120 12 12)">${e}</g>`;
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
function Wt(i, t, e) {
  return u`
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
      ${qe(i)}
    </svg>
  `;
}
function Cn() {
  return y`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function Ne(i, t) {
  return u`
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
      ${Cn()}
    </svg>
  `;
}
function Re(i) {
  let t;
  switch (i) {
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
function Ke(i, t = {}) {
  return i.length < 2 ? u`${i[0] ?? m}` : u`<span class="joined ${t.whole ? "whole" : ""}">${i.map(
    (e, n) => u`${n ? u`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function Ye(i, t = {}) {
  return Ke(i.split(" · "), t);
}
function gs(i, t) {
  i.querySelectorAll(".joined").forEach((e) => {
    const n = `${t}|${e.textContent}`;
    if (e.dataset.fit === n) return;
    e.classList.remove("stacked", "flow", "probe");
    const o = [...e.querySelectorAll(":scope > .joined-sep")];
    o.forEach((l) => l.classList.remove("break"));
    const s = [...e.querySelectorAll(":scope > .joined-part")], a = s.map((l) => l.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = n;
    const r = o.filter((l, d) => a[d + 1].top > a[d].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = s.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const vs = Et`
  .joined {
    min-width: 0;
  }

  .joined-part {
    white-space: nowrap;
  }

  .joined-only {
    display: none;
  }

  .joined.stacked .joined-only {
    display: inline;
  }

  /* Where the line breaks the dot goes; the space stays, so a copied or read text keeps its words apart. */
  .joined.stacked .joined-sep.break .joined-dot {
    display: none;
  }

  .joined.stacked .joined-sep.break::after {
    content: "\\A";
    white-space: pre;
  }

  /* Measuring only: every part on its own line. */
  .joined.probe {
    display: block;
  }

  .joined.probe .joined-part {
    display: block;
  }

  .joined.flow .joined-part {
    white-space: normal;
  }

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`, Ge = " ", lt = 4, bs = 44, rt = 6, ot = 180, ut = rt + ot, se = 10, En = ut + 10, me = 14, Xi = 14, ws = 3, An = 14, $s = 7;
function ys(i, t, e) {
  if (t === "temperature") {
    const o = e ? ["climate", "heating"] : ["heating", "climate"];
    return i.windows ? [...o, "windows"] : o;
  }
  const n = [];
  return i.ventilation && n.push("ventilation"), i.windows && n.push("windows"), n;
}
const On = (i) => i === 0 ? ut : En + i * me, xs = (i = 0) => On(Math.max(i, ws)) + An + $s, De = 12, ks = [0, 0.24, 0.44, 0.68], Zi = "history-under-temperature", Lt = "history-plot", Ji = "history-curve", Ln = {
  schedule: f.plan,
  manual: f.warning,
  off: f.closed
}, _s = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: f.warning,
  off: f.closed
}, X = (i) => `fill: ${i}`, Z = (i) => `stroke: ${i}`;
function Ie(i, t, e) {
  return Mn(t, i, e);
}
function ae(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const si = 0.05;
function Ss(i, t) {
  const e = i.filter((r) => Number.isFinite(r));
  let n = 19, o = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), o = Math.max(...e), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const r = (o - n) * si;
    n -= r, o += r;
  }
  const s = o - n, a = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: a };
}
function Ms(i, t, e) {
  const n = [], o = e / 1e3;
  for (let s = Math.ceil(i / e - o) * e; s <= t + o; s += e)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function Ts(i, t, e, n, o) {
  const s = (P) => P ? i[P] : void 0, { startMs: a, endMs: r } = e, l = s(t.heating?.overlay), d = s(t.heating?.climate), h = oe(ne(s(t.temperature), a, r, !0)), p = oe(ne(s(t.humidity), a, r, !0)), c = Ot(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([P, T, I]) => Ie(P, T, ae(I))
  ), g = Ot(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    a,
    r,
    ([P, T, I, N]) => {
      const B = Ie(P, T, ae(N)), q = bn(ae(I), t.thresholds);
      return B === void 0 || B === "off" || q === 0 ? void 0 : String(q);
    }
  ), b = Ot(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([P, T, I]) => {
      const N = ae(I), B = Ie(P, T, N);
      if (!(N === void 0 || N <= gt))
        return B === "schedule" || B === "manual" ? String(N) : void 0;
    }
  ), k = t.windows.length > 0 ? Ot(
    t.windows.map((P) => s(P.entity)),
    a,
    r,
    (P) => P.some((T) => T?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, $ = o ? Ot([s(o)], a, r, ([P]) => P?.toLowerCase() === "on" ? "on" : void 0) : void 0, w = oe(ne(s(t.carbon_dioxide), a, r, !0)), _ = oe(ne(s(t.pm25), a, r)), z = Ot([s(t.air_conditioner)], a, r, ([P]) => {
    const T = Oo(P);
    return T === "unknown" ? void 0 : T;
  }), C = h.map((P) => P.v), { min: E, max: x, step: R } = Ss(
    C.length > 0 ? C : b.map((P) => Number(P.value)),
    n.min_temperature_span
  ), M = p.map((P) => P.v);
  return {
    range: e,
    temperature: h,
    humidity: p,
    heating: c,
    intensity: g,
    target: b,
    climate: z,
    windows: k,
    co2: w,
    pm25: _,
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
    tempMax: x,
    tempStep: R,
    humidityMin: M.length > 0 ? Math.min(...M) : void 0,
    humidityMax: M.length > 0 ? Math.max(...M) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function Cs(i, t = "temperature") {
  return t === "co2" ? i.co2.length > 0 : t === "pm25" ? i.pm25.length > 0 : i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function Es(i, t) {
  const e = i.filter((l) => Number.isFinite(l)), n = 400, o = t === "pm25" ? 0 : Math.min(n, e.length > 0 ? Math.floor(Math.min(...e) / 100) * 100 : n), s = t === "co2" ? 400 : 10, a = e.length > 0 ? Math.max(...e) : o + s, r = Math.max(a, o + s);
  return { min: o, max: r + (r - o) * si };
}
function As(i, t, e, n) {
  const o = e === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - i) / Math.max(2, n), a = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], r = [];
  for (let l = Math.ceil(i / a - 1e-9) * a; l <= t + 1e-9; l += a)
    r.push(l);
  return r;
}
function xt(i) {
  return i - lt - bs;
}
function Os(i, t, e) {
  return lt + (i - t.startMs) / (t.endMs - t.startMs) * xt(e);
}
function Ls(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - lt) / xt(t)));
  return e.startMs + n * (e.endMs - e.startMs);
}
function Jt(i, t) {
  let e;
  for (const n of i) {
    if (n.t > t)
      break;
    e = n.v;
  }
  return e;
}
function re(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
function Ps(i, [t, e]) {
  const n = [];
  if (t === e)
    return n;
  const o = new Date(i.startMs);
  for (o.setHours(0, 0, 0, 0), o.setDate(o.getDate() - 1); o.getTime() < i.endMs; ) {
    const s = new Date(o);
    s.setHours(t, 0, 0, 0);
    const a = new Date(o);
    e < t && a.setDate(a.getDate() + 1), a.setHours(e, 0, 0, 0);
    const r = Math.max(s.getTime(), i.startMs), l = Math.min(a.getTime(), i.endMs);
    l > r && n.push([r, l]), o.setDate(o.getDate() + 1);
  }
  return n;
}
const Qi = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function ai(i) {
  const t = (i.endMs - i.startMs) / Ct;
  let e = Qi[0], n = 1 / 0;
  for (const o of Qi) {
    const s = t / o, r = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    r < n && (n = r, e = o);
  }
  return e;
}
function zs(i) {
  const t = ai(i), e = [], n = new Date(i.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < i.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= i.endMs; )
    n.getTime() >= i.startMs && e.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return e;
}
function Ns(i, t) {
  return { x: Math.max(i, t + 9), anchor: "middle" };
}
function Rs(i) {
  return i === "off" ? Ln.off : Xt[i] ?? f.off;
}
function Ds(i, t, e) {
  const n = new Date(i).getHours() === 0;
  return ai(t) >= 24 || n && t.endMs - t.startMs > 36 * Ct ? e.day(i) : e.hour(i).replace(/^(\d{1,2}):00$/, "$1");
}
function Pn(i, t, e) {
  const { t: n } = e;
  if (t === void 0)
    return n.chart.now;
  const o = (r) => {
    const l = new Date(r);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(i.range.endMs) - o(t)) / (24 * Ct));
  return `${s === 0 ? "" : s === 1 ? `${n.chart.yesterday} ` : `${e.day(t)} `}${e.time(t)}`;
}
function zn(i, t) {
  return i === void 0 ? f.label : i >= t.critical ? f.alertOnPopup : i >= t.warning ? f.warning : f.white;
}
function Is(i, t, e) {
  const { t: n } = e, o = t ?? i.range.endMs, s = Jt(i.temperature, o), a = Jt(i.humidity, o), r = re(i.heating, o, i.range.endMs), l = Number(re(i.intensity, o, i.range.endMs) ?? 0), d = re(i.target, o, i.range.endMs), h = re(i.climate, o, i.range.endMs), p = Pn(i, t, e), c = r === void 0 ? "––" : `${n.heatingMode[r]}${r !== "off" && d !== void 0 ? ` · ${e.half(Number(d))} °C` : ""}`, g = h ? n.climateMode[h] : "––", b = h ? Xt[h] : f.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : u`${e.one(s)}<span class="readout-unit">${Ge}°C</span>`}</span
          >
          ${a === void 0 ? m : u`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${n.required.humidity} </span>${e.percent(Math.round(a))}</span
              >`}
        </span>
        <span class="readout-time">${p}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r === "off" ? f.off : r ? Ln[r] : f.label}`}>
          <span class="readout-icon">${We(r && r !== "off" ? l : 0, r === void 0)}</span>
          ${n.system.heating} ${Ye(c)}
        </span>
        <span class="readout-system" style=${`color: ${b}`}>
          <span class="readout-icon">${Wt(h ?? "off", b, h === void 0)}</span>
          ${n.system.climate} ${g}
        </span>
      </div>
    </div>
  `;
}
function Fs(i, t, e, n, o) {
  const s = e ?? i.range.endMs, a = e === void 0 && o !== void 0, r = a ? o.value : Jt(i[t], s), l = t === "co2" && i.pm25.length > 0 ? a && o.secondary ? o.secondary.value : Jt(i.pm25, s) : void 0, d = a && o.secondary?.stale === !0, h = i.limits[t], p = t === "co2" ? "ppm" : "µg/m³";
  return u`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${a && o.stale ? f.label : zn(r, h)}`}
            >${r === void 0 ? "––" : u`${n.whole(r)}<span class="readout-unit">${Ge}${p}</span>`}</span
          >
          ${t === "co2" && i.pm25.length > 0 ? u`<span class="readout-hum pm25" style=${d ? `color: ${f.label}` : m}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : u`${n.whole(l)}${Ge}µg/m³`}</span
              >` : m}
        </span>
        <span class="readout-time">${Pn(i, e, n)}</span>
      </div>
    </div>
  `;
}
function Hs(i, t, e, n, o, s = !1, a) {
  const { range: r } = i, l = t === "temperature" ? void 0 : t, d = (v) => Os(v, r, e), h = l ? i[l] : i.temperature, p = l ? i.limits[l] : void 0, c = l ? Es(h.map((v) => v.v), l) : { min: i.tempMin, max: i.tempMax }, g = h.length > 0 ? Math.max(...h.map((v) => v.v)) : -1 / 0, b = (v) => ut - (v - c.min) / (c.max - c.min) * ot, k = (i.humidityMin ?? 0) - 3, $ = Math.max((i.humidityMax ?? 100) + 3, k + 12), w = (v) => ut - (v - k) / ($ - k) * ot, _ = lt + xt(e), z = (v, L) => v.map((D, U) => `${U === 0 ? "M" : "L"}${d(D.t).toFixed(1)} ${L(D.v).toFixed(1)}`).join(" "), C = z(h, b), E = h[0], x = h[h.length - 1], R = E && x ? `${C} L${d(x.t).toFixed(1)} ${ut} L${d(E.t).toFixed(1)} ${ut} Z` : "";
  let M = "";
  l || i.target.forEach((v, L) => {
    const D = b(Number(v.value)).toFixed(1), U = i.target[L - 1];
    M += U && U.end === v.start ? ` L${d(v.start).toFixed(1)} ${D}` : ` M${d(v.start).toFixed(1)} ${D}`, M += ` L${d(v.end).toFixed(1)} ${D}`;
  });
  const P = xt(e) / Math.max(1, (r.endMs - r.startMs) / Ct / ai(r)), T = Math.max(2, Math.round(ot / P)), I = (c.max - c.min) / T, N = [0.5, 1, 2, 5, 10].find((v) => v >= I * 0.8) ?? 10, B = l ? As(c.min, c.max, l, T) : Ms(c.min, c.max, N), q = (v) => l ? o.whole(v) : `${o.tick(v)}°`, Q = p ? [
    { value: p.warning, color: f.warning },
    { value: p.critical, color: f.alertOnPopup }
  ].filter((v) => v.value > c.min && v.value <= g) : [], K = (v) => Math.min(1, Math.max(0, (b(v) - rt) / ot)), S = [];
  if (p && Q.length > 0) {
    const v = Q.some((U) => U.value === p.critical), L = K(p.critical), D = K(p.warning);
    v && S.push([0, f.alertOnPopup], [L, f.alertOnPopup]), S.push([v ? L : 0, f.warning], [D, f.warning], [D, f.white], [1, f.white]);
  }
  const at = s ? i.comfort.summer : i.comfort.winter;
  if (!l) {
    const v = K(at.max), L = K(at.min);
    S.push([0, f.warning], [v, f.warning], [v, f.white], [L, f.white], [L, f.sky], [1, f.sky]);
  }
  const vt = (v) => p ? zn(v, p) : v > at.max ? f.warning : v < at.min ? f.sky : f.white, mi = (v, L, D) => v.map((U) => {
    const nt = d(U.start);
    return y`<rect x=${nt.toFixed(1)} y=${L} width=${Math.max(d(U.end) - nt, 0.8).toFixed(1)}
        height=${se} rx="2" style=${X(D(U.value))}></rect>`;
  }), Se = ys(i, t, s), Me = On(Se.length), Rn = Me + An, fi = xs(Se.length), Dn = (v) => v === "heating" ? y`${Tn(3, !1)}` : v === "climate" ? y`<g style=${Z(f.off)}>${qe("off")}</g>` : v === "ventilation" ? y`<g style=${Z(f.fresh)}>${qe("fan")}</g>` : y`<g style=${Z("var(--kd-sky)")}>${Cn()}</g>`, gi = (v, L, D, U, nt) => v.map((yi) => {
    const xi = d(yi.start);
    return y`<rect class=${U} x=${xi.toFixed(1)} y=${L} width=${Math.max(d(yi.end) - xi, nt).toFixed(1)}
        height=${se} rx="2" style=${X(D)}></rect>`;
  }), In = (v, L) => v === "heating" ? y`${mi(i.heating, L, (D) => _s[D] ?? f.off)}` : v === "climate" ? y`${mi(i.climate, L, (D) => Rs(D))}` : v === "ventilation" ? y`${gi(i.ventilation ?? [], L, f.fresh, "ventilation-on", 1.5)}` : y`${gi(i.windows ?? [], L, "var(--kd-sky)", "window-open", 1.5)}`, te = n === void 0 ? void 0 : d(n), Te = n === void 0 ? void 0 : Jt(h, n), Fn = Ps(r, i.night), vi = (v, L, D, U) => (v ?? []).map(
    (nt) => y`<rect class=${D} x=${d(nt.start).toFixed(1)} y=${rt}
        width=${Math.max(d(nt.end) - d(nt.start), 2).toFixed(1)} height=${ot}
        style=${`${X(L)}; opacity: var(${U})`}></rect>`
  ), bi = (v) => vt(v), Hn = Math.max(...i.pm25.map((v) => v.v), 0), jn = Math.max(Hn * (1 + si), i.limits.pm25.critical), Un = (v) => ut - v / jn * ot, wi = l === "co2" && i.pm25.length > 0 ? z(i.pm25, Un) : "", Bn = (v) => [...v].reduce((L, D) => L + (/\d/.test(D) ? 6.7 : 3.6), 0), Dt = zs(r).map((v) => {
    const L = Ds(v, r, o), D = Ns(d(v), lt), U = Bn(L), nt = D.x - U / 2;
    return { x: d(v), text: L, anchored: D, left: nt, right: nt + U, show: !1 };
  });
  let $i = 1 / 0;
  for (let v = Dt.length - 1; v >= 0; v--)
    Dt[v].right <= $i + 2 && (Dt[v].show = !0, $i = Dt[v].left);
  return u`
    ${l ? Fs(i, l, n, o, a) : Is(i, n, o)}
    <svg
      class="chart"
      viewBox="0 0 ${e} ${fi}"
      width=${e}
      height=${fi}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${Zi}><path d=${R}></path></clipPath>
        <clipPath id=${Lt}>
          <rect x=${lt} y=${rt} width=${xt(e)} height=${ot} rx="8"></rect>
        </clipPath>
        ${S.length > 0 ? y`<linearGradient id=${Ji} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${rt} y2=${ut}>
              ${S.map(
    ([v, L]) => y`<stop offset=${`${(v * 100).toFixed(2)}%`} style=${`stop-color: ${L}`}></stop>`
  )}
            </linearGradient>` : m}
      </defs>
      <rect x=${lt} y=${rt} width=${xt(e)} height=${ot} rx="8" style=${X("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${Lt})`}>
        ${Fn.map(
    ([v, L]) => y`<rect class="night" x=${d(v).toFixed(1)} y=${rt} width=${(d(L) - d(v)).toFixed(1)}
            height=${ot} style=${X("var(--kd-night)")}></rect>`
  )}
        ${l ? vi(i.windows, "var(--kd-sky)", "window-band", "--kd-band-window") : m}
        ${l ? vi(i.ventilation, f.fresh, "ventilation-band", "--kd-band-ventilation") : m}
      </g>
      ${B.map((v) => {
    const L = b(v), D = Q.some((U) => Math.abs(b(U.value) - L) < 14);
    return y`<line x1=${lt} x2=${_} y1=${L.toFixed(1)} y2=${L.toFixed(1)}
            style=${Z("var(--kd-grid)")} stroke-width="1"></line>
          ${D ? m : y`<text x=${_ + 6} y=${(L + 4).toFixed(1)} style=${X(f.label)} font-size=${De}>${q(v)}</text>`}`;
  })}
      ${Q.map(
    (v) => y`<line class="limit-line" x1=${lt} x2=${_} y1=${b(v.value).toFixed(1)} y2=${b(v.value).toFixed(1)}
            style=${Z(v.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${_ + 6} y=${(b(v.value) + 4).toFixed(1)} style=${X(v.color)} font-size=${De}
            font-weight="600">${q(v.value)}</text>`
  )}
      <g clip-path=${`url(#${Lt})`}>
        ${R ? y`<path d=${R} style=${X("var(--kd-area)")}></path>` : m}
      </g>
      ${l ? m : y`<g clip-path=${`url(#${Zi})`}>
        ${i.intensity.map(
    (v) => y`<rect x=${d(v.start).toFixed(1)} y=${rt}
            width=${Math.max(d(v.end) - d(v.start), 0.8).toFixed(1)} height=${ot}
            style=${X(f.warning)} opacity=${ks[Number(v.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${wi ? y`<path class="pm25-line" d=${wi} fill="none" style=${Z(f.pm25)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${Lt})`}></path>` : m}
      ${!l && i.humidity.length > 0 ? y`<path d=${z(i.humidity, w)} fill="none" style=${Z(f.humidityLine)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.65"></path>` : m}
      ${M ? y`<path d=${M} fill="none" style=${Z(f.plan)} stroke-width="1"
            stroke-dasharray="3 3" opacity="0.45" clip-path=${`url(#${Lt})`}></path>` : m}
      ${C ? y`<path class="temperature-curve" d=${C} fill="none"
            style=${Z(S.length > 0 ? `url(#${Ji})` : f.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${Lt})`}></path>` : m}
      ${x && n === void 0 ? y`<circle class="end-dot" cx=${d(x.t).toFixed(1)} cy=${b(x.v).toFixed(1)} r="4"
            style=${`${X(bi(x.v))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : m}

      ${Se.map((v, L) => {
    const D = En + L * me, U = D + (me - se) / 2;
    return y`<g class=${`strip-row ${v}`}>
          <rect x=${lt} y=${U} width=${xt(e)} height=${se} rx="2" style=${X("var(--kd-fill)")}></rect>
          ${In(v, U)}
          <g class="strip-icon" transform=${`translate(${_ + 6} ${D + (me - Xi) / 2}) scale(${Xi / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${Dn(v)}</g>
        </g>`;
  })}

      ${Dt.map(
    (v) => y`<line x1=${v.x.toFixed(1)} x2=${v.x.toFixed(1)} y1=${rt} y2=${Me}
            style=${Z("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${v.show ? y`<text class="tick" x=${v.anchored.x.toFixed(1)} y=${Rn} style=${X(f.label)} font-size=${De}
                text-anchor=${v.anchored.anchor}>${v.text}</text>` : m}`
  )}
      ${te === void 0 ? m : y`<line x1=${te.toFixed(1)} x2=${te.toFixed(1)} y1=${rt} y2=${Me}
              style=${Z(f.white)} stroke-width="1" opacity="0.7"></line>
            ${Te === void 0 ? m : y`<circle cx=${te.toFixed(1)} cy=${b(Te).toFixed(1)} r="4"
                  style=${`${X(bi(Te))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const tn = Ct / 4;
function js(i) {
  return `var(--kd-scene-${i})`;
}
function Us(i) {
  let t;
  switch (i) {
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
function Bs(i) {
  let t, e;
  for (const n of i ?? []) {
    const o = n.state.toLowerCase();
    o === "on" && !t ? (t = { start: n.time }, e = t) : o === "off" && t && (t.end = n.time, t = void 0);
  }
  return e;
}
function Vs(i, t, e) {
  return Zt(i, t)?.toLowerCase() === "on" ? !0 : (i ?? []).some((n) => n.time > t && n.time <= e && n.state.toLowerCase() === "on");
}
function le(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function en(i, t) {
  return i === void 0 || t === void 0 || t < 0 || t > 100 || i <= -243.12 ? void 0 : 216.7 * (t / 100 * 6.112 * Math.exp(17.62 * i / (243.12 + i))) / (273.15 + i);
}
function Ws(i, t, e, n) {
  const o = t <= e;
  return t <= n || i <= n && o ? { done: 1, closable: o } : i <= n ? { done: 0, closable: o } : { done: Math.min(0.99, Math.max(0, (i - t) / (i - n))), closable: o };
}
function be(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function ri(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function qs(i, t) {
  return i === "auto" ? ri(be(t)) : i;
}
function Ks() {
  return ri(document.documentElement.lang || navigator.language || "");
}
const nn = /* @__PURE__ */ new WeakMap(), Ys = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Gs = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Xs = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Fe(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Zs(i, t, e) {
  const n = be(e).replace("_", "-"), o = n !== "" && ri(n) === t ? n : Ys[t], s = Fe(e, "number_format"), a = Fe(e, "time_format"), r = Fe(e, "date_format"), l = [t, o, s, a, r].join("|");
  let d = nn.get(i);
  d || (d = /* @__PURE__ */ new Map(), nn.set(i, d));
  let h = d.get(l);
  return h || (h = ta(i[t], t, o, s, a, r), d.set(l, h)), h;
}
function Js(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function Qs(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function ta(i, t, e, n, o, s) {
  const a = Js(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : Xs[n] ?? a, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), g = Qs(o, a), b = g ? "h12" : "h23", k = new Intl.DateTimeFormat(a, { hour: g ? "numeric" : "2-digit", minute: "2-digit", hourCycle: b }), $ = new Intl.DateTimeFormat(a, g ? { hour: "numeric", hourCycle: b } : { hour: "2-digit", minute: "2-digit", hourCycle: b }), w = s === "system" ? void 0 : a, _ = new Intl.DateTimeFormat(w, { day: "numeric", month: "numeric" }), z = (E) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return _.format(E);
    const x = _.formatToParts(E), R = x.find((N) => N.type === "literal")?.value ?? "/", M = x[x.length - 1], P = M?.type === "literal" ? M.value : "", T = x.find((N) => N.type === "day")?.value ?? "", I = x.find((N) => N.type === "month")?.value ?? "";
    return s === "DMY" ? `${T}${R}${I}${P}` : `${I}${R}${T}${P}`;
  }, C = Gs.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: i,
    one: (E) => d.format(E),
    two: (E) => h.format(E),
    half: (E) => p.format(Math.round(E * 2) / 2),
    tick: (E) => p.format(E),
    whole: (E) => c.format(E),
    percent: (E) => `${E}${C}%`,
    time: (E) => k.format(E),
    hour: (E) => $.format(E),
    day: z
  };
}
const wt = (i, t, e, n) => i === 1 ? t : i >= 2 && i <= 4 ? e : n, ea = {
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
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (i, t, e, n) => `${i} ${t ?? "neznámé"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: kvalita vzduchu, ${t || "bez čidla"}. Otevře graf za ${e}.`,
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
    allRooms: "Všechny místnosti",
    now: (i) => `Teď ${i}`,
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
      until: (i) => `do ${i}`,
      appliesOnClose: "Použije se po zavření okna",
      remaining: (i) => `Zbývá ${i}`,
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
      footOffTimed: (i) => `Vypnuto do ${i}, potom pokračuje plán.`,
      footTimed: (i, t) => `Platí do ${i}, potom ${t}.`,
      afterPlanText: "přejde do Plánu",
      afterOffText: "se topení vypne",
      acFootForever: "Klimatizace běží, dokud ji nevypnete.",
      acFootTimed: (i) => `Běží do ${i}, potom se klimatizace vypne.`
    },
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (i) => `Za ${i === 1 ? "poslední hodinu" : i >= 2 && i <= 4 ? `poslední ${i} hodiny` : `posledních ${i} hodin`} nejsou k dispozici data.`,
    chart: (i) => `Graf za ${i}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`
  },
  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera"
  },
  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (i) => `${i} ${wt(i, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (i) => `${i} ${wt(i, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    boost: "Boost",
    boostSpoken: "Topení v režimu Boost",
    manualSpoken: "Topení ručně",
    heating: (i) => `Topí ${i}`,
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
    settledAfter: (i) => `Po ${i} min`,
    settledShort: (i) => `+${i} min`,
    windowClosed: "okno zavřené",
    roomSpoken: (i, t) => `${i}: ${t}`,
    lineSpoken: (i, t) => `${i}: ${t}`
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (i) => `${i} ${wt(i, "minuta", "minuty", "minut")}`,
    hour: (i) => `${i} ${wt(i, "hodina", "hodiny", "hodin")}`,
    day: (i) => `${i} ${wt(i, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (i) => `${i} ${wt(i, "minutu", "minuty", "minut")}`,
    hour: (i) => `${i} ${wt(i, "hodinu", "hodiny", "hodin")}`
  }
}, Ut = (i, t, e) => i === 1 ? t : e, ia = {
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
  airSensor: (i, t, e, n) => `${i} ${t ?? "unknown"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: air quality, ${t || "no sensor"}. Opens the chart for ${e}.`,
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
    allRooms: "All rooms",
    now: (i) => `Now ${i}`,
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
      until: (i) => `until ${i}`,
      appliesOnClose: "Applied when you close this window",
      remaining: (i) => `${i} left`,
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
      footOffTimed: (i) => `Off until ${i}, then the schedule continues.`,
      footTimed: (i, t) => `Applies until ${i}, then ${t}.`,
      afterPlanText: "returns to the schedule",
      afterOffText: "the heating switches off",
      acFootForever: "The air conditioner runs until you switch it off.",
      acFootTimed: (i) => `Runs until ${i}, then the air conditioner switches off.`
    },
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (i) => `No data for ${i === 1 ? "the last hour" : `the last ${i} hours`}.`,
    chart: (i) => `Chart of ${i}. The left and right arrow keys move through time, the End key returns to now.`
  },
  chart: {
    now: "Now",
    yesterday: "yesterday"
  },
  summaryChips: {
    rooms: (i) => `${i} ${Ut(i, "room", "rooms")}`,
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
    windowsOpen: (i) => `${i} ${Ut(i, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    boost: "Boost",
    boostSpoken: "Heating in boost",
    manualSpoken: "Heating set manually",
    heating: (i) => `Heating in ${i}`,
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
    settledAfter: (i) => `After ${i} min`,
    settledShort: (i) => `+${i} min`,
    windowClosed: "window closed",
    roomSpoken: (i, t) => `${i}: ${t}`,
    lineSpoken: (i, t) => `${i}: ${t}`
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (i) => `${i} ${Ut(i, "minute", "minutes")}`,
    hour: (i) => `${i} ${Ut(i, "hour", "hours")}`,
    day: (i) => `${i} ${Ut(i, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (i) => i === 1 ? "the last minute" : `the last ${i} minutes`,
    hour: (i) => i === 1 ? "the last hour" : `the last ${i} hours`
  }
}, de = (i, t, e) => i === 1 ? t : e, na = {
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
  airSensor: (i, t, e, n) => `${i} ${t ?? "okänt"}${e ? `, ${e}` : ""}${n}`,
  airDescription: (i, t, e) => `${i}: luftkvalitet, ${t || "ingen sensor"}. Öppnar diagrammet för ${e}.`,
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
    allRooms: "Alla rum",
    now: (i) => `Nu ${i}`,
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
      until: (i) => `till ${i}`,
      appliesOnClose: "Tillämpas när du stänger fönstret",
      remaining: (i) => `${i} kvar`,
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
      footOffTimed: (i) => `Av till ${i}, sedan fortsätter schemat.`,
      footTimed: (i, t) => `Gäller till ${i}, sedan ${t}.`,
      afterPlanText: "går värmen tillbaka till schemat",
      afterOffText: "stängs värmen av",
      acFootForever: "Luftkonditioneringen går tills du stänger av den.",
      acFootTimed: (i) => `Går till ${i}, sedan stängs luftkonditioneringen av.`
    },
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (i) => `Inga data för ${i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`}.`,
    chart: (i) => `Diagram över ${i}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`
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
    windowsOpen: (i) => `${i} fönster ${de(i, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    boost: "Boost",
    boostSpoken: "Värme i boost",
    manualSpoken: "Värme i manuellt läge",
    heating: (i) => `Värme i ${i}`,
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
    settledAfter: (i) => `Efter ${i} min`,
    settledShort: (i) => `+${i} min`,
    windowClosed: "fönstret stängt",
    roomSpoken: (i, t) => `${i}: ${t}`,
    lineSpoken: (i, t) => `${i}: ${t}`
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (i) => `${i} ${de(i, "minut", "minuter")}`,
    hour: (i) => `${i} ${de(i, "timme", "timmar")}`,
    day: (i) => `${i} ${de(i, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (i) => i === 1 ? "den senaste minuten" : `de senaste ${i} minuterna`,
    hour: (i) => i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`
  }
}, oa = { cs: ea, en: ia, sv: na };
function Xe(i, t) {
  return Zs(oa, i, t);
}
const sa = Et`
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

    /*
     * A long name ends with „…“ before the drawing, not under it (CURRENT_SPEC.md, Room Card: the
     * illustration does not cover text). The drawing is 14 px from the right edge, the name 16 px from the left.
     */
    @supports (width: 1cqw) {
      .room:has(> .scene:not(.photo)) .room-title {
        max-width: calc(100cqw - 30px - min(150px, max(0px, 100cqw - 190px)));
      }
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

    /* The dot beside the first line when the state has two (ha-dashboard-kit/joined). */
    .status-line {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      min-height: 20px;
      font-size: var(--row-font);
      line-height: 20px;
    }

    .status-dot {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      margin-top: 6px;
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
`, aa = " ";
function on(i) {
  if (!i || tt(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function Ze(i, t) {
  return i === void 0 ? "" : `· ${t.half(i)}${aa}°C`;
}
function ra(i, t, e, n, o, s) {
  const a = s.t.heatingMode, r = i?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || tt(l), h = on(e), p = Mn(r, l, h);
  if (p === "off")
    return { label: a.off, color: f.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || r === void 0 || tt(r))
    return { label: "––", color: f.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const c = bn(on(n), o);
  if (p === "schedule")
    return { label: a.schedule, color: f.plan, active: !0, extra: Ze(h, s), unknown: !1, overlay: "schedule", waves: c };
  if (p === "manual") {
    const g = h === _e ? "boost" : "manual";
    return { label: a.manual, color: f.warning, active: !0, extra: Ze(h, s), unknown: !1, overlay: "manual", override: g, waves: c };
  }
  return { label: t?.state ?? "––", color: f.warning, active: !0, extra: "", unknown: !1, waves: c };
}
function we(i, t) {
  let e = "unknown", n, o;
  if (i && !tt(i.state.toLowerCase())) {
    const a = i.state.toLowerCase(), r = String(i.attributes.preset_mode ?? "none").toLowerCase();
    a === "off" ? e = "off" : a === "cool" ? e = r === "wind_free" ? "wind_free" : "cool" : a === "dry" ? e = "dry" : a === "fan_only" ? e = "fan" : a === "heat" ? e = "heat" : (a === "auto" || a === "heat_cool") && (e = "auto"), e !== "off" && e !== "unknown" && e !== "wind_free" && r !== "none" && r !== "" && (n = ue(r)), o = yt(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(e);
  return {
    mode: e,
    label: n ?? t.t.climateMode[e],
    color: Xt[e],
    active: e !== "off" && e !== "unknown",
    extra: s ? Ze(o, t) : "",
    unknown: e === "unknown"
  };
}
function la(i, t) {
  const e = i.unknown ? t.t.unknownState : i.label;
  return i.extra ? `${e} ${i.extra.replace(/^·\s*/, "")}` : e;
}
function he(i, t) {
  return i.length <= 2 ? i.join(", ") : t.t.summaryChips.rooms(i.length);
}
function $e(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function li(i, t, e) {
  return ra(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds,
    e
  );
}
function Nn(i, t, e, n) {
  const o = $e(i, t).length > 0, s = li(i, t, n), a = i.air_conditioner ? we(t(i.air_conditioner), n).mode : "unknown", r = !s.unknown && s.waves > 0 || a === "heat", l = a === "cool" || a === "wind_free", d = [];
  return o && r && d.push("window-heating"), o && l ? d.push("window-cooling") : l && e && d.push("cooling-cold"), d;
}
function da(i, t, e, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, a = [], r = [], l = [], d = [];
  let h = 0;
  const p = [], c = new Map(i.map((w) => [w.name, $n(w, n.language)])), g = (w) => w.map((_) => c.get(_) ?? _);
  for (const w of i) {
    for (const C of Nn(w, t, e.has(w.name), n))
      s[C].push(w.name);
    const _ = $e(w, t).length;
    _ > 0 && a.push([w.name, _]);
    const z = li(w, t, n);
    z.override === "boost" ? l.push(w.name) : z.override === "manual" && r.push(w.name), z.waves > 0 && (d.push(w.name), h = Math.max(h, z.waves)), w.air_conditioner && we(t(w.air_conditioner), n).active && p.push(w.name);
  }
  const b = [], k = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [w, _] of k)
    s[w].length > 0 && b.push({
      kind: _,
      text: `${o.conflict[w]}: ${he(g(s[w]), n)}`,
      color: f.warning,
      spoken: `${o.conflictSpoken[w]}: ${g(s[w]).join(", ")}`
    });
  const $ = a.reduce((w, [, _]) => w + _, 0);
  return $ > 0 && b.push({
    kind: "windows",
    text: o.windowsOpen($),
    color: f.sky,
    spoken: `${o.windowsSpoken}: ${a.map(([w, _]) => _ > 1 ? `${c.get(w) ?? w} (${_})` : c.get(w) ?? w).join(", ")}`
  }), r.length > 0 && b.push({
    kind: "manual",
    text: `${o.manual}: ${he(g(r), n)}`,
    color: f.warning,
    spoken: `${o.manualSpoken}: ${g(r).join(", ")}`,
    opens: { system: "heating", rooms: r }
  }), l.length > 0 && b.push({
    kind: "boost",
    text: `${o.boost}: ${he(g(l), n)}`,
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
    text: `${o.climate}: ${he(g(p), n)}`,
    color: f.cool,
    spoken: `${o.climateSpoken}: ${g(p).join(", ")}`,
    opens: { system: "climate", rooms: p }
  }), b;
}
var ha = Object.defineProperty, j = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && ha(t, e, o), o;
};
const sn = "klima-dashboard.after-timer", ca = 5 * 6e4, pa = 3e4, $t = " ", ua = 550, an = 400, ma = 700, fa = "(orientation: landscape) and (max-height: 600px)", ga = 1600, va = 5e3, ba = 100, wa = 0.6, $a = 6;
function ya(i) {
  return i === void 0 ? void 0 : i.mode === "manual" ? "heat" : i.mode === "plan" ? "auto" : i.mode;
}
const ui = class ui extends dt {
  constructor() {
    super(...arguments), this._i18n = Xe("en"), this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new oi(() => ({ holdMs: ua, doubleTapMs: an })), this._movingWatch = /* @__PURE__ */ new Map(), this._joinedWidth = 0, this._fonts = 0, this.handleFonts = () => {
      this._fonts++, this.fitJoined();
    }, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!e || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = Ls((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
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
        const a = s + (t.key === "ArrowLeft" ? -tn : tn);
        this._scrubTime = a >= o ? void 0 : Math.max(n, a);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY, this._touchOnSlider = t.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range" || e instanceof HTMLElement && "drag" in e.dataset);
    }, this.sheetTouchMove = (t) => {
      this._touchOnSlider || t.cancelable && this.sheetCannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this._touchY ?? 0)) && t.preventDefault();
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
        if (n < $a)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > ba || o > wa) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = [
        ...this.renderRoot.querySelectorAll(
          '.sheet button:not([disabled]):not([tabindex="-1"]), .sheet input:not([disabled]), .sheet .chart-wrap'
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
    this._config = es(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, pa), this._joinedObserver = new ResizeObserver(() => {
      const t = Math.round(this.getBoundingClientRect().width);
      t !== this._joinedWidth && (this._joinedWidth = t, window.requestAnimationFrame(() => this.fitJoined()));
    }), this._joinedObserver.observe(this), document.fonts?.addEventListener("loadingdone", this.handleFonts), this.requestUpdate();
  }
  fitJoined() {
    gs(this.renderRoot, `${this._joinedWidth}|${this._fonts}`);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._joinedObserver?.disconnect(), this._joinedObserver = void 0, document.fonts?.removeEventListener("loadingdone", this.handleFonts), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._gesture.dispose();
    for (const t of [this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), window.clearTimeout(this._endTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const e = t.get("hass");
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || be(e) !== be(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => e?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e), this._i18n = Xe(qs(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    const e = this.hass?.themes?.darkMode;
    return (typeof e == "boolean" ? e : this._prefersDark) ? "dark" : "light";
  }
  updated(t) {
    this.fitJoined(), !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, ca)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => $e(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of Lo(this._config)) {
      const n = t.states[e], o = this.hass.states[e];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !zo(n?.attributes, o?.attributes))
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
    const t = ft(this.entityState(this._config.houseModeEntity) ?? ""), e = t === ft(this._config.houseModes.summer), n = e || t === ft(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), a = this.renderOutside(), r = da(
      this._config.rooms,
      (h) => this.getState(h),
      this.coldRooms(e, n, s),
      this._i18n
    ), l = this._config.ventilationEntity !== void 0, d = a !== m || r.length > 0 || l;
    return u`
      <ha-card>
        <div class="dashboard">
          ${d ? u`<header class="dashboard-header">
                ${l ? u`<div class="title-row">${this.renderVentilationButton()}</div>` : m}
                ${a} ${this.renderSummary(r)}
              </header>` : m}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (h, p) => this.renderRoom(h, p, e, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, e, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const a = s.thresholds.stale_minutes;
      Di(
        {
          temperature: this.reading(s.temperature, a, n),
          humidity: this.reading(s.humidity, a, n),
          co2: this.reading(s.carbon_dioxide, a, n),
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
      temperature: ze(e((n) => n.temperature), Ht(t.trends, "temperature")),
      co2: ze(e((n) => n.carbon_dioxide), Ht(t.trends, "co2")),
      pm25: ze(e((n) => n.pm25), Ht(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const { t: e, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), a = this.numberState(t.maximum), r = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && a !== void 0 ? `${n(s)}–${n(a)}${$t}°C` : void 0, h = [
      o === void 0 ? void 0 : `${n(o)}${$t}°C`,
      d,
      r === void 0 ? void 0 : `☂${$t}${this._i18n.percent(n(r))}`
    ].filter((b) => b !== void 0), p = this._config.thresholds;
    let c = "––", g = f.label;
    return l !== void 0 && (l >= p.pm25_critical ? (c = e.airLevel.poor, g = f.alert) : l >= p.pm25_warning ? (c = e.airLevel.moderate, g = f.warning) : c = e.airLevel.good), h.length === 0 && !t.pm25 ? m : u`<div class="outside">
      ${h.length > 0 ? u`<div>${Ke(h)}</div>` : m}
      ${t.pm25 ? u`<div>${e.outsideAir} <span style=${`color: ${g}`}>${c}</span></div>` : m}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? m : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((e) => {
      const n = this.summaryIcon(e), o = e.opens;
      return o && o.rooms.length > 0 ? u`<li class="chip" style=${`--chip-color: ${e.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${e.spoken}
              aria-label=${`${e.text}. ${e.spoken}`}
              aria-haspopup="dialog"
              @click=${(s) => this.openGroupSheet(o.system, o.rooms, s)}
            >
              <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
            </button>
          </li>` : u`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  summaryIcon(t) {
    return t.kind === "windows" || t.kind === "conflict-window" ? Ne(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? Wt("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? Re(t.kind === "boost" ? "boost" : "heat") : We(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, o, s, a) {
    const r = t.thresholds.stale_minutes, l = this.reading(t.temperature, r, a), d = this.reading(t.humidity, r, a), h = this.reading(t.carbon_dioxide, r, a), p = this.pm25Reading(t, a), { t: c } = this._i18n, g = Di({ temperature: l, humidity: d, co2: h, pm25: p }, n, o, t, c), b = t.image, k = (w) => g.cause === w ? `color: ${g.color}` : m, $ = Nn(t, (w) => this.getState(w), g.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
        style=${b?.kind === "scene" ? `--scene-tone: ${js(b.scene)}` : m}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${g.kind === "unknown" ? `border: 1.5px solid ${f.off}` : `background: ${g.color}`}
          ></span>
          <span style=${`color: ${g.color}; font-weight: ${g.kind === "normal" ? 400 : 500}`}>
            ${Ye(g.label)}
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
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${$t}°C</span>${this.staleMark(l)}`}
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
            ${this.renderAirBlock(t, e, h, p, s)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, e, $, a)}
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
    return e ? e.kind === "scene" ? u`<div class="scene" aria-hidden="true">${Us(e.scene)}</div>` : u`<div class="scene photo" aria-hidden="true">
      <img src=${e.url} alt="" loading="lazy" decoding="async" />
    </div>` : m;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = t.link;
    if (!n)
      return u`<div class="room-title">${this.roomLabel(t)}</div>`;
    const o = `link-description-${e}`;
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
    return Hi((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Hi(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, n) {
    return t.value === void 0 || t.stale ? f.label : t.value >= n ? f.alert : t.value >= e ? f.warning : f.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, e, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return m;
    const { thresholds: a } = t, { t: r } = this._i18n, l = this._config.trends, d = (c, g, b, k, $, w) => {
      if (!g || !b)
        return;
      const _ = k.value === void 0 ? void 0 : Ii(this._trends[b], Ht(l, w));
      return r.airSensor(
        c,
        k.value === void 0 ? void 0 : `${this._i18n.whole(k.value)} ${$}`,
        _ ? r.trendOver(r.trend[_], this.trendPeriod()) : void 0,
        this.staleSpoken(k)
      );
    }, h = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = `air-description-${e}`;
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
      ms(),
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
  renderAirRow(t, e, n, o, s, a, r, l) {
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
        ${d ? this.renderSpark(e, l, c, o.stale === !0) : m}
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
    const o = this.renderSpark(t.temperature, n, f.peach, e.stale === !0);
    if (o === m)
      return m;
    const s = Ii(this._trends[t.temperature], Ht(this._config.trends, "temperature")), { t: a } = this._i18n;
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
  renderSpark(t, e, n, o) {
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
    if (!s || !e)
      return m;
    const a = us(s, e).map(
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
  renderHvac(t, e, n) {
    const { t: o } = this._i18n, s = li(t, (g) => this.getState(g), this._i18n), a = we(this.getState(t.air_conditioner), this._i18n), r = (g) => this.renderSystemRow(We(s.unknown ? 0 : s.waves, s.unknown), s, g), l = (g) => this.renderSystemRow(Wt(a.mode, a.color, a.unknown), a, g), d = e ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: a.active }), p = d.map((g) => `${o.system[g]} ${la(g === "heating" ? s : a, this._i18n)}`).join(", "), c = `hvac-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${c}
        @click=${(g) => h ? this.openSheet(h, t, g) : void 0}
      >
        ${e ? l(!0) : r(!0)}
        ${e ? r(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${c}>${o.hvacDescription(this.roomLabel(t), p, h)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  /** The system a tap on the HVAC lines opens: the one that runs (a ventilation started on the air conditioner in winter opens Klimatizace), otherwise the first by the house mode. */
  hvacTarget(t, e, n) {
    const o = (a) => a === "heating" ? !!t.heating?.climate : !!t.air_conditioner, s = e.filter((a) => o(a) && n?.[a]);
    return s.length === 1 ? s[0] : e.find(o);
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
            ${e.extra ? u`<span class="row-unit">${e.extra}</span>` : m}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, e) {
    const n = this.getState(t), o = n?.state.toLowerCase();
    if (o === void 0 || tt(o))
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
    const { t: s } = this._i18n, a = t.windows.map((C) => ({ window: C, ...this.windowState(C.entity, o) })), r = a.filter((C) => C.state === "open"), l = r.length > 0, d = !l && (a.length === 0 || a.some((C) => C.state === "unknown")), h = t.windows.length > 1, p = l ? f.sky : f.label, c = l ? r.length > 1 ? s.window.openCount(r.length) : s.window.open : d ? "––" : s.window.closed, g = r.map((C) => C.minutesOpen).filter((C) => C !== void 0), b = g.length > 0 ? Math.max(...g) : void 0, k = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, $ = `window-description-${e}`, w = b === void 0 ? void 0 : Fi(b, s);
    let _;
    if (!h)
      _ = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", w);
    else if (l) {
      const C = r.map((E) => this.windowName(t, E.window)).join(", ");
      _ = r.length === 1 ? s.window.spokenOneOpen(C, w) : s.window.spokenManyOpen(C, w);
    } else
      _ = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const z = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${p}`}
        ?disabled=${!z}
        aria-haspopup=${h ? "dialog" : m}
        aria-describedby=${$}
        @click=${(C) => h ? this.openSheet("windows", t, C) : this.showMoreInfo(z)}
      >
        <span class="row-main">
          <span class="row-icon">${Ne(d ? f.off : p, d)}</span>
          <span class="row-text">
            <span class="row-label">${c}</span>
            ${k ? u`<span class="conflict-dot" aria-hidden="true"></span>` : m}
            ${b === void 0 ? m : u`<span class="row-unit window-duration"
                  >${`${k ? "" : `${$t}·${$t}`}${Le(b)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${$}>${s.window.description(this.roomLabel(t), _, k, h)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, e) {
    return ke(e.name, this._i18n.language) ?? this._i18n.t.window.defaultName(t.windows.indexOf(e) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, e) {
    const { t: n } = this._i18n;
    return u`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: a } = this.windowState(o.entity, e), r = s === "unknown", l = s === "open" ? f.sky : f.label;
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
                ${r ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Ke([s === "open" ? n.window.open : n.window.closed, ...a === void 0 ? [] : [Le(a)]])}
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
    const { t: e } = this._i18n, n = t === "on", o = `${e.ventilation.title}. ${n ? e.summaryChips.ventilationSpoken : e.summaryChips.ventilationOffSpoken}`;
    return u`<button
      type="button"
      class="plain-button vent-trigger ${n ? "on" : "off"}"
      title=${o}
      aria-label=${o}
      aria-haspopup="dialog"
      @click=${(s) => this.openVentilationSheet(s)}
    >
      <span class="vent-icon" aria-hidden="true">${Wt("fan", n ? f.fresh : f.label, !1)}</span>
      ${n ? u`<span>${e.ventilation.title}</span>` : m}
    </button>`;
  }
  /** The popup of the ventilation mode (it has no room; the first one stands in). */
  openVentilationSheet(t) {
    const e = this._config?.rooms[0];
    e && (this._ventilationEnding = !1, this._announcement = "", this.openSheet("ventilation", e, t), this.loadVentilation());
  }
  /**
   * The last run of the mode and, per room, the CO₂ at its start and end and whether a window was
   * open during it: from the history of Home Assistant (the mode over a week, then the CO₂ and the
   * windows over that run). Nothing is stored.
   */
  async loadVentilation() {
    const t = this.hass, e = this._config?.ventilationEntity;
    if (!t || !e)
      return;
    const n = ++this._ventRequest, o = Date.now();
    try {
      const s = await ie(t, [e], o - 168 * Ct, o), a = Bs(s[e]);
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
      ]), h = (this._config?.ventilationSettleMinutes ?? 25) * 6e4, p = a.end === void 0 ? void 0 : a.end + h, c = await ie(
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
      }), k = ($) => (w) => $ === void 0 ? void 0 : le(Zt(c[$], w));
      this._vent = {
        session: a,
        rooms: r.map(($) => {
          const w = $.carbon_dioxide === void 0 ? void 0 : b(k($.carbon_dioxide));
          return {
            name: $.name,
            opened: $.windows.some((_) => Vs(c[_.entity], a.start, l)),
            start: w?.before,
            end: le(Zt(c[$.carbon_dioxide ?? ""], l)),
            co2: w,
            temperature: $.temperature === void 0 ? void 0 : b(k($.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity: $.temperature === void 0 || $.humidity === void 0 ? void 0 : b((_) => en(k($.temperature)(_), k($.humidity)(_)))
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
    const { t: e } = this._i18n, n = e.ventilation, o = this._config, s = this.ventilationOn(), a = o?.ventilationCo2Target ?? 500, r = o?.ventilationCo2Full ?? 420, l = this._vent, d = l?.session, h = u`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${e.unknownValue}</span>`, p = this._sheetError, c = o?.ventilationTimerEntity, g = this.getState(c), b = g?.state.toLowerCase() === "active" ? Date.parse(String(g.attributes.finishes_at ?? "")) : Number.NaN, k = Number.isNaN(b) || b <= t ? void 0 : b, $ = Date.parse(this.getState(o?.ventilationEntity)?.last_changed ?? ""), w = Number.isNaN($) ? void 0 : Math.max(0, (t - $) / 6e4), _ = this.ventilationRooms().flatMap((T) => {
      const I = l?.rooms.find((S) => S.name === T.name), N = $e(T, (S) => this.getState(S)).length > 0;
      if (!N && !I?.opened)
        return [];
      const B = this.getState(T.carbon_dioxide), q = s ? le(B?.state) : I?.end, Q = I?.start, K = Q !== void 0 && q !== void 0 ? Ws(Q, q, a, r) : void 0;
      return [{ room: T, startValue: Q, live: q, steps: K, open: N }];
    }), z = o?.ventilationSettleMinutes ?? 25, C = d?.end !== void 0 && t >= d.end + z * 6e4, E = s ? [n.before, e.chart.now] : [n.before, n.after, C ? n.settledShort(z) : e.chart.now], x = s ? E : [n.before, n.after, C ? n.settledAfter(z) : e.chart.now], R = (T) => {
      const I = l?.rooms.find((S) => S.name === T.room.name), N = T.steps === void 0 ? void 0 : Math.min(100, Math.floor(T.steps.done * 100)), B = [
        { label: n.quantity.co2, entity: T.room.carbon_dioxide, triple: I?.co2, live: le(this.getState(T.room.carbon_dioxide)?.state), digits: !1 },
        { label: n.quantity.temperature, entity: T.room.temperature, triple: I?.temperature, live: Y(this.getState(T.room.temperature)?.state), digits: !0 },
        {
          label: n.quantity.humidity,
          entity: T.room.temperature !== void 0 && T.room.humidity !== void 0 ? T.room.humidity : void 0,
          triple: I?.humidity,
          live: en(Y(this.getState(T.room.temperature)?.state), Y(this.getState(T.room.humidity)?.state)),
          digits: !0
        }
      ].filter((S) => S.entity).map((S) => {
        const at = s ? [S.triple?.before, S.live] : [S.triple?.before, S.triple?.after, C ? S.triple?.settled : S.live];
        return {
          label: S.label,
          shown: at.map((vt) => vt === void 0 ? void 0 : S.digits ? this._i18n.one(vt) : this._i18n.whole(vt))
        };
      }), q = T.steps?.closable === !0, Q = [
        s && N !== void 0 ? `${n.done} ${this._i18n.percent(N)}${q ? `, ${n.closable}` : ""}` : void 0,
        ...B.map((S) => n.lineSpoken(S.label, S.shown.map((at, vt) => `${x[vt]} ${at ?? e.unknownValue}`).join(", ")))
      ].filter((S) => S !== void 0).join(". "), K = T.open ? q ? f.fresh : f.warning : f.label;
      return u`<div class="vent-room ${s ? "with-ring" : ""}" role="group" aria-label=${n.roomSpoken(this.roomLabel(T.room), Q)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(T.room)}${s && !T.open ? u`<span class="vent-note">${n.windowClosed}</span>` : m}
          </div>
          ${B.map(
        (S) => u`<div class="vent-line">
              <span class="vent-q">${S.label}</span>
              ${S.shown.map((at) => u`<span class="vent-num">${at ?? u`<span class="no-data">––</span>`}</span>`)}
            </div>`
      )}
        </div>
        ${s ? u`<kd-ring
              aria-hidden="true"
              fraction=${(N ?? 0) / 100}
              size="40"
              stroke="6"
              num=${N === void 0 ? "––" : String(N)}
              style=${`--hdk-ring-fill: ${N === void 0 ? f.label : K}; grid-row: 2 / span ${B.length}`}
            ></kd-ring>` : m}
      </div>`;
    }, M = _.length === 0 ? m : u`<div class="vent-table" role="group" aria-label=${n.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${E.map((T) => u`<span class="vent-num">${T}</span>`)}
              ${s ? u`<span class="vent-num ring-head">↓ ${this._i18n.whole(r)}<span class="ring-unit"> ppm</span></span>` : m}
            </div>
            ${_.map(R)}
          </div>`;
    let P = m;
    return s ? P = u`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${n.running}
              ${w === void 0 ? h : u`<span aria-hidden="true">${Le(w)}</span
                    ><span class="sr-only">${Fi(w, e)}</span>`}
            </span>
          </span>
          ${c === void 0 ? m : u`<span class="list-value vent-ends">${n.endsBy} ${k === void 0 ? h : this._i18n.time(k)}</span>`}
        </div>` : d && (P = u`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${n.last}</span></span>
          <span class="list-value">${new Date(d.start).toDateString() === new Date(t).toDateString() ? m : `${this._i18n.day(d.start)} `}${this._i18n.time(d.start)}${d.end === void 0 ? m : u`–${this._i18n.time(d.end)}`}</span>
        </div>`), u`
      ${!s && !d ? m : u`<div class="static-list" role="group" aria-label=${n.title}>${P}${M}</div>`}
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
      } catch (e) {
        console.error("Klima Dashboard: ending the ventilation mode failed", e), this._sheetError = this._i18n.t.sheet.commandFailed, this._ventilationEnding = !1, this.haptic("failure");
      }
    }
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const n = this.getState(e), o = n?.state.toLowerCase(), s = o !== void 0 && !tt(o), a = s ? yt(n?.attributes.current_position) : void 0, r = s ? yt(n?.attributes.current_tilt_position) : void 0, l = a !== void 0 && r !== void 0, d = o === "opening" || o === "closing", { t: h } = this._i18n, p = l ? h.cover.position(Math.round(a), Math.round(r)) : h.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${h.cover.label(this.roomLabel(t), p, d)}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${pe} ${He}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${ko(a, r)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${h.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((c) => this.renderPreset(t, c, a, r, s))}
      </div>
    `;
  }
  renderPreset(t, e, n, o, s) {
    const a = this._moving[t.name], r = a === e.id, l = a === void 0 && Oe(n, o, e, this.tolerance()), d = `${t.name}|${e.id}`, { t: h } = this._i18n, p = No(e, h, this._i18n.language), c = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${r ? "pending" : ""} ${c ? "failed" : ""}"
        title=${p}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${r ? "true" : m}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${c && this._hint?.spoken ? `${h.cover.preset(this.roomLabel(t), p, ji(e, h, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : h.cover.preset(this.roomLabel(t), p, ji(e, h, this._i18n.language), s)}
        @pointerdown=${(g) => this.pressStart(g, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(g) => g.preventDefault()}
        @click=${(g) => {
      g.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(d));
    }}
      >
        ${fs(e.icon)}
        ${this._hint?.key !== d ? m : c ? u`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : u`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, e, n, o) {
    t.button !== 0 || !o || this._gesture.start(() => {
      window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, n);
    });
  }
  pressEnd(t, e, n) {
    const o = `${t.name}|${e.id}`;
    if (!n) {
      this.showUnavailable(o);
      return;
    }
    const s = this._gesture.tap(o, performance.now());
    if (s !== "none") {
      if (window.clearTimeout(this._hintTimer), s === "double") {
        this._hint = void 0, this.applyPreset(t, e);
        return;
      }
      this._hintTimer = window.setTimeout(() => {
        this._gesture.pending(o) && (this._gesture.forget(), this.showHint(o, this._i18n.t.cover.hint, "selection"));
      }, an);
    }
  }
  pressCancel() {
    this._gesture.cancel();
  }
  showUnavailable(t) {
    this._gesture.forget(), window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, e, n, o) {
    this._hint = { key: t, text: e, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? va : ga);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || tt(n)) {
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
      }, ma);
    } catch (o) {
      console.error("Klima Dashboard: the blind script failed", o), this.endMoving(t.name);
      const { cover: s } = this._i18n.t;
      this.showHint(`${t.name}|${e.id}`, s.failedHint, "failure", { spoken: s.failed(this.roomLabel(t)) });
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, e, n) {
    const o = this.getState(e);
    if (Oe(
      yt(o?.attributes.current_position),
      yt(o?.attributes.current_tilt_position),
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
      return m;
    const { t: n } = this._i18n;
    if (e.kind === "history")
      return this.renderSheetFrame(
        n.sheet.history(this._config?.history.hours ?? 24),
        this.roomLabel(e.room),
        this.renderHistoryBody(e.room, e.metric ?? "temperature", t),
        "history-sheet"
      );
    if (e.kind === "ventilation")
      return this.renderSheetFrame(n.ventilation.title, void 0, this.renderVentilationBody(Date.now()));
    if (e.kind === "windows")
      return this.renderSheetFrame(n.window.popup, this.roomLabel(e.room), this.renderWindowsBody(e.room, Date.now()));
    const { title: o, sub: s } = this.hvacTitle(e.kind);
    return this.renderSheetFrame(o, s, this.renderHvacBody(e.room, e.kind, t));
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
                ${e ? u`<div class="sheet-sub">${e}</div>` : m}
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
    const { t: e } = this._i18n, n = this.sheetRooms().filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner);
    if (n.length <= 1) {
      const a = n[0] ?? this._sheet?.room;
      return { title: a ? this.roomLabel(a) : "" };
    }
    const o = (this._config?.rooms ?? []).filter((a) => t === "heating" ? a.heating?.climate : a.air_conditioner), s = n.length === o.length;
    return { title: s ? e.sheet.allRooms : n.map((a) => this.roomLabel(a)).join(", "), sub: s ? n.map((a) => this.roomLabel(a)).join(", ") : void 0 };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, e, n) {
    const o = this.sheetRooms(), s = o.filter((c) => c.heating?.climate), a = o.filter((c) => c.air_conditioner), r = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && a.length > 0, { t: d } = this._i18n, h = e === "heating" ? this.renderHeatingPanel(s) : this.renderClimatePanel(a), p = l ? u`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(c) => this.segmentKeydown(c, r, e)}
        >
          ${r.map(
      (c) => u`<button
              type="button"
              role="tab"
              id=${`tab-${c}`}
              class="plain-button segment"
              data-system=${c}
              aria-selected=${c === e ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${c === e ? "0" : "-1"}
              @click=${() => this.switchSheet(c)}
            >
              ${d.system[c]}
            </button>`
    )}
        </div>` : u`<div class="sheet-label system-name">${d.system[e]}</div>`;
    return u`${p}
      <div class="hvac-panel" role=${l ? "tabpanel" : m} id="hvac-panel" aria-labelledby=${l ? `tab-${e}` : m}>
        ${h}
      </div>`;
  }
  /** "Teď 21,9 °C" under the big value: only for one room (a group has no single temperature). */
  roomNow(t) {
    if (t.length !== 1)
      return "";
    const e = Y(this.getState(t[0].temperature)?.state);
    return e === void 0 ? "" : this._i18n.t.sheet.now(`${this._i18n.one(e)}${$t}°C`);
  }
  renderHeatingPanel(t) {
    const { t: e } = this._i18n, n = t[0], o = n?.heating?.climate, s = this.getState(o), a = s !== void 0 && !tt(s.state.toLowerCase()), r = Ft(s?.attributes.hvac_modes);
    if (!n || !o || !a)
      return u`<p class="sheet-message">${e.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const l = this.heatControl(n, o, s), d = this.heatingOptions(o, r, ya(l));
    if (d.length === 0 || !l)
      return u`<p class="sheet-message">${e.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const h = e.sheet.heatControl, p = this.timerAvailable(), c = this.wholeRange(_n(kn(s))), g = Y(s?.attributes.temperature), b = s?.state.toLowerCase() === "auto" && g !== void 0 && g > gt ? g : void 0, k = l.mode === "boost" ? f.alert : l.mode === "manual" || l.mode === "plan" ? f.warning : f.off;
    let $;
    l.mode === "off" ? $ = this.renderDial({ id: "heat-dial", text: e.heatingMode.off, eyebrow: e.system.heating, sub: this.roomNow(t), tone: k }) : l.mode === "plan" ? $ = this.renderDial({
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
      eyebrow: e.heatingMode.boost,
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
    const w = p, _ = l.mode === "plan", z = Vt(l.duration), C = (l.mode === "manual" || l.mode === "boost") && z !== void 0, E = l.after ?? this.defaultAfter(), x = z !== void 0 ? `${jt(z)} · ${h.until(this._i18n.time(Date.now() + z * 6e4))}` : l.duration === Tt ? h.nextPlan : h.untilResumed, R = z === void 0 ? l.duration === Tt ? h.footPlan : l.mode === "off" ? h.footOffForever : h.footForever : l.mode === "off" ? h.footOffTimed(this._i18n.time(Date.now() + z * 6e4)) : h.footTimed(this._i18n.time(Date.now() + z * 6e4), E === "off" ? h.afterOffText : h.afterPlanText);
    return u`
      ${$}
      <div class="options icon-options" role="group" aria-label=${e.sheet.modes(e.system.heating)}>
        ${d.map((M) => this.renderOption(M))}
      </div>
      ${w ? u`<div class="timer-card ${_ ? "dim" : ""}" ?inert=${_}>
              ${this.renderTimer({
      slot: ns(l.duration),
      last: J.length + 1,
      readout: x,
      label: h.durationSlider,
      leftLabel: h.nextPlan,
      leftIcon: Re("auto"),
      leftText: u`<b>${e.heatingMode.schedule}</b>`,
      rightLabel: h.untilResumed,
      onSlot: (M) => this.editHeat(n, o, { duration: os(M) })
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
                          ${M === "plan" ? e.heatingMode.schedule : e.heatingMode.off}
                        </button>`
    )}
                    </div>
                  </div>`}
            </div>
            <p class="timer-foot">${_ ? h.footIdle : R}</p>` : l.mode === "manual" && !p ? u`<p class="sheet-message">${h.noTimer}</p>` : m}
      <p class="heat-note" role="status">${Ye(this.heatNote(n, o, s, d.filter((M) => M.unsupported).map((M) => `${M.label}: ${M.unsupported}`)))}</p>
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : m}
      ${this.renderSheetTail(t.length === 1 ? o : void 0)}
    `;
  }
  renderClimatePanel(t) {
    const { t: e } = this._i18n, n = t[0], o = n?.air_conditioner, s = this.getState(o), a = s !== void 0 && !tt(s.state.toLowerCase());
    if (!n || !o || !a)
      return u`<p class="sheet-message">${e.sheet.entityUnavailable}</p>${this.renderSheetTail(void 0)}`;
    const r = Ft(s?.attributes.hvac_modes), l = Ft(s?.attributes.preset_modes), d = s?.state.toLowerCase(), h = String(s?.attributes.preset_mode ?? "none").toLowerCase(), p = this.climateOptions(o, r, d, l, h);
    if (p.length === 0)
      return u`<p class="sheet-message">${e.sheet.noModes}</p>${this.renderSheetTail(o)}`;
    const c = we(s, this._i18n), g = Math.ceil(Y(s?.attributes.min_temp) ?? 16), b = Math.floor(Y(s?.attributes.max_temp) ?? 30), k = this._acTarget ?? Y(s?.attributes.temperature), $ = k === void 0 ? void 0 : Math.round(k), w = ["cool", "wind_free", "heat", "auto"].includes(c.mode), _ = c.mode === "off" || c.mode === "fan" || c.mode === "dry" || c.mode === "unknown", z = this.renderDial({
      id: "ac-dial",
      text: _ ? e.climateMode[c.mode === "unknown" ? "unknown" : c.mode] : void 0,
      value: _ ? void 0 : $,
      min: g,
      max: b,
      eyebrow: c.mode === "off" ? e.system.climate : _ ? e.sheet.mode : e.sheet.heatControl.temperature,
      sub: this.roomNow(t),
      tone: c.color,
      label: e.sheet.heatControl.temperatureSlider,
      onChange: w ? (S) => this._acTarget = S : void 0,
      onCommit: w ? () => {
        this.runSheetAction(() => this.commitAcTarget(t));
      } : void 0
    }), C = Ft(s?.attributes.fan_modes), E = Ft(s?.attributes.swing_modes), x = String(s?.attributes.fan_mode ?? "").toLowerCase(), R = String(s?.attributes.swing_mode ?? "").toLowerCase(), M = l.filter((S) => S !== "none" && S !== "wind_free"), P = c.active, T = this._ac?.duration ?? At, I = Vt(T), N = e.sheet.heatControl, B = I === void 0 ? N.noLimit : `${jt(I)} · ${N.until(this._i18n.time(Date.now() + I * 6e4))}`, q = I === void 0 ? N.acFootForever : N.acFootTimed(this._i18n.time(Date.now() + I * 6e4)), Q = !!this.hass?.callWS, K = !P;
    return u`
      ${z}
      <div class="options climate-options" role="group" aria-label=${e.sheet.modes(e.system.climate)}>
        ${p.map((S) => this.renderOption(S))}
      </div>
      ${Q ? u`<div class="timer-card ${K ? "dim" : ""}" ?inert=${K}>
              ${this.renderTimer({
      slot: ss(T),
      last: J.length,
      readout: B,
      label: N.durationSlider,
      leftLabel: jt(J[0]),
      leftIcon: Gi(),
      leftText: u`<b>${jt(J[0])}</b>`,
      rightLabel: N.noLimit,
      onSlot: (S) => this._ac = { duration: as(S), touched: !0 }
    })}
            </div>
            <p class="timer-foot">${K ? N.acFootIdle : q}</p>` : m}
      ${C.length > 0 ? this.renderChoice(e.sheet.climate.fan, C, x, K, (S) => this.callClimateEach(t, "set_fan_mode", { fan_mode: S }), (S) => this.fanLabel(S)) : m}
      ${E.length > 0 ? this.renderChoice(e.sheet.climate.swing, E, R, K, (S) => this.callClimateEach(t, "set_swing_mode", { swing_mode: S }), (S) => this.swingLabel(S)) : m}
      ${M.length > 0 ? u`<div class="sheet-label" id="preset-label">${e.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${M.map((S) => this.renderPresetChip(t, S, h, d, l))}
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
    return this._i18n.t.sheet.climate.fanModes[t.toLowerCase()] ?? ue(t);
  }
  swingLabel(t) {
    return this._i18n.t.sheet.climate.swingModes[t.toLowerCase()] ?? ue(t);
  }
  /** A row of mutually exclusive choices (iOS segmented look), e.g. the fan speed. */
  renderChoice(t, e, n, o, s, a) {
    return u`<div class="sheet-label">${t}</div>
      <div class="mini-segmented wide ${o ? "dim" : ""}" ?inert=${o} role="group" aria-label=${t}>
        ${e.map(
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
    const l = (x) => [
      136 + 118 * Math.cos(x * Math.PI / 180),
      136 + 118 * Math.sin(x * Math.PI / 180)
    ], d = (x, R) => {
      const [M, P] = l(x), [T, I] = l(R);
      return `M${M.toFixed(2)} ${P.toFixed(2)} A118 118 0 ${R - x > 180 ? 1 : 0} 1 ${T.toFixed(2)} ${I.toFixed(2)}`;
    }, h = t.min ?? 0, p = t.max ?? 1, c = t.text === void 0 ? t.value : void 0, g = c === void 0 || p <= h ? 0 : Math.min(1, Math.max(0, (c - h) / (p - h))), b = 135 + 270 * g, [k, $] = l(b), w = t.onChange !== void 0 && c !== void 0, _ = t.text ?? (c === void 0 ? "––" : `${this._i18n.whole(c)}°`), z = (x) => {
      const R = x.currentTarget.getBoundingClientRect();
      let M = Math.atan2(x.clientY - (R.top + R.height / 2), x.clientX - (R.left + R.width / 2)) * 180 / Math.PI;
      return M < 0 && (M += 360), M < 135 && (M += 360), M > 405 && (M = M - 405 < 90 / 2 ? 405 : 135), Math.round(h + (M - 135) / 270 * (p - h));
    }, C = (x) => {
      if (!w)
        return;
      if (x.type === "pointerdown")
        x.currentTarget.setPointerCapture?.(x.pointerId);
      else if (x.buttons !== 1)
        return;
      const R = z(x);
      R !== c && t.onChange?.(R);
    }, E = (x) => {
      if (!w || c === void 0)
        return;
      const R = x.key === "ArrowUp" || x.key === "ArrowRight" ? 1 : x.key === "ArrowDown" || x.key === "ArrowLeft" ? -1 : 0, M = x.key === "Home" ? h : x.key === "End" ? p : c + R;
      M === c && R === 0 && x.key !== "Home" && x.key !== "End" || (x.preventDefault(), t.onChange?.(Math.min(p, Math.max(h, M))), t.onCommit?.());
    };
    return u`
      <div class="dial" style=${`--tone: ${t.tone}`}>
        <div
          class="dial-ring"
          data-drag
          role=${w ? "slider" : "img"}
          tabindex=${w ? "0" : m}
          aria-label=${t.label ?? `${t.eyebrow}: ${_}`}
          aria-valuemin=${w ? h : m}
          aria-valuemax=${w ? p : m}
          aria-valuenow=${w ? c : m}
          aria-valuetext=${w ? `${_} °C` : m}
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
    const { slot: e, last: n } = t, o = n > 0 ? e / n * 100 : 0, s = (r) => {
      if (r.type === "pointerdown")
        r.currentTarget.setPointerCapture?.(r.pointerId);
      else if (r.buttons !== 1)
        return;
      const l = r.currentTarget.getBoundingClientRect(), d = Math.round(Math.min(1, Math.max(0, (r.clientX - l.left) / Math.max(l.width, 1))) * n);
      d !== e && t.onSlot(d);
    }, a = (r) => {
      const l = r.key === "ArrowRight" || r.key === "ArrowUp" ? 1 : r.key === "ArrowLeft" || r.key === "ArrowDown" ? -1 : 0, d = r.key === "Home" ? 0 : r.key === "End" ? n : e + l;
      l === 0 && r.key !== "Home" && r.key !== "End" || (r.preventDefault(), t.onSlot(Math.min(n, Math.max(0, d))));
    };
    return u`
      <div class="timer-read" role="status">${t.readout}</div>
      <div class="timer-row">
        <button
          type="button"
          class="plain-button end-button"
          aria-label=${t.leftLabel}
          aria-pressed=${e === 0 ? "true" : "false"}
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
          aria-valuenow=${e}
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
          aria-pressed=${e === n ? "true" : "false"}
          @click=${() => t.onSlot(n)}
        >
          <span class="end-icon infinity" aria-hidden="true">∞</span>
        </button>
      </div>
      <div class="timer-ticks" aria-hidden="true"><span>${t.leftText}</span><span><b>∞</b></span></div>
    `;
  }
  segmentKeydown(t, e, n) {
    const o = e.indexOf(n);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = e[(o + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = e[(o - 1 + e.length) % e.length] : t.key === "Home" ? s = e[0] : t.key === "End" && (s = e[e.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === n ? this.requestUpdate() : this.switchSheet(s));
  }
  /** "Teď" of the air chart is the reading of the room card (CO₂ and PM2.5), so a stale value is grey there too. */
  liveReading(t, e) {
    if (e === "temperature")
      return;
    const n = Date.now(), o = this.reading(t.carbon_dioxide, t.thresholds.stale_minutes, n), s = this.pm25Reading(t, n), a = e === "pm25" ? s : o;
    return {
      value: a.value,
      stale: a.stale === !0,
      secondary: e === "co2" ? { value: s.value, stale: s.stale === !0 } : void 0
    };
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, e, n) {
    const o = this._config?.history.hours ?? 24, { t: s } = this._i18n;
    let a;
    const r = this._historyModel;
    return this._historyStatus === "loading" ? a = u`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !r ? a = u`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : Cs(r, e) ? a = u`<div
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
        ${Hs(r, e, this.chartWidth(), this._scrubTime, this._i18n, n, this.liveReading(t, e))}
      </div>` : a = u`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, a;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(fa).matches === !0;
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
          ${t.unsupported ? u`<span class="option-hint">${t.unsupported}</span>` : m}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, e, n, o, s) {
    const a = n === e && o !== "off", r = a && s.includes("none") ? "none" : e;
    return u`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${a ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.callClimateEach(t, "set_preset_mode", { preset_mode: r }));
    }}
      >
        ${ue(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost (a fixed 25 °C) and the duration of Ručně / Boost / Vypnuto need the
   * Tado CE action `tado_ce.set_climate_timer`; without it Boost is shown but disabled.
   * A choice is applied when the popup closes.
   */
  heatingOptions(t, e, n) {
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
    return e.includes("off") && r("off", s.off, f.off, "off"), e.includes("auto") && r("auto", s.schedule, f.plan, "plan"), e.includes("heat") && r("heat", s.manual, f.warning, "manual"), o.length > 0 && r("boost", s.boost, f.alert, "boost", a ? void 0 : this._i18n.t.sheet.notOffered), o;
  }
  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  timerAvailable() {
    return !!this.hass?.services?.tado_ce?.set_climate_timer;
  }
  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  heatControl(t, e, n) {
    return this._heat?.entityId === e ? this._heat : Yi(t.name, e, n);
  }
  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  async chooseHeating(t, e) {
    const n = this._sheet?.room;
    if (!n)
      return;
    const o = this.getState(t);
    if (Yi(n.name, t, o)?.mode === e && this.sheetRooms().length === 1) {
      this._heat = void 0;
      return;
    }
    const a = this.heatControl(n, t, o);
    this._heat = {
      room: n.name,
      entityId: t,
      mode: e,
      temperature: a?.temperature ?? 21,
      duration: xn(e),
      after: a?.after
    };
  }
  /** Sends the changes made in the popup (closing, switching system, leaving for the detail). */
  flushHeat() {
    const t = this._heat;
    if (t) {
      this._heat = void 0;
      const e = this.sheetRooms().filter((n) => n.heating?.climate);
      this.applyHeat(t, e.length > 0 ? e : []);
    }
    this.flushAc();
  }
  /** The Klimatizace "turn off after" time: a script that Home Assistant runs by itself. */
  flushAc() {
    const t = this._ac;
    this._ac = void 0, this._acTarget = void 0;
    const e = t?.touched ? Vt(t.duration) : void 0;
    if (e !== void 0)
      for (const n of this.sheetRooms()) {
        const o = n.air_conditioner, s = this.getState(o)?.state.toLowerCase();
        o && s && s !== "off" && !tt(s) && this.runDelayedOff(Ki(o, e, s));
      }
  }
  async runDelayedOff(t) {
    try {
      await this.hass?.callWS({ type: "execute_script", ...t });
    } catch (e) {
      console.error("Klima Dashboard: scheduling the switch-off failed", e), this.haptic("failure");
    }
  }
  async applyHeat(t, e) {
    const n = Vt(t.duration), o = (t.mode === "manual" || t.mode === "boost") && n !== void 0 && (t.after ?? this.defaultAfter()) === "off";
    for (const s of e) {
      const a = s.heating?.climate;
      if (a)
        try {
          await this.callCommand(ds(a, { ...t, entityId: a, room: s.name }, this.timerAvailable())), o && n !== void 0 && this.runDelayedOff(Ki(a, n, "auto", 15));
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
  editHeat(t, e, n) {
    const o = this.heatControl(t, e, this.getState(e));
    o && (this._heat = { ...o, ...n });
  }
  /** The line under the options: what waits for the popup to close, else the time left, else what is not offered. */
  heatNote(t, e, n, o) {
    const s = this._i18n.t.sheet.heatControl;
    if (this._heat)
      return s.appliesOnClose;
    const a = Sn(n), r = Y(this.getState(t.heating?.overlay)?.attributes.overlay_remaining_seconds);
    return e && a !== void 0 && a !== "auto" && r !== void 0 && r > 0 ? s.remaining(jt(Math.ceil(r / 60))) : o.join(" · ");
  }
  isSummerNow() {
    const t = this._config;
    return t !== void 0 && ft(this.entityState(t.houseModeEntity) ?? "") === ft(t.houseModes.summer);
  }
  /** After-timer choice: the person's last pick, otherwise by season (winter Plán, summer Vypnuto). */
  defaultAfter() {
    try {
      const t = window.localStorage.getItem(sn);
      if (t === "plan" || t === "off")
        return t;
    } catch {
    }
    return this.isSummerNow() ? "off" : "plan";
  }
  chooseAfter(t, e, n) {
    try {
      window.localStorage.setItem(sn, n);
    } catch {
    }
    this.editHeat(t, e, { after: n });
  }
  /** Air conditioner target: sent once the finger lifts (or a key was pressed), to every room of the popup. */
  async commitAcTarget(t) {
    const e = this._acTarget;
    e !== void 0 && (await this.callClimateEach(t, "set_temperature", { temperature: e }), this._acTarget = void 0);
  }
  /** One climate action for the air conditioner of every room in the popup. */
  async callClimateEach(t, e, n) {
    const o = t.map((s) => s.air_conditioner).filter((s) => !!s);
    await Promise.all(o.map((s) => this.callClimate(e, { entity_id: s, ...n })));
  }
  /**
   * Klimatizace modes in the order of the popup: Vypnuto, Chlazení, WindFree (cooling with the
   * `wind_free` preset, one tap), Topení, Větrání, Sušení and Auto. Every choice goes to the
   * air conditioner of every room in the popup.
   */
  climateOptions(t, e, n, o, s) {
    const a = this.sheetRooms().filter((g) => g.air_conditioner), r = o.includes("wind_free"), l = o.includes("none"), d = this._i18n.t.climateMode, h = (g, b, k, $) => ({
      id: g,
      label: d[b],
      icon: Wt(b, Xt[b], !1),
      color: Xt[b],
      active: k,
      run: $
    }), p = (g, b) => async () => {
      await this.callClimateEach(a, "set_hvac_mode", { hvac_mode: g }), b !== void 0 && await this.callClimateEach(a, "set_preset_mode", { preset_mode: b });
    }, c = [];
    if (e.includes("off") && c.push(h("off", "off", n === "off", p("off"))), e.includes("cool")) {
      const g = n === "cool" && s !== "wind_free";
      c.push(h("cool", "cool", g, p("cool", s === "wind_free" && l ? "none" : void 0))), r && c.push(h("wind_free", "wind_free", n === "cool" && s === "wind_free", p("cool", "wind_free")));
    }
    for (const [g, b] of [["heat", "heat"], ["fan_only", "fan"], ["dry", "dry"], ["auto", "auto"]])
      e.includes(g) && c.push(h(g, b, n === g, p(g)));
    return c;
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
  openSheet(t, e, n, o) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._dragY = 0, this._acTarget = void 0, this._ac = void 0, this._sheet = { kind: t, room: e, metric: t === "history" ? o ?? "temperature" : void 0 }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return $n(t, this._i18n.language);
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, e, n) {
    const o = (this._config?.rooms ?? []).filter((s) => e.includes(s.name));
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
      t.air_conditioner,
      t.carbon_dioxide,
      t.pm25,
      this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0,
      ...t.windows.map((r) => r.entity)
    ].filter((r) => !!r), o = this._config.history, s = Date.now(), a = s - o.hours * Ct;
    try {
      const r = await ie(this.hass, n, a, s);
      if (e !== this._historyRequest)
        return;
      this._historyModel = Ts(r, t, { startMs: a, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: loading the room history failed", r), e === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported()]);
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = Po(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, o = Date.now(), s = o - e * 6e4;
    try {
      const a = await ie(this.hass, t, s, o), r = {};
      for (const l of t)
        r[l] = ps(a[l], s, o, n);
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
    const e = Ro(this._config), n = await Promise.allSettled(
      e.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    n.forEach((s, a) => {
      if (s.status === "fulfilled") {
        const r = Date.parse(s.value?.last_reported ?? s.value?.last_updated ?? "");
        Number.isFinite(r) && (o[e[a]] = r);
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
    const a = this._reported[t];
    if (a === void 0)
      return { value: s };
    const r = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(a, Number.isFinite(r) ? r : 0), d = Math.max(0, (n - l) / 6e4);
    return { value: s, ageMinutes: d, stale: !(o && s === 0) && d > e };
  }
  /**
   * PM2.5 of a room (CURRENT_SPEC.md, Chybějící data). A measured 0 µg/m³ is clean air and never
   * stale. The particle sensor shares the device of the CO₂ sensor (ALPSTUGA) and reports only a
   * change, which a steady value may not give for hours: while the CO₂ of the room is fresh, the
   * device is alive and the unchanged PM2.5 is fresh too.
   */
  pm25Reading(t, e) {
    const n = t.thresholds.stale_minutes, o = this.reading(t.pm25, n, e, !0);
    if (o.value === void 0 || o.stale !== !0)
      return o;
    const s = this.reading(t.carbon_dioxide, n, e);
    return s.value !== void 0 && s.stale === !1 ? { value: o.value, ageMinutes: s.ageMinutes, stale: !1 } : o;
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${Gi()}</span>` : m;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(wn(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || tt(e.toLowerCase()))
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
ui.styles = [vs, sa];
let F = ui;
j([
  H()
], F.prototype, "_config");
j([
  O({ attribute: !1 })
], F.prototype, "hass");
j([
  H()
], F.prototype, "_sheet");
j([
  H()
], F.prototype, "_sheetError");
j([
  H()
], F.prototype, "_ventilationEnding");
j([
  H()
], F.prototype, "_announcement");
j([
  H()
], F.prototype, "_vent");
j([
  H()
], F.prototype, "_heat");
j([
  H()
], F.prototype, "_acTarget");
j([
  H()
], F.prototype, "_ac");
j([
  H()
], F.prototype, "_historyStatus");
j([
  H()
], F.prototype, "_historyModel");
j([
  H()
], F.prototype, "_scrubTime");
j([
  H()
], F.prototype, "_dragY");
j([
  H()
], F.prototype, "_flash");
j([
  H()
], F.prototype, "_moving");
j([
  H()
], F.prototype, "_prefersDark");
j([
  H()
], F.prototype, "_hint");
j([
  H()
], F.prototype, "_trends");
j([
  H()
], F.prototype, "_trendsLoaded");
j([
  H()
], F.prototype, "_reported");
j([
  H()
], F.prototype, "_historyRequest");
j([
  H()
], F.prototype, "_clock");
bo("kd");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", F);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Xe(Ks()).t.cardDescription,
  preview: !1
});
