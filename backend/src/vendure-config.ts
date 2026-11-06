import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import { HardenPlugin } from '@vendure/harden-plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';

const serverPort = +process.env.PORT || +process.env.VENDURE_SERVER_PORT || 3000;

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        cors: {
            origin: IS_DEV
                ? true
                : (process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean) ?? []),
            credentials: true,
        },
    },

    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
            secret: process.env.COOKIE_SECRET,
        },
    },

    dbConnectionOptions: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        ssl: {
            rejectUnauthorized: true,
        },
    },

    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },

    customFields: {},

    plugins: [
        HardenPlugin.init({
            apiMode: IS_DEV ? 'dev' : 'prod',
        }),

        ...(IS_DEV ? [GraphiqlPlugin.init()] : []),

        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: IS_DEV
                ? undefined
                : (process.env.ASSET_URL_PREFIX || undefined),
        }),

        DefaultSchedulerPlugin.init(),

        DefaultJobQueuePlugin.init({
            useDatabaseForBuffer: true,
        }),

        DefaultSearchPlugin.init({
            bufferUpdates: false,
            indexStockStatus: true,
        }),

        EmailPlugin.init({
            ...(IS_DEV
                ? {
                    devMode: true,
                    outputPath: path.join(__dirname, '../static/email/test-emails'),
                    route: 'mailbox',
                }
                : {
                    transport: {
                        type: 'file',
                        outputPath: path.join(__dirname, '../static/email/test-emails'),
                    },
                }),

            handlers: defaultEmailHandlers,

            templateLoader: new FileBasedTemplateLoader(
                path.join(__dirname, '../static/email/templates')
            ),

            globalTemplateVars: {
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:3001/verify',
                passwordResetUrl: 'http://localhost:3001/reset-password',
                changeEmailAddressUrl: 'http://localhost:3001/account/verify-email',
                adminPasswordResetUrl: `http://localhost:${serverPort}/dashboard/reset-password`,
            },
        }),

        DashboardPlugin.init({
            route: 'dashboard',
            appDir: IS_DEV
                ? path.join(__dirname, '../dist/dashboard')
                : path.join(__dirname, 'dashboard'),
        }),
    ],
};
