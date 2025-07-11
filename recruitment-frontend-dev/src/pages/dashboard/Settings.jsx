import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PersonalInfoForm from "@/components/candidate/settings/PersonalInfoForm";
import PasswordForm from "@/components/candidate/settings/PasswordForm";
import SocialAccountForm from "@/components/candidate/settings/SocialAccountForm";

export default function SettingsPage() {
  return (
    <div className="w-full p-6 md:p-10 lg:p-14 bg-purple-50 min-h-screen">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="flex justify-between items-center bg-transparent rounded-none mb-8 w-full">
          {[
            { label: "Personal Information", value: "personal" },
            { label: "Password", value: "password" },
            { label: "Social Account", value: "social" },
          ].map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`group relative pb-2 font-medium text-muted-foreground transition-colors data-[state=active]:text-purple-900 ${
                index === 1 ? "flex-1 text-center" : ""
              }`}
            >
              {tab.label}
              <span className="absolute left-0 -bottom-0.5 w-full h-1 bg-purple-900 rounded-full scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left duration-300" />
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm />
        </TabsContent>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
        <TabsContent value="social">
          <SocialAccountForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
