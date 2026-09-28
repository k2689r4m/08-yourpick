<template>
	<div class="container" v-if="reData">
		<div class="report-view">
			<div class="report-view--top">
				<img src="../../assets/images/logo_en2.png" alt="" class="logo" />
				안전한 부동산 거래를 위한 당신의 선택
				<div class="tit">안심거래리포트</div>
			</div>
			<div class="report-view--tab">
				<button type="button" class="btn" @click="$refs.stage1.scrollIntoView({ behavior: 'smooth' })">
					매물 개요
				</button>
				<button type="button" class="btn" @click="$refs.stage2.scrollIntoView({ behavior: 'smooth' })">
					가격 분석
				</button>
				<button type="button" class="btn" @click="$refs.stage3.scrollIntoView({ behavior: 'smooth' })">
					권리 분석
				</button>
				<button type="button" class="btn" @click="$refs.stage4.scrollIntoView({ behavior: 'smooth' })">참고사항</button>
			</div>
			<div class="report-view--info">
				<img src="../../assets/images/city.png" alt="" />
				<table class="table">
					<tr>
						<th>매물 주소</th>
						<th>거래 유형</th>
						<th>거래 금액</th>
					</tr>
					<tr>
						<td>
							{{ reData.siNm }} {{ reData.sggNm }} {{ reData.emdNm }}
							{{ reData.lnbrSlno ? reData.lnbrMnnm + '-' + reData.lnbrSlno : reData.lnbrMnnm }}<br />{{
								reData.complexName
							}}
							{{ reData.realEstateTypeName }}
							{{ reData.dongNm ? reData.dongNm + '동' : '' }}
							{{ reData.hoNm ? reData.hoNm + '호' : '' }}
						</td>
						<td>매매</td>
						<td>{{ $formatMoney(reData.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
					</tr>
				</table>
			</div>
			<div class="report-view--tit">안심거래리포트</div>
			<div class="report-view--con" ref="stage1">
				<div class="con-tit"><span class="num">01</span> 매물 개요</div>
				<div class="con-flex">
					<div class="left">
						<div class="img-wrap">
							<img v-if="reData.realEstateTypeCode == 'APT'" src="../../assets/images/report_type1.jpg" alt="" />
                            <img v-else-if="reData.realEstateTypeCode == 'OPST'" src="../../assets/images/report_type2.jpg" alt="" />
                            <img v-else-if="reData.realEstateTypeCode == 'JT'" src="../../assets/images/report_type4.jpg" alt="" />
                            <img v-else src="../../assets/images/report_type3.jpg" alt="" />
						</div>
					</div>
					<div class="right">
						<div class="info">
							<div class="top">
								<div class="tit">
									{{ reData.siNm }} {{ reData.sggNm }} {{ reData.emdNm }}
									{{ reData.lnbrSlno ? reData.lnbrMnnm + '-' + reData.lnbrSlno : reData.lnbrMnnm }}
								</div>
								({{ reData.complexName }}
								{{ reData.realEstateTypeName }}
								{{ reData.dongNm ? reData.dongNm + '동' : '' }}
								{{ reData.hoNm ? reData.hoNm + '호' : '' }})
							</div>
							<div class="hr"></div>
							<div class="line">
								<span>매물유형</span>
								<span>{{ reData.realEstateTypeName }}</span>
							</div>
							<div class="line">
								<span>거래유형</span>
								<span>매매</span>
							</div>
							<div class="hr"></div>
							<div class="line">
								<span>거래금액</span>
								<strong>{{ $formatMoney(reData.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</strong>
							</div>
							<div class="line">
								<span>전용면적</span>
								<span>{{ reData.exclusiveArea }}m²</span>
							</div>
							<div class="line">
								<span>사용승인일</span>
								<span>{{ $dateFormat(reData.useApproveYmd, 'YYYY.MM.DD') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="con-sub">· YOURPICK 안심거래 점수</div>
				<div class="con-flex">
					<div class="left">
						<div class="circle-score">
							<div class="center-circle">
								<div class="arrow" :style="'transform:rotate(' + reData.totalScore * 1.8 + 'deg)'"></div>
								<div class="num">{{ reData.totalScore }}</div>
								<div class="text">보통</div>
							</div>
						</div>
					</div>
					<div class="right">
						<div class="score-info">
							<div class="line">
								<div class="label">가격분석</div>
								{{ reData.prScore }}점
							</div>
							<div class="line">
								<div class="label">권리분석</div>
								{{ reData.rtScore }}점
							</div>
							<div class="box" style="min-width: 330px">
								<div class="box-line" v-for="(is, idx) in reData.scoreInfo" :key="'score_' + idx">
									<div class="label">· 감점요소 {{ idx + 1 }}</div>
									{{ is.info }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="con-box">
					<div class="line">해당 매물에 대한 유어픽 안심거래 점수는 ‘{{ reData.totalScore }}점‘ 입니다.</div>
					<div class="line">
						{{ $dateFormat(reData.updated_at, 'YY.MM.DD HH') }}시 기준, 유어픽에서 분석한 최종적인 안심거래 리포트
						자료입니다.
					</div>
					<div class="line">
						가격 분석, 권리 분석 등에 대한 최종적인 점수이며, 점수가 높을수록 안전한 매물에 가깝습니다.
					</div>
				</div>
			</div>
			<div class="report-view--con" ref="stage2">
				<div class="con-tit"><span class="num">02</span> 가격 분석</div>
				<div class="con-sub">· 해당 {{ reData.realEstateTypeName }} 기준 시세정보</div>
				<div class="con-price">
					<div class="top">
						내 매매 금액 <strong>{{ $formatMoney(reData.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</strong>
					</div>
					<div class="center">
						<div class="left">
							시세 기준월
							<strong>{{ reData.chartData.isDate }}</strong>
						</div>
						<div class="right">
							<div class="box">
								매매 하위 평균
								<strong>{{ reData.chartData.info?.minAvg ? reData.chartData.info.minAvgKor : '현재 시세 없음' }}</strong>
							</div>
							<div class="box">
								매매 일반 평균
								<strong>{{ reData.chartData.info?.norAvg ? reData.chartData.info.norAvgKor : '현재 시세 없음' }}</strong>
							</div>
							<div class="box">
								매매 상위 평균
								<strong>{{ reData.chartData.info?.maxAvg ? reData.chartData.info.maxAvgKor : '현재 시세 없음' }}</strong>
							</div>
						</div>
					</div>
					<div class="chart-wrap">
                        <div v-if="!reData.chartData.dateChart.length" class="dim">현재 시세 없음</div>
						<div class="tit">시세추이</div>
						<div class="legend">
							<div class="color1">매매</div>
							<div class="color2">전세</div>
						</div>
						<canvas id="myChart"></canvas>
					</div>
				</div>
				<div class="con-sub m-b--10">· 해당 {{ reData.realEstateTypeName }} 최근 2년간 실거래가 통계</div>
				<div class="con-flex m-none">
					<div class="dim" v-if="!reData.report4.realPrcList1.length">현재 시세 없음</div>
					<div class="left">
						<table class="table text-center top-border--none">
							<tr>
								<th>계약일</th>
								<th>거래</th>
								<th>가격</th>
								<th>총</th>
							</tr>
							<tr v-for="(is, idx) in reData.report4.realPrcList1" :key="'relist_' + idx">
								<td>{{ $dateFormat(is.tradeYearMonth, 'YY.MM.DD') }}</td>
								<td>매매</td>
								<td>{{ $formatMoney(is.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
								<td>{{ is.floor }}층</td>
							</tr>
						</table>
					</div>
					<div class="right">
						<table class="table text-center top-border--none">
							<tr>
								<th>계약일</th>
								<th>거래</th>
								<th>가격</th>
								<th>총</th>
							</tr>
							<tr v-for="(is, idx) in reData.report4.realPrcList2" :key="'relist2_' + idx">
								<td>{{ $dateFormat(is.tradeYearMonth, 'YY.MM.DD') }}</td>
								<td>매매</td>
								<td>{{ $formatMoney(is.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
								<td>{{ is.floor }}층</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="m-block">
					<div class="dim" v-if="!reData.report4.realPrcList1.length">현재 시세 없음</div>
					<table class="table text-center top-border--none">
						<tr v-for="(is, idx) in reData.report4.realPrcList1" :key="'relist_' + idx">
							<td>{{ $dateFormat(is.tradeYearMonth, 'YY.MM.DD') }}</td>
							<td>매매</td>
							<td>{{ $formatMoney(is.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
							<td>{{ is.floor }}층</td>
						</tr>
						<tr v-for="(is, idx) in reData.report4.realPrcList2" :key="'relist2_' + idx">
							<td>{{ $dateFormat(is.tradeYearMonth, 'YY.MM.DD') }}</td>
							<td>매매</td>
							<td>{{ $formatMoney(is.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
							<td>{{ is.floor }}층</td>
						</tr>
					</table>
				</div>
				<div class="con-flex type3">
					<div class="left">
						<div class="table-tit">- 해당 {{ reData.realEstateTypeName }} 가격 분석</div>
						<table class="table grey text-center top-border--none">
							<tr>
								<th>평균 실거래가</th>
								<td>
									{{ reData.report5.leftRealPrcKor ? reData.report5.leftRealPrcKor : reData.report5.leftRealInfo }}
								</td>
							</tr>
							<tr>
								<th>호가 최대가</th>
								<td>
									{{ reData.report5.leftHoPrcKorMax ? reData.report5.leftHoPrcKorMax : reData.report5.leftHoInfoMax }}
								</td>
							</tr>
							<tr>
								<th>호가 최저가</th>
								<td>
									{{ reData.report5.leftHoPrcKorMin ? reData.report5.leftHoPrcKorMin : reData.report5.leftHoInfoMin }}
								</td>
							</tr>
						</table>
					</div>
					<div class="right">
						<div class="table-tit">- 내 매물 분석하기</div>
						<table class="table pink-table">
							<tr>
								<td>
									{{ reData.report5.rightRealPrcKor }}
									<p class="sm">
										{{ reData.report5.rightRealInfo ? reData.report5.rightRealInfo : '' }}
									</p>
								</td>
							</tr>
							<tr>
								<td>
									{{ reData.report5.rightHoPrcKorMax }}
									<p class="sm">
										{{ reData.report5.rightHoInfoMax ? reData.report5.rightHoInfoMax : '' }}
									</p>
								</td>
							</tr>
							<tr>
								<td>
									{{ reData.report5.rightHoPrcKorMin }}
									<p class="sm">
										{{ reData.report5.rightHoInfoMin ? reData.report5.rightHoInfoMin : '' }}
									</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="con-box">
					<div class="line">
						해당 {{ reData.realEstateTypeName }}동일한 면적(m²)의 호수들에 대한 분석으로 이루어졌습니다.
					</div>
				</div>
				<div class="con-sub m-b--0">· 주변 {{ reData.emdNm }} {{ reData.realEstateTypeName }} 가격 분석</div>
				<div class="con-flex type3">
					<div class="left">
						<div class="table-tit">- 평당가 및 호가 분석</div>
						<table class="table text-center grey top-border--none">
							<tr>
								<th>평균 평당가</th>
								<td>
									{{
										reData.report6.leftPerSpacePrcKor
											? reData.report6.leftPerSpacePrcKor
											: reData.report6.leftPerSpacePrcInfo
									}}
								</td>
							</tr>
							<tr>
								<th>호가 최대가</th>
								<td>
									{{ reData.report6.leftHoPrcKorMax ? reData.report6.leftHoPrcKorMax : reData.report6.leftHoInfoMax }}
								</td>
							</tr>
							<tr>
								<th>호가 평균가</th>
								<td>
									{{ reData.report6.leftHoPrcKorAvg ? reData.report6.leftHoPrcKorAvg : reData.report6.leftHoInfoAvg }}
								</td>
							</tr>
							<tr>
								<th>호가 최저가</th>
								<td>
									{{ reData.report6.leftHoPrcKorMin ? reData.report6.leftHoPrcKorMin : reData.report6.leftHoInfoMin }}
								</td>
							</tr>
						</table>
					</div>
					<div class="right">
						<div class="table-tit">- 내 매물 분석하기</div>
						<table class="table pink-table">
							<tr>
								<td>
									{{
										reData.report6.rightPerSpacePrcKor
											? reData.report6.rightPerSpacePrcKor
											: reData.report6.rightPerSpacePrcInfo
									}}
									<p class="sm">
										{{ reData.report6.rightPerSpacePrcKor ? reData.report6.rightPerSpacePrcInfo : '' }}
									</p>
								</td>
							</tr>
							<tr>
								<td>
									{{
										reData.report6.rightHoPrcKorMax ? reData.report6.rightHoPrcKorMax : reData.report6.rightHoInfoMax
									}}
									<p class="sm">
										{{ reData.report6.rightHoPrcKorMax ? reData.report6.rightHoInfoMax : '' }}
									</p>
								</td>
							</tr>
							<tr>
								<td>
									{{
										reData.report6.rightHoPrcKorAvg ? reData.report6.rightHoPrcKorAvg : reData.report6.rightHoInfoAvg
									}}
									<p class="sm">
										{{ reData.report6.rightHoPrcKorAvg ? reData.report6.rightHoInfoAvg : '' }}
									</p>
								</td>
							</tr>
							<tr>
								<td>
									{{
										reData.report6.rightHoPrcKorMin ? reData.report6.rightHoPrcKorMin : reData.report6.rightHoInfoMin
									}}
									<p class="sm">
										{{ reData.report6.rightHoPrcKorMin ? reData.report6.rightHoInfoMin : '' }}
									</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="con-box">
					<div class="line">
						{{ reData.emdNm }}에 위치한 동일한 건물 유형, 동일한 면적(m²) 기준 가격 분석으로 이루어졌습니다. 일정
						면적(m²) 오차 범위가 발생할 수 있으니 참고하시기 바랍니다.
					</div>
				</div>
				<div class="table-tit">- 건축연도 기준 평균 실거래가</div>
				<div class="con-flex type2 m-none">
					<div class="left">
						<table class="table top-border--none text-center">
							<colgroup>
								<col width="50%" />
								<col width="50%" />
							</colgroup>
							<tr>
								<th>매매</th>
								<th>전세</th>
							</tr>
							<tr>
								<td>
									{{ reData.report7[0].a1AvgKor }}
								</td>
								<td>
									{{ reData.report7[0].b1AvgKor }}
								</td>
							</tr>
						</table>
						<div class="p-t--10 txt-center">
							<strong>{{ reData.report7[0].year }}년</strong>
						</div>
					</div>
					<div class="right">
						<table class="table top-border--none text-center">
							<colgroup>
								<col width="50%" />
								<col width="50%" />
							</colgroup>
							<tr>
								<th>매매</th>
								<th>전세</th>
							</tr>
							<tr>
								<td>
									{{ reData.report7[1].a1AvgKor }}
								</td>
								<td>
									{{ reData.report7[1].b1AvgKor }}
								</td>
							</tr>
						</table>
						<div class="p-t--10 txt-center">
							<strong>{{ reData.report7[1].year }}년</strong>
						</div>
					</div>
					<div class="right">
						<table class="table top-border--none text-center">
							<colgroup>
								<col width="50%" />
								<col width="50%" />
							</colgroup>
							<tr>
								<th>매매</th>
								<th>전세</th>
							</tr>
							<tr>
								<td>
									{{ reData.report7[2].a1AvgKor }}
								</td>
								<td>
									{{ reData.report7[2].b1AvgKor }}
								</td>
							</tr>
						</table>
						<div class="p-t--10 txt-center">
							<strong>{{ reData.report7[2].year }}년</strong>
						</div>
					</div>
				</div>
				<div class="m-block">
					<table class="table text-center top-border--none">
						<tr>
							<th>건축연도</th>
							<th>매매</th>
							<th>전세</th>
						</tr>
						<tr>
							<td>2023년</td>
							<td>7억 3,000만 원</td>
							<td>4억 8,000만 원</td>
						</tr>
						<tr>
							<td>2023년</td>
							<td>7억 3,000만 원</td>
							<td>4억 8,000만 원</td>
						</tr>
						<tr>
							<td>2023년</td>
							<td>7억 3,000만 원</td>
							<td>4억 8,000만 원</td>
						</tr>
					</table>
				</div>
				<div class="con-box">
					<div class="line">
						해당 연도에 지어진 건물 간 가격 비교 분석 자료입니다. 건축물대장 사용승인일 기준으로 분석되었으며, 신축 건물
						대비 내 매물에 대한 전반적인 시세 파악이 용이합니다. 일정 오차가 발생할 수 있으니 참고하시기 바랍니다.
					</div>
				</div>
				<div class="table-tit">- 건설사 가치 기준 평균 실거래가</div>
				<div class="bar-graph">
					<div class="line">
						<div class="label color1">1군 건설사</div>
						<div class="bar-wrap">
							<div class="bar color1" :style="'width: ' + reData.report8.truePer">
								<span class="text">{{ reData.report8.true.a1AvgKor }}</span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="label color2">그 외</div>
						<div class="bar-wrap">
							<div class="bar color2" :style="'width: ' + reData.report8.falsePer">
								<span class="text">{{ reData.report8.false.a1AvgKor }}</span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="label color3">내 매물</div>
						<div class="bar-wrap">
							<div class="bar color3" :style="'width: ' + reData.report8.pricePer">
								<span class="text">{{ $formatMoney(reData.dealPrice, $MONEY_FORMAT_TYPE.TAX) }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="con-box">
					<div class="line">최근 2년간 발생한 실거래가 평균 가격에 대한 분석 정보입니다. (동일한 면적 기준)</div>
					<div class="line">
						1군 건설사는 국토교통부에서 매년 평가되는 각 건설사들의 경영상태, 기술능력, 실적 등을 토대로 분류되었습니다.
					</div>
					<div class="line">
						브랜드평판지수 및 건설사 순위를 바탕으로 해당 동에 위치한 실거래가를 분석하여 보다 정확한 정보를 제공합니다.
						<br />
						(건설사: 현대건설, GS건설, 삼성물산, 대우건설, 롯데건설, 대림산업, HDC현대산업개발, 포스크, 우미건설,
						두산건설)
					</div>
				</div>
			</div>
			<div class="report-view--con" ref="stage3">
				<div class="con-tit m-b--0"><span class="num">03</span> 권리 분석</div>
				<div class="con-flex type3">
					<div class="left">
						<div class="table-tit">- 해당 {{ reData.realEstateTypeName }} 권리 분석</div>
						<table class="table text-center grey top-border--none">
							<tr>
								<th>{{ reData.realEstateTypeName }} 근저당<br />보유비율</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
							<tr>
								<th>{{ reData.realEstateTypeName }} 평균<br />채권 최고액</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
							<tr>
								<th>{{ reData.realEstateTypeName }} 평균<br />순자산</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
							<tr>
								<th>{{ reData.realEstateTypeName }} 전세권<br />설정 비율</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
							<tr>
								<th>{{ reData.realEstateTypeName }} 평균<br />등기사항</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
							<tr>
								<th>{{ reData.realEstateTypeName }} 등기부<br />클린 점수</th>
								<td>현재 자료 수집 중 입니다.</td>
							</tr>
						</table>
					</div>
					<div class="right">
						<div class="table-tit">- 내 매물 분석하기</div>
						<table class="table pink-table top-border--none">
							<tr>
								<th>근저당 여부</th>
								<td class="bg-white">
									<strong>{{ reData.regData.collateralST }}</strong>
									{{ reData.regData.collateralSTName ? '(채무자: ' + reData.regData.collateralSTName + ')' : '' }}
									<p class="sm">{{ reData.regData.collateralSTInfo }}</p>
								</td>
							</tr>
							<tr>
								<th>채권 최고액</th>
								<td class="bg-white">
									{{ reData.regData.collateralPrc ? reData.regData.collateralPrc : '' }}
									<p class="sm">{{ reData.regData.collateralPrcInfo }}</p>
								</td>
							</tr>
							<tr>
								<th>순자산<br /><span class="xsm">(거래금액-채권최고액)</span></th>
								<td class="bg-white">
									{{ reData.regData.realPrc }}
									<p class="sm">해당 매물의 순자산은 {{ reData.regData.realPrc }}이에요.</p>
								</td>
							</tr>
							<tr>
								<th>전세권 여부</th>
								<td class="bg-white">
									<strong>{{ reData.regData.jeonseSt }}</strong>
									<p class="sm">{{ reData.regData.jeonseStInfo }}</p>
								</td>
							</tr>
							<tr>
								<th>등기사항</th>
								<td class="bg-white">
									{{ reData.regData.regCount }}건
									<p class="sm">
										해당 매물은 소유권 이외의 권리 등기사항은 {{ reData.regData.regCount }}건이 설정되어 있어요.
									</p>
								</td>
							</tr>
							<tr>
								<th>등기부<br />클린점수</th>
								<td class="bg-white">
									{{ reData.rtScore }}점
									<p class="sm">해당 매물의 클린 점수는 {{ reData.rtScore }}점이에요. 높을 수록 안전해요.</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="con-box">
					<div class="line">
						채권최고액: 현재 또는 장래에 발생할 채권으로 일정한 금액을 한도로 설정한 것을 뜻합니다.
					</div>
					<div class="line">순자산: 거래금액에서 채권최고액을 제외한 금액입니다.</div>
					<div class="line">전세권: 전세금을 지급하고 타인의 부동산을 일정기간동안 사용하는 것을 뜻합니다.</div>
					<div class="line">등기부 클린 점수: 등기부등본의 권리 안전성을 분석한 유어픽만의 데이터 기반 점수입니다.</div>
				</div>
				<div class="m-block m-t--40"></div>
				<div class="con-tit">Q) 집을 알아볼 때, 다른 집에 대한 정보는 왜 필요한가요?</div>
				<div class="con-flex">
					<div class="left">
						<img src="../../assets/images/cartoon1.png" alt="" />
					</div>
					<div class="left m-l--10">
						<img src="../../assets/images/cartoon2.png" alt="" />
					</div>
				</div>
				<div class="con-pinkbox">
					A) 집을 사고 팔 때, 내가 알아보고자 하는 집 뿐 아니라 그 건물의 전반적인 조건을 함께 살펴보시면 좋아요!<br />
					해당 건물의 전반적인 근저당 보유 비율 및 전세권 비율을 통해 실 거주 중인 집주인이 많은 지, 세입자가 많은지를
					파악할 수 있어요. 이를 통해 그 집이 어떠한 조건들을 갖추고 있는 지 비교 분석하기 용이해요.
				</div>
				<div class="table-tit">- 내 매물 등기사항</div>
				<table class="table text-center top-border--none">
					<tr>
						<th>등기 항목</th>
						<th>등기일시</th>
						<th>설정자</th>
						<th>비고</th>
					</tr>
					<tr v-for="(r, idx) in reData.regData.myRegList" :key="'reglist_' + idx">
						<td>{{ r.등기목적 == '' ? '-' : r.등기목적 }}</td>
						<td>{{ !r.등기원인 ? '-' : r.등기원인?.일시 }}</td>
						<td>{{ r.설정자 == '' ? '-' : r.설정자 }}</td>
						<td v-if="r.등기목적 == '근저당권설정'">
							채무자 {{ r.기타사항.채무자 }} / 채권최고액
							{{ $formatMoney(r.기타사항.채권최고액, $MONEY_FORMAT_TYPE.TAX) }}
						</td>
						<td v-else>-</td>
					</tr>
				</table>
				<div class="con-box">
					<div class="line" v-for="(r, idx) in reData.regData.myRegList" :key="'reglist2_' + idx">
						<template v-if="!r.삭제여부">
							{{ r.설명 }}
						</template>
					</div>
				</div>
				<div class="table-tit">- 기타 사항 (건축물대장)</div>
				<table class="table text-center top-border--none">
					<colgroup>
						<col width="33.3%" />
						<col width="33.3%" />
						<col width="33.3%" />
					</colgroup>
					<tr>
						<th>항목</th>
						<th>내용</th>
						<th>비고</th>
					</tr>
					<tr>
						<td>위반 건축물 여부</td>
						<td>X</td>
						<td>-</td>
					</tr>
					<tr>
						<td>주 용도</td>
						<td>{{ reData.mainPurpsCdNm }}</td>
						<td>-</td>
					</tr>
					<tr>
						<td>변동사항</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</table>
				<div class="con-box">
					<div class="line">
						유어픽 안심거래리포트는 부동산 계약 시 참고 분석 자료입니다. 모든 판단의 책임은 해당 리포트를 열람하는
						이용자에게 있습니다.
					</div>
				</div>
			</div>
			<div class="report-view--con" ref="stage4">
				<div class="con-tit"><span class="num">04</span> 참고사항</div>
				<div class="con-reference">
					<div class="con-reference--tit">매매계약 진행 시 꼭 확인해야 할 사항</div>
					<div class="con-reference--box">
						<div class="tit">등기부등본과 건축물 대장 간 부동산용도 표기가 일치하는지 확인 할 것</div>
						<img src="../../assets/images/report_reference1.jpg" alt="" />
						<div class="con">
							등기부등본과 건축물대장이 일치하지 않는 경우가 종종 있습니다. 예를 들어 건축물대장에서 용도변경이
							이루어졌지만 별도로 등기변경신청을 하지 않아 등기부등본이 변경되지 않은 경우가 발생할 수 있습니다.<br />
							이와 같은 경우 권리관계는 등기부등본을 따라가기 때문에 불일치 상황 속에서 매매계약 후 소유권이전등기를
							신청하였을때 등기가 취소 되는 문제가 생길 수 있습니다.
						</div>
					</div>
					<div class="con-reference--box">
						<div class="tit">계약할 매도인이 진짜 소유자가 맞는지 확인 할 것</div>
						<img src="../../assets/images/report_reference2.jpg" alt="" />
						<div class="con">
							소유자의 제대로 된 신원 확인을 위해 매도인의 주민등록번호를가까운 등기소나 인터넷등기소로 확인할 수
							있습니다.<br />
							추가적으로 매도인의 재산세 납부내역서를 확인하는 것도 좋은 방법입니다. (최소 10년)
							<p class="sm">
								* 10년 이유는? 민법상 인정되는 등기부 취득시효는 정당한 원인 행위로 등기가 돼 있는사람은 등기상 10년만
								있으면 어떤 이유가 있더라도 소유권을 인정 해주기 때문입니다. 진정한 소유자를 확인하는 것과 동시에 진정한
								소유자가 매도의사가 있는지도 확인이 가능합니다.
							</p>
						</div>
					</div>
					<div class="con-reference--box">
						<div class="tit">등기부등본상 기재된 내용이 현황과 일치하는지 확인 할 것</div>
						<img src="../../assets/images/report_reference3.jpg" alt="" class="m-none" />
						<img src="../../assets/images/report_reference3_mo.jpg" alt="" class="m-block" />
						<div class="con">
							등기부등본상 기재된 내용이 현재 사실관계와 일치하는지 확인 해야합니다.<br />
							만약 불일치 하다면 현재 사실 관계와 일치하도록 등기말소 또는 변경을 요청해야 합니다.
						</div>
					</div>
				</div>
				<div class="con-reference">
					<div class="con-reference--tit">매매 시 필요한 준비 서류</div>
					<table class="con-reference--table">
						<colgroup>
							<col width="50%" />
							<col width="50%" />
						</colgroup>
						<tr>
							<th>매도인<br />(부동산을 팔려는 사람)</th>
							<th>매수인<br />(부동산을 사려는 사람</th>
						</tr>
						<tr>
							<td>
								1. 등기권리증 (등기필증)<br />
								2. 인감증명서 (매도용)<br />
								3. 인감도장<br />
								4. 신분증<br />
								5. 주민등록초본 (주소변동 포함)<br />
								6. 선수관리비 영수증 또는 확인서
							</td>
							<td>
								1. 주민등록등본<br />
								(필요시 주소변동포함 초본)<br />
								2. 가족관계증명서 (상세)<br />
								3. 도장<br />
								4. 신분증
							</td>
						</tr>
					</table>
				</div>
				<div class="con-reference">
					<div class="con-reference--tit">매매 계약 절차</div>
					<ul class="con-reference--state">
						<li class="item color1">
							<div class="state"><span class="num">01</span>현장답사</div>
							대상 부동산의 권리 및 시설물 상태를 충분히 확인한 후 계약하기
						</li>
						<li class="item color2">
							<div class="state"><span class="num">02</span>가계약 또는<br />본 계약 진행</div>
							소유자와 계약자가 동일한 사람인지 확인하고 계약금을 입금하여 계약 진행
						</li>
					</ul>
					<ul class="con-reference--state">
						<li class="item color3">
							<div class="state"><span class="num">03</span>매매계약서 작성<br />및 특약사항</div>
							계약 내용에 따른 정보 입력과 권리, 물리적, 법률적 하자 등 기타 계약의 중대한 사항 특약사항 확인 요청하기
						</li>
						<li class="item color4">
							<div class="state"><span class="num">04</span>동시진행</div>
							잔금 시 매도인 준비서류와 매수인 매매잔금은 동시이행으로 진행하기
						</li>
						<li class="item color5">
							<div class="state"><span class="num">05</span>안전장치</div>
							모든 매매대금은 반드시 소유자 계좌로 입금하여 안전하게 매매대금을 치루기
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
	name: 'Alarm',
	components: {},
	computed: {},
	data() {
		return {
			reData: null,
			isId: this.$route.params.id,
		};
	},
	created() {
        window.formatMoney = this.$formatMoney;
		this.init();
	},
	updated() {},
	methods: {
		init() {
			this.$apiGET('/api/report/result/realprc?id=' + this.isId).then(data => {
                const chartData = JSON.parse(data.chartData);
				const report4 = JSON.parse(data.report4);
				const report5 = JSON.parse(data.report5);
				const report6 = JSON.parse(data.report6);
				const report7 = JSON.parse(data.report7);
				const report8 = JSON.parse(data.report8);
				const scoreInfo = JSON.parse(data.scoreInfo);
				const regData = JSON.parse(data.regData);

                data.chartData = chartData;
				data.report4 = report4;
				data.report5 = report5;
				data.report6 = report6;
				data.report7 = report7;
				data.report8 = report8;
				data.scoreInfo = scoreInfo;
				data.regData = regData;

				if (data.lnbrSlno == '0') {
					data.lnbrSlno = '';
				}

				for (let i = 0; i < data.regData.myRegList.length; i++) {
					if (data.regData.myRegList[i].등기목적 == '소유권보존') {
						for (let ii = 0; ii < data.regData.myRegList.length; ii++) {
							if (data.regData.myRegList[ii].등기목적 == '소유권이전') {
								data.regData.myRegList.splice(i, 1);
								break;
							}
						}
					}
				}

                console.log(data);
				this.reData = data;

				if(data.chartData){
                    this.$nextTick(() => {
                        (async function () {
                            new Chart(document.getElementById('myChart'), {
                                type: 'line',
                                data: {
                                    labels: data.chartData.dateChart,
                                    datasets: [
                                        {
                                            label: '매매',
                                            data: data.chartData.dealChart,
                                            borderWidth: 4,
                                            borderColor: '#f72891',
                                            backgroundColor: 'transparent',
                                            radius: 7,
                                            pointBackgroundColor: '#fff',
                                        },
                                        {
                                            label: '전세',
                                            data: data.chartData.rentChart,
                                            borderWidth: 4,
                                            borderColor: '#ffcfee',
                                            backgroundColor: 'transparent',
                                            radius: 7,
                                            pointBackgroundColor: '#fff',
                                        },
                                    ],
                                },
                                options: {
                                    spanGaps: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip:{
                                            callbacks:{
                                                label: function(context) {
                                                    let label = context.dataset.label || '';
                                                    return context.dataset.label + ': ' + window.formatMoney(context.raw, 'TAX');
                                                }
                                            }
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: function (value) {
                                                    return window.formatMoney(value, 'TAX');
                                                }
                                            }
                                        },
                                        x: {
                                            grid: {
                                                display: false,
                                            },
                                        },
                                    },
                                },
                            });
                        })();
                    });
                }
			});
		},
	},
};
</script>
