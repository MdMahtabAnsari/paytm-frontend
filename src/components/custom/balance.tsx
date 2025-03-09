import { NumericFormat } from "react-number-format";

interface BalanceProps {
    balance: number;
}

const Balance = ({ balance }: BalanceProps) => {
    return (
        <div className="h-16 flex items-center px-4 justify-start">
            {/* balance in start */}
            <div className="text-xl font-bold">
                Your Balance{" "}
                <NumericFormat
                    value={balance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                />
            </div>
        </div>
    );
};

export { Balance };
