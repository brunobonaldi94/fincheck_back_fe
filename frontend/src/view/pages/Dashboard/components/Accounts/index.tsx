import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsControllers } from "./useAccountsController";
export function Accounts(){

	const {
		sliderState,
		setSliderState,
		windowWidth,
	} = useAccountsControllers();

	return (
		<div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			<div>
				<span className="tracking-[-0.5px] block text-white">Total Balance</span>
				<div className="flex items-center gap-2">
					<strong className="text-2xl tracking-[-1px] text-white">
						R$ 1,000,000
					</strong>
					<button className="flex items-start justify-center w-8 h-8">
						<EyeIcon open />
					</button>
				</div>
			</div>
			<div className="flex-1 flex justify-end flex-col mt-10 md:mt-0">
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
						<SwiperSlide>
							<AccountCard
								balance={123.45}
								name="Nubank"
								color="#7950F2"
								type="CHECKING"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								balance={123.45}
								name="XP"
								color="#333"
								type="INVESTIMENT"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<AccountCard
								balance={123.45}
								name="Cateira"
								color="#0f0"
								type="CASH"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	)
}
