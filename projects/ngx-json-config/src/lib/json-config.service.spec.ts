import { TestBed } from '@angular/core/testing';

import { JsonConfigService } from './json-config.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { APP_INITIALIZER, InjectionToken } from "@angular/core";

interface TestConfig {
  a: string;
  b: number;
  c: boolean;
}

interface TestConfig2 {
  d: boolean;
  e: string;
  f: number;
}

export const TEST_CONFIG = new InjectionToken<TestConfig>('TestConfig');
export const TEST_CONFIG_2 = new InjectionToken<TestConfig2>('TestConfig2');

/**
 * Tests for the {@link JsonConfigService}.
 */
describe('JsonConfigService', () => {

  // #region Fields

  let service: JsonConfigService;

  let httpMock: HttpTestingController;

  let config: TestConfig;
  let config2: TestConfig2;

  // #endregion

  // #region Setup

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JsonConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: (jsonConfigService: JsonConfigService) => () => jsonConfigService.load$([
            {
              identifier: TEST_CONFIG,
              url: '/assets/config.json'
            },
            {
              identifier: TEST_CONFIG_2,
              url: '/assets/config2.json'
            }
          ]),
          deps: [JsonConfigService],
          multi: true
        },
        {
          provide: TEST_CONFIG,
          useFactory: (jsonConfigService: JsonConfigService) => jsonConfigService.get<TestConfig>(TEST_CONFIG),
          deps: [JsonConfigService]
        },
        {
          provide: TEST_CONFIG_2,
          useFactory: (jsonConfigService: JsonConfigService) => jsonConfigService.get<TestConfig2>(TEST_CONFIG_2),
          deps: [JsonConfigService]
        }
      ]
    });

    service = TestBed.inject(JsonConfigService);

    httpMock = TestBed.inject(HttpTestingController);

    config = {
      a: "abcd",
      b: 10,
      c: false
    };

    config2 = {
      d: true,
      e: "efgh",
      f: 965
    };

    httpMock.expectOne('/assets/config.json').flush(config);
    httpMock.expectOne('/assets/config2.json').flush(config2);
  });

  // #endregion

  // #region Methods

  it('should load app config', () => {
    let testConfig = TestBed.inject(TEST_CONFIG);

    expect(testConfig).toEqual(config);
  });

  it('should load app config 2', () => {
    let testConfig2 = TestBed.inject(TEST_CONFIG_2);

    expect(testConfig2).toEqual(config2);
  });

  // #endregion
});
