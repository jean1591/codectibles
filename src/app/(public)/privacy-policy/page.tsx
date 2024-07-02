import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

export default function PrivacyPolicy() {
  return (
    <div className="px-4 mx-auto w-full lg:max-w-5xl">
      <p
        className={classNames(
          gradientBg,
          "mt-16 inline-block text-transparent bg-clip-text text-4xl md:text-5xl font-extrabold"
        )}
      >
        Privacy policy
      </p>

      <div className="mt-12 space-y-8">
        <p>
          Your privacy is important to us. It is codectibles.fr's policy to
          respect your privacy regarding any information we may collect from you
          across our website, https://codectibles.fr, and other sites we own and
          operate.
        </p>
        <p>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we're collecting it
          and how it will be used.
        </p>
        <p>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we'll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </p>
        <p>
          We don't share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </p>
        <p>
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through codectibles.fr and the
          services in terms of the applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR).
        </p>
        <p>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacsy policies.
        </p>
        <p>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
        <p>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p>This policy is effective as of 01 July 2024.</p>
      </div>
    </div>
  );
}
