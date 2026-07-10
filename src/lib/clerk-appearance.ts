export const clerkAppearance = {
  variables: {
    // Theme tokens in globals.css already store full `oklch(...)` values,
    // so they're referenced directly rather than re-wrapped in oklch().
    colorPrimary: "var(--primary)",
    colorBackground: "var(--card)",
    colorInputBackground: "var(--background)",
    colorInputText: "var(--foreground)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted-foreground)",
    colorDanger: "var(--destructive)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    card: "bg-transparent shadow-none border-none p-0 gap-6",
    header: "gap-1",
    headerTitle: "text-2xl font-semibold tracking-tight text-foreground",
    headerSubtitle: "text-sm text-muted-foreground",
    socialButtonsBlockButton:
      "border border-border bg-input/30 hover:bg-input/50 hover:text-foreground text-foreground rounded-md",
    socialButtonsBlockButtonText: "text-sm font-medium",
    dividerLine: "bg-border",
    dividerText: "text-xs uppercase text-muted-foreground",
    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput:
      "border border-input bg-background text-foreground rounded-md focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium normal-case shadow-none",
    footerActionText: "text-sm text-muted-foreground",
    footerActionLink: "text-primary hover:underline underline-offset-4 font-medium",
    identityPreviewText: "text-sm text-foreground",
    identityPreviewEditButton: "text-primary hover:underline",
    formResendCodeLink: "text-primary hover:underline",
    otpCodeFieldInput: "border border-input bg-background text-foreground",
  },
}
