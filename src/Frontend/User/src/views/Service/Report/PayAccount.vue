<template>
	<div class="container">
		<div class="section w-1000">
			<div class="report-tit m-block">
				<button type="button" class="btn btn-back" @click="$btnOnRouterBack()"></button>
				결제
			</div>
			<ul class="report-state">
				<li class="item">
					<div class="num">1</div>
					주소 검색
				</li>
				<li class="item">
					<div class="num">2</div>
					주소 선택
				</li>
				<li class="item">
					<div class="num">3</div>
					거래 유형
				</li>
				<li class="item">
					<div class="num">4</div>
					거래 금액
				</li>
				<li class="item active">
					<div class="num">5</div>
					결제
				</li>
				<li class="item">
					<div class="num">6</div>
					발급 중
				</li>
				<li class="item">
					<div class="num">7</div>
					발급 완료
				</li>
			</ul>
			<div class="report-pay">
				<div class="left">
					<div class="report-pay--tit no-border">상품결제</div>
					<div class="m-block info">
						<div class="line">
							<label>상품명</label>
							유어픽 안심거래리포트
						</div>
						<div class="line">
							<label>기간</label>
							2023.01.01~2023.04.01
						</div>
						<div class="line">
							<label>이용 건 수</label>
							1건
						</div>
						<div class="line">
							<label>상품 금액</label>
							5,000원
						</div>
						<div class="line">
							<label>할인 금액</label>
							3,500원
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
								<td>유어픽 안심거래리포트</td>
								<td>2023.01.01~2023.04.01</td>
								<td>1건</td>
								<td>5,000원</td>
								<td>3,500원</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><span class="txt-c--grey">총 신청 금액</span></td>
								<td>1,500원</td>
							</tr>
						</table>
					</div>
					<div class="report-pay--tit">결제수단</div>
					<div class="report-pay--label">· 간편결제</div>
					<div class="report-pay--radio">
						<label class="radio">
							<input type="radio" name="radio" />
							<span class="box npay"></span>
						</label>
						<label class="radio">
							<input type="radio" name="radio" />
							<span class="box kakaopay"></span>
						</label>
						<label class="radio">
							<input type="radio" name="radio" />
							<span class="box payco"></span>
						</label>
						<label class="radio">
							<input type="radio" name="radio" />
							<span class="box toss"></span>
						</label>
					</div>
					<div class="report-pay--label">· 일반결제</div>
					<div class="report-pay--radio">
						<label class="radio">
							<input type="radio" name="radio" />
							<span class="box">신용카드</span>
						</label>
						<label class="radio">
							<input type="radio" name="radio" checked />
							<span class="box">가상계좌(무통장)입금</span>
						</label>
					</div>
					<div class="report-pay--hr"></div>

					<div class="report-pay--guide">
						<div class="line">
							가상계좌(무통장) 입금으로 결제하시려면 결제하기 버튼을 클릭 후 결제창에서 입금 은행을 선택해주세요.
						</div>
						<div class="line">
							가상계좌(무통장)입금은 고객님께 임의 발행되는 계좌를 통해 결제가 이루어지는 방식입니다.
						</div>
						<div class="line">인터넷뱅킹, 폰뱅킹 또는 은행 CD/ATM을 통해 입금하실 수 있습니다.</div>
						<div class="line">
							이용가능 은행: 케이뱅크, 기업, 신한, KB, 하나, NH, 우리, 대구, 부산, 우체국, 광주, SC, 경남, 전북, 수협 등
							15개 은행
						</div>
						<div class="line">
							입금기한은 서비스 신청일로부터 7일이며 기한 내 입금하지 않으실 경우 신청하신 서비스가 취소됩니다.
						</div>
						<div class="line">결제하기 버튼을 클릭하여 입금은행을 선택하시면 입금 계좌번호를 확인하실 수 있습니다.</div>
						<div class="line">결제 승인 진행에 다소 시간이 소요될 수 있으니 잠시만 기다려주세요.</div>
					</div>
					<div class="report-pay--hr"></div>
					<div class="input-wrap report-mo-input">
						<div class="input-label w-100">· 결제증빙 선택</div>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio2" checked />
							<span class="box type2"></span>
							<span class="text">세금계산서</span>
						</label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio2" />
							<span class="box type2"></span>
							<span class="text">현금영수증</span>
						</label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio2" />
							<span class="box type2"></span>
							<span class="text">신청안함</span>
						</label>
					</div>
					<div class="report-pay--hr"></div>
					<div class="row report-mo-row">
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 사업자번호</label>
								<input type="text" class="input-text" />
								<span class="unit">-</span>
								<input type="text" class="input-text" />
								<span class="unit">-</span>
								<input type="text" class="input-text w-85" />
							</div>
						</div>
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 상호(법인)명</label>
								<input type="text" class="input-text" />
							</div>
						</div>
					</div>
					<div class="row m-t--20 report-mo-row">
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 대표자</label>
								<input type="text" class="input-text" />
							</div>
						</div>
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 담당자</label>
								<input type="text" class="input-text" />
							</div>
						</div>
					</div>
					<div class="row m-t--20 report-mo-row">
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 이메일</label>
								<input type="text" class="input-text" />
							</div>
						</div>
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 연락처</label>
								<input type="text" class="input-text" />
								<span class="unit">-</span>
								<input type="text" class="input-text" />
								<span class="unit">-</span>
								<input type="text" class="input-text" />
							</div>
						</div>
					</div>
					<div class="row m-t--20 report-mo-row">
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 종목</label>
								<input type="text" class="input-text" />
							</div>
						</div>
						<div class="col-6">
							<div class="input-wrap">
								<label class="input-label w-100">· 업태</label>
								<input type="text" class="input-text" />
							</div>
						</div>
					</div>
					<div class="input-wrap m-t--20 mm">
						<label class="input-label w-100">· 주소</label>
						<input type="text" class="input-text" />
						<button type="button" class="btn btn-line btn-normal">주소 찾기</button>
					</div>
					<div class="input-wrap m-t--10">
						<label class="input-label w-100"></label>
						<input type="text" class="input-text" />
					</div>
					<div class="report-pay--hr"></div>
					<div class="input-wrap report-mo-input">
						<label class="input-label w-100">· 영수증 용도</label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio3" checked />
							<span class="box type2"></span>
							<span class="text">소득공제용(근로자 연말정산용)</span>
						</label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio3" />
							<span class="box type2"></span>
							<span class="text">지출증빙용(사업자 경비인정용)</span>
						</label>
					</div>
					<div class="report-pay--hr"></div>
					<div class="input-wrap m-none">
						<label class="input-label w-100">· 발급 정보</label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio4" checked />
							<span class="box type2"></span>
							<span class="text">현금영수증 카드번호</span>
						</label>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
					</div>
					<div class="m-block">
						<div class="input-wrap">
							<label class="input-label w-100">· 발급 정보</label>
							<label class="input-radio">
								<input type="radio" class="input-radio" name="radio4" checked />
								<span class="box type2"></span>
								<span class="text">현금영수증 카드번호</span>
							</label>
						</div>
						<div class="input-wrap m-t--10 p-t--0">
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
						</div>
					</div>
					<div class="input-wrap m-t--20 m-none">
						<label class="input-label w-100"></label>
						<label class="input-radio">
							<input type="radio" class="input-radio" name="radio4" />
							<span class="box type2"></span>
							<span class="text">휴대폰 번호</span>
						</label>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
					</div>
					<div class="m-block">
						<div class="input-wrap">
							<label class="input-label w-100"></label>
							<label class="input-radio">
								<input type="radio" class="input-radio" name="radio4" />
								<span class="box type2"></span>
								<span class="text">휴대폰 번호</span>
							</label>
						</div>
						<div class="input-wrap m-t--10 p-t--0">
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
						</div>
					</div>
					<div class="report-pay--hr"></div>
					<div class="input-wrap m-none">
						<label class="input-label w-100">· 발급 정보</label>
						<span class="unit txt-c--grey m-r--20">사업자등록번호</span>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
						<span class="unit">-</span>
						<input type="text" class="input-text" />
					</div>
					<div class="m-block">
						<div class="input-wrap">
							<label class="input-label w-100">· 발급 정보</label>
							<span class="unit txt-c--grey m-r--20">사업자등록번호</span>
						</div>
						<div class="input-wrap m-t--0 p-t--0">
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
							<span class="unit">-</span>
							<input type="text" class="input-text" />
						</div>
					</div>
					<div class="report-pay--hr"></div>
					<div class="report-pay--guide">
						<div class="line">
							전자세금계산서 교부 의무화에 따라 결제 시 결제증빙을 신청하지 않을 경우 현금영수증 자진발급분으로 임의
							발행됩니다.
						</div>
						<div class="line">
							현금영수증 자진발급 이후에는 세금계산서 발행이 불가능합니다.<br />
							자진발급분은 국세청 현금영수증 사이트를 통해 ‘자진발급분 사용자등록’을 하셔야만 결제증빙효력이
							발생됩니다.<br />
							지출증빙용 현금영수증은 세금계산서로 대체 가능(부가 가치세법 제32조의 2제3항)하므로 현금영수증 발행 후
							세금계산서 발행으로 결제증빙 변경을 원하실 경우 현금영수증 사이트를 통해 현금영수증의 용도를
							‘지출증빙’으로 직접 변경해 주시기 바랍니다.
						</div>
						<div class="line">
							현금영수증 자진발급이란?<br />
							소비자(사업자)가 현금영수증 발급을 요청하지 않더라도 국세청이 지정한 고드(010-000-1234)로 현금영수증을
							발급해 결제일로부터 18개월 이내 국세청 사이트를 통해 자진발급분 사용자 등록을 하시면 본인의 현금영수증으로
							등록되는 제도입니다.<br />
							소비자는 필요한 경우 자진발급분에 대해 국세청 홈페이지에서 소득공제용과 지출증빙용으로 지정하여
							사용내역으로 등록 가능합니다.
						</div>
						<div class="line">
							자진발급분 사용자등록 방법<br />
							① 국세청 > 로그인 > 조회/발급 > 현금영수증 > 현금영수증 수정 > 자진발급분 소비자/사업자 등록<br />
							② 현금영수증에 기재된 ‘승인번호, 가맹점 사업자번호(알바천국 사업자번호), 거래일자, 거래금액’정보 입력<br />
							③ 자진발급분 사용자등록 완료<br />
							* 신청하신 현금영수증은 등록 완료한 다음날 기업서비스 > 현금영수증 확인 메뉴에서 확인 가능합니다.
						</div>
					</div>
					<div class="report-pay--hr"></div>
					<label class="input-checkbox">
						<input type="checkbox" />
						<span class="box"></span>
						<span class="text">지금 선택하신 결제수단을 다음에도 사용</span>
					</label>
					<div class="report-pay--tit">환불 안내</div>
					<div class="report-pay--guide m-t--20">
						<div class="line">안심거래리포트 발급 완료 시, 환불되지 않습니다.</div>
						<div class="line">중도해지를 요청하는 경우 계약을 해지할 수 있습니다. (단, 이용기간이 남은 경우)</div>
						<div class="line">
							이 경우 사용하신 건수만큼 계산하여 환불해드리며, 결제금액의 10%를 위약금으로 공제합니다. (단, 무료로
							제공된 건수 제외)
						</div>
						<div class="line">자세한 환불 문의 사항은 help@yourpick.kr 로 남겨주시기 바랍니다.</div>
					</div>
					<div class="report-pay--hr"></div>
				</div>
				<div class="right">
					<div class="report-pay--tit txt-c--primary no-border">총 결제 금액</div>
					<div class="report-pay--box">
						<div class="line">
							<label class="label">총 상품 가격</label>
							5,000 원
						</div>
						<div class="line">
							<label class="label">총 할인 금액</label>
							3,500 원
						</div>
						<div class="hr"></div>
						<div class="line">
							<label class="label">총 결제 금액</label>
							<strong><span class="txt-c--primary">1,500</span> 원</strong>
						</div>
						<label class="input-checkbox">
							<input type="checkbox" />
							<span class="box"></span>
							<span class="text">선택한 상품명, 할인내역, 총 결제 금액을 확인하였습니다.</span>
						</label>
						<button type="button" class="btn btn-primary" disabled>결제하기</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Alarm',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
