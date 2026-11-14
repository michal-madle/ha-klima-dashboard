const $e = globalThis, hi = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ci = /* @__PURE__ */ Symbol(), Wi = /* @__PURE__ */ new WeakMap();
let Sn = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== ci) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (hi && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Wi.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Wi.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Mn = (i) => new Sn(typeof i == "string" ? i : i + "", void 0, ci), ot = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new Sn(e, i, ci);
}, ro = (i, t) => {
  if (hi) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = $e.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, qi = hi ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Mn(e);
})(i) : i;
const { is: lo, defineProperty: ho, getOwnPropertyDescriptor: co, getOwnPropertyNames: po, getOwnPropertySymbols: uo, getPrototypeOf: mo } = Object, Pe = globalThis, Ki = Pe.trustedTypes, fo = Ki ? Ki.emptyScript : "", go = Pe.reactiveElementPolyfillSupport, Kt = (i, t) => i, _e = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? fo : null;
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
} }, pi = (i, t) => !lo(i, t), Yi = { attribute: !0, type: String, converter: _e, reflect: !1, useDefault: !1, hasChanged: pi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Pe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let zt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Yi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && ho(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = co(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Yi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Kt("elementProperties"))) return;
    const t = mo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Kt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Kt("properties"))) {
      const e = this.properties, n = [...po(e), ...uo(e)];
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
      for (const o of n) e.unshift(qi(o));
    } else t !== void 0 && e.push(qi(t));
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
    return ro(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : _e).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : _e;
      this._$Em = o;
      const r = a.fromAttribute(e, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? pi)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
zt.elementStyles = [], zt.shadowRootOptions = { mode: "open" }, zt[Kt("elementProperties")] = /* @__PURE__ */ new Map(), zt[Kt("finalized")] = /* @__PURE__ */ new Map(), go?.({ ReactiveElement: zt }), (Pe.reactiveElementVersions ??= []).push("2.1.2");
const ui = globalThis, Gi = (i) => i, Se = ui.trustedTypes, Xi = Se ? Se.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Tn = "$lit$", $t = `lit$${Math.random().toFixed(9).slice(2)}$`, Cn = "?" + $t, vo = `<${Cn}>`, Mt = document, Gt = () => Mt.createComment(""), Xt = (i) => i === null || typeof i != "object" && typeof i != "function", mi = Array.isArray, bo = (i) => mi(i) || typeof i?.[Symbol.iterator] == "function", je = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zi = /-->/g, Ji = />/g, xt = RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qi = /'/g, tn = /"/g, An = /^(?:script|style|textarea|title)$/i, En = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = En(1), _ = En(2), Rt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), en = /* @__PURE__ */ new WeakMap(), St = Mt.createTreeWalker(Mt, 129);
function On(i, t) {
  if (!mi(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Xi !== void 0 ? Xi.createHTML(t) : t;
}
const $o = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ut;
  for (let r = 0; r < e; r++) {
    const l = i[r];
    let d, h, c = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, h = a.exec(l), h !== null); ) u = a.lastIndex, a === Ut ? h[1] === "!--" ? a = Zi : h[1] !== void 0 ? a = Ji : h[2] !== void 0 ? (An.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = xt) : h[3] !== void 0 && (a = xt) : a === xt ? h[0] === ">" ? (a = o ?? Ut, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? xt : h[3] === '"' ? tn : Qi) : a === tn || a === Qi ? a = xt : a === Zi || a === Ji ? a = Ut : (a = xt, o = void 0);
    const b = a === xt && i[r + 1].startsWith("/>") ? " " : "";
    s += a === Ut ? l + vo : c >= 0 ? (n.push(d), l.slice(0, c) + Tn + l.slice(c) + $t + b) : l + $t + (c === -2 ? r : b);
  }
  return [On(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Zt {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, h] = $o(t, e);
    if (this.el = Zt.createElement(d, n), St.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = St.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(Tn)) {
          const u = h[a++], b = o.getAttribute(c).split($t), m = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: m[2], strings: b, ctor: m[1] === "." ? yo : m[1] === "?" ? xo : m[1] === "@" ? ko : Le }), o.removeAttribute(c);
        } else c.startsWith($t) && (l.push({ type: 6, index: s }), o.removeAttribute(c));
        if (An.test(o.tagName)) {
          const c = o.textContent.split($t), u = c.length - 1;
          if (u > 0) {
            o.textContent = Se ? Se.emptyScript : "";
            for (let b = 0; b < u; b++) o.append(c[b], Gt()), St.nextNode(), l.push({ type: 2, index: ++s });
            o.append(c[u], Gt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Cn) l.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = o.data.indexOf($t, c + 1)) !== -1; ) l.push({ type: 7, index: s }), c += $t.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = Mt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Dt(i, t, e = i, n) {
  if (t === Rt) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = Xt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = Dt(i, o._$AS(i, t.values), o, n)), t;
}
class wo {
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
    let s = St.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ee(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new _o(s, this, t)), this._$AV.push(d), l = n[++r];
      }
      a !== l?.index && (s = St.nextNode(), a++);
    }
    return St.currentNode = Mt, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class ee {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Dt(this, t, e), Xt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== Rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Mt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Zt.createElement(On(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new wo(o, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = en.get(t.strings);
    return e === void 0 && en.set(t.strings, e = new Zt(t)), e;
  }
  k(t) {
    mi(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new ee(this.O(Gt()), this.O(Gt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Gi(t).nextSibling;
      Gi(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Dt(this, t, e, 0), a = !Xt(t) || t !== this._$AH && t !== Rt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = Dt(this, r[n + l], e, l), d === Rt && (d = this._$AH[l]), a ||= !Xt(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yo extends Le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class xo extends Le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ko extends Le {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Dt(this, t, e, 0) ?? f) === Rt) return;
    const n = this._$AH, o = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== f && (n === f || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _o {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Dt(this, t);
  }
}
const So = ui.litHtmlPolyfillSupport;
So?.(Zt, ee), (ui.litHtmlVersions ??= []).push("3.3.3");
const Mo = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new ee(t.insertBefore(Gt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const fi = globalThis;
class it extends zt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mo(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Rt;
  }
}
it._$litElement$ = !0, it.finalized = !0, fi.litElementHydrateSupport?.({ LitElement: it });
const To = fi.litElementPolyfillSupport;
To?.({ LitElement: it });
(fi.litElementVersions ??= []).push("4.2.2");
const Pn = /* @__PURE__ */ Symbol.for(""), Co = (i) => {
  if (i?.r === Pn) return i?._$litStatic$;
}, gi = (i) => ({ _$litStatic$: i, r: Pn }), nn = /* @__PURE__ */ new Map(), Ao = (i) => (t, ...e) => {
  const n = e.length;
  let o, s;
  const a = [], r = [];
  let l, d = 0, h = !1;
  for (; d < n; ) {
    for (l = t[d]; d < n && (s = e[d], (o = Co(s)) !== void 0); ) l += o + t[++d], h = !0;
    d !== n && r.push(s), a.push(l), d++;
  }
  if (d === n && a.push(t[n]), h) {
    const c = a.join("$$lit$$");
    (t = nn.get(c)) === void 0 && (a.raw = a, nn.set(c, t = a)), e = r;
  }
  return i(t, ...e);
}, vi = Ao(p);
const Eo = { attribute: !0, type: String, converter: _e, reflect: !1, hasChanged: pi }, Oo = (i = Eo, t, e) => {
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
function w(i) {
  return (t, e) => typeof e == "object" ? Oo(i, t, e) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function z(i) {
  return w({ ...i, state: !0, attribute: !1 });
}
function Wt(i, t = {}) {
  return i.length < 2 ? p`${i[0] ?? f}` : p`<span class="joined ${t.whole ? "whole" : ""}">${i.map(
    (e, n) => p`${n ? p`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : f}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function ze(i, t = {}) {
  return Wt(i.split(" · "), t);
}
function bi(i, t) {
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
const $i = ot`
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

  /* A part on its own line that is still too long (measured before the font or the width settled, iPhone) wraps
     rather than pushing the card wider than the screen. */
  .joined.stacked .joined-part {
    white-space: normal;
  }

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`, Po = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', Ln = ot`
  :host {
    font-family: ${Mn(Po)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, wi = 25, Jt = 5, zn = 21, yi = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], Lo = ["plan", "manual", "boost", "off"];
function xi(i) {
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
  if (!t || xi(e)) return;
  if (i === "heating") {
    if (e === "auto") return "plan";
    if (e === "off") return "off";
    if (e === "heat") {
      const o = Tt(t.attributes.temperature);
      return o !== void 0 && o <= Jt ? "off" : o === wi ? "boost" : "manual";
    }
    return;
  }
  const n = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && n === "wind_free" ? "wind_free" : n === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : yi.includes(e) ? e : void 0;
}
function Me(i, t) {
  const e = Nt(i, t);
  return e === void 0 ? void 0 : e !== "off";
}
function zo(i, t, e, n, o) {
  if (n.includes(o)) return n.length > 1 ? n.filter((a) => a !== o) : n;
  const s = Me(i, t?.states[o]);
  return s === void 0 ? n : e.filter((a) => Me(i, t?.states[a.entity]) === s).map((a) => a.entity);
}
function No(i, t) {
  return t.flatMap((e) => {
    const n = Tt(i?.states[e]?.attributes.temperature);
    return n === void 0 ? [] : [{ entity: e, value: n }];
  });
}
function Ro(i, t, e) {
  const n = new Set(e.map((o) => Nt(i, t?.states[o])).filter((o) => o !== void 0));
  return n.size === 1 ? [...n][0] : void 0;
}
function Do(i, t) {
  const e = i === "heating" ? 0.5 : 1, n = Tt(t?.attributes.min_temp) ?? (i === "heating" ? 5 : 16), o = Tt(t?.attributes.max_temp) ?? (i === "heating" ? 25 : 30);
  return { min: Math.ceil(n / e) * e, max: Math.floor(o / e) * e, step: e };
}
function Fo(i) {
  const t = wt(i?.attributes.hvac_modes), e = wt(i?.attributes.preset_modes);
  return yi.filter((n) => n === "wind_free" ? t.includes("cool") && e.includes("wind_free") : n === "sleep" ? e.includes("sleep") : n === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(n));
}
function Io(i, t, e) {
  const n = t.map((o) => wt(i?.states[o]?.attributes[e])).filter((o) => o.length);
  return n.length ? n[0].filter((o) => n.every((s) => s.includes(o))) : [];
}
function jo(i, t, e) {
  const n = new Set(t.map((o) => i?.states[o]?.attributes[e]).filter((o) => typeof o == "string"));
  return n.size === 1 ? [...n][0] : void 0;
}
function He(i) {
  return !!i?.services?.tado_ce?.set_climate_timer;
}
function on(i) {
  return `${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00`;
}
function Ho(i, t, e, n) {
  const o = e.mode ?? (e.temperature !== void 0 ? "manual" : Nt("heating", t));
  if (o === void 0) return [];
  if (o === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } }];
  if (o === "off") {
    const d = e.manualFor ?? "forever";
    if (!n || d === "forever") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } }];
    const h = { entity_id: i, temperature: Jt };
    return d === "next" ? h.overlay = "next_time_block" : h.time_period = on(Number(d)), [{ domain: "tado_ce", service: "set_climate_timer", data: h }];
  }
  const s = Tt(t?.attributes.temperature), a = o === "boost" ? wi : e.temperature ?? (s !== void 0 && s > Jt ? s : zn);
  if (!n)
    return o === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: a, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (o === "boost" ? "30" : "next"), l = { entity_id: i, temperature: a };
  return r === "next" ? l.overlay = "next_time_block" : r === "forever" ? l.overlay = "manual" : l.time_period = on(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: l }];
}
function Uo(i, t, e) {
  const n = [], o = { entity_id: i }, s = wt(t?.attributes.hvac_modes), a = wt(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (c) => n.push({ domain: "climate", service: "set_hvac_mode", data: { ...o, hvac_mode: c } }), h = (c) => n.push({ domain: "climate", service: "set_preset_mode", data: { ...o, preset_mode: c } });
    l === "wind_free" ? (d("cool"), h("wind_free")) : l === "sleep" ? ((t?.state === "off" || xi(t?.state)) && d("cool"), h("sleep")) : (d(l === "auto" ? s.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && h("none"));
  }
  return e.temperature !== void 0 && l !== "off" && n.push({ domain: "climate", service: "set_temperature", data: { ...o, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && wt(t?.attributes.fan_modes).includes(e.fan) && n.push({ domain: "climate", service: "set_fan_mode", data: { ...o, fan_mode: e.fan } }), e.swing !== void 0 && wt(t?.attributes.swing_modes).includes(e.swing) && n.push({ domain: "climate", service: "set_swing_mode", data: { ...o, swing_mode: e.swing } }), n;
}
function Bo(i, t) {
  const e = t.mode;
  return e === void 0 ? i?.state : e === "wind_free" || e === "sleep" && (i?.state === "off" || xi(i?.state)) ? "cool" : e === "sleep" ? i?.state : e === "auto" ? wt(i?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function Vo(i, t, e) {
  const n = Math.round(t * 60), o = [{ delay: { hours: Math.floor(n / 3600), minutes: Math.floor(n % 3600 / 60), seconds: n % 60 } }];
  return e !== void 0 && o.push({ condition: "state", entity_id: i, state: e }), o.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: o };
}
var Wo = Object.defineProperty, st = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && Wo(t, e, o), o;
};
const qo = ["next", "30", "60", "180", "forever"], Ko = [0, 60, 180, 480], Ai = class Ai extends it {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    bi(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
    const s = He(o);
    try {
      for (const a of e) {
        const r = o.states[a];
        if (!r || Nt(n, r) === void 0) continue;
        const l = n === "heating" ? Ho(a, r, t, s) : Uo(a, r, t);
        for (const c of l) await o.callService(c.domain, c.service, c.data);
        const d = t.offAfter ?? 0, h = n === "cooling" ? Bo(r, t) : void 0;
        d > 0 && h !== void 0 && h !== "off" && await o.callWS(Vo(a, d, h));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (a) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${a instanceof Error ? a.message : String(a)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
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
    const e = zo(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return f;
    const n = this.hass, o = n?.states[this.selected[0]], { min: s, max: a, step: r } = Do(this.system, o), l = No(n, this.selected), d = [...new Set(l.map((k) => k.value))], h = Ro(this.system, n, this.selected), c = this.draft.mode ?? h, u = this.draft.temperature === void 0 && d.length > 1, b = d[0], m = this.draft.temperature ?? (c === "boost" ? 25 : c === "manual" && b !== void 0 && b <= Jt ? zn : b), x = c === "off" || c === "fan_only", $ = x && c !== void 0 ? t.modes[c] : u ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : m !== void 0 ? this.degrees(m) : "––", y = this.selected.flatMap((k) => {
      const F = Tt(n?.states[k]?.attributes.current_temperature);
      return F === void 0 ? [] : [{ id: k, text: `${e.one(F)} °C` }];
    }), S = this.system === "heating" && this.selected.length === 1 && n?.states[this.selected[0]]?.attributes.hvac_action === "heating", L = u ? t.targets(l.map((k) => `${this.name(k.entity)} ${this.degrees(k.value)}`).join(" · ")) : y.length ? t.now(this.selected.length === 1 ? `${y[0].text}${S ? ` · ${t.heats}` : ""}` : y.map((k) => `${this.name(k.id)} ${k.text}`).join(" · ")) : "", E = this.system === "heating" ? Lo.filter((k) => k !== "boost" || He(n)) : yi.filter((k) => this.selected.some((F) => Fo(n?.states[F]).includes(k))), T = this.draft.mode === void 0 && h === void 0 && this.selected.length > 1, B = this.system === "cooling" && (c === "off" || c === "fan_only");
    return p`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((k) => {
      const F = n?.states[k.entity], C = Me(this.system, F), M = this.selected.includes(k.entity);
      return sn(this.prefix, {
        name: k.name,
        text: this.roomText(k.entity),
        state: M ? "on" : C ? "idle" : "off",
        disabled: C === void 0,
        pressed: M,
        onPress: () => this.selectRoom(k.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${x ? "word" : ""}" aria-live="polite">${$}</div>
        <div class="sub">${L}</div>
        ${this.busy ? p`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : f}
      </div>
      <div class="slider">
        ${Yo(this.prefix, {
      min: s,
      max: a,
      step: r,
      value: m ?? s,
      mixed: u,
      marks: u ? d : [],
      label: t.temperature,
      valueText: m !== void 0 ? this.degrees(m) : "",
      minLabel: this.degrees(s),
      maxLabel: this.degrees(a),
      disabled: B || !this.selected.length,
      onChange: (k) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && c !== "manual" ? { temperature: k, mode: "manual" } : { temperature: k })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? ae(this.prefix, {
      label: t.mode,
      options: E.map((k) => ({ value: k, label: t.modes[k] })),
      value: c ?? "",
      onSelect: (k) => this.change({ mode: k, ...k === "plan" || k === "off" ? { temperature: void 0 } : {} })
    }) : p`<div class="modes" role="group" aria-label=${t.mode}>
            ${E.map(
      (k) => sn(this.prefix, {
        centered: !0,
        name: t.modes[k],
        state: c === k ? "on" : "idle",
        pressed: c === k,
        onPress: () => this.change({ mode: k })
      })
    )}
          </div>`}
      ${T ? p`<div class="note">${ze(t.mixedModes(this.selected.map((k) => `${this.name(k)} ${t.modes[Nt(this.system, n?.states[k]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : f}
      ${(u || T) && !Object.keys(this.draft).length ? p`<div class="note">${t.firstChange}</div>` : f}
      ${this.system === "heating" ? this.renderManualFor(c) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(c)]}
      ${this.error ? p`<div class="error" role="alert">${this.error}</div>` : f}
      ${this.selected.length === 1 ? p`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : f}
    `;
  }
  renderManualFor(t) {
    const e = this.texts;
    if (!He(this.hass)) return f;
    const n = t === "off", o = t === "manual" || t === "boost" || n, s = this.draft.manualFor ?? (t === "boost" ? "30" : n ? "forever" : "next"), a = Number(s), r = () => this.i18n.time(Date.now() + a * 6e4), l = o ? n ? s === "next" ? e.offUntilNextPlan : s === "forever" ? e.offUntilChanged : e.offUntilTime(r()) : s === "next" ? e.untilNextPlan : s === "forever" ? e.untilChanged : e.untilTime(r()) : "", d = n ? e.offFor : e.manualFor;
    return p`<h3>${d}</h3>
      ${ae(this.prefix, {
      label: d,
      options: qo.map((h) => ({ value: h, label: e.manualForChoices[h] })),
      value: s,
      disabled: !o,
      wrap: !0,
      onSelect: (h) => this.change({ manualFor: h, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${l}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, n = Io(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!n.length) return f;
    const o = t === "fan" ? e.fanModes : e.swingModes, s = this.draft[t] ?? jo(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? e.fan : e.swing;
    return p`<h3>${a}</h3>
      ${ae(this.prefix, {
      label: a,
      options: n.map((r) => ({ value: r, label: o[r] ?? r })),
      value: s,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, n = this.draft.offAfter ?? 0, o = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => Me(this.system, this.hass?.states[a]) === !0), s = o ? n === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + n * 6e4)) : "";
    return p`<h3>${e.offAfter}</h3>
      ${ae(this.prefix, {
      label: e.offAfter,
      options: Ko.map((a) => ({ value: String(a), label: e.offAfterChoices[String(a)] })),
      value: String(n),
      disabled: !o,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${s}</div>`;
  }
};
Ai.styles = [Ln, $i, ot`
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
      /* Four in a row on a phone, three on the narrowest one: a mode never gets a tile too narrow for its name. */
      grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
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
let X = Ai;
st([
  w({ attribute: !1 })
], X.prototype, "hass");
st([
  w({ attribute: !1 })
], X.prototype, "i18n");
st([
  w({ attribute: !1 })
], X.prototype, "texts");
st([
  w()
], X.prototype, "system");
st([
  w({ attribute: !1 })
], X.prototype, "rooms");
st([
  w({ attribute: !1 })
], X.prototype, "selected");
st([
  w()
], X.prototype, "prefix");
st([
  w({ type: Number })
], X.prototype, "delayMs");
st([
  z()
], X.prototype, "draft");
st([
  z()
], X.prototype, "busy");
st([
  z()
], X.prototype, "error");
function sn(i, t) {
  const e = gi(`${i}-tile`);
  return vi`<${e}
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
function ae(i, t) {
  const e = gi(`${i}-segmented`);
  return vi`<${e}
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
function Yo(i, t) {
  const e = gi(`${i}-slider`);
  return vi`<${e}
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
function Go(i) {
  if (!customElements.get(`${i}-climate`)) {
    const t = class extends X {
      constructor() {
        super(), this.prefix = i;
      }
    };
    customElements.define(`${i}-climate`, t);
  }
}
var Xo = Object.defineProperty, Ft = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && Xo(t, e, o), o;
};
const Ei = class Ei extends it {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, n = (t - e) / 2, o = 2 * Math.PI * n, s = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return p`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
      ${this.num ? p`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? p`<span class="unit">${this.unit}</span>` : f}` : f}
    </div>`;
  }
};
Ei.styles = ot`
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
let mt = Ei;
Ft([
  w({ type: Number })
], mt.prototype, "fraction");
Ft([
  w({ type: Number })
], mt.prototype, "size");
Ft([
  w({ type: Number })
], mt.prototype, "stroke");
Ft([
  w()
], mt.prototype, "num");
Ft([
  w()
], mt.prototype, "unit");
Ft([
  w()
], mt.prototype, "label");
class Ne {
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
class ki {
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
const _i = ot`
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
var Zo = Object.defineProperty, Z = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && Zo(t, e, o), o;
};
const Oi = class Oi extends it {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ki(this), this.nudgeIndex = 0, this.gesture = new Ne(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : s;
    return p`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""} ${this.wrap ? "wrap" : !this.compact && this.options.length >= 5 ? "many" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : f}
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
      (r, l) => p`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === n ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? p`<span class="detail">${r.detail}</span>` : null}
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
Oi.styles = [
  _i,
  ot`
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
        line-height: 16px;
        text-align: center;
      }
      /* Five and more options: a smaller text and a narrower padding, so neighbouring labels do not touch („Střední“, „Vysoká“). */
      .track.many button {
        padding: 0 4px;
        font-size: 15px;
        line-height: 20px;
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
      :host([pending]) .thumb {
        animation: hdk-seg-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-seg-pending {
        to {
          opacity: 0.45;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) .thumb {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: -1.5px;
        }
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
let W = Oi;
Z([
  w({ attribute: !1 })
], W.prototype, "options");
Z([
  w()
], W.prototype, "value");
Z([
  w()
], W.prototype, "label");
Z([
  w({ type: Boolean })
], W.prototype, "disabled");
Z([
  w({ type: Boolean, reflect: !0 })
], W.prototype, "pending");
Z([
  w({ type: Boolean })
], W.prototype, "compact");
Z([
  w({ type: Boolean })
], W.prototype, "wrap");
Z([
  w({ type: Boolean })
], W.prototype, "guarded");
Z([
  w({ type: Number })
], W.prototype, "holdMs");
Z([
  w({ type: Number })
], W.prototype, "doubleTapMs");
Z([
  w({ type: Number })
], W.prototype, "hintSeconds");
Z([
  w()
], W.prototype, "hint");
Z([
  z()
], W.prototype, "_dx");
Z([
  z()
], W.prototype, "_dragging");
var Jo = Object.defineProperty, Ot = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && Jo(t, e, o), o;
};
const Qo = 100, ts = 0.6, es = 6, Pi = class Pi extends it {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const n = t.composedPath(), o = e.findIndex((a) => n.includes(a)), s = t.shiftKey ? e[o <= 0 ? e.length - 1 : o - 1] : e[o === -1 || o === e.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || "drag" in e.dataset || e instanceof HTMLInputElement && e.type === "range"));
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
        if (n < es) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const n = Math.max(0, t.clientY - e.startY), o = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Qo || o > ts) ? this.close() : this.dragY = 0;
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
    t.has("open") && (this.open ? this.renderRoot.querySelector(".panel")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content, inside shadow roots too (the controls of the kit). */
  focusable() {
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (o) => [...o.querySelectorAll("*")].flatMap((s) => [
      ...s.matches(t) ? [s] : [],
      ...s.shadowRoot ? e(s.shadowRoot) : []
    ]), n = this.renderRoot.querySelector(".close");
    return [...n ? [n] : [], ...e(this).filter((o) => o.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".panel");
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
        class="panel ${this.wide ? "wide" : ""} ${this.dragging ? "dragging" : ""}"
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
              ${this.sub ? p`<div class="sub">${this.sub}</div>` : f}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : f;
  }
};
Pi.styles = [Ln, ot`
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
    .panel {
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
    .panel:focus {
      outline: none;
    }
    .panel.dragging {
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
    /* The type scale of DASHBOARD_UX_SYSTEM.md (Písmo): Title 2 22/28 and Subhead 15/20 (uživatel 13. 11. 2026: „Q209 ano“). */
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 15px;
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
      .panel {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .panel {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
    @media (orientation: landscape) and (max-height: 600px) {
      .panel.wide {
        max-width: min(960px, calc(100% - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
        max-height: calc(100% - 16px);
      }
    }
  `];
let ht = Pi;
Ot([
  w({ type: Boolean, reflect: !0 })
], ht.prototype, "open");
Ot([
  w()
], ht.prototype, "heading");
Ot([
  w()
], ht.prototype, "sub");
Ot([
  w()
], ht.prototype, "closeLabel");
Ot([
  w({ type: Boolean })
], ht.prototype, "wide");
Ot([
  z()
], ht.prototype, "dragY");
Ot([
  z()
], ht.prototype, "dragging");
var is = Object.defineProperty, et = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && is(t, e, o), o;
};
const Li = class Li extends it {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = Math.max(0, Math.min(1, (t - this.min) / e)), o = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${n})`, s = this.mixed && this._drag === void 0 ? this.marks.map((d) => p`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(e / a + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (d, h) => p`<i style="left:${(h * a / e * 100).toFixed(2)}%"></i>`) : [];
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
Li.styles = ot`
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
let q = Li;
et([
  w({ type: Number })
], q.prototype, "min");
et([
  w({ type: Number })
], q.prototype, "max");
et([
  w({ type: Number })
], q.prototype, "step");
et([
  w({ type: Number })
], q.prototype, "tickStep");
et([
  w({ type: Number })
], q.prototype, "value");
et([
  w()
], q.prototype, "label");
et([
  w()
], q.prototype, "valueText");
et([
  w()
], q.prototype, "minLabel");
et([
  w()
], q.prototype, "maxLabel");
et([
  w({ type: Boolean })
], q.prototype, "disabled");
et([
  w({ type: Boolean, reflect: !0 })
], q.prototype, "mixed");
et([
  w({ attribute: !1 })
], q.prototype, "marks");
et([
  z()
], q.prototype, "_drag");
var ns = Object.defineProperty, ct = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && ns(t, e, o), o;
};
const zi = class zi extends it {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ki(this), this.gesture = new Ne(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
        aria-busy=${this.pending ? "true" : f}
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
zi.styles = [
  _i,
  ot`
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
      :host([pending]) button {
        animation: hdk-switch-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-switch-pending {
        to {
          opacity: 0.5;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: 2px;
        }
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
let tt = zi;
ct([
  w({ type: Boolean })
], tt.prototype, "checked");
ct([
  w({ type: Boolean })
], tt.prototype, "disabled");
ct([
  w({ type: Boolean, reflect: !0 })
], tt.prototype, "pending");
ct([
  w()
], tt.prototype, "label");
ct([
  w({ type: Boolean })
], tt.prototype, "guarded");
ct([
  w({ type: Number })
], tt.prototype, "holdMs");
ct([
  w({ type: Number })
], tt.prototype, "doubleTapMs");
ct([
  w({ type: Number })
], tt.prototype, "hintSeconds");
ct([
  w()
], tt.prototype, "hintPlacement");
ct([
  w()
], tt.prototype, "hint");
var os = Object.defineProperty, K = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && os(t, e, o), o;
};
const Ni = class Ni extends it {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ki(this), this.gesture = new Ne(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    bi(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
        aria-checked=${t ? this.state === "on" ? "true" : "false" : f}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : f}
        aria-busy=${this.pending ? "true" : f}
        aria-haspopup=${this.kind === "open" ? "dialog" : f}
        aria-label=${this.label || f}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(n) => this.protected && n.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? p`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : p`<span class="text">${ze(this.text)}${e}</span>`}</button>
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
Ni.styles = [
  _i,
  $i,
  ot`
      :host {
        position: relative;
        display: block;
        min-width: 0;
        container-type: inline-size;
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
      /* Sent and on its way: the fill goes between its own and the accent until Home Assistant reports the result. */
      :host([pending]) button {
        animation: hdk-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-pending {
        to {
          background: var(--hdk-tile-on, #0a6ed1);
          color: var(--hdk-tile-on-text, #fff);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          background: var(--hdk-tile-mixed, #17395d);
          /* Not by colour alone: a dashed accent outline marks the command on its way. */
          outline: 1.5px dashed var(--hdk-tile-on, #0a6ed1);
          outline-offset: -1.5px;
        }
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
        flex: 0 1 auto;
      }
      /* A narrow centred tile (four modes in a row on a phone): a smaller name and less padding, so „Chlazení“ and „WindFree“ keep clear of the edges. */
      @container (max-width: 100px) {
        :host([centered]) button {
          padding: 10px 6px;
        }
        :host([centered]) .name {
          font-size: 15px;
          line-height: 20px;
        }
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
let U = Ni;
K([
  w()
], U.prototype, "name");
K([
  w()
], U.prototype, "text");
K([
  w({ reflect: !0 })
], U.prototype, "state");
K([
  w()
], U.prototype, "kind");
K([
  w({ type: Number })
], U.prototype, "count");
K([
  w({ type: Boolean, reflect: !0 })
], U.prototype, "centered");
K([
  w({ type: Boolean })
], U.prototype, "disabled");
K([
  w({ type: Boolean, reflect: !0 })
], U.prototype, "pending");
K([
  w({ type: Boolean })
], U.prototype, "pressed");
K([
  w()
], U.prototype, "label");
K([
  w({ type: Boolean })
], U.prototype, "guarded");
K([
  w({ type: Number })
], U.prototype, "holdMs");
K([
  w({ type: Number })
], U.prototype, "doubleTapMs");
K([
  w({ type: Number })
], U.prototype, "hintSeconds");
K([
  w()
], U.prototype, "hint");
K([
  w()
], U.prototype, "hintAlign");
function ss(i) {
  const t = [
    [`${i}-switch`, tt],
    [`${i}-segmented`, W],
    [`${i}-slider`, q],
    [`${i}-ring`, mt],
    [`${i}-tile`, U],
    [`${i}-sheet`, ht]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const we = 60, ei = 142, an = 11, re = 3, as = 0.8, rn = 2, rs = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", ls = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", ds = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function hs(i, t) {
  if (i === void 0 || t === void 0)
    return _`<rect
      x="0.75"
      y="0.75"
      width=${we - 1.5}
      height=${ei - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = ei - re - 1, n = e / an, o = n - as, s = o - t / 100 * (o - rn), a = re + 1 + (100 - i) / 100 * e, r = Array.from({ length: an }, (l, d) => {
    const h = re + 1 + d * n + n / 2, c = h <= a, u = c ? s : rn;
    return _`<rect
      x="0"
      y=${(h - u / 2).toFixed(2)}
      width=${we}
      height=${u.toFixed(2)}
      rx=${Math.min(1.5, u / 2).toFixed(2)}
      style=${c ? rs : ls}
    ></rect>`;
  });
  return _`<rect
      class="rail"
      x="0"
      y="0"
      width=${we}
      height=${re}
      rx="1.5"
      style=${ds}
    ></rect>${r}`;
}
const cs = ["cs", "en", "sv"];
class Nn extends Error {
}
function O(i) {
  throw new Nn(i);
}
function ps(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Nn ? new Error(`${i}: ${e.message}`) : e;
  }
}
function Ct(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function bt(i, t) {
  return i == null ? {} : (Ct(i) || O(`"${t}" must be a mapping of keys.`), i);
}
function At(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || O(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function us(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || O(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && O(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function ii(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && O(`${t} must be a non-empty text.`), i.trim();
}
function Te(i, t) {
  if (i != null) {
    if (typeof i == "string" && i.trim())
      return i.trim();
    if (Ct(i) && Object.keys(i).length > 0) {
      const e = Object.entries(i);
      if (e.every(([n, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof o == "string" && o.trim()))
        return Object.fromEntries(e.map(([n, o]) => [n, o.trim()]));
    }
    return O(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Re(i, t) {
  if (i === void 0 || typeof i == "string")
    return i;
  const e = t.toLowerCase();
  return i[e] ?? i[e.split("-")[0]] ?? i.en ?? Object.values(i)[0];
}
function ms(i) {
  return i === void 0 ? [] : typeof i == "string" ? [i] : Object.values(i);
}
const ln = ["auto", ...cs];
function fs(i) {
  const t = i ?? "auto";
  return ln.includes(t) || O(`language must be one of ${ln.join(", ")}.`), t;
}
const ni = ["open", "shade", "dark"], gs = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function vs(i) {
  return gs.has(i);
}
function dn(i, t) {
  return t ? i?.states?.[t] : void 0;
}
const Rn = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function le(i, t, e, n) {
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
}, Si = {
  off: v.off,
  cool: v.cool,
  wind_free: v.cool,
  dry: v.dry,
  fan: v.plan,
  heat: v.heat,
  auto: v.auto,
  unknown: v.off
}, bs = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function $s(i) {
  const t = bs[i];
  if (t)
    return t;
  const e = i.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ws(i) {
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
function Ue(i, t, e, n, o) {
  const { thresholds: s } = n, a = [
    [o.required.temperature, i.temperature],
    [o.required.humidity, i.humidity],
    ...n.hasCo2 ? [[o.required.co2, i.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, i.pm25]] : [],
    [o.required.houseMode, e ? { value: 1 } : void 0]
  ];
  for (const [b, m] of a) {
    if (m?.value === void 0)
      return { id: "noData", label: o.noData(b), color: v.label, kind: "unknown" };
    if (m.stale) {
      const x = m.ageMinutes === void 0 ? void 0 : Fn(m.ageMinutes);
      return { id: "noData", label: o.noData(b, x), color: v.label, kind: "unknown" };
    }
  }
  const r = i.temperature.value, l = i.humidity.value, d = n.hasCo2 ? i.co2.value : Number.NEGATIVE_INFINITY;
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
  const c = t ? s.summer_min : s.winter_min, u = t ? s.summer_max : s.winter_max;
  return r > u ? { id: "warm", label: o.status.warm, color: v.warning, kind: "warning", cause: "temperature" } : r < c ? { id: "cold", label: o.status.cold, color: v.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: v.label, kind: "normal" };
}
function dt(i) {
  return vs(i) || i === "none";
}
function pt(i) {
  if (i == null || i === "")
    return;
  const t = typeof i == "number" ? i : Number.parseFloat(String(i));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Dn(i, t) {
  return i === void 0 || i <= 0 ? 0 : i >= t.heating_waves_3 ? 3 : i >= t.heating_waves_2 ? 2 : 1;
}
function ys(i) {
  const t = /* @__PURE__ */ new Set(), e = (n) => {
    n && t.add(n);
  };
  e(i.houseModeEntity), e(i.ventilationEntity), e(i.ventilationTimerEntity), e(i.outside?.temperature), e(i.outside?.minimum), e(i.outside?.maximum), e(i.outside?.rain_probability), e(i.outside?.pm25);
  for (const n of i.rooms)
    e(n.temperature), e(n.humidity), e(n.carbon_dioxide), e(n.pm25), n.windows.forEach((o) => e(o.entity)), e(n.cover), e(n.heating?.climate), e(n.heating?.overlay), e(n.heating?.target), e(n.heating?.intensity), e(n.air_conditioner);
  return t;
}
function xs(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
function ks(i, t) {
  if (i === t)
    return !0;
  if (!i || !t)
    return !1;
  const e = Object.keys(i), n = Object.keys(t);
  return e.length === n.length && e.every((o) => Object.hasOwn(t, o) && i[o] === t[o]);
}
function Fn(i) {
  return i < 60 ? `${Math.max(1, Math.round(i))} min` : i < 2880 ? `${Math.floor(i / 60)} h` : `${Math.floor(i / 1440)} d`;
}
function hn(i, t) {
  const e = (i ?? []).filter((o) => o !== void 0);
  if (e.length < 2)
    return;
  const n = e[e.length - 1] - e[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function de(i) {
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
function cn(i, t) {
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
function Be(i, t) {
  const e = Math.max(1, Math.round(i));
  return e % 60 === 0 ? t.period.hour(e / 60) : t.period.minute(e);
}
function In(i, t) {
  return Re(i.label, t) ?? i.name;
}
function Ve(i, t, e) {
  return Re(i.label, e) ?? t.cover.presetName[i.icon];
}
function pn(i, t, e) {
  if (i.description !== void 0)
    return Re(i.description, e) ?? "";
  const n = Rn[i.icon];
  return i.label === void 0 && n.position === i.position && n.tilt === i.tilt ? t.cover.presetDescription[i.icon] : t.cover.position(Math.round(i.position), Math.round(i.tilt));
}
function _s(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i.rooms)
    for (const n of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      n && t.add(n);
  return [...t];
}
const Ss = "input_select.house_mode", Ms = 500, Ts = 420, Cs = 25, As = {
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
}, Es = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Os = {
  hours: 24,
  min_temperature_span: 1.5
}, We = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, Ps = ni.map((i) => ({ icon: i, ...Rn[i] })), un = { winter: "Zima", summer: "Léto" }, mn = 3, Ls = [
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
], zs = ["climate", "overlay", "target", "intensity"], fn = ["temperature", "minimum", "maximum", "rain_probability", "pm25", "weather", "humidity"], Ns = ["name", "position", "tilt", "icon", "description"], Rs = ["entity", "name"];
function Yt(i) {
  return i.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function Y(i, t) {
  return us(i, t, { example: "sensor.loznice_teplota" });
}
function qt(i, t, e, n = {}) {
  At(i, Object.keys(t), e);
  const o = { ...t };
  for (const [s, a] of Object.entries(i)) {
    if (a === null)
      continue;
    (typeof a != "number" || !Number.isFinite(a)) && O(`${e}.${s} must be a number.`);
    const r = n[s];
    if (r) {
      const [l, d, h] = r;
      (a < l || a > d || h && !Number.isInteger(a)) && O(`${e}.${s} must be ${h ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = a;
  }
  return o;
}
function jn(i, t) {
  const e = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of e)
    (s ? i[n] >= i[o] : i[n] > i[o]) && O(`${t}: ${n} (${i[n]}) must be ${s ? "below" : "at most"} ${o} (${i[o]}).`);
  i.stale_minutes <= 0 && O(`${t}.stale_minutes must be greater than 0.`), (i.heating_waves_2 < 1 || i.heating_waves_3 > 100) && O(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Ds(i, t) {
  return i > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function oi(i, t) {
  return (!Array.isArray(i) || i.length === 0 || i.length > mn) && O(`${t} must be a list of 1 to ${mn} presets.`), i.map((e, n) => {
    const o = `${t}[${n + 1}]`;
    Ct(e) || O(`${o} must have a position and a tilt.`), At(e, Ns, o);
    const s = Te(e.name, `${o}.name`), a = (c) => {
      const u = e[c];
      return (typeof u != "number" || !Number.isFinite(u) || u < 0 || u > 100) && O(`${o}.${c} must be a number from 0 to 100.`), u;
    }, r = a("position"), l = a("tilt");
    let d = Ds(r, l);
    e.icon != null && (ni.includes(e.icon) || O(`${o}.icon must be one of ${ni.join(", ")}.`), d = e.icon);
    const h = Te(e.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: h, position: r, tilt: l };
  });
}
function Fs(i, t) {
  const e = i.window;
  if (e == null)
    return [];
  const n = Array.isArray(e) ? e : [e];
  n.length === 0 && O(`${t}.window must not be an empty list.`);
  const o = n.map((a, r) => {
    const l = `${t}.window${Array.isArray(e) ? `[${r + 1}]` : ""}`;
    if (Ct(a)) {
      At(a, Rs, l);
      const h = Y(a.entity, `${l}.entity`);
      return h || O(`${l}.entity is required.`), { entity: h, name: Te(a.name, `${l}.name`) };
    }
    const d = Y(a, l);
    return d || O(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const a of o)
    s.has(a.entity) && O(`${t}.window lists ${a.entity} twice.`), s.add(a.entity);
  return o;
}
function gn(i, t) {
  return i === !1 ? { present: !1 } : { entity: Y(i, t), present: !0 };
}
function Is(i, t) {
  const e = ii(i, `${t}.link`);
  return e !== void 0 && !/^(\/|https?:\/\/)/i.test(e) && O(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), e;
}
function js(i, t, e) {
  Ct(i) || O(`room ${t + 1} must be a mapping with at least a name.`);
  const n = Ct(i) && i.name != null ? Te(i.name, `room ${t + 1} name`) : void 0, o = n === void 0 ? "" : ms(n)[0];
  (!o || n === void 0) && O(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, a = i;
  for (const [u, b] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    u in a && O(`${s}: key "${u}" was renamed to "${b}".`);
  "windows" in a && O(`${s}: the key is "window" (one entity or a list of them), not "windows".`), At(a, Ls, s);
  const r = bt(i.heating, `${s}.heating`);
  "heating" in r && O(`${s}: key "heating.heating" was renamed to "heating.intensity".`), At(r, zs, `${s}.heating`);
  const l = i.heating == null ? void 0 : {
    climate: Y(r.climate, `${s}.heating.climate`),
    overlay: Y(r.overlay, `${s}.heating.overlay`),
    target: Y(r.target, `${s}.heating.target`),
    intensity: Y(r.intensity, `${s}.heating.intensity`)
  }, d = qt(bt(i.thresholds, `${s}.thresholds`), e.thresholds, `${s}.thresholds`);
  jn(d, `${s}.thresholds`);
  const h = gn(i.carbon_dioxide, `${s}.carbon_dioxide`), c = gn(i.pm25, `${s}.pm25`);
  return {
    name: o,
    label: n,
    temperature: Y(i.temperature, `${s}.temperature`),
    humidity: Y(i.humidity, `${s}.humidity`),
    carbon_dioxide: h.entity,
    hasCo2: h.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: Fs(i, s),
    cover: Y(i.cover, `${s}.cover`),
    presets: i.cover_presets == null ? e.presets : oi(i.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: Y(i.air_conditioner, `${s}.air_conditioner`),
    link: Is(i.link, s)
  };
}
function Hs(i) {
  return ps("Klima Dashboard", () => Us(i));
}
function Us(i) {
  (!Ct(i) || !Array.isArray(i.rooms) || i.rooms.length === 0) && O("the configuration requires a non-empty rooms list.");
  const t = fs(i.language), e = Y(i.house_mode_entity, "house_mode_entity") ?? Ss, n = Y(i.ventilation_entity, "ventilation_entity"), o = Y(i.ventilation_timer_entity, "ventilation_timer_entity"), s = i.ventilation_co2_target ?? Ms;
  (typeof s != "number" || !Number.isFinite(s) || s < 300 || s > 2e3) && O("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const a = i.ventilation_co2_full ?? Ts;
  (typeof a != "number" || !Number.isFinite(a) || a < 300 || a > s) && O("ventilation_co2_full must be a number of ppm between 300 and ventilation_co2_target.");
  const r = i.ventilation_settle_minutes ?? Cs;
  (typeof r != "number" || !Number.isInteger(r) || r < 1 || r > 180) && O("ventilation_settle_minutes must be a whole number of minutes between 1 and 180.");
  const l = i.send_delay_seconds ?? 2;
  (typeof l != "number" || !Number.isFinite(l) || l < 0 || l > 30) && O("send_delay_seconds must be a number of seconds between 0 and 30.");
  const d = bt(i.house_modes, "house_modes");
  At(d, ["winter", "summer"], "house_modes");
  const h = {
    winter: ii(d.winter, "house_modes.winter") ?? un.winter,
    summer: ii(d.summer, "house_modes.summer") ?? un.summer
  };
  Yt(h.winter) === Yt(h.summer) && O("house_modes.winter and house_modes.summer must differ.");
  const c = i.outside == null ? void 0 : bt(i.outside, "outside");
  if (c) {
    At(c, fn, "outside");
    for (const k of fn)
      Y(c[k], `outside.${k}`);
  }
  const u = qt(bt(i.thresholds, "thresholds"), As, "thresholds");
  jn(u, "thresholds");
  const b = qt(bt(i.trends, "trends"), Es, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), m = { ...bt(i.history, "history") };
  delete m.night_start, delete m.night_end;
  const x = qt(m, Os, "history", {
    hours: [1, 168, "integer"],
    min_temperature_span: [0.5, 20]
  }), $ = { ...bt(i.covers, "covers") }, y = $.presets;
  delete $.presets;
  const S = $.script;
  delete $.script;
  const L = {
    ...qt($, { tolerance: We.tolerance, stall_seconds: We.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: We.script
  };
  S != null && ((typeof S != "string" || !/^script\.[a-z0-9_]+$/.test(S.trim())) && O("covers.script must be a script entity such as script.zaluzie_posun."), L.script = S.trim());
  const E = y == null ? oi(Ps, "covers.presets") : oi(y, "covers.presets"), T = i.rooms.map((k, F) => js(k, F, { thresholds: u, presets: E })), B = /* @__PURE__ */ new Set();
  for (const k of T)
    B.has(k.name) && O(`room name "${k.name}" is used twice; room names must be unique.`), B.add(k.name);
  return {
    language: t,
    houseModeEntity: e,
    houseModes: h,
    ventilationEntity: n,
    ventilationTimerEntity: o,
    ventilationCo2Target: s,
    ventilationCo2Full: a,
    ventilationSettleMinutes: r,
    sendDelaySeconds: l,
    outside: c,
    thresholds: u,
    trends: b,
    history: x,
    covers: L,
    rooms: T
  };
}
const Hn = Jt;
function qe(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Un(i, t, e) {
  const n = i?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const r = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return r === "manual" && e !== void 0 && e <= Hn ? "off" : r;
}
const Et = 36e5;
function Bs(i) {
  if (i == null)
    return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
function Vs(i, t) {
  const e = {};
  for (const [n, o] of Object.entries(i ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((a, r) => {
      const l = a.s ?? a.state, d = Bs(a.lu ?? a.last_updated ?? a.lc ?? a.last_changed) ?? (r === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((a, r) => a.time - r.time), e[n] = s;
  }
  return e;
}
async function he(i, t, e, n) {
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
  return Vs(o, e);
}
function Qt(i, t) {
  let e;
  for (const n of i ?? []) {
    if (n.time > t)
      break;
    e = n.state;
  }
  return e;
}
function si(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function Ws(i, t, e, n) {
  const o = (e - t) / n, s = (i ?? []).filter((a) => si(a.state) !== void 0);
  return Array.from(
    { length: n },
    (a, r) => si(Qt(s, t + (r + 1) * o))
  );
}
function ce(i, t, e, n = !1) {
  const o = [];
  for (const a of i ?? []) {
    const r = si(a.state);
    r !== void 0 && !(n && r === 0) && a.time <= e && o.push({ t: Math.max(a.time, t), v: r });
  }
  const s = o[o.length - 1];
  return s && s.t < e && o.push({ t: e, v: s.v }), o;
}
function Lt(i, t, e, n) {
  const o = /* @__PURE__ */ new Set([t, e]);
  for (const r of i)
    for (const l of r ?? [])
      l.time > t && l.time < e && o.add(l.time);
  const s = [...o].sort((r, l) => r - l), a = [];
  for (let r = 0; r < s.length - 1; r += 1) {
    const l = n(i.map((h) => Qt(h, s[r])));
    if (l === void 0)
      continue;
    const d = a[a.length - 1];
    d && d.value === l && d.end === s[r] ? d.end = s[r + 1] : a.push({ start: s[r], end: s[r + 1], value: l });
  }
  return a;
}
function Ke(i, t) {
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const a of i)
    for (const r of a ?? [])
      r !== void 0 && Number.isFinite(r) && (e = Math.min(e, r), n = Math.max(n, r));
  if (!Number.isFinite(e) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(e / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function qs(i, t) {
  const e = t.max - t.min;
  return i.map(
    (n) => n === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / e))
  );
}
function pe(i, t = 5 * 6e4, e = 720) {
  if (i.length < 2)
    return i;
  const n = 6e4, o = i[0].t, s = i[i.length - 1].t, a = Math.max(2, Math.floor((s - o) / n) + 1), r = [];
  let l = 0;
  for (let m = 0; m < a; m += 1) {
    const x = m === a - 1 ? s : o + m * n;
    for (; l + 1 < i.length && i[l + 1].t <= x; )
      l += 1;
    r.push(i[l].v);
  }
  const d = Math.max(0, Math.floor(t / n / 2)), h = [0];
  for (const m of r)
    h.push(h[h.length - 1] + m);
  const c = Math.max(1, Math.ceil(a / e)), u = [];
  for (let m = 0; m < a - 1; m += c)
    u.push(m);
  return u.push(a - 1), u.map((m) => {
    const x = Math.max(0, m - d), $ = Math.min(a - 1, m + d);
    return { t: m === a - 1 ? s : o + m * n, v: (h[$ + 1] - h[x]) / ($ - x + 1) };
  });
}
function Ks() {
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
  ].map(([t, e, n]) => _`<circle cx=${t} cy=${e} r=${n}></circle>`)}
    </svg>
  `;
}
function vn(i) {
  const t = (o, s, a, r) => _`<rect x=${o} y=${s} width=${a} height=${r} rx=${r / 2 > 1.2 ? 1.2 : r / 2} fill="currentColor" stroke="none"></rect>`, e = (o) => _`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (i) {
    case "open":
      n = _`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      n = _`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      n = _`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
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
function Ys() {
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
function Bn(i, t) {
  return _`${[0, 1, 2].map(
    (e) => _`<path
      d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${e < i ? v.warning : v.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : f}
    ></path>`
  )}`;
}
function ye(i, t) {
  return p`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Bn(i, t)}
    </svg>
  `;
}
function ai(i) {
  let t;
  const e = _`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = _`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (i) {
    case "cool":
    case "wind_free":
      t = _`${e}
        <g transform="rotate(60 12 12)">${e}</g>
        <g transform="rotate(120 12 12)">${e}</g>`;
      break;
    case "dry":
      t = _`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = _`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
      break;
    case "heat":
      t = _`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (o) => _`<path d="M12 3v2.5" transform=${`rotate(${45 * o} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      t = _`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      t = _`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return t;
}
function xe(i, t, e) {
  return p`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${e ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${ai(i)}
    </svg>
  `;
}
function Vn() {
  return _`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function Ye(i, t) {
  return p`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${i}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Vn()}
    </svg>
  `;
}
function Gs(i) {
  let t;
  switch (i) {
    case "off":
      t = _`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = _`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = _`<path d="M4 8h7.5M16.5 8H20M4 16h3.5M12.5 16H20"></path>
        <circle cx="14" cy="8" r="2.5"></circle><circle cx="10" cy="16" r="2.5"></circle>`;
      break;
    default:
      t = _`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const ri = " ", lt = 4, Xs = 44, ut = 6, at = 180, rt = ut + at, ue = 10, Wn = rt + 10, ke = 14, bn = 14, Zs = 3, qn = 14, Js = 7;
function Qs(i, t, e) {
  if (t === "temperature") {
    const o = e ? ["climate", "heating"] : ["heating", "climate"];
    return i.windows ? [...o, "windows"] : o;
  }
  const n = [];
  return i.ventilation && n.push("ventilation"), i.windows && n.push("windows"), n;
}
const Kn = (i) => i === 0 ? rt : Wn + i * ke, ta = (i = 0) => Kn(Math.max(i, Zs)) + qn + Js, Ge = 12, ea = [0, 0.24, 0.44, 0.68], ia = "history-under-temperature", na = "history-plot", oa = "history-curve", Yn = {
  schedule: v.plan,
  manual: v.warning,
  off: v.closed
}, sa = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: v.warning,
  off: v.closed
}, J = (i) => `fill: ${i}`, Q = (i) => `stroke: ${i}`;
function Xe(i, t, e) {
  return Un(t, i, e);
}
function me(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
const Mi = 0.05;
function aa(i, t) {
  const e = i.filter((r) => Number.isFinite(r));
  let n = 19, o = 23;
  if (e.length > 0) {
    if (n = Math.min(...e), o = Math.max(...e), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const r = (o - n) * Mi;
    n -= r, o += r;
  }
  const s = o - n, a = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: a };
}
function ra(i, t, e) {
  const n = [], o = e / 1e3;
  for (let s = Math.ceil(i / e - o) * e; s <= t + o; s += e)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function la(i, t, e, n, o) {
  const s = (C) => C ? i[C] : void 0, { startMs: a, endMs: r } = e, l = s(t.heating?.overlay), d = s(t.heating?.climate), h = pe(ce(s(t.temperature), a, r, !0)), c = pe(ce(s(t.humidity), a, r, !0)), u = Lt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([C, M, H]) => Xe(C, M, me(H))
  ), b = Lt(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    a,
    r,
    ([C, M, H, N]) => {
      const V = Xe(C, M, me(N)), nt = Dn(me(H), t.thresholds);
      return V === void 0 || V === "off" || nt === 0 ? void 0 : String(nt);
    }
  ), m = Lt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([C, M, H]) => {
      const N = me(H), V = Xe(C, M, N);
      if (!(N === void 0 || N <= Hn))
        return V === "schedule" || V === "manual" ? String(N) : void 0;
    }
  ), x = t.windows.length > 0 ? Lt(
    t.windows.map((C) => s(C.entity)),
    a,
    r,
    (C) => C.some((M) => M?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, $ = o ? Lt([s(o)], a, r, ([C]) => C?.toLowerCase() === "on" ? "on" : void 0) : void 0, y = pe(ce(s(t.carbon_dioxide), a, r, !0)), S = pe(ce(s(t.pm25), a, r)), L = Lt([s(t.air_conditioner)], a, r, ([C]) => {
    const M = ws(C);
    return M === "unknown" ? void 0 : M;
  }), E = h.map((C) => C.v), { min: T, max: B, step: k } = aa(
    E.length > 0 ? E : m.map((C) => Number(C.value)),
    n.min_temperature_span
  ), F = c.map((C) => C.v);
  return {
    range: e,
    temperature: h,
    humidity: c,
    heating: u,
    intensity: b,
    target: m,
    climate: L,
    windows: x,
    co2: y,
    pm25: S,
    ventilation: $,
    limits: {
      co2: { warning: t.thresholds.co2_warning, critical: t.thresholds.co2_critical },
      pm25: { warning: t.thresholds.pm25_warning, critical: t.thresholds.pm25_critical }
    },
    comfort: {
      winter: { min: t.thresholds.winter_min, max: t.thresholds.winter_max },
      summer: { min: t.thresholds.summer_min, max: t.thresholds.summer_max }
    },
    tempMin: T,
    tempMax: B,
    tempStep: k,
    humidityMin: F.length > 0 ? Math.min(...F) : void 0,
    humidityMax: F.length > 0 ? Math.max(...F) : void 0
  };
}
function Ze(i, t = "temperature") {
  return t === "co2" ? i.co2.length > 0 : t === "pm25" ? i.pm25.length > 0 : i.temperature.length > 0 || i.humidity.length > 0 || i.heating.length > 0;
}
function da(i, t) {
  const e = i.filter((l) => Number.isFinite(l)), n = 400, o = t === "pm25" ? 0 : Math.min(n, e.length > 0 ? Math.floor(Math.min(...e) / 100) * 100 : n), s = t === "co2" ? 400 : 10, a = e.length > 0 ? Math.max(...e) : o + s, r = Math.max(a, o + s);
  return { min: o, max: r + (r - o) * Mi };
}
function ha(i, t, e, n) {
  const o = e === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - i) / Math.max(2, n), a = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], r = [];
  for (let l = Math.ceil(i / a - 1e-9) * a; l <= t + 1e-9; l += a)
    r.push(l);
  return r;
}
function _t(i) {
  return i - lt - Xs;
}
function ca(i, t, e) {
  return lt + (i - t.startMs) / (t.endMs - t.startMs) * _t(e);
}
function pa(i, t, e) {
  const n = Math.min(1, Math.max(0, (i - lt) / _t(t)));
  return e.startMs + n * (e.endMs - e.startMs);
}
function te(i, t) {
  let e;
  for (const n of i) {
    if (n.t > t)
      break;
    e = n.v;
  }
  return e;
}
function fe(i, t, e) {
  return i.find(
    (n) => n.start <= t && (t < n.end || t === e && n.end === e)
  )?.value;
}
const $n = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function Ti(i) {
  const t = (i.endMs - i.startMs) / Et;
  let e = $n[0], n = 1 / 0;
  for (const o of $n) {
    const s = t / o, r = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    r < n && (n = r, e = o);
  }
  return e;
}
function ua(i) {
  const t = Ti(i), e = [], n = new Date(i.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < i.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= i.endMs; )
    n.getTime() >= i.startMs && e.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return e;
}
function ma(i, t) {
  return { x: Math.max(i, t + 9), anchor: "middle" };
}
function fa(i) {
  return i === "off" ? Yn.off : Si[i] ?? v.off;
}
function ga(i, t, e) {
  const n = new Date(i).getHours() === 0;
  return Ti(t) >= 24 || n && t.endMs - t.startMs > 36 * Et ? e.day(i) : e.hour(i).replace(/^(\d{1,2}):00$/, "$1");
}
function Gn(i, t, e) {
  const { t: n } = e;
  if (t === void 0)
    return n.chart.now;
  const o = (r) => {
    const l = new Date(r);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(i.range.endMs) - o(t)) / (24 * Et));
  return `${s === 0 ? "" : s === 1 ? `${n.chart.yesterday} ` : `${e.day(t)} `}${e.time(t)}`;
}
function Xn(i, t) {
  return i === void 0 ? v.label : i >= t.critical ? v.alertOnPopup : i >= t.warning ? v.warning : v.white;
}
function va(i, t, e) {
  const { t: n } = e, o = t ?? i.range.endMs, s = te(i.temperature, o), a = te(i.humidity, o), r = fe(i.heating, o, i.range.endMs), l = Number(fe(i.intensity, o, i.range.endMs) ?? 0), d = fe(i.target, o, i.range.endMs), h = fe(i.climate, o, i.range.endMs), c = Gn(i, t, e), u = r === void 0 ? "––" : `${n.heatingMode[r]}${r !== "off" && d !== void 0 ? ` · ${e.half(Number(d))} °C` : ""}`, b = h ? n.climateMode[h] : "––", m = h ? Si[h] : v.off;
  return p`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : p`${e.one(s)}<span class="readout-unit">${ri}°C</span>`}</span
          >
          ${a === void 0 ? f : p`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${n.required.humidity} </span>${e.percent(Math.round(a))}</span
              >`}
        </span>
        <span class="readout-time">${c}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r === "off" ? v.off : r ? Yn[r] : v.label}`}>
          <span class="readout-icon">${ye(r && r !== "off" ? l : 0, r === void 0)}</span>
          ${n.system.heating} ${ze(u)}
        </span>
        <span class="readout-system" style=${`color: ${m}`}>
          <span class="readout-icon">${xe(h ?? "off", m, h === void 0)}</span>
          ${n.system.climate} ${b}
        </span>
      </div>
    </div>
  `;
}
function ba(i, t, e, n, o) {
  const s = e ?? i.range.endMs, a = e === void 0 && o !== void 0, r = a ? o.value : te(i[t], s), l = t === "co2" && i.pm25.length > 0 ? a && o.secondary ? o.secondary.value : te(i.pm25, s) : void 0, d = a && o.secondary?.stale === !0, h = i.limits[t], c = t === "co2" ? "ppm" : "µg/m³";
  return p`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${a && o.stale ? v.label : Xn(r, h)}`}
            >${r === void 0 ? "––" : p`${n.whole(r)}<span class="readout-unit">${ri}${c}</span>`}</span
          >
          ${t === "co2" && i.pm25.length > 0 ? p`<span class="readout-hum pm25" style=${d ? `color: ${v.label}` : f}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : p`${n.whole(l)}${ri}µg/m³`}</span
              >` : f}
        </span>
        <span class="readout-time">${Gn(i, e, n)}</span>
      </div>
    </div>
  `;
}
function $a(i, t, e, n, o, s = !1, a) {
  const { range: r } = i, l = t === "temperature" ? void 0 : t, d = (g) => ca(g, r, e), h = l ? i[l] : i.temperature, c = l ? i.limits[l] : void 0, u = l ? da(h.map((g) => g.v), l) : { min: i.tempMin, max: i.tempMax }, b = h.length > 0 ? Math.max(...h.map((g) => g.v)) : -1 / 0, m = (g) => rt - (g - u.min) / (u.max - u.min) * at, x = (i.humidityMin ?? 0) - 3, $ = Math.max((i.humidityMax ?? 100) + 3, x + 12), y = (g) => rt - (g - x) / ($ - x) * at, S = lt + _t(e), L = l ? "-air" : "", E = `${ia}${L}`, T = `${na}${L}`, B = `${oa}${L}`, k = (g, A) => g.map((P, I) => `${I === 0 ? "M" : "L"}${d(P.t).toFixed(1)} ${A(P.v).toFixed(1)}`).join(" "), F = k(h, m), C = h[0], M = h[h.length - 1], H = C && M ? `${F} L${d(M.t).toFixed(1)} ${rt} L${d(C.t).toFixed(1)} ${rt} Z` : "";
  let N = "", V = "";
  l || i.target.forEach((g, A) => {
    const P = m(Number(g.value)).toFixed(1), I = i.target[A - 1], G = i.target[A + 1], Ht = I !== void 0 && I.end === g.start;
    N += Ht ? ` L${d(g.start).toFixed(1)} ${P}` : ` M${d(g.start).toFixed(1)} ${P}`, N += ` L${d(g.end).toFixed(1)} ${P}`, V += Ht ? ` L${d(g.start).toFixed(1)} ${P}` : ` M${d(g.start).toFixed(1)} ${rt} L${d(g.start).toFixed(1)} ${P}`, V += ` L${d(g.end).toFixed(1)} ${P}`, (!G || G.start !== g.end) && (V += ` L${d(g.end).toFixed(1)} ${rt} Z`);
  });
  const nt = _t(e) / Math.max(1, (r.endMs - r.startMs) / Et / Ti(r)), ft = Math.max(2, Math.round(at / nt)), It = (u.max - u.min) / ft, R = [0.5, 1, 2, 5, 10].find((g) => g >= It * 0.8) ?? 10, yt = l ? ha(u.min, u.max, l, ft) : ra(u.min, u.max, R), gt = (g) => l ? o.whole(g) : `${o.tick(g)}°`, ie = c ? [
    { value: c.warning, color: v.warning },
    { value: c.critical, color: v.alertOnPopup }
  ].filter((g) => g.value > u.min && g.value <= b) : [], ne = (g) => Math.min(1, Math.max(0, (m(g) - ut) / at)), Pt = [];
  if (c && ie.length > 0) {
    const g = ie.some((I) => I.value === c.critical), A = ne(c.critical), P = ne(c.warning);
    g && Pt.push([0, v.alertOnPopup], [A, v.alertOnPopup]), Pt.push([g ? A : 0, v.warning], [P, v.warning], [P, v.white], [1, v.white]);
  }
  const oe = s ? i.comfort.summer : i.comfort.winter;
  if (!l) {
    const g = ne(oe.max), A = ne(oe.min);
    Pt.push([0, v.warning], [g, v.warning], [g, v.white], [A, v.white], [A, v.sky], [1, v.sky]);
  }
  const Qn = (g) => c ? Xn(g, c) : g > oe.max ? v.warning : g < oe.min ? v.sky : v.white, Di = (g, A, P) => g.map((I) => {
    const G = d(I.start);
    return _`<rect x=${G.toFixed(1)} y=${A} width=${Math.max(d(I.end) - G, 0.8).toFixed(1)}
        height=${ue} rx="2" style=${J(P(I.value))}></rect>`;
  }), De = Qs(i, t, s), Fe = Kn(De.length), to = Fe + qn, Fi = ta(De.length), eo = (g) => g === "heating" ? _`${Bn(3, !1)}` : g === "climate" ? _`<g style=${Q(v.off)}>${ai("off")}</g>` : g === "ventilation" ? _`<g style=${Q(v.fresh)}>${ai("fan")}</g>` : _`<g style=${Q("var(--kd-sky)")}>${Vn()}</g>`, Ii = (g, A, P, I, G) => g.map((Ht) => {
    const Vi = d(Ht.start);
    return _`<rect class=${I} x=${Vi.toFixed(1)} y=${A} width=${Math.max(d(Ht.end) - Vi, G).toFixed(1)}
        height=${ue} rx="2" style=${J(P)}></rect>`;
  }), io = (g, A) => g === "heating" ? _`${Di(i.heating, A, (P) => sa[P] ?? v.off)}` : g === "climate" ? _`${Di(i.climate, A, (P) => fa(P))}` : g === "ventilation" ? _`${Ii(i.ventilation ?? [], A, v.fresh, "ventilation-on", 1.5)}` : _`${Ii(i.windows ?? [], A, "var(--kd-sky)", "window-open", 1.5)}`, se = n === void 0 ? void 0 : d(n), Ie = n === void 0 ? void 0 : te(h, n), ji = (g, A, P, I) => (g ?? []).map(
    (G) => _`<rect class=${P} x=${d(G.start).toFixed(1)} y=${ut}
        width=${Math.max(d(G.end) - d(G.start), 2).toFixed(1)} height=${at}
        style=${`${J(A)}; opacity: var(${I})`}></rect>`
  ), Hi = (g) => Qn(g), no = Math.max(...i.pm25.map((g) => g.v), 0), oo = Math.max(no * (1 + Mi), i.limits.pm25.critical), so = (g) => rt - g / oo * at, Ui = l === "co2" && i.pm25.length > 0 ? k(i.pm25, so) : "", ao = (g) => [...g].reduce((A, P) => A + (/\d/.test(P) ? 6.7 : 3.6), 0), jt = ua(r).map((g) => {
    const A = ga(g, r, o), P = ma(d(g), lt), I = ao(A), G = P.x - I / 2;
    return { x: d(g), text: A, anchored: P, left: G, right: G + I, show: !1 };
  });
  let Bi = 1 / 0;
  for (let g = jt.length - 1; g >= 0; g--)
    jt[g].right <= Bi + 2 && (jt[g].show = !0, Bi = jt[g].left);
  return p`
    ${l ? ba(i, l, n, o, a) : va(i, n, o)}
    <svg
      class="chart"
      viewBox="0 0 ${e} ${Fi}"
      width=${e}
      height=${Fi}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${E}><path d=${H}></path></clipPath>
        <clipPath id=${T}>
          <rect x=${lt} y=${ut} width=${_t(e)} height=${at} rx="8"></rect>
        </clipPath>
        ${Pt.length > 0 ? _`<linearGradient id=${B} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${ut} y2=${rt}>
              ${Pt.map(
    ([g, A]) => _`<stop offset=${`${(g * 100).toFixed(2)}%`} style=${`stop-color: ${A}`}></stop>`
  )}
            </linearGradient>` : f}
      </defs>
      <rect x=${lt} y=${ut} width=${_t(e)} height=${at} rx="8" style=${J("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${T})`}>
        ${V ? _`<path class="target-area" d=${V} style=${`${J(v.plan)}; opacity: var(--kd-target-area)`}></path>` : f}
        ${ji(i.windows, "var(--kd-sky)", "window-band", "--kd-band-window")}
        ${l ? ji(i.ventilation, v.fresh, "ventilation-band", "--kd-band-ventilation") : f}
      </g>
      ${yt.map((g) => {
    const A = m(g), P = ie.some((I) => Math.abs(m(I.value) - A) < 14);
    return _`<line x1=${lt} x2=${S} y1=${A.toFixed(1)} y2=${A.toFixed(1)}
            style=${Q("var(--kd-grid)")} stroke-width="1"></line>
          ${P ? f : _`<text x=${S + 6} y=${(A + 4).toFixed(1)} style=${J(v.label)} font-size=${Ge}>${gt(g)}</text>`}`;
  })}
      ${ie.map(
    (g) => _`<line class="limit-line" x1=${lt} x2=${S} y1=${m(g.value).toFixed(1)} y2=${m(g.value).toFixed(1)}
            style=${Q(g.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${S + 6} y=${(m(g.value) + 4).toFixed(1)} style=${J(g.color)} font-size=${Ge}
            font-weight="600">${gt(g.value)}</text>`
  )}
      <g clip-path=${`url(#${T})`}>
        ${H && l ? _`<path d=${H} style=${J("var(--kd-area)")}></path>` : f}
      </g>
      ${l ? f : _`<g clip-path=${`url(#${E})`}>
        ${i.intensity.map(
    (g) => _`<rect x=${d(g.start).toFixed(1)} y=${ut}
            width=${Math.max(d(g.end) - d(g.start), 0.8).toFixed(1)} height=${at}
            style=${J(v.warning)} opacity=${ea[Number(g.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${Ui ? _`<path class="pm25-line" d=${Ui} fill="none" style=${Q(v.pm25)}
            stroke-width="1.5" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${T})`}></path>` : f}
      ${!l && i.humidity.length > 0 ? _`<path class="humidity-line" d=${k(i.humidity, y)} fill="none" style=${Q(v.humidityLine)}
            stroke-width="1.5" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${T})`}></path>` : f}
      ${N ? _`<path class="target-line" d=${N} fill="none" style=${Q(v.plan)} stroke-width="1"
            opacity="0.5" clip-path=${`url(#${T})`}></path>` : f}
      ${F ? _`<path class="temperature-curve" d=${F} fill="none"
            style=${Q(Pt.length > 0 ? `url(#${B})` : v.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${T})`}></path>` : f}
      ${M && n === void 0 ? _`<circle class="end-dot" cx=${d(M.t).toFixed(1)} cy=${m(M.v).toFixed(1)} r="4"
            style=${`${J(Hi(M.v))}; ${Q("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : f}

      ${De.map((g, A) => {
    const P = Wn + A * ke, I = P + (ke - ue) / 2;
    return _`<g class=${`strip-row ${g}`}>
          <rect x=${lt} y=${I} width=${_t(e)} height=${ue} rx="2" style=${J("var(--kd-fill)")}></rect>
          ${io(g, I)}
          <g class="strip-icon" transform=${`translate(${S + 6} ${P + (ke - bn) / 2}) scale(${bn / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${eo(g)}</g>
        </g>`;
  })}

      ${jt.map(
    (g) => _`<line x1=${g.x.toFixed(1)} x2=${g.x.toFixed(1)} y1=${ut} y2=${Fe}
            style=${Q("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${g.show ? _`<text class="tick" x=${g.anchored.x.toFixed(1)} y=${to} style=${J(v.label)} font-size=${Ge}
                text-anchor=${g.anchored.anchor}>${g.text}</text>` : f}`
  )}
      ${se === void 0 ? f : _`<line x1=${se.toFixed(1)} x2=${se.toFixed(1)} y1=${ut} y2=${Fe}
              style=${Q(v.white)} stroke-width="1" opacity="0.7"></line>
            ${Ie === void 0 ? f : _`<circle cx=${se.toFixed(1)} cy=${m(Ie).toFixed(1)} r="4"
                  style=${`${J(Hi(Ie))}; ${Q("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const wn = Et / 4;
function wa(i) {
  let t, e;
  for (const n of i ?? []) {
    const o = n.state.toLowerCase();
    o === "on" && !t ? (t = { start: n.time }, e = t) : o === "off" && t && (t.end = n.time, t = void 0);
  }
  return e;
}
function ya(i, t, e) {
  return Qt(i, t)?.toLowerCase() === "on" ? !0 : (i ?? []).some((n) => n.time > t && n.time <= e && n.state.toLowerCase() === "on");
}
function ge(i) {
  if (i === void 0)
    return;
  const t = Number.parseFloat(i);
  return Number.isFinite(t) ? t : void 0;
}
function Je(i, t) {
  return i === void 0 || t === void 0 || t < 0 || t > 100 || i <= -243.12 ? void 0 : 216.7 * (t / 100 * 6.112 * Math.exp(17.62 * i / (243.12 + i))) / (273.15 + i);
}
function xa(i, t, e, n) {
  const o = t <= e;
  return t <= n || i <= n && o ? { done: 1, closable: o } : i <= n ? { done: 0, closable: o } : { done: Math.min(0.99, Math.max(0, (i - t) / (i - n))), closable: o };
}
const ka = 168 * 36e5;
function Zn(i) {
  if (i == null) return;
  const t = typeof i == "number" ? i < 1e11 ? i * 1e3 : i : Date.parse(i);
  return Number.isFinite(t) ? t : void 0;
}
function _a(i) {
  let t;
  for (const e of i ?? []) {
    const n = e.s ?? e.state, o = Zn(e.lu ?? e.last_updated);
    n === void 0 || o === void 0 || n === "unavailable" || n === "unknown" || n === "" || (t === void 0 || t.state !== n) && (t = { state: n, start: o });
  }
  return t;
}
class Sa {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const n = dn(t, e);
    if (!t || !e || !n) return;
    const o = Zn(n.last_changed), s = `${n.state}|${n.last_changed ?? ""}`, a = this.known.get(e);
    return a?.key === s ? a.start === void 0 ? o : Math.min(a.start, o ?? a.start) : (this.hass = t, this.wanted.get(e) !== s && this.pending.get(e) !== s && (this.wanted.set(e, s), this.schedule()), o);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [s, a] of e) this.pending.set(s, a);
    const n = this.now();
    let o;
    try {
      o = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(n - ka).toISOString(),
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
    for (const [s, a] of e) {
      if (this.pending.get(s) === a && this.pending.delete(s), this.wanted.has(s)) continue;
      const r = _a(o?.[s]), l = dn(this.hass, s)?.state;
      this.known.set(s, { key: a, start: r && r.state === l ? r.start : void 0 });
    }
    this.onChange();
  }
}
function Ce(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function Ci(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Ma(i, t) {
  return i === "auto" ? Ci(Ce(t)) : i;
}
function Ta() {
  return Ci(document.documentElement.lang || navigator.language || "");
}
const yn = /* @__PURE__ */ new WeakMap(), Ca = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Aa = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Ea = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Qe(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Oa(i, t, e) {
  const n = Ce(e).replace("_", "-"), o = n !== "" && Ci(n) === t ? n : Ca[t], s = Qe(e, "number_format"), a = Qe(e, "time_format"), r = Qe(e, "date_format"), l = [t, o, s, a, r].join("|");
  let d = yn.get(i);
  d || (d = /* @__PURE__ */ new Map(), yn.set(i, d));
  let h = d.get(l);
  return h || (h = za(i[t], t, o, s, a, r), d.set(l, h)), h;
}
function Pa(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function La(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function za(i, t, e, n, o, s) {
  const a = Pa(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : Ea[n] ?? a, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = La(o, a), m = b ? "h12" : "h23", x = new Intl.DateTimeFormat(a, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), $ = new Intl.DateTimeFormat(a, b ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), y = s === "system" ? void 0 : a, S = new Intl.DateTimeFormat(y, { day: "numeric", month: "numeric" }), L = (T) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return S.format(T);
    const B = S.formatToParts(T), k = B.find((N) => N.type === "literal")?.value ?? "/", F = B[B.length - 1], C = F?.type === "literal" ? F.value : "", M = B.find((N) => N.type === "day")?.value ?? "", H = B.find((N) => N.type === "month")?.value ?? "";
    return s === "DMY" ? `${M}${k}${H}${C}` : `${H}${k}${M}${C}`;
  }, E = Aa.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: i,
    one: (T) => d.format(T),
    two: (T) => h.format(T),
    half: (T) => c.format(Math.round(T * 2) / 2),
    tick: (T) => c.format(T),
    whole: (T) => u.format(T),
    percent: (T) => `${T}${E}%`,
    time: (T) => x.format(T),
    hour: (T) => $.format(T),
    day: L
  };
}
const kt = (i, t, e, n) => i === 1 ? t : i >= 2 && i <= 4 ? e : n, Na = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    title: "Venku",
    temperature: "Teplota",
    weather: "Počasí",
    humidity: "Vlhkost",
    today: "Dnes",
    rain: "Déšť",
    air: "Vzduch venku",
    spoken: "Otevře počasí venku."
  },
  /** The states of a weather entity of Home Assistant in words. */
  weatherState: { "clear-night": "Jasno", cloudy: "Zataženo", exceptional: "Mimořádné", fog: "Mlha", hail: "Kroupy", lightning: "Bouřka", "lightning-rainy": "Bouřka s deštěm", partlycloudy: "Polojasno", pouring: "Lijavec", rainy: "Déšť", snowy: "Sněžení", "snowy-rainy": "Déšť se sněhem", sunny: "Slunečno", windy: "Větrno", "windy-variant": "Větrno, oblačno" },
  airLevel: { good: "dobrý", moderate: "zhoršený", poor: "špatný" },
  summary: "Souhrn domu",
  // Room card: temperature, humidity, link (Room Card)
  temperatureLabel: (i, t, e, n) => `${i}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${e}, historie místnosti za ${n}`,
  humidityLabel: (i, t, e) => `${i}: vlhkost ${t ?? "neznámá"}${e}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (i, t, e, n) => `${i}: teplota za ${t}${e ? ` ${e}` : ""}, historie místnosti za ${n}`,
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
    offFor: "Vypnuto platí",
    manualForChoices: { next: "Do plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (i) => `Do ${i}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    offUntilNextPlan: "Vypnuto do další změny plánu, potom zpět na plán.",
    offUntilTime: (i) => `Vypnuto do ${i}, potom zpět na plán.`,
    offUntilChanged: "Vypnuto, dokud ho nezapneš.",
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
    /** Room detail: the switch of the period of its charts and what the rows under them are called. */
    period: "Období",
    hoursShort: (i) => `${i} h`,
    week: "7 dní",
    openDetail: "Otevře detail místnosti.",
    cover: "Žaluzie",
    coverPosition: "Poloha",
    coverTilt: "Lamely",
    coverDown: "Dole",
    coverUp: "Nahoře",
    coverShut: "Zavřené",
    coverOpened: "Otevřené",
    coverPreset: "Předvolba",
    coverCustom: "Vlastní poloha",
    linkPage: "Stránka místnosti",
    linkWeb: "Odkaz",
    hvac: "Topení a klimatizace",
    close: "Zavřít",
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
    rooms: (i) => `${i} ${kt(i, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (i) => `${i} ${kt(i, "okno otevřené", "okna otevřená", "oken otevřených")}`,
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
    start: "Spustit větrání",
    starting: "Spouští se…",
    off: "Vypnuto",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (i) => `naposledy ${i}`,
    until: (i) => `do ${i}`,
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
    minute: (i) => `${i} ${kt(i, "minuta", "minuty", "minut")}`,
    hour: (i) => `${i} ${kt(i, "hodina", "hodiny", "hodin")}`,
    day: (i) => `${i} ${kt(i, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (i) => `${i} ${kt(i, "minutu", "minuty", "minut")}`,
    hour: (i) => `${i} ${kt(i, "hodinu", "hodiny", "hodin")}`
  }
}, Vt = (i, t, e) => i === 1 ? t : e, Ra = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    title: "Outside",
    temperature: "Temperature",
    weather: "Weather",
    humidity: "Humidity",
    today: "Today",
    rain: "Rain",
    air: "Outdoor air",
    spoken: "Opens the weather outside."
  },
  /** The states of a weather entity of Home Assistant in words. */
  weatherState: { "clear-night": "Clear", cloudy: "Cloudy", exceptional: "Exceptional", fog: "Fog", hail: "Hail", lightning: "Thunderstorm", "lightning-rainy": "Thunderstorm with rain", partlycloudy: "Partly cloudy", pouring: "Pouring", rainy: "Rain", snowy: "Snow", "snowy-rainy": "Sleet", sunny: "Sunny", windy: "Windy", "windy-variant": "Windy, cloudy" },
  airLevel: { good: "good", moderate: "moderate", poor: "poor" },
  summary: "Home summary",
  temperatureLabel: (i, t, e, n) => `${i}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${e}, room history for ${n}`,
  humidityLabel: (i, t, e) => `${i}: humidity ${t ?? "unknown"}${e}, details and history`,
  temperatureTrendLabel: (i, t, e, n) => `${i}: temperature${e ? ` ${e}` : ""} over ${t}, room history for ${n}`,
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
    offFor: "Off holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (i) => `Until ${i}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    offUntilNextPlan: "Off until the next change of the schedule, then back to the schedule.",
    offUntilTime: (i) => `Off until ${i}, then back to the schedule.`,
    offUntilChanged: "Off until you turn it on.",
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
    /** Room detail: the switch of the period of its charts and what the rows under them are called. */
    period: "Period",
    hoursShort: (i) => `${i} h`,
    week: "7 days",
    openDetail: "Opens the room detail.",
    cover: "Blind",
    coverPosition: "Position",
    coverTilt: "Slats",
    coverDown: "Down",
    coverUp: "Up",
    coverShut: "Closed",
    coverOpened: "Open",
    coverPreset: "Preset",
    coverCustom: "Custom position",
    linkPage: "Room page",
    linkWeb: "Link",
    hvac: "Heating and air conditioning",
    close: "Close",
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
    start: "Start ventilation",
    starting: "Starting…",
    off: "Off",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (i) => `last ${i}`,
    until: (i) => `until ${i}`,
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
}, ve = (i, t, e) => i === 1 ? t : e, Da = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    title: "Ute",
    temperature: "Temperatur",
    weather: "Väder",
    humidity: "Luftfuktighet",
    today: "I dag",
    rain: "Regn",
    air: "Utomhusluft",
    spoken: "Öppnar vädret ute."
  },
  /** The states of a weather entity of Home Assistant in words. */
  weatherState: { "clear-night": "Klart", cloudy: "Molnigt", exceptional: "Exceptionellt", fog: "Dimma", hail: "Hagel", lightning: "Åska", "lightning-rainy": "Åska med regn", partlycloudy: "Halvklart", pouring: "Skyfall", rainy: "Regn", snowy: "Snö", "snowy-rainy": "Snöblandat regn", sunny: "Soligt", windy: "Blåsigt", "windy-variant": "Blåsigt, molnigt" },
  airLevel: { good: "bra", moderate: "måttlig", poor: "dålig" },
  summary: "Sammanfattning av hemmet",
  temperatureLabel: (i, t, e, n) => `${i}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${e}, rumshistorik för ${n}`,
  humidityLabel: (i, t, e) => `${i}: luftfuktighet ${t ?? "okänd"}${e}, detaljer och historik`,
  temperatureTrendLabel: (i, t, e, n) => `${i}: temperaturen${e ? ` ${e}` : ""} under ${t}, rumshistorik för ${n}`,
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
    offFor: "Av gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (i) => `Till ${i}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    offUntilNextPlan: "Av till nästa ändring i schemat, sedan tillbaka till schemat.",
    offUntilTime: (i) => `Av till ${i}, sedan tillbaka till schemat.`,
    offUntilChanged: "Av tills du slår på den.",
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
    /** Room detail: the switch of the period of its charts and what the rows under them are called. */
    period: "Period",
    hoursShort: (i) => `${i} h`,
    week: "7 dagar",
    openDetail: "Öppnar rummets detaljer.",
    cover: "Persienn",
    coverPosition: "Läge",
    coverTilt: "Lameller",
    coverDown: "Nere",
    coverUp: "Uppe",
    coverShut: "Stängda",
    coverOpened: "Öppna",
    coverPreset: "Förval",
    coverCustom: "Eget läge",
    linkPage: "Rummets sida",
    linkWeb: "Länk",
    hvac: "Värme och luftkonditionering",
    close: "Stäng",
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
    windowsOpen: (i) => `${i} fönster ${ve(i, "öppet", "öppna")}`,
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
    start: "Starta vädring",
    starting: "Startar…",
    off: "Av",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (i) => `senast ${i}`,
    until: (i) => `till ${i}`,
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
    minute: (i) => `${i} ${ve(i, "minut", "minuter")}`,
    hour: (i) => `${i} ${ve(i, "timme", "timmar")}`,
    day: (i) => `${i} ${ve(i, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (i) => i === 1 ? "den senaste minuten" : `de senaste ${i} minuterna`,
    hour: (i) => i === 1 ? "den senaste timmen" : `de senaste ${i} timmarna`
  }
}, Fa = { cs: Na, en: Ra, sv: Da };
function li(i, t) {
  return Oa(Fa, i, t);
}
const Ia = ot`
    /*
     * Colours (CURRENT_SPEC.md, Barvy): the dark theme is the default set, the light theme
     * overrides it. The card sets data-theme on itself (theme: auto | dark | light), so the
     * popups, which sit outside .dashboard, follow it as well.
     */
    :host {
      display: block;
      color: var(--primary-text-color);
      --kd-text: #ffffff;
      --kd-label: #98989f;
      --kd-off: #8e8e93;
      --kd-neutral: #c7c7cc;
      --kd-plan: #f2f2f7;
      --kd-fresh: #30d158;
      --kd-closed: #6b6b70;
      --kd-warning: #ff9230;
      --kd-alert: #ff4245;
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
      /* Surfaces of the shared language (DASHBOARD_UX_SYSTEM.md, Povrchy): the card draws its page and its flat cards itself. */
      --kd-page: #000000;
      --kd-card-bg: #1c1c1e;
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
      --kd-target-area: 0.12;
      --kd-grid: rgb(255 255 255 / 8%);
      --kd-grid-soft: rgb(255 255 255 / 6%);
      --kd-area: rgb(255 255 255 / 7%);
      --kd-band-window: 0.14;
      --kd-band-ventilation: 0.2;
    }

    /* Light theme: the same meanings, darker tones (text 4.5 : 1, icons and lines 3 : 1 on white). */
    :host([data-theme="light"]) {
      --kd-text: #1c1c1e;
      --kd-label: #5f5f66;
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
      --kd-page: #f2f2f7;
      --kd-card-bg: #ffffff;
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
      --kd-target-area: 0.1;
      --kd-grid: rgb(0 0 0 / 8%);
      --kd-grid-soft: rgb(0 0 0 / 6%);
      --kd-area: rgb(0 0 0 / 5%);
      --kd-band-window: 0.1;
      --kd-band-ventilation: 0.14;
    }

    ha-card {
      overflow: visible;
      border: 0;
      border-radius: 0;
      background: var(--kd-page);
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

    /* The top row (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek): two tiles of the kit, "Venku" and
       "Větrací režim"; the running mode is the fresh green of the card, not the blue of a control. */
    .top-tiles {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      --hdk-tile: var(--kd-card-bg);
      --hdk-tile-text: var(--kd-text);
      --hdk-secondary: var(--kd-label);
      --hdk-tile-border: var(--kd-separator-strong, rgb(84 84 88 / 65%));
      --hdk-accent: var(--kd-sky);
    }
    .top-tiles.single {
      grid-template-columns: minmax(0, 1fr);
    }
    .vent-tile {
      --hdk-tile-on: color-mix(in srgb, var(--kd-fresh) var(--kd-chip-tint), var(--kd-card-bg));
      --hdk-tile-on-text: var(--kd-fresh);
      --hdk-tile-on-sub: var(--kd-fresh);
    }
    :host([data-theme="light"]) .top-tiles {
      --hdk-tile-border: rgb(60 60 67 / 29%);
    }
    .top-tiles + .summary {
      margin-top: 8px;
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
      padding: 14px 16px 16px;
      border-radius: 12px;
      background: var(--kd-card-bg);
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

    /* The head of the room (uživatel 14. 11. 2026: „Q229 B“): the name and the state on the left, the temperature and the
       humidity on the right, in the place the illustration had. */
    .room-head {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      min-height: 48px;
      margin-bottom: 10px;
    }

    .room-id {
      min-width: 0;
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
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.2px;
      line-height: 28px;
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
      inset: -8px 0;
    }

    .room-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .room-chevron {
      flex: none;
      color: var(--kd-label);
      font-size: 22px;
      font-weight: 400;
      line-height: 28px;
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
      justify-content: flex-end;
      gap: 10px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .temperature {
      font-size: 28px;
      font-weight: 500;
      letter-spacing: -0.3px;
      line-height: 34px;
      white-space: nowrap;
    }

    /* Invisible touch target of 44 px in height. */
    .temperature::after {
      content: "";
      position: absolute;
      inset: -5px 0;
    }

    .temperature-unit {
      color: var(--kd-label);
      font-size: 17px;
      font-weight: 400;
      letter-spacing: 0;
    }

    /* Humidity is neutral, except when it decided the room status (inline colour). */
    .humidity {
      position: relative;
      min-width: 44px;
      color: var(--kd-neutral);
      font-size: 17px;
      line-height: 28px;
      text-align: right;
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
      top: -3px;
      right: 0;
      width: 12px;
      height: 12px;
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

    /* The sheet from the bottom of the kit (one look in every card): its colours are the Klima ones. */
    kd-sheet {
      --hdk-sheet-bg: var(--kd-sheet-bg);
      --hdk-sheet-text: var(--kd-text);
      --hdk-sheet-border: var(--kd-sheet-border);
      --hdk-sheet-grabber: var(--kd-grabber);
      --hdk-sheet-backdrop: var(--kd-backdrop);
      --hdk-sheet-button: var(--kd-segmented-bg);
      --hdk-secondary: var(--kd-label);
      --hdk-accent: var(--kd-sky);
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
    kd-climate,
    .history-sheet {
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

    :host([data-theme="light"]) kd-climate,
    :host([data-theme="light"]) .history-sheet {
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

    /* Room detail (CURRENT_SPEC.md, Sjednocení s Energií a Domem): the switch of the period, two charts under each other and
       the rows of the room in the list of the kit. A chart keeps its height while it loads, so the parts under it do not jump. */
    .detail-period {
      display: block;
      margin: 0 0 12px;
    }
    .detail-chart {
      min-height: 290px;
    }
    .detail-chart.double {
      min-height: 588px;
    }
    .detail-chart + .detail-chart {
      margin-top: 8px;
    }
    .detail-list {
      margin-top: 16px;
    }
    .detail-row {
      cursor: pointer;
    }
    .option-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .list-option .option-hint.detail-state {
      font-size: 15px;
      line-height: 20px;
    }
    .detail-list .list-option {
      box-sizing: border-box;
    }
    .detail-cover {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      padding-top: 10px;
      padding-bottom: 14px;
    }
    .detail-cover-head {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .detail-cover .option-icon {
      color: var(--kd-label);
    }
    .detail-presets {
      display: block;
    }
    .detail-slider-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 0 4px 6px;
      font-size: 15px;
      line-height: 20px;
    }
    .detail-slider-value {
      font-size: 17px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
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

    .vent-start {
      background: #0a6ed1;
      color: #ffffff;
      font-weight: 600;
    }
    .vent-end.vent-start:active:not(:disabled) {
      background: #095fb5;
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

    /* Humidity is the thinner blue line of the chart: a sample of that line stands for the missing label. */
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
      border-top: 2px solid currentColor;
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
      .preset.sent svg,
      .preset.failed svg,
      .preset:active,
      .preset.pending,
      .preset-hint,
      .spark.loading,
      .cover-panel.moving .rail {
        animation: none;
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
`, ja = " ";
function xn(i) {
  if (!i || dt(i.state.toLowerCase()))
    return;
  const t = Number.parseFloat(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function di(i, t) {
  return i === void 0 ? "" : `· ${t.half(i)}${ja}°C`;
}
function Ha(i, t, e, n, o, s) {
  const a = s.t.heatingMode, r = i?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || dt(l), h = xn(e), c = Un(r, l, h);
  if (c === "off")
    return { label: a.off, color: v.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || r === void 0 || dt(r))
    return { label: "––", color: v.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const u = Dn(xn(n), o);
  if (c === "schedule")
    return { label: a.schedule, color: v.plan, active: !0, extra: di(h, s), unknown: !1, overlay: "schedule", waves: u };
  if (c === "manual") {
    const b = h === wi ? "boost" : "manual";
    return { label: a.manual, color: v.warning, active: !0, extra: di(h, s), unknown: !1, overlay: "manual", override: b, waves: u };
  }
  return { label: t?.state ?? "––", color: v.warning, active: !0, extra: "", unknown: !1, waves: u };
}
function Ae(i, t) {
  let e = "unknown", n, o;
  if (i && !dt(i.state.toLowerCase())) {
    const a = i.state.toLowerCase(), r = String(i.attributes.preset_mode ?? "none").toLowerCase();
    a === "off" ? e = "off" : a === "cool" ? e = r === "wind_free" ? "wind_free" : "cool" : a === "dry" ? e = "dry" : a === "fan_only" ? e = "fan" : a === "heat" ? e = "heat" : (a === "auto" || a === "heat_cool") && (e = "auto"), e !== "off" && e !== "unknown" && e !== "wind_free" && r !== "none" && r !== "" && (n = $s(r)), o = pt(i.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(e);
  return {
    mode: e,
    label: n ?? t.t.climateMode[e],
    color: Si[e],
    active: e !== "off" && e !== "unknown",
    extra: s ? di(o, t) : "",
    unknown: e === "unknown"
  };
}
function Ua(i, t) {
  const e = i.unknown ? t.t.unknownState : i.label;
  return i.extra ? `${e} ${i.extra.replace(/^·\s*/, "")}` : e;
}
function be(i, t) {
  return i.length <= 2 ? i.join(", ") : t.t.summaryChips.rooms(i.length);
}
function Ee(i, t) {
  return i.windows.filter((e) => t(e.entity)?.state.toLowerCase() === "on");
}
function Oe(i, t, e) {
  return Ha(
    t(i.heating?.climate),
    t(i.heating?.overlay),
    t(i.heating?.target),
    t(i.heating?.intensity),
    i.thresholds,
    e
  );
}
function Jn(i, t, e, n) {
  const o = Ee(i, t).length > 0, s = Oe(i, t, n), a = i.air_conditioner ? Ae(t(i.air_conditioner), n).mode : "unknown", r = !s.unknown && s.waves > 0 || a === "heat", l = a === "cool" || a === "wind_free", d = [];
  return o && r && d.push("window-heating"), o && l ? d.push("window-cooling") : l && e && d.push("cooling-cold"), d;
}
function Ba(i, t, e, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, a = [], r = [], l = [], d = [];
  let h = 0;
  const c = [], u = new Map(i.map((y) => [y.name, In(y, n.language)])), b = (y) => y.map((S) => u.get(S) ?? S);
  for (const y of i) {
    for (const E of Jn(y, t, e.has(y.name), n))
      s[E].push(y.name);
    const S = Ee(y, t).length;
    S > 0 && a.push([y.name, S]);
    const L = Oe(y, t, n);
    L.override === "boost" ? l.push(y.name) : L.override === "manual" && r.push(y.name), L.waves > 0 && (d.push(y.name), h = Math.max(h, L.waves)), y.air_conditioner && Ae(t(y.air_conditioner), n).active && c.push(y.name);
  }
  const m = [], x = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [y, S] of x)
    s[y].length > 0 && m.push({
      kind: S,
      text: `${o.conflict[y]}: ${be(b(s[y]), n)}`,
      color: v.warning,
      spoken: `${o.conflictSpoken[y]}: ${b(s[y]).join(", ")}`
    });
  const $ = a.reduce((y, [, S]) => y + S, 0);
  return $ > 0 && m.push({
    kind: "windows",
    text: o.windowsOpen($),
    color: v.sky,
    spoken: `${o.windowsSpoken}: ${a.map(([y, S]) => S > 1 ? `${u.get(y) ?? y} (${S})` : u.get(y) ?? y).join(", ")}`
  }), r.length > 0 && m.push({
    kind: "manual",
    text: `${o.manual}: ${be(b(r), n)}`,
    color: v.warning,
    spoken: `${o.manualSpoken}: ${b(r).join(", ")}`,
    opens: { system: "heating", rooms: r }
  }), l.length > 0 && m.push({
    kind: "boost",
    text: `${o.boost}: ${be(b(l), n)}`,
    color: v.warning,
    spoken: `${o.boostSpoken}: ${b(l).join(", ")}`,
    opens: { system: "heating", rooms: l }
  }), d.length > 0 && m.push({
    kind: "heating",
    text: o.heating(o.rooms(d.length)),
    color: v.warning,
    spoken: `${o.heatingSpoken}: ${b(d).join(", ")}`,
    waves: h,
    opens: { system: "heating", rooms: d }
  }), c.length > 0 && m.push({
    kind: "climate",
    text: `${o.climate}: ${be(b(c), n)}`,
    color: v.cool,
    spoken: `${o.climateSpoken}: ${b(c).join(", ")}`,
    opens: { system: "climate", rooms: c }
  }), m;
}
var Va = Object.defineProperty, j = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && Va(t, e, o), o;
};
const Wa = 5 * 6e4, qa = 3e4, vt = " ", Ka = 550, kn = 400, Ya = 700, Ga = "(orientation: landscape) and (max-height: 600px)", _n = 168, ti = "custom", Xa = 1600, Za = 5e3, Ri = class Ri extends it {
  constructor() {
    super(...arguments), this._i18n = li("en"), this._starts = new Sa(() => this.requestUpdate()), this._hvacSelected = [], this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._historyHours = 24, this._coverTarget = {}, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new Ne(() => ({ holdMs: Ka, doubleTapMs: kn })), this._movingWatch = /* @__PURE__ */ new Map(), this._joinedWidth = 0, this._fonts = 0, this.handleFonts = () => {
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
      this._scrubTime = pa((t.clientX - o.left) * s / Math.max(o.width, 1), s, e.range);
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
        const a = s + (t.key === "ArrowLeft" ? -wn : wn);
        this._scrubTime = a >= o ? void 0 : Math.max(n, a);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = Hs(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, qa), this._joinedObserver = new ResizeObserver(() => {
      const t = Math.round(this.getBoundingClientRect().width);
      t !== this._joinedWidth && (this._joinedWidth = t, window.requestAnimationFrame(() => this.fitJoined()));
    }), this._joinedObserver.observe(this), document.fonts?.addEventListener("loadingdone", this.handleFonts), this.requestUpdate();
  }
  fitJoined() {
    bi(this.renderRoot, `${this._joinedWidth}|${this._fonts}`);
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
      return e?.themes?.darkMode !== this.hass?.themes?.darkMode || Ce(e) !== Ce(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => e?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(e);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const e = this.theme();
    this.dataset.theme !== e && (this.dataset.theme = e), this._i18n = li(Ma(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
    const n = this.ventilationOn();
    n !== this._ventOn && (this._ventOn = n, this._ventilationEnding = !1, this._sheet?.kind === "ventilation" && (this._announcement = n ? "" : this._i18n.t.ventilation.ended, this.loadVentilation()));
  }
  /**
   * Dark or light (CURRENT_SPEC.md, Barvy): `theme: dark | light` forces it; `auto` follows the
   * dark mode Home Assistant uses (with the "Auto" theme, the system appearance), and without
   * that the system colour scheme of the browser.
   */
  theme() {
    const t = this.hass?.themes?.darkMode;
    return (typeof t == "boolean" ? t : this._prefersDark) ? "dark" : "light";
  }
  updated(t) {
    if (this.fitJoined(), !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, Wa)), this._focusPart && this._sheet?.kind === "history") {
      const e = this.renderRoot.querySelector(`[data-part="${this._focusPart}"]`);
      if (e && (this._focusPart = void 0, e.dataset.part !== "temperature")) {
        const n = this.renderRoot.querySelector("kd-sheet");
        Promise.resolve(n?.updateComplete).then(() => requestAnimationFrame(() => e.scrollIntoView({ block: "start" })));
      }
    }
    this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0);
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => Ee(t, (e) => this.getState(e)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of ys(this._config)) {
      const n = t.states[e], o = this.hass.states[e];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !ks(n?.attributes, o?.attributes))
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
    const t = Yt(this.entityState(this._config.houseModeEntity) ?? ""), e = t === Yt(this._config.houseModes.summer), n = e || t === Yt(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), a = this.renderTopTiles(s), r = Ba(
      this._config.rooms,
      (d) => this.getState(d),
      this.coldRooms(e, n, s),
      this._i18n
    ), l = a !== f || r.length > 0;
    return p`
      <ha-card>
        <div class="dashboard">
          ${l ? p`<header class="dashboard-header">
                ${a} ${this.renderSummary(r)}
              </header>` : f}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (d, h) => this.renderRoom(d, h, e, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(e, n, s)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, e, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const a = s.thresholds.stale_minutes;
      Ue(
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
      temperature: Ke(e((n) => n.temperature), Bt(t.trends, "temperature")),
      co2: Ke(e((n) => n.carbon_dioxide), Bt(t.trends, "co2")),
      pm25: Ke(e((n) => n.pm25), Bt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  /** What is known about the outside now: the temperature, the weather in words, the range of the day, the rain, the humidity and the air. */
  outsideFacts() {
    const t = this._config?.outside;
    if (!t)
      return;
    const { t: e, whole: n } = this._i18n, o = this.numberState(t.minimum), s = this.numberState(t.maximum), a = this.numberState(t.pm25), r = this.entityState(t.weather)?.toLowerCase(), l = this._config.thresholds, d = a === void 0 ? void 0 : a >= l.pm25_critical ? { label: e.airLevel.poor, color: v.alert } : a >= l.pm25_warning ? { label: e.airLevel.moderate, color: v.warning } : { label: e.airLevel.good, color: "var(--kd-text)" };
    return {
      temperature: this.numberState(t.temperature),
      condition: r === void 0 ? void 0 : e.weatherState[r],
      range: o !== void 0 && s !== void 0 ? `${n(o)}–${n(s)}${vt}°C` : void 0,
      rain: this.numberState(t.rain_probability),
      humidity: this.numberState(t.humidity),
      air: d
    };
  }
  /**
   * The top row (uživatel 14. 11. 2026: „Q230 B“): two tiles of the kit beside each other, "Venku" and "Větrací režim",
   * each with its name, its state in words and a chevron into its popup. A tile without data is left out and the other
   * takes the whole row.
   */
  renderTopTiles(t) {
    const { t: e, whole: n } = this._i18n, o = this.outsideFacts(), s = o ? [o.condition, o.range, o.rain === void 0 ? void 0 : `☂${vt}${this._i18n.percent(n(o.rain))}`].filter((u) => u !== void 0) : [], a = o !== void 0 && (o.temperature !== void 0 || s.length > 0 || o.air !== void 0), r = o?.temperature === void 0 ? e.outside.title : `${e.outside.title} ${n(o.temperature)}${vt}°C`, l = s.join(" · "), d = a ? p`<kd-tile
          class="outside-tile"
          kind="open"
          state="idle"
          .name=${r}
          .text=${l}
          .label=${[r, l, e.outside.spoken].filter(Boolean).join(". ")}
          @hdk-open=${(u) => this.openHouseSheet("outside", u)}
        ></kd-tile>` : f, h = this.ventilationState();
    let c = f;
    if (h !== void 0) {
      const u = h === "on", b = this._config.ventilationEntity, m = this._starts.of(this.hass, b), x = this._config.ventilationTimerEntity, $ = x ? Date.parse(String(this.getState(x)?.attributes.finishes_at ?? "")) : NaN, y = (L) => new Date(L).toDateString() === new Date(t).toDateString() ? this._i18n.time(L) : `${this._i18n.day(L)} ${this._i18n.time(L)}`, S = u ? [`${e.ventilation.running}${m === void 0 ? "" : ` ${de(Math.max(0, (t - m) / 6e4))}`}`, ...Number.isFinite($) ? [e.ventilation.until(this._i18n.time($))] : []].join(" · ") : [e.ventilation.off, ...m === void 0 ? [] : [e.ventilation.lastAt(y(m))]].join(" · ");
      c = p`<kd-tile
        class="vent-tile ${u ? "on" : "off"}"
        kind="open"
        state=${u ? "on" : "off"}
        .name=${e.ventilation.title}
        .text=${S}
        .label=${`${e.ventilation.title}. ${S}. ${u ? e.summaryChips.ventilationSpoken : e.summaryChips.ventilationOffSpoken}`}
        @hdk-open=${(L) => this.openVentilationSheet(L)}
      ></kd-tile>`;
    }
    return d === f && c === f ? f : p`<div class="top-tiles ${d !== f && c !== f ? "" : "single"}">${d}${c}</div>`;
  }
  /** A popup of the whole house (Venku): it has no room; the first one stands in. */
  openHouseSheet(t, e) {
    const n = this._config?.rooms[0];
    n && this.openSheet(t, n, e);
  }
  /** The popup "Venku": what the tile says, row by row, with the humidity also as grams of water in the air. */
  renderOutsideBody() {
    const { t, whole: e } = this._i18n, n = this.outsideFacts() ?? {}, o = n.temperature !== void 0 && n.humidity !== void 0 ? Je(n.temperature, n.humidity) : void 0, s = [];
    return n.temperature !== void 0 && s.push([t.outside.temperature, `${this._i18n.one(n.temperature)}${vt}°C`]), n.condition !== void 0 && s.push([t.outside.weather, n.condition]), n.range !== void 0 && s.push([t.outside.today, n.range]), n.rain !== void 0 && s.push([t.outside.rain, this._i18n.percent(e(n.rain))]), n.humidity !== void 0 && s.push([t.outside.humidity, Wt([this._i18n.percent(e(n.humidity)), ...o === void 0 ? [] : [`${this._i18n.one(o)}${vt}g/m³`]])]), n.air !== void 0 && s.push([t.outside.air, p`<span style=${`color: ${n.air.color}`}>${n.air.label}</span>`]), p`<div class="static-list outside-list" role="group" aria-label=${t.outside.title}>
      ${s.map(([a, r]) => p`<div class="static-row"><span class="option-text"><span>${a}</span></span><span class="list-value">${r}</span></div>`)}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? f : p`<ul class="summary" aria-label=${this._i18n.t.summary}>
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
    return t.kind === "windows" || t.kind === "conflict-window" ? Ye(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? xe("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? Gs(t.kind === "boost" ? "boost" : "heat") : ye(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, n, o, s, a) {
    const r = t.thresholds.stale_minutes, l = this.reading(t.temperature, r, a), d = this.reading(t.humidity, r, a), h = this.reading(t.carbon_dioxide, r, a), c = this.pm25Reading(t, a), { t: u } = this._i18n, b = Ue({ temperature: l, humidity: d, co2: h, pm25: c }, n, o, t, u), m = ($) => b.cause === $ ? `color: ${b.color}` : f, x = Jn(t, ($) => this.getState($), b.id === "cold", this._i18n);
    return p`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
      >
        <div class="room-head">
        <div class="room-id">
        ${this.renderTitle(t, e)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${b.kind === "unknown" ? `border: 1.5px solid ${v.off}` : `background: ${b.color}`}
          ></span>
          <span style=${`color: ${b.color}; font-weight: ${b.kind === "normal" ? 400 : 500}`}>
            ${ze(b.label)}
          </span>
        </div>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${m("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? f}
            aria-label=${u.temperatureLabel(
      this.roomLabel(t),
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${l.value === void 0 ? p`<span class="missing">––</span>` : p`${this._i18n.one(l.value)}<span class="temperature-unit">${vt}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${m("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? f}
            aria-label=${u.humidityLabel(
      this.roomLabel(t),
      d.value === void 0 ? void 0 : this._i18n.percent(Math.round(d.value)),
      this.staleSpoken(d)
    )}
            aria-haspopup="dialog"
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${d.value === void 0 ? p`<span class="missing">––</span>` : p`${this._i18n.percent(Math.round(d.value))}${this.staleMark(d)}`}
          </button>
        </div>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, e, h, c, s)}
            ${this.renderHvac(t, n, e)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, e, x, a)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : p`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article></div>
    `;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, e) {
    const n = `detail-description-${e}`;
    return p`
      <button
        type="button"
        class="plain-button room-title room-link"
        aria-haspopup="dialog"
        aria-describedby=${n}
        @click=${(o) => this.openSheet("history", t, o)}
      >
        <span class="room-name">${this.roomLabel(t)}</span><span class="room-chevron" aria-hidden="true">›</span>
      </button>
      <span class="sr-only" id=${n}>${this._i18n.t.sheet.openDetail}</span>
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
    return Be((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Be(this._config?.trends.minutes ?? 120, this._i18n.t);
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
      return f;
    const { thresholds: a } = t, { t: r } = this._i18n, l = this._config.trends, d = (u, b, m, x, $, y) => {
      if (!b || !m)
        return;
      const S = x.value === void 0 ? void 0 : hn(this._trends[m], Bt(l, y));
      return r.airSensor(
        u,
        x.value === void 0 ? void 0 : `${this._i18n.whole(x.value)} ${$}`,
        S ? r.trendOver(r.trend[S], this.trendPeriod()) : void 0,
        this.staleSpoken(x)
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
        @click=${(u) => this.openSheet("history", t, u, "air")}
      >
        ${t.hasCo2 ? this.renderAirRow(
      "co2",
      t.carbon_dioxide,
      p`<ha-icon icon="mdi:molecule-co2"></ha-icon>`,
      n,
      "ppm",
      a.co2_warning,
      a.co2_critical,
      s.co2
    ) : f}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      Ks(),
      o,
      "µg/m³",
      a.pm25_warning,
      a.pm25_critical,
      s.pm25
    ) : f}
      </button>
      <span class="sr-only" id=${c}>${r.airDescription(this.roomLabel(t), h, this.historyPeriod())}</span>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, e, n, o, s, a, r, l) {
    const d = o.value !== void 0, h = this._i18n.whole(o.value ?? 0), c = this.airColor(o, a, r), u = v[t];
    return p`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? f}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? u : v.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? p`<span class="row-label" style=${`color: ${c}`}>${h}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : p`<span class="row-label" style=${`color: ${v.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(e, l, u, o.stale === !0) : f}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, e, n) {
    if (!t.temperature || e.value === void 0)
      return f;
    const o = this.renderSpark(t.temperature, n, v.peach, e.stale === !0);
    if (o === f)
      return f;
    const s = hn(this._trends[t.temperature], Bt(this._config.trends, "temperature")), { t: a } = this._i18n;
    return p`
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
      return f;
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
      return f;
    const a = qs(s, e).map(
      (c, u) => c === void 0 ? void 0 : { x: u / Math.max(1, s.length - 1) * 100, y: (1 - c) * 100 }
    ).filter((c) => c !== void 0);
    if (a.length < 2)
      return f;
    const r = a.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" "), l = a[0], d = a[a.length - 1], h = `${r} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return p`<span class="spark ${o ? "stale" : ""}" style=${`color: ${n}`} aria-hidden="true">
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
    const { t: o } = this._i18n, s = Oe(t, (b) => this.getState(b), this._i18n), a = Ae(this.getState(t.air_conditioner), this._i18n), r = (b) => this.renderSystemRow(ye(s.unknown ? 0 : s.waves, s.unknown), s, b), l = (b) => this.renderSystemRow(xe(a.mode, a.color, a.unknown), a, b), d = e ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: a.active }), c = d.map((b) => `${o.system[b]} ${Ua(b === "heating" ? s : a, this._i18n)}`).join(", "), u = `hvac-description-${n}`;
    return p`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${u}
        @click=${(b) => h ? this.openSheet(h, t, b) : void 0}
      >
        ${e ? l(!0) : r(!0)}
        ${e ? r(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${u}>${o.hvacDescription(this.roomLabel(t), c, h)}</span>
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
    return p`
      <span
        class="system-row ${n && e.active ? "strong" : ""}"
        style=${`--row-color: ${e.color}`}
      >
        <span class="row-main">
          <span class="row-icon">${t}</span>
          <span class="row-text">
            <span class="row-label">${e.label}</span>
            ${e.extra ? p`<span class="row-unit">${e.extra}</span>` : f}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (since the recorder shows it open; a restart does not count). */
  windowState(t, e) {
    const o = this.getState(t)?.state.toLowerCase();
    if (o === void 0 || dt(o))
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
    const { t: s } = this._i18n, a = t.windows.map((E) => ({ window: E, ...this.windowState(E.entity, o) })), r = a.filter((E) => E.state === "open"), l = r.length > 0, d = !l && (a.length === 0 || a.some((E) => E.state === "unknown")), h = t.windows.length > 1, c = l ? v.sky : v.label, u = l ? r.length > 1 ? s.window.openCount(r.length) : s.window.open : d ? "––" : s.window.closed, b = r.map((E) => E.minutesOpen).filter((E) => E !== void 0), m = b.length > 0 ? Math.max(...b) : void 0, x = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, $ = `window-description-${e}`, y = m === void 0 ? void 0 : cn(m, s);
    let S;
    if (!h)
      S = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", y);
    else if (l) {
      const E = r.map((T) => this.windowName(t, T.window)).join(", ");
      S = r.length === 1 ? s.window.spokenOneOpen(E, y) : s.window.spokenManyOpen(E, y);
    } else
      S = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const L = t.windows[0]?.entity;
    return p`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${c}`}
        ?disabled=${!L}
        aria-haspopup="dialog"
        aria-describedby=${$}
        @click=${(E) => this.openSheet("history", t, E, "windows")}
      >
        <span class="row-main">
          <span class="row-icon">${Ye(d ? v.off : c, d)}</span>
          <span class="row-text">
            <span class="row-label">${u}</span>
            ${x ? p`<span class="conflict-dot" aria-hidden="true"></span>` : f}
            ${m === void 0 ? f : p`<span class="row-unit window-duration"
                  >${`${x ? "" : `${vt}·${vt}`}${de(m)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${$}>${s.window.description(this.roomLabel(t), S, x, h)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, e) {
    const n = Re(e.name, this._i18n.language);
    if (n !== void 0) return n;
    const o = this._i18n.t.window.defaultName(t.windows.indexOf(e) + 1);
    return t.windows.length === 1 ? o.replace(/\s*1$/, "") : o;
  }
  /** The rows of the room detail under its charts: Topení, Klimatizace, every window, the blind and the link of the room. */
  renderDetailRows(t, e) {
    const { t: n } = this._i18n, o = t.heating?.climate ? Oe(t, (l) => this.getState(l), this._i18n) : void 0, s = t.air_conditioner ? Ae(this.getState(t.air_conditioner), this._i18n) : void 0, a = (l, d, h) => p`<button
      type="button"
      class="plain-button option list-option detail-row"
      data-system=${l}
      @click=${() => this.openSystemFromDetail(l, t)}
    >
      <span class="option-icon" aria-hidden="true">${d}</span>
      <span class="option-text">
        <span>${n.system[l]}</span>
        <span class="option-hint detail-state" style=${`color: ${h.active ? h.color : "var(--kd-label)"}`}
          >${h.unknown ? p`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Wt([h.label, ...h.extra ? [h.extra.replace(/^·\s*/, "")] : []])}</span
        >
      </span>
      <span class="list-chevron" aria-hidden="true">›</span>
    </button>`, r = t.link;
    return p`
      <div class="options list-options detail-list">
        ${o ? a("heating", ye(o.unknown ? 0 : o.waves, o.unknown), o) : f}
        ${s ? a("climate", xe(s.mode, s.color, s.unknown), s) : f}
        ${t.windows.map((l, d) => {
      const { state: h, minutesOpen: c } = this.windowState(l.entity, e), u = h === "unknown", b = h === "open" ? v.sky : v.label;
      return p`<div class="option list-option window-option" data-part=${d === 0 ? "windows" : f}>
            <span class="option-icon" aria-hidden="true">${Ye(u ? v.off : b, u)}</span>
            <span class="option-text">
              <span>${this.windowName(t, l)}</span>
              <span class="option-hint window-state" style=${`color: ${b}`}>
                ${u ? p`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Wt([h === "open" ? n.window.open : n.window.closed, ...c === void 0 ? [] : [de(c)]])}
              </span>
            </span>
          </div>`;
    })}
        ${t.cover ? this.renderDetailCover(t, t.cover) : f}
        ${r ? p`<button type="button" class="plain-button option list-option detail-row" data-part="link" @click=${() => {
      this.closeSheet(!1), this.openLink(r);
    }}>
              <span class="option-text"><span>${r.startsWith("/") ? n.sheet.linkPage : n.sheet.linkWeb}</span></span>
              <span class="list-chevron" aria-hidden="true">›</span>
            </button>` : f}
      </div>
    `;
  }
  /** The blind in the room detail: its state in words, the presets on one tap and the sliders of the position and of the slats. */
  renderDetailCover(t, e) {
    const { t: n } = this._i18n, o = this.getState(e), s = o?.state.toLowerCase(), a = s !== void 0 && !dt(s), r = this._moving[t.name] === ti ? this._coverTarget[t.name] : void 0, l = r?.position ?? (a ? pt(o?.attributes.current_position) : void 0), d = r?.tilt ?? (a ? pt(o?.attributes.current_tilt_position) : void 0), h = l !== void 0 && d !== void 0, c = this._moving[t.name], u = t.presets.find((x) => c !== void 0 ? x.id === c : le(l, d, x, this.tolerance())), b = a ? u ? Ve(u, n, this._i18n.language) : h ? n.sheet.coverCustom : n.cover.unknown : n.cover.unavailable, m = (x, $) => p`<div class="detail-slider">
      <div class="detail-slider-head"><span>${x === "position" ? n.sheet.coverPosition : n.sheet.coverTilt}</span><span class="detail-slider-value">${$ === void 0 ? "––" : this._i18n.percent(Math.round($))}</span></div>
      <kd-slider
        data-cover=${x}
        .min=${0}
        .max=${100}
        .step=${5}
        .tickStep=${25}
        .value=${Math.round(($ ?? 0) / 5) * 5}
        .label=${`${n.sheet.cover}: ${x === "position" ? n.sheet.coverPosition : n.sheet.coverTilt}`}
        .valueText=${$ === void 0 ? "" : this._i18n.percent(Math.round($))}
        .minLabel=${x === "position" ? n.sheet.coverDown : n.sheet.coverShut}
        .maxLabel=${x === "position" ? n.sheet.coverUp : n.sheet.coverOpened}
        .disabled=${!h}
        @hdk-input=${(y) => y.stopPropagation()}
        @hdk-change=${(y) => {
      y.stopPropagation(), h && this.moveCover(t, x === "position" ? y.detail.value : Math.round(l), x === "tilt" ? y.detail.value : Math.round(d));
    }}
      ></kd-slider>
    </div>`;
    return p`<div class="option list-option detail-cover" data-part="cover">
      <div class="detail-cover-head">
        <span class="option-icon" aria-hidden="true">${vn(u?.icon ?? "shade")}</span>
        <span class="option-text">
          <span>${n.sheet.cover}</span>
          <span class="option-hint detail-state">${h && !u ? Wt([b, n.cover.position(Math.round(l), Math.round(d))]) : b}</span>
        </span>
      </div>
      ${t.presets.length > 0 ? p`<kd-segmented
            class="detail-presets"
            .label=${n.sheet.coverPreset}
            .options=${t.presets.map((x) => ({ value: x.id, label: Ve(x, n, this._i18n.language) }))}
            .value=${u?.id ?? ""}
            .disabled=${!a}
            .pending=${c !== void 0 && c !== ti}
            @hdk-select=${(x) => {
      x.stopPropagation();
      const $ = t.presets.find((y) => y.id === x.detail.value);
      $ && this.applyPreset(t, $);
    }}
          ></kd-segmented>` : f}
      ${m("position", l)} ${m("tilt", d)}
    </div>`;
  }
  /** A position and tilt from the sliders of the detail go through the same script as the presets. */
  async moveCover(t, e, n) {
    t.cover && (this._coverTarget = { ...this._coverTarget, [t.name]: { position: e, tilt: n } }, await this.applyPreset(t, { id: ti, icon: "shade", position: e, tilt: n }));
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
      const s = await he(t, [e], o - 168 * Et, o), a = wa(s[e]);
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
        ...$.windows.map((y) => y.entity)
      ]), h = (this._config?.ventilationSettleMinutes ?? 25) * 6e4, c = a.end === void 0 ? void 0 : a.end + h, u = await he(
        t,
        d.filter(($) => $ !== void 0),
        a.start - 30 * 6e4,
        c === void 0 ? l : Math.min(o, Math.max(l, c))
      );
      if (n !== this._ventRequest)
        return;
      const b = c !== void 0 && c <= o ? c : void 0, m = ($) => ({
        before: $(a.start),
        after: a.end === void 0 ? void 0 : $(a.end),
        settled: b === void 0 ? void 0 : $(b)
      }), x = ($) => (y) => $ === void 0 ? void 0 : ge(Qt(u[$], y));
      this._vent = {
        session: a,
        rooms: r.map(($) => {
          const y = $.carbon_dioxide === void 0 ? void 0 : m(x($.carbon_dioxide));
          return {
            name: $.name,
            opened: $.windows.some((S) => ya(u[S.entity], a.start, l)),
            start: y?.before,
            end: ge(Qt(u[$.carbon_dioxide ?? ""], l)),
            co2: y,
            temperature: $.temperature === void 0 ? void 0 : m(x($.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity: $.temperature === void 0 || $.humidity === void 0 ? void 0 : m((S) => Je(x($.temperature)(S), x($.humidity)(S)))
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
    const { t: e } = this._i18n, n = e.ventilation, o = this._config, s = this.ventilationOn(), a = o?.ventilationCo2Target ?? 500, r = o?.ventilationCo2Full ?? 420, l = this._vent, d = l?.session, h = p`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${e.unknownValue}</span>`, c = this._sheetError, u = o?.ventilationTimerEntity, b = this.getState(u), m = b?.state.toLowerCase() === "active" ? Date.parse(String(b.attributes.finishes_at ?? "")) : Number.NaN, x = Number.isNaN(m) || m <= t ? void 0 : m, $ = this._starts.of(this.hass, o?.ventilationEntity), y = $ === void 0 ? void 0 : Math.max(0, (t - $) / 6e4), S = this.ventilationRooms().flatMap((M) => {
      const H = l?.rooms.find((R) => R.name === M.name), N = Ee(M, (R) => this.getState(R)).length > 0;
      if (!N && !H?.opened)
        return [];
      const V = this.getState(M.carbon_dioxide), nt = s ? ge(V?.state) : H?.end, ft = H?.start, It = ft !== void 0 && nt !== void 0 ? xa(ft, nt, a, r) : void 0;
      return [{ room: M, startValue: ft, live: nt, steps: It, open: N }];
    }), L = o?.ventilationSettleMinutes ?? 25, E = d?.end !== void 0 && t >= d.end + L * 6e4, T = s ? [n.before, e.chart.now] : [n.before, n.after, E ? n.settledShort(L) : e.chart.now], B = s ? T : [n.before, n.after, E ? n.settledAfter(L) : e.chart.now], k = (M) => {
      const H = l?.rooms.find((R) => R.name === M.room.name), N = M.steps === void 0 ? void 0 : Math.min(100, Math.floor(M.steps.done * 100)), V = [
        { label: n.quantity.co2, entity: M.room.carbon_dioxide, triple: H?.co2, live: ge(this.getState(M.room.carbon_dioxide)?.state), digits: !1 },
        { label: n.quantity.temperature, entity: M.room.temperature, triple: H?.temperature, live: qe(this.getState(M.room.temperature)?.state), digits: !0 },
        {
          label: n.quantity.humidity,
          entity: M.room.temperature !== void 0 && M.room.humidity !== void 0 ? M.room.humidity : void 0,
          triple: H?.humidity,
          live: Je(qe(this.getState(M.room.temperature)?.state), qe(this.getState(M.room.humidity)?.state)),
          digits: !0
        }
      ].filter((R) => R.entity).map((R) => {
        const yt = s ? [R.triple?.before, R.live] : [R.triple?.before, R.triple?.after, E ? R.triple?.settled : R.live];
        return {
          label: R.label,
          shown: yt.map((gt) => gt === void 0 ? void 0 : R.digits ? this._i18n.one(gt) : this._i18n.whole(gt))
        };
      }), nt = M.steps?.closable === !0, ft = [
        s && N !== void 0 ? `${n.done} ${this._i18n.percent(N)}${nt ? `, ${n.closable}` : ""}` : void 0,
        ...V.map((R) => n.lineSpoken(R.label, R.shown.map((yt, gt) => `${B[gt]} ${yt ?? e.unknownValue}`).join(", ")))
      ].filter((R) => R !== void 0).join(". "), It = M.open ? nt ? v.fresh : v.warning : v.label;
      return p`<div class="vent-room ${s ? "with-ring" : ""}" role="group" aria-label=${n.roomSpoken(this.roomLabel(M.room), ft)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(M.room)}${s && !M.open ? p`<span class="vent-note">${n.windowClosed}</span>` : f}
          </div>
          ${V.map(
        (R) => p`<div class="vent-line">
              <span class="vent-q">${R.label}</span>
              ${R.shown.map((yt) => p`<span class="vent-num">${yt ?? p`<span class="no-data">––</span>`}</span>`)}
            </div>`
      )}
        </div>
        ${s ? p`<kd-ring
              aria-hidden="true"
              fraction=${(N ?? 0) / 100}
              size="40"
              stroke="6"
              num=${N === void 0 ? "––" : String(N)}
              style=${`--hdk-ring-fill: ${N === void 0 ? v.label : It}; grid-row: 2 / span ${V.length}`}
            ></kd-ring>` : f}
      </div>`;
    }, F = S.length === 0 ? f : p`<div class="vent-table" role="group" aria-label=${n.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${T.map((M) => p`<span class="vent-num">${M}</span>`)}
              ${s ? p`<span class="vent-num ring-head">↓ ${this._i18n.whole(r)}<span class="ring-unit"> ppm</span></span>` : f}
            </div>
            ${S.map(k)}
          </div>`;
    let C = f;
    return s ? C = p`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${n.running}
              ${y === void 0 ? h : p`<span aria-hidden="true">${de(y)}</span
                    ><span class="sr-only">${cn(y, e)}</span>`}
            </span>
          </span>
          ${u === void 0 ? f : p`<span class="list-value vent-ends">${n.endsBy} ${x === void 0 ? h : this._i18n.time(x)}</span>`}
        </div>` : d && (C = p`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${n.last}</span></span>
          <span class="list-value">${new Date(d.start).toDateString() === new Date(t).toDateString() ? f : `${this._i18n.day(d.start)} `}${this._i18n.time(d.start)}${d.end === void 0 ? f : p`–${this._i18n.time(d.end)}`}</span>
        </div>`), p`
      ${!s && !d ? f : p`<div class="static-list" role="group" aria-label=${n.title}>${C}${F}</div>`}
      ${!s && !d && l !== void 0 ? p`<p class="timer-foot">${n.never}</p>` : f}
      ${s ? p`<button
              type="button"
              class="plain-button vent-end ${c ? "error" : ""}"
              ?disabled=${this._ventilationEnding}
              aria-busy=${this._ventilationEnding ? "true" : "false"}
              @click=${() => {
      this.switchVentilation("turn_off");
    }}
            >
              ${c ?? (this._ventilationEnding ? n.ending : n.end)}
            </button>
            ${c ? p`<span class="sr-only" role="alert">${c}</span>` : f}` : l === void 0 ? f : p`<button
                type="button"
                class="plain-button vent-end vent-start ${c ? "error" : ""}"
                ?disabled=${this._ventilationEnding}
                aria-busy=${this._ventilationEnding ? "true" : "false"}
                @click=${() => {
      this.switchVentilation("turn_on");
    }}
              >
                ${c ?? (this._ventilationEnding ? n.starting : n.start)}
              </button>
              ${c ? p`<span class="sr-only" role="alert">${c}</span>` : f}`}
    `;
  }
  /** "Ukončit": turns the mode off; Home Assistant switches the fans off and returns the slats (kit, Home Assistant: větrací režim). */
  /** Starts the mode (uživatel 14. 11. 2026: „Q232 A“) or ends it; the popup stays and shows the new state once Home Assistant reports it. */
  async switchVentilation(t) {
    const e = this._config?.ventilationEntity;
    if (!(!e || !this.hass || this._ventilationEnding)) {
      this._ventilationEnding = !0, this._sheetError = void 0;
      try {
        await this.hass.callService(e.split(".")[0], t, { entity_id: e }), this.haptic("success"), window.clearTimeout(this._endTimer), this._endTimer = window.setTimeout(() => {
          this._ventilationEnding = !1;
        }, 1e4);
      } catch (n) {
        console.error("Klima Dashboard: switching the ventilation mode failed", n), this._sheetError = this._i18n.t.sheet.commandFailed, this._ventilationEnding = !1, this.haptic("failure");
      }
    }
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const n = this.getState(e), o = n?.state.toLowerCase(), s = o !== void 0 && !dt(o), a = s ? pt(n?.attributes.current_position) : void 0, r = s ? pt(n?.attributes.current_tilt_position) : void 0, l = a !== void 0 && r !== void 0, d = o === "opening" || o === "closing", { t: h } = this._i18n, c = l ? h.cover.position(Math.round(a), Math.round(r)) : h.cover.unknown;
    return p`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${h.cover.label(this.roomLabel(t), c, d)}
        aria-haspopup="dialog"
        @click=${(u) => this.openSheet("history", t, u, "cover")}
      >
        <svg
          viewBox="0 0 ${we} ${ei}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${hs(a, r)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${h.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((u) => this.renderPreset(t, u, a, r, s))}
      </div>
    `;
  }
  renderPreset(t, e, n, o, s) {
    const a = this._moving[t.name], r = a === e.id, l = a === void 0 && le(n, o, e, this.tolerance()), d = `${t.name}|${e.id}`, { t: h } = this._i18n, c = Ve(e, h, this._i18n.language), u = this._hint?.key === d && this._hint.error === !0;
    return p`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${r ? "pending" : ""} ${u ? "failed" : ""}"
        title=${c}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${r ? "true" : f}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${u && this._hint?.spoken ? `${h.cover.preset(this.roomLabel(t), c, pn(e, h, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : h.cover.preset(this.roomLabel(t), c, pn(e, h, this._i18n.language), s)}
        @pointerdown=${(b) => this.pressStart(b, t, e, s)}
        @pointerup=${() => this.pressEnd(t, e, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(b) => b.preventDefault()}
        @click=${(b) => {
      b.detail === 0 && (s ? this.applyPreset(t, e) : this.showUnavailable(d));
    }}
      >
        ${vn(e.icon)}
        ${this._hint?.key !== d ? f : u ? p`<span class="preset-hint error" role="alert"
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
      }, kn);
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
    }, o ? Za : Xa);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || dt(n)) {
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
      }, Ya);
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
    if (le(
      pt(o?.attributes.current_position),
      pt(o?.attributes.current_tilt_position),
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
      if (a === void 0 || dt(a) || le(
        pt(s?.attributes.current_position),
        pt(s?.attributes.current_tilt_position),
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
  renderSheet(t, e, n) {
    const o = this._sheet;
    if (!o)
      return f;
    const { t: s } = this._i18n;
    if (o.kind === "history")
      return this.renderSheetFrame(
        this.roomLabel(o.room),
        this.roomStatusLabel(o.room, t, e, n),
        this.renderRoomDetail(o.room, t, n),
        "history-sheet"
      );
    if (o.kind === "ventilation")
      return this.renderSheetFrame(s.ventilation.title, void 0, this.renderVentilationBody(Date.now()));
    if (o.kind === "outside")
      return this.renderSheetFrame(s.outside.title, void 0, this.renderOutsideBody());
    const { title: a, sub: r } = this.hvacTitle(o.kind);
    return this.renderSheetFrame(a, r, this.renderHvacBody(o.room, o.kind, t));
  }
  /** The state of a room in words, as its card says it ("Příjemné", "Vydýchaný vzduch"). */
  roomStatusLabel(t, e, n, o) {
    const s = t.thresholds.stale_minutes;
    return Ue(
      {
        temperature: this.reading(t.temperature, s, o),
        humidity: this.reading(t.humidity, s, o),
        co2: this.reading(t.carbon_dioxide, s, o),
        pm25: this.pm25Reading(t, o)
      },
      e,
      n,
      t,
      this._i18n.t
    ).label;
  }
  /**
   * The room detail (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Detail místnosti): the switch of the period, the chart
   * of the temperature with the humidity and the chart of CO₂ with PM2.5 under each other with one pointer of time, and
   * under them the heating, the air conditioner, the windows and the blind of the room.
   */
  renderRoomDetail(t, e, n) {
    const { t: o } = this._i18n, s = this._config?.history.hours ?? 24, a = t.hasCo2 ? "co2" : t.hasPm25 ? "pm25" : void 0, r = s === _n ? f : p`<kd-segmented
            class="detail-period"
            .label=${o.sheet.period}
            .options=${[
      { value: String(s), label: o.sheet.hoursShort(s) },
      { value: String(_n), label: o.sheet.week }
    ]}
            .value=${String(this._historyHours)}
            @hdk-select=${(u) => {
      u.stopPropagation(), this._historyHours = Number(u.detail.value), this._scrubTime = void 0, this.loadRoomHistory(t);
    }}
          ></kd-segmented>`, l = this._historyModel, d = this._historyStatus === "ready" && l !== void 0, h = d && !Ze(l, "temperature") && (!a || !Ze(l, a)), c = !d || h ? p`<section class="detail-chart ${a ? "double" : ""}" data-part="temperature">${this.renderHistoryBody(t, "temperature", e)}</section>` : p`<section class="detail-chart" data-part="temperature">${this.renderHistoryBody(t, "temperature", e)}</section>
            ${a ? p`<section class="detail-chart" data-part="air">${this.renderHistoryBody(t, a, e)}</section>` : f}`;
    return p`
      ${r} ${c}
      ${this.renderDetailRows(t, n)}
    `;
  }
  /** From the room detail to the popup Topení / Klimatizace of that room (the sheet stays, its content changes). */
  openSystemFromDetail(t, e) {
    this._historyRequest += 1, this._scrubTime = void 0, this._sheetError = void 0, this._sheet = { kind: t, room: e }, this._hvacSelected = this.hvacSelection(t);
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, e, n, o = "") {
    return p`<kd-sheet
      open
      .heading=${t}
      .sub=${e ?? ""}
      .closeLabel=${this._i18n.t.sheet.close}
      ?wide=${o === "history-sheet"}
      @hdk-close=${() => this.closeSheet()}
      ><div class="sheet ${o}">${n}</div></kd-sheet
    >`;
  }
  /** Title of the Topení / Klimatizace popup: the system, or both when the switch under it chooses one. */
  hvacTitle(t) {
    const e = this.sheetRooms();
    return { title: e.some((o) => o.heating?.climate) && e.some((o) => o.air_conditioner) ? this._i18n.t.sheet.hvac : this._i18n.t.system[t] };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, e, n) {
    const o = this.sheetRooms(), s = o.filter((m) => m.heating?.climate), a = o.filter((m) => m.air_conditioner), r = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && a.length > 0, { t: d } = this._i18n, h = e === "heating" ? "heating" : "cooling", c = (this._config?.rooms ?? []).filter((m) => this.hvacEntity(m, e)), u = p`<kd-climate
      .hass=${this.hass}
      .i18n=${this._i18n}
      .texts=${d.climatePopup}
      .system=${h}
      .rooms=${c.map((m) => ({ name: this.roomLabel(m), entity: this.hvacEntity(m, e) }))}
      .selected=${this._hvacSelected}
      .delayMs=${(this._config?.sendDelaySeconds ?? 2) * 1e3}
      @hdk-select-rooms=${(m) => this._hvacSelected = m.detail.selected}
      @hdk-error=${(m) => this._sheetError = m.detail.message}
      @hdk-more-info=${async (m) => {
      await this.flushClimate();
      const x = c.find(($) => this.hvacEntity($, e) === m.detail.entityId);
      x && (this._sheet = { kind: "history", room: x, focus: "temperature" }, this._scrubTime = void 0, this._historyHours = this._config?.history.hours ?? 24, this.loadRoomHistory(x));
    }}
    ></kd-climate>`, b = l ? p`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(m) => this.segmentKeydown(m, r, e)}
        >
          ${r.map(
      (m) => p`<button
              type="button"
              role="tab"
              id=${`tab-${m}`}
              class="plain-button segment"
              data-system=${m}
              aria-selected=${m === e ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${m === e ? "0" : "-1"}
              @click=${() => this.switchSheet(m)}
            >
              ${d.system[m]}
            </button>`
    )}
        </div>` : f;
    return p`${b}
      <div class="hvac-panel" role=${l ? "tabpanel" : f} id="hvac-panel" aria-labelledby=${l ? `tab-${e}` : f}>
        ${u}
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
    const n = Date.now(), o = this.reading(t.carbon_dioxide, t.thresholds.stale_minutes, n), s = this.pm25Reading(t, n), a = e === "pm25" ? s : o;
    return {
      value: a.value,
      stale: a.stale === !0,
      secondary: e === "co2" ? { value: s.value, stale: s.stale === !0 } : void 0
    };
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, e, n) {
    const o = this._historyHours, { t: s } = this._i18n;
    let a;
    const r = this._historyModel;
    return this._historyStatus === "loading" ? a = p`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !r ? a = p`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : Ze(r, e) ? a = p`<div
        class="chart-wrap ${e === "temperature" ? "temperature" : "air"}"
        tabindex="0"
        role="group"
        aria-label=${s.sheet.chart(Be(o * 60, s))}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${$a(r, e, this.chartWidth(), this._scrubTime, this._i18n, n, this.liveReading(t, e))}
      </div>` : a = p`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, a;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(Ga).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  openSheet(t, e, n, o) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._sheet = { kind: t, room: e, focus: t === "history" ? o ?? "temperature" : void 0 }, (t === "heating" || t === "climate") && (this._hvacSelected = this.hvacSelection(t)), window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this._historyHours = this._config?.history.hours ?? 24, this._focusPart = o, this.loadRoomHistory(e));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return In(t, this._i18n.language);
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
    window.removeEventListener("resize", this.handleResize), this.flushClimate(), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._ventilationEnding = !1, this._vent = void 0, this._ventRequest += 1, window.clearTimeout(this._endTimer), this._scrubTime = void 0, this._scrubbing = !1, t && this._opener?.focus(), this._opener = void 0;
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
    ].filter((r) => !!r), o = this._config.history, s = Date.now(), a = s - this._historyHours * Et;
    try {
      const r = await he(this.hass, n, a, s);
      if (e !== this._historyRequest)
        return;
      this._historyModel = la(r, t, { startMs: a, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
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
    const t = xs(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: e, samples: n } = this._config.trends, o = Date.now(), s = o - e * 6e4;
    try {
      const a = await he(this.hass, t, s, o), r = {};
      for (const l of t)
        r[l] = Ws(a[l], s, o, n);
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
    const e = _s(this._config), n = await Promise.allSettled(
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
    return t.stale ? p`<span class="stale-mark" aria-hidden="true">${Ys()}</span>` : f;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(Fn(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || dt(e.toLowerCase()))
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
};
Ri.styles = [$i, Ia];
let D = Ri;
j([
  z()
], D.prototype, "_config");
j([
  w({ attribute: !1 })
], D.prototype, "hass");
j([
  z()
], D.prototype, "_sheet");
j([
  z()
], D.prototype, "_sheetError");
j([
  z()
], D.prototype, "_hvacSelected");
j([
  z()
], D.prototype, "_ventilationEnding");
j([
  z()
], D.prototype, "_announcement");
j([
  z()
], D.prototype, "_vent");
j([
  z()
], D.prototype, "_historyStatus");
j([
  z()
], D.prototype, "_historyModel");
j([
  z()
], D.prototype, "_scrubTime");
j([
  z()
], D.prototype, "_historyHours");
j([
  z()
], D.prototype, "_coverTarget");
j([
  z()
], D.prototype, "_flash");
j([
  z()
], D.prototype, "_moving");
j([
  z()
], D.prototype, "_prefersDark");
j([
  z()
], D.prototype, "_hint");
j([
  z()
], D.prototype, "_trends");
j([
  z()
], D.prototype, "_trendsLoaded");
j([
  z()
], D.prototype, "_reported");
j([
  z()
], D.prototype, "_historyRequest");
j([
  z()
], D.prototype, "_clock");
ss("kd");
Go("kd");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", D);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: li(Ta()).t.cardDescription,
  preview: !1
});
