import { gradientBg, gradientText } from "@/app/(app)/ui";

import { classNames } from "@/utils";

export default function PrivacyPolicy() {
  return (
    <div>
      <p
        className={classNames(
          gradientText,
          gradientBg,
          "mt-16 text-4xl md:text-5xl font-extrabold"
        )}
      >
        Privacy policy
      </p>

      <div className="mt-12 space-y-8">
        <p>
          This Privacy Policy describes the policies of Codectibles, 1, Not your
          business, Paris 75001, France, email: codectibles@mailo.com, phone:
          0123456789 on the collection, use and disclosure of your information
          that we collect when you use our website ( https://www.codectibles.fr
          ). (the “Service”). By accessing or using the Service, you are
          consenting to the collection, use and disclosure of your information
          in accordance with this Privacy Policy. If you do not consent to the
          same, please do not access or use the Service. We may modify this
          Privacy Policy at any time without any prior notice to you and will
          post the revised Privacy Policy on the Service. The revised Policy
          will be effective 180 days from when the revised Policy is posted in
          the Service and your continued access or use of the Service after such
          time will constitute your acceptance of the revised Privacy Policy. We
          therefore recommend that you periodically review this page.
        </p>

        <div>
          <p>1. Information we collect</p>
          <p>
            We will collect and process the following personal information about
            you:
          </p>

          <ul className="list-disc">
            <li className="ml-8">Name</li>
            <li className="ml-8">Email</li>
            <li className="ml-8">Social Media Profile</li>
            <li className="ml-8">pull request metadata</li>
          </ul>
        </div>

        <div>
          <p>2. How we use your information</p>
          <p>
            We will use the information that we collect about you for the
            following purposes:
          </p>
          <ul className="list-disc">
            <li className="ml-8">Creating user account</li>
            <li className="ml-8">Access to application services</li>
          </ul>
          <p>
            If we want to use your information for any other purpose, we will
            ask you for consent and will use your information only on receiving
            your consent and then, only for the purpose(s) for which grant
            consent unless we are required to do otherwise by law.
          </p>
        </div>

        <div>
          <p>3. Retention of your information</p>
          <p>
            We will retain your personal information with us for 90 days to 2
            years after users terminate their accounts or for as long as we need
            it to fulfill the purposes for which it was collected as detailed in
            this Privacy Policy. We may need to retain certain information for
            longer periods such as record-keeping / reporting in accordance with
            applicable law or for other legitimate reasons like enforcement of
            legal rights, fraud prevention, etc. Residual anonymous information
            and aggregate information, neither of which identifies you (directly
            or indirectly), may be stored indefinitely.
          </p>
        </div>

        <div>
          <p>4. Your rights</p>
          <p>
            Depending on the law that applies, you may have a right to access
            and rectify or erase your personal data or receive a copy of your
            personal data, restrict or object to the active processing of your
            data, ask us to share (port) your personal information to another
            entity, withdraw any consent you provided to us to process your
            data, a right to lodge a complaint with a statutory authority and
            such other rights as may be relevant under applicable laws. To
            exercise these rights, you can write to us at codectibles@mailo.com.
            We will respond to your request in accordance with applicable law.
          </p>
          <p>
            Do note that if you do not allow us to collect or process the
            required personal information or withdraw the consent to process the
            same for the required purposes, you may not be able to access or use
            the services for which your information was sought.
          </p>
        </div>

        <div>
          <p>5. Cookies etc</p>
          <p>
            To learn more about how we use these and your choices in relation to
            these tracking technologies, please refer to our Cookie Policy.
          </p>
        </div>

        <div>
          <p>6. Security</p>
          <p>
            The security of your information is important to us and we will use
            reasonable security measures to prevent the loss, misuse or
            unauthorized alteration of your information under our control.
            However, given the inherent risks, we cannot guarantee absolute
            security and consequently, we cannot ensure or warrant the security
            of any information you transmit to us and you do so at your own
            risk.
          </p>
        </div>

        <div>
          <p>7. Grievance / data protection officer</p>
          <p>
            If you have any queries or concerns about the processing of your
            information that is available with us, you may email our Grievance
            Officer at codectibles, 1, Not your business, email:
            codectibles@mailo.com. We will address your concerns in accordance
            with applicable law.
          </p>
        </div>

        <p>This policy is effective as of 01 July 2024.</p>
      </div>
    </div>
  );
}
