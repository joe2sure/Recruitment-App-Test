import { CandidatesBySourceChart } from "@/components/adminPanel/offerManagement/CandidatesBySourceChart"
import { CandidatesTable } from "@/components/adminPanel/offerManagement/CandidatesTable"
import { OfferStatusChart } from "@/components/adminPanel/offerManagement/OfferStatusChart"

const OfferManagement = () => {
    return(
        <section>
            <div className="">
                <div className="min-h-screen bg-gray-50 py-6 px-2 md:px-6 lg:px-0 xl:px-6 max-w-[1640px] mx-auto">
                    <div className="space-y-6 md:px-6 xl:px-12 2xl:px-22">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">HR Analytics Dashboard</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <CandidatesBySourceChart />
                        <OfferStatusChart />
                    </div>

                    <CandidatesTable />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OfferManagement