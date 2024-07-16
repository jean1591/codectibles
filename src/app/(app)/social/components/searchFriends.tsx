import { KeyboardEvent, useState } from "react";

export const SearchFriends = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!isSearchEmpty(search)) {
        window.open(`https://www.codectibles.fr/profile/${search}`, "_blank");
      } else {
        console.log("Invalid input: cannot be empty");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Search friends</p>

      <p className="mt-4 text-xs text-slate-500">
        Type in Github username and press Enter
      </p>

      <div className="mt-2 flex items-center justify-start p-2 border border-slate-500 rounded-md">
        <p className="hidden md:block text-slate-500">
          https://www.codectibles.fr/profile/
        </p>
        <input
          autoFocus
          className="bg-white outline-none"
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

const isSearchEmpty = (command: string) => command.trim() === "";
