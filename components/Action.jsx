'use client'

import { CgDanger } from "react-icons/cg";
import { TiChevronRightOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";


const Action = ({ action }) => {
    const router = useRouter();
    const status = action?.status; // Destructure status from action

  // Only render the container if status is false
  if (status) {
    return null; // or return a placeholder if desired
  }

  return (
    <section className="rounded-lg mb-16 flex justify-between items-center drop-shadow bg-slate-100 p-3">
      <div className="flex gap-x-3 items-center">
        <div>
          <CgDanger size={32} />
        </div>
        <div>
          <h2 className="uppercase font-semibold mb-1">{action?.title}</h2>
          <p className="font-medium">{action?.text}</p>
        </div>
      </div>

      <button onClick={() => router.push("/add-account")}>
        <div>
          <TiChevronRightOutline size={32} />
        </div>
      </button>
    </section>
  );
};

export default Action;
