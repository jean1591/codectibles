import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

export default function ToS() {
  return (
    <div className="px-4 mx-auto w-full lg:max-w-5xl">
      <p
        className={classNames(
          gradientBg,
          "mt-16 inline-block text-transparent bg-clip-text text-4xl md:text-5xl font-extrabold"
        )}
      >
        Terms and Conditions
      </p>

      <div className="mt-12 space-y-8">
        <div>
          <p>1. Introduction</p>
          <p>
            By using codectibles.fr you confirm your acceptance of, and agree to
            be bound by, these terms and conditions.
          </p>
        </div>

        <div>
          <p>2. Agreement to Terms and Conditions</p>
          <p>
            This Agreement takes effect on the date on which you first use the
            codectibles.fr application.
          </p>
        </div>

        <div>
          <p>3. License Duration</p>
          <p>
            This license is perpetual, with the exception of you breaking any
            part of this license, in which case you lose all rights under the
            license.
          </p>
        </div>

        <div>
          <p>4. Product usage</p>
          <p>
            By using codectibles.fr, you agree to receive important product
            updates from codectibles.fr via the email linked with your Google
            account or the email you used to register your account. You can
            opt-out of this product updates anytime by clicking to the
            "Unsubscribe" link at the bottom of each email. We only send
            important product updates.
          </p>
        </div>

        <div>
          <p>5. Disclaimer</p>
          <p>
            It is not warranted that codectibles.fr will meet your requirements
            or that its operation will be uninterrupted or error free. All
            express and implied warranties or conditions not stated in this
            Agreement (including without limitation, loss of profits, loss or
            corruption of data, business interruption or loss of contracts), so
            far as such exclusion or disclaimer is permitted under the
            applicable law are excluded and expressly disclaimed. This Agreement
            does not affect your statutory rights.
          </p>
        </div>

        <div>
          <p>6. Warranties and Limitation of Liability</p>
          <p>
            codectibles.fr does not give any warranty, guarantee or other term
            as to the quality, fitness for purpose or otherwise of the
            software.codectibles.fr shall not be liable to you by reason of any
            representation (unless fraudulent), or any implied warranty,
            condition or other term, or any duty at common law, for any loss of
            profit or any indirect, special or consequential loss, damage,
            costs, expenses or other claims (whether caused by codectibles.fr's
            negligence or the negligence of its servants or agents or otherwise)
            which arise out of or in connection with the provision of any goods
            or services bycodectibles.fr. codectibles.fr shall not be liable or
            deemed to be in breach of contract by reason of any delay in
            performing, or failure to perform, any of its obligations if the
            delay or failure was due to any cause beyond its reasonable control.
            Notwithstanding contrary clauses in this Agreement, in the event
            that codectibles.fr are deemed liable to you for breach of this
            Agreement, you agree thatcodectibles.fr's liability is limited to
            the amount actually paid by you for your services or software, which
            amount calculated in reliance upon this clause. You hereby release
            codectibles.fr from any and all obligations, liabilities and claims
            in excess of this limitation.
          </p>
        </div>

        <div>
          <p>7. Responsibilities</p>
          <p>
            codectibles.fr is not responsible for what the user does with the
            user-generated content.
          </p>
        </div>

        <div>
          <p>8. General Terms and Law</p>
          <p>
            This Agreement is governed by the laws of France. You acknowledge
            that no joint venture, partnership, employment, or agency
            relationship exists between you and codectibles.fr as a result of
            your use of these services. You agree not to hold yourself out as a
            representative, agent or employee of codectibles.fr. You agree that
            codectibles.fr will not be liable by reason of any representation,
            act or omission to act by you.
          </p>
        </div>

        <p>Last updated: 01 July 2024.</p>
      </div>
    </div>
  );
}
