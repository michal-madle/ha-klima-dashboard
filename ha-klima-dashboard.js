const Q = globalThis, $t = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = /* @__PURE__ */ Symbol(), Et = /* @__PURE__ */ new WeakMap();
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
const de = (s) => new Wt(typeof s == "string" ? s : s + "", void 0, gt), he = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Wt(e, s, gt);
}, pe = (s, t) => {
  if ($t) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = Q.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, Ct = $t ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return de(e);
})(s) : s;
const { is: ue, defineProperty: me, getOwnPropertyDescriptor: fe, getOwnPropertyNames: $e, getOwnPropertySymbols: ge, getPrototypeOf: ve } = Object, nt = globalThis, Mt = nt.trustedTypes, ye = Mt ? Mt.emptyScript : "", _e = nt.reactiveElementPolyfillSupport, j = (s, t) => s, tt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ye : null;
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
} }, vt = (s, t) => !ue(s, t), Tt = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), nt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && me(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = fe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const t = ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const e = this.properties, i = [...$e(e), ...ge(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(Ct(n));
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
    return pe(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : tt).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : tt;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? vt)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[j("elementProperties")] = /* @__PURE__ */ new Map(), N[j("finalized")] = /* @__PURE__ */ new Map(), _e?.({ ReactiveElement: N }), (nt.reactiveElementVersions ??= []).push("2.1.2");
const yt = globalThis, zt = (s) => s, et = yt.trustedTypes, Ft = et ? et.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qt = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Vt = "?" + k, be = `<${Vt}>`, F = document, V = () => F.createComment(""), K = (s) => s === null || typeof s != "object" && typeof s != "function", _t = Array.isArray, xe = (s) => _t(s) || typeof s?.[Symbol.iterator] == "function", ot = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Ot = />/g, C = RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Nt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Zt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Zt(1), g = Zt(2), H = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), z = F.createTreeWalker(F, 129);
function Yt(s, t) {
  if (!_t(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const we = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = B;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let d, p, h = -1, $ = 0;
    for (; $ < l.length && (r.lastIndex = $, p = r.exec(l), p !== null); ) $ = r.lastIndex, r === B ? p[1] === "!--" ? r = Pt : p[1] !== void 0 ? r = Ot : p[2] !== void 0 ? (Kt.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = C) : p[3] !== void 0 && (r = C) : r === C ? p[0] === ">" ? (r = n ?? B, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? C : p[3] === '"' ? Nt : Rt) : r === Nt || r === Rt ? r = C : r === Pt || r === Ot ? r = B : (r = C, n = void 0);
    const y = r === C && s[a + 1].startsWith("/>") ? " " : "";
    o += r === B ? l + be : h >= 0 ? (i.push(d), l.slice(0, h) + qt + l.slice(h) + k + y) : l + k + (h === -2 ? a : y);
  }
  return [Yt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, p] = we(t, e);
    if (this.el = Z.createElement(d, i), z.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = z.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(qt)) {
          const $ = p[r++], y = n.getAttribute(h).split(k), v = /([.?@])?(.*)/.exec($);
          l.push({ type: 1, index: o, name: v[2], strings: y, ctor: v[1] === "." ? Se : v[1] === "?" ? ke : v[1] === "@" ? Ee : st }), n.removeAttribute(h);
        } else h.startsWith(k) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Kt.test(n.tagName)) {
          const h = n.textContent.split(k), $ = h.length - 1;
          if ($ > 0) {
            n.textContent = et ? et.emptyScript : "";
            for (let y = 0; y < $; y++) n.append(h[y], V()), z.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[$], V());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Vt) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(k, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += k.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = F.createElement("template");
    return i.innerHTML = t, i;
  }
}
function D(s, t, e = s, i) {
  if (t === H) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = K(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = D(s, n._$AS(s, t.values), n, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? F).importNode(e, !0);
    z.currentNode = n;
    let o = z.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new G(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Ce(o, this, t)), this._$AV.push(d), l = i[++a];
      }
      r !== l?.index && (o = z.nextNode(), r++);
    }
    return z.currentNode = F, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = D(this, t, e), K(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && K(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Z.createElement(Yt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Ae(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new Z(t)), e;
  }
  k(t) {
    _t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new G(this.O(V()), this.O(V()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
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
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = D(this, t, e, 0), r = !K(t) || t !== this._$AH && t !== H, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = D(this, a[i + l], e, l), d === H && (d = this._$AH[l]), r ||= !K(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
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
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? m) === H) return;
    const i = this._$AH, n = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
    D(this, t);
  }
}
const Me = yt.litHtmlPolyfillSupport;
Me?.(Z, G), (yt.litHtmlVersions ??= []).push("3.3.3");
const Te = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new G(t.insertBefore(V(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const bt = globalThis;
class W extends N {
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
    return H;
  }
}
W._$litElement$ = !0, W.finalized = !0, bt.litElementHydrateSupport?.({ LitElement: W });
const ze = bt.litElementPolyfillSupport;
ze?.({ LitElement: W });
(bt.litElementVersions ??= []).push("4.2.2");
const Fe = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: vt }, Pe = (s = Fe, t, e) => {
  const { kind: i, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Gt(s) {
  return (t, e) => typeof e == "object" ? Pe(s, t, e) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
function P(s) {
  return Gt({ ...s, state: !0, attribute: !1 });
}
const Jt = "input_select.house_mode", Xt = {
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
function Oe(s) {
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
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(s.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...Xt, ...s.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  return { ...s, thresholds: t };
}
const Dt = { domain: "script", service: "zaluzie_posun" }, Re = [
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0, tone: "#A5A1F2" },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100, tone: "#7FC8F8" },
  { id: "morning", label: "Ráno", description: "ranní prosvětlení", position: 35, tilt: 60, tone: "#FFAA66" },
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100, tone: "#FFD84A" }
], rt = { temperature: 0.5, co2: 50, pm25: 3 }, c = {
  closed: "#6B6B70",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** Air-quality icons and their micro trends. */
  mint: "#5BD6B5",
  /** Temperature micro trend. */
  peach: "#FFB36B",
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
}, pt = {
  off: c.off,
  cool: c.cool,
  wind_free: c.cool,
  dry: c.dry,
  fan: c.plan,
  heat: c.heat,
  auto: c.auto,
  unknown: c.off
}, Qt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, Ne = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function He(s) {
  const t = Ne[s];
  if (t)
    return t;
  const e = s.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function De(s) {
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
function Le(s, t, e, i, n, o, r) {
  if (s === void 0 || t === void 0 || e === void 0 || i === void 0 || !o)
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
  const a = n ? r.summer_min : r.winter_min, l = n ? r.summer_max : r.winter_max;
  return s > l ? { label: "Teplo", color: c.warning, kind: "warning" } : s < a ? { label: "Chladno", color: c.cold, kind: "warning" } : { label: "Příjemné", color: c.label, kind: "normal" };
}
function R(s) {
  return s === "" || s === "unknown" || s === "unavailable" || s === "none";
}
function at(s) {
  if (s == null || s === "")
    return;
  const t = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Ie(s) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(s);
}
function lt(s) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(s * 2) / 2
  );
}
function te(s) {
  return s === void 0 || s <= 0 ? 0 : s <= 34 ? 1 : s <= 67 ? 2 : 3;
}
function Ue(s) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(s.house_mode_entity ?? Jt), e(s.outside?.temperature), e(s.outside?.minimum), e(s.outside?.maximum), e(s.outside?.rain_probability), e(s.outside?.pm25);
  for (const i of s.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function Be(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function je(s, t) {
  if (s === t)
    return !0;
  if (!s || !t)
    return !1;
  const e = Object.keys(s), i = Object.keys(t);
  return e.length === i.length && e.every((n) => Object.hasOwn(t, n) && s[n] === t[n]);
}
const q = 60, ut = 122, Lt = 18, X = 3, We = 0.8, qe = 1, Ve = 0.28;
function Ke(s, t) {
  if (s === void 0 || t === void 0)
    return g`<rect
      x="0.75"
      y="0.75"
      width=${q - 1.5}
      height=${ut - 1.5}
      rx="6"
      fill="none"
      stroke=${c.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = ut - X - 1, i = e / Lt, n = i - We, o = n - t / 100 * (n - qe), r = X + 1 + (100 - s) / 100 * e, a = Array.from({ length: Lt }, (l, d) => {
    const p = X + 1 + d * i + (i - o) / 2, h = p + o / 2 <= r;
    return g`<rect
      x="0"
      y=${p.toFixed(2)}
      width=${q}
      height=${o.toFixed(2)}
      rx=${Math.min(1.5, o / 2).toFixed(2)}
      fill=${h ? c.blind : c.sky}
      opacity=${h ? 1 : Ve}
    ></rect>`;
  });
  return g`<rect
      x="0"
      y="0"
      width=${q}
      height=${X}
      rx="1.5"
      fill=${c.blind}
    ></rect>${a}`;
}
const ee = 36e5, Ze = 120 * 6e4, It = 12;
function Ye(s) {
  if (s == null)
    return;
  if (typeof s == "number")
    return Number.isFinite(s) ? s < 1e11 ? s * 1e3 : s : void 0;
  const t = Date.parse(s);
  return Number.isNaN(t) ? void 0 : t;
}
function Ge(s, t) {
  const e = {};
  for (const [i, n] of Object.entries(s ?? {})) {
    if (!Array.isArray(n))
      continue;
    const o = [];
    n.forEach((r, a) => {
      const l = r.s ?? r.state, d = Ye(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && o.push({ time: Math.max(d, t), state: l });
    }), o.sort((r, a) => r.time - a.time), e[i] = o;
  }
  return e;
}
async function Ut(s, t, e, i) {
  if (t.length === 0)
    return {};
  const n = await s.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(i).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    minimal_response: !0,
    no_attributes: !0
  });
  return Ge(n, e);
}
function ie(s, t) {
  let e;
  for (const i of s ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function mt(s) {
  if (s === void 0)
    return;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : void 0;
}
function Je(s, t, e, i) {
  const n = (e - t) / i, o = (s ?? []).filter((r) => mt(r.state) !== void 0);
  return Array.from(
    { length: i },
    (r, a) => mt(ie(o, t + (a + 1) * n))
  );
}
function it(s, t, e) {
  const i = [];
  for (const o of s ?? []) {
    const r = mt(o.state);
    r !== void 0 && o.time <= e && i.push({ t: Math.max(o.time, t), v: r });
  }
  const n = i[i.length - 1];
  return n && n.t < e && i.push({ t: e, v: n.v }), i;
}
function ct(s, t, e, i) {
  const n = /* @__PURE__ */ new Set([t, e]);
  for (const a of s)
    for (const l of a ?? [])
      l.time > t && l.time < e && n.add(l.time);
  const o = [...n].sort((a, l) => a - l), r = [];
  for (let a = 0; a < o.length - 1; a += 1) {
    const l = i(s.map((p) => ie(p, o[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === o[a] ? d.end = o[a + 1] : r.push({ start: o[a], end: o[a + 1], value: l });
  }
  return r;
}
function Xe(s, t) {
  const e = s.filter((a) => a !== void 0);
  if (e.length < 2)
    return s.map(() => {
    });
  const i = Math.min(...e), n = Math.max(...e), o = n - i;
  if (o >= t)
    return s.map((a) => a === void 0 ? void 0 : (a - i) / o);
  const r = (n + i) / 2;
  return s.map(
    (a) => a === void 0 ? void 0 : 0.5 + (a - r) / t
  );
}
const xt = 360, _ = 60, Qe = 38, S = xt - _ - Qe, M = 14, L = c.label, Bt = {
  schedule: c.plan,
  manual: c.warning,
  off: c.closed
}, ti = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, ei = [0, 0.3, 0.6, 0.9], ii = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" }), ft = (s) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: s });
function I(s, t) {
  return _ + (s - t.startMs) / (t.endMs - t.startMs) * S;
}
function Y(s, t, e) {
  return s.map((i, n) => `${n === 0 ? "M" : "L"}${I(i.t, t).toFixed(1)} ${e(i.v).toFixed(1)}`).join(" ");
}
function ni(s, t, e, i) {
  if (s.length === 0)
    return "";
  const n = I(s[0].t, t).toFixed(1), o = I(s[s.length - 1].t, t).toFixed(1);
  return `${Y(s, t, e)} L${o} ${i} L${n} ${i} Z`;
}
function jt(s, t, e) {
  const i = s.map((l) => l.v), n = Math.min(...i), o = Math.max(...i), r = Math.max(o - n, t), a = (o + n) / 2;
  return { min: a - r / 2 - e, max: a + r / 2 + e };
}
function ne(s, t) {
  const e = [4, 3, 2, 1, 0].map((i) => s.endMs - i * 6 * ee);
  return g`${e.map((i) => {
    const n = I(i, s);
    return g`<line x1=${n} x2=${n} y1=${t - 4} y2=${t} stroke=${L} stroke-width="0.8"></line>
      <text x=${n} y=${t + 10} fill=${L} font-size="9" text-anchor="middle">${ii.format(i)}</text>`;
  })}`;
}
function dt(s, t, e, i, n) {
  return g`${s.map((o) => {
    const { fill: r, opacity: a } = n(o.value);
    if (a <= 0)
      return m;
    const l = I(o.start, t), d = Math.max(I(o.end, t) - l, 0.5);
    return g`<rect x=${l.toFixed(1)} y=${e} width=${d.toFixed(1)} height=${i} fill=${r} opacity=${a}></rect>`;
  })}`;
}
function ht(s, t) {
  return g`<text x=${_ - 6} y=${t} fill=${L} font-size="9" text-anchor="end">${s}</text>`;
}
function T(s, t, e = !1) {
  return f`<span class="legend-item">
    <span
      class="legend-swatch ${e ? "dashed" : ""}"
      style=${e ? `border-color: ${s}` : `background: ${s}`}
    ></span
    >${t}
  </span>`;
}
function si(s, t) {
  return t.some((e) => e !== void 0 && (s[e]?.length ?? 0) > 0);
}
function oi(s, t, e) {
  const i = it(t.temperature ? s[t.temperature] : void 0, e.startMs, e.endMs), n = it(t.humidity ? s[t.humidity] : void 0, e.startMs, e.endMs), o = 120, r = 126, a = 142, l = 158, d = 12, p = 182, h = [
    t.heating?.overlay ? s[t.heating.overlay] : void 0,
    t.heating?.climate ? s[t.heating.climate] : void 0
  ], $ = ct(h, e.startMs, e.endMs, ([u, w]) => {
    const J = u?.toLowerCase();
    if (w?.toLowerCase() === "off" || J === "off")
      return "off";
    if (J === "schedule" || J === "manual")
      return J;
  }), y = ct(
    [t.heating?.intensity ? s[t.heating.intensity] : void 0],
    e.startMs,
    e.endMs,
    ([u]) => {
      const w = u === void 0 ? void 0 : Number.parseFloat(u);
      return w === void 0 || !Number.isFinite(w) ? void 0 : String(te(w));
    }
  ), v = ct(
    [t.air_conditioner ? s[t.air_conditioner] : void 0],
    e.startMs,
    e.endMs,
    ([u]) => {
      if (u === void 0)
        return;
      const w = De(u);
      return w === "unknown" ? void 0 : w;
    }
  ), O = i.length > 0 ? jt(i, 2, 0.3) : void 0, b = n.length > 0 ? jt(n, 10, 1) : void 0, U = o - M, At = (u) => o - (u - (O?.min ?? 0)) / ((O?.max ?? 1) - (O?.min ?? 0)) * U, se = (u) => o - (u - (b?.min ?? 0)) / ((b?.max ?? 1) - (b?.min ?? 0)) * U, St = ft(1), kt = ft(0), oe = i.length > 0 ? Math.min(...i.map((u) => u.v)) : 0, re = i.length > 0 ? Math.max(...i.map((u) => u.v)) : 0, ae = n.length > 0 ? Math.min(...n.map((u) => u.v)) : 0, le = n.length > 0 ? Math.max(...n.map((u) => u.v)) : 0, ce = [...new Set(v.map((u) => u.value))];
  return f`
    <svg
      class="chart"
      viewBox="0 0 ${xt} 196"
      role="img"
      aria-label="Graf teploty a vlhkosti za posledních 24 hodin s vrstvami vytápění a klimatizace"
    >
      <rect x=${_} y=${M} width=${S} height=${U} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${O ? g`<path d=${ni(i, e, At, o)} fill="rgb(255 255 255 / 8%)"></path>
          <path d=${Y(i, e, At)} fill="none" stroke=${c.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          <text x=${_ - 6} y=${M + 8} fill=${c.plan} font-size="9" text-anchor="end">${St.format(re)} °C</text>
          <text x=${_ - 6} y=${o - 2} fill=${c.plan} font-size="9" text-anchor="end">${St.format(oe)} °C</text>` : g`<text x=${_ + S / 2} y=${(M + o) / 2} fill=${L} font-size="11" text-anchor="middle">––</text>`}
      ${b ? g`<path d=${Y(n, e, se)} fill="none" stroke=${c.humidity} stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"></path>
          <text x=${_ + S + 6} y=${M + 8} fill=${c.humidity} font-size="9">${kt.format(le)} %</text>
          <text x=${_ + S + 6} y=${o - 2} fill=${c.humidity} font-size="9">${kt.format(ae)} %</text>` : m}
      ${ht("Intenzita", r + 9)}
      ${dt(y, e, r, d, (u) => ({
    fill: c.warning,
    opacity: ei[Number(u)] ?? 0
  }))}
      ${ht("Topení", a + 9)}
      ${dt($, e, a, d, (u) => ({
    fill: Bt[u] ?? c.off,
    opacity: 1
  }))}
      ${ht("Klimatizace", l + 9)}
      ${dt(v, e, l, d, (u) => ({
    fill: pt[u] ?? c.off,
    opacity: 1
  }))}
      ${ne(e, p - 8)}
    </svg>
    <div class="legend">
      ${T(c.plan, "Teplota")} ${T(c.humidity, "Vlhkost", !0)}
      ${T(c.warning, "Intenzita topení: sytost = 0–3 vlny")}
    </div>
    <div class="legend">
      ${["schedule", "manual", "off"].filter((u) => $.some((w) => w.value === u)).map((u) => T(Bt[u], `Topení ${ti[u]}`))}
      ${ce.map((u) => T(pt[u], `Klimatizace ${Qt[u]}`))}
    </div>
  `;
}
function ri(s, t, e, i) {
  const n = it(t.carbon_dioxide ? s[t.carbon_dioxide] : void 0, i.startMs, i.endMs), o = it(t.pm25 ? s[t.pm25] : void 0, i.startMs, i.endMs), r = 150, a = 172, l = r - M, d = Math.max(e.co2_critical * 1.1, ...n.map((v) => v.v * 1.05)), p = Math.max(e.pm25_critical * 1.15, ...o.map((v) => v.v * 1.1)), h = (v) => r - v / d * l, $ = (v) => r - v / p * l, y = ft(0);
  return f`
    <svg
      class="chart"
      viewBox="0 0 ${xt} 186"
      role="img"
      aria-label="Graf CO₂ a PM2.5 za posledních 24 hodin"
    >
      <rect x=${_} y=${M} width=${S} height=${l} rx="6" fill="rgb(255 255 255 / 6%)"></rect>
      ${[
    { value: e.co2_warning, color: c.warning },
    { value: e.co2_critical, color: c.alert }
  ].map(
    (v) => g`<line x1=${_} x2=${_ + S} y1=${h(v.value)} y2=${h(v.value)} stroke=${v.color} stroke-width="0.8" stroke-dasharray="2 3" opacity="0.7"></line>
          <text x=${_ - 6} y=${h(v.value) + 3} fill=${v.color} font-size="9" text-anchor="end">${y.format(v.value)}</text>`
  )}
      <text x=${_ - 6} y=${r} fill=${L} font-size="9" text-anchor="end">0</text>
      <text x=${_ + S + 6} y=${r} fill=${L} font-size="9">0</text>
      <text x=${_ + S + 6} y=${$(e.pm25_critical) + 3} fill=${c.humidity} font-size="9">${y.format(e.pm25_critical)}</text>
      ${n.length > 0 ? g`<path d=${Y(n, i, h)} fill="none" stroke=${c.plan} stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>` : m}
      ${o.length > 0 ? g`<path d=${Y(o, i, $)} fill="none" stroke=${c.humidity} stroke-width="1.8" stroke-dasharray="4 3" stroke-linejoin="round"></path>` : m}
      ${ne(i, a - 8)}
    </svg>
    <div class="legend">
      ${T(c.plan, "CO₂ (ppm, levá osa)")} ${T(c.humidity, "PM2.5 (µg/m³, pravá osa)", !0)}
    </div>
  `;
}
function ai() {
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
  ].map(([t, e, i]) => g`<circle cx=${t} cy=${e} r=${i}></circle>`)}
    </svg>
  `;
}
function li(s) {
  let t;
  switch (s) {
    case "dark":
      t = g`<path d="M19.6 14.4A8.2 8.2 0 1 1 9.6 4.4a6.6 6.6 0 0 0 10 10z"></path>`;
      break;
    case "shade":
      t = g`<path d="M3.5 12.5a8.5 8.5 0 0 1 17 0z"></path>
        <path d="M12 4V2.6M12 12.5v6a2 2 0 0 1-4 0"></path>`;
      break;
    case "morning":
      t = g`<path d="M3 18h18M7.5 18a4.5 4.5 0 0 1 9 0M12 9.6V7.4M17.2 12.8l1.5-1.5M6.8 12.8l-1.5-1.5M8 21.5h8"></path>`;
      break;
    default:
      t = g`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (e) => g`<path d="M12 2.8v2.4" transform=${`rotate(${45 * e} 12 12)`}></path>`
      )}`;
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
const ci = he`
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
      background: linear-gradient(165deg, #232326 0%, #1c1c1e 55%);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
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
      color: #7dbce0;
      font-size: 18px;
      line-height: 28px;
    }

    .missing {
      color: #8e8e93;
    }

    /*
     * Lower part: info rows | micro trends | blind presets | blind panel.
     * The trend column and the blind panel are equally wide (--col); the panel is as
     * tall as the info rows (--info-height), so it starts at the CO₂ row.
     */
    .lower {
      --col: 60px;
      --preset-col: 32px;
      --air-height: 22px;
      --primary-height: 28px;
      --secondary-height: 24px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--col) var(--preset-col) var(--col);
      align-items: stretch;
      column-gap: 6px;
    }

    .info {
      min-width: 0;
    }

    .trends {
      display: grid;
      grid-template-rows:
        var(--air-height) var(--air-height)
        calc(var(--primary-height) + var(--secondary-height));
      min-width: 0;
    }

    .trend-cell {
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .spark {
      display: block;
      width: 100%;
    }

    .trend-cell.air .spark {
      height: 18px;
    }

    .trend-cell.hvac .spark {
      height: 44px;
    }

    .air-row {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--air-height);
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
      color: #5bd6b5;
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
      height: var(--primary-height);
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

    /* One column of four icon buttons, as tall as the blind panel. */
    .presets {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: 4px;
    }

    .preset {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(255 255 255 / 8%);
      border-radius: 10px;
      background: rgb(255 255 255 / 5%);
      color: var(--tone);
    }

    .preset svg {
      display: block;
      width: 18px;
      height: 18px;
    }

    .preset[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--tone) 55%, transparent);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }

    .cover-panel {
      display: block;
      min-width: 0;
      height: 100%;
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
        --col: 52px;
        --preset-col: 30px;
        column-gap: 5px;
      }
    }
`;
var di = Object.defineProperty, E = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && di(t, e, n), n;
};
const hi = 5 * 6e4, pi = 8e3, A = " ", wt = class wt extends W {
  constructor() {
    super(...arguments), this._dialogStatus = "loading", this._dialogHistory = {}, this._dialogRange = { startMs: 0, endMs: 0 }, this._trends = {}, this._trendsLoading = !1, this._trendsStarted = !1, this._dialogRequest = 0, this.handleDialogKeydown = (t) => {
      t.key === "Escape" ? (t.stopPropagation(), this.closeDialog()) : t.key === "Tab" && (t.preventDefault(), this.renderRoot.querySelector(".dialog .close")?.focus());
    };
  }
  setConfig(t) {
    this._config = Oe(t), this._trends = {}, this._trendsStarted = !1;
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
    }, hi)), t.has("_dialog") && this._dialog && this.renderRoot.querySelector(".dialog .close")?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of Ue(this._config)) {
      const i = t.states[e], n = this.hass.states[e];
      if (i?.state !== n?.state || !je(i?.attributes, n?.attributes))
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
    const t = this.entityState(this._config.house_mode_entity ?? Jt)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", n = this.thresholds();
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
      (o) => this.renderRoom(o, e, i, n)
    )}
          </div>
        </div>
        ${this.renderDialog(n)}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...Xt, ...this._config?.thresholds };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return m;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), n = this.numberState(t.minimum), o = this.numberState(t.maximum), r = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = n !== void 0 && o !== void 0 ? `${e.format(n)}–${e.format(o)}${A}°C` : void 0, d = [
      i === void 0 ? void 0 : `${e.format(i)}${A}°C`,
      l,
      r === void 0 ? void 0 : `☂${A}${e.format(r)}${A}%`
    ].filter((y) => y !== void 0), p = this.thresholds();
    let h = "––", $ = c.label;
    return a !== void 0 && (a >= p.pm25_critical ? (h = "špatný", $ = c.alert) : a >= p.pm25_warning ? (h = "zhoršený", $ = c.warning) : h = "dobrý"), d.length === 0 && !t.pm25 ? m : f`<div class="outside">
      ${d.length > 0 ? f`<div>${d.join(" · ")}</div>` : m}
      ${t.pm25 ? f`<div>Vzduch venku: <span style=${`color: ${$}`}>${h}</span></div>` : m}
    </div>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, n) {
    const o = this.reading(t.temperature, "°C", 1), r = this.reading(t.humidity, "%", 0), a = this.reading(t.carbon_dioxide, "ppm", 0), l = this.reading(t.pm25, "µg/m³", 0), d = Le(
      o.value,
      r.value,
      a.value,
      l.value,
      e,
      i,
      n
    ), p = e;
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
            ${o.value === void 0 ? f`<span class="missing">––</span>` : f`${Ie(o.value)}<span class="temperature-unit">${A}°C</span>`}
          </button>
          <span class="humidity">
            ${r.value === void 0 ? f`<span class="missing">––</span>` : f`${Math.round(r.value)}${A}%`}
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
      n.co2_warning,
      n.co2_critical
    )}
            ${this.renderAirRow(
      t,
      ai(),
      "PM2.5",
      l,
      "µg/m³",
      n.pm25_warning,
      n.pm25_critical
    )}
            ${p ? this.renderClimate(t.air_conditioner, !0) : this.renderHeating(t.heating, !0)}
            ${p ? this.renderHeating(t.heating, !1) : this.renderClimate(t.air_conditioner, !1)}
            ${this.renderWindow(t.window)}
          </div>
          <div class="trends">
            <div class="trend-cell air">
              ${this.renderSpark(t.carbon_dioxide, rt.co2, "Trend CO₂", 18, c.mint)}
            </div>
            <div class="trend-cell air">
              ${this.renderSpark(t.pm25, rt.pm25, "Trend PM2.5", 18, c.mint)}
            </div>
            <div class="trend-cell hvac">
              ${this.renderSpark(
      t.temperature,
      rt.temperature,
      "Trend teploty",
      44,
      c.peach
    )}
            </div>
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : f`<div class="presets" aria-hidden="true"></div>
                <div class="cover-panel" aria-hidden="true"></div>`}
        </div>
      </article>
    `;
  }
  renderAirRow(t, e, i, n, o, r, a) {
    const l = n.value === void 0 ? c.label : n.value >= a ? c.alert : n.value >= r ? c.warning : c.white, d = !t.carbon_dioxide && !t.pm25;
    return f`
      <button
        type="button"
        class="plain-button air-row"
        ?disabled=${d}
        aria-label=${`${t.name}: ${i}, graf CO₂ a PM2.5 za 24 hodin`}
        @click=${(p) => this.openDialog("air", t, p)}
      >
        <span class="air-icon" aria-hidden="true">${e}</span>
        ${n.value === void 0 ? f`<span style=${`color: ${c.label}`}>––</span>` : f`<span style=${`color: ${l}`}>${Math.round(n.value)}</span>
              <span class="air-value-unit">${o}</span>`}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample. It is as wide as the blind panel.
   */
  renderSpark(t, e, i, n, o) {
    const r = t ? this._trends[t] : void 0;
    if (!r)
      return m;
    const a = q, l = Xe(r, e), d = 3, p = 4, h = l.map(
      (b, U) => b === void 0 ? void 0 : {
        x: d + U / (It - 1) * (a - 2 * d),
        y: p + (1 - b) * (n - 2 * p)
      }
    ).filter((b) => b !== void 0);
    if (h.length < 2)
      return m;
    const $ = h.map((b) => `${b.x.toFixed(1)},${b.y.toFixed(1)}`).join(" "), y = h[0], v = h[h.length - 1], O = `${$} ${v.x.toFixed(1)},${n} ${y.x.toFixed(1)},${n}`;
    return f`<svg
      class="spark"
      viewBox="0 0 ${a} ${n}"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-label=${i}
    >
      <polygon points=${O} fill=${o} fill-opacity="0.08"></polygon>
      <polyline
        points=${$}
        fill="none"
        stroke=${o}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      ></polyline>
      <circle cx=${v.x.toFixed(1)} cy=${v.y.toFixed(1)} r="2.2" fill=${o}></circle>
    </svg>`;
  }
  // --------------------------------------------------------------- Topení
  renderHeating(t, e) {
    const i = this.entityState(t?.climate)?.toLowerCase(), n = this.entityState(t?.overlay)?.toLowerCase(), o = n === void 0 || R(n), r = i === "off" || n === "off", a = this.numberState(t?.intensity), l = this.numberState(t?.target);
    let d = "––", p = c.label, h = !1, $ = "";
    r ? (d = "Vypnuto", p = c.off) : !o && (i === void 0 || R(i)) ? d = "––" : n === "schedule" ? (d = "Plán", p = c.plan, h = !0, l !== void 0 && ($ = `· ${lt(l)}${A}°C`)) : n === "manual" ? (d = "Ručně", p = c.warning, h = !0, l !== void 0 && ($ = `· ${lt(l)}${A}°C`)) : !o && n && (d = n, p = c.warning, h = !0);
    const y = r || o ? 0 : te(a);
    return this.renderSystemRow(
      this.renderHeatingWaves(y, o),
      d,
      p,
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
    let n = "unknown", o, r;
    if (i && !R(i.state.toLowerCase())) {
      const h = i.state.toLowerCase(), $ = String(i.attributes.preset_mode ?? "none").toLowerCase();
      h === "off" ? n = "off" : h === "cool" ? n = $ === "wind_free" ? "wind_free" : "cool" : h === "dry" ? n = "dry" : h === "fan_only" ? n = "fan" : h === "heat" ? n = "heat" : h === "auto" && (n = "auto"), n !== "off" && n !== "unknown" && n !== "wind_free" && $ !== "none" && $ !== "" && (r = He($)), o = at(i.attributes.temperature);
    }
    const a = pt[n], d = ["cool", "wind_free", "dry", "heat", "auto"].includes(n) && o !== void 0 ? `· ${lt(o)}${A}°C` : "", p = n !== "off" && n !== "unknown";
    return this.renderSystemRow(
      this.renderClimateIcon(n, a, n === "unknown"),
      r ?? Qt[n],
      a,
      e && p,
      d,
      e
    );
  }
  renderClimateIcon(t, e, i) {
    let n;
    const o = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, r = g`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
    switch (t) {
      case "cool":
      case "wind_free":
        n = g`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>
          <g transform="rotate(60 12 12)">${o}</g>
          <g transform="rotate(120 12 12)">${o}</g>`;
        break;
      case "dry":
        n = g`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
        break;
      case "fan":
        n = g`${r}<g transform="rotate(120 12 12)">${r}</g>
          <g transform="rotate(240 12 12)">${r}</g>`;
        break;
      case "heat":
        n = g`<circle cx="12" cy="12" r="4"></circle>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(
          (a) => g`<path d="M12 3v2.5" transform=${`rotate(${45 * a} 12 12)`}></path>`
        )}`;
        break;
      case "auto":
        n = g`<circle cx="12" cy="12" r="9"></circle>
          <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
        break;
      default:
        n = g`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
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
        ${n}
      </svg>
    `;
  }
  renderSystemRow(t, e, i, n, o, r) {
    return f`
      <div
        class="system-row ${r ? "primary" : ""} ${n ? "strong" : ""}"
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
    const e = this.entityState(t)?.toLowerCase(), i = e === void 0 || R(e), n = e === "on", o = i ? c.label : n ? c.sky : c.label, r = i ? "––" : n ? "Otevřeno" : "Zavřeno";
    return f`
      <div class="system-row window-row ${n ? "strong" : ""}" style=${`--row-color: ${o}`}>
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
    const i = this.getState(e), n = i !== void 0 && !R(i.state.toLowerCase()), o = n ? at(i.attributes.current_position) : void 0, r = n ? at(i.attributes.current_tilt_position) : void 0, l = o !== void 0 && r !== void 0 ? `poloha ${Math.round(o)} %, naklopení ${Math.round(r)} %` : "poloha nebo naklopení neznámé";
    return f`
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${Re.map((d) => this.renderPreset(t, d, o, r))}
      </div>
      <button
        type="button"
        class="plain-button cover-panel"
        aria-label=${`${t.name}: žaluzie, ${l}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${q} ${ut}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${Ke(o, r)}
        </svg>
      </button>
    `;
  }
  renderPreset(t, e, i, n) {
    const o = i !== void 0 && n !== void 0 && Math.abs(i - e.position) <= 2 && Math.abs(n - e.tilt) <= 2;
    return f`
      <button
        type="button"
        class="plain-button preset"
        style=${`--tone: ${e.tone}`}
        title=${e.label}
        aria-pressed=${o ? "true" : "false"}
        aria-label=${`${t.name}: žaluzie ${e.label}, ${e.description} (poloha ${e.position} %, naklopení ${e.tilt} %)`}
        @click=${() => {
      this.applyPreset(t, e);
    }}
      >
        ${li(e.id)}
      </button>
    `;
  }
  async applyPreset(t, e) {
    if (!(!this.hass || !t.cover))
      try {
        await this.hass.callService(Dt.domain, Dt.service, {
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
    }, pi);
  }
  // ---------------------------------------------------------------- dialog
  renderDialog(t) {
    const e = this._dialog;
    if (!e)
      return m;
    const i = e.kind === "room" ? "Historie místnosti – 24 h" : "CO₂ a PM2.5 – 24 h", n = e.kind === "room" ? [e.room.temperature, e.room.humidity] : [e.room.carbon_dioxide, e.room.pm25];
    let o;
    return this._dialogStatus === "loading" ? o = f`<p class="dialog-message">Načítám historii…</p>` : this._dialogStatus === "error" ? o = f`<p class="dialog-message" role="alert">
        Historii se nepodařilo načíst.
      </p>` : si(this._dialogHistory, n) ? e.kind === "room" ? o = oi(this._dialogHistory, e.room, this._dialogRange) : o = ri(this._dialogHistory, e.room, t, this._dialogRange) : o = f`<p class="dialog-message">Za posledních 24 hodin nejsou k dispozici data.</p>`, f`
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
    const t = Be(this._config);
    if (t.length === 0)
      return;
    this._trendsLoading = !0;
    const e = Date.now(), i = e - Ze;
    try {
      const n = await Ut(this.hass, t, i, e), o = {};
      for (const r of t)
        o[r] = Je(n[r], i, e, It);
      this._trends = o;
    } catch (n) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", n);
    } finally {
      this._trendsLoading = !1;
    }
  }
  // ----------------------------------------------------------------- state
  reading(t, e, i) {
    const n = this.getState(t), o = this.numberState(t);
    if (o === void 0)
      return {};
    const r = String(n?.attributes.unit_of_measurement ?? e);
    return {
      value: o,
      text: `${new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: i }).format(o)} ${r}`
    };
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || R(e.toLowerCase()))
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
wt.styles = ci;
let x = wt;
E([
  P()
], x.prototype, "_config");
E([
  Gt({ attribute: !1 })
], x.prototype, "hass");
E([
  P()
], x.prototype, "_dialog");
E([
  P()
], x.prototype, "_dialogStatus");
E([
  P()
], x.prototype, "_dialogHistory");
E([
  P()
], x.prototype, "_dialogRange");
E([
  P()
], x.prototype, "_trends");
E([
  P()
], x.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", x);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
