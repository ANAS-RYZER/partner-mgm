import Image from "next/image";
import React from "react";

interface ProductCardProps {
    image?: string;
    name: string;
    sku: string;
    price?: number;
}

const ProductCard = ({ image, name, sku, price }: ProductCardProps) => {
    const hasImage = Boolean(image?.trim());

    return (
        <div className="border rounded-lg shadow-sm p-3 bg-white">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-medium line-clamp-2">{name}</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        sku-id: <span className="text-black uppercase">{sku}</span>
                    </p>
                    {price && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Price: <span className="text-black">₹{price}</span>
                        </p>
                    )}
                </div>

                {hasImage ? (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                        <Image
                            src={image!}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProductCard;
