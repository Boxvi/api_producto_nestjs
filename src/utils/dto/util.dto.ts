export class UtilDto {
  offset: number;
  limit: number;
}

/*
export class FilterProductosDto {
  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}

 */
