const pt = globalThis, Pt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zt = /* @__PURE__ */ Symbol(), Dt = /* @__PURE__ */ new WeakMap();
let me = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Pt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Le = (s) => new me(typeof s == "string" ? s : s + "", void 0, zt), De = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new me(e, s, zt);
}, Ie = (s, t) => {
  if (Pt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = pt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, It = Pt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Le(e);
})(s) : s;
const { is: Ue, defineProperty: Be, getOwnPropertyDescriptor: je, getOwnPropertyNames: We, getOwnPropertySymbols: qe, getPrototypeOf: Ye } = Object, $t = globalThis, Ut = $t.trustedTypes, Ve = Ut ? Ut.emptyScript : "", Ke = $t.reactiveElementPolyfillSupport, tt = (s, t) => s, mt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ve : null;
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
} }, Ft = (s, t) => !Ue(s, t), Bt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: Ft };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), $t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let j = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Bt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Be(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = je(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const a = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = Ye(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, i = [...We(e), ...qe(e)];
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
      for (const n of i) e.unshift(It(n));
    } else t !== void 0 && e.push(It(t));
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
    return Ie(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : mt;
      this._$Em = n;
      const a = o.fromAttribute(e, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Ft)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: o } = r, a = this[n];
        o !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[tt("elementProperties")] = /* @__PURE__ */ new Map(), j[tt("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: j }), ($t.reactiveElementVersions ??= []).push("2.1.2");
const Ot = globalThis, jt = (s) => s, gt = Ot.trustedTypes, Wt = gt ? gt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ge = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + R, Ge = `<${$e}>`, U = document, it = () => U.createComment(""), st = (s) => s === null || typeof s != "object" && typeof s != "function", Rt = Array.isArray, Ze = (s) => Rt(s) || typeof s?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Yt = />/g, H = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Kt = /"/g, ve = /^(?:script|style|textarea|title)$/i, be = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), m = be(1), $ = be(2), V = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), I = U.createTreeWalker(U, 129);
function ye(s, t) {
  if (!Rt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const Xe = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Z;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, u, c = -1, g = 0;
    for (; g < l.length && (o.lastIndex = g, u = o.exec(l), u !== null); ) g = o.lastIndex, o === Z ? u[1] === "!--" ? o = qt : u[1] !== void 0 ? o = Yt : u[2] !== void 0 ? (ve.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = H) : u[3] !== void 0 && (o = H) : o === H ? u[0] === ">" ? (o = n ?? Z, c = -1) : u[1] === void 0 ? c = -2 : (c = o.lastIndex - u[2].length, h = u[1], o = u[3] === void 0 ? H : u[3] === '"' ? Kt : Vt) : o === Kt || o === Vt ? o = H : o === qt || o === Yt ? o = Z : (o = H, n = void 0);
    const v = o === H && s[a + 1].startsWith("/>") ? " " : "";
    r += o === Z ? l + Ge : c >= 0 ? (i.push(h), l.slice(0, c) + ge + l.slice(c) + R + v) : l + R + (c === -2 ? a : v);
  }
  return [ye(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class nt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, u] = Xe(t, e);
    if (this.el = nt.createElement(h, i), I.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = I.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(ge)) {
          const g = u[o++], v = n.getAttribute(c).split(R), b = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: b[2], strings: v, ctor: b[1] === "." ? Qe : b[1] === "?" ? ti : b[1] === "@" ? ei : vt }), n.removeAttribute(c);
        } else c.startsWith(R) && (l.push({ type: 6, index: r }), n.removeAttribute(c));
        if (ve.test(n.tagName)) {
          const c = n.textContent.split(R), g = c.length - 1;
          if (g > 0) {
            n.textContent = gt ? gt.emptyScript : "";
            for (let v = 0; v < g; v++) n.append(c[v], it()), I.nextNode(), l.push({ type: 2, index: ++r });
            n.append(c[g], it());
          }
        }
      } else if (n.nodeType === 8) if (n.data === $e) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(R, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += R.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = U.createElement("template");
    return i.innerHTML = t, i;
  }
}
function K(s, t, e = s, i) {
  if (t === V) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = st(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = K(s, n._$AS(s, t.values), n, i)), t;
}
class Je {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? U).importNode(e, !0);
    I.currentNode = n;
    let r = I.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new ot(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new ii(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      o !== l?.index && (r = I.nextNode(), o++);
    }
    return I.currentNode = U, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = K(this, t, e), st(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && st(this._$AH) ? this._$AA.nextSibling.data = t : this.T(U.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = nt.createElement(ye(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new Je(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Gt.get(t.strings);
    return e === void 0 && Gt.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new ot(this.O(it()), this.O(it()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = jt(t).nextSibling;
      jt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = K(this, t, e, 0), o = !st(t) || t !== this._$AH && t !== V, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = K(this, a[i + l], e, l), h === V && (h = this._$AH[l]), o ||= !st(h) || h !== this._$AH[l], h === p ? t = p : t !== p && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qe extends vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ti extends vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class ei extends vt {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = K(this, t, e, 0) ?? p) === V) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ii {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    K(this, t);
  }
}
const si = Ot.litHtmlPolyfillSupport;
si?.(nt, ot), (Ot.litHtmlVersions ??= []).push("3.3.3");
const ni = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new ot(t.insertBefore(it(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const Nt = globalThis;
class et extends j {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ni(e, this.renderRoot, this.renderOptions);
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
et._$litElement$ = !0, et.finalized = !0, Nt.litElementHydrateSupport?.({ LitElement: et });
const ri = Nt.litElementPolyfillSupport;
ri?.({ LitElement: et });
(Nt.litElementVersions ??= []).push("4.2.2");
const oi = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: Ft }, ai = (s = oi, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
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
function we(s) {
  return (t, e) => typeof e == "object" ? ai(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
function S(s) {
  return we({ ...s, state: !0, attribute: !1 });
}
const li = ["bedroom", "office", "kids", "living"], _e = "none", xe = "input_select.house_mode", ke = {
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
function hi(s) {
  if (!s || !Array.isArray(s.rooms) || s.rooms.length === 0)
    throw new Error("Klima Dashboard requires a non-empty rooms list.");
  if (s.house_mode_entity !== void 0 && (typeof s.house_mode_entity != "string" || !s.house_mode_entity.trim()))
    throw new Error("house_mode_entity must be a non-empty entity ID.");
  for (const e of s.rooms) {
    if (!e || typeof e.name != "string" || !e.name.trim())
      throw new Error("Each Klima Dashboard room requires a name.");
    const i = e;
    for (const [r, o] of [
      ["tado", "heating"],
      ["samsung", "air_conditioner"]
    ])
      if (r in i)
        throw new Error(`Room "${e.name}": key "${r}" was renamed to "${o}".`);
    const n = [...li, _e];
    if (e.scene !== void 0 && !n.includes(e.scene))
      throw new Error(`Room "${e.name}": scene must be one of ${n.join(", ")}.`);
    if (e.heating && "heating" in e.heating)
      throw new Error(`Room "${e.name}": key "heating.heating" was renamed to "heating.intensity".`);
  }
  for (const [e, i] of Object.entries(s.thresholds ?? {}))
    if (typeof i != "number" || !Number.isFinite(i))
      throw new Error(`Threshold "${e}" must be a finite number.`);
  const t = { ...ke, ...s.thresholds };
  if (t.humidity_min >= t.humidity_max || t.co2_warning >= t.co2_critical || t.pm25_warning >= t.pm25_critical || t.winter_min > t.winter_max || t.summer_min > t.summer_max)
    throw new Error("Threshold ranges must be in ascending order.");
  if (t.stale_minutes <= 0)
    throw new Error('Threshold "stale_minutes" must be greater than 0.');
  return { ...s, thresholds: t };
}
const Zt = { domain: "script", service: "zaluzie_posun" }, Xt = [
  { id: "open", label: "Den", description: "vytaženo nahoru", position: 100, tilt: 100 },
  { id: "shade", label: "Stín", description: "spuštěno, lamely otevřené", position: 0, tilt: 100 },
  { id: "dark", label: "Tma", description: "úplné zatemnění", position: 0, tilt: 0 }
], Jt = 2;
function wt(s, t, e) {
  return s !== void 0 && t !== void 0 && Math.abs(s - e.position) <= Jt && Math.abs(t - e.tilt) <= Jt;
}
const X = { temperature: 1, co2: 100, pm25: 5 }, d = {
  background: "#1C1C1E",
  open: "#D8D8DC",
  closed: "#6B6B70",
  /** Lowered blind (champagne) and the window behind it (sky). */
  blind: "#E8D9B5",
  sky: "#64D2FF",
  /** CO₂ icon and its micro trend (lime) and PM2.5 icon and its micro trend (violet). */
  co2: "#A6E36B",
  pm25: "#B8A6FF",
  /** Temperature micro trend. */
  peach: "#FFB36B",
  /** Humidity value: deliberately uncoloured. */
  neutral: "#C7C7CC",
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
}, rt = {
  off: d.off,
  cool: d.cool,
  wind_free: d.cool,
  dry: d.dry,
  fan: d.plan,
  heat: d.heat,
  auto: d.auto,
  unknown: d.off
}, bt = {
  off: "Vypnuto",
  cool: "Chlazení",
  wind_free: "WindFree",
  dry: "Sušení",
  fan: "Větrání",
  heat: "Topení",
  auto: "Auto",
  unknown: "––"
}, ci = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Se(s) {
  const t = ci[s];
  if (t)
    return t;
  const e = s.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Me(s) {
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
function di(s, t, e, i) {
  const n = [
    ["teplota", s.temperature],
    ["vlhkost", s.humidity],
    ["CO₂", s.co2],
    ["PM2.5", s.pm25],
    ["režim domu", e ? { value: 1 } : void 0]
  ];
  for (const [c, g] of n) {
    if (g?.value === void 0)
      return { label: `Bez dat · ${c}`, color: d.label, kind: "unknown" };
    if (g.stale) {
      const v = g.ageMinutes === void 0 ? "" : ` (před ${Ae(g.ageMinutes)})`;
      return { label: `Bez dat · ${c}${v}`, color: d.label, kind: "unknown" };
    }
  }
  const r = s.temperature.value, o = s.humidity.value, a = s.co2.value;
  if (s.pm25.value >= i.pm25_critical)
    return { label: "Znečištěný vzduch", color: d.alert, kind: "critical" };
  if (a >= i.co2_critical)
    return { label: "Silně vydýchaný vzduch", color: d.alert, kind: "critical" };
  if (a >= i.co2_warning)
    return { label: "Vydýchaný vzduch", color: d.warning, kind: "warning" };
  if (o > i.humidity_max)
    return { label: "Vlhko", color: d.warning, kind: "warning" };
  if (o < i.humidity_min)
    return { label: "Sucho", color: d.warning, kind: "warning" };
  const h = t ? i.summer_min : i.winter_min, u = t ? i.summer_max : i.winter_max;
  return r > u ? { label: "Teplo", color: d.warning, kind: "warning" } : r < h ? { label: "Chladno", color: d.cold, kind: "warning" } : { label: "Příjemné", color: d.label, kind: "normal" };
}
function Qt(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function E(s) {
  return s === "" || s === "unknown" || s === "unavailable" || s === "none";
}
function D(s) {
  if (s == null || s === "")
    return;
  const t = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function kt(s) {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(s);
}
function Te(s) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 }).format(
    Math.round(s * 2) / 2
  );
}
function Ee(s) {
  return s === void 0 || s <= 0 ? 0 : s <= 34 ? 1 : s <= 67 ? 2 : 3;
}
function pi(s) {
  const t = /* @__PURE__ */ new Set(), e = (i) => {
    i && t.add(i);
  };
  e(s.house_mode_entity ?? xe), e(s.outside?.temperature), e(s.outside?.minimum), e(s.outside?.maximum), e(s.outside?.rain_probability), e(s.outside?.pm25);
  for (const i of s.rooms)
    e(i.temperature), e(i.humidity), e(i.carbon_dioxide), e(i.pm25), e(i.window), e(i.cover), e(i.heating?.climate), e(i.heating?.overlay), e(i.heating?.target), e(i.heating?.intensity), e(i.air_conditioner);
  return t;
}
function ui(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s.rooms)
    for (const i of [e.temperature, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
function fi(s, t) {
  if (s === t)
    return !0;
  if (!s || !t)
    return !1;
  const e = Object.keys(s), i = Object.keys(t);
  return e.length === i.length && e.every((n) => Object.hasOwn(t, n) && s[n] === t[n]);
}
function Ae(s) {
  return s < 60 ? `${Math.max(1, Math.round(s))} min` : s < 2880 ? `${Math.floor(s / 60)} h` : `${Math.floor(s / 1440)} d`;
}
function te(s, t) {
  const e = (s ?? []).filter((n) => n !== void 0);
  if (e.length < 2)
    return;
  const i = e[e.length - 1] - e[0];
  return i >= t / 2 ? "stoupá" : i <= -t / 2 ? "klesá" : "stabilní";
}
function Ce(s, t, e, i) {
  return s === 1 ? t : s >= 2 && s <= 4 ? e : i;
}
function mi(s) {
  const t = /* @__PURE__ */ new Set();
  for (const e of s.rooms)
    for (const i of [e.temperature, e.humidity, e.carbon_dioxide, e.pm25])
      i && t.add(i);
  return [...t];
}
const ut = 60, St = 142, ee = 11, at = 3, gi = 0.8, ie = 2, $i = 0.28, vi = 0.5, bi = 0.7;
function yi(s, t) {
  if (s === void 0 || t === void 0)
    return $`<rect
      x="0.75"
      y="0.75"
      width=${ut - 1.5}
      height=${St - 1.5}
      rx="6"
      fill="none"
      stroke=${d.off}
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const e = St - at - 1, i = e / ee, n = i - gi, r = n - t / 100 * (n - ie), o = at + 1 + (100 - s) / 100 * e, a = Array.from({ length: ee }, (l, h) => {
    const u = at + 1 + h * i + i / 2, c = u <= o, g = c ? r : ie;
    return $`<rect
      x="0"
      y=${(u - g / 2).toFixed(2)}
      width=${ut}
      height=${g.toFixed(2)}
      rx=${Math.min(1.5, g / 2).toFixed(2)}
      fill=${c ? d.blind : d.sky}
      opacity=${c ? vi : $i}
    ></rect>`;
  });
  return $`<rect
      class="rail"
      x="0"
      y="0"
      width=${ut}
      height=${at}
      rx="1.5"
      fill=${d.blind}
      opacity=${bi}
    ></rect>${a}`;
}
const Pe = 36e5, wi = 120 * 6e4, se = 12;
function _i(s) {
  if (s == null)
    return;
  if (typeof s == "number")
    return Number.isFinite(s) ? s < 1e11 ? s * 1e3 : s : void 0;
  const t = Date.parse(s);
  return Number.isNaN(t) ? void 0 : t;
}
function xi(s, t) {
  const e = {};
  for (const [i, n] of Object.entries(s ?? {})) {
    if (!Array.isArray(n))
      continue;
    const r = [];
    n.forEach((o, a) => {
      const l = o.s ?? o.state, h = _i(o.lu ?? o.last_updated ?? o.lc ?? o.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && h !== void 0 && r.push({ time: Math.max(h, t), state: l });
    }), r.sort((o, a) => o.time - a.time), e[i] = r;
  }
  return e;
}
async function ne(s, t, e, i) {
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
  return xi(n, e);
}
function ze(s, t) {
  let e;
  for (const i of s ?? []) {
    if (i.time > t)
      break;
    e = i.state;
  }
  return e;
}
function Mt(s) {
  if (s === void 0)
    return;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : void 0;
}
function ki(s, t, e, i) {
  const n = (e - t) / i, r = (s ?? []).filter((o) => Mt(o.state) !== void 0);
  return Array.from(
    { length: i },
    (o, a) => Mt(ze(r, t + (a + 1) * n))
  );
}
function re(s, t, e) {
  const i = [];
  for (const r of s ?? []) {
    const o = Mt(r.state);
    o !== void 0 && r.time <= e && i.push({ t: Math.max(r.time, t), v: o });
  }
  const n = i[i.length - 1];
  return n && n.t < e && i.push({ t: e, v: n.v }), i;
}
function lt(s, t, e, i) {
  const n = /* @__PURE__ */ new Set([t, e]);
  for (const a of s)
    for (const l of a ?? [])
      l.time > t && l.time < e && n.add(l.time);
  const r = [...n].sort((a, l) => a - l), o = [];
  for (let a = 0; a < r.length - 1; a += 1) {
    const l = i(s.map((u) => ze(u, r[a])));
    if (l === void 0)
      continue;
    const h = o[o.length - 1];
    h && h.value === l && h.end === r[a] ? h.end = r[a + 1] : o.push({ start: r[a], end: r[a + 1], value: l });
  }
  return o;
}
function _t(s, t) {
  let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const o of s)
    for (const a of o ?? [])
      a !== void 0 && Number.isFinite(a) && (e = Math.min(e, a), i = Math.max(i, a));
  if (!Number.isFinite(e) || !Number.isFinite(i) || t <= 0)
    return;
  let n = Math.floor(e / t) * t, r = Math.ceil(i / t) * t;
  return r - n < t && (n -= t, r += t), { min: n, max: r };
}
function Si(s, t) {
  const e = t.max - t.min;
  return s.map(
    (i) => i === void 0 || e <= 0 ? void 0 : Math.min(1, Math.max(0, (i - t.min) / e))
  );
}
function Mi() {
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
function Ti(s) {
  const t = (n, r, o, a) => $`<rect x=${n} y=${r} width=${o} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, e = (n) => $`<path d="M27.5 6.7V${n}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${n + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let i;
  switch (s) {
    case "open":
      i = $`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${e(21)}`;
      break;
    case "shade":
      i = $`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${e(26)}`;
      break;
    default:
      i = $`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${e(26)}`;
  }
  return m`
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
function Tt(s, t) {
  return m`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${[0, 1, 2].map(
    (e) => $`<path
          d="M${6 + 6 * e} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
          stroke=${e < s ? d.warning : d.off}
          stroke-dasharray=${t ? "1.6 2.6" : p}
        ></path>`
  )}
    </svg>
  `;
}
function ft(s, t, e) {
  let i;
  const n = $`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, r = $`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (s) {
    case "cool":
    case "wind_free":
      i = $`${n}
        <g transform="rotate(60 12 12)">${n}</g>
        <g transform="rotate(120 12 12)">${n}</g>`;
      break;
    case "dry":
      i = $`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      i = $`${r}<g transform="rotate(120 12 12)">${r}</g>
        <g transform="rotate(240 12 12)">${r}</g>`;
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
function oe(s, t) {
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
function Ei(s) {
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
const A = 4, Ai = 32, W = 6, q = 150, C = W + q, J = 10, Ci = C + 20, ae = C + 25, Pi = C + 50, ht = C + 55, zi = C + 83, le = C + 90, ct = 11, Fi = 22, Oi = 6, Ri = [0, 0.24, 0.44, 0.68], he = "history-under-temperature", Et = {
  schedule: d.plan,
  manual: d.warning,
  off: d.closed
}, Fe = {
  schedule: "Plán",
  manual: "Ručně",
  off: "Vypnuto"
}, Oe = new Intl.DateTimeFormat("cs-CZ", { hour: "2-digit", minute: "2-digit" });
function xt(s, t) {
  const e = s?.toLowerCase();
  return t?.toLowerCase() === "off" || e === "off" ? "off" : e === "schedule" || e === "manual" ? e : void 0;
}
function ce(s) {
  if (s === void 0)
    return;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : void 0;
}
function Ni(s, t, e) {
  const i = (y) => y ? s[y] : void 0, { startMs: n, endMs: r } = e, o = i(t.heating?.overlay), a = i(t.heating?.climate), l = re(i(t.temperature), n, r), h = re(i(t.humidity), n, r), u = lt([o, a], n, r, ([y, T]) => xt(y, T)), c = lt(
    [o, a, i(t.heating?.intensity)],
    n,
    r,
    ([y, T, G]) => {
      const N = xt(y, T), f = Ee(ce(G));
      return N === void 0 || N === "off" || f === 0 ? void 0 : String(f);
    }
  ), g = lt(
    [o, a, i(t.heating?.target)],
    n,
    r,
    ([y, T, G]) => {
      const N = xt(y, T), f = ce(G);
      return N === "schedule" || N === "manual" ? f === void 0 ? void 0 : String(f) : void 0;
    }
  ), v = lt([i(t.air_conditioner)], n, r, ([y]) => {
    const T = Me(y);
    return T === "unknown" ? void 0 : T;
  }), b = [...l.map((y) => y.v), ...g.map((y) => Number(y.value))];
  let w = 19, M = 23;
  if (b.length > 0 && (w = Math.floor(Math.min(...b) - 0.2), M = Math.ceil(Math.max(...b) + 0.2), M - w < 3)) {
    const y = 3 - (M - w);
    w -= Math.floor(y / 2), M = w + 3;
  }
  const _ = M - w <= 6 ? 1 : 2, P = h.map((y) => y.v);
  return {
    range: e,
    temperature: l,
    humidity: h,
    heating: u,
    intensity: c,
    target: g,
    climate: v,
    tempMin: w,
    tempMax: M,
    tempStep: _,
    humidityMin: P.length > 0 ? Math.min(...P) : void 0,
    humidityMax: P.length > 0 ? Math.max(...P) : void 0
  };
}
function Hi(s) {
  return s.temperature.length > 0 || s.humidity.length > 0 || s.heating.length > 0;
}
function Y(s) {
  return s - A - Ai;
}
function Li(s, t, e) {
  return A + (s - t.startMs) / (t.endMs - t.startMs) * Y(e);
}
function Di(s, t, e) {
  const i = Math.min(1, Math.max(0, (s - A) / Y(t)));
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
function dt(s, t, e) {
  return s.find(
    (i) => i.start <= t && (t < i.end || t === e && i.end === e)
  )?.value;
}
function Ii(s) {
  const t = [], e = new Date(s.startMs);
  for (e.setHours(0, 0, 0, 0), e.setDate(e.getDate() - 1); e.getTime() < s.endMs; ) {
    const i = new Date(e);
    i.setHours(Fi, 0, 0, 0);
    const n = new Date(e);
    n.setDate(n.getDate() + 1), n.setHours(Oi, 0, 0, 0);
    const r = Math.max(i.getTime(), s.startMs), o = Math.min(n.getTime(), s.endMs);
    o > r && t.push([r, o]), e.setDate(e.getDate() + 1);
  }
  return t;
}
function Ui(s) {
  const t = [], e = new Date(s.startMs);
  for (e.setMinutes(0, 0, 0), e.setHours(Math.ceil(e.getHours() / 6) * 6); e.getTime() <= s.endMs; )
    e.getTime() >= s.startMs && t.push(e.getTime()), e.setHours(e.getHours() + 6);
  return t;
}
function L(s, t, e = "block") {
  return m`<span class="legend-item">
    <span class="legend-swatch ${e}" style=${e === "block" ? `background: ${s}` : `border-color: ${s}`}></span
    >${t}
  </span>`;
}
function Bi(s, t) {
  const e = t ?? s.range.endMs, i = At(s.temperature, e), n = At(s.humidity, e), r = dt(s.heating, e, s.range.endMs), o = Number(dt(s.intensity, e, s.range.endMs) ?? 0), a = dt(s.target, e, s.range.endMs), l = dt(s.climate, e, s.range.endMs);
  let h = "Teď";
  t !== void 0 && (h = `${new Date(t).toDateString() === new Date(s.range.endMs).toDateString() ? "" : "včera "}${Oe.format(t)}`);
  const u = r === void 0 ? "––" : `${Fe[r]}${r !== "off" && a !== void 0 ? ` · ${Te(Number(a))} °C` : ""}`, c = l ? bt[l] : "––", g = l ? rt[l] : d.off;
  return m`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${h}</span>
        <span class="readout-temp">${i === void 0 ? "––" : `${kt(i)} °C`}</span>
        <span class="readout-hum">${n === void 0 ? "" : `${Math.round(n)} %`}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r ? Et[r] : d.label}`}>
          <span class="readout-icon">${Tt(r && r !== "off" ? o : 0, r === void 0)}</span>
          Topení ${u}
        </span>
        <span class="readout-system" style=${`color: ${g}`}>
          <span class="readout-icon">${ft(l ?? "off", g, l === void 0)}</span>
          Klimatizace ${c}
        </span>
      </div>
    </div>
  `;
}
function ji(s, t, e) {
  const { range: i } = s, n = (f) => Li(f, i, t), r = (f) => C - (f - s.tempMin) / (s.tempMax - s.tempMin) * q, o = (s.humidityMin ?? 0) - 3, a = Math.max((s.humidityMax ?? 100) + 3, o + 12), l = (f) => C - (f - o) / (a - o) * q, h = A + Y(t), u = (f, z) => f.map((F, O) => `${O === 0 ? "M" : "L"}${n(F.t).toFixed(1)} ${z(F.v).toFixed(1)}`).join(" "), c = u(s.temperature, r), g = s.temperature[0], v = s.temperature[s.temperature.length - 1], b = g && v ? `${c} L${n(v.t).toFixed(1)} ${C} L${n(g.t).toFixed(1)} ${C} Z` : "";
  let w = "";
  s.target.forEach((f, z) => {
    const F = r(Number(f.value)).toFixed(1), O = s.target[z - 1];
    w += O && O.end === f.start ? ` L${n(f.start).toFixed(1)} ${F}` : ` M${n(f.start).toFixed(1)} ${F}`, w += ` L${n(f.end).toFixed(1)} ${F}`;
  });
  const M = [];
  for (let f = s.tempMin; f <= s.tempMax; f += s.tempStep)
    M.push(f);
  const _ = (f, z, F) => f.map((O) => {
    const Lt = n(O.start);
    return $`<rect x=${Lt.toFixed(1)} y=${z} width=${Math.max(n(O.end) - Lt, 0.8).toFixed(1)}
        height=${J} rx="2" fill=${F(O.value)}></rect>`;
  }), P = e === void 0 ? void 0 : n(e), y = e === void 0 ? void 0 : At(s.temperature, e), T = Ii(i), G = ["schedule", "manual", "off"].filter((f) => s.heating.some((z) => z.value === f)), N = [...new Set(s.climate.map((f) => f.value))];
  return m`
    ${Bi(s, e)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${le}"
      width=${t}
      height=${le}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${he}><path d=${b}></path></clipPath>
      </defs>
      <rect x=${A} y=${W} width=${Y(t)} height=${q} rx="8" fill="rgb(255 255 255 / 5%)"></rect>
      ${T.map(
    ([f, z]) => $`<rect x=${n(f).toFixed(1)} y=${W} width=${(n(z) - n(f)).toFixed(1)}
          height=${q} fill="rgb(0 0 0 / 30%)"></rect>`
  )}
      ${M.map(
    (f) => $`<line x1=${A} x2=${h} y1=${r(f).toFixed(1)} y2=${r(f).toFixed(1)}
            stroke="rgb(255 255 255 / 8%)" stroke-width="1"></line>
          <text x=${h + 6} y=${(r(f) + 4).toFixed(1)} fill=${d.label} font-size=${ct}>${f}°</text>`
  )}
      ${b ? $`<path d=${b} fill="rgb(255 255 255 / 7%)"></path>` : p}
      <g clip-path=${`url(#${he})`}>
        ${s.intensity.map(
    (f) => $`<rect x=${n(f.start).toFixed(1)} y=${W}
            width=${Math.max(n(f.end) - n(f.start), 0.8).toFixed(1)} height=${q}
            fill=${d.warning} opacity=${Ri[Number(f.value)] ?? 0}></rect>`
  )}
      </g>
      ${s.humidity.length > 0 ? $`<path d=${u(s.humidity, l)} fill="none" stroke=${d.humidityLine}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : p}
      ${w ? $`<path d=${w} fill="none" stroke=${d.plan} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6"></path>` : p}
      ${c ? $`<path d=${c} fill="none" stroke=${d.white} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : p}
      ${v && e === void 0 ? $`<circle cx=${n(v.t).toFixed(1)} cy=${r(v.v).toFixed(1)} r="3.5" fill=${d.white}></circle>` : p}

      <text x=${A} y=${Ci} fill=${d.label} font-size=${ct}>Topení</text>
      <rect x=${A} y=${ae} width=${Y(t)} height=${J} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${_(s.heating, ae, (f) => Et[f] ?? d.off)}
      <text x=${A} y=${Pi} fill=${d.label} font-size=${ct}>Klimatizace</text>
      <rect x=${A} y=${ht} width=${Y(t)} height=${J} rx="2" fill="rgb(255 255 255 / 5%)"></rect>
      ${_(s.climate, ht, (f) => rt[f] ?? d.off)}

      ${Ui(i).map(
    (f) => $`<line x1=${n(f).toFixed(1)} x2=${n(f).toFixed(1)} y1=${W} y2=${ht + J}
            stroke="rgb(255 255 255 / 6%)" stroke-width="1"></line>
          <text x=${n(f).toFixed(1)} y=${zi} fill=${d.label} font-size=${ct} text-anchor="middle">${Oe.format(f)}</text>`
  )}
      ${P === void 0 ? p : $`<line x1=${P.toFixed(1)} x2=${P.toFixed(1)} y1=${W} y2=${ht + J}
              stroke=${d.white} stroke-width="1" opacity="0.7"></line>
            ${y === void 0 ? p : $`<circle cx=${P.toFixed(1)} cy=${r(y).toFixed(1)} r="4" fill=${d.white}
                  stroke="#1c1c1e" stroke-width="2"></circle>`}`}
    </svg>
    <div class="legend">
      ${L(d.white, "Teplota", "line")}
      ${s.target.length > 0 ? L(d.plan, "Cíl topení", "dashed") : p}
      ${s.intensity.length > 0 ? L(d.warning, "Vytápění (sytost = výkon)") : p}
      ${s.humidityMin !== void 0 && s.humidityMax !== void 0 ? L(
    d.humidityLine,
    `Vlhkost ${Math.round(s.humidityMin)}–${Math.round(s.humidityMax)} %`,
    "dashed"
  ) : p}
      ${T.length > 0 ? L("rgb(0 0 0 / 55%)", "Noc 22–6 h") : p}
    </div>
    <div class="legend">
      ${G.map((f) => L(Et[f], `Topení ${Fe[f]}`))}
      ${N.map((f) => L(rt[f], `Klimatizace ${bt[f]}`))}
    </div>
  `;
}
const de = Pe / 4, Wi = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
};
function qi(s) {
  if (s.scene === _e)
    return;
  if (s.scene)
    return s.scene;
  const t = s.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
  return Wi[t];
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
const Ki = De`
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
       * Blind preset icons: dim grey; the one matching the blind is lit in a muted tone of the
       * blind's champagne, on a soft rounded square of the same tone.
       */
      --preset-idle: #6f6f74;
      --preset-on: #c9c0a8;
      --preset-glow: rgb(232 217 181 / 13%);
      --cover-gap: 4px;
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
      top: 1px;
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
     * One column of three icon buttons to the right of the blind panel, in the order Den,
     * Stín, Tma, each a third of the panel height. Dim grey; the icon that matches the state
     * of the blind is lit: its colour brightens and a soft rounded square glows behind it.
     * While a preset is on its way, the square behind its icon fades in and out (and the icon
     * with it) until the blind arrives. They are pressed by a long press or a double tap;
     * while the button is held the square grows behind the icon.
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

    .preset::before {
      content: "";
      position: absolute;
      inset: 0;
      width: var(--preset-col);
      height: var(--preset-col);
      margin: auto;
      border-radius: 10px;
      background: var(--preset-glow);
      opacity: 0;
      transform: scale(0.6);
      transition:
        opacity 220ms ease-out,
        transform 220ms ease-out;
    }

    .preset:active svg {
      transform: scale(0.92);
    }

    .preset:active::before {
      animation: hold 550ms linear forwards;
    }

    /* The icon that matches the state of the blind. */
    .preset[aria-pressed="true"] {
      color: var(--preset-on);
    }

    .preset[aria-pressed="true"]::before {
      opacity: 1;
      transform: none;
    }

    /* Preset on its way: the glow (and the icon with it) fades in and out until the blind arrives. */
    .preset.pending {
      animation: preset-tint 1.3s ease-in-out infinite alternate;
    }

    .preset.pending::before {
      animation: preset-glow 1.3s ease-in-out infinite alternate;
    }

    @keyframes preset-glow {
      from {
        opacity: 0.1;
        transform: scale(0.88);
      }
      to {
        opacity: 1;
        transform: none;
      }
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
      color: rgb(111 111 116 / 55%);
    }

    .preset.unavailable:active svg {
      transform: none;
    }

    .preset.unavailable:active::before {
      opacity: 0;
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

    /* Preset sent: the icon pops once. */
    .preset.sent svg {
      animation: sent 600ms ease-out;
    }

    @keyframes hold {
      to {
        opacity: 1;
        transform: scale(1);
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
      .preset.sent svg,
      .preset:active::before,
      .preset.pending,
      .preset.pending::before,
      .preset-hint,
      .spark.loading,
      .cover-panel.moving .rail {
        animation: none;
      }

      .sheet {
        transition: none;
      }

      /* Without the growing square, a held preset just shows it. */
      .preset:active::before {
        opacity: 1;
        transform: none;
      }

      /* Without pulsing, a preset on its way shows a half-lit square. */
      .preset.pending {
        color: var(--preset-on);
      }

      .preset.pending::before {
        opacity: 0.55;
        transform: none;
      }

      .preset svg {
        transition: none;
      }
    }

    @media (max-width: 380px) {
      .room {
        padding: 14px;
      }

      .room {
        --col: 52px;
        --preset-col: 32px;
        --preset-icon: 28px;
      }
    }
`, Gi = " ";
function pe(s) {
  if (!s || E(s.state.toLowerCase()))
    return;
  const t = Number.parseFloat(s.state);
  return Number.isFinite(t) ? t : void 0;
}
function Ct(s) {
  return s === void 0 ? "" : `· ${Te(s)}${Gi}°C`;
}
function Re(s, t, e, i) {
  const n = s?.state.toLowerCase(), r = t?.state.toLowerCase(), o = r === void 0 || E(r), a = n === "off" || r === "off", l = pe(e);
  if (a)
    return { label: "Vypnuto", color: d.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (o || n === void 0 || E(n))
    return { label: "––", color: d.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const h = Ee(pe(i));
  return r === "schedule" ? { label: "Plán", color: d.plan, active: !0, extra: Ct(l), unknown: !1, overlay: "schedule", waves: h } : r === "manual" ? { label: "Ručně", color: d.warning, active: !0, extra: Ct(l), unknown: !1, overlay: "manual", waves: h } : { label: t?.state ?? "––", color: d.warning, active: !0, extra: "", unknown: !1, waves: h };
}
function Ne(s) {
  let t = "unknown", e, i;
  if (s && !E(s.state.toLowerCase())) {
    const r = s.state.toLowerCase(), o = String(s.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? t = "off" : r === "cool" ? t = o === "wind_free" ? "wind_free" : "cool" : r === "dry" ? t = "dry" : r === "fan_only" ? t = "fan" : r === "heat" ? t = "heat" : (r === "auto" || r === "heat_cool") && (t = "auto"), t !== "off" && t !== "unknown" && t !== "wind_free" && o !== "none" && o !== "" && (e = Se(o)), i = D(s.attributes.temperature);
  }
  const n = ["cool", "wind_free", "dry", "heat", "auto"].includes(t);
  return {
    mode: t,
    label: e ?? bt[t],
    color: rt[t],
    active: t !== "off" && t !== "unknown",
    extra: n ? Ct(i) : "",
    unknown: t === "unknown"
  };
}
function Zi(s) {
  const t = s.unknown ? "neznámý stav" : s.label;
  return s.extra ? `${t} ${s.extra.replace(/^·\s*/, "")}` : t;
}
const Xi = ["místnost", "místnosti", "místností"];
function He(s) {
  return `${s} ${Ce(s, ...Xi)}`;
}
function ue(s) {
  return s.length <= 2 ? s.join(", ") : He(s.length);
}
function Ji(s, t) {
  const e = [], i = [], n = [], r = [];
  for (const a of s) {
    const l = t(a.window)?.state.toLowerCase();
    l !== void 0 && !E(l) && l === "on" && e.push(a.name);
    const h = Re(
      t(a.heating?.climate),
      t(a.heating?.overlay),
      t(a.heating?.target),
      t(a.heating?.intensity)
    );
    h.overlay === "manual" && i.push(a.name), h.waves > 0 && n.push(a.name), a.air_conditioner && Ne(t(a.air_conditioner)).active && r.push(a.name);
  }
  const o = [];
  return e.length > 0 && o.push({
    kind: "windows",
    text: `${e.length} ${Ce(e.length, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    color: d.sky,
    spoken: `Otevřená okna: ${e.join(", ")}`
  }), i.length > 0 && o.push({
    kind: "manual",
    text: `Ručně: ${ue(i)}`,
    color: d.warning,
    spoken: `Topení ručně: ${i.join(", ")}`
  }), n.length > 0 && o.push({
    kind: "heating",
    text: `Topí ${He(n.length)}`,
    color: d.warning,
    spoken: `Topí se: ${n.join(", ")}`
  }), r.length > 0 && o.push({
    kind: "climate",
    text: `Klimatizace: ${ue(r)}`,
    color: d.cool,
    spoken: `Klimatizace zapnutá: ${r.join(", ")}`
  }), o;
}
var Qi = Object.defineProperty, k = (s, t, e, i) => {
  for (var n = void 0, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = o(t, e, n) || n);
  return n && Qi(t, e, n), n;
};
const ts = 5 * 6e4, es = 8e3, B = " ", is = 550, fe = 400, ss = 700, ns = 5e3, rs = 1600, os = 100, as = 0.6, ls = 6, hs = ["off", "cool", "dry", "fan_only", "auto", "heat"], Q = { heating: "Topení", climate: "Klimatizace" }, Ht = class Ht extends et {
  constructor() {
    super(...arguments), this._historyStatus = "loading", this._dragY = 0, this._moving = {}, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const e = this._historyModel, i = t.currentTarget.querySelector("svg.chart");
      if (!e || !i)
        return;
      const n = i.getBoundingClientRect(), r = this.chartWidth();
      this._scrubTime = Di((t.clientX - n.left) * r / Math.max(n.width, 1), r, e.range);
    }, this.chartPointerEnd = (t) => {
      this._scrubbing = !1, t.pointerType !== "mouse" && (this._scrubTime = void 0);
    }, this.chartPointerLeave = (t) => {
      t.pointerType === "mouse" && (this._scrubTime = void 0);
    }, this.chartKeydown = (t) => {
      const e = this._historyModel;
      if (!e)
        return;
      const { startMs: i, endMs: n } = e.range, r = this._scrubTime ?? n;
      if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
        const o = r + (t.key === "ArrowLeft" ? -de : de);
        this._scrubTime = o >= n ? void 0 : Math.max(i, o);
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
        if (i < ls)
          return;
        e.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this._drag;
      if (this._drag = void 0, !e || !e.dragging)
        return;
      const i = Math.max(0, t.clientY - e.startY), n = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > os || n > as) ? this.closeSheet() : this._dragY = 0;
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
      const i = this.renderRoot.activeElement, n = i ? e.indexOf(i) : -1, r = t.shiftKey ? e[n <= 0 ? e.length - 1 : n - 1] : e[n === -1 || n === e.length - 1 ? 0 : n + 1];
      t.preventDefault(), r.focus();
    }, this.handleResize = () => {
      this._sheet?.kind === "history" && this.requestUpdate();
    };
  }
  setConfig(t) {
    this._config = hi(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", this.handleResize);
    for (const t of [this._noticeTimer, this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), this._trendTimer = void 0, this._noticeTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? this.hasRelevantEntityChanged(t.get("hass")) : !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
  }
  updated(t) {
    !this._trendsStarted && this.hass && this._config && (this._trendsStarted = !0, this.refreshTrends(), window.clearInterval(this._trendTimer), this._trendTimer = window.setInterval(() => {
      this.refreshTrends();
    }, ts)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const e of pi(this._config)) {
      const i = t.states[e], n = this.hass.states[e];
      if (i?.state !== n?.state || i?.last_updated !== n?.last_updated || !fi(i?.attributes, n?.attributes))
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
    const t = this.entityState(this._config.house_mode_entity ?? xe)?.toLowerCase(), e = t === "léto" || t === "leto", i = e || t === "zima", n = this.thresholds(), r = this.trendAxes(this._config), o = Date.now();
    return m`
      <ha-card>
        <div class="dashboard">
          <header class="dashboard-header">
            <h1>${this._config.title ?? "Domov"}</h1>
            ${this.renderOutside()}
            ${this.renderSummary(Ji(this._config.rooms, (a) => this.getState(a)))}
          </header>
          ${this._notice ? m`<div class="notice" role="alert">${this._notice}</div>` : p}
          <div class="rooms">
            ${this._config.rooms.map(
      (a, l) => this.renderRoom(a, l, e, i, n, r, o)
    )}
          </div>
        </div>
        ${this.renderSheet(e)}
      </ha-card>
    `;
  }
  thresholds() {
    return { ...ke, ...this._config?.thresholds };
  }
  /**
   * One axis per quantity for the whole house (CURRENT_SPEC.md, Historie a grafy), so the
   * same value is drawn at the same height in every room.
   */
  trendAxes(t) {
    const e = (i) => t.rooms.map((n) => {
      const r = i(n);
      return r ? this._trends[r] : void 0;
    });
    return {
      temperature: _t(e((i) => i.temperature), X.temperature),
      co2: _t(e((i) => i.carbon_dioxide), X.co2),
      pm25: _t(e((i) => i.pm25), X.pm25)
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return p;
    const e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }), i = this.numberState(t.temperature), n = this.numberState(t.minimum), r = this.numberState(t.maximum), o = this.numberState(t.rain_probability), a = this.numberState(t.pm25), l = n !== void 0 && r !== void 0 ? `${e.format(n)}–${e.format(r)}${B}°C` : void 0, h = [
      i === void 0 ? void 0 : `${e.format(i)}${B}°C`,
      l,
      o === void 0 ? void 0 : `☂${B}${e.format(o)}${B}%`
    ].filter((v) => v !== void 0), u = this.thresholds();
    let c = "––", g = d.label;
    return a !== void 0 && (a >= u.pm25_critical ? (c = "špatný", g = d.alert) : a >= u.pm25_warning ? (c = "zhoršený", g = d.warning) : c = "dobrý"), h.length === 0 && !t.pm25 ? p : m`<div class="outside">
      ${h.length > 0 ? m`<div>${h.join(" · ")}</div>` : p}
      ${t.pm25 ? m`<div>Vzduch venku: <span style=${`color: ${g}`}>${c}</span></div>` : p}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? p : m`<ul class="summary" aria-label="Souhrn domu">
      ${t.map((e) => {
      const i = e.kind === "windows" ? oe(e.color, !1) : e.kind === "climate" ? ft("cool", e.color, !1) : Tt(3, !1);
      return m`<li class="chip" style=${`--chip-color: ${e.color}`} title=${e.spoken} aria-label=${e.spoken}>
          <span class="chip-icon" aria-hidden="true">${i}</span>${e.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, e, i, n, r, o, a) {
    const l = r.stale_minutes, h = this.reading(t.temperature, l, a), u = this.reading(t.humidity, l, a), c = this.reading(t.carbon_dioxide, l, a), g = this.reading(t.pm25, l, a), v = di({ temperature: h, humidity: u, co2: c, pm25: g }, i, n, r), b = qi(t);
    return m`
      <article
        class="room"
        aria-label=${t.name}
        style=${b ? `--scene-tone: ${Yi[b]}` : p}
      >
        ${b ? m`<div class="scene" aria-hidden="true">${Vi(b)}</div>` : p}
        <div class="room-title">${t.name}</div>
        <div class="status-line">
          <span
            class="status-dot"
            style=${v.kind === "unknown" ? `border: 1.5px solid ${d.off}` : `background: ${v.color}`}
          ></span>
          <span style=${`color: ${v.color}; font-weight: ${v.kind === "normal" ? 400 : 500}`}>
            ${v.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${h.stale ? "stale" : ""}"
            ?disabled=${!t.temperature}
            title=${this.staleTitle(h) ?? p}
            aria-label=${`${t.name}: teplota ${h.value === void 0 ? "neznámá" : `${kt(h.value)} °C`}${this.staleSpoken(h)}, historie místnosti za 24 hodin`}
            @click=${(w) => this.openSheet("history", t, w)}
          >
            ${h.value === void 0 ? m`<span class="missing">––</span>` : m`${kt(h.value)}<span class="temperature-unit">${B}°C</span>`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${u.stale ? "stale" : ""}"
            ?disabled=${!t.humidity}
            title=${this.staleTitle(u) ?? p}
            aria-label=${`${t.name}: vlhkost ${u.value === void 0 ? "neznámá" : `${Math.round(u.value)} %`}${this.staleSpoken(u)}, detail a historie`}
            @click=${() => this.showMoreInfo(t.humidity)}
          >
            ${u.value === void 0 ? m`<span class="missing">––</span>` : m`${Math.round(u.value)}${B}%`}
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
      c,
      "ppm",
      r.co2_warning,
      r.co2_critical,
      o.co2
    )}
            ${this.renderAirRow(
      t,
      "pm25",
      t.pm25,
      Mi(),
      "PM2.5",
      g,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      o.pm25
    )}
            ${this.renderHvac(t, i, e)}
            ${this.renderTemperatureTrend(t, h, o.temperature)}
            ${this.renderWindow(t)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : m`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article>
    `;
  }
  /**
   * CO₂ / PM2.5 row: icon and value in the left column, micro trend in the right column;
   * the whole row opens the entity detail with its history. A stale value is grey, never
   * orange or red.
   */
  renderAirRow(t, e, i, n, r, o, a, l, h, u) {
    const c = o.value !== void 0, g = Math.round(o.value ?? 0), v = o.value === void 0 || o.stale ? d.label : o.value >= h ? d.alert : o.value >= l ? d.warning : d.white, b = c ? te(i ? this._trends[i] : void 0, X[e]) : void 0, w = d[e];
    return m`
      <button
        type="button"
        class="plain-button air-row slot-${e}"
        ?disabled=${!i}
        title=${this.staleTitle(o) ?? p}
        aria-label=${`${t.name}: ${r} ${c ? `${g} ${a}` : "neznámé"}${b ? `, za 2 hodiny ${b}` : ""}${this.staleSpoken(o)}, detail a historie`}
        @click=${() => this.showMoreInfo(i)}
      >
        <span class="row-main">
          <span class="row-icon" style=${`color: ${c && !o.stale ? w : d.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${c ? m`<span class="row-label" style=${`color: ${v}`}>${g}</span>
                  <span class="row-unit">${a}</span>` : m`<span class="row-label" style=${`color: ${d.label}`}>––</span>`}
          </span>
        </span>
        ${c ? this.renderSpark(i, u, w, o.stale === !0) : p}
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
    const n = this.renderSpark(t.temperature, i, d.peach, e.stale === !0);
    if (n === p)
      return p;
    const r = te(this._trends[t.temperature], X.temperature);
    return m`
      <button
        type="button"
        class="plain-button trend-button slot-temperature-trend"
        aria-label=${`${t.name}: teplota za 2 hodiny${r ? ` ${r}` : ""}, historie místnosti za 24 hodin`}
        @click=${(o) => this.openSheet("history", t, o)}
      >
        ${n}
      </button>
    `;
  }
  /**
   * Micro trend (CURRENT_SPEC.md, Historie a grafy): the last 120 minutes as one thin line
   * with a soft area and a dot at the latest sample, on the axis shared by the whole house.
   * It fades out to the left (text of the HVAC rows may run into it). Before the first
   * history arrives it is a dotted placeholder line; without history it is left out.
   */
  renderSpark(t, e, i, n) {
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
    const r = this._trends[t];
    if (!r || !e)
      return p;
    const o = Si(r, e).map(
      (c, g) => c === void 0 ? void 0 : { x: g / (se - 1) * 100, y: (1 - c) * 100 }
    ).filter((c) => c !== void 0);
    if (o.length < 2)
      return p;
    const a = o.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" "), l = o[0], h = o[o.length - 1], u = `${a} ${h.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
    return m`<span class="spark ${n ? "stale" : ""}" style=${`color: ${i}`} aria-hidden="true">
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
  renderHvac(t, e, i) {
    const n = Re(
      this.getState(t.heating?.climate),
      this.getState(t.heating?.overlay),
      this.getState(t.heating?.target),
      this.getState(t.heating?.intensity)
    ), r = Ne(this.getState(t.air_conditioner)), o = (g) => this.renderSystemRow(Tt(n.unknown ? 0 : n.waves, n.unknown), n, g), a = (g) => this.renderSystemRow(ft(r.mode, r.color, r.unknown), r, g), l = e ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, l), u = l.map((g) => `${Q[g]} ${Zi(g === "heating" ? n : r)}`).join(", "), c = `hvac-description-${i}`;
    return m`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${c}
        @click=${(g) => h ? this.openSheet(h, t, g) : void 0}
      >
        ${e ? a(!0) : o(!0)}
        ${e ? o(!1) : a(!1)}
      </button>
      <span class="sr-only" id=${c}
        >${`${t.name}: ${u}.${h ? ` Otevře ovládání ${Q[h]}.` : ""}`}</span
      >
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, e) {
    const i = (n) => n === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
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
    const e = t.window, i = this.entityState(e)?.toLowerCase(), n = i === void 0 || E(i), r = i === "on", o = n ? d.label : r ? d.sky : d.label, a = n ? "––" : r ? "Otevřeno" : "Zavřeno";
    return m`
      <button
        type="button"
        class="plain-button system-row slot-window ${r ? "strong" : ""}"
        style=${`--row-color: ${o}`}
        ?disabled=${!e}
        aria-label=${`${t.name}: okno ${n ? "neznámé" : a.toLowerCase()}, detail a historie`}
        @click=${() => this.showMoreInfo(e)}
      >
        <span class="row-main">
          <span class="row-icon">${oe(n ? d.off : o, n)}</span>
          <span class="row-text"><span class="row-label">${a}</span></span>
        </span>
      </button>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, e) {
    const i = this.getState(e), n = i?.state.toLowerCase(), r = n !== void 0 && !E(n), o = r ? D(i?.attributes.current_position) : void 0, a = r ? D(i?.attributes.current_tilt_position) : void 0, l = o !== void 0 && a !== void 0, h = n === "opening" || n === "closing", u = `${l ? `poloha ${Math.round(o)} %, naklopení ${Math.round(a)} %` : "poloha nebo naklopení neznámé"}${h ? ", pohybuje se" : ""}`;
    return m`
      <button
        type="button"
        class="plain-button cover-panel ${h ? "moving" : ""}"
        aria-label=${`${t.name}: žaluzie, ${u}. Otevřít ovládání.`}
        @click=${() => this.showMoreInfo(e)}
      >
        <svg
          viewBox="0 0 ${ut} ${St}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${yi(o, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${`${t.name}: předvolby žaluzií`}>
        ${Xt.map((c) => this.renderPreset(t, c, o, a, r))}
      </div>
    `;
  }
  renderPreset(t, e, i, n, r) {
    const o = this._moving[t.name], a = o === e.id, l = o === void 0 && wt(i, n, e), h = `${t.name}|${e.id}`, u = r ? "Spustí se dvojitým klepnutím nebo dlouhým stiskem." : "Žaluzie je nedostupná.";
    return m`
      <button
        type="button"
        class="plain-button preset ${this._flash === h ? "sent" : ""} ${r ? "" : "unavailable"} ${a ? "pending" : ""}"
        title=${e.label}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : p}
        aria-disabled=${r ? "false" : "true"}
        aria-label=${`${t.name}: žaluzie ${e.label}, ${e.description}. ${u}`}
        @pointerdown=${(c) => this.pressStart(c, t, e, r)}
        @pointerup=${() => this.pressEnd(t, e, r)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(c) => c.preventDefault()}
        @click=${(c) => {
      c.detail === 0 && (r ? this.applyPreset(t, e) : this.showUnavailable(h));
    }}
      >
        ${Ti(e.id)}
        ${this._hint?.key === h ? m`<span class="preset-hint" role="status">${this._hint.text}</span>` : p}
      </button>
    `;
  }
  pressStart(t, e, i, n) {
    t.button !== 0 || !n || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(e, i);
    }, is));
  }
  pressEnd(t, e, i) {
    const n = `${t.name}|${e.id}`;
    if (!i) {
      this.showUnavailable(n);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const r = this._pressing, o = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !r || o)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === n && a - this._lastTap.time <= fe) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, e);
      return;
    }
    this._lastTap = { key: n, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === n && (this._lastTap = void 0, this.showHint(n, "Podržte nebo klepněte dvakrát", "selection"));
    }, fe);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, "Žaluzie je nedostupná", "warning");
  }
  showHint(t, e, i) {
    this._hint = { key: t, text: e }, this.haptic(i), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, rs);
  }
  async applyPreset(t, e) {
    if (!this.hass || !t.cover)
      return;
    const i = this.entityState(t.cover)?.toLowerCase();
    if (i === void 0 || E(i)) {
      this.showUnavailable(`${t.name}|${e.id}`);
      return;
    }
    this.startMoving(t, t.cover, e);
    try {
      await this.hass.callService(Zt.domain, Zt.service, {
        entity: t.cover,
        pos: e.position,
        tilt: e.tilt
      }), this.haptic("success"), this._flash = `${t.name}|${e.id}`, window.clearTimeout(this._flashTimer), this._flashTimer = window.setTimeout(() => {
        this._flash = void 0;
      }, ss);
    } catch (n) {
      console.error("Klima Dashboard: skript žaluzií selhal", n), this.endMoving(t.name), this.haptic("failure"), this.showNotice(`${t.name}: skript žaluzií se nepodařilo spustit.`);
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, e, i) {
    const n = this.getState(e);
    if (wt(
      D(n?.attributes.current_position),
      D(n?.attributes.current_tilt_position),
      i
    ) && !this.isMoving(e)) {
      this.endMoving(t.name);
      return;
    }
    this._moving = { ...this._moving, [t.name]: i.id }, this._movingWatch.set(t.name, { signature: this.coverSignature(e) }), this.armStall(t.name);
  }
  /** Called on every Home Assistant update: ends the pulsing on arrival, restarts the stall timer on change. */
  trackMovingPresets() {
    for (const t of this._config?.rooms ?? []) {
      const e = this._moving[t.name], i = Xt.find((l) => l.id === e), n = this._movingWatch.get(t.name);
      if (!i || !n || !t.cover)
        continue;
      const r = this.getState(t.cover), o = r?.state.toLowerCase();
      if (o === void 0 || E(o) || wt(
        D(r?.attributes.current_position),
        D(r?.attributes.current_tilt_position),
        i
      ) && !this.isMoving(t.cover)) {
        this.endMoving(t.name);
        continue;
      }
      const a = this.coverSignature(t.cover);
      a !== n.signature && (n.signature = a, this.armStall(t.name));
    }
  }
  armStall(t) {
    const e = this._movingWatch.get(t);
    e && (window.clearTimeout(e.timer), e.timer = window.setTimeout(() => this.endMoving(t), ns));
  }
  endMoving(t) {
    if (window.clearTimeout(this._movingWatch.get(t)?.timer), this._movingWatch.delete(t), t in this._moving) {
      const { [t]: e, ...i } = this._moving;
      this._moving = i;
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
    }, es);
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
  renderSheetFrame(t, e, i, n = "") {
    const r = this._drag?.dragging === !0;
    return m`
      <div
        class="backdrop"
        style=${`--backdrop-opacity: ${Math.max(0, 1 - this._dragY / 400).toFixed(2)}`}
        @click=${() => this.closeSheet()}
        @keydown=${this.handleSheetKeydown}
      >
        <div
          class="sheet ${n} ${r ? "dragging" : ""}"
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
    const n = e === "heating", r = n ? t.heating?.climate : t.air_conditioner, o = this.getState(r), a = o !== void 0 && !E(o.state.toLowerCase()), l = Qt(o?.attributes.hvac_modes), h = Qt(o?.attributes.preset_modes), u = o?.state.toLowerCase(), c = String(o?.attributes.preset_mode ?? "none").toLowerCase(), g = !a || !r ? [] : n ? this.heatingOptions(r, l, h, u, c) : this.climateOptions(r, l, u), v = !n && a && r ? h.filter((_) => _ !== "none") : [], b = i ? ["climate", "heating"] : ["heating", "climate"], w = !!t.heating?.climate && !!t.air_conditioner, M = m`
      ${a ? g.length === 0 ? m`<p class="sheet-message">Entita neuvádí podporované režimy.</p>` : m`<div class="options" role="group" aria-label=${`${Q[e]}: režim`}>
              ${g.map((_) => this.renderOption(_))}
            </div>` : m`<p class="sheet-message">Entita je nedostupná.</p>`}
      ${v.length > 0 ? m`<div class="sheet-label" id="preset-label">Předvolby</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${v.map((_) => this.renderPresetChip(r, _, c, u, h))}
            </div>` : p}
      ${this._sheetError ? m`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : p}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!r}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(r);
    }}
      >
        Detail a historie
      </button>
    `;
    return w ? m`
      <div
        class="segmented"
        role="tablist"
        aria-label="Systém"
        @keydown=${(_) => this.segmentKeydown(_, b, e)}
      >
        ${b.map(
      (_) => m`<button
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
            ${Q[_]}
          </button>`
    )}
      </div>
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${e}`}>${M}</div>
    ` : m`<div class="sheet-label system-name">${Q[e]}</div>${M}`;
  }
  segmentKeydown(t, e, i) {
    const n = e.indexOf(i);
    let r;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? r = e[(n + 1) % e.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? r = e[(n - 1 + e.length) % e.length] : t.key === "Home" ? r = e[0] : t.key === "End" && (r = e[e.length - 1]), r && (t.preventDefault(), this._focusSegment = r, r === i ? this.requestUpdate() : this.switchSheet(r));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t) {
    let e;
    const i = this._historyModel;
    this._historyStatus === "loading" ? e = m`<p class="sheet-message">Načítám historii…</p>` : this._historyStatus === "error" || !i ? e = m`<p class="sheet-message error" role="alert">Historii se nepodařilo načíst.</p>` : Hi(i) ? e = m`<div
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
        ${ji(i, this.chartWidth(), this._scrubTime)}
      </div>` : e = m`<p class="sheet-message">Za posledních 24 hodin nejsou k dispozici data.</p>`;
    const n = t.temperature ?? t.humidity;
    return m`
      ${e}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!n}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(n);
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
  renderPresetChip(t, e, i, n, r) {
    const o = i === e && n !== "off", a = o && r.includes("none") ? "none" : e;
    return m`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${o ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${Se(e)}
      </button>
    `;
  }
  /**
   * Topení options come from the entity's own `hvac_modes`: Vypnuto (off), Plán (auto) and
   * Ručně (heat). Boost needs a `boost` preset; without it the option is shown but disabled.
   */
  heatingOptions(t, e, i, n, r) {
    const o = [], a = (l, h, u, c, g, v) => {
      o.push({ id: l, label: h, icon: Ei(l), color: u, active: c, run: g, unsupported: v });
    };
    if (e.includes("off") && a("off", "Vypnuto", d.off, n === "off", () => this.setHvacMode(t, "off")), e.includes("auto") && a("auto", "Plán", d.plan, n === "auto", () => this.setHvacMode(t, "auto")), e.includes("heat") && a(
      "heat",
      "Ručně",
      d.warning,
      n === "heat" && r !== "boost",
      () => this.setHvacMode(t, "heat")
    ), o.length > 0) {
      const l = i.includes("boost");
      a(
        "boost",
        "Boost",
        d.alert,
        l && r === "boost" && n !== "off",
        () => this.setPresetMode(t, "boost"),
        l ? void 0 : "entita nenabízí"
      );
    }
    return o;
  }
  climateOptions(t, e, i) {
    return hs.filter((n) => e.includes(n)).map((n) => {
      const r = Me(n), o = rt[r];
      return {
        id: n,
        label: bt[r],
        icon: ft(r, o, !1),
        color: o,
        active: i === n,
        run: () => this.setHvacMode(t, n)
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
    this._opener = i.currentTarget instanceof HTMLElement ? i.currentTarget : void 0, this._sheetError = void 0, this._dragY = 0, this._sheet = { kind: t, room: e }, window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this.loadRoomHistory(e));
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
    const i = [
      t.temperature,
      t.humidity,
      t.heating?.overlay,
      t.heating?.climate,
      t.heating?.intensity,
      t.heating?.target,
      t.air_conditioner
    ].filter((o) => !!o), n = Date.now(), r = n - 24 * Pe;
    try {
      const o = await ne(this.hass, i, r, n);
      if (e !== this._historyRequest)
        return;
      this._historyModel = Ni(o, t, { startMs: r, endMs: n }), this._historyStatus = "ready";
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
    const t = ui(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const e = Date.now(), i = e - wi;
    try {
      const n = await ne(this.hass, t, i, e), r = {};
      for (const o of t)
        r[o] = ki(n[o], i, e, se);
      this._trends = r;
    } catch (n) {
      console.error("Klima Dashboard: načtení historie pro mikrotrendy selhalo", n);
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
    const e = mi(this._config), i = await Promise.allSettled(
      e.map(
        (r) => t.callApi("GET", `states/${r}`)
      )
    ), n = {};
    i.forEach((r, o) => {
      if (r.status === "fulfilled") {
        const a = Date.parse(r.value?.last_reported ?? r.value?.last_updated ?? "");
        Number.isFinite(a) && (n[e[o]] = a);
      }
    }), this._reported = n;
  }
  // ----------------------------------------------------------------- state
  /**
   * A room measurement with its freshness (CURRENT_SPEC.md, Chybějící data): stale when the
   * sensor has not reported for longer than `stale_minutes`. Only known report times count.
   */
  reading(t, e, i) {
    const n = this.numberState(t);
    if (n === void 0 || !t)
      return {};
    const r = this._reported[t];
    if (r === void 0)
      return { value: n };
    const o = Date.parse(this.getState(t)?.last_updated ?? ""), a = Math.max(r, Number.isFinite(o) ? o : 0), l = Math.max(0, (i - a) / 6e4);
    return { value: n, ageMinutes: l, stale: l > e };
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? `Naposledy před ${Ae(t.ageMinutes)}` : void 0;
  }
  staleSpoken(t) {
    const e = this.staleTitle(t);
    return e ? `, ${e.toLowerCase()}` : "";
  }
  numberState(t) {
    const e = this.entityState(t);
    if (e === void 0 || E(e.toLowerCase()))
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
Ht.styles = Ki;
let x = Ht;
k([
  S()
], x.prototype, "_config");
k([
  we({ attribute: !1 })
], x.prototype, "hass");
k([
  S()
], x.prototype, "_sheet");
k([
  S()
], x.prototype, "_sheetError");
k([
  S()
], x.prototype, "_historyStatus");
k([
  S()
], x.prototype, "_historyModel");
k([
  S()
], x.prototype, "_scrubTime");
k([
  S()
], x.prototype, "_dragY");
k([
  S()
], x.prototype, "_flash");
k([
  S()
], x.prototype, "_moving");
k([
  S()
], x.prototype, "_hint");
k([
  S()
], x.prototype, "_trends");
k([
  S()
], x.prototype, "_trendsLoaded");
k([
  S()
], x.prototype, "_reported");
k([
  S()
], x.prototype, "_notice");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", x);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  description: "Přehled teploty, kvality vzduchu, vytápění a žaluzií v místnostech.",
  preview: !1
});
