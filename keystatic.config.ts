import { config, fields, singleton } from "@keystatic/core"

export default config({
  storage: {
    kind: "github",
    repo:"gearFit89/traveling-billboards" // local-only: this admin UI is never deployed to Cloudflare,
    // it just edits src/content/site-content.json on your machine.
  },

  singletons: {
    siteContent: singleton({
      label: "Site Content",
      // no trailing slash on path -> stores as one file: src/content/site-content.json
      path: "src/lib/content/site-content.json",
      format: { data: "json" },

      schema: {
        site: fields.object(
          {
            siteName: fields.text({ label: "Site Name" }),
            tagline: fields.text({ label: "Tagline" }),
            description: fields.text({ label: "Description", multiline: true }),
            navLinks: fields.array(
              fields.object({
                href: fields.text({ label: "Href" }),
                label: fields.text({ label: "Label" }),
              }),
              { label: "Nav Links", itemLabel: (props) => props.fields.label.value }
            ),
            footerText: fields.text({ label: "Footer Text" }),
          },
          { label: "Site" }
        ),

        home: fields.object(
          {
            hero: fields.object(
              {
                tagline: fields.text({ label: "Tagline" }),
                titleLine1: fields.text({ label: "Title Line 1" }),
                titleLine2: fields.text({ label: "Title Line 2" }),
                description: fields.text({ label: "Description", multiline: true }),
                primaryButtonText: fields.text({ label: "Primary Button Text" }),
                primaryButtonHref: fields.text({ label: "Primary Button Href" }),
                secondaryButtonText: fields.text({ label: "Secondary Button Text" }),
                secondaryButtonHref: fields.text({ label: "Secondary Button Href" }),
              },
              { label: "Hero" }
            ),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: "Value" }),
                label: fields.text({ label: "Label" }),
              }),
              { label: "Stats", itemLabel: (props) => props.fields.label.value }
            ),
            features: fields.object(
              {
                sectionTagline: fields.text({ label: "Section Tagline" }),
                sectionHeading: fields.text({ label: "Section Heading" }),
                items: fields.array(
                  fields.object({
                    iconKey: fields.text({ label: "Icon Key" }),
                    title: fields.text({ label: "Title" }),
                    description: fields.text({ label: "Description", multiline: true }),
                    link: fields.text({ label: "Link" }),
                  }),
                  { label: "Feature Items", itemLabel: (props) => props.fields.title.value }
                ),
              },
              { label: "Features" }
            ),
          },
          { label: "Home Page" }
        ),

        thoughts: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle", multiline: true }),
            badgeIconKey: fields.text({ label: "Badge Icon Key" }),
            noThoughtsMessage: fields.text({ label: "No Thoughts Message" }),
            qrModal: fields.object(
              {
                fallbackLabel: fields.text({ label: "Fallback Label" }),
                description: fields.text({ label: "Description", multiline: true }),
              },
              { label: "QR Modal" }
            ),
            thankYouMessage: fields.text({ label: "Thank You Message" }),
            linksCta: fields.object(
              {
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description", multiline: true }),
                buttonText: fields.text({ label: "Button Text" }),
                buttonHref: fields.text({ label: "Button Href" }),
              },
              { label: "Links CTA" }
            ),
          },
          { label: "Thoughts Page" }
        ),

        links: fields.object(
          {
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle" }),
            backToAllText: fields.text({ label: "Back To All Text" }),
            visitSiteText: fields.text({ label: "Visit Site Text" }),
          },
          { label: "Links Page" }
        ),

        messageBoard: fields.object(
          {
            hero: fields.object(
              {
                label: fields.text({ label: "Label" }),
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description", multiline: true }),
              },
              { label: "Hero" }
            ),
            liveChatCard: fields.object(
              {
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description", multiline: true }),
                primaryBtnText: fields.text({ label: "Primary Button Text" }),
                secondaryBtnText: fields.text({ label: "Secondary Button Text" }),
              },
              { label: "Live Chat Card" }
            ),
            textPanel: fields.object(
              {
                headerTitle: fields.text({ label: "Header Title" }),
                statusBadge: fields.text({ label: "Status Badge" }),
                messages: fields.array(
                  fields.object({
                    type: fields.select({
                      label: "Type",
                      options: [
                        { label: "Incoming", value: "incoming" },
                        { label: "Outgoing", value: "outgoing" },
                      ],
                      defaultValue: "incoming",
                    }),
                    text: fields.text({ label: "Text", multiline: true }),
                  }),
                  { label: "Sample Messages", itemLabel: (props) => props.fields.text.value }
                ),
                inputPlaceholder: fields.text({ label: "Input Placeholder" }),
                sendBtnText: fields.text({ label: "Send Button Text" }),
              },
              { label: "Text Panel" }
            ),
            submit: fields.object(
              {
                placeholder: fields.text({ label: "Placeholder" }),
                sendBtn: fields.text({ label: "Send Button" }),
                backBtn: fields.text({ label: "Back Button" }),
                sending: fields.text({ label: "Sending Label" }),
                optional: fields.text({ label: "Optional Label" }),
                emailText: fields.text({ label: "Email Text" }),
                requestTitle: fields.text({ label: "Request Title" }),
              },
              { label: "Submit Form" }
            ),
          },
          { label: "Message Board" }
        ),

        toasts: fields.object(
          {
            copy: fields.object(
              {
                success: fields.text({ label: "Success" }),
                error: fields.text({ label: "Error" }),
              },
              { label: "Copy" }
            ),
            share: fields.object(
              {
                success: fields.text({ label: "Success" }),
                error: fields.text({ label: "Error" }),
              },
              { label: "Share" }
            ),
          },
          { label: "Toasts" }
        ),

        about: fields.object(
          {
            hero: fields.object(
              {
                tagline: fields.text({ label: "Tagline" }),
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description", multiline: true }),
              },
              { label: "Hero" }
            ),
            sections: fields.array(
              fields.object({
                heading: fields.text({ label: "Heading" }),
                body: fields.text({ label: "Body", multiline: true }),
              }),
              { label: "Sections", itemLabel: (props) => props.fields.heading.value }
            ),
            team: fields.array(
              fields.object({
                name: fields.text({ label: "Name" }),
                role: fields.text({ label: "Role" }),
                // Stored under public/images/team, referenced from the site as /images/team/<file>
                image: fields.image({
                  label: "Photo",
                  directory: "public/images/team",
                  publicPath: "/images/team/",
                }),
                description: fields.text({ label: "Description", multiline: true }),
              }),
              { label: "Team", itemLabel: (props) => props.fields.name.value }
            ),
          },
          { label: "About Page" }
        ),

        ourMission: fields.object(
          {
            hero: fields.object(
              {
                tagline: fields.text({ label: "Tagline" }),
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description", multiline: true }),
              },
              { label: "Hero" }
            ),
            sections: fields.array(
              fields.object({
                heading: fields.text({ label: "Heading" }),
                body: fields.text({ label: "Body", multiline: true }),
              }),
              { label: "Sections", itemLabel: (props) => props.fields.heading.value }
            ),
          },
          { label: "Our Mission Page" }
        ),
      },
    }),
  },
})