import { useNavigate, useParams } from "react-router";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import type { Product, ProductImage } from "../../types/product.ts";
import { getProduct } from "../../api/product.api.ts";
import { twMerge } from "tailwind-merge";

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    //색상 저장 state
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    //메인 이미지 관련 state
    const [mainImage, setMainImage] = useState<string>("");
    //사이즈 선택 state
    const [seletedSize, setSeletedSize] = useState<string>("");
    //수량선택 state
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const result = await getProduct(Number(id));
                setProduct(result);

                if (result.colors && result.colors.length > 0) {
                    const firstColor = result.colors[0];
                    setSelectedColorId(firstColor.id);

                    if (firstColor.images.length > 0) {
                        setMainImage(firstColor.images[0].url);
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData().then(() => {});
    }, [id]);

    if (loading) return <div className={"py-40 text-center"}>loading,,,</div>;

    if (!product) return <div className={"py-40 text-center"}>상품 정보가 없습니다.</div>;

    //화면에 출력해줄 정보는 color에 종속되어 있고, color가 굉장히 많은 정보를 갖고 있음
    const currentColor = product.colors.find(color => color.id === selectedColorId);

    return (
        <div className={twMerge(["w-full", "max-w-350", "py-40", "mx-auto"])}>
            {/*상단 상품 정보*/}
            <div className={twMerge(["flex", "gap-14"])}>
                {/*왼쪽 (이미지)*/}
                <div className={twMerge(["w-2/3", "space-y-3"])}>
                    {/*큰이미지*/}
                    <MainImageBox product={product} mainImage={mainImage} />
                    {/*작은이미지*/}
                    {currentColor && currentColor.images.length > 1 && (
                        <div className={twMerge(["flex", "gap-2", "overflow-x-auto"])}>
                            {currentColor.images.map((image, index) => (
                                <ThumbnailBox
                                    key={index}
                                    image={image}
                                    setMainImage={setMainImage}
                                    mainImage={mainImage}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/*오른쪽 (상품 정보)*/}
                <div className={twMerge(["w-1/3"])}></div>
            </div>
            {/*상품 상세*/}
            <div></div>
        </div>
    );
}
export default ProductDetailPage;

interface MainImageBoxProps {
    product: Product;
    mainImage: string;
}

function MainImageBox({ product, mainImage }: MainImageBoxProps) {
    return (
        <div
            className={twMerge(
                ["w-full", "relative"],
                ["aspect-4/5", "bg-gray-50", "overflow-hidden"],
            )}>
            {/*이미지*/}
            {mainImage ? (
                <img src={mainImage} alt={"main"} className={"w-full h-full object-cover"} />
            ) : (
                <div
                    className={twMerge(
                        ["w-full", "h-full", "text-gray-300"],
                        ["flex", "items-center", "justify-center"],
                    )}>
                    No Image
                </div>
            )}
            {/*뱃지*/}
            <div className={twMerge(["absolute", "top-4", "left-4"])}>
                {product.isBest && (
                    <span className={twMerge(["bg-white", "text-xs", "font-bold", "px-2", "py-1"])}>
                        Best
                    </span>
                )}
                {product.isNew && (
                    <span className={twMerge(["bg-white", "text-xs", "font-bold", "px-2", "py-1"])}>
                        New
                    </span>
                )}
            </div>
        </div>
    );
}

interface ThumbnailBoxProps {
    image: ProductImage;
    setMainImage: Dispatch<SetStateAction<string>>;
    mainImage:string;
}

function ThumbnailBox({ image, setMainImage ,mainImage}: ThumbnailBoxProps) {
    return (
        <button
            onMouseEnter={() => setMainImage(image.url)}
            className={twMerge(
                ["w-20", "h-24", "bg-gray-50", "overflow-hidden"],
                ["border", ],
                mainImage === image.url ? "border-black" :"border-transparent",
            )}>
            <img src={image.url} alt={"thumb"} className={"w-full h-full object-cover"} />
        </button>
    );
}
