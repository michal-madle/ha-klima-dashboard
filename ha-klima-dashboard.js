const ce = globalThis, Qe = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ti = /* @__PURE__ */ Symbol(), Ri = /* @__PURE__ */ new WeakMap();
let wn = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== ti) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Qe && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Ri.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ri.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const to = (i) => new wn(typeof i == "string" ? i : i + "", void 0, ti), ht = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new wn(e, i, ti);
}, eo = (i, t) => {
  if (Qe) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = ce.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, Di = Qe ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return to(e);
})(i) : i;
const { is: io, defineProperty: no, getOwnPropertyDescriptor: oo, getOwnPropertyNames: so, getOwnPropertySymbols: ro, getPrototypeOf: ao } = Object, ye = globalThis, Ii = ye.trustedTypes, lo = Ii ? Ii.emptyScript : "", ho = ye.reactiveElementPolyfillSupport, Wt = (i, t) => i, me = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? lo : null;
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
} }, ei = (i, t) => !io(i, t), Fi = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: ei };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ye.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Fi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && no(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = oo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Fi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Wt("elementProperties"))) return;
    const t = ao(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Wt("properties"))) {
      const e = this.properties, n = [...so(e), ...ro(e)];
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
      for (const o of n) e.unshift(Di(o));
    } else t !== void 0 && e.push(Di(t));
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
    return eo(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : me).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : me;
      this._$Em = o;
      const a = r.fromAttribute(e, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? ei)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
Pt.elementStyles = [], Pt.shadowRootOptions = { mode: "open" }, Pt[Wt("elementProperties")] = /* @__PURE__ */ new Map(), Pt[Wt("finalized")] = /* @__PURE__ */ new Map(), ho?.({ ReactiveElement: Pt }), (ye.reactiveElementVersions ??= []).push("2.1.2");
const ii = globalThis, ji = (i) => i, ge = ii.trustedTypes, Hi = ge ? ge.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, $n = "$lit$", bt = `lit$${Math.random().toFixed(9).slice(2)}$`, yn = "?" + bt, co = `<${yn}>`, Mt = document, Yt = () => Mt.createComment(""), Kt = (i) => i === null || typeof i != "object" && typeof i != "function", ni = Array.isArray, po = (i) => ni(i) || typeof i?.[Symbol.iterator] == "function", Ee = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ui = /-->/g, Bi = />/g, yt = RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vi = /'/g, qi = /"/g, xn = /^(?:script|style|textarea|title)$/i, kn = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = kn(1), y = kn(2), Dt = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), Wi = /* @__PURE__ */ new WeakMap(), St = Mt.createTreeWalker(Mt, 129);
function _n(i, t) {
  if (!ni(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Hi !== void 0 ? Hi.createHTML(t) : t;
}
const uo = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Ut;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let d, h, c = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, h = r.exec(l), h !== null); ) m = r.lastIndex, r === Ut ? h[1] === "!--" ? r = Ui : h[1] !== void 0 ? r = Bi : h[2] !== void 0 ? (xn.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = yt) : h[3] !== void 0 && (r = yt) : r === yt ? h[0] === ">" ? (r = o ?? Ut, c = -1) : h[1] === void 0 ? c = -2 : (c = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? yt : h[3] === '"' ? qi : Vi) : r === qi || r === Vi ? r = yt : r === Ui || r === Bi ? r = Ut : (r = yt, o = void 0);
    const b = r === yt && i[a + 1].startsWith("/>") ? " " : "";
    s += r === Ut ? l + co : c >= 0 ? (n.push(d), l.slice(0, c) + $n + l.slice(c) + bt + b) : l + bt + (c === -2 ? a : b);
  }
  return [_n(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Gt {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, h] = uo(t, e);
    if (this.el = Gt.createElement(d, n), St.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = St.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith($n)) {
          const m = h[r++], b = o.getAttribute(c).split(bt), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: f[2], strings: b, ctor: f[1] === "." ? mo : f[1] === "?" ? go : f[1] === "@" ? vo : xe }), o.removeAttribute(c);
        } else c.startsWith(bt) && (l.push({ type: 6, index: s }), o.removeAttribute(c));
        if (xn.test(o.tagName)) {
          const c = o.textContent.split(bt), m = c.length - 1;
          if (m > 0) {
            o.textContent = ge ? ge.emptyScript : "";
            for (let b = 0; b < m; b++) o.append(c[b], Yt()), St.nextNode(), l.push({ type: 2, index: ++s });
            o.append(c[m], Yt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === yn) l.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(bt, c + 1)) !== -1; ) l.push({ type: 7, index: s }), c += bt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = Mt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function It(i, t, e = i, n) {
  if (t === Dt) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = Kt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = It(i, o._$AS(i, t.values), o, n)), t;
}
class fo {
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
    const { el: { content: e }, parts: n } = this._$AD, o = (t?.creationScope ?? Mt).importNode(e, !0);
    St.currentNode = o;
    let s = St.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new Jt(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new bo(s, this, t)), this._$AV.push(d), l = n[++a];
      }
      r !== l?.index && (s = St.nextNode(), r++);
    }
    return St.currentNode = Mt, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Jt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = It(this, t, e), Kt(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== Dt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : po(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && Kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Mt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Gt.createElement(_n(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new fo(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Wi.get(t.strings);
    return e === void 0 && Wi.set(t.strings, e = new Gt(t)), e;
  }
  k(t) {
    ni(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new Jt(this.O(Yt()), this.O(Yt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = ji(t).nextSibling;
      ji(t).remove(), t = n;
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
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = u;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = It(this, t, e, 0), r = !Kt(t) || t !== this._$AH && t !== Dt, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = It(this, a[n + l], e, l), d === Dt && (d = this._$AH[l]), r ||= !Kt(d) || d !== this._$AH[l], d === u ? t = u : t !== u && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class mo extends xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class go extends xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class vo extends xe {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = It(this, t, e, 0) ?? u) === Dt) return;
    const n = this._$AH, o = t === u && n !== u || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== u && (n === u || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class bo {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    It(this, t);
  }
}
const wo = ii.litHtmlPolyfillSupport;
wo?.(Gt, Jt), (ii.litHtmlVersions ??= []).push("3.3.3");
const $o = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new Jt(t.insertBefore(Yt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const oi = globalThis;
class et extends Pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $o(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Dt;
  }
}
et._$litElement$ = !0, et.finalized = !0, oi.litElementHydrateSupport?.({ LitElement: et });
const yo = oi.litElementPolyfillSupport;
yo?.({ LitElement: et });
(oi.litElementVersions ??= []).push("4.2.2");
const Sn = /* @__PURE__ */ Symbol.for(""), xo = (i) => {
  if (i?.r === Sn) return i?._$litStatic$;
}, si = (i) => ({ _$litStatic$: i, r: Sn }), Yi = /* @__PURE__ */ new Map(), ko = (i) => (t, ...e) => {
  const n = e.length;
  let o, s;
  const r = [], a = [];
  let l, d = 0, h = !1;
  for (; d < n; ) {
    for (l = t[d]; d < n && (s = e[d], (o = xo(s)) !== void 0); ) l += o + t[++d], h = !0;
    d !== n && a.push(s), r.push(l), d++;
  }
  if (d === n && r.push(t[n]), h) {
    const c = r.join("$$lit$$");
    (t = Yi.get(c)) === void 0 && (r.raw = r, Yi.set(c, t = r)), e = a;
  }
  return i(t, ...e);
}, ri = ko(p);
const _o = { attribute: !0, type: String, converter: me, reflect: !1, hasChanged: ei }, So = (i = _o, t, e) => {
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
function w(i) {
  return (t, e) => typeof e == "object" ? So(i, t, e) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function P(i) {
  return w({ ...i, state: !0, attribute: !1 });
}
function Ue(i, t = {}) {
  return i.length < 2 ? p`${i[0] ?? u}` : p`<span class="joined ${t.whole ? "whole" : ""}">${i.map(
    (e, n) => p`${n ? p`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : u}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function ke(i, t = {}) {
  return Ue(i.split(" · "), t);
}
function ai(i, t) {
  i.querySelectorAll(".joined").forEach((e) => {
    const n = `${t}|${e.textContent}`;
    if (e.dataset.fit === n) return;
    e.classList.remove("stacked", "flow", "probe");
    const o = [...e.querySelectorAll(":scope > .joined-sep")];
    o.forEach((l) => l.classList.remove("break"));
    const s = [...e.querySelectorAll(":scope > .joined-part")], r = s.map((l) => l.getBoundingClientRect());
    if (!r.length || !r[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = n;
    const a = o.filter((l, d) => r[d + 1].top > r[d].top + 1);
    if (a.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = s.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), a.forEach((l) => l.classList.add("break"));
    }
  });
}
const li = ht`
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
`, Mn = 25, di = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], Mo = ["plan", "manual", "boost", "off"];
function hi(i) {
  return i === void 0 || i === "" || i === "unavailable" || i === "unknown";
}
function wt(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string") : [];
}
function Tt(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Nt(i, t) {
  const e = t?.state;
  if (!t || hi(e)) return;
  if (i === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? Tt(t.attributes.temperature) === Mn ? "boost" : "manual" : void 0;
  const n = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && n === "wind_free" ? "wind_free" : n === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : di.includes(e) ? e : void 0;
}
function ve(i, t) {
  const e = Nt(i, t);
  return e === void 0 ? void 0 : e !== "off";
}
function To(i, t, e, n, o) {
  if (n.includes(o)) return n.length > 1 ? n.filter((r) => r !== o) : n;
  const s = ve(i, t?.states[o]);
  return s === void 0 ? n : e.filter((r) => ve(i, t?.states[r.entity]) === s).map((r) => r.entity);
}
function Co(i, t) {
  return t.flatMap((e) => {
    const n = Tt(i?.states[e]?.attributes.temperature);
    return n === void 0 ? [] : [{ entity: e, value: n }];
  });
}
function Eo(i, t, e) {
  const n = new Set(e.map((o) => Nt(i, t?.states[o])).filter((o) => o !== void 0));
  return n.size === 1 ? [...n][0] : void 0;
}
function Ao(i, t) {
  const e = i === "heating" ? 0.5 : 1, n = Tt(t?.attributes.min_temp) ?? (i === "heating" ? 5 : 16), o = Tt(t?.attributes.max_temp) ?? (i === "heating" ? 25 : 30);
  return { min: Math.ceil(n / e) * e, max: Math.floor(o / e) * e, step: e };
}
function Oo(i) {
  const t = wt(i?.attributes.hvac_modes), e = wt(i?.attributes.preset_modes);
  return di.filter((n) => n === "wind_free" ? t.includes("cool") && e.includes("wind_free") : n === "sleep" ? e.includes("sleep") : n === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(n));
}
function zo(i, t, e) {
  const n = t.map((o) => wt(i?.states[o]?.attributes[e])).filter((o) => o.length);
  return n.length ? n[0].filter((o) => n.every((s) => s.includes(o))) : [];
}
function Lo(i, t, e) {
  const n = new Set(t.map((o) => i?.states[o]?.attributes[e]).filter((o) => typeof o == "string"));
  return n.size === 1 ? [...n][0] : void 0;
}
function Ae(i) {
  return !!i?.services?.tado_ce?.set_climate_timer;
}
function Po(i) {
  return `${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00`;
}
function No(i, t, e, n) {
  const o = e.mode ?? (e.temperature !== void 0 ? "manual" : Nt("heating", t));
  if (o === void 0) return [];
  if (o === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } }];
  if (o === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } }];
  const s = o === "boost" ? Mn : e.temperature ?? Tt(t?.attributes.temperature) ?? 21;
  if (!n)
    return o === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: s, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (o === "boost" ? "30" : "next"), a = { entity_id: i, temperature: s };
  return r === "next" ? a.overlay = "next_time_block" : r === "forever" ? a.overlay = "manual" : a.time_period = Po(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: a }];
}
function Ro(i, t, e) {
  const n = [], o = { entity_id: i }, s = wt(t?.attributes.hvac_modes), r = wt(t?.attributes.preset_modes), a = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (c) => n.push({ domain: "climate", service: "set_hvac_mode", data: { ...o, hvac_mode: c } }), h = (c) => n.push({ domain: "climate", service: "set_preset_mode", data: { ...o, preset_mode: c } });
    l === "wind_free" ? (d("cool"), h("wind_free")) : l === "sleep" ? ((t?.state === "off" || hi(t?.state)) && d("cool"), h("sleep")) : (d(l === "auto" ? s.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (a === "wind_free" || a === "sleep") && r.includes("none") && h("none"));
  }
  return e.temperature !== void 0 && l !== "off" && n.push({ domain: "climate", service: "set_temperature", data: { ...o, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && wt(t?.attributes.fan_modes).includes(e.fan) && n.push({ domain: "climate", service: "set_fan_mode", data: { ...o, fan_mode: e.fan } }), e.swing !== void 0 && wt(t?.attributes.swing_modes).includes(e.swing) && n.push({ domain: "climate", service: "set_swing_mode", data: { ...o, swing_mode: e.swing } }), n;
}
function Do(i, t) {
  const e = t.mode;
  return e === void 0 ? i?.state : e === "wind_free" || e === "sleep" && (i?.state === "off" || hi(i?.state)) ? "cool" : e === "sleep" ? i?.state : e === "auto" ? wt(i?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function Io(i, t, e) {
  const n = Math.round(t * 60), o = [{ delay: { hours: Math.floor(n / 3600), minutes: Math.floor(n % 3600 / 60), seconds: n % 60 } }];
  return e !== void 0 && o.push({ condition: "state", entity_id: i, state: e }), o.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: o };
}
var Fo = Object.defineProperty, st = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Fo(t, e, o), o;
};
const jo = ["next", "30", "60", "180", "forever"], Ho = [0, 60, 180, 480], wi = class wi extends et {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    ai(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.flush();
  }
  willUpdate(t) {
    (t.has("system") && t.get("system") !== void 0 || t.has("rooms") && t.get("rooms") !== void 0) && this.flush(t.get("selected") ?? this.selected, t.get("system") ?? this.system);
  }
  /** Sends what waits at once (the sheet closes). */
  async flush(t = this.selected, e = this.system) {
    window.clearTimeout(this.timer), this.timer = void 0;
    const n = this.draft;
    Object.keys(n).length && (this.draft = {}, await this.send(n, t, e));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, e, n) {
    const o = this.hass;
    if (!o) return;
    this.busy = !0;
    const s = Ae(o);
    try {
      for (const r of e) {
        const a = o.states[r];
        if (!a || Nt(n, a) === void 0) continue;
        const l = n === "heating" ? No(r, a, t, s) : Ro(r, a, t);
        for (const c of l) await o.callService(c.domain, c.service, c.data);
        const d = t.offAfter ?? 0, h = n === "cooling" ? Do(a, t) : void 0;
        d > 0 && h !== void 0 && h !== "off" && await o.callWS(Io(r, d, h));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (r) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${r instanceof Error ? r.message : String(r)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
    } finally {
      this.busy = this.timer !== void 0;
    }
  }
  name(t) {
    return this.rooms.find((e) => e.entity === t)?.name ?? t;
  }
  degrees(t) {
    const e = this.i18n;
    return `${e ? this.system === "heating" ? e.half(t) : e.whole(t) : String(t)}°`;
  }
  /** The state of a room in words for its tile ("Chlazení · 22°", "Plán · 21°", "Vypnuto"). */
  roomText(t) {
    const e = this.texts, n = this.hass?.states[t], o = Nt(this.system, n);
    if (o === void 0) return e.unavailable;
    const s = Tt(n?.attributes.temperature);
    return o !== "off" && o !== "boost" && o !== "fan_only" && s !== void 0 ? `${e.modes[o]} · ${this.degrees(s)}` : e.modes[o];
  }
  selectRoom(t) {
    const e = To(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return u;
    const n = this.hass, o = n?.states[this.selected[0]], { min: s, max: r, step: a } = Ao(this.system, o), l = Co(n, this.selected), d = [...new Set(l.map((x) => x.value))], h = Eo(this.system, n, this.selected), c = this.draft.mode ?? h, m = this.draft.temperature === void 0 && d.length > 1, b = this.draft.temperature ?? (c === "boost" ? 25 : d[0]), f = c === "off" || c === "fan_only", M = f && c !== void 0 ? t.modes[c] : m ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : b !== void 0 ? this.degrees(b) : "––", k = this.selected.flatMap((x) => {
      const N = Tt(n?.states[x]?.attributes.current_temperature);
      return N === void 0 ? [] : [{ id: x, text: `${e.one(N)} °C` }];
    }), $ = this.system === "heating" && this.selected.length === 1 && n?.states[this.selected[0]]?.attributes.hvac_action === "heating", _ = m ? t.targets(l.map((x) => `${this.name(x.entity)} ${this.degrees(x.value)}`).join(" · ")) : k.length ? t.now(this.selected.length === 1 ? `${k[0].text}${$ ? ` · ${t.heats}` : ""}` : k.map((x) => `${this.name(x.id)} ${x.text}`).join(" · ")) : "", R = this.system === "heating" ? Mo.filter((x) => x !== "boost" || Ae(n)) : di.filter((x) => this.selected.some((N) => Oo(n?.states[N]).includes(x))), E = this.draft.mode === void 0 && h === void 0 && this.selected.length > 1, O = this.system === "cooling" && (c === "off" || c === "fan_only");
    return p`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((x) => {
      const N = n?.states[x.entity], H = ve(this.system, N), A = this.selected.includes(x.entity);
      return Ki(this.prefix, {
        name: x.name,
        text: this.roomText(x.entity),
        state: A ? "on" : H ? "idle" : "off",
        disabled: H === void 0,
        pressed: A,
        onPress: () => this.selectRoom(x.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${f ? "word" : ""}" aria-live="polite">${M}</div>
        <div class="sub">${_}</div>
        ${this.busy ? p`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : u}
      </div>
      <div class="slider">
        ${Uo(this.prefix, {
      min: s,
      max: r,
      step: a,
      value: b ?? s,
      mixed: m,
      marks: m ? d : [],
      label: t.temperature,
      valueText: b !== void 0 ? this.degrees(b) : "",
      minLabel: this.degrees(s),
      maxLabel: this.degrees(r),
      disabled: O || !this.selected.length,
      onChange: (x) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && c !== "manual" ? { temperature: x, mode: "manual" } : { temperature: x })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? te(this.prefix, {
      label: t.mode,
      options: R.map((x) => ({ value: x, label: t.modes[x] })),
      value: c ?? "",
      onSelect: (x) => this.change({ mode: x, ...x === "plan" || x === "off" ? { temperature: void 0 } : {} })
    }) : p`<div class="modes" role="group" aria-label=${t.mode}>
            ${R.map(
      (x) => Ki(this.prefix, {
        centered: !0,
        name: t.modes[x],
        state: c === x ? "on" : "idle",
        pressed: c === x,
        onPress: () => this.change({ mode: x })
      })
    )}
          </div>`}
      ${E ? p`<div class="note">${ke(t.mixedModes(this.selected.map((x) => `${this.name(x)} ${t.modes[Nt(this.system, n?.states[x]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : u}
      ${(m || E) && !Object.keys(this.draft).length ? p`<div class="note">${t.firstChange}</div>` : u}
      ${this.system === "heating" ? this.renderManualFor(c) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(c)]}
      ${this.error ? p`<div class="error" role="alert">${this.error}</div>` : u}
      ${this.selected.length === 1 ? p`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : u}
    `;
  }
  renderManualFor(t) {
    const e = this.texts;
    if (!Ae(this.hass)) return u;
    const n = t === "manual" || t === "boost", o = this.draft.manualFor ?? (t === "boost" ? "30" : "next"), s = Number(o), r = n ? o === "next" ? e.untilNextPlan : o === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + s * 6e4)) : "";
    return p`<h3>${e.manualFor}</h3>
      ${te(this.prefix, {
      label: e.manualFor,
      options: jo.map((a) => ({ value: a, label: e.manualForChoices[a] })),
      value: o,
      disabled: !n,
      wrap: !0,
      onSelect: (a) => this.change({ manualFor: a, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${r}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, n = zo(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!n.length) return u;
    const o = t === "fan" ? e.fanModes : e.swingModes, s = this.draft[t] ?? Lo(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", r = t === "fan" ? e.fan : e.swing;
    return p`<h3>${r}</h3>
      ${te(this.prefix, {
      label: r,
      options: n.map((a) => ({ value: a, label: o[a] ?? a })),
      value: s,
      onSelect: (a) => this.change(t === "fan" ? { fan: a } : { swing: a })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, n = this.draft.offAfter ?? 0, o = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((r) => ve(this.system, this.hass?.states[r]) === !0), s = o ? n === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + n * 6e4)) : "";
    return p`<h3>${e.offAfter}</h3>
      ${te(this.prefix, {
      label: e.offAfter,
      options: Ho.map((r) => ({ value: String(r), label: e.offAfterChoices[String(r)] })),
      value: String(n),
      disabled: !o,
      onSelect: (r) => this.change({ offAfter: Number(r) })
    })}
      <div class="footer">${s}</div>`;
  }
};
wi.styles = [li, ht`
    :host {
      display: block;
    }
    .rooms {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .target {
      position: relative;
      margin: 18px 0 4px;
      text-align: center;
    }
    .big {
      font-size: 64px;
      font-weight: 600;
      line-height: 72px;
      letter-spacing: -1px;
      font-variant-numeric: tabular-nums;
    }
    .big.word {
      font-size: 40px;
      line-height: 72px;
    }
    .sub,
    .note,
    .footer {
      color: var(--hdk-secondary, #98989f);
      font-size: 15px;
      line-height: 20px;
    }
    .sub {
      min-height: 20px;
    }
    .busy {
      position: absolute;
      top: 6px;
      right: 0;
      width: 20px;
      height: 20px;
      color: var(--hdk-secondary, #98989f);
    }
    .busy svg {
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .busy svg {
        animation: none;
      }
    }
    .slider {
      margin: 12px 0 0;
    }
    h3 {
      margin: 20px 4px 8px;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      text-transform: uppercase;
    }
    .modes {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .note,
    .footer {
      margin: 8px 4px 0;
      min-height: 20px;
    }
    .detail {
      display: block;
      min-height: 44px;
      margin: 12px 0 0;
      padding: 0 4px;
      border: 0;
      background: none;
      color: var(--hdk-accent, #0a84ff);
      font: inherit;
      font-size: 17px;
      line-height: 22px;
      cursor: pointer;
    }
    .detail:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .error {
      margin: 8px 4px 0;
      color: var(--hdk-error, #ff6961);
      font-size: 15px;
      line-height: 20px;
    }
  `];
let K = wi;
st([
  w({ attribute: !1 })
], K.prototype, "hass");
st([
  w({ attribute: !1 })
], K.prototype, "i18n");
st([
  w({ attribute: !1 })
], K.prototype, "texts");
st([
  w()
], K.prototype, "system");
st([
  w({ attribute: !1 })
], K.prototype, "rooms");
st([
  w({ attribute: !1 })
], K.prototype, "selected");
st([
  w()
], K.prototype, "prefix");
st([
  w({ type: Number })
], K.prototype, "delayMs");
st([
  P()
], K.prototype, "draft");
st([
  P()
], K.prototype, "busy");
st([
  P()
], K.prototype, "error");
function Ki(i, t) {
  const e = si(`${i}-tile`);
  return ri`<${e}
    kind="action"
    ?centered=${t.centered ?? !1}
    .name=${t.name}
    .text=${t.text ?? ""}
    .state=${t.state}
    .disabled=${t.disabled ?? !1}
    .label=${t.label ?? ""}
    .pressed=${t.pressed}
    @hdk-press=${(n) => {
    n.stopPropagation(), t.onPress();
  }}
  ></${e}>`;
}
function te(i, t) {
  const e = si(`${i}-segmented`);
  return ri`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(n) => {
    n.stopPropagation(), t.onSelect(n.detail.value);
  }}
  ></${e}>`;
}
function Uo(i, t) {
  const e = si(`${i}-slider`);
  return ri`<${e}
    .min=${t.min}
    .max=${t.max}
    .step=${t.step}
    .tickStep=${1}
    .value=${t.value}
    ?mixed=${t.mixed}
    .marks=${t.marks}
    .label=${t.label}
    .valueText=${t.valueText}
    .minLabel=${t.minLabel}
    .maxLabel=${t.maxLabel}
    .disabled=${t.disabled}
    @hdk-input=${(n) => n.stopPropagation()}
    @hdk-change=${(n) => {
    n.stopPropagation(), t.onChange(n.detail.value);
  }}
  ></${e}>`;
}
function Bo(i) {
  if (!customElements.get(`${i}-climate`)) {
    const t = class extends K {
      constructor() {
        super(), this.prefix = i;
      }
    };
    customElements.define(`${i}-climate`, t);
  }
}
var Vo = Object.defineProperty, Ft = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Vo(t, e, o), o;
};
const $i = class $i extends et {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, n = (t - e) / 2, o = 2 * Math.PI * n, s = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return p`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${r} cy=${r} r=${n} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${r}
          cy=${r}
          r=${n}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(o * s).toFixed(1)} ${o.toFixed(1)}"
          transform="rotate(-90 ${r} ${r})"
        ></circle>
      </svg>
      ${this.num ? p`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? p`<span class="unit">${this.unit}</span>` : u}` : u}
    </div>`;
  }
};
$i.styles = ht`
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
let pt = $i;
Ft([
  w({ type: Number })
], pt.prototype, "fraction");
Ft([
  w({ type: Number })
], pt.prototype, "size");
Ft([
  w({ type: Number })
], pt.prototype, "stroke");
Ft([
  w()
], pt.prototype, "num");
Ft([
  w()
], pt.prototype, "unit");
Ft([
  w()
], pt.prototype, "label");
class _e {
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
class ci {
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
const pi = ht`
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
var qo = Object.defineProperty, J = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && qo(t, e, o), o;
};
const yi = class yi extends et {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ci(this), this.nudgeIndex = 0, this.gesture = new _e(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), n = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : s;
    return p`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((a) => a.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${r}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(a) => this.guarded && a.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (a, l) => p`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === n ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? p`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? p`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
    const e = t.currentTarget, n = this.options.findIndex((a) => a.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), s = o ? Number(o.dataset.index) : -1, r = s >= 0 && s !== n && !this.options[s]?.disabled;
    this.gesture.start(() => {
      r && (this.drag = void 0, this.select(this.options[s].value));
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
    const n = this.options.filter((a) => !a.disabled);
    if (!n.length) return;
    const o = n.findIndex((a) => a.value === this.value), s = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, r = n[(o + s + n.length) % n.length];
    t.preventDefault(), this.select(r.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${r.value}"]`)?.focus());
  }
};
yi.styles = [
  pi,
  ht`
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
      .track.wrap button {
        padding: 0 4px;
        font-size: 13px;
        line-height: 17px;
        text-align: center;
      }
      /* A control that cannot be used now does not look chosen: the thumb fades with the labels. */
      .track.off .thumb {
        opacity: 0.5;
        box-shadow: none;
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
let V = yi;
J([
  w({ attribute: !1 })
], V.prototype, "options");
J([
  w()
], V.prototype, "value");
J([
  w()
], V.prototype, "label");
J([
  w({ type: Boolean })
], V.prototype, "disabled");
J([
  w({ type: Boolean })
], V.prototype, "compact");
J([
  w({ type: Boolean })
], V.prototype, "wrap");
J([
  w({ type: Boolean })
], V.prototype, "guarded");
J([
  w({ type: Number })
], V.prototype, "holdMs");
J([
  w({ type: Number })
], V.prototype, "doubleTapMs");
J([
  w({ type: Number })
], V.prototype, "hintSeconds");
J([
  w()
], V.prototype, "hint");
J([
  P()
], V.prototype, "_dx");
J([
  P()
], V.prototype, "_dragging");
var Wo = Object.defineProperty, jt = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Wo(t, e, o), o;
};
const Yo = 100, Ko = 0.6, Go = 6, xi = class xi extends et {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const n = t.composedPath(), o = e.findIndex((r) => n.includes(r)), s = t.shiftKey ? e[o <= 0 ? e.length - 1 : o - 1] : e[o === -1 || o === e.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || e instanceof HTMLInputElement && e.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const e = this.drag;
      if (!e || e.pointerId !== t.pointerId) return;
      const n = t.clientY - e.startY;
      if (!this.dragging) {
        if (n < Go) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Yo || o > Ko) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let e = document.activeElement;
      for (; e?.shadowRoot?.activeElement; ) e = e.shadowRoot.activeElement;
      this.returnFocus = e, this.dragY = 0;
    }
  }
  updated(t) {
    t.has("open") && (this.open ? this.renderRoot.querySelector(".sheet")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content. */
  focusable() {
    const t = this.renderRoot.querySelector(".close"), e = [...this.querySelectorAll("*")].flatMap((n) => {
      const o = n.shadowRoot?.querySelector("button:not([disabled]), input:not([disabled])") ?? n;
      return o.matches("button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])") ? [o] : [];
    });
    return [...t ? [t] : [], ...e];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".sheet");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  render() {
    return this.open ? p`<div
      class="backdrop"
      part="backdrop"
      style=${`--backdrop-opacity: ${Math.max(0, 1 - this.dragY / 400).toFixed(2)}`}
      @click=${() => this.close()}
      @keydown=${this.keydown}
      @touchstart=${this.touchStart}
      @touchmove=${this.touchMove}
      @wheel=${this.wheel}
    >
      <div
        class="sheet ${this.dragging ? "dragging" : ""}"
        part="sheet"
        style=${this.dragY > 0 ? `transform: translateY(${this.dragY}px)` : ""}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
        tabindex="-1"
        @click=${(t) => t.stopPropagation()}
      >
        <div class="top" @pointerdown=${this.dragStart} @pointermove=${this.dragMove} @pointerup=${this.dragEnd} @pointercancel=${this.dragEnd}>
          <div class="grabber" aria-hidden="true"></div>
          <div class="head">
            <div>
              <h2 id="title">${this.heading}</h2>
              ${this.sub ? p`<div class="sub">${this.sub}</div>` : u}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : u;
  }
};
xi.styles = ht`
    :host {
      display: contents;
    }
    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / calc(var(--hdk-sheet-backdrop, 60%) * var(--backdrop-opacity, 1)));
      overscroll-behavior: contain;
      touch-action: none;
    }
    .sheet {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: var(--hdk-sheet-bg, #1c1c1e);
      color: var(--hdk-sheet-text, #ffffff);
      animation: rise 220ms ease-out;
      transition: transform 220ms ease-out;
    }
    .sheet:focus {
      outline: none;
    }
    .sheet.dragging {
      transition: none;
    }
    .top {
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
      background: var(--hdk-sheet-grabber, rgb(255 255 255 / 28%));
    }
    .head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 14px;
      line-height: 20px;
    }
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 44px;
      width: 44px;
      height: 44px;
      margin: -8px -8px 0 0;
      padding: 0;
      border: 0;
      background: none;
      color: var(--hdk-secondary, #9a9aa0);
      cursor: pointer;
    }
    .close span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--hdk-sheet-button, rgb(118 118 128 / 24%));
    }
    .close svg {
      width: 12px;
      height: 12px;
    }
    .close:focus-visible {
      border-radius: 50%;
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
    }
    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .sheet {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .sheet {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
  `;
let ut = xi;
jt([
  w({ type: Boolean, reflect: !0 })
], ut.prototype, "open");
jt([
  w()
], ut.prototype, "heading");
jt([
  w()
], ut.prototype, "sub");
jt([
  w()
], ut.prototype, "closeLabel");
jt([
  P()
], ut.prototype, "dragY");
jt([
  P()
], ut.prototype, "dragging");
var Xo = Object.defineProperty, Q = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Xo(t, e, o), o;
};
const ki = class ki extends et {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = Math.max(0, Math.min(1, (t - this.min) / e)), o = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${n})`, s = this.mixed && this._drag === void 0 ? this.marks.map((d) => p`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], r = this.tickStep || this.step || 1, a = Math.floor(e / r + 1e-9) + 1, l = a >= 2 && a <= 40 ? Array.from({ length: a }, (d, h) => p`<i style="left:${(h * r / e * 100).toFixed(2)}%"></i>`) : [];
    return p`<div class="wrap">
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
        <div class="ticks" aria-hidden="true">${l}</div>
        ${s.length ? p`<div class="marks" aria-hidden="true">${s}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? p`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ki.styles = ht`
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
    :host([mixed]) input::-webkit-slider-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-progress {
      background: transparent;
    }
    .marks {
      position: absolute;
      left: 33px;
      right: 33px;
      top: 16px;
      height: 20px;
      pointer-events: none;
    }
    .marks i {
      position: absolute;
      top: 0;
      margin-left: -1.5px;
      width: 3px;
      height: 20px;
      border-radius: 1.5px;
      background: var(--hdk-accent, #0a84ff);
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
let q = ki;
Q([
  w({ type: Number })
], q.prototype, "min");
Q([
  w({ type: Number })
], q.prototype, "max");
Q([
  w({ type: Number })
], q.prototype, "step");
Q([
  w({ type: Number })
], q.prototype, "tickStep");
Q([
  w({ type: Number })
], q.prototype, "value");
Q([
  w()
], q.prototype, "label");
Q([
  w()
], q.prototype, "valueText");
Q([
  w()
], q.prototype, "minLabel");
Q([
  w()
], q.prototype, "maxLabel");
Q([
  w({ type: Boolean })
], q.prototype, "disabled");
Q([
  w({ type: Boolean, reflect: !0 })
], q.prototype, "mixed");
Q([
  w({ attribute: !1 })
], q.prototype, "marks");
Q([
  P()
], q.prototype, "_drag");
var Zo = Object.defineProperty, ft = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Zo(t, e, o), o;
};
const _i = class _i extends et {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ci(this), this.gesture = new _e(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return p`<button
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
      ${this.hints.hint ? p`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
_i.styles = [
  pi,
  ht`
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
let it = _i;
ft([
  w({ type: Boolean })
], it.prototype, "checked");
ft([
  w({ type: Boolean })
], it.prototype, "disabled");
ft([
  w()
], it.prototype, "label");
ft([
  w({ type: Boolean })
], it.prototype, "guarded");
ft([
  w({ type: Number })
], it.prototype, "holdMs");
ft([
  w({ type: Number })
], it.prototype, "doubleTapMs");
ft([
  w({ type: Number })
], it.prototype, "hintSeconds");
ft([
  w()
], it.prototype, "hintPlacement");
ft([
  w()
], it.prototype, "hint");
var Jo = Object.defineProperty, Y = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Jo(t, e, o), o;
};
const Si = class Si extends et {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ci(this), this.gesture = new _e(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    ai(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : p`<span class="count">${this.count}</span>`;
    return p`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : u}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : u}
        aria-haspopup=${this.kind === "open" ? "dialog" : u}
        aria-label=${this.label || u}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(n) => this.protected && n.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? p`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : p`<span class="text">${ke(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? p`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, e] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.protected || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.protected) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const e = this.gesture.tap("tile", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
Si.styles = [
  pi,
  li,
  ht`
      :host {
        position: relative;
        display: block;
        min-width: 0;
      }
      button {
        position: relative;
        /* The name starts at the top in every tile of a row, whatever the height of the tallest one. */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 60px;
        margin: 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 12px;
        background: var(--hdk-tile, #1c1c1e);
        color: var(--hdk-tile-text, #fff);
        font: inherit;
        text-align: start;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      :host([state="off"]) button {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--hdk-tile-border, rgb(84 84 88 / 65%));
      }
      :host([state="on"]) button {
        background: var(--hdk-tile-on, #0a6ed1);
        color: var(--hdk-tile-on-text, #fff);
        box-shadow: inset 0 0 0 1.5px var(--hdk-tile-on-border, transparent);
      }
      :host([state="mixed"]) button {
        background: var(--hdk-tile-mixed, #17395d);
      }
      .name {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        overflow-wrap: anywhere;
      }
      .name > span:first-child {
        flex: 1;
        min-width: 0;
      }
      .chevron {
        flex: none;
        font-weight: 400;
        color: var(--hdk-secondary, #98989f);
      }
      .text {
        display: block;
        font-size: 13px;
        line-height: 18px;
        color: var(--hdk-secondary, #98989f);
      }
      :host([state="on"]) .text,
      :host([state="on"]) .chevron {
        color: var(--hdk-tile-on-sub, #fff);
      }
      :host([centered]) button {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 52px;
        text-align: center;
      }
      :host([centered]) .name {
        font-size: 17px;
        line-height: 22px;
      }
      :host([centered]) .name > span:first-child {
        flex: none;
      }
      .count {
        flex: none;
        display: grid;
        place-items: center;
        min-width: 22px;
        height: 22px;
        box-sizing: border-box;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--hdk-tile-badge, rgb(255 255 255 / 16%));
        font-size: 13px;
        line-height: 18px;
        font-weight: 600;
      }
      button:active:not(:disabled),
      button.nudge {
        filter: brightness(1.18);
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 2px;
      }
      .hint.start {
        right: auto;
        left: 0;
      }
      .hint.start i {
        left: 25px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    `
];
let B = Si;
Y([
  w()
], B.prototype, "name");
Y([
  w()
], B.prototype, "text");
Y([
  w({ reflect: !0 })
], B.prototype, "state");
Y([
  w()
], B.prototype, "kind");
Y([
  w({ type: Number })
], B.prototype, "count");
Y([
  w({ type: Boolean, reflect: !0 })
], B.prototype, "centered");
Y([
  w({ type: Boolean })
], B.prototype, "disabled");
Y([
  w({ type: Boolean })
], B.prototype, "pressed");
Y([
  w()
], B.prototype, "label");
Y([
  w({ type: Boolean })
], B.prototype, "guarded");
Y([
  w({ type: Number })
], B.prototype, "holdMs");
Y([
  w({ type: Number })
], B.prototype, "doubleTapMs");
Y([
  w({ type: Number })
], B.prototype, "hintSeconds");
Y([
  w()
], B.prototype, "hint");
Y([
  w()
], B.prototype, "hintAlign");
function Qo(i) {
  const t = [
    [`${i}-switch`, it],
    [`${i}-segmented`, V],
    [`${i}-slider`, q],
    [`${i}-ring`, pt],
    [`${i}-tile`, B],
    [`${i}-sheet`, ut]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const pe = 60, Be = 142, Gi = 11, ee = 3, ts = 0.8, Xi = 2, es = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", is = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", ns = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function os(i, t) {
  if (i === void 0 || t === void 0)
    return y`<rect
      x="0.75"
      y="0.75"
      width=${pe - 1.5}
      height=${Be - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = Be - ee - 1, n = e / Gi, o = n - ts, s = o - t / 100 * (o - Xi), r = ee + 1 + (100 - i) / 100 * e, a = Array.from({ length: Gi }, (l, d) => {
    const h = ee + 1 + d * n + n / 2, c = h <= r, m = c ? s : Xi;
    return y`<rect
      x="0"
      y=${(h - m / 2).toFixed(2)}
      width=${pe}
      height=${m.toFixed(2)}
      rx=${Math.min(1.5, m / 2).toFixed(2)}
      style=${c ? es : is}
    ></rect>`;
  });
  return y`<rect
      class="rail"
      x="0"
      y="0"
      width=${pe}
      height=${ee}
      rx="1.5"
      style=${ns}
    ></rect>${a}`;
}
const ss = ["cs", "en", "sv"];
class Tn extends Error {
}
function T(i) {
  throw new Tn(i);
}
function rs(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Tn ? new Error(`${i}: ${e.message}`) : e;
  }
}
function Ct(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function gt(i, t) {
  return i == null ? {} : (Ct(i) || T(`"${t}" must be a mapping of keys.`), i);
}
function Et(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || T(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function as(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || T(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && T(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function Ve(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && T(`${t} must be a non-empty text.`), i.trim();
}
function be(i, t) {
  if (i != null) {
    if (typeof i == "string" && i.trim())
      return i.trim();
    if (Ct(i) && Object.keys(i).length > 0) {
      const e = Object.entries(i);
      if (e.every(([n, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof o == "string" && o.trim()))
        return Object.fromEntries(e.map(([n, o]) => [n, o.trim()]));
    }
    return T(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Se(i, t) {
  if (i === void 0 || typeof i == "string")
    return i;
  const e = t.toLowerCase();
  return i[e] ?? i[e.split("-")[0]] ?? i.en ?? Object.values(i)[0];
}
function Cn(i) {
  return i === void 0 ? [] : typeof i == "string" ? [i] : Object.values(i);
}
const Zi = ["auto", ...ss];
function ls(i) {
  const t = i ?? "auto";
  return Zi.includes(t) || T(`language must be one of ${Zi.join(", ")}.`), t;
}
const Oe = ["bedroom", "office", "kids", "living"], ze = "none", qe = ["open", "shade", "dark"], ds = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function hs(i) {
  return ds.has(i);
}
function Ji(i, t) {
  return t ? i?.states?.[t] : void 0;
}
const En = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function Le(i, t, e, n) {
  return i !== void 0 && t !== void 0 && Math.abs(i - e.position) <= n && Math.abs(t - e.tilt) <= n;
}
function Bt(i, t) {
  return t === "temperature" ? i.temperature_step : t === "co2" ? i.co2_step : i.pm25_step;
}
const v = {
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
}, ui = {
  off: v.off,
  cool: v.cool,
  wind_free: v.cool,
  dry: v.dry,
  fan: v.plan,
  heat: v.heat,
  auto: v.auto,
  unknown: v.off
}, cs = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function ps(i) {
  const t = cs[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function us(i) {
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
function Qi(i, t, e, n, o) {
  const { thresholds: s } = n, r = [
    [o.required.temperature, i.temperature],
    [o.required.humidity, i.humidity],
    ...n.hasCo2 ? [[o.required.co2, i.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, i.pm25]] : [],
    [o.required.houseMode, e ? { value: 1 } : void 0]
  ];
  for (const [b, f] of r) {
    if (f?.value === void 0)
      return { id: "noData", label: o.noData(b), color: v.label, kind: "unknown" };
    if (f.stale) {
      const M = f.ageMinutes === void 0 ? void 0 : On(f.ageMinutes);
      return { id: "noData", label: o.noData(b, M), color: v.label, kind: "unknown" };
    }
  }
  const a = i.temperature.value, l = i.humidity.value, d = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? i.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: v.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: v.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: v.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: v.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: v.warning, kind: "warning", cause: "humidity" };
  const c = t ? s.summer_min : s.winter_min, m = t ? s.summer_max : s.winter_max;
  return a > m ? { id: "warm", label: o.status.warm, color: v.warning, kind: "warning", cause: "temperature" } : a < c ? { id: "cold", label: o.status.cold, color: v.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: v.label, kind: "normal" };
}
function ct(i) {
  return hs(i) || i === "none";
}
function kt(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function An(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function fs(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.ventilationEntity), e(i.ventilationTimerEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((o) => e(o.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function ms(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function gs(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((o) => Object.hasOwn(t, o) && i[o] === t[o]);
}
function On(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function tn(i, t) {
  const e = (i ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function Pe(i) {
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
function en(i, t) {
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
function nn(i, t) {
  const e = Math.max(1, Math.round(i));
  return e % 60 === 0 ? t.period.hour(e / 60) : t.period.minute(e);
}
function zn(i, t) {
  return Se(i.label, t) ?? i.name;
}
function vs(i, t, e) {
  return Se(i.label, e) ?? t.cover.presetName[i.icon];
}
function on(i, t, e) {
  if (i.description !== void 0)
    return Se(i.description, e) ?? "";
  const n = En[i.icon];
  return i.label === void 0 && n.position === i.position && n.tilt === i.tilt ? t.cover.presetDescription[i.icon] : t.cover.position(Math.round(i.position), Math.round(i.tilt));
}
function bs(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
const ws = "input_select.house_mode", $s = 500, ys = 420, xs = 25, ks = {
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
}, _s = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Ss = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Ne = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Ms = qe.map((i) => ({ icon: i, ...En[i] })), sn = { winter: "Zima", summer: "Léto" }, rn = ["auto", "dark", "light"], an = 3, Ts = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Cs = [
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
], Es = ["climate", "overlay", "target", "intensity"], ln = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], As = ["name", "position", "tilt", "icon", "description"], Os = ["entity", "name"];
function Rt(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function W(i, t) {
  return as(i, t, { example: "sensor.loznice_teplota" });
}
function qt(i, t, e, n = {}) {
  Et(i, Object.keys(t), e);
  const o = { ...t };
  for (const [s, r] of Object.entries(i)) {
    if (r === null)
      continue;
    (typeof r != "number" || !Number.isFinite(r)) && T(`${e}.${s} must be a number.`);
    const a = n[s];
    if (a) {
      const [l, d, h] = a;
      (r < l || r > d || h && !Number.isInteger(r)) && T(`${e}.${s} must be ${h ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = r;
  }
  return o;
}
function Ln(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of e)
    (s ? i[n] >= i[o] : i[n] > i[o]) && T(`${t}: ${n} (${i[n]}) must be ${s ? "below" : "at most"} ${o} (${i[o]}).`);
  i.stale_minutes <= 0 && T(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && T(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function zs(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function We(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > an) && T(`${t} must be a list of 1 to ${an} presets.`), i.map((e, n) => {
    const o = `${t}[${n + 1}]`;
    Ct(e) || T(`${o} must have a position and a tilt.`), Et(e, As, o);
    const s = be(e.name, `${o}.name`), r = (c) => {
      const m = e[c];
      return (typeof m != "number" || !Number.isFinite(m) || m < 0 || m > 100) && T(`${o}.${c} must be a number from 0 to 100.`), m;
    }, a = r("position"), l = r("tilt");
    let d = zs(a, l);
    e.icon != null && (qe.includes(e.icon) || T(`${o}.icon must be one of ${qe.join(", ")}.`), d = e.icon);
    const h = be(e.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: h, position: a, tilt: l };
  });
}
function Ls(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && T(`${t}.window must not be an empty list.`);
  const o = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(e) ? `[${a + 1}]` : ""}`;
    if (Ct(r)) {
      Et(r, Os, l);
      const h = W(r.entity, `${l}.entity`);
      return h || T(`${l}.entity is required.`), { entity: h, name: be(r.name, `${l}.name`) };
    }
    const d = W(r, l);
    return d || T(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const r of o)
    s.has(r.entity) && T(`${t}.window lists ${r.entity} twice.`), s.add(r.entity);
  return o;
}
function dn(i, t) {
  return i === !1 ? { present: !1 } : { entity: W(i, t), present: !0 };
}
function Ps(i, t) {
  i.image != null && i.scene != null && T(`${t}: use either image or scene (older name), not both.`);
  const e = i.image != null ? "image" : "scene", n = i.image ?? i.scene;
  if (n == null) {
    const s = Cn(i.name).map((r) => Ts[Rt(r)]).find((r) => r !== void 0);
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && T(`${t}.${e} must be ${[...Oe, ze].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== ze) {
    if (Oe.includes(o))
      return { kind: "scene", scene: o };
    if (e === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    T(
      `${t}.${e} must be one of ${[...Oe, ze].join(", ")}${e === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Ns(i, t) {
  const e = Ve(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && T(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function Rs(i, t, e) {
  Ct(i) || T(`room ${t + 1} must be a mapping with at least a name.`);
  const n = Ct(i) && i.name != null ? be(i.name, `room ${t + 1} name`) : void 0, o = n === void 0 ? "" : Cn(n)[0];
  (!o || n === void 0) && T(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, r = i;
  for (const [m, b] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    m in r && T(`${s}: key "${m}" was renamed to "${b}".`);
  "windows" in r && T(`${s}: the key is "window" (one entity or a list of them), not "windows".`), Et(r, Cs, s);
  const a = gt(i.heating, `${s}.heating`);
  "heating" in a && T(`${s}: key "heating.heating" was renamed to "heating.intensity".`), Et(a, Es, `${s}.heating`);
  const l = i.heating == null ? void 0 : {
    climate: W(a.climate, `${s}.heating.climate`),
    overlay: W(a.overlay, `${s}.heating.overlay`),
    target: W(a.target, `${s}.heating.target`),
    intensity: W(a.intensity, `${s}.heating.intensity`)
  }, d = qt(gt(i.thresholds, `${s}.thresholds`), e.thresholds, `${s}.thresholds`);
  Ln(d, `${s}.thresholds`);
  const h = dn(i.carbon_dioxide, `${s}.carbon_dioxide`), c = dn(i.pm25, `${s}.pm25`);
  return {
    name: o,
    label: n,
    temperature: W(i.temperature, `${s}.temperature`),
    humidity: W(i.humidity, `${s}.humidity`),
    carbon_dioxide: h.entity,
    hasCo2: h.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: Ls(i, s),
    cover: W(i.cover, `${s}.cover`),
    presets: i.cover_presets == null ? e.presets : We(i.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: W(i.air_conditioner, `${s}.air_conditioner`),
    image: Ps(i, s),
    link: Ns(i.link, s)
  };
}
function Ds(i) {
  return rs("Klima Dashboard", () => Is(i));
}
function Is(i) {
  (!Ct(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && T("the configuration requires a non-empty rooms list.");
  const t = i.theme ?? "auto";
  rn.includes(t) || T(`theme must be one of ${rn.join(", ")}.`);
  const e = ls(i.language), n = W(i.house_mode_entity, "house_mode_entity") ?? ws, o = W(i.ventilation_entity, "ventilation_entity"), s = W(i.ventilation_timer_entity, "ventilation_timer_entity"), r = i.ventilation_co2_target ?? $s;
  (typeof r != "number" || !Number.isFinite(r) || r < 300 || r > 2e3) && T("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const a = i.ventilation_co2_full ?? ys;
  (typeof a != "number" || !Number.isFinite(a) || a < 300 || a > r) && T("ventilation_co2_full must be a number of ppm between 300 and ventilation_co2_target.");
  const l = i.ventilation_settle_minutes ?? xs;
  (typeof l != "number" || !Number.isInteger(l) || l < 1 || l > 180) && T("ventilation_settle_minutes must be a whole number of minutes between 1 and 180.");
  const d = i.send_delay_seconds ?? 2;
  (typeof d != "number" || !Number.isFinite(d) || d < 0 || d > 30) && T("send_delay_seconds must be a number of seconds between 0 and 30.");
  const h = gt(i.house_modes, "house_modes");
  Et(h, ["winter", "summer"], "house_modes");
  const c = {
    winter: Ve(h.winter, "house_modes.winter") ?? sn.winter,
    summer: Ve(h.summer, "house_modes.summer") ?? sn.summer
  };
  Rt(c.winter) === Rt(c.summer) && T("house_modes.winter and house_modes.summer must differ.");
  const m = i.outside == null ? void 0 : gt(i.outside, "outside");
  if (m) {
    Et(m, ln, "outside");
    for (const N of ln)
      W(m[N], `outside.${N}`);
  }
  const b = qt(gt(i.thresholds, "thresholds"), ks, "thresholds");
  Ln(b, "thresholds");
  const f = qt(gt(i.trends, "trends"), _s, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), M = qt(gt(i.history, "history"), Ss, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), k = { ...gt(i.covers, "covers") }, $ = k.presets;
  delete k.presets;
  const _ = k.script;
  delete k.script;
  const R = {
    ...qt(k, { tolerance: Ne.tolerance, stall_seconds: Ne.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Ne.script
  };
  _ != null && ((typeof _ != "string" || !/^script\.[a-z0-9_]+$/.test(_.trim())) && T("covers.script must be a script entity such as script.zaluzie_posun."), R.script = _.trim());
  const E = $ == null ? We(Ms, "covers.presets") : We($, "covers.presets"), O = i.rooms.map((N, H) => Rs(N, H, { thresholds: b, presets: E })), x = /* @__PURE__ */ new Set();
  for (const N of O)
    x.has(N.name) && T(`room name "${N.name}" is used twice; room names must be unique.`), x.add(N.name);
  return {
    theme: t,
    language: e,
    houseModeEntity: n,
    houseModes: c,
    ventilationEntity: o,
    ventilationTimerEntity: s,
    ventilationCo2Target: r,
    ventilationCo2Full: a,
    ventilationSettleMinutes: l,
    sendDelaySeconds: d,
    outside: m,
    thresholds: b,
    trends: f,
    history: M,
    covers: R,
    rooms: O
  };
}
const Pn = 5, Fs = 25;
function Re(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Nn(i, t, e) {
  const n = i?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const a = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return a === "manual" && e !== void 0 && e <= Pn ? "off" : a;
}
const At = 36e5;
function js(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function Hs(i, t) {
  const e = {};
  for (const [n, o] of Object.entries(i ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((r, a) => {
      const l = r.s ?? r.state, d = js(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((r, a) => r.time - a.time), e[n] = s;
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
  return Hs(o, e);
}
function Xt(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function Ye(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function Us(i, t, e, n) {
  const o = (e - t) / n, s = (i ?? []).filter((r) => Ye(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => Ye(Xt(s, t + (a + 1) * o))
  );
}
function ne(i, t, e, n = !1) {
  const o = [];
  for (const r of i ?? []) {
    const a = Ye(r.state);
    a !== void 0 && !(n && a === 0) && r.time <= e && o.push({ t: Math.max(r.time, t), v: a });
  }
  const s = o[o.length - 1];
  return s && s.t < e && o.push({ t: e, v: s.v }), o;
}
function Ot(i, t, e, n) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const a of i)
    for (const l of a ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((a, l) => a - l), r = [];
  for (let a = 0; a < s.length - 1; a += 1) {
    const l = n(i.map((h) => Xt(h, s[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === s[a] ? d.end = s[a + 1] : r.push({ start: s[a], end: s[a + 1], value: l });
  }
  return r;
}
function De(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of i)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), n = Math.max(n, a));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function Bs(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function oe(i, t = 5 * 6e4, e = 720) {
  if (i.length < 2)
    return i;
  const n = 6e4, o = i[0].t, s = i[i.length - 1].t, r = Math.max(2, Math.floor((s - o) / n) + 1), a = [];
  let l = 0;
  for (let f = 0; f < r; f += 1) {
    const M = f === r - 1 ? s : o + f * n;
    for (; l + 1 < i.length && i[l + 1].t <= M; )
      l += 1;
    a.push(i[l].v);
  }
  const d = Math.max(0, Math.floor(t / n / 2)), h = [0];
  for (const f of a)
    h.push(h[h.length - 1] + f);
  const c = Math.max(1, Math.ceil(r / e)), m = [];
  for (let f = 0; f < r - 1; f += c)
    m.push(f);
  return m.push(r - 1), m.map((f) => {
    const M = Math.max(0, f - d), k = Math.min(r - 1, f + d);
    return { t: f === r - 1 ? s : o + f * n, v: (h[k + 1] - h[M]) / (k - M + 1) };
  });
}
function Vs() {
  return p`
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
function qs(i) {
  const t = (o, s, r, a) => y`<rect x=${o} y=${s} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => y`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
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
  return p`
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
function Ws() {
  return p`
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
function Rn(i, t) {
  return y`${[0, 1, 2].map(
    (e) => y`<path
      d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${e < i ? v.warning : v.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : u}
    ></path>`
  )}`;
}
function Ke(i, t) {
  return p`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Rn(i, t)}
    </svg>
  `;
}
function Ge(i) {
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
function ue(i, t, e) {
  return p`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : u}
      aria-hidden="true"
    >
      ${Ge(i)}
    </svg>
  `;
}
function Dn() {
  return y`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function Ie(i, t) {
  return p`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${i}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : u}
      aria-hidden="true"
    >
      ${Dn()}
    </svg>
  `;
}
function Ys(i) {
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
  return p`
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
const Xe = " ", dt = 4, Ks = 44, lt = 6, ot = 180, vt = lt + ot, se = 10, In = vt + 10, fe = 14, hn = 14, Gs = 3, Fn = 14, Xs = 7;
function Zs(i, t, e) {
  if (t === "temperature") {
    const o = e ? ["climate", "heating"] : ["heating", "climate"];
    return i.windows ? [...o, "windows"] : o;
  }
  const n = [];
  return i.ventilation && n.push("ventilation"), i.windows && n.push("windows"), n;
}
const jn = (i) => i === 0 ? vt : In + i * fe, Js = (i = 0) => jn(Math.max(i, Gs)) + Fn + Xs, Fe = 12, Qs = [0, 0.24, 0.44, 0.68], cn = "history-under-temperature", zt = "history-plot", pn = "history-curve", Hn = {
  schedule: v.plan,
  manual: v.warning,
  off: v.closed
}, tr = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: v.warning,
  off: v.closed
}, X = (i) => `fill: ${i}`, Z = (i) => `stroke: ${i}`;
function je(i, t, e) {
  return Nn(t, i, e);
}
function re(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const fi = 0.05;
function er(i, t) {
  const e = i.filter((a) => Number.isFinite(a));
  let n = 19, o = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), o = Math.max(...e), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const a = (o - n) * fi;
    n -= a, o += a;
  }
  const s = o - n, r = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: r };
}
function ir(i, t, e) {
  const n = [], o = e / 1e3;
  for (let s = Math.ceil(i / e - o) * e; s <= t + o; s += e)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function nr(i, t, e, n, o) {
  const s = (A) => A ? i[A] : void 0, { startMs: r, endMs: a } = e, l = s(t.heating?.overlay), d = s(t.heating?.climate), h = oe(ne(s(t.temperature), r, a, !0)), c = oe(ne(s(t.humidity), r, a, !0)), m = Ot(
    [l, d, s(t.heating?.target)],
    r,
    a,
    ([A, S, U]) => je(A, S, re(U))
  ), b = Ot(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    r,
    a,
    ([A, S, U, D]) => {
      const G = je(A, S, re(D)), tt = An(re(U), t.thresholds);
      return G === void 0 || G === "off" || tt === 0 ? void 0 : String(tt);
    }
  ), f = Ot(
    [l, d, s(t.heating?.target)],
    r,
    a,
    ([A, S, U]) => {
      const D = re(U), G = je(A, S, D);
      if (!(D === void 0 || D <= Pn))
        return G === "schedule" || G === "manual" ? String(D) : void 0;
    }
  ), M = t.windows.length > 0 ? Ot(
    t.windows.map((A) => s(A.entity)),
    r,
    a,
    (A) => A.some((S) => S?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, k = o ? Ot([s(o)], r, a, ([A]) => A?.toLowerCase() === "on" ? "on" : void 0) : void 0, $ = oe(ne(s(t.carbon_dioxide), r, a, !0)), _ = oe(ne(s(t.pm25), r, a)), R = Ot([s(t.air_conditioner)], r, a, ([A]) => {
    const S = us(A);
    return S === "unknown" ? void 0 : S;
  }), E = h.map((A) => A.v), { min: O, max: x, step: N } = er(
    E.length > 0 ? E : f.map((A) => Number(A.value)),
    n.min_temperature_span
  ), H = c.map((A) => A.v);
  return {
    range: e,
    temperature: h,
    humidity: c,
    heating: m,
    intensity: b,
    target: f,
    climate: R,
    windows: M,
    co2: $,
    pm25: _,
    ventilation: k,
    limits: {
      co2: { warning: t.thresholds.co2_warning, critical: t.thresholds.co2_critical },
      pm25: { warning: t.thresholds.pm25_warning, critical: t.thresholds.pm25_critical }
    },
    comfort: {
      winter: { min: t.thresholds.winter_min, max: t.thresholds.winter_max },
      summer: { min: t.thresholds.summer_min, max: t.thresholds.summer_max }
    },
    tempMin: O,
    tempMax: x,
    tempStep: N,
    humidityMin: H.length > 0 ? Math.min(...H) : void 0,
    humidityMax: H.length > 0 ? Math.max(...H) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function or(i, t = "temperature") {
  return t === "co2" ? i.co2.length > 0 : t === "pm25" ? i.pm25.length > 0 : i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function sr(i, t) {
  const e = i.filter((l) => Number.isFinite(l)), n = 400, o = t === "pm25" ? 0 : Math.min(n, e.length > 0 ? Math.floor(Math.min(...e) / 100) * 100 : n), s = t === "co2" ? 400 : 10, r = e.length > 0 ? Math.max(...e) : o + s, a = Math.max(r, o + s);
  return { min: o, max: a + (a - o) * fi };
}
function rr(i, t, e, n) {
  const o = e === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - i) / Math.max(2, n), r = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], a = [];
  for (let l = Math.ceil(i / r - 1e-9) * r; l <= t + 1e-9; l += r)
    a.push(l);
  return a;
}
function _t(i) {
  return i - dt - Ks;
}
function ar(i, t, e) {
  return dt + (i - t.startMs) / (t.endMs - t.startMs) * _t(e);
}
function lr(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - dt) / _t(t)));
  return e.startMs + n * (e.endMs - e.startMs);
}
function Zt(i, t) {
  let e;
  for (const n of i) {
    if (n.t > t)
      break;
    e = n.v;
  }
  return e;
}
function ae(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
function dr(i, [t, e]) {
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
const un = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function mi(i) {
  const t = (i.endMs - i.startMs) / At;
  let e = un[0], n = 1 / 0;
  for (const o of un) {
    const s = t / o, a = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    a < n && (n = a, e = o);
  }
  return e;
}
function hr(i) {
  const t = mi(i), e = [], n = new Date(i.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < i.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= i.endMs; )
    n.getTime() >= i.startMs && e.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return e;
}
function cr(i, t) {
  return { x: Math.max(i, t + 9), anchor: "middle" };
}
function pr(i) {
  return i === "off" ? Hn.off : ui[i] ?? v.off;
}
function ur(i, t, e) {
  const n = new Date(i).getHours() === 0;
  return mi(t) >= 24 || n && t.endMs - t.startMs > 36 * At ? e.day(i) : e.hour(i).replace(/^(\d{1,2}):00$/, "$1");
}
function Un(i, t, e) {
  const { t: n } = e;
  if (t === void 0)
    return n.chart.now;
  const o = (a) => {
    const l = new Date(a);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(i.range.endMs) - o(t)) / (24 * At));
  return `${s === 0 ? "" : s === 1 ? `${n.chart.yesterday} ` : `${e.day(t)} `}${e.time(t)}`;
}
function Bn(i, t) {
  return i === void 0 ? v.label : i >= t.critical ? v.alertOnPopup : i >= t.warning ? v.warning : v.white;
}
function fr(i, t, e) {
  const { t: n } = e, o = t ?? i.range.endMs, s = Zt(i.temperature, o), r = Zt(i.humidity, o), a = ae(i.heating, o, i.range.endMs), l = Number(ae(i.intensity, o, i.range.endMs) ?? 0), d = ae(i.target, o, i.range.endMs), h = ae(i.climate, o, i.range.endMs), c = Un(i, t, e), m = a === void 0 ? "––" : `${n.heatingMode[a]}${a !== "off" && d !== void 0 ? ` · ${e.half(Number(d))} °C` : ""}`, b = h ? n.climateMode[h] : "––", f = h ? ui[h] : v.off;
  return p`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : p`${e.one(s)}<span class="readout-unit">${Xe}°C</span>`}</span
          >
          ${r === void 0 ? u : p`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${n.required.humidity} </span>${e.percent(Math.round(r))}</span
              >`}
        </span>
        <span class="readout-time">${c}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${a === "off" ? v.off : a ? Hn[a] : v.label}`}>
          <span class="readout-icon">${Ke(a && a !== "off" ? l : 0, a === void 0)}</span>
          ${n.system.heating} ${ke(m)}
        </span>
        <span class="readout-system" style=${`color: ${f}`}>
          <span class="readout-icon">${ue(h ?? "off", f, h === void 0)}</span>
          ${n.system.climate} ${b}
        </span>
      </div>
    </div>
  `;
}
function mr(i, t, e, n, o) {
  const s = e ?? i.range.endMs, r = e === void 0 && o !== void 0, a = r ? o.value : Zt(i[t], s), l = t === "co2" && i.pm25.length > 0 ? r && o.secondary ? o.secondary.value : Zt(i.pm25, s) : void 0, d = r && o.secondary?.stale === !0, h = i.limits[t], c = t === "co2" ? "ppm" : "µg/m³";
  return p`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${r && o.stale ? v.label : Bn(a, h)}`}
            >${a === void 0 ? "––" : p`${n.whole(a)}<span class="readout-unit">${Xe}${c}</span>`}</span
          >
          ${t === "co2" && i.pm25.length > 0 ? p`<span class="readout-hum pm25" style=${d ? `color: ${v.label}` : u}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : p`${n.whole(l)}${Xe}µg/m³`}</span
              >` : u}
        </span>
        <span class="readout-time">${Un(i, e, n)}</span>
      </div>
    </div>
  `;
}
function gr(i, t, e, n, o, s = !1, r) {
  const { range: a } = i, l = t === "temperature" ? void 0 : t, d = (g) => ar(g, a, e), h = l ? i[l] : i.temperature, c = l ? i.limits[l] : void 0, m = l ? sr(h.map((g) => g.v), l) : { min: i.tempMin, max: i.tempMax }, b = h.length > 0 ? Math.max(...h.map((g) => g.v)) : -1 / 0, f = (g) => vt - (g - m.min) / (m.max - m.min) * ot, M = (i.humidityMin ?? 0) - 3, k = Math.max((i.humidityMax ?? 100) + 3, M + 12), $ = (g) => vt - (g - M) / (k - M) * ot, _ = dt + _t(e), R = (g, C) => g.map((L, F) => `${F === 0 ? "M" : "L"}${d(L.t).toFixed(1)} ${C(L.v).toFixed(1)}`).join(" "), E = R(h, f), O = h[0], x = h[h.length - 1], N = O && x ? `${E} L${d(x.t).toFixed(1)} ${vt} L${d(O.t).toFixed(1)} ${vt} Z` : "";
  let H = "";
  l || i.target.forEach((g, C) => {
    const L = f(Number(g.value)).toFixed(1), F = i.target[C - 1];
    H += F && F.end === g.start ? ` L${d(g.start).toFixed(1)} ${L}` : ` M${d(g.start).toFixed(1)} ${L}`, H += ` L${d(g.end).toFixed(1)} ${L}`;
  });
  const A = _t(e) / Math.max(1, (a.endMs - a.startMs) / At / mi(a)), S = Math.max(2, Math.round(ot / A)), U = (m.max - m.min) / S, D = [0.5, 1, 2, 5, 10].find((g) => g >= U * 0.8) ?? 10, G = l ? rr(m.min, m.max, l, S) : ir(m.min, m.max, D), tt = (g) => l ? o.whole(g) : `${o.tick(g)}°`, rt = c ? [
    { value: c.warning, color: v.warning },
    { value: c.critical, color: v.alertOnPopup }
  ].filter((g) => g.value > m.min && g.value <= b) : [], mt = (g) => Math.min(1, Math.max(0, (f(g) - lt) / ot)), z = [];
  if (c && rt.length > 0) {
    const g = rt.some((F) => F.value === c.critical), C = mt(c.critical), L = mt(c.warning);
    g && z.push([0, v.alertOnPopup], [C, v.alertOnPopup]), z.push([g ? C : 0, v.warning], [L, v.warning], [L, v.white], [1, v.white]);
  }
  const at = s ? i.comfort.summer : i.comfort.winter;
  if (!l) {
    const g = mt(at.max), C = mt(at.min);
    z.push([0, v.warning], [g, v.warning], [g, v.white], [C, v.white], [C, v.sky], [1, v.sky]);
  }
  const $t = (g) => c ? Bn(g, c) : g > at.max ? v.warning : g < at.min ? v.sky : v.white, Ti = (g, C, L) => g.map((F) => {
    const nt = d(F.start);
    return y`<rect x=${nt.toFixed(1)} y=${C} width=${Math.max(d(F.end) - nt, 0.8).toFixed(1)}
        height=${se} rx="2" style=${X(L(F.value))}></rect>`;
  }), Me = Zs(i, t, s), Te = jn(Me.length), Wn = Te + Fn, Ci = Js(Me.length), Yn = (g) => g === "heating" ? y`${Rn(3, !1)}` : g === "climate" ? y`<g style=${Z(v.off)}>${Ge("off")}</g>` : g === "ventilation" ? y`<g style=${Z(v.fresh)}>${Ge("fan")}</g>` : y`<g style=${Z("var(--kd-sky)")}>${Dn()}</g>`, Ei = (g, C, L, F, nt) => g.map((Pi) => {
    const Ni = d(Pi.start);
    return y`<rect class=${F} x=${Ni.toFixed(1)} y=${C} width=${Math.max(d(Pi.end) - Ni, nt).toFixed(1)}
        height=${se} rx="2" style=${X(L)}></rect>`;
  }), Kn = (g, C) => g === "heating" ? y`${Ti(i.heating, C, (L) => tr[L] ?? v.off)}` : g === "climate" ? y`${Ti(i.climate, C, (L) => pr(L))}` : g === "ventilation" ? y`${Ei(i.ventilation ?? [], C, v.fresh, "ventilation-on", 1.5)}` : y`${Ei(i.windows ?? [], C, "var(--kd-sky)", "window-open", 1.5)}`, Qt = n === void 0 ? void 0 : d(n), Ce = n === void 0 ? void 0 : Zt(h, n), Gn = dr(a, i.night), Ai = (g, C, L, F) => (g ?? []).map(
    (nt) => y`<rect class=${L} x=${d(nt.start).toFixed(1)} y=${lt}
        width=${Math.max(d(nt.end) - d(nt.start), 2).toFixed(1)} height=${ot}
        style=${`${X(C)}; opacity: var(${F})`}></rect>`
  ), Oi = (g) => $t(g), Xn = Math.max(...i.pm25.map((g) => g.v), 0), Zn = Math.max(Xn * (1 + fi), i.limits.pm25.critical), Jn = (g) => vt - g / Zn * ot, zi = l === "co2" && i.pm25.length > 0 ? R(i.pm25, Jn) : "", Qn = (g) => [...g].reduce((C, L) => C + (/\d/.test(L) ? 6.7 : 3.6), 0), Ht = hr(a).map((g) => {
    const C = ur(g, a, o), L = cr(d(g), dt), F = Qn(C), nt = L.x - F / 2;
    return { x: d(g), text: C, anchored: L, left: nt, right: nt + F, show: !1 };
  });
  let Li = 1 / 0;
  for (let g = Ht.length - 1; g >= 0; g--)
    Ht[g].right <= Li + 2 && (Ht[g].show = !0, Li = Ht[g].left);
  return p`
    ${l ? mr(i, l, n, o, r) : fr(i, n, o)}
    <svg
      class="chart"
      viewBox="0 0 ${e} ${Ci}"
      width=${e}
      height=${Ci}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${cn}><path d=${N}></path></clipPath>
        <clipPath id=${zt}>
          <rect x=${dt} y=${lt} width=${_t(e)} height=${ot} rx="8"></rect>
        </clipPath>
        ${z.length > 0 ? y`<linearGradient id=${pn} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${lt} y2=${vt}>
              ${z.map(
    ([g, C]) => y`<stop offset=${`${(g * 100).toFixed(2)}%`} style=${`stop-color: ${C}`}></stop>`
  )}
            </linearGradient>` : u}
      </defs>
      <rect x=${dt} y=${lt} width=${_t(e)} height=${ot} rx="8" style=${X("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${zt})`}>
        ${Gn.map(
    ([g, C]) => y`<rect class="night" x=${d(g).toFixed(1)} y=${lt} width=${(d(C) - d(g)).toFixed(1)}
            height=${ot} style=${X("var(--kd-night)")}></rect>`
  )}
        ${l ? Ai(i.windows, "var(--kd-sky)", "window-band", "--kd-band-window") : u}
        ${l ? Ai(i.ventilation, v.fresh, "ventilation-band", "--kd-band-ventilation") : u}
      </g>
      ${G.map((g) => {
    const C = f(g), L = rt.some((F) => Math.abs(f(F.value) - C) < 14);
    return y`<line x1=${dt} x2=${_} y1=${C.toFixed(1)} y2=${C.toFixed(1)}
            style=${Z("var(--kd-grid)")} stroke-width="1"></line>
          ${L ? u : y`<text x=${_ + 6} y=${(C + 4).toFixed(1)} style=${X(v.label)} font-size=${Fe}>${tt(g)}</text>`}`;
  })}
      ${rt.map(
    (g) => y`<line class="limit-line" x1=${dt} x2=${_} y1=${f(g.value).toFixed(1)} y2=${f(g.value).toFixed(1)}
            style=${Z(g.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${_ + 6} y=${(f(g.value) + 4).toFixed(1)} style=${X(g.color)} font-size=${Fe}
            font-weight="600">${tt(g.value)}</text>`
  )}
      <g clip-path=${`url(#${zt})`}>
        ${N ? y`<path d=${N} style=${X("var(--kd-area)")}></path>` : u}
      </g>
      ${l ? u : y`<g clip-path=${`url(#${cn})`}>
        ${i.intensity.map(
    (g) => y`<rect x=${d(g.start).toFixed(1)} y=${lt}
            width=${Math.max(d(g.end) - d(g.start), 0.8).toFixed(1)} height=${ot}
            style=${X(v.warning)} opacity=${Qs[Number(g.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${zi ? y`<path class="pm25-line" d=${zi} fill="none" style=${Z(v.pm25)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${zt})`}></path>` : u}
      ${!l && i.humidity.length > 0 ? y`<path d=${R(i.humidity, $)} fill="none" style=${Z(v.humidityLine)}
            stroke-width="1.25" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.65"></path>` : u}
      ${H ? y`<path d=${H} fill="none" style=${Z(v.plan)} stroke-width="1"
            stroke-dasharray="3 3" opacity="0.45" clip-path=${`url(#${zt})`}></path>` : u}
      ${E ? y`<path class="temperature-curve" d=${E} fill="none"
            style=${Z(z.length > 0 ? `url(#${pn})` : v.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${zt})`}></path>` : u}
      ${x && n === void 0 ? y`<circle class="end-dot" cx=${d(x.t).toFixed(1)} cy=${f(x.v).toFixed(1)} r="4"
            style=${`${X(Oi(x.v))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : u}

      ${Me.map((g, C) => {
    const L = In + C * fe, F = L + (fe - se) / 2;
    return y`<g class=${`strip-row ${g}`}>
          <rect x=${dt} y=${F} width=${_t(e)} height=${se} rx="2" style=${X("var(--kd-fill)")}></rect>
          ${Kn(g, F)}
          <g class="strip-icon" transform=${`translate(${_ + 6} ${L + (fe - hn) / 2}) scale(${hn / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${Yn(g)}</g>
        </g>`;
  })}

      ${Ht.map(
    (g) => y`<line x1=${g.x.toFixed(1)} x2=${g.x.toFixed(1)} y1=${lt} y2=${Te}
            style=${Z("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${g.show ? y`<text class="tick" x=${g.anchored.x.toFixed(1)} y=${Wn} style=${X(v.label)} font-size=${Fe}
                text-anchor=${g.anchored.anchor}>${g.text}</text>` : u}`
  )}
      ${Qt === void 0 ? u : y`<line x1=${Qt.toFixed(1)} x2=${Qt.toFixed(1)} y1=${lt} y2=${Te}
              style=${Z(v.white)} stroke-width="1" opacity="0.7"></line>
            ${Ce === void 0 ? u : y`<circle cx=${Qt.toFixed(1)} cy=${f(Ce).toFixed(1)} r="4"
                  style=${`${X(Oi(Ce))}; ${Z("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const fn = At / 4;
function vr(i) {
  return `var(--kd-scene-${i})`;
}
function br(i) {
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
  return p`<svg
    viewBox="0 0 150 112"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >${t}</svg>`;
}
function wr(i) {
  let t, e;
  for (const n of i ?? []) {
    const o = n.state.toLowerCase();
    o === "on" && !t ? (t = { start: n.time }, e = t) : o === "off" && t && (t.end = n.time, t = void 0);
  }
  return e;
}
function $r(i, t, e) {
  return Xt(i, t)?.toLowerCase() === "on" ? !0 : (i ?? []).some((n) => n.time > t && n.time <= e && n.state.toLowerCase() === "on");
}
function le(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function mn(i, t) {
  return i === void 0 || t === void 0 || t < 0 || t > 100 || i <= -243.12 ? void 0 : 216.7 * (t / 100 * 6.112 * Math.exp(17.62 * i / (243.12 + i))) / (273.15 + i);
}
function yr(i, t, e, n) {
  const o = t <= e;
  return t <= n || i <= n && o ? { done: 1, closable: o } : i <= n ? { done: 0, closable: o } : { done: Math.min(0.99, Math.max(0, (i - t) / (i - n))), closable: o };
}
const xr = 168 * 36e5;
function Vn(i) {
  if (i == null) return;
  const t = typeof i == "number" ? i < 1e11 ? i * 1e3 : i : Date.parse(i);
  return Number.isFinite(t) ? t : void 0;
}
function kr(i) {
  let t;
  for (const e of i ?? []) {
    const n = e.s ?? e.state, o = Vn(e.lu ?? e.last_updated);
    n === void 0 || o === void 0 || n === "unavailable" || n === "unknown" || n === "" || (t === void 0 || t.state !== n) && (t = { state: n, start: o });
  }
  return t;
}
class _r {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const n = Ji(t, e);
    if (!t || !e || !n) return;
    const o = Vn(n.last_changed), s = `${n.state}|${n.last_changed ?? ""}`, r = this.known.get(e);
    return r?.key === s ? r.start === void 0 ? o : Math.min(r.start, o ?? r.start) : (this.hass = t, this.wanted.get(e) !== s && this.pending.get(e) !== s && (this.wanted.set(e, s), this.schedule()), o);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [s, r] of e) this.pending.set(s, r);
    const n = this.now();
    let o;
    try {
      o = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(n - xr).toISOString(),
        end_time: new Date(n).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      o = void 0;
    }
    for (const [s, r] of e) {
      if (this.pending.get(s) === r && this.pending.delete(s), this.wanted.has(s)) continue;
      const a = kr(o?.[s]), l = Ji(this.hass, s)?.state;
      this.known.set(s, { key: r, start: a && a.state === l ? a.start : void 0 });
    }
    this.onChange();
  }
}
function we(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function gi(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Sr(i, t) {
  return i === "auto" ? gi(we(t)) : i;
}
function Mr() {
  return gi(document.documentElement.lang || navigator.language || "");
}
const gn = /* @__PURE__ */ new WeakMap(), Tr = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Cr = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Er = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function He(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Ar(i, t, e) {
  const n = we(e).replace("_", "-"), o = n !== "" && gi(n) === t ? n : Tr[t], s = He(e, "number_format"), r = He(e, "time_format"), a = He(e, "date_format"), l = [t, o, s, r, a].join("|");
  let d = gn.get(i);
  d || (d = /* @__PURE__ */ new Map(), gn.set(i, d));
  let h = d.get(l);
  return h || (h = Lr(i[t], t, o, s, r, a), d.set(l, h)), h;
}
function Or(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function zr(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Lr(i, t, e, n, o, s) {
  const r = Or(e), a = n === "system" ? void 0 : n === "none" ? "en-US" : Er[n] ?? r, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), m = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), b = zr(o, r), f = b ? "h12" : "h23", M = new Intl.DateTimeFormat(r, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: f }), k = new Intl.DateTimeFormat(r, b ? { hour: "numeric", hourCycle: f } : { hour: "2-digit", minute: "2-digit", hourCycle: f }), $ = s === "system" ? void 0 : r, _ = new Intl.DateTimeFormat($, { day: "numeric", month: "numeric" }), R = (O) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return _.format(O);
    const x = _.formatToParts(O), N = x.find((D) => D.type === "literal")?.value ?? "/", H = x[x.length - 1], A = H?.type === "literal" ? H.value : "", S = x.find((D) => D.type === "day")?.value ?? "", U = x.find((D) => D.type === "month")?.value ?? "";
    return s === "DMY" ? `${S}${N}${U}${A}` : `${U}${N}${S}${A}`;
  }, E = Cr.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: i,
    one: (O) => d.format(O),
    two: (O) => h.format(O),
    half: (O) => c.format(Math.round(O * 2) / 2),
    tick: (O) => c.format(O),
    whole: (O) => m.format(O),
    percent: (O) => `${O}${E}%`,
    time: (O) => M.format(O),
    hour: (O) => k.format(O),
    day: R
  };
}
const xt = (i, t, e, n) => i === 1 ? t : i >= 2 && i <= 4 ? e : n, Pr = {
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
  climatePopup: {
    rooms: "Místnosti",
    temperature: "Cílová teplota",
    mode: "Režim",
    modes: { plan: "Plán", manual: "Ručně", boost: "Boost", off: "Vypnuto", cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto", sleep: "Spánek" },
    unavailable: "Nedostupné",
    now: (i) => `Teď ${i}`,
    heats: "topí",
    targets: (i) => `Cíl: ${i}`,
    mixedModes: (i) => `Různé režimy: ${i}`,
    firstChange: "První změna nastaví všechny vybrané stejně.",
    manualFor: "Ručně platí",
    manualForChoices: { next: "Do změny plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (i) => `Do ${i}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (i) => `Běží do ${i}, potom se vypne.`,
    fan: "Síla větru",
    swing: "Směr proudění",
    fanModes: { auto: "Auto", low: "Nízká", medium: "Střední", high: "Vysoká", turbo: "Turbo", quiet: "Tichá" },
    swingModes: { off: "Pevně", vertical: "Svisle", horizontal: "Vodorovně", both: "Vše" },
    detail: "Detail a historie",
    sending: "Odesílá se",
    failed: "Nepodařilo se"
  },
  sheet: {
    hvac: "Topení a klimatizace",
    close: "Zavřít",
    history: (i) => `Historie místnosti – ${i} h`,
    systems: "Systém",
    commandFailed: "Příkaz se nepodařilo odeslat.",
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
    rooms: (i) => `${i} ${xt(i, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (i) => `${i} ${xt(i, "okno otevřené", "okna otevřená", "oken otevřených")}`,
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
    minute: (i) => `${i} ${xt(i, "minuta", "minuty", "minut")}`,
    hour: (i) => `${i} ${xt(i, "hodina", "hodiny", "hodin")}`,
    day: (i) => `${i} ${xt(i, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (i) => `${i} ${xt(i, "minutu", "minuty", "minut")}`,
    hour: (i) => `${i} ${xt(i, "hodinu", "hodiny", "hodin")}`
  }
}, Vt = (i, t, e) => i === 1 ? t : e, Nr = {
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
  climatePopup: {
    rooms: "Rooms",
    temperature: "Target temperature",
    mode: "Mode",
    modes: { plan: "Schedule", manual: "Manual", boost: "Boost", off: "Off", cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto", sleep: "Sleep" },
    unavailable: "Unavailable",
    now: (i) => `Now ${i}`,
    heats: "heating",
    targets: (i) => `Target: ${i}`,
    mixedModes: (i) => `Different modes: ${i}`,
    firstChange: "The first change sets all selected rooms the same.",
    manualFor: "Manual holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (i) => `Until ${i}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (i) => `Runs until ${i}, then turns off.`,
    fan: "Fan speed",
    swing: "Air direction",
    fanModes: { auto: "Auto", low: "Low", medium: "Medium", high: "High", turbo: "Turbo", quiet: "Quiet" },
    swingModes: { off: "Fixed", vertical: "Vertical", horizontal: "Horizontal", both: "Both" },
    detail: "Details and history",
    sending: "Sending",
    failed: "It did not work"
  },
  sheet: {
    hvac: "Heating and air conditioning",
    close: "Close",
    history: (i) => `Room history – ${i} h`,
    systems: "System",
    commandFailed: "The command could not be sent.",
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
    rooms: (i) => `${i} ${Vt(i, "room", "rooms")}`,
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
    windowsOpen: (i) => `${i} ${Vt(i, "window", "windows")} open`,
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
    minute: (i) => `${i} ${Vt(i, "minute", "minutes")}`,
    hour: (i) => `${i} ${Vt(i, "hour", "hours")}`,
    day: (i) => `${i} ${Vt(i, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (i) => i === 1 ? "the last minute" : `the last ${i} minutes`,
    hour: (i) => i === 1 ? "the last hour" : `the last ${i} hours`
  }
}, de = (i, t, e) => i === 1 ? t : e, Rr = {
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
  climatePopup: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (i) => `Nu ${i}`,
    heats: "värmer",
    targets: (i) => `Mål: ${i}`,
    mixedModes: (i) => `Olika lägen: ${i}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (i) => `Till ${i}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (i) => `Går till ${i}, stängs sedan av.`,
    fan: "Fläkthastighet",
    swing: "Luftriktning",
    fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög", turbo: "Turbo", quiet: "Tyst" },
    swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" },
    detail: "Detaljer och historik",
    sending: "Skickar",
    failed: "Det gick inte"
  },
  sheet: {
    hvac: "Värme och luftkonditionering",
    close: "Stäng",
    history: (i) => `Rumshistorik – ${i} h`,
    systems: "System",
    commandFailed: "Kommandot kunde inte skickas.",
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
}, Dr = { cs: Pr, en: Nr, sv: Rr };
function Ze(i, t) {
  return Ar(Dr, i, t);
}
const Ir = ht`
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
      /* The chosen segment as in the segmented control of the kit (white, black label), one visual language. */
      --kd-segment-on: #ffffff;
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
      color: #000000;
      font-weight: 600;
    }


    /* The shared popup Topení / Klimatizace of the kit: the colours of its tiles, slider and segmented control, the same as
       in the card Dům (one visual language, DASHBOARD_UX_SYSTEM.md). */
    kd-climate {
      --hdk-accent: #0a84ff;
      --hdk-secondary: var(--kd-label);
      --hdk-tile: #2c2c2e;
      --hdk-tile-text: var(--kd-text);
      --hdk-tile-border: rgb(84 84 88 / 65%);
      --hdk-tile-on: #0a6ed1;
      --hdk-tile-on-text: #ffffff;
      --hdk-tile-on-sub: #ffffff;
      --hdk-tile-on-border: transparent;
      --hdk-track: #2c2c2e;
      --hdk-track-compact: #3a3a3c;
      --hdk-bar: rgb(255 255 255 / 14%);
      --hdk-tick: rgb(255 255 255 / 28%);
      --hdk-seg-thumb: #ffffff;
      --hdk-seg-text: #ebebf5;
      --hdk-seg-selected: #000000;
      color: var(--kd-text);
    }

    :host([data-theme="light"]) kd-climate {
      --hdk-accent: #0a6ed1;
      --hdk-tile: #f2f2f7;
      --hdk-tile-border: rgb(60 60 67 / 29%);
      --hdk-tile-on: #d8e8f8;
      --hdk-tile-on-text: #000000;
      --hdk-tile-on-sub: #0a5cb0;
      --hdk-tile-on-border: #0a6ed1;
      --hdk-track: #f2f2f7;
      --hdk-track-compact: #e5e5ea;
      --hdk-bar: rgb(60 60 67 / 18%);
      --hdk-tick: rgb(60 60 67 / 30%);
      --hdk-seg-text: #000000;
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

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
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

    .dim {
      opacity: 0.4;
    }

    .timer-foot {
      min-height: 36px;
      margin: 8px 4px 0;
      color: var(--kd-label);
      font-size: 13px;
      line-height: 18px;
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
`, Fr = " ";
function vn(i) {
  if (!i || ct(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function Je(i, t) {
  return i === void 0 ? "" : `· ${t.half(i)}${Fr}°C`;
}
function jr(i, t, e, n, o, s) {
  const r = s.t.heatingMode, a = i?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || ct(l), h = vn(e), c = Nn(a, l, h);
  if (c === "off")
    return { label: r.off, color: v.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || a === void 0 || ct(a))
    return { label: "––", color: v.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const m = An(vn(n), o);
  if (c === "schedule")
    return { label: r.schedule, color: v.plan, active: !0, extra: Je(h, s), unknown: !1, overlay: "schedule", waves: m };
  if (c === "manual") {
    const b = h === Fs ? "boost" : "manual";
    return { label: r.manual, color: v.warning, active: !0, extra: Je(h, s), unknown: !1, overlay: "manual", override: b, waves: m };
  }
  return { label: t?.state ?? "––", color: v.warning, active: !0, extra: "", unknown: !1, waves: m };
}
function vi(i, t) {
  let e = "unknown", n, o;
  if (i && !ct(i.state.toLowerCase())) {
    const r = i.state.toLowerCase(), a = String(i.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? e = "off" : r === "cool" ? e = a === "wind_free" ? "wind_free" : "cool" : r === "dry" ? e = "dry" : r === "fan_only" ? e = "fan" : r === "heat" ? e = "heat" : (r === "auto" || r === "heat_cool") && (e = "auto"), e !== "off" && e !== "unknown" && e !== "wind_free" && a !== "none" && a !== "" && (n = ps(a)), o = kt(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(e);
  return {
    mode: e,
    label: n ?? t.t.climateMode[e],
    color: ui[e],
    active: e !== "off" && e !== "unknown",
    extra: s ? Je(o, t) : "",
    unknown: e === "unknown"
  };
}
function Hr(i, t) {
  const e = i.unknown ? t.t.unknownState : i.label;
  return i.extra ? `${e} ${i.extra.replace(/^·\s*/, "")}` : e;
}
function he(i, t) {
  return i.length <= 2 ? i.join(", ") : t.t.summaryChips.rooms(i.length);
}
function $e(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function bi(i, t, e) {
  return jr(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds,
    e
  );
}
function qn(i, t, e, n) {
  const o = $e(i, t).length > 0, s = bi(i, t, n), r = i.air_conditioner ? vi(t(i.air_conditioner), n).mode : "unknown", a = !s.unknown && s.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", d = [];
  return o && a && d.push("window-heating"), o && l ? d.push("window-cooling") : l && e && d.push("cooling-cold"), d;
}
function Ur(i, t, e, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, r = [], a = [], l = [], d = [];
  let h = 0;
  const c = [], m = new Map(i.map(($) => [$.name, zn($, n.language)])), b = ($) => $.map((_) => m.get(_) ?? _);
  for (const $ of i) {
    for (const E of qn($, t, e.has($.name), n))
      s[E].push($.name);
    const _ = $e($, t).length;
    _ > 0 && r.push([$.name, _]);
    const R = bi($, t, n);
    R.override === "boost" ? l.push($.name) : R.override === "manual" && a.push($.name), R.waves > 0 && (d.push($.name), h = Math.max(h, R.waves)), $.air_conditioner && vi(t($.air_conditioner), n).active && c.push($.name);
  }
  const f = [], M = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [$, _] of M)
    s[$].length > 0 && f.push({
      kind: _,
      text: `${o.conflict[$]}: ${he(b(s[$]), n)}`,
      color: v.warning,
      spoken: `${o.conflictSpoken[$]}: ${b(s[$]).join(", ")}`
    });
  const k = r.reduce(($, [, _]) => $ + _, 0);
  return k > 0 && f.push({
    kind: "windows",
    text: o.windowsOpen(k),
    color: v.sky,
    spoken: `${o.windowsSpoken}: ${r.map(([$, _]) => _ > 1 ? `${m.get($) ?? $} (${_})` : m.get($) ?? $).join(", ")}`
  }), a.length > 0 && f.push({
    kind: "manual",
    text: `${o.manual}: ${he(b(a), n)}`,
    color: v.warning,
    spoken: `${o.manualSpoken}: ${b(a).join(", ")}`,
    opens: { system: "heating", rooms: a }
  }), l.length > 0 && f.push({
    kind: "boost",
    text: `${o.boost}: ${he(b(l), n)}`,
    color: v.warning,
    spoken: `${o.boostSpoken}: ${b(l).join(", ")}`,
    opens: { system: "heating", rooms: l }
  }), d.length > 0 && f.push({
    kind: "heating",
    text: o.heating(o.rooms(d.length)),
    color: v.warning,
    spoken: `${o.heatingSpoken}: ${b(d).join(", ")}`,
    waves: h,
    opens: { system: "heating", rooms: d }
  }), c.length > 0 && f.push({
    kind: "climate",
    text: `${o.climate}: ${he(b(c), n)}`,
    color: v.cool,
    spoken: `${o.climateSpoken}: ${b(c).join(", ")}`,
    opens: { system: "climate", rooms: c }
  }), f;
}
var Br = Object.defineProperty, j = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, r; s >= 0; s--)
    (r = i[s]) && (o = r(t, e, o) || o);
  return o && Br(t, e, o), o;
};
const Vr = 5 * 6e4, qr = 3e4, Lt = " ", Wr = 550, bn = 400, Yr = 700, Kr = "(orientation: landscape) and (max-height: 600px)", Gr = 1600, Xr = 5e3, Zr = 100, Jr = 0.6, Qr = 6, Mi = class Mi extends et {
  constructor() {
    super(...arguments), this._i18n = Ze("en"), this._starts = new _r(() => this.requestUpdate()), this._hvacSelected = [], this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new _e(() => ({ holdMs: Wr, doubleTapMs: bn })), this._movingWatch = /* @__PURE__ */ new Map(), this._joinedWidth = 0, this._fonts = 0, this.handleFonts = () => {
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
      this._scrubTime = lr((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
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
        const r = s + (t.key === "ArrowLeft" ? -fn : fn);
        this._scrubTime = r >= o ? void 0 : Math.max(n, r);
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
        if (n < Qr)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Zr || o > Jr) ? this.closeSheet() : this._dragY = 0;
    }, this.handleSheetKeydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.closeSheet();
        return;
      }
      if (t.key !== "Tab")
        return;
      const e = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), .chart-wrap', n = (d) => [...d.querySelectorAll("*")].flatMap((h) => [
        ...h.matches(e) ? [h] : [],
        ...h.shadowRoot ? n(h.shadowRoot) : []
      ]), o = this.renderRoot.querySelector(".sheet"), s = o ? n(o).filter((d) => d.getClientRects().length > 0) : [];
      if (s.length === 0)
        return;
      const r = t.composedPath(), a = s.findIndex((d) => r.includes(d)), l = t.shiftKey ? s[a <= 0 ? s.length - 1 : a - 1] : s[a === -1 || a === s.length - 1 ? 0 : a + 1];
      t.preventDefault(), l.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Ds(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, qr), this._joinedObserver = new ResizeObserver(() => {
      const t = Math.round(this.getBoundingClientRect().width);
      t !== this._joinedWidth && (this._joinedWidth = t, window.requestAnimationFrame(() => this.fitJoined()));
    }), this._joinedObserver.observe(this), document.fonts?.addEventListener("loadingdone", this.handleFonts), this.requestUpdate();
  }
  fitJoined() {
    ai(this.renderRoot, `${this._joinedWidth}|${this._fonts}`);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._joinedObserver?.disconnect(), this._joinedObserver = void 0, document.fonts?.removeEventListener("loadingdone", this.handleFonts), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize), this.flushClimate(), this._gesture.dispose();
    for (const t of [this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), window.clearTimeout(this._endTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const e = t.get("hass");
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || we(e) !== we(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => e?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e), this._i18n = Ze(Sr(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    }, Vr)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && this.renderRoot.querySelector(".sheet")?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => $e(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of fs(this._config)) {
      const n = t.states[e], o = this.hass.states[e];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !gs(n?.attributes, o?.attributes))
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
    const t = Rt(this.entityState(this._config.houseModeEntity) ?? ""), e = t === Rt(this._config.houseModes.summer), n = e || t === Rt(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), r = this.renderOutside(), a = Ur(
      this._config.rooms,
      (h) => this.getState(h),
      this.coldRooms(e, n, s),
      this._i18n
    ), l = this._config.ventilationEntity !== void 0, d = r !== u || a.length > 0 || l;
    return p`
      <ha-card>
        <div class="dashboard">
          ${d ? p`<header class="dashboard-header">
                ${l ? p`<div class="title-row">${this.renderVentilationButton()}</div>` : u}
                ${r} ${this.renderSummary(a)}
              </header>` : u}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (h, c) => this.renderRoom(h, c, e, n, o, s)
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
      const r = s.thresholds.stale_minutes;
      Qi(
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
      temperature: De(e((n) => n.temperature), Bt(t.trends, "temperature")),
      co2: De(e((n) => n.carbon_dioxide), Bt(t.trends, "co2")),
      pm25: De(e((n) => n.pm25), Bt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return u;
    const { t: e, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), r = this.numberState(t.maximum), a = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && r !== void 0 ? `${n(s)}–${n(r)}${Lt}°C` : void 0, h = [
      o === void 0 ? void 0 : `${n(o)}${Lt}°C`,
      d,
      a === void 0 ? void 0 : `☂${Lt}${this._i18n.percent(n(a))}`
    ].filter((f) => f !== void 0), c = this._config.thresholds;
    let m = "––", b = v.label;
    return l !== void 0 && (l >= c.pm25_critical ? (m = e.airLevel.poor, b = v.alert) : l >= c.pm25_warning ? (m = e.airLevel.moderate, b = v.warning) : m = e.airLevel.good), h.length === 0 && !t.pm25 ? u : p`<div class="outside">
      ${h.length > 0 ? p`<div>${Ue(h)}</div>` : u}
      ${t.pm25 ? p`<div>${e.outsideAir} <span style=${`color: ${b}`}>${m}</span></div>` : u}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? u : p`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((e) => {
      const n = this.summaryIcon(e), o = e.opens;
      return o && o.rooms.length > 0 ? p`<li class="chip" style=${`--chip-color: ${e.color}`}>
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
          </li>` : p`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  summaryIcon(t) {
    return t.kind === "windows" || t.kind === "conflict-window" ? Ie(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? ue("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? Ys(t.kind === "boost" ? "boost" : "heat") : Ke(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, o, s, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), d = this.reading(t.humidity, a, r), h = this.reading(t.carbon_dioxide, a, r), c = this.pm25Reading(t, r), { t: m } = this._i18n, b = Qi({ temperature: l, humidity: d, co2: h, pm25: c }, n, o, t, m), f = t.image, M = ($) => b.cause === $ ? `color: ${b.color}` : u, k = qn(t, ($) => this.getState($), b.id === "cold", this._i18n);
    return p`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
        style=${f?.kind === "scene" ? `--scene-tone: ${vr(f.scene)}` : u}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${b.kind === "unknown" ? `border: 1.5px solid ${v.off}` : `background: ${b.color}`}
          ></span>
          <span style=${`color: ${b.color}; font-weight: ${b.kind === "normal" ? 400 : 500}`}>
            ${ke(b.label)}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${M("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? u}
            aria-label=${m.temperatureLabel(
      this.roomLabel(t),
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${l.value === void 0 ? p`<span class="missing">––</span>` : p`${this._i18n.one(l.value)}<span class="temperature-unit">${Lt}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${M("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? u}
            aria-label=${m.humidityLabel(
      this.roomLabel(t),
      d.value === void 0 ? void 0 : this._i18n.percent(Math.round(d.value)),
      this.staleSpoken(d)
    )}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${d.value === void 0 ? p`<span class="missing">––</span>` : p`${this._i18n.percent(Math.round(d.value))}${this.staleMark(d)}`}
          </button>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, e, h, c, s)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, e, k, r)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : p`<div class="cover-panel" aria-hidden="true"></div>
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
    return e ? e.kind === "scene" ? p`<div class="scene" aria-hidden="true">${br(e.scene)}</div>` : p`<div class="scene photo" aria-hidden="true">
      <img src=${e.url} alt="" loading="lazy" decoding="async" />
    </div>` : u;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = t.link;
    if (!n)
      return p`<div class="room-title">${this.roomLabel(t)}</div>`;
    const o = `link-description-${e}`;
    return p`
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
    return nn((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return nn(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, e, n) {
    return t.value === void 0 || t.stale ? v.label : t.value >= n ? v.alert : t.value >= e ? v.warning : v.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, e, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return u;
    const { thresholds: r } = t, { t: a } = this._i18n, l = this._config.trends, d = (m, b, f, M, k, $) => {
      if (!b || !f)
        return;
      const _ = M.value === void 0 ? void 0 : tn(this._trends[f], Bt(l, $));
      return a.airSensor(
        m,
        M.value === void 0 ? void 0 : `${this._i18n.whole(M.value)} ${k}`,
        _ ? a.trendOver(a.trend[_], this.trendPeriod()) : void 0,
        this.staleSpoken(M)
      );
    }, h = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), c = `air-description-${e}`;
    return p`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${!t.carbon_dioxide && !t.pm25}
        aria-haspopup="dialog"
        aria-describedby=${c}
        @click=${(m) => this.openSheet("history", t, m, t.hasCo2 ? "co2" : "pm25")}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      p`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      s.co2
    ) : u}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      Vs(),
      o,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      s.pm25
    ) : u}
      </button>
      <span class="sr-only" id=${c}>${a.airDescription(this.roomLabel(t), h, this.historyPeriod())}</span>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, e, n, o, s, r, a, l) {
    const d = o.value !== void 0, h = this._i18n.whole(o.value ?? 0), c = this.airColor(o, r, a), m = v[t];
    return p`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? u}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? m : v.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? p`<span class="row-label" style=${`color: ${c}`}>${h}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : p`<span class="row-label" style=${`color: ${v.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(e, l, m, o.stale === !0) : u}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, n) {
    if (!t.temperature || e.value === void 0)
      return u;
    const o = this.renderSpark(t.temperature, n, v.peach, e.stale === !0);
    if (o === u)
      return u;
    const s = tn(this._trends[t.temperature], Bt(this._config.trends, "temperature")), { t: r } = this._i18n;
    return p`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${r.temperatureTrendLabel(
      this.roomLabel(t),
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
      return u;
    if (!this._trendsLoaded)
      return p`<span class="spark loading" aria-hidden="true">
        <span class="spark-plot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-dasharray="0.1 5" vector-effect="non-scaling-stroke"></line>
          </svg>
        </span>
      </span>`;
    const s = this._trends[t];
    if (!s || !e)
      return u;
    const r = Bs(s, e).map(
      (c, m) => c === void 0 ? void 0 : { x: m / Math.max(1, s.length - 1) * 100, y: (1 - c) * 100 }
    ).filter((c) => c !== void 0);
    if (r.length < 2)
      return u;
    const a = r.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" "), l = r[0], d = r[r.length - 1], h = `${a} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return p`<span class="spark ${o ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
      <span class="spark-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points=${h} fill="currentColor" fill-opacity="0.08"></polygon>
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
    const { t: o } = this._i18n, s = bi(t, (b) => this.getState(b), this._i18n), r = vi(this.getState(t.air_conditioner), this._i18n), a = (b) => this.renderSystemRow(Ke(s.unknown ? 0 : s.waves, s.unknown), s, b), l = (b) => this.renderSystemRow(ue(r.mode, r.color, r.unknown), r, b), d = e ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: r.active }), c = d.map((b) => `${o.system[b]} ${Hr(b === "heating" ? s : r, this._i18n)}`).join(", "), m = `hvac-description-${n}`;
    return p`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${m}
        @click=${(b) => h ? this.openSheet(h, t, b) : void 0}
      >
        ${e ? l(!0) : a(!0)}
        ${e ? a(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${m}>${o.hvacDescription(this.roomLabel(t), c, h)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  /** The system a tap on the HVAC lines opens: the one that runs (a ventilation started on the air conditioner in winter opens Klimatizace), otherwise the first by the house mode. */
  hvacTarget(t, e, n) {
    const o = (r) => r === "heating" ? !!t.heating?.climate : !!t.air_conditioner, s = e.filter((r) => o(r) && n?.[r]);
    return s.length === 1 ? s[0] : e.find(o);
  }
  /**
   * One Topení or Klimatizace line. The state label always stays whole; the target may run
   * into the faded start of the temperature trend, and only when even that is not enough the
   * whole target wraps onto a hidden second line (never cut inside a number).
   */
  renderSystemRow(t, e, n) {
    return p`
      <span
        class="system-row ${n && e.active ? "strong" : ""}"
        style=${`--row-color: ${e.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${e.label}</span>
            ${e.extra ? p`<span class="row-unit">${e.extra}</span>` : u}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (since the recorder shows it open; a restart does not count). */
  windowState(t, e) {
    const o = this.getState(t)?.state.toLowerCase();
    if (o === void 0 || ct(o))
      return { state: "unknown" };
    if (o !== "on")
      return { state: "closed" };
    const s = this._starts.of(this.hass, t);
    return { state: "open", minutesOpen: s === void 0 ? void 0 : Math.max(0, (e - s) / 6e4) };
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
    const { t: s } = this._i18n, r = t.windows.map((E) => ({ window: E, ...this.windowState(E.entity, o) })), a = r.filter((E) => E.state === "open"), l = a.length > 0, d = !l && (r.length === 0 || r.some((E) => E.state === "unknown")), h = t.windows.length > 1, c = l ? v.sky : v.label, m = l ? a.length > 1 ? s.window.openCount(a.length) : s.window.open : d ? "––" : s.window.closed, b = a.map((E) => E.minutesOpen).filter((E) => E !== void 0), f = b.length > 0 ? Math.max(...b) : void 0, M = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, k = `window-description-${e}`, $ = f === void 0 ? void 0 : en(f, s);
    let _;
    if (!h)
      _ = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", $);
    else if (l) {
      const E = a.map((O) => this.windowName(t, O.window)).join(", ");
      _ = a.length === 1 ? s.window.spokenOneOpen(E, $) : s.window.spokenManyOpen(E, $);
    } else
      _ = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const R = t.windows[0]?.entity;
    return p`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${c}`}
        ?disabled=${!R}
        aria-haspopup=${h ? "dialog" : u}
        aria-describedby=${k}
        @click=${(E) => h ? this.openSheet("windows", t, E) : this.showMoreInfo(R)}
      >
        <span class="row-main">
          <span class="row-icon">${Ie(d ? v.off : c, d)}</span>
          <span class="row-text">
            <span class="row-label">${m}</span>
            ${M ? p`<span class="conflict-dot" aria-hidden="true"></span>` : u}
            ${f === void 0 ? u : p`<span class="row-unit window-duration"
                  >${`${M ? "" : `${Lt}·${Lt}`}${Pe(f)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${k}>${s.window.description(this.roomLabel(t), _, M, h)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, e) {
    return Se(e.name, this._i18n.language) ?? this._i18n.t.window.defaultName(t.windows.indexOf(e) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, e) {
    const { t: n } = this._i18n;
    return p`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: r } = this.windowState(o.entity, e), a = s === "unknown", l = s === "open" ? v.sky : v.label;
      return p`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Ie(a ? v.off : l, a)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint window-state" style=${`color: ${l}`}>
                ${a ? p`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Ue([s === "open" ? n.window.open : n.window.closed, ...r === void 0 ? [] : [Pe(r)]])}
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
      return u;
    const { t: e } = this._i18n, n = t === "on", o = `${e.ventilation.title}. ${n ? e.summaryChips.ventilationSpoken : e.summaryChips.ventilationOffSpoken}`;
    return p`<button
      type="button"
      class="plain-button vent-trigger ${n ? "on" : "off"}"
      title=${o}
      aria-label=${o}
      aria-haspopup="dialog"
      @click=${(s) => this.openVentilationSheet(s)}
    >
      <span class="vent-icon" aria-hidden="true">${ue("fan", n ? v.fresh : v.label, !1)}</span>
      ${n ? p`<span>${e.ventilation.title}</span>` : u}
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
      const s = await ie(t, [e], o - 168 * At, o), r = wr(s[e]);
      if (n !== this._ventRequest)
        return;
      if (!r) {
        this._vent = { rooms: [] };
        return;
      }
      const a = this.ventilationRooms(), l = r.end ?? o, d = a.flatMap((k) => [
        k.carbon_dioxide,
        k.temperature,
        k.humidity,
        ...k.windows.map(($) => $.entity)
      ]), h = (this._config?.ventilationSettleMinutes ?? 25) * 6e4, c = r.end === void 0 ? void 0 : r.end + h, m = await ie(
        t,
        d.filter((k) => k !== void 0),
        r.start - 30 * 6e4,
        c === void 0 ? l : Math.min(o, Math.max(l, c))
      );
      if (n !== this._ventRequest)
        return;
      const b = c !== void 0 && c <= o ? c : void 0, f = (k) => ({
        before: k(r.start),
        after: r.end === void 0 ? void 0 : k(r.end),
        settled: b === void 0 ? void 0 : k(b)
      }), M = (k) => ($) => k === void 0 ? void 0 : le(Xt(m[k], $));
      this._vent = {
        session: r,
        rooms: a.map((k) => {
          const $ = k.carbon_dioxide === void 0 ? void 0 : f(M(k.carbon_dioxide));
          return {
            name: k.name,
            opened: k.windows.some((_) => $r(m[_.entity], r.start, l)),
            start: $?.before,
            end: le(Xt(m[k.carbon_dioxide ?? ""], l)),
            co2: $,
            temperature: k.temperature === void 0 ? void 0 : f(M(k.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity: k.temperature === void 0 || k.humidity === void 0 ? void 0 : f((_) => mn(M(k.temperature)(_), M(k.humidity)(_)))
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
    const { t: e } = this._i18n, n = e.ventilation, o = this._config, s = this.ventilationOn(), r = o?.ventilationCo2Target ?? 500, a = o?.ventilationCo2Full ?? 420, l = this._vent, d = l?.session, h = p`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${e.unknownValue}</span>`, c = this._sheetError, m = o?.ventilationTimerEntity, b = this.getState(m), f = b?.state.toLowerCase() === "active" ? Date.parse(String(b.attributes.finishes_at ?? "")) : Number.NaN, M = Number.isNaN(f) || f <= t ? void 0 : f, k = this._starts.of(this.hass, o?.ventilationEntity), $ = k === void 0 ? void 0 : Math.max(0, (t - k) / 6e4), _ = this.ventilationRooms().flatMap((S) => {
      const U = l?.rooms.find((z) => z.name === S.name), D = $e(S, (z) => this.getState(z)).length > 0;
      if (!D && !U?.opened)
        return [];
      const G = this.getState(S.carbon_dioxide), tt = s ? le(G?.state) : U?.end, rt = U?.start, mt = rt !== void 0 && tt !== void 0 ? yr(rt, tt, r, a) : void 0;
      return [{ room: S, startValue: rt, live: tt, steps: mt, open: D }];
    }), R = o?.ventilationSettleMinutes ?? 25, E = d?.end !== void 0 && t >= d.end + R * 6e4, O = s ? [n.before, e.chart.now] : [n.before, n.after, E ? n.settledShort(R) : e.chart.now], x = s ? O : [n.before, n.after, E ? n.settledAfter(R) : e.chart.now], N = (S) => {
      const U = l?.rooms.find((z) => z.name === S.room.name), D = S.steps === void 0 ? void 0 : Math.min(100, Math.floor(S.steps.done * 100)), G = [
        { label: n.quantity.co2, entity: S.room.carbon_dioxide, triple: U?.co2, live: le(this.getState(S.room.carbon_dioxide)?.state), digits: !1 },
        { label: n.quantity.temperature, entity: S.room.temperature, triple: U?.temperature, live: Re(this.getState(S.room.temperature)?.state), digits: !0 },
        {
          label: n.quantity.humidity,
          entity: S.room.temperature !== void 0 && S.room.humidity !== void 0 ? S.room.humidity : void 0,
          triple: U?.humidity,
          live: mn(Re(this.getState(S.room.temperature)?.state), Re(this.getState(S.room.humidity)?.state)),
          digits: !0
        }
      ].filter((z) => z.entity).map((z) => {
        const at = s ? [z.triple?.before, z.live] : [z.triple?.before, z.triple?.after, E ? z.triple?.settled : z.live];
        return {
          label: z.label,
          shown: at.map(($t) => $t === void 0 ? void 0 : z.digits ? this._i18n.one($t) : this._i18n.whole($t))
        };
      }), tt = S.steps?.closable === !0, rt = [
        s && D !== void 0 ? `${n.done} ${this._i18n.percent(D)}${tt ? `, ${n.closable}` : ""}` : void 0,
        ...G.map((z) => n.lineSpoken(z.label, z.shown.map((at, $t) => `${x[$t]} ${at ?? e.unknownValue}`).join(", ")))
      ].filter((z) => z !== void 0).join(". "), mt = S.open ? tt ? v.fresh : v.warning : v.label;
      return p`<div class="vent-room ${s ? "with-ring" : ""}" role="group" aria-label=${n.roomSpoken(this.roomLabel(S.room), rt)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(S.room)}${s && !S.open ? p`<span class="vent-note">${n.windowClosed}</span>` : u}
          </div>
          ${G.map(
        (z) => p`<div class="vent-line">
              <span class="vent-q">${z.label}</span>
              ${z.shown.map((at) => p`<span class="vent-num">${at ?? p`<span class="no-data">––</span>`}</span>`)}
            </div>`
      )}
        </div>
        ${s ? p`<kd-ring
              aria-hidden="true"
              fraction=${(D ?? 0) / 100}
              size="40"
              stroke="6"
              num=${D === void 0 ? "––" : String(D)}
              style=${`--hdk-ring-fill: ${D === void 0 ? v.label : mt}; grid-row: 2 / span ${G.length}`}
            ></kd-ring>` : u}
      </div>`;
    }, H = _.length === 0 ? u : p`<div class="vent-table" role="group" aria-label=${n.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${O.map((S) => p`<span class="vent-num">${S}</span>`)}
              ${s ? p`<span class="vent-num ring-head">↓ ${this._i18n.whole(a)}<span class="ring-unit"> ppm</span></span>` : u}
            </div>
            ${_.map(N)}
          </div>`;
    let A = u;
    return s ? A = p`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${n.running}
              ${$ === void 0 ? h : p`<span aria-hidden="true">${Pe($)}</span
                    ><span class="sr-only">${en($, e)}</span>`}
            </span>
          </span>
          ${m === void 0 ? u : p`<span class="list-value vent-ends">${n.endsBy} ${M === void 0 ? h : this._i18n.time(M)}</span>`}
        </div>` : d && (A = p`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${n.last}</span></span>
          <span class="list-value">${new Date(d.start).toDateString() === new Date(t).toDateString() ? u : `${this._i18n.day(d.start)} `}${this._i18n.time(d.start)}${d.end === void 0 ? u : p`–${this._i18n.time(d.end)}`}</span>
        </div>`), p`
      ${!s && !d ? u : p`<div class="static-list" role="group" aria-label=${n.title}>${A}${H}</div>`}
      ${!s && !d && l !== void 0 ? p`<p class="timer-foot">${n.never}</p>` : u}
      ${s ? p`<button
              type="button"
              class="plain-button vent-end ${c ? "error" : ""}"
              ?disabled=${this._ventilationEnding}
              aria-busy=${this._ventilationEnding ? "true" : "false"}
              @click=${() => {
      this.endVentilation();
    }}
            >
              ${c ?? (this._ventilationEnding ? n.ending : n.end)}
            </button>
            ${c ? p`<span class="sr-only" role="alert">${c}</span>` : u}` : u}
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
    const n = this.getState(e), o = n?.state.toLowerCase(), s = o !== void 0 && !ct(o), r = s ? kt(n?.attributes.current_position) : void 0, a = s ? kt(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, d = o === "opening" || o === "closing", { t: h } = this._i18n, c = l ? h.cover.position(Math.round(r), Math.round(a)) : h.cover.unknown;
    return p`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${h.cover.label(this.roomLabel(t), c, d)}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${pe} ${Be}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${os(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${h.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((m) => this.renderPreset(t, m, r, a, s))}
      </div>
    `;
  }
  renderPreset(t, e, n, o, s) {
    const r = this._moving[t.name], a = r === e.id, l = r === void 0 && Le(n, o, e, this.tolerance()), d = `${t.name}|${e.id}`, { t: h } = this._i18n, c = vs(e, h, this._i18n.language), m = this._hint?.key === d && this._hint.error === !0;
    return p`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${a ? "pending" : ""} ${m ? "failed" : ""}"
        title=${c}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : u}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${m && this._hint?.spoken ? `${h.cover.preset(this.roomLabel(t), c, on(e, h, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : h.cover.preset(this.roomLabel(t), c, on(e, h, this._i18n.language), s)}
        @pointerdown=${(b) => this.pressStart(b, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(b) => b.preventDefault()}
        @click=${(b) => {
      b.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(d));
    }}
      >
        ${qs(e.icon)}
        ${this._hint?.key !== d ? u : m ? p`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : p`<span class="preset-hint" role="status">${this._hint.text}</span>`}
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
      }, bn);
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
    }, o ? Xr : Gr);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || ct(n)) {
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
      }, Yr);
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
    if (Le(
      kt(o?.attributes.current_position),
      kt(o?.attributes.current_tilt_position),
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
      if (r === void 0 || ct(r) || Le(
        kt(s?.attributes.current_position),
        kt(s?.attributes.current_tilt_position),
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
      return u;
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
    return p`
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
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : u}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          tabindex="-1"
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
                ${e ? p`<div class="sheet-sub">${e}</div>` : u}
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
  /** Title of the Topení / Klimatizace popup: the system, or both when the switch under it chooses one. */
  hvacTitle(t) {
    const e = this.sheetRooms();
    return { title: e.some((o) => o.heating?.climate) && e.some((o) => o.air_conditioner) ? this._i18n.t.sheet.hvac : this._i18n.t.system[t] };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, e, n) {
    const o = this.sheetRooms(), s = o.filter((f) => f.heating?.climate), r = o.filter((f) => f.air_conditioner), a = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && r.length > 0, { t: d } = this._i18n, h = e === "heating" ? "heating" : "cooling", c = (this._config?.rooms ?? []).filter((f) => this.hvacEntity(f, e)), m = p`<kd-climate
      .hass=${this.hass}
      .i18n=${this._i18n}
      .texts=${d.climatePopup}
      .system=${h}
      .rooms=${c.map((f) => ({ name: this.roomLabel(f), entity: this.hvacEntity(f, e) }))}
      .selected=${this._hvacSelected}
      .delayMs=${(this._config?.sendDelaySeconds ?? 2) * 1e3}
      @hdk-select-rooms=${(f) => this._hvacSelected = f.detail.selected}
      @hdk-error=${(f) => this._sheetError = f.detail.message}
      @hdk-more-info=${async (f) => {
      await this.flushClimate(), this.closeSheet(!1), this.showMoreInfo(f.detail.entityId);
    }}
    ></kd-climate>`, b = l ? p`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(f) => this.segmentKeydown(f, a, e)}
        >
          ${a.map(
      (f) => p`<button
              type="button"
              role="tab"
              id=${`tab-${f}`}
              class="plain-button segment"
              data-system=${f}
              aria-selected=${f === e ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${f === e ? "0" : "-1"}
              @click=${() => this.switchSheet(f)}
            >
              ${d.system[f]}
            </button>`
    )}
        </div>` : u;
    return p`${b}
      <div class="hvac-panel" role=${l ? "tabpanel" : u} id="hvac-panel" aria-labelledby=${l ? `tab-${e}` : u}>
        ${m}
      </div>`;
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
    const n = Date.now(), o = this.reading(t.carbon_dioxide, t.thresholds.stale_minutes, n), s = this.pm25Reading(t, n), r = e === "pm25" ? s : o;
    return {
      value: r.value,
      stale: r.stale === !0,
      secondary: e === "co2" ? { value: s.value, stale: s.stale === !0 } : void 0
    };
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, e, n) {
    const o = this._config?.history.hours ?? 24, { t: s } = this._i18n;
    let r;
    const a = this._historyModel;
    return this._historyStatus === "loading" ? r = p`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !a ? r = p`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : or(a, e) ? r = p`<div
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
        ${gr(a, e, this.chartWidth(), this._scrubTime, this._i18n, n, this.liveReading(t, e))}
      </div>` : r = p`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, r;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(Kr).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. */
  sheetCannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".sheet");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  openSheet(t, e, n, o) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._dragY = 0, this._sheet = { kind: t, room: e, metric: t === "history" ? o ?? "temperature" : void 0 }, (t === "heating" || t === "climate") && (this._hvacSelected = this.hvacSelection(t)), window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return zn(t, this._i18n.language);
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, e, n) {
    const o = (this._config?.rooms ?? []).filter((s) => e.includes(s.name));
    o.length !== 0 && (this.openSheet(t, o[0], n), this._sheet = { kind: t, room: o[0], rooms: o }, this._hvacSelected = this.hvacSelection(t));
  }
  /** The rooms a Topení / Klimatizace popup sets: one room, or the rooms of a summary chip that have the system. */
  sheetRooms() {
    const t = this._sheet;
    return t ? t.rooms ?? [t.room] : [];
  }
  /** The climate entity of a room for the system of the popup. */
  hvacEntity(t, e) {
    return e === "heating" ? t.heating?.climate : t.air_conditioner;
  }
  /** The rooms the popup opens with: the rooms of the popup that have the system, else the first room that has it. */
  hvacSelection(t) {
    const e = this.sheetRooms().map((o) => this.hvacEntity(o, t)).filter((o) => !!o);
    if (e.length) return e;
    const n = (this._config?.rooms ?? []).map((o) => this.hvacEntity(o, t)).find((o) => !!o);
    return n ? [n] : [];
  }
  /** Sends what waits in the popup Topení / Klimatizace at once (it closes or switches the system). */
  async flushClimate() {
    await this.renderRoot.querySelector("kd-climate")?.flush();
  }
  /** Segmented control in the HVAC popup: switch between Topení and Klimatizace. */
  switchSheet(t) {
    this._sheet && this._sheet.kind !== t && (this.flushClimate(), this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room, rooms: this._sheet.rooms }, this._hvacSelected = this.hvacSelection(t));
  }
  closeSheet(t = !0) {
    window.removeEventListener("resize", this.handleResize), this.flushClimate(), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._ventilationEnding = !1, this._vent = void 0, this._ventRequest += 1, window.clearTimeout(this._endTimer), this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
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
      ...t.windows.map((a) => a.entity)
    ].filter((a) => !!a), o = this._config.history, s = Date.now(), r = s - o.hours * At;
    try {
      const a = await ie(this.hass, n, r, s);
      if (e !== this._historyRequest)
        return;
      this._historyModel = nr(a, t, { startMs: r, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
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
    const t = ms(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, o = Date.now(), s = o - e * 6e4;
    try {
      const r = await ie(this.hass, t, s, o), a = {};
      for (const l of t)
        a[l] = Us(r[l], s, o, n);
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
    const e = bs(this._config), n = await Promise.allSettled(
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
    return t.stale ? p`<span class="stale-mark" aria-hidden="true">${Ws()}</span>` : u;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(On(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || ct(e.toLowerCase()))
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
Mi.styles = [li, Ir];
let I = Mi;
j([
  P()
], I.prototype, "_config");
j([
  w({ attribute: !1 })
], I.prototype, "hass");
j([
  P()
], I.prototype, "_sheet");
j([
  P()
], I.prototype, "_sheetError");
j([
  P()
], I.prototype, "_hvacSelected");
j([
  P()
], I.prototype, "_ventilationEnding");
j([
  P()
], I.prototype, "_announcement");
j([
  P()
], I.prototype, "_vent");
j([
  P()
], I.prototype, "_historyStatus");
j([
  P()
], I.prototype, "_historyModel");
j([
  P()
], I.prototype, "_scrubTime");
j([
  P()
], I.prototype, "_dragY");
j([
  P()
], I.prototype, "_flash");
j([
  P()
], I.prototype, "_moving");
j([
  P()
], I.prototype, "_prefersDark");
j([
  P()
], I.prototype, "_hint");
j([
  P()
], I.prototype, "_trends");
j([
  P()
], I.prototype, "_trendsLoaded");
j([
  P()
], I.prototype, "_reported");
j([
  P()
], I.prototype, "_historyRequest");
j([
  P()
], I.prototype, "_clock");
Qo("kd");
Bo("kd");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", I);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ze(Mr()).t.cardDescription,
  preview: !1
});
