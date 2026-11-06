"use client"

import { ArrowLeft, History, Search, CheckCircle2 } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  type: string
  amount: number
  recipient?: string
  phone?: string
  date: string
}

export default function HistoryScreen({ transactions, onBack }: { transactions: Transaction[]; onBack: () => void }) {
  const [query, setQuery] = useState("")
  const filteredTransactions = useMemo(() => transactions.filter((item) => `${item.type} ${item.recipient || ""} ${item.phone || ""}`.toLowerCase().includes(query.toLowerCase())), [transactions, query])

  return (
    <main className="min-h-screen bg-[#f4f7ff] pb-8">
      <header className="bg-gradient-to-r from-[#071956] via-[#123fc1] to-[#5422ce] px-4 pb-6 pt-5 text-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-white/15" aria-label="Back to dashboard"><ArrowLeft className="h-5 w-5" /></Button>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">PAYgO LIMITED</p><h1 className="text-xl font-black">Transaction history</h1></div>
        </div>
      </header>
      <section className="mx-auto max-w-2xl space-y-4 px-4 py-5">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 shadow-sm"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" className="h-11 w-full bg-transparent text-sm outline-none" aria-label="Search transactions" /></div>
        <div className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-[0_12px_32px_rgba(33,60,130,0.1)]">
          {filteredTransactions.length ? filteredTransactions.map((transaction) => <div key={transaction.id} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"><div className="flex min-w-0 items-center gap-3"><div className="rounded-xl bg-blue-50 p-2 text-blue-700"><History className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{transaction.type}</p><p className="truncate text-xs text-slate-500">{transaction.recipient || transaction.phone || "PAYgO wallet"} · {transaction.date}</p></div></div><div className="ml-3 text-right"><p className="text-sm font-black text-slate-900">₦{transaction.amount.toLocaleString()}</p><p className="flex items-center justify-end gap-1 text-[10px] font-semibold text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Successful</p></div></div>) : <div className="py-12 text-center"><History className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-3 font-bold text-slate-800">No transactions yet</h2><p className="mt-1 text-sm text-slate-500">Completed wallet activity will appear here.</p></div>}
        </div>
      </section>
    </main>
  )
}
