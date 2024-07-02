import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { PiCaretDown } from "react-icons/pi";
import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

interface FaqItem {
  answer: string;
  question: string;
}
const faq: FaqItem[] = [
  {
    question: "What is this app about?",
    answer:
      "This app gamifies your GitHub experience by rewarding you for your contributions. You can earn XP by merging pull requests, commenting, and approving PRs. Reach XP levels to collect unique animal emojis. The app transforms your regular coding activities into a fun and engaging game, enhancing your productivity and making your development journey more enjoyable.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Follow these steps: 1. Generate a GitHub Token: Go to your GitHub settings, navigate to Developer settings, and create a new personal access token with the necessary permissions. 2. Save it in the App: Open the app, go to /token, and paste your GitHub token in the designated field. 3. Merge, Comment, and Approve PRs: Continue your regular GitHub workflow. Our app will automatically track your contributions. 4. Collect Rewards: Earn XP, collect animal emojis and level up.",
  },
  {
    question: "Is my GitHub data secure?",
    answer:
      "Yes, your GitHub data is secure. We use industry-standard security measures to protect your data and ensure privacy. Your personal access token is stored securely, and we only access the data necessary to track your contributions and rewards.",
  },
  {
    question: "Can I compete with friends and colleagues?",
    answer:
      "Yes, you can compete with friends and colleagues! Compare your progress and collections to add a competitive edge to your coding journey. Leaderboard and friends will be added soon.",
  },
  {
    question: "Can I use the app with multiple GitHub accounts?",
    answer:
      "Currently, the app supports linking to a single GitHub account. If you have multiple accounts, you can create multiple Codectibles accounts.",
  },
  {
    question: "How do I update or delete my GitHub token?",
    answer:
      "The app relies on a Github token to work, you cannot delete your token. Howerver, you can delete your codectibles account by navigating to Github settings, revoke your token and revoke access to your Github account by codectibles.",
  },
  {
    question: "Are there any plans for future updates or new features?",
    answer:
      "Yes, we have exciting plans for future updates and new features! We are continuously working to improve the app, add new rewards, and introduce additional gameplay elements. Stay tuned for updates and follow our development roadmap for more information.",
  },
];

export const Faq = () => {
  return (
    <div id="#faq">
      <div className="text-center">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-transparent bg-clip-text text-4xl font-extrabold"
          )}
        >
          Any questions ?
        </p>
      </div>

      <div className="mt-8 md:mt-12 divide-y divide-slate-500 ">
        {faq.map(({ question, answer }) => (
          <Disclosure as="div" className="p-6" key={question}>
            <DisclosureButton className="group flex w-full items-center justify-center md:justify-between">
              <span className="text-lg font-medium group-data-[hover]:text-slate-600">
                {question}
              </span>
              <PiCaretDown className="h-5 w-5 group-data-[hover]:text-slate-600 group-data-[open]:rotate-180 transition ease-in-out duration-500" />
            </DisclosureButton>
            <DisclosurePanel className="mt-4 text-gray-500">
              {answer}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
};
