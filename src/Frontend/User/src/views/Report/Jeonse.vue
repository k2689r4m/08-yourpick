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
				<button type="button" class="btn" @click="$refs.stage4.scrollIntoView({ behavior: 'smooth' })">
					전세사기 분석
				</button>
				<button type="button" class="btn" @click="$refs.stage5.scrollIntoView({ behavior: 'smooth' })">참고사항</button>
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
						<td>전세</td>
						<td>{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
					</tr>
				</table>
			</div>
			<div class="report-view--tit">안심거래리포트</div>
			<div class="report-view--con" ref="stage1">
				<div class="con-tit"><span class="num">01</span> 매물 개요</div>
				<div class="con-flex">
					<div class="left">
                        <!-- {{ reData.realEstateTypeCode }} -->
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
								<span>전세</span>
							</div>
							<div class="hr"></div>
							<div class="line">
								<span>거래금액</span>
								<strong>{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</strong>
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
				<!-- <div class="con-flex">
					<div class="left">
						<div class="halfcircle-score--wrap">
							<div class="tit">내 매물 점수</div>
							<div class="halfcircle-score">
								<div class="bar" :style="'transform:rotateZ(' + reData.totalScore * 1.8 + 'deg)'"></div>
							</div>
							<div class="num">{{ reData.totalScore }}점</div>
							<div class="text">
								<div class="left">전국 기준</div>
								<div class="right">평균 점수보다 8점 높아요</div>
							</div>
						</div>
					</div>
					<div class="right m-l--30">
						<div class="halfcircle-score--wrap">
							<div class="tit">점수 분포 구간</div>
							<div class="halfcircle-score">
								<div class="bar" :style="'transform:rotateZ(' + 88 * 1.8 + 'deg)'"></div>
							</div>
							<div class="arrow" :style="'transform:rotate(' + 88 * 1.8 + 'deg)'"></div>
							<div class="num"><span>상위</span>20%</div>
							<div class="text">
								<div class="left">전국 기준</div>
								<div class="right">상위 20% 구간에 위치해요</div>
							</div>
						</div>
					</div>
				</div>
				<div class="chart-wrap m-t--40"></div>
				<div class="table-tit">- 감점요인</div>
				<div class="con-box type2">
					<div class="line" v-for="(is, idx) in reData.scoreInfo" :key="'score_' + idx">
						<label>감점요소 {{ idx + 1 }}</label>
						{{ is.info }}
					</div>
				</div> -->
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
							<div class="line">
								<div class="label">전세사기분석</div>
								{{ reData.b1Score }}점
							</div>
							<div class="box m-t--30">
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
					<div class="line">{{ $dateFormat(reData.updated_at, 'YY.MM.DD HH') }}시 기준, 유어픽에서 분석한 최종적인 안심거래 리포트 자료입니다.</div>
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
						내 전세 금액 <strong>{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</strong>
					</div>
					<div class="center">
						<div class="left">
							시세 기준월
							<strong>{{ reData.chartData.isDate }}</strong>
						</div>
						<div class="right">
							<div class="box">
								전세 하위 평균
								<strong>{{  reData.chartData.info?.minAvg ? reData.chartData.info.minAvgKor : '현재 시세 없음' }}</strong>
							</div>
							<div class="box">
								전세 일반 평균
								<strong>{{  reData.chartData.info?.norAvg ? reData.chartData.info.norAvgKor : '현재 시세 없음' }}</strong>
							</div>
							<div class="box">
								전세 상위 평균
								<strong>{{  reData.chartData.info?.maxAvg ? reData.chartData.info.maxAvgKor : '현재 시세 없음' }}</strong>
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
								<td>전세</td>
								<td>{{ $formatMoney(is.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
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
								<td>전세</td>
								<td>{{ $formatMoney(is.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</td>
								<td>{{ is.floor }}층</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="m-block">
					<table class="table text-center top-border--none">
						<tr>
							<th>계약일</th>
							<th>거래</th>
							<th>가격</th>
							<th>총</th>
						</tr>
						<tr>
							<td>23.03.17</td>
							<td>매매</td>
							<td>9억 5,000만 원</td>
							<td>5층</td>
						</tr>
						<tr>
							<td>23.03.17</td>
							<td>매매</td>
							<td>9억 5,000만 원</td>
							<td>5층</td>
						</tr>
						<tr>
							<td>23.03.17</td>
							<td>매매</td>
							<td>9억 5,000만 원</td>
							<td>5층</td>
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
					<div class="line">해당 {{ reData.realEstateTypeName }}에 동일한 면적(m²)의 호수들에 대한 분석으로 이루어졌습니다.</div>
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
						용현동에 위치한 동일한 건물 유형, 동일한 면적(m²) 기준 가격 분석으로 이루어졌습니다. 일정 면적(m²) 오차
						범위가 발생할 수 있으니 참고하시기 바랍니다.
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
								<span class="text">{{ reData.report8.true.b1AvgKor }}</span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="label color2">그 외</div>
						<div class="bar-wrap">
							<div class="bar color2" :style="'width: ' + reData.report8.falsePer">
								<span class="text">{{ reData.report8.false.b1AvgKor }}</span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="label color3">내 매물</div>
						<div class="bar-wrap">
							<div class="bar color3" :style="'width: ' + reData.report8.pricePer">
								<span class="text">{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</span>
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
									<p class="sm">해당 매물의 순자산은 {{ reData.regData.realPrc }}원이에요.</p>
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
			</div>
			<div class="report-view--con" ref="stage4">
				<div class="con-tit"><span class="num">04</span> 전세사기분석</div>
				<div class="con-price">
					<div class="top">
						내 전세 금액 <strong>{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}</strong>
					</div>
					<div class="center-type2">
						<div class="left">
							<div class="box">
								집주인
								<strong>{{ reData.regData.owner }}</strong>
							</div>
						</div>
						<div class="center2">
							<div class="box">
								<!-- <div class="top">
									<span>보유 주택 수</span>
									<span>보유 주택 수</span>
								</div> -->
                                고액 체납자 여부
								<strong>X</strong>
							</div>
						</div>
						<div class="right">
							<div class="box">
								채권최고액
								<!-- <strong>X</strong> -->
                                <strong>
                                    {{ reData.regData.collateralPrc ? reData.regData.collateralPrc : 'X' }}
                                </strong>
							</div>
						</div>
					</div>
				</div>
				<div class="con-box">
					<div class="line">해당 매물의 집주인 ‘{{ reData.regData.owner }}’입니다.</div>
					<div class="line">국토교통부에서 제공하는 악성임대인 명단은 준비중입니다..</div>
					<div class="line">국세청에서 제공하는 고액 체납자 명단에 집주인은 해당되지 않아요.</div>
                    <!-- 근저당권 설정 금액인 채권최고액 OOO원이 설정되어 있어요. -->
				</div>
				<div class="con-flex">
					<div class="left">
						<div class="con-sub m-t--10 m-b--10">· 요약 정보</div>
						<table class="table grey2 top-border--none">
							<colgroup>
								<col width="30%" />
								<col width="70%" />
							</colgroup>
							<tr>
								<th>주소</th>
								<td>
									{{ reData.siNm }} {{ reData.sggNm }} {{ reData.emdNm }}
									{{ reData.lnbrSlno ? reData.lnbrMnnm + '-' + reData.lnbrSlno : reData.lnbrMnnm }}<br />{{
										reData.complexName
									}}
									{{ reData.realEstateTypeName }}
									{{ reData.dongNm ? reData.dongNm + '동' : '' }}
									{{ reData.hoNm ? reData.hoNm + '호' : '' }}
								</td>
							</tr>
							<tr>
								<th>건물 용도</th>
								<td>{{ reData.mainPurpsCdNm }}</td>
							</tr>
							<tr>
								<th>전용 면적</th>
								<td>{{ reData.exclusiveArea }}m2</td>
							</tr>
							<tr>
								<th>근저당액</th>
								<td>{{ reData.regData.collateralPrc ? reData.regData.collateralPrc : '0원' }}</td>
							</tr>
							<tr>
								<th>사용승인일</th>
								<td>{{ $dateFormat(reData.useApproveYmd, 'YYYY.MM.DD') }}</td>
							</tr>
						</table>
					</div>
					<div class="right">
						<div class="con-sub m-t--10 m-b--10">· 시세 분석</div>
						<table class="table grey2 top-border--none">
							<colgroup>
								<col width="30%" />
								<col width="70%" />
							</colgroup>
							<tr>
								<th>매매가 시세 평균</th>
								<td>{{ reData.report9.hoAvgPrc.dealPriceAVG }}</td>
							</tr>
							<tr>
								<th>전세가 시세 평균</th>
								<td>{{ reData.report9.hoAvgPrc.leasePriceAVG }}</td>
							</tr>
							<tr>
								<th>월세가 시세 평균</th>
								<td>{{ reData.report9.hoAvgPrc.rentDepositPriceAVG }}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="con-sub m-b--10">· 적정 전세 금액</div>
				<div class="con-box type3">
					HUG 주택도시보증공사 전세보증보험 가입 조건인
					<p class="color">‘전세보증금과 선순위채권을 더한 값이 주택가격 x 담보인정비율(90%)’</p>
					이내이어야 전세보증보험 가입이 가능합니다.
				</div>
				<div class="con-flex type-calcbox">
					<div class="left">
						<div class="calcbox">
							<div class="calcbox-left">
								<div class="tit">전세보증금</div>
								{{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }}
							</div>
							<div class="calcbox-right">
								<div class="tit">선순위채권</div>
								{{ reData.regData.collateralPrc ? reData.regData.collateralPrc : '0원' }}
							</div>
							<div class="mark">+</div>
						</div>
						<div class="calcbox-bottom">
							전세보증금 + 선순위채권
							<span class="price">{{ $formatMoney(reData.leasePrice+reData.regData.collateralPrcNum, $MONEY_FORMAT_TYPE.TAX) }}</span>
						</div>
					</div>
					<div class="right">
						<div class="calcbox">
							<div class="calcbox-left">
								<div class="tit">주택가격</div>
								{{ reData.realData.siga ? $formatMoney(reData.realData.siga, $MONEY_FORMAT_TYPE.TAX) : '가격 정보 없음' }}
							</div>
							<div class="calcbox-right">
								<div class="tit">담보인정비율</div>
								90%
							</div>
							<div class="mark">×</div>
						</div>
						<div class="calcbox-bottom">
							주택가격 X 담보인정비율
							<span class="price">{{ reData.realData.siga ? $formatMoney(reData.realData.siga*0.9, $MONEY_FORMAT_TYPE.TAX) : '가격 정보 없음' }}</span>
						</div>
					</div>
				</div>
				<div v-if="reData.realData.st1 == '적합'" class="con-box type3 border">
					내 전세 금액({{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }})은 ‘주택가격 x 담보인정비율(90%)’ 이내에 충족하므로,<br />
					<strong>적정 전세금액 범위에 포함됩니다.</strong>
				</div>
                <div v-else class="con-box type3 border">
					내 전세 금액({{ $formatMoney(reData.leasePrice, $MONEY_FORMAT_TYPE.TAX) }})은 ‘주택가격 x 담보인정비율(90%)’ 이내에 충족하지 않으므로,<br />
					<strong>적정 전세금액 범위에 포함되지 않습니다.</strong>
				</div>
				<!-- <div class="con-flex pink-box">
					<div class="left">
						<div class="label">실거래가 정보</div>
						<div class="box">
							<div class="label">직전 매매 실거래가</div>
							<template v-if="reData.report9.realList.A1.price">
								<strong>{{ $formatMoney(reData.report9.realList.A1.price, $MONEY_FORMAT_TYPE.TAX) }}</strong>
								({{ $dateFormat(reData.report9.realList.A1.tradeYearMonth, 'YYYY.MM.DD') }})
							</template>
							<template v-else>
								<strong>현재 실거래가 없음</strong>
							</template>
						</div>
						<div class="box">
							<div class="label">직전 전세 실거래가</div>
							<template v-if="reData.report9.realList.A1.price">
								<strong>{{ $formatMoney(reData.report9.realList.B1.price, $MONEY_FORMAT_TYPE.TAX) }}</strong>
								({{ $dateFormat(reData.report9.realList.B1.tradeYearMonth, 'YYYY.MM.DD') }})
							</template>
							<template v-else>
								<strong>현재 실거래가 없음</strong>
							</template>
						</div>
					</div>
					<div class="right">
						<template v-if="reData.report9.realList.bePrice">
							해당 매물은<br />
							직전 매매 거래 가격 X 80% 이하인<br />
							<span>{{ reData.report9.realList.bePrice }}만원 이하</span>로 전세<br />거래를 하는 것이 안전합니다.
						</template>
						<template v-else>
							<span class="txt-size--18">
								해당 매물은 최근 2년간 동일한 면적 기준으로<br />
								매매 실거래가 정보가 없으므로 적정 전세 금액 범위를<br />
								설정하기 어렵습니다. 매매 시세 평균가를 참고하시거나 <br />
								'내 전세 금액 + 융자금액'이 주택가격 이내인지 확인해보세요.
							</span>
						</template>
					</div>
				</div> -->
				<div class="con-box">
					<div class="line">HUG 주택도시보증공사 전세보증보험 가입 조건 중 일부를 분석하여 제공하는 자료입니다.</div>
					<div class="line">
						주택가격은 HUG에서 명시한 건물유형 별 주택가격 산정기준에 따라 우선순위 순으로 적용됩니다.
					</div>
					<div class="line">
						단독,다중,다가구는 보증신청인보다 우선하는 다른 세입자들의 선순위 전세보증금을 합계해야 하므로,
						전입세대열람원을 꼭 확인해주시기를 바랍니다. <br />
						(해당 선순위채권은 내 매물의 선순위채권만 반영되어 있다는 점을 알려드립니다.)
					</div>
					<div class="line">선순위채권: 보증신청인의 전세보증금보다 우선변제권이 인정되는 담보채권입니다.</div>
				</div>
				<div class="con-sub m-t--10 m-b--10">
					· 전세보증보험 채권 기준 알아보기
					<img src="../../assets/images/logo_hug.png" alt="" />
				</div>
				<div class="txt-c--grey m-b--30 txt-only">
					* HUG 주택도시보증공사에서 제공하는 전세보증보험 상품 요건 중 일부에 대한 분석 자료입니다. 더 정확한 내용은
					해당 홈페이지를 통해 조건들을 확인해주시기 바랍니다.
				</div>
				<div class="con-flex type4">
					<div class="left">
						<div class="tit">주택가격</div>
						<div class="price">{{ reData.realData.siga ? $formatMoney(reData.realData.siga, $MONEY_FORMAT_TYPE.TAX) : '가격 정보 없음'}}</div>
						<div class="labels">
							<label class="label">산정기준 1순위</label>
							<label class="label">KB시세</label>
							<label class="label">아파트, 오피스텔 기준</label>
						</div>
					</div>
					<div class="right">
						<div class="tit">보증한도</div>
						<div class="price">{{ reData.realData.siga ? $formatMoney(reData.realData.siga*0.9-reData.regData.collateralPrcNum, $MONEY_FORMAT_TYPE.TAX) : '가격 정보 없음' }}</div>
						<div class="labels">
							<label class="label">주택가격 X 담보인정비율(90%) - 선순위채권</label>
						</div>
					</div>
				</div>
				<!-- <div class="con-boxs">
					<div class="box flex1">
						<div class="top">
							<strong>채권기준 1</strong>
							선순위 채권이 주택가격의 60% 이내
						</div>
						<div class="bottom">
							<strong>적합</strong>
							해당 기준에 적합해요.
						</div>
					</div>
					<div class="box flex2">
						<div class="top">
							<strong>채권기준 2</strong>
							(다가구 해당) 선순위채권과 다른 세입자들의 선순위 보증금액을 합한금액이 주택가격의 80% 이내
						</div>
						<div class="bottom">
							<strong>적합</strong>
							다가구 주택이 아니에요.
						</div>
					</div>
					<div class="box flex1">
						<div class="top">
							<strong>채권기준 3</strong>
							전세보증금과 선순위 채권을 더한 금액이 주택가격 이내
						</div>
						<div class="bottom">
							<strong>적합</strong>
							해당 기준에 적합해요.
						</div>
					</div>
				</div> -->
				<div class="con-box">
					<div class="line">
						주택가격은 HUG 주택도시보증공사에 명시되어 있는 건물유형 별 산정기준으로 우선순위 따라 적용되며, 일부
						오차범위가 발생할 수 있습니다.
					</div>
					<div class="line">
						보증한도는 HUG 주택도시보증공사에 명시되어 있는 기준이며, 단독·다중·다가구는 보증신청인보다 우선하는 다른
						세입자들의 선순위 전세보증금을 합계해야 하므로, 전입세대열람원을 꼭 확인해주시기를 바랍니다. (해당
						선순위채권은 내 매물의 선순위채권만 반영되어 있다는 점을 알려드립니다.)
					</div>
					<div class="line">선순위채권: 보증신청인의 전세보증금보다 우선변제권이 인정되는 담보채권입니다.</div>
				</div>
				<div class="con-flex type5">
					<div class="left">
						<div class="table">
							<div class="th">보증 조건(일부)</div>
							<div class="td">전세보증금과 선순위채권을 더한 금액이 <br />‘주택가격 x 담보인정비율(90%)’ 이내</div>
							<div class="td">선순위채권이 주택가액의 60%이내</div>
							<div class="td">전세보증금 수도권 7억원 이하, 그 외 지역 5억원 이하</div>
							<div class="td">권리침해사항(경매신청,압류,가압류,가처분,가등기)이 없을 것</div>
							<div class="td">건축물대장상 위반건축물이 아닐 것</div>
						</div>
					</div>
					<div class="right">
						<div class="table">
							<div class="th pink">적합 여부</div>
							<div class="td">{{ reData.realData.st1 }}</div>
							<div class="td">{{ reData.realData.st2 }}</div>
							<div class="td">{{ reData.realData.st3 }}</div>
							<div class="td">{{ reData.realData.st4 }}</div>
							<div class="td">{{ reData.realData.st5 }}</div>
						</div>
					</div>
				</div>
				<div class="con-flex type5">
					<div class="left">
						<div class="table">
							<div class="th">추가 체크리스트</div>
							<div class="td">신청하려는 주택에 거주하면서, 전입신고와 확정일자를 받아야 함</div>
							<div class="td">보증신청일 현재 타세대 전입내역이 없어야 함 <br />(단독,다가구,다중주택 제외)</div>
							<div class="td">전세계약기간 1년 이상이어야 함</div>
							<div class="td">공인중개사를 통해 체결한 전세계약서이어야 함</div>
							<div class="td">전세보증금반환채권의 담보 및 양도를 금지하는 특약이 없어야 함</div>
							<div class="td">
								(단독,다중,다가구) 선순위채권과 다른 세입자들의 <br />선순위 보증금액을 합한금액이 주택가액의 80% 이내
							</div>
							<div class="td">
								질권설정 또는 채권양도 통지된 전세대출을 받지 않아야 함 <br />(신용대출은 보증가입이 가능함)
							</div>
						</div>
					</div>
					<div class="right">
						<div class="table">
							<div class="th pink">가이드라인</div>
							<div class="td">당일에 전입신고, 확정일자 신고</div>
							<div class="td">전입세대열람원 확인</div>
							<div class="td">전세계약서 확인</div>
							<div class="td">전세계약서 확인</div>
							<div class="td">전세계약서 확인</div>
							<div class="td">전입세대열람원 확인</div>
							<div class="td">대출받은 은행기관에서 확인</div>
						</div>
					</div>
				</div>
				<div class="con-sub m-b--10">· 필수 확인 사항 (현재)</div>
				<div class="con-boxs type2">
					<div class="box">
						<div class="label">근저당권 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.collateral ? 'O' : 'X' }}</div>
					</div>
					<div class="box">
						<div class="label">압류 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.apryu ? 'O' : 'X' }}</div>
					</div>
					<div class="box">
						<div class="label">가압류 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.gaapryu ? 'O' : 'X' }}</div>
					</div>
					<div class="box">
						<div class="label">가처분 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.gacheobun ? 'O' : 'X' }}</div>
					</div>
					<div class="box">
						<div class="label">주택 임차권 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.jutaegimchagwon ? 'O' : 'X' }}</div>
					</div>
					<div class="box">
						<div class="label">위반 건축물 여부</div>
						<div class="state">{{ 'X' }}</div>
					</div>
				</div>
				<div class="con-box">
					<div class="line" v-if="reData.regData.b1MoreInfo.collateral">근저당권이 설정되어 있습니다.</div>
					<div class="line" v-else>해당 매물은 근저당권이 설정되어 있지 않아요.</div>

					<div class="line" v-if="reData.regData.b1MoreInfo.apryu">압류가 설정되어 있습니다..</div>
					<div class="line" v-else>해당 매물은 압류가 설정되어 있지 않아요.</div>

					<div class="line" v-if="reData.regData.b1MoreInfo.gaapryu">가압류가 설정되어 있습니다.</div>
					<div class="line" v-else>해당 매물은 가압류가 설정되어 있지 않아요.</div>

					<div class="line" v-if="reData.regData.b1MoreInfo.gacheobun">가처분이 설정되어 있습니다.</div>
					<div class="line" v-else>해당 매물은 가처분이 설정되어 있지 않아요.</div>

					<div class="line" v-if="reData.regData.b1MoreInfo.jutaegimchagwon">주택임차권이 설정되어 있습니다.</div>
					<div class="line" v-else>해당 매물은 주택임차권이 설정되어 있지 않아요.</div>

					<div class="line">해당 매물은 위반건축물로 등록되어 있지 않아요.</div>
				</div>
				<div class="con-boxs type3">
					<div class="left">
						<div class="label">신탁사 소유 매물 여부</div>
						<div class="state">{{ reData.regData.b1MoreInfo.sintaksa ? 'O' : 'X' }}</div>
						{{ reData.regData.b1MoreInfo.sintaksa ? 'O' : '해당 매물은 신탁사 소유 매물입니다.' }}
					</div>
					<div class="right">
						<div class="img-wrap">
							<img src="../../assets/images/paper.png" alt="" />
						</div>
						<div class="txt-wrap">
							<div class="label">신탁사 소유 매물 여부</div>
							법적인 대외적 소유자는 신탁회사(수탁자)이에요.<br />
							계약 전 미리 신탁원부(인터넷 열람·발급 불가)<br />
							원본을 확인하여 임대인(위탁자)이 임대차계약을 맺을 권한이 있는지 확인해야해요! 신탁사와 꼭 소통 후 계약을
							하길 권유드립니다.<br />
							<br />
							<span class="txt-c--danger">
								주의! 계약금 또는 전세보증금은 입금은 임대차권한자에게 입금해야합니다.
							</span>
						</div>
					</div>
				</div>
				<div class="con-sub m-b--10">· 집주인 신용도</div>
				<div class="credit-score">
					<div class="left">
						<div class="score">
							<div class="arrow" :style="'transform:rotate(' + reData.regData.b1MoreInfo.deg + ')'"></div>
							<!-- 점수*1.8 deg기입 -->
							<div class="bottom">
								<div class="left">
									<label>위험</label>
									<strong>총 {{ reData.regData.b1MoreInfo.apryuCnt + reData.regData.b1MoreInfo.oldApryuCnt }}회</strong>
									압류, 가압류 이력
								</div>
								<div class="right">
									<label>안전</label>
									<strong>총 {{ reData.regData.b1MoreInfo.imchaCnt + reData.regData.b1MoreInfo.oldImchaCnt }}회</strong>
									임차권 등기 명령 이력
								</div>
							</div>
						</div>
					</div>
					<div class="right">{{ reData.regData.b1MoreInfo.info }}</div>
				</div>
				<div class="con-box">
					<div class="line">
						유어픽 안심거래리포트는 부동산 계약 시 참고 분석 자료입니다. 모든 판단의 책임은 해당 리포트를 열람하는
						이용자에게 있습니다.
					</div>
				</div>
			</div>
			<div class="report-view--con" ref="stage5">
				<div class="con-tit"><span class="num">05</span> 참고사항</div>
				<div class="con-reference">
					<div class="con-reference--tit m-b--30">주택임대차보호법 소액임차인 최우선변제금액</div>
					<div class="table-wrap">
						<table class="con-reference--table type2">
							<colgroup>
								<col width="25%" />
								<col width="25%" />
								<col width="25%" />
								<col width="25%" />
							</colgroup>
							<tr>
								<th>기준 시점</th>
								<th>지역</th>
								<th>소액보증금범위</th>
								<th>최우선변제금액</th>
							</tr>
							<tr>
								<td>{{ $dateFormat(reData.created_at, 'YYYY.MM.DD') }}</td>
								<td>{{ reData.siNm }}</td>
								<td>{{ reData.regData.exPrice.pric1 }}</td>
								<td>{{ reData.regData.exPrice.pric2 }}</td>
							</tr>
						</table>
					</div>
					<div class="con-reference--q">
						<label>최우선변제란?</label>
						경·공매시에 소액임차인의 보증금 중 일정액을 다른 담보물권자보다 우선하여 변제 받는 권리
					</div>
					<div class="con-reference--q">
						<label>소액임차인이란?</label>
						임대차 보증금이 주택임대차보호법상 정한 금액 이하일때 해당되는 임차인
					</div>
					<div class="con-box">
						<div class="line">
							<strong>적용되는 기준시점</strong> : 담보물권(저당권, 근저당권, 가등기담보권 등)의 설정 일자일 기준
						</div>
						<div class="line">
							소액임차인이 우선변제금액이 주택가격의 2분의1을 초과하는 경우에는 주택가격의 2분의1에 해당하는 금액을
							변제받습니다.
						</div>
					</div>
					<!-- <div class="con-reference--text">
						· <strong>기준시점</strong> : 담보물권(저당권, 근저당권, 가등기담보권 등) 설정일자<br />
						· <strong>경매개시 결정의 등기 전 대항요건</strong> : (주택인도 및 주민등록)을 갖춘 상태 + 배당요구 종기까지
						대항력유지<br />
						· 배당요구의 종기까지 <span class="txt-c--primary">배당요구</span>를 하여야 보호를 받을 수 있습니다.<br />
						· <span class="txt-c--primary">주택가액(대지의 가액포함)의 ½에 해당하는 금액까지만</span> 우선변제 받을 수
						있습니다.
					</div> -->
				</div>
				<div class="con-reference">
					<div class="con-reference--tit">전세보증금 반환보증보험</div>
					<div class="con-reference--text txt-center">
						· 전세계약 종료 시 임대인이 임차인에게 반환해야 하는 전세보증금의 반환을 책임지는 보증상품
					</div>
					<div class="con-reference--flex">
						<div class="left">
							<div class="con-reference--pinkbox">
								<div class="tit">1. 신청기한</div>
								전세계약서 상 잔금지급일과 <br />전입신고일 중 늦은 날로부터 <br />전세계약기간의 ½경과하기 전
							</div>
						</div>
						<div class="right">
							<div class="con-reference--pinkbox">
								<div class="tit">2. 필수조건</div>
								신청 주택 거주하며 전입신고와 <br />확정일자를 받았을 것
							</div>
						</div>
					</div>
					<div class="con-reference--pinkbox left">
						<div class="tit">3. 제출공통서류</div>
						① 주민등록등본 및 신분증(사본)<br />
						② 전세계약서(사본)<br />
						③ 전세보증금 지급 확인서류 계촤이체내역서 (무통장입금증 또는 임대인 · 중개사가 확인한 영수증)<br />
						④ 전입세대열람내역<br />
						⑤ 부동산등기부등본, 건축물대장
					</div>
					<!-- <div class="con-reference--circle">
						<div class="circle">
							<div class="label">1. 전세보증금</div>
							수도권 7억원<br />그 외 지역 5억원 이하
						</div>
						<div class="circle">
							<div class="label">2. 신청기한</div>
							전세계약의<br />½ 경과 전까지
						</div>
						<div class="circle">
							<div class="label">3. 필수조건</div>
							주택인도 + 전입신고<br />확정일자 및 대항력
						</div>
					</div> -->
					<div class="con-reference--text txt-center">
						해당 안내는 주택도시보증공사의 신청기준이며, 더욱 자세한 내용은 홈페이지를 통해 확인하세요!
						<a href="https://www.khug.or.kr" target="_blank" class="txt-c--primary">www.khug.or.kr 주택도시보증공사</a>
					</div>
				</div>
				<div class="con-reference">
					<div class="con-reference--tit">전세 계약 절차</div>
					<ul class="con-reference--state">
						<li class="item color1 h-140">
							<div class="state"><span class="num">01</span>가계약 또는<br />본 계약 진행</div>
							소유자와 계약자가 동일한 사람인지 확인하고 계약금을 입금하여 계약 진행
						</li>
						<li class="item color2 h-140">
							<div class="state"><span class="num">02</span>임대차 계약서<br />작성 및 특약사항</div>
							계약 내용에 따른 정보 입력과 필요한 내용 특약사항 요청하여 계약서 작성하기
						</li>
					</ul>
					<ul class="con-reference--state">
						<li class="item color3 h-140">
							<div class="state"><span class="num">03</span>잔금 및 입주</div>
							잔금을 안전하게 치루고, 입주(이사) 진행하기
						</li>
						<li class="item color4 h-140">
							<div class="state"><span class="num">04</span>확정일자 및<br />대항요건</div>
							입주 후 주민등록(전입신고)하여 대항요건 갖추기
							<p class="txt-c--grey txt-size--12 m-t--5">익일 0시부터 효력 발생</p>
						</li>
						<li class="item color5 h-140">
							<div class="state"><span class="num">05</span>안전장치</div>
							전세보증금 반환보증보험에 가입하여 소중한 전세보증금 지키기
						</li>
					</ul>
				</div>
				<div class="con-reference">
					<div class="con-reference--tit">임대차 3법</div>
					<div class="con-reference--box type2">
						<div class="tit">전월세 상한제</div>
						<div class="con">
							계약 갱신시 임대료 상한율 <span class="txt-c--primary">5%</span> 범위 내로 제한하여 일정한 범위 내에서만
							금액을 올릴 수 있는 임차인 보호 제도<br />
							<br />
							전월세 상한제에 따라 임대료 증액상한을 5%로 하되,<br />
							지자체가 지역 임대차 시장 여건 등을 고려하여 조례로 달리 정할 수 있습니다.
						</div>
					</div>
					<div class="con-reference--box type2">
						<div class="tit">계약갱신청구권</div>
						<div class="con">
							주택임대차보호법에 따라 임차인이 희망한다면 1회에 한해 계약 갱신을 청구할 수 있는 제도<br />
							<br />
							임대인은 임차인이 임대차 기간이 끝나기 <span class="txt-c--primary">6개월 전부터 2개월 전까지</span> 계약
							갱신을 요구할 경우<br />
							<span class="txt-c--primary">정당한 사유없이</span> 임대인은 이를 거절할 수 없습니다.<br />
							<br />
							단, 계약갱신청구권은 명확한 의사표시를 할 경우에만 해당되기 때문에,<br />
							계약을 <span class="txt-c--primary">묵시적으로 갱신</span>했을 경우는 이에 해당하지 않습니다.
						</div>
					</div>
					<div class="con-reference--box type2">
						<div class="tit">전월세 신고제</div>
						<div class="con">
							임대차 계약 당사자가 임대차 <span class="txt-c--primary">계약 체결일부터 30일 이내에</span> 임대기간,
							임대료 등의 계약 내용을<br />
							주택 소재지 관할 신고관청에 <span class="txt-c--primary">공동으로 신고해야</span> 하는 제도<br />
							<br />
							· 신고대상 주택 : 아파트 다세대 등 주택 외 준주택, 비주택 등도 해당<br />
							· 신고대상 금액기준 : 임대차
							<span class="txt-c--primary">보증금이 6천만원을 초과하거나 월 차임이 30만원을 초과</span>하는 계약<br />
							<span class="txt-c--grey"
								>(임대차 계약을 갱신하는 경우로서 보증금 및 차임의 증감 없이 임대차 기간만 연장하는 경우는 제외)</span
							>
						</div>
					</div>
				</div>
				<div class="con-reference">
					<div class="con-reference--tit m-b--30">임대사업자란?</div>
					<div class="con-reference--q">
						<label>“임대사업자”란?</label>
						공공주택사업자가 아닌 자로서 1호 이상의 민간임대주택을 취득하여 임대사업을 할 목적으로 민간임대주택에 관한
						특별법 제 5조에 따라 등록한 자
					</div>
					<div class="table-tit">&lt;민간임대주택의 종류&gt;</div>
					<div class="con-reference--text">
						<span class="txt-c--primary">취득유형</span>에 따라 구분되며, 임대의무기간에 따라
						<span class="txt-c--primary">(공공지원 · 장기임대)</span> 민간임대주택으로 구분됩니다.
					</div>
					<table class="con-reference--table type3">
						<tr>
							<th>구분</th>
							<th>취득유형</th>
							<th>임대의무기간</th>
						</tr>
						<tr>
							<td>종류</td>
							<td>
								- 민간건설임대주택<br />
								- 민간매입임대주택
							</td>
							<td>
								- 공공지원민간임대주택(10년)<br />
								- 장기일반민간임대주택(10년)
							</td>
						</tr>
					</table>
					<div class="table-tit">&lt;임대차 계약 시 주요 의무사항&gt;</div>
					<table class="con-reference--table type3">
						<tr>
							<th>주요 의무사항</th>
							<th>과태료</th>
						</tr>
						<tr>
							<td class="txt-left">
								<br />
								1. 임대사업자 설명 의무<br />
								<br />
								<p class="sm">
									· 임대사업자는 임차인에게 임대의무기간, 임대료 증액 제한(5%), 임대주택 권리관계<br />
									(선순위 담보권, 세금 체납 사실 등) 등에 대해 설명하여야 합니다.<br />
									<br />
									※ 또한, 둘 이상 임대차계약이 존재하는 다가구주택 등은 선순위 임대보증금에 대해서도 설명해야 합니다.
									(2020. 12. 10 이후)
								</p>
								<br />
							</td>
							<td class="txt-nowrap">500만 원 이하</td>
						</tr>
						<tr>
							<td class="txt-left">
								<br />
								2. 소유권등기상 부기등기 의무 (2020.12.10 이후)<br />
								<br />
								<p class="sm">
									· 임대사업자는 등록 후 지체없이 등록한 임대주택이 임대 의무기간과 임대료 증액기준을 준수해야 하는
									재산임을 소유권등기에 부기등기해야 합니다.
								</p>
								<br />
							</td>
							<td class="txt-nowrap">500만 원 이하</td>
						</tr>
						<tr>
							<td class="txt-left">
								<br />
								3. 임대차계약 신고 의무<br />
								<br />
								<p class="sm">
									· 임대사업자가 임대료, 임대기간 등 임대차계약 사항(재계약, 묵시적 갱신 포함)을 관할 지자체에
									신고하여야 합니다.<br />
									<br />
									※ (신고방법) 지자체(시 · 군 · 구)방문 또는 렌트홈 온라인 신고<br />
									※ (제출서류) 임대차계약 신고서 및 표준임대차계약서<br />
									<br />
									· 임대차 계약 신고 이력이 없는 경우에는 세제 감면이 제한 될 수 있습니다.
								</p>
								<br />
							</td>
							<td class="txt-nowrap">1,000만 원 이하</td>
						</tr>
						<tr>
							<td class="txt-left">
								<br />
								4. 표준임대차계약서 양식 사용 의무<br />
								<br />
								<p class="sm">
									· 임대 사업자가 임대차계약을 체결하는 경우에는 표준임대차계약서 양식<br />
									(민간임대주택법 시행규칙 별지 제 24호)을 사용하여야 합니다.<br />
									<br />
									· 양식 미사용 시 임대차계약 신고가 수리되지 않을 수 있습니다.
								</p>
								<br />
							</td>
							<td class="txt-nowrap">1,000만 원 이하</td>
						</tr>
					</table>
					<div class="con-reference--text txt-center">
						<span class="txt-c--primary"
							>민간임대사업자에 해당되는 임대인 또는 임차인의 경우<br />
							안전한 임대차 계약을 위하여 계약시 지켜야 하는 주요 의무사항을 확인해주세요!</span
						>
					</div>
					<div class="con-reference--text txt-center m-t--40">
						더욱 자세한 임대사업자에 대한 사항은 렌트홈
						<a href="https://www.renthome.go.kr" target="_blank" class="txt-c--primary">www.renthome.go.kr</a>
						홈페이지를 참고해주세요.
					</div>
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
			exPrice: [
				{ name: ['11'], pric1: '1억 6,500만원 이하', pric2: '5,500만원 이하' },
				{ name: ['29', '4146', '4159', '4157'], pric1: '1억 4,500만원 이하', pric2: '4,800만원 이하' },
				{ name: ['4127', '24', '4148', '4150', '4122'], pric1: '8,500만원 이하', pric2: '2,800만원 이하' },
				{ name: 'none', pric1: '7,500만원 이하', pric2: '2,500만원 이하' },
			],
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
				const report9 = JSON.parse(data.report9);
                const realData = JSON.parse(data.realData);
				const scoreInfo = JSON.parse(data.scoreInfo);
				const regData = JSON.parse(data.regData);

                data.chartData = chartData;
				data.report4 = report4;
				data.report5 = report5;
				data.report6 = report6;
				data.report7 = report7;
				data.report8 = report8;
				data.report9 = report9;
                data.realData = realData;
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

				for (let i = 0; i < this.exPrice.length; i++) {
					for (let x = 0; x < this.exPrice[i].name.length; x++) {
						if (this.exPrice[i].name[x].length == 2 && this.exPrice[i].name[x].length != 'none') {
							if (this.exPrice[i].name[x] == data.cortarNo.substr(0, 2)) {
								data.regData.exPrice = this.exPrice[i];
								break;
							}
						} else if (this.exPrice[i].name[x].length == 4 && this.exPrice[i].name[x].length != 'none') {
							if (this.exPrice[i].name[x] == data.cortarNo.substr(0, 4)) {
								data.regData.exPrice = this.exPrice[i];
								break;
							}
						}
					}
				}

				if (!data.regData.exPrice) {
					data.regData.exPrice = this.exPrice[3];
				}

				this.reData = data;

                console.log(data);

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
