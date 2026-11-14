const Te = globalThis, fi = Te.ShadowRoot && (Te.ShadyCSS === void 0 || Te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mi = /* @__PURE__ */ Symbol(), Gi = /* @__PURE__ */ new WeakMap();
let On = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== mi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (fi && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Gi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Gi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pn = (e) => new On(typeof e == "string" ? e : e + "", void 0, mi), st = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new On(i, e, mi);
}, mo = (e, t) => {
  if (fi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Te.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Xi = fi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Pn(i);
})(e) : e;
const { is: go, defineProperty: vo, getOwnPropertyDescriptor: bo, getOwnPropertyNames: $o, getOwnPropertySymbols: yo, getPrototypeOf: wo } = Object, Ie = globalThis, Zi = Ie.trustedTypes, xo = Zi ? Zi.emptyScript : "", ko = Ie.reactiveElementPolyfillSupport, Zt = (e, t) => e, Pe = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? xo : null;
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
} }, gi = (e, t) => !go(e, t), Ji = { attribute: !0, type: String, converter: Pe, reflect: !1, useDefault: !1, hasChanged: gi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Dt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ji) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && vo(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = bo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ji;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Zt("elementProperties"))) return;
    const t = wo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Zt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Zt("properties"))) {
      const i = this.properties, n = [...$o(i), ...yo(i)];
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
      for (const o of n) i.unshift(Xi(o));
    } else t !== void 0 && i.push(Xi(t));
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
    return mo(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Pe).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Pe;
      this._$Em = o;
      const r = a.fromAttribute(i, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? gi)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
Dt.elementStyles = [], Dt.shadowRootOptions = { mode: "open" }, Dt[Zt("elementProperties")] = /* @__PURE__ */ new Map(), Dt[Zt("finalized")] = /* @__PURE__ */ new Map(), ko?.({ ReactiveElement: Dt }), (Ie.reactiveElementVersions ??= []).push("2.1.2");
const vi = globalThis, Qi = (e) => e, ze = vi.trustedTypes, tn = ze ? ze.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zn = "$lit$", bt = `lit$${Math.random().toFixed(9).slice(2)}$`, Ln = "?" + bt, _o = `<${Ln}>`, Ct = document, Qt = () => Ct.createComment(""), te = (e) => e === null || typeof e != "object" && typeof e != "function", bi = Array.isArray, So = (e) => bi(e) || typeof e?.[Symbol.iterator] == "function", Ke = `[ 	
\f\r]`, qt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, en = /-->/g, nn = />/g, kt = RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), on = /'/g, sn = /"/g, Nn = /^(?:script|style|textarea|title)$/i, Rn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = Rn(1), x = Rn(2), Ht = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), an = /* @__PURE__ */ new WeakMap(), Tt = Ct.createTreeWalker(Ct, 129);
function Dn(e, t) {
  if (!bi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tn !== void 0 ? tn.createHTML(t) : t;
}
const Mo = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = qt;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let d, h, c = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, h = a.exec(l), h !== null); ) f = a.lastIndex, a === qt ? h[1] === "!--" ? a = en : h[1] !== void 0 ? a = nn : h[2] !== void 0 ? (Nn.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = kt) : h[3] !== void 0 && (a = kt) : a === kt ? h[0] === ">" ? (a = o ?? qt, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? kt : h[3] === '"' ? sn : on) : a === sn || a === on ? a = kt : a === en || a === nn ? a = qt : (a = kt, o = void 0);
    const b = a === kt && e[r + 1].startsWith("/>") ? " " : "";
    s += a === qt ? l + _o : c >= 0 ? (n.push(d), l.slice(0, c) + zn + l.slice(c) + bt + b) : l + bt + (c === -2 ? r : b);
  }
  return [Dn(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ee {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, h] = Mo(t, i);
    if (this.el = ee.createElement(d, n), Tt.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = Tt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(zn)) {
          const f = h[a++], b = o.getAttribute(c).split(bt), m = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: m[2], strings: b, ctor: m[1] === "." ? Co : m[1] === "?" ? Ao : m[1] === "@" ? Eo : He }), o.removeAttribute(c);
        } else c.startsWith(bt) && (l.push({ type: 6, index: s }), o.removeAttribute(c));
        if (Nn.test(o.tagName)) {
          const c = o.textContent.split(bt), f = c.length - 1;
          if (f > 0) {
            o.textContent = ze ? ze.emptyScript : "";
            for (let b = 0; b < f; b++) o.append(c[b], Qt()), Tt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(c[f], Qt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ln) l.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(bt, c + 1)) !== -1; ) l.push({ type: 7, index: s }), c += bt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ut(e, t, i = e, n) {
  if (t === Ht) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = te(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = Ut(e, o._$AS(e, t.values), o, n)), t;
}
class To {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Ct).importNode(i, !0);
    Tt.currentNode = o;
    let s = Tt.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ae(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new Oo(s, this, t)), this._$AV.push(d), l = n[++r];
      }
      a !== l?.index && (s = Tt.nextNode(), a++);
    }
    return Tt.currentNode = Ct, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ae {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Ut(this, t, i), te(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== Ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : So(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && te(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ee.createElement(Dn(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new To(o, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = an.get(t.strings);
    return i === void 0 && an.set(t.strings, i = new ee(t)), i;
  }
  k(t) {
    bi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new ae(this.O(Qt()), this.O(Qt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Qi(t).nextSibling;
      Qi(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class He {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = p;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Ut(this, t, i, 0), a = !te(t) || t !== this._$AH && t !== Ht, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = Ut(this, r[n + l], i, l), d === Ht && (d = this._$AH[l]), a ||= !te(d) || d !== this._$AH[l], d === p ? t = p : t !== p && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Co extends He {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ao extends He {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Eo extends He {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Ut(this, t, i, 0) ?? p) === Ht) return;
    const n = this._$AH, o = t === p && n !== p || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== p && (n === p || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Oo {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ut(this, t);
  }
}
const Po = vi.litHtmlPolyfillSupport;
Po?.(ee, ae), (vi.litHtmlVersions ??= []).push("3.3.3");
const zo = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new ae(t.insertBefore(Qt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const $i = globalThis;
class nt extends Dt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zo(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ht;
  }
}
nt._$litElement$ = !0, nt.finalized = !0, $i.litElementHydrateSupport?.({ LitElement: nt });
const Lo = $i.litElementPolyfillSupport;
Lo?.({ LitElement: nt });
($i.litElementVersions ??= []).push("4.2.2");
const Fn = /* @__PURE__ */ Symbol.for(""), No = (e) => {
  if (e?.r === Fn) return e?._$litStatic$;
}, yi = (e) => ({ _$litStatic$: e, r: Fn }), rn = /* @__PURE__ */ new Map(), Ro = (e) => (t, ...i) => {
  const n = i.length;
  let o, s;
  const a = [], r = [];
  let l, d = 0, h = !1;
  for (; d < n; ) {
    for (l = t[d]; d < n && (s = i[d], (o = No(s)) !== void 0); ) l += o + t[++d], h = !0;
    d !== n && r.push(s), a.push(l), d++;
  }
  if (d === n && a.push(t[n]), h) {
    const c = a.join("$$lit$$");
    (t = rn.get(c)) === void 0 && (a.raw = a, rn.set(c, t = a)), i = r;
  }
  return e(t, ...i);
}, wi = Ro(u);
const Do = { attribute: !0, type: String, converter: Pe, reflect: !1, hasChanged: gi }, Fo = (e = Do, t, i) => {
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
function y(e) {
  return (t, i) => typeof i == "object" ? Fo(e, t, i) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function N(e) {
  return y({ ...e, state: !0, attribute: !1 });
}
function Ft(e, t = {}) {
  return e.length < 2 ? u`${e[0] ?? p}` : u`<span class="joined ${t.whole ? "whole" : ""}">${e.map(
    (i, n) => u`${n ? u`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : p}<span class="joined-part">${i}</span>`
  )}</span>`;
}
function ie(e, t = {}) {
  return Ft(e.split(" · "), t);
}
function xi(e, t) {
  e.querySelectorAll(".joined").forEach((i) => {
    const n = `${t}|${i.textContent}`;
    if (i.dataset.fit === n) return;
    i.classList.remove("stacked", "flow", "probe");
    const o = [...i.querySelectorAll(":scope > .joined-sep")];
    o.forEach((l) => l.classList.remove("break"));
    const s = [...i.querySelectorAll(":scope > .joined-part")], a = s.map((l) => l.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete i.dataset.fit;
      return;
    }
    i.dataset.fit = n;
    const r = o.filter((l, d) => a[d + 1].top > a[d].top + 1);
    if (r.length) {
      if (!i.classList.contains("whole")) {
        i.classList.add("probe");
        const l = s.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (i.classList.remove("probe"), l) {
          i.classList.add("flow");
          return;
        }
      }
      i.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const ki = st`
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
`, jo = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', jn = st`
  :host {
    font-family: ${Pn(jo)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, _i = 25, ne = 5, In = 21, Si = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], Io = ["plan", "manual", "boost", "off"];
function Mi(e) {
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown";
}
function $t(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string") : [];
}
function At(e) {
  const t = typeof e == "string" ? Number.parseFloat(e) : e;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function It(e, t) {
  const i = t?.state;
  if (!t || Mi(i)) return;
  if (e === "heating") {
    if (i === "auto") return "plan";
    if (i === "off") return "off";
    if (i === "heat") {
      const o = At(t.attributes.temperature);
      return o !== void 0 && o <= ne ? "off" : o === _i ? "boost" : "manual";
    }
    return;
  }
  const n = String(t.attributes.preset_mode ?? "");
  return i === "off" ? "off" : i === "cool" && n === "wind_free" ? "wind_free" : n === "sleep" ? "sleep" : i === "heat_cool" ? "auto" : Si.includes(i) ? i : void 0;
}
function Le(e, t) {
  const i = It(e, t);
  return i === void 0 ? void 0 : i !== "off";
}
function Ho(e, t, i, n, o) {
  if (n.includes(o)) return n.length > 1 ? n.filter((a) => a !== o) : n;
  const s = Le(e, t?.states[o]);
  return s === void 0 ? n : i.filter((a) => Le(e, t?.states[a.entity]) === s).map((a) => a.entity);
}
function Uo(e, t) {
  return t.flatMap((i) => {
    const n = At(e?.states[i]?.attributes.temperature);
    return n === void 0 ? [] : [{ entity: i, value: n }];
  });
}
function Bo(e, t, i) {
  const n = new Set(i.map((o) => It(e, t?.states[o])).filter((o) => o !== void 0));
  return n.size === 1 ? [...n][0] : void 0;
}
function Vo(e, t) {
  const i = e === "heating" ? 0.5 : 1, n = At(t?.attributes.min_temp) ?? (e === "heating" ? 5 : 16), o = At(t?.attributes.max_temp) ?? (e === "heating" ? 25 : 30);
  return { min: Math.ceil(n / i) * i, max: Math.floor(o / i) * i, step: i };
}
function Wo(e) {
  const t = $t(e?.attributes.hvac_modes), i = $t(e?.attributes.preset_modes);
  return Si.filter((n) => n === "wind_free" ? t.includes("cool") && i.includes("wind_free") : n === "sleep" ? i.includes("sleep") : n === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(n));
}
function qo(e, t, i) {
  const n = t.map((o) => $t(e?.states[o]?.attributes[i])).filter((o) => o.length);
  return n.length ? n[0].filter((o) => n.every((s) => s.includes(o))) : [];
}
function Ko(e, t, i) {
  const n = new Set(t.map((o) => e?.states[o]?.attributes[i]).filter((o) => typeof o == "string"));
  return n.size === 1 ? [...n][0] : void 0;
}
function Ye(e) {
  return !!e?.services?.tado_ce?.set_climate_timer;
}
function ln(e) {
  return `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}:00`;
}
function Yo(e, t, i, n) {
  const o = i.mode ?? (i.temperature !== void 0 ? "manual" : It("heating", t));
  if (o === void 0) return [];
  if (o === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "auto" } }];
  if (o === "off") {
    const d = i.manualFor ?? "forever";
    if (!n || d === "forever") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "off" } }];
    const h = { entity_id: e, temperature: ne };
    return d === "next" ? h.overlay = "next_time_block" : h.time_period = ln(Number(d)), [{ domain: "tado_ce", service: "set_climate_timer", data: h }];
  }
  const s = At(t?.attributes.temperature), a = o === "boost" ? _i : i.temperature ?? (s !== void 0 && s > ne ? s : In);
  if (!n)
    return o === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: e, temperature: a, hvac_mode: "heat" } }] : [];
  const r = i.manualFor ?? (o === "boost" ? "30" : "next"), l = { entity_id: e, temperature: a };
  return r === "next" ? l.overlay = "next_time_block" : r === "forever" ? l.overlay = "manual" : l.time_period = ln(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: l }];
}
function Go(e, t, i) {
  const n = [], o = { entity_id: e }, s = $t(t?.attributes.hvac_modes), a = $t(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), l = i.mode;
  if (l !== void 0) {
    const d = (c) => n.push({ domain: "climate", service: "set_hvac_mode", data: { ...o, hvac_mode: c } }), h = (c) => n.push({ domain: "climate", service: "set_preset_mode", data: { ...o, preset_mode: c } });
    l === "wind_free" ? (d("cool"), h("wind_free")) : l === "sleep" ? ((t?.state === "off" || Mi(t?.state)) && d("cool"), h("sleep")) : (d(l === "auto" ? s.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && h("none"));
  }
  return i.temperature !== void 0 && l !== "off" && n.push({ domain: "climate", service: "set_temperature", data: { ...o, temperature: Math.round(i.temperature) } }), i.fan !== void 0 && $t(t?.attributes.fan_modes).includes(i.fan) && n.push({ domain: "climate", service: "set_fan_mode", data: { ...o, fan_mode: i.fan } }), i.swing !== void 0 && $t(t?.attributes.swing_modes).includes(i.swing) && n.push({ domain: "climate", service: "set_swing_mode", data: { ...o, swing_mode: i.swing } }), n;
}
function Xo(e, t) {
  const i = t.mode;
  return i === void 0 ? e?.state : i === "wind_free" || i === "sleep" && (e?.state === "off" || Mi(e?.state)) ? "cool" : i === "sleep" ? e?.state : i === "auto" ? $t(e?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : i;
}
function Zo(e, t, i) {
  const n = Math.round(t * 60), o = [{ delay: { hours: Math.floor(n / 3600), minutes: Math.floor(n % 3600 / 60), seconds: n % 60 } }];
  return i !== void 0 && o.push({ condition: "state", entity_id: e, state: i }), o.push({ action: "climate.set_hvac_mode", target: { entity_id: e }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: o };
}
var Jo = Object.defineProperty, at = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && Jo(t, i, o), o;
};
const Qo = ["next", "30", "60", "180", "forever"], ts = [0, 60, 180, 480], zi = class zi extends nt {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    xi(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.flush();
  }
  willUpdate(t) {
    (t.has("system") && t.get("system") !== void 0 || t.has("rooms") && t.get("rooms") !== void 0) && this.flush(t.get("selected") ?? this.selected, t.get("system") ?? this.system);
  }
  /** Sends what waits at once (the sheet closes). */
  async flush(t = this.selected, i = this.system) {
    window.clearTimeout(this.timer), this.timer = void 0;
    const n = this.draft;
    Object.keys(n).length && (this.draft = {}, await this.send(n, t, i));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, i, n) {
    const o = this.hass;
    if (!o) return;
    this.busy = !0;
    const s = Ye(o);
    try {
      for (const a of i) {
        const r = o.states[a];
        if (!r || It(n, r) === void 0) continue;
        const l = n === "heating" ? Yo(a, r, t, s) : Go(a, r, t);
        for (const c of l) await o.callService(c.domain, c.service, c.data);
        const d = t.offAfter ?? 0, h = n === "cooling" ? Xo(r, t) : void 0;
        d > 0 && h !== void 0 && h !== "off" && await o.callWS(Zo(a, d, h));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (a) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${a instanceof Error ? a.message : String(a)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
    } finally {
      this.busy = this.timer !== void 0;
    }
  }
  name(t) {
    return this.rooms.find((i) => i.entity === t)?.name ?? t;
  }
  degrees(t) {
    const i = this.i18n;
    return `${i ? this.system === "heating" ? i.half(t) : i.whole(t) : String(t)}°`;
  }
  /** The state of a room in words for its tile ("Chlazení · 22°", "Plán · 21°", "Vypnuto"). */
  roomText(t) {
    const i = this.texts, n = this.hass?.states[t], o = It(this.system, n);
    if (o === void 0) return i.unavailable;
    const s = At(n?.attributes.temperature);
    return o !== "off" && o !== "boost" && o !== "fan_only" && s !== void 0 ? `${i.modes[o]} · ${this.degrees(s)}` : i.modes[o];
  }
  selectRoom(t) {
    const i = Ho(this.system, this.hass, this.rooms, this.selected, t);
    i.join() !== this.selected.join() && (this.flush(this.selected), this.selected = i, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: i }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, i = this.i18n;
    if (!t || !i) return p;
    const n = this.hass, o = n?.states[this.selected[0]], { min: s, max: a, step: r } = Vo(this.system, o), l = Uo(n, this.selected), d = [...new Set(l.map((k) => k.value))], h = Bo(this.system, n, this.selected), c = this.draft.mode ?? h, f = this.draft.temperature === void 0 && d.length > 1, b = d[0], m = this.draft.temperature ?? (c === "boost" ? 25 : c === "manual" && b !== void 0 && b <= ne ? In : b), _ = c === "off" || c === "fan_only", w = _ && c !== void 0 ? t.modes[c] : f ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : m !== void 0 ? this.degrees(m) : "––", $ = this.selected.flatMap((k) => {
      const I = At(n?.states[k]?.attributes.current_temperature);
      return I === void 0 ? [] : [{ id: k, text: `${i.one(I)} °C` }];
    }), S = this.system === "heating" && this.selected.length === 1 && n?.states[this.selected[0]]?.attributes.hvac_action === "heating", P = f ? t.targets(l.map((k) => `${this.name(k.entity)} ${this.degrees(k.value)}`).join(" · ")) : $.length ? t.now(this.selected.length === 1 ? `${$[0].text}${S ? ` · ${t.heats}` : ""}` : $.map((k) => `${this.name(k.id)} ${k.text}`).join(" · ")) : "", A = this.system === "heating" ? Io.filter((k) => k !== "boost" || Ye(n)) : Si.filter((k) => this.selected.some((I) => Wo(n?.states[I]).includes(k))), T = this.draft.mode === void 0 && h === void 0 && this.selected.length > 1, M = this.system === "cooling" && (c === "off" || c === "fan_only");
    return u`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((k) => {
      const I = n?.states[k.entity], E = Le(this.system, I), C = this.selected.includes(k.entity);
      return dn(this.prefix, {
        name: k.name,
        text: this.roomText(k.entity),
        state: C ? "on" : E ? "idle" : "off",
        disabled: E === void 0,
        pressed: C,
        onPress: () => this.selectRoom(k.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${_ ? "word" : ""}" aria-live="polite">${w}</div>
        <div class="sub">${P}</div>
        ${this.busy ? u`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : p}
      </div>
      <div class="slider">
        ${es(this.prefix, {
      min: s,
      max: a,
      step: r,
      value: m ?? s,
      mixed: f,
      marks: f ? d : [],
      label: t.temperature,
      valueText: m !== void 0 ? this.degrees(m) : "",
      minLabel: this.degrees(s),
      maxLabel: this.degrees(a),
      disabled: M || !this.selected.length,
      onChange: (k) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && c !== "manual" ? { temperature: k, mode: "manual" } : { temperature: k })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? ce(this.prefix, {
      label: t.mode,
      options: A.map((k) => ({ value: k, label: t.modes[k] })),
      value: c ?? "",
      onSelect: (k) => this.change({ mode: k, ...k === "plan" || k === "off" ? { temperature: void 0 } : {} })
    }) : u`<div class="modes" role="group" aria-label=${t.mode}>
            ${A.map(
      (k) => dn(this.prefix, {
        centered: !0,
        name: t.modes[k],
        state: c === k ? "on" : "idle",
        pressed: c === k,
        onPress: () => this.change({ mode: k })
      })
    )}
          </div>`}
      ${T ? u`<div class="note">${ie(t.mixedModes(this.selected.map((k) => `${this.name(k)} ${t.modes[It(this.system, n?.states[k]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : p}
      ${(f || T) && !Object.keys(this.draft).length ? u`<div class="note">${t.firstChange}</div>` : p}
      ${this.system === "heating" ? this.renderManualFor(c) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(c)]}
      ${this.error ? u`<div class="error" role="alert">${this.error}</div>` : p}
      ${this.selected.length === 1 ? u`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : p}
    `;
  }
  renderManualFor(t) {
    const i = this.texts;
    if (!Ye(this.hass)) return p;
    const n = t === "off", o = t === "manual" || t === "boost" || n, s = this.draft.manualFor ?? (t === "boost" ? "30" : n ? "forever" : "next"), a = Number(s), r = () => this.i18n.time(Date.now() + a * 6e4), l = o ? n ? s === "next" ? i.offUntilNextPlan : s === "forever" ? i.offUntilChanged : i.offUntilTime(r()) : s === "next" ? i.untilNextPlan : s === "forever" ? i.untilChanged : i.untilTime(r()) : "", d = n ? i.offFor : i.manualFor;
    return u`<h3>${d}</h3>
      ${ce(this.prefix, {
      label: d,
      options: Qo.map((h) => ({ value: h, label: i.manualForChoices[h] })),
      value: s,
      disabled: !o,
      wrap: !0,
      onSelect: (h) => this.change({ manualFor: h, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${l}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const i = this.texts, n = qo(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!n.length) return p;
    const o = t === "fan" ? i.fanModes : i.swingModes, s = this.draft[t] ?? Ko(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? i.fan : i.swing;
    return u`<h3>${a}</h3>
      ${ce(this.prefix, {
      label: a,
      options: n.map((r) => ({ value: r, label: o[r] ?? r })),
      value: s,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const i = this.texts, n = this.draft.offAfter ?? 0, o = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => Le(this.system, this.hass?.states[a]) === !0), s = o ? n === 0 ? i.runsUntilOff : i.offAt(this.i18n.time(Date.now() + n * 6e4)) : "";
    return u`<h3>${i.offAfter}</h3>
      ${ce(this.prefix, {
      label: i.offAfter,
      options: ts.map((a) => ({ value: String(a), label: i.offAfterChoices[String(a)] })),
      value: String(n),
      disabled: !o,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${s}</div>`;
  }
};
zi.styles = [jn, ki, st`
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
let Q = zi;
at([
  y({ attribute: !1 })
], Q.prototype, "hass");
at([
  y({ attribute: !1 })
], Q.prototype, "i18n");
at([
  y({ attribute: !1 })
], Q.prototype, "texts");
at([
  y()
], Q.prototype, "system");
at([
  y({ attribute: !1 })
], Q.prototype, "rooms");
at([
  y({ attribute: !1 })
], Q.prototype, "selected");
at([
  y()
], Q.prototype, "prefix");
at([
  y({ type: Number })
], Q.prototype, "delayMs");
at([
  N()
], Q.prototype, "draft");
at([
  N()
], Q.prototype, "busy");
at([
  N()
], Q.prototype, "error");
function dn(e, t) {
  const i = yi(`${e}-tile`);
  return wi`<${i}
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
  ></${i}>`;
}
function ce(e, t) {
  const i = yi(`${e}-segmented`);
  return wi`<${i}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(n) => {
    n.stopPropagation(), t.onSelect(n.detail.value);
  }}
  ></${i}>`;
}
function es(e, t) {
  const i = yi(`${e}-slider`);
  return wi`<${i}
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
  ></${i}>`;
}
function is(e) {
  if (!customElements.get(`${e}-climate`)) {
    const t = class extends Q {
      constructor() {
        super(), this.prefix = e;
      }
    };
    customElements.define(`${e}-climate`, t);
  }
}
var ns = Object.defineProperty, Bt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && ns(t, i, o), o;
};
const Li = class Li extends nt {
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
      ${this.num ? u`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? u`<span class="unit">${this.unit}</span>` : p}` : p}
    </div>`;
  }
};
Li.styles = st`
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
let mt = Li;
Bt([
  y({ type: Number })
], mt.prototype, "fraction");
Bt([
  y({ type: Number })
], mt.prototype, "size");
Bt([
  y({ type: Number })
], mt.prototype, "stroke");
Bt([
  y()
], mt.prototype, "num");
Bt([
  y()
], mt.prototype, "unit");
Bt([
  y()
], mt.prototype, "label");
class Ue {
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
class Ti {
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
const Ci = st`
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
var os = Object.defineProperty, tt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && os(t, i, o), o;
};
const Ni = class Ni extends nt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Ti(this), this.nudgeIndex = 0, this.gesture = new Ue(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), i = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? i[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : s;
    return u`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""} ${this.wrap ? "wrap" : !this.compact && this.options.length >= 5 ? "many" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : p}
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
Ni.styles = [
  Ci,
  st`
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
let V = Ni;
tt([
  y({ attribute: !1 })
], V.prototype, "options");
tt([
  y()
], V.prototype, "value");
tt([
  y()
], V.prototype, "label");
tt([
  y({ type: Boolean })
], V.prototype, "disabled");
tt([
  y({ type: Boolean, reflect: !0 })
], V.prototype, "pending");
tt([
  y({ type: Boolean })
], V.prototype, "compact");
tt([
  y({ type: Boolean })
], V.prototype, "wrap");
tt([
  y({ type: Boolean })
], V.prototype, "guarded");
tt([
  y({ type: Number })
], V.prototype, "holdMs");
tt([
  y({ type: Number })
], V.prototype, "doubleTapMs");
tt([
  y({ type: Number })
], V.prototype, "hintSeconds");
tt([
  y()
], V.prototype, "hint");
tt([
  N()
], V.prototype, "_dx");
tt([
  N()
], V.prototype, "_dragging");
var ss = Object.defineProperty, zt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && ss(t, i, o), o;
};
const as = 100, rs = 0.6, ls = 6, Ri = class Ri extends nt {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const i = this.focusable();
      if (!i.length) return;
      const n = t.composedPath(), o = i.findIndex((a) => n.includes(a)), s = t.shiftKey ? i[o <= 0 ? i.length - 1 : o - 1] : i[o === -1 || o === i.length - 1 ? 0 : o + 1];
      t.preventDefault(), s.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((i) => i instanceof HTMLElement && (i.localName.endsWith("-slider") || "drag" in i.dataset || i instanceof HTMLInputElement && i.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const i = this.drag;
      if (!i || i.pointerId !== t.pointerId) return;
      const n = t.clientY - i.startY;
      if (!this.dragging) {
        if (n < ls) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const i = this.drag;
      if (this.drag = void 0, !i || !this.dragging) return;
      this.dragging = !1;
      const n = Math.max(0, t.clientY - i.startY), o = n / Math.max(1, performance.now() - i.startTime);
      t.type === "pointerup" && (n > as || o > rs) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let i = document.activeElement;
      for (; i?.shadowRoot?.activeElement; ) i = i.shadowRoot.activeElement;
      this.returnFocus = i, this.dragY = 0;
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
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', i = (o) => [...o.querySelectorAll("*")].flatMap((s) => [
      ...s.matches(t) ? [s] : [],
      ...s.shadowRoot ? i(s.shadowRoot) : []
    ]), n = this.renderRoot.querySelector(".close");
    return [...n ? [n] : [], ...i(this).filter((o) => o.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, i) {
    const n = this.renderRoot.querySelector(".panel");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || i > 0 && n.scrollTop <= 0 || i < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  render() {
    return this.open ? u`<div
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
              ${this.sub ? u`<div class="sub">${this.sub}</div>` : p}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : p;
  }
};
Ri.styles = [jn, st`
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
let ut = Ri;
zt([
  y({ type: Boolean, reflect: !0 })
], ut.prototype, "open");
zt([
  y()
], ut.prototype, "heading");
zt([
  y()
], ut.prototype, "sub");
zt([
  y()
], ut.prototype, "closeLabel");
zt([
  y({ type: Boolean })
], ut.prototype, "wide");
zt([
  N()
], ut.prototype, "dragY");
zt([
  N()
], ut.prototype, "dragging");
var ds = Object.defineProperty, it = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && ds(t, i, o), o;
};
const Di = class Di extends nt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, i = this.max - this.min || 1, n = Math.max(0, Math.min(1, (t - this.min) / i)), o = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${n})`, s = this.mixed && this._drag === void 0 ? this.marks.map((d) => u`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / i)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(i / a + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (d, h) => u`<i style="left:${(h * a / i * 100).toFixed(2)}%"></i>`) : [];
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
        <div class="ticks" aria-hidden="true">${l}</div>
        ${s.length ? u`<div class="marks" aria-hidden="true">${s}</div>` : null}
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
Di.styles = st`
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
let q = Di;
it([
  y({ type: Number })
], q.prototype, "min");
it([
  y({ type: Number })
], q.prototype, "max");
it([
  y({ type: Number })
], q.prototype, "step");
it([
  y({ type: Number })
], q.prototype, "tickStep");
it([
  y({ type: Number })
], q.prototype, "value");
it([
  y()
], q.prototype, "label");
it([
  y()
], q.prototype, "valueText");
it([
  y()
], q.prototype, "minLabel");
it([
  y()
], q.prototype, "maxLabel");
it([
  y({ type: Boolean })
], q.prototype, "disabled");
it([
  y({ type: Boolean, reflect: !0 })
], q.prototype, "mixed");
it([
  y({ attribute: !1 })
], q.prototype, "marks");
it([
  N()
], q.prototype, "_drag");
var hs = Object.defineProperty, pt = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && hs(t, i, o), o;
};
const Fi = class Fi extends nt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Ti(this), this.gesture = new Ue(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
        aria-busy=${this.pending ? "true" : p}
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
Fi.styles = [
  Ci,
  st`
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
let et = Fi;
pt([
  y({ type: Boolean })
], et.prototype, "checked");
pt([
  y({ type: Boolean })
], et.prototype, "disabled");
pt([
  y({ type: Boolean, reflect: !0 })
], et.prototype, "pending");
pt([
  y()
], et.prototype, "label");
pt([
  y({ type: Boolean })
], et.prototype, "guarded");
pt([
  y({ type: Number })
], et.prototype, "holdMs");
pt([
  y({ type: Number })
], et.prototype, "doubleTapMs");
pt([
  y({ type: Number })
], et.prototype, "hintSeconds");
pt([
  y()
], et.prototype, "hintPlacement");
pt([
  y()
], et.prototype, "hint");
var cs = Object.defineProperty, K = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && cs(t, i, o), o;
};
const ji = class ji extends nt {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Ti(this), this.gesture = new Ue(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    xi(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", i = this.count === void 0 ? null : u`<span class="count">${this.count}</span>`;
    return u`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : p}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : p}
        aria-busy=${this.pending ? "true" : p}
        aria-haspopup=${this.kind === "open" ? "dialog" : p}
        aria-label=${this.label || p}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(n) => this.protected && n.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? u`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? i : u`<span class="text">${ie(this.text)}${i}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, i] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: i, bubbles: !0, composed: !0 }));
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
    const i = this.gesture.tap("tile", t.timeStamp);
    i === "double" ? this.emit() : i === "single" && this.hints.show(this.hintSeconds);
  }
};
ji.styles = [
  Ci,
  ki,
  st`
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
let B = ji;
K([
  y()
], B.prototype, "name");
K([
  y()
], B.prototype, "text");
K([
  y({ reflect: !0 })
], B.prototype, "state");
K([
  y()
], B.prototype, "kind");
K([
  y({ type: Number })
], B.prototype, "count");
K([
  y({ type: Boolean, reflect: !0 })
], B.prototype, "centered");
K([
  y({ type: Boolean })
], B.prototype, "disabled");
K([
  y({ type: Boolean, reflect: !0 })
], B.prototype, "pending");
K([
  y({ type: Boolean })
], B.prototype, "pressed");
K([
  y()
], B.prototype, "label");
K([
  y({ type: Boolean })
], B.prototype, "guarded");
K([
  y({ type: Number })
], B.prototype, "holdMs");
K([
  y({ type: Number })
], B.prototype, "doubleTapMs");
K([
  y({ type: Number })
], B.prototype, "hintSeconds");
K([
  y()
], B.prototype, "hint");
K([
  y()
], B.prototype, "hintAlign");
function us(e) {
  const t = [
    [`${e}-switch`, et],
    [`${e}-segmented`, V],
    [`${e}-slider`, q],
    [`${e}-ring`, mt],
    [`${e}-tile`, B],
    [`${e}-sheet`, ut]
  ];
  for (const [i, n] of t)
    customElements.get(i) || customElements.define(i, n);
}
const Ce = 60, ai = 142, hn = 11, ue = 3, ps = 0.8, cn = 2, fs = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", ms = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", gs = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function vs(e, t) {
  if (e === void 0 || t === void 0)
    return x`<rect
      x="0.75"
      y="0.75"
      width=${Ce - 1.5}
      height=${ai - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const i = ai - ue - 1, n = i / hn, o = n - ps, s = o - t / 100 * (o - cn), a = ue + 1 + (100 - e) / 100 * i, r = Array.from({ length: hn }, (l, d) => {
    const h = ue + 1 + d * n + n / 2, c = h <= a, f = c ? s : cn;
    return x`<rect
      x="0"
      y=${(h - f / 2).toFixed(2)}
      width=${Ce}
      height=${f.toFixed(2)}
      rx=${Math.min(1.5, f / 2).toFixed(2)}
      style=${c ? fs : ms}
    ></rect>`;
  });
  return x`<rect
      class="rail"
      x="0"
      y="0"
      width=${Ce}
      height=${ue}
      rx="1.5"
      style=${gs}
    ></rect>${r}`;
}
const bs = ["cs", "en", "sv"];
class Hn extends Error {
}
function z(e) {
  throw new Hn(e);
}
function $s(e, t) {
  try {
    return t();
  } catch (i) {
    throw i instanceof Hn ? new Error(`${e}: ${i.message}`) : i;
  }
}
function Et(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function vt(e, t) {
  return e == null ? {} : (Et(e) || z(`"${t}" must be a mapping of keys.`), e);
}
function Ot(e, t, i) {
  for (const n of Object.keys(e))
    t.includes(n) || z(`${i}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function ys(e, t, i = {}) {
  if (e == null)
    return;
  const n = typeof e == "string" ? e.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || z(`${t} must be an entity ID such as ${i.example ?? `${i.domain ?? "sensor"}.example`}.`), i.domain && !n.startsWith(`${i.domain}.`) && z(`${t} must be a ${i.domain} entity (${i.domain}.…), not ${n}.`), n;
}
function ri(e, t) {
  if (e != null)
    return (typeof e != "string" || !e.trim()) && z(`${t} must be a non-empty text.`), e.trim();
}
function Ne(e, t) {
  if (e != null) {
    if (typeof e == "string" && e.trim())
      return e.trim();
    if (Et(e) && Object.keys(e).length > 0) {
      const i = Object.entries(e);
      if (i.every(([n, o]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof o == "string" && o.trim()))
        return Object.fromEntries(i.map(([n, o]) => [n, o.trim()]));
    }
    return z(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Be(e, t) {
  if (e === void 0 || typeof e == "string")
    return e;
  const i = t.toLowerCase();
  return e[i] ?? e[i.split("-")[0]] ?? e.en ?? Object.values(e)[0];
}
function ws(e) {
  return e === void 0 ? [] : typeof e == "string" ? [e] : Object.values(e);
}
const un = ["auto", ...bs];
function xs(e) {
  const t = e ?? "auto";
  return un.includes(t) || z(`language must be one of ${un.join(", ")}.`), t;
}
const li = ["open", "shade", "dark"], ks = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function _s(e) {
  return ks.has(e);
}
function pn(e, t) {
  return t ? e?.states?.[t] : void 0;
}
const Un = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function pe(e, t, i, n) {
  return e !== void 0 && t !== void 0 && Math.abs(e - i.position) <= n && Math.abs(t - i.tilt) <= n;
}
function Kt(e, t) {
  return t === "temperature" ? e.temperature_step : t === "co2" ? e.co2_step : e.pm25_step;
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
  humidityLine: "var(--kd-humidity)",
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
}, Ai = {
  off: v.off,
  cool: v.cool,
  wind_free: v.cool,
  dry: v.dry,
  fan: v.plan,
  heat: v.heat,
  auto: v.auto,
  unknown: v.off
}, Ss = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function Ms(e) {
  const t = Ss[e];
  if (t)
    return t;
  const i = e.replace(/_/g, " ");
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Ts(e) {
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
function Ge(e, t, i, n, o) {
  const { thresholds: s } = n, a = [
    [o.required.temperature, e.temperature],
    [o.required.humidity, e.humidity],
    ...n.hasCo2 ? [[o.required.co2, e.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, e.pm25]] : [],
    [o.required.houseMode, i ? { value: 1 } : void 0]
  ];
  for (const [b, m] of a) {
    if (m?.value === void 0)
      return { id: "noData", label: o.noData(b), color: v.label, kind: "unknown" };
    if (m.stale) {
      const _ = m.ageMinutes === void 0 ? void 0 : Vn(m.ageMinutes);
      return { id: "noData", label: o.noData(b, _), color: v.label, kind: "unknown" };
    }
  }
  const r = e.temperature.value, l = e.humidity.value, d = n.hasCo2 ? e.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? e.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: v.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: v.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: v.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: v.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: v.warning, kind: "warning", cause: "humidity" };
  const c = t ? s.summer_min : s.winter_min, f = t ? s.summer_max : s.winter_max;
  return r > f ? { id: "warm", label: o.status.warm, color: v.warning, kind: "warning", cause: "temperature" } : r < c ? { id: "cold", label: o.status.cold, color: v.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: v.label, kind: "normal" };
}
function ct(e) {
  return _s(e) || e === "none";
}
function ft(e) {
  if (e == null || e === "")
    return;
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function Bn(e, t) {
  return e === void 0 || e <= 0 ? 0 : e >= t.heating_waves_3 ? 3 : e >= t.heating_waves_2 ? 2 : 1;
}
function Cs(e) {
  const t = /* @__PURE__ */ new Set(), i = (n) => {
    n && t.add(n);
  };
  i(e.houseModeEntity), i(e.ventilationEntity), i(e.ventilationTimerEntity), i(e.outside?.temperature), i(e.outside?.minimum), i(e.outside?.maximum), i(e.outside?.rain_probability), i(e.outside?.pm25);
  for (const n of e.rooms)
    i(n.temperature), i(n.humidity), i(n.carbon_dioxide), i(n.pm25), n.windows.forEach((o) => i(o.entity)), i(n.cover), i(n.heating?.climate), i(n.heating?.overlay), i(n.heating?.target), i(n.heating?.intensity), i(n.air_conditioner);
  return t;
}
function As(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
function Es(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  const i = Object.keys(e), n = Object.keys(t);
  return i.length === n.length && i.every((o) => Object.hasOwn(t, o) && e[o] === t[o]);
}
function Vn(e) {
  return e < 60 ? `${Math.max(1, Math.round(e))} min` : e < 2880 ? `${Math.floor(e / 60)} h` : `${Math.floor(e / 1440)} d`;
}
function fn(e, t) {
  const i = (e ?? []).filter((o) => o !== void 0);
  if (i.length < 2)
    return;
  const n = i[i.length - 1] - i[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function fe(e) {
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
function mn(e, t) {
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
function Xe(e, t) {
  const i = Math.max(1, Math.round(e));
  return i % 60 === 0 ? t.period.hour(i / 60) : t.period.minute(i);
}
function Wn(e, t) {
  return Be(e.label, t) ?? e.name;
}
function gn(e, t, i) {
  return Be(e.label, i) ?? t.cover.presetName[e.icon];
}
function vn(e, t, i) {
  if (e.description !== void 0)
    return Be(e.description, i) ?? "";
  const n = Un[e.icon];
  return e.label === void 0 && n.position === e.position && n.tilt === e.tilt ? t.cover.presetDescription[e.icon] : t.cover.position(Math.round(e.position), Math.round(e.tilt));
}
function Os(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.humidity, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
const Ps = "input_select.house_mode", zs = 500, Ls = 420, Ns = 25, Rs = {
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
}, Ds = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, Fs = {
  hours: 24,
  min_temperature_span: 1.5
}, Ze = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, js = li.map((e) => ({ icon: e, ...Un[e] })), bn = { winter: "Zima", summer: "Léto" }, $n = 3, Is = [
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
], Hs = ["climate", "overlay", "target", "intensity"], yn = ["temperature", "minimum", "maximum", "rain_probability", "pm25", "weather", "humidity", "forecast"], Us = ["name", "position", "tilt", "icon", "description"], Bs = ["entity", "name"];
function Jt(e) {
  return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function G(e, t) {
  return ys(e, t, { example: "sensor.loznice_teplota" });
}
function Xt(e, t, i, n = {}) {
  Ot(e, Object.keys(t), i);
  const o = { ...t };
  for (const [s, a] of Object.entries(e)) {
    if (a === null)
      continue;
    (typeof a != "number" || !Number.isFinite(a)) && z(`${i}.${s} must be a number.`);
    const r = n[s];
    if (r) {
      const [l, d, h] = r;
      (a < l || a > d || h && !Number.isInteger(a)) && z(`${i}.${s} must be ${h ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = a;
  }
  return o;
}
function qn(e, t) {
  const i = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of i)
    (s ? e[n] >= e[o] : e[n] > e[o]) && z(`${t}: ${n} (${e[n]}) must be ${s ? "below" : "at most"} ${o} (${e[o]}).`);
  e.stale_minutes <= 0 && z(`${t}.stale_minutes must be greater than 0.`), (e.heating_waves_2 < 1 || e.heating_waves_3 > 100) && z(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function Vs(e, t) {
  return e > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function di(e, t) {
  return (!Array.isArray(e) || e.length === 0 || e.length > $n) && z(`${t} must be a list of 1 to ${$n} presets.`), e.map((i, n) => {
    const o = `${t}[${n + 1}]`;
    Et(i) || z(`${o} must have a position and a tilt.`), Ot(i, Us, o);
    const s = Ne(i.name, `${o}.name`), a = (c) => {
      const f = i[c];
      return (typeof f != "number" || !Number.isFinite(f) || f < 0 || f > 100) && z(`${o}.${c} must be a number from 0 to 100.`), f;
    }, r = a("position"), l = a("tilt");
    let d = Vs(r, l);
    i.icon != null && (li.includes(i.icon) || z(`${o}.icon must be one of ${li.join(", ")}.`), d = i.icon);
    const h = Ne(i.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: h, position: r, tilt: l };
  });
}
function Ws(e, t) {
  const i = e.window;
  if (i == null)
    return [];
  const n = Array.isArray(i) ? i : [i];
  n.length === 0 && z(`${t}.window must not be an empty list.`);
  const o = n.map((a, r) => {
    const l = `${t}.window${Array.isArray(i) ? `[${r + 1}]` : ""}`;
    if (Et(a)) {
      Ot(a, Bs, l);
      const h = G(a.entity, `${l}.entity`);
      return h || z(`${l}.entity is required.`), { entity: h, name: Ne(a.name, `${l}.name`) };
    }
    const d = G(a, l);
    return d || z(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const a of o)
    s.has(a.entity) && z(`${t}.window lists ${a.entity} twice.`), s.add(a.entity);
  return o;
}
function wn(e, t) {
  return e === !1 ? { present: !1 } : { entity: G(e, t), present: !0 };
}
function qs(e, t) {
  const i = ri(e, `${t}.link`);
  return i !== void 0 && !/^(\/|https?:\/\/)/i.test(i) && z(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), i;
}
function Ks(e, t, i) {
  Et(e) || z(`room ${t + 1} must be a mapping with at least a name.`);
  const n = Et(e) && e.name != null ? Ne(e.name, `room ${t + 1} name`) : void 0, o = n === void 0 ? "" : ws(n)[0];
  (!o || n === void 0) && z(`room ${t + 1} requires a name.`);
  const s = `room "${o}"`, a = e;
  for (const [f, b] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    f in a && z(`${s}: key "${f}" was renamed to "${b}".`);
  "windows" in a && z(`${s}: the key is "window" (one entity or a list of them), not "windows".`), Ot(a, Is, s);
  const r = vt(e.heating, `${s}.heating`);
  "heating" in r && z(`${s}: key "heating.heating" was renamed to "heating.intensity".`), Ot(r, Hs, `${s}.heating`);
  const l = e.heating == null ? void 0 : {
    climate: G(r.climate, `${s}.heating.climate`),
    overlay: G(r.overlay, `${s}.heating.overlay`),
    target: G(r.target, `${s}.heating.target`),
    intensity: G(r.intensity, `${s}.heating.intensity`)
  }, d = Xt(vt(e.thresholds, `${s}.thresholds`), i.thresholds, `${s}.thresholds`);
  qn(d, `${s}.thresholds`);
  const h = wn(e.carbon_dioxide, `${s}.carbon_dioxide`), c = wn(e.pm25, `${s}.pm25`);
  return {
    name: o,
    label: n,
    temperature: G(e.temperature, `${s}.temperature`),
    humidity: G(e.humidity, `${s}.humidity`),
    carbon_dioxide: h.entity,
    hasCo2: h.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: Ws(e, s),
    cover: G(e.cover, `${s}.cover`),
    presets: e.cover_presets == null ? i.presets : di(e.cover_presets, `${s}.cover_presets`),
    thresholds: d,
    heating: l,
    air_conditioner: G(e.air_conditioner, `${s}.air_conditioner`),
    link: qs(e.link, s)
  };
}
function Ys(e) {
  return $s("Klima Dashboard", () => Gs(e));
}
function Gs(e) {
  (!Et(e) || !Array.isArray(e.rooms) || e.rooms.length === 0) && z("the configuration requires a non-empty rooms list.");
  const t = xs(e.language), i = G(e.house_mode_entity, "house_mode_entity") ?? Ps, n = G(e.ventilation_entity, "ventilation_entity"), o = G(e.ventilation_timer_entity, "ventilation_timer_entity"), s = e.ventilation_co2_target ?? zs;
  (typeof s != "number" || !Number.isFinite(s) || s < 300 || s > 2e3) && z("ventilation_co2_target must be a number of ppm between 300 and 2000.");
  const a = e.ventilation_co2_full ?? Ls;
  (typeof a != "number" || !Number.isFinite(a) || a < 300 || a > s) && z("ventilation_co2_full must be a number of ppm between 300 and ventilation_co2_target.");
  const r = e.ventilation_settle_minutes ?? Ns;
  (typeof r != "number" || !Number.isInteger(r) || r < 1 || r > 180) && z("ventilation_settle_minutes must be a whole number of minutes between 1 and 180.");
  const l = e.send_delay_seconds ?? 2;
  (typeof l != "number" || !Number.isFinite(l) || l < 0 || l > 30) && z("send_delay_seconds must be a number of seconds between 0 and 30.");
  const d = vt(e.house_modes, "house_modes");
  Ot(d, ["winter", "summer"], "house_modes");
  const h = {
    winter: ri(d.winter, "house_modes.winter") ?? bn.winter,
    summer: ri(d.summer, "house_modes.summer") ?? bn.summer
  };
  Jt(h.winter) === Jt(h.summer) && z("house_modes.winter and house_modes.summer must differ.");
  const c = e.outside == null ? void 0 : vt(e.outside, "outside");
  if (c) {
    Ot(c, yn, "outside");
    for (const k of yn)
      G(c[k], `outside.${k}`);
  }
  const f = Xt(vt(e.thresholds, "thresholds"), Rs, "thresholds");
  qn(f, "thresholds");
  const b = Xt(vt(e.trends, "trends"), Ds, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), m = { ...vt(e.history, "history") };
  delete m.night_start, delete m.night_end;
  const _ = Xt(m, Fs, "history", {
    hours: [1, 168, "integer"],
    min_temperature_span: [0.5, 20]
  }), w = { ...vt(e.covers, "covers") }, $ = w.presets;
  delete w.presets;
  const S = w.script;
  delete w.script;
  const P = {
    ...Xt(w, { tolerance: Ze.tolerance, stall_seconds: Ze.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Ze.script
  };
  S != null && ((typeof S != "string" || !/^script\.[a-z0-9_]+$/.test(S.trim())) && z("covers.script must be a script entity such as script.zaluzie_posun."), P.script = S.trim());
  const A = $ == null ? di(js, "covers.presets") : di($, "covers.presets"), T = e.rooms.map((k, I) => Ks(k, I, { thresholds: f, presets: A })), M = /* @__PURE__ */ new Set();
  for (const k of T)
    M.has(k.name) && z(`room name "${k.name}" is used twice; room names must be unique.`), M.add(k.name);
  return {
    language: t,
    houseModeEntity: i,
    houseModes: h,
    ventilationEntity: n,
    ventilationTimerEntity: o,
    ventilationCo2Target: s,
    ventilationCo2Full: a,
    ventilationSettleMinutes: r,
    sendDelaySeconds: l,
    outside: c,
    thresholds: f,
    trends: b,
    history: _,
    covers: P,
    rooms: T
  };
}
const Kn = ne;
function Je(e) {
  const t = typeof e == "string" ? Number.parseFloat(e) : e;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Yn(e, t, i) {
  const n = e?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const r = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return r === "manual" && i !== void 0 && i <= Kn ? "off" : r;
}
const Pt = 36e5;
function Xs(e) {
  if (e == null)
    return;
  if (typeof e == "number")
    return Number.isFinite(e) ? e < 1e11 ? e * 1e3 : e : void 0;
  const t = Date.parse(e);
  return Number.isNaN(t) ? void 0 : t;
}
function Zs(e, t) {
  const i = {};
  for (const [n, o] of Object.entries(e ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((a, r) => {
      const l = a.s ?? a.state, d = Xs(a.lu ?? a.last_updated ?? a.lc ?? a.last_changed) ?? (r === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((a, r) => a.time - r.time), i[n] = s;
  }
  return i;
}
async function me(e, t, i, n) {
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
  return Zs(o, i);
}
function oe(e, t) {
  let i;
  for (const n of e ?? []) {
    if (n.time > t)
      break;
    i = n.state;
  }
  return i;
}
function hi(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function Js(e, t, i, n) {
  const o = (i - t) / n, s = (e ?? []).filter((a) => hi(a.state) !== void 0);
  return Array.from(
    { length: n },
    (a, r) => hi(oe(s, t + (r + 1) * o))
  );
}
function ge(e, t, i, n = !1) {
  const o = [];
  for (const a of e ?? []) {
    const r = hi(a.state);
    r !== void 0 && !(n && r === 0) && a.time <= i && o.push({ t: Math.max(a.time, t), v: r });
  }
  const s = o[o.length - 1];
  return s && s.t < i && o.push({ t: i, v: s.v }), o;
}
function Rt(e, t, i, n) {
  const o = /* @__PURE__ */ new Set([t, i]);
  for (const r of e)
    for (const l of r ?? [])
      l.time > t && l.time < i && o.add(l.time);
  const s = [...o].sort((r, l) => r - l), a = [];
  for (let r = 0; r < s.length - 1; r += 1) {
    const l = n(e.map((h) => oe(h, s[r])));
    if (l === void 0)
      continue;
    const d = a[a.length - 1];
    d && d.value === l && d.end === s[r] ? d.end = s[r + 1] : a.push({ start: s[r], end: s[r + 1], value: l });
  }
  return a;
}
function Qe(e, t) {
  let i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const a of e)
    for (const r of a ?? [])
      r !== void 0 && Number.isFinite(r) && (i = Math.min(i, r), n = Math.max(n, r));
  if (!Number.isFinite(i) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(i / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function Qs(e, t) {
  const i = t.max - t.min;
  return e.map(
    (n) => n === void 0 || i <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / i))
  );
}
function ve(e, t = 5 * 6e4, i = 720) {
  if (e.length < 2)
    return e;
  const n = 6e4, o = e[0].t, s = e[e.length - 1].t, a = Math.max(2, Math.floor((s - o) / n) + 1), r = [];
  let l = 0;
  for (let m = 0; m < a; m += 1) {
    const _ = m === a - 1 ? s : o + m * n;
    for (; l + 1 < e.length && e[l + 1].t <= _; )
      l += 1;
    r.push(e[l].v);
  }
  const d = Math.max(0, Math.floor(t / n / 2)), h = [0];
  for (const m of r)
    h.push(h[h.length - 1] + m);
  const c = Math.max(1, Math.ceil(a / i)), f = [];
  for (let m = 0; m < a - 1; m += c)
    f.push(m);
  return f.push(a - 1), f.map((m) => {
    const _ = Math.max(0, m - d), w = Math.min(a - 1, m + d);
    return { t: m === a - 1 ? s : o + m * n, v: (h[w + 1] - h[_]) / (w - _ + 1) };
  });
}
function ta() {
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
  ].map(([t, i, n]) => x`<circle cx=${t} cy=${i} r=${n}></circle>`)}
    </svg>
  `;
}
function xn(e) {
  const t = (o, s, a, r) => x`<rect x=${o} y=${s} width=${a} height=${r} rx=${r / 2 > 1.2 ? 1.2 : r / 2} fill="currentColor" stroke="none"></rect>`, i = (o) => x`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (e) {
    case "open":
      n = x`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${i(21)}`;
      break;
    case "shade":
      n = x`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${i(26)}`;
      break;
    default:
      n = x`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${i(26)}`;
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
function ea() {
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
function Gn(e, t) {
  return x`${[0, 1, 2].map(
    (i) => x`<path
      d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${i < e ? v.warning : v.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : p}
    ></path>`
  )}`;
}
function Ae(e, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Gn(e, t)}
    </svg>
  `;
}
function ci(e) {
  let t;
  const i = x`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = x`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (e) {
    case "cool":
    case "wind_free":
      t = x`${i}
        <g transform="rotate(60 12 12)">${i}</g>
        <g transform="rotate(120 12 12)">${i}</g>`;
      break;
    case "dry":
      t = x`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = x`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
      break;
    case "heat":
      t = x`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (o) => x`<path d="M12 3v2.5" transform=${`rotate(${45 * o} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      t = x`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      t = x`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return t;
}
function Ee(e, t, i) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${i ? "2 2.4" : p}
      aria-hidden="true"
    >
      ${ci(e)}
    </svg>
  `;
}
function Xn() {
  return x`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function ti(e, t) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${e}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : p}
      aria-hidden="true"
    >
      ${Xn()}
    </svg>
  `;
}
function ia(e) {
  let t;
  switch (e) {
    case "off":
      t = x`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = x`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = x`<path d="M4 8h7.5M16.5 8H20M4 16h3.5M12.5 16H20"></path>
        <circle cx="14" cy="8" r="2.5"></circle><circle cx="10" cy="16" r="2.5"></circle>`;
      break;
    default:
      t = x`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
function na(e) {
  let t, i;
  for (const n of e ?? []) {
    const o = n.state.toLowerCase();
    o === "on" && !t ? (t = { start: n.time }, i = t) : o === "off" && t && (t.end = n.time, t = void 0);
  }
  return i;
}
function oa(e, t, i) {
  return oe(e, t)?.toLowerCase() === "on" ? !0 : (e ?? []).some((n) => n.time > t && n.time <= i && n.state.toLowerCase() === "on");
}
function be(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function St(e, t) {
  return e === void 0 || t === void 0 || t < 0 || t > 100 || e <= -243.12 ? void 0 : 216.7 * (t / 100 * 6.112 * Math.exp(17.62 * e / (243.12 + e))) / (273.15 + e);
}
function sa(e, t, i, n) {
  const o = t <= i;
  return t <= n || e <= n && o ? { done: 1, closable: o } : e <= n ? { done: 0, closable: o } : { done: Math.min(0.99, Math.max(0, (e - t) / (e - n))), closable: o };
}
const jt = " ", ht = 4, aa = 44, lt = 6, ot = 180, dt = lt + ot, $e = 10, Zn = dt + 10, Oe = 14, kn = 14, ra = 3, Jn = 14, la = 7;
function da(e, t, i) {
  if (t === "temperature") {
    const o = i ? ["climate", "heating"] : ["heating", "climate"];
    return e.windows ? [...o, "windows"] : o;
  }
  const n = [];
  return e.ventilation && n.push("ventilation"), e.windows && n.push("windows"), n;
}
const Qn = (e) => e === 0 ? dt : Zn + e * Oe, ha = (e = 0) => Qn(Math.max(e, ra)) + Jn + la, ei = 12, ca = [0, 0.24, 0.44, 0.68], ua = "history-under-temperature", pa = "history-plot", fa = "history-curve", to = {
  schedule: v.plan,
  manual: v.warning,
  off: v.closed
}, ma = {
  schedule: "color-mix(in srgb, var(--kd-label) 60%, var(--kd-closed))",
  manual: v.warning,
  off: v.closed
}, Z = (e) => `fill: ${e}`, J = (e) => `stroke: ${e}`;
function ii(e, t, i) {
  return Yn(t, e, i);
}
function ye(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
const Ei = 0.05;
function ga(e, t) {
  const i = e.filter((r) => Number.isFinite(r));
  let n = 19, o = 23;
  if (i.length > 0) {
    if (n = Math.min(...i), o = Math.max(...i), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const r = (o - n) * Ei;
    n -= r, o += r;
  }
  const s = o - n, a = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: a };
}
function va(e, t, i) {
  const n = [], o = i / 1e3;
  for (let s = Math.ceil(e / i - o) * i; s <= t + o; s += i)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function ba(e, t, i, n, o) {
  const s = (E) => E ? e[E] : void 0, { startMs: a, endMs: r } = i, l = s(t.heating?.overlay), d = s(t.heating?.climate), h = ve(ge(s(t.temperature), a, r, !0)), c = ve(ge(s(t.humidity), a, r, !0)), f = Rt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([E, C, j]) => ii(E, C, ye(j))
  ), b = Rt(
    [l, d, s(t.heating?.intensity), s(t.heating?.target)],
    a,
    r,
    ([E, C, j, R]) => {
      const W = ii(E, C, ye(R)), Y = Bn(ye(j), t.thresholds);
      return W === void 0 || W === "off" || Y === 0 ? void 0 : String(Y);
    }
  ), m = Rt(
    [l, d, s(t.heating?.target)],
    a,
    r,
    ([E, C, j]) => {
      const R = ye(j), W = ii(E, C, R);
      if (!(R === void 0 || R <= Kn))
        return W === "schedule" || W === "manual" ? String(R) : void 0;
    }
  ), _ = t.windows.length > 0 ? Rt(
    t.windows.map((E) => s(E.entity)),
    a,
    r,
    (E) => E.some((C) => C?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, w = o ? Rt([s(o)], a, r, ([E]) => E?.toLowerCase() === "on" ? "on" : void 0) : void 0, $ = ve(ge(s(t.carbon_dioxide), a, r, !0)), S = ve(ge(s(t.pm25), a, r)), P = Rt([s(t.air_conditioner)], a, r, ([E]) => {
    const C = Ts(E);
    return C === "unknown" ? void 0 : C;
  }), A = h.map((E) => E.v), { min: T, max: M, step: k } = ga(
    A.length > 0 ? A : m.map((E) => Number(E.value)),
    n.min_temperature_span
  ), I = c.map((E) => E.v);
  return {
    range: i,
    temperature: h,
    humidity: c,
    heating: f,
    intensity: b,
    target: m,
    climate: P,
    windows: _,
    co2: $,
    pm25: S,
    ventilation: w,
    limits: {
      co2: { warning: t.thresholds.co2_warning, critical: t.thresholds.co2_critical },
      pm25: { warning: t.thresholds.pm25_warning, critical: t.thresholds.pm25_critical }
    },
    comfort: {
      winter: { min: t.thresholds.winter_min, max: t.thresholds.winter_max },
      summer: { min: t.thresholds.summer_min, max: t.thresholds.summer_max }
    },
    tempMin: T,
    tempMax: M,
    tempStep: k,
    humidityMin: I.length > 0 ? Math.min(...I) : void 0,
    humidityMax: I.length > 0 ? Math.max(...I) : void 0
  };
}
function ni(e, t = "temperature") {
  return t === "co2" ? e.co2.length > 0 : t === "pm25" ? e.pm25.length > 0 : e.temperature.length > 0 || e.humidity.length > 0 || e.heating.length > 0;
}
function $a(e, t) {
  const i = e.filter((l) => Number.isFinite(l)), n = 400, o = t === "pm25" ? 0 : Math.min(n, i.length > 0 ? Math.floor(Math.min(...i) / 100) * 100 : n), s = t === "co2" ? 400 : 10, a = i.length > 0 ? Math.max(...i) : o + s, r = Math.max(a, o + s);
  return { min: o, max: r + (r - o) * Ei };
}
function ya(e, t, i, n) {
  const o = i === "co2" ? [50, 100, 200, 250, 500, 1e3, 2e3] : [1, 2, 5, 10, 20, 50, 100], s = (t - e) / Math.max(2, n), a = o.find((l) => l >= s * 0.8) ?? o[o.length - 1], r = [];
  for (let l = Math.ceil(e / a - 1e-9) * a; l <= t + 1e-9; l += a)
    r.push(l);
  return r;
}
function Mt(e) {
  return e - ht - aa;
}
function wa(e, t, i) {
  return ht + (e - t.startMs) / (t.endMs - t.startMs) * Mt(i);
}
function xa(e, t, i) {
  const n = Math.min(1, Math.max(0, (e - ht) / Mt(t)));
  return i.startMs + n * (i.endMs - i.startMs);
}
function se(e, t) {
  let i;
  for (const n of e) {
    if (n.t > t)
      break;
    i = n.v;
  }
  return i;
}
function we(e, t, i) {
  return e.find(
    (n) => n.start <= t && (t < n.end || t === i && n.end === i)
  )?.value;
}
const _n = [1, 2, 3, 4, 6, 12, 24, 48, 72, 120, 168];
function Oi(e) {
  const t = (e.endMs - e.startMs) / Pt;
  let i = _n[0], n = 1 / 0;
  for (const o of _n) {
    const s = t / o, r = (s < 6 ? 6 - s : s > 10 ? s - 10 : 0) * 100 + Math.abs(s - 8) - o / 1e6;
    r < n && (n = r, i = o);
  }
  return i;
}
function ka(e) {
  const t = Oi(e), i = [], n = new Date(e.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < e.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= e.endMs; )
    n.getTime() >= e.startMs && i.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return i;
}
function _a(e, t) {
  return { x: Math.max(e, t + 9), anchor: "middle" };
}
function Sa(e) {
  return e === "off" ? to.off : Ai[e] ?? v.off;
}
function Ma(e, t, i) {
  const n = new Date(e).getHours() === 0;
  return Oi(t) >= 24 || n && t.endMs - t.startMs > 36 * Pt ? i.day(e) : i.hour(e).replace(/^(\d{1,2}):00$/, "$1");
}
function eo(e, t, i) {
  const { t: n } = i;
  if (t === void 0)
    return n.chart.now;
  const o = (r) => {
    const l = new Date(r);
    return l.setHours(12, 0, 0, 0), l.getTime();
  }, s = Math.round((o(e.range.endMs) - o(t)) / (24 * Pt));
  return `${s === 0 ? "" : s === 1 ? `${n.chart.yesterday} ` : `${i.day(t)} `}${i.time(t)}`;
}
function io(e, t) {
  return e === void 0 ? v.label : e >= t.critical ? v.alertOnPopup : e >= t.warning ? v.warning : v.white;
}
function Ta(e, t, i) {
  const { t: n } = i, o = t ?? e.range.endMs, s = se(e.temperature, o), a = se(e.humidity, o), r = we(e.heating, o, e.range.endMs), l = Number(we(e.intensity, o, e.range.endMs) ?? 0), d = we(e.target, o, e.range.endMs), h = we(e.climate, o, e.range.endMs), c = St(s, a), f = eo(e, t, i), b = r === void 0 ? "––" : `${n.heatingMode[r]}${r !== "off" && d !== void 0 ? ` · ${i.half(Number(d))} °C` : ""}`, m = h ? n.climateMode[h] : "––", _ = h ? Ai[h] : v.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp"
            >${s === void 0 ? "––" : u`${i.one(s)}<span class="readout-unit">${jt}°C</span>`}</span
          >
          ${a === void 0 ? p : u`<span class="readout-hum"
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">${n.required.humidity} </span>${i.percent(Math.round(a))}${c === void 0 ? p : u`<span class="readout-abs">${jt}·${jt}${i.one(c)}${jt}g/m³</span>`}</span
              >`}
        </span>
        <span class="readout-time">${f}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${r === "off" ? v.off : r ? to[r] : v.label}`}>
          <span class="readout-icon">${Ae(r && r !== "off" ? l : 0, r === void 0)}</span>
          ${n.system.heating} ${ie(b)}
        </span>
        <span class="readout-system" style=${`color: ${_}`}>
          <span class="readout-icon">${Ee(h ?? "off", _, h === void 0)}</span>
          ${n.system.climate} ${m}
        </span>
      </div>
    </div>
  `;
}
function Ca(e, t, i, n, o) {
  const s = i ?? e.range.endMs, a = i === void 0 && o !== void 0, r = a ? o.value : se(e[t], s), l = t === "co2" && e.pm25.length > 0 ? a && o.secondary ? o.secondary.value : se(e.pm25, s) : void 0, d = a && o.secondary?.stale === !0, h = e.limits[t], c = t === "co2" ? "ppm" : "µg/m³";
  return u`
    <div class="readout single" aria-live="polite">
      <div class="readout-main">
        <span class="readout-values">
          <span class="readout-temp" style=${`color: ${a && o.stale ? v.label : io(r, h)}`}
            >${r === void 0 ? "––" : u`${n.whole(r)}<span class="readout-unit">${jt}${c}</span>`}</span
          >
          ${t === "co2" && e.pm25.length > 0 ? u`<span class="readout-hum pm25" style=${d ? `color: ${v.label}` : p}
                ><span class="readout-swatch" aria-hidden="true"></span><span class="sr-only">PM2.5 </span>${l === void 0 ? "––" : u`${n.whole(l)}${jt}µg/m³`}</span
              >` : p}
        </span>
        <span class="readout-time">${eo(e, i, n)}</span>
      </div>
    </div>
  `;
}
function Aa(e, t, i, n, o, s = !1, a) {
  const { range: r } = e, l = t === "temperature" ? void 0 : t, d = (g) => wa(g, r, i), h = l ? e[l] : e.temperature, c = l ? e.limits[l] : void 0, f = l ? $a(h.map((g) => g.v), l) : { min: e.tempMin, max: e.tempMax }, b = h.length > 0 ? Math.max(...h.map((g) => g.v)) : -1 / 0, m = (g) => dt - (g - f.min) / (f.max - f.min) * ot, _ = (e.humidityMin ?? 0) - 3, w = Math.max((e.humidityMax ?? 100) + 3, _ + 12), $ = (g) => dt - (g - _) / (w - _) * ot, S = ht + Mt(i), P = l ? "-air" : "", A = `${ua}${P}`, T = `${pa}${P}`, M = `${fa}${P}`, k = `history-ventilation${P}`, I = (g, O) => g.map((L, H) => `${H === 0 ? "M" : "L"}${d(L.t).toFixed(1)} ${O(L.v).toFixed(1)}`).join(" "), E = I(h, m), C = h[0], j = h[h.length - 1], R = C && j ? `${E} L${d(j.t).toFixed(1)} ${dt} L${d(C.t).toFixed(1)} ${dt} Z` : "";
  let W = "", Y = "";
  l || e.target.forEach((g, O) => {
    const L = m(Number(g.value)).toFixed(1), H = e.target[O - 1], X = e.target[O + 1], Wt = H !== void 0 && H.end === g.start;
    W += Wt ? ` L${d(g.start).toFixed(1)} ${L}` : ` M${d(g.start).toFixed(1)} ${L}`, W += ` L${d(g.end).toFixed(1)} ${L}`, Y += Wt ? ` L${d(g.start).toFixed(1)} ${L}` : ` M${d(g.start).toFixed(1)} ${dt} L${d(g.start).toFixed(1)} ${L}`, Y += ` L${d(g.end).toFixed(1)} ${L}`, (!X || X.start !== g.end) && (Y += ` L${d(g.end).toFixed(1)} ${dt} Z`);
  });
  const yt = Mt(i) / Math.max(1, (r.endMs - r.startMs) / Pt / Oi(r)), Lt = Math.max(2, Math.round(ot / yt)), D = (f.max - f.min) / Lt, wt = [0.5, 1, 2, 5, 10].find((g) => g >= D * 0.8) ?? 10, xt = l ? ya(f.min, f.max, l, Lt) : va(f.min, f.max, wt), Hi = (g) => l ? o.whole(g) : `${o.tick(g)}°`, re = c ? [
    { value: c.warning, color: v.warning },
    { value: c.critical, color: v.alertOnPopup }
  ].filter((g) => g.value > f.min && g.value <= b) : [], le = (g) => Math.min(1, Math.max(0, (m(g) - lt) / ot)), Nt = [];
  if (c && re.length > 0) {
    const g = re.some((H) => H.value === c.critical), O = le(c.critical), L = le(c.warning);
    g && Nt.push([0, v.alertOnPopup], [O, v.alertOnPopup]), Nt.push([g ? O : 0, v.warning], [L, v.warning], [L, v.white], [1, v.white]);
  }
  const de = s ? e.comfort.summer : e.comfort.winter;
  if (!l) {
    const g = le(de.max), O = le(de.min);
    Nt.push([0, v.warning], [g, v.warning], [g, v.white], [O, v.white], [O, v.sky], [1, v.sky]);
  }
  const so = (g) => c ? io(g, c) : g > de.max ? v.warning : g < de.min ? v.sky : v.white, Ui = (g, O, L) => g.map((H) => {
    const X = d(H.start);
    return x`<rect x=${X.toFixed(1)} y=${O} width=${Math.max(d(H.end) - X, 0.8).toFixed(1)}
        height=${$e} rx="2" style=${Z(L(H.value))}></rect>`;
  }), Ve = da(e, t, s), We = Qn(Ve.length), ao = We + Jn, Bi = ha(Ve.length), ro = (g) => g === "heating" ? x`${Gn(3, !1)}` : g === "climate" ? x`<g style=${J(v.off)}>${ci("off")}</g>` : g === "ventilation" ? x`<g style=${J(v.fresh)}>${ci("fan")}</g>` : x`<g style=${J("var(--kd-sky)")}>${Xn()}</g>`, Vi = (g, O, L, H, X) => g.map((Wt) => {
    const Yi = d(Wt.start);
    return x`<rect class=${H} x=${Yi.toFixed(1)} y=${O} width=${Math.max(d(Wt.end) - Yi, X).toFixed(1)}
        height=${$e} rx="2" style=${Z(L)}></rect>`;
  }), lo = (g, O) => g === "heating" ? x`${Ui(e.heating, O, (L) => ma[L] ?? v.off)}` : g === "climate" ? x`${Ui(e.climate, O, (L) => Sa(L))}` : g === "ventilation" ? x`${Vi(e.ventilation ?? [], O, v.fresh, "ventilation-on", 1.5)}` : x`${Vi(e.windows ?? [], O, "var(--kd-sky)", "window-open", 1.5)}`, he = n === void 0 ? void 0 : d(n), qe = n === void 0 ? void 0 : se(h, n), ho = (g, O, L, H) => (g ?? []).map(
    (X) => x`<rect class=${L} x=${d(X.start).toFixed(1)} y=${lt}
        width=${Math.max(d(X.end) - d(X.start), 2).toFixed(1)} height=${ot}
        style=${`${Z(O)}; opacity: var(${H})`}></rect>`
  ), Wi = (g) => so(g), co = Math.max(...e.pm25.map((g) => g.v), 0), uo = Math.max(co * (1 + Ei), e.limits.pm25.critical), po = (g) => dt - g / uo * ot, qi = l === "co2" && e.pm25.length > 0 ? I(e.pm25, po) : "", fo = (g) => [...g].reduce((O, L) => O + (/\d/.test(L) ? 6.7 : 3.6), 0), Vt = ka(r).map((g) => {
    const O = Ma(g, r, o), L = _a(d(g), ht), H = fo(O), X = L.x - H / 2;
    return { x: d(g), text: O, anchored: L, left: X, right: X + H, show: !1 };
  });
  let Ki = 1 / 0;
  for (let g = Vt.length - 1; g >= 0; g--)
    Vt[g].right <= Ki + 2 && (Vt[g].show = !0, Ki = Vt[g].left);
  return u`
    ${l ? Ca(e, l, n, o, a) : Ta(e, n, o)}
    <svg
      class="chart"
      viewBox="0 0 ${i} ${Bi}"
      width=${i}
      height=${Bi}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${A}><path d=${R}></path></clipPath>
        <clipPath id=${T}>
          <rect x=${ht} y=${lt} width=${Mt(i)} height=${ot} rx="8"></rect>
        </clipPath>
        ${l ? (
    // The ventilation mode is a hatched green band, the open window a plain blue one: they overlap and must be told apart
    // (uživatel 14. 11. 2026: „šrafu vetraci rezim trochu vice rozlisit“).
    x`<pattern id=${k} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
              <rect width="7" height="7" style=${`${Z(v.fresh)}; opacity: var(--kd-band-ventilation)`}></rect>
              <line x1="0" y1="0" x2="0" y2="7" style=${`${J(v.fresh)}; opacity: var(--kd-hatch-ventilation)`} stroke-width="2.5"></line>
            </pattern>`
  ) : p}
        ${Nt.length > 0 ? x`<linearGradient id=${M} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1=${lt} y2=${dt}>
              ${Nt.map(
    ([g, O]) => x`<stop offset=${`${(g * 100).toFixed(2)}%`} style=${`stop-color: ${O}`}></stop>`
  )}
            </linearGradient>` : p}
      </defs>
      <rect x=${ht} y=${lt} width=${Mt(i)} height=${ot} rx="8" style=${Z("var(--kd-fill)")}></rect>
      <g clip-path=${`url(#${T})`}>
        ${Y ? x`<path class="target-area" d=${Y} style=${`${Z(v.plan)}; opacity: var(--kd-target-area)`}></path>` : p}
        ${ho(e.windows, "var(--kd-sky)", "window-band", "--kd-band-window")}
        ${l ? (e.ventilation ?? []).map(
    (g) => x`<rect class="ventilation-band" x=${d(g.start).toFixed(1)} y=${lt}
                width=${Math.max(d(g.end) - d(g.start), 2).toFixed(1)} height=${ot} fill=${`url(#${k})`}></rect>`
  ) : p}
      </g>
      ${xt.map((g) => {
    const O = m(g), L = re.some((H) => Math.abs(m(H.value) - O) < 14);
    return x`<line x1=${ht} x2=${S} y1=${O.toFixed(1)} y2=${O.toFixed(1)}
            style=${J("var(--kd-grid)")} stroke-width="1"></line>
          ${L ? p : x`<text x=${S + 6} y=${(O + 4).toFixed(1)} style=${Z(v.label)} font-size=${ei}>${Hi(g)}</text>`}`;
  })}
      ${re.map(
    (g) => x`<line class="limit-line" x1=${ht} x2=${S} y1=${m(g.value).toFixed(1)} y2=${m(g.value).toFixed(1)}
            style=${J(g.color)} stroke-width="1" stroke-dasharray="4 3" opacity="0.8"></line>
          <text class="limit-label" x=${S + 6} y=${(m(g.value) + 4).toFixed(1)} style=${Z(g.color)} font-size=${ei}
            font-weight="600">${Hi(g.value)}</text>`
  )}
      <g clip-path=${`url(#${T})`}>
        ${R && l ? x`<path d=${R} style=${Z("var(--kd-area)")}></path>` : p}
      </g>
      ${l ? p : x`<g clip-path=${`url(#${A})`}>
        ${e.intensity.map(
    (g) => x`<rect x=${d(g.start).toFixed(1)} y=${lt}
            width=${Math.max(d(g.end) - d(g.start), 0.8).toFixed(1)} height=${ot}
            style=${Z(v.warning)} opacity=${ca[Number(g.value)] ?? 0}></rect>`
  )}
      </g>`}
      ${qi ? x`<path class="pm25-line" d=${qi} fill="none" style=${J(v.pm25)}
            stroke-width="1.5" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${T})`}></path>` : p}
      ${!l && e.humidity.length > 0 ? x`<path class="humidity-line" d=${I(e.humidity, $)} fill="none" style=${J(v.humidityLine)}
            stroke-width="1.5" stroke-linejoin="round" opacity="0.75" clip-path=${`url(#${T})`}></path>` : p}
      ${W ? x`<path class="target-line" d=${W} fill="none" style=${J(v.plan)} stroke-width="1"
            opacity="0.5" clip-path=${`url(#${T})`}></path>` : p}
      ${E ? x`<path class="temperature-curve" d=${E} fill="none"
            style=${J(Nt.length > 0 ? `url(#${M})` : v.white)} stroke-width="2.5"
            stroke-linejoin="round" stroke-linecap="round" clip-path=${`url(#${T})`}></path>` : p}
      ${j && n === void 0 ? x`<circle class="end-dot" cx=${d(j.t).toFixed(1)} cy=${m(j.v).toFixed(1)} r="4"
            style=${`${Z(Wi(j.v))}; ${J("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>` : p}

      ${Ve.map((g, O) => {
    const L = Zn + O * Oe, H = L + (Oe - $e) / 2;
    return x`<g class=${`strip-row ${g}`}>
          <rect x=${ht} y=${H} width=${Mt(i)} height=${$e} rx="2" style=${Z("var(--kd-fill)")}></rect>
          ${lo(g, H)}
          <g class="strip-icon" transform=${`translate(${S + 6} ${L + (Oe - kn) / 2}) scale(${kn / 24})`} fill="none"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ro(g)}</g>
        </g>`;
  })}

      ${Vt.map(
    (g) => x`<line x1=${g.x.toFixed(1)} x2=${g.x.toFixed(1)} y1=${lt} y2=${We}
            style=${J("var(--kd-grid-soft)")} stroke-width="1"></line>
          ${g.show ? x`<text class="tick" x=${g.anchored.x.toFixed(1)} y=${ao} style=${Z(v.label)} font-size=${ei}
                text-anchor=${g.anchored.anchor}>${g.text}</text>` : p}`
  )}
      ${he === void 0 ? p : x`<line x1=${he.toFixed(1)} x2=${he.toFixed(1)} y1=${lt} y2=${We}
              style=${J(v.white)} stroke-width="1" opacity="0.7"></line>
            ${qe === void 0 ? p : x`<circle cx=${he.toFixed(1)} cy=${m(qe).toFixed(1)} r="4"
                  style=${`${Z(Wi(qe))}; ${J("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const Sn = Pt / 4, Ea = 168 * 36e5;
function no(e) {
  if (e == null) return;
  const t = typeof e == "number" ? e < 1e11 ? e * 1e3 : e : Date.parse(e);
  return Number.isFinite(t) ? t : void 0;
}
function Oa(e) {
  let t;
  for (const i of e ?? []) {
    const n = i.s ?? i.state, o = no(i.lu ?? i.last_updated);
    n === void 0 || o === void 0 || n === "unavailable" || n === "unknown" || n === "" || (t === void 0 || t.state !== n) && (t = { state: n, start: o });
  }
  return t;
}
class Pa {
  constructor(t, i = Date.now) {
    this.onChange = t, this.now = i, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, i) {
    const n = pn(t, i);
    if (!t || !i || !n) return;
    const o = no(n.last_changed), s = `${n.state}|${n.last_changed ?? ""}`, a = this.known.get(i);
    return a?.key === s ? a.start === void 0 ? o : Math.min(a.start, o ?? a.start) : (this.hass = t, this.wanted.get(i) !== s && this.pending.get(i) !== s && (this.wanted.set(i, s), this.schedule()), o);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, i = new Map(this.wanted);
    if (this.wanted.clear(), !t || !i.size) return;
    for (const [s, a] of i) this.pending.set(s, a);
    const n = this.now();
    let o;
    try {
      o = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(n - Ea).toISOString(),
        end_time: new Date(n).toISOString(),
        entity_ids: [...i.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      o = void 0;
    }
    for (const [s, a] of i) {
      if (this.pending.get(s) === a && this.pending.delete(s), this.wanted.has(s)) continue;
      const r = Oa(o?.[s]), l = pn(this.hass, s)?.state;
      this.known.set(s, { key: a, start: r && r.state === l ? r.start : void 0 });
    }
    this.onChange();
  }
}
const xe = (e) => typeof e == "number" && Number.isFinite(e) ? e : void 0;
function za(e) {
  return Array.isArray(e) ? e.flatMap((t) => {
    const i = Date.parse(String(t?.datetime ?? ""));
    return Number.isFinite(i) ? [{ time: i, temperature: xe(t.temperature), low: xe(t.templow), rain: xe(t.precipitation), probability: xe(t.precipitation_probability) }] : [];
  }) : [];
}
async function La(e, t) {
  const i = async (s) => {
    try {
      const a = await e.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: s },
        target: { entity_id: t },
        return_response: !0
      });
      return za(a?.response?.[t]?.forecast);
    } catch {
      return [];
    }
  }, [n, o] = await Promise.all([i("daily"), i("hourly")]);
  return { daily: n, hourly: o };
}
function Na(e, t) {
  const i = new Date(t).toDateString();
  return e?.daily.find((n) => new Date(n.time).toDateString() === i) ?? e?.daily[0];
}
function Ra(e, t) {
  return (e?.hourly ?? []).filter((i) => i.time > t - 36e5 && i.time <= t + 24 * 36e5 && i.temperature !== void 0);
}
const gt = 4, Da = 44, ke = 6, Yt = 120, Mn = 12, _e = (e) => `fill: ${e}`, oi = (e) => `stroke: ${e}`;
function Fa(e, t, i) {
  if (e.length < 2) return p;
  const { t: n } = i, o = e[0].time, s = e[e.length - 1].time, a = t - gt - Da, r = (M) => gt + (M - o) / (s - o) * a, l = e.map((M) => M.temperature), d = Math.max(...l) - Math.min(...l), h = d <= 4 ? 1 : d <= 10 ? 2 : 5, c = Math.floor(Math.min(...l) / h) * h, f = Math.max(Math.ceil(Math.max(...l) / h) * h, c + h), b = (M) => ke + Yt - (M - c) / (f - c) * Yt, m = e.map((M, k) => `${k === 0 ? "M" : "L"}${r(M.time).toFixed(1)} ${b(M.temperature).toFixed(1)}`).join(" "), _ = [];
  for (let M = c; M <= f + 1e-9; M += h) _.push(M);
  const w = e.filter((M) => new Date(M.time).getHours() % 3 === 0 && r(M.time) > gt + 8 && r(M.time) < gt + a - 8), $ = e.map((M) => M.rain ?? 0), S = Math.max(...$), P = Math.max(2, a / (e.length - 1) - 2), A = (M) => M / Math.max(S, 1) * Yt * 0.4, T = ke + Yt;
  return u`<div class="forecast">
    <div class="forecast-head">
      <span>${n.outside.next24}</span>
      <span class="forecast-rain">${S > 0 ? n.outside.rainMost(`${i.one(S)} mm/h`) : n.outside.noRain}</span>
    </div>
    <svg class="forecast-chart" viewBox="0 0 ${t} ${T + 20}" width=${t} height=${T + 20} role="img" aria-label=${n.outside.next24}>
      <rect x=${gt} y=${ke} width=${a} height=${Yt} rx="8" style=${_e("var(--kd-fill)")}></rect>
      ${_.map(
    (M) => x`<line x1=${gt} x2=${gt + a} y1=${b(M).toFixed(1)} y2=${b(M).toFixed(1)} style=${oi("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${gt + a + 6} y=${(b(M) + 4).toFixed(1)} style=${_e(v.label)} font-size=${Mn}>${i.tick(M)}°</text>`
  )}
      ${w.map(
    (M) => x`<line x1=${r(M.time).toFixed(1)} x2=${r(M.time).toFixed(1)} y1=${ke} y2=${T} style=${oi("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${r(M.time).toFixed(1)} y=${T + 15} text-anchor="middle" style=${_e(v.label)} font-size=${Mn}>${i.hour(M.time).replace(/^(\d{1,2}):00$/, "$1")}</text>`
  )}
      ${e.map(
    (M) => (M.rain ?? 0) > 0 ? x`<rect class="forecast-bar" x=${(r(M.time) - P / 2).toFixed(1)} y=${(T - A(M.rain)).toFixed(1)} width=${P.toFixed(1)}
              height=${A(M.rain).toFixed(1)} rx="1.5" style=${`${_e(v.sky)}; opacity: 0.55`}></rect>` : p
  )}
      <path class="forecast-line" d=${m} fill="none" style=${oi(v.white)} stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></path>
    </svg>
  </div>`;
}
function Re(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function Pi(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ja(e, t) {
  return e === "auto" ? Pi(Re(t)) : e;
}
function Ia() {
  return Pi(document.documentElement.lang || navigator.language || "");
}
const Tn = /* @__PURE__ */ new WeakMap(), Ha = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Ua = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Ba = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function si(e, t) {
  const i = e?.locale?.[t];
  return typeof i == "string" && i !== "" ? i : "language";
}
function Va(e, t, i) {
  const n = Re(i).replace("_", "-"), o = n !== "" && Pi(n) === t ? n : Ha[t], s = si(i, "number_format"), a = si(i, "time_format"), r = si(i, "date_format"), l = [t, o, s, a, r].join("|");
  let d = Tn.get(e);
  d || (d = /* @__PURE__ */ new Map(), Tn.set(e, d));
  let h = d.get(l);
  return h || (h = Ka(e[t], t, o, s, a, r), d.set(l, h)), h;
}
function Wa(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function qa(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const i = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(i).includes("10");
}
function Ka(e, t, i, n, o, s) {
  const a = Wa(i), r = n === "system" ? void 0 : n === "none" ? "en-US" : Ba[n] ?? a, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), f = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = qa(o, a), m = b ? "h12" : "h23", _ = new Intl.DateTimeFormat(a, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), w = new Intl.DateTimeFormat(a, b ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), $ = s === "system" ? void 0 : a, S = new Intl.DateTimeFormat($, { day: "numeric", month: "numeric" }), P = (T) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return S.format(T);
    const M = S.formatToParts(T), k = M.find((R) => R.type === "literal")?.value ?? "/", I = M[M.length - 1], E = I?.type === "literal" ? I.value : "", C = M.find((R) => R.type === "day")?.value ?? "", j = M.find((R) => R.type === "month")?.value ?? "";
    return s === "DMY" ? `${C}${k}${j}${E}` : `${j}${k}${C}${E}`;
  }, A = Ua.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: e,
    one: (T) => d.format(T),
    two: (T) => h.format(T),
    half: (T) => c.format(Math.round(T * 2) / 2),
    tick: (T) => c.format(T),
    whole: (T) => f.format(T),
    percent: (T) => `${T}${A}%`,
    time: (T) => _.format(T),
    hour: (T) => w.format(T),
    day: P
  };
}
const _t = (e, t, i, n) => e === 1 ? t : e >= 2 && e <= 4 ? i : n, Ya = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    next24: "Příštích 24 hodin",
    rainMost: (e) => `srážky nejvíc ${e}`,
    noRain: "bez srážek",
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
  temperatureLabel: (e, t, i, n) => `${e}: teplota ${t === void 0 ? "neznámá" : `${t} °C`}${i}, historie místnosti za ${n}`,
  humidityLabel: (e, t, i) => `${e}: vlhkost ${t ?? "neznámá"}${i}, detail a historie`,
  /** Temperature trend button: "Ložnice: teplota za 2 hodiny stoupá, historie místnosti za 24 hodin". */
  temperatureTrendLabel: (e, t, i, n) => `${e}: teplota za ${t}${i ? ` ${i}` : ""}, historie místnosti za ${n}`,
  // CO₂ and PM2.5
  /** "CO₂ 656 ppm, za 2 hodiny stoupá, naposledy před 2 h". */
  airSensor: (e, t, i, n) => `${e} ${t ?? "neznámé"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: kvalita vzduchu, ${t || "bez čidla"}. Otevře graf za ${i}.`,
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
  climatePopup: {
    rooms: "Místnosti",
    temperature: "Cílová teplota",
    mode: "Režim",
    modes: { plan: "Plán", manual: "Ručně", boost: "Boost", off: "Vypnuto", cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto", sleep: "Spánek" },
    unavailable: "Nedostupné",
    now: (e) => `Teď ${e}`,
    heats: "topí",
    targets: (e) => `Cíl: ${e}`,
    mixedModes: (e) => `Různé režimy: ${e}`,
    firstChange: "První změna nastaví všechny vybrané stejně.",
    manualFor: "Ručně platí",
    offFor: "Vypnuto platí",
    manualForChoices: { next: "Do plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (e) => `Do ${e}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    offUntilNextPlan: "Vypnuto do další změny plánu, potom zpět na plán.",
    offUntilTime: (e) => `Vypnuto do ${e}, potom zpět na plán.`,
    offUntilChanged: "Vypnuto, dokud ho nezapneš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (e) => `Běží do ${e}, potom se vypne.`,
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
    hoursShort: (e) => `${e} h`,
    week: "7 dní",
    openDetail: "Otevře detail místnosti.",
    cover: "Žaluzie",
    coverCustom: "Vlastní poloha",
    linkPage: "Stránka místnosti",
    linkWeb: "Odkaz",
    hvac: "Topení a klimatizace",
    close: "Zavřít",
    systems: "Systém",
    commandFailed: "Příkaz se nepodařilo odeslat.",
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
    /** The heading of the conflicts above the chips, as in the card Dům. */
    needsYou: "Potřebuje tebe",
    rooms: (e) => `${e} ${_t(e, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (e) => `${e} ${_t(e, "okno otevřené", "okna otevřená", "oken otevřených")}`,
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
    /** What airing does to the humidity now: the grams of water in a cubic metre of air outside against the rooms. */
    effect: { dries: "Větrání vzduch vysuší", wets: "Větrání vzduch zvlhčí", keeps: "Větrání vlhkost nezmění" },
    effectDetail: (e, t) => `venku ${e} g/m³, uvnitř ${t} g/m³`,
    start: "Spustit větrání",
    starting: "Spouští se…",
    off: "Vypnuto",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (e) => `naposledy ${e}`,
    until: (e) => `do ${e}`,
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
    minute: (e) => `${e} ${_t(e, "minuta", "minuty", "minut")}`,
    hour: (e) => `${e} ${_t(e, "hodina", "hodiny", "hodin")}`,
    day: (e) => `${e} ${_t(e, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (e) => `${e} ${_t(e, "minutu", "minuty", "minut")}`,
    hour: (e) => `${e} ${_t(e, "hodinu", "hodiny", "hodin")}`
  }
}, Gt = (e, t, i) => e === 1 ? t : i, Ga = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    next24: "Next 24 hours",
    rainMost: (e) => `rain at most ${e}`,
    noRain: "no rain",
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
  temperatureLabel: (e, t, i, n) => `${e}: temperature ${t === void 0 ? "unknown" : `${t} °C`}${i}, room history for ${n}`,
  humidityLabel: (e, t, i) => `${e}: humidity ${t ?? "unknown"}${i}, details and history`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperature${i ? ` ${i}` : ""} over ${t}, room history for ${n}`,
  airSensor: (e, t, i, n) => `${e} ${t ?? "unknown"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: air quality, ${t || "no sensor"}. Opens the chart for ${i}.`,
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
  climatePopup: {
    rooms: "Rooms",
    temperature: "Target temperature",
    mode: "Mode",
    modes: { plan: "Schedule", manual: "Manual", boost: "Boost", off: "Off", cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto", sleep: "Sleep" },
    unavailable: "Unavailable",
    now: (e) => `Now ${e}`,
    heats: "heating",
    targets: (e) => `Target: ${e}`,
    mixedModes: (e) => `Different modes: ${e}`,
    firstChange: "The first change sets all selected rooms the same.",
    manualFor: "Manual holds",
    offFor: "Off holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (e) => `Until ${e}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    offUntilNextPlan: "Off until the next change of the schedule, then back to the schedule.",
    offUntilTime: (e) => `Off until ${e}, then back to the schedule.`,
    offUntilChanged: "Off until you turn it on.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (e) => `Runs until ${e}, then turns off.`,
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
    hoursShort: (e) => `${e} h`,
    week: "7 days",
    openDetail: "Opens the room detail.",
    cover: "Blind",
    coverCustom: "Custom position",
    linkPage: "Room page",
    linkWeb: "Link",
    hvac: "Heating and air conditioning",
    close: "Close",
    systems: "System",
    commandFailed: "The command could not be sent.",
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
    /** The heading of the conflicts above the chips, as in the card Dům. */
    needsYou: "Needs you",
    rooms: (e) => `${e} ${Gt(e, "room", "rooms")}`,
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
    windowsOpen: (e) => `${e} ${Gt(e, "window", "windows")} open`,
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
    /** What airing does to the humidity now: the grams of water in a cubic metre of air outside against the rooms. */
    effect: { dries: "Ventilation will dry the air", wets: "Ventilation will make the air more humid", keeps: "Ventilation will not change the humidity" },
    effectDetail: (e, t) => `outside ${e} g/m³, inside ${t} g/m³`,
    start: "Start ventilation",
    starting: "Starting…",
    off: "Off",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (e) => `last ${e}`,
    until: (e) => `until ${e}`,
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
    minute: (e) => `${e} ${Gt(e, "minute", "minutes")}`,
    hour: (e) => `${e} ${Gt(e, "hour", "hours")}`,
    day: (e) => `${e} ${Gt(e, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (e) => e === 1 ? "the last minute" : `the last ${e} minutes`,
    hour: (e) => e === 1 ? "the last hour" : `the last ${e} hours`
  }
}, Se = (e, t, i) => e === 1 ? t : i, Xa = {
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
  /** The tile "Venku" at the top of the card and its popup (CURRENT_SPEC.md, Sjednocení s Energií a Domem, Horní řádek). */
  outside: {
    next24: "Kommande 24 timmar",
    rainMost: (e) => `nederbörd som mest ${e}`,
    noRain: "ingen nederbörd",
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
  temperatureLabel: (e, t, i, n) => `${e}: temperatur ${t === void 0 ? "okänd" : `${t} °C`}${i}, rumshistorik för ${n}`,
  humidityLabel: (e, t, i) => `${e}: luftfuktighet ${t ?? "okänd"}${i}, detaljer och historik`,
  temperatureTrendLabel: (e, t, i, n) => `${e}: temperaturen${i ? ` ${i}` : ""} under ${t}, rumshistorik för ${n}`,
  airSensor: (e, t, i, n) => `${e} ${t ?? "okänt"}${i ? `, ${i}` : ""}${n}`,
  airDescription: (e, t, i) => `${e}: luftkvalitet, ${t || "ingen sensor"}. Öppnar diagrammet för ${i}.`,
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
  climatePopup: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (e) => `Nu ${e}`,
    heats: "värmer",
    targets: (e) => `Mål: ${e}`,
    mixedModes: (e) => `Olika lägen: ${e}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    offFor: "Av gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (e) => `Till ${e}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    offUntilNextPlan: "Av till nästa ändring i schemat, sedan tillbaka till schemat.",
    offUntilTime: (e) => `Av till ${e}, sedan tillbaka till schemat.`,
    offUntilChanged: "Av tills du slår på den.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (e) => `Går till ${e}, stängs sedan av.`,
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
    hoursShort: (e) => `${e} h`,
    week: "7 dagar",
    openDetail: "Öppnar rummets detaljer.",
    cover: "Persienn",
    coverCustom: "Eget läge",
    linkPage: "Rummets sida",
    linkWeb: "Länk",
    hvac: "Värme och luftkonditionering",
    close: "Stäng",
    systems: "System",
    commandFailed: "Kommandot kunde inte skickas.",
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
    /** The heading of the conflicts above the chips, as in the card Dům. */
    needsYou: "Behöver dig",
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
    windowsOpen: (e) => `${e} fönster ${Se(e, "öppet", "öppna")}`,
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
    /** What airing does to the humidity now: the grams of water in a cubic metre of air outside against the rooms. */
    effect: { dries: "Vädring torkar luften", wets: "Vädring gör luften fuktigare", keeps: "Vädring ändrar inte fukten" },
    effectDetail: (e, t) => `ute ${e} g/m³, inne ${t} g/m³`,
    start: "Starta vädring",
    starting: "Startar…",
    off: "Av",
    /** In the tile: "naposledy 07:40", "do 18:17". */
    lastAt: (e) => `senast ${e}`,
    until: (e) => `till ${e}`,
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
    minute: (e) => `${e} ${Se(e, "minut", "minuter")}`,
    hour: (e) => `${e} ${Se(e, "timme", "timmar")}`,
    day: (e) => `${e} ${Se(e, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (e) => e === 1 ? "den senaste minuten" : `de senaste ${e} minuterna`,
    hour: (e) => e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`
  }
}, Za = { cs: Ya, en: Ga, sv: Xa };
function ui(e, t) {
  return Va(Za, e, t);
}
const Ja = st`
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
      --kd-band-ventilation: 0.16;
      --kd-hatch-ventilation: 0.6;
      /* Humidity in the chart: its own colour, not the sky of a cold temperature and of the windows. */
      --kd-humidity: #8b88ff;
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
      --kd-hatch-ventilation: 0.55;
      --kd-humidity: #4b49c8;
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
    /* Conflicts as rows "Potřebuje tebe" (CURRENT_SPEC.md, Konflikty): a small heading and one group of rows of the kit. */
    .attention {
      margin-top: 10px;
    }

    .section-label {
      margin: 0 4px 6px;
      color: var(--kd-label);
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      text-transform: uppercase;
    }

    .list-options.attention-list {
      background: var(--kd-card-bg);
    }

    .attention-row {
      gap: 12px;
      min-height: 60px;
      padding: 8px 12px;
      cursor: pointer;
    }

    .attention-icon {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      flex: none;
      border-radius: 8px;
      background: color-mix(in srgb, var(--kd-warning) var(--kd-chip-tint), var(--kd-card-bg));
      color: var(--kd-warning);
      font-size: 17px;
      font-weight: 700;
    }

    .list-option .option-hint.attention-reason {
      color: var(--kd-warning);
      font-size: 15px;
      line-height: 20px;
    }

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
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      min-width: 44px;
      color: var(--kd-neutral);
      font-size: 17px;
      line-height: 20px;
      text-align: right;
    }

    /* The absolute humidity under the relative one, smaller and quieter (uživatel 14. 11. 2026). */
    .humidity-abs {
      color: var(--kd-label);
      font-size: 12px;
      line-height: 14px;
      white-space: nowrap;
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
    .detail-cover-icon {
      color: var(--kd-label);
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

    /* What airing does to the humidity: the verdict, and under it the two numbers it comes from. */
    .vent-effect {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin: 0 4px 12px;
      color: var(--kd-label);
      font-size: 15px;
      line-height: 20px;
    }

    .vent-effect strong {
      color: var(--kd-text);
      font-size: 17px;
      font-weight: 600;
      line-height: 22px;
    }

    /* The next 24 hours in the popup Venku. */
    .forecast {
      margin-top: 16px;
    }

    .forecast-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin: 0 4px 6px;
      font-size: 15px;
      line-height: 20px;
    }

    .forecast-rain {
      color: var(--kd-label);
    }

    .forecast-chart {
      display: block;
      max-width: 100%;
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
      color: var(--kd-humidity);
      font-size: 15px;
      white-space: nowrap;
    }

    .readout-abs {
      color: var(--kd-label);
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
`, Qa = " ";
function Cn(e) {
  if (!e || ct(e.state.toLowerCase()))
    return;
  const t = Number.parseFloat(e.state);
  return Number.isFinite(t) ? t : void 0;
}
function pi(e, t) {
  return e === void 0 ? "" : `· ${t.half(e)}${Qa}°C`;
}
function tr(e, t, i, n, o, s) {
  const a = s.t.heatingMode, r = e?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || ct(l), h = Cn(i), c = Yn(r, l, h);
  if (c === "off")
    return { label: a.off, color: v.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || r === void 0 || ct(r))
    return { label: "––", color: v.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const f = Bn(Cn(n), o);
  if (c === "schedule")
    return { label: a.schedule, color: v.plan, active: !0, extra: pi(h, s), unknown: !1, overlay: "schedule", waves: f };
  if (c === "manual") {
    const b = h === _i ? "boost" : "manual";
    return { label: a.manual, color: v.warning, active: !0, extra: pi(h, s), unknown: !1, overlay: "manual", override: b, waves: f };
  }
  return { label: t?.state ?? "––", color: v.warning, active: !0, extra: "", unknown: !1, waves: f };
}
function De(e, t) {
  let i = "unknown", n, o;
  if (e && !ct(e.state.toLowerCase())) {
    const a = e.state.toLowerCase(), r = String(e.attributes.preset_mode ?? "none").toLowerCase();
    a === "off" ? i = "off" : a === "cool" ? i = r === "wind_free" ? "wind_free" : "cool" : a === "dry" ? i = "dry" : a === "fan_only" ? i = "fan" : a === "heat" ? i = "heat" : (a === "auto" || a === "heat_cool") && (i = "auto"), i !== "off" && i !== "unknown" && i !== "wind_free" && r !== "none" && r !== "" && (n = Ms(r)), o = ft(e.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(i);
  return {
    mode: i,
    label: n ?? t.t.climateMode[i],
    color: Ai[i],
    active: i !== "off" && i !== "unknown",
    extra: s ? pi(o, t) : "",
    unknown: i === "unknown"
  };
}
function er(e, t) {
  const i = e.unknown ? t.t.unknownState : e.label;
  return e.extra ? `${i} ${e.extra.replace(/^·\s*/, "")}` : i;
}
function Me(e, t) {
  return e.length <= 2 ? e.join(", ") : t.t.summaryChips.rooms(e.length);
}
function Fe(e, t) {
  return e.windows.filter((i) => t(i.entity)?.state.toLowerCase() === "on");
}
function je(e, t, i) {
  return tr(
    t(e.heating?.climate),
    t(e.heating?.overlay),
    t(e.heating?.target),
    t(e.heating?.intensity),
    e.thresholds,
    i
  );
}
function oo(e, t, i, n) {
  const o = Fe(e, t).length > 0, s = je(e, t, n), a = e.air_conditioner ? De(t(e.air_conditioner), n).mode : "unknown", r = !s.unknown && s.waves > 0 || a === "heat", l = a === "cool" || a === "wind_free", d = [];
  return o && r && d.push("window-heating"), o && l ? d.push("window-cooling") : l && i && d.push("cooling-cold"), d;
}
function ir(e, t, i, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, a = [], r = [], l = [], d = [];
  let h = 0;
  const c = [], f = new Map(e.map(($) => [$.name, Wn($, n.language)])), b = ($) => $.map((S) => f.get(S) ?? S);
  for (const $ of e) {
    for (const A of oo($, t, i.has($.name), n))
      s[A].push($.name);
    const S = Fe($, t).length;
    S > 0 && a.push([$.name, S]);
    const P = je($, t, n);
    P.override === "boost" ? l.push($.name) : P.override === "manual" && r.push($.name), P.waves > 0 && (d.push($.name), h = Math.max(h, P.waves)), $.air_conditioner && De(t($.air_conditioner), n).active && c.push($.name);
  }
  const m = [], _ = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [$, S] of _)
    s[$].length > 0 && m.push({
      kind: S,
      text: `${o.conflict[$]}: ${Me(b(s[$]), n)}`,
      color: v.warning,
      spoken: `${o.conflictSpoken[$]}: ${b(s[$]).join(", ")}`,
      conflict: {
        reason: o.conflict[$],
        rooms: s[$],
        labels: b(s[$]),
        system: $ === "window-heating" ? "heating" : "climate"
      }
    });
  const w = a.reduce(($, [, S]) => $ + S, 0);
  return w > 0 && m.push({
    kind: "windows",
    text: o.windowsOpen(w),
    color: v.sky,
    spoken: `${o.windowsSpoken}: ${a.map(([$, S]) => S > 1 ? `${f.get($) ?? $} (${S})` : f.get($) ?? $).join(", ")}`
  }), r.length > 0 && m.push({
    kind: "manual",
    text: `${o.manual}: ${Me(b(r), n)}`,
    color: v.warning,
    spoken: `${o.manualSpoken}: ${b(r).join(", ")}`,
    opens: { system: "heating", rooms: r }
  }), l.length > 0 && m.push({
    kind: "boost",
    text: `${o.boost}: ${Me(b(l), n)}`,
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
    text: `${o.climate}: ${Me(b(c), n)}`,
    color: v.cool,
    spoken: `${o.climateSpoken}: ${b(c).join(", ")}`,
    opens: { system: "climate", rooms: c }
  }), m;
}
var nr = Object.defineProperty, U = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, i, o) || o);
  return o && nr(t, i, o), o;
};
const or = 5 * 6e4, sr = 3e4, rt = " ", ar = 550, An = 400, rr = 700, lr = "(orientation: landscape) and (max-height: 600px)", dr = 30 * 6e4, En = 168, hr = 1600, cr = 5e3, Ii = class Ii extends nt {
  constructor() {
    super(...arguments), this._i18n = ui("en"), this._starts = new Pa(() => this.requestUpdate()), this._hvacSelected = [], this._ventilationEnding = !1, this._announcement = "", this._ventRequest = 0, this._ventOn = !1, this._historyStatus = "loading", this._forecastAt = 0, this._historyHours = 24, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._gesture = new Ue(() => ({ holdMs: ar, doubleTapMs: An })), this._movingWatch = /* @__PURE__ */ new Map(), this._joinedWidth = 0, this._fonts = 0, this.handleFonts = () => {
      this._fonts++, this.fitJoined();
    }, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const i = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!i || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = xa((t.clientX - o.left) * s / Math.max(o.width, 1), s, i.range);
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
        const a = s + (t.key === "ArrowLeft" ? -Sn : Sn);
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
    this._config = Ys(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1, this._forecast = void 0, this._forecastAt = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      (this.anyWindowOpen() || this.ventilationOn()) && (this._clock = Date.now());
    }, sr), this._joinedObserver = new ResizeObserver(() => {
      const t = Math.round(this.getBoundingClientRect().width);
      t !== this._joinedWidth && (this._joinedWidth = t, window.requestAnimationFrame(() => this.fitJoined()));
    }), this._joinedObserver.observe(this), document.fonts?.addEventListener("loadingdone", this.handleFonts), this.requestUpdate();
  }
  fitJoined() {
    xi(this.renderRoot, `${this._joinedWidth}|${this._fonts}`);
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
      const i = t.get("hass");
      return i?.themes?.darkMode !== this.hass?.themes?.darkMode || Re(i) !== Re(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => i?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(i);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const i = this.theme();
    this.dataset.theme !== i && (this.dataset.theme = i), this._i18n = ui(ja(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    }, or)), this._focusPart && this._sheet?.kind === "history") {
      const i = this.renderRoot.querySelector(`[data-part="${this._focusPart}"]`);
      if (i && (this._focusPart = void 0, i.dataset.part !== "temperature")) {
        const n = this.renderRoot.querySelector("kd-sheet");
        Promise.resolve(n?.updateComplete).then(() => requestAnimationFrame(() => i.scrollIntoView({ block: "start" })));
      }
    }
    this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0);
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => Fe(t, (i) => this.getState(i)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const i of Cs(this._config)) {
      const n = t.states[i], o = this.hass.states[i];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !Es(n?.attributes, o?.attributes))
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
    const t = Jt(this.entityState(this._config.houseModeEntity) ?? ""), i = t === Jt(this._config.houseModes.summer), n = i || t === Jt(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), a = this.renderTopTiles(s), r = ir(
      this._config.rooms,
      (d) => this.getState(d),
      this.coldRooms(i, n, s),
      this._i18n
    ), l = a !== p || r.length > 0;
    return u`
      <ha-card>
        <div class="dashboard">
          ${l ? u`<header class="dashboard-header">
                ${a} ${this.renderSummary(r)}
              </header>` : p}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (d, h) => this.renderRoom(d, h, i, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(i, n, s)}
        <div class="sr-only" role="status" aria-live="polite">${this._announcement}</div>
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, i, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const a = s.thresholds.stale_minutes;
      Ge(
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
      temperature: Qe(i((n) => n.temperature), Kt(t.trends, "temperature")),
      co2: Qe(i((n) => n.carbon_dioxide), Kt(t.trends, "co2")),
      pm25: Qe(i((n) => n.pm25), Kt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  /** What is known about the outside now: the temperature, the weather in words, the range of the day, the rain, the humidity and the air. */
  outsideFacts() {
    const t = this._config?.outside;
    if (!t)
      return;
    const { t: i, whole: n } = this._i18n, o = Na(this._forecast, Date.now()), s = this.numberState(t.minimum) ?? o?.low, a = this.numberState(t.maximum) ?? o?.temperature, r = this.numberState(t.rain_probability) ?? o?.probability, l = r !== void 0 ? this._i18n.percent(n(r)) : o?.rain !== void 0 && o.rain > 0 ? `${this._i18n.one(o.rain)}${rt}mm` : void 0, d = this.numberState(t.pm25), h = this.entityState(t.weather)?.toLowerCase(), c = this._config.thresholds, f = d === void 0 ? void 0 : d >= c.pm25_critical ? { label: i.airLevel.poor, color: v.alert } : d >= c.pm25_warning ? { label: i.airLevel.moderate, color: v.warning } : { label: i.airLevel.good, color: "var(--kd-text)" };
    return {
      temperature: this.numberState(t.temperature),
      condition: h === void 0 ? void 0 : i.weatherState[h],
      range: s !== void 0 && a !== void 0 ? `${n(s)}–${n(a)}${rt}°C` : void 0,
      rain: l,
      humidity: this.numberState(t.humidity),
      air: f
    };
  }
  /**
   * The top row (uživatel 14. 11. 2026: „Q230 B“): two tiles of the kit beside each other, "Venku" and "Větrací režim",
   * each with its name, its state in words and a chevron into its popup. A tile without data is left out and the other
   * takes the whole row.
   */
  renderTopTiles(t) {
    const { t: i, whole: n } = this._i18n, o = this.outsideFacts(), s = o ? [o.condition, o.range, o.rain === void 0 ? void 0 : `☂${rt}${o.rain}`].filter((f) => f !== void 0) : [], a = o !== void 0 && (o.temperature !== void 0 || s.length > 0 || o.air !== void 0), r = o?.temperature === void 0 ? i.outside.title : `${i.outside.title} ${n(o.temperature)}${rt}°C`, l = s.join(" · "), d = a ? u`<kd-tile
          class="outside-tile"
          kind="open"
          state="idle"
          .name=${r}
          .text=${l}
          .label=${[r, l, i.outside.spoken].filter(Boolean).join(". ")}
          @hdk-open=${(f) => this.openHouseSheet("outside", f)}
        ></kd-tile>` : p, h = this.ventilationState();
    let c = p;
    if (h !== void 0) {
      const f = h === "on", b = this._config.ventilationEntity, m = this._starts.of(this.hass, b), _ = this._config.ventilationTimerEntity, w = _ ? Date.parse(String(this.getState(_)?.attributes.finishes_at ?? "")) : NaN, $ = (P) => new Date(P).toDateString() === new Date(t).toDateString() ? this._i18n.time(P) : `${this._i18n.day(P)} ${this._i18n.time(P)}`, S = f ? [`${i.ventilation.running}${m === void 0 ? "" : ` ${fe(Math.max(0, (t - m) / 6e4))}`}`, ...Number.isFinite(w) ? [i.ventilation.until(this._i18n.time(w))] : []].join(" · ") : [i.ventilation.off, ...m === void 0 ? [] : [i.ventilation.lastAt($(m))]].join(" · ");
      c = u`<kd-tile
        class="vent-tile ${f ? "on" : "off"}"
        kind="open"
        state=${f ? "on" : "off"}
        .name=${i.ventilation.title}
        .text=${S}
        .label=${`${i.ventilation.title}. ${S}. ${f ? i.summaryChips.ventilationSpoken : i.summaryChips.ventilationOffSpoken}`}
        @hdk-open=${(P) => this.openVentilationSheet(P)}
      ></kd-tile>`;
    }
    return d === p && c === p ? p : u`<div class="top-tiles ${d !== p && c !== p ? "" : "single"}">${d}${c}</div>`;
  }
  /** A popup of the whole house (Venku): it has no room; the first one stands in. */
  openHouseSheet(t, i) {
    const n = this._config?.rooms[0];
    n && this.openSheet(t, n, i);
  }
  /** The popup "Venku": what the tile says, row by row, with the humidity also as grams of water in the air. */
  renderOutsideBody() {
    const { t, whole: i } = this._i18n, n = this.outsideFacts() ?? {}, o = n.temperature !== void 0 && n.humidity !== void 0 ? St(n.temperature, n.humidity) : void 0, s = [];
    return n.temperature !== void 0 && s.push([t.outside.temperature, `${this._i18n.one(n.temperature)}${rt}°C`]), n.condition !== void 0 && s.push([t.outside.weather, n.condition]), n.range !== void 0 && s.push([t.outside.today, n.range]), n.rain !== void 0 && s.push([t.outside.rain, n.rain]), n.humidity !== void 0 && s.push([t.outside.humidity, Ft([this._i18n.percent(i(n.humidity)), ...o === void 0 ? [] : [`${this._i18n.one(o)}${rt}g/m³`]])]), n.air !== void 0 && s.push([t.outside.air, u`<span style=${`color: ${n.air.color}`}>${n.air.label}</span>`]), u`<div class="static-list outside-list" role="group" aria-label=${t.outside.title}>
        ${s.map(([a, r]) => u`<div class="static-row"><span class="option-text"><span>${a}</span></span><span class="list-value">${r}</span></div>`)}
      </div>
      ${Fa(Ra(this._forecast, Date.now()), this.chartWidth(), this._i18n)}`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    if (t.length === 0)
      return p;
    const i = t.filter((a) => a.conflict !== void 0), n = t.filter((a) => a.conflict === void 0), { t: o } = this._i18n, s = i.length === 0 ? p : u`<section class="attention" aria-label=${o.summaryChips.needsYou}>
            <h2 class="section-label">${Ft([o.summaryChips.needsYou, String(i.length)])}</h2>
            <div class="options list-options attention-list">
              ${i.map((a) => {
      const r = a.conflict, l = r.labels.length <= 2 ? r.labels.join(", ") : o.summaryChips.rooms(r.labels.length);
      return u`<button
                  type="button"
                  class="plain-button option list-option attention-row"
                  title=${a.spoken}
                  aria-haspopup="dialog"
                  @click=${(d) => this.openGroupSheet(r.system, r.rooms, d)}
                >
                  <span class="attention-icon" aria-hidden="true">!</span>
                  <span class="option-text">
                    <span>${l}</span>
                    <span class="option-hint attention-reason">${ie(r.reason)}</span>
                  </span>
                  <span class="list-chevron" aria-hidden="true">›</span>
                </button>`;
    })}
            </div>
          </section>`;
    return u`${s}${n.length === 0 ? p : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${n.map((a) => {
      const r = this.summaryIcon(a), l = a.opens;
      return l && l.rooms.length > 0 ? u`<li class="chip" style=${`--chip-color: ${a.color}`}>
            <button
              type="button"
              class="plain-button chip-open"
              title=${a.spoken}
              aria-label=${`${a.text}. ${a.spoken}`}
              aria-haspopup="dialog"
              @click=${(d) => this.openGroupSheet(l.system, l.rooms, d)}
            >
              <span class="chip-icon" aria-hidden="true">${r}</span>${a.text}
            </button>
          </li>` : u`<li class="chip" style=${`--chip-color: ${a.color}`} title=${a.spoken} aria-label=${a.spoken}>
          <span class="chip-icon" aria-hidden="true">${r}</span>${a.text}
        </li>`;
    })}
    </ul>`}`;
  }
  /** The icon of a summary chip (window, air conditioner, heating option or waves). */
  summaryIcon(t) {
    return t.kind === "windows" || t.kind === "conflict-window" ? ti(t.color, !1) : t.kind === "climate" || t.kind === "conflict-cooling" ? Ee("cool", t.color, !1) : t.kind === "manual" || t.kind === "boost" ? ia(t.kind === "boost" ? "boost" : "heat") : Ae(t.waves ?? 3, !1);
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, i, n, o, s, a) {
    const r = t.thresholds.stale_minutes, l = this.reading(t.temperature, r, a), d = this.reading(t.humidity, r, a), h = this.reading(t.carbon_dioxide, r, a), c = this.pm25Reading(t, a), { t: f } = this._i18n, b = Ge({ temperature: l, humidity: d, co2: h, pm25: c }, n, o, t, f), m = St(l.value, d.value), _ = ($) => b.cause === $ ? `color: ${b.color}` : p, w = oo(t, ($) => this.getState($), b.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${this.roomLabel(t)}
      >
        <div class="room-head">
        <div class="room-id">
        ${this.renderTitle(t, i)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${b.kind === "unknown" ? `border: 1.5px solid ${v.off}` : `background: ${b.color}`}
          ></span>
          <span style=${`color: ${b.color}; font-weight: ${b.kind === "normal" ? 400 : 500}`}>
            ${ie(b.label)}
          </span>
        </div>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${_("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? p}
            aria-label=${f.temperatureLabel(
      this.roomLabel(t),
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${rt}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${_("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? p}
            aria-label=${f.humidityLabel(
      this.roomLabel(t),
      d.value === void 0 ? void 0 : `${this._i18n.percent(Math.round(d.value))}${m === void 0 ? "" : `, ${this._i18n.one(m)} g/m³`}`,
      this.staleSpoken(d)
    )}
            aria-haspopup="dialog"
            @click=${($) => this.openSheet("history", t, $)}
          >
            ${d.value === void 0 ? u`<span class="missing">––</span>` : u`<span>${this._i18n.percent(Math.round(d.value))}${this.staleMark(d)}</span>${m === void 0 ? p : u`<span class="humidity-abs">${this._i18n.one(m)}${rt}g/m³</span>`}`}
          </button>
        </div>
        </div>
        <div class="lower">
          <div class="info">
            ${this.renderAirBlock(t, i, h, c, s)}
            ${this.renderHvac(t, n, i)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, i, w, a)}
          </div>
          ${t.cover ? this.renderCover(t, t.cover) : u`<div class="cover-panel" aria-hidden="true"></div>
                <div class="presets" aria-hidden="true"></div>`}
        </div>
      </article></div>
    `;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, i) {
    const n = `detail-description-${i}`;
    return u`
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
    return Xe((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Xe(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, i, n) {
    return t.value === void 0 || t.stale ? v.label : t.value >= n ? v.alert : t.value >= i ? v.warning : v.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px). It opens the room history with the CO₂ curve
   * and PM2.5 as the weaker dashed line (without a CO₂ sensor the PM2.5 curve is the main one). A sensor the room
   * does not have (`carbon_dioxide: false`) has no row; without both the place stays empty, so the rows below
   * keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, i, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return p;
    const { thresholds: a } = t, { t: r } = this._i18n, l = this._config.trends, d = (f, b, m, _, w, $) => {
      if (!b || !m)
        return;
      const S = _.value === void 0 ? void 0 : fn(this._trends[m], Kt(l, $));
      return r.airSensor(
        f,
        _.value === void 0 ? void 0 : `${this._i18n.whole(_.value)} ${w}`,
        S ? r.trendOver(r.trend[S], this.trendPeriod()) : void 0,
        this.staleSpoken(_)
      );
    }, h = [
      d("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      d("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), c = `air-description-${i}`;
    return u`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${!t.carbon_dioxide && !t.pm25}
        aria-haspopup="dialog"
        aria-describedby=${c}
        @click=${(f) => this.openSheet("history", t, f, "air")}
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
    ) : p}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      ta(),
      o,
      "µg/m³",
      a.pm25_warning,
      a.pm25_critical,
      s.pm25
    ) : p}
      </button>
      <span class="sr-only" id=${c}>${r.airDescription(this.roomLabel(t), h, this.historyPeriod())}</span>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, i, n, o, s, a, r, l) {
    const d = o.value !== void 0, h = this._i18n.whole(o.value ?? 0), c = this.airColor(o, a, r), f = v[t];
    return u`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? p}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? f : v.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? u`<span class="row-label" style=${`color: ${c}`}>${h}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : u`<span class="row-label" style=${`color: ${v.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, l, f, o.stale === !0) : p}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, i, n) {
    if (!t.temperature || i.value === void 0)
      return p;
    const o = this.renderSpark(t.temperature, n, v.peach, i.stale === !0);
    if (o === p)
      return p;
    const s = fn(this._trends[t.temperature], Kt(this._config.trends, "temperature")), { t: a } = this._i18n;
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
      return p;
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
      return p;
    const a = Qs(s, i).map(
      (c, f) => c === void 0 ? void 0 : { x: f / Math.max(1, s.length - 1) * 100, y: (1 - c) * 100 }
    ).filter((c) => c !== void 0);
    if (a.length < 2)
      return p;
    const r = a.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" "), l = a[0], d = a[a.length - 1], h = `${r} ${d.x.toFixed(2)},100 ${l.x.toFixed(2)},100`;
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
    const { t: o } = this._i18n, s = je(t, (b) => this.getState(b), this._i18n), a = De(this.getState(t.air_conditioner), this._i18n), r = (b) => this.renderSystemRow(Ae(s.unknown ? 0 : s.waves, s.unknown), s, b), l = (b) => this.renderSystemRow(Ee(a.mode, a.color, a.unknown), a, b), d = i ? ["climate", "heating"] : ["heating", "climate"], h = this.hvacTarget(t, d, { heating: !s.unknown && s.waves > 0, climate: a.active }), c = d.map((b) => `${o.system[b]} ${er(b === "heating" ? s : a, this._i18n)}`).join(", "), f = `hvac-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!h}
        aria-describedby=${f}
        @click=${(b) => h ? this.openSheet(h, t, b) : void 0}
      >
        ${i ? l(!0) : r(!0)}
        ${i ? r(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${f}>${o.hvacDescription(this.roomLabel(t), c, h)}</span>
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
            ${i.extra ? u`<span class="row-unit">${i.extra}</span>` : p}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (since the recorder shows it open; a restart does not count). */
  windowState(t, i) {
    const o = this.getState(t)?.state.toLowerCase();
    if (o === void 0 || ct(o))
      return { state: "unknown" };
    if (o !== "on")
      return { state: "closed" };
    const s = this._starts.of(this.hass, t);
    return { state: "open", minutesOpen: s === void 0 ? void 0 : Math.max(0, (i - s) / 6e4) };
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
    const { t: s } = this._i18n, a = t.windows.map((A) => ({ window: A, ...this.windowState(A.entity, o) })), r = a.filter((A) => A.state === "open"), l = r.length > 0, d = !l && (a.length === 0 || a.some((A) => A.state === "unknown")), h = t.windows.length > 1, c = l ? v.sky : v.label, f = l ? r.length > 1 ? s.window.openCount(r.length) : s.window.open : d ? "––" : s.window.closed, b = r.map((A) => A.minutesOpen).filter((A) => A !== void 0), m = b.length > 0 ? Math.max(...b) : void 0, _ = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, w = `window-description-${i}`, $ = m === void 0 ? void 0 : mn(m, s);
    let S;
    if (!h)
      S = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", $);
    else if (l) {
      const A = r.map((T) => this.windowName(t, T.window)).join(", ");
      S = r.length === 1 ? s.window.spokenOneOpen(A, $) : s.window.spokenManyOpen(A, $);
    } else
      S = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const P = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${c}`}
        ?disabled=${!P}
        aria-haspopup="dialog"
        aria-describedby=${w}
        @click=${(A) => this.openSheet("history", t, A, "windows")}
      >
        <span class="row-main">
          <span class="row-icon">${ti(d ? v.off : c, d)}</span>
          <span class="row-text">
            <span class="row-label">${f}</span>
            ${_ ? u`<span class="conflict-dot" aria-hidden="true"></span>` : p}
            ${m === void 0 ? p : u`<span class="row-unit window-duration"
                  >${`${_ ? "" : `${rt}·${rt}`}${fe(m)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${w}>${s.window.description(this.roomLabel(t), S, _, h)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, i) {
    const n = Be(i.name, this._i18n.language);
    if (n !== void 0) return n;
    const o = this._i18n.t.window.defaultName(t.windows.indexOf(i) + 1);
    return t.windows.length === 1 ? o.replace(/\s*1$/, "") : o;
  }
  /** The rows of the room detail under its charts: Topení, Klimatizace, every window, the blind and the link of the room. */
  renderDetailRows(t, i) {
    const { t: n } = this._i18n, o = t.heating?.climate ? je(t, (l) => this.getState(l), this._i18n) : void 0, s = t.air_conditioner ? De(this.getState(t.air_conditioner), this._i18n) : void 0, a = (l, d, h) => u`<button
      type="button"
      class="plain-button option list-option detail-row"
      data-system=${l}
      @click=${() => this.openSystemFromDetail(l, t)}
    >
      <span class="option-icon" aria-hidden="true">${d}</span>
      <span class="option-text">
        <span>${n.system[l]}</span>
        <span class="option-hint detail-state" style=${`color: ${h.active ? h.color : "var(--kd-label)"}`}
          >${h.unknown ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Ft([h.label, ...h.extra ? [h.extra.replace(/^·\s*/, "")] : []])}</span
        >
      </span>
      <span class="list-chevron" aria-hidden="true">›</span>
    </button>`, r = t.link;
    return u`
      <div class="options list-options detail-list">
        ${o ? a("heating", Ae(o.unknown ? 0 : o.waves, o.unknown), o) : p}
        ${s ? a("climate", Ee(s.mode, s.color, s.unknown), s) : p}
        ${t.windows.map((l, d) => {
      const { state: h, minutesOpen: c } = this.windowState(l.entity, i), f = h === "unknown", b = h === "open" ? v.sky : v.label;
      return u`<div class="option list-option window-option" data-part=${d === 0 ? "windows" : p}>
            <span class="option-icon" aria-hidden="true">${ti(f ? v.off : b, f)}</span>
            <span class="option-text">
              <span>${this.windowName(t, l)}</span>
              <span class="option-hint window-state" style=${`color: ${b}`}>
                ${f ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : Ft([h === "open" ? n.window.open : n.window.closed, ...c === void 0 ? [] : [fe(c)]])}
              </span>
            </span>
          </div>`;
    })}
        ${t.cover ? this.renderDetailCover(t, t.cover) : p}
        ${r ? u`<button type="button" class="plain-button option list-option detail-row" data-part="link" @click=${() => {
      this.closeSheet(!1), this.openLink(r);
    }}>
              <span class="option-text"><span>${r.startsWith("/") ? n.sheet.linkPage : n.sheet.linkWeb}</span></span>
              <span class="list-chevron" aria-hidden="true">›</span>
            </button>` : p}
      </div>
    `;
  }
  /**
   * The blind in the room detail: one row with its state in words; it opens the standard cover dialog of Home Assistant
   * (uživatel 14. 11. 2026: „Puvodni cover popup na tom pohledu na zaluzie se mi libil vice. Ty 2 slidery vodorovne jsou
   * horsi nez ty standardni svisle.“). The presets stay on the room card.
   */
  renderDetailCover(t, i) {
    const { t: n } = this._i18n, o = this.getState(i), s = o?.state.toLowerCase(), a = s !== void 0 && !ct(s), r = a ? ft(o?.attributes.current_position) : void 0, l = a ? ft(o?.attributes.current_tilt_position) : void 0, d = r !== void 0 && l !== void 0, h = t.presets.find((f) => pe(r, l, f, this.tolerance())), c = a ? h ? gn(h, n, this._i18n.language) : d ? Ft([n.sheet.coverCustom, n.cover.position(Math.round(r), Math.round(l))]) : n.cover.unknown : n.cover.unavailable;
    return u`<button
      type="button"
      class="plain-button option list-option detail-row"
      data-part="cover"
      @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(i);
    }}
    >
      <span class="option-icon detail-cover-icon" aria-hidden="true">${xn(h?.icon ?? "shade")}</span>
      <span class="option-text">
        <span>${n.sheet.cover}</span>
        <span class="option-hint detail-state">${c}</span>
      </span>
      <span class="list-chevron" aria-hidden="true">›</span>
    </button>`;
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
      const s = await me(t, [i], o - 168 * Pt, o), a = na(s[i]);
      if (n !== this._ventRequest)
        return;
      if (!a) {
        this._vent = { rooms: [] };
        return;
      }
      const r = this.ventilationRooms(), l = a.end ?? o, d = r.flatMap((w) => [
        w.carbon_dioxide,
        w.temperature,
        w.humidity,
        ...w.windows.map(($) => $.entity)
      ]), h = (this._config?.ventilationSettleMinutes ?? 25) * 6e4, c = a.end === void 0 ? void 0 : a.end + h, f = await me(
        t,
        d.filter((w) => w !== void 0),
        a.start - 30 * 6e4,
        c === void 0 ? l : Math.min(o, Math.max(l, c))
      );
      if (n !== this._ventRequest)
        return;
      const b = c !== void 0 && c <= o ? c : void 0, m = (w) => ({
        before: w(a.start),
        after: a.end === void 0 ? void 0 : w(a.end),
        settled: b === void 0 ? void 0 : w(b)
      }), _ = (w) => ($) => w === void 0 ? void 0 : be(oe(f[w], $));
      this._vent = {
        session: a,
        rooms: r.map((w) => {
          const $ = w.carbon_dioxide === void 0 ? void 0 : m(_(w.carbon_dioxide));
          return {
            name: w.name,
            opened: w.windows.some((S) => oa(f[S.entity], a.start, l)),
            start: $?.before,
            end: be(oe(f[w.carbon_dioxide ?? ""], l)),
            co2: $,
            temperature: w.temperature === void 0 ? void 0 : m(_(w.temperature)),
            // Absolute humidity (g/m³) from the recorded temperature and relative humidity of the room.
            humidity: w.temperature === void 0 || w.humidity === void 0 ? void 0 : m((S) => St(_(w.temperature)(S), _(w.humidity)(S)))
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
    const { t: i } = this._i18n, n = i.ventilation, o = this._config, s = this.ventilationOn(), a = o?.ventilationCo2Target ?? 500, r = o?.ventilationCo2Full ?? 420, l = this._vent, d = l?.session, h = u`<span class="no-data" aria-hidden="true">––</span><span class="sr-only">${i.unknownValue}</span>`, c = this._sheetError, f = o?.ventilationTimerEntity, b = this.getState(f), m = b?.state.toLowerCase() === "active" ? Date.parse(String(b.attributes.finishes_at ?? "")) : Number.NaN, _ = Number.isNaN(m) || m <= t ? void 0 : m, w = this._starts.of(this.hass, o?.ventilationEntity), $ = w === void 0 ? void 0 : Math.max(0, (t - w) / 6e4), S = this.ventilationRooms().flatMap((C) => {
      const j = l?.rooms.find((D) => D.name === C.name), R = Fe(C, (D) => this.getState(D)).length > 0;
      if (!R && !j?.opened)
        return [];
      const W = this.getState(C.carbon_dioxide), Y = s ? be(W?.state) : j?.end, yt = j?.start, Lt = yt !== void 0 && Y !== void 0 ? sa(yt, Y, a, r) : void 0;
      return [{ room: C, startValue: yt, live: Y, steps: Lt, open: R }];
    }), P = o?.ventilationSettleMinutes ?? 25, A = d?.end !== void 0 && t >= d.end + P * 6e4, T = s ? [n.before, i.chart.now] : [n.before, n.after, A ? n.settledShort(P) : i.chart.now], M = s ? T : [n.before, n.after, A ? n.settledAfter(P) : i.chart.now], k = (C) => {
      const j = l?.rooms.find((D) => D.name === C.room.name), R = C.steps === void 0 ? void 0 : Math.min(100, Math.floor(C.steps.done * 100)), W = [
        { label: n.quantity.co2, entity: C.room.carbon_dioxide, triple: j?.co2, live: be(this.getState(C.room.carbon_dioxide)?.state), digits: !1 },
        { label: n.quantity.temperature, entity: C.room.temperature, triple: j?.temperature, live: Je(this.getState(C.room.temperature)?.state), digits: !0 },
        {
          label: n.quantity.humidity,
          entity: C.room.temperature !== void 0 && C.room.humidity !== void 0 ? C.room.humidity : void 0,
          triple: j?.humidity,
          live: St(Je(this.getState(C.room.temperature)?.state), Je(this.getState(C.room.humidity)?.state)),
          digits: !0
        }
      ].filter((D) => D.entity).map((D) => {
        const wt = s ? [D.triple?.before, D.live] : [D.triple?.before, D.triple?.after, A ? D.triple?.settled : D.live];
        return {
          label: D.label,
          shown: wt.map((xt) => xt === void 0 ? void 0 : D.digits ? this._i18n.one(xt) : this._i18n.whole(xt))
        };
      }), Y = C.steps?.closable === !0, yt = [
        s && R !== void 0 ? `${n.done} ${this._i18n.percent(R)}${Y ? `, ${n.closable}` : ""}` : void 0,
        ...W.map((D) => n.lineSpoken(D.label, D.shown.map((wt, xt) => `${M[xt]} ${wt ?? i.unknownValue}`).join(", ")))
      ].filter((D) => D !== void 0).join(". "), Lt = C.open ? Y ? v.fresh : v.warning : v.label;
      return u`<div class="vent-room ${s ? "with-ring" : ""}" role="group" aria-label=${n.roomSpoken(this.roomLabel(C.room), yt)}>
        <div class="vent-room-main" aria-hidden="true">
          <div class="vent-room-head">
            ${this.roomLabel(C.room)}${s && !C.open ? u`<span class="vent-note">${n.windowClosed}</span>` : p}
          </div>
          ${W.map(
        (D) => u`<div class="vent-line">
              <span class="vent-q">${D.label}</span>
              ${D.shown.map((wt) => u`<span class="vent-num">${wt ?? u`<span class="no-data">––</span>`}</span>`)}
            </div>`
      )}
        </div>
        ${s ? u`<kd-ring
              aria-hidden="true"
              fraction=${(R ?? 0) / 100}
              size="40"
              stroke="6"
              num=${R === void 0 ? "––" : String(R)}
              style=${`--hdk-ring-fill: ${R === void 0 ? v.label : Lt}; grid-row: 2 / span ${W.length}`}
            ></kd-ring>` : p}
      </div>`;
    }, I = S.length === 0 ? p : u`<div class="vent-table" role="group" aria-label=${n.title}>
            <div class="vent-head" aria-hidden="true">
              <span class="vent-q"></span>
              ${T.map((C) => u`<span class="vent-num">${C}</span>`)}
              ${s ? u`<span class="vent-num ring-head">↓ ${this._i18n.whole(r)}<span class="ring-unit"> ppm</span></span>` : p}
            </div>
            ${S.map(k)}
          </div>`;
    let E = p;
    return s ? E = u`
        <div class="static-row vent-summary">
          <span class="option-text">
            <span>
              ${n.running}
              ${$ === void 0 ? h : u`<span aria-hidden="true">${fe($)}</span
                    ><span class="sr-only">${mn($, i)}</span>`}
            </span>
          </span>
          ${f === void 0 ? p : u`<span class="list-value vent-ends">${n.endsBy} ${_ === void 0 ? h : this._i18n.time(_)}</span>`}
        </div>` : d && (E = u`
        <div class="static-row vent-summary">
          <span class="option-text"><span>${n.last}</span></span>
          <span class="list-value">${new Date(d.start).toDateString() === new Date(t).toDateString() ? p : `${this._i18n.day(d.start)} `}${this._i18n.time(d.start)}${d.end === void 0 ? p : u`–${this._i18n.time(d.end)}`}</span>
        </div>`), u`
      ${this.renderAiringEffect()}
      ${!s && !d ? p : u`<div class="static-list" role="group" aria-label=${n.title}>${E}${I}</div>`}
      ${!s && !d && l !== void 0 ? u`<p class="timer-foot">${n.never}</p>` : p}
      ${s ? u`<button
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
            ${c ? u`<span class="sr-only" role="alert">${c}</span>` : p}` : l === void 0 ? p : u`<button
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
              ${c ? u`<span class="sr-only" role="alert">${c}</span>` : p}`}
    `;
  }
  /** "Ukončit": turns the mode off; Home Assistant switches the fans off and returns the slats (kit, Home Assistant: větrací režim). */
  /**
   * What airing does to the humidity now (uživatel 14. 11. 2026: „Q231 1,2,3,4“): the absolute humidity outside against the
   * average of the rooms of the mode, both to one decimal; lower outside dries the air, higher makes it more humid.
   */
  renderAiringEffect() {
    const t = this.outsideFacts(), i = St(t?.temperature, t?.humidity), n = this.ventilationRooms().flatMap((l) => {
      const d = St(this.numberState(l.temperature), this.numberState(l.humidity));
      return d === void 0 ? [] : [d];
    });
    if (i === void 0 || n.length === 0)
      return p;
    const o = (l) => Math.round(l * 10) / 10, s = o(n.reduce((l, d) => l + d, 0) / n.length), a = this._i18n.t.ventilation, r = o(i) < s ? a.effect.dries : o(i) > s ? a.effect.wets : a.effect.keeps;
    return u`<p class="vent-effect"><strong>${r}</strong><span>${a.effectDetail(this._i18n.one(i), this._i18n.one(s))}</span></p>`;
  }
  /** Starts the mode (uživatel 14. 11. 2026: „Q232 A“) or ends it; the popup stays and shows the new state once Home Assistant reports it. */
  async switchVentilation(t) {
    const i = this._config?.ventilationEntity;
    if (!(!i || !this.hass || this._ventilationEnding)) {
      this._ventilationEnding = !0, this._sheetError = void 0;
      try {
        await this.hass.callService(i.split(".")[0], t, { entity_id: i }), this.haptic("success"), window.clearTimeout(this._endTimer), this._endTimer = window.setTimeout(() => {
          this._ventilationEnding = !1;
        }, 1e4);
      } catch (n) {
        console.error("Klima Dashboard: switching the ventilation mode failed", n), this._sheetError = this._i18n.t.sheet.commandFailed, this._ventilationEnding = !1, this.haptic("failure");
      }
    }
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, i) {
    const n = this.getState(i), o = n?.state.toLowerCase(), s = o !== void 0 && !ct(o), a = s ? ft(n?.attributes.current_position) : void 0, r = s ? ft(n?.attributes.current_tilt_position) : void 0, l = a !== void 0 && r !== void 0, d = o === "opening" || o === "closing", { t: h } = this._i18n, c = l ? h.cover.position(Math.round(a), Math.round(r)) : h.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${h.cover.label(this.roomLabel(t), c, d)}
        @click=${() => this.showMoreInfo(i)}
      >
        <svg
          viewBox="0 0 ${Ce} ${ai}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${vs(a, r)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${h.cover.presets(this.roomLabel(t))}>
        ${t.presets.map((f) => this.renderPreset(t, f, a, r, s))}
      </div>
    `;
  }
  renderPreset(t, i, n, o, s) {
    const a = this._moving[t.name], r = a === i.id, l = a === void 0 && pe(n, o, i, this.tolerance()), d = `${t.name}|${i.id}`, { t: h } = this._i18n, c = gn(i, h, this._i18n.language), f = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${r ? "pending" : ""} ${f ? "failed" : ""}"
        title=${c}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${r ? "true" : p}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${f && this._hint?.spoken ? `${h.cover.preset(this.roomLabel(t), c, vn(i, h, this._i18n.language), s)} ${this._hint.text} ${this._hint.spoken}` : h.cover.preset(this.roomLabel(t), c, vn(i, h, this._i18n.language), s)}
        @pointerdown=${(b) => this.pressStart(b, t, i, s)}
        @pointerup=${() => this.pressEnd(t, i, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(b) => b.preventDefault()}
        @click=${(b) => {
      b.detail === 0 && (s ? this.applyPreset(t, i) : this.showUnavailable(d));
    }}
      >
        ${xn(i.icon)}
        ${this._hint?.key !== d ? p : f ? u`<span class="preset-hint error" role="alert"
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
      }, An);
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
    }, o ? cr : hr);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, i) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || ct(n)) {
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
      }, rr);
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
    if (pe(
      ft(o?.attributes.current_position),
      ft(o?.attributes.current_tilt_position),
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
      if (a === void 0 || ct(a) || pe(
        ft(s?.attributes.current_position),
        ft(s?.attributes.current_tilt_position),
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
  renderSheet(t, i, n) {
    const o = this._sheet;
    if (!o)
      return p;
    const { t: s } = this._i18n;
    if (o.kind === "history")
      return this.renderSheetFrame(
        this.roomLabel(o.room),
        this.roomStatusLabel(o.room, t, i, n),
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
  roomStatusLabel(t, i, n, o) {
    const s = t.thresholds.stale_minutes;
    return Ge(
      {
        temperature: this.reading(t.temperature, s, o),
        humidity: this.reading(t.humidity, s, o),
        co2: this.reading(t.carbon_dioxide, s, o),
        pm25: this.pm25Reading(t, o)
      },
      i,
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
  renderRoomDetail(t, i, n) {
    const { t: o } = this._i18n, s = this._config?.history.hours ?? 24, a = t.hasCo2 ? "co2" : t.hasPm25 ? "pm25" : void 0, r = s === En ? p : u`<kd-segmented
            class="detail-period"
            .label=${o.sheet.period}
            .options=${[
      { value: String(s), label: o.sheet.hoursShort(s) },
      { value: String(En), label: o.sheet.week }
    ]}
            .value=${String(this._historyHours)}
            @hdk-select=${(f) => {
      f.stopPropagation(), this._historyHours = Number(f.detail.value), this._scrubTime = void 0, this.loadRoomHistory(t);
    }}
          ></kd-segmented>`, l = this._historyModel, d = this._historyStatus === "ready" && l !== void 0, h = d && !ni(l, "temperature") && (!a || !ni(l, a)), c = !d || h ? u`<section class="detail-chart ${a ? "double" : ""}" data-part="temperature">${this.renderHistoryBody(t, "temperature", i)}</section>` : u`<section class="detail-chart" data-part="temperature">${this.renderHistoryBody(t, "temperature", i)}</section>
            ${a ? u`<section class="detail-chart" data-part="air">${this.renderHistoryBody(t, a, i)}</section>` : p}`;
    return u`
      ${r} ${c}
      ${this.renderDetailRows(t, n)}
    `;
  }
  /** From the room detail to the popup Topení / Klimatizace of that room (the sheet stays, its content changes). */
  openSystemFromDetail(t, i) {
    this._historyRequest += 1, this._scrubTime = void 0, this._sheetError = void 0, this._sheet = { kind: t, room: i }, this._hvacSelected = this.hvacSelection(t);
  }
  /**
   * Popup frame in the style of an iOS sheet (CURRENT_SPEC.md, Detail místnosti): a grabber,
   * closes by ✕, a tap outside, Escape, or by pulling the top part down.
   */
  renderSheetFrame(t, i, n, o = "") {
    return u`<kd-sheet
      open
      .heading=${t}
      .sub=${i ?? ""}
      .closeLabel=${this._i18n.t.sheet.close}
      ?wide=${o === "history-sheet"}
      @hdk-close=${() => this.closeSheet()}
      ><div class="sheet ${o}">${n}</div></kd-sheet
    >`;
  }
  /** Title of the Topení / Klimatizace popup: the system, or both when the switch under it chooses one. */
  hvacTitle(t) {
    const i = this.sheetRooms();
    return { title: i.some((o) => o.heating?.climate) && i.some((o) => o.air_conditioner) ? this._i18n.t.sheet.hvac : this._i18n.t.system[t] };
  }
  /** Topení / Klimatizace controls: the segmented switch on top, then the panel of the chosen system. */
  renderHvacBody(t, i, n) {
    const o = this.sheetRooms(), s = o.filter((m) => m.heating?.climate), a = o.filter((m) => m.air_conditioner), r = n ? ["climate", "heating"] : ["heating", "climate"], l = s.length > 0 && a.length > 0, { t: d } = this._i18n, h = i === "heating" ? "heating" : "cooling", c = (this._config?.rooms ?? []).filter((m) => this.hvacEntity(m, i)), f = u`<kd-climate
      .hass=${this.hass}
      .i18n=${this._i18n}
      .texts=${d.climatePopup}
      .system=${h}
      .rooms=${c.map((m) => ({ name: this.roomLabel(m), entity: this.hvacEntity(m, i) }))}
      .selected=${this._hvacSelected}
      .delayMs=${(this._config?.sendDelaySeconds ?? 2) * 1e3}
      @hdk-select-rooms=${(m) => this._hvacSelected = m.detail.selected}
      @hdk-error=${(m) => this._sheetError = m.detail.message}
      @hdk-more-info=${async (m) => {
      await this.flushClimate();
      const _ = c.find((w) => this.hvacEntity(w, i) === m.detail.entityId);
      _ && (this._sheet = { kind: "history", room: _, focus: "temperature" }, this._scrubTime = void 0, this._historyHours = this._config?.history.hours ?? 24, this.loadRoomHistory(_));
    }}
    ></kd-climate>`, b = l ? u`<div
          class="segmented"
          role="tablist"
          aria-label=${d.sheet.systems}
          @keydown=${(m) => this.segmentKeydown(m, r, i)}
        >
          ${r.map(
      (m) => u`<button
              type="button"
              role="tab"
              id=${`tab-${m}`}
              class="plain-button segment"
              data-system=${m}
              aria-selected=${m === i ? "true" : "false"}
              aria-controls="hvac-panel"
              tabindex=${m === i ? "0" : "-1"}
              @click=${() => this.switchSheet(m)}
            >
              ${d.system[m]}
            </button>`
    )}
        </div>` : p;
    return u`${b}
      <div class="hvac-panel" role=${l ? "tabpanel" : p} id="hvac-panel" aria-labelledby=${l ? `tab-${i}` : p}>
        ${f}
      </div>`;
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
    const o = this._historyHours, { t: s } = this._i18n;
    let a;
    const r = this._historyModel;
    return this._historyStatus === "loading" ? a = u`<p class="sheet-message">${s.sheet.loading}</p>` : this._historyStatus === "error" || !r ? a = u`<p class="sheet-message error" role="alert">${s.sheet.historyFailed}</p>` : ni(r, i) ? a = u`<div
        class="chart-wrap ${i === "temperature" ? "temperature" : "air"}"
        tabindex="0"
        role="group"
        aria-label=${s.sheet.chart(Xe(o * 60, s))}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${Aa(r, i, this.chartWidth(), this._scrubTime, this._i18n, n, this.liveReading(t, i))}
      </div>` : a = u`<p class="sheet-message">${s.sheet.noHistory(o)}</p>`, a;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(lr).matches === !0;
    return Math.max(280, Math.min(t ? 960 : 460, window.innerWidth) - 32);
  }
  openSheet(t, i, n, o) {
    this._opener = n.currentTarget instanceof HTMLElement ? n.currentTarget : void 0, this._sheetError = void 0, this._announcement = "", this._sheet = { kind: t, room: i, focus: t === "history" ? o ?? "temperature" : void 0 }, (t === "heating" || t === "climate") && (this._hvacSelected = this.hvacSelection(t)), window.addEventListener("resize", this.handleResize, { passive: !0 }), t === "history" && (this._scrubTime = void 0, this._historyHours = this._config?.history.hours ?? 24, this._focusPart = o, this.loadRoomHistory(i));
  }
  /** The name of a room in the language of the card. */
  roomLabel(t) {
    return Wn(t, this._i18n.language);
  }
  /** Summary chip: the Topení / Klimatizace popup for the rooms the chip names. */
  openGroupSheet(t, i, n) {
    const o = (this._config?.rooms ?? []).filter((s) => i.includes(s.name));
    o.length !== 0 && (this.openSheet(t, o[0], n), this._sheet = { kind: t, room: o[0], rooms: o }, this._hvacSelected = this.hvacSelection(t));
  }
  /** The rooms a Topení / Klimatizace popup sets: one room, or the rooms of a summary chip that have the system. */
  sheetRooms() {
    const t = this._sheet;
    return t ? t.rooms ?? [t.room] : [];
  }
  /** The climate entity of a room for the system of the popup. */
  hvacEntity(t, i) {
    return i === "heating" ? t.heating?.climate : t.air_conditioner;
  }
  /** The rooms the popup opens with: the rooms of the popup that have the system, else the first room that has it. */
  hvacSelection(t) {
    const i = this.sheetRooms().map((o) => this.hvacEntity(o, t)).filter((o) => !!o);
    if (i.length) return i;
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
    ].filter((r) => !!r), o = this._config.history, s = Date.now(), a = s - this._historyHours * Pt;
    try {
      const r = await me(this.hass, n, a, s);
      if (i !== this._historyRequest)
        return;
      this._historyModel = ba(r, t, { startMs: a, endMs: s }, o, this.ventilationRooms().includes(t) ? this._config?.ventilationEntity : void 0), this._historyStatus = "ready";
    } catch (r) {
      console.error("Klima Dashboard: loading the room history failed", r), i === this._historyRequest && (this._historyStatus = "error");
    }
  }
  // ---------------------------------------------------------------- trends
  async refreshTrends() {
    await Promise.all([this.loadTrends(), this.loadReported(), this.loadForecast()]);
  }
  async loadForecast() {
    const t = this._config?.outside?.forecast;
    !this.hass || !t || Date.now() - this._forecastAt < dr || (this._forecastAt = Date.now(), this._forecast = await La(this.hass, t));
  }
  async loadTrends() {
    if (!this.hass || !this._config || this._trendsLoading)
      return;
    const t = As(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: i, samples: n } = this._config.trends, o = Date.now(), s = o - i * 6e4;
    try {
      const a = await me(this.hass, t, s, o), r = {};
      for (const l of t)
        r[l] = Js(a[l], s, o, n);
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
    const i = Os(this._config), n = await Promise.allSettled(
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
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${ea()}</span>` : p;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(Vn(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const i = this.staleTitle(t);
    return i ? `, ${i.toLowerCase()}` : "";
  }
  numberState(t) {
    const i = this.entityState(t);
    if (i === void 0 || ct(i.toLowerCase()))
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
  /** The standard dialog of an entity of Home Assistant (the blind: its own position and tilt controls). */
  showMoreInfo(t) {
    t && this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
  }
};
Ii.styles = [ki, Ja];
let F = Ii;
U([
  N()
], F.prototype, "_config");
U([
  y({ attribute: !1 })
], F.prototype, "hass");
U([
  N()
], F.prototype, "_sheet");
U([
  N()
], F.prototype, "_sheetError");
U([
  N()
], F.prototype, "_hvacSelected");
U([
  N()
], F.prototype, "_ventilationEnding");
U([
  N()
], F.prototype, "_announcement");
U([
  N()
], F.prototype, "_vent");
U([
  N()
], F.prototype, "_historyStatus");
U([
  N()
], F.prototype, "_historyModel");
U([
  N()
], F.prototype, "_scrubTime");
U([
  N()
], F.prototype, "_forecast");
U([
  N()
], F.prototype, "_historyHours");
U([
  N()
], F.prototype, "_flash");
U([
  N()
], F.prototype, "_moving");
U([
  N()
], F.prototype, "_prefersDark");
U([
  N()
], F.prototype, "_hint");
U([
  N()
], F.prototype, "_trends");
U([
  N()
], F.prototype, "_trendsLoaded");
U([
  N()
], F.prototype, "_reported");
U([
  N()
], F.prototype, "_historyRequest");
U([
  N()
], F.prototype, "_clock");
us("kd");
is("kd");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", F);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: ui(Ia()).t.cardDescription,
  preview: !1
});
