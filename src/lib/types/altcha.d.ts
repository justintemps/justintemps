declare module "altcha" {
  interface AltchaEvent {
    detail: {
      payload: string;
      state: string;
    };
  }

  interface AltchaWidget extends HTMLElement {
    addEventListener(
      type: "change",
      listener: (event: CustomEvent<AltchaEvent["detail"]>) => void
    ): void;
  }

  interface HTMLElementTagNameMap {
    "altcha-widget": AltchaWidget;
  }
}
