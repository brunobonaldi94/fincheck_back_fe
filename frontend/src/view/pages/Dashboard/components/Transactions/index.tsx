import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide} from "swiper/react";
import {
	MONTHS
} from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImg from "../../../../../assets/empty-state.svg";
import { TransactionTypeDropDown } from "./TransactionTypeDropDown";
import { FiltersModal } from "./FilterModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/TransactionModal/EditTransactionModal";
import React from "react";

export function Transactions(){
	const {
		areValuesVisible,
		isInitialLoading,
		isLoading,
		transactions,
		isFilterModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeFilters,
		filters,
		handleApplyFilters,
		handleOpenEditTransactionModal,
		transactionBeingEdited,
	} = useTransactionsController();
	const hasTransactions = transactions.length > 0;
	return (
		<div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
			{isInitialLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner
						className="h-20 w-20"
					/>
				</div>
			)}
			{!isInitialLoading && (
				<>
					<FiltersModal
						onClose={handleCloseFiltersModal}
						open={isFilterModalOpen}
						onApplyFilters={handleApplyFilters}
						/>
					<header>
						<div className="flex items-center justify-between">
							<TransactionTypeDropDown
								onSelect={(type) => handleChangeFilters('type')(type)}
								selectedType={filters.type}
							/>
							<button
								className="hover:translate-y-[-2px] transition-transform"
								onClick={handleOpenFiltersModal}>
								<FilterIcon />
							</button>
						</div>
						<div className="mt-6 relative">
							<Swiper
								slidesPerView={3.0}
								centeredSlides
								initialSlide={filters.month}
								onSlideChange={(swiper) => {
									handleChangeFilters('month')(swiper.activeIndex)
								}}
							>
								<SliderNavigation />
								{MONTHS.map((month, index) => (
									<SwiperSlide key={month}>
										{({ isActive }) => (
											<SliderOption isActive={isActive} month={month} index={index} />
										)}
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</header>

					<div className="mt-4 space-y-2 flex-1 overflow-y-auto">
					{isLoading && (
						<div className="flex flex-col items-center justify-center h-full">
							<Spinner
								className="h-11 w-11"
							/>
						</div>
					)}
					{(!hasTransactions && !isLoading) && (
						<div className="flex flex-col items-center justify-center h-full">
							<img src={emptyStateImg} alt="Empty state"/>
							<p className="text-gray-700">Não encontramos nenhuma transação!</p>
						</div>
					)}
					{(hasTransactions && !isLoading) && transactions.map((transaction) => (
						<React.Fragment key={transaction.id}>
							{transactionBeingEdited && (
								<EditTransactionModal />
							)}
							<div
								className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
								role="button"
								onClick={() => handleOpenEditTransactionModal(transaction)}
								>
								<div className="flex-1 flex items-center gap-3">
									<CategoryIcon
										type={transaction.type === 'INCOME' ? 'income' : 'expense'}
										category={transaction.category?.icon}
										/>
									<div>
										<strong className="block font-bold tracking-[-0.5px]">
											{transaction.name}
										</strong>
										<span className="text-sm text-gray-600">
											{formatDate(new Date(transaction.date))}
										</span>
									</div>
								</div>
								<span className={cn("tracking-[-0.5px] font-medium",
									!areValuesVisible && "blur-sm",
									transaction.type === 'INCOME' ? "text-green-800" : "text-red-800")}>
										{transaction.type === 'INCOME' ? "+" : "-"}
										{formatCurrency(transaction.value)}
								</span>
							</div>
						</React.Fragment>
					))}
					</div>
				</>
			)}
		</div>
	)
}
