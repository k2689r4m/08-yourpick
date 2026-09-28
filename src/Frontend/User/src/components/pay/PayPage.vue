<template>
  <!-- <form
    v-if="deviceST"
    name="mobileweb"
    id="mobileweb"
    method="post"
    class="mt-5"
    accept-charset="euc-kr"
  >
      <input type="hidden" name="P_INI_PAYMENT" :value="payInfo.gopaymethod" />
      <input type="hidden" name="P_MID" :value="payInfo.mid" />
      <input type="hidden" name="P_OID" :value="payInfo.oid" />
      <input type="hidden" name="P_AMT" :value="payInfo.price" />
      <input type="hidden" name="P_GOODS" :value="payInfo.goodname" />
      <input type="hidden" name="P_UNAME" :value="payInfo.buyername" />
      <input type="hidden" name="P_MOBILE" :value="payInfo.buyertel" />
      <input type="hidden" name="P_EMAIL" :value="payInfo.buyeremail" />
      <input type="hidden" name="P_NEXT_URL" :value="payInfo.returnUrl" />
      <input type="hidden" name="P_CHARSET" value="utf8" />
      <input type="hidden" name="P_RESERVED" :value="payInfo.acceptmethod" />
  </form> -->
  <div id="device_form"></div>
  <div id="pc_form"></div>
  <!-- <form v-if="!deviceST" name="" id="SendPayForm_id" method="post" class="mt-5" accept-charset="euc-kr">
    <div class="row g-3 justify-content-between" style="--bs-gutter-x: 0rem">
      <input type="hidden" name="version" value="1.0" />
      <input type="hidden" name="gopaymethod" :value="payInfo.gopaymethod" />
      <input type="hidden" name="mid" :value="payInfo.mid" />
      <input type="hidden" name="oid" :value="payInfo.oid" />
      <input type="hidden" name="price" :value="payInfo.price" />
      <input type="hidden" name="timestamp" :value="payInfo.timestamp" />
      <input type="hidden" name="use_chkfake" :value="payInfo.use_chkfake" />
      <input type="hidden" name="signature" :value="payInfo.signature" />
      <input type="hidden" name="verification" :value="payInfo.verification" />
      <input type="hidden" name="mKey" :value="payInfo.mKey" />
      <input type="hidden" name="currency" :value="payInfo.currency" />
      <input type="hidden" name="goodname" :value="payInfo.goodname" />
      <input type="hidden" name="buyername" :value="payInfo.buyername" />
      <input type="hidden" name="buyertel" :value="payInfo.buyertel" />
      <input type="hidden" name="buyeremail" :value="payInfo.buyeremail" />
      <input type="hidden" name="returnUrl" :value="payInfo.returnUrl" />
      <input type="hidden" name="closeUrl" :value="payInfo.closeUrl" />
      <input type="hidden" name="acceptmethod" :value="payInfo.acceptmethod" />
    </div>
  </form> -->
  <div class="report-pay" v-if="payItem">
    <div class="left">
      <div class="report-pay--tit no-border">상품결제</div>
      <div class="m-block info">
        <div class="line"><label>상품명</label>{{ payItem.info }}</div>
        <div class="line">
          <label>기간</label>
          {{ payItem.dateS }} ~ {{ payItem.dateE }}
        </div>
        <div class="line">
          <label>이용 건 수</label>
          {{ payItem.cnt }}건
        </div>
        <div class="line">
          <label>상품 금액</label>
          {{ $numberMask(payItem.full_price) }}원
        </div>
        <div class="line">
          <label>할인 금액</label>
          {{ $numberMask(payItem.price) }}원
        </div>
      </div>
      <div class="table-wrap m-none">
        <table class="table text-center type3">
          <tr>
            <th>상품명</th>
            <th>기간</th>
            <th>이용건수</th>
            <th>상품금액</th>
            <th>할인</th>
          </tr>
          <tr>
            <td>{{ payItem.info }}</td>
            <td>{{ payItem.dateS }} ~ {{ payItem.dateE }}</td>
            <td>{{ payItem.cnt }}건</td>
            <td>{{ $numberMask(payItem.full_price) }}원</td>
            <td>{{ $numberMask(payItem.sale_price) }}원</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><span class="txt-c--grey">총 신청 금액</span></td>
            <td>{{ $numberMask(payItem.price) }}원</td>
          </tr>
        </table>
      </div>
      <div class="report-pay--tit">결제수단</div>
      <div class="report-pay--label">· 간편결제</div>
      <div class="report-pay--radio">
        <label class="radio">
          <input type="radio" name="radio" value="naver" v-model="payType" />
          <span class="box npay"></span>
        </label>
        <label class="radio">
          <input type="radio" name="radio" value="kakao" v-model="payType" />
          <span class="box kakaopay"></span>
        </label>
        <label class="radio">
          <input type="radio" name="radio" value="payco" v-model="payType" />
          <span class="box payco"></span>
        </label>
        <label class="radio">
          <input type="radio" name="radio" value="toss" v-model="payType" />
          <span class="box toss"></span>
        </label>
      </div>
      <div class="report-pay--label">· 일반결제</div>
      <div class="report-pay--radio">
        <label class="radio">
          <input type="radio" name="radio" value="card" v-model="payType" />
          <span class="box">신용카드</span>
        </label>
        <label class="radio">
          <input type="radio" name="radio" value="bank" v-model="payType" />
          <span class="box">가상계좌(무통장)입금</span>
        </label>
      </div>
      <div class="report-pay--hr"></div>
      <template v-if="payType == 'naver'">
        <div class="report-pay--guide">
          <div class="line">
            네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌
            정보를 등록하여 네이버페이 비밀번호로 결제할 수 있는 간편결제
            서비스입니다.
          </div>
          <div class="line">
            네이버페이 카드 간편결제는 네이버페이에서 제공하는 카드사 별 무이자,
            청구할인 혜택을 받을 수 있습니다.
          </div>
          <div class="line">
            주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라
            변경될 수 있습니다.
          </div>
          <div class="line">
            네이버페이 정책상 100원 미만의 금액은 결제가 어렵습니다.
          </div>
          <div class="line">
            네이버페이 현금영수증은 네이버페이 신청 정보로 발행되며, 신청 정보
            수정 및 계산서 발행은 불가능합니다.
          </div>
          <div class="line">
            네이버페이 결제 시, 네이버페이포인트 결제는 가능하지만, 결제 금액에
            대한 포인트 적립은 불가합니다.
          </div>
        </div>
      </template>
      <template v-else-if="payType == 'kakao'">
        <div class="report-pay--guide">
          <div class="line">
            카카오페이는 카카오톡에서 카드를 등록, 간단하게 비밀번호만으로
            결제할 수 있는 빠르고 편리한 모바일 결제 서비스입니다.
          </div>
          <div class="line">지원 카드 : 모든 카드 등록 / 결제 가능</div>
        </div>
      </template>
      <template v-else-if="payType == 'payco'">
        <div class="report-pay--guide">
          <div class="line">
            PAYCO는 온/오프라인 쇼핑은 물론 송금, 멤버십 적립까지 가능한 통합
            서비스입니다.
          </div>
          <div class="line">
            휴대폰과 카드 명의자가 동일해야 결제가 가능하며, 결제금액 제한은
            없습니다.
          </div>
          <div class="line">지원 카드 : 모든 카드 등록 / 결제 가능</div>
        </div>
      </template>
      <template v-else-if="payType == 'toss'">
        <div class="report-pay--guide">
          <div class="line">
            토스는 간편하게 비밀번호만으로 결제 할 수 있는 빠르고 편리한 계좌
            간편 결제 서비스입니다.
          </div>
          <div class="line">지원 은행: 모든 은행 계좌 등록 / 결제 가능</div>
          <div class="line">
            결제 비밀번호 분실 시 재설정 후 이용 가능합니다.
          </div>
        </div>
      </template>
      <template v-else-if="payType == 'card'">
        <div class="report-pay--guide">
          <div class="line">
            신용카드 결제 세금계산서 발행 불가 안내<br />
            부가가치세법에 의거 신용카드로 결제하는 경우 세금계산서를 발급하지
            않고 신용카드 매출전표가 세금계산서를 대체합니다.
          </div>
        </div>
      </template>
      <template v-else-if="payType == 'bank'">
        <div class="report-pay--guide">
          <div class="line">
            가상계좌(무통장) 입금으로 결제하시려면 결제하기 버튼을 클릭 후
            결제창에서 입금 은행을 선택해주세요.
          </div>
          <div class="line">
            가상계좌(무통장)입금은 고객님께 임의 발행되는 계좌를 통해 결제가
            이루어지는 방식입니다.
          </div>
          <div class="line">
            인터넷뱅킹, 폰뱅킹 또는 은행 CD/ATM을 통해 입금하실 수 있습니다.
          </div>
          <div class="line">
            이용가능 은행: 케이뱅크, 기업, 신한, KB, 하나, NH, 우리, 대구, 부산,
            우체국, 광주, SC, 경남, 전북, 수협 등 15개 은행
          </div>
          <div class="line">
            입금기한은 서비스 신청일로부터 7일이며 기한 내 입금하지 않으실 경우
            신청하신 서비스가 취소됩니다.
          </div>
          <div class="line">
            결제하기 버튼을 클릭하여 입금은행을 선택하시면 입금 계좌번호를
            확인하실 수 있습니다.
          </div>
          <div class="line">
            결제 승인 진행에 다소 시간이 소요될 수 있으니 잠시만 기다려주세요.
          </div>
        </div>
        <div class="report-pay--hr"></div>
        <div class="input-wrap report-mo-input">
          <div class="input-label w-100">· 결제증빙 선택</div>
          <label class="input-radio">
            <input
              type="radio"
              class="input-radio"
              name="payProof"
              value="tax"
              v-model="isRType"
              @change="isRInfo = receiptInfo[isRType]"
            />
            <span class="box type2"></span>
            <span class="text">세금계산서</span>
          </label>
          <label class="input-radio">
            <input
              type="radio"
              class="input-radio"
              name="payProof"
              value="receipt"
              v-model="isRType"
              @change="
                isRUsage == 'normal'
                  ? (isRInfo = receiptInfo[isRType][isRUsage][isRlssued])
                  : (isRInfo = receiptInfo[isRType][isRUsage])
              "
            />
            <span class="box type2"></span>
            <span class="text">현금영수증</span>
          </label>
          <label class="input-radio">
            <input
              type="radio"
              class="input-radio"
              name="payProof"
              value="no"
              v-model="isRType"
              @change="isRInfo = null"
            />
            <span class="box type2"></span>
            <span class="text">신청안함</span>
          </label>
        </div>
        <div class="report-pay--hr"></div>
        <template v-if="isRType == 'tax'">
          <div class="row report-mo-row">
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 사업자번호</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.businessNum1"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.businessNum2"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text w-85"
                  v-model="receiptInfo.tax.businessNum3"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 상호(법인)명</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.medOfficeNm"
                />
              </div>
            </div>
          </div>
          <div class="row m-t--20 report-mo-row">
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 대표자</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.rprsvNm"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 담당자</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.manager"
                />
              </div>
            </div>
          </div>
          <div class="row m-t--20 report-mo-row">
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 이메일</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.email"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 연락처</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.tel1"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.tel2"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.tel3"
                />
              </div>
            </div>
          </div>
          <div class="row m-t--20 report-mo-row">
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 종목</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.typeBiz"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrap">
                <label class="input-label w-100">· 업태</label>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.tax.itemsBiz"
                />
              </div>
            </div>
          </div>
          <div class="input-wrap m-t--20 mm">
            <label class="input-label w-100">· 주소</label>
            <input
              type="text"
              class="input-text"
              v-model="receiptInfo.tax.address"
              readonly
            />
            <button
              type="button"
              class="btn btn-line btn-normal"
              @click="addModalShow = true"
            >
              주소 찾기
            </button>
          </div>
          <div class="input-wrap m-t--10">
            <label class="input-label w-100"></label>
            <input
              type="text"
              class="input-text"
              v-model="receiptInfo.tax.detailAddress"
            />
          </div>
          <div class="report-pay--hr"></div>
        </template>
        <template v-if="isRType == 'receipt'">
          <div class="input-wrap report-mo-input">
            <label class="input-label w-100">· 영수증 용도</label>
            <label class="input-radio">
              <input
                type="radio"
                class="input-radio"
                name="receiptType"
                v-model="isRUsage"
                value="normal"
                @change="isRInfo = receiptInfo[isRType][isRUsage][isRlssued]"
              />
              <span class="box type2"></span>
              <span class="text">소득공제용(근로자 연말정산용)</span>
            </label>
            <label class="input-radio">
              <input
                type="radio"
                class="input-radio"
                name="receiptType"
                v-model="isRUsage"
                value="bus"
                @change="isRInfo = receiptInfo[isRType][isRUsage]"
              />
              <span class="box type2"></span>
              <span class="text">지출증빙용(사업자 경비인정용)</span>
            </label>
          </div>
          <div class="report-pay--hr"></div>
          <template v-if="isRUsage == 'normal'">
            <div class="input-wrap m-none">
              <label class="input-label w-100">· 발급 정보</label>
              <label class="input-radio">
                <input
                  type="radio"
                  class="input-radio"
                  name="lssuedInfo"
                  v-model="isRlssued"
                  value="card"
                  @change="isRInfo = receiptInfo[isRType][isRUsage][isRlssued]"
                />
                <span class="box type2"></span>
                <span class="text">현금영수증 카드번호</span>
              </label>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.card.cardNum1"
                :disabled="isRlssued != 'card'"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.card.cardNum2"
                :disabled="isRlssued != 'card'"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.card.cardNum3"
                :disabled="isRlssued != 'card'"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.card.cardNum4"
                :disabled="isRlssued != 'card'"
              />
            </div>
            <div class="m-block">
              <div class="input-wrap">
                <label class="input-label w-100">· 발급 정보</label>
                <label class="input-radio">
                  <input
                    type="radio"
                    class="input-radio"
                    name="lssuedInfoMo"
                    v-model="isRlssued"
                    value="card"
                    @change="
                      isRInfo = receiptInfo[isRType][isRUsage][isRlssued]
                    "
                  />
                  <span class="box type2"></span>
                  <span class="text">현금영수증 카드번호</span>
                </label>
              </div>
              <div class="input-wrap m-t--10 p-t--0">
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.card.cardNum1"
                  :disabled="isRlssued != 'card'"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.card.cardNum2"
                  :disabled="isRlssued != 'card'"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.card.cardNum3"
                  :disabled="isRlssued != 'card'"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.card.cardNum4"
                  :disabled="isRlssued != 'card'"
                />
              </div>
            </div>
            <div class="input-wrap m-t--20 m-none">
              <label class="input-label w-100"></label>
              <label class="input-radio">
                <input
                  type="radio"
                  class="input-radio"
                  name="lssuedInfo"
                  v-model="isRlssued"
                  value="phone"
                  @change="isRInfo = receiptInfo[isRType][isRUsage][isRlssued]"
                />
                <span class="box type2"></span>
                <span class="text">휴대폰 번호</span>
              </label>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.phone.tel1"
                :disabled="isRlssued != 'phone'"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.phone.tel2"
                :disabled="isRlssued != 'phone'"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.normal.phone.tel3"
                :disabled="isRlssued != 'phone'"
              />
            </div>
            <div class="m-block">
              <div class="input-wrap">
                <label class="input-label w-100"></label>
                <label class="input-radio">
                  <input
                    type="radio"
                    class="input-radio"
                    name="lssuedInfoMo"
                    v-model="isRlssued"
                    value="phone"
                    @change="
                      isRInfo = receiptInfo[isRType][isRUsage][isRlssued]
                    "
                  />
                  <span class="box type2"></span>
                  <span class="text">휴대폰 번호</span>
                </label>
              </div>
              <div class="input-wrap m-t--10 p-t--0">
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.phone.tel1"
                  :disabled="isRlssued != 'phone'"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.phone.tel2"
                  :disabled="isRlssued != 'phone'"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.normal.phone.tel3"
                  :disabled="isRlssued != 'phone'"
                />
              </div>
            </div>
            <div class="report-pay--hr"></div>
          </template>
          <template v-else-if="isRUsage == 'bus'">
            <div class="input-wrap m-none">
              <label class="input-label w-100">· 발급 정보</label>
              <span class="unit txt-c--grey m-r--20">사업자등록번호</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.bus.businessNum1"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.bus.businessNum2"
              />
              <span class="unit">-</span>
              <input
                type="text"
                class="input-text"
                v-model="receiptInfo.receipt.bus.businessNum3"
              />
            </div>
            <div class="m-block">
              <div class="input-wrap">
                <label class="input-label w-100">· 발급 정보</label>
                <span class="unit txt-c--grey m-r--20">사업자등록번호</span>
              </div>
              <div class="input-wrap m-t--0 p-t--0">
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.bus.businessNum1"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.bus.businessNum2"
                />
                <span class="unit">-</span>
                <input
                  type="text"
                  class="input-text"
                  v-model="receiptInfo.receipt.bus.businessNum3"
                />
              </div>
            </div>
          </template>
          <div class="report-pay--hr"></div>
        </template>

        <div class="report-pay--guide">
          <div class="line">
            전자세금계산서 교부 의무화에 따라 결제 시 결제증빙을 신청하지 않을
            경우 현금영수증 자진발급분으로 임의 발행됩니다.
          </div>
          <div class="line">
            현금영수증 자진발급 이후에는 세금계산서 발행이 불가능합니다.<br />
            자진발급분은 국세청 현금영수증 사이트를 통해 ‘자진발급분
            사용자등록’을 하셔야만 결제증빙효력이 발생됩니다.<br />
            지출증빙용 현금영수증은 세금계산서로 대체 가능(부가 가치세법
            제32조의 2제3항)하므로 현금영수증 발행 후 세금계산서 발행으로
            결제증빙 변경을 원하실 경우 현금영수증 사이트를 통해 현금영수증의
            용도를 ‘지출증빙’으로 직접 변경해 주시기 바랍니다.
          </div>
          <div class="line">
            현금영수증 자진발급이란?<br />
            소비자(사업자)가 현금영수증 발급을 요청하지 않더라도 국세청이 지정한
            고드(010-000-1234)로 현금영수증을 발급해 결제일로부터 18개월 이내
            국세청 사이트를 통해 자진발급분 사용자 등록을 하시면 본인의
            현금영수증으로 등록되는 제도입니다.<br />
            소비자는 필요한 경우 자진발급분에 대해 국세청 홈페이지에서
            소득공제용과 지출증빙용으로 지정하여 사용내역으로 등록 가능합니다.
          </div>
          <div class="line">
            자진발급분 사용자등록 방법<br />
            ① 국세청 > 로그인 > 조회/발급 > 현금영수증 > 현금영수증 수정 >
            자진발급분 소비자/사업자 등록<br />
            ② 현금영수증에 기재된 ‘승인번호, 가맹점 사업자번호(알바천국
            사업자번호), 거래일자, 거래금액’정보 입력<br />
            ③ 자진발급분 사용자등록 완료<br />
            * 신청하신 현금영수증은 등록 완료한 다음날 기업서비스 > 현금영수증
            확인 메뉴에서 확인 가능합니다.
          </div>
        </div>
      </template>

      <div class="report-pay--hr"></div>
      <label class="input-checkbox">
        <input type="checkbox" v-model="saveST" />
        <span class="box"></span>
        <span class="text">지금 선택하신 결제수단을 다음에도 사용</span>
      </label>
      <div class="report-pay--tit">환불 안내</div>
      <div class="report-pay--guide m-t--20">
        <div class="line">안심거래리포트 발급 완료 시, 환불되지 않습니다.</div>
        <div class="line">
          중도해지를 요청하는 경우 계약을 해지할 수 있습니다. (단, 이용기간이
          남은 경우)
        </div>
        <div class="line">
          이 경우 사용하신 건수만큼 계산하여 환불해드리며, 결제금액의 10%를
          위약금으로 공제합니다. (단, 무료로 제공된 건수 제외)
        </div>
        <div class="line">
          자세한 환불 문의 사항은 help@yourpick.kr 로 남겨주시기 바랍니다.
        </div>
      </div>
      <div class="report-pay--hr"></div>
      <div class="report-pay--tit">민원 책임</div>
      <div class="report-pay--guide m-t--20">
        <div class="line">
          유어픽에서 운영되는 사이트 내 판매되는 모든 상품은 유어픽에서 책임지고
          있습니다.
        </div>
        <div class="line">
          민원 담당자 김세빈 / 대표번호 02-2677-5319 (help@yourpick.kr)
        </div>
      </div>
      <div class="report-pay--hr"></div>
    </div>
    <div class="right">
      <div class="report-pay--tit txt-c--primary no-border">총 결제 금액</div>
      <div class="report-pay--box">
        <div class="line">
          <label class="label">총 상품 가격</label>
          {{ $numberMask(payItem.full_price) }} 원
        </div>
        <div class="line">
          <label class="label">총 할인 금액</label>
          {{ $numberMask(payItem.sale_price) }} 원
        </div>
        <div class="hr"></div>
        <div class="line">
          <label class="label">총 결제 금액</label>
          <strong>
            <span class="txt-c--primary">{{ $numberMask(payItem.price) }}</span>
            원
          </strong>
        </div>
        <label class="input-checkbox">
          <input type="checkbox" v-model="payAgree" />
          <span class="box"></span>
          <span class="text"
            >선택한 상품명, 할인내역, 총 결제 금액을 확인하였습니다.</span
          >
        </label>
        <button
          type="button"
          class="btn btn-primary"
          @click="paybtn"
          :disabled="!payAgree"
        >
          결제하기
        </button>
      </div>
    </div>
  </div>
  <ModalAdd
    v-if="addModalShow"
    @closeModal="closeModal"
    @resultAddress="resultAddress"
  />
</template>

<script>
import { mapGetters } from "vuex";
import CryptoJS from "crypto-js";
import ModalAdd from "../Modal/Service/ModalAdd";

export default {
  name: "Alarm",
  components: { ModalAdd },
  computed: {
    ...mapGetters({
      goodId: "getGoodId",
    }),
  },
  props: ["payType"],
  data() {
    return {
      deviceST: false,
      userInfo: null,
      payAgree: false,
      payItem: null,
      payInfo: {
        gopaymethod: "Vbank", //Card:Vbank ::::::::::::    CARD, VBANK
        mid: process.env.VUE_APP_INICIS_MID,
        oid: "1", //주문번호 PK,
        price: "200",
        timestamp: null,
        use_chkfake: "Y",
        signature: null,
        verification: null,
        mKey: null,
        currency: "WON",
        goodname: "테스트상품",
        buyername: "테스터",
        buyertel: "010-7158-6906",
        buyeremail: "supersw@naver.com",
        returnUrl: process.env.VUE_APP_HOST_BACK + "/user/pay/req",
        closeUrl: process.env.VUE_APP_HOST_BACK + "/user/pay/close",
        payViewType: 'popup',
        popupUrl: process.env.VUE_APP_HOST_BACK,

        // acceptmethod: 'noeasypay:below1000', //카드만
        acceptmethod: "", //카드만
      },

      receiptInfo: {
        tax: {
          businessNum1: "",
          businessNum2: "",
          businessNum3: "",
          medOfficeNm: "",
          rprsvNm: "",
          manager: "",
          email: "",
          tel1: "",
          tel2: "",
          tel3: "",
          typeBiz: "",
          itemsBiz: "",
          address: "",
          detailAddress: "",
        },
        receipt: {
          normal: {
            card: {
              cardNum1: "",
              cardNum2: "",
              cardNum3: "",
              cardNum4: "",
            },
            phone: {
              tel1: "",
              tel2: "",
              tel3: "",
            },
          },
          bus: {
            businessNum1: "",
            businessNum2: "",
            businessNum3: "",
          },
        },
      },
      payType: "card",
      isRType: "tax",
      isRUsage: "normal",
      isRlssued: "card",
      isRInfo: null,

      signKey: process.env.VUE_APP_INICIS_SIGN_KEY,

      addModalShow: false,

      saveST: false,
      // lssuedInfo: 'card',
    };
  },

  created() {
    this.isMobile();

    this.isRInfo = this.receiptInfo.tax;
    // https://stdpay.inicis.com/stdjs/INIStdPay.js 운영
    // https://stgstdpay.inicis.com/stdjs/INIStdPay.js test

    // signKey QnBrQ2JoRzZ1SmN0ZFhOa2NGYlIwdz09

    if (this.$route.query.mode === "1") {
      window.parent.location.href = process.env.VUE_APP_LOCAL + "/report/request/pay"; //url 입력
    //   window.parent.location.reload(); // 부모창 새로고침
    }
    

    this.$loadScript("https://stdpay.inicis.com/stdjs/INIStdPay.js")
      .then(() => {
        this.getPayInputItem();
      })
      .catch(() => {});
  },
  updated() {},
  methods: {
    isMobile() {
      const info = navigator.userAgent;
      var flag = false;

      if (
        info.indexOf("iPhone") > -1 ||
        info.indexOf("Android") > -1 ||
        info.indexOf("iPad") > -1 ||
        info.indexOf("iPod") > -1
      ) {
        flag = true;
      }
      this.deviceST = flag;
    },
    mobilePay() {
        const formData = {
            P_INI_PAYMENT: 'CARD',
            P_MID: this.payInfo.mid,
            P_OID: this.payInfo.oid,
            P_AMT: this.payInfo.price,
            P_GOODS: this.payInfo.goodname,
            P_UNAME: this.payInfo.buyername,
            P_MOBILE: this.payInfo.buyertel,
            P_EMAIL: this.payInfo.buyeremail,
            P_NEXT_URL: this.payInfo.returnUrl,
            // P_CHARSET: "ECU-KR",
            P_CHARSET: "utf8",
            P_RESERVED: null,
            P_NOTI: this.payInfo.oid,
        };

        if (this.payType == "bank") {
            formData.P_INI_PAYMENT = "VBANK";
            formData.P_NOTI_URL = process.env.VUE_APP_HOST_BACK + "/user/pay/vbank";
        } else if (this.payType == "naver") {
            formData.P_RESERVED = "d_npay=Y";
        } else if (this.payType == "kakao") {
            formData.P_RESERVED = "d_kakaopay=Y";
        } else if (this.payType == "payco") {
            formData.P_RESERVED = "d_payco=Y";
        } else if (this.payType == "toss") {
            formData.P_RESERVED = "d_tosspay=Y";
        } else {
            formData.P_INI_PAYMENT = "CARD";
            formData.P_RESERVED = "noeasypay=Y"
        }

        
        const form = document.createElement('form');
        form.method = 'post';
        form.acceptCharset = 'euc-kr';
        form.hidden = true;
        form.id = 'pay_form';
        form.action = 'https://mobile.inicis.com/smart/payment/';

        for (let o in formData) {
          const input = document.createElement('input');
          input.name = o;
          input.value = formData[o];
          input.hidden = true;
          form.appendChild(input);
        }

        document.getElementById('device_form').appendChild(form);
        form.target = "_self";
        form.submit();
    },
    pcPay(){
        const formData = {
            version:"1.0",
            gopaymethod:this.payInfo.gopaymethod,
            mid:this.payInfo.mid,
            oid:this.payInfo.oid,
            price:this.payInfo.price,
            timestamp:this.payInfo.timestamp,
            use_chkfake:this.payInfo.use_chkfake,
            signature:this.payInfo.signature,
            verification:this.payInfo.verification,
            mKey:this.payInfo.mKey,
            currency:this.payInfo.currency,
            goodname:this.payInfo.goodname,
            buyername:this.payInfo.buyername,
            buyertel:this.payInfo.buyertel,
            buyeremail:this.payInfo.buyeremail,
            returnUrl:this.payInfo.returnUrl,
            closeUrl:this.payInfo.closeUrl,
            acceptmethod:this.payInfo.acceptmethod,
        };

        if (this.payType == "bank") {
            formData.gopaymethod = "Vbank";

        } else if (this.payType == "naver") {
            formData.gopaymethod = "onlynaverpay";
            formData.acceptmethod = "cardonly";

        } else if (this.payType == "kakao") {
            formData.gopaymethod = "onlykakaopay";
            formData.acceptmethod = "cardonly";

        } else if (this.payType == "payco") {
            formData.gopaymethod = "onlypayco";
            formData.acceptmethod = "cardonly";

        } else if (this.payType == "toss") {
            formData.gopaymethod = "onlytosspay";
            formData.acceptmethod = "cardonly";

        } else {
            formData.gopaymethod = "Card";
            formData.acceptmethod = "noeasypay";
        }

        const form = document.createElement('form');
        form.method = 'post';
        form.acceptCharset = 'euc-kr';
        form.hidden = true;
        form.id = 'pay_pc_form';

        for (let o in formData) {
          const input = document.createElement('input');
          input.name = o;
          input.value = formData[o];
          input.hidden = true;
          form.appendChild(input);
        }

        document.getElementById('pc_form').appendChild(form);
        window.INIStdPay.pay("pay_pc_form");
        console.log("123123123123");
    },
    payInit() {
      this.payInfo.buyername = this.userInfo.name;
      this.payInfo.buyertel = this.userInfo.phone;
      this.payInfo.buyeremail =
        this.userInfo.email + "@" + this.userInfo.emailCom;

      this.payInfo.price = this.payItem.price;
      this.payInfo.goodname = this.payItem.info;

   
      

    //   if (
    //     this.payInfo.gopaymethod == "Card" ||
    //     this.payInfo.gopaymethod == "Vbank"
    //   ) {
    //     if (this.deviceST) {
    //       this.payInfo.acceptmethod = "noeasypay=Y";
    //     } else {
    //       this.payInfo.acceptmethod = "noeasypay";
    //     }
    //   } else {
    //     this.payInfo.acceptmethod = "";
    //   }

      this.payInfo.timestamp = Date.now();

      this.payInfo.signature = CryptoJS.SHA256(
        `oid=${this.payInfo.oid}&price=${this.payInfo.price}&timestamp=${this.payInfo.timestamp}`
      ).toString();
      this.payInfo.verification = CryptoJS.SHA256(
        `oid=${this.payInfo.oid}&price=${this.payInfo.price}&signKey=${this.signKey}&timestamp=${this.payInfo.timestamp}`
      ).toString();
      this.payInfo.mKey = CryptoJS.SHA256(this.signKey).toString();
    },
    paybtn() {
      // this.postPayItem();
      // $btnOnRouter('/report/request/publish')
      this.$apiPOST("/api/pay/oidReq", {
        gid: this.payItem.gId,
        price: this.payItem.price,
        payType: this.payType,
      }).then((re) => {
        if (!re) {
          alert("잘못된 요청입니다.");
          return;
        }

        this.payInfo.oid = re;
        this.payInit();

        if (this.deviceST) {
          this.mobilePay();
        } else {
        //     this.payInfo.gopaymethod = "onlykakaopay";
        //     // this.payInfo.acceptmethod = "cardonly";
        //     this.payInfo.acceptmethod = "";
        //   window.INIStdPay.pay("SendPayForm_id");
            this.pcPay();
        }
      });
    },
    getPayItem() {
      this.$apiGET("/api/goods/item?gid=" + this.goodId).then((re) => {
        this.payItem = re;

        this.payInit();
      });
    },
    resultAddress(item) {
      this.receiptInfo.tax.address = item.jibunAddr;
      this.closeModal();
    },
    closeModal() {
      this.addModalShow = false;
    },
    postPayItem() {
      this.isRInfo.payType = this.payType;
      if (this.payType == "bank") {
        this.isRInfo.receiptType = this.isRType;
        this.isRInfo.usage = this.isRUsage;
        this.isRInfo.lssuedInfo = this.isRlssued;
      }

      this.$apiPOST("/api/paySave", {
        receiptInfo:
          this.payType == "bank" ? this.isRInfo : { payType: this.payType },
        saveST: this.saveST,
      });
    },
    getPayInputItem() {
      this.$apiGET("/api/paySave").then((re) => {
        if (re) {
          this.receiptInfo = re.receiptInfo;
          this.payType = re.selected.payType;
          this.isRType = re.selected.isRType;
          this.isRUsage = re.selected.isRUsage;
          this.isRlssued = re.selected.isRlssued;
        }
        this.getInfo();
      });
    },
    getInfo() {
      this.$apiGET("/api/mypage/info").then((re) => {
        re.birthday = this.$dateFormat(re.birthday, "YYYYMMDD");
        re.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`);
        this.userInfo = re;

        this.getPayItem();
      });
    },
  },
};
</script>
