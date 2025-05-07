import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class ScrapingService {
  private browser: Browser | null = null;
  private readonly logger = new Logger(ScrapingService.name);

  async initializeBrowser(): Promise<void> {
    if (!this.browser) {
      try {
        this.browser = await puppeteer.launch({
          headless: false, //change this to true later
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        this.logger.log('Puppeteer browser initialized');
      } catch (error) {
        this.logger.error(
          'Failed to initialize Puppeteer browser',
          error.stack,
        );
        this.browser = null; // set browser to null if initialization fails
        throw new InternalServerErrorException(
          'Failed to initialize scraping service',
        );
      }
    }
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.logger.log('Puppeteer browser closed');
    }
  }

  async scrapeLinkedInProfile(profileUrl: string): Promise<any> {
    if (!this.browser) {
      await this.initializeBrowser(); // Initialize if not already
    }
    if (!profileUrl.includes('https://')) {
      profileUrl = 'https://' + profileUrl;
    }

    let page: Page | null = null;
    try {
      page = await this.browser!.newPage();
      this.logger.log(`Navigating to ${profileUrl}`);
      await page.goto(profileUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      }); // Wait until network is idle, with timeout

      //const photoSelector = '.pv-top-card--photo-resize img';
      //await page.waitForSelector(photoSelector);
      //const photo = await page.$eval(photoSelector, (el) =>
      //  el.getAttribute('src'),
      //);

      const nameSelector = 'h1'; // there seem to be only 1 <h1> element on profile pages, so this should work
      const name = await page.$eval(nameSelector, (el) =>
        el.textContent?.trim(),
      );

      this.logger.log(
        `Scraped data for ${profileUrl}: Name - ${name}, Photo - `,
      );
      return {
        name,
        //photo,
      };
    } catch (error) {
      this.logger.error(
        `Failed to scrape LinkedIn profile ${profileUrl}`,
        error.stack,
      );
      if (page) {
        await page.close();
      }
      //throw new InternalServerErrorException(
      //  `Failed to scrape LinkedIn profile: ${error.message}`,
      //);
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}
