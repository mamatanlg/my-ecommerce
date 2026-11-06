import {getCurrencyCookie} from './currency';
import {getActiveChannel} from '@/platform/vendure/channel';

/**
 * Get the active currency code for the current request.
 * Uses the saved currency only if it is supported by the channel.
 * Otherwise, falls back to the channel's default currency.
 */
export async function getActiveCurrencyCode(): Promise<string> {
    const channel = await getActiveChannel();
    const cookieValue = await getCurrencyCookie();

    if (
        cookieValue &&
        (channel.availableCurrencyCodes as string[]).includes(cookieValue)
    ) {
        return cookieValue;
    }

    return channel.defaultCurrencyCode;
}
