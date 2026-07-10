import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountTab } from "@/components/settings/account-tab"
import { PreferencesTab } from "@/components/settings/preferences-tab"
import { NotificationsTab } from "@/components/settings/notifications-tab"
import { PrivacyTab } from "@/components/settings/privacy-tab"
import { mockTemplates, mockUser } from "@/lib/mock-data"

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, preferences, and data.
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full flex-wrap">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="@container/field-group pt-4">
          <AccountTab user={mockUser} />
        </TabsContent>
        <TabsContent value="preferences" className="@container/field-group pt-4">
          <PreferencesTab templates={mockTemplates} />
        </TabsContent>
        <TabsContent value="notifications" className="pt-4">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="privacy" className="pt-4">
          <PrivacyTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
