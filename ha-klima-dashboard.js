const Ot = globalThis, ae = Ot.ShadowRoot && (Ot.ShadyCSS === void 0 || Ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = /* @__PURE__ */ Symbol(), ye = /* @__PURE__ */ new WeakMap();
let ri = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ae && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ye.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ye.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zi = (e) => new ri(typeof e == "string" ? e : e + "", void 0, le), Ni = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new ri(i, e, le);
}, Ri = (e, t) => {
  if (ae) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Ot.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, ke = ae ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return zi(i);
})(e) : e;
const { is: Ii, defineProperty: Fi, getOwnPropertyDescriptor: Ui, getOwnPropertyNames: ji, getOwnPropertySymbols: Bi, getPrototypeOf: Wi } = Object, Rt = globalThis, _e = Rt.trustedTypes, Ki = _e ? _e.emptyScript : "", qi = Rt.reactiveElementPolyfillSupport, vt = (e, t) => e, Ht = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ki : null;
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
} }, de = (e, t) => !Ii(e, t), xe = { attribute: !0, type: String, converter: Ht, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = xe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Fi(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Ui(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = Wi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const i = this.properties, n = [...ji(i), ...Bi(i)];
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
      for (const o of n) i.unshift(ke(o));
    } else t !== void 0 && i.push(ke(t));
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
    return Ri(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Ht).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ht;
      this._$Em = o;
      const a = r.fromAttribute(i, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? de)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[vt("elementProperties")] = /* @__PURE__ */ new Map(), nt[vt("finalized")] = /* @__PURE__ */ new Map(), qi?.({ ReactiveElement: nt }), (Rt.reactiveElementVersions ??= []).push("2.1.2");
const ce = globalThis, Se = (e) => e, zt = ce.trustedTypes, Me = zt ? zt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ai = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, li = "?" + Y, Yi = `<${li}>`, tt = document, wt = () => tt.createComment(""), bt = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, Vi = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", Bt = `[ 	
\f\r]`, ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Te = /-->/g, Ce = />/g, V = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ae = /'/g, Ee = /"/g, di = /^(?:script|style|textarea|title)$/i, ci = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = ci(1), $ = ci(2), lt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), Q = tt.createTreeWalker(tt, 129);
function hi(e, t) {
  if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Me !== void 0 ? Me.createHTML(t) : t;
}
const Gi = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ht;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, c, h = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); ) p = r.lastIndex, r === ht ? c[1] === "!--" ? r = Te : c[1] !== void 0 ? r = Ce : c[2] !== void 0 ? (di.test(c[2]) && (o = RegExp("</" + c[2], "g")), r = V) : c[3] !== void 0 && (r = V) : r === V ? c[0] === ">" ? (r = o ?? ht, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, d = c[1], r = c[3] === void 0 ? V : c[3] === '"' ? Ee : Ae) : r === Ee || r === Ae ? r = V : r === Te || r === Ce ? r = ht : (r = V, o = void 0);
    const m = r === V && e[a + 1].startsWith("/>") ? " " : "";
    s += r === ht ? l + Yi : h >= 0 ? (n.push(d), l.slice(0, h) + ai + l.slice(h) + Y + m) : l + Y + (h === -2 ? a : m);
  }
  return [hi(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class yt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Gi(t, i);
    if (this.el = yt.createElement(d, n), Q.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = Q.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ai)) {
          const p = c[r++], m = o.getAttribute(h).split(Y), w = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: s, name: w[2], strings: m, ctor: w[1] === "." ? Xi : w[1] === "?" ? Ji : w[1] === "@" ? Qi : It }), o.removeAttribute(h);
        } else h.startsWith(Y) && (l.push({ type: 6, index: s }), o.removeAttribute(h));
        if (di.test(o.tagName)) {
          const h = o.textContent.split(Y), p = h.length - 1;
          if (p > 0) {
            o.textContent = zt ? zt.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(h[m], wt()), Q.nextNode(), l.push({ type: 2, index: ++s });
            o.append(h[p], wt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === li) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Y, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += Y.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = tt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dt(e, t, i = e, n) {
  if (t === lt) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = bt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = dt(e, o._$AS(e, t.values), o, n)), t;
}
class Zi {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? tt).importNode(i, !0);
    Q.currentNode = o;
    let s = Q.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new _t(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new tn(s, this, t)), this._$AV.push(d), l = n[++a];
      }
      r !== l?.index && (s = Q.nextNode(), r++);
    }
    return Q.currentNode = tt, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class _t {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = dt(this, t, i), bt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== lt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = yt.createElement(hi(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new Zi(o, this), r = s.u(this.options);
      s.p(i), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Oe.get(t.strings);
    return i === void 0 && Oe.set(t.strings, i = new yt(t)), i;
  }
  k(t) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new _t(this.O(wt()), this.O(wt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Se(t).nextSibling;
      Se(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class It {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = dt(this, t, i, 0), r = !bt(t) || t !== this._$AH && t !== lt, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = dt(this, a[n + l], i, l), d === lt && (d = this._$AH[l]), r ||= !bt(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xi extends It {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Ji extends It {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Qi extends It {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dt(this, t, i, 0) ?? f) === lt) return;
    const n = this._$AH, o = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== f && (n === f || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class tn {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dt(this, t);
  }
}
const en = ce.litHtmlPolyfillSupport;
en?.(yt, _t), (ce.litHtmlVersions ??= []).push("3.3.3");
const nn = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new _t(t.insertBefore(wt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const pe = globalThis;
class $t extends nt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = nn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return lt;
  }
}
$t._$litElement$ = !0, $t.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: $t });
const on = pe.litElementPolyfillSupport;
on?.({ LitElement: $t });
(pe.litElementVersions ??= []).push("4.2.2");
const sn = { attribute: !0, type: String, converter: Ht, reflect: !1, hasChanged: de }, rn = (e = sn, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
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
function pi(e) {
  return (t, i) => typeof i == "object" ? rn(e, t, i) : ((n, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function O(e) {
  return pi({ ...e, state: !0, attribute: !1 });
}
const Pt = 60, Qt = 142, Pe = 11, St = 3, an = 0.8, De = 2, ln = "fill: var(--kd-blind); opacity: var(--kd-blind-opacity)", dn = "fill: var(--kd-sky); opacity: var(--kd-window-opacity)", cn = "fill: var(--kd-blind); opacity: var(--kd-rail-opacity)";
function hn(e, t) {
  if (e === void 0 || t === void 0)
    return $`<rect
      x="0.75"
      y="0.75"
      width=${Pt - 1.5}
      height=${Qt - 1.5}
      rx="6"
      fill="none"
      style="stroke: var(--kd-off)"
      stroke-width="1.5"
      stroke-dasharray="3 3"
    ></rect>`;
  const i = Qt - St - 1, n = i / Pe, o = n - an, s = o - t / 100 * (o - De), r = St + 1 + (100 - e) / 100 * i, a = Array.from({ length: Pe }, (l, d) => {
    const c = St + 1 + d * n + n / 2, h = c <= r, p = h ? s : De;
    return $`<rect
      x="0"
      y=${(c - p / 2).toFixed(2)}
      width=${Pt}
      height=${p.toFixed(2)}
      rx=${Math.min(1.5, p / 2).toFixed(2)}
      style=${h ? ln : dn}
    ></rect>`;
  });
  return $`<rect
      class="rail"
      x="0"
      y="0"
      width=${Pt}
      height=${St}
      rx="1.5"
      style=${cn}
    ></rect>${a}`;
}
const pn = ["cs", "en", "sv"], Wt = ["bedroom", "office", "kids", "living"], Kt = "none", te = ["open", "shade", "dark"], ui = {
  open: { position: 100, tilt: 100 },
  shade: { position: 0, tilt: 100 },
  dark: { position: 0, tilt: 0 }
};
function qt(e, t, i, n) {
  return e !== void 0 && t !== void 0 && Math.abs(e - i.position) <= n && Math.abs(t - i.tilt) <= n;
}
function pt(e, t) {
  return t === "temperature" ? e.temperature_step : t === "co2" ? e.co2_step : e.pm25_step;
}
const g = {
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
}, Ft = {
  off: g.off,
  cool: g.cool,
  wind_free: g.cool,
  dry: g.dry,
  fan: g.plan,
  heat: g.heat,
  auto: g.auto,
  unknown: g.off
}, un = {
  sleep: "Sleep",
  boost: "Boost",
  wind_free: "WindFree",
  wind_free_sleep: "WindFree Sleep"
};
function mi(e) {
  const t = un[e];
  if (t)
    return t;
  const i = e.replace(/_/g, " ");
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function fi(e) {
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
function Le(e, t, i, n, o) {
  const { thresholds: s } = n, r = [
    [o.required.temperature, e.temperature],
    [o.required.humidity, e.humidity],
    ...n.hasCo2 ? [[o.required.co2, e.co2]] : [],
    ...n.hasPm25 ? [[o.required.pm25, e.pm25]] : [],
    [o.required.houseMode, i ? { value: 1 } : void 0]
  ];
  for (const [m, w] of r) {
    if (w?.value === void 0)
      return { id: "noData", label: o.noData(m), color: g.label, kind: "unknown" };
    if (w.stale) {
      const v = w.ageMinutes === void 0 ? void 0 : vi(w.ageMinutes);
      return { id: "noData", label: o.noData(m, v), color: g.label, kind: "unknown" };
    }
  }
  const a = e.temperature.value, l = e.humidity.value, d = n.hasCo2 ? e.co2.value : Number.NEGATIVE_INFINITY;
  if ((n.hasPm25 ? e.pm25.value : Number.NEGATIVE_INFINITY) >= s.pm25_critical)
    return { id: "polluted", label: o.status.polluted, color: g.alert, kind: "critical", cause: "pm25" };
  if (d >= s.co2_critical)
    return { id: "veryStuffy", label: o.status.veryStuffy, color: g.alert, kind: "critical", cause: "co2" };
  if (d >= s.co2_warning)
    return { id: "stuffy", label: o.status.stuffy, color: g.warning, kind: "warning", cause: "co2" };
  if (l > s.humidity_max)
    return { id: "humid", label: o.status.humid, color: g.warning, kind: "warning", cause: "humidity" };
  if (l < s.humidity_min)
    return { id: "dry", label: o.status.dry, color: g.warning, kind: "warning", cause: "humidity" };
  const h = t ? s.summer_min : s.winter_min, p = t ? s.summer_max : s.winter_max;
  return a > p ? { id: "warm", label: o.status.warm, color: g.warning, kind: "warning", cause: "temperature" } : a < h ? { id: "cold", label: o.status.cold, color: g.cold, kind: "warning", cause: "temperature" } : { id: "comfortable", label: o.status.comfortable, color: g.label, kind: "normal" };
}
function He(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string").map((t) => t.toLowerCase()) : [];
}
function j(e) {
  return e === "" || e === "unknown" || e === "unavailable" || e === "none";
}
function Z(e) {
  if (e == null || e === "")
    return;
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) && t >= 0 && t <= 100 ? t : void 0;
}
function gi(e, t) {
  return e === void 0 || e <= 0 ? 0 : e >= t.heating_waves_3 ? 3 : e >= t.heating_waves_2 ? 2 : 1;
}
function mn(e) {
  const t = /* @__PURE__ */ new Set(), i = (n) => {
    n && t.add(n);
  };
  i(e.houseModeEntity), i(e.outside?.temperature), i(e.outside?.minimum), i(e.outside?.maximum), i(e.outside?.rain_probability), i(e.outside?.pm25);
  for (const n of e.rooms)
    i(n.temperature), i(n.humidity), i(n.carbon_dioxide), i(n.pm25), n.windows.forEach((o) => i(o.entity)), i(n.cover), i(n.heating?.climate), i(n.heating?.overlay), i(n.heating?.target), i(n.heating?.intensity), i(n.air_conditioner);
  return t;
}
function fn(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
function gn(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  const i = Object.keys(e), n = Object.keys(t);
  return i.length === n.length && i.every((o) => Object.hasOwn(t, o) && e[o] === t[o]);
}
function vi(e) {
  return e < 60 ? `${Math.max(1, Math.round(e))} min` : e < 2880 ? `${Math.floor(e / 60)} h` : `${Math.floor(e / 1440)} d`;
}
function ze(e, t) {
  const i = (e ?? []).filter((o) => o !== void 0);
  if (i.length < 2)
    return;
  const n = i[i.length - 1] - i[0];
  return n >= t / 2 ? "rising" : n <= -t / 2 ? "falling" : "stable";
}
function Ne(e) {
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
function vn(e, t) {
  const i = Math.max(0, Math.floor(e));
  if (i < 1)
    return t.duration.lessThanMinute;
  if (i < 60)
    return t.duration.minute(i);
  if (i < 1440) {
    const [r, a] = [Math.floor(i / 60), i % 60], l = t.duration.hour(r);
    return a === 0 ? l : `${l} ${t.duration.minute(a)}`;
  }
  const [n, o] = [Math.floor(i / 1440), Math.floor(i % 1440 / 60)], s = t.duration.day(n);
  return o === 0 ? s : `${s} ${t.duration.hour(o)}`;
}
function Re(e, t) {
  const i = Math.max(1, Math.round(e));
  return i % 60 === 0 ? t.period.hour(i / 60) : t.period.minute(i);
}
function $n(e, t) {
  return e.label ?? t.cover.presetName[e.icon];
}
function Ie(e, t) {
  if (e.description !== void 0)
    return e.description;
  const i = ui[e.icon];
  return e.label === void 0 && i.position === e.position && i.tilt === e.tilt ? t.cover.presetDescription[e.icon] : t.cover.position(Math.round(e.position), Math.round(e.tilt));
}
function wn(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.rooms)
    for (const n of [i.temperature, i.humidity, i.carbon_dioxide, i.pm25])
      n && t.add(n);
  return [...t];
}
const bn = "input_select.house_mode", yn = {
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
}, kn = {
  minutes: 120,
  samples: 12,
  temperature_step: 1,
  co2_step: 100,
  pm25_step: 5
}, _n = {
  hours: 24,
  night_start: 22,
  night_end: 6,
  min_temperature_span: 1.5
}, Yt = {
  script: "script.zaluzie_posun",
  tolerance: 5,
  stall_seconds: 5
}, xn = te.map((e) => ({ icon: e, ...ui[e] })), Fe = { winter: "Zima", summer: "Léto" }, Ue = ["auto", "dark", "light"], je = ["auto", ...pn], Be = 3, Sn = {
  loznice: "bedroom",
  pracovna: "office",
  maxik: "kids",
  mikulas: "kids",
  obyvak: "living",
  "obyvaci pokoj": "living"
}, Mn = [
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
], Tn = ["climate", "overlay", "target", "intensity"], We = ["temperature", "minimum", "maximum", "rain_probability", "pm25"], Cn = ["name", "position", "tilt", "icon", "description"], An = ["entity", "name"];
function rt(e) {
  return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function S(e) {
  throw new Error(`Klima Dashboard: ${e}`);
}
function xt(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function et(e, t, i) {
  for (const n of Object.keys(e))
    t.includes(n) || S(`${i}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function q(e, t) {
  return e == null ? {} : (xt(e) || S(`"${t}" must be a mapping of keys.`), e);
}
function z(e, t) {
  if (e != null)
    return (typeof e != "string" || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(e.trim())) && S(`${t} must be an entity ID such as sensor.loznice_teplota.`), e.trim();
}
function ct(e, t) {
  if (e != null)
    return (typeof e != "string" || !e.trim()) && S(`${t} must be a non-empty text.`), e.trim();
}
function ft(e, t, i, n = {}) {
  et(e, Object.keys(t), i);
  const o = { ...t };
  for (const [s, r] of Object.entries(e)) {
    if (r === null)
      continue;
    (typeof r != "number" || !Number.isFinite(r)) && S(`${i}.${s} must be a number.`);
    const a = n[s];
    if (a) {
      const [l, d, c] = a;
      (r < l || r > d || c && !Number.isInteger(r)) && S(`${i}.${s} must be ${c ? "a whole number " : ""}from ${l} to ${d}.`);
    }
    o[s] = r;
  }
  return o;
}
function $i(e, t) {
  const i = [
    ["humidity_min", "humidity_max", !0],
    ["co2_warning", "co2_critical", !0],
    ["pm25_warning", "pm25_critical", !0],
    ["winter_min", "winter_max", !1],
    ["summer_min", "summer_max", !1],
    ["heating_waves_2", "heating_waves_3", !0]
  ];
  for (const [n, o, s] of i)
    (s ? e[n] >= e[o] : e[n] > e[o]) && S(`${t}: ${n} (${e[n]}) must be ${s ? "below" : "at most"} ${o} (${e[o]}).`);
  e.stale_minutes <= 0 && S(`${t}.stale_minutes must be greater than 0.`), (e.heating_waves_2 < 1 || e.heating_waves_3 > 100) && S(`${t}: heating_waves_2 and heating_waves_3 must be from 1 to 100 %.`);
}
function En(e, t) {
  return e > 50 ? "open" : t > 50 ? "shade" : "dark";
}
function ee(e, t) {
  return (!Array.isArray(e) || e.length === 0 || e.length > Be) && S(`${t} must be a list of 1 to ${Be} presets.`), e.map((i, n) => {
    const o = `${t}[${n + 1}]`;
    xt(i) || S(`${o} must have a position and a tilt.`), et(i, Cn, o);
    const s = ct(i.name, `${o}.name`), r = (h) => {
      const p = i[h];
      return (typeof p != "number" || !Number.isFinite(p) || p < 0 || p > 100) && S(`${o}.${h} must be a number from 0 to 100.`), p;
    }, a = r("position"), l = r("tilt");
    let d = En(a, l);
    i.icon != null && (te.includes(i.icon) || S(`${o}.icon must be one of ${te.join(", ")}.`), d = i.icon);
    const c = ct(i.description, `${o}.description`);
    return { id: `p${n}`, icon: d, label: s, description: c, position: a, tilt: l };
  });
}
function On(e, t) {
  const i = e.window;
  if (i == null)
    return [];
  const n = Array.isArray(i) ? i : [i];
  n.length === 0 && S(`${t}.window must not be an empty list.`);
  const o = n.map((r, a) => {
    const l = `${t}.window${Array.isArray(i) ? `[${a + 1}]` : ""}`;
    if (xt(r)) {
      et(r, An, l);
      const c = z(r.entity, `${l}.entity`);
      return c || S(`${l}.entity is required.`), { entity: c, name: ct(r.name, `${l}.name`) };
    }
    const d = z(r, l);
    return d || S(`${l} must be an entity ID.`), { entity: d };
  }), s = /* @__PURE__ */ new Set();
  for (const r of o)
    s.has(r.entity) && S(`${t}.window lists ${r.entity} twice.`), s.add(r.entity);
  return o;
}
function Ke(e, t) {
  return e === !1 ? { present: !1 } : { entity: z(e, t), present: !0 };
}
function Pn(e, t) {
  e.image != null && e.scene != null && S(`${t}: use either image or scene (older name), not both.`);
  const i = e.image != null ? "image" : "scene", n = e.image ?? e.scene;
  if (n == null) {
    const s = Sn[rt(e.name)];
    return s ? { kind: "scene", scene: s } : void 0;
  }
  (typeof n != "string" || !n.trim()) && S(`${t}.${i} must be ${[...Wt, Kt].join(", ")} or the address of an image.`);
  const o = n.trim();
  if (o !== Kt) {
    if (Wt.includes(o))
      return { kind: "scene", scene: o };
    if (i === "image" && /^(\/|https?:\/\/|data:image\/)/i.test(o))
      return { kind: "url", url: o };
    S(
      `${t}.${i} must be one of ${[...Wt, Kt].join(", ")}${i === "image" ? " or an image address starting with /, http:// or https://" : ""}.`
    );
  }
}
function Dn(e, t) {
  const i = ct(e, `${t}.link`);
  return i !== void 0 && !/^(\/|https?:\/\/)/i.test(i) && S(`${t}.link must be a Home Assistant path (/lovelace/…) or a web address (https://…).`), i;
}
function Ln(e, t, i) {
  xt(e) || S(`room ${t + 1} must be a mapping with at least a name.`);
  const n = typeof e.name == "string" ? e.name.trim() : "";
  n || S(`room ${t + 1} requires a name.`);
  const o = `room "${n}"`, s = e;
  for (const [h, p] of [
    ["tado", "heating"],
    ["samsung", "air_conditioner"]
  ])
    h in s && S(`${o}: key "${h}" was renamed to "${p}".`);
  "windows" in s && S(`${o}: the key is "window" (one entity or a list of them), not "windows".`), et(s, Mn, o);
  const r = q(e.heating, `${o}.heating`);
  "heating" in r && S(`${o}: key "heating.heating" was renamed to "heating.intensity".`), et(r, Tn, `${o}.heating`);
  const a = e.heating == null ? void 0 : {
    climate: z(r.climate, `${o}.heating.climate`),
    overlay: z(r.overlay, `${o}.heating.overlay`),
    target: z(r.target, `${o}.heating.target`),
    intensity: z(r.intensity, `${o}.heating.intensity`)
  }, l = ft(q(e.thresholds, `${o}.thresholds`), i.thresholds, `${o}.thresholds`);
  $i(l, `${o}.thresholds`);
  const d = Ke(e.carbon_dioxide, `${o}.carbon_dioxide`), c = Ke(e.pm25, `${o}.pm25`);
  return {
    name: n,
    temperature: z(e.temperature, `${o}.temperature`),
    humidity: z(e.humidity, `${o}.humidity`),
    carbon_dioxide: d.entity,
    hasCo2: d.present,
    pm25: c.entity,
    hasPm25: c.present,
    windows: On(e, o),
    cover: z(e.cover, `${o}.cover`),
    presets: e.cover_presets == null ? i.presets : ee(e.cover_presets, `${o}.cover_presets`),
    thresholds: l,
    heating: a,
    air_conditioner: z(e.air_conditioner, `${o}.air_conditioner`),
    image: Pn(e, o),
    link: Dn(e.link, o)
  };
}
function Hn(e) {
  (!xt(e) || !Array.isArray(e.rooms) || e.rooms.length === 0) && S("the configuration requires a non-empty rooms list."), e.title != null && typeof e.title != "string" && S("title must be a text (an empty text leaves the heading out).");
  const t = e.theme ?? "auto";
  Ue.includes(t) || S(`theme must be one of ${Ue.join(", ")}.`);
  const i = e.language ?? "auto";
  je.includes(i) || S(`language must be one of ${je.join(", ")}.`);
  const n = z(e.house_mode_entity, "house_mode_entity") ?? bn, o = q(e.house_modes, "house_modes");
  et(o, ["winter", "summer"], "house_modes");
  const s = {
    winter: ct(o.winter, "house_modes.winter") ?? Fe.winter,
    summer: ct(o.summer, "house_modes.summer") ?? Fe.summer
  };
  rt(s.winter) === rt(s.summer) && S("house_modes.winter and house_modes.summer must differ.");
  const r = e.outside == null ? void 0 : q(e.outside, "outside");
  if (r) {
    et(r, We, "outside");
    for (const _ of We)
      z(r[_], `outside.${_}`);
  }
  const a = ft(q(e.thresholds, "thresholds"), yn, "thresholds");
  $i(a, "thresholds");
  const l = ft(q(e.trends, "trends"), kn, "trends", {
    minutes: [10, 1440, "integer"],
    samples: [2, 120, "integer"],
    temperature_step: [0.1, 10],
    co2_step: [1, 1e3],
    pm25_step: [0.5, 100]
  }), d = ft(q(e.history, "history"), _n, "history", {
    hours: [1, 168, "integer"],
    night_start: [0, 23, "integer"],
    night_end: [0, 23, "integer"],
    min_temperature_span: [0.5, 20]
  }), c = { ...q(e.covers, "covers") }, h = c.presets;
  delete c.presets;
  const p = c.script;
  delete c.script;
  const m = {
    ...ft(c, { tolerance: Yt.tolerance, stall_seconds: Yt.stall_seconds }, "covers", {
      tolerance: [0, 25],
      stall_seconds: [1, 120]
    }),
    script: Yt.script
  };
  p != null && ((typeof p != "string" || !/^script\.[a-z0-9_]+$/.test(p.trim())) && S("covers.script must be a script entity such as script.zaluzie_posun."), m.script = p.trim());
  const w = h == null ? ee(xn, "covers.presets") : ee(h, "covers.presets"), v = e.rooms.map((_, T) => Ln(_, T, { thresholds: a, presets: w })), k = /* @__PURE__ */ new Set();
  for (const _ of v)
    k.has(_.name) && S(`room name "${_.name}" is used twice; room names must be unique.`), k.add(_.name);
  return {
    // Without a title the heading is "Domov" in the card language (i18n.ts).
    title: e.title ?? void 0,
    theme: t,
    language: i,
    houseModeEntity: n,
    houseModes: s,
    outside: r,
    thresholds: a,
    trends: l,
    history: d,
    covers: m,
    rooms: v
  };
}
const it = 5, Ut = 25, kt = [15, 30, 45, 60, 90, 120, 180, 240, 360, 480], ue = kt.length, ot = kt.length + 1;
function wi(e) {
  return e === "boost" ? 1 : e === "off" ? ot : ue;
}
function qe(e, t, i) {
  const n = _i(i);
  if (n === void 0)
    return;
  const o = n === "heat" ? "manual" : n === "auto" ? "plan" : n, s = yi(bi(i)), r = at(i?.attributes.temperature), a = o === "manual" && r !== void 0 && r >= s.min && r <= s.max;
  return {
    room: e,
    entityId: t,
    mode: o,
    temperature: ki(a ? r : 21, s),
    duration: wi(o)
  };
}
function at(e) {
  const t = typeof e == "string" ? Number.parseFloat(e) : e;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function bi(e) {
  const t = at(e?.attributes.target_temp_step), i = at(e?.attributes.min_temp) ?? it, n = at(e?.attributes.max_temp) ?? 25, o = t !== void 0 && t > 0 ? t : 0.5;
  return n > i ? { min: i, max: n, step: o } : { min: it, max: 25, step: o };
}
function yi(e) {
  return { ...e, min: Math.max(e.min, it) + e.step };
}
function ki(e, t) {
  const i = Math.round((e - t.min) / t.step) * t.step + t.min;
  return Math.min(t.max, Math.max(t.min, Math.round(i * 100) / 100));
}
function _i(e) {
  const t = e?.state.toLowerCase();
  if (t === "off")
    return "off";
  if (t === "auto")
    return "auto";
  if (t === "heat") {
    const i = at(e?.attributes.temperature);
    return i !== void 0 && i <= it ? "off" : i === Ut ? "boost" : "heat";
  }
}
function xi(e, t, i) {
  const n = e?.toLowerCase(), o = t?.toLowerCase();
  if (n === "off")
    return "off";
  const a = (n === "auto" ? "schedule" : n === "heat" ? "manual" : void 0) ?? (o === "off" ? "off" : o === "schedule" || o === "manual" ? o : void 0);
  return a === "manual" && i !== void 0 && i <= it ? "off" : a;
}
function zn(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${String(t).padStart(2, "0")}:${String(i).padStart(2, "0")}:00`;
}
function Si(e) {
  return e >= 0 && e < kt.length ? kt[e] : void 0;
}
function Nn(e, t, i) {
  if (t.mode === "plan")
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "auto" } };
  const n = Si(t.duration);
  if (t.mode === "off" && (t.duration === ot || !i))
    return { domain: "climate", service: "set_hvac_mode", data: { entity_id: e, hvac_mode: "off" } };
  if (!i)
    return t.mode === "manual" ? { domain: "climate", service: "set_temperature", data: { entity_id: e, temperature: t.temperature } } : void 0;
  const o = t.mode === "boost" ? Ut : t.mode === "off" ? it : t.temperature, s = { entity_id: e, temperature: o };
  return n !== void 0 ? s.time_period = zn(n) : s.overlay = t.duration === ue ? "next_time_block" : "manual", { domain: "tado_ce", service: "set_climate_timer", data: s };
}
function Vt(e) {
  const t = Math.max(1, Math.round(e)), i = Math.floor(t / 60), n = t % 60;
  return i === 0 ? `${n} min` : n === 0 ? `${i} h` : `${i} h ${n} min`;
}
const jt = 36e5;
function Rn(e) {
  if (e == null)
    return;
  if (typeof e == "number")
    return Number.isFinite(e) ? e < 1e11 ? e * 1e3 : e : void 0;
  const t = Date.parse(e);
  return Number.isNaN(t) ? void 0 : t;
}
function In(e, t) {
  const i = {};
  for (const [n, o] of Object.entries(e ?? {})) {
    if (!Array.isArray(o))
      continue;
    const s = [];
    o.forEach((r, a) => {
      const l = r.s ?? r.state, d = Rn(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (a === 0 ? t : void 0);
      l !== void 0 && d !== void 0 && s.push({ time: Math.max(d, t), state: l });
    }), s.sort((r, a) => r.time - a.time), i[n] = s;
  }
  return i;
}
async function Ye(e, t, i, n) {
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
  return In(o, i);
}
function Mi(e, t) {
  let i;
  for (const n of e ?? []) {
    if (n.time > t)
      break;
    i = n.state;
  }
  return i;
}
function ie(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
function Fn(e, t, i, n) {
  const o = (i - t) / n, s = (e ?? []).filter((r) => ie(r.state) !== void 0);
  return Array.from(
    { length: n },
    (r, a) => ie(Mi(s, t + (a + 1) * o))
  );
}
function Ve(e, t, i) {
  const n = [];
  for (const s of e ?? []) {
    const r = ie(s.state);
    r !== void 0 && s.time <= i && n.push({ t: Math.max(s.time, t), v: r });
  }
  const o = n[n.length - 1];
  return o && o.t < i && n.push({ t: i, v: o.v }), n;
}
function ut(e, t, i, n) {
  const o = /* @__PURE__ */ new Set([t, i]);
  for (const a of e)
    for (const l of a ?? [])
      l.time > t && l.time < i && o.add(l.time);
  const s = [...o].sort((a, l) => a - l), r = [];
  for (let a = 0; a < s.length - 1; a += 1) {
    const l = n(e.map((c) => Mi(c, s[a])));
    if (l === void 0)
      continue;
    const d = r[r.length - 1];
    d && d.value === l && d.end === s[a] ? d.end = s[a + 1] : r.push({ start: s[a], end: s[a + 1], value: l });
  }
  return r;
}
function Gt(e, t) {
  let i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
  for (const r of e)
    for (const a of r ?? [])
      a !== void 0 && Number.isFinite(a) && (i = Math.min(i, a), n = Math.max(n, a));
  if (!Number.isFinite(i) || !Number.isFinite(n) || t <= 0)
    return;
  let o = Math.floor(i / t) * t, s = Math.ceil(n / t) * t;
  return s - o < t && (o -= t, s += t), { min: o, max: s };
}
function Un(e, t) {
  const i = t.max - t.min;
  return e.map(
    (n) => n === void 0 || i <= 0 ? void 0 : Math.min(1, Math.max(0, (n - t.min) / i))
  );
}
function Ge() {
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
  ].map(([t, i, n]) => $`<circle cx=${t} cy=${i} r=${n}></circle>`)}
    </svg>
  `;
}
function jn(e) {
  const t = (o, s, r, a) => $`<rect x=${o} y=${s} width=${r} height=${a} rx=${a / 2 > 1.2 ? 1.2 : a / 2} fill="currentColor" stroke="none"></rect>`, i = (o) => $`<path d="M27.5 6.7V${o}" stroke-width="1.6"></path>
    <circle cx="27.5" cy=${o + 2.4} r="2" fill="currentColor" stroke="none"></circle>`;
  let n;
  switch (e) {
    case "open":
      n = $`${t(4.5, 8.6, 20.5, 2.4)}${t(4.5, 12.2, 20.5, 2)}${i(21)}`;
      break;
    case "shade":
      n = $`<path d="M4.5 11.4h20.5M4.5 16.2h20.5M4.5 21h20.5M4.5 25.8h20.5" stroke-width="1.8"></path>${i(26)}`;
      break;
    default:
      n = $`${t(4.5, 8.8, 20.5, 3.8)}${t(4.5, 13.6, 20.5, 3.8)}${t(4.5, 18.4, 20.5, 3.8)}${t(4.5, 23.2, 20.5, 3.8)}${i(26)}`;
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
function Bn() {
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
function Ti(e, t) {
  return $`${[0, 1, 2].map(
    (i) => $`<path
      d="M${6 + 6 * i} 20q-3-2.4 0-4.8t0-4.8t0-4.8"
      style=${`stroke: ${i < e ? g.warning : g.off}`}
      stroke-dasharray=${t ? "1.6 2.6" : f}
    ></path>`
  )}`;
}
function ne(e, t) {
  return u`
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      ${Ti(e, t)}
    </svg>
  `;
}
function Ci(e) {
  let t;
  const i = $`<path d="M12 3v18M9.9 5.1 12 3l2.1 2.1M9.9 18.9 12 21l2.1-2.1"></path>`, n = $`<path d="M12 12c0-5 2.4-8.1 5.8-6.8 1.2 3.2-1.3 6.1-5.8 6.8z"></path>`;
  switch (e) {
    case "cool":
    case "wind_free":
      t = $`${i}
        <g transform="rotate(60 12 12)">${i}</g>
        <g transform="rotate(120 12 12)">${i}</g>`;
      break;
    case "dry":
      t = $`<path d="M12 3.5S5.5 10.2 5.5 14.6a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5z"></path>`;
      break;
    case "fan":
      t = $`${n}<g transform="rotate(120 12 12)">${n}</g>
        <g transform="rotate(240 12 12)">${n}</g>`;
      break;
    case "heat":
      t = $`<circle cx="12" cy="12" r="4"></circle>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(
        (o) => $`<path d="M12 3v2.5" transform=${`rotate(${45 * o} 12 12)`}></path>`
      )}`;
      break;
    case "auto":
      t = $`<circle cx="12" cy="12" r="9"></circle>
        <path d="M8.3 16.3 12 7.7l3.7 8.6M9.7 13.6h4.6"></path>`;
      break;
    default:
      t = $`<rect x="3" y="5" width="18" height="8" rx="2"></rect>
        <path d="M7 9.5h10M8 16.5v2.5M12 16.5v2.5M16 16.5v2.5"></path>`;
  }
  return t;
}
function Dt(e, t, i) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${t}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${i ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Ci(e)}
    </svg>
  `;
}
function Ai() {
  return $`<rect x="5" y="3.5" width="14" height="17" rx="1.5"></rect><path d="M12 3.5v17M5 12h14"></path>`;
}
function Zt(e, t) {
  return u`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      style=${`stroke: ${e}`}
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray=${t ? "2 2.4" : f}
      aria-hidden="true"
    >
      ${Ai()}
    </svg>
  `;
}
function Ze(e) {
  let t;
  switch (e) {
    case "off":
      t = $`<path d="M12 3.5v8M7.2 6.6a7.5 7.5 0 1 0 9.6 0"></path>`;
      break;
    case "auto":
      t = $`<rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M4 10h16M8.5 3v4M15.5 3v4"></path>`;
      break;
    case "heat":
      t = $`<path d="M4 8h7.5M16.5 8H20M4 16h3.5M12.5 16H20"></path>
        <circle cx="14" cy="8" r="2.5"></circle><circle cx="10" cy="16" r="2.5"></circle>`;
      break;
    default:
      t = $`<path d="M13.2 2.5 5.5 13.2h5.6L10.2 21.5l8.3-11.2h-5.7z"></path>`;
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
const H = 4, Wn = 32, X = 6, J = 150, gt = X + J, Mt = 9, Ei = gt + 10, Lt = 12, Kn = 12, Xe = 34, Je = "history-icon-fade", Oi = 14, qn = 7, Yn = (e) => 2 + (e.windows ? 1 : 0), Pi = (e) => Ei + Yn(e) * Lt, Vn = (e) => Pi(e) + Oi + qn, Qe = 11, Gn = [0, 0.24, 0.44, 0.68], ti = "history-under-temperature", ei = "history-plot", me = {
  schedule: g.plan,
  manual: g.warning,
  off: g.closed
}, N = (e) => `fill: ${e}`, B = (e) => `stroke: ${e}`;
function Xt(e, t, i) {
  return xi(t, e, i);
}
function Tt(e) {
  if (e === void 0)
    return;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : void 0;
}
const Zn = 0.05;
function Xn(e, t) {
  const i = e.filter((a) => Number.isFinite(a));
  let n = 19, o = 23;
  if (i.length > 0) {
    if (n = Math.min(...i), o = Math.max(...i), o - n < t) {
      const l = (n + o) / 2;
      n = l - t / 2, o = l + t / 2;
    }
    const a = (o - n) * Zn;
    n -= a, o += a;
  }
  const s = o - n, r = s <= 3 ? 0.5 : s <= 6 ? 1 : s <= 12 ? 2 : 5;
  return { min: n, max: o, step: r };
}
function Jn(e, t, i) {
  const n = [], o = i / 1e3;
  for (let s = Math.ceil(e / i - o) * i; s <= t + o; s += i)
    n.push(Math.round(s * 100) / 100);
  return n;
}
function Qn(e, t, i, n) {
  const o = (M) => M ? e[M] : void 0, { startMs: s, endMs: r } = i, a = o(t.heating?.overlay), l = o(t.heating?.climate), d = Ve(o(t.temperature), s, r), c = Ve(o(t.humidity), s, r), h = ut(
    [a, l, o(t.heating?.target)],
    s,
    r,
    ([M, D, R]) => Xt(M, D, Tt(R))
  ), p = ut(
    [a, l, o(t.heating?.intensity), o(t.heating?.target)],
    s,
    r,
    ([M, D, R, I]) => {
      const F = Xt(M, D, Tt(I)), U = gi(Tt(R), t.thresholds);
      return F === void 0 || F === "off" || U === 0 ? void 0 : String(U);
    }
  ), m = ut(
    [a, l, o(t.heating?.target)],
    s,
    r,
    ([M, D, R]) => {
      const I = Tt(R), F = Xt(M, D, I);
      if (!(I === void 0 || I <= it))
        return F === "schedule" || F === "manual" ? String(I) : void 0;
    }
  ), w = t.windows.length > 0 ? ut(
    t.windows.map((M) => o(M.entity)),
    s,
    r,
    (M) => M.some((D) => D?.toLowerCase() === "on") ? "open" : void 0
  ) : void 0, v = ut([o(t.air_conditioner)], s, r, ([M]) => {
    const D = fi(M);
    return D === "unknown" ? void 0 : D;
  }), k = d.map((M) => M.v), { min: _, max: T, step: x } = Xn(
    k.length > 0 ? k : m.map((M) => Number(M.value)),
    n.min_temperature_span
  ), b = c.map((M) => M.v);
  return {
    range: i,
    temperature: d,
    humidity: c,
    heating: h,
    intensity: p,
    target: m,
    climate: v,
    windows: w,
    tempMin: _,
    tempMax: T,
    tempStep: x,
    humidityMin: b.length > 0 ? Math.min(...b) : void 0,
    humidityMax: b.length > 0 ? Math.max(...b) : void 0,
    night: [n.night_start, n.night_end]
  };
}
function to(e) {
  return e.temperature.length > 0 || e.humidity.length > 0 || e.heating.length > 0;
}
function st(e) {
  return e - H - Wn;
}
function eo(e, t, i) {
  return H + (e - t.startMs) / (t.endMs - t.startMs) * st(i);
}
function io(e, t, i) {
  const n = Math.min(1, Math.max(0, (e - H) / st(t)));
  return i.startMs + n * (i.endMs - i.startMs);
}
function oe(e, t) {
  let i;
  for (const n of e) {
    if (n.t > t)
      break;
    i = n.v;
  }
  return i;
}
function Ct(e, t, i) {
  return e.find(
    (n) => n.start <= t && (t < n.end || t === i && n.end === i)
  )?.value;
}
function no(e, [t, i]) {
  const n = [];
  if (t === i)
    return n;
  const o = new Date(e.startMs);
  for (o.setHours(0, 0, 0, 0), o.setDate(o.getDate() - 1); o.getTime() < e.endMs; ) {
    const s = new Date(o);
    s.setHours(t, 0, 0, 0);
    const r = new Date(o);
    i < t && r.setDate(r.getDate() + 1), r.setHours(i, 0, 0, 0);
    const a = Math.max(s.getTime(), e.startMs), l = Math.min(r.getTime(), e.endMs);
    l > a && n.push([a, l]), o.setDate(o.getDate() + 1);
  }
  return n;
}
function Di(e) {
  const t = (e.endMs - e.startMs) / jt;
  return t <= 12 ? 3 : t <= 24 ? 6 : t <= 48 ? 12 : t <= 96 ? 24 : 48;
}
function oo(e) {
  const t = Di(e), i = [], n = new Date(e.startMs);
  if (n.setMinutes(0, 0, 0), t >= 24)
    for (n.setHours(0); n.getTime() < e.startMs; )
      n.setDate(n.getDate() + 1);
  else
    n.setHours(Math.ceil(n.getHours() / t) * t);
  for (; n.getTime() <= e.endMs; )
    n.getTime() >= e.startMs && i.push(n.getTime()), t >= 24 ? n.setDate(n.getDate() + t / 24) : n.setHours(n.getHours() + t);
  return i;
}
function so(e, t, i) {
  return e - 16 < t ? { x: t, anchor: "start" } : e + 16 > i ? { x: i, anchor: "end" } : { x: e, anchor: "middle" };
}
function ro(e) {
  return e === "off" ? me.off : Ft[e] ?? g.off;
}
function ao(e, t, i) {
  return Di(t) >= 24 ? i.day(e) : i.hour(e);
}
function lo(e, t, i) {
  const { t: n } = i, o = t ?? e.range.endMs, s = oe(e.temperature, o), r = oe(e.humidity, o), a = Ct(e.heating, o, e.range.endMs), l = Number(Ct(e.intensity, o, e.range.endMs) ?? 0), d = Ct(e.target, o, e.range.endMs), c = Ct(e.climate, o, e.range.endMs);
  let h = n.chart.now;
  if (t !== void 0) {
    const v = (T) => {
      const x = new Date(T);
      return x.setHours(12, 0, 0, 0), x.getTime();
    }, k = Math.round((v(e.range.endMs) - v(t)) / (24 * jt));
    h = `${k === 0 ? "" : k === 1 ? `${n.chart.yesterday} ` : `${i.day(t)} `}${i.time(t)}`;
  }
  const p = a === void 0 ? "––" : `${n.heatingMode[a]}${a !== "off" && d !== void 0 ? ` · ${i.half(Number(d))} °C` : ""}`, m = c ? n.climateMode[c] : "––", w = c ? Ft[c] : g.off;
  return u`
    <div class="readout" aria-live="polite">
      <div class="readout-main">
        <span class="readout-time">${h}</span>
        <span class="readout-temp">${s === void 0 ? "––" : `${i.one(s)} °C`}</span>
        <span class="readout-hum">${r === void 0 ? "" : i.percent(Math.round(r))}</span>
      </div>
      <div class="readout-systems">
        <span class="readout-system" style=${`color: ${a === "off" ? g.off : a ? me[a] : g.label}`}>
          <span class="readout-icon">${ne(a && a !== "off" ? l : 0, a === void 0)}</span>
          ${n.system.heating} ${p}
        </span>
        <span class="readout-system" style=${`color: ${w}`}>
          <span class="readout-icon">${Dt(c ?? "off", w, c === void 0)}</span>
          ${n.system.climate} ${m}
        </span>
      </div>
    </div>
  `;
}
function co(e, t, i, n, o = !1) {
  const { range: s } = e, r = (y) => eo(y, s, t), a = (y) => gt - (y - e.tempMin) / (e.tempMax - e.tempMin) * J, l = (e.humidityMin ?? 0) - 3, d = Math.max((e.humidityMax ?? 100) + 3, l + 12), c = (y) => gt - (y - l) / (d - l) * J, h = H + st(t), p = (y, P) => y.map((A, L) => `${L === 0 ? "M" : "L"}${r(A.t).toFixed(1)} ${P(A.v).toFixed(1)}`).join(" "), m = p(e.temperature, a), w = e.temperature[0], v = e.temperature[e.temperature.length - 1], k = w && v ? `${m} L${r(v.t).toFixed(1)} ${gt} L${r(w.t).toFixed(1)} ${gt} Z` : "";
  let _ = "";
  e.target.forEach((y, P) => {
    const A = a(Number(y.value)).toFixed(1), L = e.target[P - 1];
    _ += L && L.end === y.start ? ` L${r(y.start).toFixed(1)} ${A}` : ` M${r(y.start).toFixed(1)} ${A}`, _ += ` L${r(y.end).toFixed(1)} ${A}`;
  });
  const T = Jn(e.tempMin, e.tempMax, e.tempStep), x = (y, P, A) => y.map((L) => {
    const be = r(L.start);
    return $`<rect x=${be.toFixed(1)} y=${P} width=${Math.max(r(L.end) - be, 0.8).toFixed(1)}
        height=${Mt} rx="2" style=${N(A(L.value))}></rect>`;
  }), b = o ? ["climate", "heating"] : ["heating", "climate"];
  e.windows && b.push("windows");
  const M = Pi(e), D = M + Oi, R = Vn(e), I = (y) => y === "heating" ? $`${Ti(3, !1)}` : y === "climate" ? $`<g style=${B(g.off)}>${Ci("off")}</g>` : $`<g style=${B("var(--kd-sky)")}>${Ai()}</g>`, F = (y, P) => y === "heating" ? $`${x(e.heating, P, (A) => me[A] ?? g.off)}` : y === "climate" ? $`${x(e.climate, P, (A) => ro(A))}` : $`${(e.windows ?? []).map((A) => {
    const L = r(A.start);
    return $`<rect class="window-open" x=${L.toFixed(1)} y=${P} width=${Math.max(r(A.end) - L, 1.5).toFixed(1)}
              height=${Mt} rx="2" style=${N("var(--kd-sky)")}></rect>`;
  })}`, U = i === void 0 ? void 0 : r(i), K = i === void 0 ? void 0 : oe(e.temperature, i), Hi = no(s, e.night);
  return u`
    ${lo(e, i, n)}
    <svg
      class="chart"
      viewBox="0 0 ${t} ${R}"
      width=${t}
      height=${R}
      aria-hidden="true"
    >
      <defs>
        <clipPath id=${ti}><path d=${k}></path></clipPath>
        <linearGradient id=${Je} gradientUnits="userSpaceOnUse" x1=${H} x2=${H + Xe} y1="0" y2="0">
          <stop offset="0" style="stop-color: var(--kd-sheet-bg); stop-opacity: 1"></stop>
          <stop offset="0.55" style="stop-color: var(--kd-sheet-bg); stop-opacity: 0.92"></stop>
          <stop offset="1" style="stop-color: var(--kd-sheet-bg); stop-opacity: 0"></stop>
        </linearGradient>
        <clipPath id=${ei}>
          <rect x=${H} y=${X} width=${st(t)} height=${J}></rect>
        </clipPath>
      </defs>
      <rect x=${H} y=${X} width=${st(t)} height=${J} rx="8" style=${N("var(--kd-fill)")}></rect>
      ${Hi.map(
    ([y, P]) => $`<rect class="night" x=${r(y).toFixed(1)} y=${X} width=${(r(P) - r(y)).toFixed(1)}
          height=${J} style=${N("var(--kd-night)")}></rect>`
  )}
      ${T.map(
    (y) => $`<line x1=${H} x2=${h} y1=${a(y).toFixed(1)} y2=${a(y).toFixed(1)}
            style=${B("var(--kd-grid)")} stroke-width="1"></line>
          <text x=${h + 6} y=${(a(y) + 4).toFixed(1)} style=${N(g.label)} font-size=${Qe}>${n.tick(y)}°</text>`
  )}
      ${k ? $`<path d=${k} style=${N("var(--kd-area)")}></path>` : f}
      <g clip-path=${`url(#${ti})`}>
        ${e.intensity.map(
    (y) => $`<rect x=${r(y.start).toFixed(1)} y=${X}
            width=${Math.max(r(y.end) - r(y.start), 0.8).toFixed(1)} height=${J}
            style=${N(g.warning)} opacity=${Gn[Number(y.value)] ?? 0}></rect>`
  )}
      </g>
      ${e.humidity.length > 0 ? $`<path d=${p(e.humidity, c)} fill="none" style=${B(g.humidityLine)}
            stroke-width="1.5" stroke-dasharray="4 3" stroke-linejoin="round" opacity="0.85"></path>` : f}
      ${_ ? $`<path d=${_} fill="none" style=${B(g.plan)} stroke-width="1.4"
            stroke-dasharray="3 3" opacity="0.6" clip-path=${`url(#${ei})`}></path>` : f}
      ${m ? $`<path class="temperature-curve" d=${m} fill="none" style=${B(g.white)} stroke-width="2"
            stroke-linejoin="round" stroke-linecap="round"></path>` : f}
      ${v && i === void 0 ? $`<circle cx=${r(v.t).toFixed(1)} cy=${a(v.v).toFixed(1)} r="3.5" style=${N(g.white)}></circle>` : f}

      ${b.map((y, P) => {
    const A = Ei + P * Lt, L = A + (Lt - Mt) / 2;
    return $`<g class=${`strip-row ${y}`}>
          <rect x=${H} y=${L} width=${st(t)} height=${Mt} rx="2" style=${N("var(--kd-fill)")}></rect>
          ${F(y, L)}
          <rect x=${H} y=${A} width=${Xe} height=${Lt} style=${N(`url(#${Je})`)}></rect>
          <g class="strip-icon" transform=${`translate(${H + 1} ${A}) scale(${Kn / 24})`} fill="none"
            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${I(y)}</g>
        </g>`;
  })}

      ${oo(s).map((y) => {
    const P = so(r(y), H, h);
    return $`<line x1=${r(y).toFixed(1)} x2=${r(y).toFixed(1)} y1=${X} y2=${M}
            style=${B("var(--kd-grid-soft)")} stroke-width="1"></line>
          <text class="tick" x=${P.x.toFixed(1)} y=${D} style=${N(g.label)} font-size=${Qe}
            text-anchor=${P.anchor}>${ao(y, s, n)}</text>`;
  })}
      ${U === void 0 ? f : $`<line x1=${U.toFixed(1)} x2=${U.toFixed(1)} y1=${X} y2=${M}
              style=${B(g.white)} stroke-width="1" opacity="0.7"></line>
            ${K === void 0 ? f : $`<circle cx=${U.toFixed(1)} cy=${a(K).toFixed(1)} r="4"
                  style=${`${N(g.white)}; ${B("var(--kd-sheet-bg)")}`} stroke-width="2"></circle>`}`}
    </svg>
  `;
}
const ii = jt / 4;
function ho(e) {
  return `var(--kd-scene-${e})`;
}
function po(e) {
  let t;
  switch (e) {
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
const G = (e, t, i, n) => e === 1 ? t : e >= 2 && e <= 4 ? i : n, uo = {
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
    notOffered: "entita nenabízí",
    commandFailed: "Příkaz se nepodařilo odeslat.",
    /** Ovládání Topení: teplota a doba trvání (Ručně, Boost, Vypnuto). */
    heatControl: {
      temperature: "Teplota",
      fixedTemperature: "Pevná teplota",
      temperatureSlider: "Cílová teplota",
      duration: "Jak dlouho",
      durationSlider: "Doba trvání",
      nextPlan: "Do další změny plánu",
      untilResumed: "Dokud neobnovíte plán",
      until: (e) => `do ${e}`,
      offTarget: "Ochrana proti zamrznutí (5 °C)",
      appliesOnClose: "Použije se po zavření okna",
      remaining: (e) => `Zbývá ${e}`,
      noTimer: "Dobu nelze nastavit: Tado CE nenabízí časovač."
    },
    loading: "Načítám historii…",
    historyFailed: "Historii se nepodařilo načíst.",
    noHistory: (e) => `Za ${e === 1 ? "poslední hodinu" : e >= 2 && e <= 4 ? `poslední ${e} hodiny` : `posledních ${e} hodin`} nejsou k dispozici data.`,
    chart: (e) => `Graf za ${e}. Šipkami vlevo a vpravo procházíte čas, klávesou End se vrátíte na teď.`,
    temperatureDetails: "Detail teploty"
  },
  // Room history chart (Historie a grafy)
  chart: {
    now: "Teď",
    yesterday: "včera"
  },
  // House summary chips (Dashboard Domov, Konflikty)
  summaryChips: {
    rooms: (e) => `${e} ${G(e, "místnost", "místnosti", "místností")}`,
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
    windowsOpen: (e) => `${e} ${G(e, "okno otevřené", "okna otevřená", "oken otevřených")}`,
    windowsSpoken: "Otevřená okna",
    manual: "Ručně",
    boost: "Boost",
    boostSpoken: "Topení v režimu Boost",
    manualSpoken: "Topení ručně",
    heating: (e) => `Topí ${e}`,
    heatingSpoken: "Topí se",
    climate: "Klimatizace",
    climateSpoken: "Klimatizace zapnutá"
  },
  // Durations and periods for screen readers
  duration: {
    lessThanMinute: "méně než minutu",
    minute: (e) => `${e} ${G(e, "minuta", "minuty", "minut")}`,
    hour: (e) => `${e} ${G(e, "hodina", "hodiny", "hodin")}`,
    day: (e) => `${e} ${G(e, "den", "dny", "dní")}`
  },
  /** A period after "za" (accusative): "2 hodiny", "1 hodinu", "24 hodin", "90 minut". */
  period: {
    minute: (e) => `${e} ${G(e, "minutu", "minuty", "minut")}`,
    hour: (e) => `${e} ${G(e, "hodinu", "hodiny", "hodin")}`
  }
}, mt = (e, t, i) => e === 1 ? t : i, mo = {
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
    notOffered: "not offered by the entity",
    commandFailed: "The command could not be sent.",
    heatControl: {
      temperature: "Temperature",
      fixedTemperature: "Fixed temperature",
      temperatureSlider: "Target temperature",
      duration: "For how long",
      durationSlider: "Duration",
      nextPlan: "Until the next schedule change",
      untilResumed: "Until you resume the schedule",
      until: (e) => `until ${e}`,
      offTarget: "Frost protection (5 °C)",
      appliesOnClose: "Applied when you close this window",
      remaining: (e) => `${e} left`,
      noTimer: "The duration cannot be set: Tado CE offers no timer."
    },
    loading: "Loading history…",
    historyFailed: "The history could not be loaded.",
    noHistory: (e) => `No data for ${e === 1 ? "the last hour" : `the last ${e} hours`}.`,
    chart: (e) => `Chart of ${e}. The left and right arrow keys move through time, the End key returns to now.`,
    temperatureDetails: "Temperature details"
  },
  chart: {
    now: "Now",
    yesterday: "yesterday"
  },
  summaryChips: {
    rooms: (e) => `${e} ${mt(e, "room", "rooms")}`,
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
    windowsOpen: (e) => `${e} ${mt(e, "window", "windows")} open`,
    windowsSpoken: "Open windows",
    manual: "Manual",
    boost: "Boost",
    boostSpoken: "Heating in boost",
    manualSpoken: "Heating set manually",
    heating: (e) => `Heating in ${e}`,
    heatingSpoken: "Heating",
    climate: "Air conditioning",
    climateSpoken: "Air conditioning on"
  },
  duration: {
    lessThanMinute: "less than a minute",
    minute: (e) => `${e} ${mt(e, "minute", "minutes")}`,
    hour: (e) => `${e} ${mt(e, "hour", "hours")}`,
    day: (e) => `${e} ${mt(e, "day", "days")}`
  },
  /** A period with its article: "the last 2 hours", "the last hour", "the last 90 minutes". */
  period: {
    minute: (e) => e === 1 ? "the last minute" : `the last ${e} minutes`,
    hour: (e) => e === 1 ? "the last hour" : `the last ${e} hours`
  }
}, At = (e, t, i) => e === 1 ? t : i, fo = {
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
    notOffered: "erbjuds inte av entiteten",
    commandFailed: "Kommandot kunde inte skickas.",
    heatControl: {
      temperature: "Temperatur",
      fixedTemperature: "Fast temperatur",
      temperatureSlider: "Måltemperatur",
      duration: "Hur länge",
      durationSlider: "Varaktighet",
      nextPlan: "Till nästa schemaändring",
      untilResumed: "Tills du återupptar schemat",
      until: (e) => `till ${e}`,
      offTarget: "Frostskydd (5 °C)",
      appliesOnClose: "Tillämpas när du stänger fönstret",
      remaining: (e) => `${e} kvar`,
      noTimer: "Tiden kan inte ställas in: Tado CE erbjuder ingen timer."
    },
    loading: "Läser in historik…",
    historyFailed: "Historiken kunde inte läsas in.",
    noHistory: (e) => `Inga data för ${e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`}.`,
    chart: (e) => `Diagram över ${e}. Vänster- och högerpilen flyttar i tiden, End-tangenten går tillbaka till nu.`,
    temperatureDetails: "Temperaturdetaljer"
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
    windowsOpen: (e) => `${e} fönster ${At(e, "öppet", "öppna")}`,
    windowsSpoken: "Öppna fönster",
    manual: "Manuell",
    boost: "Boost",
    boostSpoken: "Värme i boost",
    manualSpoken: "Värme i manuellt läge",
    heating: (e) => `Värme i ${e}`,
    heatingSpoken: "Värme på",
    climate: "Luftkonditionering",
    climateSpoken: "Luftkonditionering på"
  },
  duration: {
    lessThanMinute: "mindre än en minut",
    minute: (e) => `${e} ${At(e, "minut", "minuter")}`,
    hour: (e) => `${e} ${At(e, "timme", "timmar")}`,
    day: (e) => `${e} ${At(e, "dag", "dagar")}`
  },
  /** A period in its definite form: "de senaste 2 timmarna", "den senaste timmen". */
  period: {
    minute: (e) => e === 1 ? "den senaste minuten" : `de senaste ${e} minuterna`,
    hour: (e) => e === 1 ? "den senaste timmen" : `de senaste ${e} timmarna`
  }
}, go = { cs: uo, en: mo, sv: fo };
function Nt(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function fe(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function vo(e, t) {
  return e === "auto" ? fe(Nt(t)) : e;
}
function $o() {
  return fe(document.documentElement.lang || navigator.language || "");
}
const ni = /* @__PURE__ */ new Map(), wo = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, bo = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), yo = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Jt(e, t) {
  const i = e?.locale?.[t];
  return typeof i == "string" && i !== "" ? i : "language";
}
function se(e, t) {
  const i = Nt(t).replace("_", "-"), n = i !== "" && fe(i) === e ? i : wo[e], o = Jt(t, "number_format"), s = Jt(t, "time_format"), r = Jt(t, "date_format"), a = [e, n, o, s, r].join("|");
  let l = ni.get(a);
  return l || (l = xo(e, n, o, s, r), ni.set(a, l)), l;
}
function ko(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function _o(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const i = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(i).includes("10");
}
function xo(e, t, i, n, o) {
  const s = ko(t), r = go[e], a = i === "system" ? void 0 : i === "none" ? "en-US" : yo[i] ?? s, l = i === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), p = _o(n, s), m = p ? "h12" : "h23", w = new Intl.DateTimeFormat(s, { hour: p ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), v = new Intl.DateTimeFormat(s, p ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), k = o === "system" ? void 0 : s, _ = new Intl.DateTimeFormat(k, { day: "numeric", month: "numeric" }), T = (b) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return _.format(b);
    const M = _.formatToParts(b), D = M.find((K) => K.type === "literal")?.value ?? "/", R = M[M.length - 1], I = R?.type === "literal" ? R.value : "", F = M.find((K) => K.type === "day")?.value ?? "", U = M.find((K) => K.type === "month")?.value ?? "";
    return o === "DMY" ? `${F}${D}${U}${I}` : `${U}${D}${F}${I}`;
  }, x = bo.has(s.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: e,
    locale: s,
    t: r,
    one: (b) => d.format(b),
    half: (b) => c.format(Math.round(b * 2) / 2),
    tick: (b) => c.format(b),
    whole: (b) => h.format(b),
    percent: (b) => `${b}${x}%`,
    time: (b) => w.format(b),
    hour: (b) => v.format(b),
    day: T
  };
}
const So = Ni`
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
      margin: 16px 0 0;
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

    /* Topení: temperature and duration of Ručně / Boost / Vypnuto (slider of the boiler design). */
    .heat-control {
      margin-top: 16px;
      padding: 12px 14px 8px;
      border: 1px solid var(--kd-fill-border);
      border-radius: 16px;
      background: var(--kd-fill);
    }

    .heat-control > * + * {
      margin-top: 12px;
    }

    .slider-head,
    .heat-fixed {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .slider-label {
      color: var(--kd-label);
      font-size: 13px;
    }

    .slider-big {
      font-size: 22px;
      font-variant-numeric: tabular-nums;
      text-align: right;
    }

    .slider-sub {
      color: var(--kd-label);
      font-size: 13px;
      text-align: right;
    }

    .heat-slider {
      --track: var(--kd-slider-track, rgb(120 120 128 / 36%));
      -webkit-appearance: none;
      appearance: none;
      display: block;
      width: 100%;
      height: 44px;
      margin: 0;
      background: transparent;
      cursor: pointer;
      touch-action: pan-y;
    }

    .heat-slider::-webkit-slider-runnable-track {
      height: 14px;
      border-radius: 7px;
      background: linear-gradient(to right, var(--kd-sky) 0%, var(--kd-sky) var(--fill), var(--track) var(--fill), var(--track) 100%);
    }

    .heat-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 42px;
      height: 28px;
      margin-top: -7px;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
    }

    .heat-slider::-moz-range-track {
      height: 14px;
      border-radius: 7px;
      background: var(--track);
    }

    .heat-slider::-moz-range-progress {
      height: 14px;
      border-radius: 7px;
      background: var(--kd-sky);
    }

    .heat-slider::-moz-range-thumb {
      width: 42px;
      height: 28px;
      border: 0;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
    }

    .heat-slider:focus-visible {
      outline: none;
    }

    .heat-slider:focus-visible::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px var(--kd-sheet-bg), 0 0 0 5px var(--kd-text);
    }

    .heat-slider:focus-visible::-moz-range-thumb {
      box-shadow: 0 0 0 3px var(--kd-sheet-bg), 0 0 0 5px var(--kd-text);
    }

    /* Ticks sit between the centres of the thumb at both ends (thumb width 42 px). */
    .slider-ticks {
      display: flex;
      justify-content: space-between;
      margin: -4px 21px 0;
    }

    .slider-ticks span {
      width: 2px;
      height: 6px;
      border-radius: 1px;
      background: var(--kd-label);
      opacity: 0.6;
    }

    .slider-scale {
      display: flex;
      justify-content: space-between;
      margin-top: 2px;
      color: var(--kd-label);
      font-size: 12px;
    }

    .heat-detail {
      margin: 8px 0 0;
      color: var(--kd-label);
      font-size: 13px;
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
`, Mo = " ";
function oi(e) {
  if (!e || j(e.state.toLowerCase()))
    return;
  const t = Number.parseFloat(e.state);
  return Number.isFinite(t) ? t : void 0;
}
function re(e, t) {
  return e === void 0 ? "" : `· ${t.half(e)}${Mo}°C`;
}
function To(e, t, i, n, o, s) {
  const r = s.t.heatingMode, a = e?.state.toLowerCase(), l = t?.state.toLowerCase(), d = l === void 0 || j(l), c = oi(i), h = xi(a, l, c);
  if (h === "off")
    return { label: r.off, color: g.off, active: !1, extra: "", unknown: !1, overlay: "off", waves: 0 };
  if (d || a === void 0 || j(a))
    return { label: "––", color: g.label, active: !1, extra: "", unknown: !0, waves: 0 };
  const p = gi(oi(n), o);
  if (h === "schedule")
    return { label: r.schedule, color: g.plan, active: !0, extra: re(c, s), unknown: !1, overlay: "schedule", waves: p };
  if (h === "manual") {
    const m = c === Ut ? "boost" : "manual";
    return { label: r.manual, color: g.warning, active: !0, extra: re(c, s), unknown: !1, overlay: "manual", override: m, waves: p };
  }
  return { label: t?.state ?? "––", color: g.warning, active: !0, extra: "", unknown: !1, waves: p };
}
function ge(e, t) {
  let i = "unknown", n, o;
  if (e && !j(e.state.toLowerCase())) {
    const r = e.state.toLowerCase(), a = String(e.attributes.preset_mode ?? "none").toLowerCase();
    r === "off" ? i = "off" : r === "cool" ? i = a === "wind_free" ? "wind_free" : "cool" : r === "dry" ? i = "dry" : r === "fan_only" ? i = "fan" : r === "heat" ? i = "heat" : (r === "auto" || r === "heat_cool") && (i = "auto"), i !== "off" && i !== "unknown" && i !== "wind_free" && a !== "none" && a !== "" && (n = mi(a)), o = Z(e.attributes.temperature);
  }
  const s = ["cool", "wind_free", "dry", "heat", "auto"].includes(i);
  return {
    mode: i,
    label: n ?? t.t.climateMode[i],
    color: Ft[i],
    active: i !== "off" && i !== "unknown",
    extra: s ? re(o, t) : "",
    unknown: i === "unknown"
  };
}
function Co(e, t) {
  const i = e.unknown ? t.t.unknownState : e.label;
  return e.extra ? `${i} ${e.extra.replace(/^·\s*/, "")}` : i;
}
function Et(e, t) {
  return e.length <= 2 ? e.join(", ") : t.t.summaryChips.rooms(e.length);
}
function ve(e, t) {
  return e.windows.filter((i) => t(i.entity)?.state.toLowerCase() === "on");
}
function $e(e, t, i) {
  return To(
    t(e.heating?.climate),
    t(e.heating?.overlay),
    t(e.heating?.target),
    t(e.heating?.intensity),
    e.thresholds,
    i
  );
}
function Li(e, t, i, n) {
  const o = ve(e, t).length > 0, s = $e(e, t, n), r = e.air_conditioner ? ge(t(e.air_conditioner), n).mode : "unknown", a = !s.unknown && s.waves > 0 || r === "heat", l = r === "cool" || r === "wind_free", d = [];
  return o && a && d.push("window-heating"), o && l ? d.push("window-cooling") : l && i && d.push("cooling-cold"), d;
}
function Ao(e, t, i, n) {
  const o = n.t.summaryChips, s = { "window-heating": [], "window-cooling": [], "cooling-cold": [] }, r = [], a = [], l = [], d = [];
  let c = 0;
  const h = [];
  for (const v of e) {
    for (const T of Li(v, t, i.has(v.name), n))
      s[T].push(v.name);
    const k = ve(v, t).length;
    k > 0 && r.push([v.name, k]);
    const _ = $e(v, t, n);
    _.override === "boost" ? l.push(v.name) : _.override === "manual" && a.push(v.name), _.waves > 0 && (d.push(v.name), c = Math.max(c, _.waves)), v.air_conditioner && ge(t(v.air_conditioner), n).active && h.push(v.name);
  }
  const p = [], m = [
    ["window-heating", "conflict-window"],
    ["window-cooling", "conflict-window"],
    ["cooling-cold", "conflict-cooling"]
  ];
  for (const [v, k] of m)
    s[v].length > 0 && p.push({
      kind: k,
      text: `${o.conflict[v]}: ${Et(s[v], n)}`,
      color: g.warning,
      spoken: `${o.conflictSpoken[v]}: ${s[v].join(", ")}`
    });
  const w = r.reduce((v, [, k]) => v + k, 0);
  return w > 0 && p.push({
    kind: "windows",
    text: o.windowsOpen(w),
    color: g.sky,
    spoken: `${o.windowsSpoken}: ${r.map(([v, k]) => k > 1 ? `${v} (${k})` : v).join(", ")}`
  }), a.length > 0 && p.push({
    kind: "manual",
    text: `${o.manual}: ${Et(a, n)}`,
    color: g.warning,
    spoken: `${o.manualSpoken}: ${a.join(", ")}`
  }), l.length > 0 && p.push({
    kind: "boost",
    text: `${o.boost}: ${Et(l, n)}`,
    color: g.warning,
    spoken: `${o.boostSpoken}: ${l.join(", ")}`
  }), d.length > 0 && p.push({
    kind: "heating",
    text: o.heating(o.rooms(d.length)),
    color: g.warning,
    spoken: `${o.heatingSpoken}: ${d.join(", ")}`,
    waves: c
  }), h.length > 0 && p.push({
    kind: "climate",
    text: `${o.climate}: ${Et(h, n)}`,
    color: g.cool,
    spoken: `${o.climateSpoken}: ${h.join(", ")}`
  }), p;
}
var Eo = Object.defineProperty, E = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = r(t, i, o) || o);
  return o && Eo(t, i, o), o;
};
const Oo = 5 * 6e4, Po = 3e4, W = " ", Do = 550, si = 400, Lo = 700, Ho = "(orientation: landscape) and (max-height: 600px)", zo = 1600, No = 5e3, Ro = 100, Io = 0.6, Fo = 6;
function Uo(e) {
  return e === void 0 ? void 0 : e.mode === "manual" ? "heat" : e.mode === "plan" ? "auto" : e.mode;
}
const jo = ["off", "cool", "dry", "fan_only", "auto", "heat"], we = class we extends $t {
  constructor() {
    super(...arguments), this._i18n = se("en"), this._historyStatus = "loading", this._touchOnSlider = !1, this._dragY = 0, this._moving = {}, this._prefersDark = !0, this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._historyRequest = 0, this._scrubbing = !1, this._clock = 0, this._trendsLoading = !1, this._trendsStarted = !1, this._movingWatch = /* @__PURE__ */ new Map(), this._pressing = !1, this._pressFired = !1, this.handleColorScheme = (t) => {
      this._prefersDark = t.matches;
    }, this.chartPointer = (t) => {
      if (t.type === "pointerdown" && (this._scrubbing = !0), t.pointerType !== "mouse" && !this._scrubbing)
        return;
      const i = this._historyModel, n = t.currentTarget.querySelector("svg.chart");
      if (!i || !n)
        return;
      const o = n.getBoundingClientRect(), s = this.chartWidth();
      this._scrubTime = io((t.clientX - o.left) * s / Math.max(o.width, 1), s, i.range);
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
        const r = s + (t.key === "ArrowLeft" ? -ii : ii);
        this._scrubTime = r >= o ? void 0 : Math.max(n, r);
      } else if (t.key === "Home")
        this._scrubTime = n;
      else if (t.key === "End")
        this._scrubTime = void 0;
      else
        return;
      t.preventDefault();
    }, this.sheetTouchStart = (t) => {
      this._touchY = t.touches[0]?.clientY, this._touchOnSlider = t.composedPath().some((i) => i instanceof HTMLInputElement && i.type === "range");
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
        if (n < Fo)
          return;
        i.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this._dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const i = this._drag;
      if (this._drag = void 0, !i || !i.dragging)
        return;
      const n = Math.max(0, t.clientY - i.startY), o = n / Math.max(1, performance.now() - i.startTime);
      t.type === "pointerup" && (n > Ro || o > Io) ? this.closeSheet() : this._dragY = 0;
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
    this._config = Hn(t), this._trends = {}, this._trendsLoaded = !1, this._reported = {}, this._trendsStarted = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)"), this._prefersDark = this._colorScheme?.matches ?? !0, this._colorScheme?.addEventListener("change", this.handleColorScheme), window.clearInterval(this._clockTimer), this._clockTimer = window.setInterval(() => {
      this.anyWindowOpen() && (this._clock = Date.now());
    }, Po), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._colorScheme?.removeEventListener("change", this.handleColorScheme), this._colorScheme = void 0, window.removeEventListener("resize", this.handleResize), this.flushHeat();
    for (const t of [this._pressTimer, this._flashTimer, this._hintTimer, this._hintHideTimer])
      window.clearTimeout(t);
    for (const t of [...this._movingWatch.keys()])
      this.endMoving(t);
    window.clearInterval(this._trendTimer), window.clearInterval(this._clockTimer), this._trendTimer = void 0, this._clockTimer = void 0, this._pressTimer = void 0, this._flashTimer = void 0, this._hintTimer = void 0, this._hintHideTimer = void 0, this._trendsStarted = !1;
  }
  shouldUpdate(t) {
    if (t.size === 1 && t.has("hass")) {
      const i = t.get("hass");
      return i?.themes?.darkMode !== this.hass?.themes?.darkMode || Nt(i) !== Nt(this.hass) || ["number_format", "time_format", "date_format"].some(
        (n) => i?.locale?.[n] !== this.hass?.locale?.[n]
      ) || this.hasRelevantEntityChanged(i);
    }
    return !0;
  }
  willUpdate(t) {
    t.has("hass") && this.trackMovingPresets();
    const i = this.theme();
    this.dataset.theme !== i && (this.dataset.theme = i), this._i18n = se(vo(this._config?.language ?? "auto", this.hass), this.hass), this.lang !== this._i18n.language && (this.lang = this._i18n.language);
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
    }, Oo)), this._focusSegment && (this.renderRoot.querySelector(`.segment[data-system="${this._focusSegment}"]`)?.focus(), this._focusSegment = void 0), t.has("_sheet") && this._sheet && !t.get("_sheet") && (this.renderRoot.querySelector(".sheet .option[aria-pressed='true']") ?? this.renderRoot.querySelector(".sheet button:not([disabled])"))?.focus();
  }
  anyWindowOpen() {
    return (this._config?.rooms ?? []).some((t) => ve(t, (i) => this.getState(i)).length > 0);
  }
  hasRelevantEntityChanged(t) {
    if (!t || !this.hass || !this._config)
      return !0;
    for (const i of mn(this._config)) {
      const n = t.states[i], o = this.hass.states[i];
      if (n?.state !== o?.state || n?.last_updated !== o?.last_updated || !gn(n?.attributes, o?.attributes))
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
    const t = rt(this.entityState(this._config.houseModeEntity) ?? ""), i = t === rt(this._config.houseModes.summer), n = i || t === rt(this._config.houseModes.winter), o = this.trendAxes(this._config), s = Date.now(), r = this._config.title ?? this._i18n.t.title, a = this.renderOutside(), l = Ao(
      this._config.rooms,
      (c) => this.getState(c),
      this.coldRooms(i, n, s),
      this._i18n
    ), d = r !== "" || a !== f || l.length > 0;
    return u`
      <ha-card>
        <div class="dashboard">
          ${d ? u`<header class="dashboard-header">
                ${r === "" ? f : u`<h1>${r}</h1>`}
                ${a} ${this.renderSummary(l)}
              </header>` : f}
          <div class="rooms n${Math.min(this._config.rooms.length, 4)}">
            ${this._config.rooms.map(
      (c, h) => this.renderRoom(c, h, i, n, o, s)
    )}
          </div>
        </div>
        ${this.renderSheet(i)}
      </ha-card>
    `;
  }
  /** Names of the rooms whose status is "Chladno" (for the conflict "cooling although cold"). */
  coldRooms(t, i, n) {
    const o = /* @__PURE__ */ new Set();
    for (const s of this._config?.rooms ?? []) {
      const r = s.thresholds.stale_minutes;
      Le(
        {
          temperature: this.reading(s.temperature, r, n),
          humidity: this.reading(s.humidity, r, n),
          co2: this.reading(s.carbon_dioxide, r, n),
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
      temperature: Gt(i((n) => n.temperature), pt(t.trends, "temperature")),
      co2: Gt(i((n) => n.carbon_dioxide), pt(t.trends, "co2")),
      pm25: Gt(i((n) => n.pm25), pt(t.trends, "pm25"))
    };
  }
  // ---------------------------------------------------------------- header
  renderOutside() {
    const t = this._config?.outside;
    if (!t)
      return f;
    const { t: i, whole: n } = this._i18n, o = this.numberState(t.temperature), s = this.numberState(t.minimum), r = this.numberState(t.maximum), a = this.numberState(t.rain_probability), l = this.numberState(t.pm25), d = s !== void 0 && r !== void 0 ? `${n(s)}–${n(r)}${W}°C` : void 0, c = [
      o === void 0 ? void 0 : `${n(o)}${W}°C`,
      d,
      a === void 0 ? void 0 : `☂${W}${this._i18n.percent(n(a))}`
    ].filter((w) => w !== void 0), h = this._config.thresholds;
    let p = "––", m = g.label;
    return l !== void 0 && (l >= h.pm25_critical ? (p = i.airLevel.poor, m = g.alert) : l >= h.pm25_warning ? (p = i.airLevel.moderate, m = g.warning) : p = i.airLevel.good), c.length === 0 && !t.pm25 ? f : u`<div class="outside">
      ${c.length > 0 ? u`<div>${c.join(" · ")}</div>` : f}
      ${t.pm25 ? u`<div>${i.outsideAir} <span style=${`color: ${m}`}>${p}</span></div>` : f}
    </div>`;
  }
  /** House summary chips: only what differs from a quiet house (CURRENT_SPEC.md, Dashboard Domov). */
  renderSummary(t) {
    return t.length === 0 ? f : u`<ul class="summary" aria-label=${this._i18n.t.summary}>
      ${t.map((i) => {
      const n = i.kind === "windows" || i.kind === "conflict-window" ? Zt(i.color, !1) : i.kind === "climate" || i.kind === "conflict-cooling" ? Dt("cool", i.color, !1) : i.kind === "manual" || i.kind === "boost" ? Ze(i.kind === "boost" ? "boost" : "heat") : ne(i.waves ?? 3, !1);
      return u`<li class="chip" style=${`--chip-color: ${i.color}`} title=${i.spoken} aria-label=${i.spoken}>
          <span class="chip-icon" aria-hidden="true">${n}</span>${i.text}
        </li>`;
    })}
    </ul>`;
  }
  // ------------------------------------------------------------------ room
  renderRoom(t, i, n, o, s, r) {
    const a = t.thresholds.stale_minutes, l = this.reading(t.temperature, a, r), d = this.reading(t.humidity, a, r), c = this.reading(t.carbon_dioxide, a, r), h = this.pm25Reading(t, r), { t: p } = this._i18n, m = Le({ temperature: l, humidity: d, co2: c, pm25: h }, n, o, t, p), w = t.image, v = (_) => m.cause === _ ? `color: ${m.color}` : f, k = Li(t, (_) => this.getState(_), m.id === "cold", this._i18n);
    return u`
      <div class="room-cell"><article
        class="room ${!t.cover && !t.hasCo2 && !t.hasPm25 ? "compact" : ""}"
        aria-label=${t.name}
        style=${w?.kind === "scene" ? `--scene-tone: ${ho(w.scene)}` : f}
      >
        ${this.renderImage(t)}
        ${this.renderTitle(t, i)}
        <div class="status-line">
          <span
            class="status-dot"
            style=${m.kind === "unknown" ? `border: 1.5px solid ${g.off}` : `background: ${m.color}`}
          ></span>
          <span style=${`color: ${m.color}; font-weight: ${m.kind === "normal" ? 400 : 500}`}>
            ${m.label}
          </span>
        </div>
        <div class="measurements">
          <button
            type="button"
            class="plain-button temperature ${l.stale ? "stale" : ""}"
            style=${v("temperature")}
            ?disabled=${!t.temperature}
            title=${this.staleTitle(l) ?? f}
            aria-label=${p.temperatureLabel(
      t.name,
      l.value === void 0 ? void 0 : this._i18n.one(l.value),
      this.staleSpoken(l),
      this.historyPeriod()
    )}
            @click=${(_) => this.openSheet("history", t, _)}
          >
            ${l.value === void 0 ? u`<span class="missing">––</span>` : u`${this._i18n.one(l.value)}<span class="temperature-unit">${W}°C</span>${this.staleMark(l)}`}
          </button>
          <button
            type="button"
            class="plain-button humidity ${d.stale ? "stale" : ""}"
            style=${v("humidity")}
            ?disabled=${!t.humidity}
            title=${this.staleTitle(d) ?? f}
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
            ${this.renderAirBlock(t, i, c, h, s)}
            ${this.renderHvac(t, n, i)}
            ${this.renderTemperatureTrend(t, l, s.temperature)}
            ${this.renderWindow(t, i, k, r)}
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
    return i ? i.kind === "scene" ? u`<div class="scene" aria-hidden="true">${po(i.scene)}</div>` : u`<div class="scene photo" aria-hidden="true">
      <img src=${i.url} alt="" loading="lazy" decoding="async" />
    </div>` : f;
  }
  /** Room name; with `link` a button that opens the page or address (CURRENT_SPEC.md, Room Card). */
  renderTitle(t, i) {
    const n = t.link;
    if (!n)
      return u`<div class="room-title">${t.name}</div>`;
    const o = `link-description-${i}`;
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
    return Re((this._config?.history.hours ?? 24) * 60, this._i18n.t);
  }
  /** The micro trend period for screen readers: "2 hodiny" (after "za"), "the last 2 hours". */
  trendPeriod() {
    return Re(this._config?.trends.minutes ?? 120, this._i18n.t);
  }
  /** On the lighter ground of the popup options the critical red needs a lighter shade to stay readable. */
  popupColor(t) {
    return t === g.alert ? g.alertOnPopup : t;
  }
  /** Colour of a CO₂ / PM2.5 number: white, orange from the warning limit, red from the critical one; grey without a fresh value. */
  airColor(t, i, n) {
    return t.value === void 0 || t.stale ? g.label : t.value >= n ? g.alert : t.value >= i ? g.warning : g.white;
  }
  /**
   * CO₂ and PM2.5 are one touch target over both rows (52 px, TODO P1.2). With both sensors it
   * opens the popup "Kvalita vzduchu" with a link to each detail; with one it opens that
   * detail at once. A sensor the room does not have (`carbon_dioxide: false`) has no row; without
   * both the place stays empty, so the rows below keep their position (CURRENT_SPEC.md, Room Card).
   */
  renderAirBlock(t, i, n, o, s) {
    if (!t.hasCo2 && !t.hasPm25)
      return f;
    const { thresholds: r } = t, { t: a } = this._i18n, l = this._config.trends, d = [t.carbon_dioxide, t.pm25].filter((w) => !!w), c = (w, v, k, _, T, x) => {
      if (!v || !k)
        return;
      const b = _.value === void 0 ? void 0 : ze(this._trends[k], pt(l, x));
      return a.airSensor(
        w,
        _.value === void 0 ? void 0 : `${this._i18n.whole(_.value)} ${T}`,
        b ? a.trendOver(a.trend[b], this.trendPeriod()) : void 0,
        this.staleSpoken(_)
      );
    }, h = [
      c("CO₂", t.hasCo2, t.carbon_dioxide, n, "ppm", "co2"),
      c("PM2.5", t.hasPm25, t.pm25, o, "µg/m³", "pm25")
    ].filter(Boolean).join("; "), p = d.length > 1, m = `air-description-${i}`;
    return u`
      <button
        type="button"
        class="plain-button air-block"
        ?disabled=${d.length === 0}
        aria-haspopup=${p ? "dialog" : f}
        aria-describedby=${m}
        @click=${(w) => p ? this.openSheet("air", t, w) : this.showMoreInfo(d[0])}
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
    ) : f}
        ${t.hasPm25 ? this.renderAirRow(
      "pm25",
      t.pm25,
      Ge(),
      o,
      "µg/m³",
      r.pm25_warning,
      r.pm25_critical,
      s.pm25
    ) : f}
      </button>
      <span class="sr-only" id=${m}>${a.airDescription(t.name, h, p)}</span>
    `;
  }
  /** Popup "Kvalita vzduchu": CO₂ and PM2.5 with their values, each opens the standard entity detail. */
  renderAirBody(t, i) {
    const { thresholds: n } = t, o = n.stale_minutes, s = [
      { slot: "co2", label: "CO₂", unit: "ppm", present: t.hasCo2, entityId: t.carbon_dioxide, warning: n.co2_warning, critical: n.co2_critical },
      { slot: "pm25", label: "PM2.5", unit: "µg/m³", present: t.hasPm25, entityId: t.pm25, warning: n.pm25_warning, critical: n.pm25_critical }
    ].filter((r) => r.present);
    return u`
      <div class="options list-options" role="group" aria-label=${this._i18n.t.air}>
        ${s.map(({ slot: r, label: a, unit: l, entityId: d, warning: c, critical: h }) => {
      const p = this.reading(d, o, i, r === "pm25"), m = p.value !== void 0, w = m && !p.stale ? g[r] : g.off;
      return u`<button
            type="button"
            class="plain-button option list-option"
            ?disabled=${!d}
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(d);
      }}
          >
            <span class="option-icon" style=${`color: ${w}`} aria-hidden="true">
              ${r === "co2" ? u`<ha-icon icon="mdi:molecule-co2"></ha-icon>` : Ge()}
            </span>
            <span class="option-text">
              <span>${a}</span>
              <span class="option-hint">${this._i18n.t.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${this.popupColor(this.airColor(p, c, h))}`}>
              ${m ? `${this._i18n.whole(p.value)} ${l}` : u`<span aria-hidden="true">––</span><span class="sr-only">${this._i18n.t.unknownValue}</span>`}
            </span>
            ${p.stale ? u`<span class="sr-only">${this.staleSpoken(p)}</span>` : f}
          </button>`;
    })}
      </div>
    `;
  }
  /**
   * One CO₂ / PM2.5 row inside the air block: icon and value in the left column, micro trend
   * in the right column. A stale value is grey, never orange or red.
   */
  renderAirRow(t, i, n, o, s, r, a, l) {
    const d = o.value !== void 0, c = this._i18n.whole(o.value ?? 0), h = this.airColor(o, r, a), p = g[t];
    return u`
      <div class="air-row slot-${t}" title=${this.staleTitle(o) ?? f}>
        <span class="row-main">
          <span class="row-icon" style=${`color: ${d && !o.stale ? p : g.off}`} aria-hidden="true">
            ${n}
          </span>
          <span class="row-text">
            ${d ? u`<span class="row-label" style=${`color: ${h}`}>${c}</span>
                  <span class="row-unit">${s}</span>${this.staleMark(o)}` : u`<span class="row-label" style=${`color: ${g.label}`}>––</span>`}
          </span>
        </span>
        ${d ? this.renderSpark(i, l, p, o.stale === !0) : f}
      </div>
    `;
  }
  /**
   * Temperature micro trend: in the trend column next to the Topení and Klimatizace rows and
   * as tall as both of them (CURRENT_SPEC.md, Room Card). Opens the 24 h room history.
   */
  renderTemperatureTrend(t, i, n) {
    if (!t.temperature || i.value === void 0)
      return f;
    const o = this.renderSpark(t.temperature, n, g.peach, i.stale === !0);
    if (o === f)
      return f;
    const s = ze(this._trends[t.temperature], pt(this._config.trends, "temperature")), { t: r } = this._i18n;
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
  renderSpark(t, i, n, o) {
    if (!t)
      return f;
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
      return f;
    const r = Un(s, i).map(
      (h, p) => h === void 0 ? void 0 : { x: p / Math.max(1, s.length - 1) * 100, y: (1 - h) * 100 }
    ).filter((h) => h !== void 0);
    if (r.length < 2)
      return f;
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
  renderHvac(t, i, n) {
    const { t: o } = this._i18n, s = $e(t, (m) => this.getState(m), this._i18n), r = ge(this.getState(t.air_conditioner), this._i18n), a = (m) => this.renderSystemRow(ne(s.unknown ? 0 : s.waves, s.unknown), s, m), l = (m) => this.renderSystemRow(Dt(r.mode, r.color, r.unknown), r, m), d = i ? ["climate", "heating"] : ["heating", "climate"], c = this.hvacTarget(t, d), h = d.map((m) => `${o.system[m]} ${Co(m === "heating" ? s : r, this._i18n)}`).join(", "), p = `hvac-description-${n}`;
    return u`
      <button
        type="button"
        class="plain-button hvac slot-hvac"
        ?disabled=${!c}
        aria-describedby=${p}
        @click=${(m) => c ? this.openSheet(c, t, m) : void 0}
      >
        ${i ? l(!0) : a(!0)}
        ${i ? a(!1) : l(!1)}
      </button>
      <span class="sr-only" id=${p}>${o.hvacDescription(t.name, h, c)}</span>
    `;
  }
  /** The system the HVAC popup opens: the primary one, or the other when only that is configured. */
  hvacTarget(t, i) {
    const n = (o) => o === "heating" ? !!t.heating?.climate : !!t.air_conditioner;
    return i.find(n);
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
            ${i.extra ? u`<span class="row-unit">${i.extra}</span>` : f}
          </span>
        </span>
      </span>
    `;
  }
  // ---------------------------------------------------------------- window
  /** One window: open / closed / unknown and, when open, for how many minutes (its last_changed). */
  windowState(t, i) {
    const n = this.getState(t), o = n?.state.toLowerCase();
    if (o === void 0 || j(o))
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
    const { t: s } = this._i18n, r = t.windows.map((b) => ({ window: b, ...this.windowState(b.entity, o) })), a = r.filter((b) => b.state === "open"), l = a.length > 0, d = !l && (r.length === 0 || r.some((b) => b.state === "unknown")), c = t.windows.length > 1, h = l ? g.sky : g.label, p = l ? a.length > 1 ? s.window.openCount(a.length) : s.window.open : d ? "––" : s.window.closed, m = a.map((b) => b.minutesOpen).filter((b) => b !== void 0), w = m.length > 0 ? Math.max(...m) : void 0, v = n.includes("window-heating") ? s.window.conflict.heating : n.includes("window-cooling") ? s.window.conflict.cooling : void 0, k = `window-description-${i}`, _ = w === void 0 ? void 0 : vn(w, s);
    let T;
    if (!c)
      T = s.window.spokenSingle(d ? "unknown" : l ? "open" : "closed", _);
    else if (l) {
      const b = a.map((M) => this.windowName(t, M.window)).join(", ");
      T = a.length === 1 ? s.window.spokenOneOpen(b, _) : s.window.spokenManyOpen(b, _);
    } else
      T = d ? s.window.spokenUnknown : s.window.spokenAllClosed;
    const x = t.windows[0]?.entity;
    return u`
      <button
        type="button"
        class="plain-button system-row slot-window ${l ? "strong" : ""}"
        style=${`--row-color: ${h}`}
        ?disabled=${!x}
        aria-haspopup=${c ? "dialog" : f}
        aria-describedby=${k}
        @click=${(b) => c ? this.openSheet("windows", t, b) : this.showMoreInfo(x)}
      >
        <span class="row-main">
          <span class="row-icon">${Zt(d ? g.off : h, d)}</span>
          <span class="row-text">
            <span class="row-label">${p}</span>
            ${v ? u`<span class="conflict-dot" aria-hidden="true"></span>` : f}
            ${w === void 0 ? f : u`<span class="row-unit window-duration"
                  >${`${v ? "" : `${W}·${W}`}${Ne(w)}`}</span
                >`}
          </span>
        </span>
      </button>
      <span class="sr-only" id=${k}>${s.window.description(t.name, T, v, c)}</span>
    `;
  }
  /** Name of a window in the "Okna" popup: from the YAML, otherwise "Okno 1", "Window 1", … */
  windowName(t, i) {
    return i.name ?? this._i18n.t.window.defaultName(t.windows.indexOf(i) + 1);
  }
  /** Popup "Okna" of a room with several windows: each window with its state; a row opens its detail. */
  renderWindowsBody(t, i) {
    const { t: n } = this._i18n;
    return u`
      <div class="options list-options" role="group" aria-label=${n.window.popup}>
        ${t.windows.map((o) => {
      const { state: s, minutesOpen: r } = this.windowState(o.entity, i), a = s === "unknown", l = s === "open" ? g.sky : g.label;
      return u`<button
            type="button"
            class="plain-button option list-option window-option"
            @click=${() => {
        this.closeSheet(!1), this.showMoreInfo(o.entity);
      }}
          >
            <span class="option-icon" aria-hidden="true">${Zt(a ? g.off : l, a)}</span>
            <span class="option-text">
              <span>${this.windowName(t, o)}</span>
              <span class="option-hint">${n.detailsAndHistory}</span>
            </span>
            <span class="list-value" style=${`color: ${l}`}>
              ${a ? u`<span aria-hidden="true">––</span><span class="sr-only">${n.unknownValue}</span>` : s === "open" ? n.window.open : n.window.closed}${r === void 0 ? f : u`<span class="list-extra">${W}·${W}${Ne(r)}</span>`}
            </span>
          </button>`;
    })}
      </div>
    `;
  }
  // ----------------------------------------------------------------- cover
  renderCover(t, i) {
    const n = this.getState(i), o = n?.state.toLowerCase(), s = o !== void 0 && !j(o), r = s ? Z(n?.attributes.current_position) : void 0, a = s ? Z(n?.attributes.current_tilt_position) : void 0, l = r !== void 0 && a !== void 0, d = o === "opening" || o === "closing", { t: c } = this._i18n, h = l ? c.cover.position(Math.round(r), Math.round(a)) : c.cover.unknown;
    return u`
      <button
        type="button"
        class="plain-button cover-panel ${d ? "moving" : ""}"
        aria-label=${c.cover.label(t.name, h, d)}
        @click=${() => this.showMoreInfo(i)}
      >
        <svg
          viewBox="0 0 ${Pt} ${Qt}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${hn(r, a)}
        </svg>
      </button>
      <div class="presets" role="group" aria-label=${c.cover.presets(t.name)}>
        ${t.presets.map((p) => this.renderPreset(t, p, r, a, s))}
      </div>
    `;
  }
  renderPreset(t, i, n, o, s) {
    const r = this._moving[t.name], a = r === i.id, l = r === void 0 && qt(n, o, i, this.tolerance()), d = `${t.name}|${i.id}`, { t: c } = this._i18n, h = $n(i, c), p = this._hint?.key === d && this._hint.error === !0;
    return u`
      <button
        type="button"
        class="plain-button preset ${this._flash === d ? "sent" : ""} ${s ? "" : "unavailable"} ${a ? "pending" : ""} ${p ? "failed" : ""}"
        title=${h}
        aria-pressed=${l ? "true" : "false"}
        aria-busy=${a ? "true" : f}
        aria-disabled=${s ? "false" : "true"}
        aria-label=${p && this._hint?.spoken ? `${c.cover.preset(t.name, h, Ie(i, c), s)} ${this._hint.text} ${this._hint.spoken}` : c.cover.preset(t.name, h, Ie(i, c), s)}
        @pointerdown=${(m) => this.pressStart(m, t, i, s)}
        @pointerup=${() => this.pressEnd(t, i, s)}
        @pointercancel=${() => this.pressCancel()}
        @pointerleave=${() => this.pressCancel()}
        @contextmenu=${(m) => m.preventDefault()}
        @click=${(m) => {
      m.detail === 0 && (s ? this.applyPreset(t, i) : this.showUnavailable(d));
    }}
      >
        ${jn(i.icon)}
        ${this._hint?.key !== d ? f : p ? u`<span class="preset-hint error" role="alert"
                >${this._hint.text}<span class="sr-only"> ${this._hint.spoken}</span></span
              >` : u`<span class="preset-hint" role="status">${this._hint.text}</span>`}
      </button>
    `;
  }
  pressStart(t, i, n, o) {
    t.button !== 0 || !o || (window.clearTimeout(this._pressTimer), this._pressing = !0, this._pressFired = !1, this._pressTimer = window.setTimeout(() => {
      this._pressFired = !0, this._lastTap = void 0, window.clearTimeout(this._hintTimer), this._hint = void 0, this.applyPreset(i, n);
    }, Do));
  }
  pressEnd(t, i, n) {
    const o = `${t.name}|${i.id}`;
    if (!n) {
      this.showUnavailable(o);
      return;
    }
    window.clearTimeout(this._pressTimer);
    const s = this._pressing, r = this._pressFired;
    if (this._pressing = !1, this._pressFired = !1, !s || r)
      return;
    const a = performance.now();
    if (window.clearTimeout(this._hintTimer), this._lastTap && this._lastTap.key === o && a - this._lastTap.time <= si) {
      this._lastTap = void 0, this._hint = void 0, this.applyPreset(t, i);
      return;
    }
    this._lastTap = { key: o, time: a }, this._hintTimer = window.setTimeout(() => {
      this._lastTap?.key === o && (this._lastTap = void 0, this.showHint(o, this._i18n.t.cover.hint, "selection"));
    }, si);
  }
  pressCancel() {
    window.clearTimeout(this._pressTimer), this._pressing = !1, this._pressFired = !1;
  }
  showUnavailable(t) {
    this._lastTap = void 0, window.clearTimeout(this._hintTimer), this.showHint(t, this._i18n.t.cover.unavailable, "warning");
  }
  showHint(t, i, n, o) {
    this._hint = { key: t, text: i, ...o ? { spoken: o.spoken, error: !0 } : {} }, this.haptic(n), window.clearTimeout(this._hintHideTimer), this._hintHideTimer = window.setTimeout(() => {
      this._hint = void 0;
    }, o ? No : zo);
  }
  /** Tolerance (±, %) within which the blind is in a preset (`covers.tolerance`). */
  tolerance() {
    return this._config?.covers.tolerance ?? 5;
  }
  async applyPreset(t, i) {
    if (!this.hass || !t.cover || !this._config)
      return;
    const n = this.entityState(t.cover)?.toLowerCase();
    if (n === void 0 || j(n)) {
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
      }, Lo);
    } catch (o) {
      console.error("Klima Dashboard: the blind script failed", o), this.endMoving(t.name);
      const { cover: s } = this._i18n.t;
      this.showHint(`${t.name}|${i.id}`, s.failedHint, "failure", { spoken: s.failed(t.name) });
    }
  }
  /**
   * Preset sent: its icon pulses until the blind has arrived at its position and tilt, or
   * nothing has changed for MOVE_STALL_MS. A blind that is already there needs no pulsing.
   */
  startMoving(t, i, n) {
    const o = this.getState(i);
    if (qt(
      Z(o?.attributes.current_position),
      Z(o?.attributes.current_tilt_position),
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
      const s = this.getState(t.cover), r = s?.state.toLowerCase();
      if (r === void 0 || j(r) || qt(
        Z(s?.attributes.current_position),
        Z(s?.attributes.current_tilt_position),
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
      return f;
    const { t: n } = this._i18n;
    return i.kind === "history" ? this.renderSheetFrame(
      n.sheet.history(this._config?.history.hours ?? 24),
      i.room.name,
      this.renderHistoryBody(i.room, t),
      "history-sheet"
    ) : i.kind === "air" ? this.renderSheetFrame(n.air, i.room.name, this.renderAirBody(i.room, Date.now())) : i.kind === "windows" ? this.renderSheetFrame(n.window.popup, i.room.name, this.renderWindowsBody(i.room, Date.now())) : this.renderSheetFrame(i.room.name, void 0, this.renderHvacBody(i.room, i.kind, t));
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
          style=${this._dragY > 0 ? `transform: translateY(${this._dragY}px)` : f}
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
                ${i ? u`<div class="sheet-sub">${i}</div>` : f}
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
    const o = i === "heating", s = o ? t.heating?.climate : t.air_conditioner, r = this.getState(s), a = r !== void 0 && !j(r.state.toLowerCase()), l = He(r?.attributes.hvac_modes), d = He(r?.attributes.preset_modes), c = r?.state.toLowerCase(), h = String(r?.attributes.preset_mode ?? "none").toLowerCase(), p = !a || !s ? [] : o ? this.heatingOptions(s, l, Uo(this.heatControl(t, s, r))) : this.climateOptions(s, l, c), m = !o && a && s ? d.filter((x) => x !== "none") : [], w = n ? ["climate", "heating"] : ["heating", "climate"], v = !!t.heating?.climate && !!t.air_conditioner, { t: k } = this._i18n, _ = p.filter((x) => x.unsupported).map((x) => `${x.label}: ${x.unsupported}`), T = u`
      ${a ? p.length === 0 ? u`<p class="sheet-message">${k.sheet.noModes}</p>` : u`${o && s ? this.renderHeatControl(t, s, r) : f}
              <div class="options ${o ? "icon-options" : ""}" role="group" aria-label=${k.sheet.modes(k.system[i])}>
                ${p.map((x) => this.renderOption(x))}
              </div>
              ${o ? u`<p class="heat-note" role="status">${this.heatNote(t, s, r, _)}</p>` : f}` : u`<p class="sheet-message">${k.sheet.entityUnavailable}</p>`}
      ${m.length > 0 ? u`<div class="sheet-label" id="preset-label">${k.sheet.presets}</div>
            <div class="chips" role="group" aria-labelledby="preset-label">
              ${m.map((x) => this.renderPresetChip(s, x, h, c, d))}
            </div>` : f}
      ${this._sheetError ? u`<p class="sheet-message error" role="alert">${this._sheetError}</p>` : f}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!s}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(s);
    }}
      >
        ${k.detailsAndHistory}
      </button>
    `;
    return v ? u`
      <div class="hvac-panel" role="tabpanel" id="hvac-panel" aria-labelledby=${`tab-${i}`}>${T}</div>
      <div
        class="segmented"
        role="tablist"
        aria-label=${k.sheet.systems}
        @keydown=${(x) => this.segmentKeydown(x, w, i)}
      >
        ${w.map(
      (x) => u`<button
            type="button"
            role="tab"
            id=${`tab-${x}`}
            class="plain-button segment"
            data-system=${x}
            aria-selected=${x === i ? "true" : "false"}
            aria-controls="hvac-panel"
            tabindex=${x === i ? "0" : "-1"}
            @click=${() => this.switchSheet(x)}
          >
            ${k.system[x]}
          </button>`
    )}
      </div>
    ` : u`<div class="sheet-label system-name">${k.system[i]}</div>${T}`;
  }
  segmentKeydown(t, i, n) {
    const o = i.indexOf(n);
    let s;
    t.key === "ArrowRight" || t.key === "ArrowDown" ? s = i[(o + 1) % i.length] : t.key === "ArrowLeft" || t.key === "ArrowUp" ? s = i[(o - 1 + i.length) % i.length] : t.key === "Home" ? s = i[0] : t.key === "End" && (s = i[i.length - 1]), s && (t.preventDefault(), this._focusSegment = s, s === n ? this.requestUpdate() : this.switchSheet(s));
  }
  /** „Historie místnosti – 24 h“ with a readout that follows the finger (or the arrow keys). */
  renderHistoryBody(t, i) {
    const n = this._config?.history.hours ?? 24, { t: o } = this._i18n;
    let s;
    const r = this._historyModel;
    this._historyStatus === "loading" ? s = u`<p class="sheet-message">${o.sheet.loading}</p>` : this._historyStatus === "error" || !r ? s = u`<p class="sheet-message error" role="alert">${o.sheet.historyFailed}</p>` : to(r) ? s = u`<div
        class="chart-wrap"
        tabindex="0"
        role="group"
        aria-label=${o.sheet.chart(this.historyPeriod())}
        @pointerdown=${this.chartPointer}
        @pointermove=${this.chartPointer}
        @pointerup=${this.chartPointerEnd}
        @pointercancel=${this.chartPointerEnd}
        @pointerleave=${this.chartPointerLeave}
        @keydown=${this.chartKeydown}
      >
        ${co(r, this.chartWidth(), this._scrubTime, this._i18n, i)}
      </div>` : s = u`<p class="sheet-message">${o.sheet.noHistory(n)}</p>`;
    const a = t.temperature ?? t.humidity;
    return u`
      ${s}
      <button
        type="button"
        class="plain-button sheet-link"
        ?disabled=${!a}
        @click=${() => {
      this.closeSheet(!1), this.showMoreInfo(a);
    }}
      >
        ${o.sheet.temperatureDetails}
      </button>
    `;
  }
  /** The chart is drawn 1:1 in CSS pixels at the inner width of the popup. */
  chartWidth() {
    const t = window.matchMedia?.(Ho).matches === !0;
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
          ${t.unsupported ? u`<span class="option-hint">${t.unsupported}</span>` : f}
        </span>
      </button>
    `;
  }
  renderPresetChip(t, i, n, o, s) {
    const r = n === i && o !== "off", a = r && s.includes("none") ? "none" : i;
    return u`
      <button
        type="button"
        class="plain-button chip-button"
        aria-pressed=${r ? "true" : "false"}
        @click=${() => {
      this.runSheetAction(() => this.setPresetMode(t, a));
    }}
      >
        ${mi(i)}
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
    const o = [], s = this._i18n.t.heatingMode, r = this.timerAvailable(), a = (l, d, c, h, p) => {
      o.push({
        id: l,
        label: d,
        icon: Ze(l),
        color: c,
        active: n === l,
        run: () => this.chooseHeating(t, h),
        unsupported: p
      });
    };
    return i.includes("off") && a("off", s.off, g.off, "off"), i.includes("auto") && a("auto", s.schedule, g.plan, "plan"), i.includes("heat") && a("heat", s.manual, g.warning, "manual"), o.length > 0 && a("boost", s.boost, g.alert, "boost", r ? void 0 : this._i18n.t.sheet.notOffered), o;
  }
  /** The Tado CE timer action exists in this Home Assistant (Home Assistant lists the registered actions). */
  timerAvailable() {
    return !!this.hass?.services?.tado_ce?.set_climate_timer;
  }
  /** What the controls show: the person's change, otherwise what the climate entity reports. */
  heatControl(t, i, n) {
    return this._heat?.entityId === i ? this._heat : qe(t.name, i, n);
  }
  /** Choosing the mode the entity already has drops the change; otherwise it waits for the popup to close. */
  async chooseHeating(t, i) {
    const n = this._sheet?.room;
    if (!n)
      return;
    const o = this.getState(t);
    if (qe(n.name, t, o)?.mode === i) {
      this._heat = void 0;
      return;
    }
    const r = this.heatControl(n, t, o);
    this._heat = {
      room: n.name,
      entityId: t,
      mode: i,
      temperature: r?.temperature ?? 21,
      duration: wi(i)
    };
  }
  /** Sends the change made in the popup (closing, switching to Klimatizace, leaving for the detail). */
  flushHeat() {
    const t = this._heat;
    t && (this._heat = void 0, this.applyHeat(t));
  }
  async applyHeat(t) {
    try {
      await this.callCommand(Nn(t.entityId, t, this.timerAvailable()));
    } catch (i) {
      console.error("Klima Dashboard: the heating command failed", i), this.haptic("failure");
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
    const r = _i(n), a = at(this.getState(t.heating?.overlay)?.attributes.overlay_remaining_seconds);
    return i && r !== void 0 && r !== "auto" && a !== void 0 && a > 0 ? s.remaining(Vt(Math.ceil(a / 60))) : o.join(" · ");
  }
  /** Temperature and duration of Ručně / Boost / Vypnuto, above the options (so these do not move when it changes). */
  renderHeatControl(t, i, n) {
    const o = this.heatControl(t, i, n), s = this._i18n.t.sheet.heatControl;
    if (!o || o.mode === "plan")
      return f;
    const r = this._i18n, a = this.timerAvailable(), l = yi(bi(n)), d = Si(o.duration), c = `${W}°C`, h = o.mode === "manual" ? this.renderSlider({
      id: "heat-temperature",
      label: s.temperature,
      ariaLabel: s.temperatureSlider,
      value: o.temperature,
      min: l.min,
      max: l.max,
      step: l.step,
      big: `${r.half(o.temperature)}${c}`,
      sub: "",
      minLabel: `${r.half(l.min)}${c}`,
      maxLabel: `${r.half(l.max)}${c}`,
      ticks: Math.round(l.max - l.min) + 1,
      onInput: (v) => this.editHeat(t, i, { temperature: ki(v, l), mode: "manual" })
    }) : o.mode === "boost" ? u`<div class="heat-fixed">
              <span class="slider-label">${s.fixedTemperature}</span>
              <span class="slider-big">${r.half(Ut)}${c}</span>
            </div>` : f, p = d !== void 0 ? Vt(d) : o.duration === ue ? s.nextPlan : s.untilResumed, m = d !== void 0 ? s.until(r.time(Date.now() + d * 6e4)) : "", w = a ? this.renderSlider({
      id: "heat-duration",
      label: s.duration,
      ariaLabel: s.durationSlider,
      value: o.duration,
      min: 0,
      max: ot,
      step: 1,
      big: p,
      sub: m,
      minLabel: Vt(kt[0]),
      maxLabel: "∞",
      ticks: ot + 1,
      valueText: m ? `${p}, ${m}` : p,
      onInput: (v) => this.editHeat(t, i, { duration: Math.min(ot, Math.max(0, Math.round(v))) })
    }) : o.mode === "manual" ? u`<p class="sheet-message">${s.noTimer}</p>` : f;
    return u`
      <div class="heat-control" role="group" aria-label=${r.t.heatingMode[o.mode]}>
        ${h}
        ${o.mode === "off" && a && o.duration !== ot ? u`<p class="heat-detail">${s.offTarget}</p>` : f}
        ${w}
      </div>
    `;
  }
  /** The slider of the boiler design: label, big value, native range input (keyboard, screen reader), ticks, min / max. */
  renderSlider(t) {
    const i = t.max - t.min, n = i > 0 ? (t.value - t.min) / i * 100 : 0;
    return u`
      <div class="slider-block">
        <div class="slider-head">
          <span class="slider-label">${t.label}</span>
          <span class="slider-big">${t.big}</span>
        </div>
        ${t.sub ? u`<div class="slider-sub">${t.sub}</div>` : f}
        <input
          class="heat-slider"
          id=${t.id}
          type="range"
          min=${t.min}
          max=${t.max}
          step=${t.step}
          .value=${String(t.value)}
          aria-label=${t.ariaLabel}
          aria-valuetext=${t.valueText ?? t.big}
          style=${`--fill: ${n}%`}
          @input=${(o) => t.onInput(Number(o.currentTarget.value))}
        />
        <div class="slider-ticks" aria-hidden="true">
          ${Array.from({ length: Math.max(2, t.ticks) }, () => u`<span></span>`)}
        </div>
        <div class="slider-scale" aria-hidden="true"><span>${t.minLabel}</span><span>${t.maxLabel}</span></div>
      </div>
    `;
  }
  climateOptions(t, i, n) {
    return jo.filter((o) => i.includes(o)).map((o) => {
      const s = fi(o), r = Ft[s];
      return {
        id: o,
        label: this._i18n.t.climateMode[s],
        icon: Dt(s, r, !1),
        color: r,
        active: n === o,
        run: () => this.setHvacMode(t, o)
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
    this._sheet && this._sheet.kind !== t && (this.flushHeat(), this._sheetError = void 0, this._sheet = { kind: t, room: this._sheet.room });
  }
  closeSheet(t = !0) {
    window.removeEventListener("resize", this.handleResize), this.flushHeat(), this._historyRequest += 1, this._sheet = void 0, this._sheetError = void 0, this._scrubTime = void 0, this._scrubbing = !1, this._drag = void 0, this._dragY = 0, t && this._opener?.focus(), this._opener = void 0;
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
      ...t.windows.map((a) => a.entity)
    ].filter((a) => !!a), o = this._config.history, s = Date.now(), r = s - o.hours * jt;
    try {
      const a = await Ye(this.hass, n, r, s);
      if (i !== this._historyRequest)
        return;
      this._historyModel = Qn(a, t, { startMs: r, endMs: s }, o), this._historyStatus = "ready";
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
    const t = fn(this._config);
    if (t.length === 0) {
      this._trendsLoaded = !0;
      return;
    }
    this._trendsLoading = !0;
    const { minutes: i, samples: n } = this._config.trends, o = Date.now(), s = o - i * 6e4;
    try {
      const r = await Ye(this.hass, t, s, o), a = {};
      for (const l of t)
        a[l] = Fn(r[l], s, o, n);
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
    const i = wn(this._config), n = await Promise.allSettled(
      i.map(
        (s) => t.callApi("GET", `states/${s}`)
      )
    ), o = {};
    n.forEach((s, r) => {
      if (s.status === "fulfilled") {
        const a = Date.parse(s.value?.last_reported ?? s.value?.last_updated ?? "");
        Number.isFinite(a) && (o[i[r]] = a);
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
    const r = this._reported[t];
    if (r === void 0)
      return { value: s };
    const a = Date.parse(this.getState(t)?.last_updated ?? ""), l = Math.max(r, Number.isFinite(a) ? a : 0), d = Math.max(0, (n - l) / 6e4);
    return { value: s, ageMinutes: d, stale: !(o && s === 0) && d > i };
  }
  /** PM2.5 of a room: a measured 0 µg/m³ is clean air and never stale (CURRENT_SPEC.md, Chybějící data). */
  pm25Reading(t, i) {
    return this.reading(t.pm25, t.thresholds.stale_minutes, i, !0);
  }
  /** Grey clock behind a stale value; the age is in the tooltip and for screen readers (CURRENT_SPEC.md, Chybějící data). */
  staleMark(t) {
    return t.stale ? u`<span class="stale-mark" aria-hidden="true">${Bn()}</span>` : f;
  }
  staleTitle(t) {
    return t.stale && t.ageMinutes !== void 0 ? this._i18n.t.lastSeen(vi(t.ageMinutes)) : void 0;
  }
  staleSpoken(t) {
    const i = this.staleTitle(t);
    return i ? `, ${i.toLowerCase()}` : "";
  }
  numberState(t) {
    const i = this.entityState(t);
    if (i === void 0 || j(i.toLowerCase()))
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
we.styles = So;
let C = we;
E([
  O()
], C.prototype, "_config");
E([
  pi({ attribute: !1 })
], C.prototype, "hass");
E([
  O()
], C.prototype, "_sheet");
E([
  O()
], C.prototype, "_sheetError");
E([
  O()
], C.prototype, "_heat");
E([
  O()
], C.prototype, "_historyStatus");
E([
  O()
], C.prototype, "_historyModel");
E([
  O()
], C.prototype, "_scrubTime");
E([
  O()
], C.prototype, "_dragY");
E([
  O()
], C.prototype, "_flash");
E([
  O()
], C.prototype, "_moving");
E([
  O()
], C.prototype, "_prefersDark");
E([
  O()
], C.prototype, "_hint");
E([
  O()
], C.prototype, "_trends");
E([
  O()
], C.prototype, "_trendsLoaded");
E([
  O()
], C.prototype, "_reported");
E([
  O()
], C.prototype, "_historyRequest");
E([
  O()
], C.prototype, "_clock");
customElements.get("ha-klima-dashboard") || customElements.define("ha-klima-dashboard", C);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-klima-dashboard") || window.customCards.push({
  type: "ha-klima-dashboard",
  name: "Klima Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: se($o()).t.cardDescription,
  preview: !1
});
