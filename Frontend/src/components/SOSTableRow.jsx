import React from "react";

const statusStyles = {
  Pending: {
    badge: "bg-yellow-900/30 text-yellow-300 ring-yellow-700/40",
  },
  Resolved: {
    badge: "bg-green-900/30 text-green-300 ring-green-700/40",
  },
  Critical: {
    badge: "bg-red-900/30 text-red-300 ring-red-700/40",
  },
  default: {
    badge: "bg-slate-800 text-slate-300 ring-slate-700",
  },
};

function getStatusBadgeClass(status) {
  const key = (status || "").trim();
  return (statusStyles[key] || statusStyles.default).badge;
}

export function SOSTableRowCard({ location, message, status, time, onResolve }) {
  const badgeClass = getStatusBadgeClass(status);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 shadow-lg flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-slate-400">Location</div>
          <div className="text-base font-semibold text-slate-100">{location}</div>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}>
          {status || "Unknown"}
        </span>
      </div>

      <div>
        <div className="text-sm text-slate-400">Message</div>
        <div className="text-sm text-slate-200">{message}</div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">Time</div>
          <div className="text-sm text-slate-200">{time}</div>
        </div>
        <button
          type="button"
          onClick={onResolve}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Mark Resolved
        </button>
      </div>
    </div>
  );
}

function SOSTableRow({ location, message, status, time, onResolve }) {
  const badgeClass = getStatusBadgeClass(status);
  return (
    <tr className="bg-slate-900 hover:bg-slate-800">
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-200">{location}</td>
      <td className="px-4 py-3 text-sm text-slate-300">{message}</td>
      <td className="px-4 py-3 text-sm">
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}>
          {status || "Unknown"}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-400">{time}</td>
      {/* <td className="px-4 py-3 text-sm">
        <button
          type="button"
          onClick={onResolve}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Mark Resolved
        </button>
      </td> */}
    </tr>
  );
}

export default SOSTableRow;


