import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsControllers } from "./useAccountsController";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
export function Accounts(){

	const {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValueVisibility,
		isLoading,
		accounts,
		openNewAccountModal,
		currentBalance
	} = useAccountsControllers();
	return (
		<div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			{isLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner
						className="text-teal-950/50 fill-white h-20 w-20"
					/>
				</div>
			)}
			{!isLoading && (
			<>
			<div>
				<span className="tracking-[-0.5px] block text-white">Total Balance</span>
				<div className="flex items-center gap-2">
					<strong className={cn(
						"text-2xl tracking-[-1px] text-white"
						, !areValuesVisible && "blur-md"
						)}>
						{formatCurrency(currentBalance)}
					</strong>
					<button
						onClick={toggleValueVisibility}
						className="flex items-start justify-center w-8 h-8">
						<EyeIcon open={!areValuesVisible} />
					</button>
				</div>
			</div>
			<div className="flex-1 flex justify-end flex-col mt-10 md:mt-0">
					{accounts.length === 0 && (
						<>
							<div slot="container-start" className="mb-4">
								<strong className="text-white tracking-[-1px] text-lg font-bold">
									Minhas contas
								</strong>
							</div>
							<button
								onClick={openNewAccountModal}
								className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 hover:bg-teal-800 flex flex-col items-center justify-center gap-4 text-white">
								<div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
									<PlusIcon className="w-6 h-6" />
								</div>
								<span className="font-medium tracking-[-0.5px] block w-32 text-center">Cadastre uma nova conta</span>
							</button>
						</>
					)}
					{accounts.length > 0 && (
					<div>
						<Swiper
							spaceBetween={16}
							slidesPerView={windowWidth > 500 ? 2.1 : 1.2}
							onSlideChange={(swiper) => setSliderState((prevState) => ({
									...prevState,
									isBeginning: swiper.isBeginning,
									isEnd: swiper.isEnd
								}
							))}
						>

							<div slot="container-start" className="flex items-center justify-between mb-4">
								<strong className="text-white tracking-[-1px] text-lg font-bold">
									Minhas contas
								</strong>
								<SliderNavigation
									isBeginning={sliderState.isBeginning}
									isEnd={sliderState.isEnd}
							/>
							</div>
							{accounts.map((account) => (
								<SwiperSlide key={account.id}>
									<AccountCard
										data={account}
									/>
							</SwiperSlide>
							))}
							</Swiper>
						</div>
					)}
			</div>
			</>
			)}
		</div>
	)
}
