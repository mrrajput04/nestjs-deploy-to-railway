import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum ENVIRONMENT {
    Developement = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision'
}


class EnvironmentVariables {
    @IsEnum(ENVIRONMENT)
    NODE_ENV: ENVIRONMENT;

    @IsNumber()
    APP_PORT: number;

    @IsString()
    SECRET: string;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    TYPE: string;

    @IsString()
    DB_HOST: string;

    @IsString()
    DATABASE: string;

    @IsString()
    DB_USER: string;

    @IsString()
    PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true }
    )

    const error = validateSync(validatedConfig, { skipMissingProperties: false })

    if (error.length > 0) {
        throw new Error(error.toString())
    }
    return validatedConfig
}